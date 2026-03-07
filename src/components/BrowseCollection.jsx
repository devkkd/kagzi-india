import React from 'react';
import categories from '@/data/categories'; // Adjust the import path if needed

const BrowseCollection = () => {
  return (
    <section className="w-full py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          
          {/* Left Title Area */}
          <div className="flex flex-col">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-[1px] bg-[#860000]"></div>
              <span className="text-[#860000] text-sm font-semibold tracking-wider uppercase">
                Our Collection
              </span>
            </div>
            <h2 
              className="text-4xl sm:text-5xl text-gray-900 leading-tight"
              style={{ fontFamily: 'Sooner, sans-serif' }}
            >
              Browse by <span className="text-[#860000]">Collection</span>
            </h2>
          </div>

          {/* Right Button */}
          <button className="bg-[#860000] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#680000] transition-colors flex items-center gap-2">
            View all Collections <span>&rarr;</span>
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8">
          {categories.map((category) => (
            <div key={category.id} className="flex flex-col group cursor-pointer">
              
              {/* Image Placeholder Container */}
              <div className="w-full aspect-square bg-[#e8e4e0] mb-5 overflow-hidden flex items-center justify-center">
                {category.image ? (
                  <img 
                    src={category.image} 
                    alt={category.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <span className="text-gray-400 text-sm">Image Placeholder</span>
                )}
              </div>

              {/* Category Content */}
              <h3 className="text-base font-bold text-gray-900 mb-2">
                {category.title}
              </h3>
              
              <div className="text-sm leading-tight text-gray-800 font-medium group-hover:text-[#860000] transition-colors">
                {category.linkText}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default BrowseCollection;