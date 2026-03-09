'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FiHome, 
  FiPackage, 
  FiShoppingCart, 
  FiUsers, 
  FiSettings,
  FiFileText,
  FiImage,
  FiX,
  FiMessageSquare,
  FiUploadCloud
} from 'react-icons/fi';

const menuItems = [
  { icon: FiHome, label: 'Dashboard', href: '/admin/dashboard' },
  { icon: FiFileText, label: 'Categories', href: '/admin/categories' },
  { icon: FiFileText, label: 'Subcategories', href: '/admin/subcategories' },
  { icon: FiPackage, label: 'Products', href: '/admin/products' },
  { icon: FiUploadCloud, label: 'Bulk Upload', href: '/admin/bulk-upload' },
  { icon: FiMessageSquare, label: 'Product Inquiries', href: '/admin/inquiries' },
  { icon: FiMessageSquare, label: 'Customer Inquiries', href: '/admin/customer-inquiries' },
];

export default function Sidebar({ isOpen, onClose }) {
  const pathname = usePathname();

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-white border-r border-[rgba(208,195,195,0.3)] 
          w-64 z-50 transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static
        `}
      >
        {/* Logo & Close Button */}
        <div className="flex items-center justify-between p-6 border-b border-[rgba(208,195,195,0.3)]">
          <div className="flex items-center space-x-3">
            <img 
              src="/images/logo/mainlogo.svg" 
              alt="Kagzi India" 
              className="h-8"
            />
          </div>
          <button
            onClick={onClose}
            className="lg:hidden text-gray-600 hover:text-[#860000]"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`
                  flex items-center space-x-3 px-4 py-3 rounded-lg
                  transition-colors duration-200
                  ${isActive 
                    ? 'bg-[#860000] text-white' 
                    : 'text-gray-700 hover:bg-[#FAF6F1] hover:text-[#860000]'
                  }
                `}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[rgba(208,195,195,0.3)]">
          <div className="text-xs text-gray-500 text-center">
            <p>Kagzi India Admin</p>
            <p className="mt-1">v1.0.0</p>
          </div>
        </div>
      </aside>
    </>
  );
}
