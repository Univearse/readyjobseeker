/**
 * File: src/app/dashboard/candidate/ai-tools/coaching/[coachId]/book/page.js
 * 
 * tomiwa: NEW - Dedicated Coach Booking Page
 * Separated from coach profile for better UX flow
 * 
 * Features:
 * - Session type selection (Video, Voice, Chat)
 * - Calendar date selection
 * - Time slot selection
 * - Session details input (Description & Goals) - NEW Step 4
 * - Quick goal suggestion chips for easy selection
 * - Price summary and confirmation
 * - Responsive design across all breakpoints
 * - Clean step-by-step booking flow
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import CandidateDashboardLayout from '@/components/layouts/CandidateDashboardLayout.jsx';
import {
  ArrowLeftIcon,
  CheckBadgeIcon,
  ClockIcon,
  CalendarDaysIcon,
  VideoCameraIcon,
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  PhoneIcon,
  SparklesIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  BuildingLibraryIcon,
  LockClosedIcon,
  DocumentTextIcon,   // tomiwa: NEW - Icon for session description step
  FlagIcon            // tomiwa: NEW - Icon for goals
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';

export default function BookCoachPage() {
  // tomiwa: Get coachId from URL params
  const params = useParams();
  const router = useRouter();
  const coachId = params.coachId;

  // tomiwa: State for booking flow
  // ExistingCode: Using similar state structure from original modal
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [sessionType, setSessionType] = useState('video'); // 'video', 'audio', 'chat'
  const [paymentMethod, setPaymentMethod] = useState('card'); // tomiwa: NEW - 'card' or 'bank'
  const [isConfirming, setIsConfirming] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  // tomiwa: NEW - State for session description and goals (Step 4)
  const [sessionDescription, setSessionDescription] = useState('');
  const [sessionGoals, setSessionGoals] = useState('');

  // tomiwa: NEW - Payment methods available for direct booking
  // updated: Removed subscription requirement - users can pay per session
  const paymentMethods = [
    {
      id: 'card',
      name: 'Card Payment',
      description: 'Pay instantly with debit/credit card',
      icon: <CreditCardIcon className="w-5 h-5" />,
      badge: 'Instant'
    },
    {
      id: 'bank',
      name: 'Bank Transfer',
      description: 'Pay via direct bank transfer',
      icon: <BuildingLibraryIcon className="w-5 h-5" />,
      badge: '1-2 hours'
    }
  ];

  // tomiwa: Session types with pricing - comprehensive options
  // updated: Clean data structure for booking options
  // updated: Changed prices from USD ($) to Naira (₦) currency
  const sessionTypes = [
    { 
      id: 'video', 
      name: 'Video Call', 
      icon: <VideoCameraIcon className="w-6 h-6" />,
      duration: '60 min',
      price: 25000, // tomiwa: Price in Naira (₦25,000)
      description: 'Face-to-face coaching via video - best for in-depth sessions',
      popular: true
    },
    { 
      id: 'audio', 
      name: 'Voice Call', 
      icon: <PhoneIcon className="w-6 h-6" />,
      duration: '45 min',
      price: 18000, // tomiwa: Price in Naira (₦18,000)
      description: 'Audio-only coaching call - flexible and convenient'
    },
    { 
      id: 'chat', 
      name: 'Chat Session', 
      icon: <ChatBubbleLeftRightIcon className="w-6 h-6" />,
      duration: '30 min',
      price: 12000, // tomiwa: Price in Naira (₦12,000)
      description: 'Text-based coaching - great for quick questions'
    }
  ];

  // tomiwa: All coaches data - same as profile page for consistency
  // ExistingCode: Keeping original coach data structure
  const allCoaches = {
    1: {
      id: 1,
      name: 'Dr. Sarah Mitchell',
      title: 'Executive Career Coach',
      specialty: 'Tech',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
      rating: 4.9,
      reviewCount: 127,
      yearsExperience: 15,
      sessionsCompleted: 450,
      verified: true,
      responseTime: 'Usually responds within 2 hours',
      availability: [
        { date: 'Tomorrow', day: 'Wed, Feb 7', slots: ['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM'] },
        { date: 'Thursday', day: 'Thu, Feb 8', slots: ['10:00 AM', '1:00 PM', '3:00 PM'] },
        { date: 'Friday', day: 'Fri, Feb 9', slots: ['9:00 AM', '12:00 PM', '2:00 PM', '5:00 PM'] },
        { date: 'Monday', day: 'Mon, Feb 12', slots: ['11:00 AM', '3:00 PM'] }
      ]
    },
    2: {
      id: 2,
      name: 'James Okonkwo',
      title: 'Tech Interview Specialist',
      specialty: 'Design',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      rating: 4.8,
      reviewCount: 89,
      yearsExperience: 10,
      sessionsCompleted: 320,
      verified: true,
      responseTime: 'Usually responds within 1 hour',
      availability: [
        { date: 'Today', day: 'Tue, Feb 6', slots: ['5:00 PM', '7:00 PM'] },
        { date: 'Tomorrow', day: 'Wed, Feb 7', slots: ['9:00 AM', '11:00 AM', '2:00 PM', '6:00 PM'] },
        { date: 'Thursday', day: 'Thu, Feb 8', slots: ['10:00 AM', '4:00 PM'] },
        { date: 'Friday', day: 'Fri, Feb 9', slots: ['3:00 PM', '5:00 PM'] }
      ]
    },
    3: {
      id: 3,
      name: 'Emma Thompson',
      title: 'Resume & Personal Branding Expert',
      specialty: 'Hospitality',
      photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop',
      rating: 4.9,
      reviewCount: 156,
      yearsExperience: 12,
      sessionsCompleted: 580,
      verified: true,
      responseTime: 'Usually responds within 3 hours',
      availability: [
        { date: 'Today', day: 'Tue, Feb 6', slots: ['3:30 PM', '5:00 PM'] },
        { date: 'Tomorrow', day: 'Wed, Feb 7', slots: ['10:00 AM', '1:00 PM', '3:00 PM'] },
        { date: 'Thursday', day: 'Thu, Feb 8', slots: ['9:00 AM', '11:00 AM', '2:00 PM'] },
        { date: 'Friday', day: 'Fri, Feb 9', slots: ['10:00 AM', '4:00 PM'] }
      ]
    },
    4: {
      id: 4,
      name: 'Dr. Michael Chen',
      title: 'Leadership Development Coach',
      specialty: 'Business',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
      rating: 4.7,
      reviewCount: 78,
      yearsExperience: 18,
      sessionsCompleted: 290,
      verified: true,
      responseTime: 'Usually responds within 4 hours',
      availability: [
        { date: 'Friday', day: 'Fri, Feb 9', slots: ['10:00 AM', '2:00 PM'] },
        { date: 'Monday', day: 'Mon, Feb 12', slots: ['9:00 AM', '11:00 AM', '3:00 PM'] },
        { date: 'Tuesday', day: 'Tue, Feb 13', slots: ['10:00 AM', '1:00 PM'] }
      ]
    },
    5: {
      id: 5,
      name: 'Priya Sharma',
      title: 'Tech Career Strategist',
      specialty: 'Tech',
      photo: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=400&fit=crop',
      rating: 4.8,
      reviewCount: 94,
      yearsExperience: 8,
      sessionsCompleted: 210,
      verified: true,
      responseTime: 'Usually responds within 2 hours',
      availability: [
        { date: 'Wednesday', day: 'Wed, Feb 7', slots: ['11:00 AM', '2:00 PM', '4:00 PM'] },
        { date: 'Thursday', day: 'Thu, Feb 8', slots: ['10:00 AM', '1:00 PM'] },
        { date: 'Friday', day: 'Fri, Feb 9', slots: ['9:00 AM', '3:00 PM'] }
      ]
    },
    6: {
      id: 6,
      name: 'Robert Williams',
      title: 'Interview Performance Coach',
      specialty: 'Business',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
      rating: 4.6,
      reviewCount: 67,
      yearsExperience: 14,
      sessionsCompleted: 180,
      verified: true,
      responseTime: 'Usually responds within 1 hour',
      availability: [
        { date: 'Today', day: 'Tue, Feb 6', slots: ['6:00 PM', '8:00 PM'] },
        { date: 'Tomorrow', day: 'Wed, Feb 7', slots: ['10:00 AM', '2:00 PM', '5:00 PM'] },
        { date: 'Thursday', day: 'Thu, Feb 8', slots: ['11:00 AM', '3:00 PM'] }
      ]
    },
    7: {
      id: 7,
      name: 'Amara Johnson',
      title: 'Career Transition Specialist',
      specialty: 'Design',
      photo: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop',
      rating: 4.9,
      reviewCount: 112,
      yearsExperience: 11,
      sessionsCompleted: 340,
      verified: true,
      responseTime: 'Usually responds within 3 hours',
      availability: [
        { date: 'Thursday', day: 'Thu, Feb 8', slots: ['9:00 AM', '11:00 AM', '2:00 PM'] },
        { date: 'Friday', day: 'Fri, Feb 9', slots: ['10:00 AM', '1:00 PM', '4:00 PM'] },
        { date: 'Monday', day: 'Mon, Feb 12', slots: ['9:00 AM', '3:00 PM'] }
      ]
    },
    8: {
      id: 8,
      name: 'David Park',
      title: 'Senior Tech Recruiter Coach',
      specialty: 'Hospitality',
      photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop',
      rating: 4.7,
      reviewCount: 83,
      yearsExperience: 9,
      sessionsCompleted: 265,
      verified: true,
      responseTime: 'Usually responds within 2 hours',
      availability: [
        { date: 'Monday', day: 'Mon, Feb 12', slots: ['4:00 PM', '6:00 PM'] },
        { date: 'Tuesday', day: 'Tue, Feb 13', slots: ['10:00 AM', '2:00 PM', '5:00 PM'] },
        { date: 'Wednesday', day: 'Wed, Feb 14', slots: ['11:00 AM', '3:00 PM'] }
      ]
    }
  };

  // tomiwa: Get current coach data
  const coach = allCoaches[coachId] || allCoaches[1];

  // tomiwa: Get selected session type details
  const selectedSessionType = sessionTypes.find(s => s.id === sessionType);

  // tomiwa: Handle booking confirmation
  // updated: Now also requires session description before confirming
  const handleConfirmBooking = () => {
    if (selectedDate && selectedTime && sessionDescription.trim()) {
      setIsConfirming(true);
      // tomiwa: Simulate API call delay
      setTimeout(() => {
        setIsConfirming(false);
        setBookingComplete(true);
      }, 1500);
    }
  };

  // tomiwa: Calculate progress for the booking flow
  // updated: Added session details step (description & goals) to progress calculation
  const getProgress = () => {
    if (!sessionType) return 20;
    if (!selectedDate) return 40;
    if (!selectedTime) return 55;
    if (!sessionDescription) return 70;   // tomiwa: NEW - Progress for session details
    if (!paymentMethod) return 90;
    return 100;
  };

  return (
    <CandidateDashboardLayout>
      {/* tomiwa: Back navigation - fixed position above content */}
      <div className="mb-4">
        <Link
          href={`/dashboard/candidate/ai-tools/coaching/${coachId}`}
          className="inline-flex items-center gap-2 text-neutral-500 hover:text-brand-aqua 
                    transition-colors text-sm font-medium group"
        >
          <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to Coach Profile</span>
        </Link>
      </div>

      {/* ===================================================================== */}
      {/* tomiwa: Booking Complete Success State */}
      {/* Shows when booking is successfully confirmed */}
      {/* ===================================================================== */}
      {/* tomiwa: updated - Removed max-width constraint for full-page booking layout */}
      {bookingComplete ? (
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl border border-neutral-200 p-8 sm:p-12 text-center shadow-sm">
            {/* tomiwa: Success icon */}
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircleIcon className="w-10 h-10 text-emerald-600" />
            </div>
            
            {/* tomiwa: Success message */}
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-neutral-900 mb-3">
              Booking Confirmed!
            </h1>
            <p className="text-neutral-600 mb-8 max-w-md mx-auto">
              Your session with {coach.name} has been scheduled. 
              You'll receive a confirmation email with all the details.
            </p>

            {/* tomiwa: Booking summary card */}
            <div className="bg-neutral-50 rounded-xl p-5 mb-8 text-left">
              <div className="flex items-center gap-4 mb-4 pb-4 border-b border-neutral-200">
                <img 
                  src={coach.photo} 
                  alt={coach.name}
                  className="w-14 h-14 rounded-xl object-cover"
                />
                <div>
                  <h3 className="font-semibold text-neutral-900">{coach.name}</h3>
                  <p className="text-sm text-neutral-500">{coach.title}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-600">Session Type</span>
                  <span className="font-medium text-neutral-900">{selectedSessionType?.name}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-600">Date</span>
                  <span className="font-medium text-neutral-900">{selectedDate}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-600">Time</span>
                  <span className="font-medium text-neutral-900">{selectedTime}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-600">Duration</span>
                  <span className="font-medium text-neutral-900">{selectedSessionType?.duration}</span>
                </div>
                {/* tomiwa: NEW - Show payment method used */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-600">Payment Method</span>
                  <span className="font-medium text-neutral-900 flex items-center gap-1.5">
                    {paymentMethod === 'card' ? (
                      <>
                        <CreditCardIcon className="w-4 h-4 text-brand-aqua" />
                        Card Payment
                      </>
                    ) : (
                      <>
                        <BuildingLibraryIcon className="w-4 h-4 text-brand-aqua" />
                        Bank Transfer
                      </>
                    )}
                  </span>
                </div>

                {/* tomiwa: NEW - Show session description in confirmation */}
                {sessionDescription && (
                  <div className="text-sm pt-3 border-t border-neutral-200">
                    <span className="text-neutral-600 flex items-center gap-1.5 mb-1">
                      <DocumentTextIcon className="w-3.5 h-3.5" />
                      Session Description
                    </span>
                    <p className="text-neutral-900 text-xs leading-relaxed bg-white rounded-lg p-2 border border-neutral-100">
                      {sessionDescription}
                    </p>
                  </div>
                )}

                {/* tomiwa: NEW - Show session goals in confirmation */}
                {sessionGoals && (
                  <div className="text-sm">
                    <span className="text-neutral-600 flex items-center gap-1.5 mb-1">
                      <FlagIcon className="w-3.5 h-3.5" />
                      Session Goals
                    </span>
                    <p className="text-neutral-900 text-xs leading-relaxed bg-white rounded-lg p-2 border border-neutral-100 whitespace-pre-line">
                      {sessionGoals}
                    </p>
                  </div>
                )}

                {/* tomiwa: updated - Changed price display from USD ($) to Naira (₦) */}
                <div className="flex items-center justify-between pt-3 border-t border-neutral-200">
                  <span className="font-semibold text-neutral-900">Total Paid</span>
                  <span className="font-bold text-lg text-brand-aqua">₦{selectedSessionType?.price.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* tomiwa: Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/dashboard/candidate/ai-tools/coaching"
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 
                          bg-neutral-100 text-neutral-700 font-semibold rounded-xl 
                          hover:bg-neutral-200 transition-colors"
              >
                Back to Coaching
              </Link>
              <Link
                href="/dashboard/candidate"
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 
                          bg-brand-aqua text-white font-semibold rounded-xl 
                          hover:bg-primary-600 transition-colors"
              >
                Go to Dashboard
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      ) : (
        /* tomiwa: Main Booking Flow */
        /* tomiwa: updated - Expanded to max-w-6xl for full-page booking layout */
        <div className="max-w-6xl mx-auto">
          
          {/* ===================================================================== */}
          {/* tomiwa: Page Header with Coach Info */}
          {/* Compact header showing who you're booking with */}
          {/* ===================================================================== */}
          <div className="bg-white rounded-xl border border-neutral-200 p-5 sm:p-6 mb-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                {/* tomiwa: Coach photo */}
                <div className="relative">
                  <img
                    src={coach.photo}
                    alt={coach.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border-2 border-neutral-100"
                  />
                  {coach.verified && (
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full 
                                   flex items-center justify-center shadow-sm">
                      <CheckBadgeIcon className="w-5 h-5 text-brand-aqua" />
                    </div>
                  )}
                </div>
                
                {/* tomiwa: Coach info */}
                <div>
                  <h1 className="text-xl sm:text-2xl font-display font-bold text-neutral-900 mb-1">
                    Book with {coach.name}
                  </h1>
                  <p className="text-neutral-500 text-sm sm:text-base">{coach.title}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center gap-1">
                      <StarSolidIcon className="w-4 h-4 text-brand-yellow" />
                      <span className="text-sm font-semibold text-neutral-900">{coach.rating}</span>
                    </div>
                    <span className="text-neutral-300">•</span>
                    <span className="text-sm text-neutral-500">{coach.reviewCount} reviews</span>
                  </div>
                </div>
              </div>

              {/* tomiwa: Response time badge */}
              <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 
                             rounded-lg text-sm font-medium">
                <ClockIcon className="w-4 h-4" />
                <span>{coach.responseTime}</span>
              </div>
            </div>

            {/* tomiwa: Progress indicator */}
            <div className="mt-5 pt-5 border-t border-neutral-100">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-neutral-600">Booking Progress</span>
                <span className="font-medium text-brand-aqua">{getProgress()}%</span>
              </div>
              <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-brand-aqua rounded-full transition-all duration-500"
                  style={{ width: `${getProgress()}%` }}
                />
              </div>
            </div>
          </div>

          {/* ===================================================================== */}
          {/* tomiwa: Main Booking Grid */}
          {/* Left: Selection steps | Right: Summary */}
          {/* updated: Changed to 12-column grid for better proportions on full-page layout */}
          {/* ===================================================================== */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* tomiwa: Left Column - Selection Steps */}
            {/* tomiwa: updated - Takes 8 columns for more room on wider layout */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* ===================================================================== */}
              {/* tomiwa: STEP 1 - Session Type Selection */}
              {/* ===================================================================== */}
              <div className="bg-white rounded-xl border border-neutral-200 p-5 sm:p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 bg-brand-aqua text-white rounded-lg flex items-center justify-center 
                                 text-sm font-bold">
                    1
                  </div>
                  <h2 className="text-lg font-display font-bold text-neutral-900">
                    Choose Session Type
                  </h2>
                </div>

                {/* tomiwa: Session type cards */}
                <div className="space-y-3">
                  {sessionTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setSessionType(type.id)}
                      className={`w-full flex items-start gap-4 p-4 rounded-xl border-2 
                                 transition-all duration-200 text-left relative ${
                        sessionType === type.id
                          ? 'border-brand-aqua bg-primary-50'
                          : 'border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50'
                      }`}
                    >
                      {/* tomiwa: Popular badge */}
                      {type.popular && (
                        <span className="absolute -top-2.5 right-4 px-2.5 py-0.5 bg-brand-orange 
                                        text-white text-xs font-semibold rounded-full">
                          Most Popular
                        </span>
                      )}
                      
                      {/* tomiwa: Icon */}
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center 
                                     flex-shrink-0 transition-colors ${
                        sessionType === type.id
                          ? 'bg-brand-aqua text-white'
                          : 'bg-neutral-100 text-neutral-600'
                      }`}>
                        {type.icon}
                      </div>
                      
                      {/* tomiwa: Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className={`font-semibold ${
                              sessionType === type.id ? 'text-primary-700' : 'text-neutral-900'
                            }`}>
                              {type.name}
                            </div>
                            <div className="text-sm text-neutral-500 mt-0.5">
                              {type.duration} • {type.description}
                            </div>
                          </div>
                          {/* tomiwa: updated - Changed price display from USD ($) to Naira (₦) */}
                          <div className={`text-xl font-bold flex-shrink-0 ${
                            sessionType === type.id ? 'text-brand-aqua' : 'text-neutral-900'
                          }`}>
                            ₦{type.price.toLocaleString()}
                          </div>
                        </div>
                      </div>

                      {/* tomiwa: Selection indicator */}
                      {sessionType === type.id && (
                        <CheckCircleIcon className="w-6 h-6 text-brand-aqua flex-shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* ===================================================================== */}
              {/* tomiwa: STEP 2 - Date Selection */}
              {/* ===================================================================== */}
              <div className="bg-white rounded-xl border border-neutral-200 p-5 sm:p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center 
                                 text-sm font-bold transition-colors ${
                    sessionType
                      ? 'bg-brand-aqua text-white'
                      : 'bg-neutral-200 text-neutral-500'
                  }`}>
                    2
                  </div>
                  <h2 className="text-lg font-display font-bold text-neutral-900">
                    Select Date
                  </h2>
                </div>

                {/* tomiwa: Date selection grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {coach.availability.map((day, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedDate(day.date);
                        setSelectedTime(null); // tomiwa: Reset time when date changes
                      }}
                      className={`text-left px-4 py-4 rounded-xl border-2 transition-all ${
                        selectedDate === day.date
                          ? 'border-brand-aqua bg-primary-50'
                          : 'border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className={`font-semibold ${
                            selectedDate === day.date ? 'text-primary-700' : 'text-neutral-900'
                          }`}>
                            {day.date}
                          </div>
                          <div className="text-sm text-neutral-500">{day.day}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-medium px-2.5 py-1 rounded-lg ${
                            day.date === 'Today' 
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-neutral-100 text-neutral-600'
                          }`}>
                            {day.slots.length} slots
                          </span>
                          {selectedDate === day.date && (
                            <CheckCircleIcon className="w-5 h-5 text-brand-aqua" />
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* ===================================================================== */}
              {/* tomiwa: STEP 3 - Time Selection */}
              {/* Shows only when a date is selected */}
              {/* ===================================================================== */}
              {selectedDate && (
                <div className="bg-white rounded-xl border border-neutral-200 p-5 sm:p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-8 h-8 bg-brand-aqua text-white rounded-lg flex items-center justify-center 
                                   text-sm font-bold">
                      3
                    </div>
                    <h2 className="text-lg font-display font-bold text-neutral-900">
                      Choose Time Slot
                    </h2>
                  </div>

                  {/* tomiwa: Time slots grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {coach.availability
                      .find(d => d.date === selectedDate)
                      ?.slots.map((slot, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedTime(slot)}
                          className={`px-4 py-3 rounded-xl border-2 text-sm font-medium 
                                     transition-all flex items-center justify-center gap-2 ${
                            selectedTime === slot
                              ? 'border-brand-aqua bg-brand-aqua text-white'
                              : 'border-neutral-200 hover:border-brand-aqua/50 text-neutral-700 hover:bg-neutral-50'
                          }`}
                        >
                          <ClockIcon className="w-4 h-4" />
                          {slot}
                        </button>
                      ))}
                  </div>
                </div>
              )}

              {/* ===================================================================== */}
              {/* tomiwa: NEW - STEP 4 - Session Details (Description & Goals) */}
              {/* Shows only when a time slot is selected */}
              {/* Allows candidate to describe what they need help with */}
              {/* ===================================================================== */}
              {selectedTime && (
                <div className="bg-white rounded-xl border border-neutral-200 p-5 sm:p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-brand-aqua text-white rounded-lg flex items-center justify-center 
                                   text-sm font-bold">
                      4
                    </div>
                    <h2 className="text-lg font-display font-bold text-neutral-900">
                      Session Details
                    </h2>
                  </div>
                  {/* tomiwa: NEW - Helper text so the candidate knows why this matters */}
                  <p className="text-sm text-neutral-500 mb-6 ml-11">
                    Help your coach prepare by describing what you'd like to cover.
                  </p>

                  <div className="space-y-5">
                    {/* tomiwa: NEW - Session Description textarea */}
                    <div>
                      <label 
                        htmlFor="session-description" 
                        className="flex items-center gap-2 text-sm font-semibold text-neutral-900 mb-2"
                      >
                        <DocumentTextIcon className="w-4 h-4 text-brand-aqua" />
                        Session Description
                        <span className="text-brand-orange text-xs font-medium">(Required)</span>
                      </label>
                      <textarea
                        id="session-description"
                        value={sessionDescription}
                        onChange={(e) => setSessionDescription(e.target.value)}
                        placeholder="Briefly describe what you'd like to discuss in this session. For example: 'I'm preparing for a product manager interview at a top tech company and need help with case study frameworks...'"
                        rows={4}
                        maxLength={500}
                        className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 
                                  text-sm text-neutral-900 placeholder:text-neutral-400
                                  focus:outline-none focus:border-brand-aqua focus:ring-2 focus:ring-brand-aqua/20
                                  transition-all resize-none"
                      />
                      {/* tomiwa: NEW - Character counter */}
                      <div className="flex items-center justify-between mt-1.5">
                        <p className="text-xs text-neutral-400">
                          Be as specific as possible so your coach can prepare
                        </p>
                        <span className={`text-xs font-medium ${
                          sessionDescription.length > 450 
                            ? 'text-brand-orange' 
                            : 'text-neutral-400'
                        }`}>
                          {sessionDescription.length}/500
                        </span>
                      </div>
                    </div>

                    {/* tomiwa: NEW - Session Goals textarea */}
                    <div>
                      <label 
                        htmlFor="session-goals" 
                        className="flex items-center gap-2 text-sm font-semibold text-neutral-900 mb-2"
                      >
                        <FlagIcon className="w-4 h-4 text-brand-yellow" />
                        Session Goals
                        <span className="text-neutral-400 text-xs font-medium">(Optional)</span>
                      </label>
                      <textarea
                        id="session-goals"
                        value={sessionGoals}
                        onChange={(e) => setSessionGoals(e.target.value)}
                        placeholder="What do you hope to achieve? For example:&#10;• Get feedback on my resume&#10;• Practice behavioral interview questions&#10;• Build a 90-day career plan&#10;• Improve my salary negotiation strategy"
                        rows={4}
                        maxLength={500}
                        className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 
                                  text-sm text-neutral-900 placeholder:text-neutral-400
                                  focus:outline-none focus:border-brand-aqua focus:ring-2 focus:ring-brand-aqua/20
                                  transition-all resize-none"
                      />
                      {/* tomiwa: NEW - Character counter */}
                      <div className="flex items-center justify-between mt-1.5">
                        <p className="text-xs text-neutral-400">
                          List specific outcomes you want from this session
                        </p>
                        <span className={`text-xs font-medium ${
                          sessionGoals.length > 450 
                            ? 'text-brand-orange' 
                            : 'text-neutral-400'
                        }`}>
                          {sessionGoals.length}/500
                        </span>
                      </div>
                    </div>

                    {/* tomiwa: NEW - Quick goal suggestion chips */}
                    <div>
                      <p className="text-xs font-medium text-neutral-500 mb-2">Quick suggestions:</p>
                      <div className="flex flex-wrap gap-2">
                        {[
                          'Resume Review',
                          'Mock Interview',
                          'Career Pivot Strategy',
                          'Salary Negotiation',
                          'LinkedIn Optimization',
                          'Portfolio Review'
                        ].map((suggestion) => (
                          <button
                            key={suggestion}
                            type="button"
                            onClick={() => {
                              // tomiwa: NEW - Append suggestion to goals with bullet point
                              const bullet = `• ${suggestion}`;
                              setSessionGoals(prev => 
                                prev ? `${prev}\n${bullet}` : bullet
                              );
                            }}
                            className="px-3 py-1.5 text-xs font-medium rounded-lg border border-neutral-200 
                                      text-neutral-600 hover:border-brand-aqua hover:text-brand-aqua 
                                      hover:bg-primary-50 transition-all"
                          >
                            + {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ===================================================================== */}
            {/* tomiwa: Right Column - Booking Summary & Payment */}
            {/* Sticky sidebar with price, payment options, and confirm button */}
            {/* updated: Removed subscription requirement - direct payment per session */}
            {/* ===================================================================== */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-xl border border-neutral-200 shadow-sm sticky top-4">
                {/* tomiwa: Summary header */}
                <div className="p-5 border-b border-neutral-100">
                  <h3 className="font-display font-bold text-neutral-900 flex items-center gap-2">
                    <CalendarDaysIcon className="w-5 h-5 text-brand-aqua" />
                    Booking Summary
                  </h3>
                </div>

                <div className="p-5">
                  {/* tomiwa: Selected session info */}
                  <div className="space-y-4 mb-6">
                    {/* ExistingCode: Session type */}
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-neutral-600">Session</span>
                      <span className="font-medium text-neutral-900">{selectedSessionType?.name}</span>
                    </div>
                    
                    {/* ExistingCode: Duration */}
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-neutral-600">Duration</span>
                      <span className="font-medium text-neutral-900">{selectedSessionType?.duration}</span>
                    </div>
                    
                    {/* ExistingCode: Date */}
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-neutral-600">Date</span>
                      <span className="font-medium text-neutral-900">
                        {selectedDate || <span className="text-neutral-400">Not selected</span>}
                      </span>
                    </div>
                    
                    {/* ExistingCode: Time */}
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-neutral-600">Time</span>
                      <span className="font-medium text-neutral-900">
                        {selectedTime || <span className="text-neutral-400">Not selected</span>}
                      </span>
                    </div>

                    {/* tomiwa: NEW - Session description preview in summary */}
                    <div className="text-sm">
                      <span className="text-neutral-600">Description</span>
                      {sessionDescription ? (
                        <p className="font-medium text-neutral-900 mt-1 text-xs leading-relaxed 
                                     bg-neutral-50 rounded-lg p-2 line-clamp-3">
                          {sessionDescription}
                        </p>
                      ) : (
                        <p className="text-neutral-400 mt-1">Not provided yet</p>
                      )}
                    </div>

                    {/* tomiwa: NEW - Session goals preview in summary */}
                    {sessionGoals && (
                      <div className="text-sm">
                        <span className="text-neutral-600">Goals</span>
                        <p className="font-medium text-neutral-900 mt-1 text-xs leading-relaxed 
                                     bg-neutral-50 rounded-lg p-2 line-clamp-3 whitespace-pre-line">
                          {sessionGoals}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* tomiwa: Price breakdown - transparent pricing */}
                  {/* updated: Changed price display from USD ($) to Naira (₦) */}
                  <div className="bg-neutral-50 rounded-xl p-4 mb-5">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-neutral-600">{selectedSessionType?.name}</span>
                      <span className="text-neutral-900">₦{selectedSessionType?.price.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-neutral-600">Platform fee</span>
                      <span className="text-emerald-600 font-medium">Free</span>
                    </div>
                    <div className="border-t border-neutral-200 pt-3 mt-2">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-neutral-900">Total to Pay</span>
                        <span className="font-bold text-xl text-brand-aqua">₦{selectedSessionType?.price.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* tomiwa: NEW - Payment Method Selection */}
                  {/* updated: Direct payment without subscription requirement */}
                  <div className="mb-5">
                    <h4 className="text-sm font-semibold text-neutral-900 mb-3 flex items-center gap-2">
                      <LockClosedIcon className="w-4 h-4 text-brand-aqua" />
                      Payment Method
                    </h4>
                    <div className="space-y-2">
                      {paymentMethods.map((method) => (
                        <button
                          key={method.id}
                          onClick={() => setPaymentMethod(method.id)}
                          className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 
                                     transition-all text-left ${
                            paymentMethod === method.id
                              ? 'border-brand-aqua bg-primary-50'
                              : 'border-neutral-200 hover:border-neutral-300'
                          }`}
                        >
                          {/* tomiwa: Payment icon */}
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center 
                                         flex-shrink-0 ${
                            paymentMethod === method.id
                              ? 'bg-brand-aqua text-white'
                              : 'bg-neutral-100 text-neutral-600'
                          }`}>
                            {method.icon}
                          </div>
                          
                          {/* tomiwa: Payment info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className={`font-medium text-sm ${
                                paymentMethod === method.id ? 'text-primary-700' : 'text-neutral-900'
                              }`}>
                                {method.name}
                              </span>
                              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                                method.id === 'card'
                                  ? 'bg-emerald-100 text-emerald-700'
                                  : 'bg-amber-100 text-amber-700'
                              }`}>
                                {method.badge}
                              </span>
                            </div>
                            <p className="text-xs text-neutral-500 mt-0.5">{method.description}</p>
                          </div>

                          {/* tomiwa: Selection indicator */}
                          {paymentMethod === method.id && (
                            <CheckCircleIcon className="w-5 h-5 text-brand-aqua flex-shrink-0" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* tomiwa: updated - Pay & Book button now also requires session description */}
                  {/* updated: Added sessionDescription to the disabled check */}
                  <button
                    onClick={handleConfirmBooking}
                    disabled={!selectedDate || !selectedTime || !sessionDescription.trim() || isConfirming}
                    className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 
                              font-semibold rounded-xl transition-all ${
                      selectedDate && selectedTime && sessionDescription.trim() && !isConfirming
                        ? 'bg-brand-aqua text-white hover:bg-primary-600 shadow-md shadow-brand-aqua/20 hover:shadow-lg'
                        : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                    }`}
                  >
                    {isConfirming ? (
                      <>
                        <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Processing Payment...
                      </>
                    ) : (
                      <>
                        {paymentMethod === 'card' ? (
                          <CreditCardIcon className="w-5 h-5" />
                        ) : (
                          <BuildingLibraryIcon className="w-5 h-5" />
                        )}
                        Pay ₦{selectedSessionType?.price.toLocaleString()} & Book
                      </>
                    )}
                  </button>

                  {/* tomiwa: NEW - Save with subscription prompt (optional, not required) */}
                  <div className="mt-4 p-3 bg-gradient-to-r from-secondary-50 to-brand-orange/10 
                                 rounded-xl border border-secondary-100">
                    <div className="flex items-start gap-2">
                      <SparklesIcon className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-medium text-neutral-800">
                          Save up to 30% with a subscription
                        </p>
                        <Link 
                          href="/dashboard/candidate/subscription" 
                          className="text-xs text-brand-orange hover:underline font-medium"
                        >
                          View subscription plans →
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* tomiwa: Trust indicators */}
                  <div className="mt-5 pt-5 border-t border-neutral-100">
                    <div className="flex items-center gap-2 text-sm text-neutral-500 mb-2">
                      <ShieldCheckIcon className="w-4 h-4 text-emerald-600" />
                      <span>Free cancellation up to 24h before</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-neutral-500 mb-2">
                      <LockClosedIcon className="w-4 h-4 text-emerald-600" />
                      <span>256-bit SSL secure payment</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-neutral-500">
                      <CheckCircleIcon className="w-4 h-4 text-emerald-600" />
                      <span>Money-back guarantee</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </CandidateDashboardLayout>
  );
}
