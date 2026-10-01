'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

export default function EventPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check if popup was already shown in this session
    const popupShown = sessionStorage.getItem('eventPopupShown');
    if (!popupShown) {
      // Delay popup by 500ms for better UX
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem('eventPopupShown', 'true');
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!mounted || !isOpen) return null;

  return (
    <>
      {/* Backdrop with blur */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Popup Container */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="relative w-full max-w-[500px] bg-white rounded-2xl shadow-2xl overflow-hidden animate-fadeIn">
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full transition-colors duration-200 bg-white/90 hover:bg-white"
            aria-label="Close popup"
          >
            <X size={24} className="text-gray-700" />
          </button>

          {/* Banner Image - Responsive */}
          <div className="relative w-full">
            <Image
              src="/expo1.png"
              alt="IHGF Delhi Fair Autumn 2026"
              width={500}
              height={680}
              priority
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
}
