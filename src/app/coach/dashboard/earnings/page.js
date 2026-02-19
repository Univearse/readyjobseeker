/**
 * File: src/app/coach/dashboard/earnings/page.js
 *
 * tomiwa: Coach Earnings & Payment Management Dashboard
 * Full-featured page for coaches to track earnings, view payout history,
 * manage payment methods, and view transaction details.
 *
 * Layout Structure:
 * ================
 * HERO BANNER: Aqua-to-teal gradient (#36D0D8 → #0C5B65)
 *
 * SECTION 1: Stats Cards (4-card grid)
 *  - This Month, This Year, Total Earnings, Pending Payout
 *
 * SECTION 2: Tab Navigation
 *  - Overview | Payout History | Payment Methods | Transactions
 *
 * SECTION 3 (Overview Tab):
 *  - Monthly Earnings Chart (CSS bar chart)
 *  - Earnings Breakdown by Service Type
 *  - Next Payout Info Card
 *
 * SECTION 4 (Payout History Tab):
 *  - Full payout history table with status badges
 *
 * SECTION 5 (Payment Methods Tab):
 *  - Bank account and card details
 *  - Add new payment method
 *
 * SECTION 6 (Transactions Tab):
 *  - Detailed list of all session transactions
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import CoachDashboardLayout from '@/components/layouts/CoachDashboardLayout.jsx';
import DashboardCard from '@/components/ui/DashboardCard.js';
import {
  CurrencyDollarIcon,
  BanknotesIcon,
  CreditCardIcon,
  ArrowTrendingUpIcon,
  // updated: Removed ArrowDownTrayIcon — no longer needed after replacing "Request Payout" button
  ClockIcon,
  CheckCircleIcon,
  CalendarDaysIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  PlusIcon,
  TrashIcon,
  PencilIcon,
  XMarkIcon,
  EyeIcon,
  EyeSlashIcon,
  BuildingLibraryIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  DocumentArrowDownIcon,
} from '@heroicons/react/24/outline';
import {
  CheckCircleIcon as CheckCircleSolidIcon,
  StarIcon as StarSolidIcon,
} from '@heroicons/react/24/solid';

// tomiwa: Mock data — Monthly earnings for the bar chart (last 12 months)
const monthlyEarnings = [
  { month: 'Mar', amount: 520000, sessions: 11 },
  { month: 'Apr', amount: 680000, sessions: 14 },
  { month: 'May', amount: 750000, sessions: 16 },
  { month: 'Jun', amount: 620000, sessions: 13 },
  { month: 'Jul', amount: 890000, sessions: 18 },
  { month: 'Aug', amount: 920000, sessions: 19 },
  { month: 'Sep', amount: 840000, sessions: 17 },
  { month: 'Oct', amount: 1050000, sessions: 21 },
  { month: 'Nov', amount: 970000, sessions: 20 },
  { month: 'Dec', amount: 1100000, sessions: 22 },
  { month: 'Jan', amount: 880000, sessions: 18 },
  { month: 'Feb', amount: 980000, sessions: 19 },
];

// tomiwa: Mock data — Earnings breakdown by service type
const earningsBreakdown = [
  { service: 'Career Strategy', sessions: 42, amount: 2100000, percentage: 35, color: 'bg-brand-aqua' },
  { service: 'Interview Prep', sessions: 38, amount: 1900000, percentage: 32, color: 'bg-brand-orange' },
  { service: 'Resume Review', sessions: 28, amount: 1120000, percentage: 19, color: 'bg-brand-yellow' },
  { service: 'LinkedIn Optimization', sessions: 15, amount: 525000, percentage: 9, color: 'bg-primary-700' },
  { service: 'Salary Negotiation', sessions: 8, amount: 360000, percentage: 5, color: 'bg-emerald-500' },
];

// tomiwa: Mock data — Payout history with statuses
const payoutHistory = [
  { id: 'PAY-2026-012', date: 'Feb 15, 2026', amount: 485000, status: 'completed', method: 'Bank Transfer', bank: 'GTBank ****4521', processingTime: '2 business days' },
  { id: 'PAY-2026-011', date: 'Feb 1, 2026', amount: 495000, status: 'completed', method: 'Bank Transfer', bank: 'GTBank ****4521', processingTime: '2 business days' },
  { id: 'PAY-2026-010', date: 'Jan 15, 2026', amount: 440000, status: 'completed', method: 'Bank Transfer', bank: 'GTBank ****4521', processingTime: '2 business days' },
  { id: 'PAY-2026-009', date: 'Jan 1, 2026', amount: 440000, status: 'completed', method: 'Bank Transfer', bank: 'GTBank ****4521', processingTime: '2 business days' },
  { id: 'PAY-2025-008', date: 'Dec 15, 2025', amount: 550000, status: 'completed', method: 'Bank Transfer', bank: 'GTBank ****4521', processingTime: '2 business days' },
  { id: 'PAY-2025-007', date: 'Dec 1, 2025', amount: 550000, status: 'completed', method: 'Bank Transfer', bank: 'GTBank ****4521', processingTime: '3 business days' },
  { id: 'PAY-2025-006', date: 'Nov 15, 2025', amount: 485000, status: 'completed', method: 'Bank Transfer', bank: 'GTBank ****4521', processingTime: '2 business days' },
  { id: 'PAY-2025-005', date: 'Nov 1, 2025', amount: 485000, status: 'completed', method: 'Bank Transfer', bank: 'GTBank ****4521', processingTime: '2 business days' },
];

// tomiwa: Mock data — Payment methods (globally standard bank account format)
// updated: Redesigned to follow international bank account standards
// with country, currency, IBAN/account number, SWIFT/BIC, and routing info
const paymentMethods = [
  {
    id: 1,
    type: 'bank',
    country: 'Nigeria',
    countryCode: 'NG',
    currency: 'NGN',
    bankName: 'Guaranty Trust Bank',
    accountNumber: '****4521',
    fullAccountNumber: '0123454521',
    accountHolderName: 'Sarah Johnson',
    swiftCode: 'GTBINGLA',
    routingNumber: null,
    sortCode: null,
    iban: null,
    accountType: 'Savings',
    isPrimary: true,
    icon: BuildingLibraryIcon,
    addedDate: 'Jan 15, 2026',
    verified: true,
  },
  {
    id: 2,
    type: 'bank',
    country: 'United States',
    countryCode: 'US',
    currency: 'USD',
    bankName: 'Chase Bank',
    accountNumber: '****9087',
    fullAccountNumber: '482019087',
    accountHolderName: 'Sarah Johnson',
    swiftCode: 'CHASUS33',
    routingNumber: '021000021',
    sortCode: null,
    iban: null,
    accountType: 'Checking',
    isPrimary: false,
    icon: BuildingLibraryIcon,
    addedDate: 'Feb 2, 2026',
    verified: true,
  },
];

// tomiwa: Mock data — Recent transactions (individual sessions)
const transactions = [
  { id: 'TXN-0045', date: 'Feb 18, 2026', candidate: 'Alex Thompson', service: 'Career Strategy', method: 'Video', amount: 50000, fee: 5000, net: 45000, status: 'completed' },
  { id: 'TXN-0044', date: 'Feb 17, 2026', candidate: 'Maria Rodriguez', service: 'Interview Prep', method: 'Video', amount: 50000, fee: 5000, net: 45000, status: 'completed' },
  { id: 'TXN-0043', date: 'Feb 16, 2026', candidate: 'David Chen', service: 'Resume Review', method: 'Voice', amount: 35000, fee: 3500, net: 31500, status: 'completed' },
  { id: 'TXN-0042', date: 'Feb 15, 2026', candidate: 'Jennifer Kim', service: 'Career Strategy', method: 'Video', amount: 50000, fee: 5000, net: 45000, status: 'completed' },
  { id: 'TXN-0041', date: 'Feb 14, 2026', candidate: 'Michael Brown', service: 'LinkedIn Optimization', method: 'Chat', amount: 35000, fee: 3500, net: 31500, status: 'completed' },
  { id: 'TXN-0040', date: 'Feb 13, 2026', candidate: 'Lisa Wang', service: 'Interview Prep', method: 'Video', amount: 50000, fee: 5000, net: 45000, status: 'completed' },
  { id: 'TXN-0039', date: 'Feb 12, 2026', candidate: 'Robert Johnson', service: 'Salary Negotiation', method: 'Video', amount: 60000, fee: 6000, net: 54000, status: 'completed' },
  { id: 'TXN-0038', date: 'Feb 11, 2026', candidate: 'Sarah Miller', service: 'Resume Review', method: 'Voice', amount: 35000, fee: 3500, net: 31500, status: 'completed' },
  { id: 'TXN-0037', date: 'Feb 10, 2026', candidate: 'James Wilson', service: 'Career Strategy', method: 'Video', amount: 50000, fee: 5000, net: 45000, status: 'pending' },
  { id: 'TXN-0036', date: 'Feb 9, 2026', candidate: 'Emily Davis', service: 'Interview Prep', method: 'Video', amount: 50000, fee: 5000, net: 45000, status: 'completed' },
];

export default function CoachEarningsPage() {
  // tomiwa: State for active tab navigation
  const [activeTab, setActiveTab] = useState('overview');

  // tomiwa: State for time period filter on overview
  const [timePeriod, setTimePeriod] = useState('thisMonth');

  // tomiwa: State for showing/hiding full account numbers
  const [showAccountNumber, setShowAccountNumber] = useState({});

  // tomiwa: State for showing add payment method modal
  const [showAddPaymentModal, setShowAddPaymentModal] = useState(false);

  // tomiwa: State for transaction search
  const [searchQuery, setSearchQuery] = useState('');

  // tomiwa: State for transaction filter
  const [statusFilter, setStatusFilter] = useState('all');

  // tomiwa: Toggle account number visibility for a specific payment method
  const toggleAccountVisibility = (id) => {
    setShowAccountNumber((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // tomiwa: Get the max earnings value for the bar chart scale
  const maxEarning = Math.max(...monthlyEarnings.map((m) => m.amount));

  // tomiwa: Filter transactions based on search and status
  const filteredTransactions = transactions.filter((txn) => {
    const matchesSearch =
      txn.candidate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || txn.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // tomiwa: Tab items configuration
  const tabs = [
    { id: 'overview', label: 'Overview', icon: ChartIcon },
    { id: 'payouts', label: 'Payout History', icon: BanknotesIcon },
    { id: 'methods', label: 'Payment Methods', icon: CreditCardIcon },
    { id: 'transactions', label: 'Transactions', icon: ArrowPathIcon },
  ];

  return (
    <CoachDashboardLayout>
      {/* tomiwa: Hero Banner — matches coach dashboard gradient */}
      <div className="bg-gradient-to-r from-brand-aqua to-[#0C5B65]">
        <div className="px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20 py-10 sm:py-12 md:py-14 lg:py-16">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6">
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-2">
                Earnings & Payments
              </h1>
              {/* updated: Subtitle now reflects the dual payment model —
                 direct bank transfers from students + platform subscription payouts */}
              <p className="text-[#D9E5E6] text-base sm:text-lg md:text-lg lg:text-xl leading-relaxed max-w-2xl">
                Track your coaching income from direct payments and platform subscriptions, view payout history, and manage your payment details
              </p>
            </div>
            {/* updated: Changed from "Request Payout" to "Update Payment Details"
               — Students pay coaches directly via bank transfer or through the
                 platform coaching subscription addon, so manual payout requests
                 don't apply. This button now navigates to the Payment Methods tab
                 so coaches can manage their bank account details. */}
            <button
              onClick={() => setActiveTab('methods')}
              className="bg-brand-orange hover:bg-brand-orange/90 text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 shadow-lg hover:scale-105 whitespace-nowrap"
            >
              <CreditCardIcon className="w-5 h-5" />
              Update Payment Details
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-8 py-8 sm:py-10 md:py-12">
        {/* ============================================= */}
        {/* SECTION 1: Stats Cards Grid                   */}
        {/* ============================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-10">
          {/* tomiwa: This Month earnings card */}
          <DashboardCard
            icon={CurrencyDollarIcon}
            title="This Month"
            value="₦980,000"
            subtitle={
              <span className="text-emerald-600 font-medium">
                ↑ 11.4% from last month
              </span>
            }
            iconColor="text-brand-aqua"
            className="hover:border-brand-aqua/30 transition-all duration-300 border border-neutral-100 shadow-sm"
          />

          {/* tomiwa: This Year cumulative earnings card */}
          <DashboardCard
            icon={ArrowTrendingUpIcon}
            title="This Year"
            value="₦1,860,000"
            subtitle={
              <span className="text-emerald-600 font-medium">
                ↑ 24.3% from last year
              </span>
            }
            iconColor="text-emerald-500"
            className="hover:border-emerald-200 transition-all duration-300 border border-neutral-100 shadow-sm"
          />

          {/* tomiwa: All time total earnings card */}
          <DashboardCard
            icon={BanknotesIcon}
            title="Total Earnings"
            value="₦10,005,000"
            subtitle="All time"
            iconColor="text-brand-orange"
            className="hover:border-brand-orange/30 transition-all duration-300 border border-neutral-100 shadow-sm"
          />

          {/* updated: Clarified this is platform subscription earnings pending payout —
             Direct bank transfer payments from students are already received by the coach */}
          <DashboardCard
            icon={ClockIcon}
            title="Platform Payout"
            value="₦495,000"
            subtitle="Via subscriptions · Mar 1, 2026"
            iconColor="text-brand-yellow"
            className="hover:border-brand-yellow/30 transition-all duration-300 border border-neutral-100 shadow-sm"
          />
        </div>

        {/* ============================================= */}
        {/* SECTION 2: Tab Navigation                     */}
        {/* ============================================= */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-100 mb-8">
          {/* tomiwa: Tab bar — scrollable on mobile */}
          <div className="flex overflow-x-auto border-b border-neutral-100">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 sm:px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-brand-aqua text-brand-aqua'
                    : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* ============================================= */}
          {/* TAB CONTENT                                   */}
          {/* ============================================= */}
          <div className="p-4 sm:p-6 md:p-8">

            {/* ========================================= */}
            {/* OVERVIEW TAB                              */}
            {/* ========================================= */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* tomiwa: Time period filter for the overview */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <h2 className="text-xl sm:text-2xl font-display font-bold text-brand-black">
                    Earnings Overview
                  </h2>
                  <select
                    value={timePeriod}
                    onChange={(e) => setTimePeriod(e.target.value)}
                    className="px-4 py-2 border border-neutral-200 rounded-xl text-sm focus:border-brand-aqua focus:ring-brand-aqua/20 focus:ring-4 focus:outline-none transition-colors bg-white"
                  >
                    <option value="thisMonth">This Month</option>
                    <option value="last3Months">Last 3 Months</option>
                    <option value="last6Months">Last 6 Months</option>
                    <option value="thisYear">This Year</option>
                    <option value="allTime">All Time</option>
                  </select>
                </div>

                {/* tomiwa: Monthly Earnings Bar Chart (pure CSS) */}
                <div className="bg-neutral-50 rounded-xl border border-neutral-100 p-4 sm:p-6">
                  <h3 className="text-base font-semibold text-brand-black mb-1">
                    Monthly Earnings
                  </h3>
                  <p className="text-sm text-neutral-500 mb-6">Last 12 months performance</p>

                  {/* tomiwa: Bar chart container */}
                  <div className="flex items-end gap-1.5 sm:gap-2 md:gap-3 h-48 sm:h-56 md:h-64">
                    {monthlyEarnings.map((item, index) => {
                      const heightPercent = (item.amount / maxEarning) * 100;
                      const isCurrentMonth = index === monthlyEarnings.length - 1;

                      return (
                        <div key={item.month} className="flex-1 flex flex-col items-center gap-2 group">
                          {/* tomiwa: Tooltip on hover */}
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity text-center pointer-events-none">
                            <div className="text-xs font-semibold text-brand-black">
                              ₦{(item.amount / 1000).toFixed(0)}k
                            </div>
                            <div className="text-[10px] text-neutral-500">
                              {item.sessions} sessions
                            </div>
                          </div>

                          {/* tomiwa: Bar — current month gets a different color */}
                          <div
                            className={`w-full rounded-t-md transition-all duration-500 cursor-pointer ${
                              isCurrentMonth
                                ? 'bg-gradient-to-t from-brand-orange to-brand-orange/70 shadow-md'
                                : 'bg-gradient-to-t from-brand-aqua to-brand-aqua/60 group-hover:from-brand-aqua group-hover:to-brand-aqua/80'
                            }`}
                            style={{ height: `${heightPercent}%` }}
                          />

                          {/* tomiwa: Month label */}
                          <span
                            className={`text-[10px] sm:text-xs font-medium ${
                              isCurrentMonth ? 'text-brand-orange' : 'text-neutral-500'
                            }`}
                          >
                            {item.month}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* tomiwa: Two-column layout — Breakdown + Next Payout */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                  {/* tomiwa: Earnings Breakdown by Service */}
                  <div className="lg:col-span-3 bg-neutral-50 rounded-xl border border-neutral-100 p-4 sm:p-6">
                    <h3 className="text-base font-semibold text-brand-black mb-1">
                      Earnings by Service
                    </h3>
                    <p className="text-sm text-neutral-500 mb-6">All-time breakdown</p>

                    <div className="space-y-4">
                      {earningsBreakdown.map((item) => (
                        <div key={item.service}>
                          <div className="flex items-center justify-between text-sm mb-1.5">
                            <div className="flex items-center gap-2">
                              <div className={`w-3 h-3 rounded-full ${item.color}`} />
                              <span className="font-medium text-neutral-800">{item.service}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-neutral-500 text-xs hidden sm:inline">
                                {item.sessions} sessions
                              </span>
                              <span className="font-semibold text-brand-black">
                                ₦{item.amount.toLocaleString()}
                              </span>
                            </div>
                          </div>
                          {/* tomiwa: Progress bar for visual percentage */}
                          <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-700 ${item.color}`}
                              style={{ width: `${item.percentage}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* tomiwa: Next Payout Info Card */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* updated: Next Payout card — now explicitly labeled as "Platform Payout"
                       to distinguish from direct bank transfer payments that students
                       send straight to the coach's account */}
                    <div className="bg-gradient-to-br from-brand-aqua/10 to-brand-aqua/5 rounded-xl border border-brand-aqua/20 p-4 sm:p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <ClockIcon className="w-5 h-5 text-brand-aqua" />
                        <h3 className="text-base font-semibold text-brand-black">
                          Next Platform Payout
                        </h3>
                      </div>

                      <div className="text-3xl sm:text-4xl font-display font-bold text-brand-aqua mb-1">
                        ₦495,000
                      </div>
                      <p className="text-sm text-neutral-600 mb-1">
                        Scheduled for <span className="font-semibold">March 1, 2026</span>
                      </p>
                      {/* updated: Small helper text explaining that this is subscription revenue only */}
                      <p className="text-xs text-neutral-400 mb-4">
                        From coaching subscription earnings
                      </p>

                      <div className="space-y-2 pt-4 border-t border-brand-aqua/20">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-neutral-600">Destination</span>
                          <span className="font-medium text-neutral-900">GTBank ****4521</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-neutral-600">Processing</span>
                          <span className="font-medium text-neutral-900">2 business days</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-neutral-600">Sessions included</span>
                          <span className="font-medium text-neutral-900">10 sessions</span>
                        </div>
                      </div>
                    </div>

                    {/* tomiwa: Quick summary card — Platform fee info */}
                    <div className="bg-neutral-50 rounded-xl border border-neutral-100 p-4 sm:p-6">
                      <h3 className="text-base font-semibold text-brand-black mb-3">
                        Fee Summary
                      </h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-neutral-600">Gross Earnings (Feb)</span>
                          <span className="font-medium text-neutral-900">₦980,000</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-neutral-600">Platform Fee (10%)</span>
                          <span className="font-medium text-red-500">-₦98,000</span>
                        </div>
                        <div className="border-t border-neutral-200 pt-2 mt-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-semibold text-neutral-900">Net Earnings</span>
                            <span className="font-bold text-brand-aqua text-base">₦882,000</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================= */}
            {/* PAYOUT HISTORY TAB                        */}
            {/* ========================================= */}
            {activeTab === 'payouts' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <h2 className="text-xl sm:text-2xl font-display font-bold text-brand-black">
                    Payout History
                  </h2>
                  <button className="flex items-center gap-2 text-sm text-brand-aqua hover:text-brand-orange font-medium transition-colors">
                    <DocumentArrowDownIcon className="w-4 h-4" />
                    Export CSV
                  </button>
                </div>

                {/* tomiwa: Payout history table — responsive card layout on mobile */}
                <div className="space-y-3">
                  {/* tomiwa: Table header — hidden on mobile */}
                  <div className="hidden md:grid md:grid-cols-6 gap-4 px-5 py-3 bg-neutral-50 rounded-xl text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                    <span>Payout ID</span>
                    <span>Date</span>
                    <span>Amount</span>
                    <span>Method</span>
                    <span>Destination</span>
                    <span>Status</span>
                  </div>

                  {payoutHistory.map((payout) => (
                    <div
                      key={payout.id}
                      className="bg-neutral-50 hover:bg-brand-aqua/5 border border-neutral-100 hover:border-brand-aqua/20 rounded-xl p-4 md:p-5 transition-all duration-300"
                    >
                      {/* tomiwa: Desktop row layout */}
                      <div className="hidden md:grid md:grid-cols-6 gap-4 items-center">
                        <span className="text-sm font-mono text-brand-black">{payout.id}</span>
                        <span className="text-sm text-neutral-600">{payout.date}</span>
                        <span className="text-sm font-semibold text-brand-black">₦{payout.amount.toLocaleString()}</span>
                        <span className="text-sm text-neutral-600">{payout.method}</span>
                        <span className="text-sm text-neutral-600">{payout.bank}</span>
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 w-fit">
                          <CheckCircleSolidIcon className="w-3.5 h-3.5" />
                          {payout.status.charAt(0).toUpperCase() + payout.status.slice(1)}
                        </span>
                      </div>

                      {/* tomiwa: Mobile card layout */}
                      <div className="md:hidden space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-mono font-medium text-brand-black">{payout.id}</span>
                          <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                            <CheckCircleSolidIcon className="w-3 h-3" />
                            {payout.status.charAt(0).toUpperCase() + payout.status.slice(1)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-neutral-500">{payout.date}</span>
                          <span className="font-semibold text-brand-black">₦{payout.amount.toLocaleString()}</span>
                        </div>
                        <div className="text-xs text-neutral-500">
                          {payout.method} → {payout.bank}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* updated: Payout schedule info — now explains both payment channels:
                   1) Direct bank transfers from students (instant, outside platform)
                   2) Platform subscription payouts (scheduled 1st & 15th of each month) */}
                <div className="flex items-start gap-3 p-4 bg-brand-yellow/10 border border-brand-yellow/30 rounded-xl">
                  <CalendarDaysIcon className="w-5 h-5 text-brand-yellow flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-neutral-700">
                    <span className="font-semibold">How Payouts Work:</span> Earnings from
                    students who subscribe to the coaching addon are processed automatically on
                    the 1st and 15th of each month. It takes 2–3 business days for funds to
                    arrive in your bank account. Direct bank transfer payments from students are
                    received instantly in your account.
                  </div>
                </div>
              </div>
            )}

            {/* ========================================= */}
            {/* PAYMENT METHODS TAB                       */}
            {/* ========================================= */}
            {/* updated: Completely redesigned Payment Methods tab to follow
               globally accepted bank account standards — shows country, currency,
               SWIFT/BIC, IBAN or account number, routing number, and verification status */}
            {activeTab === 'methods' && (
              <div className="space-y-6">
                {/* tomiwa: Header row — title + add account button */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-display font-bold text-brand-black">
                      Bank Accounts
                    </h2>
                    <p className="text-sm text-neutral-500 mt-1">
                      Manage your bank accounts for receiving payouts worldwide
                    </p>
                  </div>
                  <button
                    onClick={() => setShowAddPaymentModal(true)}
                    className="flex items-center gap-2 bg-brand-aqua hover:bg-brand-aqua/90 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 shadow-sm"
                  >
                    <PlusIcon className="w-4 h-4" />
                    Add Bank Account
                  </button>
                </div>

                {/* tomiwa: Payment method cards — redesigned for international standard */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className={`relative bg-white rounded-xl border-2 transition-all duration-300 overflow-hidden ${
                        method.isPrimary
                          ? 'border-brand-aqua shadow-md shadow-brand-aqua/10'
                          : 'border-neutral-200 hover:border-neutral-300'
                      }`}
                    >
                      {/* tomiwa: Card header — bank name, country flag, badges */}
                      <div className={`px-5 sm:px-6 pt-5 sm:pt-6 pb-4 ${
                        method.isPrimary ? 'bg-brand-aqua/5' : 'bg-neutral-50'
                      }`}>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            {/* tomiwa: Bank icon with country code overlay */}
                            <div className={`relative w-12 h-12 rounded-xl flex items-center justify-center ${
                              method.isPrimary ? 'bg-brand-aqua/15' : 'bg-neutral-200/60'
                            }`}>
                              <method.icon className={`w-6 h-6 ${
                                method.isPrimary ? 'text-brand-aqua' : 'text-neutral-500'
                              }`} />
                              {/* tomiwa: Country code badge on the icon */}
                              <span className="absolute -bottom-1 -right-1 text-[10px] font-bold bg-white border border-neutral-200 text-brand-black px-1.5 py-0.5 rounded-md shadow-sm">
                                {method.countryCode}
                              </span>
                            </div>
                            <div>
                              <h3 className="font-semibold text-brand-black text-sm sm:text-base">
                                {method.bankName}
                              </h3>
                              <p className="text-xs text-neutral-500 mt-0.5">
                                {method.country} · {method.currency} · {method.accountType}
                              </p>
                            </div>
                          </div>

                          {/* tomiwa: Action buttons — edit and delete */}
                          <div className="flex items-center gap-1">
                            <button className="p-2 text-neutral-400 hover:text-brand-aqua hover:bg-brand-aqua/5 rounded-lg transition-colors" title="Edit account">
                              <PencilIcon className="w-4 h-4" />
                            </button>
                            {!method.isPrimary && (
                              <button className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Remove account">
                                <TrashIcon className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>

                        {/* tomiwa: Status badges row — Primary + Verified */}
                        <div className="flex items-center gap-2 mt-3">
                          {method.isPrimary && (
                            <span className="inline-flex items-center gap-1 text-xs font-semibold bg-brand-aqua text-white px-2.5 py-0.5 rounded-full">
                              <StarSolidIcon className="w-3 h-3" />
                              Primary
                            </span>
                          )}
                          {method.verified && (
                            <span className="inline-flex items-center gap-1 text-xs font-semibold bg-emerald-100 text-emerald-700 px-2.5 py-0.5 rounded-full">
                              <CheckCircleSolidIcon className="w-3 h-3" />
                              Verified
                            </span>
                          )}
                        </div>
                      </div>

                      {/* tomiwa: Account details — globally standard fields */}
                      <div className="px-5 sm:px-6 py-4 space-y-3">
                        {/* tomiwa: Account Holder Name */}
                        <div className="flex items-center justify-between">
                          <span className="text-xs uppercase tracking-wider font-semibold text-neutral-400">Account Holder</span>
                          <span className="text-sm font-medium text-neutral-900">{method.accountHolderName}</span>
                        </div>

                        {/* tomiwa: Account Number / IBAN — with show/hide toggle */}
                        <div className="flex items-center justify-between">
                          <span className="text-xs uppercase tracking-wider font-semibold text-neutral-400">
                            {method.iban ? 'IBAN' : 'Account Number'}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-mono font-medium text-neutral-900">
                              {showAccountNumber[method.id]
                                ? (method.iban || method.fullAccountNumber)
                                : method.accountNumber}
                            </span>
                            <button
                              onClick={() => toggleAccountVisibility(method.id)}
                              className="p-1 text-neutral-400 hover:text-brand-aqua transition-colors"
                              title={showAccountNumber[method.id] ? 'Hide number' : 'Show number'}
                            >
                              {showAccountNumber[method.id] ? (
                                <EyeSlashIcon className="w-4 h-4" />
                              ) : (
                                <EyeIcon className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </div>

                        {/* tomiwa: SWIFT / BIC Code */}
                        {method.swiftCode && (
                          <div className="flex items-center justify-between">
                            <span className="text-xs uppercase tracking-wider font-semibold text-neutral-400">SWIFT / BIC</span>
                            <span className="text-sm font-mono font-medium text-neutral-900">{method.swiftCode}</span>
                          </div>
                        )}

                        {/* tomiwa: Routing Number — shown for US/CA accounts */}
                        {method.routingNumber && (
                          <div className="flex items-center justify-between">
                            <span className="text-xs uppercase tracking-wider font-semibold text-neutral-400">Routing Number</span>
                            <span className="text-sm font-mono font-medium text-neutral-900">{method.routingNumber}</span>
                          </div>
                        )}

                        {/* tomiwa: Sort Code — shown for UK accounts */}
                        {method.sortCode && (
                          <div className="flex items-center justify-between">
                            <span className="text-xs uppercase tracking-wider font-semibold text-neutral-400">Sort Code</span>
                            <span className="text-sm font-mono font-medium text-neutral-900">{method.sortCode}</span>
                          </div>
                        )}

                        {/* tomiwa: Currency */}
                        <div className="flex items-center justify-between">
                          <span className="text-xs uppercase tracking-wider font-semibold text-neutral-400">Currency</span>
                          <span className="text-sm font-medium text-neutral-900">{method.currency}</span>
                        </div>
                      </div>

                      {/* tomiwa: Card footer — date added + set as primary */}
                      <div className="px-5 sm:px-6 py-3 border-t border-neutral-100 bg-neutral-50/50 flex items-center justify-between">
                        <span className="text-xs text-neutral-400">Added {method.addedDate}</span>
                        {!method.isPrimary && (
                          <button className="text-xs text-brand-aqua hover:text-brand-aqua/80 font-semibold transition-colors">
                            Set as Primary
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* tomiwa: Important info banners */}
                <div className="space-y-3">
                  {/* tomiwa: Security notice */}
                  <div className="flex items-start gap-3 p-4 bg-brand-aqua/5 border border-brand-aqua/20 rounded-xl">
                    <CheckCircleIcon className="w-5 h-5 text-brand-aqua flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-neutral-700">
                      <span className="font-semibold">Bank-Level Security:</span> All financial data is
                      encrypted with AES-256 and transmitted over TLS 1.3. We are PCI DSS compliant and
                      never store your full account details on our servers.
                    </div>
                  </div>

                  {/* tomiwa: Processing times info */}
                  <div className="flex items-start gap-3 p-4 bg-brand-yellow/10 border border-brand-yellow/30 rounded-xl">
                    <ClockIcon className="w-5 h-5 text-brand-yellow flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-neutral-700">
                      <span className="font-semibold">Processing Times:</span> Domestic transfers
                      typically arrive in 1–2 business days. International transfers may take 3–5 business
                      days depending on your bank and country. SWIFT transfers include intermediary bank fees.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================= */}
            {/* TRANSACTIONS TAB                          */}
            {/* ========================================= */}
            {activeTab === 'transactions' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <h2 className="text-xl sm:text-2xl font-display font-bold text-brand-black">
                    Transaction History
                  </h2>
                  <button className="flex items-center gap-2 text-sm text-brand-aqua hover:text-brand-orange font-medium transition-colors">
                    <DocumentArrowDownIcon className="w-4 h-4" />
                    Export CSV
                  </button>
                </div>

                {/* tomiwa: Search and filter bar */}
                <div className="flex flex-col sm:flex-row gap-3">
                  {/* tomiwa: Search input */}
                  <div className="relative flex-1">
                    <MagnifyingGlassIcon className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search by candidate, service, or ID..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border border-neutral-200 rounded-xl text-sm focus:border-brand-aqua focus:ring-brand-aqua/20 focus:ring-4 focus:outline-none transition-colors"
                    />
                  </div>

                  {/* tomiwa: Status filter dropdown */}
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-2.5 border border-neutral-200 rounded-xl text-sm focus:border-brand-aqua focus:ring-brand-aqua/20 focus:ring-4 focus:outline-none transition-colors bg-white"
                  >
                    <option value="all">All Status</option>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>

                {/* tomiwa: Transaction list */}
                <div className="space-y-3">
                  {/* tomiwa: Table header — hidden on mobile */}
                  <div className="hidden lg:grid lg:grid-cols-8 gap-3 px-5 py-3 bg-neutral-50 rounded-xl text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                    <span>ID</span>
                    <span>Date</span>
                    <span>Candidate</span>
                    <span>Service</span>
                    <span className="text-right">Gross</span>
                    <span className="text-right">Fee</span>
                    <span className="text-right">Net</span>
                    <span className="text-center">Status</span>
                  </div>

                  {filteredTransactions.length > 0 ? (
                    filteredTransactions.map((txn) => (
                      <div
                        key={txn.id}
                        className="bg-neutral-50 hover:bg-brand-aqua/5 border border-neutral-100 hover:border-brand-aqua/20 rounded-xl p-4 lg:p-5 transition-all duration-300"
                      >
                        {/* tomiwa: Desktop row layout */}
                        <div className="hidden lg:grid lg:grid-cols-8 gap-3 items-center">
                          <span className="text-xs font-mono text-brand-black">{txn.id}</span>
                          <span className="text-sm text-neutral-600">{txn.date}</span>
                          <span className="text-sm font-medium text-neutral-900 truncate">{txn.candidate}</span>
                          <span className="text-sm text-neutral-600">{txn.service}</span>
                          <span className="text-sm text-neutral-900 text-right">₦{txn.amount.toLocaleString()}</span>
                          <span className="text-sm text-red-500 text-right">-₦{txn.fee.toLocaleString()}</span>
                          <span className="text-sm font-semibold text-brand-aqua text-right">₦{txn.net.toLocaleString()}</span>
                          <div className="flex justify-center">
                            <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                              txn.status === 'completed'
                                ? 'bg-emerald-100 text-emerald-700'
                                : 'bg-brand-yellow/20 text-amber-700'
                            }`}>
                              {txn.status === 'completed' ? (
                                <CheckCircleSolidIcon className="w-3 h-3" />
                              ) : (
                                <ClockIcon className="w-3 h-3" />
                              )}
                              {txn.status.charAt(0).toUpperCase() + txn.status.slice(1)}
                            </span>
                          </div>
                        </div>

                        {/* tomiwa: Mobile card layout */}
                        <div className="lg:hidden space-y-2">
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-sm font-semibold text-brand-black">{txn.candidate}</span>
                              <span className="text-xs text-neutral-400 ml-2">{txn.id}</span>
                            </div>
                            <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                              txn.status === 'completed'
                                ? 'bg-emerald-100 text-emerald-700'
                                : 'bg-brand-yellow/20 text-amber-700'
                            }`}>
                              {txn.status === 'completed' ? (
                                <CheckCircleSolidIcon className="w-3 h-3" />
                              ) : (
                                <ClockIcon className="w-3 h-3" />
                              )}
                              {txn.status.charAt(0).toUpperCase() + txn.status.slice(1)}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-neutral-500">{txn.service} • {txn.method}</span>
                            <span className="text-neutral-500">{txn.date}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm pt-2 border-t border-neutral-200">
                            <div className="flex items-center gap-3">
                              <span className="text-neutral-600">₦{txn.amount.toLocaleString()}</span>
                              <span className="text-red-500 text-xs">-₦{txn.fee.toLocaleString()}</span>
                            </div>
                            <span className="font-semibold text-brand-aqua">₦{txn.net.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <MagnifyingGlassIcon className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
                      <p className="text-neutral-500 font-medium">No transactions found</p>
                      <p className="text-sm text-neutral-400 mt-1">Try adjusting your search or filter</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* ============================================= */}
      {/* ADD BANK ACCOUNT MODAL — Globally Standard    */}
      {/* updated: Completely redesigned to follow       */}
      {/* international bank account standards with      */}
      {/* country/region, currency, IBAN, SWIFT/BIC,     */}
      {/* routing number, and proper verification flow   */}
      {/* ============================================= */}
      {showAddPaymentModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto">

            {/* tomiwa: Modal header with icon */}
            <div className="flex items-center justify-between p-6 border-b border-neutral-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-aqua/10 flex items-center justify-center">
                  <BuildingLibraryIcon className="w-5 h-5 text-brand-aqua" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-display font-bold text-brand-black">
                    Add Bank Account
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
                    Enter your bank details to receive payouts
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowAddPaymentModal(false)}
                className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            {/* tomiwa: Form fields — globally standard bank account fields */}
            <div className="p-6 space-y-5">

              {/* tomiwa: Step indicator — visual progress for the form */}
              <div className="flex items-center gap-2 pb-4 border-b border-neutral-100">
                <div className="flex items-center gap-1.5">
                  <span className="w-6 h-6 rounded-full bg-brand-aqua text-white text-xs font-bold flex items-center justify-center">1</span>
                  <span className="text-xs font-semibold text-brand-aqua">Location</span>
                </div>
                <div className="flex-1 h-px bg-neutral-200" />
                <div className="flex items-center gap-1.5">
                  <span className="w-6 h-6 rounded-full bg-neutral-200 text-neutral-500 text-xs font-bold flex items-center justify-center">2</span>
                  <span className="text-xs font-medium text-neutral-400">Details</span>
                </div>
                <div className="flex-1 h-px bg-neutral-200" />
                <div className="flex items-center gap-1.5">
                  <span className="w-6 h-6 rounded-full bg-neutral-200 text-neutral-500 text-xs font-bold flex items-center justify-center">3</span>
                  <span className="text-xs font-medium text-neutral-400">Verify</span>
                </div>
              </div>

              {/* tomiwa: Country / Region selector — determines which fields to show */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                  Country / Region <span className="text-red-500">*</span>
                </label>
                <select className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm focus:border-brand-aqua focus:ring-brand-aqua/20 focus:ring-4 focus:outline-none transition-colors bg-white">
                  <option value="">Select country...</option>
                  <option value="NG">🇳🇬 Nigeria</option>
                  <option value="US">🇺🇸 United States</option>
                  <option value="GB">🇬🇧 United Kingdom</option>
                  <option value="CA">🇨🇦 Canada</option>
                  <option value="DE">🇩🇪 Germany</option>
                  <option value="FR">🇫🇷 France</option>
                  <option value="AU">🇦🇺 Australia</option>
                  <option value="IN">🇮🇳 India</option>
                  <option value="ZA">🇿🇦 South Africa</option>
                  <option value="GH">🇬🇭 Ghana</option>
                  <option value="KE">🇰🇪 Kenya</option>
                  <option value="AE">🇦🇪 United Arab Emirates</option>
                  <option value="SG">🇸🇬 Singapore</option>
                  <option value="JP">🇯🇵 Japan</option>
                  <option value="BR">🇧🇷 Brazil</option>
                </select>
                <p className="text-xs text-neutral-400 mt-1">
                  This determines which bank fields are required for your region
                </p>
              </div>

              {/* tomiwa: Currency selector */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                  Currency <span className="text-red-500">*</span>
                </label>
                <select className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm focus:border-brand-aqua focus:ring-brand-aqua/20 focus:ring-4 focus:outline-none transition-colors bg-white">
                  <option value="">Select currency...</option>
                  <option value="NGN">NGN — Nigerian Naira (₦)</option>
                  <option value="USD">USD — US Dollar ($)</option>
                  <option value="GBP">GBP — British Pound (£)</option>
                  <option value="EUR">EUR — Euro (€)</option>
                  <option value="CAD">CAD — Canadian Dollar (C$)</option>
                  <option value="AUD">AUD — Australian Dollar (A$)</option>
                  <option value="INR">INR — Indian Rupee (₹)</option>
                  <option value="ZAR">ZAR — South African Rand (R)</option>
                  <option value="GHS">GHS — Ghanaian Cedi (₵)</option>
                  <option value="KES">KES — Kenyan Shilling (KSh)</option>
                  <option value="AED">AED — UAE Dirham (د.إ)</option>
                  <option value="SGD">SGD — Singapore Dollar (S$)</option>
                  <option value="JPY">JPY — Japanese Yen (¥)</option>
                  <option value="BRL">BRL — Brazilian Real (R$)</option>
                </select>
              </div>

              {/* tomiwa: Divider before bank details */}
              <div className="relative py-1">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-neutral-200" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-3 text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                    Bank Details
                  </span>
                </div>
              </div>

              {/* tomiwa: Account Holder Name */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                  Account Holder Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Full legal name on the bank account"
                  className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm focus:border-brand-aqua focus:ring-brand-aqua/20 focus:ring-4 focus:outline-none transition-colors"
                />
                <p className="text-xs text-neutral-400 mt-1">
                  Must match the name registered with your bank exactly
                </p>
              </div>

              {/* tomiwa: Bank Name — text input (works for any bank worldwide) */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                  Bank Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Chase Bank, Barclays, GTBank..."
                  className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm focus:border-brand-aqua focus:ring-brand-aqua/20 focus:ring-4 focus:outline-none transition-colors"
                />
              </div>

              {/* tomiwa: Two-column row — Account Number + Account Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* tomiwa: Account Number / IBAN */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                    Account Number / IBAN <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter account no. or IBAN"
                    className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm focus:border-brand-aqua focus:ring-brand-aqua/20 focus:ring-4 focus:outline-none transition-colors font-mono"
                  />
                </div>

                {/* tomiwa: Account Type selector */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                    Account Type <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm focus:border-brand-aqua focus:ring-brand-aqua/20 focus:ring-4 focus:outline-none transition-colors bg-white">
                    <option value="">Select type...</option>
                    <option value="savings">Savings</option>
                    <option value="checking">Checking / Current</option>
                    <option value="business">Business</option>
                  </select>
                </div>
              </div>

              {/* tomiwa: SWIFT / BIC Code — required for international transfers */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                  SWIFT / BIC Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. CHASUS33, GTBINGLA"
                  maxLength={11}
                  className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm focus:border-brand-aqua focus:ring-brand-aqua/20 focus:ring-4 focus:outline-none transition-colors font-mono uppercase"
                />
                <p className="text-xs text-neutral-400 mt-1">
                  8 or 11 characters — contact your bank if you don&apos;t know this
                </p>
              </div>

              {/* tomiwa: Routing Number / Sort Code — region-specific fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* tomiwa: Routing Number (US/CA) or Sort Code (UK) */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                    Routing Number
                    <span className="text-xs text-neutral-400 ml-1">(US/CA)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="9-digit routing no."
                    maxLength={9}
                    className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm focus:border-brand-aqua focus:ring-brand-aqua/20 focus:ring-4 focus:outline-none transition-colors font-mono"
                  />
                </div>

                {/* tomiwa: Sort Code (UK) or BSB (AU) or Branch Code */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                    Sort Code / BSB
                    <span className="text-xs text-neutral-400 ml-1">(UK/AU)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 12-34-56"
                    maxLength={8}
                    className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm focus:border-brand-aqua focus:ring-brand-aqua/20 focus:ring-4 focus:outline-none transition-colors font-mono"
                  />
                </div>
              </div>

              {/* tomiwa: Helper text — only fill routing/sort code for applicable regions */}
              <p className="text-xs text-neutral-400 -mt-2">
                Fill in Routing Number for US/Canada, Sort Code for UK, or BSB for Australia.
                Leave blank if not applicable to your country.
              </p>

              {/* tomiwa: Set as Primary toggle */}
              <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl border border-neutral-100">
                <div>
                  <span className="text-sm font-medium text-neutral-900">Set as Primary Account</span>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    All future payouts will be sent to this account
                  </p>
                </div>
                <button
                  type="button"
                  className="relative w-11 h-6 bg-neutral-300 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-brand-aqua/30"
                >
                  <span className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform" />
                </button>
              </div>

              {/* tomiwa: Terms agreement notice */}
              <div className="flex items-start gap-2 p-3 bg-brand-yellow/10 border border-brand-yellow/20 rounded-xl">
                <ExclamationTriangleIcon className="w-4 h-4 text-brand-yellow flex-shrink-0 mt-0.5" />
                <p className="text-xs text-neutral-600">
                  By adding this account, you confirm that you are the authorized owner of this bank
                  account and that the details provided are accurate. Incorrect details may delay payouts.
                </p>
              </div>
            </div>

            {/* tomiwa: Modal footer — cancel and submit buttons */}
            <div className="flex items-center gap-3 p-6 border-t border-neutral-100">
              <button
                onClick={() => setShowAddPaymentModal(false)}
                className="flex-1 px-4 py-3 border border-neutral-200 text-neutral-600 rounded-xl hover:bg-neutral-50 transition-colors font-medium text-sm"
              >
                Cancel
              </button>
              <button className="flex-1 px-4 py-3 bg-brand-aqua text-white rounded-xl hover:bg-brand-aqua/90 transition-all duration-300 font-medium text-sm shadow-sm hover:shadow-md flex items-center justify-center gap-2">
                <CheckCircleIcon className="w-4 h-4" />
                Verify & Add Account
              </button>
            </div>
          </div>
        </div>
      )}
    </CoachDashboardLayout>
  );
}

// tomiwa: Simple chart icon component used in tabs
function ChartIcon({ className }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
      />
    </svg>
  );
}
