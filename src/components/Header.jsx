"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiSearch, FiShoppingCart, FiMenu, FiX } from 'react-icons/fi';
import { useCart } from '@/context/CartContext';

const Header = () => {
  const pathname = usePathname();
  const { getCartCount } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // Removed isSearchOpen state as mobile search is hidden

  const getLinkStyle = (path) => {
    const isActive = pathname === path || (path !== '/' && pathname?.startsWith(path));
    return isActive
      ? "text-[#860000] font-bold"
      : "text-gray-900 hover:text-[#860000] transition-colors";
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <header className="w-full backdrop-blur-md bg-[rgba(251,251,251,0.2)] border-b border-[rgba(208,195,195,1)] sticky top-0 z-40 text-xs">
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
          <div className="hidden lg:flex justify-center items-center gap-2 xl:gap-4">
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
            <nav className="flex items-center space-x-4 xl:space-x-8">
              <Link href="/collections" className={getLinkStyle('/collections')}>Collections</Link>
              <Link href="/products" className={getLinkStyle('/products')}>Products</Link>
              <Link href="/faqs" className={getLinkStyle('/faqs')}>FAQ's</Link>
              {/* <Link href="/contact" className={getLinkStyle('/contact')}>Contact Us</Link> */}
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
      </header>

      {/* Mobile Overlay (Optional now since menu is full width, but kept to maintain strict functionality) */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 lg:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={closeMobileMenu}
      />

      {/* Slide-in Menu Panel - Changed width to w-full */}
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
          <Link href="/products" className={getLinkStyle('/products')} onClick={closeMobileMenu}>Products</Link>
          <Link href="/faqs" className={getLinkStyle('/faqs')} onClick={closeMobileMenu}>FAQ's</Link>
          {/* <Link href="/contact" className={getLinkStyle('/contact')} onClick={closeMobileMenu}>Contact Us</Link> */}
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