'use client';
import { useState, useEffect } from 'react';
import { FiMail, FiPhone, FiUser, FiBriefcase, FiMessageSquare, FiX, FiTrash2, FiEye, FiFilter, FiSearch } from 'react-icons/fi';
import Pagination from '../components/Pagination';

export default function CustomerInquiriesPage() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchInquiries();
  }, [filterStatus, searchTerm]);

  useEffect(() => {
    setCurrentPage(1); // Reset to page 1 when filters change
  }, [filterStatus, searchTerm]);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filterStatus) params.append('status', filterStatus);
      if (searchTerm) params.append('search', searchTerm);

      const response = await fetch(`/api/customer-inquiries?${params}`);
      const data = await response.json();
      
      if (data.success) {
        setInquiries(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch inquiries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const response = await fetch(`/api/customer-inquiries/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        fetchInquiries();
        if (selectedInquiry?._id === id) {
          setSelectedInquiry({ ...selectedInquiry, status: newStatus });
        }
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this inquiry?')) return;

    try {
      const response = await fetch(`/api/customer-inquiries/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        fetchInquiries();
        setShowModal(false);
      }
    } catch (error) {
      console.error('Failed to delete inquiry:', error);
    }
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

  // Pagination logic
  const totalPages = Math.ceil(inquiries.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentInquiries = inquiries.slice(startIndex, endIndex);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Customer Inquiries</h1>
        <p className="text-gray-600 mt-1">Manage contact form submissions</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, phone, or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#860000]"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <FiFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#860000] appearance-none bg-white"
            >
              <option value="">All Status</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Inquiries Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#860000] mx-auto"></div>
          </div>
        ) : inquiries.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No inquiries found
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Company</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentInquiries.map((inquiry) => (
                  <tr key={inquiry._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{inquiry.fullName}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600">{inquiry.email}</div>
                      <div className="text-sm text-gray-600">{inquiry.phone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600">{inquiry.companyName || '-'}</div>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={inquiry.status}
                        onChange={(e) => handleStatusUpdate(inquiry._id, e.target.value)}
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(inquiry.status)} border-0 cursor-pointer`}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="resolved">Resolved</option>
                        <option value="closed">Closed</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(inquiry.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedInquiry(inquiry);
                            setShowModal(true);
                          }}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <FiEye size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(inquiry._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {/* Pagination */}
        {!loading && inquiries.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>

      {/* View Details Modal */}
      {showModal && selectedInquiry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Inquiry Details</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FiX size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Customer Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <FiUser className="mr-2" /> Full Name
                  </label>
                  <p className="text-gray-900">{selectedInquiry.fullName}</p>
                </div>

                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <FiBriefcase className="mr-2" /> Company Name
                  </label>
                  <p className="text-gray-900">{selectedInquiry.companyName || 'N/A'}</p>
                </div>

                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <FiMail className="mr-2" /> Email
                  </label>
                  <p className="text-gray-900">{selectedInquiry.email}</p>
                </div>

                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <FiPhone className="mr-2" /> Phone
                  </label>
                  <p className="text-gray-900">{selectedInquiry.phone}</p>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                  <FiMessageSquare className="mr-2" /> Message
                </label>
                <p className="text-gray-900 bg-gray-50 p-4 rounded-lg whitespace-pre-wrap">
                  {selectedInquiry.message}
                </p>
              </div>

              {/* Status & Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">Status</label>
                  <select
                    value={selectedInquiry.status}
                    onChange={(e) => handleStatusUpdate(selectedInquiry._id, e.target.value)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${getStatusColor(selectedInquiry.status)} border-0 cursor-pointer`}
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">Submitted On</label>
                  <p className="text-gray-900">
                    {new Date(selectedInquiry.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button
                onClick={() => handleDelete(selectedInquiry._id)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete Inquiry
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
