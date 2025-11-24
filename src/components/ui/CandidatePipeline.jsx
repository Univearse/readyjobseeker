import { useState, useMemo } from 'react';
import Image from 'next/image';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  CalendarIcon,
  ClockIcon,
  DocumentCheckIcon,
  UserGroupIcon,
  SparklesIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';
import CandidateDrawer from './CandidateDrawer';
import PipelineNavigation from './PipelineNavigation';

// tomiwa: Mock data for demonstration
const mockCandidates = {
  assessment_pending: [
    {
      id: 1,
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      role: 'Senior Frontend Developer',
      location: 'San Francisco, CA',
      matchScore: 95,
      skills: ['React', 'TypeScript', 'Node.js'],
      stage: 'assessment_pending',
      lastActivity: '2 days ago',
    },
    // Add more candidates...
  ],
  assessment_completed: [
    {
      id: 2,
      name: 'Michael Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
      role: 'Product Manager',
      location: 'New York, NY',
      matchScore: 92,
      skills: ['Product Strategy', 'Agile', 'User Research'],
      stage: 'assessment_completed',
      assessmentScore: 88,
      lastActivity: '1 day ago',
    },
    // Add more candidates...
  ],
  interview_scheduled: [
    {
      id: 3,
      name: 'Emily Johnson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
      role: 'UX Designer',
      location: 'Austin, TX',
      matchScore: 89,
      skills: ['UI/UX', 'Figma', 'User Testing'],
      stage: 'interview_scheduled',
      interviewDate: '2024-03-20T14:00:00',
      lastActivity: '3 hours ago',
    },
    // Add more candidates...
  ],
  offer_stage: [
    {
      id: 4,
      name: 'David Kim',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
      role: 'Backend Engineer',
      location: 'Seattle, WA',
      matchScore: 94,
      skills: ['Python', 'Django', 'AWS'],
      stage: 'offer_stage',
      offerStatus: 'pending',
      lastActivity: '5 hours ago',
    },
    // Add more candidates...
  ],
};

const stages = [
  { id: 'all', name: 'All Candidates', icon: DocumentCheckIcon },
  { id: 'assessment_pending', name: 'Assessment Pending', icon: DocumentCheckIcon },
  { id: 'assessment_completed', name: 'Assessment Completed', icon: CheckCircleIcon },
  { id: 'interview_scheduled', name: 'Interview Scheduled', icon: CalendarIcon },
  { id: 'offer_stage', name: 'Offer Stage', icon: StarIcon },
];

const StageStats = ({ stats }) => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-brand-aqua/10 rounded-xl">
          <UserGroupIcon className="w-6 h-6 text-brand-aqua" />
        </div>
        <div>
          <p className="text-neutral-600 text-sm">Total Shortlisted</p>
          <p className="text-2xl font-display font-bold text-brand-black">{stats.totalShortlisted}</p>
        </div>
      </div>
    </div>
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-brand-orange/10 rounded-xl">
          <DocumentCheckIcon className="w-6 h-6 text-brand-orange" />
        </div>
        <div>
          <p className="text-neutral-600 text-sm">Assessment Sent</p>
          <p className="text-2xl font-display font-bold text-brand-black">{stats.assessmentSent}</p>
        </div>
      </div>
    </div>
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-brand-yellow/10 rounded-xl">
          <CalendarIcon className="w-6 h-6 text-brand-yellow" />
        </div>
        <div>
          <p className="text-neutral-600 text-sm">Interviews Scheduled</p>
          <p className="text-2xl font-display font-bold text-brand-black">{stats.interviewsScheduled}</p>
        </div>
      </div>
    </div>
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-emerald-100 rounded-xl">
          <CheckCircleIcon className="w-6 h-6 text-emerald-500" />
        </div>
        <div>
          <p className="text-neutral-600 text-sm">Offer Stage</p>
          <p className="text-2xl font-display font-bold text-brand-black">{stats.offerStage}</p>
        </div>
      </div>
    </div>
  </div>
);

const MatchScore = ({ score }) => (
  <div className="flex items-center gap-1.5">
    <StarIcon className="w-4 h-4 text-brand-yellow" />
    <span className="text-sm font-medium text-neutral-700">{score}% Match</span>
  </div>
);

const AssessmentScore = ({ score }) => (
  <div className="flex items-center gap-1.5">
    <SparklesIcon className="w-4 h-4 text-brand-aqua" />
    <span className="text-sm font-medium text-neutral-700">{score}% Score</span>
  </div>
);

const OfferStatusBadge = ({ status }) => {
  const styles = {
    pending: 'bg-yellow-100 text-yellow-800',
    accepted: 'bg-emerald-100 text-emerald-800',
    declined: 'bg-red-100 text-red-800',
  };

  return (
    <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${styles[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const CandidateCard = ({ candidate, onClick }) => (
  <div
    className="bg-white rounded-xl shadow hover:shadow-lg transition-all duration-300 p-6 cursor-pointer"
    onClick={onClick}
  >
    <div className="flex items-start gap-4">
      {candidate.avatar && (
        <Image
          src={candidate.avatar}
          alt={candidate.name || 'Candidate'}
          width={48}
          height={48}
          className="rounded-xl"
        />
      )}
      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-display font-bold text-brand-black">
              {candidate.name || 'Unnamed Candidate'}
            </h3>
            {candidate.role && (
              <p className="text-sm text-neutral-600">{candidate.role}</p>
            )}
            {candidate.location && (
              <p className="text-sm text-neutral-500">{candidate.location}</p>
            )}
          </div>
          <div className="flex flex-col items-end gap-2">
            {candidate.matchScore && (
              <MatchScore score={candidate.matchScore} />
            )}
            {candidate.assessmentScore && (
              <AssessmentScore score={candidate.assessmentScore} />
            )}
            {candidate.offerStatus && (
              <OfferStatusBadge status={candidate.offerStatus} />
            )}
          </div>
        </div>
        
        {candidate.skills?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {candidate.skills.map((skill) => (
              <span
                key={skill}
                className="px-2 py-1 bg-neutral-100 text-neutral-600 rounded-lg text-xs"
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        {candidate.interviewDate && (
          <div className="mt-4 flex items-center gap-2 text-sm text-neutral-600">
            <CalendarIcon className="w-4 h-4" />
            {new Date(candidate.interviewDate).toLocaleDateString('en-US', {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
            })}
            <button
              className="ml-auto text-brand-aqua hover:text-brand-orange"
              onClick={(e) => {
                e.stopPropagation();
                // Handle reschedule
              }}
            >
              <ArrowPathIcon className="w-4 h-4" />
            </button>
          </div>
        )}

        {candidate.lastActivity && (
          <div className="mt-4 flex items-center gap-2 text-xs text-neutral-500">
            <ClockIcon className="w-4 h-4" />
            Last active {candidate.lastActivity}
          </div>
        )}
      </div>
    </div>
  </div>
);

const PipelineStage = ({ title, candidates, icon: Icon, isOpen, onToggle, onCandidateClick }) => (
  <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
    <button
      className="w-full px-6 py-4 flex items-center justify-between hover:bg-neutral-50"
      onClick={onToggle}
    >
      <div className="flex items-center gap-3">
        <Icon className="w-5 h-5 text-brand-aqua" />
        <h2 className="font-display font-bold text-lg text-brand-black">{title}</h2>
        <span className="ml-2 px-2.5 py-0.5 rounded-lg bg-neutral-100 text-neutral-600 text-sm">
          {candidates.length}
        </span>
      </div>
      {isOpen ? (
        <ChevronUpIcon className="w-5 h-5 text-neutral-400" />
      ) : (
        <ChevronDownIcon className="w-5 h-5 text-neutral-400" />
      )}
    </button>
    
    {isOpen && (
      <div className="p-6 space-y-4">
        {candidates.map((candidate) => (
          <CandidateCard
            key={candidate.id}
            candidate={candidate}
            onClick={() => onCandidateClick(candidate)}
          />
        ))}
      </div>
    )}
  </div>
);

export default function CandidatePipeline() {
  const [selectedStage, setSelectedStage] = useState('all');
  const [openStages, setOpenStages] = useState(['assessment_pending']);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const stageCounts = {
    all: Object.values(mockCandidates).flat().length,
    assessment_pending: mockCandidates.assessment_pending.length,
    assessment_completed: mockCandidates.assessment_completed.length,
    interview_scheduled: mockCandidates.interview_scheduled.length,
    offer_stage: mockCandidates.offer_stage.length,
  };

  const stats = {
    totalShortlisted: stageCounts.all,
    assessmentSent: stageCounts.assessment_pending + stageCounts.assessment_completed,
    interviewsScheduled: stageCounts.interview_scheduled,
    offerStage: stageCounts.offer_stage,
  };

  const filteredCandidates = useMemo(() => {
    if (selectedStage === 'all') {
      return mockCandidates;
    }
    return {
      [selectedStage]: mockCandidates[selectedStage] || [],
    };
  }, [selectedStage]);

  const toggleStage = (stage) => {
    setOpenStages((prev) =>
      prev.includes(stage)
        ? prev.filter((s) => s !== stage)
        : [...prev, stage]
    );
  };

  const handleCandidateClick = (candidate) => {
    setSelectedCandidate(candidate);
    setIsDrawerOpen(true);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <StageStats stats={stats} />
      
      <PipelineNavigation
        selectedStage={selectedStage}
        onStageChange={(index) => setSelectedStage(stages[index].id)}
        stageCounts={stageCounts}
      />
      
      <div className="px-8 space-y-6">
        {Object.entries(filteredCandidates).map(([stage, candidates]) => (
          <PipelineStage
            key={stage}
            title={stages.find(s => s.id === stage)?.name || stage}
            candidates={candidates}
            icon={stages.find(s => s.id === stage)?.icon || DocumentCheckIcon}
            isOpen={openStages.includes(stage)}
            onToggle={() => toggleStage(stage)}
            onCandidateClick={handleCandidateClick}
          />
        ))}
      </div>

      <CandidateDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        candidate={selectedCandidate}
      />
    </div>
  );
} 