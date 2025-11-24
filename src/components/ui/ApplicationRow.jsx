/**
 * File: src/components/ui/ApplicationRow.jsx
 * 
 * tomiwa: Application Row Component
 * Individual table row with expandable details drawer
 */

'use client';

import React, { useState } from 'react';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  MapPinIcon,
  EllipsisHorizontalIcon
} from '@heroicons/react/24/outline';
import StatusPill from './StatusPill';
import ProgressBar from './ProgressBar';
import NextActionButton from './NextActionButton';
import RowDetailsDrawer from './RowDetailsDrawer';

// tomiwa: Enhanced progress calculation with feedback statuses
const getProgressFromStatus = (status) => {
  const progressMap = {
    'Applied': 20,
    'Under Review': 40,
    'Test Assigned': 60,
    'Failed Assessment': 25, // tomiwa: Shows failure branch
    'Interview Scheduled': 80,
    'Disqualified': 30, // tomiwa: Shows rejection branch
    'Offer': 100,
    'Rejected': 0,
    'Withdrawn': 0,
    'Closed': 100
  };
  return progressMap[status] || 0;
};

export default function ApplicationRow({
  application,
  isSelected = false,
  onSelect,
  onAction,
  className = ''
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  // tomiwa: Calculate application progress
  const progress = getProgressFromStatus(application.status);

  // tomiwa: Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  // tomiwa: Handle row expansion
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  // tomiwa: Handle checkbox selection
  const handleSelect = (e) => {
    e.stopPropagation();
    if (onSelect) {
      onSelect(application.id, e.target.checked);
    }
  };

  // tomiwa: Handle action button clicks
  const handleAction = (action, status) => {
    if (onAction) {
      onAction(action, application.id, status);
    }
  };

  // tomiwa: Handle more menu actions
  const handleMoreAction = (action) => {
    setShowMoreMenu(false);
    handleAction(action, application.status);
  };

  return (
    <>
      {/* tomiwa: Main table row */}
      <tr 
        className={`
          hover:bg-neutral-50 transition-colors cursor-pointer
          ${isExpanded ? 'bg-neutral-50' : ''}
          ${className}
        `}
        onClick={toggleExpanded}
      >
        {/* tomiwa: Selection checkbox */}
        <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
          <input
            type="checkbox"
            checked={isSelected}
            onChange={handleSelect}
            className="rounded border-neutral-300 text-brand-aqua focus:ring-brand-aqua"
          />
        </td>

        {/* tomiwa: Job / Company column */}
        <td className="px-6 py-4">
          <div className="flex items-center gap-3">
            {/* tomiwa: Expand/collapse indicator */}
            <button 
              className="p-1 hover:bg-neutral-200 rounded transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                toggleExpanded();
              }}
            >
              {isExpanded ? (
                <ChevronUpIcon className="w-4 h-4 text-neutral-500" />
              ) : (
                <ChevronDownIcon className="w-4 h-4 text-neutral-500" />
              )}
            </button>

            {/* tomiwa: Company logo */}
            <img
              src={application.companyLogo}
              alt={application.company}
              className="w-10 h-10 rounded-lg object-cover shadow-sm"
            />

            {/* tomiwa: Job and company info */}
            <div>
              <div className="font-semibold text-neutral-900 mb-1">
                {application.jobTitle}
              </div>
              <div className="text-sm text-neutral-600 font-medium">
                {application.company}
              </div>
              <div className="text-xs text-neutral-500 flex items-center gap-1 mt-1">
                <MapPinIcon className="w-3 h-3" />
                {application.location}
              </div>
            </div>
          </div>
        </td>

        {/* tomiwa: Current Stage column */}
        <td className="px-6 py-4">
          <StatusPill status={application.status} />
        </td>

        {/* tomiwa: Progress column */}
        <td className="px-6 py-4">
          <ProgressBar 
            progress={progress} 
            showLabel={true}
            className="min-w-[120px]"
          />
        </td>

        {/* tomiwa: Next Action column */}
        <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
          <NextActionButton
            status={application.status}
            onClick={handleAction}
            size="small"
          />
        </td>

        {/* tomiwa: Updated column */}
        <td className="px-6 py-4 text-sm text-neutral-600">
          {formatDate(application.dateApplied)}
        </td>

        {/* tomiwa: More actions column */}
        <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
          <div className="relative">
            <button
              onClick={() => setShowMoreMenu(!showMoreMenu)}
              className="p-2 hover:bg-neutral-200 rounded-lg transition-colors"
            >
              <EllipsisHorizontalIcon className="w-5 h-5 text-neutral-500" />
            </button>

            {/* tomiwa: More actions dropdown */}
            {showMoreMenu && (
              <>
                {/* tomiwa: Backdrop to close menu */}
                <div 
                  className="fixed inset-0 z-10"
                  onClick={() => setShowMoreMenu(false)}
                />
                
                {/* tomiwa: Dropdown menu */}
                <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-neutral-200 py-1 z-20">
                  <button
                    onClick={() => handleMoreAction('view')}
                    className="w-full px-4 py-2 text-left text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
                  >
                    View Full Details
                  </button>
                  
                  {application.status === 'Interview Scheduled' && (
                    <button
                      onClick={() => handleMoreAction('reschedule')}
                      className="w-full px-4 py-2 text-left text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
                    >
                      Reschedule Interview
                    </button>
                  )}
                  
                  {application.status === 'Test Assigned' && (
                    <button
                      onClick={() => handleMoreAction('test')}
                      className="w-full px-4 py-2 text-left text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
                    >
                      Take Assessment
                    </button>
                  )}
                  
                  <button
                    onClick={() => handleMoreAction('addToCalendar')}
                    className="w-full px-4 py-2 text-left text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
                  >
                    Add to Calendar
                  </button>
                  
                  <div className="border-t border-neutral-200 my-1" />
                  
                  {application.status !== 'Rejected' && application.status !== 'Withdrawn' && (
                    <button
                      onClick={() => handleMoreAction('withdraw')}
                      className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      Withdraw Application
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </td>
      </tr>

      {/* tomiwa: Expandable details drawer */}
      {isExpanded && (
        <tr>
          <td colSpan="7" className="p-0">
            <RowDetailsDrawer
              application={application}
              isOpen={isExpanded}
              onClose={() => setIsExpanded(false)}
              onAction={handleAction}
            />
          </td>
        </tr>
      )}
    </>
  );
}
