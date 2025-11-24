'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Dialog } from '@headlessui/react';

// tomiwa: Enhanced sample candidate data with assessment and interview information
const sampleCandidates = [
  {
    id: 1,
    name: 'Sarah Johnson',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    title: 'Senior Frontend Developer',
    experience: 0.85,
    skills: 0.9,
    cultureFit: 0.75,
    education: 0.8,
    assessmentPerformance: 0.92,
    interviewFeedback: 0.88,
    summary: 'Full-stack developer with 6 years of experience in React and Node.js',
    highlights: [
      '6+ years of frontend development experience',
      'Led team of 5 developers at previous company',
      'Masters in Computer Science from Stanford',
    ],
    notes: '',
    assessments: [
      { name: 'Technical Assessment', score: 92, details: 'Excellent problem-solving skills' },
      { name: 'Coding Challenge', score: 88, details: 'Strong React expertise' },
      { name: 'System Design', score: 85, details: 'Good architectural understanding' }
    ],
    interviews: [
      { type: 'Technical', feedback: 'Strong communicator, excellent technical depth', rating: 4.5 },
      { type: 'Cultural', feedback: 'Great team player, aligned with values', rating: 4.0 }
    ],
    strengths: ['Technical leadership', 'Full-stack expertise', 'Strong academic background'],
    concerns: ['Culture fit score slightly below expectations'],
    recommendedActions: ['Final technical interview', 'Team fit assessment']
  },
  {
    id: 2,
    name: 'Michael Chen',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    title: 'Full Stack Engineer',
    experience: 0.75,
    skills: 0.85,
    cultureFit: 0.9,
    education: 0.7,
    assessmentPerformance: 0.95,
    interviewFeedback: 0.92,
    summary: 'Versatile developer with strong background in modern web technologies',
    highlights: [
      '5 years of full-stack development',
      'Created microservices architecture at scale',
      'Open source contributor to major frameworks',
    ],
    notes: '',
    assessments: [
      { name: 'Technical Assessment', score: 95, details: 'Outstanding problem-solving' },
      { name: 'Coding Challenge', score: 94, details: 'Excellent code quality' },
      { name: 'System Design', score: 96, details: 'Innovative solutions' }
    ],
    interviews: [
      { type: 'Technical', feedback: 'Exceptional technical knowledge', rating: 4.8 },
      { type: 'Cultural', feedback: 'Excellent cultural alignment', rating: 4.6 }
    ],
    strengths: ['Strong culture fit', 'System architecture', 'Open source contribution'],
    concerns: ['Education score lower than other candidates'],
    recommendedActions: ['System design discussion', 'Code review exercise']
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    title: 'Frontend Developer',
    experience: 0.65,
    skills: 0.95,
    cultureFit: 0.85,
    education: 0.9,
    assessmentPerformance: 0.88,
    interviewFeedback: 0.86,
    summary: 'Frontend specialist with focus on accessibility and performance',
    highlights: [
      '4 years specialized frontend experience',
      'Accessibility advocate and expert',
      'Computer Science degree with UI/UX focus',
    ],
    notes: '',
    assessments: [
      { name: 'Technical Assessment', score: 88, details: 'Strong frontend expertise' },
      { name: 'Coding Challenge', score: 90, details: 'Excellent UI implementation' },
      { name: 'Accessibility Test', score: 96, details: 'Outstanding accessibility knowledge' }
    ],
    interviews: [
      { type: 'Technical', feedback: 'Deep frontend knowledge', rating: 4.3 },
      { type: 'Cultural', feedback: 'Passionate about accessibility', rating: 4.4 }
    ],
    strengths: ['Frontend expertise', 'Accessibility focus', 'Strong education'],
    concerns: ['Less overall experience'],
    recommendedActions: ['Frontend coding challenge', 'Accessibility knowledge assessment']
  }
];

export default function CandidateRankingPage() {
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [isSelectionModalOpen, setIsSelectionModalOpen] = useState(false);
  const [rankingCriteria, setRankingCriteria] = useState({
    experience: 0.2,
    skills: 0.2,
    cultureFit: 0.15,
    education: 0.1,
    assessmentPerformance: 0.2,
    interviewFeedback: 0.15,
  });
  
  // tomiwa: State for candidate notes
  const [candidateNotes, setCandidateNotes] = useState({});
  
  // tomiwa: Effect to update candidate notes when selection changes
  useEffect(() => {
    const newNotes = {};
    selectedCandidates.forEach(candidate => {
      if (!candidateNotes[candidate.id]) {
        newNotes[candidate.id] = candidate.notes || '';
      }
    });
    setCandidateNotes(prev => ({ ...prev, ...newNotes }));
  }, [selectedCandidates]);

  // tomiwa: Calculate candidate scores based on all criteria
  const calculateScore = (candidate) => {
    return Object.entries(rankingCriteria).reduce((score, [criterion, weight]) => {
      return score + (candidate[criterion] * weight);
    }, 0);
  };

  // tomiwa: Get ranked candidates with scores
  const getRankedCandidates = () => {
    return selectedCandidates
      .map(candidate => ({
        ...candidate,
        score: calculateScore(candidate)
      }))
      .sort((a, b) => b.score - a.score);
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* tomiwa: Header section with tool information */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-[#36D0D8]/10 flex items-center justify-center">
            <span className="text-2xl">📊</span>
          </div>
          <h1 className="font-display text-3xl text-[#021126]">
            AI Candidate Ranking
          </h1>
        </div>
        <p className="text-neutral-600 text-lg max-w-3xl font-body">
          Compare and rank candidates using comprehensive AI-powered insights based on experience, skills, assessments, and interview feedback.
        </p>
      </div>

      {/* tomiwa: Main workspace area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* tomiwa: Left sidebar with ranking criteria */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl border border-neutral-200 p-6">
            <h2 className="font-display text-xl text-[#021126] mb-4">
              Ranking Criteria
            </h2>
            <div className="space-y-4">
              {Object.entries(rankingCriteria).map(([criterion, weight]) => (
                <div key={criterion} className="space-y-2">
                  <label className="flex items-center justify-between text-sm font-medium text-neutral-700">
                    <span className="capitalize">{criterion.replace(/([A-Z])/g, ' $1').trim()}</span>
                    <span className="text-[#36D0D8]">{(weight * 100).toFixed(0)}%</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={weight}
                    onChange={(e) => {
                      const newWeight = parseFloat(e.target.value);
                      setRankingCriteria(prev => ({
                        ...prev,
                        [criterion]: newWeight
                      }));
                    }}
                    className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-[#36D0D8]"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* tomiwa: Main content area */}
        <div className="lg:col-span-9">
          <div className="bg-white rounded-xl border border-neutral-200 p-6">
            {selectedCandidates.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[#36D0D8]/5 flex items-center justify-center">
                  <span className="text-4xl">🎯</span>
                </div>
                <h3 className="font-display text-xl text-[#021126] mb-3">
                  Select Candidates to Compare
                </h3>
                <p className="text-neutral-600 max-w-md mx-auto mb-6">
                  Choose candidates to start the comprehensive AI-powered ranking process.
                </p>
                <button
                  onClick={() => setIsSelectionModalOpen(true)}
                  className="inline-flex items-center px-6 py-3 rounded-lg bg-[#36D0D8] hover:bg-[#36D0D8]/90 text-white font-medium transition-colors"
                >
                  Select Candidates
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="font-display text-xl text-[#021126]">
                    Ranked Candidates ({selectedCandidates.length})
                  </h2>
                  <button
                    onClick={() => setIsSelectionModalOpen(true)}
                    className="inline-flex items-center px-4 py-2 rounded-lg bg-[#36D0D8]/10 hover:bg-[#36D0D8]/20 text-[#36D0D8] font-medium transition-colors"
                  >
                    Add More Candidates
                  </button>
                </div>
                
                <div className="space-y-6">
                  {getRankedCandidates().map((candidate, index) => (
                    <div
                      key={candidate.id}
                      className="bg-white rounded-lg border border-neutral-200 p-6 hover:border-[#36D0D8] transition-colors"
                    >
                      {/* tomiwa: Candidate header */}
                      <div className="flex items-start gap-4">
                        <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                          <Image
                            src={candidate.image}
                            alt={candidate.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h3 className="font-display text-lg text-[#021126] flex items-center gap-2">
                                {candidate.name}
                                {index === 0 && (
                                  <span className="inline-flex items-center px-2 py-1 rounded-full bg-[#FDD140] text-[#021126] text-xs font-medium">
                                    Top Match
                                  </span>
                                )}
                              </h3>
                              <p className="text-neutral-600 font-body">{candidate.title}</p>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-display text-[#36D0D8]">
                                {(candidate.score * 100).toFixed(0)}%
                              </div>
                              <div className="text-sm text-neutral-500 font-body">AI Rank Score</div>
                            </div>
                          </div>
                          
                          <p className="mt-2 text-neutral-600">{candidate.summary}</p>
                        </div>
                      </div>

                      {/* tomiwa: Evaluation metrics */}
                      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* tomiwa: CV-based scores */}
                        <div className="space-y-4">
                          <h4 className="font-display text-sm text-[#021126] uppercase tracking-wider">CV Analysis</h4>
                          <div className="grid grid-cols-2 gap-4">
                            {['experience', 'skills', 'education', 'cultureFit'].map(criterion => (
                              <div key={criterion} className="space-y-1">
                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-neutral-600 capitalize">{criterion.replace(/([A-Z])/g, ' $1').trim()}</span>
                                  <span className="text-[#36D0D8]">
                                    {(candidate[criterion] * 100).toFixed(0)}%
                                  </span>
                                </div>
                                <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-[#36D0D8] rounded-full"
                                    style={{ width: `${candidate[criterion] * 100}%` }}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                          </div>
                          
                        {/* tomiwa: Assessment & Interview scores */}
                        <div className="space-y-4">
                          <h4 className="font-display text-sm text-[#021126] uppercase tracking-wider">Assessment & Interview</h4>
                          <div className="space-y-4">
                            {/* tomiwa: Assessment results */}
                            <div className="space-y-2">
                              {candidate.assessments.map((assessment, i) => (
                                <div key={i} className="flex items-center justify-between text-sm p-2 bg-neutral-50 rounded-lg">
                                  <span className="text-neutral-700 font-body">{assessment.name}</span>
                                  <span className="font-medium text-[#36D0D8]">{assessment.score}%</span>
                                </div>
                            ))}
                          </div>

                            {/* tomiwa: Interview feedback */}
                            <div className="space-y-2">
                              {candidate.interviews.map((interview, i) => (
                                <div key={i} className="p-2 bg-neutral-50 rounded-lg">
                                  <div className="flex items-center justify-between text-sm">
                                    <span className="text-neutral-700 font-body">{interview.type} Interview</span>
                                    <span className="font-medium text-[#36D0D8]">{interview.rating}/5</span>
                                  </div>
                                  <p className="text-sm text-neutral-600 mt-1">{interview.feedback}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* tomiwa: Recruiter Notes */}
                      <div className="mt-6 border-t border-neutral-100 pt-4">
                            <label className="block text-sm font-medium text-neutral-700 mb-2">
                              Recruiter Notes
                            </label>
                            <textarea
                              value={candidateNotes[candidate.id] || ''}
                              onChange={(e) => setCandidateNotes(prev => ({
                                ...prev,
                                [candidate.id]: e.target.value
                              }))}
                              placeholder="Add your observations, concerns, or follow-up items..."
                              className="w-full h-24 px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-[#36D0D8] focus:border-transparent resize-none"
                            />
                          </div>

                          {/* tomiwa: Quick actions */}
                          <div className="mt-4 flex flex-wrap gap-2">
                        <button className="inline-flex items-center px-3 py-2 rounded-lg bg-[#36D0D8] hover:bg-[#36D0D8]/90 text-white text-sm font-medium transition-colors">
                              <span className="mr-2">📅</span>
                              Schedule Interview
                            </button>
                        <button className="inline-flex items-center px-3 py-2 rounded-lg bg-[#FDD140] hover:bg-[#FDD140]/90 text-[#021126] text-sm font-medium transition-colors">
                              <span className="mr-2">📝</span>
                          Send Assessment
                            </button>
                        <button className="inline-flex items-center px-3 py-2 rounded-lg bg-[#EF522E] hover:bg-[#EF522E]/90 text-white text-sm font-medium transition-colors">
                          <span className="mr-2">🎯</span>
                          Move to Offer
                            </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* tomiwa: AI Recommendation Summary */}
                <div className="mt-8 bg-white rounded-xl border border-neutral-200 p-6">
                  <h3 className="font-display text-xl text-[#021126] mb-4">
                    AI Recommendation Summary
                  </h3>
                  <div className="space-y-4">
                    {getRankedCandidates().slice(0, 1).map(topCandidate => (
                      <div key={topCandidate.id} className="space-y-4">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-[#FDD140]/10 flex items-center justify-center flex-shrink-0">
                            <span className="text-2xl">🎯</span>
                          </div>
                          <div>
                            <h4 className="font-display text-lg text-[#021126] mb-2">
                              Top Candidate Analysis
                            </h4>
                            <div className="space-y-2">
                              <div className="flex items-start gap-2">
                                <span className="text-[#36D0D8] font-medium">Strengths:</span>
                                <div className="flex-1">
                                  {topCandidate.strengths.map((strength, i) => (
                                    <span key={i} className="inline-block mr-2 text-neutral-600">
                                      • {strength}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <div className="flex items-start gap-2">
                                <span className="text-[#EF522E] font-medium">Concerns:</span>
                                <div className="flex-1">
                                  {topCandidate.concerns.map((concern, i) => (
                                    <span key={i} className="inline-block mr-2 text-neutral-600">
                                      • {concern}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-[#36D0D8]/10 flex items-center justify-center flex-shrink-0">
                            <span className="text-2xl">💡</span>
                          </div>
                          <div>
                            <h4 className="font-display text-lg text-[#021126] mb-2">
                              Recommended Next Steps
                            </h4>
                            <div className="space-y-2">
                              {topCandidate.recommendedActions.map((action, i) => (
                                <div key={i} className="flex items-center gap-2 text-neutral-600">
                                  <span className="w-6 h-6 rounded-full bg-[#36D0D8]/10 flex items-center justify-center text-[#36D0D8] font-medium">
                                    {i + 1}
                                  </span>
                                  {action}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* tomiwa: Help section */}
      <div className="mt-8 rounded-xl bg-gradient-to-br from-[#021126] to-[#021126]/90 text-white p-6">
        <div className="flex items-start space-x-6">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center">
              <span className="text-2xl">💡</span>
            </div>
          </div>
          <div>
            <h2 className="font-display text-xl text-white mb-3">
              How to Use AI Candidate Ranking
            </h2>
            <p className="text-white/80 mb-4 font-body">
              Get the most out of our comprehensive AI ranking system:
            </p>
            <ul className="list-disc list-inside text-white/80 space-y-2 mb-4 font-body">
              <li>Adjust criteria weights based on role requirements</li>
              <li>Review assessment results and interview feedback</li>
              <li>Add detailed recruiter notes for team collaboration</li>
              <li>Use quick actions to move candidates through the pipeline</li>
            </ul>
            <a 
              href="/dashboard/employer/ai-tools/candidate-ranking/learn" 
              className="inline-flex items-center text-[#36D0D8] hover:text-[#EF522E] font-medium transition-colors font-body"
            >
              Learn More About AI Ranking
              <svg className="ml-2 w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* tomiwa: Candidate selection modal */}
      <Dialog
        open={isSelectionModalOpen}
        onClose={() => setIsSelectionModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-4xl bg-white rounded-xl shadow-lg">
            <div className="p-6 border-b border-neutral-200">
              <div className="flex items-center justify-between">
                <Dialog.Title className="font-display text-2xl text-[#021126]">
                  Select Candidates
                </Dialog.Title>
                <button
                  onClick={() => setIsSelectionModalOpen(false)}
                  className="text-neutral-500 hover:text-neutral-700"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {sampleCandidates.map(candidate => {
                  const isSelected = selectedCandidates.some(c => c.id === candidate.id);
                  
                  return (
                    <div
                      key={candidate.id}
                      className={`
                        relative p-4 rounded-lg border cursor-pointer transition-all
                        ${isSelected
                          ? 'border-[#36D0D8] bg-[#36D0D8]/5'
                          : 'border-neutral-200 hover:border-neutral-300'
                        }
                      `}
                      onClick={() => {
                        if (isSelected) {
                          setSelectedCandidates(prev => prev.filter(c => c.id !== candidate.id));
                        } else {
                          setSelectedCandidates(prev => [...prev, candidate]);
                        }
                      }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                          <Image
                            src={candidate.image}
                            alt={candidate.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-display text-lg text-[#021126]">{candidate.name}</h3>
                          <p className="text-neutral-600 font-body">{candidate.title}</p>
                          <p className="mt-2 text-sm text-neutral-500 line-clamp-2">{candidate.summary}</p>
                        </div>
                      </div>
                      
                      {isSelected && (
                        <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-[#36D0D8] text-white flex items-center justify-center">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="p-6 border-t border-neutral-200 bg-neutral-50">
              <div className="flex items-center justify-between">
                <div className="text-neutral-600 font-body">
                  {selectedCandidates.length} candidate{selectedCandidates.length !== 1 ? 's' : ''} selected
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsSelectionModalOpen(false)}
                    className="px-4 py-2 text-neutral-700 hover:text-neutral-900"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setIsSelectionModalOpen(false)}
                    className="px-4 py-2 rounded-lg bg-[#36D0D8] hover:bg-[#36D0D8]/90 text-white font-medium transition-colors"
                  >
                    Confirm Selection
                  </button>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}