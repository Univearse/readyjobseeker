'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

// tomiwa: Meeting Selection Modal component for AI Interview Assistant
// This modal displays upcoming interviews and allows users to select which meeting to join with AI assistance
export default function MeetingSelectionModal({ isOpen, onClose, onJoinMeeting }) {
  // tomiwa: State management for modal functionality
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'calendar'
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [isJoining, setIsJoining] = useState(false);

  // tomiwa: Mock data for upcoming interviews - in real app this would come from calendar API
  const [upcomingInterviews] = useState([
    {
      id: 1,
      candidateName: 'John Smith',
      role: 'Frontend Developer',
      date: '2025-10-08',
      time: '10:00 AM',
      duration: '45 min',
      platform: 'Zoom',
      meetingUrl: 'https://zoom.us/j/123456789',
      interviewType: 'Technical Interview',
      status: 'scheduled',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      notes: 'Focus on React performance optimization and system design'
    },
    {
      id: 2,
      candidateName: 'Sarah Johnson',
      role: 'UX Designer',
      date: '2025-10-08',
      time: '2:00 PM',
      duration: '30 min',
      platform: 'Google Meet',
      meetingUrl: 'https://meet.google.com/abc-defg-hij',
      interviewType: 'Portfolio Review',
      status: 'scheduled',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      notes: 'Review design portfolio and discuss user research approach'
    },
    {
      id: 3,
      candidateName: 'Michael Chen',
      role: 'Product Manager',
      date: '2025-10-09',
      time: '11:30 AM',
      duration: '60 min',
      platform: 'Zoom',
      meetingUrl: 'https://zoom.us/j/987654321',
      interviewType: 'Final Interview',
      status: 'scheduled',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      notes: 'Final round - culture fit and leadership discussion'
    },
    {
      id: 4,
      candidateName: 'Emily Rodriguez',
      role: 'Data Scientist',
      date: '2025-10-09',
      time: '3:30 PM',
      duration: '45 min',
      platform: 'Google Meet',
      meetingUrl: 'https://meet.google.com/xyz-uvwx-rst',
      interviewType: 'Technical Assessment',
      status: 'scheduled',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      notes: 'Machine learning algorithms and data analysis case study'
    },
    {
      id: 5,
      candidateName: 'David Kim',
      role: 'Backend Developer',
      date: '2025-10-10',
      time: '9:00 AM',
      duration: '50 min',
      platform: 'Zoom',
      meetingUrl: 'https://zoom.us/j/456789123',
      interviewType: 'System Design',
      status: 'scheduled',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      notes: 'Scalable architecture design and database optimization'
    }
  ]);

  // tomiwa: Filter interviews based on search term and selected date
  const filteredInterviews = upcomingInterviews.filter(interview => {
    const matchesSearch = interview.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         interview.role.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (viewMode === 'calendar') {
      const interviewDate = new Date(interview.date);
      const selectedDateStr = selectedDate.toISOString().split('T')[0];
      return matchesSearch && interview.date === selectedDateStr;
    }
    
    return matchesSearch;
  });

  // tomiwa: Handle joining meeting with AI assistant
  const handleJoinWithAI = async (meeting) => {
    setIsJoining(true);
    setSelectedMeeting(meeting);
    
    // tomiwa: Simulate AI assistant activation
    setTimeout(() => {
      setIsJoining(false);
      onJoinMeeting(meeting);
      onClose();
    }, 2000);
  };

  // tomiwa: Get platform icon and color
  const getPlatformInfo = (platform) => {
    switch (platform) {
      case 'Zoom':
        return {
          color: 'bg-blue-500',
          textColor: 'text-blue-600',
          bgColor: 'bg-blue-50'
        };
      case 'Google Meet':
        return {
          color: 'bg-green-500',
          textColor: 'text-green-600',
          bgColor: 'bg-green-50'
        };
      default:
        return {
          color: 'bg-neutral-500',
          textColor: 'text-neutral-600',
          bgColor: 'bg-neutral-50'
        };
    }
  };

  // tomiwa: Generate calendar grid for calendar view
  const generateCalendarDays = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // tomiwa: Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // tomiwa: Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayInterviews = upcomingInterviews.filter(interview => interview.date === dateStr);
      days.push({ day, dateStr, interviews: dayInterviews });
    }
    
    return days;
  };

  // tomiwa: Format date for display
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // tomiwa: Reset modal state when closed
  useEffect(() => {
    if (!isOpen) {
      setSearchTerm('');
      setSelectedMeeting(null);
      setIsJoining(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* tomiwa: Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-200">
          <div>
            <h2 className="font-display text-2xl text-brand-black">Select Interview Meeting</h2>
            <p className="text-neutral-600 mt-1">Choose an upcoming interview to join with AI assistance</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* tomiwa: View Mode Toggle and Search */}
        <div className="p-6 border-b border-neutral-200">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            {/* tomiwa: View Mode Toggle */}
            <div className="flex bg-neutral-100 rounded-xl p-1">
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  viewMode === 'list'
                    ? 'bg-white text-brand-black shadow-sm'
                    : 'text-neutral-600 hover:text-brand-black'
                }`}
              >
                List View
              </button>
              <button
                onClick={() => setViewMode('calendar')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  viewMode === 'calendar'
                    ? 'bg-white text-brand-black shadow-sm'
                    : 'text-neutral-600 hover:text-brand-black'
                }`}
              >
                Calendar View
              </button>
            </div>

            {/* tomiwa: Search Input */}
            <div className="relative w-full sm:w-80">
              <input
                type="text"
                placeholder="Search by candidate name or role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-brand-orange focus:border-transparent"
              />
              <svg className="absolute left-3 top-2.5 w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* tomiwa: Content Area */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {viewMode === 'list' ? (
            /* tomiwa: List View */
            <div className="space-y-4">
              {filteredInterviews.length > 0 ? (
                filteredInterviews.map((interview) => {
                  const platformInfo = getPlatformInfo(interview.platform);
                  
                  return (
                    <div
                      key={interview.id}
                      className="border border-neutral-200 rounded-xl p-4 hover:border-brand-orange transition-colors cursor-pointer group"
                      onClick={() => setSelectedMeeting(interview)}
                    >
                      <div className="flex items-start gap-4">
                        {/* tomiwa: Candidate Avatar */}
                        <div className="relative">
                          <img
                            src={interview.avatar}
                            alt={interview.candidateName}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${platformInfo.color} rounded-full flex items-center justify-center`}>
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        </div>

                        {/* tomiwa: Interview Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold text-brand-black group-hover:text-brand-orange transition-colors">
                                {interview.candidateName}
                              </h3>
                              <p className="text-neutral-600 text-sm">{interview.role}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium text-brand-black">{formatDate(interview.date)}</p>
                              <p className="text-sm text-neutral-600">{interview.time}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 mb-3">
                            <div className={`px-2 py-1 ${platformInfo.bgColor} ${platformInfo.textColor} text-xs font-medium rounded-full`}>
                              {interview.platform}
                            </div>
                            <span className="text-xs text-neutral-500">{interview.duration}</span>
                            <span className="text-xs text-neutral-500">{interview.interviewType}</span>
                          </div>

                          {interview.notes && (
                            <p className="text-sm text-neutral-600 mb-3">{interview.notes}</p>
                          )}

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 bg-brand-aqua rounded-full"></span>
                              <span className="text-xs text-neutral-600">AI Assistant Ready</span>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleJoinWithAI(interview);
                              }}
                              disabled={isJoining && selectedMeeting?.id === interview.id}
                              className="px-4 py-2 bg-brand-orange text-white text-sm font-medium rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {isJoining && selectedMeeting?.id === interview.id ? (
                                <div className="flex items-center gap-2">
                                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                  Joining...
                                </div>
                              ) : (
                                'Join with AI Assistant'
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-neutral-600">No interviews found matching your search</p>
                  <p className="text-neutral-500 text-sm mt-1">Try adjusting your search terms</p>
                </div>
              )}
            </div>
          ) : (
            /* tomiwa: Calendar View */
            <div>
              {/* tomiwa: Calendar Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-brand-black text-lg">
                  {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1))}
                    className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1))}
                    className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* tomiwa: Calendar Grid */}
              <div className="grid grid-cols-7 gap-1 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="p-2 text-center text-sm font-medium text-neutral-600">
                    {day}
                  </div>
                ))}
                {generateCalendarDays().map((dayData, index) => (
                  <div
                    key={index}
                    className={`min-h-[80px] p-1 border border-neutral-200 rounded-lg ${
                      dayData ? 'hover:bg-neutral-50 cursor-pointer' : ''
                    }`}
                    onClick={() => dayData && dayData.interviews.length > 0 && setSelectedDate(new Date(dayData.dateStr))}
                  >
                    {dayData && (
                      <>
                        <div className="text-sm font-medium text-neutral-700 mb-1">
                          {dayData.day}
                        </div>
                        {dayData.interviews.map((interview, idx) => (
                          <div
                            key={idx}
                            className="text-xs bg-brand-orange text-white p-1 rounded mb-1 truncate"
                            title={`${interview.candidateName} - ${interview.time}`}
                          >
                            {interview.time}
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                ))}
              </div>

              {/* tomiwa: Selected Date Interviews */}
              {filteredInterviews.length > 0 && (
                <div className="border-t border-neutral-200 pt-4">
                  <h4 className="font-medium text-brand-black mb-3">
                    Interviews on {formatDate(selectedDate.toISOString().split('T')[0])}
                  </h4>
                  <div className="space-y-3">
                    {filteredInterviews.map((interview) => {
                      const platformInfo = getPlatformInfo(interview.platform);
                      
                      return (
                        <div
                          key={interview.id}
                          className="flex items-center justify-between p-3 border border-neutral-200 rounded-lg hover:border-brand-orange transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={interview.avatar}
                              alt={interview.candidateName}
                              className="w-8 h-8 rounded-full object-cover"
                            />
                            <div>
                              <p className="font-medium text-brand-black text-sm">{interview.candidateName}</p>
                              <p className="text-xs text-neutral-600">{interview.time} • {interview.platform}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => handleJoinWithAI(interview)}
                            disabled={isJoining && selectedMeeting?.id === interview.id}
                            className="px-3 py-1 bg-brand-orange text-white text-xs font-medium rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50"
                          >
                            {isJoining && selectedMeeting?.id === interview.id ? 'Joining...' : 'Join'}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* tomiwa: Modal Footer */}
        <div className="flex items-center justify-between p-6 border-t border-neutral-200 bg-neutral-50">
          <div className="flex items-center gap-2 text-sm text-neutral-600">
            <div className="w-2 h-2 bg-brand-aqua rounded-full"></div>
            <span>AI Assistant will automatically activate for note-taking and real-time guidance</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 text-neutral-600 hover:text-brand-black transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
