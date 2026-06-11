import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import Category from '@/models/Category';
import Subcategory from '@/models/Subcategory';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q')?.trim();

    if (!q || q.length < 2) {
      return NextResponse.json({ success: true, data: { products: [], categories: [], subcategories: [] } });
    }

    await connectDB();

    const regex = new RegExp(q, 'i');

    const [products, categories, subcategories] = await Promise.all([
      Product.find({
        isActive: true,
        $or: [
          { name: regex },
          { description: regex },
          { tags: regex },
          { size: regex },
          { color: regex },
        ]
      })
        .select('_id name slug images size gsm')
        .limit(5)
        .lean(),

      Category.find({ isActive: true, name: regex })
        .select('_id name slug')
        .limit(3)
        .lean(),

      Subcategory.find({ isActive: true, name: regex })
        .select('_id name slug categoryId')
        .populate('categoryId', '_id name slug')
        .limit(3)
        .lean(),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        products: products.map(p => ({
          id: p._id.toString(),
          name: p.name,
          slug: p.slug,
          image: p.images?.[0] || null,
          size: p.size,
          gsm: p.gsm,
          type: 'product'
        })),
        categories: categories.map(c => ({
          id: c._id.toString(),
          name: c.name,
          slug: c.slug,
          type: 'category'
        })),
        subcategories: subcategories.map(s => ({
          id: s._id.toString(),
          name: s.name,
          slug: s.slug,
          categoryId: s.categoryId?._id?.toString(),
          categoryName: s.categoryId?.name,
          type: 'subcategory'
        })),
      }
    });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json({ success: false, message: 'Search failed' }, { status: 500 });
  }
}
