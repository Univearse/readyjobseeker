import React from 'react';

// tomiwa: Reusable card component for dashboard stats and insights
const DashboardCard = ({ 
  icon: Icon, 
  title, 
  value, 
  subtitle, 
  iconColor = 'text-primary-500',
  className = '' 
}) => {
  return (
    <div className={`bg-white rounded-2xl shadow-lg p-6 ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex-grow">
          <h3 className="text-neutral-600 text-sm font-medium mb-2">{title}</h3>
          <div className="text-3xl font-display font-bold text-brand-black mb-2">
            {value}
          </div>
          {subtitle && (
            <p className="text-neutral-500 text-sm">{subtitle}</p>
          )}
        </div>
        {Icon && (
          <div className="bg-white border-2 border-neutral-100 p-4 rounded-xl shadow-sm">
            <Icon className={`w-7 h-7 ${iconColor}`} />
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardCard; 