/**
 * File: src/components/ui/CandidateSidebar.jsx
 * 
 * tomiwa: Candidate Sidebar Navigation Component
 * This sidebar provides navigation for the candidate dashboard with clean, modern UI
 * matching the design system (Poppins typography, brand colors, rounded-lg cards)
 * 
 * updated: Added dropdown support for AI Tools with Career Coaching submenu
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  HomeIcon,
  UserCircleIcon,
  DocumentTextIcon,
  BookmarkIcon,
  ChatBubbleLeftRightIcon,
  CalendarIcon,
  SparklesIcon,
  CreditCardIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  ChevronDownIcon,
  AcademicCapIcon,
} from '@heroicons/react/24/outline';

// tomiwa: Navigation items for the candidate dashboard
// Each item includes a name, URL path, and Heroicon component
// updated: AI Tools now has children array for dropdown submenu items
const navigation = [
  { name: 'Dashboard', href: '/dashboard/candidate', icon: HomeIcon },
  { name: 'Profile', href: '/dashboard/candidate/profile', icon: UserCircleIcon },
  { name: 'Job Applications', href: '/dashboard/candidate/applications', icon: DocumentTextIcon },
  { name: 'Saved Jobs', href: '/dashboard/candidate/saved-jobs', icon: BookmarkIcon },
  { name: 'Messages', href: '/dashboard/candidate/messages', icon: ChatBubbleLeftRightIcon },
  { name: 'Meetings', href: '/dashboard/candidate/meetings', icon: CalendarIcon },
  { 
    // tomiwa: new - AI Tools is now a parent dropdown menu
    // The main item is still clickable to load the AI Tools dashboard
    // Children appear as nested submenu items beneath it
    name: 'AI Tools', 
    href: '/dashboard/candidate/ai-tools', 
    icon: SparklesIcon,
    children: [
      { 
        name: 'Career Coaching', 
        href: '/dashboard/candidate/ai-tools/coaching', 
        icon: AcademicCapIcon 
      },
    ]
  },
  { name: 'Subscription & Billing', href: '/dashboard/candidate/subscription', icon: CreditCardIcon },
  { name: 'Reports & Analytics', href: '/dashboard/candidate/reports', icon: ChartBarIcon },
  { name: 'Settings', href: '/dashboard/candidate/settings', icon: Cog6ToothIcon },
];

export default function CandidateSidebar() {
  // tomiwa: Get current pathname to highlight active navigation item
  const pathname = usePathname();
  
  // tomiwa: new - State to track which dropdown menus are open
  // Uses an object to support multiple dropdowns if needed in the future
  const [openDropdowns, setOpenDropdowns] = useState({});

  // tomiwa: new - Toggle function for dropdown menus
  // Takes the item name as key to identify which dropdown to toggle
  const toggleDropdown = (name) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  // tomiwa: new - Check if any child route is active (for parent highlighting)
  const isChildActive = (children) => {
    if (!children) return false;
    return children.some(child => 
      pathname === child.href || pathname?.startsWith(child.href + '/')
    );
  };

  return (
    <div className="w-64 bg-white border-r border-neutral-100 h-screen flex flex-col fixed left-0 top-0">
      {/* Logo Section */}
      <div className="p-6 border-b border-neutral-100">
        <Link href="/dashboard/candidate" className="flex items-center gap-2">
          <Image
            src="/images/logo.png"
            alt="ReadyJobSeeker Logo"
            width={32}
            height={32}
            className="rounded-lg"
          />
          <span className="font-display font-bold text-lg text-brand-black">
            ReadyJobSeeker
          </span>
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          // tomiwa: Check if this item or any of its children are active
          const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
          const hasChildren = item.children && item.children.length > 0;
          const isOpen = openDropdowns[item.name] || isChildActive(item.children);
          
          return (
            <div key={item.name}>
              {/* tomiwa: updated - Parent navigation item with optional dropdown */}
              <div className="flex items-center">
                {/* tomiwa: Main clickable link - navigates to the item's href */}
                <Link
                  href={item.href}
                  className={`flex-1 flex items-center gap-3 px-4 py-3 rounded-xl transition-colors group ${
                    isActive 
                      ? 'bg-brand-aqua/10 text-brand-aqua' 
                      : 'text-neutral-600 hover:text-brand-aqua hover:bg-brand-aqua/5'
                  } ${hasChildren ? 'rounded-r-none' : ''}`}
                >
                  <item.icon className={`w-5 h-5 ${isActive ? 'text-brand-aqua' : 'group-hover:text-brand-aqua'}`} />
                  <span>{item.name}</span>
                </Link>
                
                {/* tomiwa: new - Dropdown toggle button (only shown if item has children) */}
                {hasChildren && (
                  <button
                    onClick={() => toggleDropdown(item.name)}
                    className={`px-3 py-3 rounded-r-xl transition-colors ${
                      isActive 
                        ? 'bg-brand-aqua/10 text-brand-aqua hover:bg-brand-aqua/20' 
                        : 'text-neutral-600 hover:text-brand-aqua hover:bg-brand-aqua/5'
                    }`}
                    aria-label={`Toggle ${item.name} submenu`}
                  >
                    <ChevronDownIcon 
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`} 
                    />
                  </button>
                )}
              </div>
              
              {/* tomiwa: new - Submenu items (only rendered if item has children and is open) */}
              {hasChildren && isOpen && (
                <div className="mt-1 ml-4 pl-4 border-l-2 border-neutral-100 space-y-1">
                  {item.children.map((child) => {
                    const isChildItemActive = pathname === child.href || pathname?.startsWith(child.href + '/');
                    return (
                      <Link
                        key={child.name}
                        href={child.href}
                        className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors group text-sm ${
                          isChildItemActive 
                            ? 'bg-brand-aqua/10 text-brand-aqua font-medium' 
                            : 'text-neutral-600 hover:text-brand-aqua hover:bg-brand-aqua/5'
                        }`}
                      >
                        <child.icon className={`w-4 h-4 ${isChildItemActive ? 'text-brand-aqua' : 'group-hover:text-brand-aqua'}`} />
                        <span>{child.name}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Profile Progress */}
      <div className="p-6 border-t border-neutral-100">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-neutral-600">Profile Strength</span>
            <span className="font-medium text-brand-aqua">85%</span>
          </div>
          <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-brand-aqua rounded-full transition-all duration-500"
              style={{ width: '85%' }}
            />
          </div>
          <Link
            href="/dashboard/candidate/profile"
            className="text-xs text-brand-aqua hover:text-brand-orange transition-colors"
          >
            Complete your profile →
          </Link>
        </div>
      </div>

      {/* Logout Button */}
      <div className="p-4 border-t border-neutral-100">
        <button
          className="flex items-center gap-3 w-full px-4 py-3 text-neutral-600 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors group"
        >
          <ArrowRightOnRectangleIcon className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}


