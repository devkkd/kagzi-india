import React from 'react';

const ExtractFibreSteps = () => {
  const steps = [
    {
      id: 'A',
      title: 'Stage A',
      subtitle: 'Alkaline Treatment',
      desc: 'Shredded pineapple leaves are treated with a mild alkaline solution to break down the outer cellular structure and begin separating cellulose from surrounding plant matter. The leaves soften, begin to open up, and reveal the fibre within.',
      img: '/images/papermaking/StageA.svg'
    },
    {
      id: 'B',
      title: 'Stage B',
      subtitle: 'First Bleaching',
      desc: 'An initial bleaching stage removes the residual deep-green pigmentation of the leaf and softens the fibre further – producing a pale, workable pulp that begins to resemble something a vat would welcome.',
      img: '/images/papermaking/StageB.svg'
    },
    {
      id: 'C',
      title: 'Stage C',
      subtitle: 'Second Bleaching',
      desc: 'A final refining stage produces a clean, bright fibre suspension ready for the vat, the mould, and the hands of our craftspeople. The result is a pale, surprisingly strong fibre that behaves beautifully once it meets water.',
      img: '/images/papermaking/StageC.svg'
    }
  ];

  return (
    <section className="w-full py-20 sm:py-24 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* =========================================
            HEADER SECTION
            ========================================= */}
        <div className="flex items-center gap-4 mb-12 sm:mb-16">
          <div className="w-16 h-[1px] bg-[#860000]"></div>
          <span className="text-[#860000] text-sm font-semibold tracking-wider uppercase">
            How We Extract The Fibre
          </span>
        </div>

        {/* =========================================
            STEPS COLUMNS
            ========================================= */}
        <div className="flex flex-col lg:flex-row w-full divide-y lg:divide-y-0 lg:divide-x divide-gray-300">
          
          {steps.map((step, index) => (
            <div 
              key={step.id} 
              className={`flex flex-col flex-1 ${
                index === 0 ? 'lg:pr-10 xl:pr-12' : index === 2 ? 'lg:pl-10 xl:pl-12' : 'lg:px-10 xl:px-12'
              } py-10 lg:py-0`}
            >
              
              {/* Text Block */}
              <div className="flex flex-col flex-1">
                <h3 
                  className="text-2xl sm:text-3xl lg:text-4xl text-gray-900 font-bold mb-2 leading-[1.2]"
                  style={{ fontFamily: 'MainFont, sans-serif' }}
                >
                  {step.title}
                </h3>
                <h4 
                  className="text-2xl sm:text-3xl lg:text-4xl text-gray-900 font-bold mb-6 leading-[1.2]"
                  style={{ fontFamily: 'MainFont, sans-serif' }}
                >
                  {step.subtitle}
                </h4>
                
                <p className="text-sm leading-tight text-gray-900 font-medium">
                  {step.desc}
                </p>
              </div>

              {/* Image Block with Background Line */}
              <div className="relative w-full flex justify-center mt-6 lg:mt-8 pt-8 pb-8">
                {/* Horizontal Line passing behind the image */}
                <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gray-300 -z-10 -translate-y-1/2"></div>
                
                {/* Image */}
                <img 
                  src={step.img} 
                  alt={`${step.title} - ${step.subtitle}`} 
                  className="w-full max-w-[280px] sm:max-w-[320px] h-auto object-contain z-10 drop-shadow-sm"
                />
              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default ExtractFibreSteps;