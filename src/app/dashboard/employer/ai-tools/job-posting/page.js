import React from 'react';
import Link from 'next/link';
import AIToolWorkspace from '@/components/ui/AIToolWorkspace';

export default function JobPostingPage() {
  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white">
      {/* tomiwa: Navigation and header */}
      <div className="mb-8">
        <Link
          href="/dashboard/employer/ai-tools"
          className="inline-flex items-center text-[#36D0D8] hover:text-[#EF522E] mb-4 font-medium"
        >
          <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to AI Tools
        </Link>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-lg bg-[#36D0D8]/10 flex items-center justify-center">
              <span className="text-2xl">✨</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl text-[#021126]">
              AI Job Posting
            </h1>
          </div>
          
          <Link
            href="/dashboard/employer/ai-tools/job-posting/learn"
            className="inline-flex items-center text-[#36D0D8] hover:text-[#EF522E] font-medium"
          >
            Learn More
            <svg className="ml-2 w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* tomiwa: Quick tips section */}
      <div className="mb-8 p-6 rounded-xl bg-[#36D0D8]/5 border border-[#36D0D8]/10">
        <h2 className="font-display text-lg text-[#021126] mb-3">Quick Tips</h2>
        <ul className="space-y-2 text-neutral-600">
          <li className="flex items-start">
            <span className="mr-2">•</span>
            Start with a template or enter your job details from scratch
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            Use AI suggestions to optimize your job title and description
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            Review the compliance checklist before publishing
          </li>
        </ul>
      </div>

      {/* tomiwa: Main workspace */}
      <div className="rounded-xl border border-neutral-200 overflow-hidden">
        <AIToolWorkspace
          toolId="job-posting"
          initialPrompt="I want to create a job posting for"
          placeholderText="Enter the job title or role you're hiring for..."
          suggestedPrompts={[
            "Create a job posting for a Senior Frontend Developer with React expertise",
            "Write a job description for a Marketing Manager with 5 years experience",
            "Generate a job post for an AI/ML Engineer with Python skills"
          ]}
        />
      </div>
    </div>
  );
}
