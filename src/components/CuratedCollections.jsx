'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const CuratedCollections = () => {
  const router = useRouter();

  const [categories, setCategories] = useState([]);
  const [subcategoriesByCategory, setSubcategoriesByCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      const categoriesResponse = await axios.get('/api/categories');
      if (categoriesResponse.data.success) {
        const activeCategories = categoriesResponse.data.data.filter(cat => cat.isActive);
        setCategories(activeCategories);

        const subcategoriesData = {};
        for (const category of activeCategories) {
          const subcategoriesResponse = await axios.get(`/api/subcategories?categoryId=${category.id}`);
          if (subcategoriesResponse.data.success) {
            const activeSubcategories = subcategoriesResponse.data.data.filter(sub => sub.isActive);
            if (activeSubcategories.length > 0) {
              subcategoriesData[category.id] = activeSubcategories;
            }
          }
        }
        setSubcategoriesByCategory(subcategoriesData);
      }
    } catch (err) {
      console.error('Failed to fetch data:', err);
      setError('Failed to load collections');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="w-full py-20 sm:py-24 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#860000]"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full py-20 sm:py-24 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={fetchData}
              className="bg-[#860000] text-white px-6 py-2 rounded-lg hover:bg-[#680000] transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-20 sm:py-24 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col mb-16 sm:mb-20">
          <span className="text-sm leading-tight text-gray-900 mb-4 font-medium">
            Our Collections
          </span>
          <h2 
            className="text-3xl sm:text-4xl lg:text-5xl text-gray-900 leading-[1.2]"
            style={{ fontFamily: 'MainFont, sans-serif' }}
          >
            Our Curated <span className="text-[#860000]">Collections</span>
          </h2>
        </div>

        <div className="flex flex-col">
          {categories.map((category, index) => {
            const relatedSubCategories = subcategoriesByCategory[category.id] || [];
            if (relatedSubCategories.length === 0) return null;

            return (
              <div key={category.id} className="flex flex-col mb-16 last:mb-0">

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-6">
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                    {category.name}
                  </h3>
                  <button
                    onClick={() => router.push(`/products?category=${category.id}`)}
                    className="bg-[#860000] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#680000] transition-colors flex items-center gap-2 shrink-0"
                  >
                    View all Products <span>&rarr;</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                  {relatedSubCategories.map((subCategory) => (
                    <div
                      key={subCategory.id}
                      className="flex flex-col group cursor-pointer"
                      onClick={() =>
                        router.push(`/products?category=${category.id}&subcategory=${subCategory.id}`)
                      }
                    >
                      <div className="w-full aspect-square bg-[#e8e4e0] mb-5 overflow-hidden flex items-center justify-center rounded-lg">
                        {subCategory.image ? (
                          <img
                            src={subCategory.image}
                            alt={subCategory.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <span className="text-gray-400 text-sm">No Image</span>
                        )}
                      </div>

                      <h4 className="text-sm leading-tight font-bold text-gray-900 mb-2">
                        {subCategory.name}
                      </h4>
                      <span className="text-sm leading-tight text-gray-800 font-medium group-hover:text-[#860000] transition-colors">
                        View All Products &rarr;
                      </span>
                    </div>
                  ))}
                </div>

                {index < categories.filter(cat => subcategoriesByCategory[cat.id]?.length > 0).length - 1 && (
                  <hr className="mt-16 sm:mt-20 border-t border-gray-300" />
                )}

              </div>
            );
          })}
        </div>

        {categories.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-600 text-lg">No collections available at the moment.</p>
          </div>
        )}

      </div>
    </section>
  );
};

export default CuratedCollections;