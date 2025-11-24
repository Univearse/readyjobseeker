/**
 * File: src/components/ui/StatusPill.jsx
 * 
 * tomiwa: Status Pill Component
 * Displays application status with appropriate colors and styling
 */

'use client';

import React from 'react';

// tomiwa: Enhanced status configuration with feedback statuses
const statusConfig = {
  'Applied': {
    bg: 'bg-blue-100',
    text: 'text-blue-700',
    label: 'Applied',
    icon: '📝'
  },
  'Under Review': {
    bg: 'bg-yellow-100',
    text: 'text-yellow-700',
    label: 'Under Review',
    icon: '👀'
  },
  'Test Assigned': {
    bg: 'bg-purple-100',
    text: 'text-purple-700',
    label: 'Test Assigned',
    icon: '📋'
  },
  'Failed Assessment': {
    bg: 'bg-gradient-to-r from-red-100 to-orange-100',
    text: 'text-red-700',
    label: 'Failed Assessment',
    icon: '❌'
  },
  'Interview Scheduled': {
    bg: 'bg-brand-aqua/20',
    text: 'text-brand-aqua',
    label: 'Interview',
    icon: '🎯'
  },
  'Disqualified': {
    bg: 'bg-neutral-200',
    text: 'text-neutral-700',
    label: 'Disqualified',
    icon: '⚠️'
  },
  'Offer': {
    bg: 'bg-emerald-100',
    text: 'text-emerald-700',
    label: 'Offer',
    icon: '🎉'
  },
  'Rejected': {
    bg: 'bg-red-100',
    text: 'text-red-700',
    label: 'Rejected',
    icon: '❌'
  },
  'Withdrawn': {
    bg: 'bg-neutral-100',
    text: 'text-neutral-600',
    label: 'Withdrawn',
    icon: '↩️'
  },
  'Closed': {
    bg: 'bg-neutral-100',
    text: 'text-neutral-600',
    label: 'Closed',
    icon: '🔒'
  }
};

export default function StatusPill({ status, size = 'default', showIcon = false }) {
  // tomiwa: Get status configuration or default
  const config = statusConfig[status] || {
    bg: 'bg-neutral-100',
    text: 'text-neutral-600',
    label: status,
    icon: '❓'
  };

  // tomiwa: Size variants
  const sizeClasses = {
    small: 'px-2 py-1 text-xs gap-1',
    default: 'px-3 py-1.5 text-xs gap-1.5',
    large: 'px-4 py-2 text-sm gap-2'
  };

  return (
    <span 
      className={`
        inline-flex items-center justify-center font-semibold rounded-full
        ${config.bg} ${config.text} ${sizeClasses[size]}
        transition-all duration-200 hover:scale-105
      `}
    >
      {showIcon && (
        <span className="text-xs">{config.icon}</span>
      )}
      {config.label}
    </span>
  );
}
