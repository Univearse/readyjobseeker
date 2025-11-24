'use client';

import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, ExclamationTriangleIcon, TrashIcon } from '@heroicons/react/24/outline';

/**
 * tomiwa: Reusable Delete Confirmation Modal Component
 * This modal provides a consistent delete confirmation experience across the app
 * Follows the project's design system with brand colors and styling
 */
export default function DeleteConfirmationModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Delete Item", 
  itemName = "this item",
  itemType = "item",
  description,
  isDangerous = true,
  isLoading = false 
}) {
  
  // tomiwa: Handle confirmation with loading state
  const handleConfirm = () => {
    onConfirm();
    // tomiwa: Don't auto-close here, let parent handle it after async operation
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* tomiwa: Backdrop with smooth fade animation */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
        </Transition.Child>

        {/* tomiwa: Modal container with responsive positioning */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center 
                         p-4 // Default (mobile) - 16px padding
                         sm:p-6 // Small screens (640px+) - 24px padding
                         md:p-8 // Medium screens (768px+) - 32px padding
                         text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full 
                                     max-w-sm // Default (mobile) - 384px max width
                                     sm:max-w-md // Small screens (640px+) - 448px max width
                                     md:max-w-lg // Medium screens (768px+) - 512px max width
                                     transform overflow-hidden 
                                     rounded-xl // tomiwa: 12px corner radius as per brand guidelines
                                     bg-white text-left align-middle shadow-xl 
                                     transition-all border border-neutral-100">
                
                {/* tomiwa: Header section with icon and title */}
                <div className="flex items-center justify-between 
                              border-b border-neutral-100 
                              p-4 // Default (mobile) - 16px padding
                              sm:p-6 // Small screens (640px+) - 24px padding
                              ">
                  <div className="flex items-center space-x-3">
                    {/* tomiwa: Warning icon with brand orange color for danger */}
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center
                                   ${isDangerous 
                                     ? 'bg-red-100 text-red-600' 
                                     : 'bg-secondary-100 text-secondary-600'
                                   }`}>
                      {isDangerous ? (
                        <ExclamationTriangleIcon className="h-5 w-5" />
                      ) : (
                        <TrashIcon className="h-5 w-5" />
                      )}
                    </div>
                    <Dialog.Title as="h3" className="text-lg 
                                                   sm:text-xl // Small screens (640px+) - larger text
                                                   font-display text-brand-black">
                      {title}
                    </Dialog.Title>
                  </div>
                  
                  {/* tomiwa: Close button with hover effects */}
                  <button
                    onClick={onClose}
                    disabled={isLoading}
                    className="text-neutral-400 hover:text-neutral-600 
                             transition-colors duration-200 
                             disabled:opacity-50 disabled:cursor-not-allowed
                             p-1 rounded-lg hover:bg-neutral-50"
                  >
                    <XMarkIcon className="h-5 w-5 
                                        sm:h-6 sm:w-6 // Small screens (640px+) - larger icon
                                        " />
                  </button>
                </div>

                {/* tomiwa: Content section with warning message */}
                <div className="p-4 // Default (mobile) - 16px padding
                              sm:p-6 // Small screens (640px+) - 24px padding
                              ">
                  <div className="space-y-4">
                    {/* tomiwa: Main confirmation message */}
                    <div>
                      <h4 className="text-base 
                                   sm:text-lg // Small screens (640px+) - larger text
                                   font-medium text-brand-black mb-2">
                        Are you sure you want to delete {itemName}?
                      </h4>
                      
                      {/* tomiwa: Custom description or default warning */}
                      <p className="text-sm 
                                   sm:text-base // Small screens (640px+) - larger text
                                   text-neutral-600 leading-relaxed">
                        {description || `This will permanently delete the ${itemType}. This action cannot be undone.`}
                      </p>
                    </div>

                    {/* tomiwa: Warning callout for dangerous actions */}
                    {isDangerous && (
                      <div className="bg-red-50 border border-red-200 rounded-xl p-3 
                                    sm:p-4 // Small screens (640px+) - more padding
                                    ">
                        <div className="flex items-start space-x-2">
                          <ExclamationTriangleIcon className="h-4 w-4 
                                                             sm:h-5 sm:w-5 // Small screens (640px+) - larger icon
                                                             text-red-500 flex-shrink-0 mt-0.5" />
                          <p className="text-xs 
                                       sm:text-sm // Small screens (640px+) - larger text
                                       text-red-700 font-medium">
                            This action is permanent and cannot be undone. All associated data will be lost.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* tomiwa: Action buttons section */}
                <div className="border-t border-neutral-100 
                              p-4 // Default (mobile) - 16px padding
                              sm:p-6 // Small screens (640px+) - 24px padding
                              bg-neutral-50">
                  <div className="flex 
                                flex-col // Default (mobile) - stacked buttons
                                sm:flex-row // Small screens (640px+) - side by side
                                gap-3 
                                sm:justify-end // Small screens (640px+) - align right
                                ">
                    
                    {/* tomiwa: Cancel button with neutral styling */}
                    <button
                      onClick={onClose}
                      disabled={isLoading}
                      className="w-full // Default (mobile) - full width
                               sm:w-auto // Small screens (640px+) - auto width
                               px-4 py-2.5 
                               sm:px-6 // Small screens (640px+) - more horizontal padding
                               rounded-xl text-neutral-700 bg-white 
                               border border-neutral-200
                               hover:bg-neutral-50 hover:border-neutral-300
                               transition-all duration-200 font-medium
                               disabled:opacity-50 disabled:cursor-not-allowed
                               focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                               order-2 // Default (mobile) - second in order
                               sm:order-1 // Small screens (640px+) - first in order
                               "
                    >
                      Cancel
                    </button>
                    
                    {/* tomiwa: Delete button with danger styling and loading state */}
                    <button
                      onClick={handleConfirm}
                      disabled={isLoading}
                      className={`w-full // Default (mobile) - full width
                                sm:w-auto // Small screens (640px+) - auto width
                                px-4 py-2.5 
                                sm:px-6 // Small screens (640px+) - more horizontal padding
                                rounded-xl text-white font-medium
                                transition-all duration-200
                                disabled:opacity-50 disabled:cursor-not-allowed
                                focus:outline-none focus:ring-2 focus:ring-offset-2
                                order-1 // Default (mobile) - first in order
                                sm:order-2 // Small screens (640px+) - second in order
                                ${isDangerous 
                                  ? 'bg-red-500 hover:bg-red-600 focus:ring-red-500' 
                                  : 'bg-secondary-500 hover:bg-secondary-600 focus:ring-secondary-500'
                                }
                                ${isLoading ? 'cursor-not-allowed' : 'cursor-pointer'}
                                `}
                    >
                      {/* tomiwa: Loading spinner and text */}
                      <div className="flex items-center justify-center space-x-2">
                        {isLoading && (
                          <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        )}
                        <span>
                          {isLoading ? 'Deleting...' : `Delete ${itemType}`}
                        </span>
                      </div>
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
