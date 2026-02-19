/**
 * File: src/app/coach/dashboard/earnings/page.js
 * 
 * tomiwa: Coach Earnings Dashboard Page
 * Comprehensive financial overview for coaches including earnings, payouts, and analytics
 * 
 * Features:
 * - Monthly/yearly earnings overview
 * - Earnings breakdown by session type
 * - Payout history and status
 * - Performance metrics
 * - Downloadable reports
 */

'use client';

import React, { useState } from 'react';
import CoachDashboardLayout from '@/components/layouts/CoachDashboardLayout.jsx';
import DashboardCard from '@/components/ui/DashboardCard.js';
import {
  CurrencyDollarIcon,
  CalendarDaysIcon,
  TrendingUpIcon,
  BanknotesIcon,
  ChartBarIcon,
  ArrowDownTrayIcon,
  ClockIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

// tomiwa: Enhanced mock earnings data with detailed breakdowns
const earningsData = {
  overview: {
    thisMonth: 2450,
    lastMonth: 2180,
    thisYear: 28650,
    lastYear: 24300,
    totalEarnings: 45780,
    pendingPayouts: 890,
    platformFee: 0.15, // 15% platform fee
    averageSessionRate: 136,
    totalSessions: 158,
  },
  monthlyBreakdown: [
    { month: 'Jan 2026', amount: 2180, sessions: 16, grossAmount: 2565, platformFee: 385 },
    { month: 'Feb 2026', amount: 2450, sessions: 18, grossAmount: 2882, platformFee: 432 },
    { month: 'Mar 2026', amount: 0, sessions: 0, grossAmount: 0, platformFee: 0 }, // Current month
  ],
  sessionTypes: [
    { 
      type: 'Career Strategy', 
      sessions: 45, 
      earnings: 5400, 
      avgRate: 120, 
      grossEarnings: 6353,
      platformFee: 953,
      growth: '+12%'
    },
    { 
      type: 'Interview Preparation', 
      sessions: 38, 
      earnings: 3420, 
      avgRate: 90, 
      grossEarnings: 4024,
      platformFee: 604,
      growth: '+8%'
    },
    { 
      type: 'Resume Review', 
      sessions: 32, 
      earnings: 1920, 
      avgRate: 60, 
      grossEarnings: 2259,
      platformFee: 339,
      growth: '+5%'
    },
    { 
      type: 'Salary Negotiation', 
      sessions: 28, 
      earnings: 3360, 
      avgRate: 120, 
      grossEarnings: 3953,
      platformFee: 593,
      growth: '+15%'
    },
    { 
      type: 'Career Transition', 
      sessions: 15, 
      earnings: 2700, 
      avgRate: 180, 
      grossEarnings: 3176,
      platformFee: 476,
      growth: '+22%'
    },
  ],
  payoutHistory: [
    { 
      id: 1, 
      date: 'Feb 15, 2026', 
      amount: 2180, 
      grossAmount: 2565,
      platformFee: 385,
      status: 'completed', 
      method: 'Bank Transfer',
      transactionId: 'TXN-2026-02-15-001'
    },
    { 
      id: 2, 
      date: 'Jan 15, 2026', 
      amount: 1950, 
      grossAmount: 2294,
      platformFee: 344,
      status: 'completed', 
      method: 'Bank Transfer',
      transactionId: 'TXN-2026-01-15-001'
    },
    { 
      id: 3, 
      date: 'Dec 15, 2025', 
      amount: 2340, 
      grossAmount: 2753,
      platformFee: 413,
      status: 'completed', 
      method: 'Bank Transfer',
      transactionId: 'TXN-2025-12-15-001'
    },
    { 
      id: 4, 
      date: 'Mar 15, 2026', 
      amount: 890, 
      grossAmount: 1047,
      platformFee: 157,
      status: 'pending', 
      method: 'Bank Transfer',
      transactionId: 'TXN-2026-03-15-001'
    },
  ],
  recentSessions: [
    {
      id: 1,
      candidateName: 'Alex Thompson',
      sessionType: 'Career Strategy',
      date: 'Feb 16, 2026',
      duration: 60,
      grossAmount: 120,
      platformFee: 18,
      netAmount: 102,
      status: 'completed'
    },
    {
      id: 2,
      candidateName: 'Maria Rodriguez',
      sessionType: 'Interview Preparation',
      date: 'Feb 15, 2026',
      duration: 45,
      grossAmount: 90,
      platformFee: 13.50,
      netAmount: 76.50,
      status: 'completed'
    },
    {
      id: 3,
      candidateName: 'David Chen',
      sessionType: 'Resume Review',
      date: 'Feb 14, 2026',
      duration: 30,
      grossAmount: 60,
      platformFee: 9,
      netAmount: 51,
      status: 'completed'
    },
    {
      id: 4,
      candidateName: 'Jennifer Kim',
      sessionType: 'Salary Negotiation',
      date: 'Feb 13, 2026',
      duration: 60,
      grossAmount: 120,
      platformFee: 18,
      netAmount: 102,
      status: 'completed'
    },
    {
      id: 5,
      candidateName: 'Michael Brown',
      sessionType: 'Career Transition',
      date: 'Feb 12, 2026',
      duration: 90,
      grossAmount: 180,
      platformFee: 27,
      netAmount: 153,
      status: 'completed'
    },
  ]
};

export default function CoachEarningsPage() {
  // tomiwa: State for time period filter
  const [timePeriod, setTimePeriod] = useState('thisMonth');
  
  // tomiwa: State for downloading reports
  const [isDownloading, setIsDownloading] = useState(false);

  // tomiwa: Handle download report
  const handleDownloadReport = async () => {
    setIsDownloading(true);
    
    // Simulate download
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In a real app, this would trigger a file download
    console.log('Downloading earnings report...');
    
    setIsDownloading(false);
  };

  // tomiwa: Calculate growth percentage
  const calculateGrowth = (current, previous) => {
    if (previous === 0) return 0;
    return ((current - previous) / previous * 100).toFixed(1);
  };

  return (
    <CoachDashboardLayout>
      {/* tomiwa: Header */}
      <div className="bg-gradient-to-r from-brand-aqua to-[#0C5B65]">
        <div className="px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20 py-10 sm:py-12 md:py-14 lg:py-16">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6">
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-2">
                Earnings
              </h1>
              <p className="text-[#D9E5E6] text-base sm:text-lg md:text-lg lg:text-xl leading-relaxed max-w-2xl">
                Track your coaching income, view payout history, and analyze your financial performance
              </p>
            </div>
            <button
              onClick={handleDownloadReport}
              disabled={isDownloading}
              className="bg-brand-orange hover:bg-brand-orange/90 text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 shadow-lg hover:scale-105 whitespace-nowrap disabled:opacity-50"
            >
              {isDownloading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <ArrowDownTrayIcon className="w-5 h-5" />
                  Download Report
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-8 py-12">
        {/* tomiwa: Earnings Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <DashboardCard
            icon={CurrencyDollarIcon}
            title="This Month"
            value={`$${earningsData.overview.thisMonth.toLocaleString()}`}
            subtitle={
              <span className="text-emerald-600">
                +{calculateGrowth(earningsData.overview.thisMonth, earningsData.overview.lastMonth)}% from last month
              </span>
            }
            iconColor="text-brand-aqua"
            className="hover:scale-105 transition-transform duration-300"
          />
          <DashboardCard
            icon={TrendingUpIcon}
            title="This Year"
            value={`$${earningsData.overview.thisYear.toLocaleString()}`}
            subtitle={
              <span className="text-emerald-600">
                +{calculateGrowth(earningsData.overview.thisYear, earningsData.overview.lastYear)}% from last year
              </span>
            }
            iconColor="text-emerald-500"
            className="hover:scale-105 transition-transform duration-300"
          />
          <DashboardCard
            icon={BanknotesIcon}
            title="Total Earnings"
            value={`$${earningsData.overview.totalEarnings.toLocaleString()}`}
            subtitle="All time"
            iconColor="text-brand-orange"
            className="hover:scale-105 transition-transform duration-300"
          />
          <DashboardCard
            icon={ClockIcon}
            title="Pending Payouts"
            value={`$${earningsData.overview.pendingPayouts.toLocaleString()}`}
            subtitle="Next payout: Mar 15"
            iconColor="text-brand-yellow"
            className="hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* tomiwa: Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* tomiwa: Monthly Breakdown - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* tomiwa: Monthly Earnings Chart with Gross/Net Breakdown */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <ChartBarIcon className="w-7 h-7 text-brand-aqua" />
                  <h2 className="text-2xl font-display font-bold text-brand-black">Monthly Breakdown</h2>
                </div>
                <select
                  value={timePeriod}
                  onChange={(e) => setTimePeriod(e.target.value)}
                  className="px-4 py-2 border border-neutral-200 rounded-lg focus:border-brand-aqua focus:ring-brand-aqua/20 focus:ring-4 focus:outline-none transition-colors"
                >
                  <option value="thisMonth">This Month</option>
                  <option value="last3Months">Last 3 Months</option>
                  <option value="thisYear">This Year</option>
                </select>
              </div>

              {/* tomiwa: Enhanced bar chart with gross/net breakdown */}
              <div className="space-y-6">
                {earningsData.monthlyBreakdown.map((month, index) => (
                  <div key={month.month} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-medium text-neutral-900">{month.month}</div>
                      <div className="text-sm text-neutral-600">{month.sessions} sessions</div>
                    </div>
                    
                    {/* tomiwa: Gross earnings bar */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs text-neutral-500">
                        <span>Gross Earnings</span>
                        <span>${month.grossAmount?.toLocaleString() || '0'}</span>
                      </div>
                      <div className="flex-1 bg-neutral-100 rounded-lg h-3 relative overflow-hidden">
                        <div
                          className="h-full bg-neutral-400 rounded-lg transition-all duration-1000"
                          style={{ width: `${((month.grossAmount || 0) / 3500) * 100}%` }}
                        />
                      </div>
                    </div>

                    {/* tomiwa: Net earnings bar */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs text-neutral-500">
                        <span>Net Earnings (After 15% Platform Fee)</span>
                        <span>${month.amount.toLocaleString()}</span>
                      </div>
                      <div className="flex-1 bg-neutral-100 rounded-lg h-4 relative overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-brand-aqua to-brand-orange rounded-lg transition-all duration-1000 flex items-center justify-end pr-2"
                          style={{ width: `${(month.amount / 3500) * 100}%` }}
                        >
                          {month.amount > 0 && (
                            <span className="text-white font-semibold text-xs">
                              ${month.amount.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* tomiwa: Platform fee info */}
                    {month.platformFee > 0 && (
                      <div className="text-xs text-neutral-500 text-right">
                        Platform fee: ${month.platformFee}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* tomiwa: Enhanced Session Type Breakdown */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center gap-3 mb-8">
                <CalendarDaysIcon className="w-7 h-7 text-brand-aqua" />
                <h2 className="text-2xl font-display font-bold text-brand-black">Earnings by Session Type</h2>
              </div>

              <div className="space-y-4">
                {earningsData.sessionTypes.map((sessionType) => (
                  <div key={sessionType.type} className="border border-neutral-200 rounded-xl p-6 hover:border-brand-aqua/30 transition-colors">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg text-neutral-900 mb-1">{sessionType.type}</h3>
                        <span className={`text-sm font-medium ${
                          sessionType.growth.startsWith('+') ? 'text-emerald-600' : 'text-red-500'
                        }`}>
                          {sessionType.growth} vs last period
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-brand-aqua">
                          ${sessionType.earnings.toLocaleString()}
                        </div>
                        <div className="text-sm text-neutral-500">
                          Net earnings
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-neutral-600">Sessions:</span>
                        <span className="ml-2 font-medium text-neutral-900">{sessionType.sessions}</span>
                      </div>
                      <div>
                        <span className="text-neutral-600">Avg Rate:</span>
                        <span className="ml-2 font-medium text-neutral-900">${sessionType.avgRate}</span>
                      </div>
                      <div>
                        <span className="text-neutral-600">Gross:</span>
                        <span className="ml-2 font-medium text-neutral-900">${sessionType.grossEarnings.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-neutral-600">Platform Fee:</span>
                        <span className="ml-2 font-medium text-red-600">${sessionType.platformFee}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* tomiwa: Recent Session Earnings */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center gap-3 mb-8">
                <CurrencyDollarIcon className="w-7 h-7 text-brand-aqua" />
                <h2 className="text-2xl font-display font-bold text-brand-black">Recent Session Earnings</h2>
              </div>

              <div className="space-y-3">
                {earningsData.recentSessions.map((session) => (
                  <div key={session.id} className="flex items-center justify-between p-4 border border-neutral-200 rounded-xl hover:border-brand-aqua/30 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-semibold text-neutral-900">{session.candidateName}</h4>
                        <span className="px-2 py-1 bg-brand-aqua/10 text-brand-aqua text-xs rounded-full font-medium">
                          {session.sessionType}
                        </span>
                      </div>
                      <div className="text-sm text-neutral-600">
                        {session.date} • {session.duration} minutes
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="font-bold text-brand-aqua">
                        ${session.netAmount.toFixed(2)}
                      </div>
                      <div className="text-xs text-neutral-500">
                        Gross: ${session.grossAmount} | Fee: ${session.platformFee}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* tomiwa: Sidebar */}
          <div className="space-y-8">
            {/* tomiwa: Enhanced Payout History with Details */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <BanknotesIcon className="w-7 h-7 text-brand-aqua" />
                <h2 className="text-xl font-display font-bold text-brand-black">Recent Payouts</h2>
              </div>
              
              <div className="space-y-4">
                {earningsData.payoutHistory.slice(0, 4).map((payout) => (
                  <div key={payout.id} className="p-4 border border-neutral-200 rounded-xl hover:border-brand-aqua/30 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-semibold text-neutral-900">
                        ${payout.amount.toLocaleString()}
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        payout.status === 'completed'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-brand-yellow/20 text-brand-yellow'
                      }`}>
                        {payout.status === 'completed' ? 'Completed' : 'Pending'}
                      </span>
                    </div>
                    
                    <div className="space-y-1 text-xs text-neutral-600">
                      <div className="flex justify-between">
                        <span>Date:</span>
                        <span>{payout.date}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Gross:</span>
                        <span>${payout.grossAmount?.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Platform Fee:</span>
                        <span className="text-red-600">${payout.platformFee}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Method:</span>
                        <span>{payout.method}</span>
                      </div>
                      {payout.transactionId && (
                        <div className="flex justify-between">
                          <span>Transaction ID:</span>
                          <span className="font-mono">{payout.transactionId}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* tomiwa: Platform Fee Structure */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <CurrencyDollarIcon className="w-7 h-7 text-brand-aqua" />
                <h2 className="text-xl font-display font-bold text-brand-black">Fee Structure</h2>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-neutral-50 rounded-xl">
                  <div className="text-2xl font-bold text-brand-aqua mb-2">15%</div>
                  <div className="text-sm text-neutral-600 mb-3">Platform Fee</div>
                  <div className="text-xs text-neutral-500">
                    Covers payment processing, platform maintenance, and customer support
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-neutral-600">You keep:</span>
                    <span className="font-semibold text-emerald-600">85%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Platform fee:</span>
                    <span className="font-semibold text-red-600">15%</span>
                  </div>
                </div>
                
                <div className="pt-3 border-t border-neutral-200">
                  <div className="text-xs text-neutral-500">
                    Example: $100 session = $85 to you + $15 platform fee
                  </div>
                </div>
              </div>
            </div>

            {/* tomiwa: Enhanced Performance Metrics */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <TrendingUpIcon className="w-7 h-7 text-brand-aqua" />
                <h2 className="text-xl font-display font-bold text-brand-black">Performance</h2>
              </div>
              
              <div className="space-y-6">
                <div className="text-center p-4 bg-brand-aqua/5 rounded-xl">
                  <div className="text-2xl font-bold text-brand-aqua mb-1">
                    ${earningsData.overview.averageSessionRate}
                  </div>
                  <div className="text-sm text-neutral-600">Average Session Rate</div>
                </div>
                
                <div className="text-center p-4 bg-brand-orange/5 rounded-xl">
                  <div className="text-2xl font-bold text-brand-orange mb-1">
                    {earningsData.overview.totalSessions}
                  </div>
                  <div className="text-sm text-neutral-600">Total Sessions Completed</div>
                </div>
                
                <div className="text-center p-4 bg-emerald-50 rounded-xl">
                  <div className="text-2xl font-bold text-emerald-600 mb-1">+12.4%</div>
                  <div className="text-sm text-neutral-600">Growth vs Last Month</div>
                </div>
                
                <div className="text-center p-4 bg-brand-yellow/5 rounded-xl">
                  <div className="text-2xl font-bold text-brand-yellow mb-1">4.9</div>
                  <div className="text-sm text-neutral-600">Average Rating</div>
                </div>
              </div>
            </div>

            {/* tomiwa: Enhanced Next Payout Info */}
            <div className="bg-gradient-to-br from-brand-aqua/10 to-brand-orange/10 border border-brand-aqua/20 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircleIcon className="w-6 h-6 text-brand-aqua" />
                <h3 className="font-semibold text-brand-black">Next Payout</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Net Amount:</span>
                  <span className="font-semibold text-brand-black">$890</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Gross Amount:</span>
                  <span className="font-semibold text-neutral-700">$1,047</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Platform Fee:</span>
                  <span className="font-semibold text-red-600">$157</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Date:</span>
                  <span className="font-semibold text-brand-black">Mar 15, 2026</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Method:</span>
                  <span className="font-semibold text-brand-black">Bank Transfer</span>
                </div>
              </div>
              
              <div className="mt-4 pt-3 border-t border-brand-aqua/20">
                <div className="text-xs text-neutral-600">
                  Payouts are processed on the 15th of each month for the previous month's earnings.
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </CoachDashboardLayout>
  );
}