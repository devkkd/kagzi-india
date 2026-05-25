import React from 'react';

const CelluloseInfo = () => {
  return (
    <section className="w-full py-20 sm:py-24 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row justify-between items-start gap-10 lg:gap-16">
          
          {/* =========================================
              LEFT COLUMN: HEADING & STAT
              ========================================= */}
          <div className="flex flex-col flex-1 w-full">
            
            {/* Large Percentage Statistic */}
            <span 
              className="text-5xl sm:text-6xl lg:text-7xl text-[#860000] mb-4 block"
              style={{ fontFamily: 'MainFont, sans-serif' }}
            >
              95%
            </span>

            {/* Main Heading */}
            <h1 
              className="text-3xl sm:text-4xl lg:text-5xl text-gray-900 leading-[1.1]"
              style={{ fontFamily: 'MainFont, sans-serif' }}
            >
              Cellulose - Pure Cotton Fibre
            </h1>
            
          </div>

          {/* =========================================
              RIGHT COLUMN: DESCRIPTION
              ========================================= */}
          <div className="flex flex-col flex-1 lg:max-w-xl lg:pt-4">
            
            {/* Sub-heading */}
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-6">
              The Cellulose Molecule — Why Cotton Paper Lasts for Centuries
            </h3>

            {/* Paragraph Text */}
            <div className="flex flex-col gap-4">
              <p className="text-sm leading-tight text-gray-900 font-medium">
                Cellulose is the natural backbone of every handmade sheet, giving cotton rag paper its remarkable strength and durability. In cotton, these fibres exist in their purest form, creating handmade paper with exceptional texture, flexibility, and archival quality.
              </p>
              <p className="text-sm leading-tight text-gray-900 font-medium">
                Unlike ordinary wood-pulp paper, cotton rag is lignin-free, which means recycled paper made from cotton will not easily yellow, crack, or become brittle over time. This is why handmade in India paper products, luxury journals, diary notebook collections, and premium paper for art and craft can last for generations.
              </p>
              <p className="text-sm leading-tight text-gray-900 font-medium">
                Some of the oldest cotton rag manuscripts are over 600 years old — still beautiful, still readable. That is the legacy behind every Kagzi paper creation.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default CelluloseInfo;