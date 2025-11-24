"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiCheck, FiChevronDown, FiPlus } from 'react-icons/fi';
import { HiOutlineBriefcase, HiOutlineOfficeBuilding, HiOutlineCurrencyDollar, HiOutlineBell, HiOutlineUserGroup } from 'react-icons/hi';

// tomiwa: Employer preferences setup component
export default function PreferencesSetup() {
  // tomiwa: State management for form fields
  const [loading, setLoading] = useState(false);
  const [customRole, setCustomRole] = useState('');
  const [customBudget, setCustomBudget] = useState('');
  const [preferences, setPreferences] = useState({
    hiringRoles: [],
    workType: 'hybrid',
    experienceLevel: 'mid-level',
    budgetRange: 'mid',
    notifications: ['email'],
  });

  // tomiwa: Available hiring roles
  const availableRoles = [
    'Sales Executive', 'Customer Support Officer', 'Software Engineer',
    'Marketing Specialist', 'Finance Officer', 'HR Manager'
  ];

  // tomiwa: Budget ranges by level
  const budgetRanges = {
    entry: '₦150,000–₦250,000',
    mid: '₦400,000–₦600,000',
    senior: '₦1,000,000+'
  };

  // tomiwa: Handle role selection
  const toggleRole = (role) => {
    setPreferences(prev => ({
      ...prev,
      hiringRoles: prev.hiringRoles.includes(role)
        ? prev.hiringRoles.filter(r => r !== role)
        : [...prev.hiringRoles, role]
    }));
  };

  // tomiwa: Handle custom role addition
  const addCustomRole = (e) => {
    e.preventDefault();
    if (customRole.trim()) {
      setPreferences(prev => ({
        ...prev,
        hiringRoles: [...prev.hiringRoles, customRole.trim()]
      }));
      setCustomRole('');
    }
  };

  // tomiwa: Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // tomiwa: Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // tomiwa: Route to job posting
      window.location.href = '/post-job/create';
    } catch (error) {
      console.error('Setup error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* tomiwa: Navigation breadcrumb */}
      <nav className="max-w-7xl mx-auto px-4 py-4 sm:px-6">
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
          <li>Setup</li>
        </ol>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-12 sm:px-6">
        {/* tomiwa: Page header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-neutral-900 mb-4">
            Set Your Hiring Preferences
          </h1>
          <p className="text-lg text-neutral-600">
            Personalize your experience to get better matches and recommendations
          </p>
        </div>

        {/* tomiwa: Progress steps */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-between">
            {['Account', 'Company', 'Preferences'].map((stepName, index) => (
              <div key={index} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  index + 1 < 3 ? 'bg-green-500' :
                  index + 1 === 3 ? 'bg-brand-orange' :
                  'bg-neutral-200'
                } text-white`}>
                  {index + 1 < 3 ? (
                    <FiCheck className="w-5 h-5" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                <span className={`ml-2 text-sm ${
                  index + 1 === 3 ? 'text-brand-orange font-medium' :
                  index + 1 < 3 ? 'text-green-500' :
                  'text-neutral-500'
                }`}>
                  {stepName}
                </span>
                {index < 2 && (
                  <div className={`w-24 h-0.5 mx-4 ${
                    index + 1 < 3 ? 'bg-green-500' : 'bg-neutral-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* tomiwa: Main form card */}
        <div className="max-w-[640px] mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* tomiwa: Hiring roles selection */}
              <div className="pb-8 border-b border-neutral-200">
                <label className="text-base font-medium text-neutral-900">Hiring Roles</label>
                <p className="text-sm text-neutral-500 mb-4">
                  Select the types of roles you're typically hiring for
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {availableRoles.map(role => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => toggleRole(role)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        preferences.hiringRoles.includes(role)
                          ? 'bg-brand-aqua text-white'
                          : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                  <form onSubmit={addCustomRole} className="flex items-center">
                    <input
                      type="text"
                      value={customRole}
                      onChange={(e) => setCustomRole(e.target.value)}
                      placeholder="Add custom role"
                      className="px-4 py-2 rounded-full text-sm border border-neutral-300 focus:ring-2 focus:ring-brand-aqua focus:border-brand-aqua"
                    />
                    <button
                      type="submit"
                      className="ml-2 p-2 rounded-full bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                    >
                      <FiPlus className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </div>

              {/* tomiwa: Work type preference */}
              <div className="pb-8 border-b border-neutral-200">
                <label className="text-base font-medium text-neutral-900">Preferred Work Type</label>
                <p className="text-sm text-neutral-500 mb-4">
                  Select your primary work arrangement
                </p>
                <div className="grid grid-cols-3 gap-4">
                  {['onsite', 'hybrid', 'remote'].map(type => (
                    <label
                      key={type}
                      className={`flex flex-col items-center p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                        preferences.workType === type
                          ? 'border-brand-aqua bg-primary-50'
                          : 'border-neutral-200 hover:border-neutral-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="workType"
                        value={type}
                        checked={preferences.workType === type}
                        onChange={(e) => setPreferences(prev => ({ ...prev, workType: e.target.value }))}
                        className="sr-only"
                      />
                      <HiOutlineOfficeBuilding className="w-6 h-6 text-neutral-600 mb-2" />
                      <span className="text-sm font-medium capitalize">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* tomiwa: Experience level */}
              <div className="pb-8 border-b border-neutral-200">
                <label className="text-base font-medium text-neutral-900">Typical Experience Level</label>
                <p className="text-sm text-neutral-500 mb-4">
                  Choose your most common hiring level
                </p>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { id: 'entry', label: 'Entry-Level', years: '0–2 yrs' },
                    { id: 'mid', label: 'Mid-Level', years: '3–6 yrs' },
                    { id: 'senior', label: 'Senior', years: '7+ yrs' }
                  ].map(level => (
                    <label
                      key={level.id}
                      className={`flex flex-col items-center p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                        preferences.experienceLevel === level.id
                          ? 'border-brand-aqua bg-primary-50'
                          : 'border-neutral-200 hover:border-neutral-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="experienceLevel"
                        value={level.id}
                        checked={preferences.experienceLevel === level.id}
                        onChange={(e) => setPreferences(prev => ({ ...prev, experienceLevel: e.target.value }))}
                        className="sr-only"
                      />
                      <HiOutlineUserGroup className="w-6 h-6 text-neutral-600 mb-2" />
                      <span className="text-sm font-medium text-center">
                        {level.label}
                        <span className="block text-neutral-500 text-xs mt-1">
                          {level.years}
                        </span>
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* tomiwa: Budget range */}
              <div className="pb-8 border-b border-neutral-200">
                <label className="text-base font-medium text-neutral-900">Budget Comfort Range</label>
                <p className="text-sm text-neutral-500 mb-4">
                  Select your typical salary range or enter a custom amount
                </p>
                <div className="space-y-4">
                  <div className="relative">
                    <select
                      value={preferences.budgetRange}
                      onChange={(e) => setPreferences(prev => ({ ...prev, budgetRange: e.target.value }))}
                      className="block w-full pl-10 pr-10 py-3 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-brand-aqua focus:border-brand-aqua appearance-none bg-white"
                    >
                      <option value="entry">Entry Level: {budgetRanges.entry}</option>
                      <option value="mid">Mid Level: {budgetRanges.mid}</option>
                      <option value="senior">Senior Level: {budgetRanges.senior}</option>
                    </select>
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <HiOutlineCurrencyDollar className="h-5 w-5 text-neutral-400" />
                    </div>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <FiChevronDown className="h-5 w-5 text-neutral-400" />
                    </div>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      value={customBudget}
                      onChange={(e) => setCustomBudget(e.target.value)}
                      placeholder="Enter custom budget (e.g. ₦350,000)"
                      className="block w-full pl-10 py-3 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-brand-aqua focus:border-brand-aqua"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-neutral-400">₦</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* tomiwa: Notification preferences */}
              <div className="pb-8 border-b border-neutral-200">
                <label className="text-base font-medium text-neutral-900">Notification Preferences</label>
                <p className="text-sm text-neutral-500 mb-4">
                  Choose how you want to receive updates
                </p>
                <div className="space-y-4">
                  {[
                    { id: 'email', label: 'Email Only' },
                    { id: 'dashboard', label: 'Dashboard Only' },
                    { id: 'both', label: 'Both (Email + Dashboard)' }
                  ].map(type => (
                    <label key={type.id} className="flex items-center">
                      <input
                        type="radio"
                        name="notifications"
                        checked={preferences.notifications.includes(type.id)}
                        onChange={() => setPreferences(prev => ({ ...prev, notifications: [type.id] }))}
                        className="w-4 h-4 text-brand-aqua border-neutral-300 focus:ring-brand-aqua"
                      />
                      <span className="ml-3">
                        <span className="block text-sm font-medium text-neutral-900">
                          {type.label}
                        </span>
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* tomiwa: Example match preview */}
              <div className="bg-neutral-50 rounded-xl p-6">
                <h3 className="text-sm font-medium text-neutral-700 mb-4">Example Candidate Match</h3>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-base font-medium text-neutral-900">Sales Executive</h4>
                      <p className="text-sm text-neutral-600 mt-1">4 years experience • Abuja</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {['Negotiation', 'CRM', 'Team Leadership'].map(skill => (
                          <span
                            key={skill}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                      <p className="text-sm text-neutral-600 mt-2">
                        Expected Salary: ₦300,000
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        92% Match
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* tomiwa: Form actions */}
              <div className="pt-6 space-y-4">
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
                  ) : (
                    'Save Preferences'
                  )}
                </button>
                <Link
                  href="/post-job/setup/company"
                  className="block w-full text-center text-neutral-600 hover:text-neutral-900"
                >
                  Back to Company Details
                </Link>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* tomiwa: Global footer */}
      <footer className="bg-white border-t border-neutral-200 mt-16">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-neutral-900 tracking-wider uppercase">For Employers</h3>
              <ul className="mt-4 space-y-4">
                <li><a href="#" className="text-base text-neutral-600 hover:text-neutral-900">Post a Job</a></li>
                <li><a href="#" className="text-base text-neutral-600 hover:text-neutral-900">Pricing</a></li>
                <li><a href="#" className="text-base text-neutral-600 hover:text-neutral-900">Employer Resources</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-neutral-900 tracking-wider uppercase">For Job Seekers</h3>
              <ul className="mt-4 space-y-4">
                <li><a href="#" className="text-base text-neutral-600 hover:text-neutral-900">Browse Jobs</a></li>
                <li><a href="#" className="text-base text-neutral-600 hover:text-neutral-900">Career Resources</a></li>
                <li><a href="#" className="text-base text-neutral-600 hover:text-neutral-900">Resume Builder</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-neutral-900 tracking-wider uppercase">Company</h3>
              <ul className="mt-4 space-y-4">
                <li><a href="#" className="text-base text-neutral-600 hover:text-neutral-900">About Us</a></li>
                <li><a href="#" className="text-base text-neutral-600 hover:text-neutral-900">Blog</a></li>
                <li><a href="#" className="text-base text-neutral-600 hover:text-neutral-900">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-neutral-900 tracking-wider uppercase">Legal</h3>
              <ul className="mt-4 space-y-4">
                <li><a href="#" className="text-base text-neutral-600 hover:text-neutral-900">Privacy Policy</a></li>
                <li><a href="#" className="text-base text-neutral-600 hover:text-neutral-900">Terms of Service</a></li>
                <li><a href="#" className="text-base text-neutral-600 hover:text-neutral-900">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-neutral-200 pt-8">
            <p className="text-base text-neutral-500 text-center">&copy; 2024 Ready Job Seeker. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 