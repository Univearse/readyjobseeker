/**
 * File: src/components/layouts/CoachDashboardLayout.jsx
 * 
 * tomiwa: Layout wrapper for coach dashboard pages
 * Provides consistent sidebar navigation and main content area
 * with proper spacing and responsive behavior
 * 
 * Features:
 * - Fixed sidebar with coach navigation
 * - Responsive design for mobile/tablet/desktop
 * - Mobile hamburger menu with overlay sidebar
 * - Consistent spacing and layout
 * - Matches candidate dashboard structure
 */

'use client';

import React, { useState } from 'react';
import CoachSidebar from '../ui/CoachSidebar';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function CoachDashboardLayout({ children }) {
  // tomiwa: State for mobile sidebar toggle
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // tomiwa: Toggle mobile sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // tomiwa: Close sidebar when clicking outside on mobile
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-neutral-50">
      {/* tomiwa: Mobile Header with Hamburger Menu */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-neutral-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg text-neutral-600 hover:text-brand-aqua hover:bg-brand-aqua/5 transition-colors"
          >
            <Bars3Icon className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2">
            <img
              src="/images/logo.png"
              alt="ReadyJobSeeker Logo"
              className="w-8 h-8 rounded-lg"
            />
            <span className="font-display font-bold text-lg text-brand-black">
              ReadyJobSeeker
            </span>
          </div>
          <div className="w-10 h-10" /> {/* tomiwa: Spacer for centering */}
        </div>
      </div>

      {/* tomiwa: Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-50 bg-black/50"
          onClick={closeSidebar}
        >
          <div 
            className="w-80 max-w-[85vw] h-full bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* tomiwa: Mobile sidebar header with close button */}
            <div className="flex items-center justify-between p-4 border-b border-neutral-200">
              <div className="flex items-center gap-2">
                <img
                  src="/images/logo.png"
                  alt="ReadyJobSeeker Logo"
                  className="w-8 h-8 rounded-lg"
                />
                <div>
                  <span className="font-display font-bold text-lg text-brand-black block">
                    ReadyJobSeeker
                  </span>
                  <span className="text-xs text-brand-aqua font-semibold">
                    Coach Portal
                  </span>
                </div>
              </div>
              <button
                onClick={closeSidebar}
                className="p-2 rounded-lg text-neutral-600 hover:text-brand-aqua hover:bg-brand-aqua/5 transition-colors"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            
            {/* tomiwa: Mobile sidebar content */}
            <CoachSidebar isMobile={true} onNavigate={closeSidebar} />
          </div>
        </div>
      )}

      {/* tomiwa: Desktop Sidebar Navigation */}
      <div className="hidden lg:block">
        <CoachSidebar />
      </div>
      
      {/* tomiwa: Main Content Area */}
      <main className="flex-1 lg:ml-64 min-h-screen">
        {/* tomiwa: Add top padding on mobile to account for fixed header */}
        <div className="pt-16 lg:pt-0">
          {children}
        </div>
      </main>
    </div>
  );
}