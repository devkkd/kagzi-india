"use client";
import React, { useState } from 'react';
import categories from '@/data/categories';
import subCategories from '@/data/subCategories';
import products from '@/data/products';
import ProductCard from './ProductCard'; // Make sure the path matches your structure

const Shop = () => {
    // State for active filters
    const [activeCategory, setActiveCategory] = useState('All');
    const [activeSubCategory, setActiveSubCategory] = useState('All');

    // Handle clicking a main category
    const handleCategoryClick = (categoryId) => {
        setActiveCategory(categoryId);
        // Reset the subcategory filter whenever the main category changes
        setActiveSubCategory('All');
    };

    // 1. Get subcategories ONLY for the currently selected main category
    const currentSubCategories = activeCategory === 'All'
        ? []
        : subCategories.filter(sub => sub.categoryId === activeCategory);

    // 2. Filter the products based on both category and subcategory selections
    const filteredProducts = products.filter(product => {
        if (activeCategory === 'All') return true; // Show all if 'All Products' is selected

        if (activeSubCategory === 'All') {
            // If a main category is selected but no specific subcategory, show all in that main category
            return product.categoryId === activeCategory;
        }

        // If both are selected, filter strictly by the subcategory
        return product.subCategoryId === activeSubCategory;
    });

    return (
        <section className="w-full py-20 sm:py-24 bg-transparent">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* =========================================
            HEADER SECTION
            ========================================= */}
                <div className="flex flex-col lg:flex-row justify-between items-start mb-12 gap-8">

                    {/* Left: Title */}
                    <div className="flex flex-col flex-1">
                        <span className="text-sm leading-tight text-gray-900 mb-4 font-medium uppercase tracking-wider">
                            Our Products
                        </span>
                        <h2
                            className="text-3xl sm:text-4xl lg:text-5xl text-gray-900 leading-[1.2]"
                            style={{ fontFamily: 'Sooner, sans-serif' }}
                        >
                            Paper That Holds <span className="text-[#860000]">Meaning</span>
                        </h2>
                    </div>

                    {/* Right: Description */}
                    <div className="flex-1 lg:max-w-md lg:pt-8">
                        <p className="text-sm leading-tight text-gray-900">
                            Six categories. <span className="font-bold">120+ SKUs.</span> Every product made by hand, available for custom order, and built for businesses that understand the value of materials.
                        </p>
                    </div>

                </div>

                {/* =========================================
            FILTER PILLS
            ========================================= */}
                <div className="flex flex-col gap-4 mb-12">

                    {/* Row 1: Main Categories */}
                    <div className="flex flex-wrap items-center gap-3">
                        <button
                            onClick={() => handleCategoryClick('All')}
                            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-colors border whitespace-nowrap ${activeCategory === 'All'
                                ? 'bg-[#860000] text-white border-[#860000]'
                                : 'bg-transparent text-gray-900 border-gray-900 hover:bg-gray-100'
                                }`}
                        >
                            All Products
                        </button>

                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => handleCategoryClick(category.id)}
                                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-colors border whitespace-nowrap ${activeCategory === category.id
                                    ? 'bg-[#860000] text-white border-[#860000]'
                                    : 'bg-transparent text-gray-900 border-gray-900 hover:bg-gray-100'
                                    }`}
                            >
                                {category.title}
                            </button>
                        ))}
                    </div>

                    {/* Row 2: Subcategories (Only visible if a main category is selected) */}
                    {currentSubCategories.length > 0 && (
                        <div className="flex flex-wrap items-center gap-3 pl-2 sm:pl-4 border-l-2 border-[#860000] animate-fade-in">

                            <button
                                onClick={() => setActiveSubCategory('All')}
                                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors border whitespace-nowrap ${activeSubCategory === 'All'
                                    ? 'bg-[#860000] text-white border-[#860000]'
                                    : 'bg-transparent text-gray-900 border-gray-900 hover:bg-gray-100'
                                    }`}
                            >
                                All in {categories.find(c => c.id === activeCategory)?.title}
                            </button>

                            {currentSubCategories.map((sub) => (
                                <button
                                    key={sub.id}
                                    onClick={() => setActiveSubCategory(sub.id)}
                                    className={`px-5 py-2 rounded-full text-sm font-medium transition-colors border whitespace-nowrap ${activeSubCategory === sub.id
                                        ? 'bg-[#860000] text-white border-[#860000]'
                                        : 'bg-transparent text-gray-900 border-gray-900 hover:bg-gray-100'
                                        }`}
                                >
                                    {sub.title}
                                </button>
                            ))}
                        </div>
                    )}

                </div>

                {/* =========================================
            PRODUCTS GRID
            ========================================= */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    ) : (
                        <div className="col-span-full py-16 text-center text-gray-500 font-medium">
                            No products found for this category.
                        </div>
                    )}
                </div>

            </div>
        </section>
    );
};

export default Shop;