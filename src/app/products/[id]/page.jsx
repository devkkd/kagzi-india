import BrandPartners from '@/components/BrandPartners';
import CustomRange from '@/components/CustomRange';
import FAQ from '@/components/FAQ';
import QuoteSection from '@/components/QuoteSection';
import RelatedProducts from '@/components/RelatedProducts';
import SubmitProcess from '@/components/SubmitProcess';
import ProductDetailClient from './ProductDetailClient';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';

// Server Component
const ProductDetailPage = async ({ params }) => {
    const { id } = await params;
    
    try {
        await connectDB();
        
        // Fetch product by slug or ID
        const query = id.match(/^[0-9a-fA-F]{24}$/) 
            ? { _id: id }
            : { slug: id };
        
        const product = await Product.findOne(query)
            .populate('categoryId', '_id name slug')
            .populate('subcategoryId', '_id name slug')
            .lean();
        
        if (!product) {
            return (
                <main className="w-full min-h-screen py-10 lg:py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center py-20">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
                            <p className="text-gray-600 mb-6">The product you are looking for does not exist.</p>
                            <a 
                                href="/products"
                                className="inline-block bg-[#860000] text-white px-6 py-3 rounded-lg hover:bg-[#680000] transition-colors"
                            >
                                Back to Products
                            </a>
                        </div>
                    </div>
                </main>
            );
        }
        
        // Convert to plain object and serialize
        const productData = {
            _id: product._id.toString(),
            name: product.name,
            description: product.description,
            price: product.price,
            images: product.images || [],
            size: product.size,
            coverMaterial: product.coverMaterial,
            bindingType: product.bindingType,
            coverType: product.coverType,
            usageApplication: product.usageApplication,
            gsm: product.gsm,
            coverPrint: product.coverPrint,
            color: product.color,
            stock: product.stock,
            minimumOrderQuantity: product.minimumOrderQuantity,
            features: product.features || [],
            category: product.categoryId ? {
                _id: product.categoryId._id.toString(),
                name: product.categoryId.name,
                slug: product.categoryId.slug
            } : null,
            subcategory: product.subcategoryId ? {
                _id: product.subcategoryId._id.toString(),
                name: product.subcategoryId.name,
                slug: product.subcategoryId.slug
            } : null
        };
        
        // Fetch related products
        let relatedProducts = [];
        try {
            const categoryId = product.categoryId?._id;
            console.log('Fetching related products for categoryId:', categoryId);
            
            if (categoryId) {
                // Get products from same category
                const categoryProducts = await Product.find({ 
                    categoryId: categoryId,
                    _id: { $ne: product._id },
                    isActive: true
                })
                .select('_id name price images size gsm minimumOrderQuantity slug')
                .limit(4)
                .lean();
                
                console.log('Category products found:', categoryProducts.length);
                
                relatedProducts = categoryProducts.map(p => ({
                    _id: p._id.toString(),
                    name: p.name,
                    price: p.price,
                    images: p.images || [],
                    size: p.size,
                    gsm: p.gsm,
                    minimumOrderQuantity: p.minimumOrderQuantity,
                    slug: p.slug
                }));
            }
            
            // If no products from same category, get any products
            if (relatedProducts.length === 0) {
                console.log('No category products, fetching all products');
                const allProducts = await Product.find({ 
                    _id: { $ne: product._id },
                    isActive: true
                })
                .select('_id name price images size gsm minimumOrderQuantity slug')
                .limit(4)
                .lean();
                
                console.log('All products found:', allProducts.length);
                
                relatedProducts = allProducts.map(p => ({
                    _id: p._id.toString(),
                    name: p.name,
                    price: p.price,
                    images: p.images || [],
                    size: p.size,
                    gsm: p.gsm,
                    minimumOrderQuantity: p.minimumOrderQuantity,
                    slug: p.slug
                }));
            }
            
            console.log('Final related products count:', relatedProducts.length);
        } catch (error) {
            console.error('Failed to fetch related products:', error);
        }

        return (
            <>
                <ProductDetailClient product={productData} />
                <SubmitProcess/>
                <RelatedProducts products={relatedProducts} />
                <CustomRange />
                <BrandPartners />
                <QuoteSection />
                <FAQ />
            </>
        );
    } catch (error) {
        console.error('Product page error:', error);
        return (
            <main className="w-full min-h-screen py-10 lg:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center py-20">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Product</h2>
                        <p className="text-gray-600 mb-6">Something went wrong. Please try again later.</p>
                        <a 
                            href="/products"
                            className="inline-block bg-[#860000] text-white px-6 py-3 rounded-lg hover:bg-[#680000] transition-colors"
                        >
                            Back to Products
                        </a>
                    </div>
                </div>
            </main>
        );
    }
};

export default ProductDetailPage;

