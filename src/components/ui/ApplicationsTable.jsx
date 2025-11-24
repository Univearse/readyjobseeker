/**
 * File: src/components/ui/ApplicationsTable.jsx
 * 
 * tomiwa: Applications Table Component
 * Main table component with sorting, filtering, and expandable rows
 */

'use client';

import React, { useState, useMemo } from 'react';
import {
  ChevronUpIcon,
  ChevronDownIcon,
  Bars3Icon,
  Squares2X2Icon
} from '@heroicons/react/24/outline';
import ApplicationRow from './ApplicationRow';
import StatusPill from './StatusPill';
import ProgressBar from './ProgressBar';
import NextActionButton from './NextActionButton';
import MobileBottomSheet from './MobileBottomSheet';

// tomiwa: Table column configuration
const columns = [
  { key: 'select', label: '', sortable: false, width: 'w-12' },
  { key: 'job', label: 'Job / Company', sortable: true, width: 'min-w-[280px]' },
  { key: 'status', label: 'Current Stage', sortable: true, width: 'w-40' },
  { key: 'progress', label: 'Progress', sortable: false, width: 'w-32' },
  { key: 'action', label: 'Next Action', sortable: false, width: 'w-40' },
  { key: 'updated', label: 'Updated', sortable: true, width: 'w-28' },
  { key: 'more', label: '', sortable: false, width: 'w-12' }
];

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

export default function ApplicationsTable({
  applications = [],
  selectedApplications = [],
  onSelectApplication,
  onSelectAll,
  onSort,
  sortBy,
  sortOrder,
  onAction,
  viewMode = 'table', // 'table' or 'cards'
  onViewModeChange,
  className = ''
}) {
  // tomiwa: Mobile bottom sheet state
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false);
  const [selectedMobileApp, setSelectedMobileApp] = useState(null);

  // tomiwa: Handle mobile card click
  const handleMobileCardClick = (application) => {
    setSelectedMobileApp(application);
    setMobileSheetOpen(true);
  };

  // tomiwa: Handle mobile sheet close
  const handleMobileSheetClose = () => {
    setMobileSheetOpen(false);
    setSelectedMobileApp(null);
  };
  // tomiwa: Handle column sorting
  const handleSort = (columnKey) => {
    if (onSort) {
      onSort(columnKey);
    }
  };

  // tomiwa: Get sort icon for column
  const getSortIcon = (columnKey) => {
    if (sortBy !== columnKey) return null;
    
    return sortOrder === 'asc' ? (
      <ChevronUpIcon className="w-4 h-4 text-brand-aqua" />
    ) : (
      <ChevronDownIcon className="w-4 h-4 text-brand-aqua" />
    );
  };

  // tomiwa: Handle select all checkbox
  const handleSelectAll = (checked) => {
    if (onSelectAll) {
      onSelectAll(checked);
    }
  };

  // tomiwa: Check if all applications are selected
  const isAllSelected = applications.length > 0 && selectedApplications.length === applications.length;
  const isIndeterminate = selectedApplications.length > 0 && selectedApplications.length < applications.length;

  // tomiwa: Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm overflow-hidden ${className}`}>
      {/* tomiwa: Table header with view toggle */}
      <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-neutral-900">
          Applications ({applications.length})
        </h2>
        
        {/* tomiwa: View mode toggle */}
        <div className="flex items-center gap-2 bg-neutral-100 rounded-lg p-1">
          <button
            onClick={() => onViewModeChange?.('table')}
            className={`
              p-2 rounded-md transition-colors
              ${viewMode === 'table' 
                ? 'bg-white text-brand-aqua shadow-sm' 
                : 'text-neutral-500 hover:text-neutral-700'
              }
            `}
          >
            <Bars3Icon className="w-4 h-4" />
          </button>
          <button
            onClick={() => onViewModeChange?.('cards')}
            className={`
              p-2 rounded-md transition-colors
              ${viewMode === 'cards' 
                ? 'bg-white text-brand-aqua shadow-sm' 
                : 'text-neutral-500 hover:text-neutral-700'
              }
            `}
          >
            <Squares2X2Icon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* tomiwa: Table view */}
      {viewMode === 'table' ? (
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* tomiwa: Table header */}
            <thead className="bg-neutral-50">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className={`
                      px-6 py-4 text-left text-xs font-bold text-neutral-700 uppercase tracking-wider
                      ${column.width}
                      ${column.sortable ? 'cursor-pointer hover:bg-neutral-100 select-none' : ''}
                    `}
                    onClick={column.sortable ? () => handleSort(column.key) : undefined}
                  >
                    {column.key === 'select' ? (
                      <input
                        type="checkbox"
                        checked={isAllSelected}
                        ref={(el) => {
                          if (el) el.indeterminate = isIndeterminate;
                        }}
                        onChange={(e) => handleSelectAll(e.target.checked)}
                        className="rounded border-neutral-300 text-brand-aqua focus:ring-brand-aqua"
                      />
                    ) : (
                      <div className="flex items-center gap-2">
                        {column.label}
                        {getSortIcon(column.key)}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            </thead>

            {/* tomiwa: Table body */}
            <tbody className="divide-y divide-neutral-100">
              {applications.map((application) => (
                <ApplicationRow
                  key={application.id}
                  application={application}
                  isSelected={selectedApplications.includes(application.id)}
                  onSelect={onSelectApplication}
                  onAction={onAction}
                />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* tomiwa: Enhanced Cards view with mobile bottom sheet */
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {applications.map((application) => {
              const progress = getProgressFromStatus(application.status);
              
              return (
                <div
                  key={application.id}
                  className="bg-white border border-neutral-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer md:cursor-default"
                  onClick={() => {
                    // tomiwa: Only trigger mobile sheet on mobile devices
                    if (window.innerWidth < 768) {
                      handleMobileCardClick(application);
                    }
                  }}
                >
                  {/* tomiwa: Card header */}
                  <div className="flex items-start gap-3 mb-4">
                    <input
                      type="checkbox"
                      checked={selectedApplications.includes(application.id)}
                      onChange={(e) => {
                        e.stopPropagation();
                        onSelectApplication?.(application.id, e.target.checked);
                      }}
                      className="mt-1 rounded border-neutral-300 text-brand-aqua focus:ring-brand-aqua"
                    />
                    <img
                      src={application.companyLogo}
                      alt={application.company}
                      className="w-12 h-12 rounded-lg object-cover shadow-sm"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-neutral-900 truncate">
                        {application.jobTitle}
                      </h3>
                      <p className="text-sm text-neutral-600 truncate">
                        {application.company}
                      </p>
                      <p className="text-xs text-neutral-500 mt-1">
                        {application.location}
                      </p>
                    </div>
                  </div>

                  {/* tomiwa: Status and progress */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <StatusPill status={application.status} size="small" />
                      <span className="text-xs text-neutral-500">
                        {formatDate(application.dateApplied)}
                      </span>
                    </div>
                    <ProgressBar progress={progress} showLabel={true} status={application.status} />
                  </div>

                  {/* tomiwa: Action buttons */}
                  <div className="flex gap-2">
                    <NextActionButton
                      status={application.status}
                      onClick={(action, status) => {
                        onAction?.(action, application.id, status);
                      }}
                      className="flex-1 justify-center"
                      size="small"
                    />
                    
                    {/* tomiwa: Mobile details button - only show on mobile */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMobileCardClick(application);
                      }}
                      className="md:hidden px-3 py-2 bg-neutral-100 text-neutral-600 rounded-lg hover:bg-neutral-200 transition-colors text-xs font-medium"
                    >
                      Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* tomiwa: Empty state */}
      {applications.length === 0 && (
        <div className="px-6 py-12 text-center">
          <div className="text-neutral-400 mb-2">
            <Bars3Icon className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-neutral-900 mb-1">
            No applications found
          </h3>
          <p className="text-neutral-500">
            Try adjusting your filters or search criteria
          </p>
        </div>
      )}

      {/* tomiwa: Mobile Bottom Sheet */}
      <MobileBottomSheet
        isOpen={mobileSheetOpen}
        onClose={handleMobileSheetClose}
        application={selectedMobileApp}
        onAction={onAction}
      />
    </div>
  );
}
