/**
 * File: src/components/ui/NextActionButton.jsx
 * 
 * tomiwa: Next Action Button Component
 * Adaptive button that changes based on application stage
 */

'use client';

import React from 'react';
import {
  DocumentTextIcon,
  VideoCameraIcon,
  EyeIcon,
  ArrowUpTrayIcon,
  CalendarIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

// tomiwa: Enhanced action configuration with feedback actions
const actionConfig = {
  'Applied': {
    label: 'View Status',
    icon: EyeIcon,
    variant: 'secondary',
    action: 'view'
  },
  'Under Review': {
    label: 'View Progress',
    icon: ClockIcon,
    variant: 'secondary',
    action: 'view'
  },
  'Test Assigned': {
    label: 'Take Test',
    icon: DocumentTextIcon,
    variant: 'primary',
    action: 'test',
    urgent: true
  },
  'Failed Assessment': {
    label: 'View Feedback',
    icon: DocumentTextIcon,
    variant: 'warning',
    action: 'viewFeedback',
    urgent: true
  },
  'Interview Scheduled': {
    label: 'Join Interview',
    icon: VideoCameraIcon,
    variant: 'primary',
    action: 'interview',
    urgent: true
  },
  'Disqualified': {
    label: 'View Reason',
    icon: EyeIcon,
    variant: 'neutral',
    action: 'viewFeedback'
  },
  'Offer': {
    label: 'View Offer',
    icon: EyeIcon,
    variant: 'success',
    action: 'offer',
    urgent: true
  },
  'Rejected': {
    label: 'View Details',
    icon: EyeIcon,
    variant: 'neutral',
    action: 'view'
  },
  'Withdrawn': {
    label: 'View Details',
    icon: EyeIcon,
    variant: 'neutral',
    action: 'view'
  },
  'Closed': {
    label: 'View Details',
    icon: EyeIcon,
    variant: 'neutral',
    action: 'view'
  }
};

// tomiwa: Enhanced button variants with warning
const variants = {
  primary: 'bg-brand-aqua hover:bg-brand-aqua/90 text-white',
  secondary: 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700',
  success: 'bg-emerald-500 hover:bg-emerald-600 text-white',
  warning: 'bg-red-500 hover:bg-red-600 text-white',
  neutral: 'bg-neutral-50 hover:bg-neutral-100 text-neutral-500'
};

export default function NextActionButton({ 
  status, 
  size = 'default',
  onClick,
  className = '',
  disabled = false
}) {
  // tomiwa: Get action configuration
  const config = actionConfig[status] || actionConfig['Applied'];
  const IconComponent = config.icon;

  // tomiwa: Size classes
  const sizeClasses = {
    small: 'px-3 py-1.5 text-xs',
    default: 'px-4 py-2 text-sm',
    large: 'px-6 py-3 text-base'
  };

  // tomiwa: Handle button click
  const handleClick = () => {
    if (onClick && !disabled) {
      onClick(config.action, status);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`
        inline-flex items-center gap-2 font-medium rounded-lg
        transition-all duration-200 ease-out
        ${variants[config.variant]}
        ${sizeClasses[size]}
        ${config.urgent ? 'ring-2 ring-offset-1 ring-brand-aqua/30' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'}
        ${className}
      `}
    >
      <IconComponent className="w-4 h-4" />
      {config.label}
      
      {/* tomiwa: Urgent indicator */}
      {config.urgent && (
        <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
      )}
    </button>
  );
}
