'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export default function CandidateSelectionModal({ isOpen, onClose, onSelect }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCandidates, setSelectedCandidates] = useState([]);

  // tomiwa: Mock data - replace with actual API call
  const candidates = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Senior Frontend Developer',
      matchPercentage: 95,
      status: 'Shortlisted',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Full Stack Engineer',
      matchPercentage: 88,
      status: 'Applied',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    },
    // Add more mock candidates as needed
  ];

  const handleToggleCandidate = (candidateId) => {
    setSelectedCandidates(prev => {
      if (prev.includes(candidateId)) {
        return prev.filter(id => id !== candidateId);
      }
      return [...prev, candidateId];
    });
  };

  const handleSubmit = () => {
    const selectedCandidateData = candidates.filter(c => selectedCandidates.includes(c.id));
    onSelect(selectedCandidateData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-3xl max-h-[80vh] overflow-hidden">
        {/* tomiwa: Modal header */}
        <div className="p-6 border-b border-neutral-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-2xl text-[#021126]">Select Candidates</h2>
            <button
              onClick={onClose}
              className="text-neutral-500 hover:text-neutral-700"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* tomiwa: Search bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search candidates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 pl-10 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#36D0D8] focus:border-transparent"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* tomiwa: Candidates list */}
        <div className="overflow-y-auto max-h-[calc(80vh-200px)] p-6">
          <div className="space-y-4">
            {candidates
              .filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.role.toLowerCase().includes(searchQuery.toLowerCase()))
              .map(candidate => (
                <div
                  key={candidate.id}
                  className="flex items-center space-x-4 p-4 rounded-lg border border-neutral-200 hover:border-[#36D0D8] transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={selectedCandidates.includes(candidate.id)}
                    onChange={() => handleToggleCandidate(candidate.id)}
                    className="w-5 h-5 rounded border-neutral-300 text-[#36D0D8] focus:ring-[#36D0D8]"
                  />
                  <div className="h-12 w-12 rounded-full overflow-hidden relative">
                    <Image
                      src={candidate.image}
                      alt={candidate.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-[#021126]">{candidate.name}</h3>
                    <p className="text-sm text-neutral-600">{candidate.role}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium text-[#36D0D8]">
                      {candidate.matchPercentage}% Match
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium
                      ${candidate.status === 'Shortlisted' ? 'bg-[#36D0D8]/10 text-[#36D0D8]' : 'bg-[#FDD140]/10 text-[#FDD140]'}`}>
                      {candidate.status}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* tomiwa: Action buttons */}
        <div className="p-6 border-t border-neutral-200 bg-neutral-50">
          <div className="flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-4 py-2 text-neutral-700 hover:text-neutral-900"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={selectedCandidates.length === 0}
              className="px-6 py-2 bg-[#36D0D8] text-white rounded-lg hover:bg-[#36D0D8]/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Parse Selected ({selectedCandidates.length})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
