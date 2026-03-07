import React from 'react';
import EnquiryButton from './EnquiryButton';

const ProductCard = ({ product }) => {
  return (
    <div className="flex flex-col group">
      {/* Product Image */}
      <div className="w-full aspect-4/5 bg-[#e8e4e0] mb-5 overflow-hidden flex items-center justify-center rounded-lg">
        {product.mainImage || (product.images && product.images.length > 0) ? (
          <img 
            src={product.mainImage || product.images[0]} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <span className="text-gray-400 text-sm">No Image</span>
        )}
      </div>

      {/* Product Details */}
      <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">
        {product.name}
      </h3>
      
      <div className="text-sm font-medium text-gray-900 mb-1">
        ₹ {product.price}/Piece
      </div>
      
      <div className="text-sm text-gray-600 mb-2">
        {product.size && `Size ${product.size}`}
        {product.size && product.gsm && ' | '}
        {product.gsm && `GSM ${product.gsm}`}
        {!product.size && !product.gsm && 'MOQ: ' + product.minimumOrderQuantity}
      </div>

      {/* Render the separated Client Component */}
      <EnquiryButton productId={product.id} />
    </div>
  );
};

export default ProductCard;