import { NextResponse } from 'next/server';
import { getAllCustomerInquiries, createCustomerInquiry } from '@/controllers/customerInquiryController';

// GET: Fetch all customer inquiries
export async function GET(req) {
  try {
    const result = await getAllCustomerInquiries(req);
    
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

// POST: Create new customer inquiry
export async function POST(req) {
  try {
    const body = await req.json();
    const result = await createCustomerInquiry(body);

    if (!result.success) {
      return NextResponse.json(result, { status: 400 });
    }

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}
