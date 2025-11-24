/**
 * File: src/components/ui/apply-steps/StepPreTest.jsx
 * 
 * tomiwa: Step 5 - Pre-Test Notice Component (Conditional)
 * Assessment information with test provider details and start CTA
 * 
 * Features:
 * - Test provider and duration information
 * - Assessment description and requirements
 * - Start test CTA that routes to test platform
 * - Only shown if job requires assessment
 * - Responsive design for all screen sizes
 */

'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  AcademicCapIcon,
  ClockIcon,
  ComputerDesktopIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  PlayIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';

export default function StepPreTest({ job, formData, updateFormData, updateStepValidation, stepNumber, noValidation }) {
  
  // tomiwa: This step is always valid since it's just informational
  useEffect(() => {
    updateStepValidation(stepNumber, true);
    updateFormData('preTest', {
      acknowledged: true,
      testProvider: job.testProvider,
      testDuration: job.testDuration,
      testDescription: job.testDescription,
    });
  }, [stepNumber, updateStepValidation, updateFormData, job]);

  // tomiwa: If job doesn't require test, this component shouldn't render
  if (!job.requiresTest) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* tomiwa: Step header */}
      <div>
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">Assessment Required</h2>
        <p className="text-neutral-600">
          This position requires completing an assessment. Please review the details below before proceeding.
        </p>
      </div>

      {/* tomiwa: Assessment Overview */}
      <Card className="p-6 bg-gradient-to-r from-accent-50 to-accent-100 border-accent-200">
        <div className="flex items-start">
          <div className="w-16 h-16 bg-accent-500 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
            <AcademicCapIcon className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-accent-900 mb-2">
              {job.testDescription || 'Skills Assessment'}
            </h3>
            <p className="text-accent-800 mb-4">
              {job.company} requires candidates to complete an assessment to evaluate skills relevant to the {job.jobTitle} position.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center text-accent-700">
                <ComputerDesktopIcon className="w-5 h-5 mr-2" />
                <span className="font-medium">Provider: {job.testProvider}</span>
              </div>
              <div className="flex items-center text-accent-700">
                <ClockIcon className="w-5 h-5 mr-2" />
                <span className="font-medium">Duration: {job.testDuration}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* tomiwa: Assessment Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* tomiwa: What to Expect */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center">
            <InformationCircleIcon className="w-5 h-5 mr-2" />
            What to Expect
          </h3>
          <div className="space-y-3 text-sm text-neutral-700">
            <div className="flex items-start">
              <CheckCircleIcon className="w-4 h-4 text-brand-aqua mr-3 mt-0.5 flex-shrink-0" />
              <span>Skills-based questions relevant to {job.jobTitle}</span>
            </div>
            <div className="flex items-start">
              <CheckCircleIcon className="w-4 h-4 text-brand-aqua mr-3 mt-0.5 flex-shrink-0" />
              <span>Multiple choice and practical problem-solving tasks</span>
            </div>
            <div className="flex items-start">
              <CheckCircleIcon className="w-4 h-4 text-brand-aqua mr-3 mt-0.5 flex-shrink-0" />
              <span>Real-world scenarios related to the role</span>
            </div>
            <div className="flex items-start">
              <CheckCircleIcon className="w-4 h-4 text-brand-aqua mr-3 mt-0.5 flex-shrink-0" />
              <span>Immediate feedback upon completion</span>
            </div>
          </div>
        </Card>

        {/* tomiwa: Technical Requirements */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center">
            <ComputerDesktopIcon className="w-5 h-5 mr-2" />
            Technical Requirements
          </h3>
          <div className="space-y-3 text-sm text-neutral-700">
            <div className="flex items-start">
              <CheckCircleIcon className="w-4 h-4 text-brand-aqua mr-3 mt-0.5 flex-shrink-0" />
              <span>Stable internet connection</span>
            </div>
            <div className="flex items-start">
              <CheckCircleIcon className="w-4 h-4 text-brand-aqua mr-3 mt-0.5 flex-shrink-0" />
              <span>Modern web browser (Chrome, Firefox, Safari, Edge)</span>
            </div>
            <div className="flex items-start">
              <CheckCircleIcon className="w-4 h-4 text-brand-aqua mr-3 mt-0.5 flex-shrink-0" />
              <span>Webcam and microphone (if proctored)</span>
            </div>
            <div className="flex items-start">
              <CheckCircleIcon className="w-4 h-4 text-brand-aqua mr-3 mt-0.5 flex-shrink-0" />
              <span>Quiet environment free from distractions</span>
            </div>
          </div>
        </Card>
      </div>

      {/* tomiwa: Important Instructions */}
      <Card className="p-6 bg-yellow-50 border-yellow-200">
        <div className="flex items-start">
          <ExclamationTriangleIcon className="w-6 h-6 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold text-yellow-900 mb-3">Important Instructions</h3>
            <div className="space-y-2 text-sm text-yellow-800">
              <p><strong>Timing:</strong> You have {job.testDuration} to complete the assessment once started.</p>
              <p><strong>Attempts:</strong> You can only take this assessment once, so make sure you're ready.</p>
              <p><strong>Environment:</strong> Find a quiet space where you won't be interrupted.</p>
              <p><strong>Materials:</strong> Have any necessary materials ready (calculator, notepad, etc.).</p>
              <p><strong>Technical Issues:</strong> Contact support immediately if you experience any problems.</p>
            </div>
          </div>
        </div>
      </Card>

      {/* tomiwa: Assessment Timeline */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Assessment Process</h3>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="w-8 h-8 bg-brand-aqua rounded-full flex items-center justify-center mr-4 flex-shrink-0">
              <span className="text-sm font-bold text-white">1</span>
            </div>
            <div>
              <h4 className="font-medium text-neutral-900">Submit Application</h4>
              <p className="text-sm text-neutral-600">Complete and submit your job application</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="w-8 h-8 bg-brand-aqua rounded-full flex items-center justify-center mr-4 flex-shrink-0">
              <span className="text-sm font-bold text-white">2</span>
            </div>
            <div>
              <h4 className="font-medium text-neutral-900">Start Assessment</h4>
              <p className="text-sm text-neutral-600">Begin the {job.testDuration} assessment on {job.testProvider}</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="w-8 h-8 bg-neutral-300 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
              <span className="text-sm font-bold text-neutral-600">3</span>
            </div>
            <div>
              <h4 className="font-medium text-neutral-600">Review & Results</h4>
              <p className="text-sm text-neutral-500">{job.company} will review your results and contact you</p>
            </div>
          </div>
        </div>
      </Card>

      {/* tomiwa: Test Provider Information */}
      <Card className="p-6 bg-blue-50 border-blue-200">
        <div className="flex items-start">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
            <ComputerDesktopIcon className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-blue-900 mb-2">About {job.testProvider}</h3>
            <p className="text-blue-800 mb-3">
              {job.testProvider} is a trusted assessment platform used by leading companies to evaluate candidate skills. 
              The platform provides a secure, fair, and comprehensive testing environment.
            </p>
            <div className="text-sm text-blue-700">
              <p><strong>Security:</strong> All assessments are monitored and secure</p>
              <p><strong>Fairness:</strong> Standardized questions ensure equal opportunity</p>
              <p><strong>Support:</strong> Technical support available during assessment</p>
            </div>
          </div>
        </div>
      </Card>

      {/* tomiwa: Ready to Start */}
      <Card className="p-6 bg-gradient-to-r from-green-50 to-green-100 border-green-200">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <PlayIcon className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-green-900 mb-2">Ready to Begin?</h3>
          <p className="text-green-800 mb-6">
            Once you submit your application, you'll be redirected to start the assessment. 
            Make sure you have {job.testDuration} available and a stable internet connection.
          </p>
          <div className="bg-green-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-green-800">
              <strong>Next Step:</strong> Click "Submit Application" to complete your application and begin the assessment process.
            </p>
          </div>
        </div>
      </Card>

      {/* tomiwa: Contact Support */}
      <Card className="p-6 border-neutral-200">
        <h3 className="text-lg font-semibold text-neutral-900 mb-3">Need Help?</h3>
        <p className="text-neutral-600 mb-4">
          If you have questions about the assessment or experience technical difficulties, our support team is here to help.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline" size="sm">
            Contact Support
          </Button>
          <Button variant="outline" size="sm">
            Assessment FAQ
          </Button>
        </div>
      </Card>
    </div>
  );
}


