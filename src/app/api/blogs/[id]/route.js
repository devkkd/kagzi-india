// API Route: Single Blog - GET, PUT, DELETE
import { NextResponse } from 'next/server';
import BlogController from '@/controllers/blogController';

// GET /api/blogs/[id] - Get single blog details
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const result = await BlogController.getBlogByIdOrSlug(id);

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
    console.error('Get blog API error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/blogs/[id] - Update blog fields
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const data = await request.json();

    const result = await BlogController.updateBlog(id, data);

    if (!result.success) {
      return NextResponse.json(
        { message: result.message, errors: result.errors },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: result.message,
      data: result.data
    });
  } catch (error) {
    console.error('Update blog API error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/blogs/[id] - Delete blog post
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const result = await BlogController.deleteBlog(id);

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
    console.error('Delete blog API error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
