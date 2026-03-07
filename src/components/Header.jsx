"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiSearch } from 'react-icons/fi';

const Header = () => {
  const pathname = usePathname();

  // Helper function to apply the active styling dynamically
  const getLinkStyle = (path) => {
    // Check if the current pathname matches the link's path.
    // We also check for startswith so that /products/123 keeps the /products link active.
    const isActive = pathname === path || (path !== '/' && pathname?.startsWith(path));
    
    return isActive 
      ? "text-[#860000] font-bold" 
      : "text-gray-900 hover:text-[#860000] transition-colors";
  };

  return (
    <header className="flex items-center justify-between w-full px-8 py-4 backdrop-blur-md bg-[rgba(251,251,251,0.2)] border-b border-[rgba(208,195,195,1)] sticky top-0 z-50 text-xs">
      
      {/* 1. Search Bar */}
      <div className="flex items-center px-4 py-2 border border-[rgba(208,195,195,1)] rounded-full w-52 bg-transparent">
        <FiSearch className="text-[#a39a9a] flex-shrink-0" />
        <input
          type="text"
          placeholder="Search handmade paper..."
          className="ml-3 w-full bg-transparent outline-none text-gray-800 placeholder-[#a39a9a]"
        />
      </div>

      <div className='flex justify-center items-center'>
        {/* 2. Left Navigation */}
        <nav className="hidden lg:flex items-center space-x-8 ">
          <Link href="/" className={getLinkStyle('/')}>Home</Link>
          <Link href="/about" className={getLinkStyle('/about')}>About</Link>
          <Link href="/legacy" className={getLinkStyle('/legacy')}>Our Legacy</Link>
          <Link href="/papermaking" className={getLinkStyle('/papermaking')}>Paper Making</Link>
        </nav>

        {/* 3. Center Logo (Clickable to Home) */}
        <Link href="/" className="flex-shrink-0 mx-4 cursor-pointer hover:opacity-80 transition-opacity">
          <img
            src="/images/logo/mainlogo.svg"
            alt="Kagzi India"
            className="h-10 object-contain"
          />
        </Link>

        {/* 4. Right Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          <Link href="/collections" className={getLinkStyle('/collections')}>Collections</Link>
          <Link href="/products" className={getLinkStyle('/products')}>Products</Link>
          <Link href="/faqs" className={getLinkStyle('/faqs')}>FAQ's</Link>
          <Link href="/contact" className={getLinkStyle('/contact')}>Contact Us</Link>
        </nav>
      </div>

      {/* 5. Request Quote Button (Clickable to Quote Page) */}
      <div className="flex-shrink-0">
        <Link href="/request-quote">
          <button className="bg-[#860000] text-white px-7 py-2.5 rounded-full font-semibold tracking-wide hover:bg-[#680000] transition-colors duration-300">
            REQUEST QUOTE
          </button>
        </Link>
      </div>

    </header>
  );
};

export default Header;