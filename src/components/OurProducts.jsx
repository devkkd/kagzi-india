"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import Link from 'next/link';

const OurProducts = () => {
    const [categories, setCategories] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [displayProducts, setDisplayProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        applyFilter();
    }, [selectedCategory, allProducts]);

    const loadData = async () => {
        try {
            setLoading(true);
            const [catRes, prodRes] = await Promise.all([
                axios.get('/api/categories'),
                axios.get('/api/products')
            ]);

            if (catRes.data.success) {
                setCategories(catRes.data.data.filter(c => c.isActive));
            }

            if (prodRes.data.success) {
                setAllProducts(prodRes.data.data);
            }
        } catch (error) {
            console.error('Error loading data:', error);
        } finally {
            setLoading(false);
        }
    };

    const applyFilter = () => {
        if (selectedCategory === 'All') {
            setDisplayProducts(allProducts.slice(0, 4));
        } else {
            const filtered = allProducts.filter(p => {
                const catId = p.categoryId?._id || p.categoryId;
                return String(catId) === String(selectedCategory);
            });
            setDisplayProducts(filtered.slice(0, 4));
        }
    };

    if (loading) {
        return (
            <section className="w-full py-20 sm:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#860000]"></div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="w-full py-20 sm:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
                    <div className="flex flex-col">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-16 h-px bg-[#860000]"></div>
                            <span className="text-[#860000] text-sm font-semibold tracking-wider uppercase">
                                Our Products
                            </span>
                        </div>
                        <h2 
                            style={{ fontFamily: 'Sooner, sans-serif' }} 
                            className="text-4xl sm:text-5xl text-gray-900 leading-tight"
                        >
                            Paper That Holds <span className="text-[#860000]">Meaning</span>
                        </h2>
                    </div>

                    <Link
                        href="/products"
                        className="bg-[#860000] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#680000] transition-colors flex items-center gap-2"
                    >
                        View All Products <span>&rarr;</span>
                    </Link>
                </div>

                <div className="flex flex-wrap items-center gap-3 mb-12">
                    <button
                        onClick={() => setSelectedCategory('All')}
                        style={{
                            backgroundColor: selectedCategory === 'All' ? '#860000' : '#ffffff',
                            color: selectedCategory === 'All' ? '#ffffff' : '#1f2937',
                            borderColor: selectedCategory === 'All' ? '#860000' : '#d1d5db'
                        }}
                        className="px-6 py-2.5 rounded-full text-sm font-medium border-2 transition-all"
                    >
                        All Products
                    </button>

                    {categories.map((cat, idx) => {
                        const categoryId = cat._id || cat.id;
                        const isActive = String(selectedCategory) === String(categoryId);
                        
                        return (
                            <button
                                key={categoryId || `cat-${idx}`}
                                onClick={() => setSelectedCategory(categoryId)}
                                style={{
                                    backgroundColor: isActive ? '#860000' : '#ffffff',
                                    color: isActive ? '#ffffff' : '#1f2937',
                                    borderColor: isActive ? '#860000' : '#d1d5db'
                                }}
                                className="px-6 py-2.5 rounded-full text-sm font-medium border-2 transition-all"
                            >
                                {cat.name}
                            </button>
                        );
                    })}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {displayProducts.length > 0 ? (
                        displayProducts.map((product, idx) => (
                            <ProductCard key={product._id || product.id || `prod-${idx}`} product={product} />
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
