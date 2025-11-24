/**
 * File: src/app/dashboard/candidate/ai-tools/job-match-analyzer/page.js
 * 
 * tomiwa: AI Job & Skills Match Analyzer Tool
 * Analyzes how well candidates match job requirements, identifies skills gaps,
 * and provides personalized learning paths and recommendations.
 * 
 * Features:
 * - Job description analysis
 * - Comprehensive skills gap identification
 * - Match percentage calculation
 * - Personalized learning paths
 * - Improvement recommendations
 * - Application strategy suggestions
 * - Salary insights
 * - Company culture fit analysis
 * - Career roadmap generation
 * - Progress tracking
 */

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import CandidateDashboardLayout from '@/components/layouts/CandidateDashboardLayout';
import {
  MagnifyingGlassIcon,
  SparklesIcon,
  ChartBarIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  LightBulbIcon,
  ArrowLeftIcon,
  DocumentTextIcon,
  UserIcon,
  TagIcon,
  BanknotesIcon,
  BuildingOfficeIcon,
  AcademicCapIcon,
  TrophyIcon
} from '@heroicons/react/24/outline';

export default function JobMatchAnalyzer() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // tomiwa: State management for job match analysis
  const [activeStep, setActiveStep] = useState('input'); // 'input', 'analyzing', 'results'
  const [jobDescription, setJobDescription] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [candidateProfile, setCandidateProfile] = useState({
    skills: '',
    experience: '',
    education: '',
    achievements: ''
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [fromApplication, setFromApplication] = useState(false);
  const [jobId, setJobId] = useState(null);

  // tomiwa: Load job context from URL parameters and auto-analyze
  useEffect(() => {
    const jobIdParam = searchParams.get('jobId');
    const jobTitleParam = searchParams.get('jobTitle');
    const companyParam = searchParams.get('company');
    const fromAppParam = searchParams.get('fromApplication');
    
    if (jobIdParam && jobTitleParam && companyParam) {
      setJobId(jobIdParam);
      setJobTitle(jobTitleParam);
      setCompanyName(companyParam);
      setFromApplication(fromAppParam === 'true');
      
      // tomiwa: Auto-populate with mock job description for demo
      const jobDesc = `We are looking for a ${jobTitleParam} to join our team at ${companyParam}. 

Key Requirements:
• 3-5 years of experience in product design
• Proficiency in Figma, Sketch, and Adobe Creative Suite
• Strong understanding of user-centered design principles
• Experience with responsive web design and mobile-first approach
• Knowledge of HTML/CSS and basic JavaScript
• Experience with design systems and component libraries
• Strong portfolio demonstrating UX/UI design skills
• Excellent communication and collaboration skills
• Bachelor's degree in Design, HCI, or related field

Preferred Qualifications:
• Experience with React and modern frontend frameworks
• Knowledge of accessibility standards (WCAG)
• Experience with user research and usability testing
• Familiarity with agile development processes
• Experience in fintech or financial services industry

What You'll Do:
• Design user interfaces for web and mobile applications
• Collaborate with product managers and engineers
• Conduct user research and usability testing
• Create and maintain design systems
• Present design concepts to stakeholders`;

      setJobDescription(jobDesc);
      
      // tomiwa: Auto-populate candidate profile from mock data
      const candidateData = {
        skills: 'React, JavaScript, Node.js, AWS, Git, Figma, Sketch, Adobe Creative Suite, HTML/CSS, Design Systems, User Research, Prototyping',
        experience: '4 years of product design experience with focus on web and mobile applications. Led design for 3 major product launches. Experience in e-commerce and SaaS platforms.',
        education: 'Bachelor of Fine Arts in Graphic Design, Minor in Computer Science. Certified in UX Design from Google.',
        achievements: 'Increased user engagement by 40% through redesign of main product flow. Won Best Design Award at TechCrunch Disrupt 2023. Published case study on design system implementation.'
      };
      
      setCandidateProfile(candidateData);
      
      // tomiwa: Auto-start analysis when coming from applications
      if (fromAppParam === 'true') {
        // Small delay to ensure state is set
        setTimeout(() => {
          setIsAnalyzing(true);
          setActiveStep('analyzing');
          
          // tomiwa: Simulate AI analysis with results
          setTimeout(() => {
            setAnalysisResults(mockAnalysisResults);
            setActiveStep('results');
            setIsAnalyzing(false);
          }, 3000);
        }, 500);
      }
    }
  }, [searchParams]);

  // tomiwa: Mock analysis results
  const mockAnalysisResults = {
    overallMatch: 87,
    matchBreakdown: {
      skills: 85,
      experience: 90,
      education: 88,
      requirements: 82
    },
    skillsAnalysis: {
      matching: ['React', 'JavaScript', 'Node.js', 'AWS', 'Git', 'Figma', 'Sketch', 'HTML/CSS', 'Design Systems'],
      missing: ['TypeScript', 'Docker', 'Kubernetes', 'User Research', 'Accessibility Standards'],
      bonus: ['Python', 'Machine Learning', 'Adobe Creative Suite'],
      learningPaths: [
        {
          skill: 'TypeScript',
          priority: 'High',
          estimatedTime: '2-4 weeks',
          difficulty: 'Medium',
          resources: ['TypeScript Handbook', 'React + TypeScript Course', 'Practice Projects'],
          marketDemand: 'Very High',
          salaryImpact: '+$8,000'
        },
        {
          skill: 'User Research',
          priority: 'High',
          estimatedTime: '3-6 weeks',
          difficulty: 'Medium',
          resources: ['UX Research Fundamentals', 'Google UX Certificate', 'Coursera UX Research'],
          marketDemand: 'High',
          salaryImpact: '+$5,000'
        },
        {
          skill: 'Docker',
          priority: 'Medium',
          estimatedTime: '1-3 weeks',
          difficulty: 'Medium',
          resources: ['Docker Official Tutorial', 'Docker for Developers', 'Hands-on Labs'],
          marketDemand: 'High',
          salaryImpact: '+$6,000'
        }
      ]
    },
    experienceAnalysis: {
      required: '3-5 years',
      candidate: '4 years',
      match: 'Excellent fit',
      relevantExperience: 95
    },
    salaryInsights: {
      range: '$80,000 - $120,000',
      market: '$95,000',
      candidateLevel: '$100,000',
      negotiationPotential: 'High'
    },
    applicationStrategy: {
      priority: 'High',
      successProbability: 78,
      timeToApply: 'Apply within 3 days',
      coverLetterFocus: ['React expertise', 'AWS experience', 'Team leadership']
    },
    improvements: [
      {
        category: 'Skills',
        priority: 'High',
        suggestion: 'Learn TypeScript to increase match by 8%',
        timeframe: '2-4 weeks',
        resources: ['TypeScript Handbook', 'Online courses']
      },
      {
        category: 'Experience',
        priority: 'Medium',
        suggestion: 'Highlight containerization projects',
        timeframe: 'Immediate',
        resources: ['Update resume', 'Portfolio examples']
      },
      {
        category: 'Certifications',
        priority: 'Low',
        suggestion: 'Consider AWS certification',
        timeframe: '2-3 months',
        resources: ['AWS Training', 'Practice exams']
      }
    ],
    companyFit: {
      culture: 85,
      values: 90,
      workStyle: 88,
      growth: 82,
      insights: [
        'Strong alignment with innovation focus',
        'Good fit for collaborative environment',
        'Matches growth-oriented mindset'
      ]
    }
  };

  // tomiwa: Handle profile input changes
  const handleProfileChange = (field, value) => {
    setCandidateProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // tomiwa: Analyze job match
  const analyzeMatch = async () => {
    if (!jobDescription.trim()) {
      alert('Please paste a job description');
      return;
    }

    setIsAnalyzing(true);
    setActiveStep('analyzing');

    // tomiwa: Simulate AI analysis
    setTimeout(() => {
      setAnalysisResults(mockAnalysisResults);
      setActiveStep('results');
      setIsAnalyzing(false);
    }, 3000);
  };

  // tomiwa: Get match color based on percentage
  const getMatchColor = (percentage) => {
    if (percentage >= 80) return 'text-emerald-600 bg-emerald-50';
    if (percentage >= 60) return 'text-orange-600 bg-orange-50';
    return 'text-red-600 bg-red-50';
  };

  // tomiwa: Get priority color
  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-neutral-100 text-neutral-800 border-neutral-200';
    }
  };

  return (
    <CandidateDashboardLayout>
      {/* tomiwa: Job Context Banner */}
      {fromApplication && jobContext && (
        <div className="bg-gradient-to-r from-brand-yellow to-brand-orange -mt-8 -mx-6 mb-4">
          <div className="px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <SparklesIcon className="w-5 h-5 text-brand-black" />
                </div>
                <div>
                  <h2 className="font-bold text-brand-black">Analyzing Job Match</h2>
                  <p className="text-brand-black/80 text-sm">
                    {jobContext.jobTitle} at {jobContext.company}
                  </p>
                </div>
              </div>
              <button
                onClick={() => router.push('/dashboard/candidate/applications')}
                className="text-brand-black/60 hover:text-brand-black text-sm font-medium"
              >
                ← Back to Applications
              </button>
            </div>
          </div>
        </div>
      )}

      {/* tomiwa: Header with navigation */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 -mt-8 -mx-6 mb-8">
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
                <div className="text-4xl">🎯</div>
                <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-display font-bold text-white">
                  AI Job & Skills Match Analyzer
                </h1>
              </div>
              <p className="text-emerald-100 text-base sm:text-lg md:text-lg lg:text-xl leading-relaxed max-w-2xl">
                Discover how well you match job requirements, identify skills gaps, and get personalized learning paths to advance your career
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* tomiwa: Main content */}
      <div className="px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20 pb-12">
        
        {/* tomiwa: Progress indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${
                activeStep === 'input' ? 'bg-emerald-600 text-white' : 
                activeStep !== 'input' ? 'bg-emerald-500 text-white' : 'bg-neutral-100 text-neutral-600'
              }`}>
                <span className="w-5 h-5 rounded-full bg-current opacity-20"></span>
                Job & Profile Input
              </div>
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${
                activeStep === 'analyzing' ? 'bg-emerald-600 text-white' : 
                activeStep === 'results' ? 'bg-emerald-500 text-white' : 'bg-neutral-100 text-neutral-600'
              }`}>
                <span className="w-5 h-5 rounded-full bg-current opacity-20"></span>
                AI Analysis
              </div>
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${
                activeStep === 'results' ? 'bg-emerald-600 text-white' : 'bg-neutral-100 text-neutral-600'
              }`}>
                <span className="w-5 h-5 rounded-full bg-current opacity-20"></span>
                Match Results
              </div>
            </div>
          </div>
        </div>

        {/* tomiwa: Input Step */}
        {activeStep === 'input' && (
          <div className="space-y-8">
            {/* tomiwa: Job information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-neutral-900 mb-6 flex items-center gap-2">
                <DocumentTextIcon className="w-6 h-6 text-emerald-600" />
                Job Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Job Title (Optional)
                  </label>
                  <input
                    type="text"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="e.g., Senior Software Engineer"
                    className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Company Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g., TechCorp Inc."
                    className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  Job Description *
                </label>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the complete job description here..."
                  rows={8}
                  className="w-full p-4 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 resize-none"
                />
                <p className="text-sm text-neutral-500 mt-2">
                  Include requirements, qualifications, and job responsibilities for the most accurate analysis.
                </p>
              </div>
            </div>

            {/* tomiwa: Candidate profile */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-neutral-900 mb-6 flex items-center gap-2">
                <UserIcon className="w-6 h-6 text-brand-aqua" />
                Your Profile
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Skills & Technologies
                  </label>
                  <textarea
                    value={candidateProfile.skills}
                    onChange={(e) => handleProfileChange('skills', e.target.value)}
                    placeholder="List your technical skills, programming languages, frameworks, tools, etc."
                    rows={3}
                    className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 resize-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Work Experience
                  </label>
                  <textarea
                    value={candidateProfile.experience}
                    onChange={(e) => handleProfileChange('experience', e.target.value)}
                    placeholder="Describe your relevant work experience, years in field, key projects, etc."
                    rows={3}
                    className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 resize-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Education & Certifications
                  </label>
                  <textarea
                    value={candidateProfile.education}
                    onChange={(e) => handleProfileChange('education', e.target.value)}
                    placeholder="Your educational background, degrees, certifications, relevant courses, etc."
                    rows={2}
                    className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 resize-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Key Achievements (Optional)
                  </label>
                  <textarea
                    value={candidateProfile.achievements}
                    onChange={(e) => handleProfileChange('achievements', e.target.value)}
                    placeholder="Notable accomplishments, awards, successful projects, metrics, etc."
                    rows={2}
                    className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 resize-none"
                  />
                </div>
              </div>
            </div>

            {/* tomiwa: Analyze button */}
            <div className="flex justify-center">
              <button
                onClick={analyzeMatch}
                disabled={!jobDescription.trim()}
                className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <SparklesIcon className="w-5 h-5" />
                Analyze Job Match
              </button>
            </div>
          </div>
        )}

        {/* tomiwa: Analyzing Step */}
        {activeStep === 'analyzing' && (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <SparklesIcon className="w-8 h-8 text-emerald-600 animate-pulse" />
            </div>
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">AI is Analyzing Your Job Match</h2>
            <p className="text-neutral-600 mb-8 max-w-md mx-auto">
              Our AI is comparing your profile with the job requirements and calculating your match percentage.
            </p>
            <div className="flex justify-center">
              <div className="w-64 bg-neutral-200 rounded-full h-2">
                <div className="bg-emerald-600 h-2 rounded-full animate-pulse" style={{ width: '70%' }}></div>
              </div>
            </div>
            <p className="text-sm text-neutral-500 mt-4">This usually takes 30-60 seconds...</p>
          </div>
        )}

        {/* tomiwa: Results Step */}
        {activeStep === 'results' && analysisResults && (
          <div className="space-y-8">
            {/* tomiwa: Overall match score */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-neutral-900 mb-6 flex items-center gap-2">
                <TrophyIcon className="w-6 h-6 text-emerald-600" />
                Job Match Analysis
              </h2>
              
              <div className="text-center mb-8">
                <div className="text-6xl font-bold text-emerald-600 mb-2">{analysisResults.overallMatch}%</div>
                <div className="text-lg text-neutral-600 mb-4">Overall Match Score</div>
                <div className={`inline-flex px-4 py-2 rounded-full text-sm font-semibold ${getMatchColor(analysisResults.overallMatch)}`}>
                  {analysisResults.overallMatch >= 80 ? 'Excellent Match' : 
                   analysisResults.overallMatch >= 60 ? 'Good Match' : 'Needs Improvement'}
                </div>
              </div>

              {/* tomiwa: Match breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {Object.entries(analysisResults.matchBreakdown).map(([category, score]) => (
                  <div key={category} className="text-center p-4 bg-neutral-50 rounded-lg">
                    <div className="text-2xl font-bold text-neutral-900 mb-1">{score}%</div>
                    <div className="text-sm text-neutral-600 capitalize">{category}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* tomiwa: Skills analysis */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-bold text-neutral-900 mb-6 flex items-center gap-2">
                <TagIcon className="w-5 h-5 text-brand-aqua" />
                Skills Analysis
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold text-emerald-700 mb-3 flex items-center gap-2">
                    <CheckCircleIcon className="w-4 h-4" />
                    Matching Skills ({analysisResults.skillsAnalysis.matching.length})
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {analysisResults.skillsAnalysis.matching.map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-red-700 mb-3 flex items-center gap-2">
                    <ExclamationTriangleIcon className="w-4 h-4" />
                    Missing Skills ({analysisResults.skillsAnalysis.missing.length})
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {analysisResults.skillsAnalysis.missing.map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-blue-700 mb-3 flex items-center gap-2">
                    <SparklesIcon className="w-4 h-4" />
                    Bonus Skills ({analysisResults.skillsAnalysis.bonus.length})
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {analysisResults.skillsAnalysis.bonus.map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* tomiwa: Personalized Learning Paths */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-bold text-neutral-900 mb-6 flex items-center gap-2">
                <AcademicCapIcon className="w-5 h-5 text-purple-600" />
                Personalized Learning Paths
              </h3>
              <p className="text-neutral-600 mb-6">
                Based on your skills gap analysis, here are recommended learning paths to improve your job match score:
              </p>
              
              <div className="space-y-4">
                {analysisResults.skillsAnalysis.learningPaths.map((path, index) => (
                  <div key={index} className="border border-neutral-200 rounded-lg p-4 hover:border-purple-300 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <h4 className="text-lg font-semibold text-neutral-900">{path.skill}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          path.priority === 'High' 
                            ? 'bg-red-100 text-red-800' 
                            : 'bg-orange-100 text-orange-800'
                        }`}>
                          {path.priority} Priority
                        </span>
                        <span className="px-2 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-medium">
                          {path.salaryImpact}
                        </span>
                      </div>
                      <div className="text-right text-sm text-neutral-600">
                        <div className="font-medium">{path.estimatedTime}</div>
                        <div className="text-xs">{path.difficulty} difficulty</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      <div>
                        <span className="text-sm font-medium text-neutral-700">Market Demand:</span>
                        <span className={`ml-2 text-sm font-semibold ${
                          path.marketDemand === 'Very High' 
                            ? 'text-emerald-600' 
                            : 'text-blue-600'
                        }`}>
                          {path.marketDemand}
                        </span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-neutral-700">Potential Impact:</span>
                        <span className="ml-2 text-sm font-semibold text-emerald-600">
                          {path.salaryImpact} salary increase
                        </span>
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-sm font-medium text-neutral-700 block mb-2">Recommended Resources:</span>
                      <div className="flex flex-wrap gap-2">
                        {path.resources.map((resource, resourceIndex) => (
                          <span key={resourceIndex} className="px-2 py-1 bg-purple-50 text-purple-700 rounded text-xs">
                            {resource}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* tomiwa: Application strategy and salary insights */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-bold text-neutral-900 mb-4 flex items-center gap-2">
                  <ChartBarIcon className="w-5 h-5 text-purple-600" />
                  Application Strategy
                </h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-700">Priority Level:</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      analysisResults.applicationStrategy.priority === 'High' 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-orange-100 text-orange-800'
                    }`}>
                      {analysisResults.applicationStrategy.priority}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-700">Success Probability:</span>
                    <span className="font-semibold text-emerald-600">
                      {analysisResults.applicationStrategy.successProbability}%
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-700">Recommended Action:</span>
                    <span className="font-semibold text-neutral-900">
                      {analysisResults.applicationStrategy.timeToApply}
                    </span>
                  </div>
                  
                  <div>
                    <span className="text-neutral-700 block mb-2">Cover Letter Focus:</span>
                    <div className="flex flex-wrap gap-2">
                      {analysisResults.applicationStrategy.coverLetterFocus.map((focus, index) => (
                        <span key={index} className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-sm">
                          {focus}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-bold text-neutral-900 mb-4 flex items-center gap-2">
                  <BanknotesIcon className="w-5 h-5 text-emerald-600" />
                  Salary Insights
                </h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-700">Job Range:</span>
                    <span className="font-semibold text-neutral-900">
                      {analysisResults.salaryInsights.range}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-700">Market Average:</span>
                    <span className="font-semibold text-neutral-900">
                      {analysisResults.salaryInsights.market}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-700">Your Level:</span>
                    <span className="font-semibold text-emerald-600">
                      {analysisResults.salaryInsights.candidateLevel}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-700">Negotiation Potential:</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      analysisResults.salaryInsights.negotiationPotential === 'High' 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : 'bg-orange-100 text-orange-800'
                    }`}>
                      {analysisResults.salaryInsights.negotiationPotential}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* tomiwa: Improvement recommendations */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-bold text-neutral-900 mb-6 flex items-center gap-2">
                <LightBulbIcon className="w-5 h-5 text-brand-yellow" />
                Improvement Recommendations
              </h3>
              
              <div className="space-y-4">
                {analysisResults.improvements.map((improvement, index) => (
                  <div key={index} className={`p-4 rounded-lg border ${getPriorityColor(improvement.priority)}`}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{improvement.category}</h4>
                        <span className="text-xs px-2 py-1 rounded-full bg-current text-white opacity-80">
                          {improvement.priority} Priority
                        </span>
                      </div>
                      <span className="text-sm font-medium">{improvement.timeframe}</span>
                    </div>
                    <p className="text-sm mb-3">{improvement.suggestion}</p>
                    <div className="flex flex-wrap gap-2">
                      {improvement.resources.map((resource, resourceIndex) => (
                        <span key={resourceIndex} className="text-xs bg-white/50 px-2 py-1 rounded">
                          {resource}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* tomiwa: Company culture fit */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-bold text-neutral-900 mb-6 flex items-center gap-2">
                <BuildingOfficeIcon className="w-5 h-5 text-indigo-600" />
                Company Culture Fit
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                {Object.entries(analysisResults.companyFit).filter(([key]) => key !== 'insights').map(([category, score]) => (
                  <div key={category} className="text-center p-4 bg-indigo-50 rounded-lg">
                    <div className="text-2xl font-bold text-indigo-600 mb-1">{score}%</div>
                    <div className="text-sm text-neutral-600 capitalize">{category}</div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-2">
                {analysisResults.companyFit.insights.map((insight, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircleIcon className="w-4 h-4 text-indigo-600" />
                    <span className="text-sm text-neutral-700">{insight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* tomiwa: UPDATED - Workflow navigation buttons */}
            <div className="bg-gradient-to-r from-brand-aqua to-brand-orange rounded-lg p-6 mt-8">
              <h3 className="text-lg font-bold text-white mb-4">Next Steps in Your Application Journey</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <button
                  onClick={() => {
                    const resumeParams = new URLSearchParams({
                      jobId: jobId || '',
                      jobTitle: jobTitle || '',
                      company: companyName || '',
                      matchScore: analysisResults.overallMatch.toString(),
                      fromJobMatch: 'true'
                    });
                    router.push(`/dashboard/candidate/ai-tools/resume-optimizer?${resumeParams.toString()}`);
                  }}
                  className="bg-white text-brand-aqua font-semibold py-3 px-4 rounded-lg hover:bg-neutral-50 transition-colors text-center"
                >
                  📄 Optimize Resume for This Job
                </button>
                
                <button
                  onClick={() => {
                    const coverLetterParams = new URLSearchParams({
                      jobId: jobId || '',
                      jobTitle: jobTitle || '',
                      company: companyName || '',
                      matchScore: analysisResults.overallMatch.toString(),
                      fromJobMatch: 'true'
                    });
                    router.push(`/dashboard/candidate/ai-tools/cover-letter-generator?${coverLetterParams.toString()}`);
                  }}
                  className="bg-white text-brand-orange font-semibold py-3 px-4 rounded-lg hover:bg-neutral-50 transition-colors text-center"
                >
                  ✍️ Generate Cover Letter
                </button>
                
                <button
                  onClick={() => {
                    const interviewParams = new URLSearchParams({
                      jobId: jobId || '',
                      jobTitle: jobTitle || '',
                      company: companyName || '',
                      fromJobMatch: 'true'
                    });
                    router.push(`/dashboard/candidate/ai-tools/interview-simulator?${interviewParams.toString()}`);
                  }}
                  className="bg-white text-purple-600 font-semibold py-3 px-4 rounded-lg hover:bg-neutral-50 transition-colors text-center"
                >
                  🎤 Prepare for Interview
                </button>
              </div>
              
              {fromApplication && (
                <div className="mt-4 pt-4 border-t border-white/20">
                  <button
                    onClick={() => router.push('/dashboard/candidate/applications')}
                    className="bg-white/20 text-white font-semibold py-2 px-4 rounded-lg hover:bg-white/30 transition-colors"
                  >
                    ← Back to Applications
                  </button>
                </div>
              )}
            </div>
            
            {/* tomiwa: Additional action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
              <button
                onClick={() => {
                  setActiveStep('input');
                  setAnalysisResults(null);
                  setJobDescription('');
                  setJobTitle('');
                  setCompanyName('');
                  setCandidateProfile({
                    skills: '',
                    experience: '',
                    education: '',
                    achievements: ''
                  });
                }}
                className="px-6 py-3 border-2 border-neutral-300 text-neutral-700 font-semibold rounded-lg hover:bg-neutral-50 transition-colors"
              >
                Analyze Another Job
              </button>
              <Link
                href="/dashboard/candidate/ai-tools"
                className="px-6 py-3 border-2 border-brand-aqua text-brand-aqua font-semibold rounded-lg hover:bg-brand-aqua hover:text-white transition-colors text-center"
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
