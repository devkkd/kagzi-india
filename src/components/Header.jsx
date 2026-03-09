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
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const getLinkStyle = (path) => {
    const isActive = pathname === path || (path !== '/' && pathname?.startsWith(path));
    
    return isActive 
      ? "text-[#860000] font-bold" 
      : "text-gray-900 hover:text-[#860000] transition-colors";
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="w-full backdrop-blur-md bg-[rgba(251,251,251,0.2)] border-b border-[rgba(208,195,195,1)] sticky top-0 z-50 text-xs">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 lg:py-4">
        
        {/* Mobile: Hamburger Menu */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 text-gray-900 hover:text-[#860000] transition-colors"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        {/* Desktop: Search Bar */}
        <div className="hidden lg:flex items-center px-4 py-2 border border-[rgba(208,195,195,1)] rounded-full w-52 bg-transparent">
          <FiSearch className="text-[#a39a9a] shrink-0" />
          <input
            type="text"
            placeholder="Search handmade paper..."
            className="ml-3 w-full bg-transparent outline-none text-gray-800 placeholder-[#a39a9a]"
          />
        </div>

        {/* Mobile: Search Icon */}
        <button 
          onClick={() => setIsSearchOpen(!isSearchOpen)}
          className="lg:hidden p-2 text-gray-900 hover:text-[#860000] transition-colors"
          aria-label="Toggle search"
        >
          <FiSearch size={20} />
        </button>

        <div className='hidden lg:flex justify-center items-center'>
          {/* Desktop: Left Navigation */}
          <nav className="flex items-center space-x-8">
            <Link href="/" className={getLinkStyle('/')}>Home</Link>
            <Link href="/about" className={getLinkStyle('/about')}>About</Link>
            <Link href="/legacy" className={getLinkStyle('/legacy')}>Our Legacy</Link>
            <Link href="/papermaking" className={getLinkStyle('/papermaking')}>Paper Making</Link>
          </nav>

          {/* Center Logo */}
          <Link href="/" className="shrink-0 mx-4 cursor-pointer hover:opacity-80 transition-opacity">
            <img
              src="/images/logo/mainlogo.svg"
              alt="Kagzi India"
              className="h-10 object-contain"
            />
          </Link>

          {/* Desktop: Right Navigation */}
          <nav className="flex items-center space-x-8">
            <Link href="/collections" className={getLinkStyle('/collections')}>Collections</Link>
            <Link href="/products" className={getLinkStyle('/products')}>Products</Link>
            <Link href="/faqs" className={getLinkStyle('/faqs')}>FAQ's</Link>
            <Link href="/contact" className={getLinkStyle('/contact')}>Contact Us</Link>
          </nav>
        </div>

        {/* Mobile: Center Logo */}
        <Link href="/" className="lg:hidden absolute left-1/2 transform -translate-x-1/2 cursor-pointer hover:opacity-80 transition-opacity">
          <img
            src="/images/logo/mainlogo.svg"
            alt="Kagzi India"
            className="h-8 sm:h-10 object-contain"
          />
        </Link>

        {/* Cart & Quote Button */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          {/* Cart Icon */}
          <Link href="/cart" className="relative p-2 rounded-full transition-colors">
            <FiShoppingCart size={20} className="text-gray-900 sm:w-[22px] sm:h-[22px]" />
            {getCartCount() > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#860000] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {getCartCount()}
              </span>
            )}
          </Link>

          {/* Request Quote Button */}
          <Link href="/request-quote">
            <button className="bg-[#860000] text-white px-3 sm:px-5 lg:px-7 py-2 lg:py-2.5 rounded-full font-semibold text-[10px] sm:text-xs tracking-wide hover:bg-[#680000] transition-colors duration-300 whitespace-nowrap">
              <span className="hidden sm:inline">REQUEST QUOTE</span>
              <span className="sm:hidden">QUOTE</span>
            </button>
          </Link>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isSearchOpen && (
        <div className="lg:hidden px-4 pb-3">
          <div className="flex items-center px-4 py-2 border border-[rgba(208,195,195,1)] rounded-full bg-white">
            <FiSearch className="text-[#a39a9a] shrink-0" />
            <input
              type="text"
              placeholder="Search handmade paper..."
              className="ml-3 w-full bg-transparent outline-none text-gray-800 placeholder-[#a39a9a]"
            />
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-[rgba(208,195,195,1)] bg-white">
          <nav className="flex flex-col px-4 py-4 space-y-4">
            <Link href="/" className={`${getLinkStyle('/')} py-2`} onClick={closeMobileMenu}>Home</Link>
            <Link href="/about" className={`${getLinkStyle('/about')} py-2`} onClick={closeMobileMenu}>About</Link>
            <Link href="/legacy" className={`${getLinkStyle('/legacy')} py-2`} onClick={closeMobileMenu}>Our Legacy</Link>
            <Link href="/papermaking" className={`${getLinkStyle('/papermaking')} py-2`} onClick={closeMobileMenu}>Paper Making</Link>
            <Link href="/collections" className={`${getLinkStyle('/collections')} py-2`} onClick={closeMobileMenu}>Collections</Link>
            <Link href="/products" className={`${getLinkStyle('/products')} py-2`} onClick={closeMobileMenu}>Products</Link>
            <Link href="/faqs" className={`${getLinkStyle('/faqs')} py-2`} onClick={closeMobileMenu}>FAQ's</Link>
            <Link href="/contact" className={`${getLinkStyle('/contact')} py-2`} onClick={closeMobileMenu}>Contact Us</Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;