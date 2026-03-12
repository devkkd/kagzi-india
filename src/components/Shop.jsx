"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';

const Shop = () => {
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [activeCategory, setActiveCategory] = useState('All');
    const [activeSubCategory, setActiveSubCategory] = useState('All');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchInitialData();
    }, []);

    useEffect(() => {
        if (activeCategory !== 'All') {
            fetchSubcategories(activeCategory);
            fetchProductsByCategory(activeCategory);
        } else {
            setSubCategories([]);
            fetchAllProducts();
        }
    }, [activeCategory]);

    useEffect(() => {
        if (activeSubCategory !== 'All' && activeCategory !== 'All') {
            fetchProductsBySubcategory(activeSubCategory);
        } else if (activeCategory !== 'All') {
            fetchProductsByCategory(activeCategory);
        }
    }, [activeSubCategory]);

    const fetchInitialData = async () => {
        try {
            setLoading(true);
            const [categoriesRes, productsRes] = await Promise.all([
                axios.get('/api/categories'),
                axios.get('/api/products')
            ]);

            if (categoriesRes.data.success) {
                const activeCategories = categoriesRes.data.data.filter(cat => cat.isActive);
                setCategories(activeCategories);
            }

            if (productsRes.data.success) {
                const activeProducts = productsRes.data.data.filter(prod => prod.isActive);
                setProducts(activeProducts);
            }
        } catch (err) {
            console.error('Failed to fetch initial data:', err);
            setError('Failed to load products');
        } finally {
            setLoading(false);
        }
    };

    const fetchSubcategories = async (categoryId) => {
        try {
            const response = await axios.get(`/api/subcategories?categoryId=${categoryId}`);
            if (response.data.success) {
                const activeSubs = response.data.data.filter(sub => sub.isActive);
                setSubCategories(activeSubs);
            }
        } catch (err) {
            console.error('Failed to fetch subcategories:', err);
        }
    };

    const fetchAllProducts = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/products');
            if (response.data.success) {
                const activeProducts = response.data.data.filter(prod => prod.isActive);
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
                const activeProducts = response.data.data.filter(prod => prod.isActive);
                setProducts(activeProducts);
            }
        } catch (err) {
            console.error('Failed to fetch products by category:', err);
            setError('Failed to load products');
        } finally {
            setLoading(false);
        }
    };

    const fetchProductsBySubcategory = async (subcategoryId) => {
        try {
            setLoading(true);
            const response = await axios.get(`/api/products?subcategoryId=${subcategoryId}`);
            if (response.data.success) {
                const activeProducts = response.data.data.filter(prod => prod.isActive);
                setProducts(activeProducts);
            }
        } catch (err) {
            console.error('Failed to fetch products by subcategory:', err);
            setError('Failed to load products');
        } finally {
            setLoading(false);
        }
    };

    const handleCategoryClick = (categoryId) => {
        setActiveCategory(categoryId);
        setActiveSubCategory('All');
    };

    const currentCategoryName = categories.find(c => c.id === activeCategory)?.name || '';

    return (
        <section className="w-full py-20 sm:py-24 bg-transparent">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* HEADER SECTION */}
                <div className="flex flex-col lg:flex-row justify-between items-start mb-12 gap-8">
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

                    <div className="flex-1 lg:max-w-md lg:pt-8">
                        <p className="text-sm leading-tight text-gray-900">
                            {categories.length} categories. <span className="font-bold">{products.length}+ products.</span> Every product made by hand, available for custom order, and built for businesses that understand the value of materials.
                        </p>
                    </div>
                </div>

                {/* FILTER PILLS */}
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
                                {category.name}
                            </button>
                        ))}
                    </div>

                    {/* Row 2: Subcategories */}
                    {subCategories.length > 0 && (
                        <div className="flex flex-wrap items-center gap-3 pl-2 sm:pl-4 border-l-2 border-[#860000]">
                            <button
                                onClick={() => setActiveSubCategory('All')}
                                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors border whitespace-nowrap ${activeSubCategory === 'All'
                                    ? 'bg-[#860000] text-white border-[#860000]'
                                    : 'bg-transparent text-gray-900 border-gray-900 hover:bg-gray-100'
                                    }`}
                            >
                                All in {currentCategoryName}
                            </button>

                            {subCategories.map((sub) => (
                                <button
                                    key={sub.id}
                                    onClick={() => setActiveSubCategory(sub.id)}
                                    className={`px-5 py-2 rounded-full text-sm font-medium transition-colors border whitespace-nowrap ${activeSubCategory === sub.id
                                        ? 'bg-[#860000] text-white border-[#860000]'
                                        : 'bg-transparent text-gray-900 border-gray-900 hover:bg-gray-100'
                                        }`}
                                >
                                    {sub.name}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* LOADING STATE */}
                {loading && (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#860000]"></div>
                    </div>
                )}

                {/* ERROR STATE */}
                {error && !loading && (
                    <div className="text-center py-20">
                        <p className="text-red-600 mb-4">{error}</p>
                        <button 
                            onClick={fetchInitialData}
                            className="bg-[#860000] text-white px-6 py-2 rounded-lg hover:bg-[#680000] transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {/* PRODUCTS GRID */}
                {!loading && !error && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-8">
                        {products.length > 0 ? (
                            products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))
                        ) : (
                            <div className="col-span-full py-16 text-center text-gray-500 font-medium">
                                No products found for this category.
                            </div>
                        )}
                    </div>
                )}

            </div>
        </section>
    );
};

export default Shop;