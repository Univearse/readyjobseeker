"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineOfficeBuilding, HiOutlineGlobe, HiOutlineLocationMarker, HiOutlinePhone, HiOutlineUpload } from 'react-icons/hi';
import { FiAlertCircle, FiCheck } from 'react-icons/fi';

// tomiwa: Employer setup component after account creation
export default function EmployerSetup() {
  // tomiwa: State management
  const [step, setStep] = useState(2); // Starting at step 2 (Company)
  const [loading, setLoading] = useState(false);
  const [logo, setLogo] = useState(null);
  const [formData, setFormData] = useState({
    companyName: '',
    website: '',
    size: '',
    industry: '',
    location: '',
    phone: '',
  });

  // tomiwa: Mock verification email for demo
  const userEmail = "user@company.com";

  // tomiwa: Company size options
  const companySizes = [
    '1-10 employees',
    '11-50 employees',
    '51-200 employees',
    '201-500 employees',
    '501-1000 employees',
    '1000+ employees'
  ];

  // tomiwa: Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // tomiwa: Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // tomiwa: Route to preferences step
      setStep(3);
    } catch (error) {
      console.error('Setup error:', error);
    } finally {
      setLoading(false);
    }
  };

  // tomiwa: Handle logo upload
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // tomiwa: Handle skip action
  const handleSkip = () => {
    window.location.href = '/post-job/create';
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* tomiwa: Breadcrumb */}
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
          <li>Create account</li>
        </ol>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-12 sm:px-6">
        {/* tomiwa: Email verification banner */}
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8 rounded-lg"
          >
            <div className="flex">
              <div className="flex-shrink-0">
                <FiAlertCircle className="h-5 w-5 text-blue-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  We've sent a verification link to {userEmail}. You can continue setting up while you verify.
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* tomiwa: Main heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-neutral-900 mb-4">
            Welcome to Ready Job Seeker
          </h1>
          <p className="text-lg text-neutral-600">
            Let's finish your employer setup so you can post your first job.
          </p>
        </div>

        {/* tomiwa: Progress steps */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-between">
            {['Account', 'Company', 'Preferences'].map((stepName, index) => (
              <div key={index} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  index + 1 < step ? 'bg-green-500' :
                  index + 1 === step ? 'bg-brand-orange' :
                  'bg-neutral-200'
                } text-white`}>
                  {index + 1 < step ? (
                    <FiCheck className="w-5 h-5" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                <span className={`ml-2 text-sm ${
                  index + 1 === step ? 'text-brand-orange font-medium' :
                  index + 1 < step ? 'text-green-500' :
                  'text-neutral-500'
                }`}>
                  {stepName}
                </span>
                {index < 2 && (
                  <div className={`w-24 h-0.5 mx-4 ${
                    index + 1 < step ? 'bg-green-500' : 'bg-neutral-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* tomiwa: Setup form */}
        <div className="max-w-[640px] mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* tomiwa: Company logo upload */}
              <div className="flex items-center space-x-6">
                <div className="relative w-24 h-24 bg-neutral-100 rounded-xl flex items-center justify-center overflow-hidden">
                  {logo ? (
                    <>
                      <Image
                        src={logo}
                        alt="Company logo"
                        fill
                        className="object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setLogo(null)}
                        className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white opacity-0 hover:opacity-100 transition-opacity"
                      >
                        Remove
                      </button>
                    </>
                  ) : (
                    <HiOutlineUpload className="w-8 h-8 text-neutral-400" />
                  )}
                </div>
                <div>
                  <label
                    htmlFor="logo-upload"
                    className="inline-flex items-center px-4 py-2 border border-neutral-300 rounded-xl text-sm font-medium text-neutral-700 bg-white hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-aqua cursor-pointer"
                  >
                    Upload logo
                    <input
                      id="logo-upload"
                      type="file"
                      className="sr-only"
                      accept="image/*"
                      onChange={handleLogoUpload}
                    />
                  </label>
                  <p className="mt-1 text-sm text-neutral-500">
                    PNG, JPG up to 5MB
                  </p>
                </div>
              </div>

              {/* tomiwa: Company details */}
              <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-neutral-700 mb-1">
                  Company name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <HiOutlineOfficeBuilding className="h-5 w-5 text-neutral-400" />
                  </div>
                  <input
                    id="companyName"
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="block w-full pl-10 px-4 py-3 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-brand-aqua focus:border-brand-aqua"
                    placeholder="Enter your company name"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="website" className="block text-sm font-medium text-neutral-700 mb-1">
                  Company website (optional)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <HiOutlineGlobe className="h-5 w-5 text-neutral-400" />
                  </div>
                  <input
                    id="website"
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="block w-full pl-10 px-4 py-3 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-brand-aqua focus:border-brand-aqua"
                    placeholder="https://your-company.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="size" className="block text-sm font-medium text-neutral-700 mb-1">
                  Company size
                </label>
                <select
                  id="size"
                  value={formData.size}
                  onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                  className="block w-full px-4 py-3 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-brand-aqua focus:border-brand-aqua"
                  required
                >
                  <option value="">Select company size</option>
                  {companySizes.map((size) => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="industry" className="block text-sm font-medium text-neutral-700 mb-1">
                  Industry
                </label>
                <input
                  id="industry"
                  type="text"
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  className="block w-full px-4 py-3 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-brand-aqua focus:border-brand-aqua"
                  placeholder="e.g. Technology, Healthcare, Finance"
                  required
                />
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-neutral-700 mb-1">
                  HQ location
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <HiOutlineLocationMarker className="h-5 w-5 text-neutral-400" />
                  </div>
                  <input
                    id="location"
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="block w-full pl-10 px-4 py-3 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-brand-aqua focus:border-brand-aqua"
                    placeholder="City, Country"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-1">
                  Phone (optional)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <HiOutlinePhone className="h-5 w-5 text-neutral-400" />
                  </div>
                  <input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="block w-full pl-10 px-4 py-3 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-brand-aqua focus:border-brand-aqua"
                    placeholder="Your phone number"
                  />
                </div>
              </div>

              {/* tomiwa: Form actions */}
              <div className="pt-6">
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
                    'Continue'
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleSkip}
                  className="mt-3 w-full text-center text-sm text-neutral-600 hover:text-neutral-900"
                >
                  Skip for now
                </button>
              </div>
            </form>
          </div>

          {/* tomiwa: Help text */}
          <p className="mt-4 text-center text-sm text-neutral-500">
            You can change these anytime in Dashboard → Company
          </p>

          {/* tomiwa: Quick actions */}
          <div className="mt-8 flex flex-col items-center space-y-4">
            <div className="flex space-x-4">
              <Link
                href="/post-job/ai"
                className="inline-flex items-center px-6 py-3 border-2 border-brand-orange text-base font-medium rounded-xl text-brand-orange hover:bg-brand-orange/5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-orange"
              >
                Post with AI
              </Link>
              <Link
                href="/post-job/create"
                className="inline-flex items-center px-6 py-3 text-base font-medium rounded-xl text-neutral-700 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500"
              >
                Post manually
              </Link>
            </div>
            <Link
              href="/pricing"
              className="text-sm text-brand-aqua hover:text-brand-aqua/80"
            >
              View subscription plans
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
} 