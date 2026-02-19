/**
 * File: src/app/dashboard/candidate/subscription/page.js
 * 
 * tomiwa: Subscription & Billing Page - Full Design (UPDATED CLEANER LAYOUT)
 * A comprehensive page for managing subscription plans, viewing billing history,
 * and managing payment methods.
 * 
 * Layout Structure:
 * ================
 * HERO BANNER: Aqua-to-teal gradient (#36D0D8 → #0C5B65)
 *              - Title: "Subscription & Billing"
 *              - Subtitle: Plan management description
 *              - AI Assistant toggle button
 * 
 * SECTION 1: Current Plan Overview (UPDATED - Clean text-based layout)
 *            - Single card with plan name, status, price, and action buttons
 *            - Benefits displayed as flowing inline badges/pills
 *            - Quick stats row at bottom (AI tools, applications, interviews, next bill)
 * 
 * SECTION 2: Plan Comparison Cards (3 columns)
 *            - Free, Pro, and Premium plans
 *            - Feature lists with checkmarks
 *            - CTA buttons (Current/Upgrade/Contact Sales)
 * 
 * SECTION 3: Billing History (Full width)
 *            - Full width table with invoices
 *            - Download buttons and view all link
 * 
 * SECTION 4: Payment Methods (Full width)
 *            - Full width card grid layout
 *            - Add new card option
 *            - Security notice banner
 * 
 * SECTION 5: AI Assistant Panel (toggleable)
 *            - Recommendations based on usage
 *            - Plan suggestions
 */

'use client';

import { useState } from 'react';
import Link from 'next/link'; // tomiwa: NEW - Import Link for navigation to sub-pages
import CandidateDashboardLayout from '@/components/layouts/CandidateDashboardLayout.jsx';
import { 
  CreditCardIcon, 
  SparklesIcon,
  CheckCircleIcon,
  XCircleIcon,
  DocumentArrowDownIcon,
  PlusCircleIcon,
  RocketLaunchIcon,
  BoltIcon,
  StarIcon,
  ChartBarIcon,
  ArrowPathIcon,
  ShieldCheckIcon,
  CpuChipIcon,
  UserGroupIcon,
  ClockIcon,
  CalendarDaysIcon,
  PencilSquareIcon,
  TrashIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { CheckIcon, StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';

// tomiwa: NEW - Mock data for subscription plans
// updated: Changed all prices from USD ($) to NERA (₦) currency
// ExistingCode: This defines the three subscription tiers available to users
const subscriptionPlans = [
  {
    id: 'free',
    name: 'Free',
    price: '₦0',
    priceValue: 0, // tomiwa: NEW - numeric value for calculations
    period: 'forever',
    description: 'Perfect for getting started with your job search',
    icon: RocketLaunchIcon,
    iconBg: 'bg-neutral-100',
    iconColor: 'text-neutral-600',
    features: [
      { text: 'Up to 5 job applications/month', included: true },
      { text: 'Basic resume builder', included: true },
      { text: 'Job search & filters', included: true },
      { text: 'Email notifications', included: true },
      { text: 'AI Cover Letter Generator', included: false },
      { text: 'AI Interview Coach', included: false },
      { text: 'Resume AI Enhancement', included: false },
      { text: 'Priority support', included: false },
    ],
    cta: 'Current Plan',
    ctaStyle: 'bg-neutral-200 text-neutral-600 cursor-default',
    popular: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '₦15,000',
    priceValue: 15000, // tomiwa: NEW - numeric value for calculations
    period: '/month',
    description: 'Unlock AI tools to supercharge your job search',
    icon: BoltIcon,
    iconBg: 'bg-brand-aqua/10',
    iconColor: 'text-brand-aqua',
    features: [
      { text: 'Unlimited job applications', included: true },
      { text: 'Advanced resume builder', included: true },
      { text: 'Job search & filters', included: true },
      { text: 'Email & SMS notifications', included: true },
      { text: 'AI Cover Letter Generator', included: true },
      { text: 'AI Interview Coach', included: true },
      { text: 'Resume AI Enhancement', included: true },
      { text: 'Priority email support', included: true },
    ],
    cta: 'Upgrade to Pro',
    ctaStyle: 'bg-brand-aqua hover:bg-[#2BA6AD] text-white',
    popular: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '₦45,000',
    priceValue: 45000, // tomiwa: NEW - numeric value for calculations
    period: '/month',
    description: 'For serious job seekers who want every advantage',
    icon: StarIcon,
    iconBg: 'bg-brand-orange/10',
    iconColor: 'text-brand-orange',
    features: [
      { text: 'Everything in Pro', included: true },
      { text: 'Personal career coach', included: true },
      { text: 'Salary negotiation tools', included: true },
      { text: 'Company insights & research', included: true },
      { text: 'Unlimited AI tool usage', included: true },
      { text: 'Profile boost to employers', included: true },
      { text: 'Video interview practice', included: true },
      { text: '24/7 priority support', included: true },
    ],
    cta: 'Go Premium',
    ctaStyle: 'bg-brand-orange hover:bg-[#BF4225] text-white',
    popular: false,
  },
];

// tomiwa: NEW - Mock data for billing history
// updated: Changed all amounts from USD ($) to NERA (₦) currency
// ExistingCode: Sample invoice data for the billing history table
const billingHistory = [
  {
    id: 'INV-2024-001',
    date: 'Jan 15, 2024',
    description: 'Pro Plan - Monthly',
    amount: '₦15,000',
    status: 'Paid',
  },
  {
    id: 'INV-2023-012',
    date: 'Dec 15, 2023',
    description: 'Pro Plan - Monthly',
    amount: '₦15,000',
    status: 'Paid',
  },
  {
    id: 'INV-2023-011',
    date: 'Nov 15, 2023',
    description: 'Pro Plan - Monthly',
    amount: '₦15,000',
    status: 'Paid',
  },
  {
    id: 'INV-2023-010',
    date: 'Oct 15, 2023',
    description: 'Pro Plan Upgrade',
    amount: '₦15,000',
    status: 'Paid',
  },
];

// tomiwa: NEW - Mock data for payment methods
// ExistingCode: Sample saved payment cards for the user
const paymentMethods = [
  {
    id: 1,
    type: 'visa',
    last4: '4242',
    expiry: '12/25',
    isDefault: true,
  },
  {
    id: 2,
    type: 'mastercard',
    last4: '8888',
    expiry: '06/26',
    isDefault: false,
  },
];

// tomiwa: NEW - Mock current plan usage data
// updated: Changed nextAmount from USD ($) to NERA (₦) currency
// ExistingCode: Shows the user's current usage statistics
const currentUsage = {
  plan: 'Pro',
  status: 'Active',
  renewalDate: 'Feb 15, 2024',
  nextAmount: '₦15,000',
  aiToolsUsed: 45,
  aiToolsLimit: 100,
  applicationsSubmitted: 28,
  applicationsLimit: 'Unlimited',
  interviewsBooked: 5,
};

export default function Subscription() {
  // tomiwa: State for AI Assistant panel visibility
  const [showAiAssistant, setShowAiAssistant] = useState(false);
  // tomiwa: State for currently selected/active plan (for demo purposes)
  const [currentPlan, setCurrentPlan] = useState('pro');
  // tomiwa: State for billing cycle toggle (monthly/yearly)
  const [billingCycle, setBillingCycle] = useState('monthly');
  // tomiwa: NEW - State for Add Card modal visibility
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  // tomiwa: NEW - State for booking history modal/view
  const [showBookingHistory, setShowBookingHistory] = useState(false);
  // tomiwa: NEW - State for plan change confirmation modal
  const [showPlanChangeModal, setShowPlanChangeModal] = useState(false);
  const [selectedNewPlan, setSelectedNewPlan] = useState(null);

  // tomiwa: NEW - Function to handle plan upgrade/change
  const handlePlanChange = (planId) => {
    if (planId !== currentPlan) {
      setSelectedNewPlan(planId);
      setShowPlanChangeModal(true);
    }
  };

  // tomiwa: NEW - Function to confirm plan change
  const confirmPlanChange = () => {
    if (selectedNewPlan) {
      setCurrentPlan(selectedNewPlan);
      setShowPlanChangeModal(false);
      setSelectedNewPlan(null);
    }
  };

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
                Subscription & Billing
              </h1>
              {/* tomiwa: Subtitle in uniform style */}
              <p className="text-[#D9E5E6] text-base 
                           sm:text-lg 
                           md:text-lg 
                           lg:text-xl 
                           leading-relaxed max-w-2xl">
                Manage your subscription plan, view billing history, and update payment methods
              </p>
            </div>
            {/* tomiwa: AI Assistant toggle button */}
            <button
              onClick={() => setShowAiAssistant(!showAiAssistant)}
              className={`inline-flex items-center gap-2 px-6 py-3 font-semibold rounded-xl transition-all duration-300 shadow-lg hover:scale-105 ${
                showAiAssistant 
                  ? 'bg-brand-yellow text-brand-black' 
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <SparklesIcon className="w-5 h-5" />
              AI Assistant
            </button>
          </div>
        </div>
      </div>

      {/* tomiwa: Main content area */}
      <main className="max-w-7xl mx-auto px-6 sm:px-8 md:px-10 lg:px-12 py-8 sm:py-10 md:py-12">
        
        {/* ================================================================ */}
        {/* SECTION 1: Current Plan Overview Card - UPDATED CLEANER LAYOUT  */}
        {/* tomiwa: Simple, clean Pro plan card with text-based benefits    */}
        {/* ================================================================ */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          {/* tomiwa: UPDATED - Clean single-row layout with plan info */}
          <div className="p-6 sm:p-8">
            {/* tomiwa: Top row - Plan name, status, price, and manage button */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-6 pb-6 border-b border-neutral-200">
              {/* tomiwa: Left side - Plan icon and details */}
              <div className="flex items-center gap-4">
                {/* tomiwa: Plan icon with aqua background */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-brand-aqua/10 rounded-2xl flex items-center justify-center">
                  <BoltIcon className="w-7 h-7 sm:w-8 sm:h-8 text-brand-aqua" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="text-2xl sm:text-3xl font-display font-bold text-brand-black">
                      {currentUsage.plan} Plan
                    </h2>
                    {/* tomiwa: Active status badge */}
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">
                      {currentUsage.status}
                    </span>
                  </div>
                  {/* tomiwa: updated - Changed price display to NERA currency */}
                  <p className="text-neutral-600 text-sm sm:text-base">
                    <span className="font-semibold text-brand-black">₦{billingCycle === 'yearly' ? '12,000' : '15,000'}/month</span>
                    <span className="mx-2">•</span>
                    Renews on {currentUsage.renewalDate}
                  </p>
                </div>
              </div>
              
              {/* tomiwa: Right side - Action buttons */}
              {/* updated: Made buttons link to dedicated sub-pages for better UX */}
              <div className="flex items-center gap-3">
                {/* tomiwa: NEW - Link to Change Plan page */}
                <Link 
                  href="/dashboard/candidate/subscription/change-plan"
                  className="px-5 py-2.5 border-2 border-neutral-200 text-neutral-600 hover:border-brand-aqua hover:text-brand-aqua font-semibold rounded-xl transition-colors"
                >
                  Change Plan
                </Link>
                {/* tomiwa: NEW - Link to Manage Billing page */}
                <Link 
                  href="/dashboard/candidate/subscription/billing"
                  className="px-5 py-2.5 bg-brand-aqua text-white font-semibold rounded-xl hover:bg-[#2BA6AD] transition-colors"
                >
                  Manage Billing
                </Link>
              </div>
            </div>

            {/* tomiwa: UPDATED - Benefits as simple inline text badges */}
            <div>
              <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-4">
                What&apos;s Included in Your Plan
              </h3>
              {/* tomiwa: Benefits displayed as flowing inline badges */}
              <div className="flex flex-wrap gap-3">
                {[
                  { text: 'Unlimited Applications', icon: CheckCircleIcon },
                  { text: 'AI Cover Letters', icon: SparklesIcon },
                  { text: 'AI Interview Coach', icon: CpuChipIcon },
                  { text: 'Resume Enhancement', icon: DocumentArrowDownIcon },
                  { text: 'Priority Support', icon: ShieldCheckIcon },
                  { text: 'SMS & Email Alerts', icon: BoltIcon },
                ].map((benefit, index) => {
                  const IconComponent = benefit.icon;
                  return (
                    <div 
                      key={index} 
                      className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 text-brand-aqua rounded-full text-sm font-medium"
                    >
                      <IconComponent className="w-4 h-4" />
                      {benefit.text}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* tomiwa: UPDATED - Quick stats row at bottom */}
            <div className="mt-6 pt-6 border-t border-neutral-200">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {/* tomiwa: AI Tools Usage stat */}
                <div className="text-center p-3 bg-neutral-50 rounded-xl">
                  <p className="text-2xl font-bold text-brand-aqua">{currentUsage.aiToolsUsed}</p>
                  <p className="text-xs text-neutral-600">AI Tools Used</p>
                </div>
                {/* tomiwa: Applications stat */}
                <div className="text-center p-3 bg-neutral-50 rounded-xl">
                  <p className="text-2xl font-bold text-brand-orange">{currentUsage.applicationsSubmitted}</p>
                  <p className="text-xs text-neutral-600">Applications</p>
                </div>
                {/* tomiwa: Interviews stat */}
                <div className="text-center p-3 bg-neutral-50 rounded-xl">
                  <p className="text-2xl font-bold text-brand-yellow">{currentUsage.interviewsBooked}</p>
                  <p className="text-xs text-neutral-600">Interviews</p>
                </div>
                {/* tomiwa: Next billing amount */}
                <div className="text-center p-3 bg-neutral-50 rounded-xl">
                  <p className="text-2xl font-bold text-brand-black">{currentUsage.nextAmount}</p>
                  <p className="text-xs text-neutral-600">Next Bill</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================================================================ */}
        {/* SECTION 2: Plan Comparison Cards                                 */}
        {/* tomiwa: Three pricing tiers with features comparison             */}
        {/* updated: Added id for scroll-to functionality                    */}
        {/* ================================================================ */}
        <div id="plans-section" className="mb-8 scroll-mt-8">
          {/* tomiwa: Section header with billing cycle toggle */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <StarSolidIcon className="w-7 h-7 text-brand-yellow" />
              <h2 className="text-2xl font-display font-bold text-brand-black">Choose Your Plan</h2>
            </div>
            
            {/* tomiwa: Monthly/Yearly toggle switch */}
            <div className="flex items-center gap-3 bg-neutral-100 p-1 rounded-xl">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  billingCycle === 'monthly' 
                    ? 'bg-white text-brand-black shadow-md' 
                    : 'text-neutral-600 hover:text-brand-black'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  billingCycle === 'yearly' 
                    ? 'bg-white text-brand-black shadow-md' 
                    : 'text-neutral-600 hover:text-brand-black'
                }`}
              >
                Yearly
                <span className="px-2 py-0.5 bg-brand-orange text-white text-xs font-bold rounded-full">
                  Save 20%
                </span>
              </button>
            </div>
          </div>

          {/* tomiwa: Pricing cards grid - responsive for all screen sizes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {subscriptionPlans.map((plan) => {
              const IconComponent = plan.icon;
              const isCurrentPlan = plan.id === currentPlan;
              
              return (
                <div
                  key={plan.id}
                  className={`relative bg-white rounded-2xl shadow-lg p-6 sm:p-8 transition-all duration-300 hover:shadow-xl ${
                    plan.popular ? 'ring-2 ring-brand-aqua' : ''
                  } ${isCurrentPlan ? 'ring-2 ring-brand-orange' : ''}`}
                >
                  {/* tomiwa: Popular badge for Pro plan */}
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="px-4 py-1 bg-brand-aqua text-white text-xs font-bold rounded-full shadow-lg">
                        MOST POPULAR
                      </span>
                    </div>
                  )}
                  
                  {/* tomiwa: Current plan indicator */}
                  {isCurrentPlan && (
                    <div className="absolute -top-4 right-4">
                      <span className="px-3 py-1 bg-brand-orange text-white text-xs font-bold rounded-full shadow-lg">
                        CURRENT
                      </span>
                    </div>
                  )}

                  {/* tomiwa: Plan icon */}
                  <div className={`w-14 h-14 ${plan.iconBg} rounded-xl flex items-center justify-center mb-4`}>
                    <IconComponent className={`w-7 h-7 ${plan.iconColor}`} />
                  </div>

                  {/* tomiwa: Plan name and price */}
                  {/* updated: Changed to display NERA (₦) currency properly */}
                  <h3 className="text-xl font-display font-bold text-brand-black mb-2">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-1 mb-3">
                    <span className="text-4xl font-display font-bold text-brand-black">
                      {/* tomiwa: Calculate yearly discount price in NERA */}
                      {billingCycle === 'yearly' && plan.priceValue > 0 
                        ? `₦${Math.round(plan.priceValue * 0.8).toLocaleString()}` 
                        : plan.price}
                    </span>
                    <span className="text-neutral-600">
                      {plan.period === 'forever' ? '/forever' : plan.period}
                    </span>
                  </div>
                  <p className="text-neutral-600 text-sm mb-6">
                    {plan.description}
                  </p>

                  {/* tomiwa: Features list with checkmarks/x marks */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        {feature.included ? (
                          <CheckCircleIcon className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        ) : (
                          <XCircleIcon className="w-5 h-5 text-neutral-300 flex-shrink-0 mt-0.5" />
                        )}
                        <span className={`text-sm ${feature.included ? 'text-neutral-700' : 'text-neutral-400'}`}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* tomiwa: CTA button */}
                  {/* updated: Made button trigger plan change modal for upgrade/downgrade */}
                  <button
                    onClick={() => !isCurrentPlan && handlePlanChange(plan.id)}
                    className={`w-full py-3 px-6 rounded-xl font-semibold text-sm transition-all duration-300 ${
                      isCurrentPlan 
                        ? 'bg-neutral-200 text-neutral-600 cursor-default' 
                        : plan.ctaStyle
                    }`}
                    disabled={isCurrentPlan}
                  >
                    {isCurrentPlan ? 'Current Plan' : plan.cta}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================================================================ */}
        {/* SECTION 3: Billing History - UPDATED TO FULL WIDTH              */}
        {/* tomiwa: Full width billing history table                        */}
        {/* updated: Added id for scroll-to functionality                   */}
        {/* ================================================================ */}
        <div id="billing-history-section" className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8 scroll-mt-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <ClockIcon className="w-7 h-7 text-brand-aqua" />
              <h2 className="text-2xl font-display font-bold text-brand-black">Billing History</h2>
            </div>
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 text-brand-aqua hover:bg-brand-aqua hover:text-white font-medium rounded-xl transition-all duration-300">
              <DocumentArrowDownIcon className="w-5 h-5" />
              Download All
            </button>
          </div>

          {/* tomiwa: UPDATED - Responsive table for billing history with better spacing */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-neutral-50">
                  <th className="text-left py-4 px-4 text-sm font-semibold text-neutral-600 rounded-l-xl">Invoice</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-neutral-600">Date</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-neutral-600 hidden md:table-cell">Description</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-neutral-600">Amount</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-neutral-600">Status</th>
                  <th className="text-right py-4 px-4 text-sm font-semibold text-neutral-600 rounded-r-xl">Action</th>
                </tr>
              </thead>
              <tbody>
                {billingHistory.map((invoice, index) => (
                  <tr 
                    key={invoice.id} 
                    className={`border-b border-neutral-100 hover:bg-neutral-50 transition-colors ${
                      index === billingHistory.length - 1 ? 'border-b-0' : ''
                    }`}
                  >
                    <td className="py-4 px-4">
                      <span className="text-sm font-medium text-brand-black">{invoice.id}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-neutral-600">{invoice.date}</span>
                    </td>
                    <td className="py-4 px-4 hidden md:table-cell">
                      <span className="text-sm text-neutral-600">{invoice.description}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm font-semibold text-brand-black">{invoice.amount}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">
                        {invoice.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button className="p-2 text-neutral-500 hover:text-brand-aqua hover:bg-primary-50 rounded-lg transition-colors">
                        <DocumentArrowDownIcon className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* tomiwa: UPDATED - View more link for billing history */}
          {/* updated: Changed to Link component for navigation to invoices page */}
          <div className="mt-4 pt-4 border-t border-neutral-100 text-center">
            <Link 
              href="/dashboard/candidate/subscription/invoices"
              className="text-sm text-brand-aqua hover:text-brand-orange font-medium transition-colors"
            >
              View All Invoices →
            </Link>
          </div>
        </div>

        {/* ================================================================ */}
        {/* SECTION 4: Payment Methods - UPDATED TO FULL WIDTH              */}
        {/* tomiwa: Full width payment methods card                         */}
        {/* ================================================================ */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <CreditCardIcon className="w-7 h-7 text-brand-aqua" />
              <h2 className="text-2xl font-display font-bold text-brand-black">Payment Methods</h2>
            </div>
            {/* tomiwa: UPDATED - Add new card button in header */}
            {/* updated: Made button trigger add card modal */}
            <button 
              onClick={() => setShowAddCardModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-brand-aqua text-white font-medium rounded-xl hover:bg-[#2BA6AD] transition-all duration-300"
            >
              <PlusCircleIcon className="w-5 h-5" />
              Add New Card
            </button>
          </div>

          {/* tomiwa: UPDATED - Payment cards in a responsive grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {paymentMethods.map((card) => (
              <div 
                key={card.id} 
                className={`p-5 rounded-xl border-2 transition-all duration-300 ${
                  card.isDefault 
                    ? 'border-brand-aqua bg-primary-50' 
                    : 'border-neutral-200 hover:border-neutral-300 bg-white'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  {/* tomiwa: Card brand icon - larger and more prominent */}
                  <div className={`w-14 h-10 rounded-lg flex items-center justify-center ${
                    card.type === 'visa' ? 'bg-blue-600' : 'bg-orange-500'
                  }`}>
                    <span className="text-white text-sm font-bold uppercase">
                      {card.type === 'visa' ? 'VISA' : 'MC'}
                    </span>
                  </div>
                  {/* tomiwa: Default badge */}
                  {card.isDefault && (
                    <span className="px-3 py-1 bg-brand-aqua text-white text-xs font-bold rounded-full">
                      Default
                    </span>
                  )}
                </div>
                
                {/* tomiwa: Card details */}
                <p className="text-lg font-semibold text-brand-black mb-1">
                  •••• •••• •••• {card.last4}
                </p>
                <p className="text-sm text-neutral-500 mb-4">Expires {card.expiry}</p>
                
                {/* tomiwa: Card actions */}
                <div className="flex items-center gap-2 pt-4 border-t border-neutral-200">
                  {!card.isDefault && (
                    <button className="flex-1 py-2 text-sm text-brand-aqua hover:bg-primary-50 rounded-lg font-medium transition-colors">
                      Set as Default
                    </button>
                  )}
                  <button className="p-2 text-neutral-400 hover:text-brand-aqua hover:bg-primary-50 rounded-lg transition-colors">
                    <PencilSquareIcon className="w-5 h-5" />
                  </button>
                  {!card.isDefault && (
                    <button className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            ))}

            {/* tomiwa: UPDATED - Add new payment method card placeholder */}
            {/* updated: Made card clickable to open add card modal */}
            <div 
              onClick={() => setShowAddCardModal(true)}
              className="p-5 rounded-xl border-2 border-dashed border-neutral-300 hover:border-brand-aqua transition-all duration-300 flex flex-col items-center justify-center min-h-[180px] cursor-pointer group"
            >
              <div className="w-12 h-12 bg-neutral-100 group-hover:bg-primary-50 rounded-full flex items-center justify-center mb-3 transition-colors">
                <PlusCircleIcon className="w-6 h-6 text-neutral-400 group-hover:text-brand-aqua transition-colors" />
              </div>
              <p className="text-neutral-600 group-hover:text-brand-aqua font-medium text-sm transition-colors">
                Add Payment Method
              </p>
            </div>
          </div>

          {/* tomiwa: Security note - full width banner style */}
          <div className="p-4 bg-emerald-50 rounded-xl">
            <div className="flex items-center gap-3">
              <ShieldCheckIcon className="w-6 h-6 text-emerald-500 flex-shrink-0" />
              <div>
                <p className="text-sm text-neutral-700">
                  <span className="font-semibold text-emerald-700">Secure & Encrypted</span> — Your payment information is protected with industry-standard encryption. We never store your full card number.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ================================================================ */}
        {/* SECTION 5: AI Assistant Panel (Toggleable)                       */}
        {/* tomiwa: Shows AI-powered subscription recommendations            */}
        {/* ================================================================ */}
        {showAiAssistant && (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* tomiwa: AI Assistant header with gradient */}
            <div className="bg-gradient-to-r from-brand-yellow to-brand-orange p-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                  <SparklesIcon className="w-7 h-7 text-brand-black" />
                </div>
                <div>
                  <h2 className="text-xl font-display font-bold text-brand-black">AI Subscription Advisor</h2>
                  <p className="text-brand-black/80">Personalized recommendations based on your usage</p>
                </div>
              </div>
            </div>

            {/* tomiwa: AI recommendations content */}
            <div className="p-6 sm:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* tomiwa: Usage Analysis Card */}
                <div className="p-6 bg-primary-50 rounded-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <ChartBarIcon className="w-6 h-6 text-brand-aqua" />
                    <h3 className="font-semibold text-brand-black">Usage Analysis</h3>
                  </div>
                  <p className="text-sm text-neutral-700 mb-4">
                    Based on your activity this month, you've used <span className="font-bold text-brand-aqua">45%</span> of your AI tool quota. 
                    You're on track to use approximately <span className="font-bold">90 uses</span> by month end.
                  </p>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckIcon className="w-4 h-4 text-emerald-500" />
                    <span className="text-neutral-600">Your current plan fits your usage well</span>
                  </div>
                </div>

                {/* tomiwa: Recommendation Card */}
                <div className="p-6 bg-accent-50 rounded-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <StarSolidIcon className="w-6 h-6 text-brand-yellow" />
                    <h3 className="font-semibold text-brand-black">My Recommendation</h3>
                  </div>
                  <p className="text-sm text-neutral-700 mb-4">
                    Your interview activity is increasing! Consider upgrading to <span className="font-bold text-brand-orange">Premium</span> for 
                    access to video interview practice and personal career coaching.
                  </p>
                  <button className="w-full py-2 bg-brand-orange hover:bg-[#BF4225] text-white rounded-lg font-medium text-sm transition-colors">
                    Explore Premium Benefits
                  </button>
                </div>

                {/* tomiwa: Savings Tip Card */}
                {/* updated: Changed savings amount from USD to NERA */}
                <div className="p-6 bg-secondary-50 rounded-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <ArrowPathIcon className="w-6 h-6 text-brand-orange" />
                    <h3 className="font-semibold text-brand-black">Save More</h3>
                  </div>
                  <p className="text-sm text-neutral-700 mb-4">
                    Switch to <span className="font-bold">yearly billing</span> and save 
                    <span className="font-bold text-brand-orange"> ₦36,000</span> per year on your Pro plan!
                  </p>
                  <button 
                    onClick={() => setBillingCycle('yearly')}
                    className="w-full py-2 border-2 border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white rounded-lg font-medium text-sm transition-colors"
                  >
                    Switch to Yearly
                  </button>
                </div>

                {/* tomiwa: Support Card */}
                <div className="p-6 bg-neutral-100 rounded-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <UserGroupIcon className="w-6 h-6 text-neutral-600" />
                    <h3 className="font-semibold text-brand-black">Need Help?</h3>
                  </div>
                  <p className="text-sm text-neutral-700 mb-4">
                    Have questions about your subscription or need help choosing the right plan? 
                    Our support team is here to help!
                  </p>
                  <button className="w-full py-2 border-2 border-neutral-300 text-neutral-700 hover:border-brand-aqua hover:text-brand-aqua rounded-lg font-medium text-sm transition-colors">
                    Contact Support
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* tomiwa: Cancel subscription link (subtle placement) */}
        <div className="mt-8 text-center">
          <button className="text-sm text-neutral-500 hover:text-red-500 transition-colors">
            Need to cancel your subscription?
          </button>
        </div>

      </main>

      {/* ================================================================ */}
      {/* tomiwa: NEW - Plan Change Confirmation Modal                     */}
      {/* updated: Modal for confirming plan upgrade/downgrade            */}
      {/* ================================================================ */}
      {showPlanChangeModal && selectedNewPlan && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 animate-in fade-in zoom-in duration-300">
            {/* tomiwa: Modal header */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-brand-aqua/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <ArrowPathIcon className="w-8 h-8 text-brand-aqua" />
              </div>
              <h3 className="text-xl font-display font-bold text-brand-black mb-2">
                Change Your Plan
              </h3>
              <p className="text-neutral-600 text-sm">
                You&apos;re about to switch to the <span className="font-bold text-brand-aqua capitalize">{selectedNewPlan}</span> plan.
              </p>
            </div>

            {/* tomiwa: Plan details */}
            <div className="bg-neutral-50 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-neutral-600">New Plan</span>
                <span className="font-semibold text-brand-black capitalize">{selectedNewPlan}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-600">New Price</span>
                <span className="font-semibold text-brand-aqua">
                  {subscriptionPlans.find(p => p.id === selectedNewPlan)?.price}/month
                </span>
              </div>
            </div>

            {/* tomiwa: Action buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowPlanChangeModal(false);
                  setSelectedNewPlan(null);
                }}
                className="flex-1 px-5 py-3 border-2 border-neutral-200 text-neutral-600 hover:border-neutral-300 font-semibold rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmPlanChange}
                className="flex-1 px-5 py-3 bg-brand-aqua text-white font-semibold rounded-xl hover:bg-[#2BA6AD] transition-colors"
              >
                Confirm Change
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* tomiwa: NEW - Add Payment Card Modal                             */}
      {/* updated: Modal for adding a new payment method                  */}
      {/* ================================================================ */}
      {showAddCardModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 sm:p-8 animate-in fade-in zoom-in duration-300">
            {/* tomiwa: Modal header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-brand-aqua/10 rounded-xl flex items-center justify-center">
                  <CreditCardIcon className="w-6 h-6 text-brand-aqua" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold text-brand-black">
                    Add Payment Method
                  </h3>
                  <p className="text-sm text-neutral-500">Enter your card details below</p>
                </div>
              </div>
              <button
                onClick={() => setShowAddCardModal(false)}
                className="w-10 h-10 rounded-full hover:bg-neutral-100 flex items-center justify-center transition-colors"
              >
                <XCircleIcon className="w-6 h-6 text-neutral-400" />
              </button>
            </div>

            {/* tomiwa: Card form */}
            <form className="space-y-4">
              {/* tomiwa: Card number field */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                  Card Number
                </label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-brand-aqua focus:border-brand-aqua transition-all text-brand-black placeholder:text-neutral-400"
                />
              </div>

              {/* tomiwa: Cardholder name field */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-brand-aqua focus:border-brand-aqua transition-all text-brand-black placeholder:text-neutral-400"
                />
              </div>

              {/* tomiwa: Expiry and CVV row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-brand-aqua focus:border-brand-aqua transition-all text-brand-black placeholder:text-neutral-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                    CVV
                  </label>
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-brand-aqua focus:border-brand-aqua transition-all text-brand-black placeholder:text-neutral-400"
                  />
                </div>
              </div>

              {/* tomiwa: Set as default checkbox */}
              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="setDefault"
                  className="w-5 h-5 rounded border-neutral-300 text-brand-aqua focus:ring-brand-aqua"
                />
                <label htmlFor="setDefault" className="text-sm text-neutral-700">
                  Set as default payment method
                </label>
              </div>

              {/* tomiwa: Security notice */}
              <div className="flex items-center gap-2 pt-2 text-sm text-neutral-500">
                <ShieldCheckIcon className="w-4 h-4 text-emerald-500" />
                <span>Your payment information is securely encrypted</span>
              </div>

              {/* tomiwa: Action buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddCardModal(false)}
                  className="flex-1 px-5 py-3 border-2 border-neutral-200 text-neutral-600 hover:border-neutral-300 font-semibold rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    // tomiwa: In a real app, this would submit to payment processor
                    setShowAddCardModal(false);
                  }}
                  className="flex-1 px-5 py-3 bg-brand-aqua text-white font-semibold rounded-xl hover:bg-[#2BA6AD] transition-colors"
                >
                  Add Card
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </CandidateDashboardLayout>
  );
}
