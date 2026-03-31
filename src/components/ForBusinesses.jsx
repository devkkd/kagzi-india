import Link from 'next/link';
import React from 'react';

const ForBusinesses = () => {
  return (
    <section className="w-full py-20 sm:py-24 bg-[#FBF0E4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col lg:flex-row justify-between items-start gap-10 lg:gap-16">

          {/* Left Column: Pre-title and Main Heading */}
          <div className="flex flex-col flex-1">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-[1px] bg-[#860000]"></div>
              <span className="text-[#860000] text-sm font-semibold tracking-wider uppercase">
                For Businesses
              </span>
            </div>

            <h2
              className="text-4xl sm:text-5xl text-gray-900 leading-[1.1] sm:leading-[1.2]"
              style={{ fontFamily: 'MainFont, sans-serif' }}
            >
              Custom Orders for Brands Crafting Legacy
               <span className="text-[#860000]"> Since 1940</span>
            </h2>
          </div>

          {/* Right Column: Description and Button */}
          <div className="flex flex-col flex-1 lg:max-w-xl lg:pt-8">
            <p className="text-sm leading-tight text-gray-900 font-medium mb-8">
              We partner with stationery brands, publishers, luxury packaging houses, and eco-conscious businesses worldwide. Tell us what you need we'll make it by hand, at scale, without compromising on soul. Minimum order quantities available. Custom sizing, GSM, colour, and branding on request.
            </p>

            <Link href="/request">
              <button className="bg-[#860000] text-white px-8 py-3.5 rounded-full text-sm font-medium hover:bg-[#680000] transition-colors flex items-center justify-center gap-2 w-max">
                Request B2B Quote <span aria-hidden="true">&rarr;</span>
              </button>
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ForBusinesses;