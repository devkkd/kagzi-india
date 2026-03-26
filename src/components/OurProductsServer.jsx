// Server Component - Static Display (No Filtering)
import connectDB from '@/lib/mongodb';
import Category from '@/models/Category';
import Product from '@/models/Product';
import ProductCard from './ProductCard';
import Link from 'next/link';

/**
 * OurProductsServer Component - Server-Side Rendering
 * 
 * FLOW:
 * 1. Server pe component render hota hai
 * 2. Database se categories aur products fetch hote hain
 * 3. Data serialize hota hai (plain objects)
 * 4. HTML generate hota hai with data
 * 5. Client ko complete HTML bheja jata hai
 * 6. No JavaScript needed for display
 * 
 * WHY SERVER-SIDE:
 * - Faster initial page load
 * - Better SEO (content already in HTML)
 * - No loading states needed
 * - Reduced JavaScript bundle size
 * 
 * LIMITATION:
 * - No interactive filtering (static display)
 * - To add filtering, need to convert to client component
 */

const OurProductsServer = async () => {
    let categories = [];
    let products = [];

    try {
        await connectDB();

        // Fetch categories
        const dbCategories = await Category.find({ isActive: true })
            .select('_id name slug')
            .lean();

        categories = dbCategories.map(cat => ({
            _id: cat._id.toString(),
            name: cat.name,
            slug: cat.slug
        }));

        // Fetch products (limit to 4)
        const dbProducts = await Product.find({ isActive: true })
            .select('_id name price images size gsm minimumOrderQuantity slug')
            .limit(4)
            .lean();

        products = dbProducts.map(p => ({
            _id: p._id.toString(),
            name: p.name,
            price: p.price,
            images: p.images || [],
            size: p.size,
            gsm: p.gsm,
            minimumOrderQuantity: p.minimumOrderQuantity,
            slug: p.slug
        }));

    } catch (error) {
        console.error('Failed to fetch data:', error);
    }

    return (
        <section className="w-full py-20 sm:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
                    <div className="flex flex-col">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-16 h-px bg-[#860000]"></div>
                            <span className="text-[#860000] text-sm font-semibold tracking-wider uppercase">
                                Our Products
                            </span>
                        </div>
                        <h2 
                            style={{ fontFamily: 'MainFont, sans-serif' }} 
                            className="text-4xl sm:text-5xl text-gray-900 leading-tight"
                        >
                            Paper That Holds <span className="text-[#860000]">Meaning</span>
                        </h2>
                    </div>

                    <Link
                        href="/products"
                        className="bg-[#860000] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#680000] transition-colors flex items-center gap-2"
                    >
                        View All Products <span>&rarr;</span>
                    </Link>
                </div>

                {/* Category Links (Static - No Filtering) */}
                <div className="flex flex-wrap items-center gap-3 mb-12">
                    <Link
                        href="/products"
                        className="px-6 py-2.5 rounded-full text-sm font-medium transition-colors border bg-[#860000] text-white border-[#860000]"
                    >
                        All Products
                    </Link>

                    {categories.map((category) => (
                        <Link
                            key={category._id}
                            href={`/products?category=${category.slug}`}
                            className="px-6 py-2.5 rounded-full text-sm font-medium transition-colors border bg-transparent text-gray-900 border-gray-900 hover:bg-gray-100"
                        >
                            {category.name}
                        </Link>
                    ))}
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))
                    ) : (
                        <div className="col-span-full py-10 text-center text-gray-500">
                            No products available at the moment.
                        </div>
                    )}
                </div>

            </div>
        </section>
    );
};

export default OurProductsServer;
