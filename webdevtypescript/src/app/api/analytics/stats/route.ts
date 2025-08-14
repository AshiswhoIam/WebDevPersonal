//webdevtypescript\src\app\api\analytics\stats\route.ts
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import clientPromise from '../../../../../backend/lib/mongodb';

const verifyAdminToken = async (request: NextRequest) => {
  const token = request.cookies.get('token')?.value;
  if (!token || !process.env.JWT_SECRET) return null;
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as { userId: string };
    
    const client = await clientPromise;
    const users = client.db('Webdev').collection('info');
    const user = await users.findOne({ _id: new ObjectId(decoded.userId) });
    
    if (user && user.role === 'admin' && user.isActive !== false) {
      return user;
    }
    return null;
  } catch {
    return null;
  }
};

export async function GET(req: NextRequest) {
  try {
    //Verify admin access
    const adminUser = await verifyAdminToken(req);
    if (!adminUser) {
      return NextResponse.json({ 
        message: 'Access denied. Admin privileges required.' 
      }, { status: 403 });
    }

    //Get query parameters
    const { searchParams } = new URL(req.url);
    const timeRange = searchParams.get('range') || '7d';

    //Connect to MongoDB
    const client = await clientPromise;
    const db = client.db('Webdev');
    const pageStats = db.collection('page_stats');
    const users = db.collection('info');

    //Calculate date range for user signups
    const now = new Date();
    let startDate: Date;
    
    switch (timeRange) {
      case '1d':
        startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        break;
      case '7d':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30d':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case '90d':
        startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    }

    //Get all page stats
    const allPageStats = await pageStats.find({}).sort({ totalViews: -1 }).toArray();

    //Calculate totals
    const totalViews = allPageStats.reduce((sum, page) => sum + (page.totalViews || 0), 0);
    const totalRegistered = allPageStats.reduce((sum, page) => sum + (page.registeredUsers || 0), 0);
    const totalAnonymous = allPageStats.reduce((sum, page) => sum + (page.anonymousUsers || 0), 0);
    const uniqueVisitors = totalRegistered + totalAnonymous;

    //Get recent signups based on time range
    const signUps = await users.countDocuments({
      createdAt: { $gte: startDate }
    });

    //Get currently online users 
    const activeUsers = await users.countDocuments({
      status: 'online',
      lastLogin: { $gte: new Date(Date.now() - 30 * 60 * 1000) } // Active in last 30 minutes
    });

    //Format page views for display
    const formattedPageViews = allPageStats.map(page => ({
      id: page._id.toString(),
      page: page.page,
      views: page.totalViews || 0,
      uniqueVisitors: (page.registeredUsers || 0) + (page.anonymousUsers || 0),
      avgTimeSpent: '0s', // Simplified - no time tracking
      bounceRate: '0%', // Simplified - no bounce tracking
      totalClicks: page.totalClicks || 0,
      registeredUsers: page.registeredUsers || 0,
      anonymousUsers: page.anonymousUsers || 0
    }));

    //Get top pages 
    const topPages = allPageStats
      .sort((a, b) => (b.totalViews || 0) - (a.totalViews || 0))
      .slice(0, 5)
      .map(page => page.page);

    return NextResponse.json({
      stats: {
        totalViews,
        uniqueVisitors,
        signUps,
        avgSessionDuration: '0s', // Simplified
        topPages,
        activeUsers
      },
      pageViews: formattedPageViews,
      userActivities: [] // Simplified - no live activities
    }, { status: 200 });

  } catch (error) {
    console.error('Error fetching page stats:', error);
    return NextResponse.json({ 
      message: 'Internal server error' 
    }, { status: 500 });
  }
}