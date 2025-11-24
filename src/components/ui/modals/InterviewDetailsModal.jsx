/**
 * File: src/components/ui/modals/InterviewDetailsModal.jsx
 * 
 * tomiwa: Comprehensive Interview Details Modal Component
 * Shows all full details of an interview when users click "View Details"
 */

'use client';

import { useState } from 'react';
import {
  XMarkIcon,
  CalendarIcon,
  ClockIcon,
  VideoCameraIcon,
  PhoneIcon,
  MapPinIcon,
  UserGroupIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  LinkIcon,
  BuildingOfficeIcon,
  BriefcaseIcon,
  UserIcon,
  ChatBubbleLeftRightIcon,
  PencilSquareIcon,
  BookOpenIcon,
  StarIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';

export default function InterviewDetailsModal({ isOpen, onClose, interview }) {
  // tomiwa: State for managing tabs within the modal
  const [activeTab, setActiveTab] = useState('overview');

  // tomiwa: Return null if modal is not open or no interview data
  if (!isOpen || !interview) return null;

  // tomiwa: Format date and time for display
  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const formatTime = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(date);
  };

  // tomiwa: Get format icon based on meeting format
  const getFormatIcon = (format) => {
    switch (format) {
      case 'video': return VideoCameraIcon;
      case 'phone': return PhoneIcon;
      case 'in-person': return MapPinIcon;
      default: return VideoCameraIcon;
    }
  };

  // tomiwa: Status badge component
  const StatusBadge = ({ status }) => {
    const statusConfig = {
      'Scheduled': { bg: 'bg-primary-100', text: 'text-primary-700', icon: ClockIcon },
      'Completed': { bg: 'bg-emerald-100', text: 'text-emerald-700', icon: CheckCircleIcon },
      'Rescheduled': { bg: 'bg-accent-100', text: 'text-accent-700', icon: ExclamationTriangleIcon },
      'Canceled': { bg: 'bg-red-100', text: 'text-red-700', icon: XMarkIcon }
    };

    const config = statusConfig[status] || statusConfig['Scheduled'];
    const IconComponent = config.icon;

    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${config.bg} ${config.text}`}>
        <IconComponent className="w-4 h-4" />
        {status}
      </span>
    );
  };

  const FormatIcon = getFormatIcon(interview.format);

  // tomiwa: Tab navigation component
  const TabButton = ({ id, label, icon: Icon, isActive, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
        isActive
          ? 'bg-brand-aqua text-white'
          : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
      }`}
    >
      <Icon className="w-4 h-4" />
      {label}
    </button>
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* tomiwa: Backdrop overlay */}
      <div className="flex min-h-screen items-center justify-center p-4">
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
        />
        
        {/* tomiwa: Modal content with responsive sizing */}
        <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
          
          {/* tomiwa: Modal header */}
          <div className="bg-gradient-to-r from-brand-aqua to-[#0C5B65] px-6 py-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  interview.type === 'interview' ? 'bg-white/20' : 'bg-white/20'
                }`}>
                  {interview.type === 'interview' ? (
                    <VideoCameraIcon className="w-6 h-6 text-white" />
                  ) : (
                    <UserGroupIcon className="w-6 h-6 text-white" />
                  )}
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-display font-bold text-white mb-1">
                    {interview.title}
                  </h2>
                  <p className="text-white/90 text-sm">
                    {interview.company} • {interview.role}
                  </p>
                  <div className="flex items-center gap-4 mt-2">
                    <StatusBadge status={interview.status} />
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-white/80 hover:text-white transition-colors p-1"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* tomiwa: Tab navigation */}
          <div className="border-b border-neutral-200 px-6 py-3">
            <div className="flex gap-2 overflow-x-auto">
              <TabButton
                id="overview"
                label="Overview"
                icon={InformationCircleIcon}
                isActive={activeTab === 'overview'}
                onClick={setActiveTab}
              />
              <TabButton
                id="participants"
                label="Participants"
                icon={UserGroupIcon}
                isActive={activeTab === 'participants'}
                onClick={setActiveTab}
              />
              <TabButton
                id="preparation"
                label="Preparation"
                icon={BookOpenIcon}
                isActive={activeTab === 'preparation'}
                onClick={setActiveTab}
              />
              <TabButton
                id="notes"
                label="Notes & Follow-up"
                icon={PencilSquareIcon}
                isActive={activeTab === 'notes'}
                onClick={setActiveTab}
              />
            </div>
          </div>

          {/* tomiwa: Modal body with scrollable content */}
          <div className="px-6 py-6 max-h-[60vh] overflow-y-auto">
            
            {/* tomiwa: Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                
                {/* tomiwa: Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-neutral-900 flex items-center gap-2">
                      <CalendarIcon className="w-5 h-5 text-brand-aqua" />
                      Date & Time
                    </h3>
                    <div className="bg-neutral-50 rounded-lg p-4 space-y-3">
                      <div className="flex items-center gap-3">
                        <CalendarIcon className="w-5 h-5 text-neutral-500" />
                        <div>
                          <p className="font-medium text-neutral-900">{formatDate(interview.date)}</p>
                          <p className="text-sm text-neutral-600">Date</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <ClockIcon className="w-5 h-5 text-neutral-500" />
                        <div>
                          <p className="font-medium text-neutral-900">
                            {formatTime(interview.date)} ({interview.duration} minutes)
                          </p>
                          <p className="text-sm text-neutral-600">Time & Duration</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-neutral-900 flex items-center gap-2">
                      <FormatIcon className="w-5 h-5 text-brand-aqua" />
                      Meeting Details
                    </h3>
                    <div className="bg-neutral-50 rounded-lg p-4 space-y-3">
                      <div className="flex items-center gap-3">
                        <FormatIcon className="w-5 h-5 text-neutral-500" />
                        <div>
                          <p className="font-medium text-neutral-900 capitalize">{interview.format}</p>
                          <p className="text-sm text-neutral-600">Format</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPinIcon className="w-5 h-5 text-neutral-500" />
                        <div>
                          <p className="font-medium text-neutral-900">{interview.location}</p>
                          <p className="text-sm text-neutral-600">Location</p>
                        </div>
                      </div>
                      {interview.meetingLink && (
                        <div className="flex items-start gap-3">
                          <LinkIcon className="w-5 h-5 text-neutral-500 mt-0.5" />
                          <div className="flex-1">
                            <a 
                              href={interview.meetingLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-medium text-brand-aqua hover:text-primary-600 break-all"
                            >
                              {interview.meetingLink}
                            </a>
                            <p className="text-sm text-neutral-600">Meeting Link</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* tomiwa: Company & Role Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-neutral-900 flex items-center gap-2">
                    <BuildingOfficeIcon className="w-5 h-5 text-brand-aqua" />
                    Position Details
                  </h3>
                  <div className="bg-neutral-50 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3">
                        <BuildingOfficeIcon className="w-5 h-5 text-neutral-500" />
                        <div>
                          <p className="font-medium text-neutral-900">{interview.company}</p>
                          <p className="text-sm text-neutral-600">Company</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <BriefcaseIcon className="w-5 h-5 text-neutral-500" />
                        <div>
                          <p className="font-medium text-neutral-900">{interview.role}</p>
                          <p className="text-sm text-neutral-600">Position</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* tomiwa: Interview Description */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-neutral-900 flex items-center gap-2">
                    <ChatBubbleLeftRightIcon className="w-5 h-5 text-brand-aqua" />
                    Interview Description
                  </h3>
                  <div className="bg-neutral-50 rounded-lg p-4">
                    <p className="text-neutral-700 leading-relaxed">{interview.description}</p>
                  </div>
                </div>
              </div>
            )}

            {/* tomiwa: Participants Tab */}
            {activeTab === 'participants' && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-neutral-900 flex items-center gap-2">
                    <UserIcon className="w-5 h-5 text-brand-aqua" />
                    Primary Interviewer
                  </h3>
                  <div className="bg-neutral-50 rounded-lg p-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-brand-aqua/10 rounded-full flex items-center justify-center">
                        <UserIcon className="w-6 h-6 text-brand-aqua" />
                      </div>
                      <div>
                        <p className="font-semibold text-neutral-900">{interview.interviewer}</p>
                        <p className="text-neutral-600">{interview.interviewerRole}</p>
                        <p className="text-sm text-neutral-500 mt-1">{interview.company}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-neutral-900 flex items-center gap-2">
                    <UserGroupIcon className="w-5 h-5 text-brand-aqua" />
                    All Participants ({interview.participants.length})
                  </h3>
                  <div className="space-y-3">
                    {interview.participants.map((participant, index) => (
                      <div key={index} className="bg-neutral-50 rounded-lg p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-brand-aqua/10 rounded-full flex items-center justify-center">
                            <UserIcon className="w-5 h-5 text-brand-aqua" />
                          </div>
                          <div>
                            <p className="font-medium text-neutral-900">{participant}</p>
                            <p className="text-sm text-neutral-600">
                              {participant === interview.interviewer ? interview.interviewerRole : 'Team Member'}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* tomiwa: Preparation Tab */}
            {activeTab === 'preparation' && (
              <div className="space-y-6">
                {interview.preparationMaterials && interview.preparationMaterials.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-neutral-900 flex items-center gap-2">
                      <DocumentTextIcon className="w-5 h-5 text-brand-aqua" />
                      Preparation Materials
                    </h3>
                    <div className="space-y-3">
                      {interview.preparationMaterials.map((material, index) => (
                        <div key={index} className="bg-neutral-50 rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <DocumentTextIcon className="w-5 h-5 text-brand-aqua mt-0.5" />
                            <div>
                              <p className="font-medium text-neutral-900">{material}</p>
                              <p className="text-sm text-neutral-600 mt-1">
                                Review this material before your interview
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* tomiwa: Interview Tips Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-neutral-900 flex items-center gap-2">
                    <StarIcon className="w-5 h-5 text-brand-aqua" />
                    Interview Tips
                  </h3>
                  <div className="bg-gradient-to-r from-brand-yellow/10 to-brand-orange/10 rounded-lg p-4">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-brand-yellow rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-brand-black">1</span>
                        </div>
                        <p className="text-neutral-700">
                          <strong>Research the company:</strong> Review their website, recent news, and company culture
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-brand-yellow rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-brand-black">2</span>
                        </div>
                        <p className="text-neutral-700">
                          <strong>Prepare examples:</strong> Have specific examples ready using the STAR method
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-brand-yellow rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-brand-black">3</span>
                        </div>
                        <p className="text-neutral-700">
                          <strong>Test your setup:</strong> Ensure your camera, microphone, and internet connection work properly
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-brand-yellow rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-brand-black">4</span>
                        </div>
                        <p className="text-neutral-700">
                          <strong>Prepare questions:</strong> Have thoughtful questions ready about the role and company
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* tomiwa: Notes & Follow-up Tab */}
            {activeTab === 'notes' && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-neutral-900 flex items-center gap-2">
                    <PencilSquareIcon className="w-5 h-5 text-brand-aqua" />
                    Interview Notes
                  </h3>
                  <div className="bg-neutral-50 rounded-lg p-4">
                    {interview.status === 'Completed' ? (
                      <div className="space-y-4">
                        <textarea
                          placeholder="Add your interview notes here..."
                          rows={6}
                          className="w-full p-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-brand-aqua focus:border-transparent resize-none"
                          defaultValue="Great interview! The team seemed very collaborative and the technical challenges align well with my experience. They mentioned the next steps would be a final round with the VP of Engineering."
                        />
                        <div className="flex justify-end">
                          <button className="px-4 py-2 bg-brand-aqua text-white font-medium rounded-lg hover:bg-primary-600 transition-colors">
                            Save Notes
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <PencilSquareIcon className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
                        <p className="text-neutral-600">Notes will be available after the interview is completed</p>
                      </div>
                    )}
                  </div>
                </div>

                {interview.status === 'Completed' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-neutral-900 flex items-center gap-2">
                      <CheckCircleIcon className="w-5 h-5 text-brand-aqua" />
                      Follow-up Actions
                    </h3>
                    <div className="space-y-3">
                      <div className="bg-neutral-50 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <input type="checkbox" className="mt-1" defaultChecked />
                          <div>
                            <p className="font-medium text-neutral-900">Send thank you email</p>
                            <p className="text-sm text-neutral-600">Within 24 hours of the interview</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-neutral-50 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <input type="checkbox" className="mt-1" />
                          <div>
                            <p className="font-medium text-neutral-900">Connect on LinkedIn</p>
                            <p className="text-sm text-neutral-600">Send personalized connection requests to interviewers</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-neutral-50 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <input type="checkbox" className="mt-1" />
                          <div>
                            <p className="font-medium text-neutral-900">Follow up on timeline</p>
                            <p className="text-sm text-neutral-600">If no response within the mentioned timeframe</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* tomiwa: Modal footer with action buttons */}
          <div className="border-t border-neutral-200 px-6 py-4">
            <div className="flex flex-col sm:flex-row gap-3 sm:justify-between">
              <div className="flex gap-2">
                {interview.status === 'Scheduled' && new Date(interview.date) > new Date() && (
                  <>
                    {interview.meetingLink && (
                      <a
                        href={interview.meetingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-brand-aqua text-white font-medium rounded-lg hover:bg-primary-600 transition-colors"
                      >
                        <VideoCameraIcon className="w-4 h-4" />
                        Join Meeting
                      </a>
                    )}
                    <button className="px-4 py-2 bg-neutral-100 text-neutral-700 font-medium rounded-lg hover:bg-neutral-200 transition-colors">
                      Reschedule
                    </button>
                  </>
                )}
                {interview.status === 'Completed' && (
                  <button className="px-4 py-2 bg-emerald-50 text-emerald-600 font-medium rounded-lg hover:bg-emerald-100 transition-colors">
                    Download Notes
                  </button>
                )}
              </div>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-neutral-100 text-neutral-700 font-medium rounded-lg hover:bg-neutral-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

