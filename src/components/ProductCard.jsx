'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import Toast from './Toast';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [showToast, setShowToast] = useState(false);
  
  const productUrl = `/products/${product.slug || product.id || product._id}`;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const cartItem = {
      id: product.id || product._id,
      name: product.title || product.name,
      size: product.size || null,
      mainImage: product.image || product.mainImage || (product.images && product.images[0]) || null,
      images: product.images || [],
      minimumOrderQuantity: product.minimumOrderQuantity
    };
    
    addToCart(cartItem);
    setShowToast(true);
  };

  return (
    <>
      <div className="flex flex-col group h-full">
        
        {/* Clickable Area linking to Product Detail Page */}
        <Link href={productUrl} className="flex flex-col flex-1 cursor-pointer">
          {/* Product Image */}
          <div className="w-full aspect-4/5 bg-[#e8e4e0] mb-5 overflow-hidden flex items-center justify-center relative rounded-lg">
            {product.image || product.mainImage || (product.images && product.images[0]) ? (
              <img 
                src={product.image || product.mainImage || product.images[0]} 
                alt={product.title || product.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <span className="text-gray-400 text-sm">No Image</span>
            )}
          </div>

          {/* Product Details */}
          <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight group-hover:text-[#860000] transition-colors">
            {product.title || product.name}
          </h3>
          
          <div className="text-sm text-gray-600 mb-4">
            {product.size && `Size ${product.size}`}
            {product.size && product.gsm && ' | '}
            {product.gsm && `GSM ${product.gsm}`}
            {!product.size && !product.gsm && product.minimumOrderQuantity && `MOQ: ${product.minimumOrderQuantity}`}
          </div>
        </Link>

        {/* Add to Cart Button */}
        <div className="mt-auto">
          <button
            onClick={handleAddToCart}
            className="w-full bg-[#860000] text-white py-2.5 rounded-lg font-medium hover:bg-[#680000] transition-colors flex items-center justify-center gap-2"
          >
            {/* <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg> */}
            Add to Inquiry
          </button>
        </div>
        
      </div>

      {showToast && (
        <Toast
          message={`${product.title || product.name} added to cart!`}
          onClose={() => setShowToast(false)}
        />
      )}
    </>
  );
};

export default ProductCard;