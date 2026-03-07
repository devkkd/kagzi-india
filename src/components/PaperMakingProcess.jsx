import React from "react";

const PaperMakingProcess = () => {
    const steps = [
        {
            id: "01.",
            title: "Sourcing Cotton Rags",
            description:
                "We begin with discarded cotton fabric clean, unbleached remnants that most discard. To us, they are the raw soul of the paper yet to be born.",
            image: "/images/home/Feeling1.svg",
        },
        {
            id: "02.",
            title: "Soaking & Beating",
            description:
                "The cotton is soaked in water for hours, then beaten into a fine pulp using traditional wooden mallets and water-powered beaters no harsh chemicals, no shortcuts.",
            image: "/images/home/Feeling2.svg",
        },
        {
            id: "03.",
            title: "Vat Immersion",
            description:
                "The pulp is suspended in large open vats of water. This milky bath is where a sheet of paper is first imagined a cloud of possibility.",
            image: "/images/home/Feeling3.svg",
        },
        {
            id: "04.",
            title: "Sheet Lifting",
            description:
                "A craftsperson submerges a wooden mould and deckle, then lifts it steady, even drawing an even layer of fibre from the vat. This is the moment the sheet is born.",
            image: "/images/home/Feeling4.svg",
        },
        {
            id: "05.",
            title: "Drying in Sun",
            description:
                "The freshly formed sheet is pressed and laid on a cotton surface to dry in open air under Rajasthan's generous sun. No dryers. Just light and wind and patience.",
            image: "/images/home/Feeling5.svg",
        },
        {
            id: "06.",
            title: "Finishing & Colour",
            description:
                "Where colour is required, only natural dyes indigo, turmeric, pomegranate rind are used. Each sheet is sorted by hand and packed with care.",
            image: "/images/home/Feeling6.svg",
        },
    ];

    return (
        <section className="w-full pt-8 sm:pt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">

                    <div>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-[1px] bg-[#860000]"></div>
                            <span className="text-[#860000] text-sm font-semibold tracking-wider uppercase">
                                Our Paper Making Process
                            </span>
                        </div>

                        <h2
                            className="text-4xl sm:text-5xl text-gray-900 leading-tight"
                            style={{ fontFamily: "Sooner, sans-serif" }}
                        >
                            From Fibre to <span className="text-[#860000]">Feeling</span>
                        </h2>
                    </div>

                    <div className="lg:max-w-md">
                        <p className="text-sm leading-tight text-gray-900 font-medium">
                            Every sheet of Kagzi paper passes through six stages of
                            transformation each one attended to by a human hand, not a machine.
                        </p>
                    </div>
                </div>

                {/* Grid Section */}
                <div
                    className="
    grid grid-cols-1 
    md:grid-cols-2 
    lg:grid-cols-3
  "
                >
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="
        pt-8 pb-4 sm:pb-8 px-4 sm:px-8 flex flex-col
        
        /* Vertical lines */
        md:[&:nth-child(odd)]:border-r
        lg:[&:not(:nth-child(3n))]:border-r
        
        /* Horizontal line only after first row on lg */
        lg:[&:nth-child(-n+3)]:border-b
        
        border-gray-300
      "
                        >
                            <span className="text-3xl font-bold text-gray-900 mb-2">
                                {step.id}
                            </span>

                            <h3 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">
                                {step.title}
                            </h3>

                            <p className="text-sm leading-tight text-gray-800 mb-10 flex-grow">
                                {step.description}
                            </p>

                            <div className="w-full flex justify-center mt-auto">
                                <img
                                    src={step.image}
                                    alt={step.title}
                                    className="w-full h-auto object-contain"
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Button */}
                <div className="mt-16 flex justify-center">
                    <button className="bg-[#860000] text-white px-8 py-3.5 rounded-full text-sm font-medium hover:bg-[#680000] transition-colors flex items-center gap-2">
                        View All Paper Making Process <span>&rarr;</span>
                    </button>
                </div>

            </div>
        </section>
    );
};

export default PaperMakingProcess;