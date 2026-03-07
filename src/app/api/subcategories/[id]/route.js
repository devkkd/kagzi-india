// API Route: Single Subcategory - GET, PUT, DELETE
import { NextResponse } from 'next/server';
import SubcategoryController from '@/controllers/subcategoryController';

// GET /api/subcategories/[id] - Get single subcategory
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const result = await SubcategoryController.getSubcategoryById(id);

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
    console.error('Get subcategory API error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/subcategories/[id] - Update subcategory
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const data = await request.json();

    const result = await SubcategoryController.updateSubcategory(id, data);

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
    console.error('Update subcategory API error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/subcategories/[id] - Delete subcategory
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const result = await SubcategoryController.deleteSubcategory(id);

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
    console.error('Delete subcategory API error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
