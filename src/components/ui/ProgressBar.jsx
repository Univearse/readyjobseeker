/**
 * File: src/components/ui/ProgressBar.jsx
 * 
 * tomiwa: Progress Bar Component
 * Shows application progress from 0-100% with smooth animations
 */

'use client';

import React from 'react';

export default function ProgressBar({ 
  progress = 0, 
  size = 'default',
  showLabel = false,
  status = null,
  className = ''
}) {
  // tomiwa: Ensure progress is within bounds
  const normalizedProgress = Math.min(Math.max(progress, 0), 100);
  
  // tomiwa: Size variants
  const sizeClasses = {
    small: 'h-1.5',
    default: 'h-2',
    large: 'h-3'
  };

  // tomiwa: Enhanced progress color with status awareness
  const getProgressColor = (progress, status) => {
    // tomiwa: Special colors for feedback statuses
    if (status === 'Failed Assessment') return 'bg-gradient-to-r from-red-400 to-orange-400';
    if (status === 'Disqualified') return 'bg-neutral-400';
    
    // tomiwa: Regular progress colors
    if (progress >= 80) return 'bg-emerald-500';
    if (progress >= 60) return 'bg-brand-aqua';
    if (progress >= 40) return 'bg-accent-500';
    if (progress >= 20) return 'bg-secondary-500';
    return 'bg-neutral-400';
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* tomiwa: Progress bar container */}
      <div className={`flex-1 bg-neutral-200 rounded-full overflow-hidden ${sizeClasses[size]}`}>
        <div
          className={`${sizeClasses[size]} ${getProgressColor(normalizedProgress, status)} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${normalizedProgress}%` }}
        />
      </div>
      
      {/* tomiwa: Optional progress label */}
      {showLabel && (
        <span className="text-xs font-medium text-neutral-600 min-w-[3rem] text-right">
          {normalizedProgress}%
        </span>
      )}
    </div>
  );
}
