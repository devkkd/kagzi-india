'use client';
import { useState } from 'react';
import { FiMenu, FiLogOut, FiUser, FiBell, FiSearch } from 'react-icons/fi';

export default function AdminHeader({ onMenuClick, admin }) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    window.location.href = '/admin';
  };

  return (
    <header className="bg-white border-b border-[rgba(208,195,195,0.3)] sticky top-0 z-30">
      <div className="flex items-center justify-between px-4 lg:px-6 py-4">
        {/* Left: Menu Button + Search */}
        <div className="flex items-center space-x-4 flex-1">
          {/* Mobile Menu Button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden text-gray-600 hover:text-[#860000] p-2"
          >
            <FiMenu size={24} />
          </button>

          {/* Search Bar */}
          {/* <div className="hidden md:flex items-center bg-[#FAF6F1] rounded-lg px-4 py-2 w-full max-w-md">
            <FiSearch className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none text-sm w-full text-gray-700 placeholder-gray-400"
            />
          </div> */}
        </div>

        {/* Right: Notifications + Profile */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          {/* <button className="relative p-2 text-gray-600 hover:text-[#860000] transition-colors">
            <FiBell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button> */}

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-[#FAF6F1] transition-colors"
            >
              <div className="w-8 h-8 bg-[#860000] rounded-full flex items-center justify-center">
                <FiUser className="text-white" size={16} />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-semibold text-gray-900">
                  {admin?.name || 'Admin'}
                </p>
                <p className="text-xs text-gray-500">{admin?.role || 'admin'}</p>
              </div>
            </button>

            {/* Dropdown Menu */}
            {showProfileMenu && (
              <>
                <div 
                  className="fixed inset-0 z-10"
                  onClick={() => setShowProfileMenu(false)}
                />
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-[rgba(208,195,195,0.3)] py-2 z-20">
                  <div className="px-4 py-2 border-b border-[rgba(208,195,195,0.3)]">
                    <p className="text-sm font-semibold text-gray-900">
                      {admin?.name || 'Admin'}
                    </p>
                    <p className="text-xs text-gray-500">{admin?.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <FiLogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden px-4 pb-4">
        {/* <div className="flex items-center bg-[#FAF6F1] rounded-lg px-4 py-2">
          <FiSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-sm w-full text-gray-700 placeholder-gray-400"
          />
        </div> */}
      </div>
    </header>
  );
}
