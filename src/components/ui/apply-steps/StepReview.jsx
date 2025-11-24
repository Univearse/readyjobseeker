/**
 * File: src/components/ui/apply-steps/StepReview.jsx
 * 
 * tomiwa: Step 4 - Review & Consent Component
 * Summary of application with GDPR consent and final review
 * 
 * Features:
 * - Complete application summary
 * - GDPR consent checkbox
 * - Terms and conditions agreement
 * - Edit links to previous steps
 * - Responsive design for all screen sizes
 */

'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  ShieldCheckIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  PencilIcon,
  DocumentTextIcon,
  UserIcon,
  ClipboardDocumentListIcon,
  LinkIcon,
  EyeIcon,
} from '@heroicons/react/24/outline';

export default function StepReview({ job, formData, updateFormData, updateStepValidation, stepNumber, noValidation }) {
  const [gdprConsent, setGdprConsent] = useState(false);
  const [termsConsent, setTermsConsent] = useState(false);
  const [communicationConsent, setCommunicationConsent] = useState(true);

  // tomiwa: Initialize consent states from form data
  useEffect(() => {
    if (formData.consent) {
      setGdprConsent(formData.consent.gdprConsent || false);
      setTermsConsent(formData.consent.termsConsent || false);
      setCommunicationConsent(formData.consent.communicationConsent !== false);
    }
  }, [formData.consent]);

  // tomiwa: Always allow proceeding - NO CONSENT VALIDATION REQUIRED
  useEffect(() => {
    const isValid = true; // tomiwa: Always allow proceeding regardless of consent
    
    updateStepValidation(stepNumber, isValid);
    updateFormData('consent', {
      gdprConsent,
      termsConsent,
      communicationConsent,
      isValid,
      noValidation: true,
    });
  }, [gdprConsent, termsConsent, communicationConsent, stepNumber, updateStepValidation, updateFormData]);

  // tomiwa: Get selected resume info
  const getResumeInfo = () => {
    if (formData.resume?.uploadedFile) {
      return {
        name: formData.resume.uploadedFile.name,
        type: 'Uploaded',
        size: formData.resume.uploadedFile.size,
      };
    } else if (formData.resume?.selectedResume) {
      return {
        name: formData.resume.selectedResume.name,
        type: 'Selected from library',
        size: formData.resume.selectedResume.size,
      };
    }
    return null;
  };

  // tomiwa: Get answered questions count
  const getAnsweredQuestionsCount = () => {
    if (!formData.questions?.answers || !job.screeningQuestions) return 0;
    return job.screeningQuestions.filter(q => {
      const answer = formData.questions.answers[q.id];
      return answer && answer.toString().trim() !== '';
    }).length;
  };

  const resumeInfo = getResumeInfo();
  const answeredQuestionsCount = getAnsweredQuestionsCount();

  return (
    <div className="space-y-6">
      {/* tomiwa: Step header */}
      <div>
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">Review & Submit</h2>
        <p className="text-neutral-600">
          Review your application details and provide consent to submit your application to {job.company}.
        </p>
      </div>

      {/* tomiwa: Application Summary */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Application Summary</h3>
        
        <div className="space-y-6">
          {/* tomiwa: Job Information */}
          <div className="flex items-start space-x-4 p-4 bg-neutral-50 rounded-xl">
            <img
              src={job.companyLogo}
              alt={`${job.company} logo`}
              className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
            />
            <div className="flex-1">
              <h4 className="text-lg font-semibold text-neutral-900">{job.jobTitle}</h4>
              <p className="text-neutral-600">{job.company} • {job.location}</p>
              <p className="text-sm text-neutral-500 mt-1">{job.jobType} • {job.salary}</p>
            </div>
          </div>

          {/* tomiwa: Profile Section */}
          <div className="border-t border-neutral-200 pt-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <UserIcon className="w-5 h-5 text-neutral-400 mr-3" />
                <h4 className="text-base font-semibold text-neutral-900">Profile Information</h4>
              </div>
              <Button variant="ghost" size="sm">
                <PencilIcon className="w-4 h-4 mr-2" />
                Edit
              </Button>
            </div>
            <div className="ml-8 text-sm text-neutral-600">
              <p><strong>Name:</strong> {formData.profile?.profileData?.firstName} {formData.profile?.profileData?.lastName}</p>
              <p><strong>Email:</strong> {formData.profile?.profileData?.email}</p>
              <p><strong>Phone:</strong> {formData.profile?.profileData?.phone}</p>
              <p><strong>Location:</strong> {formData.profile?.profileData?.location}</p>
              <div className="flex items-center mt-2">
                {formData.profile?.isComplete ? (
                  <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2" />
                ) : (
                  <ExclamationTriangleIcon className="w-4 h-4 text-yellow-500 mr-2" />
                )}
                <span className={formData.profile?.isComplete ? 'text-green-700' : 'text-yellow-700'}>
                  Profile {formData.profile?.profileData?.profileComplete || 0}% complete
                </span>
              </div>
            </div>
          </div>

          {/* tomiwa: Resume Section */}
          <div className="border-t border-neutral-200 pt-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <DocumentTextIcon className="w-5 h-5 text-neutral-400 mr-3" />
                <h4 className="text-base font-semibold text-neutral-900">Resume & Documents</h4>
              </div>
              <Button variant="ghost" size="sm">
                <PencilIcon className="w-4 h-4 mr-2" />
                Edit
              </Button>
            </div>
            <div className="ml-8">
              {resumeInfo ? (
                <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center">
                    <DocumentTextIcon className="w-5 h-5 text-green-600 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-green-900">{resumeInfo.name}</p>
                      <p className="text-xs text-green-700">{resumeInfo.type} • {resumeInfo.size}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <EyeIcon className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center p-3 bg-red-50 border border-red-200 rounded-lg">
                  <ExclamationTriangleIcon className="w-5 h-5 text-red-600 mr-3" />
                  <span className="text-sm text-red-700">No resume selected</span>
                </div>
              )}
              
              {formData.resume?.portfolioUrl && (
                <div className="mt-3 flex items-center">
                  <LinkIcon className="w-4 h-4 text-neutral-400 mr-2" />
                  <span className="text-sm text-neutral-600">Portfolio: </span>
                  <a 
                    href={formData.resume.portfolioUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-brand-aqua hover:underline ml-1"
                  >
                    {formData.resume.portfolioUrl}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* tomiwa: Screening Questions Section */}
          {job.screeningQuestions && job.screeningQuestions.length > 0 && (
            <div className="border-t border-neutral-200 pt-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <ClipboardDocumentListIcon className="w-5 h-5 text-neutral-400 mr-3" />
                  <h4 className="text-base font-semibold text-neutral-900">Screening Questions</h4>
                </div>
                <Button variant="ghost" size="sm">
                  <PencilIcon className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              </div>
              <div className="ml-8">
                <div className="flex items-center mb-3">
                  {answeredQuestionsCount === job.screeningQuestions.length ? (
                    <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2" />
                  ) : (
                    <ExclamationTriangleIcon className="w-4 h-4 text-yellow-500 mr-2" />
                  )}
                  <span className="text-sm text-neutral-600">
                    {answeredQuestionsCount} of {job.screeningQuestions.length} questions answered
                  </span>
                </div>
                
                {/* tomiwa: Show sample answers */}
                <div className="space-y-3">
                  {job.screeningQuestions.slice(0, 2).map((question, index) => {
                    const answer = formData.questions?.answers?.[question.id];
                    return (
                      <div key={question.id} className="p-3 bg-neutral-50 rounded-lg">
                        <p className="text-sm font-medium text-neutral-900 mb-1">
                          {index + 1}. {question.question}
                        </p>
                        <p className="text-sm text-neutral-600">
                          {answer ? (
                            Array.isArray(answer) ? answer.join(', ') : answer.toString().substring(0, 100) + (answer.toString().length > 100 ? '...' : '')
                          ) : (
                            <span className="text-red-600 italic">Not answered</span>
                          )}
                        </p>
                      </div>
                    );
                  })}
                  {job.screeningQuestions.length > 2 && (
                    <p className="text-sm text-neutral-500">
                      +{job.screeningQuestions.length - 2} more questions
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* tomiwa: Consent Section */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center">
          <ShieldCheckIcon className="w-5 h-5 mr-2" />
          Consent & Agreements
        </h3>
        
        <div className="space-y-4">
          {/* tomiwa: GDPR Consent */}
          <div className="p-4 border border-neutral-200 rounded-xl">
            <label className="flex items-start cursor-pointer">
              <input
                type="checkbox"
                checked={gdprConsent}
                onChange={(e) => setGdprConsent(e.target.checked)}
                className="w-4 h-4 text-brand-aqua border-neutral-300 rounded focus:ring-brand-aqua mt-1 mr-3 flex-shrink-0"
              />
              <div className="text-sm">
                <p className="font-medium text-neutral-900 mb-1">
                  Data Processing Consent <span className="text-red-600">*</span>
                </p>
                <p className="text-neutral-600">
                  I consent to {job.company} processing my personal data for the purpose of evaluating my job application. 
                  This includes sharing my information with relevant hiring managers and team members involved in the recruitment process.
                </p>
              </div>
            </label>
          </div>

          {/* tomiwa: Terms and Conditions */}
          <div className="p-4 border border-neutral-200 rounded-xl">
            <label className="flex items-start cursor-pointer">
              <input
                type="checkbox"
                checked={termsConsent}
                onChange={(e) => setTermsConsent(e.target.checked)}
                className="w-4 h-4 text-brand-aqua border-neutral-300 rounded focus:ring-brand-aqua mt-1 mr-3 flex-shrink-0"
              />
              <div className="text-sm">
                <p className="font-medium text-neutral-900 mb-1">
                  Terms and Conditions <span className="text-red-600">*</span>
                </p>
                <p className="text-neutral-600">
                  I agree to the{' '}
                  <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-brand-aqua hover:underline">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-brand-aqua hover:underline">
                    Privacy Policy
                  </a>. 
                  I understand that submitting this application does not guarantee employment.
                </p>
              </div>
            </label>
          </div>

          {/* tomiwa: Communication Consent (Optional) */}
          <div className="p-4 border border-neutral-200 rounded-xl">
            <label className="flex items-start cursor-pointer">
              <input
                type="checkbox"
                checked={communicationConsent}
                onChange={(e) => setCommunicationConsent(e.target.checked)}
                className="w-4 h-4 text-brand-aqua border-neutral-300 rounded focus:ring-brand-aqua mt-1 mr-3 flex-shrink-0"
              />
              <div className="text-sm">
                <p className="font-medium text-neutral-900 mb-1">
                  Communication Preferences <span className="text-neutral-500">(Optional)</span>
                </p>
                <p className="text-neutral-600">
                  I would like to receive updates about my application status and future job opportunities from {job.company} 
                  that match my profile and preferences.
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* tomiwa: Consent validation message */}
        {(!gdprConsent || !termsConsent) && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start">
              <ExclamationTriangleIcon className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-medium text-red-800">Required Consent Missing</h4>
                <p className="text-sm text-red-700 mt-1">
                  Please provide consent for data processing and agree to the terms and conditions to submit your application.
                </p>
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* tomiwa: Application Ready Status */}
      {gdprConsent && termsConsent && resumeInfo && formData.profile?.isComplete && (
        <Card className="p-6 bg-green-50 border-green-200">
          <div className="flex items-start">
            <CheckCircleIcon className="w-6 h-6 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-green-900 mb-2">Application Ready to Submit!</h3>
              <p className="text-green-800 mb-3">
                Your application for <strong>{job.jobTitle}</strong> at <strong>{job.company}</strong> is complete and ready to submit.
              </p>
              <div className="text-sm text-green-700 space-y-1">
                <div className="flex items-center">
                  <CheckCircleIcon className="w-4 h-4 mr-2" />
                  Profile information verified
                </div>
                <div className="flex items-center">
                  <CheckCircleIcon className="w-4 h-4 mr-2" />
                  Resume attached
                </div>
                {job.screeningQuestions && job.screeningQuestions.length > 0 && (
                  <div className="flex items-center">
                    <CheckCircleIcon className="w-4 h-4 mr-2" />
                    Screening questions answered
                  </div>
                )}
                <div className="flex items-center">
                  <CheckCircleIcon className="w-4 h-4 mr-2" />
                  Consent provided
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* tomiwa: What happens next */}
      <Card className="p-6 bg-blue-50 border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">What happens next?</h3>
        <div className="space-y-2 text-sm text-blue-800">
          <div className="flex items-start">
            <div className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
              <span className="text-xs font-bold text-blue-800">1</span>
            </div>
            <span>Your application will be submitted to {job.company}'s hiring team</span>
          </div>
          <div className="flex items-start">
            <div className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
              <span className="text-xs font-bold text-blue-800">2</span>
            </div>
            <span>You'll receive a confirmation email with your application details</span>
          </div>
          {job.requiresTest && (
            <div className="flex items-start">
              <div className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                <span className="text-xs font-bold text-blue-800">3</span>
              </div>
              <span>Complete the required assessment ({job.testDuration} via {job.testProvider})</span>
            </div>
          )}
          <div className="flex items-start">
            <div className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
              <span className="text-xs font-bold text-blue-800">{job.requiresTest ? '4' : '3'}</span>
            </div>
            <span>The hiring team will review your application and contact you with next steps</span>
          </div>
        </div>
      </Card>
    </div>
  );
}


