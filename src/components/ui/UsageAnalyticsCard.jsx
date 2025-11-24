// tomiwa: Standalone Usage Analytics Component
// File Location: /src/components/ui/UsageAnalyticsCard.jsx
// Purpose: Displays comprehensive usage analytics with plan summary, usage overview, and insights
// Can be used in dedicated Analytics & Insights dashboard page

'use client';

import React from 'react';
import {
  StarIcon,
  ClockIcon,
  CalendarIcon,
  BriefcaseIcon,
  SparklesIcon,
  DocumentMagnifyingGlassIcon,
  ExclamationTriangleIcon,
  ArrowUpIcon,
} from '@heroicons/react/24/outline';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

/**
 * johnson: UsageAnalyticsCard Component
 * 
 * A comprehensive analytics component that displays:
 * 1. Plan Summary Overview - Key subscription details
 * 2. Usage Overview - Progress cards for different resources
 * 3. Insights & Trends - Analytics and billing cycle progress
 * 
 * @param {Object} props - Component props
 * @param {Object} props.planData - Current plan information (name, nextBilling)
 * @param {Object} props.usageData - Usage metrics (jobPostings, cvSearches, aiCredits, interviews)
 * @param {Object} props.trendsData - Trends information (monthlyGrowth, peakDay, mostUsedFeature, daysRemaining, billingCycleProgress)
 * @param {Function} props.onUpgrade - Callback function when upgrade button is clicked
 * @param {Function} props.formatDate - Function to format dates
 */
export default function UsageAnalyticsCard({ 
  planData, 
  usageData, 
  trendsData, 
  onUpgrade,
  formatDate 
}) {
  // tomiwa: Calculate usage percentage for progress bars
  const getUsagePercentage = (used, limit) => {
    if (limit === 'unlimited') return 0;
    return Math.round((used / limit) * 100);
  };

  return (
    <div className="space-y-8">
      {/* tomiwa: Main header with title and description */}
      <div>
        <h2 className="text-2xl 
                       sm:text-2xl 
                       md:text-3xl 
                       lg:text-3xl 
                       font-display font-bold text-[#0C0932] mb-2">
          Usage Analytics
        </h2>
        <p className="text-[#6C757D] text-sm sm:text-base">
          Monitor your resource usage and plan limits
        </p>
      </div>

      {/* tomiwa: SECTION 1 - Plan Summary Overview Card 
          Compact horizontal layout with gradient background */}
      <Card className="border-0 shadow-lg overflow-hidden 
                       bg-gradient-to-r from-brand-aqua/10 via-primary-100/30 to-primary-200/20">
        <div className="p-6 
                        sm:p-6 
                        md:p-8 
                        lg:p-8">
          {/* tomiwa: Responsive grid - Stack on mobile, horizontal on desktop */}
          <div className="grid grid-cols-1 
                          sm:grid-cols-1 
                          md:grid-cols-3 
                          lg:grid-cols-3 
                          xl:grid-cols-3 
                          gap-6 
                          md:gap-8">
            {/* tomiwa: Plan Type */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 
                              sm:w-14 sm:h-14 
                              bg-brand-orange rounded-2xl 
                              flex items-center justify-center shadow-md flex-shrink-0">
                <StarIcon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
          </div>
              <div>
                <p className="text-xs sm:text-sm text-[#6C757D] mb-1">Current Plan</p>
                <h3 className="text-xl sm:text-2xl font-bold text-[#0C0932]">
                  {planData.name}
          </h3>
              </div>
        </div>
        
            {/* tomiwa: Days Remaining */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 
                              sm:w-14 sm:h-14 
                              bg-brand-aqua rounded-2xl 
                              flex items-center justify-center shadow-md flex-shrink-0">
                <ClockIcon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-[#6C757D] mb-1">Days Remaining</p>
                <h3 className="text-xl sm:text-2xl font-bold text-[#0C0932]">
                  {trendsData.daysRemaining} Days
                </h3>
              </div>
      </div>

            {/* tomiwa: Next Billing Date */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 
                              sm:w-14 sm:h-14 
                              bg-brand-yellow rounded-2xl 
                              flex items-center justify-center shadow-md flex-shrink-0">
                <CalendarIcon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
          <div>
                <p className="text-xs sm:text-sm text-[#6C757D] mb-1">Next Billing</p>
                <h3 className="text-base sm:text-lg font-bold text-[#0C0932]">
                  {formatDate(planData.nextBilling)}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* tomiwa: SECTION 2 - Usage Overview 
          Grid of consistent progress cards with icons, usage counts, and colored progress bars */}
      <div>
        <h3 className="text-lg sm:text-xl font-display font-bold text-[#0C0932] mb-4 sm:mb-6">
          Usage Overview
        </h3>
        {/* tomiwa: Responsive grid - 1 col mobile, 2 cols tablet, 3 cols desktop */}
        <div className="grid grid-cols-1 
                        sm:grid-cols-2 
                        md:grid-cols-2 
                        lg:grid-cols-3 
                        xl:grid-cols-3 
                        2xl:grid-cols-3 
                        gap-4 sm:gap-6">
          
          {/* tomiwa: Job Postings Card - Blue theme */}
          <Card className="p-6 border-0 shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-2xl 
                              flex items-center justify-center flex-shrink-0">
                <BriefcaseIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-[#0C0932] text-base">Job Postings</h4>
                <p className="text-xs text-[#6C757D]">This month</p>
              </div>
            </div>
            
            {/* tomiwa: Usage count display */}
            <div className="mb-3">
              <p className="text-2xl font-bold text-[#0C0932]">
                {usageData.jobPostings.used} 
                <span className="text-base text-[#6C757D] font-normal">
                  {usageData.jobPostings.limit === 'unlimited' 
                    ? ' / Unlimited' 
                    : ` / ${usageData.jobPostings.limit}`}
              </span>
              </p>
            </div>

            {/* tomiwa: Progress bar - only show if not unlimited */}
            {usageData.jobPostings.limit !== 'unlimited' && (
              <>
                <div className="w-full bg-neutral-200 rounded-full h-2.5 mb-2">
                  <div 
                    className="h-2.5 bg-gradient-to-r from-blue-400 to-blue-600 
                               rounded-full transition-all duration-500"
                    style={{ width: `${getUsagePercentage(usageData.jobPostings.used, usageData.jobPostings.limit)}%` }}
                  />
                </div>
                {/* tomiwa: Percentage text */}
                <p className="text-xs text-[#6C757D] text-right">
                  {getUsagePercentage(usageData.jobPostings.used, usageData.jobPostings.limit)}% used
                </p>
              </>
            )}
          </Card>

          {/* tomiwa: CV Searches Card - Green theme */}
          <Card className="p-6 border-0 shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-2xl 
                              flex items-center justify-center flex-shrink-0">
                <DocumentMagnifyingGlassIcon className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-[#0C0932] text-base">CV Searches</h4>
                <p className="text-xs text-[#6C757D]">This month</p>
              </div>
        </div>

            {/* tomiwa: Usage count display */}
            <div className="mb-3">
              <p className="text-2xl font-bold text-[#0C0932]">
                {usageData.cvSearches.used} 
                <span className="text-base text-[#6C757D] font-normal">
                  / {usageData.cvSearches.limit}
                </span>
              </p>
            </div>

            {/* tomiwa: Progress bar */}
            <div className="w-full bg-neutral-200 rounded-full h-2.5 mb-2">
              <div 
                className="h-2.5 bg-gradient-to-r from-green-400 to-green-600 
                           rounded-full transition-all duration-500"
                style={{ width: `${getUsagePercentage(usageData.cvSearches.used, usageData.cvSearches.limit)}%` }}
              />
            </div>
            {/* tomiwa: Percentage text */}
            <p className="text-xs text-[#6C757D] text-right">
              {getUsagePercentage(usageData.cvSearches.used, usageData.cvSearches.limit)}% used
            </p>
          </Card>

          {/* tomiwa: AI Credits Card - Purple theme */}
          <Card className="p-6 border-0 shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-2xl 
                              flex items-center justify-center flex-shrink-0">
                <SparklesIcon className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-[#0C0932] text-base">AI Credits</h4>
                <p className="text-xs text-[#6C757D]">Remaining</p>
            </div>
          </div>
            
            {/* tomiwa: Usage count display */}
            <div className="mb-3">
              <p className="text-2xl font-bold text-[#0C0932]">
                {usageData.aiCredits.used} 
                <span className="text-base text-[#6C757D] font-normal">
                  / {usageData.aiCredits.limit}
            </span>
              </p>
            </div>

            {/* tomiwa: Progress bar */}
            <div className="w-full bg-neutral-200 rounded-full h-2.5 mb-2">
              <div 
                className="h-2.5 bg-gradient-to-r from-purple-400 to-purple-600 
                           rounded-full transition-all duration-500"
                style={{ width: `${getUsagePercentage(usageData.aiCredits.used, usageData.aiCredits.limit)}%` }}
              />
            </div>
            {/* tomiwa: Percentage text with warning if running low */}
            <div className="flex items-center justify-between">
              <p className="text-xs text-[#6C757D]">
                {getUsagePercentage(usageData.aiCredits.used, usageData.aiCredits.limit)}% used
              </p>
              {getUsagePercentage(usageData.aiCredits.used, usageData.aiCredits.limit) > 70 && (
                <div className="flex items-center gap-1 text-amber-600">
                  <ExclamationTriangleIcon className="w-3.5 h-3.5" />
                  <span className="text-xs font-medium">Low</span>
          </div>
        )}
            </div>
          </Card>

          {/* tomiwa: Interviews Scheduled Card - Orange theme */}
          <Card className="p-6 border-0 shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-2xl 
                              flex items-center justify-center flex-shrink-0">
                <CalendarIcon className="w-6 h-6 text-orange-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-[#0C0932] text-base">Interviews</h4>
                <p className="text-xs text-[#6C757D]">Scheduled</p>
              </div>
            </div>
            
            {/* tomiwa: Usage count display */}
            <div className="mb-3">
              <p className="text-2xl font-bold text-[#0C0932]">
                {usageData.interviews.used} 
                <span className="text-base text-[#6C757D] font-normal">
                  / {usageData.interviews.limit}
                </span>
              </p>
            </div>

            {/* tomiwa: Progress bar */}
            <div className="w-full bg-neutral-200 rounded-full h-2.5 mb-2">
              <div 
                className="h-2.5 bg-gradient-to-r from-orange-400 to-brand-orange 
                           rounded-full transition-all duration-500"
                style={{ width: `${getUsagePercentage(usageData.interviews.used, usageData.interviews.limit)}%` }}
              />
            </div>
            {/* tomiwa: Percentage text */}
            <p className="text-xs text-[#6C757D] text-right">
              {getUsagePercentage(usageData.interviews.used, usageData.interviews.limit)}% used
            </p>
          </Card>
        </div>
      </div>

      {/* tomiwa: SECTION 3 - Insights & Trends 
          Two-panel layout: Left shows analytics, Right shows billing cycle progress */}
      <div>
        <h3 className="text-lg sm:text-xl font-display font-bold text-[#0C0932] mb-4 sm:mb-6">
          Insights & Trends
        </h3>
        {/* tomiwa: Responsive grid - Stack on mobile/tablet, side-by-side on desktop */}
        <div className="grid grid-cols-1 
                        sm:grid-cols-1 
                        md:grid-cols-1 
                        lg:grid-cols-2 
                        xl:grid-cols-2 
                        gap-6">
          
          {/* tomiwa: LEFT PANEL - Analytics Insights with horizontal bars */}
          <Card className="p-6 sm:p-8 border-0 shadow-md rounded-2xl">
            <h4 className="text-base sm:text-lg font-bold text-[#0C0932] mb-6">
              Quick Insights
            </h4>
            <div className="space-y-4">
              {/* tomiwa: Monthly Growth insight */}
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-[#6C757D]">Monthly Growth</span>
                  <span className="text-lg font-bold text-emerald-600">
                    +{trendsData.monthlyGrowth}%
                  </span>
                </div>
                {/* tomiwa: Visual indicator bar */}
                <div className="w-full bg-emerald-200 rounded-full h-2">
                  <div 
                    className="h-2 bg-gradient-to-r from-emerald-400 to-emerald-600 
                               rounded-full transition-all duration-500"
                    style={{ width: `${trendsData.monthlyGrowth}%` }}
                  />
                </div>
              </div>

              {/* tomiwa: Peak Activity Day insight */}
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-[#6C757D]">Peak Activity Day</span>
                  <span className="text-base font-bold text-blue-600">
                    {trendsData.peakDay}
                  </span>
                </div>
              </div>

              {/* tomiwa: Most Used Feature insight */}
              <div className="p-4 bg-purple-50 rounded-xl border border-purple-100">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-[#6C757D]">Most Used Feature</span>
                  <span className="text-base font-bold text-purple-600">
                    {trendsData.mostUsedFeature}
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {/* tomiwa: RIGHT PANEL - Billing Cycle Progress with circular visualization */}
          <Card className="p-6 sm:p-8 border-0 shadow-md rounded-2xl 
                           bg-gradient-to-br from-orange-50/30 via-white to-primary-50/20">
            <h4 className="text-base sm:text-lg font-bold text-[#0C0932] mb-6">
              Billing Cycle Progress
            </h4>
            
            {/* tomiwa: Circular progress container */}
            <div className="flex flex-col items-center justify-center py-4">
              {/* tomiwa: Circular progress visual - Using SVG for circular effect */}
              <div className="relative w-40 h-40 
                              sm:w-48 sm:h-48 
                              mb-6">
                {/* tomiwa: Background circle */}
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  {/* tomiwa: Background track */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#e5e5e5"
                    strokeWidth="8"
                  />
                  {/* tomiwa: Progress arc - gradient from orange to aqua */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="url(#progressGradient)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${trendsData.billingCycleProgress * 2.51} 251`}
                    className="transition-all duration-500"
                  />
                  {/* tomiwa: Define gradient for progress arc */}
                  <defs>
                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#EF522E" />
                      <stop offset="100%" stopColor="#36D0D8" />
                    </linearGradient>
                  </defs>
                </svg>
                
                {/* tomiwa: Center text - Days remaining */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-4xl sm:text-5xl font-bold text-[#0C0932]">
                    {trendsData.daysRemaining}
                  </p>
                  <p className="text-sm text-[#6C757D] mt-1">Days Left</p>
                </div>
              </div>

              {/* tomiwa: Next billing date info */}
              <div className="text-center">
                <p className="text-sm text-[#6C757D] mb-1">Next Billing Date</p>
                <p className="text-lg font-bold text-[#0C0932]">
                  {formatDate(planData.nextBilling)}
                </p>
              </div>

              {/* tomiwa: Progress percentage text */}
              <div className="mt-4 px-4 py-2 bg-gradient-to-r from-brand-orange/10 to-brand-aqua/10 
                              rounded-full border border-brand-orange/20">
                <p className="text-sm font-medium text-[#0C0932]">
                  {trendsData.billingCycleProgress}% of cycle complete
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* tomiwa: Upgrade Plan button positioned at bottom-right 
          Outlined orange button with hover-fill interaction */}
      {onUpgrade && (
        <div className="flex justify-end">
          <Button
            variant="outline"
            onClick={onUpgrade}
            className="flex items-center gap-2 
                       px-6 py-3 
                       border-2 border-brand-orange text-brand-orange 
                       hover:bg-brand-orange hover:text-white 
                       transition-all duration-300 
                       rounded-2xl
                       font-medium text-sm sm:text-base
                       shadow-sm hover:shadow-md"
          >
            <ArrowUpIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            Upgrade Plan
          </Button>
          </div>
        )}
      </div>
  );
}
