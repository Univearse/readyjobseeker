/**
 * File: src/app/dashboard/candidate/ai-tools/interview-simulator/page.js
 * 
 * tomiwa: AI Interview Simulator Tool
 * Practice interviews with AI feedback, get common questions for your role,
 * and improve your responses with personalized coaching.
 * 
 * Features:
 * - Role-specific interview questions
 * - Real-time AI feedback on responses
 * - Multiple interview types (behavioral, technical, situational)
 * - Voice recording and analysis
 * - Confidence building exercises
 * - Performance tracking and improvement tips
 * - Mock interview sessions with scoring
 */

'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import CandidateDashboardLayout from '@/components/layouts/CandidateDashboardLayout';
import {
  MicrophoneIcon,
  StopIcon,
  PlayIcon,
  SparklesIcon,
  AcademicCapIcon,
  ChartBarIcon,
  LightBulbIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  StarIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';

export default function InterviewSimulator() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // tomiwa: State management for interview simulation
  const [currentStep, setCurrentStep] = useState('setup'); // 'setup', 'interview', 'feedback'
  const [interviewType, setInterviewType] = useState('behavioral');
  const [jobRole, setJobRole] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('mid');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [responses, setResponses] = useState([]);
  const [currentResponse, setCurrentResponse] = useState('');
  const [interviewComplete, setInterviewComplete] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const recordingInterval = useRef(null);
  const [jobContext, setJobContext] = useState(null);
  const [fromJobMatch, setFromJobMatch] = useState(false);

  // tomiwa: Load job context from URL parameters
  useEffect(() => {
    const jobId = searchParams.get('jobId');
    const jobTitle = searchParams.get('jobTitle');
    const company = searchParams.get('company');
    const fromJobMatchParam = searchParams.get('fromJobMatch');
    
    if (jobId && jobTitle && company) {
      setJobContext({
        jobId,
        jobTitle,
        company
      });
      setJobRole(jobTitle);
      setFromJobMatch(fromJobMatchParam === 'true');
    }
  }, [searchParams]);

  // tomiwa: Interview types
  const interviewTypes = [
    {
      id: 'behavioral',
      name: 'Behavioral',
      description: 'Questions about past experiences and how you handle situations',
      icon: '🧠',
      duration: '15-20 min'
    },
    {
      id: 'technical',
      name: 'Technical',
      description: 'Role-specific technical questions and problem-solving',
      icon: '💻',
      duration: '20-30 min'
    },
    {
      id: 'situational',
      name: 'Situational',
      description: 'Hypothetical scenarios and how you would respond',
      icon: '🎯',
      duration: '10-15 min'
    },
    {
      id: 'mixed',
      name: 'Mixed Interview',
      description: 'Combination of behavioral, technical, and situational questions',
      icon: '🔄',
      duration: '25-35 min'
    }
  ];

  // tomiwa: Experience levels
  const experienceLevels = [
    { id: 'entry', name: 'Entry Level', description: '0-2 years experience' },
    { id: 'mid', name: 'Mid Level', description: '3-7 years experience' },
    { id: 'senior', name: 'Senior Level', description: '8+ years experience' },
    { id: 'executive', name: 'Executive', description: 'Leadership/C-level roles' }
  ];

  // tomiwa: Mock interview questions based on type
  const interviewQuestions = {
    behavioral: [
      "Tell me about a time when you had to work with a difficult team member. How did you handle it?",
      "Describe a situation where you had to meet a tight deadline. What was your approach?",
      "Give me an example of a time when you made a mistake. How did you handle it?",
      "Tell me about a time when you had to learn something new quickly.",
      "Describe a situation where you had to persuade someone to see things your way."
    ],
    technical: [
      "Explain the difference between REST and GraphQL APIs.",
      "How would you optimize a slow-performing database query?",
      "Walk me through how you would design a scalable web application.",
      "What are the key principles of object-oriented programming?",
      "How do you ensure code quality in your development process?"
    ],
    situational: [
      "If you discovered a security vulnerability in production, what would be your immediate steps?",
      "How would you handle a situation where stakeholders are requesting conflicting features?",
      "If you had to choose between meeting a deadline and ensuring code quality, how would you decide?",
      "How would you approach onboarding a new team member?",
      "What would you do if you disagreed with your manager's technical decision?"
    ]
  };

  // tomiwa: Mock feedback data
  const mockFeedback = {
    overallScore: 85,
    scores: {
      clarity: 88,
      relevance: 82,
      confidence: 87,
      structure: 83
    },
    strengths: [
      "Clear and articulate communication",
      "Good use of specific examples",
      "Confident delivery",
      "Well-structured responses"
    ],
    improvements: [
      "Could provide more quantified results",
      "Consider using the STAR method more consistently",
      "Slow down slightly when explaining technical concepts"
    ],
    detailedFeedback: [
      {
        question: "Tell me about a time when you had to work with a difficult team member.",
        score: 85,
        feedback: "Good example with clear context. Consider adding more specific details about the outcome and what you learned.",
        suggestions: ["Use the STAR method", "Quantify the results", "Show personal growth"]
      },
      {
        question: "Describe a situation where you had to meet a tight deadline.",
        score: 88,
        feedback: "Excellent response! You clearly outlined your process and the positive outcome. Well done.",
        suggestions: ["Perfect structure", "Great specific details", "Strong conclusion"]
      }
    ]
  };

  // tomiwa: Start recording
  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    recordingInterval.current = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);
  };

  // tomiwa: Stop recording
  const stopRecording = () => {
    setIsRecording(false);
    if (recordingInterval.current) {
      clearInterval(recordingInterval.current);
    }
    
    // tomiwa: Save response and move to next question
    const newResponse = {
      question: getCurrentQuestions()[currentQuestionIndex],
      response: currentResponse || "Voice response recorded",
      duration: recordingTime,
      timestamp: new Date()
    };
    
    setResponses(prev => [...prev, newResponse]);
    setCurrentResponse('');
    
    if (currentQuestionIndex < getCurrentQuestions().length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      completeInterview();
    }
  };

  // tomiwa: Get current questions based on interview type
  const getCurrentQuestions = () => {
    if (interviewType === 'mixed') {
      return [
        ...interviewQuestions.behavioral.slice(0, 2),
        ...interviewQuestions.technical.slice(0, 2),
        ...interviewQuestions.situational.slice(0, 1)
      ];
    }
    return interviewQuestions[interviewType] || interviewQuestions.behavioral;
  };

  // tomiwa: Complete interview and generate feedback
  const completeInterview = () => {
    setInterviewComplete(true);
    // tomiwa: Simulate AI feedback generation
    setTimeout(() => {
      setFeedback(mockFeedback);
      setCurrentStep('feedback');
    }, 2000);
  };

  // tomiwa: Start interview
  const startInterview = () => {
    if (!jobRole) {
      alert('Please enter your job role');
      return;
    }
    setCurrentStep('interview');
  };

  // tomiwa: Format time
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <CandidateDashboardLayout>
      {/* tomiwa: Header with navigation */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 -mt-8 -mx-6 mb-8">
        <div className="px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20 py-10 sm:py-12 md:py-14 lg:py-16">
          <div className="flex items-center gap-4 mb-4">
            <Link
              href="/dashboard/candidate/ai-tools"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              <span>Back to AI Tools</span>
            </Link>
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="text-4xl">🎤</div>
                <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-display font-bold text-white">
                  AI Interview Simulator
                </h1>
              </div>
              <p className="text-purple-100 text-base sm:text-lg md:text-lg lg:text-xl leading-relaxed max-w-2xl">
                Practice interviews with AI feedback and build confidence for your next opportunity
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* tomiwa: Main content */}
      <div className="px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20 pb-12">
        
        {/* tomiwa: Setup Step */}
        {currentStep === 'setup' && (
          <div className="space-y-8">
            {/* tomiwa: Interview type selection */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-neutral-900 mb-6 flex items-center gap-2">
                <AcademicCapIcon className="w-6 h-6 text-purple-600" />
                Choose Interview Type
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {interviewTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setInterviewType(type.id)}
                    className={`p-6 border-2 rounded-lg text-left transition-all ${
                      interviewType === type.id
                        ? 'border-purple-600 bg-purple-50'
                        : 'border-neutral-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-3xl">{type.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-neutral-900 mb-1">{type.name}</h3>
                        <p className="text-sm text-neutral-600 mb-2">{type.description}</p>
                        <div className="flex items-center gap-2 text-xs text-neutral-500">
                          <ClockIcon className="w-4 h-4" />
                          <span>{type.duration}</span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* tomiwa: Job role and experience */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-neutral-900 mb-6 flex items-center gap-2">
                <ChatBubbleLeftRightIcon className="w-6 h-6 text-brand-aqua" />
                Interview Details
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Job Role *
                  </label>
                  <input
                    type="text"
                    value={jobRole}
                    onChange={(e) => setJobRole(e.target.value)}
                    placeholder="e.g., Software Engineer, Product Manager"
                    className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-purple-600"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Experience Level
                  </label>
                  <select
                    value={experienceLevel}
                    onChange={(e) => setExperienceLevel(e.target.value)}
                    className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-purple-600"
                  >
                    {experienceLevels.map((level) => (
                      <option key={level.id} value={level.id}>
                        {level.name} - {level.description}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* tomiwa: Interview preview */}
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-6 border border-purple-200">
              <h3 className="font-semibold text-neutral-900 mb-4">Interview Preview</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-neutral-600">Type:</span>
                  <div className="font-medium text-neutral-900">{interviewTypes.find(t => t.id === interviewType)?.name}</div>
                </div>
                <div>
                  <span className="text-neutral-600">Questions:</span>
                  <div className="font-medium text-neutral-900">{getCurrentQuestions().length} questions</div>
                </div>
                <div>
                  <span className="text-neutral-600">Duration:</span>
                  <div className="font-medium text-neutral-900">{interviewTypes.find(t => t.id === interviewType)?.duration}</div>
                </div>
              </div>
            </div>

            {/* tomiwa: Start button */}
            <div className="flex justify-center">
              <button
                onClick={startInterview}
                disabled={!jobRole}
                className="inline-flex items-center gap-2 px-8 py-4 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <PlayIcon className="w-5 h-5" />
                Start Interview Practice
              </button>
            </div>
          </div>
        )}

        {/* tomiwa: Interview Step */}
        {currentStep === 'interview' && !interviewComplete && (
          <div className="space-y-8">
            {/* tomiwa: Progress indicator */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-neutral-900">
                  Question {currentQuestionIndex + 1} of {getCurrentQuestions().length}
                </h2>
                <div className="text-sm text-neutral-600">
                  {interviewTypes.find(t => t.id === interviewType)?.name} Interview
                </div>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-2">
                <div 
                  className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestionIndex + 1) / getCurrentQuestions().length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* tomiwa: Current question */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ChatBubbleLeftRightIcon className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-4">
                  {getCurrentQuestions()[currentQuestionIndex]}
                </h3>
                <p className="text-neutral-600">
                  Take your time to think, then click the microphone to record your response.
                </p>
              </div>

              {/* tomiwa: Recording controls */}
              <div className="flex flex-col items-center space-y-6">
                {/* tomiwa: Recording button */}
                <button
                  onClick={isRecording ? stopRecording : startRecording}
                  className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${
                    isRecording 
                      ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                      : 'bg-purple-600 hover:bg-purple-700'
                  }`}
                >
                  {isRecording ? (
                    <StopIcon className="w-8 h-8 text-white" />
                  ) : (
                    <MicrophoneIcon className="w-8 h-8 text-white" />
                  )}
                </button>

                {/* tomiwa: Recording status */}
                <div className="text-center">
                  {isRecording ? (
                    <div className="space-y-2">
                      <div className="text-red-600 font-semibold">Recording...</div>
                      <div className="text-2xl font-mono text-neutral-900">{formatTime(recordingTime)}</div>
                    </div>
                  ) : (
                    <div className="text-neutral-600">
                      {responses.length > 0 ? 'Click to record your next response' : 'Click to start recording'}
                    </div>
                  )}
                </div>

                {/* tomiwa: Text response option */}
                <div className="w-full max-w-2xl">
                  <div className="text-center text-neutral-500 text-sm mb-4">Or type your response</div>
                  <textarea
                    value={currentResponse}
                    onChange={(e) => setCurrentResponse(e.target.value)}
                    placeholder="Type your response here..."
                    className="w-full h-32 p-4 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-purple-600 resize-none"
                  />
                  {currentResponse && (
                    <button
                      onClick={() => {
                        const newResponse = {
                          question: getCurrentQuestions()[currentQuestionIndex],
                          response: currentResponse,
                          duration: 0,
                          timestamp: new Date()
                        };
                        setResponses(prev => [...prev, newResponse]);
                        setCurrentResponse('');
                        
                        if (currentQuestionIndex < getCurrentQuestions().length - 1) {
                          setCurrentQuestionIndex(prev => prev + 1);
                        } else {
                          completeInterview();
                        }
                      }}
                      className="mt-3 w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      Submit Response
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* tomiwa: Tips */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
              <div className="flex items-start gap-3">
                <LightBulbIcon className="w-6 h-6 text-blue-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-blue-900 mb-2">Interview Tips</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Use the STAR method (Situation, Task, Action, Result) for behavioral questions</li>
                    <li>• Be specific with examples and quantify results when possible</li>
                    <li>• Take a moment to think before responding</li>
                    <li>• Speak clearly and at a moderate pace</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* tomiwa: Interview Complete - Generating Feedback */}
        {currentStep === 'interview' && interviewComplete && !feedback && (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <SparklesIcon className="w-8 h-8 text-purple-600 animate-pulse" />
            </div>
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">Analyzing Your Interview Performance</h2>
            <p className="text-neutral-600 mb-8 max-w-md mx-auto">
              Our AI is reviewing your responses and generating personalized feedback to help you improve.
            </p>
            <div className="flex justify-center">
              <div className="w-64 bg-neutral-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full animate-pulse" style={{ width: '70%' }}></div>
              </div>
            </div>
            <p className="text-sm text-neutral-500 mt-4">This usually takes 30-60 seconds...</p>
          </div>
        )}

        {/* tomiwa: Feedback Step */}
        {currentStep === 'feedback' && feedback && (
          <div className="space-y-8">
            {/* tomiwa: Overall score */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-neutral-900 mb-6 flex items-center gap-2">
                <ChartBarIcon className="w-6 h-6 text-purple-600" />
                Interview Performance Report
              </h2>
              
              <div className="text-center mb-8">
                <div className="text-6xl font-bold text-purple-600 mb-2">{feedback.overallScore}</div>
                <div className="text-lg text-neutral-600">Overall Score</div>
                <div className="flex justify-center mt-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon
                      key={star}
                      className={`w-6 h-6 ${
                        star <= Math.round(feedback.overallScore / 20) 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-neutral-300'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* tomiwa: Detailed scores */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {Object.entries(feedback.scores).map(([category, score]) => (
                  <div key={category} className="text-center p-4 bg-neutral-50 rounded-lg">
                    <div className="text-2xl font-bold text-neutral-900 mb-1">{score}%</div>
                    <div className="text-sm text-neutral-600 capitalize">{category}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* tomiwa: Strengths and improvements */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-semibold text-neutral-900 mb-4 flex items-center gap-2">
                  <CheckCircleIcon className="w-5 h-5 text-emerald-500" />
                  Strengths
                </h3>
                <div className="space-y-3">
                  {feedback.strengths.map((strength, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircleIcon className="w-4 h-4 text-emerald-500 mt-0.5" />
                      <span className="text-sm text-neutral-700">{strength}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-semibold text-neutral-900 mb-4 flex items-center gap-2">
                  <ExclamationTriangleIcon className="w-5 h-5 text-orange-500" />
                  Areas for Improvement
                </h3>
                <div className="space-y-3">
                  {feedback.improvements.map((improvement, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <ExclamationTriangleIcon className="w-4 h-4 text-orange-500 mt-0.5" />
                      <span className="text-sm text-neutral-700">{improvement}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* tomiwa: Detailed question feedback */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-neutral-900 mb-6">Question-by-Question Feedback</h3>
              <div className="space-y-6">
                {feedback.detailedFeedback.map((item, index) => (
                  <div key={index} className="border border-neutral-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-medium text-neutral-900 flex-1">{item.question}</h4>
                      <div className="text-lg font-bold text-purple-600">{item.score}%</div>
                    </div>
                    <p className="text-sm text-neutral-700 mb-3">{item.feedback}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.suggestions.map((suggestion, suggestionIndex) => (
                        <span
                          key={suggestionIndex}
                          className="px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded-full"
                        >
                          {suggestion}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* tomiwa: Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  setCurrentStep('setup');
                  setCurrentQuestionIndex(0);
                  setResponses([]);
                  setInterviewComplete(false);
                  setFeedback(null);
                  setJobRole('');
                }}
                className="px-6 py-3 border-2 border-neutral-300 text-neutral-700 font-semibold rounded-lg hover:bg-neutral-50 transition-colors"
              >
                Practice Another Interview
              </button>
              <Link
                href="/dashboard/candidate/ai-tools"
                className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors text-center"
              >
                Try Other AI Tools
              </Link>
            </div>
          </div>
        )}
      </div>
    </CandidateDashboardLayout>
  );
}
