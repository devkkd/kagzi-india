"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';

const OurProducts = () => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [activeCategory, setActiveCategory] = useState('All');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCategories();
        fetchProducts();
    }, []);

    useEffect(() => {
        if (activeCategory !== 'All') {
            fetchProductsByCategory(activeCategory);
        } else {
            fetchProducts();
        }
    }, [activeCategory]);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('/api/categories');
            if (response.data.success) {
                const activeCategories = response.data.data.filter(cat => cat.isActive);
                setCategories(activeCategories);
            }
        } catch (err) {
            console.error('Failed to fetch categories:', err);
        }
    };

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/products');
            if (response.data.success) {
                const activeProducts = response.data.data
                    .filter(prod => prod.isActive)
                    .slice(0, 4);
                setProducts(activeProducts);
            }
        } catch (err) {
            console.error('Failed to fetch products:', err);
            setError('Failed to load products');
        } finally {
            setLoading(false);
        }
    };

    const fetchProductsByCategory = async (categoryId) => {
        try {
            setLoading(true);
            const response = await axios.get(`/api/products?categoryId=${categoryId}`);
            if (response.data.success) {
                const activeProducts = response.data.data
                    .filter(prod => prod.isActive)
                    .slice(0, 4);
                setProducts(activeProducts);
            }
        } catch (err) {
            console.error('Failed to fetch products by category:', err);
            setError('Failed to load products');
        } finally {
            setLoading(false);
        }
    };

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
                        <h2 style={{ fontFamily: 'Sooner, sans-serif' }} className="text-4xl sm:text-5xl text-gray-900 leading-tight">
                            Paper That Holds <span className="text-[#860000]">Meaning</span>
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
                            {category.name}
                        </button>
                    ))}
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#860000]"></div>
                    </div>
                )}

                {/* Error State */}
                {error && !loading && (
                    <div className="text-center py-20">
                        <p className="text-red-600 mb-4">{error}</p>
                        <button 
                            onClick={() => activeCategory === 'All' ? fetchProducts() : fetchProductsByCategory(activeCategory)}
                            className="bg-[#860000] text-white px-6 py-2 rounded-lg hover:bg-[#680000] transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {/* Products Grid */}
                {!loading && !error && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {products.length > 0 ? (
                            products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))
                        ) : (
                            <div className="col-span-full py-10 text-center text-gray-500">
                                No products found in this category.
                            </div>
                        )}
                    </div>
                )}

            </div>
        </section>
    );
};

export default OurProducts;