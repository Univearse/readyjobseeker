/**
 * File: src/components/ui/MobileBottomSheet.jsx
 * 
 * tomiwa: Mobile Bottom Sheet Component
 * Slide-up modal for mobile application details
 */

'use client';

import React, { useEffect } from 'react';
import {
  XMarkIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';
import RowDetailsDrawer from './RowDetailsDrawer';

export default function MobileBottomSheet({ 
  isOpen, 
  onClose, 
  application,
  onAction,
  className = ''
}) {
  // tomiwa: Handle escape key and backdrop click
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !application) return null;

  // tomiwa: Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* tomiwa: Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 transition-opacity duration-300"
        onClick={handleBackdropClick}
      />
      
      {/* tomiwa: Bottom sheet */}
      <div className={`
        absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl
        transform transition-transform duration-300 ease-out
        max-h-[85vh] overflow-hidden flex flex-col
        ${className}
      `}>
        {/* tomiwa: Handle bar and header */}
        <div className="flex-shrink-0 px-4 py-3 border-b border-neutral-200">
          {/* tomiwa: Drag handle */}
          <div className="w-12 h-1 bg-neutral-300 rounded-full mx-auto mb-3" />
          
          {/* tomiwa: Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={application.companyLogo}
                alt={application.company}
                className="w-10 h-10 rounded-lg object-cover shadow-sm"
              />
              <div>
                <h3 className="font-semibold text-neutral-900 text-sm">
                  {application.jobTitle}
                </h3>
                <p className="text-xs text-neutral-600">
                  {application.company}
                </p>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
            >
              <XMarkIcon className="w-5 h-5 text-neutral-500" />
            </button>
          </div>
        </div>

        {/* tomiwa: Scrollable content */}
        <div className="flex-1 overflow-y-auto">
          <RowDetailsDrawer
            application={application}
            isOpen={true}
            onClose={onClose}
            onAction={onAction}
            className="border-0 bg-transparent"
          />
        </div>
      </div>
    </div>
  );
}
