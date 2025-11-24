'use client';

import React from 'react';
import EmployerSidebar from '../ui/EmployerSidebar';

export default function EmployerDashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-neutral-50">
      {/* Sidebar */}
      <EmployerSidebar />
      
      {/* Main Content */}
      <main className="flex-1 ml-64 min-h-screen">
        <div className="container mx-auto px-6 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
