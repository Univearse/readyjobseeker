/**
 * File: src/app/coach/dashboard/sessions/[sessionId]/reschedule/page.js
 * 
 * tomiwa: NEW - Coach Session Reschedule Page
 * Allows coaches to reschedule an upcoming session with a candidate
 * 
 * Features:
 * - Displays current session details (candidate, date, time, method)
 * - Date and time picker for new preferred slot
 * - Reason selection with custom option
 * - Message to candidate (optional)
 * - Notify candidate toggle
 * - Submit reschedule with success confirmation
 * - Responsive design across all screen sizes
 */

'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import CoachDashboardLayout from '@/components/layouts/CoachDashboardLayout.jsx';
import {
  CalendarDaysIcon,
  ClockIcon,
  VideoCameraIcon,
  PhoneIcon,
  ChatBubbleLeftRightIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  UserIcon,
  MapPinIcon,
  EnvelopeIcon,
  BellAlertIcon,
} from '@heroicons/react/24/outline';

// tomiwa: NEW - Session data matching the detail page (in production, fetched from API)
const allSessionsData = {
  1: {
    id: 1,
    candidateName: 'Alex Thompson',
    candidateAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    candidateTitle: 'Senior Software Engineer',
    candidateEmail: 'alex.thompson@email.com',
    sessionType: 'Career Strategy',
    sessionMethod: 'video',
    date: 'Today',
    time: '10:00 AM',
    duration: 60,
    candidateLocation: 'New York, NY',
    price: 25000,
    status: 'confirmed',
    type: 'upcoming',
  },
  2: {
    id: 2,
    candidateName: 'Maria Rodriguez',
    candidateAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    candidateTitle: 'UX Designer',
    candidateEmail: 'maria.rodriguez@email.com',
    sessionType: 'Interview Preparation',
    sessionMethod: 'video',
    date: 'Today',
    time: '2:30 PM',
    duration: 45,
    candidateLocation: 'Los Angeles, CA',
    price: 25000,
    status: 'confirmed',
    type: 'upcoming',
  },
  3: {
    id: 3,
    candidateName: 'David Chen',
    candidateAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
    candidateTitle: 'Data Analyst',
    candidateEmail: 'david.chen@email.com',
    sessionType: 'Resume Review',
    sessionMethod: 'voice',
    date: 'Tomorrow',
    time: '11:00 AM',
    duration: 30,
    candidateLocation: 'San Francisco, CA',
    price: 18000,
    status: 'confirmed',
    type: 'upcoming',
  },
};

// tomiwa: NEW - Predefined reasons a coach might reschedule
const rescheduleReasons = [
  'Schedule conflict with another session',
  'Personal emergency',
  'Technical issues with current setup',
  'Travel/transportation conflict',
  'Health-related reason',
  'Need more preparation time',
  'Client requested change',
  'Other (please specify)',
];

// tomiwa: NEW - Helper to get session method details
const getSessionMethodInfo = (method) => {
  switch (method) {
    case 'video':
      return { icon: VideoCameraIcon, label: 'Video Call', color: 'text-brand-aqua', bg: 'bg-brand-aqua/10' };
    case 'voice':
      return { icon: PhoneIcon, label: 'Voice Call', color: 'text-brand-orange', bg: 'bg-brand-orange/10' };
    case 'chat':
      return { icon: ChatBubbleLeftRightIcon, label: 'Chat Session', color: 'text-brand-yellow', bg: 'bg-brand-yellow/10' };
    default:
      return { icon: VideoCameraIcon, label: 'Video Call', color: 'text-brand-aqua', bg: 'bg-brand-aqua/10' };
  }
};

export default function RescheduleSessionPage() {
  const params = useParams();
  const router = useRouter();
  const sessionId = parseInt(params.sessionId);

  // tomiwa: NEW - Get session data
  const session = allSessionsData[sessionId];

  // tomiwa: NEW - Form state management
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedReason, setSelectedReason] = useState('');
  const [customReason, setCustomReason] = useState('');
  const [messageToCandidate, setMessageToCandidate] = useState('');
  const [notifyCandidate, setNotifyCandidate] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // tomiwa: NEW - Handle form submission (simulates API call)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // tomiwa: Simulate API call with 1.5s delay
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);

      // tomiwa: Redirect back to session detail after 3 seconds
      setTimeout(() => {
        router.push(`/coach/dashboard/sessions/${sessionId}`);
      }, 3000);
    }, 1500);
  };

  // tomiwa: NEW - Get minimum selectable date (tomorrow)
  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  // tomiwa: NEW - Generate time slots from 8 AM to 8 PM in 30-min intervals
  const timeSlots = [];
  for (let hour = 8; hour <= 20; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      if (hour === 20 && minute > 0) break;
      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      const displayTime = new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
      timeSlots.push({ value: time, display: displayTime });
    }
  }

  // tomiwa: NEW - Session not found state
  if (!session) {
    return (
      <CoachDashboardLayout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-12 text-center">
          <ExclamationTriangleIcon className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-display font-bold text-neutral-900 mb-2">Session Not Found</h1>
          <p className="text-neutral-600 mb-6">The session you're trying to reschedule doesn't exist.</p>
          <Link
            href="/coach/dashboard/sessions"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-aqua text-white rounded-xl hover:bg-brand-aqua/90 transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Back to Sessions
          </Link>
        </div>
      </CoachDashboardLayout>
    );
  }

  // tomiwa: NEW - Only upcoming sessions can be rescheduled
  if (session.type !== 'upcoming') {
    return (
      <CoachDashboardLayout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-12 text-center">
          <ExclamationTriangleIcon className="w-16 h-16 text-brand-orange mx-auto mb-4" />
          <h1 className="text-2xl font-display font-bold text-neutral-900 mb-2">Cannot Reschedule</h1>
          <p className="text-neutral-600 mb-6">Only upcoming sessions can be rescheduled.</p>
          <Link
            href={`/coach/dashboard/sessions/${sessionId}`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-aqua text-white rounded-xl hover:bg-brand-aqua/90 transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Back to Session
          </Link>
        </div>
      </CoachDashboardLayout>
    );
  }

  const methodInfo = getSessionMethodInfo(session.sessionMethod);

  // tomiwa: NEW - Success confirmation view after submitting
  if (showSuccess) {
    return (
      <CoachDashboardLayout>
        {/* tomiwa: NEW - Aqua gradient header for success state */}
        <div className="bg-gradient-to-r from-brand-aqua to-[#0C5B65]">
          <div className="px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-5 sm:py-6">
            <div className="max-w-4xl mx-auto">
              <Link
                href="/coach/dashboard/sessions"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-3 transition-colors text-sm"
              >
                <ArrowLeftIcon className="w-4 h-4" />
                Back to Sessions
              </Link>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8 text-center">
          {/* tomiwa: UPDATED - Success icon with reduced bottom margin */}
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 ring-4 ring-green-50">
            <CheckCircleIcon className="w-10 h-10 text-green-600" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-display font-bold text-neutral-900 mb-2">
            Session Rescheduled!
          </h1>
          <p className="text-base sm:text-lg text-neutral-600 mb-4 max-w-md mx-auto">
            The session with <strong className="text-neutral-900">{session.candidateName}</strong> has been 
            rescheduled successfully.
          </p>

          {/* tomiwa: UPDATED - New session details summary with reduced padding */}
          <div className="bg-white border border-neutral-200 rounded-xl p-4 sm:p-5 mb-4 text-left max-w-md mx-auto">
            <h3 className="font-display font-semibold text-neutral-900 mb-3 text-sm uppercase tracking-wide">
              New Session Details
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CalendarDaysIcon className="w-5 h-5 text-brand-aqua flex-shrink-0" />
                <div>
                  <div className="text-xs text-neutral-500">New Date</div>
                  <div className="font-medium text-neutral-900">
                    {selectedDate ? new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    }) : 'TBD'}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <ClockIcon className="w-5 h-5 text-brand-aqua flex-shrink-0" />
                <div>
                  <div className="text-xs text-neutral-500">New Time</div>
                  <div className="font-medium text-neutral-900">
                    {selectedTime ? new Date(`2000-01-01T${selectedTime}`).toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true,
                    }) : 'TBD'}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {React.createElement(methodInfo.icon, { className: `w-5 h-5 ${methodInfo.color} flex-shrink-0` })}
                <div>
                  <div className="text-xs text-neutral-500">Session Type</div>
                  <div className="font-medium text-neutral-900">{session.sessionType} • {methodInfo.label}</div>
                </div>
              </div>
            </div>
          </div>

          {/* tomiwa: UPDATED - What happens next info box with reduced padding */}
          <div className="bg-brand-aqua/5 border border-brand-aqua/20 rounded-xl p-4 mb-4 text-left max-w-md mx-auto">
            <h4 className="font-semibold text-neutral-900 mb-2 text-sm">What happens next?</h4>
            <ul className="text-sm text-neutral-600 space-y-1.5">
              <li className="flex items-start gap-2">
                <CheckCircleIcon className="w-4 h-4 text-brand-aqua mt-0.5 flex-shrink-0" />
                <span>{session.candidateName} will be notified of the change</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircleIcon className="w-4 h-4 text-brand-aqua mt-0.5 flex-shrink-0" />
                <span>Updated calendar invite will be sent automatically</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircleIcon className="w-4 h-4 text-brand-aqua mt-0.5 flex-shrink-0" />
                <span>Your session list will reflect the new time</span>
              </li>
            </ul>
          </div>

          <p className="text-sm text-neutral-400">Redirecting to session details...</p>
        </div>
      </CoachDashboardLayout>
    );
  }

  // tomiwa: NEW - Main reschedule form view
  return (
    <CoachDashboardLayout>
      {/* tomiwa: NEW - Compact gradient header */}
      <div className="bg-gradient-to-r from-brand-aqua to-[#0C5B65]">
        <div className="px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-5 sm:py-6 md:py-8">
          <div className="max-w-4xl mx-auto">
            {/* tomiwa: NEW - Back to session detail */}
            <Link
              href={`/coach/dashboard/sessions/${sessionId}`}
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors text-sm"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              Back to Session Details
            </Link>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white mb-2">
              Reschedule Session
            </h1>
            <p className="text-white/80 text-sm sm:text-base max-w-xl">
              Choose a new date and time for your session with {session.candidateName}
            </p>
          </div>
        </div>
      </div>

      {/* tomiwa: UPDATED - Main content area with reduced vertical padding and card gap */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-4 sm:py-5 md:py-6">
        <div className="space-y-4">

          {/* tomiwa: NEW - Current Session Details Card */}
          <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
            <div className="px-5 sm:px-6 py-3.5 border-b border-neutral-100 bg-neutral-50">
              <h2 className="text-base sm:text-lg font-display font-semibold text-neutral-900 flex items-center gap-2">
                <CalendarDaysIcon className="w-5 h-5 text-brand-aqua" />
                Current Session Details
              </h2>
            </div>

            <div className="p-4 sm:p-5">
              {/* tomiwa: UPDATED - Candidate info row with reduced gap and margin */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4 pb-4 border-b border-neutral-100">
                <img
                  src={session.candidateAvatar}
                  alt={session.candidateName}
                    className="w-12 h-12 rounded-xl object-cover border-2 border-neutral-100 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-display font-semibold text-neutral-900">
                    {session.candidateName}
                  </h3>
                  <p className="text-sm text-neutral-500">{session.candidateTitle}</p>
                  <p className="text-sm text-neutral-400">{session.candidateEmail}</p>
                </div>
                <span className="text-brand-orange font-bold text-lg">
                  ₦{session.price.toLocaleString()}
                </span>
              </div>

              {/* tomiwa: UPDATED - Session detail chips with reduced gap */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {/* tomiwa: NEW - Date chip */}
                <div className="flex items-center gap-2.5 bg-neutral-50 rounded-xl p-3 border border-neutral-100">
                  <CalendarDaysIcon className="w-5 h-5 text-brand-aqua flex-shrink-0" />
                  <div className="min-w-0">
                    <div className="text-[11px] text-neutral-400 uppercase tracking-wide font-medium">Date</div>
                    <div className="text-sm font-semibold text-neutral-900 truncate">{session.date}</div>
                  </div>
                </div>

                {/* tomiwa: NEW - Time chip */}
                <div className="flex items-center gap-2.5 bg-neutral-50 rounded-xl p-3 border border-neutral-100">
                  <ClockIcon className="w-5 h-5 text-brand-aqua flex-shrink-0" />
                  <div className="min-w-0">
                    <div className="text-[11px] text-neutral-400 uppercase tracking-wide font-medium">Time</div>
                    <div className="text-sm font-semibold text-neutral-900">{session.time}</div>
                  </div>
                </div>

                {/* tomiwa: NEW - Duration chip */}
                <div className="flex items-center gap-2.5 bg-neutral-50 rounded-xl p-3 border border-neutral-100">
                  <ClockIcon className="w-5 h-5 text-neutral-400 flex-shrink-0" />
                  <div className="min-w-0">
                    <div className="text-[11px] text-neutral-400 uppercase tracking-wide font-medium">Duration</div>
                    <div className="text-sm font-semibold text-neutral-900">{session.duration} min</div>
                  </div>
                </div>

                {/* tomiwa: NEW - Method chip */}
                <div className="flex items-center gap-2.5 bg-neutral-50 rounded-xl p-3 border border-neutral-100">
                  {React.createElement(methodInfo.icon, { className: `w-5 h-5 ${methodInfo.color} flex-shrink-0` })}
                  <div className="min-w-0">
                    <div className="text-[11px] text-neutral-400 uppercase tracking-wide font-medium">Method</div>
                    <div className="text-sm font-semibold text-neutral-900 truncate">{methodInfo.label}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* tomiwa: NEW - Reschedule Form Card */}
          <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
            <div className="px-5 sm:px-6 py-3.5 border-b border-neutral-100 bg-brand-orange/5">
              <h2 className="text-base sm:text-lg font-display font-semibold text-neutral-900 flex items-center gap-2">
                <ClockIcon className="w-5 h-5 text-brand-orange" />
                Choose New Date & Time
              </h2>
            </div>

            <div className="p-4 sm:p-5">
              <form onSubmit={handleSubmit} className="space-y-4">

                {/* tomiwa: UPDATED - Date and Time grid with reduced gap */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* tomiwa: NEW - Date picker */}
                  <div>
                    <label className="block text-sm font-semibold text-neutral-900 mb-2">
                      New Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={getMinDate()}
                      required
                      className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-brand-aqua/20 focus:border-brand-aqua transition-all duration-300 text-sm"
                    />
                    <p className="text-xs text-neutral-400 mt-1.5">
                      Must be at least 24 hours from now
                    </p>
                  </div>

                  {/* tomiwa: NEW - Time picker dropdown */}
                  <div>
                    <label className="block text-sm font-semibold text-neutral-900 mb-2">
                      New Time <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-brand-aqua/20 focus:border-brand-aqua transition-all duration-300 text-sm bg-white"
                    >
                      <option value="">Select a time slot</option>
                      {timeSlots.map((slot) => (
                        <option key={slot.value} value={slot.value}>
                          {slot.display}
                        </option>
                      ))}
                    </select>
                    <p className="text-xs text-neutral-400 mt-1.5">
                      Available: 8:00 AM – 8:00 PM
                    </p>
                  </div>
                </div>

                {/* tomiwa: NEW - Reason for rescheduling dropdown */}
                <div>
                  <label className="block text-sm font-semibold text-neutral-900 mb-2">
                    Reason for Rescheduling <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={selectedReason}
                    onChange={(e) => setSelectedReason(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-brand-aqua/20 focus:border-brand-aqua transition-all duration-300 text-sm bg-white"
                  >
                    <option value="">Select a reason</option>
                    {rescheduleReasons.map((reason, index) => (
                      <option key={index} value={reason}>
                        {reason}
                      </option>
                    ))}
                  </select>
                </div>

                {/* tomiwa: NEW - Custom reason input (only shows when "Other" is selected) */}
                {selectedReason === 'Other (please specify)' && (
                  <div>
                    <label className="block text-sm font-semibold text-neutral-900 mb-2">
                      Please specify <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={customReason}
                      onChange={(e) => setCustomReason(e.target.value)}
                      placeholder="Describe your reason..."
                      required
                      className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-brand-aqua/20 focus:border-brand-aqua transition-all duration-300 text-sm"
                    />
                  </div>
                )}

                {/* tomiwa: NEW - Optional message to candidate */}
                <div>
                  <label className="block text-sm font-semibold text-neutral-900 mb-2">
                    Message to Candidate <span className="text-neutral-400 font-normal">(Optional)</span>
                  </label>
                  <textarea
                    value={messageToCandidate}
                    onChange={(e) => setMessageToCandidate(e.target.value)}
                    placeholder="Add a personal message to explain the reschedule..."
                    rows={3}
                    className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-brand-aqua/20 focus:border-brand-aqua transition-all duration-300 resize-none text-sm"
                  />
                </div>

                {/* tomiwa: UPDATED - Notify toggle with reduced padding */}
                <div className="flex items-center justify-between bg-neutral-50 rounded-xl p-3 border border-neutral-100">
                  <div className="flex items-center gap-3">
                    <BellAlertIcon className="w-5 h-5 text-brand-aqua" />
                    <div>
                      <div className="text-sm font-semibold text-neutral-900">Notify Candidate</div>
                      <div className="text-xs text-neutral-500">Send an email notification about the reschedule</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setNotifyCandidate(!notifyCandidate)}
                    className={`relative w-11 h-6 rounded-full transition-colors duration-300 flex-shrink-0 ${
                      notifyCandidate ? 'bg-brand-aqua' : 'bg-neutral-300'
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${
                        notifyCandidate ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {/* tomiwa: UPDATED - Rescheduling notice with reduced padding */}
                <div className="bg-brand-yellow/10 border border-brand-yellow/30 rounded-xl p-3 flex gap-3">
                  <ExclamationTriangleIcon className="w-5 h-5 text-brand-yellow flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-neutral-900 mb-1">Rescheduling Policy</h4>
                    <p className="text-xs text-neutral-600 leading-relaxed">
                      Rescheduling a session updates the booking immediately. The candidate will be notified 
                      and a new calendar invite will be sent. Please ensure you are available at the new selected 
                      time. Repeated rescheduling may affect your coach rating.
                    </p>
                  </div>
                </div>

                {/* tomiwa: NEW - Action buttons - Cancel and Submit */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Link
                    href={`/coach/dashboard/sessions/${sessionId}`}
                    className="flex-1 sm:flex-none px-6 py-3 text-neutral-600 border-2 border-neutral-200 rounded-xl hover:bg-neutral-50 transition-all duration-300 text-sm font-semibold text-center"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-8 py-3 bg-brand-aqua text-white rounded-xl hover:bg-brand-aqua/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 text-sm font-semibold flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Rescheduling...
                      </>
                    ) : (
                      <>
                        <CalendarDaysIcon className="w-5 h-5" />
                        Confirm Reschedule
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </CoachDashboardLayout>
  );
}
