'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  HomeIcon,
  BuildingOfficeIcon,
  BriefcaseIcon,
  UserGroupIcon,
  UserPlusIcon,
  ChatBubbleLeftRightIcon,
  CalendarIcon,
  CreditCardIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  ChartBarIcon,
  CircleStackIcon,
} from '@heroicons/react/24/outline';

// tomiwa: Navigation items for the employer dashboard
const navigation = [
  { name: 'Dashboard', href: '/dashboard/employer', icon: HomeIcon },
  { name: 'Company Profile', href: '/dashboard/employer/profile', icon: BuildingOfficeIcon },
  { name: 'My Jobs', href: '/dashboard/employer/jobs', icon: BriefcaseIcon },
  { name: 'Applications', href: '/dashboard/employer/applications', icon: UserGroupIcon },
  { name: 'Database', href: '/dashboard/employer/database', icon: CircleStackIcon }, // tomiwa: New Database page for candidate archive
  { name: 'Shortlisted', href: '/dashboard/employer/shortlisted', icon: UserPlusIcon },
  { name: 'Messages', href: '/dashboard/employer/messages', icon: ChatBubbleLeftRightIcon },
  { name: 'Meetings', href: '/dashboard/employer/meetings', icon: CalendarIcon },
  { name: 'Subscription & Billing', href: '/dashboard/employer/subscription', icon: CreditCardIcon },
  { name: 'Reports & Analytics', href: '/dashboard/employer/reports', icon: ChartBarIcon },
  { name: 'Settings', href: '/dashboard/employer/settings', icon: Cog6ToothIcon },
];

export default function EmployerSidebar() {
  // tomiwa: Calculate mock profile strength (this would come from backend in production)
  const profileStrength = 75;

  return (
    <div className="w-64 bg-white border-r border-neutral-100 h-screen flex flex-col fixed left-0 top-0">
      {/* Logo Section */}
      <div className="p-6 border-b border-neutral-100">
        <Link href="/dashboard/employer" className="flex items-center gap-2">
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
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center gap-3 px-4 py-3 text-neutral-600 hover:text-brand-aqua hover:bg-brand-aqua/5 rounded-xl transition-colors group"
          >
            <item.icon className="w-5 h-5 group-hover:text-brand-aqua" />
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>

      {/* Profile Strength */}
      <div className="p-6 border-t border-neutral-100">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-neutral-600">Profile Strength</span>
            <span className="font-medium text-brand-aqua">{profileStrength}%</span>
          </div>
          <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-brand-aqua rounded-full transition-all duration-500"
              style={{ width: `${profileStrength}%` }}
            />
          </div>
          <Link
            href="/dashboard/employer/profile"
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