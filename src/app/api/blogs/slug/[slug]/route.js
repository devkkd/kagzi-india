// API Route: Blog by Slug
import { NextResponse } from 'next/server';
import BlogController from '@/controllers/blogController';

// GET /api/blogs/slug/[slug] - Get blog details by slug
export async function GET(request, { params }) {
  try {
    const { slug } = await params;
    const result = await BlogController.getBlogByIdOrSlug(slug);

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
    console.error('Get blog by slug API error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
