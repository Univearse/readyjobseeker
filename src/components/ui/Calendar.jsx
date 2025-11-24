'use client';

import { useState, useMemo } from 'react';
import {
  format,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  addWeeks,
  subWeeks,
  isToday as isDateToday,
} from 'date-fns';
import { VideoCameraIcon, UserGroupIcon, ClockIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import MeetingDetailsPopup from './modals/MeetingDetailsPopup';
import CancelMeetingModal from './modals/CancelMeetingModal';

// tomiwa: Helper function to group meetings by date
const groupMeetingsByDate = (meetings) => {
  const grouped = {};
  meetings.forEach(meeting => {
    const date = format(new Date(meeting.date), 'yyyy-MM-dd');
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(meeting);
  });
  return grouped;
};

export default function Calendar({ meetings, view, onSelectMeeting, onRescheduleMeeting, onCancelMeeting }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [hoveredDate, setHoveredDate] = useState(null);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [showDetailsPopup, setShowDetailsPopup] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [meetingToCancel, setMeetingToCancel] = useState(null);

  // tomiwa: Calculate calendar days based on view
  const calendarDays = useMemo(() => {
    if (view === 'week') {
      return eachDayOfInterval({
        start: startOfWeek(currentDate, { weekStartsOn: 1 }),
        end: endOfWeek(currentDate, { weekStartsOn: 1 }),
      });
    } else {
      return eachDayOfInterval({
        start: startOfMonth(currentDate),
        end: endOfMonth(currentDate),
      });
    }
  }, [currentDate, view]);

  // tomiwa: Group meetings by date
  const meetingsByDate = useMemo(() => {
    return groupMeetingsByDate(meetings);
  }, [meetings]);

  // tomiwa: Navigation handlers
  const handlePrevious = () => {
    if (view === 'week') {
      setCurrentDate(subWeeks(currentDate, 1));
    } else {
      setCurrentDate(subMonths(currentDate, 1));
    }
  };

  const handleNext = () => {
    if (view === 'week') {
      setCurrentDate(addWeeks(currentDate, 1));
    } else {
      setCurrentDate(addMonths(currentDate, 1));
    }
  };

  // tomiwa: Meeting card preview component with time and status
  const MeetingPreview = ({ meeting }) => {
    const meetingTime = new Date(meeting.date).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });

    const statusColors = {
      Scheduled: 'bg-primary-100 text-primary-700',
      Completed: 'bg-neutral-100 text-neutral-700',
      Rescheduled: 'bg-secondary-100 text-secondary-700',
      Canceled: 'bg-red-100 text-red-700'
    };

    return (
      <div 
        className={`group relative flex flex-col p-2 rounded-lg cursor-pointer transition-all
          ${meeting.type === 'interview' ? 'bg-primary-50 hover:bg-primary-100' : 'bg-secondary-50 hover:bg-secondary-100'}`}
        onClick={() => {
        setSelectedMeeting(meeting);
        setShowDetailsPopup(true);
        onSelectMeeting(meeting);
      }}
      >
        {/* Meeting Time */}
        <div className="flex items-center space-x-1.5 mb-1">
          <ClockIcon className="h-3.5 w-3.5 text-neutral-500" />
          <span className="text-xs text-neutral-600">{meetingTime}</span>
        </div>

        {/* Meeting Title and Icon */}
        <div className="flex items-start space-x-2">
          <div className={`mt-0.5 ${meeting.type === 'interview' ? 'text-primary-600' : 'text-secondary-600'}`}>
            {meeting.type === 'interview' ? (
              <VideoCameraIcon className="h-4 w-4 flex-shrink-0" />
            ) : (
              <UserGroupIcon className="h-4 w-4 flex-shrink-0" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-medium text-neutral-900 truncate">{meeting.title}</h4>
            {meeting.candidateName && (
              <p className="text-xs text-neutral-600 truncate">{meeting.candidateName}</p>
            )}
          </div>
        </div>

        {/* Status Badge */}
        <div className={`absolute top-1 right-1 px-1.5 py-0.5 rounded text-xs font-medium ${statusColors[meeting.status]}`}>
          {meeting.status}
        </div>

        {/* Hover Details */}
        <div className="absolute inset-0 bg-white rounded-lg shadow-lg p-3 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-900">{meetingTime}</span>
              <span className={`text-xs font-medium ${statusColors[meeting.status]}`}>{meeting.status}</span>
            </div>
            <h4 className="text-sm font-medium text-neutral-900">{meeting.title}</h4>
            {meeting.candidateName && (
              <p className="text-xs text-neutral-600">{meeting.candidateName} • {meeting.role}</p>
            )}
            <div className="text-xs text-neutral-500">
              {meeting.duration} minutes • {meeting.participants.length} participants
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl border border-neutral-200">
      {/* Meeting Details Popup */}
      <MeetingDetailsPopup
        isOpen={showDetailsPopup}
        onClose={() => setShowDetailsPopup(false)}
        meeting={selectedMeeting}
        onReschedule={(meeting) => {
          setShowDetailsPopup(false);
          onRescheduleMeeting?.(meeting);
        }}
        onCancel={(meeting) => {
          setShowDetailsPopup(false);
          setMeetingToCancel(meeting);
          setShowCancelModal(true);
        }}
      />

      {/* Cancel Meeting Confirmation Modal */}
      <CancelMeetingModal
        isOpen={showCancelModal}
        onClose={() => {
          setShowCancelModal(false);
          setMeetingToCancel(null);
        }}
        meeting={meetingToCancel}
        onConfirm={(meeting) => {
          onCancelMeeting?.(meeting);
          setShowCancelModal(false);
          setMeetingToCancel(null);
        }}
      />
      {/* Calendar header */}
      <div className="border-b border-neutral-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h2 className="font-display text-lg text-neutral-900">
              {format(currentDate, view === 'week' ? "'Week of' MMM d, yyyy" : 'MMMM yyyy')}
            </h2>
            <div className="flex items-center space-x-1">
              <button
                onClick={handlePrevious}
                className="p-1 rounded-lg hover:bg-neutral-100 text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </button>
              <button
                onClick={handleNext}
                className="p-1 rounded-lg hover:bg-neutral-100 text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                <ChevronRightIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
          <button
            onClick={() => setCurrentDate(new Date())}
            className="px-3 py-1.5 text-sm text-primary-600 hover:text-primary-700 font-medium hover:bg-primary-50 rounded-lg transition-colors"
          >
            Today
          </button>
        </div>
      </div>

      {/* Calendar grid */}
      <div className="p-4">
        {/* Day headers */}
        <div className="grid grid-cols-7 gap-4 mb-4">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
            <div key={day} className="text-center text-sm font-medium text-neutral-600">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-4">
          {calendarDays.map((day, dayIdx) => {
            const dateKey = format(day, 'yyyy-MM-dd');
            const dayMeetings = meetingsByDate[dateKey] || [];
            const isToday = isSameDay(day, new Date());
            const isCurrentMonth = isSameMonth(day, currentDate);

            return (
              <div
                key={day.toString()}
                className={`min-h-[120px] border rounded-lg p-2 transition-all
                  ${isToday ? 'border-primary-500 shadow-sm shadow-primary-100' : 'border-neutral-200'}
                  ${isCurrentMonth ? 'bg-white' : 'bg-neutral-50/50'}
                  ${hoveredDate === dateKey ? 'ring-2 ring-primary-100' : ''}
                  ${dayMeetings.length > 0 ? 'shadow-sm' : ''}
                `}
                onMouseEnter={() => setHoveredDate(dateKey)}
                onMouseLeave={() => setHoveredDate(null)}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-sm font-medium
                    ${isToday ? 'text-brand-aqua' : isCurrentMonth ? 'text-neutral-900' : 'text-neutral-400'}
                  `}>
                    {format(day, 'd')}
                  </span>
                  {dayMeetings.length > 0 && (
                    <span className="text-xs text-neutral-500">
                      {dayMeetings.length} {dayMeetings.length === 1 ? 'meeting' : 'meetings'}
                    </span>
                  )}
                </div>

                {/* Meetings for the day */}
                <div className="space-y-1.5 max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-200 scrollbar-track-transparent">
                  {dayMeetings
                    .sort((a, b) => new Date(a.date) - new Date(b.date))
                    .map((meeting) => (
                      <MeetingPreview key={meeting.id} meeting={meeting} />
                    ))
                  }
                  {dayMeetings.length > 4 && (
                    <button
                      className="w-full text-xs text-primary-600 hover:text-primary-700 font-medium py-2 rounded-lg hover:bg-primary-50 transition-colors border border-primary-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Show the first hidden meeting's details
                        setSelectedMeeting(dayMeetings[4]);
                        setShowDetailsPopup(true);
                      }}
                    >
                      +{dayMeetings.length - 4} more meetings
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
