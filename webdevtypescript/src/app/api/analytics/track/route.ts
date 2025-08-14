//webdevtypescript\src\app\api\analytics\track\route.ts

import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import clientPromise from '../../../../../backend/lib/mongodb';

interface TrackingData {
  page: string;
  totalClicks?: number;
  sessionId?: string;
  isInitialView?: boolean;
}

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

    //Handle user counting logic:
    //Only increment user counts on initial page views
    const shouldCountUser = trackingData.isInitialView === true;

    //Always increment views and clicks, conditionally increment users
    const updateData = {
      $inc: {
        totalViews: 1,
        totalClicks: trackingData.totalClicks || 0,
        //Only increment user count on initial page view
        registeredUsers: (shouldCountUser && isRegistered) ? 1 : 0,
        anonymousUsers: (shouldCountUser && !isRegistered) ? 1 : 0
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
      message: 'Page stats updated successfully'
    }, { status: 200 });

  } catch (error) {
    console.error('Error updating page stats:', error);
    return NextResponse.json({ 
      message: 'Internal server error' 
    }, { status: 500 });
  }
}