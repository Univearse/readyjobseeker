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
import CandidateDashboardLayout from '@/components/layouts/CandidateDashboardLayout.jsx';
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
  TrophyIcon,
  MapPinIcon,
  EnvelopeIcon,
  PhoneIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';

export default function JobMatchAnalyzer() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // tomiwa: State management for job match analysis
  const [activeStep, setActiveStep] = useState('input'); // 'input', 'analyzing', 'results'
  const [jobDescription, setJobDescription] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [fromApplication, setFromApplication] = useState(false);
  const [jobId, setJobId] = useState(null);
  
  // tomiwa: NEW - Job source selection state
  const [jobSource, setJobSource] = useState('custom'); // 'custom', 'platform'
  const [selectedPlatformJob, setSelectedPlatformJob] = useState(null);
  
  // tomiwa: NEW - Candidate profile data loaded from platform profile
  const [candidateProfile, setCandidateProfile] = useState({
    personal: {
      firstName: 'Sarah',
      lastName: 'Johnson',
      title: 'Senior Frontend Developer',
      email: 'sarah.johnson@email.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      website: 'www.sarahjohnson.dev',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
    },
    summary: 'Passionate and results-driven full-stack developer with 5+ years of experience building scalable web applications using React, Next.js, Node.js, and modern JavaScript frameworks. Proven track record of leading cross-functional teams and delivering high-impact projects that serve 10,000+ users daily.',
    experience: [
      {
        id: 1,
        company: 'TechCorp Inc.',
        position: 'Senior Frontend Developer',
        location: 'San Francisco, CA',
        startDate: '2022-01',
        endDate: 'Present',
        description: 'Lead frontend development for enterprise SaaS platform serving 10k+ users. Built responsive React components and optimized performance.'
      },
      {
        id: 2,
        company: 'StartupXYZ',
        position: 'Frontend Developer',
        location: 'Remote',
        startDate: '2020-03',
        endDate: '2021-12',
        description: 'Developed user interfaces for mobile-first web application. Collaborated with design team to implement pixel-perfect designs.'
      }
    ],
    education: [
      {
        id: 1,
        institution: 'Stanford University',
        degree: 'Bachelor of Science in Computer Science',
        location: 'Stanford, CA',
        startDate: '2016-09',
        endDate: '2020-05',
        gpa: '3.8',
        link: 'https://stanford.edu'
      }
    ],
    skills: {
      technical: ['React', 'JavaScript', 'TypeScript', 'Node.js', 'Next.js', 'HTML/CSS', 'Git', 'AWS', 'Docker'],
      frameworks: ['React', 'Next.js', 'Express.js', 'Tailwind CSS'],
      tools: ['Figma', 'VS Code', 'GitHub', 'Jira', 'Slack'],
      languages: ['JavaScript', 'TypeScript', 'Python', 'SQL']
    },
    achievements: [
      'Increased user engagement by 40% through redesign of main product flow',
      'Led team of 5 developers on successful product launch',
      'Reduced application load times by 35% through performance optimization'
    ]
  });

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
      
      // tomiwa: Profile data is already loaded from platform, no need to set again
      
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

  // tomiwa: NEW - Mock platform jobs data
  const platformJobs = [
    {
      id: 'job_001',
      title: 'Senior Frontend Developer',
      company: 'TechFlow Solutions',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$120,000 - $160,000',
      posted: '2 days ago',
      matchScore: 92,
      description: `We are seeking a Senior Frontend Developer to join our innovative team at TechFlow Solutions.

Key Requirements:
• 5+ years of experience in React and modern JavaScript
• Proficiency in TypeScript, Next.js, and Node.js
• Experience with responsive design and mobile-first development
• Strong understanding of state management (Redux, Context API)
• Knowledge of testing frameworks (Jest, React Testing Library)
• Experience with CI/CD pipelines and deployment
• Bachelor's degree in Computer Science or related field

What You'll Do:
• Lead frontend architecture decisions for our SaaS platform
• Mentor junior developers and conduct code reviews
• Collaborate with design and backend teams
• Optimize application performance and user experience
• Implement new features and maintain existing codebase`,
      skills: ['React', 'TypeScript', 'Next.js', 'Node.js', 'JavaScript', 'CSS', 'Git']
    },
    {
      id: 'job_002',
      title: 'Full Stack Developer',
      company: 'InnovateCorp',
      location: 'Remote',
      type: 'Full-time',
      salary: '$100,000 - $140,000',
      posted: '5 days ago',
      matchScore: 87,
      description: `Join InnovateCorp as a Full Stack Developer and help build cutting-edge web applications.

Key Requirements:
• 3+ years of full-stack development experience
• Proficiency in React, Node.js, and Express.js
• Experience with databases (PostgreSQL, MongoDB)
• Knowledge of cloud platforms (AWS, Azure)
• Understanding of RESTful APIs and GraphQL
• Experience with version control (Git) and agile methodologies

Responsibilities:
• Develop and maintain web applications
• Design and implement APIs
• Work with cross-functional teams
• Ensure code quality and performance optimization`,
      skills: ['React', 'Node.js', 'Express.js', 'PostgreSQL', 'MongoDB', 'AWS', 'Git']
    },
    {
      id: 'job_003',
      title: 'React Developer',
      company: 'StartupXYZ',
      location: 'New York, NY',
      type: 'Contract',
      salary: '$80 - $120/hour',
      posted: '1 week ago',
      matchScore: 85,
      description: `StartupXYZ is looking for a skilled React Developer to join our dynamic team.

Requirements:
• 3+ years of React development experience
• Strong JavaScript and ES6+ knowledge
• Experience with state management libraries
• Familiarity with modern build tools (Webpack, Vite)
• Understanding of component-based architecture
• Experience with testing and debugging

Key Responsibilities:
• Build responsive user interfaces
• Implement new features and functionality
• Collaborate with designers and backend developers
• Maintain and improve existing codebase`,
      skills: ['React', 'JavaScript', 'Redux', 'Webpack', 'CSS', 'HTML']
    }
  ];


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

  // tomiwa: Profile data is read-only from platform, no input changes needed

  // tomiwa: NEW - Handle job source selection
  const handleJobSourceChange = (source) => {
    setJobSource(source);
    // Reset selections when switching sources
    setSelectedPlatformJob(null);
    setJobDescription('');
    setJobTitle('');
    setCompanyName('');
  };

  // tomiwa: NEW - Handle platform job selection
  const handlePlatformJobSelect = (job) => {
    setSelectedPlatformJob(job);
    setJobDescription(job.description);
    setJobTitle(job.title);
    setCompanyName(job.company);
    setJobId(job.id);
  };

  // tomiwa: Analyze job match - updated for custom and platform sources
  const analyzeMatch = async () => {
    // Check if we have job data from any source
    const hasJobData = jobDescription.trim() || selectedPlatformJob;
    
    if (!hasJobData) {
      alert('Please select a job or enter a job description');
      return;
    }

    // If platform job is selected but no description, use its description
    if (!jobDescription.trim() && selectedPlatformJob) {
      setJobDescription(selectedPlatformJob.description);
      setJobTitle(selectedPlatformJob.title);
      setCompanyName(selectedPlatformJob.company);
    }

    setIsAnalyzing(true);
    setActiveStep('analyzing');

    // tomiwa: Simulate AI analysis with enhanced results based on source
    setTimeout(() => {
      let enhancedResults = { ...mockAnalysisResults };
      
      // Adjust results based on job source
      if (selectedPlatformJob) {
        enhancedResults.overallMatch = selectedPlatformJob.matchScore;
        enhancedResults.applicationStrategy.priority = selectedPlatformJob.matchScore >= 85 ? 'High' : 'Medium';
      }
      
      setAnalysisResults(enhancedResults);
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

  // tomiwa: REMOVED - getPriorityColor function was removed as colorful priority styling
  // was replaced with clean light teal styling in the Improvement Recommendations card

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

      {/* tomiwa: UPDATED - Uniform Hero Banner matching AI Tools design */}
      {/* updated: Changed from emerald to brand-aqua for consistent branding */}
      <div className="bg-gradient-to-r from-brand-aqua to-[#0C5B65] -mt-8 -mx-6 mb-8">
        <div className="px-6 
                        sm:px-8 
                        md:px-10 
                        lg:px-12 
                        xl:px-16 
                        2xl:px-20 
                        py-10 
                        sm:py-12 
                        md:py-14 
                        lg:py-16">
          
          {/* tomiwa: Back navigation - inside gradient for uniform design */}
          <Link
            href="/dashboard/candidate/ai-tools"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm font-medium mb-6"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            <span>Back to AI Tools</span>
          </Link>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6">
            <div className="flex-1">
              {/* tomiwa: Main heading with Monument Extended font */}
              <h1 className="text-3xl 
                            sm:text-4xl 
                            md:text-4xl 
                            lg:text-5xl 
                            font-display font-bold text-white mb-2">
                Job & Skills Match Analyzer
              </h1>
              {/* tomiwa: Subtitle in uniform style */}
              <p className="text-[#D9E5E6] text-base 
                           sm:text-lg 
                           md:text-lg 
                           lg:text-xl 
                           leading-relaxed max-w-2xl">
                Discover how well you match job requirements, identify skills gaps, and get personalized learning paths to advance your career
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* tomiwa: Main content */}
      <div className="px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20 pb-12">
        
        {/* tomiwa: Progress indicator - simplified workflow */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${
                activeStep === 'input' ? 'bg-emerald-600 text-white' : 
                activeStep !== 'input' ? 'bg-emerald-500 text-white' : 'bg-neutral-100 text-neutral-600'
              }`}>
                <span className="w-5 h-5 rounded-full bg-current opacity-20"></span>
                Job Description
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
          
          {/* tomiwa: NEW - Profile status indicator */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <CheckCircleIcon className="w-6 h-6 text-emerald-600" />
              <div>
                <h3 className="font-semibold text-emerald-800">Profile Ready</h3>
                <p className="text-emerald-700 text-sm">
                  Using your complete platform profile for analysis • 
                  <Link href="/dashboard/candidate/profile" className="ml-1 underline hover:no-underline">
                    Edit Profile
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* tomiwa: Input Step */}
        {activeStep === 'input' && (
          <div className="space-y-8">
            {/* tomiwa: NEW - Job Source Selection Toggle */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-neutral-900 mb-6 flex items-center gap-2">
                <DocumentTextIcon className="w-6 h-6 text-emerald-600" />
                Select Job Source
              </h2>
              
              {/* tomiwa: Toggle buttons - simplified to two options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <button
                  onClick={() => handleJobSourceChange('custom')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    jobSource === 'custom'
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                      : 'border-neutral-300 bg-white text-neutral-700 hover:border-emerald-300'
                  }`}
                >
                  <div className="text-center">
                    <DocumentTextIcon className="w-8 h-8 mx-auto mb-2" />
                    <h3 className="font-semibold mb-1">Custom Job Description</h3>
                    <p className="text-sm opacity-80">Paste any job description from external sources</p>
                  </div>
                </button>
                
                <button
                  onClick={() => handleJobSourceChange('platform')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    jobSource === 'platform'
                      ? 'border-brand-aqua bg-brand-aqua/10 text-brand-aqua'
                      : 'border-neutral-300 bg-white text-neutral-700 hover:border-brand-aqua/50'
                  }`}
                >
                  <div className="text-center">
                    <BuildingOfficeIcon className="w-8 h-8 mx-auto mb-2" />
                    <h3 className="font-semibold mb-1">Platform Jobs</h3>
                    <p className="text-sm opacity-80">Choose from available jobs on our platform</p>
                  </div>
                </button>
              </div>
            </div>

            {/* tomiwa: Custom Job Input */}
            {jobSource === 'custom' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-neutral-900 mb-4">Enter Job Details</h3>
                
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
            )}

            {/* tomiwa: Platform Jobs Selection */}
            {jobSource === 'platform' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-neutral-900 mb-4">Available Platform Jobs</h3>
                <p className="text-neutral-600 mb-6">Select a job from our platform to analyze your match score</p>
                
                <div className="space-y-4">
                  {platformJobs.map((job) => (
                    <div
                      key={job.id}
                      onClick={() => handlePlatformJobSelect(job)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedPlatformJob?.id === job.id
                          ? 'border-brand-aqua bg-brand-aqua/5'
                          : 'border-neutral-200 hover:border-brand-aqua/50 hover:bg-neutral-50'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-semibold text-neutral-900">{job.title}</h4>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              job.matchScore >= 90 ? 'bg-emerald-100 text-emerald-800' :
                              job.matchScore >= 80 ? 'bg-orange-100 text-orange-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {job.matchScore}% Match
                            </span>
                          </div>
                          <p className="text-brand-aqua font-medium text-sm mb-1">{job.company} • {job.location}</p>
                          <div className="flex flex-wrap gap-2 mb-2">
                            <span className="text-xs bg-neutral-100 text-neutral-700 px-2 py-1 rounded">{job.type}</span>
                            <span className="text-xs bg-neutral-100 text-neutral-700 px-2 py-1 rounded">{job.salary}</span>
                            <span className="text-xs bg-neutral-100 text-neutral-700 px-2 py-1 rounded">{job.posted}</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {job.skills.slice(0, 5).map((skill, index) => (
                              <span key={index} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                {skill}
                              </span>
                            ))}
                            {job.skills.length > 5 && (
                              <span className="text-xs text-neutral-500">+{job.skills.length - 5} more</span>
                            )}
                          </div>
                        </div>
                        {selectedPlatformJob?.id === job.id && (
                          <CheckCircleIcon className="w-6 h-6 text-brand-aqua" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}


            {/* tomiwa: NEW - Candidate Profile Preview (Read-only) */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
                  <UserIcon className="w-6 h-6 text-brand-aqua" />
                  Your Profile Preview
                </h2>
                <Link
                  href="/dashboard/candidate/profile"
                  className="text-sm text-brand-aqua hover:text-brand-orange font-medium transition-colors"
                >
                  Edit Profile →
                </Link>
              </div>
              
              {/* tomiwa: Profile header with photo and basic info */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-6 p-4 bg-gradient-to-r from-brand-aqua/5 to-brand-orange/5 rounded-lg">
                <div className="flex-shrink-0">
                  <img
                    src={candidateProfile.personal.avatar}
                    alt={`${candidateProfile.personal.firstName} ${candidateProfile.personal.lastName}`}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-brand-black mb-1">
                    {candidateProfile.personal.firstName} {candidateProfile.personal.lastName}
                  </h3>
                  <p className="text-brand-aqua font-semibold mb-2">{candidateProfile.personal.title}</p>
                  <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-neutral-600">
                    <span className="flex items-center gap-1">
                      <MapPinIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="truncate max-w-[120px] sm:max-w-none">{candidateProfile.personal.location}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <EnvelopeIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="truncate max-w-[120px] sm:max-w-none">{candidateProfile.personal.email}</span>
                    </span>
                    {candidateProfile.personal.website && (
                      <span className="flex items-center gap-1">
                        <GlobeAltIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="truncate max-w-[120px] sm:max-w-none">{candidateProfile.personal.website}</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* tomiwa: Professional summary */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-neutral-900 mb-3">Professional Summary</h4>
                <p className="text-neutral-700 leading-relaxed bg-neutral-50 p-4 rounded-lg">
                  {candidateProfile.summary}
                </p>
              </div>

              {/* tomiwa: Skills overview - responsive grid */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-neutral-900 mb-3">Skills & Technologies</h4>
                <div className="grid grid-cols-1 
                  sm:grid-cols-1 
                  md:grid-cols-2 
                  lg:grid-cols-2 
                  xl:grid-cols-2 
                  2xl:grid-cols-2 
                  gap-4 md:gap-6">
                  <div>
                    <h5 className="text-sm font-medium text-neutral-700 mb-2">Technical Skills</h5>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {candidateProfile.skills.technical.map((skill, index) => (
                        <span key={index} className="px-2 py-1 sm:px-3 sm:py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs sm:text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-neutral-700 mb-2">Frameworks & Tools</h5>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {candidateProfile.skills.frameworks.concat(candidateProfile.skills.tools).slice(0, 6).map((skill, index) => (
                        <span key={index} className="px-2 py-1 sm:px-3 sm:py-1 bg-blue-100 text-blue-800 rounded-full text-xs sm:text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* tomiwa: Experience highlights */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-neutral-900 mb-3">Recent Experience</h4>
                <div className="space-y-3">
                  {candidateProfile.experience.slice(0, 2).map((exp, index) => (
                    <div key={exp.id} className="border-l-4 border-brand-aqua pl-4 py-2">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                        <h5 className="font-semibold text-neutral-900">{exp.position}</h5>
                        <span className="text-sm text-neutral-600">{exp.startDate} - {exp.endDate}</span>
                      </div>
                      <p className="text-brand-aqua font-medium text-sm mb-1">{exp.company} • {exp.location}</p>
                      <p className="text-neutral-700 text-sm">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* tomiwa: Education */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-neutral-900 mb-3">Education</h4>
                {candidateProfile.education.map((edu, index) => (
                  <div key={edu.id} className="bg-neutral-50 p-4 rounded-lg">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                      <h5 className="font-semibold text-neutral-900">{edu.degree}</h5>
                      <span className="text-sm text-neutral-600">{edu.startDate} - {edu.endDate}</span>
                    </div>
                    <p className="text-brand-aqua font-medium text-sm">{edu.institution} • {edu.location}</p>
                    {edu.gpa && <p className="text-neutral-600 text-sm">GPA: {edu.gpa}</p>}
                  </div>
                ))}
              </div>

              {/* tomiwa: Key achievements */}
              <div>
                <h4 className="text-lg font-semibold text-neutral-900 mb-3">Key Achievements</h4>
                <div className="space-y-2">
                  {candidateProfile.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <TrophyIcon className="w-5 h-5 text-brand-yellow mt-0.5 flex-shrink-0" />
                      <p className="text-neutral-700 text-sm">{achievement}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* tomiwa: Profile completeness indicator */}
              <div className="mt-6 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircleIcon className="w-5 h-5 text-emerald-600" />
                  <span className="font-semibold text-emerald-800">Profile Ready for Analysis</span>
                </div>
                <p className="text-emerald-700 text-sm">
                  Your profile contains all the necessary information for accurate job matching analysis.
                </p>
              </div>
            </div>

            {/* tomiwa: Analyze button - dynamic text based on source */}
            <div className="flex justify-center">
              <button
                onClick={analyzeMatch}
                disabled={!jobDescription.trim() && !selectedPlatformJob}
                className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <SparklesIcon className="w-5 h-5" />
                {jobSource === 'platform' && selectedPlatformJob
                  ? 'Analyze Platform Job Match'
                  : 'Analyze Job Match'
                }
              </button>
            </div>
            
            {/* tomiwa: Selection status indicator */}
            {selectedPlatformJob && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mt-4">
                <div className="flex items-center gap-3">
                  <CheckCircleIcon className="w-5 h-5 text-emerald-600" />
                  <div>
                    <h4 className="font-semibold text-emerald-800">Platform Job Selected</h4>
                    <p className="text-emerald-700 text-sm">
                      {selectedPlatformJob.title} at {selectedPlatformJob.company}
                    </p>
                  </div>
                </div>
              </div>
            )}
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

        {/* tomiwa: UPDATED - Simplified Results Step for better candidate experience */}
        {activeStep === 'results' && analysisResults && (
          <div className="space-y-6">
            
            {/* tomiwa: NEW - Hero Match Score Card - Big, friendly, and celebratory */}
            <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl shadow-lg p-8 text-center text-white">
              {/* tomiwa: Big match percentage with visual ring */}
              <div className="relative inline-flex items-center justify-center mb-4">
                <div className="w-36 h-36 rounded-full bg-white/20 flex items-center justify-center">
                  <div className="w-28 h-28 rounded-full bg-white flex items-center justify-center">
                    <span className="text-5xl font-bold text-primary-600">{analysisResults.overallMatch}%</span>
                  </div>
                </div>
              </div>
              
              {/* tomiwa: Friendly match label based on score */}
              <h2 className="text-2xl font-bold mb-2">
                {analysisResults.overallMatch >= 85 
                  ? "Great Match! You're a strong candidate" 
                  : analysisResults.overallMatch >= 70 
                    ? "Good Match! You have solid potential"
                    : "Fair Match - Some areas to improve"}
              </h2>
              <p className="text-primary-100 text-lg">
                {jobTitle && companyName 
                  ? `For ${jobTitle} at ${companyName}`
                  : 'Based on the job requirements'}
              </p>
            </div>

            {/* tomiwa: NEW - Simple Quick Summary Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-neutral-900 mb-4">Quick Summary</h3>
              
              {/* tomiwa: Simple two-column layout for strengths and gaps */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* tomiwa: Your Strengths */}
                <div className="bg-primary-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircleIcon className="w-5 h-5 text-primary-600" />
                    <h4 className="font-semibold text-primary-800">Your Strengths</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {analysisResults.skillsAnalysis.matching.slice(0, 6).map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-white text-primary-700 rounded-full text-sm border border-primary-200">
                        {skill}
                      </span>
                    ))}
                    {analysisResults.skillsAnalysis.matching.length > 6 && (
                      <span className="px-3 py-1 text-primary-600 text-sm">
                        +{analysisResults.skillsAnalysis.matching.length - 6} more
                      </span>
                    )}
                  </div>
                </div>
                
                {/* tomiwa: Areas to Develop */}
                <div className="bg-accent-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <LightBulbIcon className="w-5 h-5 text-accent-600" />
                    <h4 className="font-semibold text-accent-800">Areas to Develop</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {analysisResults.skillsAnalysis.missing.slice(0, 4).map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-white text-accent-700 rounded-full text-sm border border-accent-200">
                        {skill}
                      </span>
                    ))}
                    {analysisResults.skillsAnalysis.missing.length > 4 && (
                      <span className="px-3 py-1 text-accent-600 text-sm">
                        +{analysisResults.skillsAnalysis.missing.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* tomiwa: NEW - Simple Action Plan Card (combines recommendations) */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-neutral-900 mb-2">Your Action Plan</h3>
              <p className="text-neutral-600 mb-4">Here's what we recommend to boost your chances:</p>
              
              <div className="space-y-3">
                {/* tomiwa: Action item 1 - Apply soon */}
                <div className="flex items-start gap-4 p-4 bg-neutral-50 rounded-lg">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-primary-700 font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-900">Apply Soon</h4>
                    <p className="text-neutral-600 text-sm">
                      Your {analysisResults.applicationStrategy.successProbability}% success rate means you're competitive. {analysisResults.applicationStrategy.timeToApply}.
                    </p>
                  </div>
                </div>
                
                {/* tomiwa: Action item 2 - Top skill to learn */}
                {analysisResults.skillsAnalysis.learningPaths[0] && (
                  <div className="flex items-start gap-4 p-4 bg-neutral-50 rounded-lg">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-primary-700 font-bold text-sm">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-900">
                        Consider Learning {analysisResults.skillsAnalysis.learningPaths[0].skill}
                      </h4>
                      <p className="text-neutral-600 text-sm">
                        This skill is in high demand and could increase your match. 
                        Estimated time: {analysisResults.skillsAnalysis.learningPaths[0].estimatedTime}
                      </p>
                    </div>
                  </div>
                )}
                
                {/* tomiwa: Action item 3 - Cover letter tip */}
                <div className="flex items-start gap-4 p-4 bg-neutral-50 rounded-lg">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-primary-700 font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-900">Highlight in Your Application</h4>
                    <p className="text-neutral-600 text-sm">
                      Focus on: {analysisResults.applicationStrategy.coverLetterFocus.join(', ')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* tomiwa: NEW - Simple Salary Insight (optional expandable) */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-neutral-900">Salary Range</h3>
                <span className="text-sm text-neutral-500">Based on market data</span>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex-1">
                  <div className="h-3 bg-neutral-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary-400 to-primary-600 rounded-full"
                      style={{ width: '75%' }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-2 text-sm">
                    <span className="text-neutral-500">{analysisResults.salaryInsights.range.split('-')[0]}</span>
                    <span className="text-primary-600 font-semibold">Your Level: {analysisResults.salaryInsights.candidateLevel}</span>
                    <span className="text-neutral-500">{analysisResults.salaryInsights.range.split('-')[1]}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* tomiwa: UPDATED - Next Steps with cleaner design */}
            <div className="bg-primary-50 border border-primary-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-neutral-900 mb-2">Ready to Apply?</h3>
              <p className="text-neutral-600 mb-4">Use our AI tools to strengthen your application:</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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
                  className="bg-white border border-primary-300 text-primary-700 font-semibold py-3 px-4 rounded-lg hover:bg-primary-100 hover:border-primary-400 transition-colors text-center"
                >
                  📄 Optimize Resume
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
                  className="bg-white border border-primary-300 text-primary-700 font-semibold py-3 px-4 rounded-lg hover:bg-primary-100 hover:border-primary-400 transition-colors text-center"
                >
                  ✍️ Cover Letter
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
                  className="bg-white border border-primary-300 text-primary-700 font-semibold py-3 px-4 rounded-lg hover:bg-primary-100 hover:border-primary-400 transition-colors text-center"
                >
                  🎤 Practice Interview
                </button>
              </div>
              
              {fromApplication && (
                <div className="mt-4 pt-4 border-t border-primary-200">
                  <button
                    onClick={() => router.push('/dashboard/candidate/applications')}
                    className="text-primary-700 font-medium hover:text-primary-800 transition-colors"
                  >
                    ← Back to Applications
                  </button>
                </div>
              )}
            </div>
            
            {/* tomiwa: UPDATED - Simpler action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => {
                  setActiveStep('input');
                  setAnalysisResults(null);
                  setJobDescription('');
                  setJobTitle('');
                  setCompanyName('');
                  setJobSource('custom');
                  setSelectedPlatformJob(null);
                }}
                className="px-6 py-3 border-2 border-neutral-300 text-neutral-700 font-semibold rounded-lg hover:bg-neutral-50 transition-colors"
              >
                Analyze Another Job
              </button>
              <Link
                href="/dashboard/candidate/ai-tools"
                className="px-6 py-3 border-2 border-brand-aqua text-brand-aqua font-semibold rounded-lg hover:bg-brand-aqua hover:text-white transition-colors text-center"
              >
                Explore More AI Tools
              </Link>
            </div>
          </div>
        )}
      </div>
    </CandidateDashboardLayout>
  );
}
