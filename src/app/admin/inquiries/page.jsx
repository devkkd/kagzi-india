'use client';
import { useState, useEffect } from 'react';
import { FiMail, FiPhone, FiUser, FiBuilding, FiMessageSquare, FiX, FiTrash2, FiEye, FiFilter, FiSearch } from 'react-icons/fi';

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  useEffect(() => {
    fetchInquiries();
  }, [filterStatus]);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const url = filterStatus 
        ? `/api/inquiries?status=${filterStatus}`
        : '/api/inquiries';
      
      const response = await fetch(url);
      const data = await response.json();
      if (data.success) setInquiries(data.data);
    } catch (error) {
      console.error('Failed to fetch inquiries:', error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (inquiry) => {
    setSelectedInquiry(inquiry);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedInquiry(null);
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      setUpdatingStatus(true);
      const response = await fetch(`/api/inquiries/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      const data = await response.json();
      if (data.success) {
        await fetchInquiries();
        if (selectedInquiry?.id === id) {
          setSelectedInquiry({ ...selectedInquiry, status: newStatus });
        }
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this inquiry?')) return;

    try {
      const response = await fetch(`/api/inquiries/${id}`, { method: 'DELETE' });
      const data = await response.json();
      if (data.success) {
        await fetchInquiries();
        closeModal();
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert('Failed to delete inquiry');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-700';
      case 'contacted': return 'bg-yellow-100 text-yellow-700';
      case 'resolved': return 'bg-green-100 text-green-700';
      case 'closed': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredInquiries = inquiries.filter(inquiry =>
    inquiry.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inquiry.phone.includes(searchTerm) ||
    (inquiry.companyName && inquiry.companyName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-[#860000] text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Customer Inquiries</h1>
          <p className="text-gray-600 mt-1">Manage customer inquiries and requests</p>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email, phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-[rgba(208,195,195,1)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#860000]"
          />
        </div>

        <div className="relative">
          <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-[rgba(208,195,195,1)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#860000] appearance-none"
          >
            <option value="">All Status</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      {/* Inquiries Table */}
      <div className="bg-white rounded-xl shadow-md border border-[rgba(208,195,195,0.3)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#FAF6F1]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Message
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(208,195,195,0.3)]">
              {filteredInquiries.map((inquiry) => (
                <tr key={inquiry.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-semibold text-gray-900">{inquiry.fullName}</div>
                      {inquiry.companyName && (
                        <div className="text-sm text-gray-500">{inquiry.companyName}</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div className="text-gray-900">{inquiry.email}</div>
                      <div className="text-gray-500">{inquiry.phone}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 line-clamp-2 max-w-xs">
                      {inquiry.message}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(inquiry.status)}`}>
                      {inquiry.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(inquiry.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openModal(inquiry)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <FiEye size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(inquiry.id)}
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

        {/* Empty State */}
        {filteredInquiries.length === 0 && (
          <div className="text-center py-12">
            <FiMessageSquare className="mx-auto text-gray-400 mb-4" size={64} />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No inquiries found</h3>
            <p className="text-gray-600">
              {searchTerm || filterStatus 
                ? 'Try adjusting your filters' 
                : 'No customer inquiries yet'}
            </p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {showModal && selectedInquiry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-2xl w-full my-8">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-[rgba(208,195,195,0.3)]">
              <h2 className="text-xl font-bold text-gray-900">Inquiry Details</h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                <FiX size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Customer Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <FiUser className="mr-2" /> Full Name
                  </label>
                  <p className="text-gray-900">{selectedInquiry.fullName}</p>
                </div>

                {selectedInquiry.companyName && (
                  <div>
                    <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                      <FiBuilding className="mr-2" /> Company Name
                    </label>
                    <p className="text-gray-900">{selectedInquiry.companyName}</p>
                  </div>
                )}

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
                <p className="text-gray-900 bg-gray-50 p-4 rounded-lg">{selectedInquiry.message}</p>
              </div>

              {/* Product Info */}
              {selectedInquiry.product && (
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">
                    Related Product
                  </label>
                  <div className="flex items-center space-x-3 bg-[#FAF6F1] p-3 rounded-lg">
                    {selectedInquiry.product.mainImage && (
                      <img 
                        src={selectedInquiry.product.mainImage} 
                        alt={selectedInquiry.product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                    )}
                    <div>
                      <p className="font-semibold text-gray-900">{selectedInquiry.product.name}</p>
                      {selectedInquiry.product.price && (
                        <p className="text-sm text-[#860000]">₹{selectedInquiry.product.price}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Status Update */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Update Status
                </label>
                <select
                  value={selectedInquiry.status}
                  onChange={(e) => handleStatusUpdate(selectedInquiry.id, e.target.value)}
                  disabled={updatingStatus}
                  className="w-full px-4 py-2 border border-[rgba(208,195,195,1)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#860000]"
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                </select>
              </div>

              {/* Timestamps */}
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                <div>
                  <span className="font-semibold">Created:</span> {new Date(selectedInquiry.createdAt).toLocaleString()}
                </div>
                <div>
                  <span className="font-semibold">Updated:</span> {new Date(selectedInquiry.updatedAt).toLocaleString()}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end space-x-3 p-6 border-t border-[rgba(208,195,195,0.3)]">
              <button
                onClick={() => handleDelete(selectedInquiry.id)}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete Inquiry
              </button>
              <button
                onClick={closeModal}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
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
