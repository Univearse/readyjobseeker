/**
 * File: src/components/ui/CoachSidebar.jsx
 * 
 * tomiwa: Coach Sidebar Navigation Component
 * This sidebar provides navigation for the coach dashboard with clean, modern UI
 * matching the design system (Poppins typography, brand colors, rounded-lg cards)
 * 
 * Navigation Items:
 * - Dashboard (overview and stats)
 * - Sessions (upcoming and past sessions)
 * - Availability (schedule management)
 * - Earnings (financial overview)
 * - Profile (coach profile management)
 * - Settings (account settings)
 * - Logout
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  HomeIcon,
  UserCircleIcon,
  CalendarDaysIcon,
  ClockIcon,
  CurrencyDollarIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  VideoCameraIcon,
  ChartBarIcon,
  StarIcon,
} from '@heroicons/react/24/outline';

// tomiwa: Navigation items for the coach dashboard
// Each item includes a name, URL path, and Heroicon component
const navigation = [
  { name: 'Dashboard', href: '/coach/dashboard', icon: HomeIcon },
  { name: 'Sessions', href: '/coach/dashboard/sessions', icon: VideoCameraIcon },
  { name: 'Availability', href: '/coach/dashboard/availability', icon: ClockIcon },
  { name: 'Earnings', href: '/coach/dashboard/earnings', icon: CurrencyDollarIcon },
  { name: 'Profile', href: '/coach/dashboard/profile', icon: UserCircleIcon },
  { name: 'Settings', href: '/coach/dashboard/settings', icon: Cog6ToothIcon },
];

export default function CoachSidebar({ isMobile = false, onNavigate = () => {} }) {
  // tomiwa: Get current pathname to highlight active navigation item
  const pathname = usePathname();

  // tomiwa: Handle navigation click - close mobile sidebar if needed
  const handleNavClick = () => {
    if (isMobile) {
      onNavigate();
    }
  };

  return (
    <div className={`w-64 bg-white border-r border-neutral-100 h-screen flex flex-col ${
      isMobile ? 'relative' : 'fixed left-0 top-0'
    }`}>
      {/* tomiwa: Logo Section - Hide on mobile since it's in the header */}
      {!isMobile && (
        <div className="p-6 border-b border-neutral-100">
          <Link href="/coach/dashboard" className="flex items-center gap-2">
            <Image
              src="/images/logo.png"
              alt="ReadyJobSeeker Logo"
              width={32}
              height={32}
              className="rounded-lg"
            />
            <div>
              <span className="font-display font-bold text-lg text-brand-black block">
                ReadyJobSeeker
              </span>
              <span className="text-xs text-brand-aqua font-semibold">
                Coach Portal
              </span>
            </div>
          </Link>
        </div>
      )}

      {/* tomiwa: Coach Profile Section */}
      <div className="p-6 border-b border-neutral-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-brand-aqua to-[#0C5B65] rounded-xl flex items-center justify-center">
            <UserCircleIcon className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-brand-black truncate">
              Sarah Johnson
            </h3>
            <p className="text-sm text-neutral-600 truncate">
              Career Coach
            </p>
          </div>
        </div>
        
        {/* tomiwa: updated - Linear Rating Display with Stars */}
        <div className="mt-4 space-y-3">
          {/* tomiwa: Rating row with stars */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <StarIcon 
                    key={i}
                    className={`w-4 h-4 ${i < 5 ? 'text-brand-yellow fill-current' : 'text-neutral-200'}`}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-neutral-900">4.9</span>
            </div>
            <span className="text-xs text-neutral-500">(127 reviews)</span>
          </div>
          
          {/* tomiwa: Sessions completed row */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-neutral-600">Sessions Completed</span>
            <span className="text-sm font-semibold text-brand-orange">450+</span>
          </div>
        </div>
      </div>

      {/* tomiwa: Navigation Links */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          // tomiwa: Check if this item is currently active
          const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
          
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={handleNavClick}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors group ${
                isActive 
                  ? 'bg-brand-aqua/10 text-brand-aqua' 
                  : 'text-neutral-600 hover:text-brand-aqua hover:bg-brand-aqua/5'
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? 'text-brand-aqua' : 'group-hover:text-brand-aqua'}`} />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* tomiwa: Performance Summary - Line Format */}
      <div className="p-6 border-t border-neutral-100">
        <div className="space-y-3">
          {/* tomiwa: updated - Monthly earnings in Naira */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-neutral-600">This Month</span>
            <span className="font-semibold text-brand-aqua">₦980,000</span>
          </div>
          
          {/* tomiwa: Sessions this month */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-neutral-600">Sessions</span>
            <span className="font-semibold text-brand-orange">18</span>
          </div>
          
          {/* tomiwa: Average session fee */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-neutral-600">Avg. Fee</span>
            <span className="font-semibold text-brand-yellow">₦54,444</span>
          </div>
          
          {/* tomiwa: Progress bar */}
          <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-brand-aqua to-brand-orange rounded-full transition-all duration-500"
              style={{ width: '75%' }}
            />
          </div>
          
          <Link
            href="/coach/dashboard/earnings"
            onClick={handleNavClick}
            className="text-xs text-brand-aqua hover:text-brand-orange transition-colors"
          >
            View earnings details →
          </Link>
        </div>
      </div>

      {/* tomiwa: Logout Button */}
      <div className="p-4 border-t border-neutral-100">
        <button
          className="flex items-center gap-3 w-full px-4 py-3 text-neutral-600 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors group"
        >
          <ArrowRightOnRectangleIcon className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
}