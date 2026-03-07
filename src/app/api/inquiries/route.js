// API Route: Inquiries - GET, POST
import { NextResponse } from 'next/server';
import InquiryController from '@/controllers/inquiryController';

// GET /api/inquiries - Get all inquiries with optional filters
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    const filters = {};
    if (status) filters.status = status;
    if (search) filters.search = search;

    const result = await InquiryController.getAllInquiries(filters);

    if (!result.success) {
      return NextResponse.json(
        { message: result.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result.data
    });
  } catch (error) {
    console.error('Get inquiries API error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/inquiries - Create new inquiry
export async function POST(request) {
  try {
    const data = await request.json();

    const result = await InquiryController.createInquiry(data);

    if (!result.success) {
      return NextResponse.json(
        { 
          success: false,
          message: result.message,
          errors: result.errors 
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: result.message,
      data: result.data
    }, { status: 201 });
  } catch (error) {
    console.error('Create inquiry API error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
