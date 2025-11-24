/**
 * File: src/app/dashboard/candidate/interviews/[interviewId]/reschedule/page.js
 * 
 * tomiwa: NEW - Interview Reschedule Page
 * Allows candidates to request rescheduling of their interviews with date selection and reason
 * 
 * Features:
 * - Date and time picker for new preferred slot
 * - Reason selection (dropdown + custom option)
 * - Interview details display
 * - Submit reschedule request
 * - Success confirmation
 * - Responsive design matching dashboard theme
 */

'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import CandidateDashboardLayout from '@/components/layouts/CandidateDashboardLayout';
import {
  // tomiwa: Icon imports for reschedule page UI
  CalendarIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ArrowLeftIcon,
  VideoCameraIcon,
  BuildingOfficeIcon,
  UserIcon,
} from '@heroicons/react/24/outline';

// tomiwa: Mock interview data (in real app, this would come from API)
const getInterviewById = (id) => {
  const interviews = {
    1: {
      id: 1,
      employer: 'Paystack',
      role: 'Product Designer',
      currentDate: 'Oct 30, 2024',
      currentTime: '2:00 PM',
      meetingType: 'Zoom',
      companyLogo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop',
      interviewer: 'Sarah Johnson',
      interviewerTitle: 'Design Lead',
    },
    2: {
      id: 2,
      employer: 'Flutterwave',
      role: 'Product Designer',
      currentDate: 'Nov 2, 2024',
      currentTime: '10:30 AM',
      meetingType: 'Google Meet',
      companyLogo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=100&h=100&fit=crop',
      interviewer: 'Michael Chen',
      interviewerTitle: 'Senior Designer',
    },
    3: {
      id: 3,
      employer: 'Figma',
      role: 'Product Designer',
      currentDate: 'Nov 5, 2024',
      currentTime: '4:00 PM',
      meetingType: 'Zoom',
      companyLogo: 'https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=100&h=100&fit=crop',
      interviewer: 'Alex Rivera',
      interviewerTitle: 'Product Design Manager',
    },
  };
  return interviews[id];
};

// tomiwa: Predefined reschedule reasons
const rescheduleReasons = [
  'Schedule conflict with another commitment',
  'Personal emergency',
  'Technical issues with current setup',
  'Travel/transportation issues',
  'Health-related concerns',
  'Family emergency',
  'Work conflict',
  'Other (please specify)',
];

export default function RescheduleInterview() {
  const params = useParams();
  const router = useRouter();
  const interviewId = params.interviewId;
  
  // tomiwa: Get interview data
  const interview = getInterviewById(interviewId);
  
  // tomiwa: State management for form
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedReason, setSelectedReason] = useState('');
  const [customReason, setCustomReason] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // tomiwa: Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // tomiwa: Simulate API call delay
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      
      // tomiwa: Redirect to dashboard after 3 seconds
      setTimeout(() => {
        router.push('/dashboard/candidate');
      }, 3000);
    }, 1500);
  };

  // tomiwa: Get minimum date (tomorrow)
  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  // tomiwa: Generate time slots (9 AM to 5 PM, 30-minute intervals)
  const timeSlots = [];
  for (let hour = 9; hour <= 17; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      if (hour === 17 && minute > 0) break; // Stop at 5:00 PM
      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      const displayTime = new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
      timeSlots.push({ value: time, display: displayTime });
    }
  }

  if (!interview) {
    return (
      <CandidateDashboardLayout>
        <div className="px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20 py-8">
          <div className="text-center py-16">
            <ExclamationTriangleIcon className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-neutral-900 mb-2">Interview Not Found</h1>
            <p className="text-neutral-600 mb-6">The interview you're looking for doesn't exist.</p>
            <Link
              href="/dashboard/candidate"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-aqua text-white font-medium rounded-lg hover:bg-[#0C5B65] transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              Back to Dashboard
            </Link>
          </div>
        </div>
      </CandidateDashboardLayout>
    );
  }

  if (showSuccess) {
    return (
      <CandidateDashboardLayout>
        <div className="px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20 py-8">
          <div className="max-w-2xl mx-auto text-center py-16">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircleIcon className="w-12 h-12 text-emerald-600" />
            </div>
            <h1 className="text-3xl font-bold text-neutral-900 mb-4">Reschedule Request Sent!</h1>
            <p className="text-lg text-neutral-600 mb-6">
              Your reschedule request has been sent to <strong>{interview.employer}</strong>. 
              They will review your request and get back to you soon.
            </p>
            <div className="bg-teal-50 border border-teal-200 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-teal-900 mb-2">What happens next?</h3>
              <ul className="text-sm text-teal-700 space-y-1 text-left">
                <li>• The employer will review your reschedule request</li>
                <li>• You'll receive an email confirmation within 24 hours</li>
                <li>• If approved, a new calendar invite will be sent</li>
                <li>• You can track the status in your dashboard</li>
              </ul>
            </div>
            <p className="text-sm text-neutral-500">Redirecting to dashboard in a few seconds...</p>
          </div>
        </div>
      </CandidateDashboardLayout>
    );
  }

  return (
    <CandidateDashboardLayout>
      <div className="px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20 py-8">
        {/* tomiwa: Header with back button */}
        <div className="mb-8">
          <Link
            href="/dashboard/candidate"
            className="inline-flex items-center gap-2 text-brand-aqua hover:text-[#0C5B65] font-medium mb-4 transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-neutral-900 mb-2">
            Reschedule Interview
          </h1>
          <p className="text-neutral-600">
            Request to reschedule your upcoming interview with {interview.employer}
          </p>
        </div>

        {/* tomiwa: Single column layout - Interview details on top, reschedule form below */}
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* tomiwa: Interview Details Section (Top) */}
          <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-display font-bold text-neutral-900 mb-6 flex items-center gap-3">
              <CalendarIcon className="w-6 h-6 sm:w-7 sm:h-7 text-brand-aqua" />
              Current Interview Details
            </h2>

            {/* tomiwa: Interview info card */}
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 border border-primary-200 rounded-xl p-6 sm:p-8 space-y-6">
              {/* tomiwa: Company and role header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                <img
                  src={interview.companyLogo}
                  alt={interview.employer}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover shadow-sm"
                />
                <div className="flex-1">
                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-neutral-900 mb-1">{interview.role}</h3>
                  <p className="text-brand-aqua font-semibold text-lg">{interview.employer}</p>
                </div>
              </div>

              {/* tomiwa: Interview details grid - responsive for all screen sizes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex items-center gap-3 bg-white rounded-xl p-4 border border-primary-200 shadow-sm">
                  <CalendarIcon className="w-6 h-6 text-brand-aqua flex-shrink-0" />
                  <div>
                    <p className="text-sm text-neutral-600 font-medium">Current Date</p>
                    <p className="font-bold text-neutral-900">{interview.currentDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white rounded-xl p-4 border border-primary-200 shadow-sm">
                  <ClockIcon className="w-6 h-6 text-brand-aqua flex-shrink-0" />
                  <div>
                    <p className="text-sm text-neutral-600 font-medium">Current Time</p>
                    <p className="font-bold text-neutral-900">{interview.currentTime}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white rounded-xl p-4 border border-primary-200 shadow-sm">
                  <VideoCameraIcon className="w-6 h-6 text-brand-aqua flex-shrink-0" />
                  <div>
                    <p className="text-sm text-neutral-600 font-medium">Meeting Type</p>
                    <p className="font-bold text-neutral-900">{interview.meetingType}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white rounded-xl p-4 border border-primary-200 shadow-sm">
                  <UserIcon className="w-6 h-6 text-brand-aqua flex-shrink-0" />
                  <div>
                    <p className="text-sm text-neutral-600 font-medium">Interviewer</p>
                    <p className="font-bold text-neutral-900 text-sm">{interview.interviewer}</p>
                    <p className="text-xs text-neutral-500">{interview.interviewerTitle}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* tomiwa: Reschedule Form Section (Bottom) */}
          <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-display font-bold text-neutral-900 mb-6 flex items-center gap-3">
              <ClockIcon className="w-6 h-6 sm:w-7 sm:h-7 text-brand-orange" />
              Request New Time
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* tomiwa: Date and Time Selection - responsive grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* tomiwa: New Date Selection */}
                <div>
                  <label className="block text-sm font-semibold text-neutral-900 mb-3">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={getMinDate()}
                    required
                    className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-brand-aqua focus:border-brand-aqua transition-all duration-300 text-base"
                  />
                  <p className="text-xs text-neutral-500 mt-2">
                    Please select a date at least 24 hours in advance
                  </p>
                </div>

                {/* tomiwa: New Time Selection */}
                <div>
                  <label className="block text-sm font-semibold text-neutral-900 mb-3">
                    Preferred Time *
                  </label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-brand-aqua focus:border-brand-aqua transition-all duration-300 text-base"
                  >
                    <option value="">Select a time</option>
                    {timeSlots.map((slot) => (
                      <option key={slot.value} value={slot.value}>
                        {slot.display}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-neutral-500 mt-2">
                    Available times: 9:00 AM - 5:00 PM (business hours)
                  </p>
                </div>
              </div>

              {/* tomiwa: Reason Selection */}
              <div>
                <label className="block text-sm font-semibold text-neutral-900 mb-3">
                  Reason for Rescheduling *
                </label>
                <select
                  value={selectedReason}
                  onChange={(e) => setSelectedReason(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-brand-aqua focus:border-brand-aqua transition-all duration-300 text-base"
                >
                  <option value="">Select a reason</option>
                  {rescheduleReasons.map((reason, index) => (
                    <option key={index} value={reason}>
                      {reason}
                    </option>
                  ))}
                </select>
              </div>

              {/* tomiwa: Custom Reason (if "Other" selected) */}
              {selectedReason === 'Other (please specify)' && (
                <div>
                  <label className="block text-sm font-semibold text-neutral-900 mb-3">
                    Please specify *
                  </label>
                  <input
                    type="text"
                    value={customReason}
                    onChange={(e) => setCustomReason(e.target.value)}
                    placeholder="Please provide details..."
                    required
                    className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-brand-aqua focus:border-brand-aqua transition-all duration-300 text-base"
                  />
                </div>
              )}

              {/* tomiwa: Additional Notes (Optional) */}
              <div>
                <label className="block text-sm font-semibold text-neutral-900 mb-3">
                  Additional Notes (Optional)
                </label>
                <textarea
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  placeholder="Any additional information you'd like to share..."
                  rows={4}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-brand-aqua focus:border-brand-aqua transition-all duration-300 resize-none text-base"
                />
              </div>

              {/* tomiwa: Submit Button - responsive sizing */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto sm:min-w-[300px] sm:mx-auto flex items-center justify-center gap-3 px-8 py-4 bg-brand-aqua text-white font-semibold rounded-xl hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 focus:ring-2 focus:ring-brand-aqua focus:ring-offset-2 text-base"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending Request...
                    </>
                  ) : (
                    <>
                      <CalendarIcon className="w-5 h-5" />
                      Send Reschedule Request
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* tomiwa: Important Notice - enhanced styling */}
            <div className="mt-8 bg-gradient-to-r from-accent-50 to-accent-100 border border-accent-200 rounded-xl p-6">
              <div className="flex gap-4">
                <ExclamationTriangleIcon className="w-6 h-6 text-accent-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-accent-900 mb-2 text-base">Important Notice</h4>
                  <p className="text-sm text-accent-700 leading-relaxed">
                    This is a request to reschedule. The employer will review and respond within 24 hours. 
                    Your original interview time remains active until the employer confirms the change.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CandidateDashboardLayout>
  );
}
