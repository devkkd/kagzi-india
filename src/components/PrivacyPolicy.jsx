import React from 'react';

const PrivacyPolicy = () => {
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
              Privacy Policy
            </span>
            <h1 
              className="text-3xl sm:text-4xl lg:text-5xl text-gray-900 leading-[1.2]"
              style={{ fontFamily: 'Sooner, sans-serif' }}
            >
              Privacy Policy
            </h1>
          </div>

          {/* Right Column: Intro Paragraph */}
          <div className="flex flex-col flex-1 lg:max-w-xl lg:pt-12">
            <p className="text-sm leading-tight text-gray-900 font-medium">
              Kagzi Industries ("we", "us", "our") is committed to protecting the privacy and security of all personal information we collect from visitors to kagziindia.com (the "Website").
            </p>
          </div>

        </div>

        {/* =========================================
            POLICY CONTENT SECTIONS
            ========================================= */}
        <div className="flex flex-col gap-10 max-w-4xl">
          
          {/* Section: What We Collect */}
          <div className="flex flex-col gap-2">
            <h3 className="text-sm sm:text-base font-bold text-gray-900">
              What We Collect
            </h3>
            <p className="text-sm leading-tight text-gray-900 font-medium">
              We collect personal information you provide directly to us – including your name, company name, email address, phone number, country, and any details included in enquiry forms. We also collect standard website analytics data (page visits, browser type, etc.) through cookies and similar technologies.
            </p>
          </div>

          {/* Section: How We Use Your Information */}
          <div className="flex flex-col gap-2">
            <h3 className="text-sm sm:text-base font-bold text-gray-900">
              How We Use Your Information
            </h3>
            <p className="text-sm leading-tight text-gray-900 font-medium mb-1">
              We use your information solely to: respond to your enquiries, process orders and quotations, improve our website and services, and send relevant communications where you have given consent.
            </p>
            <p className="text-sm leading-tight text-gray-900 font-medium">
              We do not sell, rent, or share your personal data with third parties, except where required by law or necessary to fulfil your order (e.g., freight and logistics partners).
            </p>
          </div>

          {/* Section: Data Security */}
          <div className="flex flex-col gap-2">
            <h3 className="text-sm sm:text-base font-bold text-gray-900">
              Data Security
            </h3>
            <p className="text-sm leading-tight text-gray-900 font-medium">
              We take reasonable technical and organisational precautions to protect your personal information from loss, misuse, and unauthorised access. All data is stored on secure servers.
            </p>
          </div>

          {/* Section: Cookies */}
          <div className="flex flex-col gap-2">
            <h3 className="text-sm sm:text-base font-bold text-gray-900">
              Cookies
            </h3>
            <p className="text-sm leading-tight text-gray-900 font-medium">
              Our website uses cookies to enhance your browsing experience. You may disable cookies through your browser settings, though some website features may be affected.
            </p>
          </div>

          {/* Section: Your Rights */}
          <div className="flex flex-col gap-2">
            <h3 className="text-sm sm:text-base font-bold text-gray-900">
              Your Rights
            </h3>
            <p className="text-sm leading-tight text-gray-900 font-medium">
              You have the right to access, correct, or request deletion of your personal data at any time. To exercise these rights, contact us at: sales@kagziindia.com
            </p>
          </div>

          {/* Section: Changes to This Policy */}
          <div className="flex flex-col gap-2">
            <h3 className="text-sm sm:text-base font-bold text-gray-900">
              Changes to This Policy
            </h3>
            <p className="text-sm leading-tight text-gray-900 font-medium">
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.
            </p>
          </div>

          {/* Section: Contact */}
          <div className="flex flex-col gap-2">
            <h3 className="text-sm sm:text-base font-bold text-gray-900">
              Contact
            </h3>
            <p className="text-sm leading-tight text-gray-900 font-medium">
              Kagzi Industries, Khadi Gramodyog Road, Sanganer, Jaipur, Rajasthan 303902, India.<br />
              sales@kagziindia.com | +91 99284 24518
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default PrivacyPolicy;