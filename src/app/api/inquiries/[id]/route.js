// API Route: Single Inquiry - GET, PUT, DELETE
import { NextResponse } from 'next/server';
import InquiryController from '@/controllers/inquiryController';

// GET /api/inquiries/[id] - Get single inquiry
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const result = await InquiryController.getInquiryById(id);

    if (!result.success) {
      return NextResponse.json(
        { message: result.message },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result.data
    });
  } catch (error) {
    console.error('Get inquiry API error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/inquiries/[id] - Update inquiry
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const data = await request.json();

    const result = await InquiryController.updateInquiry(id, data);

    if (!result.success) {
      return NextResponse.json(
        { message: result.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: result.message,
      data: result.data
    });
  } catch (error) {
    console.error('Update inquiry API error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/inquiries/[id] - Delete inquiry
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const result = await InquiryController.deleteInquiry(id);

    if (!result.success) {
      return NextResponse.json(
        { message: result.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: result.message
    });
  } catch (error) {
    console.error('Delete inquiry API error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
