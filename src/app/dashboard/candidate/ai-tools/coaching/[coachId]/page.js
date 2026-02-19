/**
 * File: src/app/dashboard/candidate/ai-tools/coaching/[coachId]/page.js
 * 
 * tomiwa: Coach Profile Page - Redesigned with improved visual hierarchy
 * updated: Separated booking into its own page for better UX flow
 * updated: Reduced cover height (280-300px), added gradient overlay
 * updated: Aligned avatar and text block cleanly, grouped sections with clear titles
 * updated: Clean profile page with "Book Coach" button linking to dedicated booking page
 * 
 * Features:
 * - Reduced cover height with gradient overlay for readability
 * - Clean avatar and text block alignment
 * - Grouped sections: About, Specialties, Reviews, Credentials
 * - Improved spacing and consistent card structure
 * - Prominent "Book Coach" CTA linking to separate booking page
 * - Full responsiveness across all breakpoints
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import CandidateDashboardLayout from '@/components/layouts/CandidateDashboardLayout.jsx';
import {
  UserGroupIcon,
  ArrowLeftIcon,
  CheckBadgeIcon,
  ClockIcon,
  CalendarDaysIcon,
  GlobeAltIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  ChatBubbleLeftRightIcon,
  VideoCameraIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';

export default function CoachProfilePage() {
  // tomiwa: Get coachId from URL params
  const params = useParams();
  const coachId = params.coachId;

  // tomiwa: Simulating subscription status
  // ExistingCode: In real app, this comes from user context
  const hasCoachingSubscription = false;

  // tomiwa: All coaches data - comprehensive coach profiles
  // ExistingCode: Keeping original coach data structure with all details
  const allCoaches = {
    1: {
      id: 1,
      name: 'Dr. Sarah Mitchell',
      title: 'Executive Career Coach',
      specialty: 'Tech',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
      coverPhoto: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=400&fit=crop',
      rating: 4.9,
      reviewCount: 127,
      yearsExperience: 15,
      sessionsCompleted: 450,
      bio: 'Former HR Director at Fortune 500 companies with over 15 years of experience in talent management and executive development. I specialize in helping professionals navigate career transitions, negotiate salaries, and land executive roles. My approach combines strategic career planning with practical interview preparation.',
      specialties: ['Career Transition', 'Executive Coaching', 'Salary Negotiation', 'Leadership Development'],
      languages: ['English', 'Spanish'],
      education: 'PhD in Organizational Psychology, Stanford University',
      certifications: ['ICF Professional Certified Coach (PCC)', 'Certified Executive Coach (CEC)'],
      verified: true,
      responseTime: 'Usually responds within 2 hours',
      availability: [
        { date: 'Tomorrow', day: 'Wed, Feb 6', slots: ['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM'] },
        { date: 'Thursday', day: 'Thu, Feb 7', slots: ['10:00 AM', '1:00 PM', '3:00 PM'] },
        { date: 'Friday', day: 'Fri, Feb 8', slots: ['9:00 AM', '12:00 PM', '2:00 PM', '5:00 PM'] },
        { date: 'Monday', day: 'Mon, Feb 11', slots: ['11:00 AM', '3:00 PM'] }
      ],
      reviews: [
        { id: 1, name: 'John D.', avatar: 'JD', rating: 5, date: 'January 2026', text: 'Dr. Mitchell helped me transition from engineering to product management. Her insights were invaluable, and I landed my dream role within 2 months!' },
        { id: 2, name: 'Sarah K.', avatar: 'SK', rating: 5, date: 'December 2025', text: 'Excellent coach! She helped me negotiate a 40% salary increase. Highly recommend for anyone looking to level up their career.' },
        { id: 3, name: 'Michael T.', avatar: 'MT', rating: 4, date: 'November 2025', text: 'Very knowledgeable and supportive. The mock interviews were particularly helpful for my executive interviews.' }
      ]
    },
    2: {
      id: 2,
      name: 'James Okonkwo',
      title: 'Tech Interview Specialist',
      specialty: 'Design',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      coverPhoto: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&h=400&fit=crop',
      rating: 4.8,
      reviewCount: 89,
      yearsExperience: 10,
      sessionsCompleted: 320,
      bio: 'Senior Software Engineer turned career coach with experience at top tech companies. I specialize in FAANG interview preparation, system design interviews, and helping engineers grow their careers in tech. Having conducted hundreds of interviews at Google, I know exactly what interviewers look for.',
      specialties: ['Tech Interviews', 'System Design', 'Career Growth', 'FAANG Prep'],
      languages: ['English'],
      education: 'MS in Computer Science, MIT',
      certifications: ['Google Interview Coach', 'Certified Technical Interviewer'],
      verified: true,
      responseTime: 'Usually responds within 1 hour',
      availability: [
        { date: 'Today', day: 'Tue, Feb 5', slots: ['5:00 PM', '7:00 PM'] },
        { date: 'Tomorrow', day: 'Wed, Feb 6', slots: ['9:00 AM', '11:00 AM', '2:00 PM', '6:00 PM'] },
        { date: 'Thursday', day: 'Thu, Feb 7', slots: ['10:00 AM', '4:00 PM'] },
        { date: 'Friday', day: 'Fri, Feb 8', slots: ['3:00 PM', '5:00 PM'] }
      ],
      reviews: [
        { id: 1, name: 'Alex P.', avatar: 'AP', rating: 5, date: 'January 2026', text: 'James helped me crack my Google interview! His system design sessions were game-changing.' },
        { id: 2, name: 'Lisa M.', avatar: 'LM', rating: 5, date: 'January 2026', text: 'After 3 sessions with James, I felt completely prepared for my Meta interviews. Got the offer!' },
        { id: 3, name: 'David R.', avatar: 'DR', rating: 4, date: 'December 2025', text: 'Great technical insights and very patient with explaining complex concepts.' }
      ]
    },
    3: {
      id: 3,
      name: 'Emma Thompson',
      title: 'Resume & Personal Branding Expert',
      specialty: 'Hospitality',
      photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop',
      coverPhoto: 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=1200&h=400&fit=crop',
      rating: 4.9,
      reviewCount: 156,
      yearsExperience: 12,
      sessionsCompleted: 580,
      bio: 'Certified Professional Resume Writer (CPRW) with experience in crafting ATS-optimized resumes for all industries. I help professionals tell their career story in a compelling way that gets noticed by recruiters. My clients have landed roles at top companies across finance, tech, healthcare, and more.',
      specialties: ['Resume Writing', 'LinkedIn Optimization', 'Personal Branding', 'Cover Letters'],
      languages: ['English', 'French'],
      education: 'BA in Communications, Northwestern University',
      certifications: ['Certified Professional Resume Writer (CPRW)', 'LinkedIn Certified Coach'],
      verified: true,
      responseTime: 'Usually responds within 3 hours',
      availability: [
        { date: 'Today', day: 'Tue, Feb 5', slots: ['3:30 PM', '5:00 PM'] },
        { date: 'Tomorrow', day: 'Wed, Feb 6', slots: ['10:00 AM', '1:00 PM', '3:00 PM'] },
        { date: 'Thursday', day: 'Thu, Feb 7', slots: ['9:00 AM', '11:00 AM', '2:00 PM'] },
        { date: 'Friday', day: 'Fri, Feb 8', slots: ['10:00 AM', '4:00 PM'] }
      ],
      reviews: [
        { id: 1, name: 'Rachel B.', avatar: 'RB', rating: 5, date: 'January 2026', text: 'Emma completely transformed my resume. I started getting 3x more interview calls within a week!' },
        { id: 2, name: 'Tom H.', avatar: 'TH', rating: 5, date: 'December 2025', text: 'Her LinkedIn optimization tips helped me attract recruiters from top companies. Highly recommended!' },
        { id: 3, name: 'Jennifer L.', avatar: 'JL', rating: 5, date: 'November 2025', text: 'Professional, thorough, and really understands what makes a resume stand out.' }
      ]
    },
    4: {
      id: 4,
      name: 'Dr. Michael Chen',
      title: 'Leadership Development Coach',
      specialty: 'Business',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
      coverPhoto: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=400&fit=crop',
      rating: 4.7,
      reviewCount: 78,
      yearsExperience: 18,
      sessionsCompleted: 290,
      bio: 'PhD in Organizational Psychology with 18 years of experience coaching leaders at all levels. I help aspiring leaders develop crucial skills for management and C-suite roles. My expertise includes executive presence, team dynamics, and organizational change management.',
      specialties: ['Leadership Skills', 'Team Management', 'Executive Presence', 'Change Management'],
      languages: ['English', 'Mandarin'],
      education: 'PhD in Organizational Psychology, UCLA',
      certifications: ['Marshall Goldsmith Stakeholder Centered Coaching', 'ICF Master Certified Coach'],
      verified: true,
      responseTime: 'Usually responds within 4 hours',
      availability: [
        { date: 'Friday', day: 'Fri, Feb 8', slots: ['10:00 AM', '2:00 PM'] },
        { date: 'Monday', day: 'Mon, Feb 11', slots: ['9:00 AM', '11:00 AM', '3:00 PM'] },
        { date: 'Tuesday', day: 'Tue, Feb 12', slots: ['10:00 AM', '1:00 PM'] }
      ],
      reviews: [
        { id: 1, name: 'Amanda K.', avatar: 'AK', rating: 5, date: 'December 2025', text: 'Dr. Chen helped me prepare for my first director role. His insights on leadership were transformative.' },
        { id: 2, name: 'Robert S.', avatar: 'RS', rating: 4, date: 'November 2025', text: 'Very insightful sessions. He has a deep understanding of organizational dynamics.' },
        { id: 3, name: 'Emily W.', avatar: 'EW', rating: 5, date: 'October 2025', text: 'Excellent at helping you understand your leadership style and how to improve it.' }
      ]
    },
    5: {
      id: 5,
      name: 'Priya Sharma',
      title: 'Tech Career Strategist',
      specialty: 'Tech',
      photo: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=400&fit=crop',
      coverPhoto: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&h=400&fit=crop',
      rating: 4.8,
      reviewCount: 94,
      yearsExperience: 8,
      sessionsCompleted: 210,
      bio: 'Former Google recruiter with deep knowledge of tech hiring processes. I specialize in product management and engineering career paths, helping candidates navigate the competitive tech landscape. My insider knowledge helps you understand exactly what top companies are looking for.',
      specialties: ['Tech Strategy', 'Product Management', 'Startup Careers', 'Career Planning'],
      languages: ['English', 'Hindi'],
      education: 'MBA, Harvard Business School',
      certifications: ['Product Management Professional', 'Certified Recruiter'],
      verified: true,
      responseTime: 'Usually responds within 2 hours',
      availability: [
        { date: 'Wednesday', day: 'Wed, Feb 6', slots: ['11:00 AM', '2:00 PM', '4:00 PM'] },
        { date: 'Thursday', day: 'Thu, Feb 7', slots: ['10:00 AM', '1:00 PM'] },
        { date: 'Friday', day: 'Fri, Feb 8', slots: ['9:00 AM', '3:00 PM'] }
      ],
      reviews: [
        { id: 1, name: 'Kevin L.', avatar: 'KL', rating: 5, date: 'January 2026', text: 'Priya knows the tech industry inside out. Her guidance helped me land a PM role at a top startup.' },
        { id: 2, name: 'Nina P.', avatar: 'NP', rating: 5, date: 'December 2025', text: 'Her insider knowledge of Google hiring was incredibly valuable. Got the job!' },
        { id: 3, name: 'Chris M.', avatar: 'CM', rating: 4, date: 'November 2025', text: 'Great at helping you position yourself for the right tech opportunities.' }
      ]
    },
    6: {
      id: 6,
      name: 'Robert Williams',
      title: 'Interview Performance Coach',
      specialty: 'Business',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
      coverPhoto: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&h=400&fit=crop',
      rating: 4.6,
      reviewCount: 67,
      yearsExperience: 14,
      sessionsCompleted: 180,
      bio: 'Communications expert and former corporate trainer with 14 years of experience. I help candidates master behavioral interviews and presentation skills. My focus is on building confidence and communication skills that make you memorable to interviewers.',
      specialties: ['Behavioral Interviews', 'Communication', 'Confidence Building', 'Presentation Skills'],
      languages: ['English'],
      education: 'MA in Communications, Columbia University',
      certifications: ['Certified Professional Coach', 'Public Speaking Expert'],
      verified: true,
      responseTime: 'Usually responds within 1 hour',
      availability: [
        { date: 'Today', day: 'Tue, Feb 5', slots: ['6:00 PM', '8:00 PM'] },
        { date: 'Tomorrow', day: 'Wed, Feb 6', slots: ['10:00 AM', '2:00 PM', '5:00 PM'] },
        { date: 'Thursday', day: 'Thu, Feb 7', slots: ['11:00 AM', '3:00 PM'] }
      ],
      reviews: [
        { id: 1, name: 'Sarah J.', avatar: 'SJ', rating: 5, date: 'January 2026', text: 'Robert helped me overcome my interview anxiety. Now I feel confident in any interview setting!' },
        { id: 2, name: 'Mark D.', avatar: 'MD', rating: 4, date: 'December 2025', text: 'Great at breaking down the STAR method and helping you craft compelling stories.' },
        { id: 3, name: 'Laura T.', avatar: 'LT', rating: 5, date: 'November 2025', text: 'His communication tips are gold. I use them in my everyday professional life now.' }
      ]
    },
    7: {
      id: 7,
      name: 'Amara Johnson',
      title: 'Career Transition Specialist',
      specialty: 'Design',
      photo: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop',
      coverPhoto: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=400&fit=crop',
      rating: 4.9,
      reviewCount: 112,
      yearsExperience: 11,
      sessionsCompleted: 340,
      bio: 'I help professionals successfully pivot their careers and break into new industries. With 11 years of experience, I specialize in identifying transferable skills, crafting compelling narratives, and building strategic connections in your target industry.',
      specialties: ['Career Pivot', 'Industry Change', 'Skills Assessment', 'Networking Strategy'],
      languages: ['English'],
      education: 'MS in Career Counseling, NYU',
      certifications: ['Global Career Development Facilitator', 'Certified Career Coach'],
      verified: true,
      responseTime: 'Usually responds within 3 hours',
      availability: [
        { date: 'Thursday', day: 'Thu, Feb 7', slots: ['9:00 AM', '11:00 AM', '2:00 PM'] },
        { date: 'Friday', day: 'Fri, Feb 8', slots: ['10:00 AM', '1:00 PM', '4:00 PM'] },
        { date: 'Monday', day: 'Mon, Feb 11', slots: ['9:00 AM', '3:00 PM'] }
      ],
      reviews: [
        { id: 1, name: 'Patricia N.', avatar: 'PN', rating: 5, date: 'January 2026', text: 'Amara helped me transition from teaching to UX design. Her process for identifying transferable skills was amazing!' },
        { id: 2, name: 'James B.', avatar: 'JB', rating: 5, date: 'December 2025', text: 'Best career coach I have worked with. She really understands the challenges of changing industries.' },
        { id: 3, name: 'Michelle R.', avatar: 'MR', rating: 5, date: 'November 2025', text: 'Her networking strategies opened doors I did not even know existed.' }
      ]
    },
    8: {
      id: 8,
      name: 'David Park',
      title: 'Senior Tech Recruiter Coach',
      specialty: 'Hospitality',
      photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop',
      coverPhoto: 'https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?w=1200&h=400&fit=crop',
      rating: 4.7,
      reviewCount: 83,
      yearsExperience: 9,
      sessionsCompleted: 265,
      bio: 'Ex-Amazon and Microsoft recruiter providing insider knowledge on tech hiring. I help candidates understand what top companies look for and how to position themselves effectively. Specializing in offer negotiation and career planning for tech professionals.',
      specialties: ['Tech Recruiting', 'Offer Negotiation', 'Career Planning', 'Interview Strategy'],
      languages: ['English', 'Korean'],
      education: 'BA in Business Administration, UC Berkeley',
      certifications: ['Certified Tech Recruiter', 'Negotiation Expert'],
      verified: true,
      responseTime: 'Usually responds within 2 hours',
      availability: [
        { date: 'Monday', day: 'Mon, Feb 11', slots: ['4:00 PM', '6:00 PM'] },
        { date: 'Tuesday', day: 'Tue, Feb 12', slots: ['10:00 AM', '2:00 PM', '5:00 PM'] },
        { date: 'Wednesday', day: 'Wed, Feb 13', slots: ['11:00 AM', '3:00 PM'] }
      ],
      reviews: [
        { id: 1, name: 'Andrew K.', avatar: 'AK', rating: 5, date: 'January 2026', text: 'David helped me negotiate $30K more on my Amazon offer. His insider knowledge is invaluable!' },
        { id: 2, name: 'Jenny C.', avatar: 'JC', rating: 4, date: 'December 2025', text: 'Great at explaining the tech hiring process from the recruiter perspective.' },
        { id: 3, name: 'Brian H.', avatar: 'BH', rating: 5, date: 'November 2025', text: 'His negotiation strategies are practical and effective. Highly recommend!' }
      ]
    }
  };

  // tomiwa: Get current coach data
  const coach = allCoaches[coachId] || allCoaches[1];

  return (
    <CandidateDashboardLayout>
      {/* tomiwa: Back navigation - fixed position above content */}
      <div className="mb-4">
        <Link
          href="/dashboard/candidate/ai-tools/coaching/browse"
          className="inline-flex items-center gap-2 text-neutral-500 hover:text-brand-aqua 
                    transition-colors text-sm font-medium group"
        >
          <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to Coaches</span>
        </Link>
      </div>

      {/* ===================================================================== */}
      {/* tomiwa: Coach Profile Header with Cover Photo */}
      {/* updated: Reduced height (280-300px), gradient overlay, clean avatar alignment */}
      {/* ===================================================================== */}
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden mb-6 shadow-sm">
        {/* tomiwa: Cover photo section - reduced height with gradient overlay */}
        <div className="h-48 
                       sm:h-56 
                       md:h-64 
                       lg:h-72 
                       relative overflow-hidden">
          {/* tomiwa: Cover image */}
          <img 
            src={coach.coverPhoto} 
            alt={`${coach.name} cover`}
            className="w-full h-full object-cover"
          />
          {/* tomiwa: Gradient overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-brand-black/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-aqua/20 to-transparent" />
        </div>

        {/* tomiwa: Coach info section - positioned to overlap cover */}
        <div className="px-5 
                       sm:px-6 
                       md:px-8 
                       pb-6 relative">
          {/* tomiwa: Profile photo - overlapping the cover */}
          <div className="-mt-14 
                         sm:-mt-16 
                         md:-mt-20 
                         mb-4 flex items-end gap-4 sm:gap-5">
            <div className="relative">
              <img
                src={coach.photo}
                alt={coach.name}
                className="w-24 h-24 
                          sm:w-28 sm:h-28 
                          md:w-32 md:h-32 
                          rounded-2xl object-cover border-4 border-white shadow-lg"
              />
              {/* tomiwa: Verified badge */}
              {coach.verified && (
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full 
                               flex items-center justify-center shadow-md">
                  <CheckBadgeIcon className="w-6 h-6 text-brand-aqua" />
                </div>
              )}
            </div>

            {/* tomiwa: Quick stats - visible on larger screens beside photo */}
            <div className="hidden sm:flex items-center gap-6 pb-2">
              <div className="text-center">
                <div className="text-xl font-bold text-neutral-900">{coach.rating}</div>
                <div className="flex items-center gap-1">
                  <StarSolidIcon className="w-4 h-4 text-brand-yellow" />
                  <span className="text-xs text-neutral-500">Rating</span>
                </div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-neutral-900">{coach.reviewCount}</div>
                <div className="text-xs text-neutral-500">Reviews</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-neutral-900">{coach.sessionsCompleted}+</div>
                <div className="text-xs text-neutral-500">Sessions</div>
              </div>
            </div>
          </div>

          {/* tomiwa: Name, title, and CTA row */}
          <div className="flex flex-col 
                         lg:flex-row 
                         lg:items-start 
                         lg:justify-between 
                         gap-4">
            <div>
              {/* tomiwa: Name with verified badge inline */}
              <h1 className="text-xl 
                            sm:text-2xl 
                            md:text-3xl 
                            font-display font-bold text-neutral-900 mb-1">
                {coach.name}
              </h1>
              
              {/* tomiwa: Title and specialty */}
              <p className="text-neutral-600 text-base sm:text-lg mb-2">{coach.title}</p>
              
              {/* tomiwa: Specialty badge */}
              <span className="inline-flex items-center text-sm text-primary-700 
                             bg-primary-50 px-3 py-1 rounded-lg font-medium mb-3">
                {coach.specialty} Specialist
              </span>

              {/* tomiwa: Mobile stats row */}
              <div className="flex sm:hidden items-center gap-4 mb-3">
                <div className="flex items-center gap-1.5">
                  <StarSolidIcon className="w-5 h-5 text-brand-yellow" />
                  <span className="font-semibold text-neutral-900">{coach.rating}</span>
                  <span className="text-neutral-500 text-sm">({coach.reviewCount})</span>
                </div>
                <span className="text-neutral-300">•</span>
                <span className="text-neutral-600 text-sm">{coach.sessionsCompleted}+ sessions</span>
              </div>

              {/* tomiwa: Quick info row */}
              <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-600">
                <div className="flex items-center gap-1.5">
                  <BriefcaseIcon className="w-4 h-4 text-neutral-400" />
                  <span>{coach.yearsExperience} years experience</span>
                </div>
                <span className="text-neutral-300 hidden sm:inline">•</span>
                <div className="flex items-center gap-1.5">
                  <ClockIcon className="w-4 h-4 text-neutral-400" />
                  <span>{coach.responseTime}</span>
                </div>
              </div>
            </div>

            {/* tomiwa: Book Coach CTA - links to dedicated booking page */}
            {/* updated: Changed from modal to Link for separate booking page */}
            <Link
              href={`/dashboard/candidate/ai-tools/coaching/${coachId}/book`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 
                        bg-brand-aqua text-white font-semibold rounded-xl 
                        hover:bg-primary-600 transition-all duration-300
                        shadow-lg shadow-brand-aqua/20 hover:shadow-xl 
                        text-base whitespace-nowrap lg:self-start"
            >
              <CalendarDaysIcon className="w-5 h-5" />
              Book Coach
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* tomiwa: Main Content Grid - 2 columns on desktop */}
      {/* Left: About, Specialties, Reviews | Right: Booking Card, Languages, Credentials */}
      {/* ===================================================================== */}
      <div className="grid grid-cols-1 
                     lg:grid-cols-3 
                     gap-5 
                     sm:gap-6">
        
        {/* tomiwa: Left column - Main content */}
        <div className="lg:col-span-2 space-y-5 sm:space-y-6">
          
          {/* tomiwa: About Section */}
          <div className="bg-white rounded-xl border border-neutral-200 p-5 sm:p-6 shadow-sm">
            <h2 className="text-lg font-display font-bold text-neutral-900 mb-4 
                          flex items-center gap-2">
              <UserGroupIcon className="w-5 h-5 text-brand-aqua" />
              About
            </h2>
            <p className="text-neutral-600 leading-relaxed text-sm sm:text-base">
              {coach.bio}
            </p>
          </div>

          {/* tomiwa: Specialties Section */}
          <div className="bg-white rounded-xl border border-neutral-200 p-5 sm:p-6 shadow-sm">
            <h2 className="text-lg font-display font-bold text-neutral-900 mb-4 
                          flex items-center gap-2">
              <SparklesIcon className="w-5 h-5 text-brand-aqua" />
              Specialties
            </h2>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {coach.specialties.map((specialty, index) => (
                <span 
                  key={index}
                  className="inline-flex items-center gap-2 text-sm text-primary-700 
                            bg-primary-50 px-4 py-2 rounded-xl font-medium
                            border border-primary-100"
                >
                  <CheckCircleIcon className="w-4 h-4" />
                  {specialty}
                </span>
              ))}
            </div>
          </div>

          {/* tomiwa: Reviews Section */}
          <div className="bg-white rounded-xl border border-neutral-200 p-5 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-display font-bold text-neutral-900 
                            flex items-center gap-2">
                <ChatBubbleLeftRightIcon className="w-5 h-5 text-brand-aqua" />
                Reviews
              </h2>
              <div className="flex items-center gap-2 bg-brand-yellow/10 px-3 py-1.5 rounded-lg">
                <StarSolidIcon className="w-5 h-5 text-brand-yellow" />
                <span className="font-bold text-neutral-900">{coach.rating}</span>
                <span className="text-sm text-neutral-500">({coach.reviewCount})</span>
              </div>
            </div>

            <div className="space-y-4">
              {coach.reviews.map((review) => (
                <div 
                  key={review.id}
                  className="border-b border-neutral-100 pb-4 last:border-0 last:pb-0"
                >
                  <div className="flex items-start gap-3 mb-2">
                    {/* tomiwa: Reviewer avatar */}
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-100 to-brand-aqua/20 
                                   rounded-xl flex items-center justify-center 
                                   text-primary-700 font-semibold text-sm flex-shrink-0">
                      {review.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-neutral-900">{review.name}</span>
                        <span className="text-xs text-neutral-500">{review.date}</span>
                      </div>
                      <div className="flex items-center gap-0.5 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <StarSolidIcon 
                            key={i}
                            className={`w-4 h-4 ${i < review.rating ? 'text-brand-yellow' : 'text-neutral-200'}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-neutral-600 leading-relaxed pl-13">{review.text}</p>
                </div>
              ))}
            </div>

            {/* tomiwa: View all reviews link */}
            <button className="w-full mt-4 py-2.5 text-sm font-medium text-brand-aqua 
                             hover:text-primary-700 transition-colors">
              View all {coach.reviewCount} reviews →
            </button>
          </div>
        </div>

        {/* tomiwa: Right column - Booking Card and Supporting Info */}
        <div className="space-y-5 sm:space-y-6">
          
          {/* ===================================================================== */}
          {/* tomiwa: Simplified Booking Card */}
          {/* updated: Clean card linking to dedicated booking page */}
          {/* ===================================================================== */}
          <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-sm 
                         sticky top-4">
            {/* tomiwa: Card header with gradient */}
            <div className="bg-gradient-to-r from-primary-50 to-brand-aqua/10 px-5 py-4 
                           border-b border-neutral-100">
              <h2 className="text-lg font-display font-bold text-neutral-900 
                            flex items-center gap-2">
                <CalendarDaysIcon className="w-5 h-5 text-brand-aqua" />
                Book a Session
              </h2>
              <p className="text-sm text-neutral-600 mt-1">Schedule your coaching session</p>
            </div>

            <div className="p-5">
              {/* tomiwa: Session options preview */}
              {/* tomiwa: updated - Changed prices from USD ($) to Naira (₦) */}
              <div className="space-y-3 mb-5">
                {/* Video Call option */}
                <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-xl">
                  <div className="w-10 h-10 bg-brand-aqua/10 rounded-lg flex items-center justify-center">
                    <VideoCameraIcon className="w-5 h-5 text-brand-aqua" />
                  </div>
                  <div className="flex-1">
                    <span className="font-medium text-neutral-900 text-sm">Video Call</span>
                    <span className="text-xs text-neutral-500 block">60 min • Face-to-face</span>
                  </div>
                  <span className="font-bold text-neutral-900">₦25,000</span>
                </div>

                {/* Voice Call option */}
                <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-xl">
                  <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center">
                    <ChatBubbleLeftRightIcon className="w-5 h-5 text-neutral-600" />
                  </div>
                  <div className="flex-1">
                    <span className="font-medium text-neutral-900 text-sm">Voice / Chat</span>
                    <span className="text-xs text-neutral-500 block">30-45 min • Flexible options</span>
                  </div>
                  <span className="font-bold text-neutral-700">₦12,000+</span>
                </div>
              </div>

              {/* tomiwa: Next available times preview */}
              <div className="mb-5">
                <h3 className="text-sm font-semibold text-neutral-900 mb-2">Next Available</h3>
                <div className="flex flex-wrap gap-2">
                  {coach.availability[0]?.slots.slice(0, 3).map((slot, index) => (
                    <span 
                      key={index}
                      className="text-xs bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg font-medium"
                    >
                      {coach.availability[0]?.date} • {slot}
                    </span>
                  ))}
                </div>
              </div>

              {/* tomiwa: Book Coach CTA - links to booking page */}
              <Link
                href={`/dashboard/candidate/ai-tools/coaching/${coachId}/book`}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 
                          bg-brand-aqua text-white font-semibold rounded-xl 
                          hover:bg-primary-600 transition-all duration-300
                          shadow-md shadow-brand-aqua/20 hover:shadow-lg"
              >
                <CalendarDaysIcon className="w-5 h-5" />
                Book Session
                <ArrowRightIcon className="w-4 h-4" />
              </Link>

              {/* tomiwa: Trust indicators */}
              <div className="mt-4 pt-4 border-t border-neutral-100">
                <div className="flex items-center gap-2 text-xs text-neutral-500 mb-2">
                  <CheckCircleIcon className="w-4 h-4 text-emerald-600" />
                  <span>Free cancellation up to 24h before</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-neutral-500">
                  <ClockIcon className="w-4 h-4 text-brand-aqua" />
                  <span>{coach.responseTime}</span>
                </div>
              </div>
            </div>
          </div>

          {/* tomiwa: Languages Section */}
          <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-sm">
            <h2 className="text-base font-display font-bold text-neutral-900 mb-3 
                          flex items-center gap-2">
              <GlobeAltIcon className="w-5 h-5 text-brand-aqua" />
              Languages
            </h2>
            <div className="flex flex-wrap gap-2">
              {coach.languages.map((language, index) => (
                <span 
                  key={index}
                  className="text-sm text-neutral-700 bg-neutral-100 px-3 py-1.5 rounded-lg font-medium"
                >
                  {language}
                </span>
              ))}
            </div>
          </div>

          {/* tomiwa: Credentials Section */}
          <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-sm">
            <h2 className="text-base font-display font-bold text-neutral-900 mb-4 
                          flex items-center gap-2">
              <AcademicCapIcon className="w-5 h-5 text-brand-aqua" />
              Credentials
            </h2>
            <div className="space-y-4">
              <div>
                <div className="text-xs text-neutral-500 uppercase tracking-wide font-medium mb-1.5">
                  Education
                </div>
                <p className="text-sm text-neutral-700">{coach.education}</p>
              </div>
              <div>
                <div className="text-xs text-neutral-500 uppercase tracking-wide font-medium mb-2">
                  Certifications
                </div>
                <ul className="space-y-2">
                  {coach.certifications.map((cert, index) => (
                    <li key={index} className="text-sm text-neutral-700 flex items-start gap-2">
                      <CheckCircleIcon className="w-4 h-4 text-brand-aqua flex-shrink-0 mt-0.5" />
                      <span>{cert}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* tomiwa: Quick start coaching prompt */}
          {/* updated: Simplified CTA for non-subscribers */}
          <div className="bg-gradient-to-br from-secondary-50 to-brand-orange/10 rounded-xl 
                        border border-secondary-100 p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-brand-orange/10 rounded-xl flex items-center justify-center">
                <SparklesIcon className="w-5 h-5 text-brand-orange" />
              </div>
              <h3 className="font-semibold text-neutral-900 text-base">
                Ready to Get Started?
              </h3>
            </div>
            <p className="text-sm text-neutral-600 mb-4">
              Book your first session with {coach.name} and accelerate your career growth.
            </p>
            <Link
              href={`/dashboard/candidate/ai-tools/coaching/${coachId}/book`}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 
                        bg-brand-orange text-white font-semibold rounded-xl 
                        hover:bg-secondary-600 transition-colors text-sm
                        shadow-md shadow-brand-orange/20"
            >
              Book Now
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

    </CandidateDashboardLayout>
  );
}
