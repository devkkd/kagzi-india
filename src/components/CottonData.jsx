import React from 'react';

const CottonData = () => {
  // Data for the Chemical Composition Table
  const compositionData = [
    { name: 'Cellulose', typical: '95', range: '88-96' },
    { name: 'Protein', typical: '1.3', range: '1.1-1.9' },
    { name: 'Pectic Substances', typical: '0.9', range: '0.7-1.6' },
    { name: 'Ash', typical: '1.2', range: '0.7-1.6' },
    { name: 'Total Sugar', typical: '0.3', range: '0.1-1.0' },
    { name: 'Organic Acids', typical: '0.8', range: '0.5-1.0' },
    { name: 'Pigments', typical: 'Traces', range: '-' },
    { name: 'Others', typical: '1.5', range: '-' },
  ];

  // Data for the Global Production Bar Chart
  // Widths are calculated relative to China (6,684 as 100%)
  const productionData = [
    { country: 'China', value: '6,684', percent: 86 },
    { country: '★ India', value: '5,661', percent: 81, isHighlight: true },
    { country: 'United States', value: '3,150', percent: 74 },
    { country: 'Brazil', value: '3,062', percent: 58 },
    { country: 'Australia', value: '1,263', percent: 51 },
    { country: 'Turkey', value: '1,067', percent: 44 },
    { country: 'Pakistan', value: '849', percent: 37 },
    { country: 'Uzbekistan', value: '740', percent: 30 },
    { country: 'Argentina', value: '245', percent: 23 },
    { country: 'Mali', value: '160', percent: 16 },
  ];

  return (
    <section className="w-full py-20 sm:py-24 bg-[#FBF0E4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-0 lg:divide-x divide-gray-300">

          {/* =========================================
              LEFT COLUMN: CHEMICAL COMPOSITION
              ========================================= */}
          <div className="w-full lg:w-1/2 flex flex-col lg:pr-12 xl:pr-16">
            
            {/* Pre-title */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-[1px] bg-[#860000]"></div>
              <span className="text-[#860000] text-sm font-semibold tracking-wider uppercase">
                Chemical Composition
              </span>
            </div>

            {/* Heading */}
            <h2 
              className="text-2xl sm:text-3xl lg:text-4xl text-gray-900 leading-[1.2] mb-6"
           
            >
              Why Cotton Makes The <br className="hidden sm:block" />
              Finest Paper On <span className="text-[#860000]">Earth</span>
            </h2>

            {/* Paragraph */}
            <p className="text-sm leading-tight text-gray-900 font-medium mb-10">
              Cotton fibre is among the purest natural sources of cellulose available on earth at <span className="font-bold">95% cellulose by dry weight</span>, it requires minimal processing, produces no harmful by-products, and creates paper of extraordinary strength and longevity. This is why archivists, artists, and luxury brands have trusted cotton rag paper for centuries.
            </p>

            {/* Data Table */}
            <div className="w-full mb-6">
              {/* Table Header */}
              <div className="flex bg-[#860000] text-white px-4 py-3 sm:px-6 sm:py-4">
                <div className="w-1/2 text-sm font-bold tracking-wide uppercase">Composition</div>
                <div className="w-1/4 text-sm font-bold tracking-wide uppercase text-left">Typical %</div>
                <div className="w-1/4 text-sm font-bold tracking-wide uppercase text-left">Range %</div>
              </div>
              
              {/* Table Rows */}
              <div className="flex flex-col border-b border-gray-300">
                {compositionData.map((row, index) => (
                  <div 
                    key={index} 
                    className="flex px-4 py-4 sm:px-6 border-t border-gray-200/60"
                  >
                    <div className="w-1/2 text-sm text-gray-800">{row.name}</div>
                    <div className="w-1/4 text-sm font-bold text-gray-900 text-left">{row.typical}</div>
                    <div className="w-1/4 text-sm font-bold text-gray-900 text-left">{row.range}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Table Footer Note */}
            <div className="text-sm text-gray-800">
              Composition by dry weight · <span className="font-bold">Source: Cotton fibre analysis data.</span>
            </div>

          </div>

          {/* =========================================
              RIGHT COLUMN: GLOBAL PRODUCTION
              ========================================= */}
          <div className="w-full lg:w-1/2 flex flex-col lg:pl-12 xl:pl-16">
            
            {/* Pre-title */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-[1px] bg-[#860000]"></div>
              <span className="text-[#860000] text-sm font-semibold tracking-wider uppercase">
                Global Production - 2022-2023
              </span>
            </div>

            {/* Heading */}
            <h2 
              className="text-2xl sm:text-3xl lg:text-4xl text-gray-900 leading-[1.2] mb-6"
            >
              India Is The World's <br className="hidden sm:block" />
              <span className="text-[#860000]">Second Largest Cotton Producer</span>
            </h2>

            {/* Paragraph */}
            <p className="text-sm leading-tight text-gray-900 font-medium mb-10">
              Global cotton production reached over <span className="font-bold">23,000 thousand metric tons</span> in 2022-23. India - at <span className="font-bold">5,661 thousand metric tons</span> sits at the heart of this supply chain. The textile waste this generates is our primary raw material. We turn what the industry discards into paper that lasts.
            </p>

            {/* Bar Chart Container */}
            <div className="flex flex-col gap-4 mb-8">
              {productionData.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  
                  {/* Country Name */}
                  <div className={`w-24 shrink-0 text-sm text-right ${item.isHighlight ? 'text-[#860000] font-bold' : 'text-gray-800'}`}>
                    {item.country}
                  </div>
                  
                  {/* Bar Track & Fill */}
                  <div className="flex-1 h-3.5 bg-[#E1D6CD] relative rounded-r-sm">
                    <div 
                      className="absolute left-0 top-0 bottom-0 bg-[#860000]"
                      style={{ width: `${item.percent}%` }}
                    ></div>
                  </div>

                  {/* Value */}
                  <div className={`w-12 shrink-0 text-sm font-bold ${item.isHighlight ? 'text-[#860000]' : 'text-gray-900'}`}>
                    {item.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Chart Footer Note */}
            <div className="text-sm text-gray-800">
              Values in 1,000 metric tons · <span className="font-bold">Source: FAO 2022-23</span> · <span className="font-bold">★ Our home country.</span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default CottonData;