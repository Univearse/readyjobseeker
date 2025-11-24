/**
 * File: src/app/dashboard/candidate/ai-tools/aptitude-test-assistant/page.js
 * 
 * tomiwa: AI Aptitude Test Assistant - Help candidates prepare for aptitude tests
 * Comprehensive practice platform with AI-powered feedback and analytics
 * 
 * Features:
 * - Multiple test types (Numerical, Verbal, Logical, Abstract)
 * - Timed practice sessions
 * - Detailed explanations for answers
 * - Performance tracking and analytics
 * - Weak area identification
 * - Personalized study recommendations
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import CandidateDashboardLayout from '@/components/layouts/CandidateDashboardLayout';
import {
  CpuChipIcon,
  ClockIcon,
  ChartBarIcon,
  LightBulbIcon,
  PlayIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  BookOpenIcon,
  TrophyIcon,
  AcademicCapIcon,
  CalculatorIcon,
  PuzzlePieceIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';

export default function AptitudeTestAssistant() {
  // tomiwa: State for test selection and progress
  const [selectedTestType, setSelectedTestType] = useState('numerical');
  const [isTestStarted, setIsTestStarted] = useState(false);

  // tomiwa: Test types available
  const testTypes = [
    {
      id: 'numerical',
      name: 'Numerical Reasoning',
      description: 'Test your ability to work with numbers, charts, and data',
      icon: <CalculatorIcon className="w-6 h-6" />,
      duration: '20 minutes',
      questions: 25,
      difficulty: 'Medium',
      color: 'bg-brand-aqua'
    },
    {
      id: 'verbal',
      name: 'Verbal Reasoning',
      description: 'Assess reading comprehension and language skills',
      icon: <ChatBubbleLeftRightIcon className="w-6 h-6" />,
      duration: '25 minutes',
      questions: 30,
      difficulty: 'Medium',
      color: 'bg-brand-orange'
    },
    {
      id: 'logical',
      name: 'Logical Reasoning',
      description: 'Evaluate problem-solving and critical thinking',
      icon: <PuzzlePieceIcon className="w-6 h-6" />,
      duration: '30 minutes',
      questions: 20,
      difficulty: 'Hard',
      color: 'bg-brand-yellow'
    },
    {
      id: 'abstract',
      name: 'Abstract Reasoning',
      description: 'Test pattern recognition and spatial awareness',
      icon: <CpuChipIcon className="w-6 h-6" />,
      duration: '15 minutes',
      questions: 15,
      difficulty: 'Hard',
      color: 'bg-purple-500'
    }
  ];

  // tomiwa: Performance stats (mock data)
  const performanceStats = {
    totalTests: 12,
    averageScore: 78,
    strongestArea: 'Numerical Reasoning',
    weakestArea: 'Abstract Reasoning',
    improvement: '+15%'
  };

  // tomiwa: Handle test start
  const handleStartTest = (testType) => {
    setSelectedTestType(testType);
    setIsTestStarted(true);
    // tomiwa: In real implementation, this would navigate to test interface
    console.log(`Starting ${testType} test`);
  };

  return (
    <CandidateDashboardLayout>
      {/* tomiwa: Hero Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 -mt-8 -mx-6 mb-8">
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
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                  <CpuChipIcon className="w-6 h-6 text-white" />
                </div>
                <span className="text-white/80 font-medium">AI Aptitude Test Assistant</span>
              </div>
              <h1 className="text-3xl 
                            sm:text-4xl 
                            md:text-4xl 
                            lg:text-5xl 
                            font-display font-bold text-white mb-4">
                Master Aptitude Tests with AI
              </h1>
              <p className="text-white/90 text-base 
                           sm:text-lg 
                           md:text-lg 
                           lg:text-xl 
                           leading-relaxed max-w-2xl mb-6">
                Practice with realistic questions, get detailed explanations, and track your progress 
                to excel in any aptitude test with confidence.
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2 text-white/90">
                  <CheckCircleIcon className="w-4 h-4" />
                  <span>Timed Practice Tests</span>
                </div>
                <div className="flex items-center gap-2 text-white/90">
                  <CheckCircleIcon className="w-4 h-4" />
                  <span>Detailed Explanations</span>
                </div>
                <div className="flex items-center gap-2 text-white/90">
                  <CheckCircleIcon className="w-4 h-4" />
                  <span>Performance Analytics</span>
                </div>
              </div>
            </div>
            
            {/* tomiwa: Quick stats card */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 lg:w-80">
              <h3 className="text-white font-semibold mb-4">Your Progress</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{performanceStats.totalTests}</div>
                  <div className="text-xs text-white/70">Tests Taken</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{performanceStats.averageScore}%</div>
                  <div className="text-xs text-white/70">Avg Score</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-brand-yellow">{performanceStats.improvement}</div>
                  <div className="text-xs text-white/70">Improvement</div>
                </div>
                <div className="text-center">
                  <TrophyIcon className="w-6 h-6 text-brand-yellow mx-auto" />
                  <div className="text-xs text-white/70">Top 25%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* tomiwa: Main content */}
      <div className="px-6 
                      sm:px-8 
                      md:px-10 
                      lg:px-12 
                      xl:px-16 
                      2xl:px-20 
                      pb-12">

        {/* tomiwa: Test Types Selection */}
        <section className="mb-8">
          <div className="mb-6">
            <h2 className="text-2xl font-display font-bold text-neutral-900 mb-2">
              Choose Your Test Type
            </h2>
            <p className="text-neutral-600">
              Select from different aptitude test categories to practice and improve your skills
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {testTypes.map((test) => (
              <div key={test.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-6 border border-neutral-100 group">
                <div className={`w-12 h-12 ${test.color} rounded-lg flex items-center justify-center text-white mb-4`}>
                  {test.icon}
                </div>
                
                <h3 className="text-lg font-bold text-neutral-900 mb-2 group-hover:text-brand-aqua transition-colors">
                  {test.name}
                </h3>
                <p className="text-sm text-neutral-600 mb-4 leading-relaxed">
                  {test.description}
                </p>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-neutral-500">Duration:</span>
                    <span className="font-medium text-neutral-700">{test.duration}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-neutral-500">Questions:</span>
                    <span className="font-medium text-neutral-700">{test.questions}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-neutral-500">Difficulty:</span>
                    <span className={`font-medium ${test.difficulty === 'Hard' ? 'text-red-600' : 'text-amber-600'}`}>
                      {test.difficulty}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleStartTest(test.id)}
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
                  Start Practice Test
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* tomiwa: Performance Analytics */}
        <section className="mb-8">
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg p-6 border border-emerald-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <ChartBarIcon className="w-6 h-6 text-emerald-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-display font-bold text-neutral-900 mb-3">
                  Performance Analytics
                </h2>
                <p className="text-neutral-700 mb-4">
                  Track your progress and identify areas for improvement with detailed analytics
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-lg p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-emerald-600 mb-1">
                        {performanceStats.strongestArea}
                      </div>
                      <div className="text-sm text-neutral-600">Strongest Area</div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-amber-600 mb-1">
                        {performanceStats.weakestArea}
                      </div>
                      <div className="text-sm text-neutral-600">Needs Improvement</div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-brand-aqua mb-1">
                        {performanceStats.averageScore}%
                      </div>
                      <div className="text-sm text-neutral-600">Overall Average</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* tomiwa: Study Resources */}
        <section className="mb-8">
          <div className="mb-6">
            <h2 className="text-2xl font-display font-bold text-neutral-900 mb-2">
              Study Resources & Tips
            </h2>
            <p className="text-neutral-600">
              Enhance your preparation with curated study materials and expert tips
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-sm p-6 border border-neutral-100">
              <div className="w-12 h-12 bg-brand-orange/10 rounded-lg flex items-center justify-center mb-4">
                <BookOpenIcon className="w-6 h-6 text-brand-orange" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-2">Study Guides</h3>
              <p className="text-sm text-neutral-600 mb-4">
                Comprehensive guides covering all test types with examples and strategies
              </p>
              <button className="text-brand-aqua font-medium text-sm hover:text-[#0C5B65] transition-colors">
                Access Guides →
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 border border-neutral-100">
              <div className="w-12 h-12 bg-brand-yellow/10 rounded-lg flex items-center justify-center mb-4">
                <LightBulbIcon className="w-6 h-6 text-brand-yellow" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-2">Test Strategies</h3>
              <p className="text-sm text-neutral-600 mb-4">
                Learn proven techniques to maximize your score and manage time effectively
              </p>
              <button className="text-brand-aqua font-medium text-sm hover:text-[#0C5B65] transition-colors">
                View Strategies →
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 border border-neutral-100">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <ClockIcon className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-2">Time Management</h3>
              <p className="text-sm text-neutral-600 mb-4">
                Master time allocation techniques to complete tests within the given timeframe
              </p>
              <button className="text-brand-aqua font-medium text-sm hover:text-[#0C5B65] transition-colors">
                Learn Techniques →
              </button>
            </div>
          </div>
        </section>

        {/* tomiwa: Getting Started */}
        <section>
          <div className="bg-gradient-to-br from-brand-black to-brand-black/90 text-white rounded-lg p-6 sm:p-8">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center">
                  <AcademicCapIcon className="w-6 h-6 text-brand-yellow" />
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-display font-bold text-white mb-3">
                  Ready to Start Practicing?
                </h2>
                <p className="text-white/80 mb-4 leading-relaxed">
                  Begin with a quick assessment to identify your current skill level, then focus on 
                  areas that need improvement. Regular practice is key to success in aptitude tests.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => handleStartTest('numerical')}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-brand-aqua text-white font-semibold rounded-lg hover:bg-brand-aqua/90 transition-colors"
                  >
                    <PlayIcon className="w-5 h-5" />
                    Take Assessment Test
                    <ArrowRightIcon className="w-4 h-4" />
                  </button>
                  <Link
                    href="/dashboard/candidate/ai-tools"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors"
                  >
                    <ArrowRightIcon className="w-5 h-5 rotate-180" />
                    Back to AI Tools
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

