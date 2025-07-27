import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  console.log('=== LOGOUT ROUTE CALLED ===');
  
  try {
    //Create response
    const response = NextResponse.json({
      message: 'Logged out successfully'
    }, { status: 200 });

    //Clear the token cookie
    response.cookies.set('token', '', {
      httpOnly: true,
      path: '/',
      maxAge: 0, // Expire immediately
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production'
    });

    console.log('Logout successful!');
    return response;

  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({ message: 'Logout failed' }, { status: 500 });
  }
}

//GET method for testing
export async function GET() {
  console.log('=== LOGOUT ROUTE GET CALLED ===');
  return NextResponse.json({
    message: 'Logout endpoint - POST method required'
  }, { status: 200 });
}