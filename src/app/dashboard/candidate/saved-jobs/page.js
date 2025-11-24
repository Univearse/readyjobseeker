/**
 * File: src/app/dashboard/candidate/saved-jobs/page.js
 * 
 * tomiwa: ENHANCED - Saved Jobs Page with Full Functionality
 * Complete saved jobs page where candidates can view, search, filter, and manage their saved job opportunities
 * 
 * Features:
 * - Grid and list view toggle
 * - Search functionality across job titles and companies
 * - Filter by job type, location, salary range, and date saved
 * - Remove/unsave jobs with confirmation
 * - Responsive design for all screen sizes
 * - Empty state when no jobs are saved
 * - Quick apply functionality
 * - Sort by date saved, salary, or company name
 */

'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import CandidateDashboardLayout from '@/components/layouts/CandidateDashboardLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import ConfirmModal from '@/components/ui/ConfirmModal';
import Toast from '@/components/ui/Toast';
import {
  // tomiwa: Icon imports for saved jobs functionality
  BookmarkIcon,
  BookmarkSlashIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  Squares2X2Icon,
  Bars3Icon,
  MapPinIcon,
  CurrencyDollarIcon,
  ClockIcon,
  BuildingOfficeIcon,
  ArrowsUpDownIcon,
  EyeIcon,
  PaperAirplaneIcon,
  XMarkIcon,
  HeartIcon,
  // tomiwa: NEW - AI Assistant icons
  SparklesIcon,
  LightBulbIcon,
  ClipboardDocumentListIcon,
  EllipsisVerticalIcon,
  AcademicCapIcon,
} from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid';

// tomiwa: Mock saved jobs data with comprehensive job information
const mockSavedJobs = [
  {
    id: 1,
    jobTitle: 'Senior Product Designer',
    company: 'Figma',
    companyLogo: 'https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=100&h=100&fit=crop',
    location: 'Remote',
    jobType: 'Full-time',
    salary: '$120k - $180k',
    dateSaved: '2024-11-01',
    description: 'Join our design team to create beautiful, intuitive interfaces that millions of users love. Work on cutting-edge design tools and collaborate with world-class designers.',
    tags: ['Design Systems', 'Figma', 'Prototyping', 'User Research'],
    isUrgent: false,
    companySize: '1000+ employees',
    experience: '5+ years',
    remote: true,
  },
  {
    id: 2,
    jobTitle: 'UX/UI Designer',
    company: 'Paystack',
    companyLogo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop',
    location: 'Lagos, Nigeria',
    jobType: 'Full-time',
    salary: '$80k - $120k',
    dateSaved: '2024-10-28',
    description: 'Design seamless payment experiences for millions of African businesses. Work with a talented team to solve complex fintech challenges.',
    tags: ['Fintech', 'Mobile Design', 'User Testing', 'Sketch'],
    isUrgent: true,
    companySize: '500-1000 employees',
    experience: '3+ years',
    remote: false,
  },
  {
    id: 3,
    jobTitle: 'Product Designer',
    company: 'Flutterwave',
    companyLogo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=100&h=100&fit=crop',
    location: 'Remote',
    jobType: 'Full-time',
    salary: '$90k - $140k',
    dateSaved: '2024-10-25',
    description: 'Shape the future of payments across Africa. Design user-centric solutions that make financial services accessible to everyone.',
    tags: ['Product Design', 'Payments', 'Mobile First', 'Design Systems'],
    isUrgent: false,
    companySize: '500-1000 employees',
    experience: '4+ years',
    remote: true,
  },
  {
    id: 4,
    jobTitle: 'Visual Designer',
    company: 'Interswitch',
    companyLogo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&h=100&fit=crop',
    location: 'Lagos, Nigeria',
    jobType: 'Contract',
    salary: '$60k - $90k',
    dateSaved: '2024-10-22',
    description: 'Create compelling visual designs for digital financial services. Work on branding, marketing materials, and product interfaces.',
    tags: ['Visual Design', 'Branding', 'Marketing', 'Adobe Creative Suite'],
    isUrgent: false,
    companySize: '1000+ employees',
    experience: '2+ years',
    remote: false,
  },
  {
    id: 5,
    jobTitle: 'Senior UX Researcher',
    company: 'Kuda Bank',
    companyLogo: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=100&h=100&fit=crop',
    location: 'Remote',
    jobType: 'Full-time',
    salary: '$100k - $150k',
    dateSaved: '2024-10-20',
    description: 'Lead user research initiatives to understand customer needs and drive product decisions. Conduct usability studies and analyze user behavior.',
    tags: ['User Research', 'Usability Testing', 'Data Analysis', 'Banking'],
    isUrgent: true,
    companySize: '100-500 employees',
    experience: '5+ years',
    remote: true,
  },
  {
    id: 6,
    jobTitle: 'UI Designer',
    company: 'PiggyVest',
    companyLogo: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=100&h=100&fit=crop',
    location: 'Lagos, Nigeria',
    jobType: 'Part-time',
    salary: '$40k - $60k',
    dateSaved: '2024-10-18',
    description: 'Design beautiful interfaces for Nigeria\'s leading savings and investment platform. Focus on mobile-first design and user engagement.',
    tags: ['UI Design', 'Mobile Design', 'Savings', 'Investment'],
    isUrgent: false,
    companySize: '100-500 employees',
    experience: '2+ years',
    remote: false,
  },
];

export default function SavedJobs() {
  // tomiwa: State management for saved jobs functionality
  const [savedJobs, setSavedJobs] = useState(mockSavedJobs);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('dateSaved'); // 'dateSaved', 'salary', 'company'
  const [sortOrder, setSortOrder] = useState('desc'); // 'asc' or 'desc'
  const [showFilters, setShowFilters] = useState(false);
  const [jobToRemove, setJobToRemove] = useState(null);
  const [toast, setToast] = useState(null);
  
  // tomiwa: Filter states
  const [filters, setFilters] = useState({
    jobType: 'all', // 'all', 'full-time', 'part-time', 'contract'
    location: 'all', // 'all', 'remote', 'onsite', 'hybrid'
    salaryRange: 'all', // 'all', '0-50k', '50k-100k', '100k-150k', '150k+'
    isUrgent: false,
  });

  // tomiwa: NEW - AI Assistant state
  const [showAiAssistant, setShowAiAssistant] = useState(false);
  const [showJobRecommendations, setShowJobRecommendations] = useState(false);
  const [showApplicationStrategy, setShowApplicationStrategy] = useState(false);
  const [showCareerInsights, setShowCareerInsights] = useState(false);

  // tomiwa: Filter and search logic
  const filteredAndSortedJobs = useMemo(() => {
    let filtered = savedJobs.filter(job => {
      // johnson: ExistingCode - Search filter
      const matchesSearch = searchTerm === '' || 
        job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      // tomiwa: Job type filter
      const matchesJobType = filters.jobType === 'all' || 
        job.jobType.toLowerCase().replace('-', '') === filters.jobType.replace('-', '');

      // tomiwa: Location filter
      const matchesLocation = filters.location === 'all' || 
        (filters.location === 'remote' && job.remote) ||
        (filters.location === 'onsite' && !job.remote) ||
        (filters.location === 'hybrid' && job.location.toLowerCase().includes('hybrid'));

      // tomiwa: Salary range filter
      const matchesSalary = filters.salaryRange === 'all' || (() => {
        const salaryNum = parseInt(job.salary.replace(/[^0-9]/g, ''));
        switch (filters.salaryRange) {
          case '0-50k': return salaryNum < 50000;
          case '50k-100k': return salaryNum >= 50000 && salaryNum < 100000;
          case '100k-150k': return salaryNum >= 100000 && salaryNum < 150000;
          case '150k+': return salaryNum >= 150000;
          default: return true;
        }
      })();

      // tomiwa: Urgent filter
      const matchesUrgent = !filters.isUrgent || job.isUrgent;

      return matchesSearch && matchesJobType && matchesLocation && matchesSalary && matchesUrgent;
    });

    // tomiwa: Sort logic
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'dateSaved':
          aValue = new Date(a.dateSaved);
          bValue = new Date(b.dateSaved);
          break;
        case 'salary':
          aValue = parseInt(a.salary.replace(/[^0-9]/g, ''));
          bValue = parseInt(b.salary.replace(/[^0-9]/g, ''));
          break;
        case 'company':
          aValue = a.company.toLowerCase();
          bValue = b.company.toLowerCase();
          break;
        default:
          return 0;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [savedJobs, searchTerm, sortBy, sortOrder, filters]);

  // tomiwa: Remove job functionality
  const handleRemoveJob = (jobId) => {
    setSavedJobs(prev => prev.filter(job => job.id !== jobId));
    setJobToRemove(null);
    setToast({
      type: 'success',
      message: 'Job removed from saved jobs',
    });
  };

  // tomiwa: Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setFilters({
      jobType: 'all',
      location: 'all',
      salaryRange: 'all',
      isUrgent: false,
    });
    setSortBy('dateSaved');
    setSortOrder('desc');
  };

  // tomiwa: Format date helper
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  // tomiwa: NEW - AI Assistant handlers
  const handleAiAction = (actionType) => {
    switch (actionType) {
      case 'job_recommendations':
        setShowJobRecommendations(true);
        setShowAiAssistant(false);
        break;
      case 'application_strategy':
        setShowApplicationStrategy(true);
        setShowAiAssistant(false);
        break;
      case 'career_insights':
        setShowCareerInsights(true);
        setShowAiAssistant(false);
        break;
      case 'analyze_saved_jobs':
        setToast({
          type: 'info',
          message: 'AI is analyzing your saved jobs for patterns and insights...',
        });
        setTimeout(() => {
          setToast({
            type: 'success',
            message: 'Analysis complete! Check the insights below.',
          });
        }, 2000);
        break;
      default:
        break;
    }
  };

  return (
    <CandidateDashboardLayout>
      {/* tomiwa: Compact Hero Banner with gradient background */}
      <div className="bg-gradient-to-r from-brand-aqua to-primary-700 -mt-8 -mx-6 mb-6">
        <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold text-white mb-1">
                Saved Jobs
              </h1>
              <p className="text-white/90 text-sm sm:text-base">
                {savedJobs.length} job{savedJobs.length !== 1 ? 's' : ''} saved for later
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowAiAssistant(!showAiAssistant)}
                className={`inline-flex items-center gap-2 px-4 py-2 font-semibold rounded-lg transition-colors ${
                  showAiAssistant 
                    ? 'bg-brand-yellow text-brand-black' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <SparklesIcon className="w-4 h-4" />
                AI Assistant
              </button>
              <Button 
                variant="outline" 
                size="sm"
                className="bg-white/10 border-white/30 text-white hover:bg-white/20 text-sm"
                onClick={() => window.open('/jobs', '_blank')}
              >
                <MagnifyingGlassIcon className="w-4 h-4 mr-2" />
                Find More Jobs
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 pb-12">
        {/* tomiwa: Search and Filter Controls */}
        <div className="mb-6 space-y-4">
          {/* tomiwa: Search Bar and View Toggle */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* tomiwa: Search Input */}
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Search jobs, companies, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-brand-aqua focus:border-transparent"
              />
            </div>

            {/* tomiwa: Controls Row */}
            <div className="flex items-center gap-2">
              {/* tomiwa: Filter Toggle */}
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className={showFilters ? 'bg-brand-aqua text-white border-brand-aqua' : ''}
              >
                <FunnelIcon className="w-4 h-4 mr-2" />
                Filters
              </Button>

              {/* tomiwa: Sort Dropdown */}
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split('-');
                  setSortBy(field);
                  setSortOrder(order);
                }}
                className="px-3 py-2 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-brand-aqua focus:border-transparent"
              >
                <option value="dateSaved-desc">Newest First</option>
                <option value="dateSaved-asc">Oldest First</option>
                <option value="salary-desc">Highest Salary</option>
                <option value="salary-asc">Lowest Salary</option>
                <option value="company-asc">Company A-Z</option>
                <option value="company-desc">Company Z-A</option>
              </select>

              {/* tomiwa: View Mode Toggle */}
              <div className="flex border border-neutral-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-brand-aqua text-white' : 'text-neutral-600 hover:bg-neutral-50'}`}
                >
                  <Squares2X2Icon className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-brand-aqua text-white' : 'text-neutral-600 hover:bg-neutral-50'}`}
                >
                  <Bars3Icon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* tomiwa: Filter Panel */}
          {showFilters && (
            <Card className="p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* tomiwa: Job Type Filter */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Job Type</label>
                  <select
                    value={filters.jobType}
                    onChange={(e) => setFilters(prev => ({ ...prev, jobType: e.target.value }))}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-brand-aqua focus:border-transparent"
                  >
                    <option value="all">All Types</option>
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="contract">Contract</option>
                  </select>
                </div>

                {/* tomiwa: Location Filter */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Location</label>
                  <select
                    value={filters.location}
                    onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-brand-aqua focus:border-transparent"
                  >
                    <option value="all">All Locations</option>
                    <option value="remote">Remote</option>
                    <option value="onsite">On-site</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>

                {/* tomiwa: Salary Range Filter */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Salary Range</label>
                  <select
                    value={filters.salaryRange}
                    onChange={(e) => setFilters(prev => ({ ...prev, salaryRange: e.target.value }))}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-brand-aqua focus:border-transparent"
                  >
                    <option value="all">All Ranges</option>
                    <option value="0-50k">Under $50k</option>
                    <option value="50k-100k">$50k - $100k</option>
                    <option value="100k-150k">$100k - $150k</option>
                    <option value="150k+">$150k+</option>
                  </select>
                </div>

                {/* tomiwa: Urgent Jobs Filter */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Job Priority</label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.isUrgent}
                      onChange={(e) => setFilters(prev => ({ ...prev, isUrgent: e.target.checked }))}
                      className="rounded border-neutral-300 text-brand-aqua focus:ring-brand-aqua"
                    />
                    <span className="ml-2 text-sm text-neutral-700">Urgent jobs only</span>
                  </label>
                </div>
              </div>

              {/* tomiwa: Clear Filters Button */}
              <div className="mt-4 pt-4 border-t border-neutral-200">
                <Button variant="ghost" onClick={clearFilters} size="sm">
                  <XMarkIcon className="w-4 h-4 mr-2" />
                  Clear All Filters
                </Button>
              </div>
            </Card>
          )}
        </div>

        {/* tomiwa: Results Count */}
        <div className="mb-6">
          <p className="text-neutral-600">
            Showing {filteredAndSortedJobs.length} of {savedJobs.length} saved jobs
          </p>
        </div>

        {/* tomiwa: Jobs Display */}
        {filteredAndSortedJobs.length === 0 ? (
          // tomiwa: Empty State
          <Card className="p-12 text-center">
            {searchTerm || Object.values(filters).some(f => f !== 'all' && f !== false) ? (
              // tomiwa: No results for current filters
              <>
                <MagnifyingGlassIcon className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">No jobs match your criteria</h3>
                <p className="text-neutral-600 mb-6">Try adjusting your search or filters to find more jobs.</p>
                <Button onClick={clearFilters}>Clear Filters</Button>
              </>
            ) : (
              // tomiwa: No saved jobs at all
              <>
                <BookmarkIcon className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">No saved jobs yet</h3>
                <p className="text-neutral-600 mb-6">Start saving jobs you're interested in to see them here.</p>
                <Link href="/jobs">
                  <Button>
                    <MagnifyingGlassIcon className="w-4 h-4 mr-2" />
                    Browse Jobs
                  </Button>
                </Link>
              </>
            )}
          </Card>
        ) : (
          // tomiwa: Jobs Grid/List
          <div className={
            viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' 
              : 'space-y-4'
          }>
            {filteredAndSortedJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                viewMode={viewMode}
                onRemove={() => setJobToRemove(job)}
                formatDate={formatDate}
              />
            ))}
          </div>
        )}

        {/* tomiwa: NEW - AI Assistant Panel */}
        {showAiAssistant && (
          <div className="mt-8 bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-brand-yellow to-brand-orange p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <SparklesIcon className="w-6 h-6 text-brand-black" />
                  </div>
                  <div>
                    <h2 className="text-xl font-display font-bold text-brand-black">AI Job Assistant</h2>
                    <p className="text-brand-black/80">Get insights and recommendations for your saved jobs</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowAiAssistant(false)}
                  className="p-2 text-brand-black/60 hover:text-brand-black hover:bg-white/20 rounded-lg transition-colors"
                >
                  <EllipsisVerticalIcon className="w-5 h-5 rotate-90" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <button
                  onClick={() => handleAiAction('job_recommendations')}
                  className="text-left p-4 border border-neutral-200 rounded-lg hover:border-brand-aqua hover:bg-brand-aqua/5 transition-all group"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-brand-aqua/10 rounded-lg flex items-center justify-center group-hover:bg-brand-aqua/20 transition-colors">
                      <MagnifyingGlassIcon className="w-5 h-5 text-brand-aqua" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-neutral-900 mb-1">Similar Jobs</h3>
                      <p className="text-sm text-neutral-600 mb-2">Find more jobs similar to your saved ones</p>
                      <span className="text-xs font-medium text-brand-aqua">Find Similar</span>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => handleAiAction('application_strategy')}
                  className="text-left p-4 border border-neutral-200 rounded-lg hover:border-brand-aqua hover:bg-brand-aqua/5 transition-all group"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-brand-orange/10 rounded-lg flex items-center justify-center group-hover:bg-brand-orange/20 transition-colors">
                      <ClipboardDocumentListIcon className="w-5 h-5 text-brand-orange" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-neutral-900 mb-1">Application Strategy</h3>
                      <p className="text-sm text-neutral-600 mb-2">Get personalized application advice</p>
                      <span className="text-xs font-medium text-brand-orange">Get Strategy</span>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => handleAiAction('career_insights')}
                  className="text-left p-4 border border-neutral-200 rounded-lg hover:border-brand-aqua hover:bg-brand-aqua/5 transition-all group"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-brand-yellow/20 rounded-lg flex items-center justify-center group-hover:bg-brand-yellow/30 transition-colors">
                      <AcademicCapIcon className="w-5 h-5 text-brand-yellow" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-neutral-900 mb-1">Career Insights</h3>
                      <p className="text-sm text-neutral-600 mb-2">Analyze your career preferences and trends</p>
                      <span className="text-xs font-medium text-brand-yellow">Get Insights</span>
                    </div>
                  </div>
                </button>
              </div>

              {/* tomiwa: Quick AI Actions */}
              <div className="border-t border-neutral-200 pt-6">
                <h3 className="text-sm font-semibold text-neutral-900 mb-4">Quick Actions</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleAiAction('analyze_saved_jobs')}
                    className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-neutral-700 bg-neutral-100 rounded-lg hover:bg-neutral-200 transition-colors"
                  >
                    <SparklesIcon className="w-4 h-4" />
                    Analyze Saved Jobs
                  </button>
                  <Link
                    href="/jobs"
                    className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-neutral-700 bg-neutral-100 rounded-lg hover:bg-neutral-200 transition-colors"
                  >
                    <MagnifyingGlassIcon className="w-4 h-4" />
                    Find More Jobs
                  </Link>
                  <Link
                    href="/dashboard/candidate/applications"
                    className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-neutral-700 bg-neutral-100 rounded-lg hover:bg-neutral-200 transition-colors"
                  >
                    <PaperAirplaneIcon className="w-4 h-4" />
                    View Applications
                  </Link>
                </div>
              </div>

              {/* tomiwa: Saved jobs insights */}
              <div className="mt-6 p-4 bg-brand-aqua/5 rounded-lg border border-brand-aqua/20">
                <div className="flex items-start gap-3">
                  <LightBulbIcon className="w-5 h-5 text-brand-aqua mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-neutral-900 mb-1">Smart Insights</h4>
                    <p className="text-sm text-neutral-700 mb-3">
                      Based on your {savedJobs.length} saved jobs:
                    </p>
                    <ul className="text-sm text-neutral-600 space-y-1">
                      <li>• Most common role: {savedJobs.reduce((acc, job) => {
                        const role = job.jobTitle.split(' ')[0];
                        acc[role] = (acc[role] || 0) + 1;
                        return acc;
                      }, {}) && Object.entries(savedJobs.reduce((acc, job) => {
                        const role = job.jobTitle.split(' ')[0];
                        acc[role] = (acc[role] || 0) + 1;
                        return acc;
                      }, {})).sort(([,a], [,b]) => b - a)[0]?.[0] || 'Designer'} positions</li>
                      <li>• {savedJobs.filter(job => job.remote).length} remote opportunities available</li>
                      <li>• {savedJobs.filter(job => job.isUrgent).length} urgent positions need quick action</li>
                      <li>• Average salary range: ${Math.round(savedJobs.reduce((acc, job) => acc + parseInt(job.salary.replace(/[^0-9]/g, '')), 0) / savedJobs.length / 1000)}k - ${Math.round(savedJobs.reduce((acc, job) => acc + parseInt(job.salary.split('-')[1]?.replace(/[^0-9]/g, '') || job.salary.replace(/[^0-9]/g, '')), 0) / savedJobs.length / 1000)}k</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* tomiwa: Remove Job Confirmation Modal */}
      {jobToRemove && (
        <ConfirmModal
          isOpen={true}
          onClose={() => setJobToRemove(null)}
          onConfirm={() => handleRemoveJob(jobToRemove.id)}
          title="Remove Saved Job"
          message={`Are you sure you want to remove "${jobToRemove.jobTitle}" at ${jobToRemove.company} from your saved jobs?`}
          confirmText="Remove"
          cancelText="Keep"
          type="warning"
        />
      )}

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

// tomiwa: Job Card Component for both grid and list views
function JobCard({ job, viewMode, onRemove, formatDate }) {
  if (viewMode === 'list') {
    // tomiwa: List View Layout
    return (
      <Card className="p-6 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4 flex-1">
            {/* tomiwa: Company Logo */}
            <img
              src={job.companyLogo}
              alt={`${job.company} logo`}
              className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
            />
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-1">
                    {job.jobTitle}
                    {job.isUrgent && (
                      <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-secondary-100 text-secondary-800">
                        Urgent
                      </span>
                    )}
                  </h3>
                  <p className="text-neutral-600 font-medium">{job.company}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-600 mb-3">
                <div className="flex items-center">
                  <MapPinIcon className="w-4 h-4 mr-1" />
                  {job.location}
                </div>
                <div className="flex items-center">
                  <CurrencyDollarIcon className="w-4 h-4 mr-1" />
                  {job.salary}
                </div>
                <div className="flex items-center">
                  <ClockIcon className="w-4 h-4 mr-1" />
                  {job.jobType}
                </div>
                <div className="flex items-center">
                  <BookmarkSolidIcon className="w-4 h-4 mr-1" />
                  Saved {formatDate(job.dateSaved)}
                </div>
              </div>

              <p className="text-neutral-600 text-sm mb-3 line-clamp-2">
                {job.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {job.tags.slice(0, 4).map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-neutral-100 text-neutral-700"
                  >
                    {tag}
                  </span>
                ))}
                {job.tags.length > 4 && (
                  <span className="text-xs text-neutral-500">+{job.tags.length - 4} more</span>
                )}
              </div>
            </div>
          </div>

          {/* tomiwa: Action Buttons */}
          <div className="flex items-center space-x-2 ml-4">
            <Link href={`/jobs/${job.id}`}>
              <Button size="sm" variant="outline">
                <EyeIcon className="w-4 h-4 mr-2" />
                View
              </Button>
            </Link>
            <Link href={`/apply/${job.id}`}>
              <Button size="sm">
                <PaperAirplaneIcon className="w-4 h-4 mr-2" />
                Apply
              </Button>
            </Link>
            <button
              onClick={onRemove}
              className="p-2 text-neutral-400 hover:text-secondary-600 transition-colors"
              title="Remove from saved jobs"
              aria-label={`Remove ${job.jobTitle} at ${job.company} from saved jobs`}
            >
              <BookmarkSlashIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </Card>
    );
  }

  // tomiwa: Grid View Layout
  return (
    <Card className="p-6 hover:shadow-md transition-shadow h-full flex flex-col">
      {/* tomiwa: Header with logo and remove button */}
      <div className="flex items-start justify-between mb-4">
        <img
          src={job.companyLogo}
          alt={`${job.company} logo`}
          className="w-12 h-12 rounded-xl object-cover"
        />
        <button
          onClick={onRemove}
          className="p-1 text-neutral-400 hover:text-secondary-600 transition-colors"
          title="Remove from saved jobs"
        >
          <BookmarkSlashIcon className="w-5 h-5" />
        </button>
      </div>

      {/* tomiwa: Job Title and Company */}
      <div className="mb-3">
        <h3 className="text-lg font-semibold text-neutral-900 mb-1 line-clamp-2">
          {job.jobTitle}
          {job.isUrgent && (
            <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-secondary-100 text-secondary-800">
              Urgent
            </span>
          )}
        </h3>
        <p className="text-neutral-600 font-medium">{job.company}</p>
      </div>

      {/* tomiwa: Job Details */}
      <div className="space-y-2 text-sm text-neutral-600 mb-4">
        <div className="flex items-center">
          <MapPinIcon className="w-4 h-4 mr-2 flex-shrink-0" />
          <span className="truncate">{job.location}</span>
        </div>
        <div className="flex items-center">
          <CurrencyDollarIcon className="w-4 h-4 mr-2 flex-shrink-0" />
          <span>{job.salary}</span>
        </div>
        <div className="flex items-center">
          <ClockIcon className="w-4 h-4 mr-2 flex-shrink-0" />
          <span>{job.jobType}</span>
        </div>
        <div className="flex items-center">
          <BookmarkSolidIcon className="w-4 h-4 mr-2 flex-shrink-0" />
          <span>Saved {formatDate(job.dateSaved)}</span>
        </div>
      </div>

      {/* tomiwa: Description */}
      <p className="text-neutral-600 text-sm mb-4 line-clamp-3 flex-1">
        {job.description}
      </p>

      {/* tomiwa: Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {job.tags.slice(0, 3).map((tag, index) => (
          <span
            key={index}
            className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-neutral-100 text-neutral-700"
          >
            {tag}
          </span>
        ))}
        {job.tags.length > 3 && (
          <span className="text-xs text-neutral-500">+{job.tags.length - 3}</span>
        )}
      </div>

      {/* tomiwa: Action Buttons */}
      <div className="flex space-x-2 mt-auto">
        <Link href={`/jobs/${job.id}`} className="flex-1">
          <Button size="sm" variant="outline" className="w-full">
            <EyeIcon className="w-4 h-4 mr-2" />
            View
          </Button>
        </Link>
        <Link href={`/apply/${job.id}`} className="flex-1">
          <Button size="sm" className="w-full">
            <PaperAirplaneIcon className="w-4 h-4 mr-2" />
            Apply
          </Button>
        </Link>
      </div>
    </Card>
  );
}


