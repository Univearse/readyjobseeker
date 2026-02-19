/**
 * File: src/app/coach/dashboard/sessions/page.js
 * 
 * tomiwa: Coach Sessions Management Page
 * Comprehensive view of all coaching sessions - upcoming, past, and cancelled
 * 
 * Features:
 * - Tabbed interface for different session states
 * - Session cards with candidate info and actions
 * - Filter and search functionality
 * - Join session buttons for upcoming sessions
 * - Session history with ratings and feedback
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import CoachDashboardLayout from '@/components/layouts/CoachDashboardLayout.jsx';
import {
  CalendarDaysIcon,
  VideoCameraIcon,
  ClockIcon,
  MapPinIcon,
  StarIcon,
  CheckCircleIcon,
  XCircleIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  EyeIcon,
  PhoneIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';

// tomiwa: Mock data for sessions - cleaned up to remove unnecessary fields from upcoming sessions
const sessionsData = {
  upcoming: [
    {
      id: 1,
      candidateName: 'Alex Thompson',
      candidateAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      sessionType: 'Career Strategy',
      sessionMethod: 'video', // tomiwa: video, voice, or chat
      date: 'Today',
      time: '10:00 AM',
      duration: 60,
      meetingLink: 'https://zoom.us/j/123456789',
      candidateLocation: 'New York, NY',
      candidateEmail: 'alex.thompson@email.com',
      price: 25000, // tomiwa: Naira pricing
      status: 'confirmed',
    },
    {
      id: 2,
      candidateName: 'Maria Rodriguez',
      candidateAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      sessionType: 'Interview Preparation',
      sessionMethod: 'video', // tomiwa: video call
      date: 'Today',
      time: '2:30 PM',
      duration: 45,
      meetingLink: 'https://meet.google.com/abc-defg-hij',
      candidateLocation: 'Los Angeles, CA',
      candidateEmail: 'maria.rodriguez@email.com',
      price: 25000, // tomiwa: Naira pricing
      status: 'confirmed',
    },
    {
      id: 3,
      candidateName: 'David Chen',
      candidateAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      sessionType: 'Resume Review',
      sessionMethod: 'voice', // tomiwa: voice call
      date: 'Tomorrow',
      time: '11:00 AM',
      duration: 30,
      meetingLink: 'https://zoom.us/j/987654321',
      candidateLocation: 'San Francisco, CA',
      candidateEmail: 'david.chen@email.com',
      price: 18000, // tomiwa: Naira pricing for voice call
      status: 'confirmed',
    },
  ],
  completed: [
    {
      id: 4,
      candidateName: 'Jennifer Kim',
      candidateAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
      sessionType: 'Salary Negotiation',
      sessionMethod: 'video', // tomiwa: video call
      date: 'Feb 15, 2026',
      time: '3:00 PM',
      duration: 60,
      candidateLocation: 'Seattle, WA',
      candidateEmail: 'jennifer.kim@email.com',
      price: 25000, // tomiwa: Naira pricing
      rating: 5,
      feedback: 'Excellent session! Sarah provided great insights on negotiation strategies.',
      sessionNotes: 'Discussed market rates, negotiation tactics, and follow-up strategies. Candidate well-prepared and showed strong understanding of negotiation principles.',
      sessionHistory: 'Session covered: 1) Current market analysis for marketing manager roles, 2) Negotiation script development, 3) Counter-offer strategies, 4) Follow-up communication templates',
      completedAt: '2026-02-15T15:00:00Z',
      status: 'completed',
    },
    {
      id: 5,
      candidateName: 'Michael Brown',
      candidateAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop',
      sessionType: 'Career Transition',
      sessionMethod: 'video', // tomiwa: video call
      date: 'Feb 14, 2026',
      time: '1:30 PM',
      duration: 90,
      candidateLocation: 'Austin, TX',
      candidateEmail: 'michael.brown@email.com',
      price: 25000, // tomiwa: Naira pricing
      rating: 5,
      feedback: 'Very helpful session. Clear action plan for my career change.',
      sessionNotes: 'Created detailed 12-month transition plan with specific milestones and resources. Recommended Python and SQL courses, portfolio projects, and networking strategies.',
      sessionHistory: 'Session covered: 1) Skills gap analysis between marketing and data science, 2) Learning roadmap creation, 3) Portfolio project planning, 4) Industry networking approach, 5) Timeline and milestone setting',
      completedAt: '2026-02-14T13:30:00Z',
      status: 'completed',
    },
    {
      id: 6,
      candidateName: 'Lisa Wang',
      candidateAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      sessionType: 'LinkedIn Optimization',
      sessionMethod: 'chat', // tomiwa: chat session
      date: 'Feb 12, 2026',
      time: '10:00 AM',
      duration: 45,
      candidateLocation: 'Boston, MA',
      candidateEmail: 'lisa.wang@email.com',
      price: 12000, // tomiwa: Naira pricing for chat
      rating: 4,
      feedback: 'Good tips for improving my LinkedIn profile. Would recommend!',
      sessionNotes: 'Provided detailed profile feedback and networking outreach templates. Suggested headline improvements and content strategy for better visibility.',
      sessionHistory: 'Session covered: 1) Profile headline optimization, 2) Summary section rewrite, 3) Experience descriptions enhancement, 4) Skills section optimization, 5) Networking outreach templates and strategies',
      completedAt: '2026-02-12T10:00:00Z',
      status: 'completed',
    },
  ],
  cancelled: [
    {
      id: 7,
      candidateName: 'Robert Johnson',
      candidateAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
      sessionType: 'Interview Preparation',
      sessionMethod: 'video', // tomiwa: video call
      date: 'Feb 10, 2026',
      time: '4:00 PM',
      duration: 60,
      candidateLocation: 'Chicago, IL',
      candidateEmail: 'robert.johnson@email.com',
      price: 25000, // tomiwa: Naira pricing
      reason: 'Candidate requested reschedule',
      cancelledAt: '2026-02-09T14:30:00Z',
      cancelledBy: 'candidate',
      refundStatus: 'processed',
      status: 'cancelled',
    },
    {
      id: 8,
      candidateName: 'Sarah Wilson',
      candidateAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      sessionType: 'Resume Review',
      sessionMethod: 'voice', // tomiwa: voice call
      date: 'Feb 8, 2026',
      time: '2:00 PM',
      duration: 30,
      candidateLocation: 'Miami, FL',
      candidateEmail: 'sarah.wilson@email.com',
      price: 18000, // tomiwa: Naira pricing for voice
      reason: 'Coach unavailable due to emergency',
      cancelledAt: '2026-02-08T10:15:00Z',
      cancelledBy: 'coach',
      refundStatus: 'processed',
      status: 'cancelled',
    },
  ],
};

export default function CoachSessionsPage() {
  // tomiwa: State for active tab
  const [activeTab, setActiveTab] = useState('upcoming');
  
  // tomiwa: State for search and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // tomiwa: Tab configuration
  const tabs = [
    { id: 'upcoming', label: 'Upcoming', count: sessionsData.upcoming.length },
    { id: 'completed', label: 'Completed', count: sessionsData.completed.length },
    { id: 'cancelled', label: 'Cancelled', count: sessionsData.cancelled.length },
  ];

  // tomiwa: Handle join session
  const handleJoinSession = (meetingLink) => {
    window.open(meetingLink, '_blank');
  };

  // tomiwa: NEW - Get session method icon and label
  const getSessionMethodIcon = (method) => {
    switch (method) {
      case 'video':
        return { icon: VideoCameraIcon, label: 'Video Call' };
      case 'voice':
        return { icon: PhoneIcon, label: 'Voice Call' };
      case 'chat':
        return { icon: ChatBubbleLeftRightIcon, label: 'Chat Session' };
      default:
        return { icon: VideoCameraIcon, label: 'Video Call' };
    }
  };

  // tomiwa: UPDATED - Render session row as a mature single-line layout
  // Each session is a horizontal strip with all info flowing left to right
  const renderSessionCard = (session, type) => (
    <div
      key={session.id}
      className="bg-white border border-neutral-200 rounded-xl hover:border-brand-aqua/50 transition-all duration-300 hover:shadow-md group"
    >
      {/* tomiwa: UPDATED - Reduced padding inside each session row for tighter look */}
      <div className="px-3 sm:px-4 md:px-5 py-3 flex flex-col md:flex-row md:items-center gap-3 md:gap-0">

        {/* tomiwa: UPDATED - Left cluster: Avatar + Name + Meta info all inline */}
        <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
          {/* tomiwa: UPDATED - Smaller circular avatar for compact look */}
          <img
            src={session.candidateAvatar}
            alt={session.candidateName}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover border-2 border-neutral-100 flex-shrink-0"
          />

          {/* tomiwa: UPDATED - Name as a bold inline label */}
          <h3 className="font-display font-bold text-sm sm:text-base text-neutral-900 whitespace-nowrap flex-shrink-0">
            {session.candidateName}
          </h3>

          {/* tomiwa: UPDATED - Separator dot (hidden on small screens) */}
          <span className="hidden lg:block w-1 h-1 rounded-full bg-neutral-300 flex-shrink-0" />

          {/* tomiwa: UPDATED - Session type badge with method icon */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-brand-aqua/10 text-brand-aqua rounded-lg text-xs font-semibold whitespace-nowrap flex-shrink-0">
            {React.createElement(getSessionMethodIcon(session.sessionMethod).icon, { className: "w-3.5 h-3.5" })}
            {session.sessionType}
          </div>

          {/* tomiwa: UPDATED - Separator dot */}
          <span className="hidden lg:block w-1 h-1 rounded-full bg-neutral-300 flex-shrink-0" />

          {/* tomiwa: UPDATED - Time and duration inline */}
          <div className="hidden md:flex items-center gap-1 text-xs text-neutral-500 whitespace-nowrap flex-shrink-0">
            <ClockIcon className="w-3.5 h-3.5" />
            <span>{session.time} ({session.duration}min)</span>
          </div>

          {/* tomiwa: UPDATED - Separator dot */}
          <span className="hidden lg:block w-1 h-1 rounded-full bg-neutral-300 flex-shrink-0" />

          {/* tomiwa: UPDATED - Location inline */}
          <div className="hidden lg:flex items-center gap-1 text-xs text-neutral-500 whitespace-nowrap flex-shrink-0">
            <MapPinIcon className="w-3.5 h-3.5" />
            <span>{session.candidateLocation}</span>
          </div>

          {/* tomiwa: UPDATED - Rating stars for completed (inline on large screens) */}
          {type === 'completed' && session.rating && (
            <>
              <span className="hidden xl:block w-1 h-1 rounded-full bg-neutral-300 flex-shrink-0" />
              <div className="hidden xl:flex items-center gap-0.5 flex-shrink-0">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarSolidIcon
                    key={star}
                    className={`w-3.5 h-3.5 ${
                      star <= session.rating ? 'text-brand-yellow' : 'text-neutral-300'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* tomiwa: UPDATED - Mobile meta row with reduced left padding and gap */}
        <div className="flex md:hidden flex-wrap items-center gap-2.5 text-xs text-neutral-500 pl-[48px]">
          <div className="flex sm:hidden items-center gap-1 px-2 py-0.5 bg-brand-aqua/10 text-brand-aqua rounded-md font-semibold">
            {React.createElement(getSessionMethodIcon(session.sessionMethod).icon, { className: "w-3 h-3" })}
            {session.sessionType}
          </div>
          <div className="flex items-center gap-1">
            <ClockIcon className="w-3.5 h-3.5" />
            <span>{session.time} ({session.duration}min)</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPinIcon className="w-3.5 h-3.5" />
            <span>{session.candidateLocation}</span>
          </div>
          {type === 'completed' && session.rating && (
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <StarSolidIcon
                  key={star}
                  className={`w-3 h-3 ${
                    star <= session.rating ? 'text-brand-yellow' : 'text-neutral-300'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* tomiwa: UPDATED - Right cluster with reduced left padding */}
        <div className="flex items-center gap-2.5 sm:gap-3 pl-[48px] md:pl-0 flex-shrink-0">
          {/* tomiwa: UPDATED - Price in brand orange, clean and prominent */}
          <span className="text-brand-orange font-bold text-sm sm:text-base whitespace-nowrap">
            ₦{session.price.toLocaleString()}
          </span>

          {/* tomiwa: UPDATED - Compact pill-style action buttons */}
          {type === 'upcoming' && (
            <>
              <Link
                href={`/coach/dashboard/sessions/${session.id}`}
                className="px-4 py-2 text-brand-aqua border border-brand-aqua rounded-xl hover:bg-brand-aqua/5 transition-all duration-300 text-xs sm:text-sm font-semibold flex items-center gap-1.5 whitespace-nowrap"
              >
                <EyeIcon className="w-4 h-4" />
                Details
              </Link>
              <button
                onClick={() => handleJoinSession(session.meetingLink)}
                className="px-4 py-2 bg-brand-aqua text-white rounded-xl hover:bg-brand-aqua/90 transition-all duration-300 text-xs sm:text-sm font-semibold flex items-center gap-1.5 whitespace-nowrap shadow-sm hover:shadow-md"
              >
                <VideoCameraIcon className="w-4 h-4" />
                Join
              </button>
            </>
          )}

          {type === 'completed' && (
            <Link
              href={`/coach/dashboard/sessions/${session.id}`}
              className="px-4 py-2 text-brand-aqua border border-brand-aqua rounded-xl hover:bg-brand-aqua/5 transition-all duration-300 text-xs sm:text-sm font-semibold flex items-center gap-1.5 whitespace-nowrap"
            >
              <EyeIcon className="w-4 h-4" />
              Details
            </Link>
          )}

          {type === 'cancelled' && (
            <Link
              href={`/coach/dashboard/sessions/${session.id}`}
              className="px-4 py-2 text-neutral-500 border border-neutral-300 rounded-xl hover:bg-neutral-50 transition-all duration-300 text-xs sm:text-sm font-semibold flex items-center gap-1.5 whitespace-nowrap"
            >
              <EyeIcon className="w-4 h-4" />
              Details
            </Link>
          )}
        </div>
      </div>

      {/* tomiwa: UPDATED - Cancellation reason sub-line with reduced padding */}
      {type === 'cancelled' && (
        <div className="px-3 sm:px-4 md:px-5 pb-2 -mt-1">
          <div className="flex items-center gap-2 text-xs pl-[52px] md:pl-[60px]">
            <span className="text-red-500 font-medium">Cancelled by {session.cancelledBy}</span>
            <span className="text-neutral-400">·</span>
            <span className="text-neutral-500">{session.reason}</span>
            <span className="text-neutral-400">·</span>
            <span className="text-green-600 font-medium">Refund: {session.refundStatus}</span>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <CoachDashboardLayout>
      {/* tomiwa: Header */}
      <div className="bg-gradient-to-r from-brand-aqua to-[#0C5B65]">
        <div className="px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20 py-10 sm:py-12 md:py-14 lg:py-16">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6">
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-2">
                Sessions
              </h1>
              <p className="text-[#D9E5E6] text-base sm:text-lg md:text-lg lg:text-xl leading-relaxed max-w-2xl">
                Manage your coaching sessions, join meetings, and track your session history
              </p>
            </div>
            <Link
              href="/coach/dashboard/availability"
              className="bg-brand-orange hover:bg-brand-orange/90 text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 shadow-lg hover:scale-105 whitespace-nowrap"
            >
              <CalendarDaysIcon className="w-5 h-5" />
              Manage Availability
            </Link>
          </div>
        </div>
      </div>

      {/* tomiwa: UPDATED - Reduced vertical padding for tighter overall layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-5 sm:py-6 md:py-8">
        {/* tomiwa: Search and Filter Bar - UPDATED: reduced bottom margin */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Search sessions by candidate name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-200 focus:border-brand-aqua focus:ring-brand-aqua/20 focus:ring-4 focus:outline-none transition-colors"
            />
          </div>
          <div className="relative">
            <FunnelIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="pl-10 pr-8 py-3 rounded-xl border border-neutral-200 focus:border-brand-aqua focus:ring-brand-aqua/20 focus:ring-4 focus:outline-none transition-colors bg-white"
            >
              <option value="all">All Sessions</option>
              <option value="career-strategy">Career Strategy</option>
              <option value="interview-prep">Interview Preparation</option>
              <option value="resume-review">Resume Review</option>
              <option value="salary-negotiation">Salary Negotiation</option>
            </select>
          </div>
        </div>

        {/* tomiwa: Tabs - UPDATED: reduced bottom margin */}
        <div className="border-b border-neutral-200 mb-5">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-brand-aqua text-brand-aqua'
                    : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                }`}
              >
                {tab.label}
                <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                  activeTab === tab.id
                    ? 'bg-brand-aqua/10 text-brand-aqua'
                    : 'bg-neutral-100 text-neutral-600'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* tomiwa: UPDATED - Sessions list with reduced gap between cards */}
        <div className="space-y-2">
          {sessionsData[activeTab].length > 0 ? (
            sessionsData[activeTab].map((session) => renderSessionCard(session, activeTab))
          ) : (
            <div className="text-center py-12">
              <CalendarDaysIcon className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-neutral-600 mb-2">
                No {activeTab} sessions
              </h3>
              <p className="text-neutral-500 mb-6">
                {activeTab === 'upcoming' 
                  ? "You don't have any upcoming sessions scheduled."
                  : activeTab === 'completed'
                  ? "You haven't completed any sessions yet."
                  : "No cancelled sessions to display."
                }
              </p>
              {activeTab === 'upcoming' && (
                <Link
                  href="/coach/dashboard/availability"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-brand-aqua text-white rounded-xl hover:bg-brand-aqua/90 transition-colors"
                >
                  <CalendarDaysIcon className="w-5 h-5" />
                  Update Availability
                </Link>
              )}
            </div>
          )}
        </div>
      </main>
    </CoachDashboardLayout>
  );
}