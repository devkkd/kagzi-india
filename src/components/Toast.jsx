'use client';
import React, { useEffect } from 'react';
import { FiCheckCircle, FiX } from 'react-icons/fi';

const Toast = ({ message, onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="fixed bottom-4 right-4 z-9999 animate-slide-in">
      <div className="bg-white border-2 border-[#860000] rounded-lg shadow-lg p-4 flex items-center gap-3 min-w-[300px]">
        <div className="shrink-0">
          <FiCheckCircle className="text-[#860000]" size={24} />
        </div>
        <p className="text-gray-900 font-medium flex-1">{message}</p>
        <button
          onClick={onClose}
          className="shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <FiX size={20} />
        </button>
      </div>
    </div>
  );
};

export default Toast;
