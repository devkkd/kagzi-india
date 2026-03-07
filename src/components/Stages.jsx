"use client";
import React, { useState, useEffect } from 'react';

const Stages = () => {
  const [activeId, setActiveId] = useState('stage-1');

  // Exact data from your prompt
  const stagesData = [
    {
      id: 'stage-1',
      navTitle: 'Stage 01',
      sub: '01. Sourcing Cotton Rags',
      title: 'Where Most See Waste, We See Paper',
      desc: "We begin with discarded cotton fabric - clean, unbleached remnants from textile mills and garment factories that most people discard without a second thought. To us, they are the raw soul of the paper yet to be born.\nEvery kilogram of cotton rag we source is one kilogram diverted from landfill.\nOur paper is not just made from the earth - it begins by saving it.",
      listTitle: "What We Use:",
      listItems: [
        "100% recycled cotton textile waste",
        "Khadi fibres for specialty papers",
        "No wood pulp. No trees."
      ],
      img: '/images/papermaking/Stages1.svg' // Replace with your actual image path
    },
    {
      id: 'stage-2',
      navTitle: 'Stage 02',
      sub: '02. Soaking & Beating',
      title: 'The Transformation Begins in Water',
      desc: "The cotton rags are soaked in clean water for several hours - softening the fibres, loosening the weave, preparing them for rebirth.\n\nThen they are beaten into a fine, silky pulp using traditional wooden mallets and water-powered beaters.\nNo bleach.\nNo caustic chemicals. Nothing that does not belong.\nThe result is a white, creamy slurry of pure cellulose - the fundamental building block of all paper.\n\nAt this stage, the pulp is alive with possibility.",
      img: '/images/papermaking/Stages2.svg'
    },
    {
      id: 'stage-3',
      navTitle: 'Stage 03',
      sub: '03. Vat Immersion',
      title: 'A Cloud of Possibility',
      desc: "The pulp is suspended in large open vats filled with clean water, creating a milky bath of evenly distributed cotton fibre.\n\nNatural pigments indigo, turmeric, rose, pomegranate rind may be introduced at this stage to create our coloured papers.\nThis is where a sheet of paper is first imagined.\nThe vat holds everything the finished sheet will be - it simply hasn't taken form yet.",
      img: '/images/papermaking/Stages3.svg'
    },
    {
      id: 'stage-4',
      navTitle: 'Stage 04',
      sub: '04. Sheet Lifting',
      title: 'The Moment the Sheet is Born',
      desc: "A skilled craftsperson submerges a wooden mould and deckle a framed mesh screen into the vat, then lifts it steadily, evenly, drawing an even layer of cotton fibre across its surface.\nThis single gesture perfected over a lifetime of practice determines the weight, the texture, and the character of the sheet.\n\nToo fast and the fibre distributes unevenly. Too slow and the sheet is too thick. It takes years to get it right. Our artisans have had years.\nThe natural, uneven edge created by this lifting is the deckle edge — the irreproducible signature of a handmade sheet.",
      img: '/images/papermaking/Stages4.svg'
    },
    {
      id: 'stage-5',
      navTitle: 'Stage 05',
      sub: '05. Drying in Sun',
      title: 'Patience is the Unseen Ingredient',
      desc: "A skilled craftsperson submerges a wooden mould and deckle a framed mesh screen into the vat, then lifts it steadily, evenly, drawing an even layer of cotton fibre across its surface.\nThis single gesture perfected over a lifetime of practice determines the weight, the texture, and the character of the sheet.\n\nToo fast and the fibre distributes unevenly. Too slow and the sheet is too thick. It takes years to get it right. Our artisans have had years.\nThe natural, uneven edge created by this lifting is the deckle edge — the irreproducible signature of a handmade sheet.",
      img: '/images/papermaking/Stages5.svg'
    },
    {
      id: 'stage-6',
      navTitle: 'Stage 06',
      sub: '06. Finishing & Colour',
      title: 'The Last Touch is the Most Human',
      desc: "Once dry, each sheet is inspected by hand checked for consistency, texture, and quality. Sheets requiring colour receive it at this stage: natural dyes only, applied with care and expertise.\n\nOur ornamentation artists may add dried flowers, pressed botanicals, or hand-applied decorative accents where required.\nEach batch is then sorted, graded, and packed by trained professionals ready to travel to 30+ countries and become something extraordinary in someone else's hands.",
      img: '/images/papermaking/Stages6.svg'
    }
  ];

  // ScrollSpy Logic: Update active timeline item based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = stagesData.map(item => document.getElementById(item.id));
      
      let currentActive = activeId;
      sectionElements.forEach(section => {
        if (section) {
          const rect = section.getBoundingClientRect();
          // Adjust offset to trigger active state when section hits the upper third of screen
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

  // Click to scroll smoothly to a specific section
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Account for sticky headers
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

  // Helper to color the LAST word of the title red
  const renderStyledTitle = (title) => {
    const words = title.split(' ');
    const lastWord = words.pop();
    return (
      <>
        {words.join(' ')} <span className="text-[#860000]">{lastWord}</span>
      </>
    );
  };

  return (
    <section className="w-full py-20 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row relative gap-10 lg:gap-20">
          
          {/* =========================================
              LEFT COLUMN: STICKY TIMELINE NAV
              ========================================= */}
          {/* Mobile: Horizontal scrollable menu. Desktop: Vertical sticky timeline */}
          <div className="lg:w-1/4 sticky top-[80px] z-30 lg:h-max bg-[#FAF6F1] lg:bg-transparent pb-4 lg:pb-0 border-b border-gray-300 lg:border-none pt-2">
            
            <div className="relative flex lg:flex-col overflow-x-auto lg:overflow-visible gap-6 lg:gap-8 py-2 hide-scrollbar">
              
              {/* Vertical line (Desktop only) */}
              <div className="hidden lg:block absolute left-[11px] top-4 bottom-4 w-[1px]  z-0"></div>

              {stagesData.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <div 
                    key={item.id} 
                    onClick={() => scrollToSection(item.id)}
                    className="relative flex items-center cursor-pointer group whitespace-nowrap lg:whitespace-normal z-10"
                  >
                    {/* Circle Indicator (Desktop only) */}
                    <div className="hidden lg:flex w-6 h-6 absolute left-0 items-center justify-center">
                      <div className={`rounded-full transition-all duration-300 ${isActive ? 'w-6 h-6 bg-[#860000]' : 'w-2 h-2 group-hover:bg-[#860000]'}`}></div>
                    </div>
                    
                    {/* Nav Text */}
                    <span className={`lg:ml-12 text-lg lg:text-xl transition-all duration-300 ${isActive ? 'text-[#860000] font-bold' : 'text-gray-600 font-medium group-hover:text-[#860000]'}`}>
                      {item.navTitle}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* =========================================
              RIGHT COLUMN: SCROLLABLE CONTENT
              ========================================= */}
          <div className="lg:w-3/4 flex flex-col gap-24 lg:gap-32 pb-20">
            {stagesData.map((item) => (
              <div key={item.id} id={item.id} className="flex flex-col scroll-mt-32">
                
                {/* Subheading */}
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 tracking-tight">
                  {item.sub}
                </h3>
                
                {/* Main Heading */}
                <h4 
                  className="text-3xl sm:text-4xl lg:text-[3rem] text-gray-900 leading-[1.1] mb-8"
                  style={{ fontFamily: 'Sooner, sans-serif' }}
                >
                  {renderStyledTitle(item.title)}
                </h4>
                
                <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
                  {/* Left Side: Description Paragraphs */}
                  <div className="flex flex-col flex-1 gap-4">
                    {item.desc.split('\n').map((paragraph, idx) => (
                      <p key={idx} className="text-sm leading-tight text-gray-900 font-medium">
                        {paragraph}
                      </p>
                    ))}

                    {/* Conditional rendering for the specific list in Stage 1 */}
                    {item.listTitle && (
                      <div className="mt-4">
                        <h5 className="text-sm font-bold text-gray-900 mb-4">{item.listTitle}</h5>
                        <ul className="flex flex-col gap-2">
                          {item.listItems.map((listItem, i) => (
                            <li key={i} className="text-sm leading-tight text-gray-900 font-medium">
                              {listItem}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Right Side: Associated Image */}
                  <div className="w-full lg:w-[45%] rounded-sm overflow-hidden  flex-shrink-0">
                    <img 
                      src={item.img} 
                      alt={item.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>
      
      {/* Hide scrollbar for mobile horizontal nav while keeping it scrollable */}
      <style jsx="true">{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default Stages;