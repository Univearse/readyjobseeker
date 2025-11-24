import React from 'react';
import { aiTools } from '@/data/aiTools';
import AIToolCard from '@/components/ui/AIToolCard';

// tomiwa: AI Tools page displaying all available AI-powered recruitment tools
export default function AIToolsPage() {
  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white">
      {/* tomiwa: Page header with new design */}
      <div className="mb-12">
        <h1 className="font-display text-3xl sm:text-4xl text-[#021126] mb-3">
          AI Tools
        </h1>
        <p className="text-neutral-600 text-lg max-w-3xl leading-relaxed">
          Boost your hiring process with smart automation
        </p>
      </div>

      {/* tomiwa: Introduction section */}
      <div className="mb-12 p-6 sm:p-8 bg-[#36D0D8]/5 rounded-xl border border-[#36D0D8]/10">
        <h2 className="font-display text-xl text-[#021126] mb-4">
          Transform Your Recruitment Process
        </h2>
        <p className="text-neutral-600 leading-relaxed">
          Our AI-powered tools streamline every step of your hiring journey, from crafting the perfect job post 
          to making data-driven decisions. Each tool is designed to save you time while improving the quality of your hires.
        </p>
      </div>

      {/* tomiwa: Responsive grid layout for tool cards - 1 column on mobile, 2 on tablet, 3 on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {aiTools.map((tool) => (
          <AIToolCard
            key={tool.id}
            title={tool.title}
            description={tool.description}
            icon={tool.icon}
            href={tool.href}
          />
        ))}
      </div>

      {/* tomiwa: Help section at the bottom with updated styling */}
      <div className="rounded-xl bg-gradient-to-br from-[#021126] to-[#021126]/90 text-white p-6 sm:p-8">
        <div className="flex items-start space-x-6">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center">
              <span className="text-2xl">💡</span>
            </div>
          </div>
          <div>
            <h2 className="font-display text-xl text-white mb-3">
              Need Help Getting Started?
            </h2>
            <p className="text-white/80 mb-4 leading-relaxed">
              Our AI tools work together seamlessly throughout your recruitment process. Start with the AI Job Posting tool 
              to create an optimized listing, then use our other tools to streamline your candidate selection and engagement.
            </p>
            <a 
              href="/dashboard/employer/ai-tools/guide" 
              className="inline-flex items-center text-[#36D0D8] hover:text-[#EF522E] font-medium transition-colors"
            >
              View AI Tools Guide
              <svg className="ml-2 w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
