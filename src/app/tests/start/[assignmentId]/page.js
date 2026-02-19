/**
 * File: src/app/tests/start/[assignmentId]/page.js
 * 
 * tomiwa: Test Start Page - Assessment launch page
 * Pre-assessment instructions and launch interface for external test providers
 * 
 * Features:
 * - Assessment details and instructions
 * - System check for technical requirements
 * - Launch button to external test provider
 * - Timer and progress tracking
 * - Support contact information
 */

'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/ui/Card.jsx';
import { Button } from '@/components/ui/Button.jsx';
import {
  AcademicCapIcon,
  ClockIcon,
  ComputerDesktopIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  PlayIcon,
  ArrowLeftIcon,
  ShieldCheckIcon,
  WifiIcon,
  CameraIcon,
  SpeakerWaveIcon,
} from '@heroicons/react/24/outline';

// tomiwa: Mock assessment data
const mockAssessmentData = {
  'APP-1730736000000': {
    id: 'APP-1730736000000',
    jobTitle: 'UX/UI Designer',
    company: 'Paystack',
    companyLogo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop',
    testProvider: 'HackerRank',
    testDuration: '90 minutes',
    testDescription: 'Design thinking and problem-solving assessment',
    testUrl: 'https://hackerrank.com/test/start/abc123',
    instructions: [
      'Complete all sections within the time limit',
      'You cannot pause or restart the assessment',
      'Ensure stable internet connection throughout',
      'Use only the provided tools and resources',
      'Contact support immediately if you experience technical issues'
    ],
    systemRequirements: {
      browser: 'Chrome 90+, Firefox 88+, Safari 14+, Edge 90+',
      internet: 'Stable broadband connection (minimum 5 Mbps)',
      webcam: 'Required for identity verification',
      microphone: 'Required for proctored sections',
      screen: 'Minimum 1024x768 resolution'
    },
    sections: [
      { name: 'Design Principles', duration: '20 minutes', questions: 15 },
      { name: 'Problem Solving', duration: '30 minutes', questions: 8 },
      { name: 'Practical Exercise', duration: '40 minutes', questions: 3 }
    ]
  }
};

export default function TestStart() {
  const params = useParams();
  const router = useRouter();
  const assignmentId = params.assignmentId;
  
  // tomiwa: State management
  const [assessment, setAssessment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [systemCheck, setSystemCheck] = useState({
    browser: false,
    internet: false,
    webcam: false,
    microphone: false,
  });
  const [isSystemCheckComplete, setIsSystemCheckComplete] = useState(false);
  const [isStarting, setIsStarting] = useState(false);

  // tomiwa: Load assessment data
  useEffect(() => {
    const loadAssessment = async () => {
      setIsLoading(true);
      // johnson: ExistingCode - Simulate API call
      setTimeout(() => {
        const assessmentData = mockAssessmentData[assignmentId];
        setAssessment(assessmentData);
        setIsLoading(false);
      }, 500);
    };

    if (assignmentId) {
      loadAssessment();
    }
  }, [assignmentId]);

  // tomiwa: Run system checks
  useEffect(() => {
    const runSystemChecks = async () => {
      // tomiwa: Browser check
      const userAgent = navigator.userAgent;
      const browserCheck = /Chrome|Firefox|Safari|Edge/.test(userAgent);
      
      // tomiwa: Internet check (simplified)
      const internetCheck = navigator.onLine;
      
      // tomiwa: Media device checks
      let webcamCheck = false;
      let microphoneCheck = false;
      
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        webcamCheck = devices.some(device => device.kind === 'videoinput');
        microphoneCheck = devices.some(device => device.kind === 'audioinput');
      } catch (error) {
        console.log('Media device check failed:', error);
      }

      setSystemCheck({
        browser: browserCheck,
        internet: internetCheck,
        webcam: webcamCheck,
        microphone: microphoneCheck,
      });

      setIsSystemCheckComplete(browserCheck && internetCheck && webcamCheck && microphoneCheck);
    };

    runSystemChecks();
  }, []);

  // tomiwa: Start assessment
  const handleStartAssessment = () => {
    setIsStarting(true);
    
    // johnson: ExistingCode - In real app, this would redirect to external test provider
    setTimeout(() => {
      window.open(assessment.testUrl, '_blank');
      // tomiwa: Redirect to a waiting/tracking page
      router.push(`/tests/in-progress/${assignmentId}`);
    }, 2000);
  };

  // tomiwa: Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-aqua mx-auto mb-4"></div>
          <p className="text-neutral-600">Loading assessment...</p>
        </div>
      </div>
    );
  }

  // tomiwa: Assessment not found
  if (!assessment) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <Card className="p-12 text-center max-w-md mx-auto">
          <ExclamationTriangleIcon className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-neutral-900 mb-2">Assessment Not Found</h2>
          <p className="text-neutral-600 mb-6">The assessment you're looking for doesn't exist or has expired.</p>
          <Link href="/dashboard/candidate/applications">
            <Button>View Applications</Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* tomiwa: Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => router.back()}
                className="p-2 text-neutral-400 hover:text-neutral-600 transition-colors"
                aria-label="Go back"
              >
                <ArrowLeftIcon className="w-5 h-5" />
              </button>
              <img
                src={assessment.companyLogo}
                alt={`${assessment.company} logo`}
                className="w-10 h-10 rounded-lg object-cover"
              />
              <div>
                <h1 className="text-lg font-semibold text-neutral-900">Assessment for {assessment.jobTitle}</h1>
                <p className="text-sm text-neutral-600">{assessment.company} • {assessment.testProvider}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold text-neutral-900">{assessment.testDuration}</div>
              <div className="text-sm text-neutral-600">Total Duration</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* tomiwa: Assessment Overview */}
          <Card className="p-6 bg-gradient-to-r from-accent-50 to-accent-100 border-accent-200">
            <div className="flex items-start">
              <div className="w-16 h-16 bg-accent-500 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                <AcademicCapIcon className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-accent-900 mb-2">
                  {assessment.testDescription}
                </h2>
                <p className="text-accent-800 mb-4">
                  This assessment will evaluate your skills and knowledge relevant to the {assessment.jobTitle} position at {assessment.company}.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex items-center text-accent-700">
                    <ClockIcon className="w-5 h-5 mr-2" />
                    <span className="font-medium">{assessment.testDuration}</span>
                  </div>
                  <div className="flex items-center text-accent-700">
                    <ComputerDesktopIcon className="w-5 h-5 mr-2" />
                    <span className="font-medium">{assessment.testProvider}</span>
                  </div>
                  <div className="flex items-center text-accent-700">
                    <ShieldCheckIcon className="w-5 h-5 mr-2" />
                    <span className="font-medium">Proctored</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* tomiwa: System Check */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">System Check</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className={`flex items-center p-3 rounded-lg ${
                systemCheck.browser ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
              }`}>
                <ComputerDesktopIcon className={`w-5 h-5 mr-3 ${
                  systemCheck.browser ? 'text-green-600' : 'text-red-600'
                }`} />
                <div>
                  <div className="font-medium text-neutral-900">Browser</div>
                  <div className={`text-sm ${systemCheck.browser ? 'text-green-700' : 'text-red-700'}`}>
                    {systemCheck.browser ? 'Compatible' : 'Update required'}
                  </div>
                </div>
                {systemCheck.browser && <CheckCircleIcon className="w-5 h-5 text-green-600 ml-auto" />}
              </div>

              <div className={`flex items-center p-3 rounded-lg ${
                systemCheck.internet ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
              }`}>
                <WifiIcon className={`w-5 h-5 mr-3 ${
                  systemCheck.internet ? 'text-green-600' : 'text-red-600'
                }`} />
                <div>
                  <div className="font-medium text-neutral-900">Internet</div>
                  <div className={`text-sm ${systemCheck.internet ? 'text-green-700' : 'text-red-700'}`}>
                    {systemCheck.internet ? 'Connected' : 'No connection'}
                  </div>
                </div>
                {systemCheck.internet && <CheckCircleIcon className="w-5 h-5 text-green-600 ml-auto" />}
              </div>

              <div className={`flex items-center p-3 rounded-lg ${
                systemCheck.webcam ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'
              }`}>
                <CameraIcon className={`w-5 h-5 mr-3 ${
                  systemCheck.webcam ? 'text-green-600' : 'text-yellow-600'
                }`} />
                <div>
                  <div className="font-medium text-neutral-900">Webcam</div>
                  <div className={`text-sm ${systemCheck.webcam ? 'text-green-700' : 'text-yellow-700'}`}>
                    {systemCheck.webcam ? 'Detected' : 'Not detected'}
                  </div>
                </div>
                {systemCheck.webcam && <CheckCircleIcon className="w-5 h-5 text-green-600 ml-auto" />}
              </div>

              <div className={`flex items-center p-3 rounded-lg ${
                systemCheck.microphone ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'
              }`}>
                <SpeakerWaveIcon className={`w-5 h-5 mr-3 ${
                  systemCheck.microphone ? 'text-green-600' : 'text-yellow-600'
                }`} />
                <div>
                  <div className="font-medium text-neutral-900">Microphone</div>
                  <div className={`text-sm ${systemCheck.microphone ? 'text-green-700' : 'text-yellow-700'}`}>
                    {systemCheck.microphone ? 'Detected' : 'Not detected'}
                  </div>
                </div>
                {systemCheck.microphone && <CheckCircleIcon className="w-5 h-5 text-green-600 ml-auto" />}
              </div>
            </div>

            {!isSystemCheckComplete && (
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start">
                  <ExclamationTriangleIcon className="w-5 h-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-medium text-yellow-800">System Requirements Not Met</h4>
                    <p className="text-sm text-yellow-700 mt-1">
                      Please ensure all system requirements are met before starting the assessment.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </Card>

          {/* tomiwa: Assessment Sections */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Assessment Sections</h3>
            <div className="space-y-4">
              {assessment.sections.map((section, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-neutral-900">{section.name}</h4>
                    <p className="text-sm text-neutral-600">{section.questions} questions</p>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-neutral-900">{section.duration}</div>
                    <div className="text-sm text-neutral-600">Time limit</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* tomiwa: Instructions */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Important Instructions</h3>
            <div className="space-y-3">
              {assessment.instructions.map((instruction, index) => (
                <div key={index} className="flex items-start">
                  <div className="w-6 h-6 bg-brand-aqua rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-xs font-bold text-white">{index + 1}</span>
                  </div>
                  <span className="text-neutral-700">{instruction}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* tomiwa: System Requirements */}
          <Card className="p-6 bg-blue-50 border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">System Requirements</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-blue-800">
              <div>
                <h4 className="font-medium mb-2">Browser</h4>
                <p>{assessment.systemRequirements.browser}</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Internet</h4>
                <p>{assessment.systemRequirements.internet}</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Webcam</h4>
                <p>{assessment.systemRequirements.webcam}</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Microphone</h4>
                <p>{assessment.systemRequirements.microphone}</p>
              </div>
            </div>
          </Card>

          {/* tomiwa: Start Assessment */}
          <Card className="p-8 text-center">
            {isSystemCheckComplete ? (
              <div>
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <PlayIcon className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-4">Ready to Start</h3>
                <p className="text-neutral-600 mb-6 max-w-md mx-auto">
                  All system checks passed. You're ready to begin the {assessment.testDuration} assessment. 
                  Make sure you won't be interrupted during this time.
                </p>
                <Button
                  onClick={handleStartAssessment}
                  disabled={isStarting}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg"
                  size="lg"
                >
                  {isStarting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Starting Assessment...
                    </>
                  ) : (
                    <>
                      <PlayIcon className="w-5 h-5 mr-3" />
                      Start Assessment
                    </>
                  )}
                </Button>
              </div>
            ) : (
              <div>
                <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ExclamationTriangleIcon className="w-10 h-10 text-yellow-600" />
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-4">System Check Required</h3>
                <p className="text-neutral-600 mb-6 max-w-md mx-auto">
                  Please ensure all system requirements are met before you can start the assessment.
                </p>
                <Button variant="outline" disabled>
                  Complete System Check First
                </Button>
              </div>
            )}
          </Card>

          {/* tomiwa: Support */}
          <Card className="p-6 border-neutral-200">
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">Need Help?</h3>
            <p className="text-neutral-600 mb-4">
              If you experience any technical difficulties or have questions about the assessment, contact our support team.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="outline" size="sm">
                Contact Support
              </Button>
              <Button variant="outline" size="sm">
                Technical FAQ
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}


