// Server Component - No 'use client' directive
import ProductCard from './ProductCard';

const RelatedProducts = ({ products }) => {
  // Don't render if no products
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="w-full py-20 sm:py-24 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Heading */}
        <h2 
          className="text-3xl sm:text-4xl lg:text-5xl text-gray-900 leading-[1.2] mb-12"
          style={{ fontFamily: 'Sooner, sans-serif' }}
        >
          Product You Like <span className="text-[#860000]">Also</span>
        </h2>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default RelatedProducts;