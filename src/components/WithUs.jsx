import React from 'react';

const WithUs = () => {
  return (
    <section className="w-full py-20 sm:py-24 bg-[#FBF0E4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Changed items-start to items-center for better vertical balance */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-10 lg:gap-16">
          
          {/* Left Column: Main Heading */}
          <div className="flex flex-col flex-1 w-full">
            <h2 
              className="text-4xl sm:text-5xl lg:text-[3.5rem] text-gray-900 leading-[1.1] sm:leading-[1.2]"
              style={{ fontFamily: 'MainFont, sans-serif' }}
            >
              Ready to Work <span className="text-[#860000]">With Us?</span>
            </h2>
          </div>

          {/* Right Column: Description and Button */}
          <div className="flex flex-col flex-1 lg:max-w-xl">
            <p className="text-sm leading-tight text-gray-900 font-medium mb-8">
              Whether you're a global Distributor, boutique stationery brand, or a packaging house looking for a sustainable edge - we're ready to make something extraordinary together.
            </p>
            
            <button className="bg-[#860000] text-white px-8 py-3.5 rounded-full text-sm font-medium hover:bg-[#680000] transition-colors flex items-center justify-center gap-2 w-max">
              Send Us an Enquiry <span aria-hidden="true">&rarr;</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};

export default WithUs;