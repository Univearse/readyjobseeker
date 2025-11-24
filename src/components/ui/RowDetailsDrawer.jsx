/**
 * File: src/components/ui/RowDetailsDrawer.jsx
 * 
 * tomiwa: Row Details Drawer Component
 * Expandable drawer that shows detailed application information inline
 */

'use client';

import React from 'react';
import Link from 'next/link';
import {
  ChevronUpIcon,
  CalendarIcon,
  DocumentTextIcon,
  VideoCameraIcon,
  EyeIcon,
  XMarkIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowPathIcon,
  LightBulbIcon
} from '@heroicons/react/24/outline';
import TimelineMini from './TimelineMini';
import NextActionButton from './NextActionButton';

export default function RowDetailsDrawer({ 
  application, 
  isOpen, 
  onClose,
  onAction,
  className = ''
}) {
  if (!isOpen) return null;

  // tomiwa: Mock detailed application data
  const applicationDetails = {
    ...application,
    appliedDate: '2024-10-25T10:30:00Z',
    lastUpdated: '2024-10-28T14:20:00Z',
    completedStages: ['applied', 'review'],
    nextDeadline: application.status === 'Test Assigned' ? '2024-11-02T23:59:00Z' : null,
    employerNotes: application.status === 'Test Assigned' 
      ? 'Please complete the technical assessment within 5 days. The test covers React, JavaScript fundamentals, and system design. Good luck!'
      : application.status === 'Interview Scheduled'
      ? 'Your interview is scheduled for November 5th at 2:00 PM PST. Please join the video call 5 minutes early. We look forward to meeting you!'
      : 'Thank you for your application. We are currently reviewing your profile and will get back to you soon.',
    requirements: application.status === 'Test Assigned' 
      ? ['Complete technical assessment', 'Submit within 5 days', 'Ensure stable internet connection']
      : application.status === 'Interview Scheduled'
      ? ['Join video call on time', 'Prepare portfolio presentation', 'Have questions ready']
      : [],
    interviewDetails: application.status === 'Interview Scheduled' ? {
      date: '2024-11-05',
      time: '14:00',
      duration: '60 minutes',
      interviewers: ['Sarah Johnson (Design Lead)', 'Mike Chen (Product Manager)'],
      meetingLink: 'https://meet.google.com/abc-defg-hij'
    } : null
  };

  // tomiwa: Handle action buttons
  const handleAction = (action, status) => {
    if (onAction) {
      onAction(action, application.id, status);
    }
  };

  // tomiwa: Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // tomiwa: Check if deadline is approaching (within 2 days)
  const isDeadlineApproaching = (deadline) => {
    if (!deadline) return false;
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const timeDiff = deadlineDate.getTime() - now.getTime();
    const daysDiff = timeDiff / (1000 * 3600 * 24);
    return daysDiff <= 2 && daysDiff > 0;
  };

  return (
    <div className={`bg-neutral-50 border-t border-neutral-200 ${className}`}>
      <div className="px-6 py-6">
        {/* tomiwa: Header with close button */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-neutral-900">
            Application Details
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-200 rounded-lg transition-colors"
          >
            <ChevronUpIcon className="w-5 h-5 text-neutral-500" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* tomiwa: Timeline Section */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold text-neutral-700 mb-4">Application Progress</h4>
            <TimelineMini 
              status={application.status}
              completedStages={applicationDetails.completedStages}
              className="mb-6"
            />

            {/* tomiwa: Feedback Section for Failed Assessment or Disqualified */}
            {application.feedback && (
              <div className="bg-white rounded-lg p-4 border border-neutral-200 mb-4">
                {application.feedback.type === 'assessment_failed' ? (
                  <>
                    <div className="flex items-center gap-2 mb-3">
                      <XCircleIcon className="w-5 h-5 text-red-500" />
                      <h5 className="text-sm font-semibold text-red-700">Assessment Results</h5>
                    </div>
                    
                    {/* tomiwa: Score display */}
                    <div className="bg-red-50 rounded-lg p-3 mb-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-red-800">Your Score</span>
                        <span className="text-lg font-bold text-red-700">
                          {application.feedback.score}/{application.feedback.maxScore}
                        </span>
                      </div>
                      <div className="w-full bg-red-200 rounded-full h-2">
                        <div 
                          className="bg-red-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(application.feedback.score / application.feedback.maxScore) * 100}%` }}
                        />
                      </div>
                      <p className="text-xs text-red-600 mt-1">
                        Passing score: {application.feedback.passingScore}/{application.feedback.maxScore}
                      </p>
                    </div>

                    {/* tomiwa: Strengths and Areas for Improvement */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                      <div className="bg-emerald-50 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircleIcon className="w-4 h-4 text-emerald-500" />
                          <span className="text-sm font-medium text-emerald-800">Strengths</span>
                        </div>
                        <ul className="space-y-1">
                          {application.feedback.strengths?.map((strength, index) => (
                            <li key={index} className="text-xs text-emerald-700 flex items-start gap-1">
                              <span className="w-1 h-1 bg-emerald-500 rounded-full mt-1.5 flex-shrink-0" />
                              {strength}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="bg-amber-50 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <LightBulbIcon className="w-4 h-4 text-amber-500" />
                          <span className="text-sm font-medium text-amber-800">Areas to Improve</span>
                        </div>
                        <ul className="space-y-1">
                          {application.feedback.areas?.map((area, index) => (
                            <li key={index} className="text-xs text-amber-700 flex items-start gap-1">
                              <span className="w-1 h-1 bg-amber-500 rounded-full mt-1.5 flex-shrink-0" />
                              {area}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* tomiwa: Retake information */}
                    {application.feedback.retakeAllowed && (
                      <div className="bg-blue-50 rounded-lg p-3 mb-3">
                        <div className="flex items-center gap-2 mb-2">
                          <ArrowPathIcon className="w-4 h-4 text-blue-500" />
                          <span className="text-sm font-medium text-blue-800">Retake Available</span>
                        </div>
                        <p className="text-xs text-blue-700">
                          You can retake this assessment starting {new Date(application.feedback.retakeDate).toLocaleDateString()}
                        </p>
                      </div>
                    )}

                    <p className="text-sm text-neutral-600 leading-relaxed">
                      {application.feedback.message}
                    </p>
                  </>
                ) : application.feedback.type === 'disqualified' ? (
                  <>
                    <div className="flex items-center gap-2 mb-3">
                      <ExclamationTriangleIcon className="w-5 h-5 text-amber-500" />
                      <h5 className="text-sm font-semibold text-amber-700">Application Status</h5>
                    </div>
                    
                    <div className="bg-amber-50 rounded-lg p-3 mb-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-amber-800">Reason</span>
                        <span className="text-xs text-amber-600 bg-amber-200 px-2 py-1 rounded">
                          {application.feedback.disqualificationStage}
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-amber-800 mb-2">
                        {application.feedback.reason}
                      </p>
                    </div>

                    {/* tomiwa: Suggestions */}
                    {application.feedback.suggestions && (
                      <div className="bg-blue-50 rounded-lg p-3 mb-3">
                        <div className="flex items-center gap-2 mb-2">
                          <LightBulbIcon className="w-4 h-4 text-blue-500" />
                          <span className="text-sm font-medium text-blue-800">Suggestions</span>
                        </div>
                        <ul className="space-y-1">
                          {application.feedback.suggestions.map((suggestion, index) => (
                            <li key={index} className="text-xs text-blue-700 flex items-start gap-1">
                              <span className="w-1 h-1 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />
                              {suggestion}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <p className="text-sm text-neutral-600 leading-relaxed">
                      {application.feedback.message}
                    </p>
                  </>
                ) : null}
              </div>
            )}

            {/* tomiwa: Employer Notes */}
            <div className="bg-white rounded-lg p-4 border border-neutral-200">
              <h5 className="text-sm font-semibold text-neutral-700 mb-2">
                Instructions from {application.company}
              </h5>
              <p className="text-sm text-neutral-600 leading-relaxed">
                {applicationDetails.employerNotes}
              </p>

              {/* tomiwa: Requirements list */}
              {applicationDetails.requirements.length > 0 && (
                <div className="mt-4">
                  <h6 className="text-xs font-semibold text-neutral-700 mb-2 uppercase tracking-wide">
                    Requirements
                  </h6>
                  <ul className="space-y-1">
                    {applicationDetails.requirements.map((req, index) => (
                      <li key={index} className="text-sm text-neutral-600 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-brand-aqua rounded-full mt-2 flex-shrink-0" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* tomiwa: Interview details */}
              {applicationDetails.interviewDetails && (
                <div className="mt-4 p-3 bg-brand-aqua/5 rounded-lg border border-brand-aqua/20">
                  <h6 className="text-sm font-semibold text-brand-aqua mb-2">Interview Details</h6>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4 text-brand-aqua" />
                      <span className="text-neutral-700">
                        {new Date(applicationDetails.interviewDetails.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          month: 'long',
                          day: 'numeric'
                        })} at {applicationDetails.interviewDetails.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ClockIcon className="w-4 h-4 text-brand-aqua" />
                      <span className="text-neutral-700">{applicationDetails.interviewDetails.duration}</span>
                    </div>
                    <div className="mt-2">
                      <span className="text-xs font-medium text-neutral-600">Interviewers:</span>
                      <div className="mt-1">
                        {applicationDetails.interviewDetails.interviewers.map((interviewer, index) => (
                          <span key={index} className="inline-block text-xs bg-white px-2 py-1 rounded mr-2 mb-1">
                            {interviewer}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* tomiwa: Actions Section */}
          <div>
            <h4 className="text-sm font-semibold text-neutral-700 mb-4">Quick Actions</h4>
            
            {/* tomiwa: Deadline warning */}
            {applicationDetails.nextDeadline && isDeadlineApproaching(applicationDetails.nextDeadline) && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
                <div className="flex items-start gap-2">
                  <ExclamationTriangleIcon className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-amber-800">Deadline Approaching</p>
                    <p className="text-xs text-amber-700 mt-1">
                      Due: {formatDate(applicationDetails.nextDeadline)}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* tomiwa: Primary action */}
            <div className="mb-4">
              <NextActionButton
                status={application.status}
                onClick={handleAction}
                size="large"
                className="w-full justify-center"
              />
              
              {/* tomiwa: Retake button for failed assessments */}
              {application.status === 'Failed Assessment' && application.feedback?.retakeAllowed && (
                <button
                  onClick={() => handleAction('retake', application.status)}
                  className="w-full mt-2 inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <ArrowPathIcon className="w-4 h-4" />
                  Schedule Retake
                </button>
              )}
            </div>

            {/* tomiwa: Secondary actions */}
            <div className="space-y-2">
              <Link
                href={`/dashboard/candidate/applications/${application.id}`}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-white border border-neutral-300 text-neutral-700 text-sm font-medium rounded-lg hover:bg-neutral-50 transition-colors"
              >
                <EyeIcon className="w-4 h-4" />
                Full Details
              </Link>

              {application.status === 'Interview Scheduled' && (
                <button
                  onClick={() => handleAction('reschedule', application.status)}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-white border border-neutral-300 text-neutral-700 text-sm font-medium rounded-lg hover:bg-neutral-50 transition-colors"
                >
                  <CalendarIcon className="w-4 h-4" />
                  Reschedule
                </button>
              )}

              {applicationDetails.interviewDetails?.meetingLink && (
                <a
                  href={applicationDetails.interviewDetails.meetingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-white border border-neutral-300 text-neutral-700 text-sm font-medium rounded-lg hover:bg-neutral-50 transition-colors"
                >
                  <VideoCameraIcon className="w-4 h-4" />
                  Join Meeting
                </a>
              )}

              {application.status !== 'Rejected' && application.status !== 'Withdrawn' && (
                <button
                  onClick={() => handleAction('withdraw', application.status)}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-red-50 border border-red-200 text-red-600 text-sm font-medium rounded-lg hover:bg-red-100 transition-colors"
                >
                  <XMarkIcon className="w-4 h-4" />
                  Withdraw Application
                </button>
              )}
            </div>

            {/* tomiwa: Application metadata */}
            <div className="mt-6 pt-4 border-t border-neutral-200">
              <div className="space-y-2 text-xs text-neutral-500">
                <div>
                  <span className="font-medium">Applied:</span> {formatDate(applicationDetails.appliedDate)}
                </div>
                <div>
                  <span className="font-medium">Last Updated:</span> {formatDate(applicationDetails.lastUpdated)}
                </div>
                <div>
                  <span className="font-medium">Application ID:</span> #{application.id.toString().padStart(6, '0')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
