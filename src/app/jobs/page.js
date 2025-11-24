/**
 * File: src/app/jobs/page.js
 * 
 * tomiwa: Jobs Browse Page
 * Displays all available job listings with filtering and search capabilities.
 * Candidates can browse, search, filter, and save jobs.
 * 
 * Features:
 * - Search bar for job titles, companies, or keywords
 * - Filter by location, job type, salary range
 * - Sort by date, salary, relevance
 * - Save/unsave jobs
 * - View job details
 * - Responsive design for all screen sizes
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  MagnifyingGlassIcon,
  MapPinIcon,
  BanknotesIcon,
  BookmarkIcon,
  EyeIcon,
  FunnelIcon,
  StarIcon,
  SparklesIcon,
  BriefcaseIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid';

// tomiwa: Mock data for all available jobs
// In production, this would come from an API
const allJobs = [
  {
    id: 1,
    title: 'Product Designer',
    company: 'Paystack',
    companyLogo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop',
    location: 'Lagos, Nigeria',
    jobType: 'Full-time',
    salary: '$80k - $120k',
    postedDate: '2 days ago',
    tag: 'Featured',
    tagColor: 'bg-brand-orange text-white',
    description: 'We are looking for a talented Product Designer to join our growing team...',
    isFeatured: true,
  },
  {
    id: 2,
    title: 'Senior UX Designer',
    company: 'Flutterwave',
    companyLogo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=100&h=100&fit=crop',
    location: 'Remote',
    jobType: 'Full-time',
    salary: '$90k - $140k',
    postedDate: '1 day ago',
    tag: 'New',
    tagColor: 'bg-brand-aqua text-white',
    description: 'Join our design team and help shape the future of payments in Africa...',
    isFeatured: true,
  },
  {
    id: 3,
    title: 'Product Designer',
    company: 'Figma',
    companyLogo: 'https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=100&h=100&fit=crop',
    location: 'Remote (Worldwide)',
    jobType: 'Full-time',
    salary: '$100k - $150k',
    postedDate: '3 days ago',
    tag: 'Featured',
    tagColor: 'bg-brand-orange text-white',
    description: 'Help us build the design tools that millions of designers use every day...',
    isFeatured: true,
  },
  {
    id: 4,
    title: 'Lead Product Designer',
    company: 'Interswitch',
    companyLogo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&h=100&fit=crop',
    location: 'Hybrid - Lagos',
    jobType: 'Full-time',
    salary: '$70k - $110k',
    postedDate: '5 days ago',
    tag: 'New',
    tagColor: 'bg-brand-aqua text-white',
    description: 'Lead design initiatives for our fintech products across Africa...',
    isFeatured: true,
  },
  {
    id: 5,
    title: 'Product Designer',
    company: 'Kuda Bank',
    companyLogo: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=100&h=100&fit=crop',
    location: 'Lagos, Nigeria',
    jobType: 'Full-time',
    salary: '$60k - $95k',
    postedDate: '1 week ago',
    tag: 'Featured',
    tagColor: 'bg-brand-orange text-white',
    description: 'Design the future of digital banking in Nigeria...',
    isFeatured: true,
  },
  {
    id: 6,
    title: 'UX/UI Designer',
    company: 'Andela',
    companyLogo: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=100&h=100&fit=crop',
    location: 'Remote',
    jobType: 'Full-time',
    salary: '$85k - $125k',
    postedDate: '4 days ago',
    tag: 'New',
    tagColor: 'bg-brand-aqua text-white',
    description: 'Join a global team building the future of tech talent...',
    isFeatured: true,
  },
  {
    id: 7,
    title: 'UI Designer',
    company: 'Jumia',
    companyLogo: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&h=100&fit=crop',
    location: 'Lagos, Nigeria',
    jobType: 'Full-time',
    salary: '$50k - $75k',
    postedDate: '1 week ago',
    tag: null,
    tagColor: '',
    description: 'Design intuitive e-commerce experiences for millions of users...',
    isFeatured: false,
  },
  {
    id: 8,
    title: 'Product Designer',
    company: 'MTN Nigeria',
    companyLogo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop',
    location: 'Lagos, Nigeria',
    jobType: 'Contract',
    salary: '$40k - $60k',
    postedDate: '2 weeks ago',
    tag: null,
    tagColor: '',
    description: 'Design mobile-first experiences for telecom services...',
    isFeatured: false,
  },
  {
    id: 9,
    title: 'Senior Product Designer',
    company: 'Carbon',
    companyLogo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop',
    location: 'Remote',
    jobType: 'Full-time',
    salary: '$75k - $110k',
    postedDate: '3 days ago',
    tag: null,
    tagColor: '',
    description: 'Lead design for digital lending products...',
    isFeatured: false,
  },
  {
    id: 10,
    title: 'UX Designer',
    company: 'Piggyvest',
    companyLogo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop',
    location: 'Lagos, Nigeria',
    jobType: 'Full-time',
    salary: '$55k - $85k',
    postedDate: '1 week ago',
    tag: null,
    tagColor: '',
    description: 'Design savings and investment experiences for young Africans...',
    isFeatured: false,
  },
];

export default function JobsPage() {
  // tomiwa: State management for search, filters, and saved jobs
  const [searchQuery, setSearchQuery] = useState('');
  const [savedJobs, setSavedJobs] = useState([1, 2, 5]); // Default saved jobs
  const [showFilters, setShowFilters] = useState(false);
  const [toast, setToast] = useState(null);

  // tomiwa: Filter jobs based on search query
  const filteredJobs = allJobs.filter((job) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      job.title.toLowerCase().includes(searchLower) ||
      job.company.toLowerCase().includes(searchLower) ||
      job.location.toLowerCase().includes(searchLower)
    );
  });

  // tomiwa: Toggle save/unsave job
  const toggleSaveJob = (jobId) => {
    setSavedJobs((prev) => {
      if (prev.includes(jobId)) {
        showToast('Job removed from saved', 'info');
        return prev.filter((id) => id !== jobId);
      } else {
        showToast('Job saved successfully', 'success');
        return [...prev, jobId];
      }
    });
  };

  // tomiwa: Show toast notification
  const showToast = (message, type = 'success') => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    // tomiwa: Main container with background
    <div className="min-h-screen bg-neutral-50">
      {/* tomiwa: Hero Section with Search */}
      <div className="bg-gradient-to-r from-brand-aqua to-[#0C5B65] text-white">
        <div className="max-w-7xl mx-auto px-6 
                        sm:px-8 
                        md:px-10 
                        lg:px-12 
                        py-12 
                        sm:py-16 
                        md:py-20">
          {/* tomiwa: Title and subtitle */}
          <div className="text-center mb-8">
            <h1 className="text-3xl 
                          sm:text-4xl 
                          md:text-5xl 
                          lg:text-6xl 
                          font-display font-bold mb-4">
              Find Your Dream Job
            </h1>
            <p className="text-lg 
                         sm:text-xl 
                         md:text-2xl 
                         text-[#D9E5E6] max-w-2xl mx-auto">
              Discover opportunities from top companies across Africa
            </p>
          </div>

          {/* tomiwa: Search bar
               Responsive: Full width on mobile, max-width on desktop */}
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-neutral-400" />
              <input
                type="text"
                placeholder="Search jobs, companies, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-4 py-4 
                          text-neutral-900 
                          rounded-lg 
                          shadow-lg 
                          focus:ring-4 focus:ring-white/30 
                          focus:outline-none 
                          text-base 
                          sm:text-lg"
              />
            </div>
          </div>

          {/* tomiwa: Job count display */}
          <div className="text-center mt-6">
            <p className="text-white/90 text-sm sm:text-base">
              {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'} available
            </p>
          </div>
        </div>
      </div>

      {/* tomiwa: Main Content */}
      <div className="max-w-7xl mx-auto px-6 
                      sm:px-8 
                      md:px-10 
                      lg:px-12 
                      py-8 
                      sm:py-12">
        
        {/* tomiwa: Filter and Sort Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center gap-2 
                        px-4 py-2 
                        bg-white text-neutral-700 
                        border-2 border-neutral-300 
                        rounded-lg 
                        hover:bg-neutral-50 
                        transition-colors 
                        focus:ring-2 focus:ring-brand-aqua focus:ring-offset-2"
            >
              <FunnelIcon className="w-5 h-5" />
              Filters
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-neutral-600">Sort by:</span>
            <select className="px-4 py-2 
                              bg-white 
                              border-2 border-neutral-300 
                              rounded-lg 
                              text-sm 
                              focus:ring-2 focus:ring-brand-aqua focus:outline-none">
              <option>Most Recent</option>
              <option>Highest Salary</option>
              <option>Most Relevant</option>
            </select>
          </div>
        </div>

        {/* tomiwa: Featured Jobs Section (if not searching) */}
        {!searchQuery && (
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <SparklesIcon className="w-6 h-6 text-brand-orange" />
              <h2 className="text-2xl 
                            sm:text-3xl 
                            font-bold text-neutral-900">
                Featured Jobs
              </h2>
            </div>
            <div className="grid grid-cols-1 
                           sm:grid-cols-1 
                           md:grid-cols-2 
                           lg:grid-cols-2 
                           xl:grid-cols-3 
                           gap-6 mb-8">
              {allJobs
                .filter((job) => job.isFeatured)
                .slice(0, 6)
                .map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    isSaved={savedJobs.includes(job.id)}
                    onToggleSave={toggleSaveJob}
                  />
                ))}
            </div>
          </section>
        )}

        {/* tomiwa: All Jobs Section */}
        <section>
          <h2 className="text-2xl 
                        sm:text-3xl 
                        font-bold text-neutral-900 mb-6">
            {searchQuery ? 'Search Results' : 'All Jobs'}
          </h2>
          <div className="grid grid-cols-1 
                         sm:grid-cols-1 
                         md:grid-cols-2 
                         lg:grid-cols-2 
                         xl:grid-cols-3 
                         gap-6">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  isSaved={savedJobs.includes(job.id)}
                  onToggleSave={toggleSaveJob}
                />
              ))
            ) : (
              // tomiwa: Empty state for no results
              <div className="col-span-full text-center py-16">
                <MagnifyingGlassIcon className="w-20 h-20 text-neutral-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-neutral-900 mb-2">No jobs found</h3>
                <p className="text-neutral-600 mb-6">
                  Try adjusting your search or filters
                </p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-6 py-3 
                            bg-brand-aqua text-white 
                            rounded-lg 
                            hover:bg-[#0C5B65] 
                            transition-colors"
                >
                  Clear Search
                </button>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* tomiwa: Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
          <div
            className={`rounded-lg shadow-xl p-4 flex items-center gap-3 ${
              toast.type === 'success'
                ? 'bg-emerald-500'
                : toast.type === 'info'
                ? 'bg-brand-aqua'
                : 'bg-red-500'
            } text-white min-w-[300px]`}
          >
            <span className="font-medium">{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
}

// tomiwa: Job Card Component
// Reusable component for displaying individual job listings
function JobCard({ job, isSaved, onToggleSave }) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-6 group hover:scale-[1.02]">
      {/* tomiwa: Job card header with logo and tag */}
      <div className="flex items-start justify-between mb-4">
        {/* tomiwa: Company logo */}
        <img
          src={job.companyLogo}
          alt={job.company}
          className="w-14 h-14 rounded-lg object-cover shadow-sm"
        />
        {/* tomiwa: Featured/New tag */}
        {job.tag && (
          <span
            className={`${job.tagColor} px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1`}
          >
            {job.tag === 'Featured' && <StarIcon className="w-3 h-3" />}
            {job.tag}
          </span>
        )}
      </div>

      {/* tomiwa: Job title */}
      <h3 className="text-lg font-bold text-neutral-900 mb-2 group-hover:text-brand-aqua transition-colors">
        {job.title}
      </h3>

      {/* tomiwa: Company name */}
      <p className="text-sm font-medium text-neutral-600 mb-3">{job.company}</p>

      {/* tomiwa: Job details */}
      <div className="space-y-2 mb-4">
        {/* tomiwa: Location */}
        <div className="flex items-center gap-2 text-sm text-neutral-600">
          <MapPinIcon className="w-4 h-4" />
          <span>{job.location}</span>
        </div>
        {/* tomiwa: Job type */}
        <div className="flex items-center gap-2 text-sm text-neutral-600">
          <BriefcaseIcon className="w-4 h-4" />
          <span>{job.jobType}</span>
        </div>
        {/* tomiwa: Salary */}
        {job.salary && (
          <div className="flex items-center gap-2 text-sm text-neutral-600">
            <BanknotesIcon className="w-4 h-4" />
            <span>{job.salary}</span>
          </div>
        )}
        {/* tomiwa: Posted date */}
        <div className="flex items-center gap-2 text-sm text-neutral-500">
          <ClockIcon className="w-4 h-4" />
          <span>Posted {job.postedDate}</span>
        </div>
      </div>

      {/* tomiwa: Action buttons */}
      <div className="flex gap-3">
        <Link
          href={`/jobs/${job.id}`}
          className="flex-1 inline-flex items-center justify-center gap-2 
                    px-4 py-2.5 
                    bg-brand-aqua text-white 
                    text-sm font-medium 
                    rounded-lg 
                    hover:bg-[#0C5B65] 
                    transition-colors 
                    focus:ring-2 focus:ring-brand-aqua focus:ring-offset-2"
        >
          <EyeIcon className="w-4 h-4" />
          View Details
        </Link>
        {/* tomiwa: Save Job button */}
        <button
          onClick={() => onToggleSave(job.id)}
          className={`px-4 py-2.5 rounded-lg transition-all duration-300 focus:ring-2 focus:ring-brand-aqua focus:ring-offset-2 ${
            isSaved
              ? 'bg-accent-100 text-accent-700 hover:bg-accent-200'
              : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
          }`}
          aria-label={isSaved ? 'Unsave job' : 'Save job'}
        >
          {isSaved ? (
            <BookmarkSolidIcon className="w-5 h-5" />
          ) : (
            <BookmarkIcon className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
}


