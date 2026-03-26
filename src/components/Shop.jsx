"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import { useSearchParams, useRouter } from 'next/navigation';

const Shop = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [products, setProducts] = useState([]);

    const [activeCategory, setActiveCategory] = useState('All');
    const [activeSubCategory, setActiveSubCategory] = useState('All');

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [isReady, setIsReady] = useState(false); // 🔥 IMPORTANT

    // ✅ URL → STATE SYNC (FIRST THING)
    useEffect(() => {
        const category = searchParams.get('category') || 'All';
        const subcategory = searchParams.get('subcategory') || 'All';

        setActiveCategory(category);
        setActiveSubCategory(subcategory);

        setIsReady(true); // 🔥 NOW we allow fetching
    }, [searchParams]);

    // ✅ FETCH CATEGORIES
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get('/api/categories');
                if (res.data.success) {
                    setCategories(res.data.data.filter(cat => cat.isActive));
                }
            } catch (err) {
                console.error(err);
            }
        };

        fetchCategories();
    }, []);

    // ✅ FETCH SUBCATEGORIES
    useEffect(() => {
        if (!isReady) return; // 🔥 block early execution

        if (activeCategory === 'All') {
            setSubCategories([]);
            return;
        }

        const fetchSubs = async () => {
            try {
                const res = await axios.get(`/api/subcategories?categoryId=${activeCategory}`);
                if (res.data.success) {
                    setSubCategories(res.data.data.filter(sub => sub.isActive));
                }
            } catch (err) {
                console.error(err);
            }
        };

        fetchSubs();
    }, [activeCategory, isReady]);

    // ✅ FETCH PRODUCTS (MAIN FIX)
    useEffect(() => {
        if (!isReady) return; // 🔥 THIS FIXES YOUR BUG

        const fetchProducts = async () => {
            try {
                setLoading(true);

                let url = '/api/products';

                if (activeSubCategory !== 'All') {
                    url += `?subcategoryId=${activeSubCategory}`;
                } else if (activeCategory !== 'All') {
                    url += `?categoryId=${activeCategory}`;
                }

                const res = await axios.get(url);

                if (res.data.success) {
                    setProducts(res.data.data.filter(prod => prod.isActive));
                }
            } catch (err) {
                console.error(err);
                setError('Failed to load products');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [activeCategory, activeSubCategory, isReady]);

    // ✅ URL UPDATE
    const updateURL = (category, subcategory) => {
        let url = '/products';

        if (category !== 'All') {
            url += `?category=${category}`;
        }

        if (subcategory !== 'All') {
            url += `&subcategory=${subcategory}`;
        }

        router.push(url);
    };

    const handleCategoryClick = (categoryId) => {
        setActiveCategory(categoryId);
        setActiveSubCategory('All');
        updateURL(categoryId, 'All');
    };

    const handleSubCategoryClick = (subId) => {
        setActiveSubCategory(subId);
        updateURL(activeCategory, subId);
    };

    const currentCategoryName =
        categories.find(c => c.id.toString() === activeCategory.toString())?.name || '';

    return (
        <section className="w-full py-20 sm:py-24 bg-transparent">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* HEADER */}
                <div className="flex flex-col lg:flex-row justify-between items-start mb-12 gap-8">
                    <div className="flex flex-col flex-1">
                        <span className="text-sm leading-tight text-gray-900 mb-4 font-medium uppercase tracking-wider">
                            Our Products
                        </span>
                        <h2
                            className="text-3xl sm:text-4xl lg:text-5xl text-gray-900 leading-[1.2]"
                            style={{ fontFamily: 'MainFont, sans-serif' }}
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

                {/* FILTERS */}
                <div className="flex flex-col gap-4 mb-12">

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

                    {subCategories.length > 0 && (
                        <div className="flex flex-wrap items-center gap-3 pl-2 sm:pl-4 border-l-2 border-[#860000]">

                            <button
                                onClick={() => handleSubCategoryClick('All')}
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
                                    onClick={() => handleSubCategoryClick(sub.id)}
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

                {/* LOADING */}
                {loading && (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#860000]"></div>
                    </div>
                )}

                {/* ERROR */}
                {error && !loading && (
                    <div className="text-center py-20">
                        <p className="text-red-600 mb-4">{error}</p>
                    </div>
                )}

                {/* PRODUCTS */}
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