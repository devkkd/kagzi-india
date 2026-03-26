import React from "react";
import Link from "next/link";

const PaperMakingProcess = () => {
    // Using only 4 stages as requested
    const steps = [
        {
            id: "01.",
            sub: "Stage One",
            title: "Sorting",
            description: "Collected cotton textile waste is hand-sorted - separating clean, unbleached rags from unusable material. Only the purest cotton makes the cut.",
            meta: "100% Cotton | Hand Sorted",
            image: "/images/papermaking/Stages1.jpg",
        },
        {
            id: "02.",
            sub: "Stage Two",
            title: "Cutting",
            description: "Sorted rags are cut into small, uniform pieces - preparing the fibre for efficient soaking and beating. Size matters here; uniformity ensures even pulp.",
            meta: "Uniform Fibre",
            image: "/images/papermaking/Stages2.jpg",
        },
        {
            id: "03.",
            sub: "Stage Three",
            title: "Pulping",
            description: "Cut rags are soaked in clean water then beaten into a fine, silky pulp using traditional wooden mallets. No bleach. No caustic chemicals.",
            meta: "Zero Chemicals | Clean Water",
            image: "/images/papermaking/Stages3.jpg",
        },
        {
            id: "04.",
            sub: "Stage Four",
            title: "Sheet Making",
            description: "Pulp is suspended in open vats. A craftsperson lifts a mould and deckle through the bath - drawing an even fibre layer. This single gesture creates the sheet.",
            meta: "Deckle Edge | By Hand",
            image: "/images/papermaking/Stages4.png",
        },
    ];

    return (
        <section className="w-full pt-16 bg-transparent">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header Section */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
                    <div>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-[1px] bg-[#860000]"></div>
                            <span className="text-[#860000] text-xs font-bold tracking-widest uppercase">
                                Our Paper Making Process
                            </span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl text-gray-900 leading-tight"
                            style={{ fontFamily: 'MainFont, sans-serif' }}
                        >
                            How A Sheet Of Paper Is <br />Born By <span className="text-[#860000] font-bold">Hand</span>
                        </h2>
                    </div>
                    <div className="lg:max-w-xl">
                        <p className="text-sm leading-relaxed text-gray-700">
                            Our process has not changed in centuries. Not because we haven't tried new things but because the old way, done with care, still produces the finest paper on earth. Every stage is attended to by a skilled craftsperson. Not a machine.            </p>
                    </div>
                </div>

                {/* Grid Section - Matching the reference image borders */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-l border-gray-300">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="p-6 flex flex-col border-r border-gray-300 min-h-[500px]"
                        >
                            {/* Card Header */}
                            <div className="mb-8">
                                {/* <span className="block text-3xl font-bold text-gray-900 mb-1">{step.id}</span> */}
                                <span className="block text-[10px] uppercase tracking-tighter font-bold text-gray-700 mb-2"

                                >
                                    {step.id}{step.sub}
                                </span>
                                <h3 className="text-3xl text-gray-900 leading-none"
                                    style={{ fontFamily: 'MainFont, sans-serif' }}
                                >
                                    {step.title}
                                </h3>
                            </div>

                            {/* Description */}
                            <p className="text-sm leading-snug text-gray-800 mb-3 flex-grow">
                                {step.description}
                            </p>
                            {/* Card Footer Metadata */}
                            <div className="pb-4 ">
                                <span className="text-[10px] font-bold uppercase tracking-tight text-gray-900">
                                    {step.meta}
                                </span>
                            </div>

                            {/* Image Section */}
                            <div className="w-full aspect-[4/5] bg-gray-100 overflow-hidden mb-6">
                                <img
                                    src={step.image}
                                    alt={step.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                        </div>
                    ))}
                </div>

                {/* Action Button */}
                <div className="mt-10 flex justify-center">
                    <Link href="/papermaking">
                        <button className="group bg-[#860000] text-white px-10 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#680000] transition-all flex items-center gap-3">
                            View All Paper Making Process
                            <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                        </button>
                    </Link>
                </div>

            </div>
        </section>
    );
};

export default PaperMakingProcess;