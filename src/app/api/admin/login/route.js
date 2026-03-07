// API Route: Admin Login
import { NextResponse } from 'next/server';
import AdminController from '@/controllers/adminController';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // Call controller
    const result = await AdminController.login(email, password);

    if (!result.success) {
      return NextResponse.json(
        { message: result.message, errors: result.errors },
        { status: 401 }
      );
    }

    // Set HTTP-only cookie for token
    const response = NextResponse.json({
      message: result.message,
      admin: result.data.admin
    });

    response.cookies.set('admin_token', result.data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 // 24 hours
    });

    return response;
  } catch (error) {
    console.error('Login API error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
