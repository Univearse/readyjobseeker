'use client';

import { useState } from 'react';
import { XCircleIcon, CalendarIcon, ClockIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import {
  validateMeetingTime,
  validateMeetingDuration,
  checkSchedulingConflicts,
  formatErrorMessage,
  MeetingOperationError,
} from '@/utils/meetingErrors';

export default function RescheduleModal({ isOpen, onClose, meeting, onReschedule }) {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    sendNotification: true
  });

  const [error, setError] = useState(null);

  // tomiwa: Format the current meeting date and time for display
  const currentDate = new Date(meeting?.date);
  const formattedCurrentDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
  const formattedCurrentTime = currentDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // tomiwa: Validate meeting time
      validateMeetingTime(formData.date, formData.time);

      // tomiwa: Create a new date object from the form data
      const newDateTime = new Date(`${formData.date}T${formData.time}`);
      
      // tomiwa: Create updated meeting object
      const updatedMeeting = {
        ...meeting,
        date: newDateTime.toISOString(),
        status: 'Rescheduled',
        sendNotification: formData.sendNotification
      };

      // tomiwa: Check for scheduling conflicts
      // In a real app, you would pass all meetings from your database/API
      checkSchedulingConflicts(updatedMeeting, window.mockMeetings || []);

      // tomiwa: Call the parent handler with the new date
      onReschedule(updatedMeeting);
      onClose();
    } catch (err) {
      setError(formatErrorMessage(err));
    }
  };

  if (!isOpen || !meeting) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg mx-4">
        {/* Modal Header */}
        <div className="border-b border-neutral-100 p-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-display text-neutral-900">Reschedule Meeting</h2>
            <button
              onClick={onClose}
              className="text-neutral-400 hover:text-neutral-600 transition-colors"
            >
              <XCircleIcon className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Current Meeting Info */}
        <div className="p-6 bg-neutral-50 border-b border-neutral-100">
          <h3 className="text-sm font-medium text-neutral-900 mb-3">Current Schedule</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-sm text-neutral-600">
              <CalendarIcon className="h-5 w-5 text-neutral-400" />
              <span>{formattedCurrentDate}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-neutral-600">
              <ClockIcon className="h-5 w-5 text-neutral-400" />
              <span>{formattedCurrentTime}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-neutral-600">
              <UserGroupIcon className="h-5 w-5 text-neutral-400" />
              <span>{meeting.participants.length} participants</span>
            </div>
          </div>
        </div>

        {/* Reschedule Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4">
            {/* New Date */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                New Date
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                min={new Date().toISOString().split('T')[0]}
                className="w-full border border-neutral-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary-100 focus:border-primary-300"
                required
              />
            </div>

            {/* New Time */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                New Time
              </label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full border border-neutral-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary-100 focus:border-primary-300"
                required
              />
            </div>

            {/* Notification Option */}
            <div className="flex items-center space-x-3 pt-2">
              <input
                type="checkbox"
                id="sendNotification"
                checked={formData.sendNotification}
                onChange={(e) => setFormData({ ...formData, sendNotification: e.target.checked })}
                className="h-4 w-4 text-primary-500 rounded border-neutral-300 focus:ring-primary-500"
              />
              <label htmlFor="sendNotification" className="text-sm text-neutral-700">
                Send notification to all participants
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-3 pt-6 border-t border-neutral-100">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 text-neutral-600 hover:text-neutral-900 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors font-medium"
            >
              Confirm Reschedule
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
