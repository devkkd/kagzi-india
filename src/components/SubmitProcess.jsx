import React from 'react';

const SubmitProcess = () => {
  // Step data extracted directly from the design
  const steps = [
    {
      id: 1,
      title: 'Step 1',
      desc: 'Our team reviews your enquiry within 24 business hours.'
    },
    {
      id: 2,
      title: 'Step 2',
      desc: 'We reach out to discuss your requirements in detail product specs, quantities, timelines.'
    },
    {
      id: 3,
      title: 'Step 3',
      desc: 'We share a formal quotation along with product samples if required.'
    },
    {
      id: 4,
      title: 'Step 4',
      desc: 'Once approved, we begin production. Lead times shared at quotation stage.'
    },
    {
      id: 5,
      title: 'Step 5',
      desc: 'We pack and dispatch your order with export-grade protective packaging.'
    }
  ];

  return (
    <section className="w-full py-20 sm:py-24 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Heading */}
        <h2 
          className="text-3xl sm:text-4xl lg:text-5xl text-gray-900 leading-[1.2] mb-12 sm:mb-16"
          style={{ fontFamily: 'Sooner, sans-serif' }}
        >
          What Happens After You Submit
        </h2>

        {/* Steps Container (Stack vertically on mobile, row on desktop) */}
        <div className="flex flex-col lg:flex-row w-full border-t border-b border-gray-300 divide-y lg:divide-y-0 lg:divide-x divide-gray-300">
          
          {steps.map((step) => (
            <div 
              key={step.id} 
              className="flex flex-col flex-1 py-8 lg:py-10 lg:px-6 lg:first:pl-0 lg:last:pr-0"
            >
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
                {step.title}
              </h3>
              <p className="text-sm leading-tight text-gray-900 font-medium pr-2">
                {step.desc}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default SubmitProcess;