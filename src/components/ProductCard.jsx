import React from 'react';
import Link from 'next/link';
import EnquiryButton from './EnquiryButton';

const ProductCard = ({ product }) => {
  // Use product.id, product._id, or product.slug for the dynamic route
  const productUrl = `/products/${product.slug || product.id || product._id}`;

  return (
    <div className="flex flex-col group h-full">
      
      {/* Clickable Area linking to Product Detail Page */}
      <Link href={productUrl} className="flex flex-col flex-1 cursor-pointer">
        {/* Product Image Placeholder */}
        <div className="w-full aspect-[4/5] bg-[#e8e4e0] mb-5 overflow-hidden flex items-center justify-center relative">
          {product.image || (product.images && product.images[0]) ? (
            <img 
              src={product.image || product.images[0]} 
              alt={product.title || product.name} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <span className="text-gray-400 text-sm">Image Placeholder</span>
          )}
        </div>

        {/* Product Details */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight group-hover:text-[#860000] transition-colors">
          {product.title || product.name}
        </h3>
        
        <div className="text-sm font-medium text-gray-900 mb-1">
          ₹ {product.price}/{product.unit || 'Piece'}
        </div>
        
        <div className="text-sm text-gray-600 mb-4">
          Size {product.size} | GSM {product.gsm}
        </div>
      </Link>

      {/* Action Button */}
      <div className="mt-auto">
        <EnquiryButton productId={product.id || product._id} />
      </div>
      
    </div>
  );
};

export default ProductCard;