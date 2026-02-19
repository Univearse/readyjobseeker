/**
 * File: src/app/coach/apply/page.js
 * 
 * tomiwa: Coach Sign-Up Page
 * Split-screen layout matching Coach Login design for account creation
 * 
 * Layout:
 * - Left Panel: Aqua gradient branding with coach benefits
 * - Right Panel: Clean sign-up form with minimal fields
 * - Fully responsive design matching login page styling
 * - Transitions to 3-step onboarding after account creation
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  EyeIcon,
  EyeSlashIcon,
  EnvelopeIcon,
  LockClosedIcon,
  UserIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  SparklesIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  ShieldCheckIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';

export default function CoachSignUpPage() {
  const router = useRouter();
  
  // tomiwa: Form state management for account creation
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  // tomiwa: UI state management
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState(null);

  // tomiwa: Update form data and clear related errors
  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // johnson: Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  // tomiwa: Comprehensive form validation
  const validateForm = () => {
    const newErrors = {};

    // johnson: Full name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

    // johnson: Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // johnson: Password validation
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }

    // johnson: Confirm password validation
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // johnson: Terms agreement validation
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // tomiwa: Handle form submission and account creation
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // johnson: Simulate account creation API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // tomiwa: Mock successful account creation
      showToast('Account created successfully! Starting onboarding...', 'success');
      
      setTimeout(() => {
        // johnson: Redirect to simplified 3-step onboarding flow
        router.push('/coach/onboarding');
      }, 1500);
      
    } catch (error) {
      showToast('Failed to create account. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // tomiwa: Show toast notification with auto-dismiss
  const showToast = (message, type = 'success') => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  return (
    <div className="min-h-screen flex">
      {/* tomiwa: Left Panel - Coach Benefits Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-brand-aqua via-brand-aqua to-[#0C5B65] relative overflow-hidden">
        {/* tomiwa: Background Pattern - Decorative circles */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full"></div>
          <div className="absolute top-40 right-32 w-24 h-24 bg-white rounded-full"></div>
          <div className="absolute bottom-32 left-32 w-40 h-40 bg-white rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-20 h-20 bg-white rounded-full"></div>
        </div>

        {/* tomiwa: Content */}
        <div className="relative z-10 flex flex-col justify-center px-12 py-16 text-white">
          {/* tomiwa: Logo and Brand */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                <Image
                  src="/images/logo.png"
                  alt="ReadyJobSeeker Logo"
                  width={32}
                  height={32}
                  className="rounded-lg"
                />
              </div>
              <span className="font-display font-bold text-2xl">
                ReadyJobSeeker
              </span>
            </div>
            <div className="w-16 h-1 bg-white rounded-full"></div>
          </div>

          {/* tomiwa: Welcome Message for Coaches */}
          <div className="mb-12">
            <h1 className="text-4xl font-display font-bold mb-4 leading-tight">
              Start Your<br />
              Coaching Journey
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Join our platform and help job seekers achieve their career goals while building your coaching business.
            </p>
          </div>

          {/* tomiwa: Coach Benefits Highlights */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <UserGroupIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Reach Motivated Job Seekers</h3>
                <p className="text-white/80">Connect with candidates ready to invest in their careers</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <CurrencyDollarIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Flexible Earnings</h3>
                <p className="text-white/80">Set your own rates and work on your schedule</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <SparklesIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">AI-Powered Tools</h3>
                <p className="text-white/80">Enhanced coaching experience with smart insights</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <ShieldCheckIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Secure Payments</h3>
                <p className="text-white/80">Reliable payment processing and protection</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* tomiwa: Right Panel - Sign-Up Form */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-16">
        <div className="w-full max-w-md mx-auto">
          {/* tomiwa: Mobile Logo */}
          <div className="lg:hidden mb-8 text-center">
            <Link href="/" className="inline-flex items-center gap-2">
              <Image
                src="/images/logo.png"
                alt="ReadyJobSeeker Logo"
                width={32}
                height={32}
                className="rounded-lg"
              />
              <span className="font-display font-bold text-xl text-brand-black">
                ReadyJobSeeker
              </span>
            </Link>
          </div>

          {/* tomiwa: Form Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-display font-bold text-brand-black mb-2">
              Apply to Coach
            </h2>
            <p className="text-neutral-600">
              Create your account to start the application process
            </p>
          </div>

          {/* tomiwa: Sign-Up Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* tomiwa: Full Name Field */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => updateFormData('fullName', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-colors ${
                    errors.fullName 
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                      : 'border-neutral-200 focus:border-brand-aqua focus:ring-brand-aqua/20'
                  } focus:ring-4 focus:outline-none`}
                  placeholder="Enter your full name"
                  disabled={isLoading}
                />
              </div>
              {errors.fullName && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <ExclamationCircleIcon className="w-4 h-4" />
                  {errors.fullName}
                </p>
              )}
            </div>

            {/* tomiwa: Email Field */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-colors ${
                    errors.email 
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                      : 'border-neutral-200 focus:border-brand-aqua focus:ring-brand-aqua/20'
                  } focus:ring-4 focus:outline-none`}
                  placeholder="Enter your email"
                  disabled={isLoading}
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <ExclamationCircleIcon className="w-4 h-4" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* tomiwa: Password Field */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                Password
              </label>
              <div className="relative">
                <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => updateFormData('password', e.target.value)}
                  className={`w-full pl-10 pr-12 py-3 rounded-xl border transition-colors ${
                    errors.password 
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                      : 'border-neutral-200 focus:border-brand-aqua focus:ring-brand-aqua/20'
                  } focus:ring-4 focus:outline-none`}
                  placeholder="Create a strong password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <ExclamationCircleIcon className="w-4 h-4" />
                  {errors.password}
                </p>
              )}
            </div>

            {/* tomiwa: Confirm Password Field */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                  className={`w-full pl-10 pr-12 py-3 rounded-xl border transition-colors ${
                    errors.confirmPassword 
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                      : 'border-neutral-200 focus:border-brand-aqua focus:ring-brand-aqua/20'
                  } focus:ring-4 focus:outline-none`}
                  placeholder="Confirm your password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
                  disabled={isLoading}
                >
                  {showConfirmPassword ? (
                    <EyeSlashIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <ExclamationCircleIcon className="w-4 h-4" />
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* tomiwa: Terms Agreement Checkbox */}
            <div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={(e) => updateFormData('agreeToTerms', e.target.checked)}
                  className="w-4 h-4 text-brand-aqua border-neutral-300 rounded focus:ring-brand-aqua focus:ring-2 mt-0.5"
                  disabled={isLoading}
                />
                <span className="text-sm text-neutral-600 leading-relaxed">
                  I agree to the{' '}
                  <Link
                    href="/terms"
                    className="text-brand-aqua hover:text-brand-orange transition-colors"
                  >
                    Terms of Service
                  </Link>
                  {' '}and{' '}
                  <Link
                    href="/privacy"
                    className="text-brand-aqua hover:text-brand-orange transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </span>
              </label>
              {errors.agreeToTerms && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <ExclamationCircleIcon className="w-4 h-4" />
                  {errors.agreeToTerms}
                </p>
              )}
            </div>

            {/* tomiwa: Continue Application Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-brand-aqua text-white rounded-xl font-semibold hover:bg-brand-aqua/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  Continue Application
                  <ArrowRightIcon className="w-5 h-5" />
                </>
              )}
            </button>

            {/* tomiwa: Helper Text */}
            <p className="text-center text-sm text-neutral-500">
              Takes less than 3 minutes to apply
            </p>
          </form>

          {/* tomiwa: Sign In Link */}
          <div className="mt-8 text-center">
            <p className="text-neutral-600">
              Already have an account?{' '}
              <Link
                href="/coach/login"
                className="text-brand-aqua hover:text-brand-orange font-semibold transition-colors"
              >
                Sign in here
              </Link>
            </p>
          </div>

          {/* tomiwa: Additional Links */}
          <div className="mt-8 pt-8 border-t border-neutral-200">
            <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
              <Link
                href="/privacy"
                className="text-neutral-500 hover:text-brand-aqua transition-colors text-center"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-neutral-500 hover:text-brand-aqua transition-colors text-center"
              >
                Terms of Service
              </Link>
              <Link
                href="/help"
                className="text-neutral-500 hover:text-brand-aqua transition-colors text-center"
              >
                Help Center
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* tomiwa: Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
          <div
            className={`rounded-xl shadow-xl p-4 flex items-center gap-3 min-w-[320px] ${
              toast.type === 'success'
                ? 'bg-emerald-500'
                : toast.type === 'error'
                ? 'bg-red-500'
                : 'bg-brand-aqua'
            } text-white`}
          >
            {toast.type === 'success' ? (
              <CheckCircleIcon className="w-6 h-6 flex-shrink-0" />
            ) : (
              <ExclamationCircleIcon className="w-6 h-6 flex-shrink-0" />
            )}
            <span className="font-medium">{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
}