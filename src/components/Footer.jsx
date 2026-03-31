"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';

const Footer = () => {
  const [dynamicCategories, setDynamicCategories] = useState([]);

  // Fetch Categories & Subcategories dynamically
  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const catRes = await axios.get('/api/categories');
        if (catRes.data.success) {
          // Get active categories and limit to 5
          const activeCategories = catRes.data.data.filter(cat => cat.isActive).slice(0, 5);
          
          const categoriesWithSubs = await Promise.all(
            activeCategories.map(async (cat) => {
              const subRes = await axios.get(`/api/subcategories?categoryId=${cat.id}`);
              const activeSubs = subRes.data.success 
                ? subRes.data.data.filter(sub => sub.isActive) 
                : [];
              return { 
                title: cat.name, 
                id: cat.id,
                links: activeSubs.map(sub => ({
                  name: sub.name,
                  url: `/products?category=${cat.id}&subcategory=${sub.id}`
                }))
              };
            })
          );
          
          setDynamicCategories(categoriesWithSubs);
        }
      } catch (err) {
        console.error("Failed to load footer categories", err);
      }
    };

    fetchFooterData();
  }, []);

  // Static Quick Links
  const quickLinks = {
    title: 'Quick Links',
    links: [
      { name: 'About Us', url: '/about' },
      { name: 'Our Legacy', url: '/legacy' },
      { name: 'Paper Making', url: '/papermaking' },
      { name: 'Contact Us', url: '/contact' },
      { name: 'FAQ\'s', url: '/faqs' }
    ]
  };

  const socialLinks = [
    { name: 'Instagram', icon: '/images/icons/instagram.svg', url: '#' },
    { name: 'Facebook', icon: '/images/icons/facebook.png', url: '#' },
    { name: 'YouTube', icon: '/images/icons/youtube.png', url: '#' }
  ];

  return (
    <footer className="w-full bg-[#860000] text-white pt-6 sm:pt-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* =========================================
            TOP SECTION: INFO & LINKS GRID
            ========================================= */}
        {/* CHANGED HERE: Grid on mobile/tablet, Flex + justify-between on Desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:flex lg:flex-row lg:justify-between w-full gap-x-6 gap-y-12 mb-4 sm:mb-5">

          {/* Column 1: Company Info */}
          {/* CHANGED HERE: Added lg:w-[30%] lg:max-w-xs so it takes up proper space in flex mode */}
          <div className="col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-1 lg:w-[30%] lg:max-w-xs flex flex-col pr-4">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6">
              <img
                src="/images/logo/Kagzi.svg"
                alt="Kagzi India Background" />
            </h2>
            <div className="text-sm leading-tight mb-8 text-gray-100">
              <span className="font-bold block mb-1">Kagzi Industries</span>
              Khadi Gramodyog Road,<br />
              Near Sanganer Stadium,<br />
              Sanganer, Jaipur, Rajasthan 303902<br />
              India 
            </div>
            <p className="text-sm leading-tight mb-4 text-gray-100">+91 99284 24518 <br /> +91 70234 77993</p>
            <p className="text-sm leading-tight text-gray-100">sales@kagziindia.com <br /> sharifkagzi039@gmail.com</p>
          </div>

          {/* Columns 2-6: Dynamic Categories & Subcategories */}
          {dynamicCategories.map((section, index) => (
            <div key={section.id || index} className="flex flex-col lg:w-auto">
              <Link href={`/products?category=${section.id}`}>
                <h3 className="text-xs font-bold mb-5 tracking-wide hover:text-gray-300 transition-colors cursor-pointer">
                  {section.title}
                </h3>
              </Link>
              <ul className="flex flex-col gap-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link href={link.url} className="text-xs leading-tight text-gray-200 hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
                {section.links.length === 0 && (
                  <li>
                    <Link href={`/products?category=${section.id}`} className="text-xs leading-tight text-gray-400 italic hover:text-white transition-colors">
                      View all
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          ))}

          {/* Column 7: Quick Links */}
          <div className="flex flex-col lg:w-auto">
            <h3 className="text-xs font-bold mb-5 tracking-wide">
              {quickLinks.title}
            </h3>
            <ul className="flex flex-col gap-2">
              {quickLinks.links.map((link, linkIndex) => (
                <li key={linkIndex}>
                  <Link href={link.url} className="text-xs leading-tight text-gray-200 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 8: Follow Us */}
          <div className="flex flex-col lg:w-auto">
            <h3 className="text-sm font-bold mb-5 tracking-wide">
              Follow Us
            </h3>
            <ul className="flex flex-col gap-4">
              {socialLinks.map((social, index) => (
                <li key={index}>
                  <a href={social.url} className="flex items-center gap-3 group">
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
            <Link href="/privacy_policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span>|</span>
            <Link href="/Terms&Conditions" className="hover:text-white transition-colors">Terms & Conditions</Link>
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
          className="w-[75%] max-w-7xl h-auto object-contain brightness-0 invert opacity-95"
        />
      </div>

    </footer>
  );
};

export default Footer;