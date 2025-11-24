/**
 * File: src/app/dashboard/candidate/ai-tools/page.js
 * 
 * tomiwa: REDESIGNED AI Tools Page for Candidates
 * Comprehensive AI-powered tools to help candidates throughout their job search journey
 * 
 * Features:
 * - Resume Optimizer with ATS compatibility
 * - Cover Letter Generator with personalization
 * - Interview Simulator with AI feedback
 * - Job & Skills Match Analyzer with gap analysis
 * - Application Tracker with smart insights
 * - Aptitude Test Assistant with practice questions
 */

'use client';

import React from 'react';
import Link from 'next/link';
import CandidateDashboardLayout from '@/components/layouts/CandidateDashboardLayout';
import { candidateAiTools } from '@/data/candidateAiTools';
import {
  SparklesIcon,
  LightBulbIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  PlayIcon,
  DocumentTextIcon,
  AcademicCapIcon,
  BookOpenIcon
} from '@heroicons/react/24/outline';

export default function CandidateAITools() {

  return (
    <CandidateDashboardLayout>
      {/* tomiwa: Hero Banner with gradient background */}
      <div className="bg-gradient-to-r from-brand-aqua to-[#0C5B65] -mt-8 -mx-6 mb-8">
        <div className="px-6 
                        sm:px-8 
                        md:px-10 
                        lg:px-12 
                        xl:px-16 
                        2xl:px-20 
                        py-10 
                        sm:py-12 
                        md:py-14 
                        lg:py-16">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6">
            <div className="flex-1">
              <h1 className="text-3xl 
                            sm:text-4xl 
                            md:text-4xl 
                            lg:text-5xl 
                            font-display font-bold text-white mb-2">
                AI Career Tools
              </h1>
              <p className="text-[#D9E5E6] text-base 
                           sm:text-lg 
                           md:text-lg 
                           lg:text-xl 
                           leading-relaxed max-w-2xl">
                Supercharge your job search with AI-powered tools designed to help you land your dream job
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* tomiwa: Main content container */}
      <div className="px-6 
                      sm:px-8 
                      md:px-10 
                      lg:px-12 
                      xl:px-16 
                      2xl:px-20 
                      pb-12">


        {/* tomiwa: AI Tools Grid */}
        <section className="mb-8">
          <div className="mb-6">
            <h2 className="text-2xl font-display font-bold text-neutral-900 mb-2">
              Available AI Tools
            </h2>
            <p className="text-neutral-600">
              Choose from our comprehensive suite of AI-powered career tools
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {candidateAiTools.map((tool) => (
              <div key={tool.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-6 group border border-neutral-100">
                {/* tomiwa: Tool header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="text-3xl">{tool.icon}</div>
                </div>

                {/* tomiwa: Tool title and description */}
                <h3 className="text-lg font-bold text-neutral-900 mb-2 group-hover:text-brand-aqua transition-colors">
                  {tool.title}
                </h3>
                <p className="text-sm text-neutral-600 mb-6 leading-relaxed">
                  {tool.description}
                </p>

                {/* tomiwa: Action button */}
                <Link
                  href={tool.href}
                  className="inline-flex items-center justify-center gap-2 
                            w-full px-4 py-3 
                            bg-brand-aqua text-white 
                            text-sm font-semibold 
                            rounded-lg 
                            hover:bg-[#0C5B65] 
                            transition-colors 
                            focus:ring-2 focus:ring-brand-aqua focus:ring-offset-2"
                >
                  <PlayIcon className="w-4 h-4" />
                  Use This Tool
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* tomiwa: AI Tool Guide Section */}
        <section>
          <div className="bg-gradient-to-br from-brand-black to-brand-black/90 text-white rounded-lg p-6 sm:p-8">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center">
                  <LightBulbIcon className="w-6 h-6 text-brand-yellow" />
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-display font-bold text-white mb-3">
                  New to AI Tools? Learn How to Use Them Effectively!
                </h2>
                <p className="text-white/80 mb-4 leading-relaxed">
                  Master the art of AI-assisted job searching with our comprehensive guide. Learn best practices, 
                  industry ethics, data verification techniques, and how to use each tool responsibly and effectively.
                </p>
                
                {/* tomiwa: Quick access to all 6 AI tools */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
                  {candidateAiTools.map((tool) => (
                    <Link
                      key={tool.id}
                      href={tool.href}
                      className="inline-flex items-center gap-3 px-4 py-3 bg-white/10 text-white font-medium rounded-lg hover:bg-white/20 transition-colors group"
                    >
                      <span className="text-lg">{tool.icon}</span>
                      <span className="text-sm group-hover:text-brand-yellow transition-colors">
                        {tool.title.replace('AI ', '').replace('Smart ', '')}
                      </span>
                    </Link>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/dashboard/candidate/ai-tools/guide"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-brand-aqua text-white font-semibold rounded-lg hover:bg-brand-aqua/90 transition-colors"
                  >
                    <BookOpenIcon className="w-5 h-5" />
                    View Complete AI Tool Guide
                    <ArrowRightIcon className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/dashboard/candidate/ai-tools/resume-optimizer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors"
                  >
                    <DocumentTextIcon className="w-5 h-5" />
                    Start with Resume Optimizer
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </CandidateDashboardLayout>
  );
}