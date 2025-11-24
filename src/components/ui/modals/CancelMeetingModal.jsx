'use client';

import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export default function CancelMeetingModal({ isOpen, onClose, meeting, onConfirm }) {
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-neutral-100 p-6">
                  <Dialog.Title as="h3" className="text-xl font-display text-neutral-900">
                    Cancel Meeting
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    className="text-neutral-400 hover:text-neutral-600 transition-colors"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <ExclamationTriangleIcon className="h-6 w-6 text-red-500" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-neutral-900 mb-2">
                        Are you sure you want to cancel this meeting?
                      </h4>
                      <div className="text-neutral-600 space-y-2">
                        <p className="font-medium">{meeting.title}</p>
                        <p>{formattedDate} at {formattedTime}</p>
                        {meeting.candidateName && (
                          <p>with {meeting.candidateName}</p>
                        )}
                      </div>
                      <p className="mt-4 text-sm text-neutral-500">
                        This action cannot be undone. All participants will be notified of the cancellation.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="border-t border-neutral-100 p-6">
                  <div className="flex items-center justify-end space-x-3">
                    <button
                      onClick={onClose}
                      className="px-4 py-2.5 rounded-xl text-neutral-700 hover:bg-neutral-50 transition-colors font-medium"
                    >
                      Keep Meeting
                    </button>
                    <button
                      onClick={() => {
                        onConfirm(meeting);
                        onClose();
                      }}
                      className="px-4 py-2.5 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors font-medium"
                    >
                      Cancel Meeting
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
