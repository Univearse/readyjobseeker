'use client';

import React from 'react';
import Image from 'next/image';

export default function ParsedResumeResults({ results = [], onViewProfile }) {
  if (!results.length) return null;

  return (
    <div className="mt-8">
      <h2 className="font-display text-2xl text-[#021126] mb-6">Parsed Results</h2>
      
      <div className="space-y-4">
        {results.map((candidate, index) => (
          <div
            key={index}
            className="bg-white rounded-xl border border-neutral-200 overflow-hidden hover:border-[#36D0D8] transition-colors"
          >
            <div className="p-6">
              <div className="flex items-start space-x-4">
                {/* tomiwa: Candidate image and basic info */}
                <div className="h-16 w-16 rounded-full overflow-hidden relative flex-shrink-0">
                  <Image
                    src={candidate.image || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e'}
                    alt={candidate.name}
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-display text-lg text-[#021126]">{candidate.name}</h3>
                      <p className="text-neutral-600">{candidate.role}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-medium text-[#36D0D8]">
                        {candidate.matchPercentage}%
                      </span>
                      <span className="text-sm text-neutral-500">Match</span>
                    </div>
                  </div>

                  {/* tomiwa: Skills section */}
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-neutral-700 mb-2">Key Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {candidate.skills?.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-3 py-1 rounded-full text-sm bg-[#36D0D8]/10 text-[#36D0D8]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* tomiwa: Experience highlights */}
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-neutral-700 mb-2">Experience Highlights</h4>
                    <ul className="text-sm text-neutral-600 space-y-1">
                      {candidate.highlights?.map((highlight, highlightIndex) => (
                        <li key={highlightIndex} className="flex items-center space-x-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#36D0D8]"></span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* tomiwa: Action buttons */}
            <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-200">
              <div className="flex justify-between items-center">
                <button 
                  onClick={() => onViewProfile(candidate)}
                  className="px-4 py-2 text-sm text-[#021126] hover:text-[#EF522E] flex items-center space-x-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span>View Profile</span>
                </button>
                <div className="flex space-x-3">
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
