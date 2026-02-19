/**
 * File: src/app/apply/[jobId]/page.js
 * 
 * tomiwa: Apply Flow Wizard - 3-5 step guided application process
 * Complete application wizard with progress bar, sticky footer, and modular step components
 * 
 * Features:
 * - 5-step wizard: Profile Check, Resume & Docs, Screening Questions, Consent & Review, Pre-Test Notice
 * - Progress bar at top showing current step
 * - Sticky footer with Back/Next/Submit buttons
 * - Save as draft functionality
 * - Mobile responsive with full-width steps
 * - Accessibility features and proper ARIA labels
 * - Success state with navigation options
 */

'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import CandidateDashboardLayout from '@/components/layouts/CandidateDashboardLayout.jsx';
import { Card } from '@/components/ui/Card.jsx';
import { Button } from '@/components/ui/Button.jsx';
import Toast from '@/components/ui/Toast';
import {
  // tomiwa: Icon imports for apply flow
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  DocumentTextIcon,
  UserIcon,
  ClipboardDocumentListIcon,
  ShieldCheckIcon,
  AcademicCapIcon,
  ExclamationTriangleIcon,
  PaperAirplaneIcon,
  EyeIcon,
} from '@heroicons/react/24/outline';

// tomiwa: Import step components
import StepProfile from '@/components/ui/apply-steps/StepProfile';
import StepResume from '@/components/ui/apply-steps/StepResume';
import StepQuestions from '@/components/ui/apply-steps/StepQuestions';
import StepReview from '@/components/ui/apply-steps/StepReview';
import StepPreTest from '@/components/ui/apply-steps/StepPreTest';

// tomiwa: Mock job data for apply flow
const mockJobData = {
  1: {
    id: 1,
    jobTitle: 'Senior Product Designer',
    company: 'Figma',
    companyLogo: 'https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=100&h=100&fit=crop',
    location: 'Remote',
    jobType: 'Full-time',
    salary: '$120k - $180k',
    requiresTest: false,
    screeningQuestions: [
      {
        id: 1,
        question: 'Why are you interested in working at Figma?',
        type: 'textarea',
        required: true,
        maxLength: 500,
      },
      {
        id: 2,
        question: 'What is your experience with design systems?',
        type: 'textarea',
        required: true,
        maxLength: 300,
      },
      {
        id: 3,
        question: 'Are you authorized to work in the United States?',
        type: 'radio',
        required: true,
        options: ['Yes', 'No', 'I will need sponsorship'],
      },
      {
        id: 4,
        question: 'What is your expected salary range?',
        type: 'select',
        required: false,
        options: ['$100k - $120k', '$120k - $150k', '$150k - $180k', '$180k+', 'Negotiable'],
      },
    ],
  },
  2: {
    id: 2,
    jobTitle: 'UX/UI Designer',
    company: 'Paystack',
    companyLogo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop',
    location: 'Lagos, Nigeria',
    jobType: 'Full-time',
    salary: '$80k - $120k',
    requiresTest: true,
    testProvider: 'HackerRank',
    testDuration: '90 minutes',
    testDescription: 'Design thinking and problem-solving assessment',
    screeningQuestions: [
      {
        id: 1,
        question: 'Why do you want to work at Paystack?',
        type: 'textarea',
        required: true,
        maxLength: 400,
      },
      {
        id: 2,
        question: 'Do you have experience with fintech products?',
        type: 'radio',
        required: true,
        options: ['Yes, extensive experience', 'Some experience', 'No, but eager to learn'],
      },
      {
        id: 3,
        question: 'What design tools are you most proficient with?',
        type: 'checkbox',
        required: true,
        options: ['Figma', 'Sketch', 'Adobe XD', 'Framer', 'Principle', 'InVision'],
      },
    ],
  },
};

// tomiwa: Step configuration
const steps = [
  {
    id: 1,
    title: 'Profile Check',
    description: 'Verify your profile information',
    icon: UserIcon,
    component: StepProfile,
  },
  {
    id: 2,
    title: 'Resume & Documents',
    description: 'Upload your resume and portfolio',
    icon: DocumentTextIcon,
    component: StepResume,
  },
  {
    id: 3,
    title: 'Screening Questions',
    description: 'Answer employer questions',
    icon: ClipboardDocumentListIcon,
    component: StepQuestions,
  },
  {
    id: 4,
    title: 'Review & Consent',
    description: 'Review application and give consent',
    icon: ShieldCheckIcon,
    component: StepReview,
  },
  {
    id: 5,
    title: 'Pre-Test Notice',
    description: 'Assessment information',
    icon: AcademicCapIcon,
    component: StepPreTest,
    conditional: true, // tomiwa: Only show if job requires test
  },
];

export default function ApplyFlow() {
  const params = useParams();
  const router = useRouter();
  const jobId = params.jobId;
  
  // tomiwa: State management
  const [job, setJob] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [applicationId, setApplicationId] = useState(null);
  
  // tomiwa: No validation mode - all fields are optional now
  
  // tomiwa: Form data state
  const [formData, setFormData] = useState({
    profile: {},
    resume: {},
    questions: {},
    consent: false,
    gdprConsent: false,
  });

  // tomiwa: Validation state
  const [stepValidation, setStepValidation] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
  });

  // tomiwa: No URL parameter checking needed since all validation is removed

  // tomiwa: Load job data
  useEffect(() => {
    const loadJob = async () => {
      setIsLoading(true);
      // johnson: ExistingCode - Simulate API call
      setTimeout(() => {
        const jobData = mockJobData[jobId];
        if (jobData) {
          setJob(jobData);
        }
        setIsLoading(false);
      }, 500);
    };

    if (jobId) {
      loadJob();
    }
  }, [jobId]);

  // tomiwa: Get visible steps (filter out conditional steps if not needed)
  const visibleSteps = steps.filter(step => {
    if (step.conditional && step.id === 5) {
      return job?.requiresTest;
    }
    return true;
  });

  const totalSteps = visibleSteps.length;

  // tomiwa: Handle step navigation
  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // tomiwa: Handle form data update
  const updateFormData = (stepKey, data) => {
    setFormData(prev => ({
      ...prev,
      [stepKey]: { ...prev[stepKey], ...data }
    }));
  };

  // tomiwa: Handle step validation
  const updateStepValidation = (stepNumber, isValid) => {
    setStepValidation(prev => ({
      ...prev,
      [stepNumber]: isValid
    }));
  };

  // tomiwa: Save as draft
  const handleSaveDraft = async () => {
    setToast({
      type: 'success',
      message: 'Application saved as draft',
    });
    
    // johnson: ExistingCode - In real app, save to API
    // await saveApplicationDraft(jobId, formData);
  };

  // tomiwa: Submit application
  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // johnson: ExistingCode - Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // tomiwa: Generate mock application ID
      const mockApplicationId = `APP-${Date.now()}`;
      setApplicationId(mockApplicationId);
      setApplicationSubmitted(true);
      
      setToast({
        type: 'success',
        message: 'Application submitted successfully!',
      });
    } catch (error) {
      setToast({
        type: 'error',
        message: 'Failed to submit application. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // tomiwa: Get current step component
  const getCurrentStepComponent = () => {
    const currentStepConfig = visibleSteps.find(step => step.id === currentStep);
    if (!currentStepConfig) return null;

    const StepComponent = currentStepConfig.component;
    return (
      <StepComponent
        job={job}
        formData={formData}
        updateFormData={updateFormData}
        updateStepValidation={updateStepValidation}
        stepNumber={currentStep}
        noValidation={true}
      />
    );
  };

  // tomiwa: Always allow proceeding - NO VALIDATION REQUIRED
  const isCurrentStepValid = () => {
    return true; // tomiwa: Always allow proceeding to next step
  };

  // tomiwa: Always allow submission - NO VALIDATION REQUIRED
  const canSubmit = () => {
    return true; // tomiwa: Always allow final submission
  };

  // tomiwa: Loading state
  if (isLoading) {
    return (
      <CandidateDashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-aqua mx-auto mb-4"></div>
            <p className="text-neutral-600">Loading application...</p>
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
            <p className="text-neutral-600 mb-6">The job you're trying to apply for doesn't exist or has been removed.</p>
            <Link href="/jobs">
              <Button>Browse All Jobs</Button>
            </Link>
          </Card>
        </div>
      </CandidateDashboardLayout>
    );
  }

  // tomiwa: Success state
  if (applicationSubmitted) {
    return (
      <CandidateDashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Card className="p-12 text-center max-w-2xl mx-auto">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircleIcon className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-neutral-900 mb-4">Application Submitted!</h2>
          <p className="text-lg text-neutral-600 mb-2">
            Your application for <strong>{job.jobTitle}</strong> at <strong>{job.company}</strong> has been successfully submitted.
          </p>
          <p className="text-neutral-600 mb-8">
            Application ID: <span className="font-mono font-medium">{applicationId}</span>
          </p>
          
          {job.requiresTest && (
            <div className="bg-accent-50 border border-accent-200 rounded-xl p-4 mb-8">
              <h3 className="font-semibold text-accent-800 mb-2">Next Step: Complete Assessment</h3>
              <p className="text-accent-700 text-sm mb-4">
                This position requires completing a {job.testDuration} assessment via {job.testProvider}.
              </p>
              <Link href={`/tests/start/${applicationId}`}>
                <Button className="bg-accent-500 hover:bg-accent-600 text-white">
                  <AcademicCapIcon className="w-5 h-5 mr-2" />
                  Start Assessment
                </Button>
              </Link>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/dashboard/candidate/applications/${applicationId}`}>
              <Button variant="outline" className="w-full sm:w-auto">
                <EyeIcon className="w-5 h-5 mr-2" />
                View Application
              </Button>
            </Link>
            <Link href="/jobs">
              <Button className="w-full sm:w-auto">
                Browse More Jobs
              </Button>
            </Link>
          </div>
        </Card>
        </div>
      </CandidateDashboardLayout>
    );
  }

  return (
    <CandidateDashboardLayout>
      {/* tomiwa: Header with job info and progress */}
      <div className="bg-white border-b border-neutral-200 sticky top-0 z-10 -mt-8 -mx-6 mb-8">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          {/* tomiwa: Job info header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => router.back()}
                className="p-2 text-neutral-400 hover:text-neutral-600 transition-colors rounded-lg hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-brand-aqua focus:ring-offset-2"
                aria-label="Go back"
              >
                <ArrowLeftIcon className="w-5 h-5" />
              </button>
              <img
                src={job.companyLogo}
                alt={`${job.company} logo`}
                className="w-10 h-10 rounded-lg object-cover"
              />
              <div>
                <h1 className="text-lg font-semibold text-neutral-900">{job.jobTitle}</h1>
                <p className="text-sm text-neutral-600">{job.company} • {job.location}</p>
              </div>
            </div>
          </div>

          {/* tomiwa: Unified layout bar - step progress on left, actions on right */}
          <div className="flex items-baseline justify-between mb-4">
            <div className="flex items-baseline space-x-4">
              <span className="text-sm font-medium text-neutral-700">
                Step {currentStep} of {totalSteps}
              </span>
              {/* tomiwa: Responsive progress bar - compact on mobile */}
              <div className="w-20 sm:w-32 bg-neutral-200 rounded-full h-2">
                <div
                  className="bg-brand-orange h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="flex items-baseline space-x-2 sm:space-x-4">
              <Button
                variant="ghost"
                onClick={handleSaveDraft}
                size="sm"
                className="hidden sm:flex text-sm text-neutral-600 hover:text-neutral-900 focus:outline-none focus:ring-2 focus:ring-brand-aqua focus:ring-offset-2"
              >
                Save Draft
              </Button>
              <span className="text-xs sm:text-sm text-neutral-500 font-medium">
                {Math.round((currentStep / totalSteps) * 100)}%
              </span>
            </div>
          </div>

          {/* tomiwa: Subtle divider */}
          <div className="h-px bg-neutral-200 mb-6"></div>

          {/* tomiwa: Step indicators */}
          <div className="flex items-center justify-between">
            {visibleSteps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = step.id === currentStep;
              const isCompleted = step.id < currentStep;
              const isValid = stepValidation[step.id];
              
              return (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors ${
                      isCompleted
                        ? 'bg-brand-aqua border-brand-aqua text-white'
                        : isActive
                        ? 'border-brand-aqua text-brand-aqua bg-white'
                        : 'border-neutral-300 text-neutral-400 bg-white'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircleIcon className="w-5 h-5" />
                    ) : (
                      <StepIcon className="w-4 h-4" />
                    )}
                  </div>
                  <div className="ml-2 hidden sm:block">
                    <div className={`text-sm font-medium ${isActive ? 'text-brand-aqua' : 'text-neutral-600'}`}>
                      {step.title}
                    </div>
                    <div className="text-xs text-neutral-500">{step.description}</div>
                  </div>
                  {index < visibleSteps.length - 1 && (
                    <div className="flex-1 h-px bg-neutral-300 mx-4 hidden sm:block"></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* tomiwa: Main content with improved spacing */}
      <div className="px-4 sm:px-6 lg:px-8 pt-8 pb-32">
        {getCurrentStepComponent()}
      </div>

      {/* tomiwa: No validation indicator removed since all fields are now optional */}

      {/* tomiwa: Sticky footer with navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 p-4 safe-area-pb">
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4">
            {currentStep > 1 && (
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={isSubmitting}
              >
                <ArrowLeftIcon className="w-4 h-4 mr-2" />
                Back
              </Button>
            )}
            <Button
              variant="ghost"
              onClick={handleSaveDraft}
              size="sm"
              className="sm:hidden"
            >
              Save Draft
            </Button>
            {/* tomiwa: No bypass toggle needed since all validation is removed */}
          </div>

          <div className="flex items-center space-x-4">
            {currentStep < totalSteps ? (
              <Button
                onClick={handleNext}
                disabled={!isCurrentStepValid() || isSubmitting}
              >
                Next
                <ArrowRightIcon className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!canSubmit() || isSubmitting}
                className="bg-brand-orange hover:bg-brand-orange/90"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <PaperAirplaneIcon className="w-4 h-4 mr-2" />
                    Submit Application
                  </>
                )}
              </Button>
            )}
          </div>
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
