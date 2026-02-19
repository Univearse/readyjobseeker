/**
 * File: src/app/dashboard/candidate/ai-tools/coaching/browse/page.js
 * 
 * tomiwa: Browse Coaches Page - Redesigned with unified card style and improved grid
 * updated: Implemented strict 12-column grid, equal card heights, uniform tag pills
 * updated: Clear availability labels, stronger top-left alignment, consistent spacing
 * 
 * Features:
 * - Unified coach card style across all cards
 * - Equal card height using flex layout
 * - Uniform tag pills with consistent styling
 * - Clear availability labels with status colors
 * - Top-left alignment grid for visual consistency
 * - Full responsiveness across all breakpoints
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import CandidateDashboardLayout from '@/components/layouts/CandidateDashboardLayout.jsx';
import {
  UserGroupIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ClockIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  CheckBadgeIcon,
  ComputerDesktopIcon,
  PaintBrushIcon,
  BuildingOfficeIcon,
  BriefcaseIcon,
  FunnelIcon,
  Squares2X2Icon,
  RocketLaunchIcon,
  CalendarDaysIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';

export default function BrowseCoachesPage() {
  // tomiwa: State for search and filter
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  // tomiwa: Filter categories - updated with consistent icons
  // ExistingCode: Design, Tech, Hospitality, Business Management categories
  const filters = [
    { id: 'all', name: 'All Coaches', icon: <UserGroupIcon className="w-4 h-4" />, count: 8 },
    { id: 'tech', name: 'Tech', icon: <ComputerDesktopIcon className="w-4 h-4" />, count: 2 },
    { id: 'design', name: 'Design', icon: <PaintBrushIcon className="w-4 h-4" />, count: 2 },
    { id: 'hospitality', name: 'Hospitality', icon: <BuildingOfficeIcon className="w-4 h-4" />, count: 2 },
    { id: 'business', name: 'Business', icon: <BriefcaseIcon className="w-4 h-4" />, count: 2 }
  ];

  // tomiwa: All coaches data - comprehensive list with all details
  // ExistingCode: Keeping original coach data with updated structure for consistency
  const allCoaches = [
    {
      id: 1,
      name: 'Sarah Mitchell',
      specialty: 'Tech',
      specialtyId: 'tech',
      title: 'Tech Career Specialist',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
      rating: 4.9,
      reviews: 127,
      sessionsCompleted: 450,
      available: 'Tomorrow, 2:00 PM',
      availableStatus: 'soon', // 'today', 'soon', 'later'
      tags: ['Software Engineering', 'Product Management', 'Data Science'],
      verified: true,
      yearsExperience: 15
    },
    {
      id: 2,
      name: 'James Okonkwo',
      specialty: 'Design',
      specialtyId: 'design',
      title: 'UX/UI Design Coach',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      rating: 4.8,
      reviews: 89,
      sessionsCompleted: 320,
      available: 'Today, 5:00 PM',
      availableStatus: 'today',
      tags: ['UX/UI Design', 'Brand Identity', 'Motion Graphics'],
      verified: true,
      yearsExperience: 10
    },
    {
      id: 3,
      name: 'Emma Thompson',
      specialty: 'Hospitality',
      specialtyId: 'hospitality',
      title: 'Hospitality Industry Expert',
      photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop',
      rating: 4.9,
      reviews: 156,
      sessionsCompleted: 580,
      available: 'Today, 3:30 PM',
      availableStatus: 'today',
      tags: ['Hotel Management', 'Event Planning', 'Customer Service'],
      verified: true,
      yearsExperience: 12
    },
    {
      id: 4,
      name: 'Michael Chen',
      specialty: 'Business',
      specialtyId: 'business',
      title: 'Business Strategy Coach',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
      rating: 4.7,
      reviews: 78,
      sessionsCompleted: 290,
      available: 'Friday, 10:00 AM',
      availableStatus: 'later',
      tags: ['Leadership', 'Strategy', 'Operations'],
      verified: true,
      yearsExperience: 18
    },
    {
      id: 5,
      name: 'Priya Sharma',
      specialty: 'Tech',
      specialtyId: 'tech',
      title: 'Tech Career Strategist',
      photo: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=400&fit=crop',
      rating: 4.8,
      reviews: 94,
      sessionsCompleted: 210,
      available: 'Wednesday, 11:00 AM',
      availableStatus: 'later',
      tags: ['Product Management', 'Startup Growth', 'Tech Strategy'],
      verified: true,
      yearsExperience: 8
    },
    {
      id: 6,
      name: 'Robert Williams',
      specialty: 'Business',
      specialtyId: 'business',
      title: 'Interview Performance Coach',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
      rating: 4.6,
      reviews: 67,
      sessionsCompleted: 180,
      available: 'Today, 6:00 PM',
      availableStatus: 'today',
      tags: ['Management', 'Communication', 'Team Leadership'],
      verified: true,
      yearsExperience: 14
    },
    {
      id: 7,
      name: 'Amara Johnson',
      specialty: 'Design',
      specialtyId: 'design',
      title: 'Creative Design Mentor',
      photo: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop',
      rating: 4.9,
      reviews: 112,
      sessionsCompleted: 340,
      available: 'Thursday, 9:00 AM',
      availableStatus: 'soon',
      tags: ['Visual Design', 'Creative Direction', 'Portfolio Review'],
      verified: true,
      yearsExperience: 11
    },
    {
      id: 8,
      name: 'David Park',
      specialty: 'Hospitality',
      specialtyId: 'hospitality',
      title: 'Hospitality Career Advisor',
      photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop',
      rating: 4.7,
      reviews: 83,
      sessionsCompleted: 265,
      available: 'Monday, 4:00 PM',
      availableStatus: 'later',
      tags: ['Restaurant Management', 'Tourism', 'Guest Experience'],
      verified: true,
      yearsExperience: 9
    }
  ];

  // tomiwa: Filter coaches based on search and filter
  const filteredCoaches = allCoaches.filter(coach => {
    const matchesSearch = searchQuery === '' || 
      coach.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coach.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coach.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coach.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesFilter = activeFilter === 'all' || coach.specialtyId === activeFilter;
    
    return matchesSearch && matchesFilter;
  });

  // tomiwa: Get availability status color
  const getAvailabilityStyle = (status) => {
    switch (status) {
      case 'today':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'soon':
        return 'bg-brand-yellow/10 text-amber-700 border-amber-200';
      case 'later':
        return 'bg-neutral-100 text-neutral-600 border-neutral-200';
      default:
        return 'bg-neutral-100 text-neutral-600 border-neutral-200';
    }
  };

  // tomiwa: Simulating subscription status
  const hasCoachingSubscription = false;

  return (
    <CandidateDashboardLayout>
      {/* tomiwa: Page header section with consistent padding */}
      <div className="px-0 
                      sm:px-0 
                      md:px-0 
                      lg:px-0 
                      mb-6">
        
        {/* tomiwa: Back navigation */}
        <div className="mb-4">
          <Link
            href="/dashboard/candidate/ai-tools/coaching"
            className="inline-flex items-center gap-2 text-neutral-500 hover:text-brand-aqua 
                      transition-colors text-sm font-medium group"
          >
            <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Coaching</span>
          </Link>
        </div>

        {/* tomiwa: Page title with icon */}
        <div className="flex flex-col 
                       sm:flex-row 
                       sm:items-center 
                       sm:justify-between 
                       gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 
                           sm:w-12 sm:h-12 
                           bg-gradient-to-br from-primary-50 to-brand-aqua/10 
                           rounded-xl flex items-center justify-center">
              <UserGroupIcon className="w-5 h-5 sm:w-6 sm:h-6 text-brand-aqua" />
            </div>
            <div>
              <h1 className="text-xl 
                            sm:text-2xl 
                            md:text-2xl 
                            font-display font-bold text-neutral-900">
                Browse Coaches
              </h1>
              <p className="text-neutral-500 text-sm">
                Find coaches in Design, Tech, Hospitality, and Business
              </p>
            </div>
          </div>

          {/* tomiwa: Results count badge */}
          <div className="flex items-center gap-3">
            <span className="px-3 py-1.5 bg-neutral-100 text-neutral-700 rounded-lg text-sm font-medium">
              {filteredCoaches.length} {filteredCoaches.length === 1 ? 'coach' : 'coaches'}
            </span>
          </div>
        </div>
      </div>

      {/* tomiwa: Search and filter section */}
      <div className="mb-6">
        {/* tomiwa: Search input - full width */}
        <div className="relative mb-4">
          <MagnifyingGlassIcon className="w-5 h-5 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, specialty, or skill..."
            className="w-full pl-12 pr-12 py-3 border border-neutral-200 rounded-xl 
                      text-sm text-neutral-900 placeholder:text-neutral-400
                      focus:outline-none focus:ring-2 focus:ring-brand-aqua/50 focus:border-brand-aqua
                      transition-all"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 hover:bg-neutral-100 
                        rounded-lg transition-colors"
            >
              <XMarkIcon className="w-4 h-4 text-neutral-400" />
            </button>
          )}
        </div>

        {/* tomiwa: Filter tabs - horizontal scroll on mobile */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 -mx-2 px-2 
                       scrollbar-hide">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium 
                         transition-all whitespace-nowrap flex-shrink-0 ${
                activeFilter === filter.id
                  ? 'bg-brand-aqua text-white shadow-md shadow-brand-aqua/25'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-800'
              }`}
            >
              {filter.icon}
              <span>{filter.name}</span>
              {filter.id !== 'all' && (
                <span className={`text-xs px-1.5 py-0.5 rounded-md ${
                  activeFilter === filter.id 
                    ? 'bg-white/20 text-white' 
                    : 'bg-neutral-200 text-neutral-500'
                }`}>
                  {filter.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ===================================================================== */}
      {/* tomiwa: Coaches Grid - Unified card style with equal heights */}
      {/* updated: NEW - Added "View Profile" and "Book Coach" action buttons */}
      {/* updated: Consistent card structure, top-left alignment, uniform tags */}
      {/* ===================================================================== */}
      <div className="grid grid-cols-1 
                     sm:grid-cols-2 
                     lg:grid-cols-3 
                     xl:grid-cols-4 
                     gap-4 
                     sm:gap-5 
                     md:gap-6 
                     mb-8">
        {filteredCoaches.map((coach) => (
          <div 
            key={coach.id}
            className="group bg-white rounded-xl border border-neutral-200 
                      hover:border-brand-aqua/50 hover:shadow-lg 
                      transition-all duration-300 overflow-hidden
                      flex flex-col h-full"
          >
            {/* tomiwa: Card header - photo and basic info, top-left aligned */}
            <div className="p-4 pb-3">
              <div className="flex items-start gap-3">
                {/* tomiwa: Coach photo with consistent sizing */}
                <div className="relative flex-shrink-0">
                  <img
                    src={coach.photo}
                    alt={coach.name}
                    className="w-14 h-14 rounded-xl object-cover 
                              ring-2 ring-neutral-100 group-hover:ring-brand-aqua/30 
                              transition-all"
                  />
                  {/* tomiwa: Verified badge overlay */}
                  {coach.verified && (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full 
                                   flex items-center justify-center shadow-sm">
                      <CheckBadgeIcon className="w-4 h-4 text-brand-aqua" />
                    </div>
                  )}
                </div>
                
                {/* tomiwa: Name, title, specialty - left aligned */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-neutral-900 text-sm 
                                sm:text-base truncate leading-tight">
                    {coach.name}
                  </h3>
                  <p className="text-xs text-neutral-500 truncate mb-1">
                    {coach.title}
                  </p>
                  <span className="inline-flex items-center text-xs text-primary-600 font-medium 
                                  bg-primary-50 px-2 py-0.5 rounded-md">
                    {coach.specialty}
                  </span>
                </div>
              </div>
            </div>

            {/* tomiwa: Card body - rating and stats */}
            <div className="px-4 pb-3 flex-1">
              {/* tomiwa: Rating row */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1">
                  <StarSolidIcon className="w-4 h-4 text-brand-yellow" />
                  <span className="text-sm font-semibold text-neutral-900">{coach.rating}</span>
                </div>
                <span className="text-xs text-neutral-400">
                  ({coach.reviews} reviews)
                </span>
                <span className="text-xs text-neutral-300 mx-1">•</span>
                <span className="text-xs text-neutral-500">
                  {coach.sessionsCompleted}+ sessions
                </span>
              </div>

              {/* tomiwa: Tags - uniform pill style, max 2 visible */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {coach.tags.slice(0, 2).map((tag, index) => (
                  <span 
                    key={index}
                    className="text-xs text-neutral-600 bg-neutral-100 px-2.5 py-1 rounded-lg font-medium"
                  >
                    {tag}
                  </span>
                ))}
                {coach.tags.length > 2 && (
                  <span className="text-xs text-neutral-400 px-1 py-1">
                    +{coach.tags.length - 2}
                  </span>
                )}
              </div>
            </div>

            {/* tomiwa: Card middle - availability row */}
            <div className="px-4 pb-3">
              {/* tomiwa: Availability label with status color */}
              <div className={`inline-flex items-center gap-1.5 text-xs font-medium 
                             px-2.5 py-1 rounded-lg border ${getAvailabilityStyle(coach.availableStatus)}`}>
                <ClockIcon className="w-3.5 h-3.5" />
                <span>{coach.available}</span>
              </div>
            </div>

            {/* tomiwa: NEW - Card footer with action buttons */}
            {/* updated: "View Profile" and "Book Coach" buttons side by side */}
            <div className="px-4 py-3 border-t border-neutral-100 bg-neutral-50/50 
                           mt-auto flex items-center gap-2">
              {/* tomiwa: View Profile button - secondary style */}
              <Link
                href={`/dashboard/candidate/ai-tools/coaching/${coach.id}`}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 
                          bg-white border border-neutral-200 text-neutral-700 
                          font-medium rounded-lg hover:bg-neutral-100 hover:border-neutral-300
                          transition-all text-xs"
              >
                <EyeIcon className="w-3.5 h-3.5" />
                Profile
              </Link>
              
              {/* tomiwa: NEW - Book Coach button - primary style, links to booking page */}
              <Link
                href={`/dashboard/candidate/ai-tools/coaching/${coach.id}/book`}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 
                          bg-brand-aqua text-white font-medium rounded-lg 
                          hover:bg-primary-600 transition-all text-xs
                          shadow-sm hover:shadow"
              >
                <CalendarDaysIcon className="w-3.5 h-3.5" />
                Book
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* tomiwa: No results state */}
      {filteredCoaches.length === 0 && (
        <div className="text-center py-16 bg-neutral-50 rounded-xl border border-neutral-200">
          <div className="w-16 h-16 bg-neutral-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <UserGroupIcon className="w-8 h-8 text-neutral-400" />
          </div>
          <h3 className="font-semibold text-neutral-900 text-lg mb-2">No coaches found</h3>
          <p className="text-neutral-500 text-sm mb-4 max-w-md mx-auto">
            We couldn't find any coaches matching your search criteria. 
            Try adjusting your filters or search terms.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveFilter('all');
            }}
            className="inline-flex items-center gap-2 text-brand-aqua hover:text-primary-700 
                      text-sm font-medium transition-colors"
          >
            <XMarkIcon className="w-4 h-4" />
            Clear all filters
          </button>
        </div>
      )}

      {/* ===================================================================== */}
      {/* tomiwa: Subscription upgrade prompt */}
      {/* Shows for non-subscribers, clean design with gradient */}
      {/* ===================================================================== */}
      {!hasCoachingSubscription && filteredCoaches.length > 0 && (
        <div className="bg-gradient-to-r from-primary-50 via-brand-aqua/5 to-primary-50 
                       rounded-xl p-5 
                       sm:p-6 
                       border border-primary-100">
          <div className="flex flex-col 
                         sm:flex-row 
                         items-center justify-between gap-4 
                         text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="w-12 h-12 bg-brand-aqua/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <RocketLaunchIcon className="w-6 h-6 text-brand-aqua" />
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900 text-base mb-1">
                  Unlock Unlimited Coaching Sessions
                </h3>
                <p className="text-sm text-neutral-600">
                  Upgrade your plan to access all coaches and book sessions directly.
                </p>
              </div>
            </div>
            <Link
              href="/dashboard/candidate/settings/billing"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-aqua text-white 
                        font-semibold rounded-xl hover:bg-primary-600 transition-colors text-sm
                        shadow-md shadow-brand-aqua/20 hover:shadow-lg whitespace-nowrap"
            >
              View Plans
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </CandidateDashboardLayout>
  );
}
