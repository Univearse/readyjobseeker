/**
 * File: src/components/ui/modals/JobDetailsModal.jsx
 * 
 * tomiwa: NEW - Job Details Modal Component
 * A comprehensive modal for displaying detailed job information when candidates
 * click "View Details" on featured jobs. Includes all job details, requirements,
 * benefits, and application actions.
 * 
 * Features:
 * - Full job description and requirements
 * - Company information and culture
 * - Salary range and benefits
 * - Application and save job actions
 * - Responsive design for all screen sizes
 * - Smooth animations and transitions
 * - WCAG AA accessibility compliance
 */

'use client';

import React from 'react';
import {
  // tomiwa: Icon imports for modal UI elements
  XMarkIcon,
  MapPinIcon,
  BanknotesIcon,
  CalendarIcon,
  ClockIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  StarIcon,
  BookmarkIcon,
  PaperAirplaneIcon,
  CheckCircleIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  HeartIcon,
} from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid';

// tomiwa: Mock detailed job data - in real app, this would come from props or API
const getJobDetails = (jobId) => ({
  id: jobId,
  title: 'Product Designer',
  company: 'Paystack',
  companyLogo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=200&fit=crop',
  location: 'Lagos, Nigeria',
  salary: '$80,000 - $120,000',
  employmentType: 'Full-time',
  experienceLevel: 'Mid-level',
  postedDate: '2024-10-25',
  applicationDeadline: '2024-11-15',
  
  // tomiwa: Company information
  companyInfo: {
    size: '500-1000 employees',
    industry: 'Financial Technology',
    founded: '2015',
    website: 'https://paystack.com',
    description: 'Paystack is a modern online and offline payments platform for Africa. We make it easy for businesses to accept secure payments from multiple local and global payment channels.',
  },
  
  // tomiwa: Job description and requirements
  description: `We are looking for a talented Product Designer to join our growing design team. You will be responsible for creating intuitive and engaging user experiences for our payment platform used by thousands of businesses across Africa.

As a Product Designer at Paystack, you'll work closely with product managers, engineers, and other designers to solve complex problems and create delightful experiences for our users. You'll have the opportunity to impact millions of users and help shape the future of payments in Africa.`,

  responsibilities: [
    'Design user-centered experiences for web and mobile applications',
    'Create wireframes, prototypes, and high-fidelity designs',
    'Collaborate with cross-functional teams to define product requirements',
    'Conduct user research and usability testing',
    'Maintain and evolve our design system',
    'Present design concepts to stakeholders and leadership',
  ],

  requirements: [
    '3+ years of experience in product design or UX/UI design',
    'Proficiency in design tools like Figma, Sketch, or Adobe Creative Suite',
    'Strong portfolio demonstrating design process and problem-solving skills',
    'Experience with user research and usability testing',
    'Understanding of front-end development principles',
    'Excellent communication and collaboration skills',
    'Bachelor\'s degree in Design, HCI, or related field (preferred)',
  ],

  benefits: [
    'Competitive salary and equity package',
    'Comprehensive health insurance',
    'Flexible working hours and remote work options',
    'Professional development budget',
    'Annual team retreats and company events',
    'State-of-the-art equipment and workspace',
    'Gym membership and wellness programs',
    'Unlimited vacation policy',
  ],

  skills: [
    'User Experience Design',
    'User Interface Design',
    'Prototyping',
    'User Research',
    'Design Systems',
    'Figma',
    'Sketch',
    'Adobe Creative Suite',
    'HTML/CSS',
    'Agile Methodology',
  ],
});

export default function JobDetailsModal({ isOpen, onClose, jobId, isSaved, onToggleSave }) {
  // tomiwa: Early return if modal is not open
  if (!isOpen) return null;

  // tomiwa: Get job details based on jobId
  const job = getJobDetails(jobId);

  // tomiwa: Handle backdrop click to close modal
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // tomiwa: Handle apply to job action
  const handleApply = () => {
    // tomiwa: In real app, this would navigate to application page or open application modal
    console.log('Applying to job:', job.id);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      {/* tomiwa: Modal container with responsive sizing
           Full screen on mobile, contained on larger screens */}
      <div className="bg-white rounded-lg shadow-2xl w-full 
                      max-w-4xl max-h-[90vh] 
                      overflow-hidden 
                      animate-fade-in">
        
        {/* tomiwa: Modal header with job title and close button
             Sticky header that stays visible when scrolling */}
        <div className="sticky top-0 bg-white border-b border-neutral-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src={job.companyLogo}
              alt={job.company}
              className="w-16 h-16 rounded-lg object-cover shadow-sm"
            />
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">{job.title}</h2>
              <p className="text-lg text-neutral-600">{job.company}</p>
            </div>
          </div>
          
          {/* tomiwa: Close button */}
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <XMarkIcon className="w-6 h-6 text-neutral-600" />
          </button>
        </div>

        {/* tomiwa: Scrollable content area */}
        <div className="overflow-y-auto max-h-[calc(90vh-100px)]">
          <div className="p-6 space-y-8">
            
            {/* tomiwa: Job overview section with key details */}
            <section>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {/* tomiwa: Location */}
                <div className="flex items-center gap-2 p-3 bg-neutral-50 rounded-lg">
                  <MapPinIcon className="w-5 h-5 text-brand-aqua" />
                  <div>
                    <p className="text-xs text-neutral-500">Location</p>
                    <p className="font-medium text-neutral-900">{job.location}</p>
                  </div>
                </div>
                
                {/* tomiwa: Salary */}
                <div className="flex items-center gap-2 p-3 bg-neutral-50 rounded-lg">
                  <BanknotesIcon className="w-5 h-5 text-brand-orange" />
                  <div>
                    <p className="text-xs text-neutral-500">Salary</p>
                    <p className="font-medium text-neutral-900">{job.salary}</p>
                  </div>
                </div>
                
                {/* tomiwa: Employment Type */}
                <div className="flex items-center gap-2 p-3 bg-neutral-50 rounded-lg">
                  <ClockIcon className="w-5 h-5 text-brand-yellow" />
                  <div>
                    <p className="text-xs text-neutral-500">Type</p>
                    <p className="font-medium text-neutral-900">{job.employmentType}</p>
                  </div>
                </div>
                
                {/* tomiwa: Experience Level */}
                <div className="flex items-center gap-2 p-3 bg-neutral-50 rounded-lg">
                  <AcademicCapIcon className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="text-xs text-neutral-500">Experience</p>
                    <p className="font-medium text-neutral-900">{job.experienceLevel}</p>
                  </div>
                </div>
              </div>

              {/* tomiwa: Application deadline notice */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-center gap-3">
                <CalendarIcon className="w-5 h-5 text-amber-600" />
                <div>
                  <p className="font-medium text-amber-800">Application Deadline</p>
                  <p className="text-sm text-amber-700">
                    Apply by {new Date(job.applicationDeadline).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </section>

            {/* tomiwa: Company information section */}
            <section>
              <h3 className="text-xl font-bold text-neutral-900 mb-4 flex items-center gap-2">
                <BuildingOfficeIcon className="w-6 h-6 text-brand-aqua" />
                About {job.company}
              </h3>
              
              <div className="bg-neutral-50 rounded-lg p-6 mb-4">
                <p className="text-neutral-700 leading-relaxed mb-4">{job.companyInfo.description}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-neutral-500 mb-1">Company Size</p>
                    <p className="font-medium text-neutral-900">{job.companyInfo.size}</p>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500 mb-1">Industry</p>
                    <p className="font-medium text-neutral-900">{job.companyInfo.industry}</p>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500 mb-1">Founded</p>
                    <p className="font-medium text-neutral-900">{job.companyInfo.founded}</p>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500 mb-1">Website</p>
                    <a 
                      href={job.companyInfo.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="font-medium text-brand-aqua hover:text-brand-orange transition-colors"
                    >
                      Visit Site →
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* tomiwa: Job description section */}
            <section>
              <h3 className="text-xl font-bold text-neutral-900 mb-4 flex items-center gap-2">
                <BriefcaseIcon className="w-6 h-6 text-brand-orange" />
                Job Description
              </h3>
              <div className="prose prose-neutral max-w-none">
                <p className="text-neutral-700 leading-relaxed whitespace-pre-line">{job.description}</p>
              </div>
            </section>

            {/* tomiwa: Responsibilities section */}
            <section>
              <h3 className="text-xl font-bold text-neutral-900 mb-4">Key Responsibilities</h3>
              <ul className="space-y-3">
                {job.responsibilities.map((responsibility, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircleIcon className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="text-neutral-700">{responsibility}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* tomiwa: Requirements section */}
            <section>
              <h3 className="text-xl font-bold text-neutral-900 mb-4">Requirements</h3>
              <ul className="space-y-3">
                {job.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <StarIcon className="w-5 h-5 text-brand-yellow flex-shrink-0 mt-0.5" />
                    <span className="text-neutral-700">{requirement}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* tomiwa: Skills section */}
            <section>
              <h3 className="text-xl font-bold text-neutral-900 mb-4">Required Skills</h3>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1.5 bg-brand-aqua/10 text-brand-aqua text-sm font-medium rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            {/* tomiwa: Benefits section */}
            <section>
              <h3 className="text-xl font-bold text-neutral-900 mb-4 flex items-center gap-2">
                <HeartIcon className="w-6 h-6 text-red-500" />
                Benefits & Perks
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {job.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg">
                    <CheckCircleIcon className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span className="text-emerald-800">{benefit}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* tomiwa: Sticky footer with action buttons */}
        <div className="sticky bottom-0 bg-white border-t border-neutral-200 px-6 py-4">
          <div className="flex gap-4">
            {/* tomiwa: Save job button */}
            <button
              onClick={() => onToggleSave(job.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 focus:ring-2 focus:ring-brand-aqua focus:ring-offset-2 ${
                isSaved
                  ? 'bg-accent-100 text-accent-700 hover:bg-accent-200 border-2 border-accent-300'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 border-2 border-neutral-300'
              }`}
              aria-label={isSaved ? 'Unsave job' : 'Save job'}
            >
              {isSaved ? (
                <>
                  <BookmarkSolidIcon className="w-5 h-5 inline mr-2" />
                  Saved
                </>
              ) : (
                <>
                  <BookmarkIcon className="w-5 h-5 inline mr-2" />
                  Save Job
                </>
              )}
            </button>

            {/* tomiwa: Apply now button - primary action */}
            <button
              onClick={handleApply}
              className="flex-1 flex items-center justify-center gap-2 
                        px-6 py-3 
                        bg-brand-orange text-white 
                        font-bold 
                        rounded-lg 
                        hover:bg-orange-600 hover:shadow-lg 
                        transition-all duration-300 
                        focus:ring-2 focus:ring-brand-orange focus:ring-offset-2"
            >
              <PaperAirplaneIcon className="w-5 h-5" />
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

