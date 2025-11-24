/**
 * File: src/components/layouts/CandidateDashboardLayout.jsx
 * 
 * tomiwa: Layout wrapper for candidate dashboard pages
 * Provides consistent sidebar navigation and main content area
 * with proper spacing and responsive behavior
 */

'use client';

import React from 'react';
import CandidateSidebar from '../ui/CandidateSidebar';

export default function CandidateDashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-neutral-50">
      {/* Sidebar */}
      <CandidateSidebar />
      
      {/* Main Content */}
      <main className="flex-1 ml-64 min-h-screen">
        <div>
          {children}
        </div>
      </main>
    </div>
  );
}


