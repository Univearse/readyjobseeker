/**
 * File: src/app/dashboard/candidate/ai-tools/application-tracker/page.js
 * 
 * tomiwa: Smart Application Tracker Tool
 * Track applications with AI insights on status, follow-up timing, and success probability.
 * 
 * Features:
 * - Application status predictions
 * - Follow-up reminders and suggestions
 * - Success analytics and patterns
 * - Strategy optimization recommendations
 * - Timeline tracking and milestones
 * - Employer response patterns
 * - Application performance metrics
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import CandidateDashboardLayout from '@/components/layouts/CandidateDashboardLayout';
import {
  ClipboardDocumentListIcon,
  SparklesIcon,
  ChartBarIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowLeftIcon,
  CalendarIcon,
  BuildingOfficeIcon,
  EnvelopeIcon,
  TrophyIcon,
  LightBulbIcon,
  ArrowTrendingUpIcon,
  BellIcon
} from '@heroicons/react/24/outline';

export default function ApplicationTracker() {
  // tomiwa: State management for application tracking
  const [activeView, setActiveView] = useState('overview'); // 'overview', 'analytics', 'insights'
  const [selectedTimeframe, setSelectedTimeframe] = useState('30days');

  // tomiwa: Mock application data with AI insights
  const applications = [
    {
      id: 1,
      jobTitle: 'Senior Software Engineer',
      company: 'TechCorp Inc.',
      companyLogo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop',
      appliedDate: '2024-10-25',
      status: 'Under Review',
      aiPrediction: {
        probability: 78,
        expectedResponse: '3-5 days',
        nextAction: 'Follow up in 2 days',
        confidence: 'High'
      },
      timeline: [
        { date: '2024-10-25', event: 'Application Submitted', status: 'completed' },
        { date: '2024-10-26', event: 'Application Viewed', status: 'completed' },
        { date: '2024-10-28', event: 'Under Review', status: 'current' },
        { date: 'TBD', event: 'Interview Invitation', status: 'pending' }
      ],
      insights: [
        'Company typically responds within 5 days',
        'High match score (87%) for this role',
        'Similar profiles got interviews 80% of the time'
      ]
    },
    {
      id: 2,
      jobTitle: 'Product Designer',
      company: 'Figma',
      companyLogo: 'https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=100&h=100&fit=crop',
      appliedDate: '2024-10-22',
      status: 'Interview Scheduled',
      aiPrediction: {
        probability: 85,
        expectedResponse: 'Completed',
        nextAction: 'Prepare for interview',
        confidence: 'Very High'
      },
      timeline: [
        { date: '2024-10-22', event: 'Application Submitted', status: 'completed' },
        { date: '2024-10-23', event: 'Application Viewed', status: 'completed' },
        { date: '2024-10-24', event: 'Interview Invitation', status: 'completed' },
        { date: '2024-10-30', event: 'First Interview', status: 'upcoming' }
      ],
      insights: [
        'Excellent response time (2 days)',
        'Strong portfolio alignment',
        'Interview success rate: 65% for similar candidates'
      ]
    },
    {
      id: 3,
      jobTitle: 'Frontend Developer',
      company: 'Startup XYZ',
      companyLogo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=100&h=100&fit=crop',
      appliedDate: '2024-10-20',
      status: 'No Response',
      aiPrediction: {
        probability: 25,
        expectedResponse: 'Overdue by 3 days',
        nextAction: 'Send follow-up email',
        confidence: 'Low'
      },
      timeline: [
        { date: '2024-10-20', event: 'Application Submitted', status: 'completed' },
        { date: '2024-10-21', event: 'Application Viewed', status: 'completed' },
        { date: 'TBD', event: 'Response Expected', status: 'overdue' }
      ],
      insights: [
        'Response overdue by 3 days',
        'Company has slow response times',
        'Consider following up or moving on'
      ]
    }
  ];

  // tomiwa: Analytics data
  const analytics = {
    totalApplications: 15,
    responseRate: 67,
    interviewRate: 40,
    averageResponseTime: 4.2,
    successTrends: [
      { month: 'Aug', applications: 8, interviews: 2, offers: 0 },
      { month: 'Sep', applications: 12, interviews: 4, offers: 1 },
      { month: 'Oct', applications: 15, interviews: 6, offers: 2 }
    ],
    topPerformingCompanies: [
      { name: 'Tech Startups', responseRate: 85, interviewRate: 60 },
      { name: 'Large Corporations', responseRate: 45, interviewRate: 25 },
      { name: 'Mid-size Companies', responseRate: 70, interviewRate: 45 }
    ]
  };

  // tomiwa: AI insights and recommendations
  const aiInsights = [
    {
      type: 'success',
      title: 'Strong Performance Trend',
      description: 'Your interview rate has increased by 50% this month',
      action: 'Keep applying to similar roles'
    },
    {
      type: 'warning',
      title: 'Follow-up Needed',
      description: '3 applications are overdue for responses',
      action: 'Send professional follow-up emails'
    },
    {
      type: 'info',
      title: 'Optimization Opportunity',
      description: 'Tech startups show 2x higher response rates for your profile',
      action: 'Focus more applications on startup companies'
    },
    {
      type: 'tip',
      title: 'Best Application Time',
      description: 'Tuesday-Thursday applications get 30% more responses',
      action: 'Schedule applications for mid-week'
    }
  ];

  // tomiwa: Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'Interview Scheduled':
      case 'Offer Received':
        return 'bg-emerald-100 text-emerald-800';
      case 'Under Review':
        return 'bg-blue-100 text-blue-800';
      case 'No Response':
        return 'bg-orange-100 text-orange-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-neutral-100 text-neutral-800';
    }
  };

  // tomiwa: Get prediction color
  const getPredictionColor = (probability) => {
    if (probability >= 70) return 'text-emerald-600';
    if (probability >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <CandidateDashboardLayout>
      {/* tomiwa: Header with navigation */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 -mt-8 -mx-6 mb-8">
        <div className="px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20 py-10 sm:py-12 md:py-14 lg:py-16">
          <div className="flex items-center gap-4 mb-4">
            <Link
              href="/dashboard/candidate/ai-tools"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              <span>Back to AI Tools</span>
            </Link>
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="text-4xl">📊</div>
                <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-display font-bold text-white">
                  Smart Application Tracker
                </h1>
              </div>
              <p className="text-indigo-100 text-base sm:text-lg md:text-lg lg:text-xl leading-relaxed max-w-2xl">
                Track your applications with AI insights and optimize your job search strategy
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* tomiwa: Main content */}
      <div className="px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20 pb-12">
        
        {/* tomiwa: Navigation tabs */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => setActiveView('overview')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeView === 'overview'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              Application Overview
            </button>
            <button
              onClick={() => setActiveView('analytics')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeView === 'analytics'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              Analytics & Trends
            </button>
            <button
              onClick={() => setActiveView('insights')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeView === 'insights'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              AI Insights
            </button>
          </div>
        </div>

        {/* tomiwa: Overview Tab */}
        {activeView === 'overview' && (
          <div className="space-y-8">
            {/* tomiwa: Quick stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                <div className="text-3xl font-bold text-indigo-600 mb-1">{analytics.totalApplications}</div>
                <div className="text-sm text-neutral-600">Total Applications</div>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                <div className="text-3xl font-bold text-emerald-600 mb-1">{analytics.responseRate}%</div>
                <div className="text-sm text-neutral-600">Response Rate</div>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                <div className="text-3xl font-bold text-purple-600 mb-1">{analytics.interviewRate}%</div>
                <div className="text-sm text-neutral-600">Interview Rate</div>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                <div className="text-3xl font-bold text-orange-600 mb-1">{analytics.averageResponseTime}</div>
                <div className="text-sm text-neutral-600">Avg Response (days)</div>
              </div>
            </div>

            {/* tomiwa: Applications list */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-neutral-900 mb-6 flex items-center gap-2">
                <ClipboardDocumentListIcon className="w-6 h-6 text-indigo-600" />
                Recent Applications
              </h2>
              
              <div className="space-y-6">
                {applications.map((app) => (
                  <div key={app.id} className="border border-neutral-200 rounded-lg p-6">
                    {/* tomiwa: Application header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <img
                          src={app.companyLogo}
                          alt={app.company}
                          className="w-16 h-16 rounded-lg object-cover shadow-sm"
                        />
                        <div>
                          <h3 className="text-lg font-bold text-neutral-900">{app.jobTitle}</h3>
                          <p className="text-neutral-600">{app.company}</p>
                          <p className="text-sm text-neutral-500">Applied {new Date(app.appliedDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(app.status)}`}>
                          {app.status}
                        </span>
                      </div>
                    </div>

                    {/* tomiwa: AI prediction */}
                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <SparklesIcon className="w-5 h-5 text-indigo-600" />
                        <h4 className="font-semibold text-neutral-900">AI Prediction</h4>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-neutral-600">Success Probability:</span>
                          <div className={`font-bold ${getPredictionColor(app.aiPrediction.probability)}`}>
                            {app.aiPrediction.probability}%
                          </div>
                        </div>
                        <div>
                          <span className="text-neutral-600">Expected Response:</span>
                          <div className="font-medium text-neutral-900">{app.aiPrediction.expectedResponse}</div>
                        </div>
                        <div>
                          <span className="text-neutral-600">Next Action:</span>
                          <div className="font-medium text-indigo-600">{app.aiPrediction.nextAction}</div>
                        </div>
                      </div>
                    </div>

                    {/* tomiwa: Timeline */}
                    <div className="mb-4">
                      <h4 className="font-semibold text-neutral-900 mb-3">Application Timeline</h4>
                      <div className="flex items-center gap-4 overflow-x-auto">
                        {app.timeline.map((event, index) => (
                          <div key={index} className="flex items-center gap-2 whitespace-nowrap">
                            <div className={`w-3 h-3 rounded-full ${
                              event.status === 'completed' ? 'bg-emerald-500' :
                              event.status === 'current' ? 'bg-indigo-500' :
                              event.status === 'upcoming' ? 'bg-orange-500' :
                              event.status === 'overdue' ? 'bg-red-500' :
                              'bg-neutral-300'
                            }`}></div>
                            <div className="text-sm">
                              <div className="font-medium text-neutral-900">{event.event}</div>
                              <div className="text-neutral-500">{event.date}</div>
                            </div>
                            {index < app.timeline.length - 1 && (
                              <div className="w-8 h-0.5 bg-neutral-200"></div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* tomiwa: Insights */}
                    <div>
                      <h4 className="font-semibold text-neutral-900 mb-2">AI Insights</h4>
                      <div className="space-y-1">
                        {app.insights.map((insight, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm text-neutral-700">
                            <LightBulbIcon className="w-4 h-4 text-indigo-500" />
                            <span>{insight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* tomiwa: Analytics Tab */}
        {activeView === 'analytics' && (
          <div className="space-y-8">
            {/* tomiwa: Performance trends */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-neutral-900 mb-6 flex items-center gap-2">
                <ArrowTrendingUpIcon className="w-6 h-6 text-indigo-600" />
                Performance Trends
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* tomiwa: Monthly trends */}
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-4">Monthly Application Activity</h3>
                  <div className="space-y-4">
                    {analytics.successTrends.map((trend, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                        <span className="font-medium text-neutral-900">{trend.month}</span>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-neutral-600">{trend.applications} apps</span>
                          <span className="text-indigo-600">{trend.interviews} interviews</span>
                          <span className="text-emerald-600">{trend.offers} offers</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* tomiwa: Company performance */}
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-4">Performance by Company Type</h3>
                  <div className="space-y-4">
                    {analytics.topPerformingCompanies.map((company, index) => (
                      <div key={index} className="p-3 bg-neutral-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-neutral-900">{company.name}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-neutral-600">Response Rate:</span>
                            <div className="font-bold text-indigo-600">{company.responseRate}%</div>
                          </div>
                          <div>
                            <span className="text-neutral-600">Interview Rate:</span>
                            <div className="font-bold text-emerald-600">{company.interviewRate}%</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* tomiwa: Success metrics */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-neutral-900 mb-6 flex items-center gap-2">
                <TrophyIcon className="w-6 h-6 text-emerald-600" />
                Success Metrics
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-emerald-50 rounded-lg">
                  <div className="text-3xl font-bold text-emerald-600 mb-2">2</div>
                  <div className="text-sm text-emerald-700">Job Offers</div>
                  <div className="text-xs text-emerald-600 mt-1">+100% from last month</div>
                </div>
                <div className="text-center p-6 bg-indigo-50 rounded-lg">
                  <div className="text-3xl font-bold text-indigo-600 mb-2">6</div>
                  <div className="text-sm text-indigo-700">Interviews Scheduled</div>
                  <div className="text-xs text-indigo-600 mt-1">+50% from last month</div>
                </div>
                <div className="text-center p-6 bg-orange-50 rounded-lg">
                  <div className="text-3xl font-bold text-orange-600 mb-2">4.2</div>
                  <div className="text-sm text-orange-700">Avg Response Time</div>
                  <div className="text-xs text-orange-600 mt-1">-1.3 days improvement</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* tomiwa: AI Insights Tab */}
        {activeView === 'insights' && (
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-neutral-900 mb-6 flex items-center gap-2">
                <SparklesIcon className="w-6 h-6 text-indigo-600" />
                AI-Powered Insights & Recommendations
              </h2>
              
              <div className="space-y-6">
                {aiInsights.map((insight, index) => (
                  <div key={index} className={`p-6 rounded-lg border-l-4 ${
                    insight.type === 'success' ? 'bg-emerald-50 border-emerald-500' :
                    insight.type === 'warning' ? 'bg-orange-50 border-orange-500' :
                    insight.type === 'info' ? 'bg-blue-50 border-blue-500' :
                    'bg-purple-50 border-purple-500'
                  }`}>
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        insight.type === 'success' ? 'bg-emerald-100' :
                        insight.type === 'warning' ? 'bg-orange-100' :
                        insight.type === 'info' ? 'bg-blue-100' :
                        'bg-purple-100'
                      }`}>
                        {insight.type === 'success' && <CheckCircleIcon className="w-5 h-5 text-emerald-600" />}
                        {insight.type === 'warning' && <ExclamationTriangleIcon className="w-5 h-5 text-orange-600" />}
                        {insight.type === 'info' && <ChartBarIcon className="w-5 h-5 text-blue-600" />}
                        {insight.type === 'tip' && <LightBulbIcon className="w-5 h-5 text-purple-600" />}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-neutral-900 mb-1">{insight.title}</h3>
                        <p className="text-neutral-700 mb-3">{insight.description}</p>
                        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium ${
                          insight.type === 'success' ? 'bg-emerald-100 text-emerald-800' :
                          insight.type === 'warning' ? 'bg-orange-100 text-orange-800' :
                          insight.type === 'info' ? 'bg-blue-100 text-blue-800' :
                          'bg-purple-100 text-purple-800'
                        }`}>
                          <span>Recommended Action:</span>
                          <span>{insight.action}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* tomiwa: Action recommendations */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6 border border-indigo-200">
              <h3 className="font-semibold text-neutral-900 mb-4 flex items-center gap-2">
                <BellIcon className="w-5 h-5 text-indigo-600" />
                Immediate Actions Needed
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <div className="flex items-center gap-3">
                    <EnvelopeIcon className="w-5 h-5 text-orange-600" />
                    <span className="text-sm font-medium text-neutral-900">Follow up on 3 overdue applications</span>
                  </div>
                  <button className="px-3 py-1.5 bg-orange-600 text-white text-sm rounded-lg hover:bg-orange-700 transition-colors">
                    Send Follow-ups
                  </button>
                </div>
                <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <div className="flex items-center gap-3">
                    <CalendarIcon className="w-5 h-5 text-purple-600" />
                    <span className="text-sm font-medium text-neutral-900">Prepare for Figma interview (Oct 30)</span>
                  </div>
                  <Link
                    href="/dashboard/candidate/ai-tools/interview-simulator"
                    className="px-3 py-1.5 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Practice
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* tomiwa: Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/dashboard/candidate/applications"
            className="px-6 py-3 border-2 border-neutral-300 text-neutral-700 font-semibold rounded-lg hover:bg-neutral-50 transition-colors text-center"
          >
            View All Applications
          </Link>
          <Link
            href="/jobs"
            className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors text-center"
          >
            Apply to More Jobs
          </Link>
          <Link
            href="/dashboard/candidate/ai-tools"
            className="px-6 py-3 border-2 border-indigo-600 text-indigo-600 font-semibold rounded-lg hover:bg-indigo-600 hover:text-white transition-colors text-center"
          >
            Try Other AI Tools
          </Link>
        </div>
      </div>
    </CandidateDashboardLayout>
  );
}
