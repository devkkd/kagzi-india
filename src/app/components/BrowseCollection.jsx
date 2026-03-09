'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BrowseCollection = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/categories');
      
      if (response.data.success) {
        // Filter only active categories and limit to 5 for display
        const activeCategories = response.data.data
          .filter(cat => cat.isActive)
          .slice(0, 5);
        setCategories(activeCategories);
      }
    } catch (err) {
      console.error('Failed to fetch categories:', err);
      setError('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          
          {/* Left Title Area */}
          <div className="flex flex-col">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-px bg-[#860000]"></div>
              <span className="text-[#860000] text-sm font-semibold tracking-wider uppercase">
                Our Collection
              </span>
            </div>
            <h2 
              className="text-4xl sm:text-5xl text-gray-900 leading-tight"
              style={{ fontFamily: 'Sooner, sans-serif' }}
            >
              Browse <span className="text-[#860000]">Collection</span>
            </h2>
          </div>

          {/* Right Button */}
          <button className="bg-[#860000] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#680000] transition-colors flex items-center gap-2">
            View all Collections <span>&rarr;</span>
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#860000]"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-20">
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={fetchCategories}
              className="bg-[#860000] text-white px-6 py-2 rounded-lg hover:bg-[#680000] transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Categories Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8">
            {categories.map((category) => (
              <div key={category.id} className="flex flex-col group cursor-pointer">
                
                {/* Image Container */}
                <div className="w-full aspect-square bg-[#e8e4e0] mb-5 overflow-hidden flex items-center justify-center rounded-lg">
                  {category.image ? (
                    <img 
                      src={category.image} 
                      alt={category.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <span className="text-gray-400 text-sm">No Image</span>
                  )}
                </div>

                {/* Category Content */}
                <h3 className="text-base font-bold text-gray-900 mb-2">
                  {category.name}
                </h3>
                
                <div className="text-sm leading-tight text-gray-800 font-medium group-hover:text-[#860000] transition-colors">
                  Explore Collection →
                </div>

              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && categories.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-600 text-lg">No categories available at the moment.</p>
          </div>
        )}

      </div>
    </section>
  );
};

export default BrowseCollection;