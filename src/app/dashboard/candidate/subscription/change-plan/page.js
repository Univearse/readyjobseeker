/**
 * File: src/app/dashboard/candidate/subscription/change-plan/page.js
 * 
 * tomiwa: NEW - Change Plan Page
 * A dedicated page for viewing, comparing, and changing subscription plans.
 * Provides detailed feature comparison and smooth upgrade/downgrade process.
 * 
 * Layout Structure:
 * ================
 * HERO BANNER: Aqua-to-teal gradient (matching subscription page)
 *              - Title: "Change Your Plan"
 *              - Subtitle: Plan selection description
 *              - Back button to subscription page
 * 
 * SECTION 1: Current Plan Summary
 *            - Shows what plan user is currently on
 *            - Quick action to stay on current plan
 * 
 * SECTION 2: Plan Comparison Cards (3 columns)
 *            - Free, Pro, and Premium plans
 *            - Feature lists with checkmarks
 *            - Upgrade/Downgrade buttons
 * 
 * SECTION 3: Feature Comparison Table
 *            - Detailed side-by-side comparison
 *            - All features across all plans
 * 
 * SECTION 4: FAQ Section
 *            - Common questions about plan changes
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import CandidateDashboardLayout from '@/components/layouts/CandidateDashboardLayout.jsx';
import { 
  ArrowLeftIcon,
  CheckCircleIcon,
  XCircleIcon,
  RocketLaunchIcon,
  BoltIcon,
  StarIcon,
  SparklesIcon,
  ShieldCheckIcon,
  ArrowPathIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ExclamationTriangleIcon,
  CheckIcon,
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon, CheckIcon as CheckSolidIcon } from '@heroicons/react/24/solid';

// tomiwa: NEW - Mock data for subscription plans
// ExistingCode: This defines the three subscription tiers available to users
const subscriptionPlans = [
  {
    id: 'free',
    name: 'Free',
    price: '₦0',
    priceValue: 0,
    yearlyPrice: '₦0',
    period: 'forever',
    description: 'Perfect for getting started with your job search',
    icon: RocketLaunchIcon,
    iconBg: 'bg-neutral-100',
    iconColor: 'text-neutral-600',
    cardBg: 'bg-white',
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
    popular: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '₦15,000',
    priceValue: 15000,
    yearlyPrice: '₦12,000',
    yearlyPriceValue: 12000,
    period: '/month',
    description: 'Unlock AI tools to supercharge your job search',
    icon: BoltIcon,
    iconBg: 'bg-brand-aqua/10',
    iconColor: 'text-brand-aqua',
    cardBg: 'bg-white',
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
    popular: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '₦45,000',
    priceValue: 45000,
    yearlyPrice: '₦36,000',
    yearlyPriceValue: 36000,
    period: '/month',
    description: 'For serious job seekers who want every advantage',
    icon: StarIcon,
    iconBg: 'bg-brand-orange/10',
    iconColor: 'text-brand-orange',
    cardBg: 'bg-gradient-to-br from-brand-orange/5 to-brand-yellow/5',
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
    popular: false,
  },
];

// tomiwa: NEW - Detailed feature comparison data
const featureComparison = [
  { feature: 'Job Applications', free: '5/month', pro: 'Unlimited', premium: 'Unlimited' },
  { feature: 'Resume Builder', free: 'Basic', pro: 'Advanced', premium: 'Advanced + AI' },
  { feature: 'Job Search & Filters', free: '✓', pro: '✓', premium: '✓' },
  { feature: 'Email Notifications', free: '✓', pro: '✓', premium: '✓' },
  { feature: 'SMS Notifications', free: '✗', pro: '✓', premium: '✓' },
  { feature: 'AI Cover Letter Generator', free: '✗', pro: '✓', premium: 'Unlimited' },
  { feature: 'AI Interview Coach', free: '✗', pro: '✓', premium: 'Unlimited' },
  { feature: 'Resume AI Enhancement', free: '✗', pro: '✓', premium: 'Unlimited' },
  { feature: 'Personal Career Coach', free: '✗', pro: '✗', premium: '✓' },
  { feature: 'Salary Negotiation Tools', free: '✗', pro: '✗', premium: '✓' },
  { feature: 'Company Research & Insights', free: '✗', pro: '✗', premium: '✓' },
  { feature: 'Profile Boost to Employers', free: '✗', pro: '✗', premium: '✓' },
  { feature: 'Video Interview Practice', free: '✗', pro: '✗', premium: '✓' },
  { feature: 'Support', free: 'Email', pro: 'Priority Email', premium: '24/7 Priority' },
];

// tomiwa: NEW - FAQ data for plan changes
const faqs = [
  {
    question: 'What happens when I upgrade my plan?',
    answer: 'When you upgrade, you\'ll get immediate access to all the new features. Your billing will be prorated, so you only pay the difference for the remaining days in your current billing cycle.',
  },
  {
    question: 'Can I downgrade my plan?',
    answer: 'Yes, you can downgrade at any time. Your current plan features will remain active until the end of your billing cycle, then the new plan will take effect.',
  },
  {
    question: 'Will I lose my data if I downgrade?',
    answer: 'No, your data is safe! You\'ll retain access to all your documents, applications, and history. However, some AI-generated content may become view-only on lower plans.',
  },
  {
    question: 'Can I get a refund if I\'m not satisfied?',
    answer: 'We offer a 7-day money-back guarantee for first-time subscribers. If you\'re not satisfied within the first 7 days, contact support for a full refund.',
  },
  {
    question: 'How does yearly billing work?',
    answer: 'With yearly billing, you pay for 12 months upfront and save 20% compared to monthly billing. Your subscription will automatically renew after one year.',
  },
];

export default function ChangePlan() {
  // tomiwa: State for billing cycle toggle (monthly/yearly)
  const [billingCycle, setBillingCycle] = useState('monthly');
  // tomiwa: State for currently selected/active plan
  const [currentPlan, setCurrentPlan] = useState('pro');
  // tomiwa: State for plan change confirmation modal
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedNewPlan, setSelectedNewPlan] = useState(null);
  // tomiwa: State for FAQ accordion
  // tomiwa: UPDATED - Changed from single index to array to support opening multiple FAQs at once
  const [openFaqs, setOpenFaqs] = useState([]);

  // tomiwa: NEW - Function to handle plan selection
  const handlePlanSelect = (planId) => {
    if (planId !== currentPlan) {
      setSelectedNewPlan(planId);
      setShowConfirmModal(true);
    }
  };

  // tomiwa: NEW - Function to confirm plan change
  const confirmPlanChange = () => {
    if (selectedNewPlan) {
      setCurrentPlan(selectedNewPlan);
      setShowConfirmModal(false);
      setSelectedNewPlan(null);
    }
  };

  // tomiwa: NEW - Get the current plan object
  const currentPlanDetails = subscriptionPlans.find(p => p.id === currentPlan);

  return (
    <CandidateDashboardLayout>
      {/* tomiwa: HERO BANNER - Matching subscription page design */}
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
              {/* tomiwa: Back navigation link */}
              <Link 
                href="/dashboard/candidate/subscription"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
              >
                <ArrowLeftIcon className="w-4 h-4" />
                <span className="text-sm font-medium">Back to Subscription</span>
              </Link>
              {/* tomiwa: Main heading with Monument Extended font */}
              <h1 className="text-3xl 
                            sm:text-4xl 
                            md:text-4xl 
                            lg:text-5xl 
                            font-display font-bold text-white mb-2">
                Change Your Plan
              </h1>
              {/* tomiwa: Subtitle in uniform style */}
              <p className="text-[#D9E5E6] text-base 
                           sm:text-lg 
                           md:text-lg 
                           lg:text-xl 
                           leading-relaxed max-w-2xl">
                Compare plans and choose the one that best fits your job search needs
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* tomiwa: Main content area */}
      <main className="max-w-7xl mx-auto px-6 sm:px-8 md:px-10 lg:px-12 py-8 sm:py-10 md:py-12">
        
        {/* ================================================================ */}
        {/* SECTION 1: Current Plan Summary                                  */}
        {/* tomiwa: Shows what plan user is currently on                     */}
        {/* ================================================================ */}
        <div className="bg-gradient-to-r from-brand-aqua/10 to-brand-aqua/5 rounded-2xl p-6 sm:p-8 mb-8 border border-brand-aqua/20">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 ${currentPlanDetails?.iconBg} rounded-xl flex items-center justify-center`}>
                {currentPlanDetails && <currentPlanDetails.icon className={`w-7 h-7 ${currentPlanDetails.iconColor}`} />}
              </div>
              <div>
                <p className="text-sm text-neutral-500 mb-1">Your Current Plan</p>
                <h2 className="text-2xl font-display font-bold text-brand-black">
                  {currentPlanDetails?.name} Plan
                </h2>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-4 py-2 bg-emerald-100 text-emerald-700 text-sm font-bold rounded-full">
                Active
              </span>
              <Link 
                href="/dashboard/candidate/subscription"
                className="px-5 py-2.5 border-2 border-brand-aqua text-brand-aqua hover:bg-brand-aqua hover:text-white font-semibold rounded-xl transition-colors"
              >
                Keep Current Plan
              </Link>
            </div>
          </div>
        </div>

        {/* ================================================================ */}
        {/* SECTION 2: Plan Selection Cards                                  */}
        {/* tomiwa: Three pricing tiers with features comparison             */}
        {/* ================================================================ */}
        <div className="mb-12">
          {/* tomiwa: Section header with billing cycle toggle */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h2 className="text-2xl font-display font-bold text-brand-black">
              Choose Your New Plan
            </h2>
            
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
              const isUpgrade = subscriptionPlans.findIndex(p => p.id === plan.id) > subscriptionPlans.findIndex(p => p.id === currentPlan);
              const isDowngrade = subscriptionPlans.findIndex(p => p.id === plan.id) < subscriptionPlans.findIndex(p => p.id === currentPlan);
              
              return (
                <div
                  key={plan.id}
                  className={`relative ${plan.cardBg} rounded-2xl shadow-lg p-6 sm:p-8 transition-all duration-300 hover:shadow-xl ${
                    plan.popular ? 'ring-2 ring-brand-aqua' : ''
                  } ${isCurrentPlan ? 'ring-2 ring-emerald-500' : ''}`}
                >
                  {/* tomiwa: Popular badge for Pro plan */}
                  {plan.popular && !isCurrentPlan && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="px-4 py-1 bg-brand-aqua text-white text-xs font-bold rounded-full shadow-lg">
                        MOST POPULAR
                      </span>
                    </div>
                  )}
                  
                  {/* tomiwa: Current plan indicator */}
                  {isCurrentPlan && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="px-4 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1">
                        <CheckSolidIcon className="w-3 h-3" />
                        CURRENT PLAN
                      </span>
                    </div>
                  )}

                  {/* tomiwa: Plan icon */}
                  <div className={`w-14 h-14 ${plan.iconBg} rounded-xl flex items-center justify-center mb-4`}>
                    <IconComponent className={`w-7 h-7 ${plan.iconColor}`} />
                  </div>

                  {/* tomiwa: Plan name and price */}
                  <h3 className="text-xl font-display font-bold text-brand-black mb-2">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-1 mb-3">
                    <span className="text-4xl font-display font-bold text-brand-black">
                      {billingCycle === 'yearly' && plan.priceValue > 0 
                        ? plan.yearlyPrice 
                        : plan.price}
                    </span>
                    <span className="text-neutral-600">
                      {plan.period === 'forever' ? '/forever' : plan.period}
                    </span>
                  </div>
                  {billingCycle === 'yearly' && plan.priceValue > 0 && (
                    <p className="text-sm text-brand-orange font-medium mb-3">
                      Save ₦{((plan.priceValue - (plan.yearlyPriceValue || plan.priceValue * 0.8)) * 12).toLocaleString()}/year
                    </p>
                  )}
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

                  {/* tomiwa: CTA button - different styles for upgrade/downgrade/current */}
                  <button
                    onClick={() => handlePlanSelect(plan.id)}
                    disabled={isCurrentPlan}
                    className={`w-full py-3 px-6 rounded-xl font-semibold text-sm transition-all duration-300 ${
                      isCurrentPlan 
                        ? 'bg-emerald-100 text-emerald-700 cursor-default'
                        : isUpgrade 
                          ? 'bg-brand-aqua hover:bg-[#2BA6AD] text-white'
                          : 'border-2 border-neutral-300 text-neutral-600 hover:border-brand-aqua hover:text-brand-aqua'
                    }`}
                  >
                    {isCurrentPlan 
                      ? '✓ Current Plan' 
                      : isUpgrade 
                        ? `Upgrade to ${plan.name}` 
                        : `Downgrade to ${plan.name}`}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================================================================ */}
        {/* SECTION 3: Feature Comparison Table                              */}
        {/* tomiwa: Detailed side-by-side comparison of all features         */}
        {/* ================================================================ */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8 overflow-hidden">
          <h2 className="text-2xl font-display font-bold text-brand-black mb-6">
            Detailed Feature Comparison
          </h2>

          {/* tomiwa: Responsive table for feature comparison */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="bg-neutral-50">
                  <th className="text-left py-4 px-4 text-sm font-semibold text-neutral-600 rounded-l-xl w-1/3">Feature</th>
                  <th className="text-center py-4 px-4 text-sm font-semibold text-neutral-600">
                    <div className="flex items-center justify-center gap-2">
                      <RocketLaunchIcon className="w-5 h-5" />
                      Free
                    </div>
                  </th>
                  <th className="text-center py-4 px-4 text-sm font-semibold text-brand-aqua bg-brand-aqua/5">
                    <div className="flex items-center justify-center gap-2">
                      <BoltIcon className="w-5 h-5" />
                      Pro
                    </div>
                  </th>
                  <th className="text-center py-4 px-4 text-sm font-semibold text-brand-orange rounded-r-xl">
                    <div className="flex items-center justify-center gap-2">
                      <StarIcon className="w-5 h-5" />
                      Premium
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {featureComparison.map((row, index) => (
                  <tr 
                    key={index}
                    className={`border-b border-neutral-100 ${index === featureComparison.length - 1 ? 'border-b-0' : ''}`}
                  >
                    <td className="py-4 px-4 text-sm text-neutral-700 font-medium">
                      {row.feature}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className={`text-sm ${row.free === '✗' ? 'text-neutral-400' : 'text-neutral-700'}`}>
                        {row.free === '✓' ? (
                          <CheckIcon className="w-5 h-5 text-emerald-500 mx-auto" />
                        ) : row.free === '✗' ? (
                          <span className="text-neutral-300">—</span>
                        ) : (
                          row.free
                        )}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center bg-brand-aqua/5">
                      <span className={`text-sm ${row.pro === '✗' ? 'text-neutral-400' : 'text-neutral-700 font-medium'}`}>
                        {row.pro === '✓' ? (
                          <CheckIcon className="w-5 h-5 text-brand-aqua mx-auto" />
                        ) : row.pro === '✗' ? (
                          <span className="text-neutral-300">—</span>
                        ) : (
                          row.pro
                        )}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className={`text-sm ${row.premium === '✗' ? 'text-neutral-400' : 'text-neutral-700 font-medium'}`}>
                        {row.premium === '✓' ? (
                          <CheckIcon className="w-5 h-5 text-brand-orange mx-auto" />
                        ) : row.premium === '✗' ? (
                          <span className="text-neutral-300">—</span>
                        ) : (
                          row.premium
                        )}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ================================================================ */}
        {/* SECTION 4: FAQ Section                                           */}
        {/* tomiwa: Common questions about plan changes                      */}
        {/* tomiwa: UPDATED - Added Expand All / Collapse All functionality  */}
        {/* ================================================================ */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          {/* tomiwa: NEW - Header row with title and Expand/Collapse All button */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h2 className="text-2xl font-display font-bold text-brand-black">
              Frequently Asked Questions
            </h2>
            {/* tomiwa: NEW - Toggle button to expand/collapse all FAQs */}
            <button
              onClick={() => {
                // tomiwa: If all FAQs are open, close them all. Otherwise, open all.
                if (openFaqs.length === faqs.length) {
                  setOpenFaqs([]); // Collapse all
                } else {
                  setOpenFaqs(faqs.map((_, index) => index)); // Expand all
                }
              }}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-brand-aqua hover:bg-brand-aqua/10 rounded-xl transition-colors"
            >
              {/* tomiwa: Show different icon/text based on current state */}
              {openFaqs.length === faqs.length ? (
                <>
                  <ChevronUpIcon className="w-5 h-5" />
                  Collapse All
                </>
              ) : (
                <>
                  <ChevronDownIcon className="w-5 h-5" />
                  Expand All
                </>
              )}
            </button>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              // tomiwa: NEW - Check if this FAQ is in the openFaqs array
              const isOpen = openFaqs.includes(index);
              
              return (
                <div 
                  key={index}
                  className="border border-neutral-200 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => {
                      // tomiwa: UPDATED - Toggle individual FAQ in the array
                      if (isOpen) {
                        // Remove this FAQ from openFaqs array
                        setOpenFaqs(openFaqs.filter(i => i !== index));
                      } else {
                        // Add this FAQ to openFaqs array
                        setOpenFaqs([...openFaqs, index]);
                      }
                    }}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-neutral-50 transition-colors"
                  >
                    <span className="font-semibold text-brand-black pr-4">{faq.question}</span>
                    {isOpen ? (
                      <ChevronUpIcon className="w-5 h-5 text-neutral-500 flex-shrink-0" />
                    ) : (
                      <ChevronDownIcon className="w-5 h-5 text-neutral-500 flex-shrink-0" />
                    )}
                  </button>
                  {/* tomiwa: UPDATED - Show answer if this FAQ is in openFaqs array */}
                  {isOpen && (
                    <div className="px-4 pb-4">
                      <p className="text-neutral-600 text-sm leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* tomiwa: Back to subscription link */}
        <div className="mt-8 text-center">
          <Link 
            href="/dashboard/candidate/subscription"
            className="inline-flex items-center gap-2 text-brand-aqua hover:text-brand-orange font-medium transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Back to Subscription Overview
          </Link>
        </div>

      </main>

      {/* ================================================================ */}
      {/* tomiwa: NEW - Plan Change Confirmation Modal                     */}
      {/* updated: Modal for confirming plan upgrade/downgrade            */}
      {/* ================================================================ */}
      {showConfirmModal && selectedNewPlan && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 animate-in fade-in zoom-in duration-300">
            {/* tomiwa: Determine if upgrade or downgrade */}
            {(() => {
              const currentIndex = subscriptionPlans.findIndex(p => p.id === currentPlan);
              const newIndex = subscriptionPlans.findIndex(p => p.id === selectedNewPlan);
              const isUpgrade = newIndex > currentIndex;
              const newPlanDetails = subscriptionPlans.find(p => p.id === selectedNewPlan);

              return (
                <>
                  {/* tomiwa: Modal header */}
                  <div className="text-center mb-6">
                    <div className={`w-16 h-16 ${isUpgrade ? 'bg-brand-aqua/10' : 'bg-brand-orange/10'} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      {isUpgrade ? (
                        <SparklesIcon className="w-8 h-8 text-brand-aqua" />
                      ) : (
                        <ExclamationTriangleIcon className="w-8 h-8 text-brand-orange" />
                      )}
                    </div>
                    <h3 className="text-xl font-display font-bold text-brand-black mb-2">
                      {isUpgrade ? 'Upgrade Your Plan' : 'Downgrade Your Plan'}
                    </h3>
                    <p className="text-neutral-600 text-sm">
                      {isUpgrade 
                        ? `You're upgrading to the ${newPlanDetails?.name} plan. You'll get immediate access to all new features!`
                        : `You're downgrading to the ${newPlanDetails?.name} plan. Some features will be limited.`
                      }
                    </p>
                  </div>

                  {/* tomiwa: Plan comparison summary */}
                  <div className="bg-neutral-50 rounded-xl p-4 mb-6">
                    <div className="flex items-center justify-between mb-3 pb-3 border-b border-neutral-200">
                      <div>
                        <p className="text-xs text-neutral-500 mb-1">Current Plan</p>
                        <p className="font-semibold text-brand-black capitalize">{currentPlan}</p>
                      </div>
                      <ArrowPathIcon className="w-5 h-5 text-neutral-400" />
                      <div className="text-right">
                        <p className="text-xs text-neutral-500 mb-1">New Plan</p>
                        <p className="font-semibold text-brand-aqua capitalize">{selectedNewPlan}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-neutral-600">New Price</span>
                      <span className="font-semibold text-brand-black">
                        {billingCycle === 'yearly' && newPlanDetails?.yearlyPrice 
                          ? newPlanDetails.yearlyPrice 
                          : newPlanDetails?.price}/month
                      </span>
                    </div>
                  </div>

                  {/* tomiwa: Warning for downgrade */}
                  {!isUpgrade && (
                    <div className="bg-brand-orange/10 border border-brand-orange/20 rounded-xl p-4 mb-6">
                      <div className="flex items-start gap-3">
                        <ExclamationTriangleIcon className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-brand-orange">
                          Some features will be limited or unavailable after downgrading. Your current plan will remain active until the end of your billing cycle.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* tomiwa: Action buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setShowConfirmModal(false);
                        setSelectedNewPlan(null);
                      }}
                      className="flex-1 px-5 py-3 border-2 border-neutral-200 text-neutral-600 hover:border-neutral-300 font-semibold rounded-xl transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={confirmPlanChange}
                      className={`flex-1 px-5 py-3 font-semibold rounded-xl transition-colors ${
                        isUpgrade 
                          ? 'bg-brand-aqua text-white hover:bg-[#2BA6AD]'
                          : 'bg-brand-orange text-white hover:bg-[#BF4225]'
                      }`}
                    >
                      {isUpgrade ? 'Confirm Upgrade' : 'Confirm Downgrade'}
                    </button>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </CandidateDashboardLayout>
  );
}
