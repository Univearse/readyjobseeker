/**
 * File: src/app/coach/dashboard/sessions/[sessionId]/page.js
 * 
 * tomiwa: Individual Session Detail Page
 * Comprehensive view of a single coaching session with all details
 * 
 * Features:
 * - Full session information display
 * - Different layouts for upcoming, completed, and cancelled sessions
 * - Session actions (join, reschedule, cancel)
 * - Complete session history and notes for completed sessions
 * - Cancellation details and refund information for cancelled sessions
 * - Responsive design across all screen sizes
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import CoachDashboardLayout from '@/components/layouts/CoachDashboardLayout.jsx';
import {
  CalendarDaysIcon,
  VideoCameraIcon,
  ClockIcon,
  MapPinIcon,
  StarIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowLeftIcon,
  PhoneIcon,
  ChatBubbleLeftRightIcon,
  EnvelopeIcon,
  BanknotesIcon,
  ExclamationTriangleIcon,
  DocumentTextIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';

// tomiwa: Complete session data with all details (same as in main sessions page but with more info)
const allSessionsData = {
  1: {
    id: 1,
    candidateName: 'Alex Thompson',
    candidateAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    candidateTitle: 'Senior Software Engineer',
    candidateCompany: 'Tech Innovations Inc.',
    candidateExperience: '8 years',
    sessionType: 'Career Strategy',
    sessionMethod: 'video',
    date: 'Today',
    time: '10:00 AM',
    duration: 60,
    meetingLink: 'https://zoom.us/j/123456789',
    meetingId: '123-456-789',
    candidateLocation: 'New York, NY',
    candidateEmail: 'alex.thompson@email.com',
    candidatePhone: '+1 (555) 123-4567',
    price: 25000,
    status: 'confirmed',
    bookedOn: 'February 15, 2026',
    sessionDescription: 'Comprehensive career strategy session focusing on leadership transition and salary negotiation for senior engineering roles.',
    candidateGoals: [
      'Transition to engineering management role',
      'Negotiate salary increase of 20-30%',
      'Develop leadership skills',
      'Build strategic thinking capabilities'
    ],
    preparationNotes: 'Candidate has 8 years of experience and is looking to move into management. Has been offered a team lead position but wants to negotiate better terms.',
    type: 'upcoming'
  },
  4: {
    id: 4,
    candidateName: 'Jennifer Kim',
    candidateAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop',
    candidateTitle: 'Marketing Manager',
    candidateCompany: 'Digital Solutions Corp',
    candidateExperience: '5 years',
    sessionType: 'Salary Negotiation',
    sessionMethod: 'video',
    date: 'Feb 15, 2026',
    time: '3:00 PM',
    duration: 60,
    candidateLocation: 'Seattle, WA',
    candidateEmail: 'jennifer.kim@email.com',
    candidatePhone: '+1 (555) 987-6543',
    price: 25000,
    rating: 5,
    feedback: 'Excellent session! Sarah provided great insights on negotiation strategies. The market analysis was particularly helpful, and I felt much more confident going into my negotiation. The follow-up templates were a game-changer!',
    sessionNotes: 'Discussed market rates, negotiation tactics, and follow-up strategies. Candidate well-prepared and showed strong understanding of negotiation principles. Provided salary benchmarking data for marketing manager roles in Seattle market.',
    sessionHistory: 'Session covered: 1) Current market analysis for marketing manager roles in Seattle ($85K-$120K range), 2) Negotiation script development with specific talking points, 3) Counter-offer strategies including non-salary benefits, 4) Follow-up communication templates for different scenarios, 5) Timeline and next steps planning',
    completedAt: '2026-02-15T15:00:00Z',
    status: 'completed',
    sessionOutcome: 'Candidate successfully negotiated 25% salary increase and additional benefits package',
    followUpActions: [
      'Sent salary negotiation email templates',
      'Provided market research document',
      'Scheduled follow-up check-in for next month',
      'Recommended additional leadership training resources'
    ],
    documentsShared: [
      'Seattle Marketing Manager Salary Report 2026',
      'Negotiation Email Templates',
      'Benefits Comparison Worksheet',
      'Follow-up Action Plan'
    ],
    type: 'completed'
  },
  7: {
    id: 7,
    candidateName: 'Robert Johnson',
    candidateAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
    candidateTitle: 'Product Manager',
    candidateCompany: 'StartupXYZ',
    candidateExperience: '6 years',
    sessionType: 'Interview Preparation',
    sessionMethod: 'video',
    date: 'Feb 10, 2026',
    time: '4:00 PM',
    duration: 60,
    candidateLocation: 'Chicago, IL',
    candidateEmail: 'robert.johnson@email.com',
    candidatePhone: '+1 (555) 456-7890',
    price: 25000,
    reason: 'Candidate requested reschedule due to family emergency',
    detailedReason: 'Candidate had a family emergency and needed to travel unexpectedly. Requested to reschedule for the following week but later decided to cancel due to changing priorities.',
    cancelledAt: '2026-02-09T14:30:00Z',
    cancelledBy: 'candidate',
    refundStatus: 'processed',
    refundAmount: 25000,
    refundProcessedOn: '2026-02-09T16:45:00Z',
    cancellationPolicy: 'Full refund provided as cancellation was made more than 24 hours in advance',
    status: 'cancelled',
    type: 'cancelled',
    originalBookingDate: 'February 5, 2026',
    sessionDescription: 'Interview preparation session for senior product manager role at Fortune 500 company, focusing on behavioral questions and case studies.',
    refundMethod: 'Original payment method (Credit Card ending in 4567)'
  }
};

export default function SessionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const sessionId = parseInt(params.sessionId);
  
  // tomiwa: Get session data
  const session = allSessionsData[sessionId];
  
  // tomiwa: State for actions
  const [isJoining, setIsJoining] = useState(false);
  
  // tomiwa: Handle join session
  const handleJoinSession = (meetingLink) => {
    setIsJoining(true);
    window.open(meetingLink, '_blank');
    setTimeout(() => setIsJoining(false), 2000);
  };

  // tomiwa: Get session method icon and label
  const getSessionMethodIcon = (method) => {
    switch (method) {
      case 'video':
        return { icon: VideoCameraIcon, label: 'Video Call', color: 'text-brand-aqua' };
      case 'voice':
        return { icon: PhoneIcon, label: 'Voice Call', color: 'text-brand-orange' };
      case 'chat':
        return { icon: ChatBubbleLeftRightIcon, label: 'Chat Session', color: 'text-brand-yellow' };
      default:
        return { icon: VideoCameraIcon, label: 'Video Call', color: 'text-brand-aqua' };
    }
  };

  // tomiwa: If session not found
  if (!session) {
    return (
      <CoachDashboardLayout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-12 text-center">
          <XCircleIcon className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-display font-bold text-neutral-900 mb-2">Session Not Found</h1>
          <p className="text-neutral-600 mb-6">The session you're looking for doesn't exist or may have been removed.</p>
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

  const methodInfo = getSessionMethodIcon(session.sessionMethod);

  return (
    <CoachDashboardLayout>
      {/* tomiwa: Header with status-based gradient */}
      <div className={`${
        session.type === 'upcoming' ? 'bg-gradient-to-r from-brand-aqua to-[#0C5B65]' :
        session.type === 'completed' ? 'bg-gradient-to-r from-green-600 to-green-800' :
        'bg-gradient-to-r from-red-600 to-red-800'
      }`}>
        {/* tomiwa: UPDATED - Reduced vertical padding for tighter layout */}
        <div className="px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-5 sm:py-6 md:py-8">
          <div className="max-w-6xl mx-auto">
            {/* tomiwa: Back button */}
            <Link
              href="/coach/dashboard/sessions"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              Back to Sessions
            </Link>
            
              {/* tomiwa: UPDATED - Reduced gap between header elements */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-4 h-4 rounded-full ${
                    session.type === 'upcoming' ? 'bg-white' :
                    session.type === 'completed' ? 'bg-green-300' :
                    'bg-red-300'
                  }`} />
                  <span className="text-white/90 font-medium">
                    {session.type === 'upcoming' ? 'Upcoming Session' :
                     session.type === 'completed' ? 'Session Completed' :
                     'Session Cancelled'}
                  </span>
                </div>
                
                {/* tomiwa: UPDATED - Slightly smaller heading with less bottom margin */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white mb-2">
                  Session with {session.candidateName}
                </h1>
                
                <div className="flex flex-wrap items-center gap-4 text-white/90">
                  <span className="flex items-center gap-2">
                    {React.createElement(methodInfo.icon, { className: "w-5 h-5" })}
                    {session.sessionType} • {methodInfo.label}
                  </span>
                  <span className="flex items-center gap-2">
                    <CalendarDaysIcon className="w-5 h-5" />
                    {session.date} • {session.time}
                  </span>
                </div>
              </div>
              
              {/* tomiwa: Action buttons based on session type */}
              {session.type === 'upcoming' && (
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => handleJoinSession(session.meetingLink)}
                    disabled={isJoining}
                    className="px-8 py-3 bg-brand-orange hover:bg-brand-orange/90 text-white rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:scale-105 disabled:opacity-50"
                  >
                    <VideoCameraIcon className="w-5 h-5" />
                    {isJoining ? 'Joining...' : 'Join Session'}
                  </button>
                  <Link
                    href={`/coach/dashboard/sessions/${session.id}/reschedule`}
                    className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/30 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <CalendarDaysIcon className="w-5 h-5" />
                    Reschedule
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* tomiwa: UPDATED - Reduced vertical padding and grid gap for tighter layout */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-4 sm:py-5 md:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* tomiwa: Left Column - Session Details - UPDATED reduced spacing between cards */}
          <div className="lg:col-span-2 space-y-4">
            {/* tomiwa: Session Information Card - UPDATED: reduced internal padding */}
            <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
              <div className="px-5 py-3 border-b border-neutral-100 bg-neutral-50">
                <h2 className="text-lg font-display font-semibold text-neutral-900">Session Details</h2>
              </div>
              <div className="p-4 sm:p-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* tomiwa: Basic session info - UPDATED: reduced spacing */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CalendarDaysIcon className="w-5 h-5 text-neutral-400" />
                      <div>
                        <div className="text-sm text-neutral-500">Date & Time</div>
                        <div className="font-medium text-neutral-900">{session.date}</div>
                        <div className="text-sm text-neutral-600">{session.time}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <ClockIcon className="w-5 h-5 text-neutral-400" />
                      <div>
                        <div className="text-sm text-neutral-500">Duration</div>
                        <div className="font-medium text-neutral-900">{session.duration} minutes</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      {React.createElement(methodInfo.icon, { className: `w-5 h-5 ${methodInfo.color}` })}
                      <div>
                        <div className="text-sm text-neutral-500">Session Method</div>
                        <div className="font-medium text-neutral-900">{methodInfo.label}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <BanknotesIcon className="w-5 h-5 text-neutral-400" />
                      <div>
                        <div className="text-sm text-neutral-500">Session Fee</div>
                        <div className="font-semibold text-brand-orange text-lg">₦{session.price.toLocaleString()}</div>
                      </div>
                    </div>
                    
                    {session.bookedOn && (
                      <div className="flex items-center gap-3">
                        <CheckCircleIcon className="w-5 h-5 text-neutral-400" />
                        <div>
                          <div className="text-sm text-neutral-500">Booked On</div>
                          <div className="font-medium text-neutral-900">{session.bookedOn}</div>
                        </div>
                      </div>
                    )}
                    
                    {session.meetingId && (
                      <div className="flex items-center gap-3">
                        <VideoCameraIcon className="w-5 h-5 text-neutral-400" />
                        <div>
                          <div className="text-sm text-neutral-500">Meeting ID</div>
                          <div className="font-medium text-neutral-900 font-mono">{session.meetingId}</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* tomiwa: Session description - UPDATED: reduced margin/padding */}
                {session.sessionDescription && (
                  <div className="mt-4 pt-4 border-t border-neutral-100">
                    <h3 className="font-medium text-neutral-900 mb-2">Session Description</h3>
                    <p className="text-neutral-600 leading-relaxed">{session.sessionDescription}</p>
                  </div>
                )}
                
                {/* tomiwa: Candidate goals - UPDATED: reduced margin/padding */}
                {session.type === 'upcoming' && session.candidateGoals && (
                  <div className="mt-4 pt-4 border-t border-neutral-100">
                    <h3 className="font-medium text-neutral-900 mb-3">Candidate Goals</h3>
                    <ul className="space-y-2">
                      {session.candidateGoals.map((goal, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircleIcon className="w-4 h-4 text-brand-aqua mt-0.5 flex-shrink-0" />
                          <span className="text-neutral-600">{goal}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* tomiwa: Preparation notes - UPDATED: reduced margin/padding */}
                {session.type === 'upcoming' && session.preparationNotes && (
                  <div className="mt-4 pt-4 border-t border-neutral-100">
                    <h3 className="font-medium text-neutral-900 mb-2">Preparation Notes</h3>
                    <p className="text-neutral-600 leading-relaxed">{session.preparationNotes}</p>
                  </div>
                )}
              </div>
            </div>

            {/* tomiwa: Completed Session Details */}
            {/* tomiwa: UPDATED - Reduced gap between completed session cards */}
            {session.type === 'completed' && (
              <div className="space-y-4">
                {/* tomiwa: Session History & Notes */}
                <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
                  <div className="px-5 py-3 border-b border-neutral-100 bg-green-50">
                    <h2 className="text-lg font-display font-semibold text-green-800">Session Summary</h2>
                  </div>
                  <div className="p-4 sm:p-5 space-y-4">
                    {session.sessionHistory && (
                      <div>
                        <h3 className="font-medium text-neutral-900 mb-3 flex items-center gap-2">
                          <ClockIcon className="w-5 h-5 text-brand-aqua" />
                          What We Covered
                        </h3>
                        <p className="text-neutral-600 leading-relaxed">{session.sessionHistory}</p>
                      </div>
                    )}
                    
                    {session.sessionNotes && (
                      <div>
                        <h3 className="font-medium text-neutral-900 mb-3 flex items-center gap-2">
                          <DocumentTextIcon className="w-5 h-5 text-brand-aqua" />
                          Coach Notes & Recommendations
                        </h3>
                        <p className="text-neutral-600 leading-relaxed">{session.sessionNotes}</p>
                      </div>
                    )}
                    
                    {session.sessionOutcome && (
                      <div>
                        <h3 className="font-medium text-neutral-900 mb-3 flex items-center gap-2">
                          <CheckCircleIcon className="w-5 h-5 text-green-600" />
                          Session Outcome
                        </h3>
                        <p className="text-green-700 font-medium">{session.sessionOutcome}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* tomiwa: Follow-up Actions & Documents */}
                {(session.followUpActions || session.documentsShared) && (
                  <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
                    <div className="px-5 py-3 border-b border-neutral-100 bg-neutral-50">
                      <h2 className="text-lg font-display font-semibold text-neutral-900">Follow-up & Resources</h2>
                    </div>
                    <div className="p-4 sm:p-5 space-y-4">
                      {session.followUpActions && (
                        <div>
                          <h3 className="font-medium text-neutral-900 mb-3">Follow-up Actions Taken</h3>
                          <ul className="space-y-2">
                            {session.followUpActions.map((action, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <CheckCircleIcon className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                <span className="text-neutral-600">{action}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {session.documentsShared && (
                        <div>
                          <h3 className="font-medium text-neutral-900 mb-3">Documents Shared</h3>
                          <ul className="space-y-2">
                            {session.documentsShared.map((doc, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <DocumentTextIcon className="w-4 h-4 text-brand-aqua mt-0.5 flex-shrink-0" />
                                <span className="text-neutral-600">{doc}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* tomiwa: Candidate Feedback */}
                {session.feedback && session.rating && (
                  <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
                    <div className="px-5 py-3 border-b border-neutral-100 bg-brand-yellow/10">
                      <h2 className="text-lg font-display font-semibold text-neutral-900">Candidate Feedback</h2>
                    </div>
                    <div className="p-4 sm:p-5">
                      <div className="flex items-center gap-2 mb-3">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <StarSolidIcon
                            key={star}
                            className={`w-6 h-6 ${
                              star <= session.rating ? 'text-brand-yellow' : 'text-neutral-300'
                            }`}
                          />
                        ))}
                        <span className="ml-2 text-lg font-semibold text-neutral-900">
                          {session.rating}/5 Stars
                        </span>
                      </div>
                      <blockquote className="text-neutral-700 italic text-lg leading-relaxed">
                        "{session.feedback}"
                      </blockquote>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* tomiwa: Cancelled Session Details */}
            {session.type === 'cancelled' && (
              <div className="bg-white rounded-xl border border-red-200 overflow-hidden">
                <div className="px-5 py-3 border-b border-red-100 bg-red-50">
                  <h2 className="text-lg font-display font-semibold text-red-800 flex items-center gap-2">
                    <ExclamationTriangleIcon className="w-5 h-5" />
                    Cancellation Details
                  </h2>
                </div>
                <div className="p-4 sm:p-5 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-medium text-neutral-900 mb-2">Cancelled By</h3>
                      <p className="text-neutral-600 capitalize">{session.cancelledBy}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-neutral-900 mb-2">Cancellation Date</h3>
                      <p className="text-neutral-600">{new Date(session.cancelledAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-neutral-900 mb-2">Reason for Cancellation</h3>
                    <p className="text-neutral-600">{session.reason}</p>
                    {session.detailedReason && (
                      <p className="text-neutral-600 mt-2">{session.detailedReason}</p>
                    )}
                  </div>
                  
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h3 className="font-medium text-green-800 mb-2 flex items-center gap-2">
                      <CheckCircleIcon className="w-5 h-5" />
                      Refund Information
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-green-700">Refund Status:</span>
                        <span className="font-medium text-green-800 capitalize">{session.refundStatus}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-green-700">Refund Amount:</span>
                        <span className="font-medium text-green-800">₦{session.refundAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-green-700">Processed On:</span>
                        <span className="font-medium text-green-800">
                          {new Date(session.refundProcessedOn).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-green-700">Method:</span>
                        <span className="font-medium text-green-800">{session.refundMethod}</span>
                      </div>
                    </div>
                  </div>
                  
                  {session.cancellationPolicy && (
                    <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4">
                      <h3 className="font-medium text-neutral-900 mb-2">Cancellation Policy</h3>
                      <p className="text-neutral-600 text-sm">{session.cancellationPolicy}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* tomiwa: Right Column - Candidate Information - UPDATED: reduced gap */}
          <div className="space-y-4">
            {/* tomiwa: Candidate Profile Card - UPDATED: reduced padding */}
            <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
              <div className="px-5 py-3 border-b border-neutral-100 bg-neutral-50">
                <h2 className="text-lg font-display font-semibold text-neutral-900">Candidate Profile</h2>
              </div>
              <div className="p-4 sm:p-5">
                <div className="text-center mb-4">
                  <img
                    src={session.candidateAvatar}
                    alt={session.candidateName}
                    className="w-16 h-16 rounded-xl object-cover mx-auto mb-3 border-2 border-neutral-100"
                  />
                  <h3 className="text-xl font-display font-semibold text-neutral-900 mb-1">
                    {session.candidateName}
                  </h3>
                  {session.candidateTitle && (
                    <p className="text-neutral-600 mb-1">{session.candidateTitle}</p>
                  )}
                  {session.candidateCompany && (
                    <p className="text-sm text-neutral-500">{session.candidateCompany}</p>
                  )}
                  {session.candidateExperience && (
                    <p className="text-sm text-brand-aqua font-medium mt-2">
                      {session.candidateExperience} experience
                    </p>
                  )}
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <EnvelopeIcon className="w-5 h-5 text-neutral-400" />
                    <div className="flex-1">
                      <div className="text-sm text-neutral-500">Email</div>
                      <a 
                        href={`mailto:${session.candidateEmail}`}
                        className="text-brand-aqua hover:text-brand-aqua/80 transition-colors"
                      >
                        {session.candidateEmail}
                      </a>
                    </div>
                  </div>
                  
                  {session.candidatePhone && (
                    <div className="flex items-center gap-3">
                      <PhoneIcon className="w-5 h-5 text-neutral-400" />
                      <div className="flex-1">
                        <div className="text-sm text-neutral-500">Phone</div>
                        <a 
                          href={`tel:${session.candidatePhone}`}
                          className="text-brand-aqua hover:text-brand-aqua/80 transition-colors"
                        >
                          {session.candidatePhone}
                        </a>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-3">
                    <MapPinIcon className="w-5 h-5 text-neutral-400" />
                    <div className="flex-1">
                      <div className="text-sm text-neutral-500">Location</div>
                      <div className="text-neutral-900">{session.candidateLocation}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* tomiwa: Quick Actions Card - UPDATED: reduced padding */}
            <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
              <div className="px-5 py-3 border-b border-neutral-100 bg-neutral-50">
                <h2 className="text-lg font-display font-semibold text-neutral-900">Quick Actions</h2>
              </div>
              <div className="p-4 sm:p-5 space-y-2.5">
                <Link
                  href={`mailto:${session.candidateEmail}`}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 text-brand-aqua border-2 border-brand-aqua rounded-xl hover:bg-brand-aqua/5 transition-all duration-300"
                >
                  <EnvelopeIcon className="w-5 h-5" />
                  Send Email
                </Link>
                
                {session.candidatePhone && (
                  <Link
                    href={`tel:${session.candidatePhone}`}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 text-brand-orange border-2 border-brand-orange rounded-xl hover:bg-brand-orange/5 transition-all duration-300"
                  >
                    <PhoneIcon className="w-5 h-5" />
                    Call Candidate
                  </Link>
                )}
                
                <Link
                  href="/coach/dashboard/sessions"
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 text-neutral-600 border-2 border-neutral-200 rounded-xl hover:bg-neutral-50 transition-all duration-300"
                >
                  <ArrowLeftIcon className="w-5 h-5" />
                  Back to Sessions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </CoachDashboardLayout>
  );
}