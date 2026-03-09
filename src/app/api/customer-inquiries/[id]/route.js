import { NextResponse } from 'next/server';
import { getCustomerInquiryById, updateCustomerInquiry, deleteCustomerInquiry } from '@/controllers/customerInquiryController';

// GET: Fetch single customer inquiry
export async function GET(req, { params }) {
  try {
    const { id } = await params;
    const result = await getCustomerInquiryById(id);

    if (!result.success) {
      return NextResponse.json(result, { status: 404 });
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}

// PUT: Update customer inquiry
export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const result = await updateCustomerInquiry(id, body);

    if (!result.success) {
      return NextResponse.json(result, { status: 400 });
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}

// DELETE: Delete customer inquiry
export async function DELETE(req, { params }) {
  try {
    const { id } = await params;
    const result = await deleteCustomerInquiry(id);

    if (!result.success) {
      return NextResponse.json(result, { status: 404 });
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}
