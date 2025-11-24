/**
 * File: src/components/ui/ConfirmModal.jsx
 * 
 * tomiwa: Confirmation Modal Component
 * Reusable modal for confirming destructive actions
 */

'use client';

import React from 'react';
import {
  ExclamationTriangleIcon,
  XMarkIcon,
  CheckCircleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';

// tomiwa: Modal types with different styling
const modalTypes = {
  danger: {
    icon: ExclamationTriangleIcon,
    iconBg: 'bg-red-100',
    iconColor: 'text-red-600',
    primaryButton: 'bg-red-600 hover:bg-red-700 text-white',
    title: 'text-red-900'
  },
  warning: {
    icon: ExclamationTriangleIcon,
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
    primaryButton: 'bg-amber-600 hover:bg-amber-700 text-white',
    title: 'text-amber-900'
  },
  info: {
    icon: InformationCircleIcon,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    primaryButton: 'bg-blue-600 hover:bg-blue-700 text-white',
    title: 'text-blue-900'
  },
  success: {
    icon: CheckCircleIcon,
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
    primaryButton: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    title: 'text-emerald-900'
  }
};

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'danger',
  loading = false,
  className = ''
}) {
  if (!isOpen) return null;

  // tomiwa: Get modal configuration
  const config = modalTypes[type] || modalTypes.danger;
  const IconComponent = config.icon;

  // tomiwa: Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // tomiwa: Handle confirm action
  const handleConfirm = () => {
    if (onConfirm && !loading) {
      onConfirm();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className={`
        bg-white rounded-lg shadow-xl max-w-md w-full p-6 
        transform transition-all duration-200 ease-out
        ${className}
      `}>
        {/* tomiwa: Header with icon and close button */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 ${config.iconBg} rounded-full flex items-center justify-center flex-shrink-0`}>
              <IconComponent className={`w-6 h-6 ${config.iconColor}`} />
            </div>
            <h3 className={`text-xl font-bold ${config.title}`}>
              {title}
            </h3>
          </div>
          
          <button
            onClick={onClose}
            disabled={loading}
            className="p-1 hover:bg-neutral-100 rounded-lg transition-colors disabled:opacity-50"
          >
            <XMarkIcon className="w-5 h-5 text-neutral-400" />
          </button>
        </div>

        {/* tomiwa: Message content */}
        <div className="mb-6">
          <p className="text-neutral-600 leading-relaxed">
            {message}
          </p>
        </div>

        {/* tomiwa: Action buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 px-4 py-2.5 border-2 border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {cancelText}
          </button>
          
          <button
            onClick={handleConfirm}
            disabled={loading}
            className={`
              flex-1 px-4 py-2.5 rounded-lg font-medium transition-colors
              disabled:opacity-50 disabled:cursor-not-allowed
              ${config.primaryButton}
              ${loading ? 'cursor-wait' : ''}
            `}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Processing...
              </div>
            ) : (
              confirmText
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
