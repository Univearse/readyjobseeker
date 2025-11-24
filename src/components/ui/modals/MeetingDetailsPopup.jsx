'use client';

import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {
  XMarkIcon,
  CalendarIcon,
  ClockIcon,
  UserGroupIcon,
  VideoCameraIcon,
  ArrowPathIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';

export default function MeetingDetailsPopup({ isOpen, onClose, meeting, onReschedule, onCancel }) {
  if (!meeting) return null;

  const meetingDate = new Date(meeting.date);
  const formattedDate = meetingDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  const formattedTime = meetingDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  const statusStyles = {
    Scheduled: 'bg-primary-50 text-primary-700',
    Completed: 'bg-neutral-50 text-neutral-700',
    Rescheduled: 'bg-secondary-50 text-secondary-700',
    Canceled: 'bg-red-50 text-red-700',
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                {/* Header */}
                <div className="border-b border-neutral-100 p-6">
                  <div className="flex items-center justify-between">
                    <Dialog.Title as="h3" className="text-xl font-display text-neutral-900">
                      Meeting Details
                    </Dialog.Title>
                    <button
                      onClick={onClose}
                      className="text-neutral-400 hover:text-neutral-600 transition-colors"
                    >
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                  {/* Meeting Title and Status */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-lg font-medium text-neutral-900 mb-1">
                        {meeting.title}
                      </h4>
                      {meeting.candidateName && (
                        <p className="text-neutral-600">
                          {meeting.candidateName} • {meeting.role}
                        </p>
                      )}
                    </div>
                    <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${statusStyles[meeting.status]}`}>
                      {meeting.status}
                    </span>
                  </div>

                  {/* Date and Time */}
                  <div className="flex items-center space-x-6 text-neutral-600">
                    <div className="flex items-center space-x-2">
                      <CalendarIcon className="h-5 w-5 text-neutral-400" />
                      <span>{formattedDate}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <ClockIcon className="h-5 w-5 text-neutral-400" />
                      <span>
                        {formattedTime} • {meeting.duration} minutes
                      </span>
                    </div>
                  </div>

                  {/* Meeting Link */}
                  {meeting.meetingLink && (
                    <div className="bg-primary-50 rounded-xl p-4">
                      <h5 className="text-sm font-medium text-neutral-900 mb-3">Meeting Link</h5>
                      <div className="flex items-center space-x-3">
                        <VideoCameraIcon className="h-5 w-5 text-primary-500" />
                        <a
                          href={meeting.meetingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-600 hover:text-primary-700 font-medium"
                        >
                          {meeting.meetingLink}
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Participants */}
                  <div>
                    <h5 className="text-sm font-medium text-neutral-900 mb-3">Participants</h5>
                    <ul className="divide-y divide-neutral-100">
                      {meeting.participants.map((participant, index) => (
                        <li key={index} className="flex items-center space-x-3 py-2 first:pt-0 last:pb-0">
                          <UserGroupIcon className="h-5 w-5 text-neutral-400" />
                          <span className="text-neutral-600">{participant}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Actions */}
                {meeting.status === 'Scheduled' && (
                  <div className="border-t border-neutral-100 p-6">
                    <div className="flex items-center justify-end space-x-3">
                      <button
                        onClick={() => {
                          onClose();
                          onCancel(meeting);
                        }}
                        className="inline-flex items-center px-4 py-2.5 rounded-xl text-red-600 hover:bg-red-50 transition-colors font-medium"
                      >
                        <XCircleIcon className="h-5 w-5 mr-2" />
                        Cancel Meeting
                      </button>
                      <button
                        onClick={() => {
                          onClose();
                          onReschedule(meeting);
                        }}
                        className="inline-flex items-center px-4 py-2.5 rounded-xl text-secondary-600 hover:bg-secondary-50 transition-colors font-medium"
                      >
                        <ArrowPathIcon className="h-5 w-5 mr-2" />
                        Reschedule
                      </button>
                      <a
                        href={meeting.meetingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2.5 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors font-medium"
                      >
                        <VideoCameraIcon className="h-5 w-5 mr-2" />
                        Join Meeting
                      </a>
                    </div>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
