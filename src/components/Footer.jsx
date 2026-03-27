import React from 'react';

const Footer = () => {
  // Organized link data for easy mapping and maintenance
  const footerLinks = [
    {
      title: 'Diaries & Notebooks',
      links: ['Leather Diary', 'Executive Diary', 'New Year Diaries', 'Notebooks']
    },
    {
      title: 'Gift Packaging',
      links: ['Gift Box', 'Paper Gift Box', 'Metal Gift Box', 'Sweet Boxes', 'Printed Cake Box', 'Slip Box', 'Paper Container Boxes']
    },
    {
      title: 'Bags',
      links: ['Shopping Bag', 'Paper Bag', 'Handmade Paper Bags']
    },
    {
      title: 'Specialty Boxes',
      links: ['Jewellery Boxes', 'Makeup Boxes', 'Tissue Paper Box']
    },
    {
      title: 'Decor & Accessories',
      links: ['Photo Frame', 'Other Products']
    },
    {
      title: 'Quick Links',
      links: ['Our Story', 'The Craft', 'Sustainability', 'B2B Partnerships', 'Blog']
    }
  ];

  const socialLinks = [
    { name: 'Instagram', icon: '/images/icons/instagram.svg' },
    { name: 'Facebook', icon: '/images/icons/facebook.png' },
    { name: 'YouTube', icon: '/images/icons/youtube.png' }
  ];

  return (
    <footer className="w-full bg-[#860000] text-white pt-6 sm:pt-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* =========================================
            TOP SECTION: INFO & LINKS GRID
            ========================================= */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-9 gap-x-6 gap-y-12 mb-4 sm:mb-5">

          {/* Column 1: Company Info */}
          <div className="col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-2 flex flex-col pr-4">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6">
              <img
                src="/images/logo/Kagzi.svg"
                alt="Kagzi India Background"/>
            </h2>
            <p className="text-sm leading-tight mb-8 text-gray-100">
              Born in Jaipur. Made by hand. Shipped with care to 30+ countries. We make paper that lasts - for writing, wrapping, and everything worth keeping.
            </p>
            <p className="text-sm leading-tight mb-4 text-gray-100">+91 99284 24518</p>
            <p className="text-sm leading-tight text-gray-100">sales@kagziindia.com</p>
          </div>

          {/* Columns 2-7: Mapped Links */}
          {footerLinks.map((section, index) => (
            <div key={index} className="flex flex-col">
              <h3 className="text-xs font-bold mb-5 tracking-wide">
                {section.title}
              </h3>
              <ul className="flex flex-col">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href="#" className="text-xs leading-tight text-gray-200 hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Column 8: Follow Us */}
          <div className="flex flex-col">
            <h3 className="text-sm font-bold mb-5 tracking-wide">
              Follow Us
            </h3>
            <ul className="flex flex-col gap-4">
              {socialLinks.map((social, index) => (
                <li key={index}>
                  <a href="#" className="flex items-center gap-3 group">
                    <img
                      src={social.icon}
                      alt={social.name}
                      className="w-6 h-6 object-contain group-hover:scale-110 transition-transform"
                    />
                    <span className="text-sm leading-tight text-gray-200 group-hover:text-white transition-colors">
                      {social.name}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* =========================================
            MIDDLE SECTION: COPYRIGHT & LEGAL
            ========================================= */}
        <div className="border-t border-[#D0C3C3] py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm leading-tight text-gray-200">
          <p>
            © 2026 Kagzi Industries. All rights reserved. Made in Jaipur, India.
          </p>
          <div className="flex items-center gap-3">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <span>|</span>
            <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
          </div>
        </div>

      </div>

      {/* =========================================
          BOTTOM SECTION: GIANT LOGO
          ========================================= */}
      <div className="w-full flex justify-center px-4 pb-10 pt-8 sm:px-20 sm:pb-16 sm:pt-12 translate-y-2 sm:translate-y-4">
        <img
          src="/images/logo/mainlogo.svg"
          alt="Kagzi India Background"
          // `brightness-0 invert` ensures the logo turns pure white regardless of its original SVG color
          className="w-[75%] max-w-7xl h-auto object-contain brightness-0 invert opacity-95"
        />
      </div>

    </footer>
  );
};

export default Footer;