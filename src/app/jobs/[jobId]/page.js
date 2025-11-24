/**
 * File: src/app/jobs/[jobId]/page.js
 * 
 * tomiwa: Job Detail Page - Read-only job detail with sticky Apply CTA
 * Complete job detail page with hero section, two-column layout, and sticky actions panel
 * 
 * Features:
 * - Hero section with job title, company, and location
 * - Two-column layout: left (description, responsibilities, requirements), right (sticky panel)
 * - Sticky panel with Apply, Save/Unsave, Share buttons and key facts
 * - Mobile responsive with bottom sticky bar
 * - Save/unsave functionality with optimistic updates
 * - Accessibility features and proper ARIA labels
 */

'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import CandidateDashboardLayout from '@/components/layouts/CandidateDashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Toast from '@/components/ui/Toast';
import {
  // tomiwa: Icon imports for job detail functionality
  BookmarkIcon,
  ShareIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  ClockIcon,
  CalendarIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
  AcademicCapIcon,
  CheckCircleIcon,
  ArrowLeftIcon,
  PaperAirplaneIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid';

// tomiwa: Mock job data - in real app, this would come from API
const mockJobData = {
  1: {
    id: 1,
    jobTitle: 'Senior Product Designer',
    company: 'Figma',
    companyLogo: 'https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=100&h=100&fit=crop',
    location: 'Remote',
    jobType: 'Full-time',
    salary: '$120k - $180k',
    postedDate: '2024-10-28',
    description: 'Join our design team to create beautiful, intuitive interfaces that millions of users love. Work on cutting-edge design tools and collaborate with world-class designers to shape the future of design collaboration.',
    responsibilities: [
      'Design and prototype new features for Figma\'s core product',
      'Collaborate with product managers and engineers to define product requirements',
      'Conduct user research and usability testing to validate design decisions',
      'Maintain and evolve our design system to ensure consistency across products',
      'Mentor junior designers and contribute to design culture',
      'Present design concepts and rationale to stakeholders and leadership'
    ],
    requirements: [
      '5+ years of experience in product design or related field',
      'Strong portfolio demonstrating expertise in user-centered design',
      'Proficiency in Figma, Sketch, or similar design tools',
      'Experience with design systems and component libraries',
      'Understanding of front-end development principles (HTML, CSS, JavaScript)',
      'Excellent communication and collaboration skills',
      'Bachelor\'s degree in Design, HCI, or related field preferred'
    ],
    niceToHave: [
      'Experience with prototyping tools like Framer or Principle',
      'Knowledge of accessibility standards and inclusive design',
      'Previous experience at a design tool company',
      'Familiarity with agile development processes'
    ],
    companySize: '1000+ employees',
    experience: '5+ years',
    remote: true,
    benefits: [
      'Competitive salary and equity package',
      'Comprehensive health, dental, and vision insurance',
      'Unlimited PTO and flexible working hours',
      'Professional development budget',
      'Home office setup stipend',
      'Annual company retreats'
    ],
    tags: ['Design Systems', 'Figma', 'Prototyping', 'User Research'],
    isUrgent: false,
    isSaved: true,
  },
  2: {
    id: 2,
    jobTitle: 'UX/UI Designer',
    company: 'Paystack',
    companyLogo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop',
    location: 'Lagos, Nigeria',
    jobType: 'Full-time',
    salary: '$80k - $120k',
    postedDate: '2024-10-25',
    description: 'Design seamless payment experiences for millions of African businesses. Work with a talented team to solve complex fintech challenges and create intuitive interfaces that make payments simple and secure.',
    responsibilities: [
      'Design user interfaces for web and mobile payment applications',
      'Create wireframes, prototypes, and high-fidelity mockups',
      'Collaborate with product and engineering teams on feature development',
      'Conduct user research to understand merchant and customer needs',
      'Optimize conversion funnels and payment flows',
      'Ensure designs meet accessibility and usability standards'
    ],
    requirements: [
      '3+ years of experience in UX/UI design',
      'Strong portfolio showcasing mobile and web design work',
      'Proficiency in design tools like Figma, Sketch, or Adobe XD',
      'Understanding of user-centered design principles',
      'Experience with responsive design and mobile-first approach',
      'Knowledge of HTML/CSS basics',
      'Strong problem-solving and analytical skills'
    ],
    niceToHave: [
      'Experience in fintech or payments industry',
      'Knowledge of African market dynamics',
      'Familiarity with design systems',
      'Experience with user testing tools'
    ],
    companySize: '500-1000 employees',
    experience: '3+ years',
    remote: false,
    benefits: [
      'Competitive salary with performance bonuses',
      'Health insurance for employee and family',
      'Learning and development opportunities',
      'Flexible working arrangements',
      'Stock options',
      'Team building activities'
    ],
    tags: ['Fintech', 'Mobile Design', 'User Testing', 'Sketch'],
    isUrgent: true,
    isSaved: true,
  },
  // tomiwa: Add more mock jobs as needed
};

export default function JobDetail() {
  const params = useParams();
  const router = useRouter();
  const jobId = params.jobId;
  
  // tomiwa: State management
  const [job, setJob] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [toast, setToast] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showMobileActions, setShowMobileActions] = useState(false);

  // tomiwa: Load job data
  useEffect(() => {
    const loadJob = async () => {
      setIsLoading(true);
      // johnson: ExistingCode - Simulate API call
      setTimeout(() => {
        const jobData = mockJobData[jobId];
        if (jobData) {
          setJob(jobData);
          setIsSaved(jobData.isSaved);
        }
        setIsLoading(false);
      }, 500);
    };

    if (jobId) {
      loadJob();
    }
  }, [jobId]);

  // tomiwa: Handle save/unsave job
  const handleToggleSave = () => {
    const newSavedState = !isSaved;
    setIsSaved(newSavedState); // tomiwa: Optimistic update
    
    setToast({
      type: 'success',
      message: newSavedState ? 'Job saved successfully!' : 'Job removed from saved jobs',
    });

    // johnson: ExistingCode - In real app, make API call here
    // updateJobSaveStatus(jobId, newSavedState);
  };

  // tomiwa: Handle share job
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${job.jobTitle} at ${job.company}`,
          text: `Check out this job opportunity: ${job.jobTitle} at ${job.company}`,
          url: window.location.href,
        });
      } catch (error) {
        // tomiwa: Fallback to clipboard
        handleCopyLink();
      }
    } else {
      handleCopyLink();
    }
  };

  // tomiwa: Copy link to clipboard
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setToast({
      type: 'success',
      message: 'Job link copied to clipboard!',
    });
  };

  // tomiwa: Format date helper
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // tomiwa: Loading skeleton
  if (isLoading) {
    return (
      <CandidateDashboardLayout>
        {/* tomiwa: Loading skeleton */}
        <div className="bg-gradient-to-r from-brand-aqua to-primary-700 animate-pulse -mt-8 -mx-6 mb-8">
          <div className="px-4 sm:px-6 lg:px-8 py-12">
            <div className="h-8 bg-white/20 rounded-lg w-1/3 mb-4"></div>
            <div className="h-6 bg-white/20 rounded-lg w-1/4 mb-2"></div>
            <div className="h-5 bg-white/20 rounded-lg w-1/5"></div>
          </div>
        </div>
        <div className="px-4 sm:px-6 lg:px-8 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="h-32 bg-neutral-200 rounded-xl animate-pulse"></div>
              <div className="h-48 bg-neutral-200 rounded-xl animate-pulse"></div>
              <div className="h-64 bg-neutral-200 rounded-xl animate-pulse"></div>
            </div>
            <div className="h-96 bg-neutral-200 rounded-xl animate-pulse"></div>
          </div>
        </div>
      </CandidateDashboardLayout>
    );
  }

  // tomiwa: Job not found
  if (!job) {
    return (
      <CandidateDashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Card className="p-12 text-center max-w-md mx-auto">
            <ExclamationTriangleIcon className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-neutral-900 mb-2">Job Not Found</h2>
            <p className="text-neutral-600 mb-6">The job you're looking for doesn't exist or has been removed.</p>
            <Link href="/jobs">
              <Button>Browse All Jobs</Button>
            </Link>
          </Card>
        </div>
      </CandidateDashboardLayout>
    );
  }

  return (
    <CandidateDashboardLayout>
      {/* tomiwa: Hero Section with gradient background */}
      <div className="bg-gradient-to-r from-brand-aqua to-primary-700 -mt-8 -mx-6 mb-8">
        <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* tomiwa: Back button */}
          <button
            onClick={() => router.back()}
            className="flex items-center text-white/80 hover:text-white mb-6 transition-colors"
            aria-label="Go back to previous page"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Back
          </button>

          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
            <div className="flex-1">
              <div className="flex items-start space-x-4 mb-4">
                <img
                  src={job.companyLogo}
                  alt={`${job.company} logo`}
                  className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                />
                <div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-white mb-2">
                    {job.jobTitle}
                    {job.isUrgent && (
                      <span className="ml-3 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-secondary-500 text-white">
                        Urgent
                      </span>
                    )}
                  </h1>
                  <p className="text-white/90 text-lg font-medium mb-2">{job.company}</p>
                  <div className="flex flex-wrap items-center gap-4 text-white/80">
                    <div className="flex items-center">
                      <MapPinIcon className="w-5 h-5 mr-2" />
                      {job.location}
                    </div>
                    <div className="flex items-center">
                      <ClockIcon className="w-5 h-5 mr-2" />
                      {job.jobType}
                    </div>
                    <div className="flex items-center">
                      <CalendarIcon className="w-5 h-5 mr-2" />
                      Posted {formatDate(job.postedDate)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* tomiwa: Desktop action buttons */}
            <div className="hidden sm:flex items-center space-x-3 mt-4 sm:mt-0">
              <button
                onClick={handleToggleSave}
                className="flex items-center px-4 py-2 bg-white/10 border border-white/30 text-white rounded-xl hover:bg-white/20 transition-colors"
                aria-label={isSaved ? 'Remove from saved jobs' : 'Save job'}
              >
                {isSaved ? (
                  <BookmarkSolidIcon className="w-5 h-5 mr-2" />
                ) : (
                  <BookmarkIcon className="w-5 h-5 mr-2" />
                )}
                {isSaved ? 'Saved' : 'Save'}
              </button>
              <button
                onClick={handleShare}
                className="flex items-center px-4 py-2 bg-white/10 border border-white/30 text-white rounded-xl hover:bg-white/20 transition-colors"
                aria-label="Share job"
              >
                <ShareIcon className="w-5 h-5 mr-2" />
                Share
              </button>
              <Link href={`/apply/${job.id}`}>
                <Button className="bg-brand-orange hover:bg-brand-orange/90">
                  <PaperAirplaneIcon className="w-5 h-5 mr-2" />
                  Apply Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* tomiwa: Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* tomiwa: Left Column - Job Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* tomiwa: Job Description */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-neutral-900 mb-4">About this role</h2>
              <p className="text-neutral-700 leading-relaxed">{job.description}</p>
            </Card>

            {/* tomiwa: Responsibilities */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-neutral-900 mb-4">What you'll do</h2>
              <ul className="space-y-3">
                {job.responsibilities.map((responsibility, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircleIcon className="w-5 h-5 text-brand-aqua mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-neutral-700">{responsibility}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* tomiwa: Requirements */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-neutral-900 mb-4">What we're looking for</h2>
              <ul className="space-y-3 mb-6">
                {job.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircleIcon className="w-5 h-5 text-brand-aqua mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-neutral-700">{requirement}</span>
                  </li>
                ))}
              </ul>

              {job.niceToHave && job.niceToHave.length > 0 && (
                <>
                  <h3 className="text-lg font-medium text-neutral-900 mb-3">Nice to have</h3>
                  <ul className="space-y-3">
                    {job.niceToHave.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-5 h-5 border-2 border-neutral-300 rounded-full mr-3 mt-0.5 flex-shrink-0"></div>
                        <span className="text-neutral-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </Card>

            {/* tomiwa: Benefits */}
            {job.benefits && job.benefits.length > 0 && (
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-neutral-900 mb-4">Benefits & Perks</h2>
                <ul className="space-y-3">
                  {job.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircleIcon className="w-5 h-5 text-brand-aqua mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-neutral-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            )}

            {/* tomiwa: Skills Tags */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-neutral-900 mb-4">Skills & Technologies</h2>
              <div className="flex flex-wrap gap-2">
                {job.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-brand-aqua/10 text-brand-aqua border border-brand-aqua/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Card>
          </div>

          {/* tomiwa: Right Column - Sticky Panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* tomiwa: Apply Panel */}
              <Card className="p-6">
                <div className="text-center mb-6">
                  <div className="text-2xl font-bold text-neutral-900 mb-1">{job.salary}</div>
                  <div className="text-neutral-600">Annual salary</div>
                </div>

                <Link href={`/apply/${job.id}`} className="block mb-4">
                  <Button className="w-full bg-brand-orange hover:bg-brand-orange/90" size="lg">
                    <PaperAirplaneIcon className="w-5 h-5 mr-2" />
                    Apply for this job
                  </Button>
                </Link>

                <div className="flex space-x-2">
                  <button
                    onClick={handleToggleSave}
                    className={`flex-1 flex items-center justify-center px-4 py-2 border rounded-xl transition-colors ${
                      isSaved
                        ? 'bg-brand-aqua text-white border-brand-aqua'
                        : 'border-neutral-300 text-neutral-700 hover:bg-neutral-50'
                    }`}
                    aria-label={isSaved ? 'Remove from saved jobs' : 'Save job'}
                  >
                    {isSaved ? (
                      <BookmarkSolidIcon className="w-5 h-5 mr-2" />
                    ) : (
                      <BookmarkIcon className="w-5 h-5 mr-2" />
                    )}
                    {isSaved ? 'Saved' : 'Save'}
                  </button>
                  <button
                    onClick={handleShare}
                    className="flex-1 flex items-center justify-center px-4 py-2 border border-neutral-300 text-neutral-700 rounded-xl hover:bg-neutral-50 transition-colors"
                    aria-label="Share job"
                  >
                    <ShareIcon className="w-5 h-5 mr-2" />
                    Share
                  </button>
                </div>
              </Card>

              {/* tomiwa: Job Facts */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-neutral-900 mb-4">Job Details</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-neutral-600">
                      <ClockIcon className="w-5 h-5 mr-3" />
                      Job Type
                    </div>
                    <span className="font-medium text-neutral-900">{job.jobType}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-neutral-600">
                      <MapPinIcon className="w-5 h-5 mr-3" />
                      Location
                    </div>
                    <span className="font-medium text-neutral-900">{job.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-neutral-600">
                      <CurrencyDollarIcon className="w-5 h-5 mr-3" />
                      Salary
                    </div>
                    <span className="font-medium text-neutral-900">{job.salary}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-neutral-600">
                      <AcademicCapIcon className="w-5 h-5 mr-3" />
                      Experience
                    </div>
                    <span className="font-medium text-neutral-900">{job.experience}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-neutral-600">
                      <BuildingOfficeIcon className="w-5 h-5 mr-3" />
                      Company Size
                    </div>
                    <span className="font-medium text-neutral-900">{job.companySize}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-neutral-600">
                      <CalendarIcon className="w-5 h-5 mr-3" />
                      Posted
                    </div>
                    <span className="font-medium text-neutral-900">{formatDate(job.postedDate)}</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* tomiwa: Mobile Sticky Bottom Bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 p-4 safe-area-pb">
        <div className="flex space-x-3">
          <button
            onClick={handleToggleSave}
            className={`flex items-center justify-center px-4 py-3 border rounded-xl transition-colors ${
              isSaved
                ? 'bg-brand-aqua text-white border-brand-aqua'
                : 'border-neutral-300 text-neutral-700'
            }`}
            aria-label={isSaved ? 'Remove from saved jobs' : 'Save job'}
          >
            {isSaved ? (
              <BookmarkSolidIcon className="w-5 h-5" />
            ) : (
              <BookmarkIcon className="w-5 h-5" />
            )}
          </button>
          <button
            onClick={handleShare}
            className="flex items-center justify-center px-4 py-3 border border-neutral-300 text-neutral-700 rounded-xl"
            aria-label="Share job"
          >
            <ShareIcon className="w-5 h-5" />
          </button>
          <Link href={`/apply/${job.id}`} className="flex-1">
            <Button className="w-full bg-brand-orange hover:bg-brand-orange/90" size="lg">
              <PaperAirplaneIcon className="w-5 h-5 mr-2" />
              Apply Now
            </Button>
          </Link>
        </div>
      </div>

      {/* tomiwa: Toast Notifications */}
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </CandidateDashboardLayout>
  );
}
