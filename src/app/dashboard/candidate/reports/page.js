/**
 * File: src/app/dashboard/candidate/reports/page.js
 * 
 * tomiwa: Reports & Analytics Page
 * A simple, clean page showing job search performance and career insights
 * 
 * Layout Structure:
 * ================
 * HERO BANNER: Aqua-to-teal gradient
 *              - Title: "Reports & Analytics"
 *              - Subtitle: Track your job search performance
 * 
 * SECTION 1: Quick Stats (4 cards)
 *            - Applications, Interviews, Response Rate, Profile Views
 * 
 * SECTION 2: Application Activity (Simple chart visualization)
 *            - Weekly application trend
 * 
 * SECTION 3: Application Status Breakdown
 *            - Visual breakdown of application statuses
 * 
 * SECTION 4: Top Insights
 *            - AI-powered actionable tips
 */

'use client';

import { useState } from 'react';
import CandidateDashboardLayout from '@/components/layouts/CandidateDashboardLayout.jsx';
import { 
  ChartBarIcon, 
  DocumentTextIcon,
  CalendarIcon,
  EyeIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  SparklesIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  PauseCircleIcon,
  ArrowPathIcon,
  LightBulbIcon,
  DocumentArrowDownIcon,
  BriefcaseIcon, // tomiwa: NEW - Added for "Most Applied Roles" section
} from '@heroicons/react/24/outline';

// tomiwa: NEW - Mock data for quick stats
// ExistingCode: Shows overall job search performance metrics
const quickStats = [
  {
    id: 1,
    title: 'Total Applications',
    value: '28',
    change: '+5 this week',
    changeType: 'positive',
    icon: DocumentTextIcon,
    iconBg: 'bg-brand-aqua/10',
    iconColor: 'text-brand-aqua',
  },
  {
    id: 2,
    title: 'Interviews Scheduled',
    value: '5',
    change: '+2 this week',
    changeType: 'positive',
    icon: CalendarIcon,
    iconBg: 'bg-brand-orange/10',
    iconColor: 'text-brand-orange',
  },
  {
    id: 3,
    title: 'Response Rate',
    value: '42%',
    change: '+8% from last month',
    changeType: 'positive',
    icon: ArrowTrendingUpIcon,
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
  },
  {
    id: 4,
    title: 'Profile Views',
    value: '156',
    change: '+23 this week',
    changeType: 'positive',
    icon: EyeIcon,
    iconBg: 'bg-brand-yellow/20',
    iconColor: 'text-brand-yellow',
  },
];

// tomiwa: NEW - Mock data for weekly application activity
// ExistingCode: Shows applications submitted per day this week
const weeklyActivity = [
  { day: 'Mon', applications: 3 },
  { day: 'Tue', applications: 5 },
  { day: 'Wed', applications: 2 },
  { day: 'Thu', applications: 4 },
  { day: 'Fri', applications: 6 },
  { day: 'Sat', applications: 1 },
  { day: 'Sun', applications: 0 },
];

// tomiwa: NEW - Mock data for application status breakdown
// ExistingCode: Shows distribution of application statuses
const statusBreakdown = [
  { status: 'Pending Review', count: 12, color: 'bg-brand-yellow', icon: ClockIcon },
  { status: 'Under Consideration', count: 8, color: 'bg-brand-aqua', icon: ArrowPathIcon },
  { status: 'Interview Stage', count: 5, color: 'bg-brand-orange', icon: CalendarIcon },
  { status: 'Accepted', count: 2, color: 'bg-emerald-500', icon: CheckCircleIcon },
  { status: 'Not Selected', count: 1, color: 'bg-neutral-400', icon: XCircleIcon },
];

// tomiwa: UPDATED - Mock data for best roles for user
// updated: Replaced complicated "Smart Insights" with simpler "Best Roles For You"
const bestRolesForYou = [
  {
    id: 1,
    title: 'UI/UX Designer',
    matchScore: 95,
    reason: 'Matches your skills: Figma, Design Systems, User Research',
    avgSalary: '₦450,000 - ₦800,000/mo',
  },
  {
    id: 2,
    title: 'Product Designer',
    matchScore: 88,
    reason: 'Strong portfolio alignment with product roles',
    avgSalary: '₦500,000 - ₦900,000/mo',
  },
  {
    id: 3,
    title: 'Frontend Developer',
    matchScore: 75,
    reason: 'Your design skills complement frontend roles',
    avgSalary: '₦400,000 - ₦750,000/mo',
  },
];

// tomiwa: NEW - Mock data for most applied roles
// new: Shows which roles the user applies to most frequently
const mostAppliedRoles = [
  { role: 'UI/UX Designer', count: 12, percentage: 43 },
  { role: 'Product Designer', count: 8, percentage: 29 },
  { role: 'Graphic Designer', count: 5, percentage: 18 },
  { role: 'Frontend Developer', count: 3, percentage: 10 },
];

export default function Reports() {
  // tomiwa: State for selected time period filter
  const [timePeriod, setTimePeriod] = useState('week');
  
  // tomiwa: Calculate max value for chart scaling
  const maxApplications = Math.max(...weeklyActivity.map(d => d.applications));
  
  // tomiwa: Calculate total applications for status breakdown
  const totalApplications = statusBreakdown.reduce((sum, item) => sum + item.count, 0);

  return (
    <CandidateDashboardLayout>
      {/* tomiwa: UPDATED - Hero Banner matching dashboard design */}
      {/* updated: Uses the same aqua-to-teal gradient as the main dashboard */}
      <div className="bg-gradient-to-r from-brand-aqua to-[#0C5B65]">
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
              {/* tomiwa: Main heading with Monument Extended font */}
              <h1 className="text-3xl 
                            sm:text-4xl 
                            md:text-4xl 
                            lg:text-5xl 
                            font-display font-bold text-white mb-2">
                Reports & Analytics
              </h1>
              {/* tomiwa: Subtitle in uniform style */}
              <p className="text-[#D9E5E6] text-base 
                           sm:text-lg 
                           md:text-lg 
                           lg:text-xl 
                           leading-relaxed max-w-2xl">
                Track your job search performance and get actionable insights
              </p>
            </div>
            {/* tomiwa: Download report button */}
            <button
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:bg-white/20 hover:scale-105"
            >
              <DocumentArrowDownIcon className="w-5 h-5" />
              Download Report
            </button>
          </div>
        </div>
      </div>

      {/* tomiwa: Main content area */}
      <main className="max-w-7xl mx-auto px-6 sm:px-8 md:px-10 lg:px-12 py-8 sm:py-10 md:py-12">
        
        {/* ================================================================ */}
        {/* SECTION 1: Quick Stats Cards                                     */}
        {/* tomiwa: Four cards showing key performance metrics               */}
        {/* ================================================================ */}
        {/* tomiwa: UPDATED - Removed excess shadow-lg, using subtle shadow instead */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <div 
                key={stat.id}
                className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6 hover:shadow-md transition-all duration-300 hover:scale-105"
              >
                {/* tomiwa: Icon and title row */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 ${stat.iconBg} rounded-xl flex items-center justify-center`}>
                    <IconComponent className={`w-6 h-6 ${stat.iconColor}`} />
                  </div>
                  <span className="text-sm font-medium text-neutral-600">{stat.title}</span>
                </div>
                {/* tomiwa: Value display */}
                <p className="text-3xl font-display font-bold text-brand-black mb-2">
                  {stat.value}
                </p>
                {/* tomiwa: Change indicator */}
                <div className="flex items-center gap-1.5">
                  {stat.changeType === 'positive' ? (
                    <ArrowTrendingUpIcon className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <ArrowTrendingDownIcon className="w-4 h-4 text-red-500" />
                  )}
                  <span className={`text-sm font-medium ${
                    stat.changeType === 'positive' ? 'text-emerald-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ================================================================ */}
        {/* SECTION 2 & 3: Activity Chart and Status Breakdown (Side by Side) */}
        {/* ================================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          
          {/* tomiwa: UPDATED - Weekly Application Activity Chart - removed excess shadow */}
          <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <ChartBarIcon className="w-7 h-7 text-brand-aqua" />
                <h2 className="text-xl font-display font-bold text-brand-black">Weekly Activity</h2>
              </div>
              {/* tomiwa: Time period filter */}
              <div className="flex items-center gap-2 bg-neutral-100 p-1 rounded-lg">
                <button
                  onClick={() => setTimePeriod('week')}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    timePeriod === 'week' 
                      ? 'bg-white text-brand-black shadow-sm' 
                      : 'text-neutral-600 hover:text-brand-black'
                  }`}
                >
                  Week
                </button>
                <button
                  onClick={() => setTimePeriod('month')}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    timePeriod === 'month' 
                      ? 'bg-white text-brand-black shadow-sm' 
                      : 'text-neutral-600 hover:text-brand-black'
                  }`}
                >
                  Month
                </button>
              </div>
            </div>

            {/* tomiwa: Simple bar chart visualization */}
            <div className="space-y-4">
              {weeklyActivity.map((day, index) => (
                <div key={index} className="flex items-center gap-4">
                  {/* tomiwa: Day label */}
                  <span className="w-10 text-sm font-medium text-neutral-600">{day.day}</span>
                  {/* tomiwa: Bar container */}
                  <div className="flex-1 h-8 bg-neutral-100 rounded-lg overflow-hidden">
                    {/* tomiwa: Filled bar based on percentage */}
                    <div 
                      className="h-full bg-gradient-to-r from-brand-aqua to-[#2BA6AD] rounded-lg transition-all duration-500 flex items-center justify-end pr-3"
                      style={{ width: `${maxApplications > 0 ? (day.applications / maxApplications) * 100 : 0}%` }}
                    >
                      {day.applications > 0 && (
                        <span className="text-xs font-bold text-white">{day.applications}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* tomiwa: Chart summary */}
            <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between">
              <span className="text-sm text-neutral-600">Total this week</span>
              <span className="text-lg font-bold text-brand-aqua">
                {weeklyActivity.reduce((sum, d) => sum + d.applications, 0)} applications
              </span>
            </div>
          </div>

          {/* tomiwa: UPDATED - Application Status Breakdown - removed excess shadow */}
          <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <DocumentTextIcon className="w-7 h-7 text-brand-orange" />
              <h2 className="text-xl font-display font-bold text-brand-black">Application Status</h2>
            </div>

            {/* tomiwa: Status breakdown list */}
            <div className="space-y-4">
              {statusBreakdown.map((item, index) => {
                const IconComponent = item.icon;
                const percentage = Math.round((item.count / totalApplications) * 100);
                return (
                  <div key={index}>
                    {/* tomiwa: Status row with icon, label, and count */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 ${item.color} bg-opacity-20 rounded-lg flex items-center justify-center`}>
                          <IconComponent className={`w-4 h-4 ${item.color.replace('bg-', 'text-')}`} />
                        </div>
                        <span className="text-sm font-medium text-neutral-700">{item.status}</span>
                      </div>
                      <span className="text-sm font-bold text-brand-black">{item.count}</span>
                    </div>
                    {/* tomiwa: Progress bar */}
                    <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${item.color} rounded-full transition-all duration-500`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* tomiwa: Total summary */}
            <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between">
              <span className="text-sm text-neutral-600">Total applications</span>
              <span className="text-lg font-bold text-brand-black">{totalApplications}</span>
            </div>
          </div>
        </div>

        {/* ================================================================ */}
        {/* SECTION 4: Best Roles For You & Most Applied Roles              */}
        {/* tomiwa: UPDATED - Replaced Smart Insights with simpler sections */}
        {/* ================================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* tomiwa: NEW - Best Roles For You Section */}
          {/* new: Shows roles that best match the user's profile */}
          <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <SparklesIcon className="w-7 h-7 text-brand-yellow" />
              <h2 className="text-xl font-display font-bold text-brand-black">Best Roles For You</h2>
            </div>

            {/* tomiwa: Best roles list */}
            <div className="space-y-4">
              {bestRolesForYou.map((role) => (
                <div 
                  key={role.id}
                  className="p-4 bg-neutral-50 rounded-xl hover:bg-primary-50 transition-colors group"
                >
                  {/* tomiwa: Role header with match score */}
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-brand-black">{role.title}</h3>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      role.matchScore >= 90 
                        ? 'bg-emerald-100 text-emerald-700' 
                        : role.matchScore >= 80 
                        ? 'bg-brand-aqua/20 text-brand-aqua' 
                        : 'bg-brand-yellow/20 text-brand-yellow'
                    }`}>
                      {role.matchScore}% Match
                    </span>
                  </div>
                  {/* tomiwa: Match reason */}
                  <p className="text-sm text-neutral-600 mb-2">{role.reason}</p>
                  {/* tomiwa: Salary range */}
                  <p className="text-xs text-brand-aqua font-medium">{role.avgSalary}</p>
                </div>
              ))}
            </div>
          </div>

          {/* tomiwa: NEW - Most Applied Roles Section */}
          {/* new: Shows which roles the user applies to most */}
          <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <BriefcaseIcon className="w-7 h-7 text-brand-orange" />
              <h2 className="text-xl font-display font-bold text-brand-black">Most Applied Roles</h2>
            </div>

            {/* tomiwa: Most applied roles list with progress bars */}
            <div className="space-y-5">
              {mostAppliedRoles.map((item, index) => (
                <div key={index}>
                  {/* tomiwa: Role name and count */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-brand-black">{item.role}</span>
                    <span className="text-sm text-neutral-600">{item.count} applications</span>
                  </div>
                  {/* tomiwa: Progress bar showing percentage */}
                  <div className="h-3 bg-neutral-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-brand-orange to-brand-yellow rounded-full transition-all duration-500"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* tomiwa: Summary */}
            <div className="mt-6 pt-4 border-t border-neutral-100">
              <p className="text-sm text-neutral-600">
                You've applied to <span className="font-bold text-brand-black">{mostAppliedRoles.reduce((sum, r) => sum + r.count, 0)}</span> jobs across <span className="font-bold text-brand-black">{mostAppliedRoles.length}</span> different roles
              </p>
            </div>
          </div>
        </div>

      </main>
    </CandidateDashboardLayout>
  );
}
