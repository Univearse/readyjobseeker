import React from 'react';
import Link from 'next/link';

export default function ResumeParserLearnPage() {
  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white">
      {/* tomiwa: Page header with navigation */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-neutral-500 mb-4">
          <Link href="/dashboard/employer/ai-tools" className="hover:text-[#EF522E]">
            AI Tools
          </Link>
          <span>→</span>
          <Link href="/dashboard/employer/ai-tools/resume-parser" className="hover:text-[#EF522E]">
            Resume Parser & Matcher
          </Link>
          <span>→</span>
          <span>Learn</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl text-[#021126] mb-3">
          Getting Started with Resume Parser & Matcher
        </h1>
        <p className="text-neutral-600 text-lg max-w-3xl leading-relaxed">
          Learn how to effectively use our AI-powered resume parsing and matching system
        </p>
      </div>

      {/* tomiwa: Main content sections */}
      <div className="space-y-12">
        {/* tomiwa: How it works section */}
        <section className="bg-white rounded-xl p-8 border border-neutral-200">
          <h2 className="font-display text-2xl text-[#021126] mb-6">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-display text-lg text-[#021126] mb-3">Resume Parsing</h3>
              <p className="text-neutral-600 mb-4">
                Our AI system automatically extracts key information from resumes, including:
              </p>
              <ul className="space-y-2 text-neutral-600">
                <li className="flex items-center gap-2">
                  <span className="text-[#36D0D8]">✓</span>
                  Skills and technologies
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#36D0D8]">✓</span>
                  Work experience and duration
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#36D0D8]">✓</span>
                  Education and certifications
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#36D0D8]">✓</span>
                  Projects and achievements
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-display text-lg text-[#021126] mb-3">Intelligent Matching</h3>
              <p className="text-neutral-600 mb-4">
                The matching system compares parsed resumes against your job requirements:
              </p>
              <ul className="space-y-2 text-neutral-600">
                <li className="flex items-center gap-2">
                  <span className="text-[#36D0D8]">✓</span>
                  Skills alignment scoring
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#36D0D8]">✓</span>
                  Experience level matching
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#36D0D8]">✓</span>
                  Education requirements check
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#36D0D8]">✓</span>
                  Overall match percentage
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* tomiwa: Best practices section */}
        <section className="bg-white rounded-xl p-8 border border-neutral-200">
          <h2 className="font-display text-2xl text-[#021126] mb-6">Best Practices</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Prepare Your Job Posts',
                description: 'Ensure your job posts have clear requirements and skills listed for better matching accuracy.',
                icon: '📝'
              },
              {
                title: 'Use Bulk Upload',
                description: 'Save time by uploading multiple resumes at once and getting batch analysis results.',
                icon: '📤'
              },
              {
                title: 'Review Match Scores',
                description: 'Always review the AI suggestions and match scores to make informed decisions.',
                icon: '👀'
              }
            ].map((practice, index) => (
              <div key={index} className="p-6 bg-[#36D0D8]/5 rounded-xl">
                <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center mb-4">
                  <span className="text-2xl">{practice.icon}</span>
                </div>
                <h3 className="font-display text-lg text-[#021126] mb-2">
                  {practice.title}
                </h3>
                <p className="text-neutral-600">
                  {practice.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* tomiwa: Tips and tricks section */}
        <section className="bg-white rounded-xl p-8 border border-neutral-200">
          <h2 className="font-display text-2xl text-[#021126] mb-6">Tips & Tricks</h2>
          <div className="space-y-6">
            {[
              {
                title: 'Supported File Formats',
                content: 'We support PDF, DOC, and DOCX formats. For best results, encourage candidates to submit PDFs.'
              },
              {
                title: 'Custom Skills Dictionary',
                content: 'Add industry-specific terms and skills to your company dictionary for better matching accuracy.'
              },
              {
                title: 'Match Score Threshold',
                content: 'Set minimum match score thresholds to automatically filter candidates based on your requirements.'
              }
            ].map((tip, index) => (
              <div key={index} className="border-l-4 border-[#36D0D8] pl-6">
                <h3 className="font-display text-lg text-[#021126] mb-2">
                  {tip.title}
                </h3>
                <p className="text-neutral-600">
                  {tip.content}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* tomiwa: Ready to start section */}
        <div className="bg-gradient-to-br from-[#021126] to-[#021126]/90 rounded-xl p-8 text-white">
          <h2 className="font-display text-2xl mb-4">Ready to Get Started?</h2>
          <p className="text-white/80 mb-6">
            Now that you understand how our AI Resume Parser & Matcher works, try it out with your job postings and candidate resumes.
          </p>
          <Link
            href="/dashboard/employer/ai-tools/resume-parser"
            className="inline-flex items-center bg-[#36D0D8] hover:bg-[#EF522E] text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Start Parsing Resumes
            <svg className="ml-2 w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
