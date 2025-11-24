/**
 * File: src/components/ui/CandidateSidebar.jsx
 * 
 * tomiwa: Candidate Sidebar Navigation Component
 * This sidebar provides navigation for the candidate dashboard with clean, modern UI
 * matching the design system (Poppins typography, brand colors, rounded-lg cards)
 */

'use client';

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
} from '@heroicons/react/24/outline';

// tomiwa: Navigation items for the candidate dashboard
// Each item includes a name, URL path, and Heroicon component
const navigation = [
  { name: 'Dashboard', href: '/dashboard/candidate', icon: HomeIcon },
  { name: 'Profile', href: '/dashboard/candidate/profile', icon: UserCircleIcon },
  { name: 'Job Applications', href: '/dashboard/candidate/applications', icon: DocumentTextIcon },
  { name: 'Saved Jobs', href: '/dashboard/candidate/saved-jobs', icon: BookmarkIcon },
  { name: 'Messages', href: '/dashboard/candidate/messages', icon: ChatBubbleLeftRightIcon },
  { name: 'Meetings', href: '/dashboard/candidate/meetings', icon: CalendarIcon },
  { name: 'AI Tools', href: '/dashboard/candidate/ai-tools', icon: SparklesIcon },
  { name: 'Subscription & Billing', href: '/dashboard/candidate/subscription', icon: CreditCardIcon },
  { name: 'Reports & Analytics', href: '/dashboard/candidate/reports', icon: ChartBarIcon },
  { name: 'Settings', href: '/dashboard/candidate/settings', icon: Cog6ToothIcon },
];

export default function CandidateSidebar() {
  // tomiwa: Get current pathname to highlight active navigation item
  const pathname = usePathname();

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
          const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors group ${
                isActive 
                  ? 'bg-brand-aqua/10 text-brand-aqua' 
                  : 'text-neutral-600 hover:text-brand-aqua hover:bg-brand-aqua/5'
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? 'text-brand-aqua' : 'group-hover:text-brand-aqua'}`} />
              <span>{item.name}</span>
            </Link>
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


