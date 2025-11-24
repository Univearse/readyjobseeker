/**
 * File: src/components/ui/Toast.jsx
 * 
 * tomiwa: Toast Notification Component
 * Displays temporary notifications with different types and auto-dismiss
 */

'use client';

import React, { useEffect, useState } from 'react';
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  XMarkIcon
} from '@heroicons/react/24/solid';

// tomiwa: Toast types configuration
const toastTypes = {
  success: {
    icon: CheckCircleIcon,
    bg: 'bg-emerald-500',
    iconColor: 'text-white',
    textColor: 'text-white'
  },
  error: {
    icon: ExclamationCircleIcon,
    bg: 'bg-red-500',
    iconColor: 'text-white',
    textColor: 'text-white'
  },
  warning: {
    icon: ExclamationCircleIcon,
    bg: 'bg-amber-500',
    iconColor: 'text-white',
    textColor: 'text-white'
  },
  info: {
    icon: InformationCircleIcon,
    bg: 'bg-brand-aqua',
    iconColor: 'text-white',
    textColor: 'text-white'
  }
};

export default function Toast({
  message,
  type = 'info',
  duration = 4000,
  onClose,
  className = ''
}) {
  const [isVisible, setIsVisible] = useState(true);
  const [isLeaving, setIsLeaving] = useState(false);

  // tomiwa: Get toast configuration
  const config = toastTypes[type] || toastTypes.info;
  const IconComponent = config.icon;

  // tomiwa: Auto-dismiss timer
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration]);

  // tomiwa: Handle close with animation
  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div className={`
      fixed bottom-6 right-6 z-50 transform transition-all duration-300 ease-out
      ${isLeaving ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'}
      ${className}
    `}>
      <div className={`
        ${config.bg} rounded-lg shadow-xl p-4 flex items-center gap-3 min-w-[320px] max-w-md
        backdrop-blur-sm
      `}>
        {/* tomiwa: Toast icon */}
        <IconComponent className={`w-6 h-6 flex-shrink-0 ${config.iconColor}`} />
        
        {/* tomiwa: Toast message */}
        <span className={`font-medium flex-1 ${config.textColor}`}>
          {message}
        </span>
        
        {/* tomiwa: Close button */}
        <button
          onClick={handleClose}
          className={`p-1 hover:bg-white/20 rounded-lg transition-colors ${config.textColor}`}
        >
          <XMarkIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

// tomiwa: Toast Container Component for managing multiple toasts
export function ToastContainer({ toasts = [], onRemoveToast }) {
  return (
    <div className="fixed bottom-6 right-6 z-50 space-y-3">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => onRemoveToast(toast.id)}
        />
      ))}
    </div>
  );
}
