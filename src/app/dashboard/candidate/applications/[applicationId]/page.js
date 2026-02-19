/**
 * File: src/app/dashboard/candidate/applications/[applicationId]/page.js
 * 
 * tomiwa: ENHANCED - Application Details Page with Timeline & Feedback
 * Complete redesign with progress timeline, feedback system, and next actions
 * 
 * Features:
 * - Visual progress timeline showing complete recruitment journey
 * - Feedback cards with detailed employer comments and assessment results
 * - Interactive status cards with next actions
 * - Document viewer for test results and feedback
 * - Communication log with employer messages
 * - Mobile responsive with optimized layout
 */

'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import CandidateDashboardLayout from '@/components/layouts/CandidateDashboardLayout.jsx';
import StatusPill from '@/components/ui/StatusPill';
import ProgressBar from '@/components/ui/ProgressBar';
import NextActionButton from '@/components/ui/NextActionButton';
import TimelineMini from '@/components/ui/TimelineMini';
import ConfirmModal from '@/components/ui/ConfirmModal';
import Toast from '@/components/ui/Toast';
import {
  // tomiwa: Enhanced icon imports for detailed application page
  ArrowLeftIcon,
  BuildingOfficeIcon,
  MapPinIcon,
  BanknotesIcon,
  CalendarIcon,
  DocumentTextIcon,
  UserIcon,
  EnvelopeIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationCircleIcon,
  XMarkIcon,
  EyeIcon,
  PaperAirplaneIcon,
  ChatBubbleLeftRightIcon,
  ArrowPathIcon,
  LightBulbIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  StarIcon,
  TrophyIcon,
  DocumentArrowDownIcon,
  ShareIcon,
  BookmarkIcon,
} from '@heroicons/react/24/outline';

// tomiwa: Enhanced mock application data - matches main applications list
const getApplicationById = (id) => {
  // tomiwa: Import the same applications from the main page
  const allApplications = [
    {
      id: 1,
      jobTitle: 'Product Designer',
      company: 'Figma',
      companyLogo: 'https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=100&h=100&fit=crop',
      status: 'Failed Assessment',
      dateApplied: '2024-10-25',
      location: 'Remote',
      salary: '$100k - $150k',
      jobType: 'Full-time',
      department: 'Design',
      description: 'We are looking for a talented Product Designer to join our team and help shape the future of design tools. You will work closely with product managers, engineers, and other designers to create intuitive and powerful user experiences.',
      requirements: [
        '3+ years of product design experience',
        'Proficiency in Figma, Sketch, or similar design tools',
        'Strong portfolio showcasing UX/UI design work',
        'Experience with user research and testing',
        'Bachelor\'s degree in Design or related field',
      ],
      responsibilities: [
        'Design user interfaces for web and mobile applications',
        'Collaborate with cross-functional teams to define product requirements',
        'Conduct user research and usability testing',
        'Create wireframes, prototypes, and high-fidelity designs',
        'Maintain and evolve design systems',
      ],
      feedback: {
        type: 'assessment_failed',
        score: 68,
        passingScore: 75,
        maxScore: 100,
        areas: ['React Hooks & Context', 'System Design', 'Component Architecture'],
        strengths: ['UI/UX Design', 'CSS/Styling', 'Problem Solving'],
        retakeAllowed: true,
        retakeDate: '2024-11-15',
        message: 'Great design skills! You scored well on UI/UX concepts. Focus on React fundamentals and system design patterns for the retake.',
        assessmentDate: '2024-10-28',
        timeSpent: '2 hours 15 minutes'
      }
    },
    {
      id: 2,
      jobTitle: 'Product Designer',
      company: 'Paystack',
      companyLogo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop',
      status: 'Interview Scheduled',
      dateApplied: '2024-10-22',
      location: 'Lagos, Nigeria',
      salary: '$80k - $120k',
      jobType: 'Full-time',
      department: 'Product',
      description: 'Join our product team to build the future of payments in Africa. Work with cross-functional teams to design user-centric financial products.',
      requirements: [
        '3+ years of product design experience',
        'Experience with fintech products',
        'Strong portfolio with mobile-first designs',
        'Understanding of payment flows',
        'Bachelor\'s degree preferred',
      ]
    },
    {
      id: 3,
      jobTitle: 'Senior UX Designer',
      company: 'Flutterwave',
      companyLogo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=100&h=100&fit=crop',
      status: 'Offer',
      dateApplied: '2024-10-20',
      location: 'Remote',
      salary: '$90k - $140k',
      jobType: 'Full-time',
      department: 'Design',
      description: 'Lead UX design for our payment infrastructure products used by thousands of businesses across Africa.',
      requirements: [
        '5+ years of UX design experience',
        'Leadership experience',
        'Fintech or B2B SaaS experience',
        'Strong portfolio with complex products',
        'Masters degree preferred',
      ]
    },
    {
      id: 4,
      jobTitle: 'Product Designer',
      company: 'Interswitch',
      companyLogo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&h=100&fit=crop',
      status: 'Disqualified',
      dateApplied: '2024-10-18',
      location: 'Hybrid',
      salary: '$70k - $110k',
      jobType: 'Full-time',
      department: 'Product',
      description: 'Join our product team to design innovative fintech solutions that serve millions of users across Africa.',
      requirements: [
        '5+ years of senior-level product design experience',
        'Experience with fintech or financial products',
        'Strong portfolio with payment/banking projects',
        'Leadership experience mentoring junior designers',
        'Masters degree preferred',
      ],
      feedback: {
        type: 'disqualified',
        reason: 'Experience Requirements',
        message: 'Thank you for your interest. We require 5+ years of senior-level product design experience with fintech products. Your portfolio shows great potential - consider applying for our mid-level positions.',
        date: '2024-10-20',
        disqualificationStage: 'Initial Review',
        suggestions: [
          'Apply for Mid-Level Product Designer role',
          'Gain more fintech experience',
          'Build portfolio with payment/banking projects'
        ]
      }
    },
    {
      id: 5,
      jobTitle: 'UX Designer',
      company: 'Andela',
      companyLogo: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=100&h=100&fit=crop',
      status: 'Rejected',
      dateApplied: '2024-10-15',
      location: 'Remote',
      salary: '$85k - $125k',
      jobType: 'Full-time',
      department: 'Design',
      description: 'Design learning experiences for developers across Africa. Work on products that impact thousands of learners.',
      requirements: [
        '3+ years of UX design experience',
        'Experience with educational products',
        'Strong research skills',
        'Portfolio with mobile and web designs',
        'Bachelor\'s degree required',
      ]
    },
    {
      id: 6,
      jobTitle: 'Lead Product Designer',
      company: 'Kuda Bank',
      companyLogo: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=100&h=100&fit=crop',
      status: 'Test Assigned',
      dateApplied: '2024-10-12',
      location: 'Lagos, Nigeria',
      salary: '$60k - $95k',
      jobType: 'Full-time',
      department: 'Design',
      description: 'Lead design for our digital banking platform. Shape the future of banking in Nigeria.',
      requirements: [
        '5+ years of product design experience',
        'Leadership experience',
        'Fintech or banking experience',
        'Strong portfolio with financial products',
        'Masters degree preferred',
      ]
    },
    {
      id: 7,
      jobTitle: 'UI/UX Designer',
      company: 'Stripe',
      companyLogo: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&h=100&fit=crop',
      status: 'Applied',
      dateApplied: '2024-10-10',
      location: 'Remote',
      salary: '$120k - $180k',
      jobType: 'Full-time',
      department: 'Design',
      description: 'Design payment experiences used by millions of businesses worldwide.',
      requirements: [
        '4+ years of UI/UX design experience',
        'Experience with complex B2B products',
        'Strong visual design skills',
        'Portfolio with payment or fintech work',
        'Bachelor\'s degree preferred',
      ]
    },
    {
      id: 8,
      jobTitle: 'Product Designer',
      company: 'Shopify',
      companyLogo: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=100&h=100&fit=crop',
      status: 'Withdrawn',
      dateApplied: '2024-10-08',
      location: 'Remote',
      salary: '$110k - $160k',
      jobType: 'Full-time',
      department: 'Commerce',
      description: 'Design e-commerce experiences for millions of merchants worldwide.',
      requirements: [
        '3+ years of product design experience',
        'E-commerce or marketplace experience',
        'Strong portfolio with complex workflows',
        'Understanding of merchant needs',
        'Bachelor\'s degree preferred',
      ]
    },
    {
      id: 9,
      jobTitle: 'Senior Product Designer',
      company: 'Meta',
      companyLogo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop',
      status: 'Interview Scheduled',
      dateApplied: '2024-10-05',
      location: 'Menlo Park, CA',
      salary: '$150k - $200k',
      jobType: 'Full-time',
      department: 'Reality Labs',
      description: 'Design the future of virtual and augmented reality experiences.',
      requirements: [
        '5+ years of product design experience',
        'Experience with emerging technologies',
        'Strong portfolio with innovative products',
        'Understanding of VR/AR principles',
        'Masters degree preferred',
      ]
    },
    {
      id: 10,
      jobTitle: 'UX Researcher',
      company: 'Google',
      companyLogo: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=100&h=100&fit=crop',
      status: 'Under Review',
      dateApplied: '2024-10-03',
      location: 'Mountain View, CA',
      salary: '$130k - $180k',
      jobType: 'Full-time',
      department: 'Research',
      description: 'Conduct user research to inform product decisions across Google\'s suite of products.',
      requirements: [
        '4+ years of UX research experience',
        'PhD in HCI, Psychology, or related field',
        'Experience with quantitative and qualitative methods',
        'Strong analytical skills',
        'Published research preferred',
      ]
    },
    {
      id: 11,
      jobTitle: 'Frontend Developer',
      company: 'Airbnb',
      companyLogo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop',
      status: 'Failed Assessment',
      dateApplied: '2024-09-28',
      location: 'San Francisco, CA',
      salary: '$140k - $180k',
      jobType: 'Full-time',
      department: 'Engineering',
      description: 'Build beautiful, performant web experiences for millions of travelers worldwide.',
      requirements: [
        '4+ years of frontend development experience',
        'Expert in React, TypeScript, and modern web technologies',
        'Experience with design systems',
        'Strong performance optimization skills',
        'Bachelor\'s degree in CS or related field',
      ],
      feedback: {
        type: 'assessment_failed',
        score: 45,
        passingScore: 70,
        maxScore: 100,
        areas: ['Algorithm Complexity', 'Data Structures', 'React Performance'],
        strengths: ['Code Quality', 'Problem Approach', 'Communication'],
        retakeAllowed: false,
        message: 'Your code quality and problem-solving approach were excellent. The main areas for improvement are algorithmic thinking and React optimization techniques.',
        assessmentDate: '2024-10-01',
        timeSpent: '3 hours 30 minutes'
      }
    }
  ];

  // tomiwa: Find application by ID and add enhanced details
  const baseApp = allApplications.find(app => app.id === parseInt(id));
  if (!baseApp) return null;

  // tomiwa: Add timeline and communication data
  const enhancedApp = {
    ...baseApp,
    timeline: [
      {
        id: 1,
        status: 'Application Submitted',
        date: baseApp.dateApplied,
        time: '2:30 PM',
        description: 'Your application has been successfully submitted',
        icon: CheckCircleIcon,
        iconColor: 'text-emerald-600',
        iconBg: 'bg-emerald-100',
        completed: true
      },
      {
        id: 2,
        status: 'Under Review',
        date: new Date(new Date(baseApp.dateApplied).getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        time: '9:15 AM',
        description: 'Your application is being reviewed by the hiring team',
        icon: ClockIcon,
        iconColor: 'text-blue-600',
        iconBg: 'bg-blue-100',
        completed: true
      }
    ],
    applicationMaterials: {
      resume: 'john_doe_resume.pdf',
      coverLetter: `${baseApp.company.toLowerCase()}_cover_letter.pdf`,
      portfolio: 'https://johndoe.design'
    },
    communications: [
      {
        id: 1,
        type: 'system',
        date: baseApp.dateApplied,
        time: '2:30 PM',
        message: 'Application submitted successfully',
        sender: 'System'
      }
    ]
  };

  // tomiwa: Add status-specific timeline events
  if (baseApp.status === 'Failed Assessment' || baseApp.status === 'Test Assigned') {
    enhancedApp.timeline.push({
      id: 3,
      status: 'Assessment Assigned',
      date: new Date(new Date(baseApp.dateApplied).getTime() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      time: '11:00 AM',
      description: 'Technical assessment has been assigned',
      icon: DocumentTextIcon,
      iconColor: 'text-purple-600',
      iconBg: 'bg-purple-100',
      completed: true
    });

    if (baseApp.status === 'Failed Assessment') {
      enhancedApp.timeline.push({
        id: 4,
        status: 'Assessment Results',
        date: new Date(new Date(baseApp.dateApplied).getTime() + 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        time: '10:30 AM',
        description: baseApp.feedback?.retakeAllowed ? 'Assessment results available - retake option provided' : 'Assessment not passed',
        icon: XCircleIcon,
        iconColor: 'text-red-600',
        iconBg: 'bg-red-100',
        completed: true,
        current: true
      });
    }
  }

  if (baseApp.status === 'Interview Scheduled') {
    enhancedApp.timeline.push({
      id: 3,
      status: 'Interview Scheduled',
      date: new Date(new Date(baseApp.dateApplied).getTime() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      time: '2:00 PM',
      description: 'Interview scheduled with the hiring team',
      icon: CalendarIcon,
      iconColor: 'text-brand-aqua',
      iconBg: 'bg-brand-aqua/20',
      completed: true,
      current: true
    });
  }

  if (baseApp.status === 'Offer') {
    enhancedApp.timeline.push({
      id: 4,
      status: 'Offer Extended',
      date: new Date(new Date(baseApp.dateApplied).getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      time: '4:15 PM',
      description: 'Congratulations! An offer has been extended',
      icon: CheckCircleIcon,
      iconColor: 'text-emerald-600',
      iconBg: 'bg-emerald-100',
      completed: true,
      current: true
    });
  }

  if (baseApp.status === 'Disqualified') {
    enhancedApp.timeline.push({
      id: 3,
      status: 'Disqualified',
      date: new Date(new Date(baseApp.dateApplied).getTime() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      time: '2:15 PM',
      description: 'Application does not meet requirements',
      icon: ExclamationTriangleIcon,
      iconColor: 'text-amber-600',
      iconBg: 'bg-amber-100',
      completed: true,
      current: true
    });
  }

  return enhancedApp;
};

// tomiwa: Calculate progress based on status
const getProgressFromStatus = (status) => {
  const progressMap = {
    'Applied': 20,
    'Under Review': 40,
    'Test Assigned': 60,
    'Failed Assessment': 25,
    'Interview Scheduled': 80,
    'Disqualified': 30,
    'Offer': 100,
    'Rejected': 0,
    'Withdrawn': 0,
    'Closed': 100
  };
  return progressMap[status] || 0;
};

export default function ApplicationDetails() {
  const params = useParams();
  const router = useRouter();
  const applicationId = params.applicationId;
  
  // tomiwa: State management
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [confirmModal, setConfirmModal] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');

  // tomiwa: Load application data
  useEffect(() => {
    const appData = getApplicationById(parseInt(applicationId));
    setApplication(appData);
    setLoading(false);
  }, [applicationId]);

  // tomiwa: Handle actions
  const handleAction = (action, status) => {
    switch (action) {
      case 'retake':
        if (application?.feedback?.retakeAllowed) {
          setConfirmModal({
            type: 'info',
            title: 'Schedule Retake',
            message: `Ready to retake the assessment for ${application?.company}? You can retake it starting ${new Date(application.feedback.retakeDate).toLocaleDateString()}.`,
            confirmText: 'Schedule Retake',
            onConfirm: () => {
              setConfirmModal(null);
              addToast('Retake scheduled successfully', 'success');
              setTimeout(() => {
                window.open('https://example.com/retake', '_blank');
              }, 1000);
            }
          });
        }
        break;
      case 'withdraw':
        setConfirmModal({
          type: 'danger',
          title: 'Withdraw Application',
          message: `Are you sure you want to withdraw your application to ${application?.company}? This action cannot be undone.`,
          confirmText: 'Yes, Withdraw',
          onConfirm: () => {
            setConfirmModal(null);
            addToast('Application withdrawn successfully', 'success');
            setTimeout(() => {
              router.push('/dashboard/candidate/applications');
            }, 2000);
          }
        });
        break;
      default:
        addToast(`${action} action triggered`, 'info');
    }
  };

  // tomiwa: Toast management
  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  if (loading) {
    return (
      <CandidateDashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-aqua"></div>
        </div>
      </CandidateDashboardLayout>
    );
  }

  if (!application) {
    return (
      <CandidateDashboardLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-neutral-900 mb-4">Application Not Found</h1>
          <Link
            href="/dashboard/candidate/applications"
            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-aqua text-white rounded-lg hover:bg-brand-aqua/90 transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Back to Applications
          </Link>
        </div>
      </CandidateDashboardLayout>
    );
  }

  const progress = getProgressFromStatus(application.status);

  return (
    <CandidateDashboardLayout>
      {/* tomiwa: Clean White Header - No Gradient */}
      <div className="bg-white border-b border-neutral-200 -mt-8 -mx-6 mb-8">
        <div className="px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20 py-6">
          {/* tomiwa: Back button */}
          <Link
            href="/dashboard/candidate/applications"
            className="inline-flex items-center gap-2 text-brand-aqua hover:text-brand-aqua/80 mb-6 transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Back to Applications
          </Link>

          <div className="flex items-start justify-between">
            {/* tomiwa: Application Header */}
            <div className="flex items-start gap-4">
              <img
                src={application.companyLogo}
                alt={application.company}
                className="w-16 h-16 rounded-xl object-cover shadow-sm"
              />
              <div>
                <h1 className="text-2xl font-display font-bold text-neutral-900 mb-2">
                  {application.jobTitle}
                </h1>
                <div className="flex items-center gap-4 text-neutral-600 mb-3">
                  <div className="flex items-center gap-2">
                    <BuildingOfficeIcon className="w-4 h-4" />
                    {application.company}
                  </div>
                  <span>•</span>
                  <span>Applied on {new Date(application.dateApplied).toLocaleDateString('en-US', { 
                    month: 'long', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}</span>
                </div>
                <StatusPill status={application.status} showIcon={true} />
              </div>
            </div>

            {/* tomiwa: Status Badge */}
            <div className="text-right">
              <StatusPill status={application.status} size="large" />
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20 pb-12">
        {/* tomiwa: Main Content Grid - Similar to Original Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* tomiwa: Left Column - Job Details */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* tomiwa: Job Details Card */}
            <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <DocumentTextIcon className="w-5 h-5 text-brand-aqua" />
                <h2 className="text-lg font-semibold text-neutral-900">Job Details</h2>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2 text-neutral-500 mb-1">
                    <MapPinIcon className="w-4 h-4" />
                    <span className="text-sm">Location</span>
                  </div>
                  <p className="font-medium text-neutral-900">{application.location}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-neutral-500 mb-1">
                    <BanknotesIcon className="w-4 h-4" />
                    <span className="text-sm">Salary</span>
                  </div>
                  <p className="font-medium text-neutral-900">{application.salary}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-neutral-500 mb-1">
                    <ClockIcon className="w-4 h-4" />
                    <span className="text-sm">Job Type</span>
                  </div>
                  <p className="font-medium text-neutral-900">{application.jobType}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-neutral-500 mb-1">
                    <BuildingOfficeIcon className="w-4 h-4" />
                    <span className="text-sm">Department</span>
                  </div>
                  <p className="font-medium text-neutral-900">{application.department}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-neutral-700 mb-2">Job Description</h3>
                  <p className="text-neutral-600 text-sm leading-relaxed">
                    {application.description}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-neutral-700 mb-3">Requirements</h4>
                    <ul className="space-y-2">
                      {application.requirements.map((req, index) => (
                        <li key={index} className="text-neutral-600 text-sm flex items-start gap-2">
                          <CheckCircleIcon className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {application.responsibilities && (
                    <div>
                      <h4 className="font-medium text-neutral-700 mb-3">Responsibilities</h4>
                      <ul className="space-y-2">
                        {application.responsibilities.map((resp, index) => (
                          <li key={index} className="text-neutral-600 text-sm flex items-start gap-2">
                            <CheckCircleIcon className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                            {resp}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* tomiwa: Application Timeline */}
            <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
              <div className="flex items-center gap-2 mb-6">
                <ClockIcon className="w-5 h-5 text-brand-aqua" />
                <h2 className="text-lg font-semibold text-neutral-900">Application Timeline</h2>
              </div>
              
              <div className="space-y-6">
                {application.timeline.map((event, index) => (
                  <div key={event.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`
                        w-10 h-10 rounded-full flex items-center justify-center
                        ${event.iconBg} ${event.current ? 'ring-4 ring-offset-2 ring-brand-aqua/30' : ''}
                      `}>
                        <event.icon className={`w-5 h-5 ${event.iconColor}`} />
                      </div>
                      {index < application.timeline.length - 1 && (
                        <div className="w-0.5 h-12 bg-neutral-200 mt-2" />
                      )}
                    </div>
                    <div className="flex-1 pb-8">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-neutral-900">{event.status}</h4>
                        <span className="text-xs text-neutral-500">
                          {new Date(event.date).toLocaleDateString()} at {event.time}
                        </span>
                      </div>
                      <p className="text-sm text-neutral-600">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* tomiwa: Enhanced Feedback Section */}
            {application.feedback && (
              <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
                <div className="flex items-center gap-2 mb-6">
                  <ChatBubbleLeftRightIcon className="w-5 h-5 text-brand-aqua" />
                  <h2 className="text-lg font-semibold text-neutral-900">
                    {application.feedback.type === 'assessment_failed' ? 'Assessment Results' : 'Application Feedback'}
                  </h2>
                </div>
                
                {application.feedback.type === 'assessment_failed' ? (
                  <div className="space-y-4">
                    {/* tomiwa: Score Display */}
                    <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-medium text-red-800">Your Score</span>
                        <span className="text-2xl font-bold text-red-700">
                          {application.feedback.score}/{application.feedback.maxScore}
                        </span>
                      </div>
                      <div className="w-full bg-red-200 rounded-full h-3 mb-2">
                        <div 
                          className="bg-red-500 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${(application.feedback.score / application.feedback.maxScore) * 100}%` }}
                        />
                      </div>
                      <p className="text-sm text-red-600">
                        Passing score: {application.feedback.passingScore}/{application.feedback.maxScore}
                      </p>
                    </div>

                    {/* tomiwa: Strengths and Areas for Improvement */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
                        <div className="flex items-center gap-2 mb-3">
                          <TrophyIcon className="w-5 h-5 text-emerald-500" />
                          <span className="font-medium text-emerald-800">Strengths</span>
                        </div>
                        <ul className="space-y-2">
                          {application.feedback.strengths?.map((strength, index) => (
                            <li key={index} className="text-sm text-emerald-700 flex items-start gap-2">
                              <CheckCircleIcon className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                              {strength}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                        <div className="flex items-center gap-2 mb-3">
                          <LightBulbIcon className="w-5 h-5 text-amber-500" />
                          <span className="font-medium text-amber-800">Areas to Improve</span>
                        </div>
                        <ul className="space-y-2">
                          {application.feedback.areas?.map((area, index) => (
                            <li key={index} className="text-sm text-amber-700 flex items-start gap-2">
                              <ExclamationCircleIcon className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                              {area}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* tomiwa: Feedback Message */}
                    <div className="bg-neutral-50 rounded-lg p-4">
                      <h4 className="font-medium text-neutral-700 mb-2">Feedback from {application.company}</h4>
                      <p className="text-sm text-neutral-600 leading-relaxed">
                        {application.feedback.message}
                      </p>
                    </div>

                    {/* tomiwa: Retake Information */}
                    {application.feedback.retakeAllowed && (
                      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                        <div className="flex items-center gap-2 mb-2">
                          <ArrowPathIcon className="w-5 h-5 text-blue-500" />
                          <span className="font-medium text-blue-800">Retake Available</span>
                        </div>
                        <p className="text-sm text-blue-700 mb-3">
                          You can retake this assessment starting {new Date(application.feedback.retakeDate).toLocaleDateString()}
                        </p>
                        <button
                          onClick={() => handleAction('retake', application.status)}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors"
                        >
                          <ArrowPathIcon className="w-4 h-4" />
                          Schedule Retake
                        </button>
                      </div>
                    )}
                  </div>
                ) : application.feedback.type === 'disqualified' ? (
                  <div className="space-y-4">
                    <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-medium text-amber-800">Disqualification Reason</span>
                        <span className="text-xs text-amber-600 bg-amber-200 px-2 py-1 rounded">
                          {application.feedback.disqualificationStage}
                        </span>
                      </div>
                      <p className="text-lg font-semibold text-amber-800 mb-2">
                        {application.feedback.reason}
                      </p>
                      <p className="text-sm text-neutral-600">
                        {application.feedback.message}
                      </p>
                    </div>

                    {application.feedback.suggestions && (
                      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                        <div className="flex items-center gap-2 mb-3">
                          <LightBulbIcon className="w-5 h-5 text-blue-500" />
                          <span className="font-medium text-blue-800">Suggestions for Future Applications</span>
                        </div>
                        <ul className="space-y-2">
                          {application.feedback.suggestions.map((suggestion, index) => (
                            <li key={index} className="text-sm text-blue-700 flex items-start gap-2">
                              <StarIcon className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                              {suggestion}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ) : null}
              </div>
            )}

            {/* tomiwa: Communications */}
            {application.communications && application.communications.length > 1 && (
              <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
                <div className="flex items-center gap-2 mb-6">
                  <EnvelopeIcon className="w-5 h-5 text-brand-aqua" />
                  <h2 className="text-lg font-semibold text-neutral-900">Communications</h2>
                </div>
                
                <div className="space-y-4">
                  {application.communications.slice(1).map((comm) => (
                    <div key={comm.id} className={`
                      rounded-lg p-4 ${
                        comm.type === 'employer' 
                          ? 'bg-blue-50 border border-blue-200' 
                          : 'bg-neutral-50 border border-neutral-200'
                      }
                    `}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className={`
                            w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium
                            ${comm.type === 'employer' ? 'bg-blue-500 text-white' : 'bg-neutral-400 text-white'}
                          `}>
                            {comm.sender.charAt(0)}
                          </div>
                          <div>
                            <span className="font-medium text-neutral-700">{comm.sender}</span>
                            {comm.senderTitle && (
                              <span className="text-xs text-neutral-500 ml-2">{comm.senderTitle}</span>
                            )}
                          </div>
                        </div>
                        <span className="text-xs text-neutral-500">
                          {new Date(comm.date).toLocaleDateString()} at {comm.time}
                        </span>
                      </div>
                      <p className="text-sm text-neutral-600 leading-relaxed">
                        {comm.message}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* tomiwa: Right Column - Quick Actions & Application Materials */}
          <div className="space-y-6">
            
            {/* tomiwa: Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
              <h3 className="font-semibold text-neutral-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <NextActionButton
                  status={application.status}
                  onClick={handleAction}
                  className="w-full justify-center"
                />
                
                {application.status === 'Failed Assessment' && application.feedback?.retakeAllowed && (
                  <button
                    onClick={() => handleAction('retake', application.status)}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <ArrowPathIcon className="w-4 h-4" />
                    Schedule Retake
                  </button>
                )}

                <button
                  onClick={() => handleAction('withdraw', application.status)}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-red-50 border border-red-200 text-red-600 text-sm font-medium rounded-lg hover:bg-red-100 transition-colors"
                >
                  <XMarkIcon className="w-4 h-4" />
                  Withdraw Application
                </button>
              </div>
            </div>

            {/* tomiwa: Application Materials */}
            <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
              <h3 className="font-semibold text-neutral-900 mb-4">Application Materials</h3>
              <div className="space-y-3">
                {Object.entries(application.applicationMaterials).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <DocumentTextIcon className="w-5 h-5 text-brand-aqua" />
                      <div>
                        <h4 className="font-medium text-neutral-700 text-sm capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </h4>
                        <p className="text-xs text-neutral-500">{value}</p>
                      </div>
                    </div>
                    <button className="text-brand-aqua hover:text-brand-aqua/80 transition-colors">
                      <EyeIcon className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* tomiwa: Recruiter Contact */}
            <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
              <h3 className="font-semibold text-neutral-900 mb-4">Recruiter Contact</h3>
              <div className="text-center">
                <div className="w-12 h-12 bg-brand-aqua rounded-full flex items-center justify-center text-white font-semibold text-lg mx-auto mb-3">
                  S
                </div>
                <h4 className="font-semibold text-neutral-900">Sarah Johnson</h4>
                <p className="text-sm text-neutral-500 mb-4">Senior Recruiter</p>
                <a 
                  href="mailto:sarah.johnson@figma.com"
                  className="text-brand-aqua hover:text-brand-aqua/80 text-sm transition-colors"
                >
                  sarah.johnson@{application.company.toLowerCase()}.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* tomiwa: Modals and Toasts */}
      {confirmModal && (
        <ConfirmModal
          isOpen={true}
          onClose={() => setConfirmModal(null)}
          onConfirm={confirmModal.onConfirm}
          title={confirmModal.title}
          message={confirmModal.message}
          confirmText={confirmModal.confirmText}
          type={confirmModal.type}
        />
      )}

      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </CandidateDashboardLayout>
  );
}