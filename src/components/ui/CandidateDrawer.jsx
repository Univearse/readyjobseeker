'use client';

import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
import {
  XMarkIcon,
  DocumentArrowDownIcon,
  CalendarIcon,
  CalendarDaysIcon,
  EnvelopeIcon,
  SparklesIcon,
  ClockIcon,
  DocumentCheckIcon,
  UserCircleIcon,
  CheckCircleIcon,
  ChartBarIcon,
  ChatBubbleLeftIcon,
  PencilIcon,
  VideoCameraIcon,
  LinkIcon,
  PaperAirplaneIcon,
  ExclamationTriangleIcon,
  AcademicCapIcon,
  StarIcon,
  BellIcon,
  PhoneIcon,
  MapPinIcon,
  BriefcaseIcon,
  GlobeAltIcon,
  BoltIcon,
  DocumentTextIcon,
  DocumentMagnifyingGlassIcon,
  ArrowPathIcon,
  ChatBubbleBottomCenterTextIcon,
  ClipboardDocumentCheckIcon,
  BuildingOfficeIcon,
  AdjustmentsHorizontalIcon,
  RocketLaunchIcon,
  LightBulbIcon,
} from '@heroicons/react/24/outline';

export default function CandidateDrawer({ onClose, candidate }) {
  const isOpen = Boolean(candidate);
  // tomiwa: State management for different panels and interactions
  const [activeTab, setActiveTab] = useState('overview');
  const [showAIAssist, setShowAIAssist] = useState(false);
  const [showMessagePanel, setShowMessagePanel] = useState(false);
  const [showNotesPanel, setShowNotesPanel] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [notes, setNotes] = useState(candidate?.notes || '');
  const [message, setMessage] = useState('');
  const [rescheduleReason, setRescheduleReason] = useState('');

  if (!candidate) return null;

  // tomiwa: Get status-specific actions and information
  const getStatusSpecificContent = () => {
    switch (candidate.status) {
      case 'Interview Scheduled':
        return {
          title: 'Interview Details',
          actions: ['Join Meeting', 'Reschedule', 'Send Reminder', 'Add Notes'],
          color: 'brand-yellow',
          bgColor: 'bg-brand-yellow/10',
        };
      case 'Interview Failed':
        return {
          title: 'Interview Feedback',
          actions: ['Add Feedback', 'Archive', 'Second Chance'],
          color: 'red-500',
          bgColor: 'bg-red-50',
        };
      case 'Assessment Sent':
        return {
          title: 'Assessment Status',
          actions: ['Send Reminder', 'Extend Deadline', 'View Progress'],
          color: 'brand-aqua',
          bgColor: 'bg-brand-aqua/10',
        };
      case 'Assessment Failed':
        return {
          title: 'Assessment Results',
          actions: ['View Results', 'Provide Feedback', 'Archive'],
          color: 'red-500',
          bgColor: 'bg-red-50',
        };
      case 'Final Stage':
        return {
          title: 'Final Evaluation',
          actions: ['Send Offer', 'Schedule Final Interview', 'Reference Check'],
          color: 'emerald-500',
          bgColor: 'bg-emerald-50',
        };
      default:
        return {
          title: 'Candidate Status',
          actions: ['Update Status', 'Add Notes'],
          color: 'neutral-500',
          bgColor: 'bg-neutral-50',
        };
    }
  };

  const statusContent = getStatusSpecificContent();

  // tomiwa: AI Assist features based on candidate status
  const getAIAssistFeatures = () => {
    const baseFeatures = [
      { name: 'Smart Analysis', icon: BoltIcon, description: 'Get AI insights on candidate fit', action: 'Analyze Now' },
      { name: 'Resume Review', icon: DocumentMagnifyingGlassIcon, description: 'Deep dive into experience & skills', action: 'Review' },
      { name: 'Message Assistant', icon: ChatBubbleBottomCenterTextIcon, description: 'Get AI help with communication', action: 'Compose' },
    ];

    switch (candidate.status) {
      case 'Interview Scheduled':
        return [
          ...baseFeatures,
          { name: 'Interview Prep', icon: ClipboardDocumentCheckIcon, description: 'Generate custom questions & agenda', action: 'Prepare' },
          { name: 'Background Check', icon: BuildingOfficeIcon, description: 'Verify experience & references', action: 'Verify' },
          { name: 'Skill Assessment', icon: AdjustmentsHorizontalIcon, description: 'Technical evaluation suggestions', action: 'Assess' },
        ];
      case 'Assessment Sent':
        return [
          ...baseFeatures,
          { name: 'Progress Tracking', icon: ChartBarIcon, description: 'Real-time completion analysis', action: 'Track' },
          { name: 'Custom Tests', icon: DocumentTextIcon, description: 'Generate role-specific assessments', action: 'Create' },
          { name: 'Performance Prediction', icon: RocketLaunchIcon, description: 'AI-based success prediction', action: 'Predict' },
        ];
      case 'Final Stage':
        return [
          ...baseFeatures,
          { name: 'Offer Generator', icon: DocumentArrowDownIcon, description: 'Create personalized offer letter', action: 'Generate' },
          { name: 'Market Analysis', icon: ChartBarIcon, description: 'Compensation & benefits insights', action: 'Analyze' },
          { name: 'Success Planning', icon: LightBulbIcon, description: 'Onboarding & growth recommendations', action: 'Plan' },
        ];
      default:
        return [
          ...baseFeatures,
          { name: 'Quick Screen', icon: ArrowPathIcon, description: 'Initial qualification check', action: 'Screen' },
          { name: 'Match Score', icon: StarIcon, description: 'Calculate role fit percentage', action: 'Calculate' },
          { name: 'Next Steps', icon: RocketLaunchIcon, description: 'Get process recommendations', action: 'Recommend' },
        ];
    }
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-neutral-900/20 backdrop-blur-sm transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-4xl">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    {/* tomiwa: Enhanced Header with candidate info */}
                    <div className="bg-gradient-to-r from-brand-aqua to-brand-black px-8 py-6">
                      <div className="flex items-center justify-between mb-4">
                        <Dialog.Title className="text-2xl font-display font-bold text-white">
                          Candidate Profile
                        </Dialog.Title>
                        <button
                          onClick={onClose}
                          className="rounded-xl p-2 text-white hover:bg-white/10 transition-colors"
                        >
                          <XMarkIcon className="h-6 w-6" />
                        </button>
                      </div>
                      
                      {/* tomiwa: Candidate header info */}
                      <div className="flex items-center gap-6">
                        <div className="relative">
                          <Image
                            src={candidate.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"}
                            alt={candidate.name}
                            width={80}
                            height={80}
                            className="rounded-2xl border-2 border-white/20"
                          />
                          <div className="absolute -top-1 -right-1 bg-white rounded-full p-1">
                            <CheckCircleIcon className="w-5 h-5 text-brand-aqua" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h2 className="text-2xl font-display font-bold text-white mb-1">
                            {candidate.name}
                          </h2>
                          <p className="text-white/80 mb-2 flex items-center gap-2">
                            <BriefcaseIcon className="w-4 h-4" />
                            {candidate.role} • {candidate.company}
                          </p>
                          <p className="text-white/60 flex items-center gap-2">
                            <MapPinIcon className="w-4 h-4" />
                            {candidate.location}
                          </p>
                        </div>
                        <div className={`px-4 py-2 rounded-xl ${statusContent.bgColor} border border-white/20`}>
                          <span className={`text-sm font-medium text-${statusContent.color}`}>
                            {candidate.status}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* tomiwa: Navigation tabs */}
                    <div className="border-b border-neutral-200 px-8">
                      <div className="flex gap-1">
                        {['overview', 'details', 'activity', 'documents'].map((tab) => (
                          <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-3 text-sm font-medium rounded-t-xl transition-colors ${
                              activeTab === tab
                                ? 'bg-white text-brand-aqua border-b-2 border-brand-aqua'
                                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                            }`}
                          >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* tomiwa: Main content area */}
                    <div className="flex-1 px-8 py-6">
                      {activeTab === 'overview' && (
                        <div className="space-y-8">
                          {/* tomiwa: Quick Actions */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <button 
                              onClick={() => setShowMessagePanel(true)}
                              className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-neutral-50 transition-colors border border-neutral-200"
                            >
                              <EnvelopeIcon className="w-6 h-6 text-brand-aqua" />
                              <span className="text-sm text-neutral-600">Message</span>
                            </button>
                            <button 
                              onClick={() => setShowCalendar(true)}
                              className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-neutral-50 transition-colors border border-neutral-200"
                            >
                              <CalendarIcon className="w-6 h-6 text-brand-orange" />
                              <span className="text-sm text-neutral-600">Schedule</span>
                            </button>
                            <button 
                              onClick={() => setShowAIAssist(true)}
                              className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-neutral-50 transition-colors border border-neutral-200"
                            >
                              <SparklesIcon className="w-6 h-6 text-brand-yellow" />
                              <span className="text-sm text-neutral-600">AI Assist</span>
                            </button>
                            <button 
                              onClick={() => setShowNotesPanel(true)}
                              className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-neutral-50 transition-colors border border-neutral-200"
                            >
                              <PencilIcon className="w-6 h-6 text-neutral-500" />
                              <span className="text-sm text-neutral-600">Add Notes</span>
                            </button>
                          </div>

                          {/* tomiwa: Status-specific content */}
                          <div className={`${statusContent.bgColor} rounded-2xl p-6`}>
                            <h3 className="text-lg font-display font-bold text-brand-black mb-4 flex items-center gap-2">
                              <ClockIcon className={`w-5 h-5 text-${statusContent.color}`} />
                              {statusContent.title}
                            </h3>
                            
                            {/* tomiwa: Interview Scheduled specific content */}
                            {candidate.status === 'Interview Scheduled' && (
                              <div className="space-y-4">
                                <div className="bg-white rounded-xl p-4">
                                  <div className="flex items-center justify-between mb-3">
                                    <h4 className="font-medium text-brand-black">Upcoming Interview</h4>
                                    <span className="text-sm text-neutral-500">
                                      {candidate.nextInterview || 'March 20, 2024 at 10:00 AM'}
                                    </span>
                                  </div>
                                  <div className="flex gap-2">
                                    <button className="flex items-center gap-2 px-4 py-2 bg-brand-aqua text-white rounded-xl hover:bg-brand-aqua/90 transition-colors">
                                      <VideoCameraIcon className="w-4 h-4" />
                                      Join Meeting
                                    </button>
                                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 text-neutral-700 rounded-xl hover:bg-neutral-50 transition-colors">
                                      <LinkIcon className="w-4 h-4" />
                                      Copy Link
                                    </button>
                                    <button 
                                      onClick={() => setShowCalendar(true)}
                                      className="flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 text-neutral-700 rounded-xl hover:bg-neutral-50 transition-colors"
                                    >
                                      <CalendarIcon className="w-4 h-4" />
                                      Reschedule
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* tomiwa: Interview Failed specific content */}
                            {candidate.status === 'Interview Failed' && (
                              <div className="space-y-4">
                                <div className="bg-white rounded-xl p-4">
                                  <h4 className="font-medium text-brand-black mb-3">Interview Feedback</h4>
                                  <p className="text-neutral-600 mb-4">
                                    {candidate.interviewFeedback || 'No feedback provided yet.'}
                                  </p>
                                  <div className="flex gap-2">
                                    <button 
                                      onClick={() => setShowNotesPanel(true)}
                                      className="flex items-center gap-2 px-4 py-2 bg-brand-orange text-white rounded-xl hover:bg-brand-orange/90 transition-colors"
                                    >
                                      <PencilIcon className="w-4 h-4" />
                                      Add Feedback
                                    </button>
                                    <button className="px-4 py-2 bg-white border border-neutral-200 text-neutral-700 rounded-xl hover:bg-neutral-50 transition-colors">
                                      Archive Candidate
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* tomiwa: Assessment Sent specific content */}
                            {candidate.status === 'Assessment Sent' && (
                              <div className="space-y-4">
                                <div className="bg-white rounded-xl p-4">
                                  <div className="flex items-center justify-between mb-3">
                                    <h4 className="font-medium text-brand-black">Assessment Progress</h4>
                                    <span className="text-sm text-neutral-500">
                                      Sent: {candidate.assessmentSentDate || 'March 15, 2024'}
                                    </span>
                                  </div>
                                  <div className="mb-4">
                                    <div className="flex items-center justify-between mb-1">
                                      <span className="text-sm text-neutral-600">Completion</span>
                                      <span className="text-sm font-medium">45%</span>
                                    </div>
                                    <div className="h-2 bg-neutral-100 rounded-full">
                                      <div className="h-full bg-brand-aqua rounded-full w-[45%]" />
                                    </div>
                                  </div>
                                  <div className="flex gap-2">
                                    <button className="flex items-center gap-2 px-4 py-2 bg-brand-aqua text-white rounded-xl hover:bg-brand-aqua/90 transition-colors">
                                      <BellIcon className="w-4 h-4" />
                                      Send Reminder
                                    </button>
                                    <button className="px-4 py-2 bg-white border border-neutral-200 text-neutral-700 rounded-xl hover:bg-neutral-50 transition-colors">
                                      Extend Deadline
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* tomiwa: Final Stage specific content */}
                            {candidate.status === 'Final Stage' && (
                              <div className="space-y-4">
                                <div className="bg-white rounded-xl p-4">
                                  <h4 className="font-medium text-brand-black mb-3">Ready for Final Decision</h4>
                                  <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div className="text-center">
                                      <div className="text-2xl font-bold text-emerald-500">
                                        {candidate.assessmentScore || 95}%
                                      </div>
                                      <div className="text-sm text-neutral-600">Assessment Score</div>
                                    </div>
                                    <div className="text-center">
                                      <div className="text-2xl font-bold text-emerald-500">
                                        {candidate.progress}%
                                      </div>
                                      <div className="text-sm text-neutral-600">Overall Match</div>
                                    </div>
                                  </div>
                                  <div className="flex gap-2">
                                    <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors">
                                      <CheckCircleIcon className="w-4 h-4" />
                                      Send Offer
                                    </button>
                                    <button className="flex items-center gap-2 px-4 py-2 bg-brand-aqua text-white rounded-xl hover:bg-brand-aqua/90 transition-colors">
                                      <PhoneIcon className="w-4 h-4" />
                                      Reference Check
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* tomiwa: Assessment Details Section */}
                          {candidate.assessmentType && (
                            <div className="bg-white border border-neutral-200 rounded-2xl p-6 mb-6">
                              <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-display font-bold text-brand-black flex items-center gap-2">
                                  <AcademicCapIcon className="w-5 h-5 text-brand-aqua" />
                                  Assessment Details
                                </h3>
                                {candidate.assessmentStatus && (
                                  <div className={`px-3 py-1 rounded-lg text-sm ${
                                    candidate.assessmentStatus === 'Completed' ? 'bg-emerald-100 text-emerald-600' :
                                    candidate.assessmentStatus === 'Failed' ? 'bg-red-100 text-red-600' :
                                    'bg-brand-yellow/10 text-brand-yellow'
                                  }`}>
                                    {candidate.assessmentStatus}
                                  </div>
                                )}
                              </div>

                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm text-neutral-600 mb-1">Assessment Type</p>
                                    <p className="font-medium text-brand-black">{candidate.assessmentType}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-neutral-600 mb-1">Test Name</p>
                                    <p className="font-medium text-brand-black">{candidate.assessmentName}</p>
                                  </div>
                                </div>

                                {candidate.assessmentStatus === 'Completed' && candidate.assessmentScore && (
                                  <div>
                                    <div className="flex items-center justify-between mb-2">
                                      <p className="text-sm text-neutral-600">Assessment Score</p>
                                      <p className={`text-sm font-medium ${
                                        candidate.assessmentScore >= 80 ? 'text-emerald-600' :
                                        candidate.assessmentScore >= 60 ? 'text-brand-yellow' :
                                        'text-red-600'
                                      }`}>
                                        {candidate.assessmentScore}%
                                      </p>
                                    </div>
                                    <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                                      <div
                                        className={`h-full rounded-full ${
                                          candidate.assessmentScore >= 80 ? 'bg-emerald-500' :
                                          candidate.assessmentScore >= 60 ? 'bg-brand-yellow' :
                                          'bg-red-500'
                                        }`}
                                        style={{ width: `${candidate.assessmentScore}%` }}
                                      />
                                    </div>
                                  </div>
                                )}

                                {candidate.assessmentStatus === 'Pending' && (
                                  <div>
                                    <div className="flex items-center justify-between mb-2">
                                      <div>
                                        <p className="text-sm text-neutral-600">Sent Date</p>
                                        <p className="text-sm font-medium text-brand-black">{candidate.assessmentSentDate}</p>
                                      </div>
                                      <div className="text-right">
                                        <p className="text-sm text-neutral-600">Deadline</p>
                                        <p className="text-sm font-medium text-brand-black">{candidate.assessmentDeadline}</p>
                                      </div>
                                    </div>
                                    <div className="flex gap-2 mt-4">
                                      <button
                                        onClick={() => setShowCalendar(true)}
                                        className="flex items-center gap-1 px-4 py-2 bg-brand-aqua/10 text-brand-aqua rounded-lg text-sm hover:bg-brand-aqua/20 transition-colors"
                                      >
                                        <CalendarDaysIcon className="w-4 h-4" />
                                        Extend Deadline
                                      </button>
                                      <button
                                        onClick={() => {
                                          // In a real app, this would make an API call
                                          alert(`Reminder sent to ${candidate.name}`);
                                        }}
                                        className="flex items-center gap-1 px-4 py-2 bg-brand-orange/10 text-brand-orange rounded-lg text-sm hover:bg-brand-orange/20 transition-colors"
                                      >
                                        <BellIcon className="w-4 h-4" />
                                        Send Reminder
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}

                          {/* tomiwa: Progress and Skills */}
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Progress Section */}
                            <div className="bg-neutral-50 rounded-2xl p-6">
                              <h3 className="text-lg font-display font-bold text-brand-black mb-4 flex items-center gap-2">
                                <ChartBarIcon className="w-5 h-5 text-brand-aqua" />
                                Match Analysis
                              </h3>
                              <div className="space-y-4">
                                <div>
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm text-neutral-600">Overall Match</span>
                                    <span className="text-sm font-medium text-brand-black">{candidate.progress}%</span>
                                  </div>
                                  <div className="h-2 bg-white rounded-full overflow-hidden">
                                    <div
                                      className="h-full bg-brand-aqua rounded-full"
                                      style={{ width: `${candidate.progress}%` }}
                                    />
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="bg-white rounded-xl p-3">
                                    <p className="text-xs text-neutral-600 mb-1">Experience</p>
                                    <p className="text-lg font-bold text-brand-black">{candidate.experience}</p>
                                  </div>
                                  <div className="bg-white rounded-xl p-3">
                                    <p className="text-xs text-neutral-600 mb-1">Skills</p>
                                    <p className="text-lg font-bold text-brand-black">{candidate.expertise}</p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Skills Section */}
                            <div className="bg-neutral-50 rounded-2xl p-6">
                              <h3 className="text-lg font-display font-bold text-brand-black mb-4">
                                Key Skills
                              </h3>
                              <div className="flex flex-wrap gap-2">
                                {candidate.skills.map((skill, index) => (
                                  <span
                                    key={index}
                                    className="px-3 py-2 bg-white text-neutral-700 rounded-xl text-sm border border-neutral-200"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {activeTab === 'details' && (
                        <div className="space-y-6">
                          {/* tomiwa: Detailed candidate information */}
                          <div className="bg-neutral-50 rounded-2xl p-6">
                            <h3 className="text-lg font-display font-bold text-brand-black mb-4">
                              Professional Details
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <label className="text-sm text-neutral-600">Current Position</label>
                                <p className="font-medium text-brand-black">{candidate.role}</p>
                              </div>
                              <div>
                                <label className="text-sm text-neutral-600">Company</label>
                                <p className="font-medium text-brand-black">{candidate.company}</p>
                              </div>
                              <div>
                                <label className="text-sm text-neutral-600">Location</label>
                                <p className="font-medium text-brand-black">{candidate.location}</p>
                              </div>
                              <div>
                                <label className="text-sm text-neutral-600">Experience Level</label>
                                <p className="font-medium text-brand-black">Senior Level (5+ years)</p>
                              </div>
                            </div>
                          </div>

                          <div className="bg-neutral-50 rounded-2xl p-6">
                            <h3 className="text-lg font-display font-bold text-brand-black mb-4">
                              Contact Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <label className="text-sm text-neutral-600">Email</label>
                                <p className="font-medium text-brand-black">{candidate.name.toLowerCase().replace(' ', '.')}@email.com</p>
                              </div>
                              <div>
                                <label className="text-sm text-neutral-600">Phone</label>
                                <p className="font-medium text-brand-black">+1 (555) 123-4567</p>
                              </div>
                              <div>
                                <label className="text-sm text-neutral-600">LinkedIn</label>
                                <p className="font-medium text-brand-aqua">linkedin.com/in/{candidate.name.toLowerCase().replace(' ', '')}</p>
                              </div>
                              <div>
                                <label className="text-sm text-neutral-600">Portfolio</label>
                                <p className="font-medium text-brand-aqua">portfolio.{candidate.name.toLowerCase().replace(' ', '')}.com</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {activeTab === 'activity' && (
                        <div className="space-y-4">
                          {/* tomiwa: Activity timeline */}
                          <div className="bg-neutral-50 rounded-2xl p-6">
                            <h3 className="text-lg font-display font-bold text-brand-black mb-4">
                              Recent Activity
                            </h3>
                            <div className="space-y-4">
                              {[
                                { action: 'Interview scheduled', time: '2 hours ago', type: 'calendar' },
                                { action: 'Assessment completed', time: '1 day ago', type: 'check' },
                                { action: 'Profile viewed', time: '3 days ago', type: 'eye' },
                                { action: 'Application received', time: '1 week ago', type: 'document' },
                              ].map((activity, index) => (
                                <div key={index} className="flex items-center gap-4 p-4 bg-white rounded-xl">
                                  <div className="w-8 h-8 bg-brand-aqua/10 rounded-full flex items-center justify-center">
                                    <ClockIcon className="w-4 h-4 text-brand-aqua" />
                                  </div>
                                  <div className="flex-1">
                                    <p className="font-medium text-brand-black">{activity.action}</p>
                                    <p className="text-sm text-neutral-600">{activity.time}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {activeTab === 'documents' && (
                        <div className="space-y-4">
                          {/* tomiwa: Documents and files */}
                          <div className="bg-neutral-50 rounded-2xl p-6">
                            <h3 className="text-lg font-display font-bold text-brand-black mb-4">
                              Documents & Files
                            </h3>
                            <div className="space-y-3">
                              {[
                                { name: 'Resume_Sarah_Chen.pdf', size: '2.4 MB', type: 'pdf' },
                                { name: 'Cover_Letter.pdf', size: '1.2 MB', type: 'pdf' },
                                { name: 'Portfolio_Link.txt', size: '0.1 KB', type: 'link' },
                                { name: 'Assessment_Results.pdf', size: '3.1 MB', type: 'pdf' },
                              ].map((doc, index) => (
                                <div key={index} className="flex items-center justify-between p-4 bg-white rounded-xl border border-neutral-200">
                                  <div className="flex items-center gap-3">
                                    <DocumentArrowDownIcon className="w-5 h-5 text-brand-aqua" />
                                    <div>
                                      <p className="font-medium text-brand-black">{doc.name}</p>
                                      <p className="text-sm text-neutral-600">{doc.size}</p>
                                    </div>
                                  </div>
                                  <button className="px-4 py-2 bg-brand-aqua text-white rounded-xl hover:bg-brand-aqua/90 transition-colors">
                                    Download
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* tomiwa: AI Assist Panel */}
                    {showAIAssist && (
                      <div className="border-t border-neutral-200 bg-gradient-to-r from-brand-aqua/5 to-brand-orange/5 p-6">
                        <div className="flex items-center justify-between mb-6">
                          <div>
                            <h3 className="text-lg font-display font-bold text-brand-black flex items-center gap-2 mb-1">
                              <SparklesIcon className="w-5 h-5 text-brand-aqua" />
                              AI Assistant
                            </h3>
                            <p className="text-sm text-neutral-600">Powered by advanced AI to help with recruitment tasks</p>
                          </div>
                          <button
                            onClick={() => setShowAIAssist(false)}
                            className="text-neutral-500 hover:text-neutral-700"
                          >
                            <XMarkIcon className="w-5 h-5" />
                          </button>
                        </div>

                        {/* AI Quick Stats */}
                        <div className="grid grid-cols-3 gap-4 mb-6">
                          <div className="bg-white rounded-xl p-4 border border-neutral-100">
                            <div className="text-2xl font-bold text-brand-aqua mb-1">95%</div>
                            <div className="text-sm text-neutral-600">Match Score</div>
                          </div>
                          <div className="bg-white rounded-xl p-4 border border-neutral-100">
                            <div className="text-2xl font-bold text-brand-orange mb-1">High</div>
                            <div className="text-sm text-neutral-600">Potential</div>
                          </div>
                          <div className="bg-white rounded-xl p-4 border border-neutral-100">
                            <div className="text-2xl font-bold text-brand-yellow mb-1">8/10</div>
                            <div className="text-sm text-neutral-600">Skill Match</div>
                          </div>
                        </div>

                        {/* AI Features Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {getAIAssistFeatures().map((feature, index) => (
                            <div
                              key={index}
                              className="bg-white rounded-xl p-4 border border-neutral-100 hover:shadow-md transition-shadow"
                            >
                              <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 bg-brand-aqua/10 rounded-lg">
                                  <feature.icon className="w-5 h-5 text-brand-aqua" />
                                </div>
                                <h4 className="font-medium text-brand-black">{feature.name}</h4>
                              </div>
                              <p className="text-sm text-neutral-600 mb-3">{feature.description}</p>
                              <button className="w-full px-3 py-2 text-sm font-medium text-brand-aqua bg-brand-aqua/10 rounded-lg hover:bg-brand-aqua/20 transition-colors">
                                {feature.action}
                              </button>
                            </div>
                          ))}
                        </div>

                        {/* AI Insights */}
                        <div className="mt-6 bg-white rounded-xl p-4 border border-neutral-100">
                          <div className="flex items-center gap-2 mb-3">
                            <LightBulbIcon className="w-5 h-5 text-brand-yellow" />
                            <h4 className="font-medium text-brand-black">AI Insights</h4>
                          </div>
                          <div className="space-y-2">
                            <p className="text-sm text-neutral-600">• Strong match for technical requirements with 5+ years React experience</p>
                            <p className="text-sm text-neutral-600">• Communication style indicates good team fit</p>
                            <p className="text-sm text-neutral-600">• Recommended for fast-track interview process</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* tomiwa: Message Panel */}
                    {showMessagePanel && (
                      <div className="border-t border-neutral-200 bg-white p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-display font-bold text-brand-black">
                            Send Message
                          </h3>
                          <button
                            onClick={() => setShowMessagePanel(false)}
                            className="text-neutral-500 hover:text-neutral-700"
                          >
                            <XMarkIcon className="w-5 h-5" />
                          </button>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-2">
                              Message Template
                            </label>
                            <select className="w-full p-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-aqua/20">
                              <option>Interview Confirmation</option>
                              <option>Assessment Reminder</option>
                              <option>Schedule Update</option>
                              <option>Custom Message</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-2">
                              Message
                            </label>
                            <textarea
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                              rows={4}
                              className="w-full p-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-aqua/20"
                              placeholder="Type your message here..."
                            />
                          </div>
                          <div className="flex gap-2">
                            <button className="flex items-center gap-2 px-4 py-2 bg-brand-aqua text-white rounded-xl hover:bg-brand-aqua/90 transition-colors">
                              <PaperAirplaneIcon className="w-4 h-4" />
                              Send Message
                            </button>
                            <button className="px-4 py-2 bg-neutral-100 text-neutral-700 rounded-xl hover:bg-neutral-200 transition-colors">
                              Save Draft
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* tomiwa: Notes Panel */}
                    {showNotesPanel && (
                      <div className="border-t border-neutral-200 bg-white p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-display font-bold text-brand-black">
                            Recruiter Notes
                          </h3>
                          <button
                            onClick={() => setShowNotesPanel(false)}
                            className="text-neutral-500 hover:text-neutral-700"
                          >
                            <XMarkIcon className="w-5 h-5" />
                          </button>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-2">
                              Add Note
                            </label>
                            <textarea
                              value={notes}
                              onChange={(e) => setNotes(e.target.value)}
                              rows={4}
                              className="w-full p-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-aqua/20"
                              placeholder="Add your notes about this candidate..."
                            />
                          </div>
                          <div className="flex gap-2">
                            <button className="px-4 py-2 bg-brand-orange text-white rounded-xl hover:bg-brand-orange/90 transition-colors">
                              Save Note
                            </button>
                            <button className="px-4 py-2 bg-neutral-100 text-neutral-700 rounded-xl hover:bg-neutral-200 transition-colors">
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* tomiwa: Calendar Panel */}
                    {showCalendar && (
                      <div className="border-t border-neutral-200 bg-white p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-display font-bold text-brand-black">
                            {candidate.assessmentStatus === 'Pending' ? 'Extend Assessment Deadline' : 'Schedule Interview'}
                          </h3>
                          <button
                            onClick={() => setShowCalendar(false)}
                            className="text-neutral-500 hover:text-neutral-700"
                          >
                            <XMarkIcon className="w-5 h-5" />
                          </button>
                        </div>

                        {candidate.assessmentStatus === 'Pending' ? (
                          // Assessment Deadline Extension Form
                          <div className="space-y-6">
                            <div>
                              <div className="mb-4">
                                <p className="text-sm text-neutral-600">Current Assessment</p>
                                <p className="font-medium text-brand-black">{candidate.assessmentName}</p>
                              </div>
                              <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                  <p className="text-sm text-neutral-600">Current Deadline</p>
                                  <p className="font-medium text-brand-black">{candidate.assessmentDeadline}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-neutral-600">Sent Date</p>
                                  <p className="font-medium text-brand-black">{candidate.assessmentSentDate}</p>
                                </div>
                              </div>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-neutral-700 mb-2">
                                New Deadline
                              </label>
                              <input
                                type="datetime-local"
                                className="w-full p-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-aqua/20"
                                min={new Date().toISOString().slice(0, 16)}
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-neutral-700 mb-2">
                                Reason for Extension
                              </label>
                              <textarea
                                rows={3}
                                className="w-full p-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-aqua/20"
                                placeholder="Provide a reason for extending the deadline..."
                              />
                            </div>

                            <div className="flex gap-2">
                              <button className="flex items-center gap-2 px-4 py-2 bg-brand-aqua text-white rounded-xl hover:bg-brand-aqua/90 transition-colors">
                                <CalendarDaysIcon className="w-4 h-4" />
                                Extend Deadline
                              </button>
                              <button
                                onClick={() => setShowCalendar(false)}
                                className="px-4 py-2 bg-neutral-100 text-neutral-700 rounded-xl hover:bg-neutral-200 transition-colors"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          // Interview Scheduling Form
                          <>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-2">
                                  Date & Time
                                </label>
                                <input
                                  type="datetime-local"
                                  className="w-full p-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-aqua/20"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-2">
                                  Duration
                                </label>
                                <select className="w-full p-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-aqua/20">
                                  <option>30 minutes</option>
                                  <option>45 minutes</option>
                                  <option>1 hour</option>
                                  <option>1.5 hours</option>
                                </select>
                              </div>
                              <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-neutral-700 mb-2">
                                  Meeting Type
                                </label>
                                <div className="grid grid-cols-3 gap-2">
                                  <button className="p-3 border border-neutral-200 rounded-xl hover:bg-brand-aqua/5 hover:border-brand-aqua transition-colors">
                                    Video Call
                                  </button>
                                  <button className="p-3 border border-neutral-200 rounded-xl hover:bg-brand-aqua/5 hover:border-brand-aqua transition-colors">
                                    Phone Call
                                  </button>
                                  <button className="p-3 border border-neutral-200 rounded-xl hover:bg-brand-aqua/5 hover:border-brand-aqua transition-colors">
                                    In Person
                                  </button>
                                </div>
                              </div>
                              {candidate.status === 'Interview Failed' && (
                                <div className="md:col-span-2">
                                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                                    Reschedule Reason
                                  </label>
                                  <textarea
                                    value={rescheduleReason}
                                    onChange={(e) => setRescheduleReason(e.target.value)}
                                    rows={3}
                                    className="w-full p-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-aqua/20"
                                    placeholder="Reason for rescheduling..."
                                  />
                                </div>
                              )}
                            </div>
                            <div className="flex gap-2 mt-6">
                              <button className="flex items-center gap-2 px-4 py-2 bg-brand-aqua text-white rounded-xl hover:bg-brand-aqua/90 transition-colors">
                                <CalendarIcon className="w-4 h-4" />
                                Schedule Interview
                              </button>
                              <button
                                onClick={() => setShowCalendar(false)}
                                className="px-4 py-2 bg-neutral-100 text-neutral-700 rounded-xl hover:bg-neutral-200 transition-colors"
                              >
                                Cancel
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
} 