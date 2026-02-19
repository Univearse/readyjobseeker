'use client';

import React, { useState } from 'react';
import {
  CreditCardIcon,
  DocumentTextIcon,
  ChartBarIcon,
  StarIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowUpIcon,
  CalendarIcon,
  BanknotesIcon,
  ShieldCheckIcon,
  BriefcaseIcon,
  SparklesIcon,
  DocumentMagnifyingGlassIcon,
  ArrowDownTrayIcon,
  ArrowTrendingUpIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import DashboardCard from '@/components/ui/DashboardCard.js';
import { Card } from '@/components/ui/Card.jsx';
import { Button } from '@/components/ui/Button.jsx';
import StatusBadge from '@/components/ui/StatusBadge.jsx';
import UpgradePlanModal from '@/components/ui/modals/UpgradePlanModal.jsx';
import PaymentMethodModal from '@/components/ui/modals/PaymentMethodModal.jsx';
import InvoiceDetailsModal from '@/components/ui/modals/InvoiceDetailsModal.jsx';

// tomiwa: Mock data for subscription and billing information
const currentPlan = {
  name: 'Premium',
  price: 39999,
  billing: 'monthly',
  status: 'active',
  nextBilling: '2024-04-15',
  features: [
    '5 active job postings',
    'Featured placement',
    'AI candidate ranking',
    'Limited CV database',
    'Advanced analytics'
  ]
};

// tomiwa: Usage data and trends - Ready to be moved to a dedicated Analytics & Insights page
// This data was removed from the Subscription page to keep it focused on billing and plans
const usageData = {
  jobPostings: { used: 8, limit: 'unlimited' },
  aiCredits: { used: 450, limit: 1000 },
  cvSearches: { used: 120, limit: 500 },
  interviews: { used: 25, limit: 100 }
};

const billingHistory = [
  {
    id: 1,
    date: '2024-03-15',
    amount: 39999,
    status: 'paid',
    invoice: 'INV-2024-003',
    description: 'Premium Plan - Monthly'
  },
  {
    id: 2,
    date: '2024-02-15',
    amount: 39999,
    status: 'paid',
    invoice: 'INV-2024-002',
    description: 'Premium Plan - Monthly'
  },
  {
    id: 3,
    date: '2024-01-15',
    amount: 39999,
    status: 'paid',
    invoice: 'INV-2024-001',
    description: 'Premium Plan - Monthly'
  }
];

// tomiwa: Updated pricing plans based on new pricing structure (Nigerian Naira)
const availablePlans = [
  {
    name: 'Free Post',
    monthlyPrice: 0,
    yearlyPrice: 0,
    billing: 'monthly',
    features: [
      '1 active job posting',
      'Basic search visibility',
      'Standard applicant inbox',
      'Email notifications',
      'Basic job analytics'
    ],
    popular: false,
    buttonText: 'Start Free'
  },
  {
    name: 'Starter',
    monthlyPrice: 19999,
    yearlyPrice: 191990.40, // tomiwa: 20% discount for yearly (19999 * 12 * 0.8)
    billing: 'monthly',
    features: [
      '3 active job postings',
      'AI candidate matching',
      'Basic analytics dashboard',
      'Priority support',
      'Custom job alerts'
    ],
    popular: false,
    buttonText: 'Get Started'
  },
  {
    name: 'Premium',
    monthlyPrice: 39999,
    yearlyPrice: 383990.40, // tomiwa: 20% discount for yearly (39999 * 12 * 0.8)
    billing: 'monthly',
    features: [
      '5 active job postings',
      'Featured placement',
      'AI candidate ranking',
      'Limited CV database',
      'Advanced analytics'
    ],
    popular: true,
    current: true,
    buttonText: 'Get Started'
  },
  {
    name: 'Enterprise',
    monthlyPrice: 79999,
    yearlyPrice: 767990.40, // tomiwa: 20% discount for yearly (79999 * 12 * 0.8)
    billing: 'monthly',
    features: [
      'Unlimited job postings',
      'Custom branding',
      'Full CV database access',
      'API access',
      'Dedicated support'
    ],
    popular: false,
    buttonText: 'Get Started'
  }
];

// tomiwa: Usage trends data - Ready to be moved to a dedicated Analytics & Insights page
// This provides insights like growth, peak activity, and billing cycle progress
const usageTrends = {
  monthlyGrowth: 15,
  peakDay: 'Tuesdays',
  mostUsedFeature: 'AI Resume Parser',
  billingCycleProgress: 60,
  daysRemaining: 12
};

export default function SubscriptionBilling() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [billingCycle, setBillingCycle] = useState('monthly'); // tomiwa: New state for monthly/yearly toggle
  const [selectedPlanForUpgrade, setSelectedPlanForUpgrade] = useState(null); // tomiwa: New state to track which plan user wants to upgrade to

  // tomiwa: Function to format currency in Nigerian Naira
  const formatCurrency = (amount) => {
    // tomiwa: For Free plan, display "Free" instead of ₦0
    if (amount === 0) {
      return 'Free';
    }
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // tomiwa: Function to format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // tomiwa: Function to calculate usage percentage
  const getUsagePercentage = (used, limit) => {
    if (limit === 'unlimited') return 0;
    return Math.round((used / limit) * 100);
  };

  return (
    <div className="space-y-8">
      {/* tomiwa: Updated header with new aqua-to-teal gradient - Responsive across all screen sizes */}
      <div className="bg-gradient-to-r from-brand-aqua to-primary-800 rounded-2xl 
                      p-6 sm:p-8 md:p-8 lg:p-8 xl:p-8 2xl:p-8
                      text-white shadow-lg">
        <div className="flex flex-col 
                        sm:flex-col 
                        md:flex-col 
                        lg:flex-row 
                        xl:flex-row 
                        2xl:flex-row 
                        justify-between items-start 
                        lg:items-center 
                        gap-6 sm:gap-8">
          <div className="w-full lg:w-auto">
            <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-3xl xl:text-4xl 
                           font-display font-semibold mb-3 text-white">
              Subscription & Billing
            </h1>
            <p className="text-primary-100 text-sm sm:text-base font-normal">
              Manage your subscription, view usage, and billing history
            </p>
          </div>
          <div className="bg-white/15 backdrop-blur-sm rounded-xl 
                          p-4 sm:p-5 
                          border border-white/20 
                          w-full sm:w-auto 
                          lg:w-auto 
                          min-w-0 lg:min-w-[300px]
                          shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <StarIcon className="w-5 h-5 sm:w-6 sm:h-6 text-brand-yellow flex-shrink-0" />
              <span className="font-semibold text-sm sm:text-base text-white">{currentPlan.name} Plan</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold text-white">
              {formatCurrency(currentPlan.price)}/month
            </div>
            <div className="text-xs sm:text-sm text-primary-100 mt-2">
              Next billing: {formatDate(currentPlan.nextBilling)}
            </div>
          </div>
        </div>
      </div>

      {/* tomiwa: Tab navigation - Responsive design for all screen sizes */}
      <div className="bg-white rounded-2xl shadow-lg">
        <div className="border-b border-neutral-200">
          {/* tomiwa: Desktop and tablet navigation */}
          <nav className="hidden sm:flex 
                          space-x-2 sm:space-x-4 md:space-x-6 lg:space-x-8 
                          px-4 sm:px-6 md:px-8 
                          overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview', icon: ChartBarIcon },
              { id: 'billing', label: 'Billing History', icon: DocumentTextIcon },
              { id: 'plans', label: 'Plans', icon: StarIcon }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 
                           py-3 sm:py-4 
                           px-2 sm:px-3 
                           border-b-2 font-medium 
                           text-xs sm:text-sm 
                           transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-brand-orange text-brand-orange'
                    : 'border-transparent text-neutral-500 hover:text-neutral-700'
                }`}
              >
                <tab.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden md:inline">{tab.label}</span>
                <span className="md:hidden">{tab.label.split(' ')[0]}</span>
              </button>
            ))}
          </nav>

          {/* tomiwa: Mobile navigation dropdown */}
          <div className="sm:hidden px-4 py-3">
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
              className="w-full px-4 py-3 border border-neutral-300 rounded-xl 
                         focus:ring-2 focus:ring-brand-aqua focus:border-brand-aqua 
                         bg-white text-brand-black font-medium"
            >
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'billing', label: 'Billing History' },
                { id: 'plans', label: 'Subscription Plans' }
              ].map((tab) => (
                <option key={tab.id} value={tab.id}>
                  {tab.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* tomiwa: Tab content - Responsive padding */}
        <div className="p-4 sm:p-6 md:p-8">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Current Plan Details */}
              <div>
                <h2 className="text-xl sm:text-2xl font-display font-bold text-brand-black mb-4 sm:mb-6">
                  Current Plan Details
                </h2>
                {/* tomiwa: Responsive grid - 1 col mobile, 2 cols tablet, 4 cols desktop */}
                <div className="grid grid-cols-1 
                                sm:grid-cols-2 
                                md:grid-cols-2 
                                lg:grid-cols-4 
                                xl:grid-cols-4 
                                2xl:grid-cols-4 
                                gap-4 sm:gap-6">
                  <DashboardCard
                    icon={StarIcon}
                    title="Plan Type"
                    value={currentPlan.name}
                    subtitle="Active subscription"
                    iconColor="text-brand-orange"
                  />
                  <DashboardCard
                    icon={BanknotesIcon}
                    title="Monthly Cost"
                    value={formatCurrency(currentPlan.price)}
                    subtitle="Billed monthly"
                    iconColor="text-brand-aqua"
                  />
                  <DashboardCard
                    icon={CalendarIcon}
                    title="Next Billing"
                    value={formatDate(currentPlan.nextBilling)}
                    subtitle="Auto-renewal"
                    iconColor="text-brand-yellow"
                  />
                  <DashboardCard
                    icon={ShieldCheckIcon}
                    title="Status"
                    value="Active"
                    subtitle="All features enabled"
                    iconColor="text-emerald-500"
                  />
                </div>
                      </div>

              {/* tomiwa: Enhanced Quick Actions with larger, more distinct buttons */}
                      <div>
                <h3 className="text-lg sm:text-xl font-display font-bold text-brand-black mb-6">
                  Quick Actions
                </h3>
                {/* tomiwa: Responsive grid for larger action buttons with better visual separation */}
                <div className="grid grid-cols-1 
                                sm:grid-cols-2 
                                md:grid-cols-3 
                                lg:grid-cols-3 
                                xl:grid-cols-3 
                                2xl:grid-cols-3 
                                gap-4 sm:gap-6">
                  <Button
                    variant="outline"
                    className="flex items-center justify-center gap-3 p-6 h-auto 
                               border-2 border-brand-orange text-brand-orange 
                               hover:bg-brand-orange hover:text-white 
                               transition-all duration-200 rounded-xl
                               font-medium text-sm sm:text-base"
                    onClick={() => setShowUpgradeModal(true)}
                  >
                    <ArrowUpIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                    Upgrade Plan
                  </Button>
                  <Button
                    variant="outline"
                    className="flex items-center justify-center gap-3 p-6 h-auto 
                               border-2 border-brand-aqua text-brand-aqua 
                               hover:bg-brand-aqua hover:text-white 
                               transition-all duration-200 rounded-xl
                               font-medium text-sm sm:text-base"
                    onClick={() => setShowPaymentModal(true)}
                  >
                    <CreditCardIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                    Update Payment
                  </Button>
                  <Button
                    variant="outline"
                    className="flex items-center justify-center gap-3 p-6 h-auto 
                               border-2 border-neutral-300 text-neutral-700 
                               hover:bg-neutral-100 hover:border-neutral-400
                               transition-all duration-200 rounded-xl
                               font-medium text-sm sm:text-base"
                    onClick={() => {
                      setSelectedInvoice(billingHistory[0]);
                      setShowInvoiceModal(true);
                    }}
                  >
                    <ArrowDownTrayIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                    Download Invoice
                  </Button>
                </div>
              </div>

              {/* tomiwa: Redesigned Plan Features section - More visual, organized, and functional */}
              <div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                  <div>
                    <h3 className="text-xl font-display font-bold text-brand-black">
                      Your Plan Features
                    </h3>
                    <p className="text-neutral-600 text-sm mt-1">
                      Everything included in your {currentPlan.name} plan
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedPlanForUpgrade('Enterprise');
                      setShowUpgradeModal(true);
                    }}
                    className="flex items-center gap-2 border-2 border-brand-orange text-brand-orange 
                               hover:bg-brand-orange hover:text-white transition-all duration-200 text-sm"
                  >
                    <ArrowUpIcon className="w-4 h-4" />
                    See Higher Plans
                  </Button>
                </div>

                {/* tomiwa: Enhanced feature cards with icons and categories */}
                <div className="grid grid-cols-1 
                                sm:grid-cols-2 
                                md:grid-cols-2 
                                lg:grid-cols-3 
                                xl:grid-cols-3 
                                2xl:grid-3 
                                gap-4 sm:gap-6">
                  {/* tomiwa: Feature 1 - Active Job Postings */}
                  <Card className="p-5 border-0 shadow-md hover:shadow-xl transition-all duration-300 
                                   bg-gradient-to-br from-blue-50 via-white to-blue-50/30 
                                   hover:scale-105 cursor-default">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 
                                      rounded-xl flex items-center justify-center shadow-lg">
                        <BriefcaseIcon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-brand-black text-base mb-1">
                          5 Active Jobs
                        </h4>
                        <p className="text-neutral-600 text-xs leading-relaxed">
                          Post up to 5 job listings simultaneously
                        </p>
                        <div className="mt-3 flex items-center gap-2">
                          <CheckCircleIcon className="w-4 h-4 text-emerald-500" />
                          <span className="text-emerald-700 text-xs font-medium">Active</span>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* tomiwa: Feature 2 - Featured Placement */}
                  <Card className="p-5 border-0 shadow-md hover:shadow-xl transition-all duration-300 
                                   bg-gradient-to-br from-orange-50 via-white to-orange-50/30 
                                   hover:scale-105 cursor-default">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-brand-orange to-red-500 
                                      rounded-xl flex items-center justify-center shadow-lg">
                        <StarIcon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-brand-black text-base mb-1">
                          Featured Placement
                        </h4>
                        <p className="text-neutral-600 text-xs leading-relaxed">
                          Your jobs appear at the top of search results
                        </p>
                        <div className="mt-3 flex items-center gap-2">
                          <CheckCircleIcon className="w-4 h-4 text-emerald-500" />
                          <span className="text-emerald-700 text-xs font-medium">Active</span>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* tomiwa: Feature 3 - AI Candidate Ranking */}
                  <Card className="p-5 border-0 shadow-md hover:shadow-xl transition-all duration-300 
                                   bg-gradient-to-br from-purple-50 via-white to-purple-50/30 
                                   hover:scale-105 cursor-default">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 
                                      rounded-xl flex items-center justify-center shadow-lg">
                        <SparklesIcon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-brand-black text-base mb-1">
                          AI Ranking
                        </h4>
                        <p className="text-neutral-600 text-xs leading-relaxed">
                          Automatically rank candidates by fit score
                        </p>
                        <div className="mt-3 flex items-center gap-2">
                          <CheckCircleIcon className="w-4 h-4 text-emerald-500" />
                          <span className="text-emerald-700 text-xs font-medium">Active</span>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* tomiwa: Feature 4 - Limited CV Database */}
                  <Card className="p-5 border-0 shadow-md hover:shadow-xl transition-all duration-300 
                                   bg-gradient-to-br from-green-50 via-white to-green-50/30 
                                   hover:scale-105 cursor-default">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 
                                      rounded-xl flex items-center justify-center shadow-lg">
                        <UserGroupIcon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-brand-black text-base mb-1">
                          CV Database
                        </h4>
                        <p className="text-neutral-600 text-xs leading-relaxed">
                          Access to limited candidate database
                        </p>
                        <div className="mt-3 flex items-center gap-2">
                          <CheckCircleIcon className="w-4 h-4 text-emerald-500" />
                          <span className="text-emerald-700 text-xs font-medium">Active</span>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* tomiwa: Feature 5 - Advanced Analytics */}
                  <Card className="p-5 border-0 shadow-md hover:shadow-xl transition-all duration-300 
                                   bg-gradient-to-br from-cyan-50 via-white to-cyan-50/30 
                                   hover:scale-105 cursor-default">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-brand-aqua to-cyan-500 
                                      rounded-xl flex items-center justify-center shadow-lg">
                        <ChartBarIcon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-brand-black text-base mb-1">
                          Advanced Analytics
                        </h4>
                        <p className="text-neutral-600 text-xs leading-relaxed">
                          Deep insights into job performance
                        </p>
                        <div className="mt-3 flex items-center gap-2">
                          <CheckCircleIcon className="w-4 h-4 text-emerald-500" />
                          <span className="text-emerald-700 text-xs font-medium">Active</span>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* tomiwa: Compare Plans CTA Card */}
                  <Card className="p-5 border-2 border-dashed border-brand-orange/30 shadow-md 
                                   hover:shadow-xl hover:border-brand-orange transition-all duration-300 
                                   bg-gradient-to-br from-orange-50/50 via-white to-yellow-50/30 
                                   hover:scale-105 cursor-pointer"
                        onClick={() => setActiveTab('plans')}>
                    <div className="flex flex-col items-center justify-center h-full text-center gap-3 py-2">
                      <div className="w-12 h-12 bg-gradient-to-br from-brand-yellow to-brand-orange 
                                      rounded-xl flex items-center justify-center shadow-lg">
                        <ArrowTrendingUpIcon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-brand-black text-base mb-1">
                          Unlock More
                        </h4>
                        <p className="text-neutral-600 text-xs">
                          Compare all plans and features
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        className="text-brand-orange hover:bg-brand-orange hover:text-white text-xs mt-1"
                      >
                        View Plans →
                      </Button>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          )}

          {/* tomiwa: Redesigned Billing History Tab with cleaner table design */}
          {activeTab === 'billing' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                <h2 className="text-2xl font-display font-bold text-brand-black">
                  Billing History
                </h2>
                  <p className="text-neutral-600 mt-1">
                    View and download your payment history
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2 border-2 border-brand-aqua text-brand-aqua 
                             hover:bg-brand-aqua hover:text-white transition-all duration-200"
                >
                  <ArrowDownTrayIcon className="w-4 h-4" />
                  Export All
                </Button>
              </div>

              <Card className="overflow-hidden border-0 shadow-md">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-neutral-50 to-neutral-100">
                      <tr>
                        <th className="px-6 py-5 text-left text-sm font-semibold text-neutral-700">
                          Invoice ID
                        </th>
                        <th className="px-6 py-5 text-left text-sm font-semibold text-neutral-700">
                          Date
                        </th>
                        <th className="px-6 py-5 text-left text-sm font-semibold text-neutral-700">
                          Description
                        </th>
                        <th className="px-6 py-5 text-left text-sm font-semibold text-neutral-700">
                          Amount
                        </th>
                        <th className="px-6 py-5 text-left text-sm font-semibold text-neutral-700">
                          Status
                        </th>
                        <th className="px-6 py-5 text-left text-sm font-semibold text-neutral-700">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {billingHistory.map((invoice) => (
                        <tr key={invoice.id} className="hover:bg-neutral-50/50 transition-colors duration-150">
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-2">
                              <DocumentTextIcon className="w-4 h-4 text-neutral-400" />
                              <span className="text-sm font-medium text-brand-black">{invoice.invoice}</span>
                            </div>
                          </td>
                          <td className="px-6 py-5 text-sm text-neutral-600 font-medium">
                            {formatDate(invoice.date)}
                          </td>
                          <td className="px-6 py-5 text-sm text-neutral-600">
                            {invoice.description}
                          </td>
                          <td className="px-6 py-5">
                            <span className="text-sm font-bold text-brand-black">
                            {formatCurrency(invoice.amount)}
                            </span>
                          </td>
                          <td className="px-6 py-5">
                            <StatusBadge 
                              status={invoice.status === 'paid' ? 'success' : 'warning'}
                              text={invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                            />
                          </td>
                          <td className="px-6 py-5">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="text-brand-aqua hover:text-white hover:bg-brand-aqua 
                                         border border-brand-aqua/20 hover:border-brand-aqua
                                         transition-all duration-200 font-medium"
                              onClick={() => {
                                setSelectedInvoice(invoice);
                                setShowInvoiceModal(true);
                              }}
                            >
                              View Details
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          )}

          {/* tomiwa: Redesigned Plans Tab with Monthly/Yearly toggle and enhanced styling */}
          {activeTab === 'plans' && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-2xl font-display font-bold text-brand-black mb-3">
                  Choose Your Plan
                </h2>
                <p className="text-neutral-600 mb-6">
                  Upgrade or downgrade your subscription at any time
                </p>

                {/* tomiwa: Monthly/Yearly Toggle */}
                <div className="inline-flex items-center bg-neutral-100 rounded-xl p-1 mb-8">
                  <button
                    onClick={() => setBillingCycle('monthly')}
                    className={`px-6 py-3 rounded-lg font-medium text-sm transition-all duration-200 ${
                      billingCycle === 'monthly'
                        ? 'bg-white text-brand-black shadow-sm'
                        : 'text-neutral-600 hover:text-brand-black'
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setBillingCycle('yearly')}
                    className={`px-6 py-3 rounded-lg font-medium text-sm transition-all duration-200 relative ${
                      billingCycle === 'yearly'
                        ? 'bg-white text-brand-black shadow-sm'
                        : 'text-neutral-600 hover:text-brand-black'
                    }`}
                  >
                    Yearly
                    <span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs px-2 py-0.5 rounded-full">
                      Save 20%
                    </span>
                  </button>
                </div>
              </div>

              {/* tomiwa: Responsive grid layout - 1 column on mobile, 2 on tablet, 4 on desktop */}
              <div className="grid grid-cols-1 
                              sm:grid-cols-1 
                              md:grid-cols-2 
                              lg:grid-cols-4 
                              xl:grid-cols-4 
                              2xl:grid-cols-4 
                              gap-6">
                {availablePlans.map((plan) => {
                  const price = billingCycle === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice;
                  const savings = billingCycle === 'yearly' ? (plan.monthlyPrice - plan.yearlyPrice) * 12 : 0;
                  
                  return (
                  <Card 
                    key={plan.name}
                      className={`relative p-6 transition-all duration-300 hover:shadow-xl ${
                      plan.current 
                          ? 'ring-2 ring-brand-orange border-brand-orange bg-gradient-to-br from-orange-50 to-white shadow-lg' 
                        : plan.popular 
                          ? 'ring-2 ring-brand-aqua border-brand-aqua bg-gradient-to-br from-cyan-50 to-white shadow-lg' 
                          : 'border-neutral-200 hover:border-neutral-300 bg-white'
                    }`}
                  >
                    {plan.popular && !plan.current && (
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                          <span className="bg-gradient-to-r from-brand-aqua to-brand-orange text-white px-4 py-1.5 rounded-full text-xs font-semibold shadow-lg">
                          Most Popular
                        </span>
                      </div>
                    )}
                    
                    {plan.current && (
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                          <span className="bg-gradient-to-r from-brand-orange to-red-500 text-white px-4 py-1.5 rounded-full text-xs font-semibold shadow-lg">
                          Current Plan
                        </span>
                      </div>
                    )}

                      <div className="text-center mb-6">
                        <h3 className="text-lg font-display font-bold text-brand-black mb-4">
                        {plan.name}
                      </h3>
                        <div className="mb-4">
                          <div className="text-3xl font-bold text-brand-black mb-1">
                            {formatCurrency(price)}
                          </div>
                          {price > 0 && (
                          <div className="text-neutral-600 text-xs">
                            /{billingCycle === 'yearly' ? 'mo' : 'mo'}
                          </div>
                          )}
                          {billingCycle === 'yearly' && savings > 0 && (
                            <div className="text-emerald-600 text-xs font-medium mt-2">
                              Save {formatCurrency(savings)} per year
                      </div>
                          )}
                        </div>
                    </div>

                      <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                            <div className="flex-shrink-0 w-4 h-4 bg-emerald-100 rounded-full flex items-center justify-center mt-0.5">
                              <CheckCircleIcon className="w-3 h-3 text-emerald-600" />
                            </div>
                            <span className="text-neutral-700 text-xs font-medium">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button 
                        className={`w-full py-3 font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                          plan.current 
                            ? 'bg-neutral-100 text-neutral-500 cursor-not-allowed' 
                            : plan.popular
                            ? 'bg-gradient-to-r from-brand-orange to-red-500 hover:from-red-500 hover:to-brand-orange text-white shadow-lg hover:shadow-xl'
                            : plan.name === 'Free Post'
                            ? 'border-2 border-neutral-300 text-neutral-700 hover:bg-neutral-100 hover:border-neutral-400'
                            : 'border-2 border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white'
                        }`}
                      variant={plan.current ? 'outline' : 'primary'}
                      disabled={plan.current}
                        onClick={() => {
                          if (!plan.current) {
                            setSelectedPlanForUpgrade(plan.name);
                            setShowUpgradeModal(true);
                          }
                        }}
                      >
                        {plan.current ? (
                          <>
                            <CheckCircleIcon className="w-4 h-4" />
                            Current Plan
                          </>
                        ) : (
                          <>
                            <ArrowUpIcon className="w-4 h-4" />
                            Upgrade to {plan.name}
                          </>
                        )}
                    </Button>
                  </Card>
                  );
                })}
                  </div>
                    </div>
          )}

        </div>
      </div>

      {/* tomiwa: Modals */}
      <UpgradePlanModal
        isOpen={showUpgradeModal}
        onClose={() => {
          setShowUpgradeModal(false);
          setSelectedPlanForUpgrade(null); // tomiwa: Reset selected plan when modal closes
        }}
        currentPlan={currentPlan.name}
        preSelectedPlan={selectedPlanForUpgrade} // tomiwa: Pass the selected plan to the modal
      />

      <PaymentMethodModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        currentCard={{
          number: '**** **** **** 4242',
          expiryMonth: '12',
          expiryYear: '26',
          name: 'Tech Corp Inc.',
          billingAddress: {
            street: '123 Business Street',
            city: 'San Francisco',
            state: 'CA',
            zipCode: '94105',
            country: 'US'
          }
        }}
      />

      <InvoiceDetailsModal
        isOpen={showInvoiceModal}
        onClose={() => setShowInvoiceModal(false)}
        invoice={selectedInvoice}
      />
    </div>
  );
}
