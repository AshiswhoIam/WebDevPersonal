import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
    }

    //Check if JWT_SECRET exists
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error('JWT_SECRET environment variable is not set!');
      return NextResponse.json({ 
        message: 'Server configuration error' 
      }, { status: 500 });
    }

    //Verify the token 
    const decoded = jwt.verify(token, jwtSecret) as any;

    return NextResponse.json({
      user: {
        id: decoded.userId,
        name: decoded.name,
        email: decoded.email
      }
    }, { status: 200 });

  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }
}