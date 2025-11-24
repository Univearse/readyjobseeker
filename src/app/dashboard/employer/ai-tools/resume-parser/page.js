'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AIToolWorkspace from '@/components/ui/AIToolWorkspace';
import CandidateSelectionModal from '@/components/ui/modals/CandidateSelectionModal';
import CandidateProfileModal from '@/components/ui/modals/CandidateProfileModal';
import ParsedResumeResults from '@/components/ui/ParsedResumeResults';

export default function ResumeParserPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [parsedResults, setParsedResults] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // tomiwa: Handle platform candidate selection
  const handleSelectPlatformCandidates = () => {
    setIsModalOpen(true);
  };

  // tomiwa: Handle selected candidates from modal
  const handleCandidatesSelected = (selectedCandidates) => {
    // tomiwa: Mock parsing process - replace with actual API call
    setParsedResults(selectedCandidates.map(candidate => ({
      ...candidate,
      skills: ['React', 'TypeScript', 'Node.js', 'AWS'],
      highlights: [
        '5+ years of frontend development experience',
        'Led team of 4 developers on e-commerce project',
        'Reduced page load time by 40%'
      ]
    })));
  };

  // tomiwa: Handle file upload
  const handleFileUpload = async (files) => {
    // tomiwa: Mock file upload and parsing - replace with actual API call
    const mockResults = files.map((file, index) => ({
      id: `upload-${index}`,
      name: file.name.split('.')[0],
      role: 'Software Engineer',
      matchPercentage: Math.floor(Math.random() * 30) + 70,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
      skills: ['JavaScript', 'Python', 'Docker', 'Kubernetes'],
      highlights: [
        '3 years of backend development',
        'Contributed to open source projects',
        'Developed CI/CD pipelines'
      ]
    }));

    setParsedResults(prev => [...prev, ...mockResults]);
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white">
      {/* tomiwa: Page header with navigation */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-neutral-500 mb-4">
          <Link href="/dashboard/employer/ai-tools" className="hover:text-[#EF522E]">
            AI Tools
          </Link>
          <span>→</span>
          <span>Resume Parser & Matcher</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl text-[#021126] mb-3">
          AI Resume Parser & Matcher
        </h1>
        <p className="text-neutral-600 text-lg max-w-3xl leading-relaxed">
          Extract key information from resumes and automatically match candidates to your job postings
        </p>
      </div>

      {/* tomiwa: Feature highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[
          {
            title: 'Smart Parsing',
            description: 'Extract skills, experience, and qualifications automatically from any resume format',
            icon: '🎯'
          },
          {
            title: 'Intelligent Matching',
            description: 'Get match scores based on job requirements and candidate qualifications',
            icon: '✨'
          },
          {
            title: 'Bulk Processing',
            description: 'Process multiple resumes at once and rank candidates automatically',
            icon: '📊'
          }
        ].map((feature, index) => (
          <div key={index} className="bg-white rounded-xl p-6 border border-neutral-200">
            <div className="w-12 h-12 rounded-lg bg-[#36D0D8]/10 flex items-center justify-center mb-4">
              <span className="text-2xl">{feature.icon}</span>
            </div>
            <h3 className="font-display text-lg text-[#021126] mb-2">
              {feature.title}
            </h3>
            <p className="text-neutral-600">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      {/* tomiwa: Main workspace */}
      <AIToolWorkspace
        toolName="resume-parser"
        uploadText="Drop resumes here or click to upload"
        acceptedFileTypes=".pdf,.doc,.docx"
        maxFileSize={10}
        onSelectPlatformCandidates={handleSelectPlatformCandidates}
        onFileUpload={handleFileUpload}
      />

      {/* tomiwa: Parsed results */}
      <ParsedResumeResults 
        results={parsedResults} 
        onViewProfile={(candidate) => {
          setSelectedCandidate(candidate);
          setIsProfileModalOpen(true);
        }}
      />

      {/* tomiwa: Profile modal */}
      <CandidateProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => {
          setIsProfileModalOpen(false);
          setSelectedCandidate(null);
        }}
        candidate={selectedCandidate}
      />

      {/* tomiwa: Learn more section */}
      <div className="mt-12 rounded-xl bg-gradient-to-br from-[#021126] to-[#021126]/90 text-white p-6 sm:p-8">
        <div className="flex items-start space-x-6">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center">
              <span className="text-2xl">📚</span>
            </div>
          </div>
          <div>
            <h2 className="font-display text-xl text-white mb-3">
              Want to Learn More?
            </h2>
            <p className="text-white/80 mb-4 leading-relaxed">
              Discover how to make the most of our AI Resume Parser & Matcher. Learn about advanced features, best practices, and tips for getting the most accurate matches.
            </p>
            <Link 
              href="/dashboard/employer/ai-tools/resume-parser/learn"
              className="inline-flex items-center text-[#36D0D8] hover:text-[#EF522E] font-medium transition-colors"
            >
              Explore Resume Parser Guide
              <svg className="ml-2 w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* tomiwa: Candidate selection modal */}
      <CandidateSelectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={handleCandidatesSelected}
      />
    </div>
  );
}