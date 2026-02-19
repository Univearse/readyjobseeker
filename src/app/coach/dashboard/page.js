/**
 * File: src/app/coach/dashboard/page.js
 * 
 * tomiwa: Coach Dashboard Main Page
 * A comprehensive dashboard for coaches to manage their coaching business
 * 
 * Layout Structure:
 * ================
 * HERO BANNER: Aqua-to-teal gradient (#36D0D8 → #0C5B65, 90°)
 *              - Title: "Coach Dashboard" (white)
 *              - Subtitle: "Manage your sessions, track earnings, and grow your coaching business" (light gray #D9E5E6)
 *              - Quick action button (right side)
 * 
 * SECTION 1: Stats Cards (4-card grid)
 *            - Upcoming Sessions, Completed Sessions, Monthly Earnings, Average Rating
 *            - Interactive cards with hover effects
 * 
 * SECTION 2: Today's Schedule
 *            - Session cards with candidate info, time, type
 *            - Join Session buttons
 *            - Empty state for no sessions
 * 
 * SECTION 3: Quick Actions
 *            - Update Availability, View Earnings, Edit Profile buttons
 *            - Interactive grid layout
 * 
 * SECTION 4: Recent Activity (optional)
 *            - Recent bookings, reviews, earnings
 * 
 * Design Features:
 * - Poppins font (default)
 * - Soft shadows and rounded corners (12px)
 * - Brand aqua accent color
 * - Fully responsive design
 * - Consistent with candidate dashboard structure
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import CoachDashboardLayout from '@/components/layouts/CoachDashboardLayout.jsx';
import DashboardCard from '@/components/ui/DashboardCard.js';
import {
  CalendarDaysIcon,
  CheckCircleIcon,
  CurrencyDollarIcon,
  StarIcon,
  VideoCameraIcon,
  ClockIcon,
  UserCircleIcon,
  ChartBarIcon,
  PlusIcon,
  EyeIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  SparklesIcon,
  RocketLaunchIcon,
  BellIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';

// tomiwa: Mock data for today's sessions - updated to match sessions page structure
const todaysSessions = [
  {
    id: 1,
    candidateName: 'Alex Thompson',
    candidateAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    sessionType: 'Career Strategy',
    sessionMethod: 'video', // tomiwa: NEW - video, voice, or chat
    time: '10:00 AM',
    duration: 60,
    meetingLink: 'https://zoom.us/j/123456789',
    status: 'upcoming',
    candidateLocation: 'New York, NY',
    candidateEmail: 'alex.thompson@email.com',
    price: 25000, // tomiwa: NEW - Naira pricing
    agenda: 'Discuss career transition from finance to tech, explore potential roles, and create 6-month action plan.',
  },
  {
    id: 2,
    candidateName: 'Maria Rodriguez',
    candidateAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    sessionType: 'Interview Preparation',
    sessionMethod: 'video', // tomiwa: NEW - video call
    time: '2:30 PM',
    duration: 45,
    meetingLink: 'https://meet.google.com/abc-defg-hij',
    status: 'upcoming',
    candidateLocation: 'Los Angeles, CA',
    candidateEmail: 'maria.rodriguez@email.com',
    price: 25000, // tomiwa: NEW - Naira pricing
    agenda: 'Mock technical interview for software engineer position at Google, behavioral questions practice.',
  },
  {
    id: 3,
    candidateName: 'David Chen',
    candidateAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    sessionType: 'Resume Review',
    sessionMethod: 'voice', // tomiwa: NEW - voice call
    time: '4:00 PM',
    duration: 30,
    meetingLink: 'https://zoom.us/j/987654321',
    status: 'upcoming',
    candidateLocation: 'San Francisco, CA',
    candidateEmail: 'david.chen@email.com',
    price: 18000, // tomiwa: NEW - Naira pricing for voice call
    agenda: 'Review and optimize resume for senior product manager roles, ATS optimization tips.',
  },
];

// tomiwa: Mock data for recent activity
const recentActivity = [
  {
    id: 1,
    type: 'booking',
    message: 'New session booked with Jennifer Kim',
    time: '2 hours ago',
    icon: CalendarDaysIcon,
    iconColor: 'text-brand-aqua',
  },
  {
    id: 2,
    type: 'review',
    message: 'Received 5-star review from Michael Brown',
    time: '5 hours ago',
    icon: StarIcon,
    iconColor: 'text-brand-yellow',
  },
  {
    id: 3,
    type: 'payment',
    message: 'Payment received: ₦48,000 for session with Lisa Wang',
    time: '1 day ago',
    icon: CurrencyDollarIcon,
    iconColor: 'text-emerald-500',
  },
  {
    id: 4,
    type: 'booking',
    message: 'Session completed with Robert Johnson',
    time: '2 days ago',
    icon: CheckCircleIcon,
    iconColor: 'text-brand-orange',
  },
];

export default function CoachDashboard() {
  // tomiwa: State for managing session details modal
  const [selectedSession, setSelectedSession] = useState(null);
  const [showSessionDetails, setShowSessionDetails] = useState(false);

  // tomiwa: Handle session details view
  const handleViewSession = (session) => {
    setSelectedSession(session);
    setShowSessionDetails(true);
  };

  // tomiwa: Handle join session
  const handleJoinSession = (meetingLink) => {
    window.open(meetingLink, '_blank');
  };

  return (
    <CoachDashboardLayout>
      {/* tomiwa: Hero Banner matching candidate dashboard design */}
      <div className="bg-gradient-to-r from-brand-aqua to-[#0C5B65]">
        <div className="px-6 
                        sm:px-8 
                        md:px-10 
                        lg:px-12 
                        xl:px-16 
                        2xl:px-20 
                        py-10 
                        sm:py-12 
                        md:py-14 
                        lg:py-16">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6">
            <div className="flex-1">
              {/* tomiwa: Welcome message with coach name */}
              <h1 className="text-3xl 
                            sm:text-4xl 
                            md:text-4xl 
                            lg:text-5xl 
                            font-display font-bold text-white mb-2">
                Welcome back, Sarah!
              </h1>
              {/* tomiwa: Subtitle */}
              <p className="text-[#D9E5E6] text-base 
                           sm:text-lg 
                           md:text-lg 
                           lg:text-xl 
                           leading-relaxed max-w-2xl">
                Manage your sessions, track earnings, and grow your coaching business
              </p>
            </div>
            {/* tomiwa: Quick action button */}
            <Link
              href="/coach/dashboard/availability"
              className="bg-brand-orange hover:bg-brand-orange/90 text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 shadow-lg hover:scale-105 whitespace-nowrap"
            >
              <ClockIcon className="w-5 h-5" />
              Update Availability
            </Link>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-8 py-12">
        {/* tomiwa: Stats Cards Grid - Clean design without excessive shadows */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <DashboardCard
            icon={CalendarDaysIcon}
            title="Upcoming Sessions"
            value="3"
            subtitle="Today"
            iconColor="text-brand-aqua"
            className="hover:border-brand-aqua/30 transition-all duration-300 border border-neutral-100 shadow-sm"
          />
          <DashboardCard
            icon={CheckCircleIcon}
            title="Completed Sessions"
            value="127"
            subtitle="All time"
            iconColor="text-emerald-500"
            className="hover:border-emerald-200 transition-all duration-300 border border-neutral-100 shadow-sm"
          />
          <DashboardCard
            icon={CurrencyDollarIcon}
            title="Monthly Earnings"
            value="₦980,000"
            subtitle="February 2026"
            iconColor="text-brand-orange"
            className="hover:border-brand-orange/30 transition-all duration-300 border border-neutral-100 shadow-sm"
          />
          <DashboardCard
            icon={StarIcon}
            title="Average Rating"
            value="4.9"
            subtitle="Based on 89 reviews"
            iconColor="text-brand-yellow"
            className="hover:border-brand-yellow/30 transition-all duration-300 border border-neutral-100 shadow-sm"
          />
        </div>

        {/* tomiwa: Today's Schedule - Full Width Section */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-100 p-8 mb-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <CalendarDaysIcon className="w-7 h-7 text-brand-aqua" />
              <h2 className="text-2xl font-display font-bold text-brand-black">Today's Schedule</h2>
            </div>
            <Link
              href="/coach/dashboard/sessions"
              className="text-sm text-brand-aqua hover:text-brand-orange font-medium"
            >
              View all sessions →
            </Link>
          </div>

          {/* tomiwa: updated - Session Lines (matching candidate booking flow design) */}
          {todaysSessions.length > 0 ? (
            <div className="space-y-3">
              {todaysSessions.map((session) => (
                <div
                  key={session.id}
                  className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl hover:bg-brand-aqua/5 border border-neutral-100 hover:border-brand-aqua/30 transition-all duration-300"
                >
                  <div className="flex items-center gap-4 flex-1">
                    {/* tomiwa: Candidate Avatar - smaller for line format */}
                    <img
                      src={session.candidateAvatar}
                      alt={session.candidateName}
                      className="w-12 h-12 rounded-xl object-cover ring-2 ring-white"
                    />
                    
                    <div className="flex-1 min-w-0">
                      {/* tomiwa: Session Info - compact line format */}
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-base text-neutral-900 truncate">
                          {session.candidateName}
                        </h3>
                        <span className="text-sm font-medium text-brand-orange">₦{session.price.toLocaleString()}</span>
                      </div>
                      
                      <div className="flex items-center gap-3 text-sm text-neutral-600">
                        <span className="flex items-center gap-1">
                          <VideoCameraIcon className="w-3.5 h-3.5" />
                          {session.sessionType}
                        </span>
                        <span className="text-neutral-300">•</span>
                        <span className="flex items-center gap-1">
                          <ClockIcon className="w-3.5 h-3.5" />
                          {session.time} ({session.duration}min)
                        </span>
                        <span className="text-neutral-300 hidden sm:inline">•</span>
                        <span className="flex items-center gap-1 hidden sm:flex">
                          <MapPinIcon className="w-3.5 h-3.5" />
                          {session.candidateLocation}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* tomiwa: Action Buttons - compact for line format */}
                  <div className="flex items-center gap-2 ml-4">
                    <Link
                      href={`/coach/dashboard/sessions/${session.id}`}
                      className="px-3 py-1.5 text-brand-aqua border border-brand-aqua rounded-lg hover:bg-brand-aqua/5 transition-colors flex items-center gap-1.5 text-sm"
                    >
                      <EyeIcon className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Details</span>
                    </Link>
                    <button
                      onClick={() => handleJoinSession(session.meetingLink)}
                      className="px-3 py-1.5 bg-brand-aqua text-white rounded-lg hover:bg-brand-aqua/90 transition-colors flex items-center gap-1.5 text-sm"
                    >
                      <VideoCameraIcon className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Join</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <CalendarDaysIcon className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-neutral-600 mb-2">No sessions today</h3>
              <p className="text-neutral-500 mb-6">Your schedule is clear for today.</p>
              <Link
                href="/coach/dashboard/availability"
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-aqua text-white rounded-xl hover:bg-brand-aqua/90 transition-colors"
              >
                <PlusIcon className="w-5 h-5" />
                Update Availability
              </Link>
            </div>
          )}
        </div>

        {/* tomiwa: Two Column Layout for Quick Actions and Recent Activity */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* tomiwa: Quick Actions Card */}
          <div className="bg-white rounded-xl shadow-sm border border-neutral-100 p-8">
            <div className="flex items-center gap-3 mb-6">
              <RocketLaunchIcon className="w-7 h-7 text-brand-aqua" />
              <h2 className="text-xl font-display font-bold text-brand-black">Quick Actions</h2>
            </div>
            
            <div className="space-y-3">
              <Link
                href="/coach/dashboard/availability"
                className="flex items-center gap-3 p-4 border border-neutral-200 rounded-xl hover:border-brand-aqua hover:bg-brand-aqua/5 transition-all duration-300 group"
              >
                <ClockIcon className="w-5 h-5 text-brand-aqua" />
                <div>
                  <div className="font-semibold text-neutral-900 group-hover:text-brand-aqua">
                    Update Availability
                  </div>
                  <div className="text-sm text-neutral-600">
                    Manage your schedule
                  </div>
                </div>
              </Link>

              <Link
                href="/coach/dashboard/earnings"
                className="flex items-center gap-3 p-4 border border-neutral-200 rounded-xl hover:border-brand-aqua hover:bg-brand-aqua/5 transition-all duration-300 group"
              >
                <CurrencyDollarIcon className="w-5 h-5 text-brand-orange" />
                <div>
                  <div className="font-semibold text-neutral-900 group-hover:text-brand-aqua">
                    View Earnings
                  </div>
                  <div className="text-sm text-neutral-600">
                    Track your income
                  </div>
                </div>
              </Link>

              <Link
                href="/coach/dashboard/profile"
                className="flex items-center gap-3 p-4 border border-neutral-200 rounded-xl hover:border-brand-aqua hover:bg-brand-aqua/5 transition-all duration-300 group"
              >
                <UserCircleIcon className="w-5 h-5 text-brand-yellow" />
                <div>
                  <div className="font-semibold text-neutral-900 group-hover:text-brand-aqua">
                    Edit Profile
                  </div>
                  <div className="text-sm text-neutral-600">
                    Update your info
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* tomiwa: Recent Activity Card */}
          <div className="bg-white rounded-xl shadow-sm border border-neutral-100 p-8">
            <div className="flex items-center gap-3 mb-6">
              <BellIcon className="w-7 h-7 text-brand-aqua" />
              <h2 className="text-xl font-display font-bold text-brand-black">Recent Activity</h2>
            </div>
            
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center flex-shrink-0`}>
                    <activity.icon className={`w-4 h-4 ${activity.iconColor}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-neutral-900 leading-relaxed">
                      {activity.message}
                    </p>
                    <p className="text-xs text-neutral-500 mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* tomiwa: Session Details Modal */}
      {showSessionDetails && selectedSession && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-display font-bold text-brand-black">Session Details</h3>
              <button
                onClick={() => setShowSessionDetails(false)}
                className="text-neutral-400 hover:text-neutral-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src={selectedSession.candidateAvatar}
                  alt={selectedSession.candidateName}
                  className="w-12 h-12 rounded-xl object-cover"
                />
                <div>
                  <h4 className="font-semibold text-neutral-900">{selectedSession.candidateName}</h4>
                  <p className="text-sm text-neutral-600">{selectedSession.candidateLocation}</p>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-neutral-200">
                <div className="flex items-center gap-3 text-sm">
                  <VideoCameraIcon className="w-4 h-4 text-neutral-400" />
                  <span className="text-neutral-600">Session Type:</span>
                  <span className="font-medium text-neutral-900">{selectedSession.sessionType}</span>
                </div>
                
                <div className="flex items-center gap-3 text-sm">
                  <ClockIcon className="w-4 h-4 text-neutral-400" />
                  <span className="text-neutral-600">Time:</span>
                  <span className="font-medium text-neutral-900">{selectedSession.time} ({selectedSession.duration} min)</span>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <EnvelopeIcon className="w-4 h-4 text-neutral-400" />
                  <span className="text-neutral-600">Email:</span>
                  <span className="font-medium text-neutral-900">{selectedSession.candidateEmail}</span>
                </div>
              </div>

              <div className="flex gap-3 pt-6">
                <button
                  onClick={() => setShowSessionDetails(false)}
                  className="flex-1 px-4 py-2 border border-neutral-200 text-neutral-600 rounded-lg hover:bg-neutral-50 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    handleJoinSession(selectedSession.meetingLink);
                    setShowSessionDetails(false);
                  }}
                  className="flex-1 px-4 py-2 bg-brand-aqua text-white rounded-lg hover:bg-brand-aqua/90 transition-colors flex items-center justify-center gap-2"
                >
                  <VideoCameraIcon className="w-4 h-4" />
                  Join Session
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </CoachDashboardLayout>
  );
}