"use client";
import React, { useState } from 'react';
import categories from '@/data/categories'; // Adjust path if needed
import products from '@/data/products';     // Adjust path if needed
import ProductCard from './ProductCard';

const OurProducts = () => {
    // State for the active filter. 'All' is default.
    const [activeCategory, setActiveCategory] = useState('All');

    // Filter logic
    const filteredProducts = (
        activeCategory === 'All'
            ? products
            : products.filter(product => product.categoryId === activeCategory)
    ).slice(0, 4);

    return (
        <section className="w-full py-20 sm:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
                    <div className="flex flex-col">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-16 h-[1px] bg-[#860000]"></div>
                            <span className="text-[#860000] text-sm font-semibold tracking-wider uppercase">
                                Our Products
                            </span>
                        </div>
                        <h2 style={{ fontFamily: 'Sooner, sans-serif' }} className="text-4xl sm:text-5xl text-gray-900 leading-tight">
                            Paper That Holds <span className="text-[#860000]"   >Meaning</span>
                        </h2>
                    </div>

                    <button className="bg-[#860000] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#680000] transition-colors flex items-center gap-2">
                        View All Products <span>&rarr;</span>
                    </button>
                </div>

                {/* Filter Pills */}
                <div className="flex flex-wrap items-center gap-3 mb-12">
                    {/* Static "All Products" Button */}
                    <button
                        onClick={() => setActiveCategory('All')}
                        className={`px-6 py-2.5 rounded-full text-sm font-medium transition-colors border ${activeCategory === 'All'
                                ? 'bg-[#860000] text-white border-[#860000]'
                                : 'bg-transparent text-gray-900 border-gray-900 hover:bg-gray-100'
                            }`}
                    >
                        All Products
                    </button>

                    {/* Dynamic Category Buttons */}
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setActiveCategory(category.id)}
                            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-colors border ${activeCategory === category.id
                                    ? 'bg-[#860000] text-white border-[#860000]'
                                    : 'bg-transparent text-gray-900 border-gray-900 hover:bg-gray-100'
                                }`}
                        >
                            {category.title}
                        </button>
                    ))}
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    ) : (
                        <div className="col-span-full py-10 text-center text-gray-500">
                            No products found in this category.
                        </div>
                    )}
                </div>

            </div>
        </section>
    );
};

export default OurProducts;