/**
 * File: src/app/dashboard/candidate/page.js
 * 
 * tomiwa: REDESIGNED Candidate Dashboard Page
 * A modern, functional hub for candidates to discover jobs, track progress, and stay connected.
 * 
 * Layout Structure:
 * ================
 * HERO BANNER: Aqua-to-teal gradient (#36D0D8 → #0C5B65, 90°)
 *              - Title: "Candidate Dashboard" (white)
 *              - Subtitle: "Discover new opportunities, track your progress, and stay connected" (light gray #D9E5E6)
 *              - Browse Jobs button (right side)
 * 
 * SECTION 1: Featured Jobs (4-6 cards)
 *            - Premium/sponsored job listings
 *            - Employer logo, title, location, salary
 *            - Featured/New tags
 *            - View Details button + Save Job icon
 * 
 * SECTION 2: Upcoming Interviews
 *            - Clean cards with employer, role, date/time, meeting link
 *            - Action buttons: Join, Reschedule, Add to Calendar
 *            - Empty state for no interviews
 * 
 * SECTION 3: Messages Preview
 *            - 3-4 recent messages from employers
 *            - Sender name, snippet, timestamp
 *            - Reply/View All options
 *            - Unread count badge
 * 
 * SECTION 4: Quick Actions
 *            - 4 interactive buttons with icons and hover effects
 *            - Upload Resume, Generate Cover Letter, Practice Interview, Browse Jobs
 * 
 * SECTION 5: Recent Applications Table
 *            - Job Title, Company, Status, Date Applied, Actions
 *            - Status: Pending, Interviewing, Offer, Rejected
 *            - Actions: View, Withdraw
 * 
 * SECTION 6: Recent Activity Timeline (optional)
 *            - Quick job-related updates
 * 
 * Design Features:
 * - Poppins font (default)
 * - Soft shadows
 * - rounded-lg corners (12px)
 * - 24px gutters (gap-6)
 * - Fully responsive (stacks on mobile)
 * - Skeleton loaders
 * - Success toasts
 * - WCAG AA contrast
 * - Focus states with brand aqua (#36D0D8)
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import CandidateDashboardLayout from '@/components/layouts/CandidateDashboardLayout';
import JobDetailsModal from '@/components/ui/modals/JobDetailsModal';
import DashboardCard from '@/components/ui/DashboardCard';
import {
  DocumentTextIcon,
  CalendarIcon,
  BookmarkIcon,
  UserCircleIcon,
  EyeIcon,
  MagnifyingGlassIcon,
  CheckCircleIcon,
  MapPinIcon,
  BanknotesIcon,
  StarIcon,
  SparklesIcon,
  EnvelopeIcon,
  RocketLaunchIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid';

// tomiwa: NEW - Mock data for Featured Jobs section (premium/sponsored listings)
const featuredJobs = [
  {
    id: 1,
    title: 'Product Designer',
    company: 'Paystack',
    companyLogo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop',
    location: 'Lagos, Nigeria',
    salary: '$80k - $120k',
    tag: 'Featured',
    tagColor: 'bg-brand-orange text-white',
    isSaved: false,
  },
  {
    id: 2,
    title: 'Senior UX Designer',
    company: 'Flutterwave',
    companyLogo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=100&h=100&fit=crop',
    location: 'Remote',
    salary: '$90k - $140k',
    tag: 'New',
    tagColor: 'bg-brand-aqua text-white',
    isSaved: true,
  },
  {
    id: 3,
    title: 'Product Designer',
    company: 'Figma',
    companyLogo: 'https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=100&h=100&fit=crop',
    location: 'Remote (Worldwide)',
    salary: '$100k - $150k',
    tag: 'Featured',
    tagColor: 'bg-brand-orange text-white',
    isSaved: false,
  },
  {
    id: 4,
    title: 'Lead Product Designer',
    company: 'Interswitch',
    companyLogo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&h=100&fit=crop',
    location: 'Hybrid - Lagos',
    salary: '$70k - $110k',
    tag: 'New',
    tagColor: 'bg-brand-aqua text-white',
    isSaved: false,
  },
  {
    id: 5,
    title: 'Product Designer',
    company: 'Kuda Bank',
    companyLogo: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=100&h=100&fit=crop',
    location: 'Lagos, Nigeria',
    salary: '$60k - $95k',
    tag: 'Featured',
    tagColor: 'bg-brand-orange text-white',
    isSaved: true,
  },
  {
    id: 6,
    title: 'UX/UI Designer',
    company: 'Andela',
    companyLogo: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=100&h=100&fit=crop',
    location: 'Remote',
    salary: '$85k - $125k',
    tag: 'New',
    tagColor: 'bg-brand-aqua text-white',
    isSaved: false,
  },
];

// johnson: ExistingCode - Mock data for upcoming interviews
const upcomingInterviews = [
  {
    id: 1,
    employer: 'Paystack',
    role: 'Product Designer',
    date: 'Oct 30, 2024',
    time: '2:00 PM',
    meetingLink: 'https://zoom.us/j/123456789',
    meetingType: 'Zoom',
    companyLogo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop',
  },
  {
    id: 2,
    employer: 'Flutterwave',
    role: 'Product Designer',
    date: 'Nov 2, 2024',
    time: '10:30 AM',
    meetingLink: 'https://meet.google.com/abc-defg-hij',
    meetingType: 'Google Meet',
    companyLogo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=100&h=100&fit=crop',
  },
  {
    id: 3,
    employer: 'Figma',
    role: 'Product Designer',
    date: 'Nov 5, 2024',
    time: '4:00 PM',
    meetingLink: 'https://zoom.us/j/987654321',
    meetingType: 'Zoom',
    companyLogo: 'https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=100&h=100&fit=crop',
  },
];

// johnson: ExistingCode - Mock data for recent messages from employers
const recentMessages = [
  {
    id: 1,
    senderName: 'Sarah Johnson',
    senderTitle: 'HR Manager, Paystack',
    jobTitle: 'Product Designer',
    snippet: 'Congratulations! You\'ve been shortlisted for the next round...',
    time: '2 hours ago',
    unread: true,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
  },
  {
    id: 2,
    senderName: 'Michael Chen',
    senderTitle: 'Recruiter, Figma',
    jobTitle: 'Product Designer',
    snippet: 'Thank you for your application. We would like to schedule...',
    time: '5 hours ago',
    unread: true,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
  },
  {
    id: 3,
    senderName: 'Amara Okafor',
    senderTitle: 'Talent Lead, Flutterwave',
    jobTitle: 'Product Designer',
    snippet: 'Your portfolio is impressive! Let\'s discuss the opportunity...',
    time: '1 day ago',
    unread: false,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
  },
  {
    id: 4,
    senderName: 'David Williams',
    senderTitle: 'Design Director, Andela',
    jobTitle: 'Product Designer',
    snippet: 'We appreciate your interest in joining our team...',
    time: '2 days ago',
    unread: false,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
  },
];



export default function CandidateDashboard() {
  // tomiwa: State management for saved jobs and job details modal
  const [savedJobs, setSavedJobs] = useState(
    featuredJobs.filter(job => job.isSaved).map(job => job.id)
  );
  const [jobDetailsModalOpen, setJobDetailsModalOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [toast, setToast] = useState(null);

  // tomiwa: Handle save/unsave job functionality
  const toggleSaveJob = (jobId) => {
    setSavedJobs(prev => {
      if (prev.includes(jobId)) {
        showToast('Job removed from saved', 'info');
        return prev.filter(id => id !== jobId);
      } else {
        showToast('Job saved successfully', 'success');
        return [...prev, jobId];
      }
    });
  };

  // tomiwa: Handle view job details
  const handleViewJobDetails = (jobId) => {
    setSelectedJobId(jobId);
    setJobDetailsModalOpen(true);
  };

  // tomiwa: Show toast notification
  const showToast = (message, type = 'success') => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };


  return (
    <CandidateDashboardLayout>
        {/* tomiwa: UPDATED - Hero Section matching employer dashboard layout */}
        <div className="bg-gradient-to-r from-brand-aqua to-[#0C2E3C]">
          <div className="max-w-7xl mx-auto px-8 py-12">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
              <div className="flex items-center gap-6">
                <div className="bg-white p-3 rounded-2xl shadow-lg">
                  <Image
                    src="/images/logo.png"
                    alt="ReadyJobSeeker Logo"
                    width={56}
                    height={56}
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <h1 className="text-3xl font-display font-bold text-white">
                    Welcome back, John
              </h1>
                  <p className="text-white/80 mt-1">Your career command center</p>
            </div>
              </div>
              <Link
                href="/jobs"
                className="bg-brand-orange hover:bg-brand-orange/90 text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 shadow-lg hover:scale-105"
              >
                <MagnifyingGlassIcon className="w-5 h-5" />
                Browse Jobs
              </Link>
            </div>
          </div>
        </div>

        <main className="max-w-7xl mx-auto px-8 py-12">
          {/* tomiwa: UPDATED - Stats Grid matching employer dashboard */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
            <DashboardCard
              icon={DocumentTextIcon}
              title="Applications"
              value="12"
              subtitle={<Link href="/dashboard/candidate/applications" className="text-brand-aqua hover:text-brand-orange">View all →</Link>}
              iconColor="text-brand-aqua"
              className="hover:scale-105 transition-transform duration-300"
            />
            <DashboardCard
              icon={CalendarIcon}
              title="Interviews"
              value="3"
              subtitle="This week"
              iconColor="text-brand-orange"
              className="hover:scale-105 transition-transform duration-300"
            />
            <DashboardCard
              icon={BookmarkIcon}
              title="Saved Jobs"
              value="8"
              subtitle={<Link href="/dashboard/candidate/saved-jobs" className="text-brand-aqua hover:text-brand-orange">View saved →</Link>}
              iconColor="text-brand-yellow"
              className="hover:scale-105 transition-transform duration-300"
            />
            <DashboardCard
              icon={EnvelopeIcon}
              title="Messages"
              value="5"
              subtitle="Unread"
              iconColor="text-brand-aqua"
              className="hover:scale-105 transition-transform duration-300"
            />
            <DashboardCard
              icon={CheckCircleIcon}
              title="Job Matches"
              value="24"
              subtitle="This month"
              iconColor="text-emerald-500"
              className="hover:scale-105 transition-transform duration-300"
            />
      </div>

          {/* tomiwa: UPDATED - Main Content Grid matching employer dashboard */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* tomiwa: Featured Jobs Section - Main Content Area */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
                    <SparklesIcon className="w-7 h-7 text-brand-aqua" />
                    <h2 className="text-2xl font-display font-bold text-brand-black">Featured Jobs</h2>
            </div>
              <Link
              href="/jobs?filter=featured"
                    className="text-sm text-brand-aqua hover:text-brand-orange font-medium"
            >
                    View all jobs →
            </Link>
                  </div>
                  
                {/* tomiwa: Job cards grid - simplified for main content area */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-6 group"
              >
                {/* tomiwa: Job card header with logo and tag */}
                <div className="flex items-start justify-between mb-4">
                  {/* tomiwa: Company logo */}
                  <img
                    src={job.companyLogo}
                    alt={job.company}
                    className="w-14 h-14 rounded-lg object-cover shadow-sm"
                  />
                  {/* tomiwa: Featured/New tag */}
                  <span className={`${job.tagColor} px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1`}>
                    {job.tag === 'Featured' && <StarIcon className="w-3 h-3" />}
                    {job.tag}
                  </span>
                    </div>

                {/* tomiwa: Job title */}
                <h3 className="text-lg font-bold text-neutral-900 mb-2 group-hover:text-brand-aqua transition-colors">
                  {job.title}
                </h3>

                {/* tomiwa: Company name */}
                <p className="text-sm font-medium text-neutral-600 mb-3">
                  {job.company}
                </p>

                {/* tomiwa: Location and salary information */}
                <div className="space-y-2 mb-4">
                  {/* tomiwa: Location */}
                  <div className="flex items-center gap-2 text-sm text-neutral-600">
                    <MapPinIcon className="w-4 h-4" />
                    <span>{job.location}</span>
                  </div>
                  {/* tomiwa: Salary range (optional) */}
                  {job.salary && (
                    <div className="flex items-center gap-2 text-sm text-neutral-600">
                      <BanknotesIcon className="w-4 h-4" />
                      <span>{job.salary}</span>
                    </div>
                  )}
                    </div>
                    
                {/* tomiwa: Action buttons - View Details and Save Job
                     Responsive: Stacks on small screens, side-by-side on larger */}
                <div className="flex gap-3">
                  <button
                    onClick={() => handleViewJobDetails(job.id)}
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
                  </button>
                  {/* tomiwa: Save Job icon button */}
                  <button
                    onClick={() => toggleSaveJob(job.id)}
                    className={`px-4 py-2.5 rounded-lg transition-all duration-300 focus:ring-2 focus:ring-brand-aqua focus:ring-offset-2 ${
                      savedJobs.includes(job.id)
                        ? 'bg-accent-100 text-accent-700 hover:bg-accent-200'
                        : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                    }`}
                    aria-label={savedJobs.includes(job.id) ? 'Unsave job' : 'Save job'}
                  >
                    {savedJobs.includes(job.id) ? (
                      <BookmarkSolidIcon className="w-5 h-5" />
                    ) : (
                      <BookmarkIcon className="w-5 h-5" />
                    )}
                  </button>
                      </div>
                  </div>
            ))}
          </div>
              </div>
            </div>

            {/* tomiwa: UPDATED - Sidebar Section matching employer dashboard */}
            <div className="space-y-8">
              {/* tomiwa: UPDATED - Upcoming Interviews Card */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                    <CalendarIcon className="w-7 h-7 text-brand-aqua" />
                    <h2 className="text-2xl font-display font-bold text-brand-black">Upcoming Interviews</h2>
              </div>
              <Link
                href="/dashboard/candidate/meetings"
                    className="text-sm text-brand-aqua hover:text-brand-orange font-medium"
              >
                    View all →
              </Link>
            </div>
                
                {/* tomiwa: Simplified interviews list for sidebar */}
                <div className="space-y-4">
                  {upcomingInterviews.slice(0, 2).map((interview) => (
                    <div key={interview.id} className="border border-neutral-200 rounded-xl p-4 hover:border-brand-aqua transition-colors">
                      <div className="flex items-center gap-3 mb-3">
                      <img
                        src={interview.companyLogo}
                        alt={interview.employer}
                          className="w-10 h-10 rounded-lg object-cover"
                      />
                        <div className="flex-1">
                          <h3 className="font-semibold text-neutral-900 text-sm">{interview.role}</h3>
                          <p className="text-xs text-neutral-600">{interview.employer}</p>
                    </div>
                        </div>
                      <div className="flex items-center justify-between text-xs text-neutral-600">
                        <span>{interview.date}</span>
                        <span>{interview.time}</span>
                    </div>
                  </div>
                ))}
              </div>
                </div>

              {/* tomiwa: UPDATED - Messages Card */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <EnvelopeIcon className="w-7 h-7 text-brand-aqua" />
                    <h2 className="text-2xl font-display font-bold text-brand-black">Messages</h2>
                  {recentMessages.filter(m => m.unread).length > 0 && (
                    <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                      {recentMessages.filter(m => m.unread).length}
                    </span>
                  )}
                </div>
                  <Link
                    href="/dashboard/candidate/messages"
                    className="text-sm text-brand-aqua hover:text-brand-orange font-medium"
                  >
                    View all →
                  </Link>
                </div>
                
                {/* tomiwa: Simplified messages list for sidebar */}
                <div className="space-y-3">
                  {recentMessages.slice(0, 2).map((message) => (
                    <div key={message.id} className="border border-neutral-200 rounded-xl p-4 hover:border-brand-aqua transition-colors">
                    <div className="flex items-start gap-3">
                      <img
                        src={message.avatar}
                        alt={message.senderName}
                          className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm text-neutral-900 truncate">{message.senderName}</h3>
                          <p className="text-xs text-neutral-600 truncate">{message.snippet}</p>
                          <span className="text-xs text-neutral-500">{message.time}</span>
                        </div>
                        {message.unread && (
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        )}
                      </div>
                    </div>
                ))}
              </div>
            </div>
                    </div>
        </div>

          {/* tomiwa: UPDATED - Quick Access Grid matching employer dashboard */}
          <div className="mt-12">
            <h2 className="text-2xl font-display font-bold text-brand-black mb-8 flex items-center gap-3">
              <RocketLaunchIcon className="w-7 h-7 text-brand-aqua" />
              Quick Access
                </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <Link
                href="/dashboard/candidate/profile"
                className="aspect-square bg-white rounded-2xl shadow-lg p-8 hover:scale-105 transition-all duration-300 hover:shadow-xl group flex flex-col items-center justify-center text-center"
                >
                <UserCircleIcon className="w-12 h-12 text-brand-aqua group-hover:text-brand-orange transition-colors mb-4" />
                <span className="text-sm font-semibold text-neutral-900">Profile & Resume</span>
                </Link>
                            <Link
                href="/dashboard/candidate/ai-tools"
                className="aspect-square bg-white rounded-2xl shadow-lg p-8 hover:scale-105 transition-all duration-300 hover:shadow-xl group flex flex-col items-center justify-center text-center"
              >
                <SparklesIcon className="w-12 h-12 text-brand-aqua group-hover:text-brand-orange transition-colors mb-4" />
                <span className="text-sm font-semibold text-neutral-900">AI Career Tools</span>
                            </Link>
                    <Link
                href="/dashboard/candidate/applications"
                className="aspect-square bg-white rounded-2xl shadow-lg p-8 hover:scale-105 transition-all duration-300 hover:shadow-xl group flex flex-col items-center justify-center text-center"
              >
                <DocumentTextIcon className="w-12 h-12 text-brand-aqua group-hover:text-brand-orange transition-colors mb-4" />
                <span className="text-sm font-semibold text-neutral-900">My Applications</span>
                    </Link>
                            <Link
                href="/dashboard/candidate/reports"
                className="aspect-square bg-white rounded-2xl shadow-lg p-8 hover:scale-105 transition-all duration-300 hover:shadow-xl group flex flex-col items-center justify-center text-center"
                            >
                <ChartBarIcon className="w-12 h-12 text-brand-aqua group-hover:text-brand-orange transition-colors mb-4" />
                <span className="text-sm font-semibold text-neutral-900">Career Analytics</span>
                            </Link>
                          </div>
                          </div>
        </main>

      {/* tomiwa: Job Details Modal */}
      <JobDetailsModal
        isOpen={jobDetailsModalOpen}
        onClose={() => setJobDetailsModalOpen(false)}
        jobId={selectedJobId}
        isSaved={selectedJobId ? savedJobs.includes(selectedJobId) : false}
        onToggleSave={toggleSaveJob}
      />

      {/* johnson: ExistingCode - Toast Notification */}
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
            {toast.type === 'success' ? (
              <CheckCircleIcon className="w-6 h-6 flex-shrink-0" />
            ) : (
              <ExclamationCircleIcon className="w-6 h-6 flex-shrink-0" />
            )}
            <span className="font-medium">{toast.message}</span>
          </div>
        </div>
      )}
    </CandidateDashboardLayout>
  );
}
