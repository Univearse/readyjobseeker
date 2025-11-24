import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function InterviewAssistantLearnPage() {
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
            <span className="text-2xl">🎯</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl text-[#021126]">
            AI Interview Assistant
          </h1>
        </div>
        <p className="text-neutral-600 text-lg max-w-3xl leading-relaxed">
          Streamline your interviews with AI-driven question generation, real-time guidance, and automatic post-interview summaries — all in one place.
        </p>
      </div>

      {/* tomiwa: Feature highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <div className="p-6 rounded-xl bg-[#36D0D8]/5 border border-[#36D0D8]/10">
          <div className="w-12 h-12 rounded-lg bg-[#36D0D8]/10 flex items-center justify-center mb-4">
            <span className="text-2xl">💡</span>
          </div>
          <h3 className="font-display text-xl text-[#021126] mb-3">Smart Question Generation</h3>
          <p className="text-neutral-600">
            Get tailored interview questions instantly based on job role, skill requirements, and candidate profiles.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-[#36D0D8]/5 border border-[#36D0D8]/10">
          <div className="w-12 h-12 rounded-lg bg-[#36D0D8]/10 flex items-center justify-center mb-4">
            <span className="text-2xl">🎯</span>
          </div>
          <h3 className="font-display text-xl text-[#021126] mb-3">Real-Time Guidance</h3>
          <p className="text-neutral-600">
            Receive live follow-up prompts and deeper probing questions during interviews to assess candidate potential.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-[#36D0D8]/5 border border-[#36D0D8]/10">
          <div className="w-12 h-12 rounded-lg bg-[#36D0D8]/10 flex items-center justify-center mb-4">
            <span className="text-2xl">📝</span>
          </div>
          <h3 className="font-display text-xl text-[#021126] mb-3">Auto Summaries</h3>
          <p className="text-neutral-600">
            AI captures and summarizes key points from each interview, saving time and ensuring consistent evaluation.
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
              title: 'Select Candidate or Role',
              description: 'Choose from shortlisted candidates or pick a job role to prepare tailored interview questions.',
              icon: '👥'
            },
            {
              step: '2',
              title: 'Generate Questions',
              description: 'AI creates structured and role-specific interview questions automatically.',
              icon: '✨'
            },
            {
              step: '3',
              title: 'Conduct Interview',
              description: 'Get real-time AI prompts and note suggestions during live interviews.',
              icon: '🎯'
            },
            {
              step: '4',
              title: 'Review & Save Summary',
              description: 'AI automatically creates an interview summary and feedback draft for post-evaluation.',
              icon: '📋'
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
          <h2 className="font-display text-3xl mb-4">Ready to Try the AI Interview Assistant?</h2>
          <p className="text-white/80 mb-8 text-lg">
            Start creating structured and efficient interviews that help you hire smarter and faster.
          </p>
          <Link
            href="/dashboard/employer/ai-tools/interview-assistant"
            className="inline-flex items-center justify-center px-6 py-3 bg-[#EF522E] hover:bg-[#EF522E]/90 text-white font-medium rounded-lg transition-colors text-lg"
          >
            Use Interview Assistant
            <svg className="ml-2 w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
