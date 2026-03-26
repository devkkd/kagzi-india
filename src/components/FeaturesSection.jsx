import React from 'react';

const FeaturesSection = () => {
  const features = [
    {
      icon: '/images/icons/icon1.svg',
      title: 'Waste, Reimagined',
      description: 'Nothing is discarded here. What the world throws away, we transform giving forgotten cotton fibres a second life more beautiful than their first.',
      badge: '100% Recycled'
    },
    {
      icon: '/images/icons/icon2.svg',
      title: 'Made for the Earth, Not Just on It',
      description: 'Every choice we make from fibre to finish asks the same question: does this leave the world better? The answer, always, is yes.',
      badge: 'Earth Positive'
    },
    {
      icon: '/images/icons/icon3.svg',
      title: 'Cotton, Reclaimed',
      description: 'Our paper begins where cloth ends. One hundred percent textile cotton waste, rescued from landfill and reborn as something worth holding.',
      badge: '100% Cotton Waste'
    },
    {
      icon: '/images/icons/icon4.svg',
      title: 'We Take More Carbon Than We Give',
      description: "Most industries leave a mark on the atmosphere. We're working to erase it one slow, sun-dried, handcrafted sheet at a time.",
      badge: 'Carbon Negative'
    }
  ];

  return (
    <section className="w-full py-20 sm:py-24 border border-t border-gray-300 ">
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

export default FeaturesSection;