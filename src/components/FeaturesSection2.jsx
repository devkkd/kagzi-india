import React from 'react';

const FeaturesSection2 = () => {
const features = [
  {
    icon: '/images/icons/icon5.svg',
    title: 'Cotton Rag',
    description: 'The primary fibre strong, long-lasting, archival quality. Paper made from cotton rag can outlive paper made from wood pulp by centuries.',
    badge: 'Primary Fibre'
  },
  {
    icon: '/images/icons/icon6.svg',
    title: 'Khadi Fibre',
    description: 'Indigenous to India, khadi fibres give our specialty papers their uniquely textured character rough where they should be, soft where they must be.',
    badge: 'Texture Fibre'
  },
  {
    icon: '/images/icons/icon7.svg',
    title: 'Natural Dyes',
    description: 'Indigo, turmeric, rose, pomegranate colours that come from the same earth the paper was made in. Gentle on skin. Gentle on the planet.',
    badge: 'Zero Chemicals'
  },
  {
    icon: '/images/icons/icon8.svg',
    title: 'Clean Water',
    description: 'The silent ingredient. Every litre used in our process is treated and returned to the ground. Paper should nourish the world, not deplete it.',
    badge: 'Zero Waste'
  }
];

  return (
    <section className="w-full pt-8 sm:pt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              
              {/* Icon */}
              <div className="h-12 mb-6 flex items-center justify-center">
                <img 
                  src={feature.icon} 
                  alt={feature.title} 
                  className="h-full object-contain"
                />
              </div>

              {/* Title */}
              <h3 className="text-md font-bold text-gray-900 mb-4">
                {feature.title}
              </h3>

              {/* Description (flex-grow ensures the badges align at the bottom if text height varies) */}
              <p className="text-xs text-gray-800 leading-relaxed mb-4 flex-grow max-w-sm">
                {feature.description}
              </p>

              {/* Pink Pill Badge */}
              <div className="bg-[#FFDEDE] text-gray-900 px-6 py-2.5 rounded-full text-xs font-medium tracking-wide">
                {feature.badge}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturesSection2;