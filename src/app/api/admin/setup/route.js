// API Route: Setup Initial Admin (Run once)
import { NextResponse } from 'next/server';
import AdminController from '@/controllers/adminController';

export async function POST(request) {
  try {
    const { email, password, name, setupKey } = await request.json();

    // Simple security check - you can make this more secure
    if (setupKey !== 'kagzi-setup-2024') {
      return NextResponse.json(
        { message: 'Invalid setup key' },
        { status: 403 }
      );
    }

    const result = await AdminController.createAdmin(
      email || process.env.ADMIN_EMAIL || 'admin@kagziindia.com',
      password || process.env.ADMIN_PASSWORD || 'admin123',
      name || 'Admin User'
    );

    if (!result.success) {
      return NextResponse.json(
        { message: result.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      message: result.message,
      admin: result.data
    });
  } catch (error) {
    console.error('Setup error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
