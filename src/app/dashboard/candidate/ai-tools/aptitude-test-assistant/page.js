/**
 * File: src/app/dashboard/candidate/ai-tools/aptitude-test-assistant/page.js
 * 
 * tomiwa: AI Aptitude Test Assistant - Professional test preparation platform
 * Comprehensive practice platform with sample tests and external resources
 * 
 * Features:
 * - Sample aptitude tests with external links
 * - Multiple test categories (Numerical, Verbal, Logical, Abstract)
 * - Curated external test resources
 * - Performance tracking and analytics
 * - Professional, mature design
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import CandidateDashboardLayout from '@/components/layouts/CandidateDashboardLayout.jsx';
import {
  ArrowTopRightOnSquareIcon,
  ClockIcon,
  ChartBarIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  BookOpenIcon,
  TrophyIcon,
  AcademicCapIcon,
  CalculatorIcon,
  PuzzlePieceIcon,
  ChatBubbleLeftRightIcon,
  CpuChipIcon,
  ArrowLeftIcon,
  StarIcon,
  BuildingOffice2Icon,
  GlobeAltIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

export default function AptitudeTestAssistant() {
  // tomiwa: State for active category filter
  const [activeCategory, setActiveCategory] = useState('all');

  // tomiwa: Test categories for filtering
  const categories = [
    { id: 'all', name: 'All Tests' },
    { id: 'numerical', name: 'Numerical' },
    { id: 'verbal', name: 'Verbal' },
    { id: 'logical', name: 'Logical' },
    { id: 'situational', name: 'Situational' }
  ];

  // tomiwa: Sample aptitude tests with external links - curated high-quality resources
  const sampleTests = [
    {
      id: 1,
      title: 'SHL Numerical Reasoning',
      provider: 'SHL Practice',
      category: 'numerical',
      description: 'Industry-standard numerical reasoning tests used by major employers worldwide. Practice with data interpretation, graphs, and calculations.',
      duration: '20 minutes',
      questions: 18,
      difficulty: 'Intermediate',
      rating: 4.8,
      externalUrl: 'https://www.shl.com/shldirect/en/practice-tests',
      features: ['Timed conditions', 'Score report', 'Answer explanations'],
      logo: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=100&h=100&fit=crop'
    },
    {
      id: 2,
      title: 'Graduate Verbal Reasoning',
      provider: 'Assessment Day',
      category: 'verbal',
      description: 'Comprehensive verbal reasoning practice covering reading comprehension, critical thinking, and text analysis commonly used in graduate recruitment.',
      duration: '25 minutes',
      questions: 30,
      difficulty: 'Advanced',
      rating: 4.7,
      externalUrl: 'https://www.assessmentday.co.uk/verbal-reasoning-test.htm',
      features: ['Graduate level', 'Detailed feedback', 'Multiple formats'],
      logo: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=100&h=100&fit=crop'
    },
    {
      id: 3,
      title: 'Logical Reasoning Assessment',
      provider: 'Practice Aptitude Tests',
      category: 'logical',
      description: 'Test your deductive and inductive reasoning skills with pattern recognition, sequences, and logical problem-solving exercises.',
      duration: '30 minutes',
      questions: 25,
      difficulty: 'Intermediate',
      rating: 4.6,
      externalUrl: 'https://www.practiceaptitudetests.com/logical-reasoning-tests/',
      features: ['Pattern recognition', 'Deductive reasoning', 'Progress tracking'],
      logo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&h=100&fit=crop'
    },
    {
      id: 4,
      title: 'Watson Glaser Critical Thinking',
      provider: 'TalentLens',
      category: 'verbal',
      description: 'The gold standard for critical thinking assessment, widely used in law, management, and consulting recruitment processes.',
      duration: '40 minutes',
      questions: 40,
      difficulty: 'Advanced',
      rating: 4.9,
      externalUrl: 'https://www.talentlens.com/assessments/watson-glaser.html',
      features: ['Industry standard', 'Comprehensive', 'Career-focused'],
      logo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
    },
    {
      id: 5,
      title: 'Numerical Data Interpretation',
      provider: 'JobTestPrep',
      category: 'numerical',
      description: 'Master financial data, charts, and statistical analysis with tests designed for finance and consulting roles.',
      duration: '25 minutes',
      questions: 20,
      difficulty: 'Advanced',
      rating: 4.7,
      externalUrl: 'https://www.jobtestprep.com/numerical-reasoning-test',
      features: ['Finance-focused', 'Real scenarios', 'Expert tips'],
      logo: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=100&h=100&fit=crop'
    },
    {
      id: 6,
      title: 'Abstract Reasoning Practice',
      provider: 'WikiJob',
      category: 'logical',
      description: 'Develop your ability to identify patterns, shapes, and sequences without relying on language or numbers.',
      duration: '15 minutes',
      questions: 15,
      difficulty: 'Intermediate',
      rating: 4.5,
      externalUrl: 'https://www.wikijob.co.uk/aptitude-test/test-types/abstract-reasoning',
      features: ['Visual patterns', 'Shape sequences', 'Non-verbal'],
      logo: 'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=100&h=100&fit=crop'
    },
    {
      id: 7,
      title: 'Situational Judgement Test',
      provider: 'Assessment Centre HQ',
      category: 'situational',
      description: 'Practice workplace scenario-based questions that assess your judgment and decision-making in professional situations.',
      duration: '35 minutes',
      questions: 30,
      difficulty: 'Intermediate',
      rating: 4.6,
      externalUrl: 'https://www.assessmentcentrehq.com/situational-judgement-test/',
      features: ['Workplace scenarios', 'Behavioral', 'Decision making'],
      logo: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=100&h=100&fit=crop'
    },
    {
      id: 8,
      title: 'Kenexa-style Numerical Test',
      provider: 'Practice4Me',
      category: 'numerical',
      description: 'Prepare for IBM Kenexa assessments with practice tests that mirror the actual test format and difficulty.',
      duration: '20 minutes',
      questions: 24,
      difficulty: 'Intermediate',
      rating: 4.5,
      externalUrl: 'https://www.practice4me.com/kenexa-prove-it-tests/',
      features: ['IBM format', 'Realistic simulation', 'Explanations'],
      logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop'
    },
    {
      id: 9,
      title: 'Verbal Critical Analysis',
      provider: 'Graduate Monkey',
      category: 'verbal',
      description: 'Strengthen your ability to analyze written arguments, identify assumptions, and evaluate conclusions.',
      duration: '30 minutes',
      questions: 25,
      difficulty: 'Advanced',
      rating: 4.4,
      externalUrl: 'https://www.graduatemonkey.com/aptitude-tests/verbal-reasoning/',
      features: ['Argument analysis', 'Assumption testing', 'Graduate level'],
      logo: 'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=100&h=100&fit=crop'
    },
    {
      id: 10,
      title: 'Diagrammatic Reasoning',
      provider: 'Test Partnership',
      category: 'logical',
      description: 'Practice tests focused on understanding and applying rules to diagrams and flowcharts, common in technical roles.',
      duration: '25 minutes',
      questions: 20,
      difficulty: 'Intermediate',
      rating: 4.6,
      externalUrl: 'https://www.testpartnership.com/practice-tests/diagrammatic-reasoning.html',
      features: ['Flowcharts', 'Technical focus', 'Rule application'],
      logo: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=100&h=100&fit=crop'
    },
    {
      id: 11,
      title: 'Management SJT',
      provider: 'Prep Terminal',
      category: 'situational',
      description: 'Situational judgment scenarios specifically designed for management and leadership positions.',
      duration: '40 minutes',
      questions: 35,
      difficulty: 'Advanced',
      rating: 4.7,
      externalUrl: 'https://www.prepterminal.com/situational-judgement-test/',
      features: ['Leadership focused', 'Management scenarios', 'Competency-based'],
      logo: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=100&h=100&fit=crop'
    },
    {
      id: 12,
      title: 'CCAT Practice Test',
      provider: 'Criteria Corp',
      category: 'logical',
      description: 'Prepare for the Criteria Cognitive Aptitude Test used by thousands of companies for hiring decisions.',
      duration: '15 minutes',
      questions: 50,
      difficulty: 'Advanced',
      rating: 4.8,
      externalUrl: 'https://www.criteriacorp.com/assessments/ccat',
      features: ['Time pressure', 'Mixed aptitude', 'Widely used'],
      logo: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=100&h=100&fit=crop'
    }
  ];

  // tomiwa: Filter tests based on active category
  const filteredTests = activeCategory === 'all' 
    ? sampleTests 
    : sampleTests.filter(test => test.category === activeCategory);

  // tomiwa: Mock user statistics for display
  const userStats = {
    testsCompleted: 8,
    averageScore: 76,
    hoursSpent: 12,
    improvement: '+18%'
  };

  // tomiwa: Get difficulty badge styling
  const getDifficultyStyle = (difficulty) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Intermediate':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Advanced':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-neutral-100 text-neutral-700 border-neutral-200';
    }
  };

  // tomiwa: Get category icon
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'numerical':
        return <CalculatorIcon className="w-4 h-4" />;
      case 'verbal':
        return <ChatBubbleLeftRightIcon className="w-4 h-4" />;
      case 'logical':
        return <PuzzlePieceIcon className="w-4 h-4" />;
      case 'situational':
        return <BuildingOffice2Icon className="w-4 h-4" />;
      default:
        return <DocumentTextIcon className="w-4 h-4" />;
    }
  };

  return (
    <CandidateDashboardLayout>
      {/* tomiwa: UPDATED - Uniform Hero Banner matching AI Tools design */}
      {/* updated: Simplified to match uniform header design across all pages */}
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
          
          {/* tomiwa: Back navigation - inside gradient for uniform design */}
          <Link
            href="/dashboard/candidate/ai-tools"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm font-medium mb-6"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            <span>Back to AI Tools</span>
          </Link>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6">
            <div className="flex-1">
              {/* tomiwa: Main heading with Monument Extended font */}
              <h1 className="text-3xl 
                            sm:text-4xl 
                            md:text-4xl 
                            lg:text-5xl 
                            font-display font-bold text-white mb-2">
                Aptitude Test Assistant
              </h1>
              {/* tomiwa: Subtitle in uniform style */}
              <p className="text-[#D9E5E6] text-base 
                           sm:text-lg 
                           md:text-lg 
                           lg:text-xl 
                           leading-relaxed max-w-2xl">
                Access curated aptitude tests from leading providers to practice numerical, verbal, logical, and situational judgment assessments
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* tomiwa: Main content area */}
      <div className="px-6 
                      sm:px-8 
                      md:px-10 
                      lg:px-12 
                      xl:px-16 
                      2xl:px-20 
                      pb-12">

        {/* tomiwa: Category filter tabs */}
        <section className="mb-8">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeCategory === category.id
                    ? 'bg-brand-aqua text-white shadow-sm'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </section>

        {/* tomiwa: Sample Tests Grid - Professional card layout */}
        <section className="mb-10">
          <div className="mb-6">
            <h2 className="text-xl md:text-2xl font-display font-bold text-neutral-900 mb-2">
              Sample Aptitude Tests
            </h2>
            <p className="text-neutral-600 text-sm">
              Click on any test to access practice materials from trusted external providers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filteredTests.map((test) => (
              <div 
                key={test.id} 
                className="bg-white rounded-xl border border-neutral-200 hover:border-brand-aqua/50 hover:shadow-lg transition-all duration-300 overflow-hidden group"
              >
                {/* tomiwa: Card header with provider info */}
                <div className="p-5 border-b border-neutral-100">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={test.logo}
                        alt={test.provider}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="font-semibold text-neutral-900 group-hover:text-brand-aqua transition-colors text-sm">
                          {test.title}
                        </h3>
                        <p className="text-xs text-neutral-500">{test.provider}</p>
                      </div>
                    </div>
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium border ${getDifficultyStyle(test.difficulty)}`}>
                      {test.difficulty}
                    </span>
                  </div>
                  
                  <p className="text-sm text-neutral-600 leading-relaxed line-clamp-2 mb-3">
                    {test.description}
                  </p>

                  {/* tomiwa: Category and rating */}
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-xs text-neutral-500 bg-neutral-50 px-2 py-1 rounded-md">
                      {getCategoryIcon(test.category)}
                      <span className="capitalize">{test.category}</span>
                    </span>
                    <div className="flex items-center gap-1 text-xs">
                      <StarIcon className="w-3.5 h-3.5 text-brand-yellow fill-brand-yellow" />
                      <span className="font-medium text-neutral-700">{test.rating}</span>
                    </div>
                  </div>
                </div>

                {/* tomiwa: Card body with test details */}
                <div className="p-5 bg-neutral-50/50">
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center gap-2">
                      <ClockIcon className="w-4 h-4 text-neutral-400" />
                      <span className="text-xs text-neutral-600">{test.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DocumentTextIcon className="w-4 h-4 text-neutral-400" />
                      <span className="text-xs text-neutral-600">{test.questions} questions</span>
                    </div>
                  </div>

                  {/* tomiwa: Features list */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {test.features.map((feature, index) => (
                      <span 
                        key={index}
                        className="inline-flex items-center text-xs text-neutral-500 bg-white px-2 py-0.5 rounded border border-neutral-200"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* tomiwa: CTA button - opens external link */}
                  <a
                    href={test.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 
                              w-full px-4 py-2.5 
                              bg-brand-aqua text-white 
                              text-sm font-semibold 
                              rounded-lg 
                              hover:bg-primary-600 
                              transition-colors 
                              focus:ring-2 focus:ring-brand-aqua focus:ring-offset-2"
                  >
                    <span>Take Practice Test</span>
                    <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* tomiwa: Test preparation tips section */}
        <section className="mb-10">
          <div className="bg-gradient-to-br from-primary-50 to-white rounded-xl border border-primary-100 p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-brand-aqua/10 rounded-xl flex items-center justify-center">
                  <BookOpenIcon className="w-6 h-6 text-brand-aqua" />
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-display font-bold text-neutral-900 mb-3">
                  Test Preparation Tips
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="flex items-start gap-3">
                    <CheckCircleIcon className="w-5 h-5 text-brand-aqua flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-neutral-900 text-sm">Practice Under Timed Conditions</h4>
                      <p className="text-xs text-neutral-600">Simulate real test pressure by timing yourself</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircleIcon className="w-5 h-5 text-brand-aqua flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-neutral-900 text-sm">Review Explanations</h4>
                      <p className="text-xs text-neutral-600">Understand why answers are correct or incorrect</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircleIcon className="w-5 h-5 text-brand-aqua flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-neutral-900 text-sm">Focus on Weak Areas</h4>
                      <p className="text-xs text-neutral-600">Identify patterns in your mistakes and target them</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircleIcon className="w-5 h-5 text-brand-aqua flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-neutral-900 text-sm">Rest Before Tests</h4>
                      <p className="text-xs text-neutral-600">Ensure adequate sleep before important assessments</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircleIcon className="w-5 h-5 text-brand-aqua flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-neutral-900 text-sm">Read Questions Carefully</h4>
                      <p className="text-xs text-neutral-600">Avoid careless mistakes from rushing</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircleIcon className="w-5 h-5 text-brand-aqua flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-neutral-900 text-sm">Practice Regularly</h4>
                      <p className="text-xs text-neutral-600">Consistent practice leads to lasting improvement</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* tomiwa: Additional resources section */}
        <section className="mb-8">
          <div className="mb-6">
            <h2 className="text-xl md:text-2xl font-display font-bold text-neutral-900 mb-2">
              Additional Resources
            </h2>
            <p className="text-neutral-600 text-sm">
              Explore more preparation materials and learning guides
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <a
              href="https://www.123test.com/iq-test/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-xl border border-neutral-200 p-5 hover:border-brand-aqua/50 hover:shadow-md transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-brand-orange/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CpuChipIcon className="w-5 h-5 text-brand-orange" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-neutral-900 group-hover:text-brand-aqua transition-colors mb-1">
                    IQ Test Practice
                  </h3>
                  <p className="text-sm text-neutral-600 mb-2">
                    Free comprehensive IQ tests with detailed scoring analysis
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs text-brand-aqua">
                    <GlobeAltIcon className="w-3.5 h-3.5" />
                    123test.com
                  </span>
                </div>
              </div>
            </a>

            <a
              href="https://www.psychometric-success.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-xl border border-neutral-200 p-5 hover:border-brand-aqua/50 hover:shadow-md transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-brand-yellow/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BookOpenIcon className="w-5 h-5 text-brand-yellow" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-neutral-900 group-hover:text-brand-aqua transition-colors mb-1">
                    Psychometric Guides
                  </h3>
                  <p className="text-sm text-neutral-600 mb-2">
                    In-depth guides for all types of psychometric assessments
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs text-brand-aqua">
                    <GlobeAltIcon className="w-3.5 h-3.5" />
                    psychometric-success.com
                  </span>
                </div>
              </div>
            </a>

            <a
              href="https://www.practiceaptitudetests.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-xl border border-neutral-200 p-5 hover:border-brand-aqua/50 hover:shadow-md transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-brand-aqua/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrophyIcon className="w-5 h-5 text-brand-aqua" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-neutral-900 group-hover:text-brand-aqua transition-colors mb-1">
                    Free Practice Tests
                  </h3>
                  <p className="text-sm text-neutral-600 mb-2">
                    Large collection of free aptitude tests with answers
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs text-brand-aqua">
                    <GlobeAltIcon className="w-3.5 h-3.5" />
                    practiceaptitudetests.com
                  </span>
                </div>
              </div>
            </a>
          </div>
        </section>

        {/* tomiwa: Bottom CTA section */}
        <section>
          <div className="bg-brand-black rounded-xl p-6 sm:p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-brand-aqua/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <AcademicCapIcon className="w-6 h-6 text-brand-aqua" />
                </div>
                <div>
                  <h2 className="text-lg font-display font-bold text-white mb-2">
                    Need More Help with Test Preparation?
                  </h2>
                  <p className="text-neutral-400 text-sm">
                    Connect with our career coaches for personalized aptitude test strategies and guidance.
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/dashboard/candidate/ai-tools/coaching"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-brand-aqua text-white font-semibold rounded-lg hover:bg-primary-600 transition-colors text-sm"
                >
                  Find a Coach
                  <ArrowRightIcon className="w-4 h-4" />
                </Link>
                <Link
                  href="/dashboard/candidate/ai-tools"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors text-sm"
                >
                  <ArrowLeftIcon className="w-4 h-4" />
                  All AI Tools
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </CandidateDashboardLayout>
  );
}
