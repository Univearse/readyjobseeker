'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { EllipsisVerticalIcon, EyeIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

// tomiwa: Table component for displaying recent jobs with actions
const JobsTable = ({ jobs }) => {
  const [openMenuId, setOpenMenuId] = useState(null);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-neutral-100">
        <thead>
          <tr>
            <th className="px-6 py-4 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">
              Job Title
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">
              Applications
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">
              Posted Date
            </th>
            <th className="px-6 py-4 text-right text-xs font-medium text-neutral-600 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-neutral-100">
          {jobs.map((job, index) => (
            <tr 
              key={job.id} 
              className={`${index % 2 === 0 ? 'bg-white' : 'bg-neutral-50'} hover:bg-neutral-100 transition-colors`}
            >
              <td className="px-6 py-5 whitespace-nowrap">
                <div className="text-sm font-medium text-brand-black">{job.title}</div>
                <div className="text-sm text-neutral-500 mt-1">{job.company}</div>
              </td>
              <td className="px-6 py-5 whitespace-nowrap">
                <span className={`px-4 py-1.5 inline-flex text-xs leading-5 font-semibold rounded-full
                  ${job.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 
                    job.status === 'Closed' ? 'bg-neutral-100 text-neutral-700' : 
                    'bg-brand-yellow/20 text-accent-700'}`}>
                  {job.status}
                </span>
              </td>
              <td className="px-6 py-5 whitespace-nowrap">
                <div className="text-sm font-medium text-brand-black">{job.applications}</div>
                <div className="text-xs text-neutral-500 mt-0.5">Total</div>
              </td>
              <td className="px-6 py-5 whitespace-nowrap">
                <div className="text-sm font-medium text-brand-black">{job.postedDate}</div>
                <div className="text-xs text-neutral-500 mt-0.5">Posted</div>
              </td>
              <td className="px-6 py-5 whitespace-nowrap text-right text-sm font-medium">
                <div className="relative inline-block text-left">
                  <button 
                    onClick={() => setOpenMenuId(openMenuId === job.id ? null : job.id)}
                    className="text-neutral-400 hover:text-brand-aqua p-2 rounded-full hover:bg-brand-aqua/10 transition-colors"
                  >
                    <EllipsisVerticalIcon className="w-5 h-5" />
                  </button>

                  {/* Action Menu */}
                  {openMenuId === job.id && (
                    <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                      <div className="py-1">
                        <Link
                          href={`/dashboard/employer/my-jobs/${job.id}/applications`}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 hover:text-brand-aqua transition-colors"
                        >
                          <EyeIcon className="w-4 h-4" />
                          View Applications
                        </Link>
                        <button
                          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 hover:text-brand-aqua transition-colors"
                        >
                          <PencilIcon className="w-4 h-4" />
                          Edit Job
                        </button>
                        <button
                          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <TrashIcon className="w-4 h-4" />
                          Delete Job
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobsTable; 