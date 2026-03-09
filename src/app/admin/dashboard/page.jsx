'use client';
import { useEffect, useState } from 'react';
import { FiPackage, FiUsers, FiShoppingCart, FiMessageSquare, FiMail } from 'react-icons/fi';
import Link from 'next/link';

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    totalSubcategories: 0,
    productInquiries: 0,
    customerInquiries: 0,
    newInquiries: 0
  });
  const [recentInquiries, setRecentInquiries] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch all data in parallel
      const [productsRes, categoriesRes, subcategoriesRes, productInquiriesRes, customerInquiriesRes] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/categories'),
        fetch('/api/subcategories'),
        fetch('/api/inquiries'),
        fetch('/api/customer-inquiries')
      ]);

      const [products, categories, subcategories, productInquiries, customerInquiries] = await Promise.all([
        productsRes.json(),
        categoriesRes.json(),
        subcategoriesRes.json(),
        productInquiriesRes.json(),
        customerInquiriesRes.json()
      ]);

      // Calculate stats
      const newProductInquiries = productInquiries.data?.filter(i => i.status === 'new').length || 0;
      const newCustomerInquiries = customerInquiries.data?.filter(i => i.status === 'new').length || 0;

      setStats({
        totalProducts: products.data?.length || 0,
        totalCategories: categories.data?.length || 0,
        totalSubcategories: subcategories.data?.length || 0,
        productInquiries: productInquiries.data?.length || 0,
        customerInquiries: customerInquiries.data?.length || 0,
        newInquiries: newProductInquiries + newCustomerInquiries
      });

      // Get recent inquiries (combine both types)
      const allInquiries = [
        ...(productInquiries.data || []).map(i => ({ ...i, type: 'product' })),
        ...(customerInquiries.data || []).map(i => ({ ...i, type: 'customer' }))
      ];
      
      // Sort by date and take latest 5
      const sorted = allInquiries.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setRecentInquiries(sorted.slice(0, 5));

    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#860000]"></div>
      </div>
    );
  }

  const statCards = [
    { 
      icon: FiPackage, 
      label: 'Total Products', 
      value: stats.totalProducts, 
      color: 'bg-blue-500',
      link: '/admin/products'
    },
    { 
      icon: FiMessageSquare, 
      label: 'Product Inquiries', 
      value: stats.productInquiries, 
      badge: stats.newInquiries > 0 ? `${stats.newInquiries} new` : null,
      color: 'bg-green-500',
      link: '/admin/inquiries'
    },
    { 
      icon: FiMail, 
      label: 'Customer Inquiries', 
      value: stats.customerInquiries, 
      color: 'bg-purple-500',
      link: '/admin/customer-inquiries'
    },
    { 
      icon: FiShoppingCart, 
      label: 'Categories', 
      value: stats.totalCategories, 
      color: 'bg-[#860000]',
      link: '/admin/categories'
    }
  ];

  const getTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    return `${Math.floor(seconds / 86400)} days ago`;
  };

  const getStatusColor = (status) => {
    const colors = {
      new: 'bg-blue-100 text-blue-800',
      contacted: 'bg-yellow-100 text-yellow-800',
      resolved: 'bg-green-100 text-green-800',
      closed: 'bg-gray-100 text-gray-800'
    };
    return colors[status] || colors.new;
  };

  return (
    <div className="p-4 lg:p-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
          Welcome back! 
        </h1>
        <p className="text-gray-600">Here's what's happening with your store today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
        {statCards.map((stat, index) => (
          <Link 
            key={index} 
            href={stat.link}
            className="bg-white rounded-xl shadow-md border border-[rgba(208,195,195,0.3)] p-6 hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="text-white text-xl" />
              </div>
              {stat.badge && (
                <span className="bg-red-100 text-red-800 text-xs font-semibold px-2 py-1 rounded-full">
                  {stat.badge}
                </span>
              )}
            </div>
            <h3 className="text-gray-600 text-sm mb-1">{stat.label}</h3>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-md border border-[rgba(208,195,195,0.3)] p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Link 
            href="/admin/products"
            className="p-4 border-2 border-[#860000] text-[#860000] rounded-lg hover:bg-[#860000] hover:text-white transition-colors font-semibold text-center"
          >
            Add New Product
          </Link>
          <Link 
            href="/admin/categories"
            className="p-4 border-2 border-[#860000] text-[#860000] rounded-lg hover:bg-[#860000] hover:text-white transition-colors font-semibold text-center"
          >
            Manage Categories
          </Link>
          <Link 
            href="/admin/inquiries"
            className="p-4 border-2 border-[#860000] text-[#860000] rounded-lg hover:bg-[#860000] hover:text-white transition-colors font-semibold text-center"
          >
            View Inquiries
          </Link>
          <Link 
            href="/admin/customer-inquiries"
            className="p-4 border-2 border-[#860000] text-[#860000] rounded-lg hover:bg-[#860000] hover:text-white transition-colors font-semibold text-center"
          >
            Customer Messages
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-md border border-[rgba(208,195,195,0.3)] p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Recent Inquiries</h2>
          <Link 
            href="/admin/inquiries"
            className="text-[#860000] text-sm font-semibold hover:underline"
          >
            View All
          </Link>
        </div>
        
        {recentInquiries.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No recent inquiries
          </div>
        ) : (
          <div className="space-y-4">
            {recentInquiries.map((inquiry, index) => (
              <div key={inquiry._id || `inquiry-${index}`}>
                <Link
                  href={inquiry.type === 'product' ? '/admin/inquiries' : '/admin/customer-inquiries'}
                  className="flex items-center justify-between p-4 bg-[#FAF6F1] rounded-lg hover:shadow-md transition-shadow"
                >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-gray-900">{inquiry.fullName}</p>
                    <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${getStatusColor(inquiry.status)}`}>
                      {inquiry.status}
                    </span>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                      {inquiry.type === 'product' ? 'Product' : 'Customer'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{inquiry.email} • {inquiry.phone}</p>
                  {inquiry.companyName && (
                    <p className="text-xs text-gray-500 mt-1">{inquiry.companyName}</p>
                  )}
                </div>
                <span className="text-sm text-gray-500 ml-4">{getTimeAgo(inquiry.createdAt)}</span>
              </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
