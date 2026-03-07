import React from 'react';
import categories from '@/data/categories'; // Adjust the import path if needed
import subCategories from '@/data/subCategories'; // Adjust the import path if needed

const CuratedCollections = () => {
  return (
    <section className="w-full py-20 sm:py-24 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* =========================================
            TOP HEADER SECTION
            ========================================= */}
        <div className="flex flex-col mb-16 sm:mb-20">
          <span className="text-sm leading-tight text-gray-900 mb-4 font-medium">
            Our Collections
          </span>
          <h2 
            className="text-3xl sm:text-4xl lg:text-5xl text-gray-900 leading-[1.2]"
            style={{ fontFamily: 'Sooner, sans-serif' }}
          >
            Our Curated <span className="text-[#860000]">Collections</span>
          </h2>
        </div>

        {/* =========================================
            MAPPED CATEGORIES & SUBCATEGORIES
            ========================================= */}
        <div className="flex flex-col">
          {categories.map((category, index) => {
            // Get all subcategories that belong to this specific category
            const relatedSubCategories = subCategories.filter(
              (sub) => sub.categoryId === category.id
            );

            // If a category has no subcategories in the JSON, skip rendering it
            if (relatedSubCategories.length === 0) return null;

            return (
              <div key={category.id} className="flex flex-col mb-16 last:mb-0">
                
                {/* Category Header Row */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-6">
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                    {category.title}
                  </h3>
                  <button className="bg-[#860000] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#680000] transition-colors flex items-center gap-2 flex-shrink-0">
                    View all Products <span>&rarr;</span>
                  </button>
                </div>

                {/* Subcategories Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                  {relatedSubCategories.map((subCategory) => (
                    <div key={subCategory.id} className="flex flex-col group cursor-pointer">
                      
                      {/* Image Placeholder */}
                      <div className="w-full aspect-square bg-[#e8e4e0] mb-5 overflow-hidden flex items-center justify-center">
                        {subCategory.image ? (
                          <img 
                            src={subCategory.image} 
                            alt={subCategory.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <span className="text-gray-400 text-sm">Placeholder</span>
                        )}
                      </div>

                      {/* Subcategory Details */}
                      <h4 className="text-sm leading-tight font-bold text-gray-900 mb-2">
                        {subCategory.title}
                      </h4>
                      <span className="text-sm leading-tight text-gray-800 font-medium group-hover:text-[#860000] transition-colors">
                        View All Products &rarr;
                      </span>
                      
                    </div>
                  ))}
                </div>

                {/* Divider Line (Shows under every category except the very last one) */}
                {index < categories.length - 1 && (
                  <hr className="mt-16 sm:mt-20 border-t border-gray-300" />
                )}

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default CuratedCollections;