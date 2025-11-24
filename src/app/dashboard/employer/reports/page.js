/**
 * File Location: /src/app/dashboard/employer/reports/page.js
 * 
 * tomiwa: Redesigned Reports & Analytics Page - Simplified and Full Page Layout
 * This page displays key hiring analytics with a clean, functional design
 * focused on the most important metrics and easy report generation
 */

'use client';

import { useState } from 'react';
import {
  ChartBarIcon,
  UsersIcon,
  CalendarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ArrowDownTrayIcon,
  FunnelIcon,
  ChartPieIcon,
  DocumentTextIcon,
  XMarkIcon,
  BriefcaseIcon,
  ClockIcon,
  CheckCircleIcon,
  AdjustmentsHorizontalIcon,
} from '@heroicons/react/24/outline';
import EmployerDashboardLayout from '@/components/layouts/EmployerDashboardLayout';

// tomiwa: Mock data for key metrics
const mockStats = {
  totalCandidates: { value: 1247, change: 12.5, trend: 'up' },
  interviewsConducted: { value: 342, change: 8.3, trend: 'up' },
  avgTimeToHire: { value: '18 days', change: -5.2, trend: 'down' },
  hires: { value: 89, change: 15.7, trend: 'up' },
};

// tomiwa: Hiring funnel data with conversion rates
// johnson: ExistingCode - Now includes rejected candidates tracking with minimal color palette
const funnelData = [
  { stage: 'Applications', count: 1247, percentage: 100 },
  { stage: 'Shortlisted', count: 498, percentage: 39.9 },
  { stage: 'Interviewed', count: 342, percentage: 27.4 },
  { stage: 'Offered', count: 127, percentage: 10.2 },
  { stage: 'Hired', count: 89, percentage: 7.1 },
  { stage: 'Rejected', count: 749, percentage: 60.1 }, // tomiwa: NEW - Tracks candidates who were rejected at any stage
];

// tomiwa: Top performing job posts data
const topJobsData = [
  { title: 'Senior Frontend Developer', applications: 245 },
  { title: 'Product Manager', applications: 189 },
  { title: 'UX Designer', applications: 167 },
  { title: 'Backend Engineer', applications: 143 },
  { title: 'Data Scientist', applications: 98 },
];

// tomiwa: Offer acceptance data - tracks offer success metrics
const offerAcceptanceData = {
  totalOffers: 127,
  accepted: 89,
  declined: 28,
  pending: 10,
  acceptanceRate: 70.1, // (accepted / total) * 100
  trend: 'up',
  trendValue: 5.2,
};

// tomiwa: NEW - Average time spent in each stage of hiring process
// johnson: Simplified data structure for minimal design
const timeInStageData = [
  { stage: 'Application Review', avgDays: 3 },
  { stage: 'Screening', avgDays: 5 },
  { stage: 'Interview Process', avgDays: 7 },
  { stage: 'Offer & Decision', avgDays: 3 },
];

// tomiwa: NEW - Candidate rejection reasons to identify bottlenecks
const rejectionReasonsData = [
  { reason: 'Qualifications Mismatch', count: 342, percentage: 45.7 },
  { reason: 'Failed Assessment', count: 187, percentage: 25.0 },
  { reason: 'Culture Fit', count: 112, percentage: 14.9 },
  { reason: 'Compensation Expectations', count: 68, percentage: 9.1 },
  { reason: 'Other', count: 40, percentage: 5.3 },
];

// tomiwa: Reusable Stat Card Component with Minimal Design
// johnson: ExistingCode - This component displays key metrics with trend indicators
function StatCard({ icon: Icon, title, value, change, trend, iconColor }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-neutral-200 hover:border-neutral-300 transition-all duration-200">
      {/* tomiwa: Colorful icon - using brand colors */}
      <div className="mb-4">
        <Icon className={`w-5 h-5 ${iconColor}`} />
      </div>

      {/* tomiwa: Stat title */}
      <h3 className="text-neutral-600 text-xs font-medium mb-2 uppercase tracking-wide">
        {title}
      </h3>

      {/* tomiwa: Main value display */}
      <div className="text-2xl font-display font-bold text-brand-black mb-2">
        {value}
      </div>

      {/* tomiwa: Minimal change indicator */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 text-neutral-600">
          {trend === 'up' ? (
            <ArrowTrendingUpIcon className="w-3 h-3" />
          ) : (
            <ArrowTrendingDownIcon className="w-3 h-3" />
          )}
          <span className="text-xs font-semibold">
            {change}%
          </span>
        </div>
        <span className="text-xs text-neutral-400">vs last month</span>
      </div>
    </div>
  );
}

export default function ReportsAnalyticsPage() {
  // tomiwa: State management for filters, modals, and notifications
  const [dateRange, setDateRange] = useState('last-30-days');
  const [department, setDepartment] = useState('all');
  const [reportType, setReportType] = useState('overview');
  const [showReportModal, setShowReportModal] = useState(false);
  const [activeReportTab, setActiveReportTab] = useState('overview');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // tomiwa: Function to show toast notification
  const displayToast = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // tomiwa: Handle report generation
  const handleGenerateReport = () => {
    setShowReportModal(true);
  };

  // tomiwa: Handle report export actions
  const handleExportPDF = () => {
    displayToast('PDF report downloaded successfully!');
    setShowReportModal(false);
  };

  const handleExportCSV = () => {
    displayToast('CSV data exported successfully!');
    setShowReportModal(false);
  };

  return (
    <EmployerDashboardLayout>
      {/* tomiwa: Full page container with subtle tinted background */}
      <div className="min-h-screen bg-brand-aqua/5">
        
        {/* tomiwa: Minimal Header with Title and Quick Actions */}
        <div className="bg-white border-b-2 border-b-brand-aqua">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {/* johnson: ExistingCode - Header row with title and actions */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* tomiwa: Minimal title section */}
              <div>
                <h1 className="text-2xl font-display font-bold text-brand-black">
                  Reports & Analytics
                </h1>
                <p className="text-neutral-500 text-sm mt-1">
                  Track your hiring performance and key metrics
                </p>
              </div>

              {/* tomiwa: Clean filters and generate report button */}
              <div className="flex flex-col sm:flex-row gap-3">
                {/* johnson: ExistingCode - Date range filter */}
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="px-4 py-2.5 bg-white border border-neutral-300 rounded-xl text-neutral-700 text-sm focus:outline-none focus:border-neutral-400 transition-colors"
                >
                  <option value="last-7-days">Last 7 Days</option>
                  <option value="last-30-days">Last 30 Days</option>
                  <option value="last-90-days">Last 90 Days</option>
                  <option value="last-year">Last Year</option>
                </select>

                {/* johnson: ExistingCode - Department filter */}
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="px-4 py-2.5 bg-white border border-neutral-300 rounded-xl text-neutral-700 text-sm focus:outline-none focus:border-neutral-400 transition-colors"
                >
                  <option value="all">All Departments</option>
                  <option value="engineering">Engineering</option>
                  <option value="product">Product</option>
                  <option value="design">Design</option>
                  <option value="marketing">Marketing</option>
                </select>

                {/* tomiwa: Minimal Generate Report button */}
                <button
                  onClick={handleGenerateReport}
                  className="bg-neutral-900 hover:bg-neutral-800 text-white px-6 py-2.5 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <DocumentTextIcon className="w-4 h-4" />
                  <span className="whitespace-nowrap">Generate Report</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* tomiwa: Main Content Container - Full width layout for better space utilization */}
        {/* johnson: ExistingCode - Container for all dashboard content */}
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* tomiwa: Four Key Stat Cards - Responsive grid layout */}
          {/* All screen sizes: mobile (1 col), tablet portrait (2 cols), desktop (4 cols) */}
          <div className="grid grid-cols-1 
                          sm:grid-cols-2 
                          lg:grid-cols-4 
                          gap-6 mb-8">
            
            {/* tomiwa: Card 1 - Total Candidates Reviewed */}
            <StatCard
              icon={UsersIcon}
              title="Total Candidates"
              value={mockStats.totalCandidates.value.toLocaleString()}
              change={mockStats.totalCandidates.change}
              trend={mockStats.totalCandidates.trend}
              iconColor="text-brand-aqua"
            />

            {/* tomiwa: Card 2 - Interviews Conducted */}
            <StatCard
              icon={CalendarIcon}
              title="Interviews"
              value={mockStats.interviewsConducted.value.toLocaleString()}
              change={mockStats.interviewsConducted.change}
              trend={mockStats.interviewsConducted.trend}
              iconColor="text-brand-orange"
            />

            {/* tomiwa: Card 3 - Average Time-to-Hire */}
            <StatCard
              icon={ClockIcon}
              title="Avg Time-to-Hire"
              value={mockStats.avgTimeToHire.value}
              change={Math.abs(mockStats.avgTimeToHire.change)}
              trend={mockStats.avgTimeToHire.trend}
              iconColor="text-brand-yellow"
            />

            {/* tomiwa: Card 4 - Total Hires */}
            <StatCard
              icon={CheckCircleIcon}
              title="Total Hires"
              value={mockStats.hires.value}
              change={mockStats.hires.change}
              trend={mockStats.hires.trend}
              iconColor="text-emerald-500"
            />
          </div>

          {/* tomiwa: Hiring Funnel Section - Full width card with minimal design */}
          {/* johnson: ExistingCode - This section shows the conversion funnel for candidates */}
          <div className="bg-white rounded-xl shadow-sm p-6 lg:p-8 mb-8 border-l-4 border-l-brand-aqua border-t border-r border-b border-neutral-200">
            <div className="flex items-center gap-3 mb-8">
              <FunnelIcon className="w-6 h-6 text-brand-aqua" />
              <h2 className="text-xl font-display font-bold text-brand-black">
                Hiring Funnel
              </h2>
            </div>

            {/* tomiwa: Minimal funnel visualization - clean and simple */}
            {/* johnson: ExistingCode - Visual representation of each hiring stage */}
            <div className="space-y-4">
              {funnelData.map((stage, index) => (
                <div key={stage.stage}>
                  {/* tomiwa: Stage header with name and count */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-neutral-700">
                      {stage.stage}
                    </span>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-neutral-600">
                        {stage.count.toLocaleString()}
                      </span>
                      <span className="text-sm font-semibold text-neutral-900 min-w-[45px] text-right">
                        {stage.percentage}%
                      </span>
                    </div>
                  </div>
                  
                  {/* tomiwa: Colorful progress bar - using brand colors for each stage */}
                  <div className="relative h-2 bg-neutral-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ease-out ${
                        stage.stage === 'Applications' ? 'bg-brand-aqua' :
                        stage.stage === 'Shortlisted' ? 'bg-brand-orange' :
                        stage.stage === 'Interviewed' ? 'bg-brand-yellow' :
                        stage.stage === 'Offered' ? 'bg-emerald-500' :
                        stage.stage === 'Hired' ? 'bg-brand-black' :
                        'bg-red-400'
                      }`}
                      style={{ width: `${stage.percentage}%` }}
                    />
                  </div>

                  {/* tomiwa: Colorful divider between stages */}
                  {index < funnelData.length - 1 && (
                    <div className="h-px bg-brand-aqua/20 my-4" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* tomiwa: Two Key Charts Section - Side by side layout */}
          {/* johnson: ExistingCode - Grid layout for analytics charts */}
          {/* All screen sizes: mobile (1 col), desktop (2 cols) for better data visualization */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* tomiwa: Chart 1 - Top Performing Job Posts with minimal design */}
            {/* johnson: ExistingCode - Bar chart showing which jobs get most applications */}
            <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-l-brand-orange border-t border-r border-b border-neutral-200">
              <div className="flex items-center gap-3 mb-6">
                <BriefcaseIcon className="w-5 h-5 text-brand-orange" />
                <h3 className="text-lg font-display font-bold text-brand-black">
                  Top Performing Jobs
                </h3>
              </div>
              
              {/* tomiwa: Minimal bar chart visualization */}
              <div className="space-y-4">
                {topJobsData.map((job, index) => {
                  const maxApplications = Math.max(...topJobsData.map(j => j.applications));
                  const widthPercentage = (job.applications / maxApplications) * 100;
                  
                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-neutral-700 font-medium truncate pr-2">
                          {job.title}
                        </span>
                        <span className="text-neutral-900 font-semibold whitespace-nowrap">
                          {job.applications}
                        </span>
                      </div>
                      <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-brand-orange rounded-full transition-all duration-500 ease-out"
                          style={{ width: `${widthPercentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* tomiwa: Chart 2 - Offer Acceptance Rate with minimal design */}
            {/* johnson: ExistingCode - Shows offer success metrics and candidate acceptance trends */}
            <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-l-emerald-500 border-t border-r border-b border-neutral-200">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <CheckCircleIcon className="w-5 h-5 text-emerald-500" />
                  <h3 className="text-lg font-display font-bold text-brand-black">
                    Offer Acceptance Rate
                  </h3>
                </div>
                {/* tomiwa: Minimal trend indicator */}
                <div className="flex items-center gap-1 text-neutral-600">
                  {offerAcceptanceData.trend === 'up' ? (
                    <ArrowTrendingUpIcon className="w-4 h-4" />
                  ) : (
                    <ArrowTrendingDownIcon className="w-4 h-4" />
                  )}
                  <span className="text-xs font-semibold">
                    {offerAcceptanceData.trendValue}%
                  </span>
                </div>
              </div>

              {/* tomiwa: Clean acceptance rate display */}
              <div className="bg-neutral-50 rounded-xl p-6 mb-6 text-center border border-neutral-200">
                <p className="text-xs text-neutral-600 mb-2 uppercase tracking-wide">Overall Acceptance Rate</p>
                <p className="text-4xl font-display font-bold text-neutral-900 mb-1">
                  {offerAcceptanceData.acceptanceRate}%
                </p>
                <p className="text-xs text-neutral-500">
                  {offerAcceptanceData.accepted} accepted out of {offerAcceptanceData.totalOffers} offers
                </p>
              </div>

              {/* tomiwa: Minimal breakdown of offer statuses */}
              <div className="space-y-3">
                {/* johnson: ExistingCode - Accepted offers metric */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-neutral-700 font-medium">
                      Accepted
                    </span>
                    <span className="text-neutral-900 font-semibold">
                      {offerAcceptanceData.accepted}
                    </span>
                  </div>
                  <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                      style={{ width: `${(offerAcceptanceData.accepted / offerAcceptanceData.totalOffers) * 100}%` }}
                    />
                  </div>
                </div>

                {/* johnson: ExistingCode - Declined offers metric */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-neutral-700 font-medium">
                      Declined
                    </span>
                    <span className="text-neutral-900 font-semibold">
                      {offerAcceptanceData.declined}
                    </span>
                  </div>
                  <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-red-400 rounded-full transition-all duration-500"
                      style={{ width: `${(offerAcceptanceData.declined / offerAcceptanceData.totalOffers) * 100}%` }}
                    />
                  </div>
                </div>

                {/* johnson: ExistingCode - Pending offers metric */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-neutral-700 font-medium">
                      Pending
                    </span>
                    <span className="text-neutral-900 font-semibold">
                      {offerAcceptanceData.pending}
                    </span>
                  </div>
                  <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-brand-yellow rounded-full transition-all duration-500"
                      style={{ width: `${(offerAcceptanceData.pending / offerAcceptanceData.totalOffers) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* tomiwa: NEW - Time in Stage & Rejection Reasons - Two column grid with minimal design */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            
            {/* johnson: Left - Time spent in each hiring stage with minimal design */}
            <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-l-brand-aqua border-t border-r border-b border-neutral-200">
              <div className="flex items-center gap-3 mb-6">
                <ClockIcon className="w-5 h-5 text-brand-aqua" />
                <h3 className="text-lg font-display font-bold text-brand-black">
                  Time in Each Stage
                </h3>
              </div>

              {/* tomiwa: Clean list showing average days per stage */}
              <div className="space-y-3">
                {timeInStageData.map((stage, index) => {
                  const maxDays = Math.max(...timeInStageData.map(s => s.avgDays));
                  const widthPercentage = (stage.avgDays / maxDays) * 100;
                  
                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-neutral-700 font-medium">
                          {stage.stage}
                        </span>
                        <span className="text-neutral-900 font-semibold">
                          {stage.avgDays} days
                        </span>
                      </div>
                      <div className="relative h-2 bg-neutral-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-brand-aqua rounded-full transition-all duration-500 ease-out"
                          style={{ width: `${widthPercentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* tomiwa: Clean total time calculation */}
              <div className="mt-6 bg-neutral-50 rounded-xl p-4 border border-neutral-200">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-neutral-600 uppercase tracking-wide">
                    Total Time-to-Hire
                  </span>
                  <span className="text-2xl font-display font-bold text-neutral-900">
                    {timeInStageData.reduce((sum, stage) => sum + stage.avgDays, 0)} days
                  </span>
                </div>
              </div>
            </div>

            {/* johnson: Right - Rejection reasons breakdown with minimal design */}
            <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-l-brand-orange border-t border-r border-b border-neutral-200">
              <div className="flex items-center gap-3 mb-6">
                <XMarkIcon className="w-5 h-5 text-brand-orange" />
                <h3 className="text-lg font-display font-bold text-brand-black">
                  Rejection Reasons
                </h3>
              </div>

              {/* tomiwa: Clean breakdown of why candidates are rejected */}
              <div className="space-y-3">
                {rejectionReasonsData.map((reason, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-neutral-700 font-medium">
                        {reason.reason}
                      </span>
                      <div className="flex items-center gap-3">
                        <span className="text-neutral-600 text-xs">
                          {reason.count}
                        </span>
                        <span className="text-neutral-900 font-semibold min-w-[45px] text-right">
                          {reason.percentage}%
                        </span>
                      </div>
                    </div>
                    <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-brand-orange rounded-full transition-all duration-500"
                        style={{ width: `${reason.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* tomiwa: Simplified Report Preview Modal */}
        {/* johnson: ExistingCode - Modal shown when user generates a report */}
        {showReportModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
              
              {/* tomiwa: Modal Header with close button */}
              <div className="bg-brand-aqua px-6 py-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <DocumentTextIcon className="w-6 h-6 text-white" />
                  <h3 className="text-xl font-display font-bold text-white">
                    Report Preview
                  </h3>
                </div>
                <button
                  onClick={() => setShowReportModal(false)}
                  className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              {/* tomiwa: Modal Content - Report summary and key metrics */}
              {/* johnson: ExistingCode - Scrollable content area */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-6">
                  
                  {/* tomiwa: Report configuration summary */}
                  <div className="bg-neutral-50 rounded-xl p-5">
                    <h4 className="font-display font-bold text-lg text-brand-black mb-4">
                      Report Configuration
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-neutral-600 mb-1">Report Type</p>
                        <p className="text-sm font-semibold text-brand-black capitalize">
                          {reportType.replace(/-/g, ' ')}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-neutral-600 mb-1">Date Range</p>
                        <p className="text-sm font-semibold text-brand-black capitalize">
                          {dateRange.replace(/-/g, ' ')}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-neutral-600 mb-1">Department</p>
                        <p className="text-sm font-semibold text-brand-black capitalize">
                          {department}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-neutral-600 mb-1">Generated On</p>
                        <p className="text-sm font-semibold text-brand-black">
                          {new Date().toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* tomiwa: Key metrics grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-brand-aqua/10 rounded-xl p-5 border border-brand-aqua/20">
                      <p className="text-sm text-neutral-600 mb-2">Total Candidates</p>
                      <p className="text-3xl font-display font-bold text-brand-aqua">
                        1,247
                      </p>
                    </div>
                    <div className="bg-brand-orange/10 rounded-xl p-5 border border-brand-orange/20">
                      <p className="text-sm text-neutral-600 mb-2">Interviews</p>
                      <p className="text-3xl font-display font-bold text-brand-orange">
                        342
                      </p>
                    </div>
                    <div className="bg-brand-yellow/10 rounded-xl p-5 border border-brand-yellow/20">
                      <p className="text-sm text-neutral-600 mb-2">Avg Time-to-Hire</p>
                      <p className="text-3xl font-display font-bold text-brand-yellow">
                        18d
                      </p>
                    </div>
                    <div className="bg-emerald-500/10 rounded-xl p-5 border border-emerald-500/20">
                      <p className="text-sm text-neutral-600 mb-2">Total Hires</p>
                      <p className="text-3xl font-display font-bold text-emerald-600">
                        89
                      </p>
                    </div>
                  </div>

                  {/* tomiwa: Detailed breakdown */}
                  <div className="bg-neutral-50 rounded-xl p-5">
                    <h4 className="font-display font-bold text-base text-brand-black mb-4">
                      Hiring Pipeline Breakdown
                    </h4>
                    <div className="space-y-3">
                      {funnelData.map((stage, index) => (
                        <div key={index} className="flex justify-between items-center py-2 border-b border-neutral-200 last:border-0">
                          <span className="text-sm text-neutral-700">{stage.stage}</span>
                          <span className="font-semibold text-brand-black">
                            {stage.count.toLocaleString()} ({stage.percentage}%)
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* tomiwa: Modal Footer with export buttons */}
              {/* johnson: ExistingCode - Action buttons for exporting reports */}
              <div className="border-t border-neutral-200 px-6 py-4 flex flex-col sm:flex-row gap-3 bg-neutral-50">
                <button
                  onClick={handleExportPDF}
                  className="flex-1 bg-brand-orange hover:bg-brand-orange/90 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 shadow-md"
                >
                  <ArrowDownTrayIcon className="w-5 h-5" />
                  Download PDF
                </button>
                <button
                  onClick={handleExportCSV}
                  className="flex-1 bg-brand-aqua hover:bg-brand-aqua/90 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 shadow-md"
                >
                  <ArrowDownTrayIcon className="w-5 h-5" />
                  Export CSV
                </button>
              </div>
            </div>
          </div>
        )}

        {/* tomiwa: Toast Notification - Shows after export actions */}
        {showToast && (
          <div className="fixed bottom-6 right-6 bg-brand-black text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-slide-up z-50">
            <CheckCircleIcon className="w-6 h-6 text-emerald-400" />
            <span className="font-medium">{toastMessage}</span>
          </div>
        )}
      </div>
    </EmployerDashboardLayout>
  );
}
