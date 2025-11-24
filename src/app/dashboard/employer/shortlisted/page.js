'use client';

import Image from 'next/image';
import {
  UserGroupIcon,
  DocumentTextIcon,
  ClockIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';
import ShortlistedCandidates from '@/components/ui/ShortlistedCandidates';
import EmployerSidebar from '@/components/ui/EmployerSidebar';

// tomiwa: Mock data for demonstration - Updated with diverse candidates and statuses
const mockCandidates = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'Senior Frontend Developer',
    company: 'Tech Corp',
    location: 'San Francisco, CA',
    matchScore: 95,
    skills: ['React', 'TypeScript', 'UI/UX'],
    experience: '98%',
    expertise: '92%',
    status: 'Interview Scheduled',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face',
    nextInterview: 'March 20, 2024 at 10:00 AM',
    assessmentStatus: 'Completed',
    assessmentType: 'Technical Assessment',
    assessmentName: 'React & TypeScript Skills Test',
    assessmentScore: 92,
    progress: 95,
    stage: 'interview',
    notes: 'Strong technical background, excellent portfolio'
  },
  {
    id: 2,
    name: 'Michael Rodriguez',
    role: 'Sales Representative',
    company: 'SalesPro Inc',
    location: 'Miami, FL',
    matchScore: 88,
    skills: ['B2B Sales', 'CRM', 'Lead Generation'],
    experience: '92%',
    expertise: '88%',
    status: 'Final Stage',
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    assessmentStatus: 'Completed',
    assessmentType: 'Sales Skills Assessment',
    assessmentName: 'B2B Sales Scenario Test',
    assessmentScore: 89,
    progress: 88,
    stage: 'final',
    notes: 'Exceeded sales targets consistently'
  },
  {
    id: 3,
    name: 'Emily Johnson',
    role: 'Marketing Manager',
    company: 'BrandCo',
    location: 'New York, NY',
    matchScore: 85,
    skills: ['Digital Marketing', 'Brand Strategy', 'Analytics'],
    experience: '90%',
    expertise: '85%',
    status: 'Assessment Sent',
    imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
    assessmentStatus: 'Pending',
    assessmentType: 'Marketing Strategy Assessment',
    assessmentName: 'Digital Campaign Planning Test',
    assessmentSentDate: 'March 15, 2024',
    assessmentDeadline: 'March 22, 2024',
    progress: 85,
    stage: 'assessment',
    notes: 'Creative approach to campaigns'
  },
  {
    id: 4,
    name: 'James Wilson',
    role: 'Product Manager',
    company: 'ProductHub',
    location: 'Seattle, WA',
    matchScore: 92,
    skills: ['Agile', 'Product Strategy', 'User Research'],
    experience: '94%',
    expertise: '90%',
    status: 'Final Stage',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    assessmentStatus: 'Completed',
    assessmentType: 'Product Management Assessment',
    assessmentName: 'Product Strategy & Roadmap Test',
    assessmentScore: 95,
    progress: 92,
    stage: 'final',
    notes: 'Led successful product launches'
  },
  {
    id: 5,
    name: 'Sofia Garcia',
    role: 'Customer Success Manager',
    company: 'ServiceTech',
    location: 'Austin, TX',
    matchScore: 78,
    skills: ['Customer Support', 'Account Management', 'SaaS'],
    experience: '82%',
    expertise: '75%',
    status: 'Interview Failed',
    imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop&crop=face',
    interviewFeedback: 'Need more enterprise experience. Strong communication skills but lacks technical depth for our requirements.',
    progress: 78,
    stage: 'interview',
    notes: 'Good cultural fit, consider for junior role'
  },
  {
    id: 6,
    name: 'David Kim',
    role: 'Data Scientist',
    company: 'Analytics Pro',
    location: 'Boston, MA',
    matchScore: 91,
    skills: ['Python', 'Machine Learning', 'SQL'],
    experience: '96%',
    expertise: '88%',
    status: 'Interview Scheduled',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
    nextInterview: 'March 22, 2024 at 2:00 PM',
    assessmentStatus: 'Completed',
    assessmentType: 'Data Science Assessment',
    assessmentName: 'ML Algorithm & Statistics Test',
    assessmentScore: 94,
    progress: 91,
    stage: 'interview',
    notes: 'PhD in Statistics, published researcher'
  },
  {
    id: 7,
    name: 'Lisa Thompson',
    role: 'UX Designer',
    company: 'Design Studio',
    location: 'Portland, OR',
    matchScore: 87,
    skills: ['Figma', 'User Research', 'Prototyping'],
    experience: '89%',
    expertise: '85%',
    status: 'Assessment Failed',
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face',
    assessmentStatus: 'Failed',
    assessmentType: 'UX Design Assessment',
    assessmentName: 'User Experience Design Challenge',
    assessmentScore: 65,
    interviewFeedback: 'Design skills are good but struggled with technical assessment. Portfolio shows potential.',
    progress: 65,
    stage: 'assessment',
    notes: 'Consider for junior UX role'
  },
  {
    id: 8,
    name: 'Alex Martinez',
    role: 'DevOps Engineer',
    company: 'CloudTech',
    location: 'Denver, CO',
    matchScore: 93,
    skills: ['AWS', 'Docker', 'Kubernetes'],
    experience: '95%',
    expertise: '91%',
    status: 'Final Stage',
    imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face',
    assessmentStatus: 'Completed',
    assessmentType: 'DevOps Technical Assessment',
    assessmentName: 'Cloud Infrastructure & Automation Test',
    assessmentScore: 96,
    progress: 93,
    stage: 'final',
    notes: 'Exceptional infrastructure knowledge'
  }
];

export default function ShortlistedPage() {
  return (
    <div className="min-h-screen bg-neutral-50 flex">
      {/* Sidebar */}
      <EmployerSidebar />

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-brand-aqua to-[#0C2E3C]">
          <div className="max-w-7xl mx-auto px-8 py-12">
            <h1 className="text-3xl font-display font-bold text-white mb-2">
              Shortlisted Candidates
            </h1>
            <p className="text-white/80">
              Track and manage your shortlisted candidates through the hiring pipeline
            </p>
          </div>
        </div>

        <main className="max-w-7xl mx-auto px-8 py-12">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-4">
                <div className="bg-brand-aqua/10 p-3 rounded-xl">
                  <UserGroupIcon className="w-6 h-6 text-brand-aqua" />
                </div>
                <div>
                  <p className="text-sm text-neutral-600">Total Shortlisted</p>
                  <p className="text-2xl font-bold text-brand-black">45</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-4">
                <div className="bg-brand-orange/10 p-3 rounded-xl">
                  <DocumentTextIcon className="w-6 h-6 text-brand-orange" />
                </div>
                <div>
                  <p className="text-sm text-neutral-600">Assessment Sent</p>
                  <p className="text-2xl font-bold text-brand-black">28</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-4">
                <div className="bg-brand-yellow/10 p-3 rounded-xl">
                  <ClockIcon className="w-6 h-6 text-brand-yellow" />
                </div>
                <div>
                  <p className="text-sm text-neutral-600">Interview Scheduled</p>
                  <p className="text-2xl font-bold text-brand-black">15</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-4">
                <div className="bg-emerald-100 p-3 rounded-xl">
                  <CheckCircleIcon className="w-6 h-6 text-emerald-500" />
                </div>
                <div>
                  <p className="text-sm text-neutral-600">Offer Stage</p>
                  <p className="text-2xl font-bold text-brand-black">8</p>
                </div>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search candidates..."
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-brand-aqua/20 focus:border-brand-aqua"
              />
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Candidates Section */}
          <ShortlistedCandidates candidates={mockCandidates} />
        </main>
      </div>
    </div>
  );
} 