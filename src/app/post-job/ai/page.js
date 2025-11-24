"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineLightningBolt, HiOutlineGlobeAlt, HiOutlineCurrencyDollar } from 'react-icons/hi';

// tomiwa: Step-based AI job posting flow
export default function AIJobPosting() {
  // tomiwa: State management for multi-step form
  const [currentStep, setCurrentStep] = useState(1);
  const [jobOverview, setJobOverview] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [skills, setSkills] = useState([]);
  const [location, setLocation] = useState({ type: 'Onsite', city: '' });
  const [employmentType, setEmploymentType] = useState('Full-time');
  const [compensation, setCompensation] = useState({ min: '', max: '' });
  const [isGenerating, setIsGenerating] = useState(false);
  const [email, setEmail] = useState('');
  const [cookieConsent, setCookieConsent] = useState(true);

  // tomiwa: Handle job overview submission
  const handleOverviewSubmit = async (e) => {
    e.preventDefault();
    setIsGenerating(true);
    setCurrentStep(2);
    
    // Simulate AI generation delay
    setTimeout(() => {
      setJobTitle('Senior Product Manager');
      setJobDescription(`About the Role:\nWe're seeking an experienced Product Manager to lead our digital transformation initiatives...\n\nResponsibilities:\n• Drive product strategy and roadmap\n• Lead cross-functional teams\n• Define and track key metrics\n\nRequirements:\n• 5+ years of product management experience\n• Strong analytical and communication skills\n• Experience with agile methodologies\n\nBenefits:\n• Competitive salary\n• Health insurance\n• Remote work options\n• Professional development budget`);
      setSkills(['Product Management', 'Agile', 'Analytics', 'Leadership']);
      setCurrentStep(3);
      setIsGenerating(false);
    }, 3000);
  };

  // tomiwa: Handle draft acceptance
  const handleAcceptDraft = () => {
    setCurrentStep(4);
  };

  // tomiwa: Render step content based on current step
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-5xl font-display font-bold text-brand-black mb-6">
              Post Smarter with AI
            </h1>
            <p className="text-xl text-neutral-600 mb-12 font-sans">
              Let our AI help you write clear, engaging job posts that attract the right talent in minutes.
            </p>
            <div className="flex gap-4 justify-center mb-16">
              <button
                onClick={() => setCurrentStep(2)}
                className="px-8 py-4 bg-brand-orange text-white rounded-xl font-semibold hover:bg-opacity-90 transition-all duration-300 shadow-lg shadow-brand-orange/25"
              >
                Start with AI
              </button>
              <Link
                href="/post-job/manual"
                className="px-8 py-4 border-2 border-neutral-200 text-neutral-700 rounded-xl font-semibold hover:bg-neutral-50 transition-all duration-300"
              >
                Post Manually
              </Link>
            </div>
            <form onSubmit={handleOverviewSubmit} className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  value={jobOverview}
                  onChange={(e) => setJobOverview(e.target.value)}
                  placeholder="Briefly describe the role you're hiring for (e.g., Sales Executive for an FMCG brand)"
                  className="w-full px-6 py-4 text-lg border-2 border-neutral-200 rounded-full focus:ring-2 focus:ring-brand-aqua focus:border-brand-aqua"
                  maxLength={200}
                />
                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-neutral-400">
                  {jobOverview.length}/200
                </span>
              </div>
              <p className="text-neutral-500 mt-3 text-sm">
                AI will use this to generate your job description
              </p>
              <button
                type="submit"
                disabled={jobOverview.length < 10}
                className="mt-8 px-8 py-4 bg-brand-orange text-white rounded-xl font-semibold hover:bg-opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Generate Job Post
              </button>
            </form>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-3xl mx-auto text-center py-16"
          >
            <div className="w-16 h-16 mx-auto mb-8 relative">
              <div className="absolute inset-0 bg-brand-aqua/20 rounded-full animate-ping"></div>
              <div className="relative bg-brand-aqua/10 rounded-full flex items-center justify-center">
                <HiOutlineLightningBolt className="w-8 h-8 text-brand-aqua" />
              </div>
            </div>
            <h2 className="text-2xl font-display font-bold text-brand-black mb-4">
              One moment—your job post is being drafted
            </h2>
            <p className="text-neutral-600">
              Our AI is crafting a compelling job description based on your overview
            </p>
            
            {/* tomiwa: Skeleton loading state */}
            <div className="mt-12 bg-white rounded-xl p-8 shadow-lg">
              <div className="animate-pulse space-y-4">
                <div className="h-8 bg-neutral-100 rounded-lg w-3/4 mx-auto"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-neutral-100 rounded w-full"></div>
                  <div className="h-4 bg-neutral-100 rounded w-5/6"></div>
                  <div className="h-4 bg-neutral-100 rounded w-4/6"></div>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-6xl mx-auto"
          >
            <div className="bg-brand-aqua/10 border border-brand-aqua/20 rounded-xl p-4 mb-8 flex items-center gap-3">
              <HiOutlineLightningBolt className="w-5 h-5 text-brand-aqua" />
              <p className="text-brand-black">Generated by AI — you can edit anything</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-6">
                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="Job Title"
                  className="w-full px-4 py-3 text-xl font-semibold border-2 border-neutral-200 rounded-xl focus:ring-2 focus:ring-brand-aqua focus:border-brand-aqua"
                />

                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Job Description"
                  rows={12}
                  className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:ring-2 focus:ring-brand-aqua focus:border-brand-aqua"
                />

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Required Skills
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-brand-aqua/10 text-brand-aqua rounded-full text-sm"
                      >
                        {skill}
                        <button
                          onClick={() => setSkills(skills.filter((_, i) => i !== index))}
                          className="ml-2 text-brand-aqua hover:text-brand-orange"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 border-2 border-neutral-200">
                  <h3 className="text-lg font-semibold mb-4">Job Details</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Location Type
                      </label>
                      <select
                        value={location.type}
                        onChange={(e) => setLocation({ ...location, type: e.target.value })}
                        className="w-full px-3 py-2 border-2 border-neutral-200 rounded-xl focus:ring-2 focus:ring-brand-aqua focus:border-brand-aqua"
                      >
                        <option>Onsite</option>
                        <option>Hybrid</option>
                        <option>Remote</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        value={location.city}
                        onChange={(e) => setLocation({ ...location, city: e.target.value })}
                        placeholder="e.g., Lagos"
                        className="w-full px-3 py-2 border-2 border-neutral-200 rounded-xl focus:ring-2 focus:ring-brand-aqua focus:border-brand-aqua"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Employment Type
                      </label>
                      <select
                        value={employmentType}
                        onChange={(e) => setEmploymentType(e.target.value)}
                        className="w-full px-3 py-2 border-2 border-neutral-200 rounded-xl focus:ring-2 focus:ring-brand-aqua focus:border-brand-aqua"
                      >
                        <option>Full-time</option>
                        <option>Part-time</option>
                        <option>Contract</option>
                        <option>Internship</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Compensation Range
                      </label>
                      <div className="flex gap-2 items-center">
                        <input
                          type="text"
                          value={compensation.min}
                          onChange={(e) => setCompensation({ ...compensation, min: e.target.value })}
                          placeholder="Min"
                          className="w-full px-3 py-2 border-2 border-neutral-200 rounded-xl focus:ring-2 focus:ring-brand-aqua focus:border-brand-aqua"
                        />
                        <span className="text-neutral-400">-</span>
                        <input
                          type="text"
                          value={compensation.max}
                          onChange={(e) => setCompensation({ ...compensation, max: e.target.value })}
                          placeholder="Max"
                          className="w-full px-3 py-2 border-2 border-neutral-200 rounded-xl focus:ring-2 focus:ring-brand-aqua focus:border-brand-aqua"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-8 border-t border-neutral-200 pt-8">
              <div className="flex gap-4">
                <button
                  onClick={handleAcceptDraft}
                  className="px-6 py-3 bg-brand-orange text-white rounded-xl font-semibold hover:bg-opacity-90 transition-all duration-300"
                >
                  Accept & Continue
                </button>
                <button
                  onClick={() => setIsGenerating(true)}
                  className="px-6 py-3 border-2 border-neutral-200 text-neutral-700 rounded-xl font-semibold hover:bg-neutral-50 transition-all duration-300"
                >
                  Regenerate with AI
                </button>
              </div>
              <button
                onClick={() => setCurrentStep(1)}
                className="text-neutral-600 hover:text-neutral-900"
              >
                Edit manually instead
              </button>
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-xl mx-auto text-center py-16"
          >
            <div className="w-16 h-16 mx-auto mb-8 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-display font-bold text-brand-black mb-4">
              Your AI-powered job post is ready!
            </h2>
            <div className="flex gap-4 justify-center mt-8">
              <button
                onClick={() => console.log('Publishing...')}
                className="px-6 py-3 bg-brand-orange text-white rounded-xl font-semibold hover:bg-opacity-90 transition-all duration-300"
              >
                Publish Now
              </button>
              <button
                onClick={() => console.log('Saving draft...')}
                className="px-6 py-3 border-2 border-neutral-200 text-neutral-700 rounded-xl font-semibold hover:bg-neutral-50 transition-all duration-300"
              >
                Save as Draft
              </button>
            </div>
            <button
              onClick={() => console.log('Preview...')}
              className="mt-4 text-neutral-600 hover:text-neutral-900"
            >
              Preview full listing
            </button>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <main className="py-12 px-4 sm:px-6 lg:px-8">
        {renderStepContent()}
      </main>

      {/* tomiwa: Footer from landing page */}
      <footer className="bg-neutral-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div>
              <h3 className="text-lg font-semibold mb-6">About Us</h3>
              <p className="text-neutral-400 mb-4">
                Reposebay is Nigeria's leading job platform, connecting talented professionals with their dream careers.
              </p>
              <div className="space-y-2">
                <p className="text-neutral-400">Phone: +234 123 456 7890</p>
                <p className="text-neutral-400">Email: hello@reposebay.com</p>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6">Company</h4>
              <ul className="space-y-4">
                <li><Link href="/blog" className="text-neutral-400 hover:text-white">Blogs</Link></li>
                <li><Link href="/contact" className="text-neutral-400 hover:text-white">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6">Services</h4>
              <ul className="space-y-4">
                <li><Link href="/jobs" className="text-neutral-400 hover:text-white">Jobs</Link></li>
                <li><Link href="/companies" className="text-neutral-400 hover:text-white">Companies</Link></li>
                <li><Link href="/candidates" className="text-neutral-400 hover:text-white">Candidates</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6">Connect</h4>
              <div className="flex gap-4">
                <Link href="https://linkedin.com" className="text-neutral-400 hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </Link>
                <Link href="https://facebook.com" className="text-neutral-400 hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                  </svg>
                </Link>
                <Link href="https://instagram.com" className="text-neutral-400 hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-neutral-800">
            <div className="text-center text-neutral-400">
              © 2024 Reposebay. All Right Reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 