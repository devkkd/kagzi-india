'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from './components/Sidebar';
import AdminHeader from './components/AdminHeader';

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [admin, setAdmin] = useState(null);
  const pathname = usePathname();

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  // Fetch admin info
  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const response = await fetch('/api/admin/verify');
        if (response.ok) {
          const data = await response.json();
          setAdmin(data.admin);
        }
      } catch (error) {
        console.error('Failed to fetch admin:', error);
      }
    };

    // Only fetch if not on login page
    if (pathname !== '/admin') {
      fetchAdmin();
    }
  }, [pathname]);

  // If on login page, render without layout
  if (pathname === '/admin') {
    return children;
  }

  return (
    <div className="flex h-screen bg-[#FAF6F1] overflow-hidden">
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <AdminHeader 
          onMenuClick={() => setSidebarOpen(true)}
          admin={admin}
        />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
