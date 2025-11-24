'use client';

import { useState } from 'react';
import Image from 'next/image';
import { 
  CheckCircleIcon,
  DocumentArrowDownIcon,
  CalendarIcon,
  EnvelopeIcon,
  SparklesIcon,
  ClockIcon,
  DocumentCheckIcon,
  UserCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  CalendarDaysIcon,
  BellIcon,
} from '@heroicons/react/24/outline';
import CandidateDrawer from './CandidateDrawer';

// tomiwa: Mock data with more varied positions
const mockCandidates = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'Senior Frontend Developer',
    company: 'Tech Corp',
    location: 'San Francisco, CA',
    progress: 95,
    skills: ['React', 'TypeScript', 'UI/UX'],
    experience: '98%',
    expertise: '92%',
    status: 'Interview Scheduled',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    stage: 'interview',
    cv: '/path/to/cv.pdf',
    nextInterview: '2024-03-20 10:00 AM',
    assessmentStatus: 'Completed',
    assessmentScore: 92,
  },
  {
    id: 2,
    name: 'Michael Rodriguez',
    role: 'Sales Representative',
    company: 'SalesPro Inc',
    location: 'Miami, FL',
    progress: 88,
    skills: ['B2B Sales', 'CRM', 'Lead Generation'],
    experience: '92%',
    expertise: '88%',
    status: 'Final Stage',
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    stage: 'final',
    cv: '/path/to/cv.pdf',
    nextInterview: null,
    assessmentStatus: 'Completed',
    assessmentScore: 89,
  },
  {
    id: 3,
    name: 'Emily Johnson',
    role: 'Marketing Manager',
    company: 'BrandCo',
    location: 'New York, NY',
    progress: 85,
    skills: ['Digital Marketing', 'Brand Strategy', 'Analytics'],
    experience: '90%',
    expertise: '85%',
    status: 'Assessment Sent',
    imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    stage: 'assessment',
    cv: '/path/to/cv.pdf',
    assessmentStatus: 'Pending',
    assessmentSentDate: '2024-03-15',
  },
  {
    id: 4,
    name: 'James Wilson',
    role: 'Product Manager',
    company: 'ProductHub',
    location: 'Seattle, WA',
    progress: 92,
    skills: ['Agile', 'Product Strategy', 'User Research'],
    experience: '94%',
    expertise: '90%',
    status: 'Final Stage',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    stage: 'final',
    cv: '/path/to/cv.pdf',
    nextInterview: null,
    assessmentStatus: 'Completed',
    assessmentScore: 95,
  },
  {
    id: 5,
    name: 'Sofia Garcia',
    role: 'Customer Success Manager',
    company: 'ServiceTech',
    location: 'Austin, TX',
    progress: 78,
    skills: ['Customer Support', 'Account Management', 'SaaS'],
    experience: '82%',
    expertise: '75%',
    status: 'Interview Failed',
    imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9',
    stage: 'interview',
    cv: '/path/to/cv.pdf',
    interviewFeedback: 'Need more enterprise experience',
  },
];

export default function ShortlistedCandidates({ candidates = mockCandidates }) {
  const [activeTab, setActiveTab] = useState('all');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showAIAssist, setShowAIAssist] = useState(false);
  const [showExtendDeadline, setShowExtendDeadline] = useState(false);
  const [selectedCandidateForDeadline, setSelectedCandidateForDeadline] = useState(null);
  const [newDeadline, setNewDeadline] = useState('');

  // tomiwa: Filter candidates based on active tab
  const filteredCandidates = candidates.filter(candidate => {
    switch (activeTab) {
      case 'interviews':
        return candidate.stage === 'interview';
      case 'assessments':
        return candidate.stage === 'assessment';
      case 'final':
        return candidate.stage === 'final';
      default:
        return true;
    }
  });

  // tomiwa: Get status badge color based on status
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'Interview Scheduled':
        return 'bg-brand-yellow/10 text-brand-yellow';
      case 'Interview Failed':
        return 'bg-red-100 text-red-600';
      case 'Assessment Sent':
        return 'bg-brand-aqua/10 text-brand-aqua';
      case 'Assessment Failed':
        return 'bg-red-100 text-red-600';
      case 'Final Stage':
        return 'bg-emerald-100 text-emerald-600';
      default:
        return 'bg-neutral-100 text-neutral-600';
    }
  };

  // tomiwa: Get assessment status icon and color
  const getAssessmentStatusIcon = (assessmentStatus) => {
    switch (assessmentStatus) {
      case 'Completed':
        return { icon: CheckCircleIcon, color: 'text-emerald-500' };
      case 'Failed':
        return { icon: XCircleIcon, color: 'text-red-500' };
      case 'Pending':
        return { icon: ClockIcon, color: 'text-brand-yellow' };
      default:
        return { icon: ExclamationTriangleIcon, color: 'text-neutral-400' };
    }
  };

  const handleViewDetails = (candidate) => {
    setSelectedCandidate(candidate);
    setIsDrawerOpen(true);
  };

  // tomiwa: Handler for extending assessment deadline
  const handleExtendDeadline = (candidate) => {
    setSelectedCandidateForDeadline(candidate);
    setShowExtendDeadline(true);
  };

  // tomiwa: Handler for saving new deadline
  const handleSaveDeadline = () => {
    if (newDeadline && selectedCandidateForDeadline) {
      // In a real app, this would make an API call to update the deadline
      console.log(`Extending deadline for ${selectedCandidateForDeadline.name} to ${newDeadline}`);
      setShowExtendDeadline(false);
      setNewDeadline('');
      setSelectedCandidateForDeadline(null);
    }
  };

  // tomiwa: Handler for sending reminder
  const handleSendReminder = (candidate) => {
    // In a real app, this would make an API call to send reminder
    console.log(`Sending reminder to ${candidate.name}`);
    alert(`Reminder sent to ${candidate.name}`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg">
      {/* Tab Navigation */}
      <div className="border-b border-neutral-200">
        <div className="flex items-center justify-between p-4">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-6 py-3 rounded-xl font-medium transition-colors ${
                activeTab === 'all'
                  ? 'bg-brand-aqua/10 text-brand-aqua'
                  : 'text-neutral-600 hover:bg-neutral-50'
              }`}
            >
              All Shortlist
            </button>
            <button
              onClick={() => setActiveTab('interviews')}
              className={`px-6 py-3 rounded-xl font-medium transition-colors ${
                activeTab === 'interviews'
                  ? 'bg-brand-aqua/10 text-brand-aqua'
                  : 'text-neutral-600 hover:bg-neutral-50'
              }`}
            >
              Interviews
            </button>
            <button
              onClick={() => setActiveTab('assessments')}
              className={`px-6 py-3 rounded-xl font-medium transition-colors ${
                activeTab === 'assessments'
                  ? 'bg-brand-aqua/10 text-brand-aqua'
                  : 'text-neutral-600 hover:bg-neutral-50'
              }`}
            >
              Assessments
            </button>
            <button
              onClick={() => setActiveTab('final')}
              className={`px-6 py-3 rounded-xl font-medium transition-colors ${
                activeTab === 'final'
                  ? 'bg-brand-aqua/10 text-brand-aqua'
                  : 'text-neutral-600 hover:bg-neutral-50'
              }`}
            >
              Final Candidates
            </button>
          </div>

          {/* AI Assist Button */}
          <button
            onClick={() => setShowAIAssist(!showAIAssist)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-brand-aqua to-brand-orange text-white hover:opacity-90 transition-opacity"
          >
            <SparklesIcon className="w-5 h-5" />
            AI Assist
          </button>
        </div>

        {/* AI Assist Panel */}
        {showAIAssist && (
          <div className="p-4 bg-neutral-50 border-t border-neutral-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="flex items-center gap-2 p-4 rounded-xl bg-white hover:shadow-md transition-shadow">
                <SparklesIcon className="w-5 h-5 text-brand-aqua" />
                <span>Generate Interview Questions</span>
              </button>
              <button className="flex items-center gap-2 p-4 rounded-xl bg-white hover:shadow-md transition-shadow">
                <SparklesIcon className="w-5 h-5 text-brand-orange" />
                <span>Create Assessment</span>
              </button>
              <button className="flex items-center gap-2 p-4 rounded-xl bg-white hover:shadow-md transition-shadow">
                <SparklesIcon className="w-5 h-5 text-brand-yellow" />
                <span>Draft Email Update</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Candidates Grid */}
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {filteredCandidates.map((candidate) => (
            <div
              key={candidate.id}
              className="bg-white border border-neutral-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              {/* Candidate Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex gap-4">
                  <div className="relative">
                    <Image
                      src={candidate.imageUrl}
                      alt={candidate.name}
                      width={48}
                      height={48}
                      className="rounded-xl"
                    />
                    <div className="absolute -top-1 -right-1 bg-white rounded-full p-0.5">
                      <CheckCircleIcon className="w-4 h-4 text-brand-aqua" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-brand-black">{candidate.name}</h3>
                    <p className="text-sm text-neutral-600">{candidate.role}</p>
                    <p className="text-sm text-neutral-500">{candidate.location}</p>
                  </div>
                </div>
              </div>

              {/* Progress */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-neutral-600">Progress</span>
                    <span className="text-sm font-medium text-brand-black">{candidate.progress}%</span>
                  </div>
                  <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-brand-aqua rounded-full"
                      style={{ width: `${candidate.progress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {candidate.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-neutral-100 text-neutral-600 rounded-lg text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* tomiwa: Assessment Information - Show assessment details if available */}
              {(candidate.assessmentStatus || candidate.assessmentType) && (
                <div className="mb-4 p-3 bg-neutral-50 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-brand-black">Assessment</h4>
                    {candidate.assessmentStatus && (
                      <div className="flex items-center gap-1">
                        {(() => {
                          const { icon: StatusIcon, color } = getAssessmentStatusIcon(candidate.assessmentStatus);
                          return <StatusIcon className={`w-4 h-4 ${color}`} />;
                        })()}
                        <span className={`text-xs font-medium ${getAssessmentStatusIcon(candidate.assessmentStatus).color}`}>
                          {candidate.assessmentStatus}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {candidate.assessmentType && (
                    <p className="text-xs text-neutral-600 mb-1">
                      <span className="font-medium">Type:</span> {candidate.assessmentType}
                    </p>
                  )}
                  
                  {candidate.assessmentName && (
                    <p className="text-xs text-neutral-600 mb-2">
                      <span className="font-medium">Test:</span> {candidate.assessmentName}
                    </p>
                  )}
                  
                  {candidate.assessmentScore && (
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-neutral-600">Score:</span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              candidate.assessmentScore >= 80 ? 'bg-emerald-500' :
                              candidate.assessmentScore >= 60 ? 'bg-brand-yellow' : 'bg-red-500'
                            }`}
                            style={{ width: `${candidate.assessmentScore}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium text-brand-black">{candidate.assessmentScore}%</span>
                      </div>
                    </div>
                  )}
                  
                  {/* tomiwa: Actions for Assessment Sent candidates */}
                  {candidate.assessmentStatus === 'Pending' && (
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => handleExtendDeadline(candidate)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-brand-aqua/10 text-brand-aqua rounded-lg text-xs hover:bg-brand-aqua/20 transition-colors"
                      >
                        <CalendarDaysIcon className="w-3 h-3" />
                        Extend Deadline
                      </button>
                      <button
                        onClick={() => handleSendReminder(candidate)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-brand-orange/10 text-brand-orange rounded-lg text-xs hover:bg-brand-orange/20 transition-colors"
                      >
                        <BellIcon className="w-3 h-3" />
                        Send Reminder
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Quick Actions */}
              <div className="grid grid-cols-4 gap-2 mb-4">
                <button className="p-2 rounded-lg hover:bg-neutral-50 text-neutral-600 transition-colors">
                  <DocumentArrowDownIcon className="w-5 h-5 mx-auto" />
                </button>
                <button className="p-2 rounded-lg hover:bg-neutral-50 text-neutral-600 transition-colors">
                  <CalendarIcon className="w-5 h-5 mx-auto" />
                </button>
                <button className="p-2 rounded-lg hover:bg-neutral-50 text-neutral-600 transition-colors">
                  <EnvelopeIcon className="w-5 h-5 mx-auto" />
                </button>
                <button className="p-2 rounded-lg hover:bg-neutral-50 text-neutral-600 transition-colors">
                  <UserCircleIcon className="w-5 h-5 mx-auto" />
                </button>
              </div>

              {/* Status & View Details */}
              <div className="flex items-center justify-between">
                <span
                  className={`px-3 py-1 rounded-lg text-sm ${getStatusBadgeColor(
                    candidate.status
                  )}`}
                >
                  {candidate.status}
                </span>
                <button 
                  onClick={() => handleViewDetails(candidate)}
                  className="text-sm text-brand-aqua hover:text-brand-orange font-medium"
                >
                  View Details →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Candidate Details Drawer */}
      {isDrawerOpen && (
        <CandidateDrawer
          candidate={selectedCandidate}
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
        />
      )}

      {/* tomiwa: Extend Deadline Modal */}
      {showExtendDeadline && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-display font-bold text-brand-black">
                Extend Assessment Deadline
              </h3>
              <button
                onClick={() => setShowExtendDeadline(false)}
                className="text-neutral-400 hover:text-neutral-600"
              >
                <XCircleIcon className="w-6 h-6" />
              </button>
            </div>
            
            {selectedCandidateForDeadline && (
              <div className="mb-4">
                <p className="text-sm text-neutral-600 mb-2">
                  Extending deadline for <span className="font-medium text-brand-black">{selectedCandidateForDeadline.name}</span>
                </p>
                <p className="text-xs text-neutral-500">
                  Assessment: {selectedCandidateForDeadline.assessmentName}
                </p>
              </div>
            )}

            <div className="mb-6">
              <label className="block text-sm font-medium text-brand-black mb-2">
                New Deadline
              </label>
              <input
                type="datetime-local"
                value={newDeadline}
                onChange={(e) => setNewDeadline(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-brand-aqua/20 focus:border-brand-aqua"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowExtendDeadline(false)}
                className="flex-1 px-4 py-3 rounded-xl border border-neutral-200 text-neutral-600 hover:bg-neutral-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveDeadline}
                disabled={!newDeadline}
                className="flex-1 px-4 py-3 rounded-xl bg-brand-aqua text-white hover:bg-brand-aqua/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save Deadline
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 