import React from 'react';

const TermsConditions = () => {
  const termsData = [
    {
      id: 1,
      title: '1. General',
      desc: 'By accessing this website or submitting an enquiry, you agree to be bound by these Terms. These Terms apply to all visitors, users, and customers. We reserve the right to update these Terms at any time.'
    },
    {
      id: 2,
      title: '2. Products & Orders',
      desc: 'All products listed on our website are subject to availability. As our products are handmade, slight variations in texture, colour, and dimensions are inherent to the nature of the craft and are not considered defects. Product images are representative and actual products may vary slightly.'
    },
    {
      id: 3,
      title: '3. Custom Orders',
      desc: 'Custom product orders require a formal quotation and confirmed purchase order. Production begins only after written approval of specifications and receipt of agreed advance payment. Lead times are confirmed at the quotation stage.'
    },
    {
      id: 4,
      title: '4. Pricing & Payment',
      desc: 'All prices are quoted in the currency specified in each formal quotation. Kagzi Industries reserves the right to adjust pricing based on material costs and order specifications. Payment terms are as specified in the issued quotation.'
    },
    {
      id: 5,
      title: '5. Cancellations & Returns',
      desc: 'For custom and made-to-order products, cancellations after production commencement may not be accepted and may attract cancellation charges. We are committed to delivering products to specification; in the event of a manufacturing defect, we will work with you to find an equitable resolution. Please contact us within 7 days of receiving your order with any concerns.'
    },
    {
      id: 6,
      title: '6. Shipping & Delivery',
      desc: 'Estimated shipping timelines are provided at quotation stage and are estimates only. Kagzi Industries is not liable for delays caused by customs, freight carriers, or circumstances beyond our control.'
    },
    {
      id: 7,
      title: '7. Intellectual Property',
      desc: 'All content on this website – including text, images, logos, and design – is the intellectual property of Kagzi Industries and may not be reproduced without written permission.'
    },
    {
      id: 8,
      title: '8. Limitation of Liability',
      desc: 'To the fullest extent permitted by law, Kagzi Industries shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or website.'
    },
    {
      id: 9,
      title: '9. Governing Law',
      desc: 'These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts of Jaipur, Rajasthan.'
    }
  ];

  return (
    <section className="w-full py-20 sm:py-24 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* =========================================
            HEADER SECTION
            ========================================= */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-10 lg:gap-16 mb-16 lg:mb-20">
          
          {/* Left Column: Pre-Title & Main Heading */}
          <div className="flex flex-col flex-1 w-full">
            <span className="text-sm leading-tight font-medium text-gray-900 mb-6">
              Terms & Conditions
            </span>
            <h1 
              className="text-3xl sm:text-4xl lg:text-5xl text-gray-900 leading-[1.2]"
              style={{ fontFamily: 'Sooner, sans-serif' }}
            >
              Terms & Conditions
            </h1>
          </div>

          {/* Right Column: Intro Paragraph */}
          <div className="flex flex-col flex-1 lg:max-w-xl lg:pt-12">
            <p className="text-sm leading-tight text-gray-900 font-medium">
              Please read these Terms and Conditions carefully before using the kagziindia.com website or placing any order with Kagzi Industries.
            </p>
          </div>

        </div>

        {/* =========================================
            TERMS CONTENT SECTIONS
            ========================================= */}
        <div className="flex flex-col gap-10 max-w-5xl">
          
          {/* Map through the first 9 standard text terms */}
          {termsData.map((term) => (
            <div key={term.id} className="flex flex-col gap-2">
              <h3 className="text-sm sm:text-base font-bold text-gray-900">
                {term.title}
              </h3>
              <p className="text-sm leading-tight text-gray-900 font-medium">
                {term.desc}
              </p>
            </div>
          ))}

          {/* Special hardcoded 10th term for line breaks in the contact section */}
          <div className="flex flex-col gap-2">
            <h3 className="text-sm sm:text-base font-bold text-gray-900">
              10. Contact
            </h3>
            <p className="text-sm leading-tight text-gray-900 font-medium">
              For any questions regarding these Terms, contact us at:<br />
              Kagzi Industries, Sanganer, Jaipur, Rajasthan 303902, India.<br />
              sales@kagziindia.com | +91 99284 24518
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default TermsConditions;