"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiSearch, FiShoppingCart, FiMenu, FiX, FiChevronDown } from 'react-icons/fi';
import { useCart } from '@/context/CartContext';
import axios from 'axios';

const Header = () => {
  const pathname = usePathname();
  const { getCartCount } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // New States for Dynamic Dropdown
  const [navigationData, setNavigationData] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);

  // Fetch Categories & Subcategories on mount
  useEffect(() => {
    const fetchNavigationData = async () => {
      try {
        const catRes = await axios.get('/api/categories');
        if (catRes.data.success) {
          const activeCategories = catRes.data.data.filter(cat => cat.isActive);
          
          // Fetch subcategories for all active categories concurrently
          const categoriesWithSubs = await Promise.all(
            activeCategories.map(async (cat) => {
              const subRes = await axios.get(`/api/subcategories?categoryId=${cat.id}`);
              const activeSubs = subRes.data.success 
                ? subRes.data.data.filter(sub => sub.isActive) 
                : [];
              return { ...cat, subCategories: activeSubs };
            })
          );
          
          setNavigationData(categoriesWithSubs);
        }
      } catch (err) {
        console.error("Failed to load navigation data", err);
      }
    };

    fetchNavigationData();
  }, []);

  const getLinkStyle = (path) => {
    const isActive = pathname === path || (path !== '/' && pathname?.startsWith(path));
    return isActive
      ? "text-[#860000] font-bold"
      : "text-gray-900 hover:text-[#860000] transition-colors";
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsMobileProductsOpen(false); // Reset mobile accordion on close
  };

  return (
    <>
      <header 
        className="w-full backdrop-blur-md bg-[rgba(251,251,251,0.2)] border-b border-[rgba(208,195,195,1)] sticky top-0 z-40 text-xs"
        onMouseLeave={() => setIsDropdownOpen(false)} // Close dropdown if mouse leaves header entirely
      >
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-10 xl:px-16 py-3 lg:py-4 relative">

          {/* LEFT SECTION */}
          <div className="flex items-center gap-2">
            {/* Mobile/Tablet: Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 text-gray-900 hover:text-[#860000] transition-colors"
              aria-label="Open menu"
            >
              <FiMenu size={22} />
            </button>

            {/* Desktop: Search Bar */}
            <div className="hidden lg:flex items-center px-4 py-2 border border-[rgba(208,195,195,1)] rounded-full w-44 xl:w-56 bg-transparent">
              <FiSearch className="text-[#a39a9a] shrink-0" size={14} />
              <input
                type="text"
                placeholder="Search handmade paper..."
                className="ml-2 w-full bg-transparent outline-none text-gray-800 placeholder-[#a39a9a] text-xs"
              />
            </div>
          </div>

          {/* CENTER SECTION — Desktop Nav + Logo */}
          <div className="hidden lg:flex justify-center items-center gap-2 xl:gap-4 h-full">
            {/* Left Nav */}
            <nav className="flex items-center space-x-4 xl:space-x-8">
              <Link href="/" className={getLinkStyle('/')}>Home</Link>
              <Link href="/about" className={getLinkStyle('/about')}>About</Link>
              <Link href="/legacy" className={getLinkStyle('/legacy')}>Our Legacy</Link>
              <Link href="/papermaking" className={getLinkStyle('/papermaking')}>Paper Making</Link>
            </nav>

            {/* Logo */}
            <Link href="/" className="shrink-0 mx-3 xl:mx-5 cursor-pointer hover:opacity-80 transition-opacity">
              <img
                src="/images/logo/mainlogo.svg"
                alt="Kagzi India"
                className="h-3 md:h-7 object-contain"
              />
            </Link>

            {/* Right Nav */}
            <nav className="flex items-center space-x-4 xl:space-x-8 h-full">
              <Link href="/collections" className={getLinkStyle('/collections')}>Collections</Link>
              
              {/* DROPDOWN TRIGGER: Products Link */}
              <div 
                className="relative py-4 cursor-pointer flex items-center gap-1 group"
                onMouseEnter={() => setIsDropdownOpen(true)}
              >
                <Link href="/products" className={getLinkStyle('/products')}>Products</Link>
                <FiChevronDown className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180 text-[#860000]' : 'text-gray-900 group-hover:text-[#860000]'}`} size={14} />
              </div>

              <Link href="/faqs" className={getLinkStyle('/faqs')}>FAQ's</Link>
            </nav>
          </div>

          {/* Mobile Center Logo */}
          <Link href="/" className="lg:hidden absolute left-1/2 -translate-x-1/2 cursor-pointer hover:opacity-80 transition-opacity">
            <img
              src="/images/logo/mainlogo.svg"
              alt="Kagzi India"
              className="h-5 md:h-7 object-contain"
            />
          </Link>

          {/* RIGHT SECTION */}
          <div className="flex items-center gap-1 sm:gap-3 shrink-0">
            {/* Cart */}
            <Link href="/cart" className="relative p-2 rounded-full transition-colors">
              <FiShoppingCart size={20} className="text-gray-900" />
              {getCartCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#860000] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </Link>

            {/* Request Quote */}
           <Link href="/contact" className={getLinkStyle('/contact')}>
              <button className="bg-[#860000] text-white px-3 sm:px-5 lg:px-6 xl:px-7 py-2 lg:py-2.5 rounded-full font-semibold text-[10px] sm:text-xs tracking-wide hover:bg-[#680000] transition-colors duration-300 whitespace-nowrap">
                <span className="hidden sm:inline">REQUEST QUOTE</span>
                <span className="sm:hidden">QUOTE</span>
              </button>
            </Link>
          </div>
        </div>

        {/* --- FULL WIDTH DESKTOP DROPDOWN MEGA MENU --- */}
        <div 
          className={`absolute top-full left-0 w-full backdrop-blur-md bg-[#FAF9F6] border-b border-[rgba(208,195,195,1)] transition-all duration-300 ease-in-out origin-top overflow-hidden ${
            isDropdownOpen && navigationData.length > 0 ? 'max-h-[600px] opacity-100 py-10' : 'max-h-0 opacity-0 py-0 border-transparent'
          }`}
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <div className="max-w-7xl mx-auto px-6 flex justify-center gap-12 lg:gap-20 flex-wrap">
            {navigationData.map((category) => (
              <div key={category.id} className="flex flex-col min-w-[140px]">
                {/* Category Heading */}
                <Link 
                  href={`/products?category=${category.id}`} 
                  onClick={() => setIsDropdownOpen(false)}
                  className="text-sm font-semibold text-gray-900 mb-4 hover:text-[#860000] transition-colors border-b border-gray-300 pb-2"
                >
                  {category.name}
                </Link>

                {/* Subcategories List */}
                <ul className="flex flex-col space-y-3">
                  {category.subCategories.length > 0 ? (
                    category.subCategories.map((sub) => (
                      <li key={sub.id}>
                        <Link 
                          href={`/products?category=${category.id}&subcategory=${sub.id}`}
                          onClick={() => setIsDropdownOpen(false)}
                          className="text-[13px] text-gray-600 hover:text-[#860000] transition-colors whitespace-nowrap"
                        >
                          {sub.name}
                        </Link>
                      </li>
                    ))
                  ) : (
                    <li>
                      <Link 
                        href={`/products?category=${category.id}`}
                        onClick={() => setIsDropdownOpen(false)}
                        className="text-[12px] italic text-gray-400 hover:text-[#860000]"
                      >
                        View all {category.name}
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 lg:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={closeMobileMenu}
      />

      {/* Slide-in Menu Panel */}
      <div
        className={`fixed top-0 left-0 h-full w-full bg-white z-50 lg:hidden transform transition-transform duration-300 ease-in-out flex flex-col ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Menu Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[rgba(208,195,195,0.5)]">
          <Link href="/" onClick={closeMobileMenu}>
            <img src="/images/logo/mainlogo.svg" alt="Kagzi India" className="h-8 object-contain" />
          </Link>
          <button
            onClick={closeMobileMenu}
            className="p-2 text-gray-900 hover:text-[#860000] transition-colors"
            aria-label="Close menu"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex flex-col px-6 py-6 space-y-5 overflow-y-auto text-sm">
          <Link href="/" className={getLinkStyle('/')} onClick={closeMobileMenu}>Home</Link>
          <Link href="/about" className={getLinkStyle('/about')} onClick={closeMobileMenu}>About</Link>
          <Link href="/legacy" className={getLinkStyle('/legacy')} onClick={closeMobileMenu}>Our Legacy</Link>
          <Link href="/papermaking" className={getLinkStyle('/papermaking')} onClick={closeMobileMenu}>Paper Making</Link>
          <Link href="/collections" className={getLinkStyle('/collections')} onClick={closeMobileMenu}>Collections</Link>
          
          {/* Mobile Products Accordion */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <Link href="/products" className={getLinkStyle('/products')} onClick={closeMobileMenu}>Products</Link>
              {navigationData.length > 0 && (
                <button 
                  onClick={() => setIsMobileProductsOpen(!isMobileProductsOpen)}
                  className="p-2 text-gray-900 hover:text-[#860000] transition-colors"
                >
                  <FiChevronDown className={`transition-transform duration-300 ${isMobileProductsOpen ? 'rotate-180 text-[#860000]' : ''}`} />
                </button>
              )}
            </div>
            
            {/* Accordion Content */}
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isMobileProductsOpen ? 'max-h-[1000px] mt-4 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="flex flex-col space-y-4 pl-3 border-l-2 border-[rgba(208,195,195,0.4)]">
                {navigationData.map((cat) => (
                  <div key={cat.id} className="flex flex-col">
                    <Link 
                      href={`/products?category=${cat.id}`} 
                      onClick={closeMobileMenu}
                      className="font-bold text-gray-800 text-sm mb-2"
                    >
                      {cat.name}
                    </Link>
                    <div className="flex flex-col space-y-2 pl-3">
                      {cat.subCategories.map((sub) => (
                        <Link 
                          key={sub.id}
                          href={`/products?category=${cat.id}&subcategory=${sub.id}`} 
                          onClick={closeMobileMenu}
                          className="text-gray-500 text-xs hover:text-[#860000]"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Link href="/faqs" className={getLinkStyle('/faqs')} onClick={closeMobileMenu}>FAQ's</Link>
        </nav>

        {/* Bottom CTA */}
        <div className="mt-auto px-6 py-6 border-t border-[rgba(208,195,195,0.5)]">
          <Link href="/contact" onClick={closeMobileMenu}>
            <button className="w-full bg-[#860000] text-white py-3 rounded-full font-semibold text-xs tracking-wide hover:bg-[#680000] transition-colors duration-300">
              REQUEST QUOTE
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;