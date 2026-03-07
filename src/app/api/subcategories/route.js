// API Route: Subcategories - GET all, POST create
import { NextResponse } from 'next/server';
import SubcategoryController from '@/controllers/subcategoryController';

// GET /api/subcategories - Get all subcategories
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    
    const filters = {
      categoryId: searchParams.get('categoryId') || undefined,
      isActive: searchParams.get('isActive') === 'true' ? true : 
                searchParams.get('isActive') === 'false' ? false : undefined
    };

    const result = await SubcategoryController.getAllSubcategories(filters);

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
    console.error('Subcategories API error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/subcategories - Create new subcategory
export async function POST(request) {
  try {
    const data = await request.json();

    const result = await SubcategoryController.createSubcategory(data);

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
    console.error('Create subcategory API error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
