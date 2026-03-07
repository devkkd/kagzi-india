'use client';
import { useEffect, useState } from 'react';
import { FiPackage, FiUsers, FiShoppingCart, FiTrendingUp } from 'react-icons/fi';

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 500);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-[#860000] text-xl">Loading...</div>
      </div>
    );
  }

  const stats = [
    { icon: FiPackage, label: 'Total Products', value: '156', change: '+12%', color: 'bg-blue-500' },
    { icon: FiShoppingCart, label: 'Orders', value: '89', change: '+23%', color: 'bg-green-500' },
    { icon: FiUsers, label: 'Customers', value: '1,234', change: '+8%', color: 'bg-purple-500' },
    { icon: FiTrendingUp, label: 'Revenue', value: '₹2.4L', change: '+15%', color: 'bg-[#860000]' }
  ];

  return (
    <div className="p-4 lg:p-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
          Welcome back! 👋
        </h1>
        <p className="text-gray-600">Here's what's happening with your store today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md border border-[rgba(208,195,195,0.3)] p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="text-white text-xl" />
              </div>
              <span className="text-green-600 text-sm font-semibold">{stat.change}</span>
            </div>
            <h3 className="text-gray-600 text-sm mb-1">{stat.label}</h3>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-md border border-[rgba(208,195,195,0.3)] p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border-2 border-[#860000] text-[#860000] rounded-lg hover:bg-[#860000] hover:text-white transition-colors font-semibold">
            Add New Product
          </button>
          <button className="p-4 border-2 border-[#860000] text-[#860000] rounded-lg hover:bg-[#860000] hover:text-white transition-colors font-semibold">
            View Orders
          </button>
          <button className="p-4 border-2 border-[#860000] text-[#860000] rounded-lg hover:bg-[#860000] hover:text-white transition-colors font-semibold">
            Manage Customers
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-md border border-[rgba(208,195,195,0.3)] p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="flex items-center justify-between p-4 bg-[#FAF6F1] rounded-lg hover:shadow-md transition-shadow">
              <div>
                <p className="font-semibold text-gray-900">New order received</p>
                <p className="text-sm text-gray-600">Order #1234{item} - ₹2,500</p>
              </div>
              <span className="text-sm text-gray-500">{item} hours ago</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
