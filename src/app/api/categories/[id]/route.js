// API Route: Single Category - GET, PUT, DELETE
import { NextResponse } from 'next/server';
import CategoryController from '@/controllers/categoryController';

// GET /api/categories/[id] - Get single category
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const result = await CategoryController.getCategoryById(id);

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
    console.error('Get category API error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/categories/[id] - Update category
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const data = await request.json();

    const result = await CategoryController.updateCategory(id, data);

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
    console.error('Update category API error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/categories/[id] - Delete category
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const result = await CategoryController.deleteCategory(id);

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
    console.error('Delete category API error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
