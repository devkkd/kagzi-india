import React from 'react';

export default function SeveralThings() {
  const reasons = [
    {
      num: "01.",
      title: "Innovative &\nArtistic Designs",
      desc: "Our designers stay current with global trends while honouring traditional craft forms. Every product is an original.",
      img: "/images/home/feature1.png" // Replace with your actual image paths
    },
    {
      num: "02.",
      title: "Almost Entirely\nHandmade",
      desc: "From pulp preparation to final packing, human hands touch every product we make.",
      img: "/images/home/feature2.png"
    },
    {
      num: "03.",
      title: "Eco-Friendly by\nConviction",
      desc: "We use 100% recycled cotton waste. No trees. No harmful chemicals. No compromises.",
      img: "/images/home/feature3.png"
    },
    {
      num: "04.",
      title: "Custom-Made for\nYour Brand",
      desc: "GSM, size, colour, texture, embossing, foiling — we build exactly what your brand needs.",
      img: "/images/home/feature4.png"
    },
    {
      num: "05.",
      title: "Competitive\nPricing",
      desc: "Premium craft at fair prices. We believe sustainable should be accessible to the brands that need it most.",
      img: "/images/home/feature5.png"
    },
    {
      num: "06.",
      title: "Fine\nFinishing",
      desc: "Dried flowers, natural dyes, hand-painted accents. Our finishing artists bring beauty to every edge.",
      img: "/images/home/feature6.png"
    }
  ];

  return (
    <section className="w-full py-20 sm:py-24 overflow-visible text-gray-900">

      {/* Heading Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <h2
          className="text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.2]"
          style={{ fontFamily: 'MainFont, sans-serif' }}
        >
          Several Things Set Us <span className="text-[#860000]">Apart,</span> All of Them <span className="text-[#860000]">Matter</span>
        </h2>
      </div>

      {/* Accordion/Hover List Section */}
      <div className="w-full flex flex-col border-t border-gray-300">
        {reasons.map((item, index) => (
          <div
            key={index}
            className="group relative border-b border-gray-300 transition-colors duration-300 ease-in-out hover:bg-[#860000] hover:text-white cursor-default"
          >
            {/* The Row Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 flex flex-col md:flex-row items-start md:items-center relative z-20">

              {/* Number */}
              <div className="w-full md:w-32 text-2xl md:text-3xl font-bold mb-4 md:mb-0 shrink-0">
                {item.num}
              </div>

              {/* Title */}
              <div className="w-full md:w-1/3 text-xl md:text-2xl font-bold whitespace-pre-line leading-[1.2] mb-4 md:mb-0"
                style={{ fontFamily: 'MainFont, sans-serif' }}
              >
                {item.title}
              </div>

              {/* Description */}
              <div className="w-full md:w-1/3 text-sm leading-tight font-medium opacity-80 group-hover:opacity-100 transition-opacity duration-300 lg:pr-12">
                {item.desc}
              </div>

            </div>

            {/* Hover Image (Reveals on Hover, hidden on mobile) */}
            <div className="hidden lg:block absolute right-[5%] xl:right-[8%] top-1/2 -translate-y-1/2 w-[340px] h-[220px] z-30 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-400 ease-out shadow-2xl">
              <img
                src={item.img}
                alt={item.title.replace('\n', ' ')}
                className="w-full h-full object-cover border border-black/10"
              />
            </div>

          </div>
        ))}
      </div>

    </section>
  );
}