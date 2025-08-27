import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import clientPromise from '../../../../../backend/lib/mongodb';

interface TrackingData {
  page: string;
  totalClicks?: number;
  sessionId?: string;
  isInitialView?: boolean;
  isFirstVisitToPage?: boolean;
}

//Initialize TTL index on first run
let ttlIndexCreated = false;

export async function POST(req: NextRequest) {
  try {
    const trackingData: TrackingData = await req.json();

    if (!trackingData.page) {
      return NextResponse.json({ 
        message: 'Page is required' 
      }, { status: 400 });
    }

    //Connect to MongoDB
    const client = await clientPromise;
    const db = client.db('Webdev');
    const pageStats = db.collection('page_stats');
    const uniqueVisitors = db.collection('unique_visitors');

    //Create TTL index on first run (expires documents after 1 hours)
    if (!ttlIndexCreated) {
      try {
        await uniqueVisitors.createIndex(
          { "lastVisit": 1 }, 
          { 
            expireAfterSeconds: 3600, // 1 hours in seconds
            name: "ttl_lastVisit_1h"
          }
        );
        ttlIndexCreated = true;
      } catch (error) {
        //Index might already exist, that's fine
        console.log('TTL index creation note:', error);
      }
    }

    //Check if user is authenticated
    let isRegistered = false;
    let userId = null;
    const token = req.cookies.get('token')?.value;
    
    if (token && process.env.JWT_SECRET) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as { userId: string };
        userId = decoded.userId;
        isRegistered = true;
      } catch (error) {
        //User not authenticated, continue as anonymous
      }
    }

    //For unique visitor tracking, we need to track sessions
    const sessionId = trackingData.sessionId || 'unknown';
    const visitorKey = isRegistered ? `user_${userId}` : `session_${sessionId}`;
    
    //Only count as unique if this is their first visit to ANY page in the last 24 hours
    let shouldCountAsUniqueVisitor = false;
    
    if (trackingData.isInitialView && trackingData.isFirstVisitToPage) {
      //Check if this visitor has visited ANY page in the last 24 hours
      const hasVisitedAnyPageToday = await uniqueVisitors.findOne({
        visitorKey: visitorKey,
        lastVisit: { $gte: new Date(Date.now() - 86400000) } // 24 hours ago
      });
      
      if (!hasVisitedAnyPageToday) {
        shouldCountAsUniqueVisitor = true;
        
        //Record this visitor - TTL will auto-delete after 24 hours
        await uniqueVisitors.insertOne({
          page: trackingData.page,
          visitorKey: visitorKey,
          isRegistered: isRegistered,
          userId: userId,
          sessionId: sessionId,
          lastVisit: new Date() // TTL index uses this field for expiration
        });
      } else {
        // Update the lastVisit time to reset the TTL countdown
        // But don't count as a new unique visitor
        await uniqueVisitors.updateOne(
          { visitorKey: visitorKey },
          { $set: { lastVisit: new Date() } }
        );
      }
    }

    //Update page statistics
    const updateData = {
      $inc: {
        totalViews: 1, // Always increment views
        totalClicks: trackingData.totalClicks || 0,
        // Only increment unique user counts for actual unique visitors (first visit in 24h)
        registeredUsers: (shouldCountAsUniqueVisitor && isRegistered) ? 1 : 0,
        anonymousUsers: (shouldCountAsUniqueVisitor && !isRegistered) ? 1 : 0
      },
      $set: {
        lastUpdated: new Date()
      },
      $setOnInsert: {
        page: trackingData.page,
        createdAt: new Date()
      }
    };

    await pageStats.updateOne(
      { page: trackingData.page },
      updateData,
      { upsert: true }
    );

    return NextResponse.json({
      message: 'Page stats updated successfully',
      debug: {
        shouldCountAsUniqueVisitor,
        isRegistered,
        visitorKey: visitorKey.substring(0, 20) + '...' // Truncated for privacy
      }
    }, { status: 200 });

  } catch (error) {
    console.error('Error updating page stats:', error);
    return NextResponse.json({ 
      message: 'Internal server error' 
    }, { status: 500 });
  }
}