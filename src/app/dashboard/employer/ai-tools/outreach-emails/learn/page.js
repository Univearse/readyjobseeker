import React from 'react';
import Link from 'next/link';

// tomiwa: Learn More page for AI Outreach & Follow-up Emails tool
export default function OutreachEmailsLearnPage() {
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

      {/* tomiwa: Hero section with intro */}
      <div className="mb-12">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-[#36D0D8]/10 flex items-center justify-center">
            <span className="text-2xl">📧</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl text-[#021126]">
            AI Outreach & Follow-up Emails
          </h1>
        </div>
        <p className="text-neutral-600 text-lg max-w-3xl leading-relaxed">
          Automate candidate communication using AI for personalization and timing optimization. Create professional, engaging emails that improve response rates and streamline your recruitment workflow.
        </p>
      </div>

      {/* tomiwa: Three horizontal feature cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="p-6 rounded-xl bg-[#36D0D8]/5 border border-[#36D0D8]/10">
          <div className="w-12 h-12 rounded-xl bg-[#36D0D8]/10 flex items-center justify-center mb-4">
            <span className="text-2xl">✨</span>
          </div>
          <h3 className="font-display text-xl text-[#021126] mb-3">Smart Drafting</h3>
          <p className="text-neutral-600">
            Automatically create personalized messages using candidate and job data. AI analyzes profiles to craft relevant, engaging content that resonates with each recipient.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-[#FDD140]/5 border border-[#FDD140]/10">
          <div className="w-12 h-12 rounded-xl bg-[#FDD140]/10 flex items-center justify-center mb-4">
            <span className="text-2xl">🎯</span>
          </div>
          <h3 className="font-display text-xl text-[#021126] mb-3">Tone Control</h3>
          <p className="text-neutral-600">
            Adjust writing style to match your brand or situation. Choose from professional, neutral, or friendly tones to ensure every message aligns with your company culture.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-[#EF522E]/5 border border-[#EF522E]/10">
          <div className="w-12 h-12 rounded-xl bg-[#EF522E]/10 flex items-center justify-center mb-4">
            <span className="text-2xl">📊</span>
          </div>
          <h3 className="font-display text-xl text-[#021126] mb-3">Engagement Insights</h3>
          <p className="text-neutral-600">
            Get recommendations for best send times and predict response likelihood. AI analyzes historical data to optimize delivery windows and improve engagement rates.
          </p>
        </div>
      </div>

      {/* tomiwa: How It Works section with four simple steps */}
      <div className="mb-16">
        <h2 className="font-display text-2xl text-[#021126] mb-8">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: '1',
              title: 'Choose Email Type',
              description: 'Select from interview invites, follow-ups, rejections, or custom messages to match your communication needs.',
              icon: '📝'
            },
            {
              step: '2',
              title: 'Select Recipients',
              description: 'Choose candidates from your shortlist, filter by job role, or import contacts via CSV for bulk outreach.',
              icon: '👥'
            },
            {
              step: '3',
              title: 'Generate AI Draft',
              description: 'AI creates personalized content with the right tone, subject line, and attachments based on your selections.',
              icon: '🤖'
            },
            {
              step: '4',
              title: 'Send or Schedule',
              description: 'Review the generated email, make any adjustments, then send immediately or schedule for optimal timing.',
              icon: '🚀'
            }
          ].map((item, index) => (
            <div key={index} className="relative">
              <div className="p-6 rounded-xl bg-white border border-neutral-200 hover:border-[#36D0D8] transition-colors">
                <div className="w-12 h-12 rounded-xl bg-[#36D0D8]/10 flex items-center justify-center mb-4">
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

      {/* tomiwa: Full-width call-to-action banner */}
      <div className="rounded-xl bg-gradient-to-br from-[#021126] to-[#021126]/90 text-white p-8 sm:p-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl mb-4">Start sending better candidate emails</h2>
          <p className="text-white/80 mb-8 text-lg">
            Transform your candidate communication with AI-powered personalization and timing optimization.
          </p>
          <Link
            href="/dashboard/employer/ai-tools/outreach-emails"
            className="inline-flex items-center justify-center px-8 py-4 bg-[#EF522E] hover:bg-[#EF522E]/90 text-white font-medium rounded-xl transition-colors text-lg"
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
