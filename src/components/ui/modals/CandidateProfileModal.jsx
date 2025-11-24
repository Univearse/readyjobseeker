'use client';

import React from 'react';
import Image from 'next/image';
import { Dialog } from '@headlessui/react';

export default function CandidateProfileModal({ isOpen, onClose, candidate }) {
  if (!candidate) return null;

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="relative z-50"
    >
      {/* tomiwa: Modal backdrop */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* tomiwa: Modal container */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-2xl bg-white rounded-xl shadow-xl">
          {/* tomiwa: Modal header */}
          <div className="relative h-48 bg-gradient-to-r from-[#021126] to-[#021126]/90 rounded-t-xl">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/80 hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* tomiwa: Profile image */}
            <div className="absolute -bottom-12 left-6">
              <div className="h-24 w-24 rounded-xl border-4 border-white overflow-hidden relative">
                <Image
                  src={candidate.image || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e'}
                  alt={candidate.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* tomiwa: Profile content */}
          <div className="px-6 pt-16 pb-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="font-display text-2xl text-[#021126]">{candidate.name}</h2>
                <p className="text-neutral-600">{candidate.role}</p>
              </div>
              <div className="flex items-center space-x-2 bg-[#36D0D8]/10 px-4 py-2 rounded-lg">
                <span className="text-xl font-medium text-[#36D0D8]">
                  {candidate.matchPercentage}%
                </span>
                <span className="text-sm text-[#36D0D8]">Match</span>
              </div>
            </div>

            {/* tomiwa: Skills section */}
            <div className="mt-8">
              <h3 className="font-display text-lg text-[#021126] mb-4">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {candidate.skills?.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 rounded-lg text-sm bg-[#36D0D8]/10 text-[#36D0D8]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* tomiwa: Experience highlights */}
            <div className="mt-8">
              <h3 className="font-display text-lg text-[#021126] mb-4">Experience Highlights</h3>
              <div className="space-y-4">
                {candidate.highlights?.map((highlight, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full bg-[#36D0D8] mt-2"></div>
                    <p className="flex-1 text-neutral-600">{highlight}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* tomiwa: Contact section */}
            <div className="mt-8">
              <h3 className="font-display text-lg text-[#021126] mb-4">Contact Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 p-4 rounded-lg bg-neutral-50">
                  <svg className="w-5 h-5 text-neutral-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-neutral-600">{candidate.email || 'Email not provided'}</span>
                </div>
                <div className="flex items-center space-x-3 p-4 rounded-lg bg-neutral-50">
                  <svg className="w-5 h-5 text-neutral-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-neutral-600">{candidate.phone || 'Phone not provided'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* tomiwa: Action buttons */}
          <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-100 rounded-b-xl">
            <div className="flex justify-end space-x-3">
              <button 
                onClick={onClose}
                className="px-4 py-2 text-sm text-neutral-600 hover:text-neutral-700"
              >
                Close
              </button>
              <button className="px-4 py-2 text-sm text-red-600 hover:text-red-700">
                Reject
              </button>
              <button className="px-4 py-2 text-sm text-[#36D0D8] hover:text-[#36D0D8]/80">
                Add to Job
              </button>
              <button className="px-4 py-2 text-sm bg-[#36D0D8] text-white rounded-lg hover:bg-[#36D0D8]/90">
                Shortlist
              </button>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
