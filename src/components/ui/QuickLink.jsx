import React from 'react';
import Link from 'next/link';

// tomiwa: Quick link component for dashboard actions
const QuickLink = ({ href, icon: Icon, label, className = '', iconClassName = '' }) => {
  return (
    <Link
      href={href}
      className={`flex flex-col items-center justify-center text-center p-6 bg-white rounded-2xl shadow-lg 
        hover:shadow-xl transition-all duration-300 group ${className}`}
    >
      <div className="mb-4">
        <Icon className={`w-8 h-8 text-brand-aqua group-hover:text-brand-orange transition-colors ${iconClassName}`} />
      </div>
      <span className="text-sm font-medium text-neutral-700 group-hover:text-brand-black">
        {label}
      </span>
    </Link>
  );
};

export default QuickLink; 