/**
 * File: src/components/ui/DashboardCard.js
 * 
 * tomiwa: Reusable dashboard card component for displaying stats and metrics
 * Used across candidate and coach dashboards for consistent UI
 * 
 * Props:
 * - icon: Heroicon component to display
 * - title: Card title/label
 * - value: Main value to display (usually a number or currency)
 * - subtitle: Additional info below the value
 * - iconColor: Tailwind color class for the icon
 * - className: Additional CSS classes
 */

import React from 'react';

const DashboardCard = ({ 
  icon: Icon, 
  title, 
  value, 
  subtitle, 
  iconColor = 'text-brand-aqua', // tomiwa: Updated default to use brand colors
  className = '' 
}) => {
  return (
    <div className={`bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex-grow">
          {/* tomiwa: Card title */}
          <h3 className="text-neutral-600 text-sm font-medium mb-2">{title}</h3>
          
          {/* tomiwa: Main value display */}
          <div className="text-3xl font-display font-bold text-brand-black mb-2">
            {value}
          </div>
          
          {/* tomiwa: Optional subtitle/additional info */}
          {subtitle && (
            <div className="text-neutral-500 text-sm">{subtitle}</div>
          )}
        </div>
        
        {/* tomiwa: Icon display with background */}
        {Icon && (
          <div className="bg-neutral-50 border border-neutral-100 p-3 rounded-xl">
            <Icon className={`w-6 h-6 ${iconColor}`} />
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardCard; 