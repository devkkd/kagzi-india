import React from 'react';

const ComeSeeUs = () => {
  return (
    <section className="w-full py-20 sm:py-24 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Content: Heading & Description */}
        <div className="flex flex-col lg:flex-row justify-between items-start mb-16 gap-10 lg:gap-16">
          
          {/* Left: Main Heading */}
          <div className="flex-1 w-full">
            <h2 
              className="text-3xl sm:text-4xl lg:text-5xl text-gray-900 leading-[1.2]"
              style={{ fontFamily: 'Sooner, sans-serif' }}
            >
              Better Yet - <span className="text-[#860000]">Come See Us</span>
            </h2>
          </div>

          {/* Right: Text Block */}
          <div className="flex-1 w-full lg:max-w-xl flex flex-col gap-6">
            <p className="text-sm leading-tight text-gray-900 font-medium">
              We love our customers and invite you to visit our workshop during normal business hours.
            </p>
            <p className="text-sm leading-tight text-gray-900 font-medium">
              You'll see the full papermaking process firsthand, feel the difference between machine-made and handmade paper, and speak directly with the artisans who make every sheet.
            </p>
            <p className="text-sm leading-tight text-gray-900 font-medium">
              Workshop visits are welcome. For large groups or trade delegations, please schedule in advance.
            </p>
          </div>

        </div>

        {/* Map Image Section */}
        <div className="w-full h-[400px] sm:h-[500px] lg:h-[600px] bg-gray-200 rounded-sm overflow-hidden shadow-sm">
          <img 
            src="/images/map.png" 
            alt="Kagzi Industries Location Map" 
            className="w-full h-full object-cover"
          />
        </div>

      </div>
    </section>
  );
};

export default ComeSeeUs;