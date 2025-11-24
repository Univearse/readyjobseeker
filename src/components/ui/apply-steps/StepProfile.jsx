/**
 * File: src/components/ui/apply-steps/StepProfile.jsx
 * 
 * tomiwa: Step 1 - Profile Verification Component
 * Profile completeness check with edit options and missing field highlights
 * 
 * Features:
 * - Profile completeness percentage display
 * - Missing fields identification and quick edit
 * - Profile summary with key information
 * - Direct links to profile editing
 * - Responsive design for all screen sizes
 */

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  UserIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  PencilIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';

// tomiwa: Mock user profile data - in real app this would come from API/context
const mockUserProfile = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phone: '+1 (555) 123-4567',
  location: 'San Francisco, CA',
  profileComplete: 85,
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
  headline: 'Senior Product Designer with 8+ years experience',
  experience: [
    {
      id: 1,
      company: 'Google',
      position: 'Senior Product Designer',
      duration: '2021 - Present',
    },
    {
      id: 2,
      company: 'Airbnb',
      position: 'Product Designer',
      duration: '2019 - 2021',
    },
  ],
  education: [
    {
      id: 1,
      school: 'Stanford University',
      degree: 'Master of Design',
      year: '2019',
    },
  ],
  skills: ['UI/UX Design', 'Figma', 'Sketch', 'Prototyping', 'User Research'],
  missingFields: ['Portfolio URL', 'LinkedIn Profile'],
};

export default function StepProfile({ job, formData, updateFormData, updateStepValidation, stepNumber, noValidation }) {
  const [profile, setProfile] = useState(mockUserProfile);
  const [isLoading, setIsLoading] = useState(true);

  // tomiwa: Load user profile data
  useEffect(() => {
    const loadProfile = async () => {
      setIsLoading(true);
      // johnson: ExistingCode - Simulate API call
      setTimeout(() => {
        setProfile(mockUserProfile);
        setIsLoading(false);
      }, 500);
    };

    loadProfile();
  }, []);

  // tomiwa: Update form data and validation when profile loads - NO VALIDATION REQUIRED
  useEffect(() => {
    if (!isLoading) {
      const isComplete = true; // tomiwa: Always allow proceeding regardless of profile completion
      
      updateStepValidation(stepNumber, isComplete);
      updateFormData('profile', {
        profileData: profile,
        isComplete,
        profileComplete: profile.profileComplete,
        missingFields: profile.missingFields,
        noValidation: true,
      });
    }
  }, [profile, isLoading, stepNumber, updateStepValidation, updateFormData]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">Profile Verification</h2>
          <p className="text-neutral-600">Loading your profile information...</p>
        </div>
        
        <Card className="p-12 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-aqua mx-auto mb-4"></div>
          <p className="text-neutral-600">Checking your profile...</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* tomiwa: Step header */}
      <div>
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">Profile Verification</h2>
        <p className="text-neutral-600">
          Let's make sure your profile is complete and ready for your application to {job.company}.
        </p>
      </div>

      {/* tomiwa: Profile completeness overview */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-gradient-to-br from-brand-aqua to-brand-aqua/80 rounded-full flex items-center justify-center mr-4">
              <span className="text-2xl font-bold text-white">{profile.profileComplete}%</span>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-neutral-900">Profile Completeness</h3>
              <p className="text-neutral-600">
                {profile.profileComplete >= 80 ? 'Your profile looks great!' : 'Complete your profile to improve your chances'}
              </p>
            </div>
          </div>
          <Link href="/dashboard/candidate/profile">
            <Button variant="outline" size="sm">
              <PencilIcon className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </Link>
        </div>

        {/* tomiwa: Progress bar */}
        <div className="w-full bg-neutral-200 rounded-full h-3 mb-4">
          <div 
            className={`h-3 rounded-full transition-all duration-500 ${
              profile.profileComplete >= 80 ? 'bg-green-500' : 
              profile.profileComplete >= 60 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${profile.profileComplete}%` }}
          ></div>
        </div>

        {/* tomiwa: Profile status message */}
        <div className={`p-4 rounded-xl border ${
          profile.profileComplete >= 80 
            ? 'bg-green-50 border-green-200' 
            : 'bg-yellow-50 border-yellow-200'
        }`}>
          <div className="flex items-start">
            {profile.profileComplete >= 80 ? (
              <CheckCircleIcon className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
            ) : (
              <ExclamationTriangleIcon className="w-5 h-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
            )}
            <div>
              <h4 className={`text-sm font-medium ${
                profile.profileComplete >= 80 ? 'text-green-800' : 'text-yellow-800'
              }`}>
                {profile.profileComplete >= 80 
                  ? 'Profile Ready for Applications' 
                  : 'Profile Needs Attention'}
              </h4>
              <p className={`text-sm mt-1 ${
                profile.profileComplete >= 80 ? 'text-green-700' : 'text-yellow-700'
              }`}>
                {profile.profileComplete >= 80 
                  ? 'Your profile meets the requirements for job applications. You can proceed with confidence.'
                  : `Complete ${100 - profile.profileComplete}% more of your profile to improve your application success rate.`}
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* tomiwa: Profile summary */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Profile Summary</h3>
        
        <div className="flex items-start space-x-4 mb-6">
          <img
            src={profile.avatar}
            alt={`${profile.firstName} ${profile.lastName}`}
            className="w-16 h-16 rounded-full object-cover flex-shrink-0"
          />
          <div className="flex-1">
            <h4 className="text-xl font-semibold text-neutral-900">
              {profile.firstName} {profile.lastName}
            </h4>
            <p className="text-neutral-600 mb-2">{profile.headline}</p>
            <div className="flex flex-wrap gap-4 text-sm text-neutral-600">
              <div className="flex items-center">
                <EnvelopeIcon className="w-4 h-4 mr-1" />
                {profile.email}
              </div>
              <div className="flex items-center">
                <PhoneIcon className="w-4 h-4 mr-1" />
                {profile.phone}
              </div>
              <div className="flex items-center">
                <MapPinIcon className="w-4 h-4 mr-1" />
                {profile.location}
              </div>
            </div>
          </div>
        </div>

        {/* tomiwa: Experience section */}
        <div className="mb-6">
          <h4 className="text-base font-semibold text-neutral-900 mb-3 flex items-center">
            <BriefcaseIcon className="w-5 h-5 mr-2" />
            Experience
          </h4>
          <div className="space-y-3">
            {profile.experience.map((exp) => (
              <div key={exp.id} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                <div>
                  <p className="font-medium text-neutral-900">{exp.position}</p>
                  <p className="text-sm text-neutral-600">{exp.company} • {exp.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* tomiwa: Education section */}
        <div className="mb-6">
          <h4 className="text-base font-semibold text-neutral-900 mb-3 flex items-center">
            <AcademicCapIcon className="w-5 h-5 mr-2" />
            Education
          </h4>
          <div className="space-y-3">
            {profile.education.map((edu) => (
              <div key={edu.id} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                <div>
                  <p className="font-medium text-neutral-900">{edu.degree}</p>
                  <p className="text-sm text-neutral-600">{edu.school} • {edu.year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* tomiwa: Skills section */}
        <div>
          <h4 className="text-base font-semibold text-neutral-900 mb-3">Skills</h4>
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-brand-aqua/10 text-brand-aqua"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </Card>

      {/* tomiwa: Missing fields section */}
      {profile.missingFields && profile.missingFields.length > 0 && (
        <Card className="p-6 bg-yellow-50 border-yellow-200">
          <div className="flex items-start">
            <ExclamationTriangleIcon className="w-6 h-6 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-yellow-900 mb-2">Complete Your Profile</h3>
              <p className="text-yellow-800 mb-4">
                Adding these details will strengthen your application for the {job.jobTitle} position:
              </p>
              <div className="space-y-2 mb-4">
                {profile.missingFields.map((field, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-yellow-100 rounded-lg">
                    <div className="flex items-center">
                      <PlusIcon className="w-4 h-4 text-yellow-600 mr-2" />
                      <span className="text-sm font-medium text-yellow-900">{field}</span>
                    </div>
                    <Button variant="ghost" size="sm" className="text-yellow-700 hover:text-yellow-800">
                      Add
                    </Button>
                  </div>
                ))}
              </div>
              <Link href="/dashboard/candidate/profile">
                <Button className="bg-yellow-600 hover:bg-yellow-700 text-white">
                  Complete Profile
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      )}

      {/* tomiwa: Profile match for this job */}
      <Card className="p-6 bg-blue-50 border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">
          Profile Match for {job.jobTitle}
        </h3>
        <div className="space-y-3">
          <div className="flex items-start">
            <CheckCircleIcon className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-blue-900">Experience Level</p>
              <p className="text-sm text-blue-800">Your {profile.experience.length}+ years of experience aligns well with this senior role</p>
            </div>
          </div>
          <div className="flex items-start">
            <CheckCircleIcon className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-blue-900">Skills Match</p>
              <p className="text-sm text-blue-800">Your design and prototyping skills are relevant for this position</p>
            </div>
          </div>
          <div className="flex items-start">
            <CheckCircleIcon className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-blue-900">Location</p>
              <p className="text-sm text-blue-800">Your location works for this {job.location} position</p>
            </div>
          </div>
        </div>
      </Card>

      {/* tomiwa: Ready to proceed message */}
      {profile.profileComplete >= 80 && (
        <Card className="p-6 bg-green-50 border-green-200">
          <div className="flex items-start">
            <CheckCircleIcon className="w-6 h-6 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-green-900 mb-2">Profile Verified!</h3>
              <p className="text-green-800 mb-3">
                Your profile is complete and ready for your application to {job.company}. 
                You can proceed to the next step with confidence.
              </p>
              <div className="text-sm text-green-700">
                <p><strong>Profile Strength:</strong> {profile.profileComplete}% complete</p>
                <p><strong>Match Score:</strong> High compatibility with {job.jobTitle}</p>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}