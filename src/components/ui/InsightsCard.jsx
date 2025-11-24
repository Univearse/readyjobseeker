import React from 'react';

// tomiwa: Card component for displaying insights and analytics
const InsightsCard = ({ title, icon: Icon, iconColor = 'text-brand-aqua', children, className = '' }) => {
  return (
    <div className={`bg-white rounded-2xl shadow-lg p-6 ${className}`}>
      <div className="flex items-center gap-3 mb-6">
        {Icon && (
          <div className={`${iconColor} bg-white rounded-xl p-2`}>
            <Icon className="w-6 h-6" />
          </div>
        )}
        <h3 className="text-xl font-display font-bold text-brand-black">{title}</h3>
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
};

// tomiwa: Sub-component for displaying performance metrics
export const PerformanceMetric = ({ label, value, trend }) => {
  return (
    <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 hover:bg-neutral-100 transition-colors">
      <span className="text-sm font-medium text-neutral-700">{label}</span>
      <div className="flex items-center gap-3">
        <span className="font-medium text-brand-black">{value}</span>
        {trend && (
          <span className={`text-xs font-medium px-2 py-1 rounded-lg ${
            trend > 0 
              ? 'text-emerald-700 bg-emerald-100' 
              : 'text-red-700 bg-red-100'
          }`}>
            {trend > 0 ? '+' : ''}{trend}%
          </span>
        )}
      </div>
    </div>
  );
};

// tomiwa: Sub-component for displaying source breakdown
export const SourceBreakdown = ({ sources }) => {
  return (
    <div className="space-y-4">
      {sources.map((source, index) => (
        <div key={index} className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-neutral-700">{source.name}</span>
            <span className="text-sm font-medium text-brand-black">{source.percentage}%</span>
          </div>
          <div className="w-full bg-neutral-100 rounded-full h-2.5 overflow-hidden">
            <div
              className={`h-2.5 rounded-full ${
                index === 0 ? 'bg-brand-aqua' : 'bg-brand-orange'
              }`}
              style={{ width: `${source.percentage}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default InsightsCard; 