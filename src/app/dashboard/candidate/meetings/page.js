/**
 * File: src/app/dashboard/candidate/meetings/page.js
 * 
 * tomiwa: Comprehensive Meetings/Interviews Page for Candidates
 * Features calendar view, list view, AI assistant, and interview management
 */

'use client';

import { useState, useMemo } from 'react';
import CandidateDashboardLayout from '@/components/layouts/CandidateDashboardLayout.jsx';
import Calendar from '@/components/ui/Calendar';
import InterviewDetailsModal from '@/components/ui/modals/InterviewDetailsModal';
import { Card } from '@/components/ui/Card.jsx';
import {
  CalendarIcon,
  SparklesIcon,
  VideoCameraIcon,
  UserGroupIcon,
  ClockIcon,
  MapPinIcon,
  PhoneIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  PlusIcon,
  FunnelIcon,
  Squares2X2Icon,
  ListBulletIcon,
  ChatBubbleLeftRightIcon,
  LightBulbIcon,
  BookOpenIcon,
  MicrophoneIcon,
  EyeIcon,
  PencilIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

export default function Meetings() {
  // tomiwa: State management for view and filters
  const [view, setView] = useState('calendar'); // 'calendar' or 'list'
  const [calendarView, setCalendarView] = useState('month'); // 'month' or 'week'
  const [showAiAssistant, setShowAiAssistant] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // tomiwa: State for interview details modal
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [showInterviewDetails, setShowInterviewDetails] = useState(false);

  // tomiwa: Sample meeting data - in real app, this would come from API
  const sampleMeetings = [
    {
      id: 1,
      title: 'Technical Interview - Frontend Developer',
      company: 'TechCorp Solutions',
      role: 'Senior Frontend Developer',
      type: 'interview',
      status: 'Scheduled',
      date: new Date(2024, 11, 20, 14, 0), // December 20, 2024, 2:00 PM
      duration: 60,
      format: 'video',
      location: 'Google Meet',
      meetingLink: 'https://meet.google.com/abc-defg-hij',
      interviewer: 'Sarah Johnson',
      interviewerRole: 'Senior Engineering Manager',
      description: 'Technical interview focusing on React, TypeScript, and system design',
      participants: ['Sarah Johnson', 'Mike Chen'],
      preparationMaterials: ['Company overview', 'Technical requirements', 'Sample coding challenges'],
      candidateName: null // For candidate view, this would be null
    },
    {
      id: 2,
      title: 'HR Screening Call',
      company: 'StartupXYZ',
      role: 'Product Manager',
      type: 'interview',
      status: 'Completed',
      date: new Date(2024, 11, 18, 10, 30), // December 18, 2024, 10:30 AM
      duration: 30,
      format: 'phone',
      location: 'Phone Call',
      interviewer: 'Jennifer Smith',
      interviewerRole: 'HR Manager',
      description: 'Initial screening to discuss background and role expectations',
      participants: ['Jennifer Smith'],
      preparationMaterials: ['Resume review', 'Company culture guide'],
      candidateName: null
    },
    {
      id: 3,
      title: 'Final Round Interview',
      company: 'Enterprise Corp',
      role: 'UX Designer',
      type: 'interview',
      status: 'Scheduled',
      date: new Date(2024, 11, 22, 15, 30), // December 22, 2024, 3:30 PM
      duration: 90,
      format: 'video',
      location: 'Zoom',
      meetingLink: 'https://zoom.us/j/123456789',
      interviewer: 'David Wilson',
      interviewerRole: 'Design Director',
      description: 'Portfolio presentation and design challenge discussion',
      participants: ['David Wilson', 'Lisa Park', 'Tom Anderson'],
      preparationMaterials: ['Portfolio guidelines', 'Design challenge brief', 'Company design system'],
      candidateName: null
    },
    {
      id: 4,
      title: 'Team Meet & Greet',
      company: 'TechCorp Solutions',
      role: 'Senior Frontend Developer',
      type: 'meeting',
      status: 'Scheduled',
      date: new Date(2024, 11, 25, 11, 0), // December 25, 2024, 11:00 AM
      duration: 45,
      format: 'video',
      location: 'Microsoft Teams',
      meetingLink: 'https://teams.microsoft.com/l/meetup-join/...',
      interviewer: 'Development Team',
      interviewerRole: 'Team Members',
      description: 'Informal meeting with potential team members',
      participants: ['Alex Rodriguez', 'Emma Thompson', 'James Liu'],
      preparationMaterials: ['Team introduction', 'Project overview'],
      candidateName: null
    },
    {
      id: 5,
      title: 'Behavioral Interview',
      company: 'GrowthCo',
      role: 'Marketing Manager',
      type: 'interview',
      status: 'Rescheduled',
      date: new Date(2024, 11, 24, 13, 0), // December 24, 2024, 1:00 PM
      duration: 60,
      format: 'video',
      location: 'Google Meet',
      meetingLink: 'https://meet.google.com/xyz-uvwx-rst',
      interviewer: 'Rachel Green',
      interviewerRole: 'VP of Marketing',
      description: 'Behavioral interview focusing on leadership and team collaboration',
      participants: ['Rachel Green', 'Kevin Brown'],
      preparationMaterials: ['STAR method guide', 'Company values', 'Role expectations'],
      candidateName: null
    }
  ];

  // tomiwa: Filter meetings based on selected filters and search
  const filteredMeetings = useMemo(() => {
    return sampleMeetings.filter(meeting => {
      const matchesStatus = selectedStatus === 'all' || meeting.status.toLowerCase() === selectedStatus.toLowerCase();
      const matchesType = selectedType === 'all' || meeting.type === selectedType;
      const matchesSearch = searchQuery === '' || 
        meeting.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        meeting.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        meeting.role.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesStatus && matchesType && matchesSearch;
    });
  }, [sampleMeetings, selectedStatus, selectedType, searchQuery]);

  // tomiwa: Get upcoming meetings for quick stats
  const upcomingMeetings = filteredMeetings.filter(meeting => 
    new Date(meeting.date) > new Date() && meeting.status !== 'Canceled'
  );

  // tomiwa: Handle meeting selection
  const handleSelectMeeting = (meeting) => {
    console.log('Selected meeting:', meeting);
  };

  // tomiwa: Handle meeting rescheduling
  const handleRescheduleMeeting = (meeting) => {
    console.log('Reschedule meeting:', meeting);
  };

  // tomiwa: Handle meeting cancellation
  const handleCancelMeeting = (meeting) => {
    console.log('Cancel meeting:', meeting);
  };

  // tomiwa: Handle view details button click
  const handleViewDetails = (meeting) => {
    setSelectedInterview(meeting);
    setShowInterviewDetails(true);
  };

  // tomiwa: Handle closing interview details modal
  const handleCloseInterviewDetails = () => {
    setShowInterviewDetails(false);
    setSelectedInterview(null);
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
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        <IconComponent className="w-3 h-3" />
        {status}
      </span>
    );
  };

  // tomiwa: Meeting card component for list view
  const MeetingCard = ({ meeting }) => {
    const isUpcoming = new Date(meeting.date) > new Date();
    const formatDate = (date) => {
      return new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      }).format(date);
    };

    const getFormatIcon = (format) => {
      switch (format) {
        case 'video': return VideoCameraIcon;
        case 'phone': return PhoneIcon;
        case 'in-person': return MapPinIcon;
        default: return VideoCameraIcon;
      }
    };

    const FormatIcon = getFormatIcon(meeting.format);

    return (
      <Card className="p-6 hover:shadow-md transition-all duration-200">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          {/* tomiwa: Main meeting info */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-3">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  meeting.type === 'interview' ? 'bg-primary-50' : 'bg-secondary-50'
                }`}>
                  {meeting.type === 'interview' ? (
                    <VideoCameraIcon className={`w-6 h-6 ${
                      meeting.type === 'interview' ? 'text-primary-600' : 'text-secondary-600'
                    }`} />
                  ) : (
                    <UserGroupIcon className="w-6 h-6 text-secondary-600" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-neutral-900 mb-1">{meeting.title}</h3>
                  <p className="text-neutral-600 mb-2">{meeting.company} • {meeting.role}</p>
                  <div className="flex items-center gap-4 text-sm text-neutral-500">
                    <div className="flex items-center gap-1">
                      <ClockIcon className="w-4 h-4" />
                      {formatDate(meeting.date)}
                    </div>
                    <div className="flex items-center gap-1">
                      <FormatIcon className="w-4 h-4" />
                      {meeting.duration} min • {meeting.format}
                    </div>
                  </div>
                </div>
              </div>
              <StatusBadge status={meeting.status} />
            </div>

            {/* tomiwa: Meeting details */}
            <div className="bg-neutral-50 rounded-lg p-4 mb-4">
              <p className="text-sm text-neutral-700 mb-3">{meeting.description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-neutral-900">Interviewer:</span>
                  <p className="text-neutral-600">{meeting.interviewer} • {meeting.interviewerRole}</p>
                </div>
                <div>
                  <span className="font-medium text-neutral-900">Participants:</span>
                  <p className="text-neutral-600">{meeting.participants.length} people</p>
                </div>
              </div>
            </div>

            {/* tomiwa: Preparation materials */}
            {meeting.preparationMaterials && meeting.preparationMaterials.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-neutral-900 mb-2">Preparation Materials:</h4>
                <div className="flex flex-wrap gap-2">
                  {meeting.preparationMaterials.map((material, index) => (
                    <span key={index} className="inline-flex items-center gap-1 px-2 py-1 bg-brand-aqua/10 text-brand-aqua text-xs rounded-full">
                      <DocumentTextIcon className="w-3 h-3" />
                      {material}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* tomiwa: Action buttons */}
          <div className="flex flex-col gap-2 lg:w-48">
            {isUpcoming && meeting.status === 'Scheduled' && (
              <>
                {meeting.meetingLink && (
                  <button className="w-full px-4 py-2 bg-brand-aqua text-white text-sm font-medium rounded-lg hover:bg-primary-600 transition-colors">
                    Join Meeting
                  </button>
                )}
                <button className="w-full px-4 py-2 bg-neutral-100 text-neutral-700 text-sm font-medium rounded-lg hover:bg-neutral-200 transition-colors">
                  Reschedule
                </button>
                <button className="w-full px-4 py-2 bg-red-50 text-red-600 text-sm font-medium rounded-lg hover:bg-red-100 transition-colors">
                  Cancel
                </button>
              </>
            )}
            {meeting.status === 'Completed' && (
              <button className="w-full px-4 py-2 bg-emerald-50 text-emerald-600 text-sm font-medium rounded-lg hover:bg-emerald-100 transition-colors">
                View Notes
              </button>
            )}
            <button 
              onClick={() => handleViewDetails(meeting)}
              className="w-full px-4 py-2 bg-neutral-50 text-neutral-600 text-sm font-medium rounded-lg hover:bg-neutral-100 transition-colors"
            >
              View Details
            </button>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <CandidateDashboardLayout>
      {/* tomiwa: Hero Banner with responsive padding */}
      <div className="bg-gradient-to-r from-brand-aqua to-[#0C5B65] -mt-8 -mx-6 mb-8">
        <div className="px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20 py-10 sm:py-12 md:py-14 lg:py-16">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-6">
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-2">
                Meetings & Interviews
              </h1>
              <p className="text-white/90 text-base sm:text-lg md:text-lg lg:text-xl leading-relaxed max-w-2xl">
                Manage your scheduled interviews and meetings with AI-powered assistance
              </p>
            </div>
            
            {/* tomiwa: Header actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowAiAssistant(!showAiAssistant)}
                className={`inline-flex items-center gap-2 px-4 py-2 font-semibold rounded-lg transition-colors ${
                  showAiAssistant 
                    ? 'bg-brand-yellow text-brand-black' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <SparklesIcon className="w-5 h-5" />
                AI Assistant
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* tomiwa: Main content with responsive padding */}
      <div className="px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20 pb-12">
        
        {/* tomiwa: Quick stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                <CalendarIcon className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-neutral-900">{upcomingMeetings.length}</p>
                <p className="text-sm text-neutral-600">Upcoming</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <CheckCircleIcon className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-neutral-900">
                  {filteredMeetings.filter(m => m.status === 'Completed').length}
                </p>
                <p className="text-sm text-neutral-600">Completed</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center">
                <VideoCameraIcon className="w-5 h-5 text-secondary-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-neutral-900">
                  {filteredMeetings.filter(m => m.type === 'interview').length}
                </p>
                <p className="text-sm text-neutral-600">Interviews</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center">
                <UserGroupIcon className="w-5 h-5 text-accent-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-neutral-900">
                  {filteredMeetings.filter(m => m.type === 'meeting').length}
                </p>
                <p className="text-sm text-neutral-600">Meetings</p>
              </div>
            </div>
          </Card>
        </div>

        {/* tomiwa: AI Assistant Panel */}
        {showAiAssistant && (
          <div className="mb-8">
            <Card className="overflow-hidden">
              <div className="bg-gradient-to-r from-brand-yellow to-brand-orange p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <SparklesIcon className="w-6 h-6 text-brand-black" />
                  </div>
                  <div>
                    <h2 className="text-xl font-display font-bold text-brand-black">AI Meeting Assistant</h2>
                    <p className="text-brand-black/80">Get personalized help with interview preparation and scheduling</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <button className="text-left p-4 border border-neutral-200 rounded-lg hover:border-brand-aqua hover:bg-brand-aqua/5 transition-all group">
                    <div className="flex items-start gap-3">
                      <MicrophoneIcon className="w-6 h-6 text-brand-aqua mt-1" />
                      <div>
                        <h3 className="font-semibold text-neutral-900 mb-1">Interview Prep</h3>
                        <p className="text-sm text-neutral-600">Get AI-powered practice questions and tips</p>
                      </div>
                    </div>
                  </button>
                  
                  <button className="text-left p-4 border border-neutral-200 rounded-lg hover:border-brand-aqua hover:bg-brand-aqua/5 transition-all group">
                    <div className="flex items-start gap-3">
                      <BookOpenIcon className="w-6 h-6 text-brand-aqua mt-1" />
                      <div>
                        <h3 className="font-semibold text-neutral-900 mb-1">Company Research</h3>
                        <p className="text-sm text-neutral-600">AI-generated company insights and culture notes</p>
                      </div>
                    </div>
                  </button>
                  
                  <button className="text-left p-4 border border-neutral-200 rounded-lg hover:border-brand-aqua hover:bg-brand-aqua/5 transition-all group">
                    <div className="flex items-start gap-3">
                      <ChatBubbleLeftRightIcon className="w-6 h-6 text-brand-aqua mt-1" />
                      <div>
                        <h3 className="font-semibold text-neutral-900 mb-1">Question Generator</h3>
                        <p className="text-sm text-neutral-600">Smart questions to ask your interviewer</p>
                      </div>
                    </div>
                  </button>
                  
                  <button className="text-left p-4 border border-neutral-200 rounded-lg hover:border-brand-aqua hover:bg-brand-aqua/5 transition-all group">
                    <div className="flex items-start gap-3">
                      <LightBulbIcon className="w-6 h-6 text-brand-aqua mt-1" />
                      <div>
                        <h3 className="font-semibold text-neutral-900 mb-1">Follow-up Tips</h3>
                        <p className="text-sm text-neutral-600">AI suggestions for post-interview actions</p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* tomiwa: Controls bar */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          {/* tomiwa: Search and filters */}
          <div className="flex flex-col sm:flex-row gap-3 flex-1">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search meetings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-4 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-brand-aqua focus:border-transparent"
              />
            </div>
            
            <div className="flex gap-2">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-brand-aqua focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="scheduled">Scheduled</option>
                <option value="completed">Completed</option>
                <option value="rescheduled">Rescheduled</option>
                <option value="canceled">Canceled</option>
              </select>
              
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-brand-aqua focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="interview">Interviews</option>
                <option value="meeting">Meetings</option>
              </select>
            </div>
          </div>

          {/* tomiwa: View toggles */}
          <div className="flex items-center gap-2">
            <div className="flex bg-neutral-100 rounded-lg p-1">
              <button
                onClick={() => setView('calendar')}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  view === 'calendar' 
                    ? 'bg-white text-neutral-900 shadow-sm' 
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <CalendarIcon className="w-4 h-4 inline mr-1" />
                Calendar
              </button>
              <button
                onClick={() => setView('list')}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  view === 'list' 
                    ? 'bg-white text-neutral-900 shadow-sm' 
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <ListBulletIcon className="w-4 h-4 inline mr-1" />
                List
              </button>
            </div>
            
            {view === 'calendar' && (
              <div className="flex bg-neutral-100 rounded-lg p-1">
                <button
                  onClick={() => setCalendarView('month')}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                    calendarView === 'month' 
                      ? 'bg-white text-neutral-900 shadow-sm' 
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  Month
                </button>
                <button
                  onClick={() => setCalendarView('week')}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                    calendarView === 'week' 
                      ? 'bg-white text-neutral-900 shadow-sm' 
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  Week
                </button>
              </div>
            )}
          </div>
        </div>

        {/* tomiwa: Main content area */}
        {view === 'calendar' ? (
          <Calendar
            meetings={filteredMeetings}
            view={calendarView}
            onSelectMeeting={handleSelectMeeting}
            onRescheduleMeeting={handleRescheduleMeeting}
            onCancelMeeting={handleCancelMeeting}
          />
        ) : (
          <div className="space-y-4">
            {filteredMeetings.length > 0 ? (
              filteredMeetings
                .sort((a, b) => new Date(a.date) - new Date(b.date))
                .map((meeting) => (
                  <MeetingCard key={meeting.id} meeting={meeting} />
                ))
            ) : (
              <Card className="p-12 text-center">
                <CalendarIcon className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">No meetings found</h3>
                <p className="text-neutral-600 mb-4">
                  {searchQuery || selectedStatus !== 'all' || selectedType !== 'all'
                    ? 'Try adjusting your filters or search terms.'
                    : 'You don\'t have any scheduled meetings yet.'}
                </p>
                <button className="inline-flex items-center gap-2 px-4 py-2 bg-brand-aqua text-white font-medium rounded-lg hover:bg-primary-600 transition-colors">
                  <PlusIcon className="w-4 h-4" />
                  Schedule Meeting
                </button>
              </Card>
            )}
          </div>
        )}
      </div>

      {/* tomiwa: Interview Details Modal */}
      <InterviewDetailsModal
        isOpen={showInterviewDetails}
        onClose={handleCloseInterviewDetails}
        interview={selectedInterview}
      />
    </CandidateDashboardLayout>
  );
}


