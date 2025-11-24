import React from 'react';
import Link from 'next/link';

// tomiwa: Learn More page for the Job Description Generator tool
export default function JobDescriptionLearnPage() {
  return (
    <div className="w-full max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* tomiwa: Header section */}
      <div className="mb-12">
        <Link
          href="/dashboard/employer/ai-tools/job-description"
          className="inline-flex items-center text-[#36D0D8] hover:text-[#EF522E] font-medium mb-6 transition-colors"
        >
          <svg className="mr-2 w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Tool
        </Link>

        <h1 className="font-display text-3xl sm:text-4xl text-[#021126] mb-4">
          AI Job Description Generator
        </h1>
        <p className="text-neutral-600 text-lg max-w-3xl leading-relaxed">
          Learn how to create compelling job descriptions that attract the right candidates using our AI-powered tool.
        </p>
      </div>

      {/* tomiwa: Main content sections */}
      <div className="space-y-12">
        {/* tomiwa: Key Features section */}
        <section>
          <h2 className="font-display text-2xl text-[#021126] mb-6">
            Key Features
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                title: 'Smart Templates',
                description: 'Industry-specific templates that adapt to your needs',
                icon: '📝'
              },
              {
                title: 'Skills Suggestion',
                description: 'AI-powered relevant skills and qualifications suggestions',
                icon: '🎯'
              },
              {
                title: 'Bias Detection',
                description: 'Identifies and helps remove biased language',
                icon: '⚖️'
              },
              {
                title: 'SEO Optimization',
                description: 'Optimizes content for job board visibility',
                icon: '🔍'
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-6 border border-neutral-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[#36D0D8]/10 flex items-center justify-center">
                    <span className="text-xl">{feature.icon}</span>
                  </div>
                  <h3 className="font-display text-lg text-[#021126]">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-neutral-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* tomiwa: How It Works section */}
        <section>
          <h2 className="font-display text-2xl text-[#021126] mb-6">
            How It Works
          </h2>
          <div className="space-y-6">
            {[
              {
                step: 1,
                title: 'Enter Basic Information',
                description: 'Start by providing the job title, industry, and experience level required.'
              },
              {
                step: 2,
                title: 'Review AI Suggestions',
                description: 'Our AI analyzes your input and suggests relevant skills, qualifications, and responsibilities.'
              },
              {
                step: 3,
                title: 'Customize Content',
                description: 'Edit and refine the generated description to match your specific needs.'
              },
              {
                step: 4,
                title: 'Optimize and Export',
                description: 'Get SEO recommendations and export your polished job description.'
              }
            ].map((step, index) => (
              <div key={index} className="flex items-start gap-6">
                <div className="w-8 h-8 rounded-full bg-[#36D0D8] text-white flex items-center justify-center flex-shrink-0">
                  {step.step}
                </div>
                <div>
                  <h3 className="font-display text-lg text-[#021126] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-neutral-600">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* tomiwa: Best Practices section */}
        <section>
          <h2 className="font-display text-2xl text-[#021126] mb-6">
            Best Practices
          </h2>
          <div className="bg-[#36D0D8]/5 rounded-xl p-6 border border-[#36D0D8]/10">
            <ul className="space-y-4">
              {[
                'Be specific about required skills and experience',
                'Include both technical requirements and soft skills',
                'Highlight company culture and values',
                'Specify location and work arrangement (remote/hybrid/onsite)',
                'Include salary range and benefits when possible',
                'Keep the tone professional but engaging',
                'Use inclusive language',
                'Structure content with clear sections'
              ].map((practice, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-[#36D0D8] mt-1">•</span>
                  <span className="text-neutral-600">{practice}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* tomiwa: Call to Action */}
        <div className="bg-gradient-to-br from-[#021126] to-[#021126]/90 rounded-xl p-8 text-center">
          <h2 className="font-display text-2xl text-white mb-4">
            Ready to Create Your Job Description?
          </h2>
          <p className="text-white/80 mb-6 max-w-2xl mx-auto">
            Start using our AI Job Description Generator to create compelling job posts that attract top talent.
          </p>
          <Link
            href="/dashboard/employer/ai-tools/job-description"
            className="inline-flex items-center px-6 py-3 bg-[#EF522E] hover:bg-[#EF522E]/90 text-white font-medium rounded-lg transition-colors"
          >
            Get Started
            <svg className="ml-2 w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
