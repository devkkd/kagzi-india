'use client';
import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import Toast from '@/components/Toast';
import { FiShoppingCart } from 'react-icons/fi';

// Reusable component for the specification table rows
const SpecRow = ({ label, value }) => {
    if (!value) return null;
    return (
        <div className="flex py-3.5 border-b border-gray-200 text-sm leading-tight">
            <div className="w-1/2 text-gray-600 font-medium pr-4">{label}</div>
            <div className="w-1/2 font-bold text-gray-900">{value}</div>
        </div>
    );
};

const ProductDetailClient = ({ product }) => {
    const { addToCart } = useCart();
    const [activeImgIndex, setActiveImgIndex] = useState(0);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const handleNext = () => {
        if (product?.images?.length) {
            setActiveImgIndex((prev) => (prev + 1) % product.images.length);
        }
    };

    const handlePrev = () => {
        if (product?.images?.length) {
            setActiveImgIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
        }
    };

    const handleAddToCart = () => {
        if (!product) return;
        
        const cartItem = {
            id: product._id,
            name: product.name,
            size: product.size || null,
            mainImage: product.images?.[0] || null,
            images: product.images || [],
            minimumOrderQuantity: product.minimumOrderQuantity
        };
        
        addToCart(cartItem, 1);
        setToastMessage(`${product.name} added to cart!`);
        setShowToast(true);
    };

    const productImages = product.images && product.images.length > 0 
        ? product.images 
        : ['/images/placeholder.png'];

    return (
        <>
            <main className="w-full min-h-screen py-10 lg:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">

                        {/* LEFT: IMAGE GALLERY */}
                        <div className="w-full lg:w-3/5 flex flex-col-reverse lg:flex-row gap-4 lg:gap-6">

                            {/* Thumbnails */}
                            <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible w-full lg:w-24 shrink-0 hide-scrollbar pb-2 lg:pb-0">
                                {productImages.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setActiveImgIndex(index)}
                                        className={`w-20 lg:w-full aspect-4/5 bg-gray-200 shrink-0 overflow-hidden border-2 transition-all rounded-lg ${
                                            activeImgIndex === index 
                                                ? 'border-[#860000]' 
                                                : 'border-transparent opacity-70 hover:opacity-100'
                                        }`}
                                    >
                                        <img 
                                            src={img} 
                                            alt={`${product.name} - Image ${index + 1}`} 
                                            className="w-full h-full object-cover" 
                                        />
                                    </button>
                                ))}
                            </div>

                            {/* Main Image */}
                            <div className="relative w-full aspect-square lg:aspect-4/5 bg-gray-200 flex-1 overflow-hidden group rounded-lg">
                                <img
                                    src={productImages[activeImgIndex]}
                                    alt={product.name}
                                    className="w-full h-full object-cover transition-opacity duration-300"
                                />

                                {/* Image Navigation Arrows */}
                                {productImages.length > 1 && (
                                    <>
                                        <button
                                            onClick={handlePrev}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-md hover:bg-white text-gray-800 transition-all opacity-0 group-hover:opacity-100"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={handleNext}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-md hover:bg-white text-gray-800 transition-all opacity-0 group-hover:opacity-100"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </>
                                )}
                            </div>

                        </div>

                        {/* RIGHT: PRODUCT DETAILS */}
                        <div className="w-full lg:w-2/5 flex flex-col">

                            {/* Category & Subcategory */}
                            {(product.category || product.subcategory) && (
                                <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                                    {product.category && (
                                        <span className="text-[#860000] font-medium">{product.category.name}</span>
                                    )}
                                    {product.category && product.subcategory && <span>/</span>}
                                    {product.subcategory && (
                                        <span>{product.subcategory.name}</span>
                                    )}
                                </div>
                            )}

                            {/* Title */}
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl text-gray-900 leading-[1.1] mb-6 font-bold tracking-tight">
                                {product.name}
                            </h1>

                            {product.minimumOrderQuantity && (
                                <p className="text-sm text-gray-600 mb-8">
                                    Minimum Order: {product.minimumOrderQuantity} Pieces
                                </p>
                            )}

                            {/* Description */}
                            {product.description && (
                                <div className="mb-8">
                                    <p className="text-gray-700 leading-relaxed">{product.description}</p>
                                </div>
                            )}

                            {/* Specification Table */}
                            <div className="flex flex-col mb-10 border-t border-gray-200">
                                {/* <SpecRow label="SKU" value={product.sku} /> */}
                                <SpecRow label="Size" value={product.size} />
                                <SpecRow label="Cover Material" value={product.coverMaterial} />
                                <SpecRow label="Binding Type" value={product.bindingType} />
                                <SpecRow label="Cover Type" value={product.coverType} />
                                <SpecRow label="Usage/Application" value={product.usageApplication} />
                                <SpecRow label="GSM" value={product.gsm} />
                                <SpecRow label="Cover Print" value={product.coverPrint} />
                                <SpecRow label="Color" value={product.color} />
                                <SpecRow label="Stock Available" value={product.stock > 0 ? `${product.stock} units` : 'Out of Stock'} />
                            </div>

                            {/* Features */}
                            {product.features && product.features.length > 0 && (
                                <div className="mb-8">
                                    <h3 className="text-lg font-bold text-gray-900 mb-3">Features</h3>
                                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                                        {product.features.map((feature, index) => (
                                            <li key={index}>{feature}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex flex-row gap-4 mb-6">
                                <button 
                                    onClick={handleAddToCart}
                                    className="bg-[#860000] text-white px-8 py-3.5 rounded-full text-sm font-medium hover:bg-[#680000] transition-colors flex items-center justify-center gap-2"
                                >
                                    <FiShoppingCart size={18} />
                                    Add to Cart
                                </button>

                                <button className="bg-[#00A859] text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-[#00914c] transition-colors flex items-center justify-center gap-2">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12.031 21.036c-1.536 0-3.046-.413-4.368-1.192l-4.851 1.272 1.294-4.73A8.932 8.932 0 013.1 12.031c0-4.945 4.025-8.97 8.971-8.97 4.946 0 8.972 4.025 8.972 8.97 0 4.946-4.026 8.971-8.972 8.971zM12.031 4.542A7.488 7.488 0 004.542 12.03c0 1.488.384 2.94 1.118 4.228l-.759 2.774 2.839-.745a7.488 7.488 0 004.29 1.332c4.12 0 7.47-3.35 7.47-7.47 0-4.12-3.35-7.47-7.47-7.47zm3.99 10.33c-.218-.11-1.295-.64-1.496-.713-.201-.073-.347-.11-.493.11-.146.218-.566.712-.693.858-.128.146-.255.165-.473.055-.219-.11-.925-.342-1.76-1.085-.65-.578-1.09-1.292-1.218-1.511-.128-.219-.013-.338.096-.447.1-.1.219-.256.328-.383.11-.128.146-.219.219-.365.073-.146.036-.274-.018-.383-.055-.11-.493-1.188-.675-1.625-.178-.426-.358-.368-.493-.375-.128-.007-.274-.007-.42-.007-.146 0-.383.055-.584.274-.201.219-.766.748-.766 1.825 0 1.076.785 2.116.894 2.262.11.146 1.542 2.353 3.736 3.303.522.226.929.362 1.246.463.524.167 1.002.143 1.378.087.425-.064 1.295-.53 1.478-1.042.182-.511.182-.949.128-1.042-.055-.092-.201-.147-.42-.256z" />
                                    </svg>
                                    WhatsApp Enquiry
                                </button>
                            </div>

                        </div>
                    </div>

                </div>

                {/* Hide scrollbar for mobile thumbnail list */}
                <style jsx>{`
                    .hide-scrollbar::-webkit-scrollbar {
                        display: none;
                    }
                    .hide-scrollbar {
                        -ms-overflow-style: none;
                        scrollbar-width: none;
                    }
                `}</style>
            </main>

            {showToast && (
                <Toast
                    message={toastMessage}
                    onClose={() => setShowToast(false)}
                />
            )}
        </>
    );
};

export default ProductDetailClient;
