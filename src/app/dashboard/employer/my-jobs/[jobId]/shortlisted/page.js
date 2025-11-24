'use client';

import CandidatePipeline from '@/components/ui/CandidatePipeline';
import { UserGroupIcon } from '@heroicons/react/24/outline';

export default function ShortlistedCandidates() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center gap-3">
            <UserGroupIcon className="w-6 h-6 text-brand-aqua" />
            <h1 className="text-2xl font-display font-bold text-brand-black">
              Shortlisted Candidates
            </h1>
          </div>
        </div>
      </div>

      {/* Pipeline View */}
      <CandidatePipeline />
    </div>
  );
} 