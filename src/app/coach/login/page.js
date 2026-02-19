/**
 * File: src/app/coach/login/page.js
 * 
 * tomiwa: Coach Login Page
 * Split-screen layout with left branding panel and right login form
 * 
 * Layout:
 * - Left Panel: Brand colors, logo, welcome message, features
 * - Right Panel: Clean login form with validation states
 * - Fully responsive design
 * - Consistent with platform design system
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
  CheckCircleIcon,
  ExclamationCircleIcon,
  SparklesIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  CalendarDaysIcon,
} from '@heroicons/react/24/outline';

export default function CoachLoginPage() {
  const router = useRouter();
  
  // tomiwa: Form state management
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  // tomiwa: UI state management
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState(null);

  // tomiwa: Update form data
  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  // tomiwa: Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // tomiwa: Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful login
      showToast('Login successful! Redirecting to dashboard...', 'success');
      
      setTimeout(() => {
        router.push('/coach/dashboard');
      }, 1500);
      
    } catch (error) {
      showToast('Invalid email or password. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // tomiwa: Show toast notification
  const showToast = (message, type = 'success') => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  return (
    <div className="min-h-screen flex">
      {/* tomiwa: Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-brand-aqua via-brand-aqua to-[#0C5B65] relative overflow-hidden">
        {/* tomiwa: Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full"></div>
          <div className="absolute top-40 right-32 w-24 h-24 bg-white rounded-full"></div>
          <div className="absolute bottom-32 left-32 w-40 h-40 bg-white rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-20 h-20 bg-white rounded-full"></div>
        </div>

        {/* tomiwa: Content */}
        <div className="relative z-10 flex flex-col justify-center px-12 py-16 text-white">
          {/* tomiwa: Logo */}
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

          {/* tomiwa: Welcome Message */}
          <div className="mb-12">
            <h1 className="text-4xl font-display font-bold mb-4 leading-tight">
              Welcome Back,<br />
              Coach!
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Continue empowering careers and building your coaching business with our platform.
            </p>
          </div>

          {/* tomiwa: Feature Highlights */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <UserGroupIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Connect with Candidates</h3>
                <p className="text-white/80">Access to motivated job seekers</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <CurrencyDollarIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Flexible Earnings</h3>
                <p className="text-white/80">Set your own rates and schedule</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <SparklesIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">AI-Powered Tools</h3>
                <p className="text-white/80">Enhanced coaching experience</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <CalendarDaysIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Easy Scheduling</h3>
                <p className="text-white/80">Seamless booking management</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* tomiwa: Right Panel - Login Form */}
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
              Sign In
            </h2>
            <p className="text-neutral-600">
              Access your coaching dashboard and manage your sessions
            </p>
          </div>

          {/* tomiwa: Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
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
                  placeholder="Enter your password"
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

            {/* tomiwa: Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={(e) => updateFormData('rememberMe', e.target.checked)}
                  className="w-4 h-4 text-brand-aqua border-neutral-300 rounded focus:ring-brand-aqua focus:ring-2"
                  disabled={isLoading}
                />
                <span className="text-sm text-neutral-600">Remember me</span>
              </label>
              <Link
                href="/coach/forgot-password"
                className="text-sm text-brand-aqua hover:text-brand-orange transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* tomiwa: Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-brand-aqua text-white rounded-xl font-semibold hover:bg-brand-aqua/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* tomiwa: Sign Up Link */}
          <div className="mt-8 text-center">
            <p className="text-neutral-600">
              Don't have an account?{' '}
              <Link
                href="/coach/apply"
                className="text-brand-aqua hover:text-brand-orange font-semibold transition-colors"
              >
                Apply to become a coach
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