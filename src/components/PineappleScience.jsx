import React from 'react';

const PineappleScience = () => {
  // Data for Chemical Composition
  const compositionData = [
    { name: 'Cellulose', value: '66.2%' },
    { name: 'Holocellulose', value: '85.7%' },
    { name: 'Hemicellulose', value: '19.5%' },
    { name: '1% NaOH Solubility', value: '39.8%' },
    { name: 'Lignin', value: '4.28%' },
    { name: 'Ash', value: '4.5%' },
    { name: 'Moisture', value: '81.6%' },
  ];

  // Data for Production Context
  // logic: Top (3203) maps to ~85%, Bottom (919) maps to ~25%
  const productionData = [
    { country: 'Indonesia', value: '3,203', width: '85%' },
    { country: 'Philippines', value: '2,914', width: '77%' },
    { country: 'Costa Rica', value: '2,909', width: '77%' },
    { country: 'Brazil', value: '2,337', width: '62%' },
    { country: 'China', value: '1,960', width: '52%' },
    { country: '★ India', value: '1,851', width: '49%', highlight: true },
    { country: 'Thailand', value: '1,714', width: '45%' },
    { country: 'Nigeria', value: '1,607', width: '42%' },
    { country: 'Mexico', value: '1,247', width: '33%' },
    { country: 'Colombia', value: '919', width: '25%' },
  ];

  return (
    <section className="w-full">
      
      {/* =========================================
          TOP SECTION: HEADER
          ========================================= */}
      <div className="w-full bg-transparent py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Pre-title */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-[#860000]"></div>
            <span className="text-[#860000] text-sm font-semibold tracking-wider uppercase">
              The Science Behind The Sheet
            </span>
          </div>

          {/* Main Heading */}
          <h1 
            className="text-3xl sm:text-4xl lg:text-5xl text-gray-900 leading-[1.2]"
            style={{ fontFamily: 'MainFont, sans-serif' }}
          >
            Pineapple Leaves Are Remarkably Good <br />
            at Becoming <span className="text-[#860000]">Paper</span>
          </h1>

        </div>
      </div>

      {/* =========================================
          BOTTOM SECTION: DATA & CONTEXT
          ========================================= */}
      <div className="w-full bg-[#FBF0E4] py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-0 lg:divide-x divide-[#D4C8C0]">

            {/* LEFT COLUMN: CHEMICAL COMPOSITION */}
            <div className="w-full lg:w-1/2 flex flex-col lg:pr-16">
              
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-[1px] bg-[#860000]"></div>
                <span className="text-[#860000] text-sm font-semibold tracking-wider uppercase">
                  Chemical Composition
                </span>
              </div>

              <h2 
                className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6"
                style={{ fontFamily: 'MainFont, sans-serif' }}
              >
                A Fibre The Vat Is Willing To <br />
                <span className="text-[#860000]">Accept</span>
              </h2>

              <p className="text-sm leading-tight text-gray-900 font-medium mb-10">
                With a cellulose content of <span className="font-bold">66.2%</span> and a holocellulose content of <span className="font-bold">85.7%</span>, pineapple leaf fibre is rich, dense, and workable. Critically, it contains only <span className="font-bold">4.28% lignin</span> - meaning less chemical treatment is required, aligning directly with our zero-harm commitment.
              </p>

              {/* Data Table */}
              <div className="w-full">
                {/* Header */}
                <div className="flex bg-[#860000] text-white px-4 py-3">
                  <div className="w-1/2 text-sm font-bold uppercase">Composition</div>
                  <div className="w-1/2 text-sm font-bold uppercase text-right">Pineapple Leaf</div>
                </div>

                {/* Rows */}
                <div className="flex flex-col border-b border-[#D4C8C0]">
                  {compositionData.map((item, idx) => (
                    <div key={idx} className="flex justify-between px-4 py-3.5 border-t border-[#D4C8C0]/60">
                      <span className="text-sm text-gray-800 font-medium">{item.name}</span>
                      <span className="text-sm text-gray-900 font-bold">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: PRODUCTION CONTEXT */}
            <div className="w-full lg:w-1/2 flex flex-col lg:pl-16">
              
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-[1px] bg-[#860000]"></div>
                <span className="text-[#860000] text-sm font-semibold tracking-wider uppercase">
                  Production Context - 2022
                </span>
              </div>

              <h2 
                className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6"
                style={{ fontFamily: 'MainFont, sans-serif' }}
              >
                A Waste Stream The World Has <br />
                <span className="text-[#860000]">Barely Touched</span>
              </h2>

              <p className="text-sm leading-tight text-gray-900 font-medium mb-10">
                The ten largest pineapple-producing countries generated over <span className="font-bold">20,000 thousand metric tons</span> in 2022. <br />
                The leaf waste from this is staggering - and almost none of it becomes paper.
              </p>

              {/* Bar Chart */}
              <div className="flex flex-col gap-3 mb-6">
                {productionData.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    
                    {/* Country Label */}
                    <div className={`w-24 shrink-0 text-sm text-right ${item.highlight ? 'text-[#860000] font-bold' : 'text-gray-700'}`}>
                      {item.country}
                    </div>

                    {/* Bar Area */}
                    <div className="flex-1 h-3 bg-[#E6DCD5] rounded-r-sm relative">
                      <div 
                        className="absolute left-0 top-0 bottom-0 bg-[#860000] rounded-r-sm"
                        style={{ width: item.width }}
                      ></div>
                    </div>

                    {/* Value Label */}
                    <div className={`w-12 shrink-0 text-sm font-bold ${item.highlight ? 'text-[#860000]' : 'text-gray-900'}`}>
                      {item.value}
                    </div>

                  </div>
                ))}
              </div>

              <p className="text-xs text-gray-600">
                Values in 1,000 metric tons · Source: FAO 2022 · <span className="font-bold">★ Our home country.</span>
              </p>

            </div>

          </div>

        </div>
      </div>

    </section>
  );
};

export default PineappleScience;