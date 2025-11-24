import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function JobPostingLearnPage() {
  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white">
      {/* tomiwa: Back navigation */}
      <Link
        href="/dashboard/employer/ai-tools"
        className="inline-flex items-center text-[#36D0D8] hover:text-[#EF522E] mb-8 font-medium"
      >
        <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to AI Tools
      </Link>

      {/* tomiwa: Hero section */}
      <div className="mb-12">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 rounded-lg bg-[#36D0D8]/10 flex items-center justify-center">
            <span className="text-2xl">✨</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl text-[#021126]">
            AI Job Posting
          </h1>
        </div>
        <p className="text-neutral-600 text-lg max-w-3xl leading-relaxed">
          Create compelling job postings that attract top talent using our AI-powered tool. Get smart suggestions, optimize for search visibility, and ensure compliance - all in one place.
        </p>
      </div>

      {/* tomiwa: Feature highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <div className="p-6 rounded-xl bg-[#36D0D8]/5 border border-[#36D0D8]/10">
          <div className="w-12 h-12 rounded-lg bg-[#36D0D8]/10 flex items-center justify-center mb-4">
            <span className="text-2xl">🎯</span>
          </div>
          <h3 className="font-display text-xl text-[#021126] mb-3">Smart Suggestions</h3>
          <p className="text-neutral-600">
            Get real-time suggestions for job titles, skills, and qualifications based on market data and industry standards.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-[#36D0D8]/5 border border-[#36D0D8]/10">
          <div className="w-12 h-12 rounded-lg bg-[#36D0D8]/10 flex items-center justify-center mb-4">
            <span className="text-2xl">📈</span>
          </div>
          <h3 className="font-display text-xl text-[#021126] mb-3">SEO Optimization</h3>
          <p className="text-neutral-600">
            Automatically optimize your job posting for search engines with relevant keywords and proper formatting.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-[#36D0D8]/5 border border-[#36D0D8]/10">
          <div className="w-12 h-12 rounded-lg bg-[#36D0D8]/10 flex items-center justify-center mb-4">
            <span className="text-2xl">⚖️</span>
          </div>
          <h3 className="font-display text-xl text-[#021126] mb-3">Compliance Check</h3>
          <p className="text-neutral-600">
            Ensure your job posting follows best practices and legal requirements with our built-in compliance checker.
          </p>
        </div>
      </div>

      {/* tomiwa: How it works section */}
      <div className="mb-16">
        <h2 className="font-display text-2xl text-[#021126] mb-8">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: '1',
              title: 'Choose Template',
              description: 'Select from industry-specific templates or start from scratch.',
              icon: '📝'
            },
            {
              step: '2',
              title: 'Add Details',
              description: 'Input role details with AI-powered suggestions and guidance.',
              icon: '✏️'
            },
            {
              step: '3',
              title: 'Review & Optimize',
              description: 'Get instant feedback and optimization suggestions.',
              icon: '🔍'
            },
            {
              step: '4',
              title: 'Publish & Share',
              description: 'Post your optimized job listing across multiple platforms.',
              icon: '🚀'
            }
          ].map((item, index) => (
            <div key={index} className="relative">
              <div className="p-6 rounded-xl bg-white border border-neutral-200 hover:border-[#36D0D8] transition-colors">
                <div className="w-12 h-12 rounded-lg bg-[#36D0D8]/10 flex items-center justify-center mb-4">
                  <span className="text-2xl">{item.icon}</span>
                </div>
                <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-[#FDD140] flex items-center justify-center font-display text-[#021126]">
                  {item.step}
                </div>
                <h3 className="font-display text-lg text-[#021126] mb-2">{item.title}</h3>
                <p className="text-neutral-600 text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* tomiwa: CTA section */}
      <div className="rounded-xl bg-gradient-to-br from-[#021126] to-[#021126]/90 text-white p-8 sm:p-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl mb-4">Ready to Create Your Job Posting?</h2>
          <p className="text-white/80 mb-8 text-lg">
            Start creating optimized job postings that attract the right candidates with our AI-powered tool.
          </p>
          <Link
            href="/dashboard/employer/ai-tools/job-posting"
            className="inline-flex items-center justify-center px-6 py-3 bg-[#EF522E] hover:bg-[#EF522E]/90 text-white font-medium rounded-lg transition-colors text-lg"
          >
            Get Started
            <svg className="ml-2 w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
