import React from 'react';

const PackagingWarehouse = () => {
  return (
    <section className="w-full py-20 sm:py-24 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-24 lg:gap-32">

        {/* =========================================
            SECTION 1: OUR PACKAGING
            ========================================= */}
        {/* lg:flex-row-reverse puts image on left on desktop, while keeping text on top for mobile */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20">
          
          {/* Text Content */}
          <div className="flex-1 flex flex-col">
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl text-gray-900 leading-[1.2] mb-8"
              style={{ fontFamily: 'MainFont, sans-serif' }}
            >
              Our <span className="text-[#860000]">Packaging</span>
            </h2>
            
            <div className="flex flex-col gap-5">
              <p className="text-sm leading-tight text-gray-900">
                We use high-quality, multi-layer, moisture-free, cushioned, and sturdy packaging to ensure products arrive in pristine condition - built for long ocean transits and international freight.
              </p>
              <p className="text-sm leading-tight text-gray-900">
                All products are packed by trained professionals versed in export packaging techniques.
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="flex-1 w-full flex justify-center lg:justify-start">
            <img
              src="/images/about/about5.png"
              alt="Our Packaging"
              className="w-full max-w-lg xl:max-w-xl h-auto object-cover shadow-sm"
            />
          </div>
        </div>

        {/* =========================================
            SECTION 2: OUR WAREHOUSE
            ========================================= */}
        {/* lg:flex-row keeps image on right on desktop, while keeping text on top for mobile */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Text Content */}
          <div className="flex-1 flex flex-col">
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl text-gray-900 leading-[1.2] mb-8"
              style={{ fontFamily: 'MainFont, sans-serif' }}
            >
              Our <span className="text-[#860000]">Warehouse</span>
            </h2>
            
            <div className="flex flex-col gap-5">
              <p className="text-sm leading-tight text-gray-900">
                Our warehouse is equipped to safely store and manage handmade paper products with efficiency and care, from recycled paper products to luxury leather journals, every item is carefully stored and packed in our warehouse facility.
              </p>
              <p className="text-sm leading-tight text-gray-900">
                A strong warehouse network helps us maintain consistent supply, fast delivery, and reliable service for international clients.
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="flex-1 w-full flex justify-center lg:justify-end">
            <img
              src="/images/about/about6.png"
              alt="Our Warehouse"
              className="w-full max-w-lg xl:max-w-xl h-auto object-cover shadow-sm"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default PackagingWarehouse;