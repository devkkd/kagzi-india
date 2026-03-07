import React from 'react';
import { FiSearch } from 'react-icons/fi';

const Header = () => {
  return (
    <header className="flex items-center justify-between w-full px-8 py-4 backdrop-blur-md bg-[rgba(251,251,251,0.2)] border-b border-[rgba(208,195,195,1)] sticky top-0 z-50">
      
      {/* 1. Search Bar */}
      <div className="flex items-center px-4 py-2 border border-[rgba(208,195,195,1)] rounded-full w-64 bg-transparent">
        <FiSearch className="text-[#a39a9a] text-lg flex-shrink-0" />
        <input
          type="text"
          placeholder="Search handmade paper..."
          className="ml-3 w-full bg-transparent outline-none text-sm text-gray-800 placeholder-[#a39a9a]"
        />
      </div>

      {/* 2. Left Navigation */}
      <nav className="hidden lg:flex items-center space-x-8 text-base">
        <a href="#" className="text-gray-900 hover:text-[#860000] transition-colors">Home</a>
        {/* Active Link */}
        <a href="#" className="text-[#860000] font-bold">About</a>
        <a href="#" className="text-gray-900 hover:text-[#860000] transition-colors">Our Legacy</a>
        <a href="#" className="text-gray-900 hover:text-[#860000] transition-colors">Paper Making</a>
      </nav>

      {/* 3. Center Logo */}
      <div className="flex-shrink-0 mx-4">
        <img
          src="/images/logo/mainlogo.svg"
          alt="Kagzi India"
          className="h-10 object-contain"
        />
      </div>

      {/* 4. Right Navigation */}
      <nav className="hidden lg:flex items-center space-x-8 text-base">
        <a href="#" className="text-gray-900 hover:text-[#860000] transition-colors">Collections</a>
        <a href="#" className="text-gray-900 hover:text-[#860000] transition-colors">Products</a>
        <a href="#" className="text-gray-900 hover:text-[#860000] transition-colors">FAQ's</a>
        <a href="#" className="text-gray-900 hover:text-[#860000] transition-colors">Contact Us</a>
      </nav>

      {/* 5. Request Quote Button */}
      <div className="flex-shrink-0">
        <button className="bg-[#860000] text-white px-7 py-2.5 rounded-full text-sm font-semibold tracking-wide hover:bg-[#680000] transition-colors duration-300">
          REQUEST QUOTE
        </button>
      </div>

    </header>
  );
};

export default Header;