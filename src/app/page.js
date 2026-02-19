/**
 * File: src/app/page.js
 * 
 * tomiwa: ReadyJobSeeker Homepage
 * Clean, modern landing page with clear navigation to different user portals
 * 
 * Features:
 * - Hero section with branding
 * - Clear navigation to candidate and coach portals
 * - Responsive design matching brand guidelines
 * - Call-to-action buttons for different user types
 */

'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  UserGroupIcon,
  AcademicCapIcon,
  SparklesIcon,
  ArrowRightIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* tomiwa: Navigation Header */}
      <header className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* tomiwa: Logo */}
            <div className="flex items-center gap-3">
              <Image
                src="/images/logo.png"
                alt="ReadyJobSeeker Logo"
                width={40}
                height={40}
                className="rounded-xl"
              />
              <span className="font-display font-bold text-2xl text-brand-black">
                ReadyJobSeeker
              </span>
            </div>

            {/* tomiwa: Navigation Links */}
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/dashboard/candidate"
                className="text-neutral-600 hover:text-brand-aqua transition-colors"
              >
                For Job Seekers
              </Link>
              <Link
                href="/coach/login"
                className="text-neutral-600 hover:text-brand-aqua transition-colors"
              >
                For Coaches
              </Link>
              <Link
                href="/coach/apply"
                className="px-6 py-2 bg-brand-aqua text-white rounded-xl hover:bg-brand-aqua/90 transition-colors"
              >
                Become a Coach
              </Link>
            </nav>

            {/* tomiwa: Mobile Menu Button */}
            <div className="md:hidden">
              <Link
                href="/coach/login"
                className="px-4 py-2 bg-brand-aqua text-white rounded-lg text-sm"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* tomiwa: Hero Section */}
      <section className="bg-gradient-to-br from-brand-aqua via-brand-aqua to-[#0C5B65] text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight">
              Your AI-Powered
              <br />
              <span className="text-brand-yellow">Career Companion</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed">
              Connect with expert coaches, leverage AI tools, and accelerate your job search journey with personalized guidance.
            </p>
            
            {/* tomiwa: CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/dashboard/candidate"
                className="w-full sm:w-auto px-8 py-4 bg-brand-orange text-white rounded-xl font-semibold hover:bg-brand-orange/90 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:scale-105"
              >
                <UserGroupIcon className="w-5 h-5" />
                Start Job Search
                <ArrowRightIcon className="w-5 h-5" />
              </Link>
              <Link
                href="/coach/apply"
                className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <AcademicCapIcon className="w-5 h-5" />
                Become a Coach
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* tomiwa: Features Section */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-black mb-4">
              Two Powerful Platforms
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Whether you're seeking career guidance or sharing your expertise, we have the perfect platform for you.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* tomiwa: Job Seekers Platform */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-brand-aqua/10 rounded-2xl flex items-center justify-center mb-6">
                <UserGroupIcon className="w-8 h-8 text-brand-aqua" />
              </div>
              <h3 className="text-2xl font-display font-bold text-brand-black mb-4">
                For Job Seekers
              </h3>
              <p className="text-neutral-600 mb-6 leading-relaxed">
                Access AI-powered tools, connect with expert coaches, and get personalized guidance to land your dream job.
              </p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircleIcon className="w-5 h-5 text-brand-aqua flex-shrink-0" />
                  <span className="text-neutral-700">AI Resume Builder & Optimizer</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircleIcon className="w-5 h-5 text-brand-aqua flex-shrink-0" />
                  <span className="text-neutral-700">Interview Preparation Tools</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircleIcon className="w-5 h-5 text-brand-aqua flex-shrink-0" />
                  <span className="text-neutral-700">Expert Coach Matching</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircleIcon className="w-5 h-5 text-brand-aqua flex-shrink-0" />
                  <span className="text-neutral-700">Job Application Tracking</span>
                </li>
              </ul>

              <Link
                href="/dashboard/candidate"
                className="w-full py-3 px-6 bg-brand-aqua text-white rounded-xl font-semibold hover:bg-brand-aqua/90 transition-colors flex items-center justify-center gap-2"
              >
                Access Platform
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>

            {/* tomiwa: Coaches Platform */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-brand-orange/10 rounded-2xl flex items-center justify-center mb-6">
                <AcademicCapIcon className="w-8 h-8 text-brand-orange" />
              </div>
              <h3 className="text-2xl font-display font-bold text-brand-black mb-4">
                For Coaches
              </h3>
              <p className="text-neutral-600 mb-6 leading-relaxed">
                Share your expertise, build your coaching business, and help job seekers achieve their career goals.
              </p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircleIcon className="w-5 h-5 text-brand-orange flex-shrink-0" />
                  <span className="text-neutral-700">Flexible Scheduling Tools</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircleIcon className="w-5 h-5 text-brand-orange flex-shrink-0" />
                  <span className="text-neutral-700">Secure Payment Processing</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircleIcon className="w-5 h-5 text-brand-orange flex-shrink-0" />
                  <span className="text-neutral-700">Client Management Dashboard</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircleIcon className="w-5 h-5 text-brand-orange flex-shrink-0" />
                  <span className="text-neutral-700">AI-Enhanced Insights</span>
                </li>
              </ul>

              <div className="flex gap-3">
                <Link
                  href="/coach/login"
                  className="flex-1 py-3 px-6 border border-brand-orange text-brand-orange rounded-xl font-semibold hover:bg-brand-orange/5 transition-colors text-center"
                >
                  Sign In
                </Link>
                <Link
                  href="/coach/apply"
                  className="flex-1 py-3 px-6 bg-brand-orange text-white rounded-xl font-semibold hover:bg-brand-orange/90 transition-colors text-center"
                >
                  Apply Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* tomiwa: Footer */}
      <footer className="bg-brand-black text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <Image
                src="/images/logo.png"
                alt="ReadyJobSeeker Logo"
                width={32}
                height={32}
                className="rounded-lg"
              />
              <span className="font-display font-bold text-xl">
                ReadyJobSeeker
              </span>
            </div>
            
            <div className="flex items-center gap-6 text-sm">
              <Link href="/privacy" className="text-neutral-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-neutral-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/help" className="text-neutral-400 hover:text-white transition-colors">
                Help Center
              </Link>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-neutral-800 text-center text-sm text-neutral-400">
            © 2026 ReadyJobSeeker. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
