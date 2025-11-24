"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiEye, FiEyeOff, FiAlertCircle } from 'react-icons/fi';
import { HiOutlineLightningBolt, HiOutlineDocumentSearch, HiOutlineChartBar } from 'react-icons/hi';
import { FcGoogle } from 'react-icons/fc';
import { BsLinkedin, BsMicrosoft } from 'react-icons/bs';

// tomiwa: Auth Gate component for protecting job posting flow
export default function AuthGate() {
  // tomiwa: State management
  const [activeTab, setActiveTab] = useState('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [capsLockOn, setCapsLockOn] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [useMagicLink, setUseMagicLink] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // tomiwa: Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setEmailError('');
    setPasswordError('');

    // tomiwa: Basic validation
    if (!email) {
      setEmailError('Email is required');
      setLoading(false);
      return;
    }

    if (!useMagicLink && !password) {
      setPasswordError('Password is required');
      setLoading(false);
      return;
    }

    if (activeTab === 'signup' && !agreeToTerms) {
      setError('Please agree to the Terms and Privacy Policy');
      setLoading(false);
      return;
    }

    try {
      // tomiwa: Simulate auth API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // tomiwa: Redirect back to job posting flow
      window.location.href = '/post-job/create';
    } catch (err) {
      setError('Authentication failed. Please try again.');
      setLoading(false);
    }
  };

  // tomiwa: Handle CapsLock detection
  const handleKeyPress = (e) => {
    setCapsLockOn(e.getModifierState('CapsLock'));
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* tomiwa: Error banner */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-0 left-0 right-0 z-50 bg-red-50 border-b border-red-200"
            role="alert"
            aria-live="assertive"
          >
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
              <div className="flex items-center text-red-700">
                <FiAlertCircle className="w-5 h-5 mr-2" />
                <span>{error}</span>
              </div>
              <button
                onClick={() => setError('')}
                className="text-red-700 hover:text-red-800"
              >
                <span className="sr-only">Dismiss</span>
                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="max-w-4xl mx-auto px-4 py-16 sm:px-6 sm:py-24">
        {/* tomiwa: Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-neutral-500">
            <li>
              <Link href="/employers" className="hover:text-neutral-700">
                For Employers
              </Link>
            </li>
            <li>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </li>
            <li>
              <Link href="/post-job" className="hover:text-neutral-700">
                Post a Job
              </Link>
            </li>
          </ol>
        </nav>

        {/* tomiwa: Main heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-neutral-900 mb-4">
            Sign in or create an account
          </h1>
          <p className="text-lg text-neutral-600">
            You'll be back to your job post in seconds
          </p>
        </div>

        {/* tomiwa: Auth Card */}
        <div className="max-w-[560px] mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            {/* tomiwa: Auth tabs */}
            <div className="flex border-b border-neutral-200 mb-8">
              <button
                onClick={() => setActiveTab('signin')}
                className={`flex-1 pb-4 text-center font-medium ${
                  activeTab === 'signin'
                    ? 'text-brand-aqua border-b-2 border-brand-aqua'
                    : 'text-neutral-500 hover:text-neutral-700'
                }`}
              >
                Sign in
              </button>
              <button
                onClick={() => setActiveTab('signup')}
                className={`flex-1 pb-4 text-center font-medium ${
                  activeTab === 'signup'
                    ? 'text-brand-aqua border-b-2 border-brand-aqua'
                    : 'text-neutral-500 hover:text-neutral-700'
                }`}
              >
                Create account
              </button>
            </div>

            {/* tomiwa: Auth form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* tomiwa: Email field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                  Work email
                </label>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`block w-full px-4 py-3 rounded-xl border ${
                      emailError ? 'border-red-300' : 'border-neutral-300'
                    } focus:ring-2 focus:ring-brand-aqua focus:border-brand-aqua`}
                    placeholder="you@company.com"
                    aria-invalid={!!emailError}
                    aria-describedby={emailError ? 'email-error' : undefined}
                  />
                  {emailError && (
                    <div id="email-error" className="absolute right-0 top-0 h-full flex items-center pr-3">
                      <FiAlertCircle className="w-5 h-5 text-red-500" />
                    </div>
                  )}
                </div>
                {emailError && (
                  <p className="mt-2 text-sm text-red-600" id="email-error">
                    {emailError}
                  </p>
                )}
              </div>

              {!useMagicLink && (
                /* tomiwa: Password field */
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onKeyDown={handleKeyPress}
                      className={`block w-full px-4 py-3 pr-10 rounded-xl border ${
                        passwordError ? 'border-red-300' : 'border-neutral-300'
                      } focus:ring-2 focus:ring-brand-aqua focus:border-brand-aqua`}
                      placeholder="Enter your password"
                      aria-invalid={!!passwordError}
                      aria-describedby={passwordError ? 'password-error' : undefined}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700"
                    >
                      {showPassword ? (
                        <FiEyeOff className="w-5 h-5" />
                      ) : (
                        <FiEye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {passwordError && (
                    <p className="mt-2 text-sm text-red-600" id="password-error">
                      {passwordError}
                    </p>
                  )}
                  {capsLockOn && (
                    <p className="mt-2 text-sm text-amber-600">
                      Caps Lock is on
                    </p>
                  )}
                </div>
              )}

              {/* tomiwa: Additional signup fields */}
              {activeTab === 'signup' && (
                <>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-neutral-700 mb-1">
                      Company name (optional)
                    </label>
                    <input
                      id="company"
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="block w-full px-4 py-3 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-brand-aqua focus:border-brand-aqua"
                      placeholder="Your company name"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-1">
                      Phone number (optional)
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="block w-full px-4 py-3 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-brand-aqua focus:border-brand-aqua"
                      placeholder="Your phone number"
                    />
                  </div>

                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="terms"
                        type="checkbox"
                        checked={agreeToTerms}
                        onChange={(e) => setAgreeToTerms(e.target.checked)}
                        className="w-4 h-4 text-brand-aqua border-neutral-300 rounded focus:ring-brand-aqua"
                      />
                    </div>
                    <div className="ml-3">
                      <label htmlFor="terms" className="text-sm text-neutral-600">
                        I agree to the{' '}
                        <Link href="/terms" className="text-brand-aqua hover:text-brand-aqua/80">
                          Terms
                        </Link>
                        {' '}and{' '}
                        <Link href="/privacy" className="text-brand-aqua hover:text-brand-aqua/80">
                          Privacy Policy
                        </Link>
                      </label>
                    </div>
                  </div>
                </>
              )}

              {/* tomiwa: Submit button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-brand-orange hover:bg-brand-orange/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-orange disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : activeTab === 'signin' ? (
                  'Sign in'
                ) : (
                  'Create account'
                )}
              </button>

              {/* tomiwa: Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-neutral-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-neutral-500">or</span>
                </div>
              </div>

              {/* tomiwa: SSO buttons */}
              <div className="space-y-4">
                <button
                  type="button"
                  className="w-full flex items-center justify-center px-6 py-3 border border-neutral-300 rounded-xl text-neutral-700 bg-white hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-aqua"
                >
                  <FcGoogle className="w-5 h-5 mr-2" />
                  Continue with Google
                </button>
                <button
                  type="button"
                  className="w-full flex items-center justify-center px-6 py-3 border border-neutral-300 rounded-xl text-neutral-700 bg-white hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-aqua"
                >
                  <BsMicrosoft className="w-5 h-5 mr-2 text-[#00A4EF]" />
                  Continue with Microsoft
                </button>
                <button
                  type="button"
                  className="w-full flex items-center justify-center px-6 py-3 border border-neutral-300 rounded-xl text-neutral-700 bg-white hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-aqua"
                >
                  <BsLinkedin className="w-5 h-5 mr-2 text-[#0A66C2]" />
                  Continue with LinkedIn
                </button>
              </div>

              {/* tomiwa: Additional auth options */}
              <div className="mt-6 flex justify-center space-x-6 text-sm">
                <button
                  type="button"
                  onClick={() => setUseMagicLink(!useMagicLink)}
                  className="text-brand-aqua hover:text-brand-aqua/80"
                >
                  {useMagicLink ? 'Use password' : 'Use magic link'}
                </button>
                {!useMagicLink && (
                  <Link
                    href="/forgot-password"
                    className="text-brand-aqua hover:text-brand-aqua/80"
                  >
                    Forgot password?
                  </Link>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* tomiwa: Value Props */}
        <div className="mt-16 grid sm:grid-cols-3 gap-8">
          {[
            {
              icon: <HiOutlineLightningBolt className="w-6 h-6" />,
              title: "AI-written job posts",
              description: "Create compelling job posts in seconds with our AI assistant"
            },
            {
              icon: <HiOutlineDocumentSearch className="w-6 h-6" />,
              title: "Verified CV database",
              description: "Access pre-screened candidates matched to your requirements"
            },
            {
              icon: <HiOutlineChartBar className="w-6 h-6" />,
              title: "Analytics & smart matching",
              description: "Get insights and automatic candidate recommendations"
            }
          ].map((prop, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-aqua/10 text-brand-aqua mb-4">
                {prop.icon}
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                {prop.title}
              </h3>
              <p className="text-neutral-600">
                {prop.description}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
} 