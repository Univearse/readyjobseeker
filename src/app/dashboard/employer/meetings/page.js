'use client';

import { useState, useMemo, useEffect } from 'react';
import {
  validateMeetingTime,
  validateMeetingDuration,
  validateParticipants,
  validateMeetingLink,
  checkSchedulingConflicts,
  formatErrorMessage,
} from '@/utils/meetingErrors';
// tomiwa: Individual imports to avoid Next.js barrel optimization issues
import format from 'date-fns/format';
import startOfWeek from 'date-fns/startOfWeek';
import endOfWeek from 'date-fns/endOfWeek';
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';
import eachDayOfInterval from 'date-fns/eachDayOfInterval';
import isSameMonth from 'date-fns/isSameMonth';
import isSameDay from 'date-fns/isSameDay';
import addMonths from 'date-fns/addMonths';
import subMonths from 'date-fns/subMonths';
import addWeeks from 'date-fns/addWeeks';
import subWeeks from 'date-fns/subWeeks';
import {
  CalendarIcon,
  ListBulletIcon,
  FunnelIcon,
  VideoCameraIcon,
  UserGroupIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowPathIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckIcon,
} from '@heroicons/react/24/outline';
import EmployerSidebar from '@/components/ui/EmployerSidebar';
import Calendar from '@/components/ui/Calendar';
import RescheduleModal from '@/components/ui/modals/RescheduleModal';
import CancelMeetingModal from '@/components/ui/modals/CancelMeetingModal';

// tomiwa: Mock data for meetings
const mockMeetings = [
  {
    id: 1,
    type: 'interview',
    title: 'Technical Interview',
    candidateName: 'Sarah Chen',
    role: 'Senior Frontend Developer',
    date: '2024-03-28T10:00:00',
    duration: 60,
    status: 'Scheduled',
    meetingLink: 'https://meet.google.com/abc-defg-hij',
    participants: ['John Doe (Interviewer)', 'Sarah Chen (Candidate)', 'Emily Wong (HR)'],
    candidateImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face',
  },
  {
    id: 2,
    type: 'team',
    title: 'Weekly Recruitment Sync',
    date: '2024-03-28T14:00:00',
    duration: 30,
    status: 'Scheduled',
    meetingLink: 'https://meet.google.com/xyz-uvw-rst',
    participants: ['HR Team', 'Hiring Managers'],
  },
  {
    id: 3,
    type: 'interview',
    title: 'Culture Fit Interview',
    candidateName: 'Michael Rodriguez',
    role: 'Product Manager',
    date: '2024-03-27T11:00:00',
    duration: 45,
    status: 'Completed',
    meetingLink: 'https://meet.google.com/lmn-opq-rst',
    participants: ['Jane Smith (Interviewer)', 'Michael Rodriguez (Candidate)'],
    candidateImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
  },
  {
    id: 4,
    type: 'interview',
    title: 'Final Interview',
    candidateName: 'Alex Thompson',
    role: 'UX Designer',
    date: '2024-03-29T15:30:00',
    duration: 60,
    status: 'Rescheduled',
    meetingLink: 'https://meet.google.com/def-ghi-jkl',
    participants: ['Design Lead', 'Alex Thompson (Candidate)', 'HR Manager'],
    candidateImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop&crop=face',
  },
];

// tomiwa: Status badge component with brand colors
// tomiwa: Schedule Meeting Modal component with enhanced UX
const ScheduleMeetingModal = ({ isOpen, onClose, onSchedule }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    type: 'interview',
    date: '',
    time: '',
    duration: '60',
    candidateName: '',
    role: '',
    meetingLink: '',
    participants: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // tomiwa: Reset form when modal is closed
  useEffect(() => {
    if (!isOpen) {
      setStep(1);
      setFormData({
        title: '',
        type: 'interview',
        date: '',
        time: '',
        duration: '60',
        candidateName: '',
        role: '',
        meetingLink: '',
        participants: '',
      });
      setErrors({});
      setIsSubmitting(false);
    }
  }, [isOpen]);

  const validateStep = (currentStep) => {
    const newErrors = {};

    switch (currentStep) {
      case 1:
        if (!formData.title.trim()) {
          newErrors.title = 'Meeting title is required';
        }
        if (!formData.type) {
          newErrors.type = 'Meeting type is required';
        }
        if (formData.type === 'interview') {
          if (!formData.candidateName.trim()) {
            newErrors.candidateName = 'Candidate name is required';
          }
          if (!formData.role.trim()) {
            newErrors.role = 'Role is required';
          }
        }
        break;

      case 2:
        try {
          validateMeetingTime(formData.date, formData.time);
        } catch (err) {
          newErrors.date = formatErrorMessage(err);
        }
        try {
          validateMeetingDuration(formData.duration);
        } catch (err) {
          newErrors.duration = formatErrorMessage(err);
        }
        break;

      case 3:
        try {
          validateParticipants(formData.participants.split(',').map(p => p.trim()));
        } catch (err) {
          newErrors.participants = formatErrorMessage(err);
        }
        if (formData.meetingLink) {
          try {
            validateMeetingLink(formData.meetingLink);
          } catch (err) {
            newErrors.meetingLink = formatErrorMessage(err);
          }
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!validateStep(step)) {
        setIsSubmitting(false);
        return;
      }

      // tomiwa: Create new meeting object
      const newMeeting = {
        ...formData,
        date: new Date(`${formData.date}T${formData.time}`).toISOString(),
        duration: parseInt(formData.duration),
        participants: formData.participants.split(',').map(p => p.trim())
      };

      // tomiwa: Check for scheduling conflicts
      checkSchedulingConflicts(newMeeting, mockMeetings);

      onSchedule(formData);
      onClose();
    } catch (err) {
      setErrors({ submit: formatErrorMessage(err) });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImportLink = () => {
    // Here you would implement the logic to import a meeting link
    // For example, from Google Calendar or Microsoft Teams
    console.log('Import meeting link');
  };

  if (!isOpen) return null;

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center space-x-2 mb-6">
      {[1, 2, 3].map((number) => (
        <div
          key={number}
          className={`flex items-center ${number !== 1 && 'ml-10 sm:ml-16 relative'}`}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm
              ${step === number ? 'bg-primary-500 text-white' :
                step > number ? 'bg-primary-100 text-primary-700' :
                'bg-neutral-100 text-neutral-500'}`}
          >
            {step > number ? <CheckIcon className="h-5 w-5" /> : number}
          </div>
          {number !== 3 && (
            <div className={`absolute left-8 w-10 sm:w-16 h-0.5 -translate-y-1/2 top-1/2
              ${step > number ? 'bg-primary-100' : 'bg-neutral-100'}`} />
          )}
          <span className={`absolute top-10 text-xs font-medium whitespace-nowrap
            ${step === number ? 'text-primary-600' :
              step > number ? 'text-primary-500' : 'text-neutral-500'}`}>
            {number === 1 ? 'Basic Info' :
             number === 2 ? 'Schedule' : 'Participants'}
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl">
        <div className="border-b border-neutral-100 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-display text-neutral-900">Schedule New Meeting</h2>
            <button
              onClick={onClose}
              className="text-neutral-400 hover:text-neutral-600"
            >
              <XCircleIcon className="h-6 w-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {renderStepIndicator()}

          {errors.submit && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm">
              {errors.submit}
            </div>
          )}

          <div className="space-y-6">
            {step === 1 && (
              <div className="space-y-6">
                {/* Meeting Type */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Meeting Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => {
                      setFormData({ ...formData, type: e.target.value });
                      setErrors({ ...errors, type: null });
                    }}
                    className={`w-full border rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary-100
                      ${errors.type ? 'border-red-300 focus:border-red-300' : 'border-neutral-200 focus:border-primary-300'}`}
                  >
                    <option value="interview">Interview</option>
                    <option value="team">Team Meeting</option>
                  </select>
                  {errors.type && (
                    <p className="mt-1 text-sm text-red-600">{errors.type}</p>
                  )}
                </div>

                {/* Meeting Title */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Meeting Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => {
                      setFormData({ ...formData, title: e.target.value });
                      setErrors({ ...errors, title: null });
                    }}
                    className={`w-full border rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary-100
                      ${errors.title ? 'border-red-300 focus:border-red-300' : 'border-neutral-200 focus:border-primary-300'}`}
                    placeholder="e.g., Technical Interview"
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                  )}
                </div>

                {formData.type === 'interview' && (
                  <>
                    {/* Candidate Name */}
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Candidate Name
                      </label>
                      <input
                        type="text"
                        value={formData.candidateName}
                        onChange={(e) => {
                          setFormData({ ...formData, candidateName: e.target.value });
                          setErrors({ ...errors, candidateName: null });
                        }}
                        className={`w-full border rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary-100
                          ${errors.candidateName ? 'border-red-300 focus:border-red-300' : 'border-neutral-200 focus:border-primary-300'}`}
                        placeholder="Enter candidate name"
                      />
                      {errors.candidateName && (
                        <p className="mt-1 text-sm text-red-600">{errors.candidateName}</p>
                      )}
                    </div>

                    {/* Role */}
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Role
                      </label>
                      <input
                        type="text"
                        value={formData.role}
                        onChange={(e) => {
                          setFormData({ ...formData, role: e.target.value });
                          setErrors({ ...errors, role: null });
                        }}
                        className={`w-full border rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary-100
                          ${errors.role ? 'border-red-300 focus:border-red-300' : 'border-neutral-200 focus:border-primary-300'}`}
                        placeholder="e.g., Frontend Developer"
                      />
                      {errors.role && (
                        <p className="mt-1 text-sm text-red-600">{errors.role}</p>
                      )}
                    </div>
                  </>
                )}
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                {/* Date */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => {
                      setFormData({ ...formData, date: e.target.value });
                      setErrors({ ...errors, date: null });
                    }}
                    className={`w-full border rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary-100
                      ${errors.date ? 'border-red-300 focus:border-red-300' : 'border-neutral-200 focus:border-primary-300'}`}
                    min={new Date().toISOString().split('T')[0]}
                  />
                  {errors.date && (
                    <p className="mt-1 text-sm text-red-600">{errors.date}</p>
                  )}
                </div>

                {/* Time */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Time
                  </label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => {
                      setFormData({ ...formData, time: e.target.value });
                      setErrors({ ...errors, time: null });
                    }}
                    className={`w-full border rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary-100
                      ${errors.time ? 'border-red-300 focus:border-red-300' : 'border-neutral-200 focus:border-primary-300'}`}
                  />
                  {errors.time && (
                    <p className="mt-1 text-sm text-red-600">{errors.time}</p>
                  )}
                </div>

                {/* Duration */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Duration
                  </label>
                  <select
                    value={formData.duration}
                    onChange={(e) => {
                      setFormData({ ...formData, duration: e.target.value });
                      setErrors({ ...errors, duration: null });
                    }}
                    className={`w-full border rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary-100
                      ${errors.duration ? 'border-red-300 focus:border-red-300' : 'border-neutral-200 focus:border-primary-300'}`}
                  >
                    <option value="30">30 minutes</option>
                    <option value="45">45 minutes</option>
                    <option value="60">60 minutes</option>
                    <option value="90">90 minutes</option>
                    <option value="120">120 minutes</option>
                  </select>
                  {errors.duration && (
                    <p className="mt-1 text-sm text-red-600">{errors.duration}</p>
                  )}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                {/* Participants */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Participants (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formData.participants}
                    onChange={(e) => {
                      setFormData({ ...formData, participants: e.target.value });
                      setErrors({ ...errors, participants: null });
                    }}
                    className={`w-full border rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary-100
                      ${errors.participants ? 'border-red-300 focus:border-red-300' : 'border-neutral-200 focus:border-primary-300'}`}
                    placeholder="e.g., john@example.com, sarah@example.com"
                  />
                  {errors.participants && (
                    <p className="mt-1 text-sm text-red-600">{errors.participants}</p>
                  )}
                </div>

                {/* Meeting Link */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Meeting Link
                  </label>
                  <div className="flex space-x-3">
                    <input
                      type="url"
                      value={formData.meetingLink}
                      onChange={(e) => {
                        setFormData({ ...formData, meetingLink: e.target.value });
                        setErrors({ ...errors, meetingLink: null });
                      }}
                      className={`flex-1 border rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary-100
                        ${errors.meetingLink ? 'border-red-300 focus:border-red-300' : 'border-neutral-200 focus:border-primary-300'}`}
                      placeholder="Paste meeting link or import from calendar"
                    />
                    <button
                      type="button"
                      onClick={handleImportLink}
                      className="px-4 py-2.5 bg-secondary-50 text-secondary-600 rounded-xl hover:bg-secondary-100 transition-colors"
                    >
                      Import Link
                    </button>
                  </div>
                  {errors.meetingLink && (
                    <p className="mt-1 text-sm text-red-600">{errors.meetingLink}</p>
                  )}
                </div>

                {/* AI Suggestions */}
                <div className="bg-neutral-50 rounded-xl p-4">
                  <h4 className="text-sm font-medium text-neutral-900 mb-3 flex items-center">
                    <span className="bg-secondary-100 text-secondary-600 px-2 py-0.5 rounded text-xs mr-2">AI</span>
                    Suggestions
                  </h4>
                  <ul className="space-y-2 text-sm text-neutral-600">
                    <li className="flex items-start">
                      <span className="mr-2 text-secondary-500">•</span>
                      Send calendar invites to all participants automatically
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-secondary-500">•</span>
                      Set up automatic reminders 24h and 1h before the meeting
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-secondary-500">•</span>
                      {formData.type === 'interview' ? 'Generate interview questions based on the role' : 'Create an agenda template for the team meeting'}
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between space-x-3 pt-6 mt-6 border-t border-neutral-100">
            <div>
              {step > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-6 py-2.5 text-neutral-600 hover:text-neutral-900 transition-colors font-medium"
                >
                  Back
                </button>
              )}
            </div>
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 text-neutral-600 hover:text-neutral-900 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={step < 3 ? handleNext : handleSubmit}
                disabled={isSubmitting}
                className={`px-6 py-2.5 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors font-medium
                  flex items-center ${isSubmitting && 'opacity-75 cursor-not-allowed'}`}
              >
                {isSubmitting ? (
                  <>
                    <ArrowPathIcon className="h-5 w-5 mr-2 animate-spin" />
                    Scheduling...
                  </>
                ) : (
                  step < 3 ? 'Continue' : 'Schedule Meeting'
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const statusStyles = {
    Scheduled: 'bg-primary-50 text-primary-600',
    Completed: 'bg-neutral-50 text-neutral-600',
    Rescheduled: 'bg-secondary-50 text-secondary-600',
    Canceled: 'bg-red-50 text-red-600',
  };

  return (
    <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${statusStyles[status]}`}>
      {status}
    </span>
  );
};

// tomiwa: Empty state component for no meetings
const NoMeetingsState = ({ onSchedule }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 sm:px-6 lg:px-8 bg-white rounded-xl border border-neutral-100 shadow-sm">
      <div className="max-w-md mx-auto text-center">
        {/* Empty state illustration */}
        <div className="mb-8">
          <img
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=300&h=300"
            alt="Empty calendar"
            className="w-48 h-48 mx-auto rounded-xl object-cover"
          />
        </div>
        
        <h3 className="text-xl font-display text-neutral-900 mb-3">
          No Meetings Scheduled
        </h3>
        
        <p className="text-neutral-600 mb-8">
          Start by scheduling your first meeting or interview. You can easily manage all your meetings and interviews from here.
        </p>
        
        {/* Quick action buttons */}
        <div className="space-y-4">
          <button
            onClick={onSchedule}
            className="w-full inline-flex items-center justify-center px-6 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors font-medium shadow-sm"
          >
            <VideoCameraIcon className="h-5 w-5 mr-2" />
            Schedule Interview
          </button>
          
          <button
            onClick={onSchedule}
            className="w-full inline-flex items-center justify-center px-6 py-3 bg-secondary-50 text-secondary-600 rounded-xl hover:bg-secondary-100 transition-colors font-medium"
          >
            <UserGroupIcon className="h-5 w-5 mr-2" />
            Schedule Team Meeting
          </button>
        </div>
        
        {/* Help text */}
        <div className="mt-8 p-4 bg-neutral-50 rounded-xl">
          <h4 className="text-sm font-medium text-neutral-900 mb-2 flex items-center">
            <span className="bg-secondary-100 text-secondary-600 px-2 py-0.5 rounded text-xs mr-2">Tips</span>
            Quick Start Guide
          </h4>
          <ul className="text-sm text-neutral-600 space-y-2">
            <li className="flex items-start">
              <span className="mr-2 text-secondary-500">•</span>
              Schedule interviews with candidates
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-secondary-500">•</span>
              Set up team meetings and discussions
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-secondary-500">•</span>
              Get AI-powered meeting suggestions
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// tomiwa: Meeting card component
const MeetingCard = ({ meeting, onSelect, isSelected, onToggleSelect, isSelectable }) => {
  const date = new Date(meeting.date);
  const formattedTime = date.toLocaleTimeString('en-US', { 
    hour: 'numeric',
    minute: '2-digit',
    hour12: true 
  });
  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });

  // tomiwa: Meeting type styles with brand colors
  const typeStyles = {
    interview: {
      border: 'border-l-primary-500',
      icon: 'text-primary-500',
    },
    team: {
      border: 'border-l-secondary-500',
      icon: 'text-secondary-500',
    },
  };

  return (
    <div 
      className={`bg-white rounded-xl border border-neutral-100 shadow-sm hover:shadow-md transition-all cursor-pointer relative
        ${isSelected ? 'ring-2 ring-primary-100' : 'hover:border-primary-100'}
        border-l-4 ${typeStyles[meeting.type].border}`}
      onClick={() => onSelect(meeting)}
    >
      {isSelectable && (
        <div 
          className="absolute top-4 right-4"
          onClick={(e) => {
            e.stopPropagation();
            onToggleSelect(meeting);
          }}
        >
          <div className={`w-5 h-5 rounded-lg border ${
            isSelected ? 'bg-primary-500 border-primary-500' : 'border-neutral-200'
          } flex items-center justify-center cursor-pointer transition-colors`}>
            {isSelected && (
              <CheckIcon className="w-4 h-4 text-white" />
            )}
          </div>
        </div>
      )}
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-3">
            <div className={`mt-1 ${typeStyles[meeting.type].icon}`}>
              {meeting.type === 'interview' ? (
                <VideoCameraIcon className="h-5 w-5" />
              ) : (
                <UserGroupIcon className="h-5 w-5" />
              )}
            </div>
            <div>
              <h3 className="font-display text-neutral-900 mb-1">{meeting.title}</h3>
              {meeting.candidateName && (
                <p className="text-sm text-neutral-600">{meeting.candidateName} • {meeting.role}</p>
              )}
            </div>
          </div>
          <StatusBadge status={meeting.status} />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 text-sm text-neutral-500">
            <div className="flex items-center space-x-1.5">
              <CalendarIcon className="h-4 w-4" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <ClockIcon className="h-4 w-4" />
              <span>{formattedTime}</span>
            </div>
          </div>
          
          {meeting.status === 'Scheduled' && (
            <div className="flex items-center space-x-2">
              <button 
                className="px-2.5 py-1.5 rounded-lg text-primary-600 hover:bg-primary-50 transition-colors"
                title="Join Meeting"
              >
                <VideoCameraIcon className="h-5 w-5" />
              </button>
              <button 
                className="px-2.5 py-1.5 rounded-lg text-secondary-600 hover:bg-secondary-50 transition-colors"
                title="Reschedule"
                onClick={(e) => {
                  e.stopPropagation();
                  handleReschedule(meeting);
                }}
              >
                <ArrowPathIcon className="h-5 w-5" />
              </button>
              <button 
                className="px-2.5 py-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                title="Cancel"
              >
                <XCircleIcon className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// tomiwa: Calendar navigation component
const CalendarNavigation = ({ view, onViewChange, onPrevious, onNext }) => {
  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center bg-white rounded-lg border border-neutral-200">
        <button
          className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
            view === 'week' ? 'bg-brand-aqua text-white' : 'text-neutral-600 hover:text-neutral-900'
          }`}
          onClick={() => onViewChange('week')}
        >
          Week
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
            view === 'month' ? 'bg-brand-aqua text-white' : 'text-neutral-600 hover:text-neutral-900'
          }`}
          onClick={() => onViewChange('month')}
        >
          Month
        </button>
      </div>
      <div className="flex items-center space-x-2">
        <button
          className="p-1 rounded-lg hover:bg-neutral-100"
          onClick={onPrevious}
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
        <button
          className="p-1 rounded-lg hover:bg-neutral-100"
          onClick={onNext}
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default function MeetingsPage() {
  const [view, setView] = useState('list'); // 'list', 'week', or 'month'
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all', 'interviews', or 'team'
  const [selectedMeetings, setSelectedMeetings] = useState(new Set());
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [meetingToReschedule, setMeetingToReschedule] = useState(null);
  const [meetingToCancel, setMeetingToCancel] = useState(null);
  const [meetingType, setMeetingType] = useState('interview');
  const [meetingLink, setMeetingLink] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());

  // tomiwa: Handle meeting rescheduling
  const handleReschedule = (meeting) => {
    setMeetingToReschedule(meeting);
    setShowRescheduleModal(true);
  };

  const handleRescheduleSubmit = (updatedMeeting) => {
    // tomiwa: Find and update the meeting in the mock data
    const meetingIndex = mockMeetings.findIndex(m => m.id === updatedMeeting.id);
    if (meetingIndex !== -1) {
      mockMeetings[meetingIndex] = updatedMeeting;
      // tomiwa: Update selected meeting if it's the one being rescheduled
      if (selectedMeeting?.id === updatedMeeting.id) {
        setSelectedMeeting(updatedMeeting);
      }
    }
    setShowRescheduleModal(false);
    setMeetingToReschedule(null);
  };

  // tomiwa: Handle bulk selection
  const toggleMeetingSelection = (meeting) => {
    const newSelected = new Set(selectedMeetings);
    if (newSelected.has(meeting.id)) {
      newSelected.delete(meeting.id);
    } else {
      newSelected.add(meeting.id);
    }
    setSelectedMeetings(newSelected);
    setShowBulkActions(newSelected.size > 0);
  };

  // tomiwa: Bulk action handlers
  const handleBulkReschedule = () => {
    console.log('Rescheduling meetings:', Array.from(selectedMeetings));
    // Implement bulk reschedule logic
  };

  const handleBulkCancel = () => {
    console.log('Canceling meetings:', Array.from(selectedMeetings));
    // Implement bulk cancel logic
  };

  const handleBulkReminder = () => {
    console.log('Sending reminders for meetings:', Array.from(selectedMeetings));
    // Implement bulk reminder logic
  };

  // tomiwa: Handle scheduling new meeting
  const handleScheduleMeeting = (formData) => {
    // Create a new meeting object
    const newMeeting = {
      id: mockMeetings.length + 1,
      type: formData.type,
      title: formData.title,
      candidateName: formData.type === 'interview' ? formData.candidateName : null,
      role: formData.type === 'interview' ? formData.role : null,
      date: `${formData.date}T${formData.time}`,
      duration: parseInt(formData.duration),
      status: 'Scheduled',
      meetingLink: formData.meetingLink,
      participants: formData.participants.split(',').map(p => p.trim()),
      candidateImage: formData.type === 'interview' 
        ? 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face'
        : null,
    };

    // Add the new meeting to the mock data
    mockMeetings.push(newMeeting);
    
    // Close the modal and show success message
    setShowScheduleModal(false);
    // You would typically show a toast notification here
    console.log('Meeting scheduled:', newMeeting);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <EmployerSidebar />
      
      <main className="lg:pl-72">
        <div className="max-w-7xl mx-auto">
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-primary-50 to-neutral-50 border-b border-neutral-100">
            <div className="px-4 sm:px-6 lg:px-8 py-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h1 className="text-2xl font-display text-neutral-900">Meetings</h1>
                
                <div className="flex items-center space-x-4">
                  {/* Schedule Meeting Button */}
                  <button
                    className="inline-flex items-center px-4 py-2.5 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors font-medium shadow-sm"
                    onClick={() => setShowScheduleModal(true)}
                  >
                    <VideoCameraIcon className="h-5 w-5 mr-2" />
                    Schedule Meeting
                  </button>

                  {/* View toggle */}
                  <div className="flex items-center bg-white rounded-xl border border-neutral-100 shadow-sm p-1">
                    <button
                      className={`px-3 py-2 rounded-lg transition-colors ${
                        view === 'list' 
                          ? 'bg-primary-50 text-primary-600' 
                          : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                      }`}
                      onClick={() => setView('list')}
                    >
                      <ListBulletIcon className="h-5 w-5" />
                    </button>
                    <button
                      className={`px-3 py-2 rounded-lg transition-colors ${
                        view === 'week' || view === 'month'
                          ? 'bg-primary-50 text-primary-600'
                          : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                      }`}
                      onClick={() => setView('week')}
                    >
                      <CalendarIcon className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Filter dropdown */}
                  <div className="relative">
                    <select
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                      className="appearance-none bg-white border border-neutral-100 shadow-sm rounded-xl pl-4 pr-10 py-2.5 text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-100 transition-shadow hover:border-primary-100"
                    >
                      <option value="all">All Meetings</option>
                      <option value="interviews">Interviews</option>
                      <option value="team">Team Chats</option>
                    </select>
                    <FunnelIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Calendar view */}
          {view !== 'list' && (
            <div className="mb-6">
              {mockMeetings.length === 0 ? (
                <div className="px-4 sm:px-6 lg:px-8 py-6">
                  <NoMeetingsState onSchedule={() => setShowScheduleModal(true)} />
                </div>
              ) : (
                <>
                  <CalendarNavigation
                view={view}
                onViewChange={setView}
                onPrevious={() => {
                  if (view === 'week') {
                    setCurrentDate(subWeeks(currentDate, 1));
                  } else {
                    setCurrentDate(subMonths(currentDate, 1));
                  }
                }}
                onNext={() => {
                  if (view === 'week') {
                    setCurrentDate(addWeeks(currentDate, 1));
                  } else {
                    setCurrentDate(addMonths(currentDate, 1));
                  }
                }}
              />
              <div className="mt-4">
                <Calendar
                  meetings={mockMeetings.filter(meeting => {
                    if (filter === 'all') return true;
                    if (filter === 'interviews') return meeting.type === 'interview';
                    if (filter === 'team') return meeting.type === 'team';
                    return true;
                  })}
                  view={view}
                  currentDate={currentDate}
                  onSelectMeeting={setSelectedMeeting}
                  onRescheduleMeeting={handleReschedule}
                  onCancelMeeting={(meeting) => {
                    setMeetingToCancel(meeting);
                    setShowCancelModal(true);
                  }}
                />
              </div>
                </>
              )}
            </div>
          )}

          <div className="px-4 sm:px-6 lg:px-8 py-6">
            {/* Bulk actions bar */}
            {showBulkActions && view === 'list' && (
              <div className="bg-white border border-neutral-100 shadow-sm rounded-xl p-4 mb-6 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-neutral-600 font-medium">
                    {selectedMeetings.size} {selectedMeetings.size === 1 ? 'meeting' : 'meetings'} selected
                  </span>
                  <button
                    onClick={() => setSelectedMeetings(new Set())}
                    className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
                  >
                    Clear selection
                  </button>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={handleBulkReminder}
                    className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm text-primary-600 hover:bg-primary-50 transition-colors"
                  >
                    Send Reminders
                  </button>
                  <button
                    onClick={handleBulkReschedule}
                    className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm text-secondary-600 hover:bg-secondary-50 transition-colors"
                  >
                    Reschedule
                  </button>
                  <button
                    onClick={handleBulkCancel}
                    className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* List view */}
            {view === 'list' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Meetings list */}
                <div className="space-y-4">
                  {mockMeetings.length === 0 ? (
                    <NoMeetingsState onSchedule={() => setShowScheduleModal(true)} />
                  ) : mockMeetings
                    .filter(meeting => {
                      if (filter === 'all') return true;
                      if (filter === 'interviews') return meeting.type === 'interview';
                      if (filter === 'team') return meeting.type === 'team';
                      return true;
                    })
                    .map(meeting => (
                      <MeetingCard
                        key={meeting.id}
                        meeting={meeting}
                        onSelect={setSelectedMeeting}
                        isSelected={selectedMeeting?.id === meeting.id || selectedMeetings.has(meeting.id)}
                        onToggleSelect={toggleMeetingSelection}
                        isSelectable={view === 'list'}
                      />
                    ))}
                </div>
                {/* Meeting details */}
                {selectedMeeting && (
                  <div className="bg-white rounded-xl border border-neutral-100 shadow-sm">
                    <div className="border-b border-neutral-100 p-6">
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <h2 className="text-xl font-display text-neutral-900 mb-2">
                            {selectedMeeting.title}
                          </h2>
                          {selectedMeeting.candidateName && (
                            <p className="text-neutral-600">
                              {selectedMeeting.candidateName} • {selectedMeeting.role}
                            </p>
                          )}
                        </div>
                        <StatusBadge status={selectedMeeting.status} />
                      </div>

                      {/* Date and time */}
                      <div className="flex items-center space-x-6 text-neutral-600">
                        <div className="flex items-center space-x-2">
                          <CalendarIcon className="h-5 w-5 text-neutral-400" />
                          <span>
                            {new Date(selectedMeeting.date).toLocaleDateString('en-US', {
                              weekday: 'long',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <ClockIcon className="h-5 w-5 text-neutral-400" />
                          <span>
                            {new Date(selectedMeeting.date).toLocaleTimeString('en-US', {
                              hour: 'numeric',
                              minute: '2-digit',
                              hour12: true,
                            })}
                            {' '}• {selectedMeeting.duration} minutes
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 space-y-6">
                      {/* Meeting link */}
                      <div className="bg-primary-50 rounded-xl p-4">
                        <h3 className="text-sm font-medium text-neutral-900 mb-3">Meeting Link</h3>
                        <div className="flex items-center space-x-3">
                          <VideoCameraIcon className="h-5 w-5 text-primary-500" />
                          <a
                            href={selectedMeeting.meetingLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-600 hover:text-primary-700 font-medium"
                          >
                            {selectedMeeting.meetingLink}
                          </a>
                        </div>
                      </div>

                      {/* Participants */}
                      <div>
                        <h3 className="text-sm font-medium text-neutral-900 mb-3">Participants</h3>
                        <ul className="divide-y divide-neutral-100">
                          {selectedMeeting.participants.map((participant, index) => (
                            <li key={index} className="flex items-center space-x-3 py-2 first:pt-0 last:pb-0">
                              <UserGroupIcon className="h-5 w-5 text-neutral-400" />
                              <span className="text-neutral-600">{participant}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* AI Assistant suggestions */}
                      <div className="bg-neutral-50 rounded-xl p-4">
                        <h3 className="text-sm font-medium text-neutral-900 mb-3 flex items-center">
                          <span className="bg-secondary-100 text-secondary-600 px-2 py-0.5 rounded text-xs mr-2">AI</span>
                          Suggestions
                        </h3>
                        <ul className="space-y-3 text-sm text-neutral-600">
                          <li className="flex items-start">
                            <span className="mr-3 text-secondary-500">•</span>
                            <span>Generate interview questions based on the candidate's profile and role requirements</span>
                          </li>
                          <li className="flex items-start">
                            <span className="mr-3 text-secondary-500">•</span>
                            <span>Send automated reminder 24 hours before the interview</span>
                          </li>
                          <li className="flex items-start">
                            <span className="mr-3 text-secondary-500">•</span>
                            <span>Create meeting minutes template for note-taking during the interview</span>
                          </li>
                        </ul>
                      </div>

                      {/* Action buttons */}
                      {selectedMeeting.status === 'Scheduled' && (
                        <div className="flex items-center space-x-3 pt-2">
                          <button className="flex-1 bg-primary-500 text-white px-4 py-2.5 rounded-xl hover:bg-primary-600 transition-colors font-medium">
                            Join Meeting
                          </button>
                          <button 
                            onClick={() => handleReschedule(selectedMeeting)}
                            className="flex-1 bg-secondary-50 text-secondary-600 px-4 py-2.5 rounded-xl hover:bg-secondary-100 transition-colors font-medium"
                          >
                            Reschedule
                          </button>
                          <button 
                            onClick={() => {
                              setMeetingToCancel(selectedMeeting);
                              setShowCancelModal(true);
                            }}
                            className="flex-1 bg-red-50 text-red-600 px-4 py-2.5 rounded-xl hover:bg-red-100 transition-colors font-medium"
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Schedule Meeting Modal */}
      <ScheduleMeetingModal
        isOpen={showScheduleModal}
        onClose={() => setShowScheduleModal(false)}
        onSchedule={handleScheduleMeeting}
      />

      {/* Reschedule Meeting Modal */}
      <RescheduleModal
        isOpen={showRescheduleModal}
        onClose={() => {
          setShowRescheduleModal(false);
          setMeetingToReschedule(null);
        }}
        meeting={meetingToReschedule}
        onReschedule={handleRescheduleSubmit}
      />

      {/* Cancel Meeting Modal */}
      <CancelMeetingModal
        isOpen={showCancelModal}
        onClose={() => {
          setShowCancelModal(false);
          setMeetingToCancel(null);
        }}
        meeting={meetingToCancel}
        onConfirm={(meeting) => {
          const meetingIndex = mockMeetings.findIndex(m => m.id === meeting.id);
          if (meetingIndex !== -1) {
            mockMeetings[meetingIndex] = { ...meeting, status: 'Canceled' };
            if (selectedMeeting?.id === meeting.id) {
              setSelectedMeeting({ ...meeting, status: 'Canceled' });
            }
          }
          setShowCancelModal(false);
          setMeetingToCancel(null);
        }}
      />
    </div>
  );
}