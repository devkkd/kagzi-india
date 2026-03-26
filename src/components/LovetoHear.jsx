import React from 'react';

const LovetoHear = () => {
    return (
        <section className="w-full py-20 sm:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="flex flex-col lg:flex-row justify-between items-center gap-10 lg:gap-16">

                    {/* Left Column: Main Heading */}
                    <div className="flex flex-col flex-1 w-full">
                        <h2
                            className="text-3xl sm:text-4xl lg:text-[3.5rem] text-gray-900 leading-[1.1] sm:leading-[1.2]"
                            style={{ fontFamily: 'MainFont, sans-serif' }}
                        >
                            We'd Love to Hear,  <span className="text-[#860000]">From You</span>
                        </h2>
                    </div>

                    {/* Right Column: Description and Button */}
                    <div className="flex flex-col flex-1 lg:max-w-xl">
                        <p className="text-sm leading-relaxed text-gray-900 font-medium mb-8">
                            Whether you're a buyer, a brand, an artist, or simply someone curious about handmade paper<br className="hidden sm:block" />
                            our door is open. Come find us in Sanganer, or reach us wherever you are.
                        </p>

                    </div>

                </div>

            </div>
        </section>
    );
};

export default LovetoHear;