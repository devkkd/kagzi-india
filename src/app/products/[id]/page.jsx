"use client";
import BrandPartners from '@/components/BrandPartners';
import CustomRange from '@/components/CustomRange';
import FAQ from '@/components/FAQ';
import QuoteSection from '@/components/QuoteSection';
import RelatedProducts from '@/components/RelatedProducts';
import SubmitProcess from '@/components/SubmitProcess';
import React, { useState } from 'react';

// Reusable component for the specification table rows
const SpecRow = ({ label, value }) => {
    if (!value) return null; // Hide row if data is missing
    return (
        <div className="flex py-3.5 border-b border-gray-200 text-sm leading-tight">
            <div className="w-1/2 text-gray-600 font-medium pr-4">{label}</div>
            <div className="w-1/2 font-bold text-gray-900">{value}</div>
        </div>
    );
};

const ProductDetailPage = ({ params }) => {
    // In a real app, you would fetch data using the params.id here.
    // This dummy data exactly mimics your provided Mongoose Schema.
    const product = {
        _id: params?.id || "sample-id",
        name: "Printed Corporate Gifts Diaries",
        price: 299,
        minimumOrderQuantity: 100,
        size: "A5",
        coverMaterial: "Paper Cover",
        bindingType: "Glue Bound",
        coverType: "Hard Cover",
        usageApplication: "Gifting",
        gsm: 75,
        coverPrint: "Printed",
        color: "Multicolor",
        images: [
            "/images/products/detail-main.png", // Replace with actual paths
            "/images/products/detail-thumb1.png",
            "/images/products/detail-thumb2.png",
            "/images/products/detail-thumb3.png",
            "/images/products/detail-thumb4.png",
        ]
    };

    // State for the Image Gallery
    const [activeImgIndex, setActiveImgIndex] = useState(0);

    const handleNext = () => {
        setActiveImgIndex((prev) => (prev + 1) % product.images.length);
    };

    const handlePrev = () => {
        setActiveImgIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
    };

    return (
        <>
            <main className="w-full min-h-screen py-10 lg:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">

                        {/* =========================================
              LEFT: IMAGE GALLERY
              ========================================= */}
                        <div className="w-full lg:w-3/5 flex flex-col-reverse lg:flex-row gap-4 lg:gap-6">

                            {/* Thumbnails */}
                            <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible w-full lg:w-24 shrink-0 hide-scrollbar pb-2 lg:pb-0">
                                {product.images.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setActiveImgIndex(index)}
                                        className={`w-20 lg:w-full aspect-[4/5] bg-gray-200 flex-shrink-0 overflow-hidden border-2 transition-all ${activeImgIndex === index ? 'border-[#860000]' : 'border-transparent opacity-70 hover:opacity-100'
                                            }`}
                                    >
                                        <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>

                            {/* Main Image */}
                            <div className="relative w-full aspect-square lg:aspect-[4/5] bg-gray-200 flex-1 overflow-hidden group">
                                <img
                                    src={product.images[activeImgIndex]}
                                    alt={product.name}
                                    className="w-full h-full object-cover transition-opacity duration-300"
                                />

                                {/* Image Navigation Arrows */}
                                <button
                                    onClick={handlePrev}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-md hover:bg-white text-gray-800 transition-all opacity-0 group-hover:opacity-100"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                                </button>
                                <button
                                    onClick={handleNext}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-md hover:bg-white text-gray-800 transition-all opacity-0 group-hover:opacity-100"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                </button>
                            </div>

                        </div>

                        {/* =========================================
              RIGHT: PRODUCT DETAILS
              ========================================= */}
                        <div className="w-full lg:w-2/5 flex flex-col">

                            {/* Title & Price */}
                            <h1
                                className="text-3xl sm:text-4xl lg:text-5xl text-gray-900 leading-[1.1] mb-6 font-bold tracking-tight"
                            >
                                {product.name}
                            </h1>

                            <div className="text-2xl font-bold text-gray-900 mb-8">
                                ₹ {product.price}/Piece
                            </div>

                            {/* Specification Table */}
                            <div className="flex flex-col mb-10 border-t border-gray-200">
                                <SpecRow label="Minimum Order Quantity" value={product.minimumOrderQuantity ? `${product.minimumOrderQuantity} Piece` : null} />
                                <SpecRow label="Size" value={product.size} />
                                <SpecRow label="Cover Material" value={product.coverMaterial} />
                                <SpecRow label="Binding Type" value={product.bindingType} />
                                <SpecRow label="Cover Type" value={product.coverType} />
                                <SpecRow label="Usage/Application" value={product.usageApplication} />
                                <SpecRow label="GSM" value={product.gsm} />
                                <SpecRow label="Cover Print" value={product.coverPrint} />
                                <SpecRow label="Color" value={product.color} />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button className="bg-[#171717] text-white px-8 py-3.5 rounded-full text-sm font-medium hover:bg-black transition-colors flex items-center justify-center gap-2">
                                    Custom Enquiry <span>&rarr;</span>
                                </button>

                                <button className="bg-[#00A859] text-white px-8 py-3.5 rounded-full text-sm font-medium hover:bg-[#00914c] transition-colors flex items-center justify-center gap-2">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12.031 21.036c-1.536 0-3.046-.413-4.368-1.192l-4.851 1.272 1.294-4.73A8.932 8.932 0 013.1 12.031c0-4.945 4.025-8.97 8.971-8.97 4.946 0 8.972 4.025 8.972 8.97 0 4.946-4.026 8.971-8.972 8.971zM12.031 4.542A7.488 7.488 0 004.542 12.03c0 1.488.384 2.94 1.118 4.228l-.759 2.774 2.839-.745a7.488 7.488 0 004.29 1.332c4.12 0 7.47-3.35 7.47-7.47 0-4.12-3.35-7.47-7.47-7.47zm3.99 10.33c-.218-.11-1.295-.64-1.496-.713-.201-.073-.347-.11-.493.11-.146.218-.566.712-.693.858-.128.146-.255.165-.473.055-.219-.11-.925-.342-1.76-1.085-.65-.578-1.09-1.292-1.218-1.511-.128-.219-.013-.338.096-.447.1-.1.219-.256.328-.383.11-.128.146-.219.219-.365.073-.146.036-.274-.018-.383-.055-.11-.493-1.188-.675-1.625-.178-.426-.358-.368-.493-.375-.128-.007-.274-.007-.42-.007-.146 0-.383.055-.584.274-.201.219-.766.748-.766 1.825 0 1.076.785 2.116.894 2.262.11.146 1.542 2.353 3.736 3.303.522.226.929.362 1.246.463.524.167 1.002.143 1.378.087.425-.064 1.295-.53 1.478-1.042.182-.511.182-.949.128-1.042-.055-.092-.201-.147-.42-.256z" />
                                    </svg>
                                    General Enquiry &rarr;
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
            <SubmitProcess/>
            <RelatedProducts/>
            <CustomRange />
            <BrandPartners />
            <QuoteSection />
            <FAQ />
        </>
    );
};

export default ProductDetailPage;