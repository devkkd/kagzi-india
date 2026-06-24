// API Route: Blogs - GET all, POST create
import { NextResponse } from 'next/server';
import BlogController from '@/controllers/blogController';

// GET /api/blogs - Get all blogs (supports filters: isActive, search)
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    
    const filters = {
      isActive: searchParams.get('isActive') === 'true' ? true : 
                searchParams.get('isActive') === 'false' ? false : undefined,
      category: searchParams.get('category') || undefined,
      search: searchParams.get('search') || undefined
    };

    const result = await BlogController.getAllBlogs(filters);

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
    console.error('Blogs GET API error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/blogs - Create new blog
export async function POST(request) {
  try {
    const data = await request.json();

    const result = await BlogController.createBlog(data);

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
    }, { status: 201 });
  } catch (error) {
    console.error('Create blog POST API error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
