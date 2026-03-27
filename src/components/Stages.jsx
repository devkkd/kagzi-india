"use client";
import React, { useState, useEffect } from 'react';

const Stages = () => {
  const [activeId, setActiveId] = useState('stage-1');

  const stagesData = [
    { id: 'stage-1', navTitle: 'Stage 01', sub: '01 Stage One', title: 'Sorting', desc: "Collected cotton textile waste is hand-sorted - separating clean, unbleached rags from unusable material. Only the purest cotton makes the cut.", meta: "100% Cotton | Hand Sorted", img: '/images/papermaking/Stages1.JPG' },
    { id: 'stage-2', navTitle: 'Stage 02', sub: '02 Stage Two', title: 'Cutting', desc: "Sorted rags are cut into small, uniform pieces - preparing the fibre for efficient soaking and beating. Size matters here; uniformity ensures even pulp.", meta: "Uniform Fibre", img: '/images/papermaking/Stages2.JPG' },
    { id: 'stage-3', navTitle: 'Stage 03', sub: '03 Stage Three', title: 'Pulping', desc: "Cut rags are soaked in clean water then beaten into a fine, silky pulp using traditional wooden mallets. No bleach. No caustic chemicals. Just water and time.", meta: "Zero Chemicals | Clean Water", img: '/images/papermaking/Stages3.JPG' },
    { id: 'stage-4', navTitle: 'Stage 04', sub: '04 Stage Four', title: 'Sheet Making', desc: "Pulp is suspended in open vats. A craftsperson lifts a mould and deckle through the bath - drawing an even fibre layer. This single gesture creates the sheet.", meta: "Deckle Edge | By Hand", img: '/images/papermaking/Stages4.png' },
    { id: 'stage-5', navTitle: 'Stage 05', sub: '05 Stage Five', title: 'Pressing', desc: "The freshly formed, water-heavy sheet is carefully pressed onto a smooth cotton surface to remove excess water and begin the bonding process.", meta: "Fibre Bonding", img: '/images/papermaking/Stages5.JPG' },
    { id: 'stage-6', navTitle: 'Stage 06', sub: '06 Stage Six', title: 'Separating', desc: "Pressed sheets are carefully separated from the cotton surface one by one, by hand without tearing. This requires patience and a practiced touch.", meta: "Hand Release", img: '/images/papermaking/Stages6.JPG' },
    { id: 'stage-7', navTitle: 'Stage 07', sub: '07 Stage Seven', title: 'Drying', desc: "Sheets are laid out under Rajasthan's open sky. No electric dryers. No forced heat. Just sun, wind, and time allowing fibres to bond slowly and evenly.", meta: "Sun Dried | Zero Energy", img: '/images/papermaking/Stages7.JPG' },
    { id: 'stage-8', navTitle: 'Stage 08', sub: '08 Stage Eight', title: 'Recycling', desc: "All process water is treated and returned to the ground. Off-cut fibre and trim waste are recycled back into the pulp vat. Nothing leaves the workshop as waste.", meta: "Zero Waste | Closed Loop", img: '/images/papermaking/Stages8.JPG' },
    { id: 'stage-9', navTitle: 'Stage 09', sub: '09 Stage Nine', title: 'Pressing', desc: "Dried sheets go through a final pressing stage flattening, smoothing, and achieving the right surface texture for each product specification.", meta: "Surface Finish", img: '/images/papermaking/Stages9.JPG' },
    { id: 'stage-10', navTitle: 'Stage 10', sub: '10 Stage Ten', title: 'Paper Shipping', desc: "For products requiring further conversion notebooks, bags, boxes finished paper sheets are moved to the conversion workshop where they become the final product.", meta: "Internal Transfer", img: '/images/papermaking/Stages10.JPG' },
    { id: 'stage-11', navTitle: 'Stage 11', sub: '11 Stage Eleven', title: 'Cutting', desc: "Sheets are cut to precise specifications product dimensions, envelope sizes, book pages, bag panels. Accuracy here determines quality throughout.", meta: "Precision Cut | Custom Size", img: '/images/papermaking/Stages11.JPG' },
    { id: 'stage-12', navTitle: 'Stage 12', sub: '12 Stage Twelve', title: 'Stitching', desc: "For journals, notebooks, and bound products coptic or traditional stitching binds the pages by hand. Each spine is finished by a craftsperson who has done this thousands of times.", meta: "Hand Bound | Coptic Stitch", img: '/images/papermaking/Stages12.png' },
    { id: 'stage-13', navTitle: 'Stage 13', sub: '13 Stage Thirteen', title: 'Final Production', desc: "Colour, embossing, natural dye application, floral embedding, and hand-painted accents are applied. Each product receives its finished character at this stage.", meta: "Natural Dyes | Hand Finished", img: '/images/papermaking/Stages13.png' },
    { id: 'stage-14', navTitle: 'Stage 14', sub: '14 Stage Fourteen', title: 'Packing', desc: "Each product is hand-inspected, graded, and packed in multi-layer moisture-free export packaging by trained professionals. Ready to travel to 30+ countries.", meta: "Export Grade | 30+ Countries", img: '/images/papermaking/Stages14.JPG' },
  ];

  // ScrollSpy Logic
  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = stagesData.map(item => document.getElementById(item.id));
      let currentActive = activeId;

      sectionElements.forEach(section => {
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 300 && rect.bottom >= 300) {
            currentActive = section.id;
          }
        }
      });

      if (currentActive !== activeId) {
        setActiveId(currentActive);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeId, stagesData]);

  // Smooth Scroll calculation
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; 
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setActiveId(id);
    }
  };

  return (
    <section className="w-full py-12 lg:py-20 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row relative gap-10 lg:gap-20">
          
          {/* LEFT COLUMN: STICKY TIMELINE NAV (Hidden on mobile) */}
          <div className="hidden lg:block lg:w-1/4 sticky top-[100px] z-30 lg:h-max pt-2">
            <div className="relative flex flex-col gap-4 py-2">
              
              {/* Vertical line */}
              <div className="absolute left-[11px] top-4 bottom-4 w-[1px] bg-gray-300 z-0"></div>

              {stagesData.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <div 
                    key={item.id} 
                    onClick={() => scrollToSection(item.id)}
                    className="relative flex items-center cursor-pointer group whitespace-normal z-10"
                  >
                    <div className="flex w-6 h-6 absolute left-0 items-center justify-center">
                      <div className={`rounded-full transition-all duration-300 ${isActive ? 'w-5 h-5 bg-[#860000]' : 'w-2 h-2 bg-gray-800 group-hover:bg-[#860000]'}`}></div>
                    </div>
                    
                    <span className={`ml-12 text-[14px] transition-all duration-300 uppercase tracking-widest font-bold ${isActive ? 'text-[#860000]' : 'text-gray-800 group-hover:text-[#860000]'}`}>
                      {item.navTitle}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN: CONTENT */}
          <div className="w-full lg:w-3/4 flex flex-col gap-16 lg:gap-32 pb-10 lg:pb-20">
            {stagesData.map((item) => (
              <div key={item.id} id={item.id} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start scroll-mt-24 lg:scroll-mt-32">
                
                {/* Text Content */}
                <div className="order-2 lg:order-1 flex flex-col">
                  <span className="text-sm font-bold text-gray-900 mb-2 uppercase tracking-tight">
                    {item.sub}
                  </span>
                  <h2 className="text-3xl lg:text-5xl text-gray-900 mb-4 lg:mb-6" style={{ fontFamily: 'MainFont, sans-serif' }}>
                    {item.title}
                  </h2>
                  <p className="text-base text-gray-900 leading-relaxed mb-6 lg:mb-8 max-w-full lg:max-w-[270px]">
                    {item.desc}
                  </p>
                  <div className="pt-2 lg:pt-4">
                    <p className="text-xs lg:text-sm font-bold text-gray-900 uppercase tracking-tight border-l-2 border-[#860000] pl-3">
                      {item.meta}
                    </p>
                  </div>
                </div>

                {/* Image */}
                <div className="order-1 lg:order-2 aspect-[4/3] overflow-hidden bg-gray-200 rounded-lg lg:rounded-none">
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    className="w-full h-full object-cover"
                  />
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stages;