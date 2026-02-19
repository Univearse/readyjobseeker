/**
 * File: src/app/dashboard/candidate/ai-tools/application-tracker/page.js
 * 
 * tomiwa: Smart Application Tracker - AI-powered analytics & insights dashboard
 * updated: Complete redesign to differentiate from Job Applications page
 * 
 * Key Differences from Job Applications:
 * - AI Insights are the PRIMARY focus, not the application list
 * - Analytics dashboard approach vs simple list
 * - Smart recommendations and pattern detection
 * - Clean, minimal design with clear visual hierarchy
 * 
 * Features:
 * - AI-powered insights and recommendations
 * - Success pattern analysis
 * - Follow-up timing suggestions
 * - Response analytics
 * - Compact application tracking (secondary focus)
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import CandidateDashboardLayout from '@/components/layouts/CandidateDashboardLayout.jsx';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  SparklesIcon,
  CheckCircleIcon,
  ClockIcon,
  LightBulbIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ChartBarIcon,
  BellIcon,
  CalendarDaysIcon,
  BuildingOfficeIcon,
  MapPinIcon,
  StarIcon,
  EyeIcon,
  ExclamationTriangleIcon,
  RocketLaunchIcon,
  ChartPieIcon,
  UserGroupIcon,
  DocumentTextIcon,
  XMarkIcon,  // tomiwa: NEW - Added for closing the skills gap modal
  AcademicCapIcon,  // tomiwa: NEW - Added for skills gap modal courses icon
  BriefcaseIcon,  // tomiwa: NEW - Added for offers received stat
  ClipboardDocumentCheckIcon,  // tomiwa: NEW - Added for pending tests stat
  InboxIcon  // tomiwa: NEW - Added for awaiting response stat
} from '@heroicons/react/24/outline';
import { 
  SparklesIcon as SparklesSolidIcon,
  StarIcon as StarSolidIcon 
} from '@heroicons/react/24/solid';

export default function ApplicationTrackerPage() {
  // tomiwa: State for selected time period filter
  const [timePeriod, setTimePeriod] = useState('30days');
  
  // tomiwa: State for insight category filter
  const [insightCategory, setInsightCategory] = useState('all');

  // tomiwa: NEW - State for skills gap modal visibility
  // updated: Added to show detailed skills gap when user clicks "View Skills Details"
  const [skillsGapModalOpen, setSkillsGapModalOpen] = useState(false);
  
  // tomiwa: NEW - Selected insight data for skills gap modal
  const [selectedSkillsGap, setSelectedSkillsGap] = useState(null);

  // tomiwa: UPDATED - Mock analytics data with more useful real-world stats
  // updated: Reorganized to show actionable data that relates to insights
  // These stats directly connect to the AI insights below
  const analytics = {
    // tomiwa: Core application stats
    totalApplications: 12,        // Total apps sent
    activeApplications: 5,        // Currently in progress (not rejected/offered)
    
    // tomiwa: Success metrics - what users care about most
    interviewsScheduled: 3,       // Upcoming interviews
    offersReceived: 1,            // Job offers received
    
    // tomiwa: Pending actions - needs attention
    awaitingResponse: 4,          // Waiting for employer response
    pendingTests: 2,              // Aptitude tests to complete
    
    // tomiwa: Performance indicators
    responseRate: 67,             // % of apps that got responses
    avgDaysToResponse: 5,         // Average days to hear back
    
    // tomiwa: Outcome stats
    rejected: 3,                  // Rejections (for learning)
    withdrawn: 1                  // User withdrew application
  };

  // tomiwa: AI-powered insights - the PRIMARY content of this page
  // updated: Modified insights to be more actionable and useful
  // - "Opportunity Detected" now leads to Apply Now action
  // - "Follow-up Timing" now leads to Messages to draft follow-up
  // - "Skills Gap Identified" now shows full skills details
  // - "Success Pattern Found" REMOVED (not useful)
  // - "Decision Deadline" now for aptitude test instead of offer review
  const aiInsights = [
    {
      // tomiwa: NEW - Opportunity detected leads to Apply Now action
      // updated: Changed from "Prepare for Interview" to "Apply Now" - more useful action
      id: 1,
      type: 'opportunity',
      priority: 'high',
      icon: <RocketLaunchIcon className="w-5 h-5" />,
      title: 'Hot Opportunity Detected',
      description: 'TechFlow Solutions has a new Senior Frontend Developer opening that matches 92% of your profile. This role was posted 2 hours ago - apply early to increase your chances.',
      action: 'Apply Now',
      actionLink: '/jobs',
      metric: '92% match',
      timeAgo: '2 hours ago'
    },
    {
      // tomiwa: NEW - Follow-up timing now leads to messages section
      // updated: Draft follow-up action goes to messages to compose message to employer
      id: 2,
      type: 'followup',
      priority: 'high',
      icon: <ClockIcon className="w-5 h-5" />,
      title: 'Follow-up Timing',
      description: 'InnovateCorp hasn\'t responded in 10 days. Based on similar roles, following up now increases response chance by 40%. Send a polite follow-up to show continued interest.',
      action: 'Draft Follow-up',
      actionLink: '/dashboard/candidate/messages',
      metric: '+40% response',
      timeAgo: '5 hours ago'
    },
    {
      // tomiwa: NEW - Decision deadline now for aptitude test
      // updated: Changed from offer review to aptitude test deadline - more actionable
      id: 3,
      type: 'deadline',
      priority: 'high',
      icon: <ExclamationTriangleIcon className="w-5 h-5" />,
      title: 'Aptitude Test Deadline',
      description: 'StartupXYZ requires you to complete their technical aptitude test within 3 days. Prepare and complete the assessment to move forward in the hiring process.',
      action: 'Take Test Now',
      actionLink: '/dashboard/candidate/ai-tools/aptitude-test-assistant',
      metric: '3 days left',
      timeAgo: '1 day ago'
    },
    {
      // tomiwa: NEW - Skills gap now shows detailed missing skills
      // updated: More descriptive with specific skills listed for user to review
      id: 4,
      type: 'improvement',
      priority: 'medium',
      icon: <ArrowTrendingUpIcon className="w-5 h-5" />,
      title: 'Skills Gap Identified',
      description: '2 recent rejections mentioned system design and cloud architecture skills. These are in-demand skills for the roles you\'re targeting. Missing skills: System Design, AWS/Cloud Services, Microservices Architecture.',
      action: 'View Skills Details',
      actionLink: '/dashboard/candidate/ai-tools/aptitude-test-assistant',
      metric: '+25% conversion',
      timeAgo: '1 week ago',
      // tomiwa: NEW - Added skillsGap array for detailed view when clicked
      skillsGap: [
        { skill: 'System Design', importance: 'High', courses: 3 },
        { skill: 'AWS/Cloud Services', importance: 'High', courses: 5 },
        { skill: 'Microservices Architecture', importance: 'Medium', courses: 2 }
      ]
    }
  ];

  // tomiwa: Recent application activity for compact display
  const recentActivity = [
    {
      id: 1,
      company: 'TechFlow Solutions',
      position: 'Senior Frontend Developer',
      status: 'interview',
      lastUpdate: 'Technical Interview - Feb 10',
      matchScore: 92,
      logo: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=100&h=100&fit=crop',
      starred: true
    },
    {
      id: 2,
      company: 'StartupXYZ',
      position: 'React Developer',
      status: 'offer',
      lastUpdate: 'Offer received - Decision by Feb 12',
      matchScore: 85,
      logo: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=100&h=100&fit=crop',
      starred: true
    },
    {
      id: 3,
      company: 'HealthTech Pro',
      position: 'UI Developer',
      status: 'interview',
      lastUpdate: 'Final interview - Feb 7',
      matchScore: 89,
      logo: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=100&h=100&fit=crop',
      starred: true
    },
    {
      id: 4,
      company: 'InnovateCorp',
      position: 'Full Stack Developer',
      status: 'applied',
      lastUpdate: 'Under review - No response 10 days',
      matchScore: 87,
      logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop',
      starred: false
    },
    {
      id: 5,
      company: 'FinanceFlow',
      position: 'Frontend Engineer',
      status: 'applied',
      lastUpdate: 'Submitted - 4 days ago',
      matchScore: 82,
      logo: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=100&h=100&fit=crop',
      starred: false
    }
  ];

  // tomiwa: Get status styling
  const getStatusStyle = (status) => {
    switch (status) {
      case 'interview':
        return 'bg-accent-100 text-accent-700';
      case 'offer':
        return 'bg-emerald-100 text-emerald-700';
      case 'applied':
        return 'bg-primary-100 text-primary-700';
      case 'rejected':
        return 'bg-secondary-100 text-secondary-700';
      default:
        return 'bg-neutral-100 text-neutral-700';
    }
  };

  // tomiwa: UPDATED - Get insight type styling
  // updated: Minimal design - just colored left border and colored text for action
  // No colored icon backgrounds, no button frames - clean and simple
  const getInsightStyle = (type) => {
    switch (type) {
      case 'opportunity':
        // tomiwa: Green for opportunities - "Prepare for Interview" shows as green text
        return { 
          borderLeft: 'border-l-4 border-l-emerald-500', 
          icon: 'text-neutral-500',
          actionText: 'text-emerald-600 hover:text-emerald-700'
        };
      case 'followup':
        // tomiwa: Yellow/amber for follow-ups
        return { 
          borderLeft: 'border-l-4 border-l-brand-yellow', 
          icon: 'text-neutral-500',
          actionText: 'text-amber-600 hover:text-amber-700'
        };
      case 'pattern':
        // tomiwa: Aqua for patterns
        return { 
          borderLeft: 'border-l-4 border-l-brand-aqua', 
          icon: 'text-neutral-500',
          actionText: 'text-brand-aqua hover:text-primary-600'
        };
      case 'deadline':
        // tomiwa: Orange for deadlines
        return { 
          borderLeft: 'border-l-4 border-l-brand-orange', 
          icon: 'text-neutral-500',
          actionText: 'text-brand-orange hover:text-secondary-600'
        };
      case 'improvement':
        // tomiwa: Purple for improvements
        return { 
          borderLeft: 'border-l-4 border-l-purple-500', 
          icon: 'text-neutral-500',
          actionText: 'text-purple-600 hover:text-purple-700'
        };
      default:
        // tomiwa: Neutral styling for any unknown types
        return { 
          borderLeft: 'border-l-4 border-l-neutral-300', 
          icon: 'text-neutral-500',
          actionText: 'text-neutral-600 hover:text-neutral-700'
        };
    }
  };

  // tomiwa: NEW - Handle opening skills gap modal with detailed view
  // updated: Shows full skills breakdown when user clicks "View Skills Details"
  const handleViewSkillsGap = (insight) => {
    // tomiwa: Set the selected skills gap data and open modal
    setSelectedSkillsGap(insight);
    setSkillsGapModalOpen(true);
  };

  // tomiwa: NEW - Handle closing skills gap modal
  const handleCloseSkillsGapModal = () => {
    setSkillsGapModalOpen(false);
    setSelectedSkillsGap(null);
  };

  return (
    <CandidateDashboardLayout>
      {/* ===================================================================== */}
      {/* tomiwa: UPDATED - Uniform Hero Banner matching AI Tools design */}
      {/* updated: Simplified to match uniform header design across all pages */}
      {/* ===================================================================== */}
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
                Smart Application Tracker
              </h1>
              {/* tomiwa: Subtitle in uniform style */}
              <p className="text-[#D9E5E6] text-base 
                           sm:text-lg 
                           md:text-lg 
                           lg:text-xl 
                           leading-relaxed max-w-2xl">
                AI-powered analytics and insights to track your applications and boost your job search success
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* tomiwa: Main content area */}
      <div className="px-6 
                      sm:px-6 
                      md:px-8 
                      lg:px-8 
                      pb-12">
        
        <div className="max-w-6xl mx-auto">

          {/* ===================================================================== */}
          {/* tomiwa: UPDATED - MODULE 1 - Performance Stats Cards (MOVED TO TOP) */}
          {/* updated: Moved to top for immediate visibility of key metrics */}
          {/* Shows real, actionable data that relates to the AI insights below */}
          {/* ===================================================================== */}
          <section className="mb-10">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-aqua/10 rounded-xl flex items-center justify-center">
                  <ChartBarIcon className="w-5 h-5 text-brand-aqua" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-display font-bold text-neutral-900">
                    Application Overview
                  </h2>
                  <p className="text-sm text-neutral-500">
                    Your job search at a glance
                  </p>
                </div>
              </div>
              
              {/* tomiwa: Time period filter */}
              <select 
                value={timePeriod}
                onChange={(e) => setTimePeriod(e.target.value)}
                className="text-sm bg-white border border-neutral-200 rounded-lg px-3 py-1.5 text-neutral-600 focus:ring-2 focus:ring-brand-aqua focus:border-brand-aqua"
              >
                <option value="7days">Last 7 days</option>
                <option value="30days">Last 30 days</option>
                <option value="90days">Last 90 days</option>
              </select>
            </div>
            
            {/* tomiwa: UPDATED - Stats grid with 6 useful cards */}
            {/* updated: Each card shows real data that connects to insights */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              
              {/* tomiwa: Card 1 - Total Applications */}
              <div className="bg-white rounded-xl border border-neutral-200 p-4 hover:shadow-md hover:border-brand-aqua/50 transition-all cursor-pointer group">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-brand-aqua/10 rounded-lg flex items-center justify-center group-hover:bg-brand-aqua/20 transition-colors">
                    <DocumentTextIcon className="w-4 h-4 text-brand-aqua" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-neutral-900 mb-1">{analytics.totalApplications}</div>
                <div className="text-xs text-neutral-500">Total Applied</div>
              </div>

              {/* tomiwa: Card 2 - Interviews Scheduled (Success indicator) */}
              <div className="bg-white rounded-xl border border-neutral-200 p-4 hover:shadow-md hover:border-emerald-300 transition-all cursor-pointer group">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                    <CalendarDaysIcon className="w-4 h-4 text-emerald-600" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-emerald-600 mb-1">{analytics.interviewsScheduled}</div>
                <div className="text-xs text-neutral-500">Interviews</div>
              </div>

              {/* tomiwa: Card 3 - Offers Received (Major success!) */}
              <div className="bg-white rounded-xl border border-neutral-200 p-4 hover:shadow-md hover:border-brand-yellow/50 transition-all cursor-pointer group">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-brand-yellow/20 rounded-lg flex items-center justify-center group-hover:bg-brand-yellow/30 transition-colors">
                    <BriefcaseIcon className="w-4 h-4 text-amber-600" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-amber-600 mb-1">{analytics.offersReceived}</div>
                <div className="text-xs text-neutral-500">Offers</div>
              </div>

              {/* tomiwa: Card 4 - Awaiting Response (Needs attention) */}
              <div className="bg-white rounded-xl border border-neutral-200 p-4 hover:shadow-md hover:border-blue-300 transition-all cursor-pointer group">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <InboxIcon className="w-4 h-4 text-blue-600" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-blue-600 mb-1">{analytics.awaitingResponse}</div>
                <div className="text-xs text-neutral-500">Awaiting Reply</div>
              </div>

              {/* tomiwa: Card 5 - Pending Tests (Action required) */}
              <div className="bg-white rounded-xl border border-neutral-200 p-4 hover:shadow-md hover:border-brand-orange/50 transition-all cursor-pointer group">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-brand-orange/10 rounded-lg flex items-center justify-center group-hover:bg-brand-orange/20 transition-colors">
                    <ClipboardDocumentCheckIcon className="w-4 h-4 text-brand-orange" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-brand-orange mb-1">{analytics.pendingTests}</div>
                <div className="text-xs text-neutral-500">Pending Tests</div>
              </div>

              {/* tomiwa: Card 6 - Response Rate (Performance metric) */}
              <div className="bg-white rounded-xl border border-neutral-200 p-4 hover:shadow-md hover:border-purple-300 transition-all cursor-pointer group">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                    <ChartPieIcon className="w-4 h-4 text-purple-600" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-purple-600 mb-1">{analytics.responseRate}%</div>
                <div className="text-xs text-neutral-500">Response Rate</div>
              </div>
            </div>

            {/* tomiwa: NEW - Quick summary bar below stats */}
            <div className="mt-4 bg-neutral-50 rounded-xl p-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-4 text-sm">
                <span className="text-neutral-500">
                  <span className="font-medium text-neutral-700">{analytics.activeApplications}</span> active
                </span>
                <span className="text-neutral-300">|</span>
                <span className="text-neutral-500">
                  <span className="font-medium text-neutral-700">{analytics.rejected}</span> rejected
                </span>
                <span className="text-neutral-300">|</span>
                <span className="text-neutral-500">
                  Avg response: <span className="font-medium text-neutral-700">{analytics.avgDaysToResponse} days</span>
                </span>
              </div>
              <Link
                href="/dashboard/candidate/applications"
                className="text-sm font-medium text-brand-aqua hover:text-brand-orange inline-flex items-center gap-1 transition-colors"
              >
                View all applications
                <ArrowRightIcon className="w-3.5 h-3.5" />
              </Link>
            </div>
          </section>

          {/* ===================================================================== */}
          {/* tomiwa: MODULE 2 - AI Insights Section */}
          {/* Actionable recommendations based on the stats above */}
          {/* ===================================================================== */}
          <section className="mb-10">
            {/* tomiwa: Section header with insight count */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-aqua/10 rounded-xl flex items-center justify-center">
                  <SparklesIcon className="w-5 h-5 text-brand-aqua" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-display font-bold text-neutral-900">
                    AI Insights
                  </h2>
                  <p className="text-sm text-neutral-500">
                    {aiInsights.filter(i => i.priority === 'high').length} high priority actions
                  </p>
                </div>
              </div>
              
              {/* tomiwa: Powered by badge */}
              <span className="hidden sm:inline-flex items-center gap-1.5 text-xs bg-neutral-100 text-neutral-600 px-3 py-1.5 rounded-full">
                <SparklesIcon className="w-3.5 h-3.5 text-brand-aqua" />
                Powered by RJS ATS
              </span>
            </div>

            {/* tomiwa: UPDATED - Insights list - minimal clean design */}
            {/* updated: White cards with colored left border line only
                         Plain icons without colored backgrounds
                         Action text is colored (no button frame) */}
            <div className="space-y-3">
              {aiInsights.map((insight) => {
                const style = getInsightStyle(insight.type);
                return (
                  <div 
                    key={insight.id}
                    className={`bg-white ${style.borderLeft} border border-neutral-200 rounded-xl p-4 sm:p-5 
                               hover:shadow-md hover:border-neutral-300 transition-all duration-200`}
                  >
                    <div className="flex items-start gap-4">
                      {/* tomiwa: UPDATED - Plain icon without colored background */}
                      {/* updated: Removed bg color, just neutral icon */}
                      <div className={`w-10 h-10 ${style.icon} flex items-center justify-center flex-shrink-0`}>
                        {insight.icon}
                      </div>
                      
                      {/* tomiwa: Insight content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-3 mb-2">
                          <div>
                            {/* tomiwa: Title with priority badge */}
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-neutral-900">{insight.title}</h3>
                              {insight.priority === 'high' && (
                                <span className="text-xs font-medium text-brand-orange">
                                  • High Priority
                                </span>
                              )}
                            </div>
                            {/* tomiwa: Description text */}
                            <p className="text-sm text-neutral-600 leading-relaxed">
                              {insight.description}
                            </p>
                          </div>
                          
                          {/* tomiwa: Metric badge - clean styling */}
                          <div className="text-left sm:text-right flex-shrink-0">
                            <div className="text-sm font-bold text-neutral-900">{insight.metric}</div>
                            <div className="text-xs text-neutral-500">{insight.timeAgo}</div>
                          </div>
                        </div>
                        
                        {/* tomiwa: UPDATED - Action as colored text link (no button frame) */}
                        {/* updated: Skills Gap opens modal, others navigate to links */}
                        {insight.skillsGap ? (
                          // tomiwa: NEW - Skills Gap opens modal to show detailed skills breakdown
                          <button
                            onClick={() => handleViewSkillsGap(insight)}
                            className={`inline-flex items-center gap-1.5 text-sm font-semibold
                                       ${style.actionText} transition-colors mt-1`}
                          >
                            {insight.action}
                            <ArrowRightIcon className="w-3.5 h-3.5" />
                          </button>
                        ) : (
                          // tomiwa: ExistingCode - Regular link for other insights
                          <Link
                            href={insight.actionLink}
                            className={`inline-flex items-center gap-1.5 text-sm font-semibold
                                       ${style.actionText} transition-colors mt-1`}
                          >
                            {insight.action}
                            <ArrowRightIcon className="w-3.5 h-3.5" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ===================================================================== */}
          {/* tomiwa: MODULE 3 - Recent Activity (Compact List) */}
          {/* Secondary content - not the main focus */}
          {/* ===================================================================== */}
          <section className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-display font-bold text-neutral-900">
                Recent Activity
              </h2>
              <Link
                href="/dashboard/candidate/applications"
                className="text-sm font-medium text-brand-aqua hover:text-primary-700 
                          inline-flex items-center gap-1 transition-colors"
              >
                View All Applications
                <ArrowRightIcon className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* tomiwa: Compact activity list */}
            <div className="bg-white rounded-xl border border-neutral-200 divide-y divide-neutral-100">
              {recentActivity.map((app) => (
                <div 
                  key={app.id}
                  className="p-4 hover:bg-neutral-50 transition-colors flex items-center gap-4"
                >
                  {/* tomiwa: Company logo */}
                  <img
                    src={app.logo}
                    alt={app.company}
                    className="w-10 h-10 rounded-lg object-cover border border-neutral-200 flex-shrink-0"
                  />
                  
                  {/* tomiwa: Application details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="font-medium text-neutral-900 text-sm truncate">
                        {app.position}
                      </h3>
                      {app.starred && (
                        <StarSolidIcon className="w-3.5 h-3.5 text-brand-yellow flex-shrink-0" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-neutral-500">
                      <span className="text-brand-aqua font-medium">{app.company}</span>
                      <span className="text-neutral-300">•</span>
                      <span className="truncate">{app.lastUpdate}</span>
                    </div>
                  </div>
                  
                  {/* tomiwa: Status and match */}
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full capitalize ${getStatusStyle(app.status)}`}>
                      {app.status}
                    </span>
                    <div className="hidden sm:block text-right">
                      <div className="text-sm font-semibold text-brand-aqua">{app.matchScore}%</div>
                      <div className="text-xs text-neutral-400">match</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ===================================================================== */}
          {/* tomiwa: MODULE 4 - Quick Actions CTA */}
          {/* Links to other AI tools */}
          {/* ===================================================================== */}
          <section>
            <div className="bg-brand-black rounded-xl p-5 sm:p-6 overflow-hidden relative">
              {/* tomiwa: Decorative gradient */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-brand-aqua/20 to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />
              
              <div className="relative flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* tomiwa: CTA content */}
                <div className="flex items-center gap-3 text-center sm:text-left">
                  <div className="w-10 h-10 bg-brand-aqua/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <RocketLaunchIcon className="w-5 h-5 text-brand-aqua" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-0.5">Boost Your Success</h3>
                    <p className="text-sm text-neutral-400">Use our AI tools to optimize applications</p>
                  </div>
                </div>

                {/* tomiwa: Action buttons */}
                <div className="flex items-center gap-2">
                  <Link
                    href="/dashboard/candidate/ai-tools/resume-optimizer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-white 
                              text-sm font-medium rounded-lg hover:bg-white/20 transition-colors"
                  >
                    Optimize Resume
                  </Link>
                  <Link
                    href="/dashboard/candidate/ai-tools/interview-simulator"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-brand-orange text-white 
                              text-sm font-medium rounded-lg hover:bg-secondary-600 transition-colors"
                  >
                    Practice Interview
                    <ArrowRightIcon className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* tomiwa: NEW - Skills Gap Modal */}
      {/* updated: Shows full breakdown of missing skills when user clicks */}
      {/* "View Skills Details" on the Skills Gap insight card */}
      {/* ===================================================================== */}
      {skillsGapModalOpen && selectedSkillsGap && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* tomiwa: Modal backdrop with blur effect */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={handleCloseSkillsGapModal}
          />
          
          {/* tomiwa: Modal content container - centered on screen */}
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg transform transition-all">
              {/* tomiwa: Modal header with close button */}
              <div className="flex items-center justify-between p-6 border-b border-neutral-200">
                <div className="flex items-center gap-3">
                  {/* tomiwa: Icon matching the insight type */}
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                    <ArrowTrendingUpIcon className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-display font-bold text-neutral-900">
                      Skills Gap Analysis
                    </h3>
                    <p className="text-sm text-neutral-500">
                      Skills to improve for better job matches
                    </p>
                  </div>
                </div>
                {/* tomiwa: Close button */}
                <button
                  onClick={handleCloseSkillsGapModal}
                  className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                >
                  <XMarkIcon className="w-5 h-5 text-neutral-500" />
                </button>
              </div>

              {/* tomiwa: Modal body with skills list */}
              <div className="p-6">
                {/* tomiwa: Summary text */}
                <p className="text-sm text-neutral-600 mb-6 leading-relaxed">
                  Based on your recent applications and rejections, we've identified the following skills that could significantly improve your chances of landing your target roles.
                </p>

                {/* tomiwa: Skills gap list with details */}
                <div className="space-y-4">
                  {selectedSkillsGap.skillsGap && selectedSkillsGap.skillsGap.map((skill, index) => (
                    <div 
                      key={index}
                      className="bg-neutral-50 rounded-xl p-4 border border-neutral-200 hover:border-purple-300 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        {/* tomiwa: Skill name */}
                        <h4 className="font-semibold text-neutral-900">{skill.skill}</h4>
                        {/* tomiwa: Importance badge */}
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                          skill.importance === 'High' 
                            ? 'bg-red-100 text-red-700' 
                            : 'bg-amber-100 text-amber-700'
                        }`}>
                          {skill.importance} Priority
                        </span>
                      </div>
                      {/* tomiwa: Available courses indicator */}
                      <div className="flex items-center gap-2 text-sm text-neutral-500">
                        <AcademicCapIcon className="w-4 h-4" />
                        <span>{skill.courses} courses available</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* tomiwa: Metric summary */}
                <div className="mt-6 p-4 bg-purple-50 rounded-xl border border-purple-200">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <ArrowTrendingUpIcon className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-purple-900">
                        Potential Impact
                      </p>
                      <p className="text-xs text-purple-600">
                        Improving these skills could increase your interview conversion by {selectedSkillsGap.metric}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* tomiwa: Modal footer with action buttons */}
              <div className="flex items-center justify-end gap-3 p-6 border-t border-neutral-200 bg-neutral-50 rounded-b-2xl">
                {/* tomiwa: Close button */}
                <button
                  onClick={handleCloseSkillsGapModal}
                  className="px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-800 transition-colors"
                >
                  Close
                </button>
                {/* tomiwa: Practice skills button - leads to aptitude test assistant */}
                <Link
                  href="/dashboard/candidate/ai-tools/aptitude-test-assistant"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-purple-600 text-white 
                            text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <AcademicCapIcon className="w-4 h-4" />
                  Practice These Skills
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </CandidateDashboardLayout>
  );
}
