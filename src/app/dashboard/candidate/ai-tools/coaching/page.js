/**
 * File: src/app/dashboard/candidate/ai-tools/coaching/page.js
 * 
 * tomiwa: Career Coaching Landing Page - Redesigned to align with RJS AI Tools design system
 * updated: Implemented strict 12-column grid, improved spacing, new Smart Matching section
 * updated: Enhanced hero with soft aqua gradient and bottom fade
 * updated: Reworked Featured Coaches and Benefits sections with improved hierarchy
 * updated: NEW - Added prominent coach profile cards with "Book Coach" buttons
 * updated: NEW - Each coach card now shows profile info + direct booking button
 * 
 * Features:
 * - Reduced-height hero with aqua gradient + bottom fade for readability
 * - Subheader under page title
 * - Smart Matching (Powered by RJS ATS) section with 4 icon cards
 * - Featured Coaches with full profile cards + "View Profile" and "Book Coach" buttons
 * - Why Career Coaching? section with improved card hierarchy
 * - Full responsiveness across all breakpoints
 */

'use client';

import React from 'react';
import Link from 'next/link';
import CandidateDashboardLayout from '@/components/layouts/CandidateDashboardLayout.jsx';
import {
  UserGroupIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  SparklesIcon,
  ChatBubbleLeftRightIcon,
  LightBulbIcon,
  RocketLaunchIcon,
  ClockIcon,
  CheckBadgeIcon,
  CpuChipIcon,
  AdjustmentsHorizontalIcon,
  UserIcon,
  ShieldCheckIcon,
  CalendarDaysIcon,
  BriefcaseIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';

export default function CoachingPage() {
  // tomiwa: Featured coaches data - showcasing top coaches across specialties
  // updated: NEW - Added more details for profile display including title, bio snippet, experience
  // updated: Changed all prices from USD ($) to NERA (₦) currency
  const featuredCoaches = [
    {
      id: 1,
      name: 'Dr. Sarah Mitchell',
      title: 'Executive Career Coach',
      specialty: 'Tech',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
      rating: 4.9,
      reviews: 127,
      sessionsCompleted: 450,
      yearsExperience: 15,
      available: 'Tomorrow',
      availableStatus: 'soon',
      tags: ['Career Transition', 'Executive Coaching', 'Salary Negotiation'],
      bio: 'Former HR Director at Fortune 500 companies helping professionals land executive roles.',
      verified: true,
      price: 25000 // tomiwa: Price in NERA (₦25,000)
    },
    {
      id: 2,
      name: 'James Okonkwo',
      title: 'Tech Interview Specialist',
      specialty: 'Design',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      rating: 4.8,
      reviews: 89,
      sessionsCompleted: 320,
      yearsExperience: 10,
      available: 'Today',
      availableStatus: 'today',
      tags: ['Tech Interviews', 'System Design', 'FAANG Prep'],
      bio: 'Senior engineer turned coach with experience at top tech companies.',
      verified: true,
      price: 25000 // tomiwa: Price in NERA (₦25,000)
    },
    {
      id: 3,
      name: 'Emma Thompson',
      title: 'Resume & Branding Expert',
      specialty: 'Hospitality',
      photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop',
      rating: 4.9,
      reviews: 156,
      sessionsCompleted: 580,
      yearsExperience: 12,
      available: 'Today',
      availableStatus: 'today',
      tags: ['Resume Writing', 'LinkedIn', 'Personal Branding'],
      bio: 'Certified Resume Writer helping professionals tell their career story.',
      verified: true,
      price: 20000 // tomiwa: Price in NERA (₦20,000)
    },
    {
      id: 4,
      name: 'Dr. Michael Chen',
      title: 'Leadership Development Coach',
      specialty: 'Business',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
      rating: 4.7,
      reviews: 78,
      sessionsCompleted: 290,
      yearsExperience: 18,
      available: 'Friday',
      availableStatus: 'later',
      tags: ['Leadership', 'Team Management', 'Executive Presence'],
      bio: 'PhD in Organizational Psychology with 18 years coaching leaders.',
      verified: true,
      price: 30000 // tomiwa: Price in NERA (₦30,000)
    }
  ];

  // tomiwa: NEW - Smart Matching features explaining how coach recommendations work
  const smartMatchingFeatures = [
    {
      icon: <CpuChipIcon className="w-6 h-6" />,
      title: 'AI Profile Analysis',
      description: 'We analyze your skills, experience, and career goals to find the perfect coach match.'
    },
    {
      icon: <AdjustmentsHorizontalIcon className="w-6 h-6" />,
      title: 'Industry Matching',
      description: 'Coaches are matched based on their expertise in your target industry and role.'
    },
    {
      icon: <UserIcon className="w-6 h-6" />,
      title: 'Learning Style Fit',
      description: 'Your preferred communication and learning style influences recommendations.'
    },
    {
      icon: <ShieldCheckIcon className="w-6 h-6" />,
      title: 'Verified Experts',
      description: 'All coaches are vetted professionals with proven track records.'
    }
  ];

  // tomiwa: Benefits of coaching - updated with stronger hierarchy
  const benefits = [
    {
      icon: <LightBulbIcon className="w-6 h-6" />,
      title: 'Expert Guidance',
      description: 'Get personalized advice from industry professionals who understand your career path.',
      stat: '50+',
      statLabel: 'Expert Coaches'
    },
    {
      icon: <ChatBubbleLeftRightIcon className="w-6 h-6" />,
      title: 'Interview Mastery',
      description: 'Practice with realistic mock interviews and receive actionable feedback.',
      stat: '500+',
      statLabel: 'Mock Interviews'
    },
    {
      icon: <RocketLaunchIcon className="w-6 h-6" />,
      title: 'Career Growth',
      description: 'Fast-track your career with strategic planning and goal setting.',
      stat: '3x',
      statLabel: 'Faster Progress'
    },
    {
      icon: <CheckCircleIcon className="w-6 h-6" />,
      title: 'Proven Results',
      description: 'Join thousands who have landed their target roles through coaching.',
      stat: '92%',
      statLabel: 'Success Rate'
    }
  ];

  // tomiwa: Simulating subscription status
  const hasCoachingSubscription = false;

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
                Career Coaching
              </h1>
              {/* tomiwa: Subtitle in uniform style */}
              <p className="text-[#D9E5E6] text-base 
                           sm:text-lg 
                           md:text-lg 
                           lg:text-xl 
                           leading-relaxed max-w-2xl">
                Connect with experienced coaches in Design, Tech, Hospitality, and Business Management to accelerate your career growth
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* tomiwa: Main content area with consistent horizontal padding */}
      {/* updated: 32px padding on desktop (px-8), 24px on tablet (px-6) */}
      <div className="px-6 
                      sm:px-6 
                      md:px-8 
                      lg:px-8 
                      xl:px-8 
                      2xl:px-8 
                      pb-12">
        
        <div className="max-w-7xl mx-auto">

          {/* ===================================================================== */}
          {/* tomiwa: MODULE 2 - Smart Matching Section (NEW) */}
          {/* Explains how coach recommendations work, powered by RJS ATS */}
          {/* ===================================================================== */}
          <section className="mb-12">
            {/* tomiwa: Section header with branding */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-50 text-primary-700 rounded-full text-sm font-medium mb-4">
                <SparklesIcon className="w-4 h-4" />
                <span>Smart Matching</span>
                <span className="text-primary-400">•</span>
                <span className="text-primary-500">Powered by RJS ATS</span>
              </div>
              <h2 className="text-xl 
                            sm:text-2xl 
                            md:text-2xl 
                            font-display font-bold text-neutral-900 mb-2">
                How We Match You With The Right Coach
              </h2>
              <p className="text-neutral-600 text-sm 
                           sm:text-base 
                           max-w-2xl mx-auto">
                Our AI-powered matching system analyzes multiple factors to recommend coaches 
                who can best help you achieve your career goals.
              </p>
            </div>

            {/* tomiwa: Smart matching feature cards - 4-column grid on desktop */}
            <div className="grid grid-cols-1 
                           sm:grid-cols-2 
                           md:grid-cols-2 
                           lg:grid-cols-4 
                           gap-4 
                           sm:gap-5 
                           md:gap-6">
              {smartMatchingFeatures.map((feature, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-xl border border-neutral-200 p-5 
                            hover:border-brand-aqua/50 hover:shadow-md 
                            transition-all duration-300 group"
                >
                  {/* tomiwa: Icon container with aqua accent */}
                  <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-4
                                 text-brand-aqua group-hover:bg-brand-aqua group-hover:text-white 
                                 transition-colors duration-300">
                    {feature.icon}
                  </div>
                  
                  {/* tomiwa: Feature title */}
                  <h3 className="font-semibold text-neutral-900 text-base mb-2">
                    {feature.title}
                  </h3>
                  
                  {/* tomiwa: Feature description */}
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ===================================================================== */}
          {/* tomiwa: MODULE 3 - Featured Coaches */}
          {/* updated: NEW - Full profile cards with "View Profile" and "Book Coach" buttons */}
          {/* updated: Each card shows coach photo, name, title, bio, rating, tags, and action buttons */}
          {/* ===================================================================== */}
          <section className="mb-12">
            {/* tomiwa: Section header with view all link */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <StarSolidIcon className="w-5 h-5 text-brand-yellow" />
                <h2 className="text-lg 
                              sm:text-xl 
                              font-display font-bold text-neutral-900">
                  Featured Coaches
                </h2>
                <span className="text-xs text-neutral-500 bg-neutral-100 px-2.5 py-1 rounded-full font-medium">
                  {featuredCoaches.length} coaches
                </span>
              </div>
              <Link
                href="/dashboard/candidate/ai-tools/coaching/browse"
                className="inline-flex items-center gap-1.5 text-brand-aqua hover:text-primary-700 
                          text-sm font-medium transition-colors group"
              >
                Browse All Coaches
                <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            {/* tomiwa: NEW - Featured coaches grid with full profile cards */}
            {/* updated: Responsive 2-column layout on desktop, 1 column on mobile */}
            <div className="grid grid-cols-1 
                           md:grid-cols-2 
                           gap-5 
                           sm:gap-6">
              {featuredCoaches.map((coach) => (
                <div 
                  key={coach.id}
                  className="group bg-white rounded-xl border border-neutral-200 
                            hover:border-brand-aqua/50 hover:shadow-lg 
                            transition-all duration-300 overflow-hidden"
                >
                  {/* tomiwa: NEW - Coach profile header section */}
                  <div className="p-5 sm:p-6">
                    <div className="flex items-start gap-4 mb-4">
                      {/* tomiwa: Coach photo with verified badge */}
                      <div className="relative flex-shrink-0">
                        <img
                          src={coach.photo}
                          alt={coach.name}
                          className="w-20 h-20 
                                    sm:w-24 sm:h-24 
                                    rounded-xl object-cover 
                                    ring-2 ring-neutral-100 group-hover:ring-brand-aqua/30 
                                    transition-all"
                        />
                        {/* tomiwa: Verified badge */}
                        {coach.verified && (
                          <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 bg-white rounded-full 
                                         flex items-center justify-center shadow-md">
                            <CheckBadgeIcon className="w-5 h-5 text-brand-aqua" />
                          </div>
                        )}
                      </div>
                      
                      {/* tomiwa: Coach info container */}
                      <div className="flex-1 min-w-0">
                        {/* tomiwa: Name */}
                        <h3 className="font-display font-bold text-neutral-900 text-base 
                                      sm:text-lg leading-tight mb-1">
                          {coach.name}
                        </h3>
                        
                        {/* tomiwa: Title */}
                        <p className="text-neutral-600 text-sm mb-2">
                          {coach.title}
                        </p>
                        
                        {/* tomiwa: Rating and reviews */}
                        <div className="flex items-center gap-2 text-sm mb-2">
                          <div className="flex items-center gap-1">
                            <StarSolidIcon className="w-4 h-4 text-brand-yellow" />
                            <span className="font-semibold text-neutral-900">{coach.rating}</span>
                          </div>
                          <span className="text-neutral-400">({coach.reviews} reviews)</span>
                          <span className="text-neutral-300">•</span>
                          <span className="text-neutral-500">{coach.sessionsCompleted}+ sessions</span>
                        </div>
                        
                        {/* tomiwa: Specialty badge and experience */}
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs text-primary-700 bg-primary-50 px-2.5 py-1 rounded-lg font-medium">
                            {coach.specialty}
                          </span>
                          <span className="text-xs text-neutral-500 flex items-center gap-1">
                            <BriefcaseIcon className="w-3.5 h-3.5" />
                            {coach.yearsExperience} yrs exp
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* tomiwa: NEW - Bio snippet */}
                    <p className="text-sm text-neutral-600 leading-relaxed mb-4 line-clamp-2">
                      {coach.bio}
                    </p>

                    {/* tomiwa: NEW - Specialty tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {coach.tags.slice(0, 3).map((tag, index) => (
                        <span 
                          key={index}
                          className="text-xs text-neutral-600 bg-neutral-100 px-2.5 py-1 rounded-lg font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* tomiwa: NEW - Availability and price row */}
                    <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                      <div className="flex items-center gap-2">
                        <ClockIcon className="w-4 h-4 text-neutral-400" />
                        <span className={`text-sm font-medium ${
                          coach.availableStatus === 'today' 
                            ? 'text-emerald-600' 
                            : coach.availableStatus === 'soon' 
                              ? 'text-amber-600'
                              : 'text-neutral-600'
                        }`}>
                          Available {coach.available}
                        </span>
                      </div>
                      {/* tomiwa: updated - Changed price display to NERA (₦) currency */}
                      <div className="text-right">
                        <span className="text-lg font-bold text-brand-aqua">₦{coach.price.toLocaleString()}</span>
                        <span className="text-xs text-neutral-500 ml-1">/session</span>
                      </div>
                    </div>
                  </div>

                  {/* tomiwa: NEW - Action buttons footer */}
                  {/* updated: Two buttons - "View Profile" and "Book Coach" */}
                  <div className="px-5 sm:px-6 py-4 bg-neutral-50 border-t border-neutral-100 
                                 flex items-center gap-3">
                    {/* tomiwa: View Profile button - secondary style */}
                    <Link
                      href={`/dashboard/candidate/ai-tools/coaching/${coach.id}`}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 
                                bg-white border border-neutral-200 text-neutral-700 
                                font-semibold rounded-xl hover:bg-neutral-100 hover:border-neutral-300
                                transition-all text-sm"
                    >
                      <EyeIcon className="w-4 h-4" />
                      View Profile
                    </Link>
                    
                    {/* tomiwa: NEW - Book Coach button - primary style, links to booking page */}
                    <Link
                      href={`/dashboard/candidate/ai-tools/coaching/${coach.id}/book`}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 
                                bg-brand-aqua text-white font-semibold rounded-xl 
                                hover:bg-primary-600 transition-all text-sm
                                shadow-sm hover:shadow-md"
                    >
                      <CalendarDaysIcon className="w-4 h-4" />
                      Book Coach
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* tomiwa: NEW - View more coaches prompt */}
            <div className="text-center mt-8">
              <Link
                href="/dashboard/candidate/ai-tools/coaching/browse"
                className="inline-flex items-center gap-2 px-6 py-3 
                          bg-neutral-100 text-neutral-700 font-semibold rounded-xl 
                          hover:bg-neutral-200 transition-colors"
              >
                <UserGroupIcon className="w-5 h-5" />
                Browse All Coaches
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>
          </section>

          {/* ===================================================================== */}
          {/* tomiwa: MODULE 4 - Why Career Coaching? */}
          {/* updated: Stronger hierarchy, balanced icons, consistent shadows, better grid */}
          {/* ===================================================================== */}
          <section className="mb-12">
            {/* tomiwa: Section header */}
            <div className="text-center mb-8">
              <h2 className="text-xl 
                            sm:text-2xl 
                            md:text-2xl 
                            font-display font-bold text-neutral-900 mb-2">
                Why Career Coaching?
              </h2>
              <p className="text-neutral-600 text-sm 
                           sm:text-base 
                           max-w-xl mx-auto">
                Accelerate your career growth with personalized guidance from industry experts.
              </p>
            </div>

            {/* tomiwa: Benefits grid - 2 cols on mobile, 4 cols on desktop */}
            <div className="grid grid-cols-1 
                           sm:grid-cols-2 
                           lg:grid-cols-4 
                           gap-4 
                           sm:gap-5 
                           md:gap-6">
              {benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-xl border border-neutral-200 p-5 
                            shadow-sm hover:shadow-md hover:border-neutral-300 
                            transition-all duration-300"
                >
                  {/* tomiwa: Icon with consistent sizing */}
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-50 to-brand-aqua/10 
                                 rounded-xl flex items-center justify-center mb-4 text-brand-aqua">
                    {benefit.icon}
                  </div>
                  
                  {/* tomiwa: Stat highlight */}
                  <div className="text-2xl font-bold text-brand-aqua mb-1">
                    {benefit.stat}
                  </div>
                  <div className="text-xs text-neutral-500 mb-3">
                    {benefit.statLabel}
                  </div>
                  
                  {/* tomiwa: Title with stronger weight */}
                  <h3 className="font-semibold text-neutral-900 text-base mb-2">
                    {benefit.title}
                  </h3>
                  
                  {/* tomiwa: Description */}
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ===================================================================== */}
          {/* tomiwa: MODULE 5 - Bottom CTA Section */}
          {/* updated: Cleaner design with better visual hierarchy */}
          {/* ===================================================================== */}
          <section>
            <div className="bg-brand-black rounded-xl p-6 
                           sm:p-8 
                           md:p-10 
                           overflow-hidden relative">
              {/* tomiwa: Decorative gradient accent */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-brand-aqua/20 to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />
              
              <div className="relative flex flex-col 
                             sm:flex-row 
                             items-center justify-between gap-6 
                             text-center sm:text-left">
                {/* tomiwa: CTA content */}
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="w-14 h-14 bg-brand-aqua/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <SparklesIcon className="w-7 h-7 text-brand-aqua" />
                  </div>
                  <div>
                    <h2 className="text-lg 
                                  sm:text-xl 
                                  font-display font-bold text-white mb-1">
                      Ready to Transform Your Career?
                    </h2>
                    <p className="text-neutral-400 text-sm 
                                 sm:text-base">
                      Find the perfect coach and start your journey today.
                    </p>
                  </div>
                </div>

                {/* tomiwa: CTA button */}
                <Link
                  href="/dashboard/candidate/ai-tools/coaching/browse"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-brand-orange text-white 
                            font-semibold rounded-xl hover:bg-secondary-600 
                            transition-colors text-sm sm:text-base whitespace-nowrap
                            shadow-lg hover:shadow-xl"
                >
                  Browse Coaches
                  <ArrowRightIcon className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </CandidateDashboardLayout>
  );
}
