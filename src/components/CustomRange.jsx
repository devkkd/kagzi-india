import React from 'react';

const CustomRange = () => {
  return (
    <section className="w-full py-20 sm:py-24 bg-[#FBF0E4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row justify-between items-center gap-10 lg:gap-16">
          
          {/* Left Column: Main Heading */}
          <div className="flex flex-col flex-1 w-full">
            <h2 
              className="text-3xl sm:text-4xl lg:text-[3.5rem] text-gray-900 leading-[1.1] sm:leading-[1.2]"
              style={{ fontFamily: 'Sooner, sans-serif' }}
            >
              Looking for a <span className="text-[#860000]">Custom Range?</span>
            </h2>
          </div>

          {/* Right Column: Description and Button */}
          <div className="flex flex-col flex-1 lg:max-w-xl">
            <p className="text-sm leading-relaxed text-gray-900 font-medium mb-8">
              We work directly with brands on custom product development.<br className="hidden sm:block" />
              Tell us your vision we'll bring it to life.
            </p>
            
            <button className="bg-[#860000] text-white px-8 py-3.5 rounded-full text-sm font-medium hover:bg-[#680000] transition-colors flex items-center justify-center gap-2 w-max">
              Start a Custom Enquiry <span aria-hidden="true">&rarr;</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};

export default CustomRange;