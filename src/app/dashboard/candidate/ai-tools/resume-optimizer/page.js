/**
 * File: src/app/dashboard/candidate/ai-tools/resume-optimizer/page.js
 * 
 * tomiwa: AI Resume Optimizer Tool
 * Analyzes and improves resumes for specific jobs with AI-powered suggestions,
 * keyword optimization, and ATS compatibility checks.
 * 
 * Features:
 * - Upload resume or paste text
 * - Job description analysis
 * - ATS compatibility scoring
 * - Keyword optimization suggestions
 * - Skills gap analysis
 * - Formatting recommendations
 * - Download optimized resume
 */

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import CandidateDashboardLayout from '@/components/layouts/CandidateDashboardLayout.jsx';
import {
  DocumentTextIcon,
  SparklesIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowDownTrayIcon,
  ClipboardDocumentIcon,
  LightBulbIcon,
  ChartBarIcon,
  TagIcon,
  AcademicCapIcon,
  BoltIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';

export default function ResumeOptimizer() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // tomiwa: State management for the resume optimizer
  const [activeTab, setActiveTab] = useState('upload'); // 'upload', 'analyze', 'results'
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [showOptimizedVersion, setShowOptimizedVersion] = useState(false);
  const [jobContext, setJobContext] = useState(null);
  const [fromJobMatch, setFromJobMatch] = useState(false);

  // tomiwa: Load job context from URL parameters
  useEffect(() => {
    const jobId = searchParams.get('jobId');
    const jobTitle = searchParams.get('jobTitle');
    const company = searchParams.get('company');
    const matchScore = searchParams.get('matchScore');
    const fromJobMatchParam = searchParams.get('fromJobMatch');
    
    if (jobId && jobTitle && company) {
      setJobContext({
        jobId,
        jobTitle,
        company,
        matchScore: matchScore ? parseInt(matchScore) : null
      });
      setFromJobMatch(fromJobMatchParam === 'true');
      
      // tomiwa: Auto-populate with job-specific description
      setJobDescription(`Optimize resume for ${jobTitle} position at ${company}. Focus on relevant skills and experience that match the job requirements.`);
      
      // tomiwa: Auto-populate with mock resume for demo
      const resumeContent = `John Doe
Product Designer | UX/UI Specialist

Contact Information:
Email: john.doe@email.com
Phone: (555) 123-4567
Location: San Francisco, CA
LinkedIn: linkedin.com/in/johndoe
Portfolio: johndoe.design

Professional Summary:
Creative and detail-oriented Product Designer with 4 years of experience designing user-centered digital products. Proven track record of increasing user engagement through intuitive interface design and comprehensive user research. Expertise in design systems, prototyping, and cross-functional collaboration.

Experience:

Senior Product Designer | TechStart Inc. | 2022 - Present
• Led design for mobile app redesign that increased user retention by 35%
• Created and maintained design system used across 5 product teams
• Conducted user research sessions with 100+ participants
• Collaborated with engineering teams to ensure design feasibility

Product Designer | Digital Solutions Co. | 2020 - 2022
• Designed responsive web applications for e-commerce clients
• Improved checkout flow conversion rate by 28% through A/B testing
• Created wireframes, prototypes, and high-fidelity mockups
• Worked closely with product managers to define feature requirements

Junior UX Designer | StartupXYZ | 2019 - 2020
• Assisted in user interface design for SaaS platform
• Conducted usability testing and compiled research findings
• Created user personas and journey maps
• Supported senior designers in design system development

Education:
Bachelor of Fine Arts in Graphic Design | Art Institute of California | 2019
Minor in Computer Science

Skills:
• Design Tools: Figma, Sketch, Adobe Creative Suite, InVision, Principle
• Frontend: HTML, CSS, JavaScript (basic), React (basic)
• Research: User interviews, usability testing, A/B testing, analytics
• Collaboration: Agile/Scrum, Jira, Slack, cross-functional teamwork
• Design Systems: Component libraries, style guides, design tokens

Certifications:
• Google UX Design Certificate (2023)
• Figma Advanced Certification (2022)

Awards:
• Best Design Award - TechCrunch Disrupt 2023
• Employee of the Month - TechStart Inc. (3 times)

Projects:
• E-commerce Mobile App: Led complete redesign resulting in 40% increase in mobile sales
• SaaS Dashboard: Created intuitive admin interface reducing support tickets by 25%
• Design System: Built comprehensive component library adopted company-wide`;

      setResumeText(resumeContent);
      
      // tomiwa: Auto-start analysis when coming from job match analyzer
      if (fromJobMatchParam === 'true') {
        // Small delay to ensure state is set
        setTimeout(() => {
          setIsAnalyzing(true);
          setActiveTab('analyze');
          
          // tomiwa: Simulate AI analysis with results
          setTimeout(() => {
            setAnalysisResults(mockAnalysisResults);
            setActiveTab('results');
            setIsAnalyzing(false);
          }, 3000);
        }, 500);
      }
    }
  }, [searchParams]);

  // tomiwa: Mock analysis results (in real app, this would come from AI API)
  const mockAnalysisResults = {
    atsScore: 87,
    overallScore: 92,
    keywordMatch: 78,
    sections: {
      contact: { score: 95, status: 'excellent', feedback: 'Contact information is complete and professional' },
      summary: { score: 85, status: 'good', feedback: 'Summary is strong but could include more keywords' },
      experience: { score: 90, status: 'excellent', feedback: 'Experience section is well-structured with quantified achievements' },
      skills: { score: 75, status: 'needs_improvement', feedback: 'Skills section missing some key technical skills' },
      education: { score: 88, status: 'good', feedback: 'Education section is properly formatted' }
    },
    suggestions: [
      {
        type: 'keyword',
        priority: 'high',
        title: 'Add Missing Keywords',
        description: 'Include "React", "TypeScript", and "AWS" to match job requirements',
        impact: '+12% match score'
      },
      {
        type: 'formatting',
        priority: 'medium',
        title: 'Improve ATS Formatting',
        description: 'Use standard section headers and bullet points for better parsing',
        impact: '+8% ATS score'
      },
      {
        type: 'content',
        priority: 'high',
        title: 'Quantify Achievements',
        description: 'Add specific numbers and metrics to your accomplishments',
        impact: '+15% impact score'
      },
      {
        type: 'skills',
        priority: 'medium',
        title: 'Skills Organization',
        description: 'Group technical skills by category for better readability',
        impact: '+5% readability'
      }
    ],
    missingKeywords: ['React', 'TypeScript', 'AWS', 'Agile', 'REST API'],
    strongPoints: ['Quantified achievements', 'Relevant experience', 'Professional formatting'],
    optimizedResume: `JOHN DOE
Software Engineer

CONTACT INFORMATION
Email: john.doe@email.com
Phone: (555) 123-4567
LinkedIn: linkedin.com/in/johndoe
Location: San Francisco, CA

PROFESSIONAL SUMMARY
Experienced Software Engineer with 5+ years developing scalable web applications using React, TypeScript, and AWS. Led cross-functional teams to deliver 15+ projects, improving user engagement by 40% and reducing load times by 35%. Passionate about creating efficient, user-centric solutions in Agile environments.

TECHNICAL SKILLS
Frontend: React, TypeScript, JavaScript, HTML5, CSS3, Redux
Backend: Node.js, Python, REST API, GraphQL
Cloud & DevOps: AWS, Docker, CI/CD, Git
Databases: PostgreSQL, MongoDB, Redis

PROFESSIONAL EXPERIENCE
Senior Software Engineer | TechCorp Inc. | 2021 - Present
• Developed and maintained 8 React applications serving 100K+ daily active users
• Implemented TypeScript migration reducing bugs by 45% and improving code maintainability
• Architected AWS infrastructure supporting 99.9% uptime and handling 1M+ requests/day
• Led Agile development team of 6 engineers, delivering projects 20% faster than industry average

Software Engineer | StartupXYZ | 2019 - 2021
• Built responsive web applications using React and REST APIs, increasing user retention by 30%
• Optimized database queries and implemented caching, reducing page load times by 50%
• Collaborated with UX team to implement user-friendly interfaces, improving satisfaction scores by 25%

EDUCATION
Bachelor of Science in Computer Science | University of California | 2019
Relevant Coursework: Data Structures, Algorithms, Software Engineering, Database Systems`
  };

  // tomiwa: Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
      // tomiwa: In real app, would extract text from PDF/DOC
      setResumeText('Sample resume text extracted from uploaded file...');
    }
  };

  // tomiwa: Handle resume analysis
  const handleAnalyze = async () => {
    if (!resumeText && !uploadedFile) {
      alert('Please upload a resume or paste your resume text');
      return;
    }

    setIsAnalyzing(true);
    setActiveTab('analyze');

    // tomiwa: Simulate AI analysis (replace with actual API call)
    setTimeout(() => {
      setAnalysisResults(mockAnalysisResults);
      setActiveTab('results');
      setIsAnalyzing(false);
    }, 3000);
  };

  // tomiwa: Get status color based on score
  const getStatusColor = (status) => {
    switch (status) {
      case 'excellent': return 'text-emerald-600 bg-emerald-50';
      case 'good': return 'text-blue-600 bg-blue-50';
      case 'needs_improvement': return 'text-orange-600 bg-orange-50';
      default: return 'text-neutral-600 bg-neutral-50';
    }
  };

  // tomiwa: Get priority color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-neutral-600 bg-neutral-50 border-neutral-200';
    }
  };

  return (
    <CandidateDashboardLayout>
      {/* tomiwa: Job Context Banner */}
      {fromJobMatch && jobContext && (
        <div className="bg-gradient-to-r from-brand-yellow to-brand-orange -mt-8 -mx-6 mb-4">
          <div className="px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <DocumentTextIcon className="w-5 h-5 text-brand-black" />
                </div>
                <div>
                  <h2 className="font-bold text-brand-black">Optimizing Resume</h2>
                  <p className="text-brand-black/80 text-sm">
                    For {jobContext.jobTitle} at {jobContext.company}
                    {jobContext.matchScore && (
                      <span className="ml-2 px-2 py-1 bg-white/20 rounded text-xs">
                        {jobContext.matchScore}% match
                      </span>
                    )}
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
      <div className="bg-gradient-to-r from-brand-aqua to-[#0C5B65] -mt-8 -mx-6 mb-8">
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
                <div className="text-4xl">📄</div>
                <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-display font-bold text-white">
                  AI Resume Optimizer
                </h1>
              </div>
              <p className="text-[#D9E5E6] text-base sm:text-lg md:text-lg lg:text-xl leading-relaxed max-w-2xl">
                Get your resume ATS-ready and optimized for your target job with AI-powered analysis
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
                activeTab === 'upload' ? 'bg-brand-aqua text-white' : 'bg-neutral-100 text-neutral-600'
              }`}>
                <span className="w-5 h-5 rounded-full bg-current opacity-20"></span>
                Upload Resume
              </div>
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${
                activeTab === 'analyze' ? 'bg-brand-orange text-white' : 
                activeTab === 'results' ? 'bg-emerald-500 text-white' : 'bg-neutral-100 text-neutral-600'
              }`}>
                <span className="w-5 h-5 rounded-full bg-current opacity-20"></span>
                AI Analysis
              </div>
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${
                activeTab === 'results' ? 'bg-brand-aqua text-white' : 'bg-neutral-100 text-neutral-600'
              }`}>
                <span className="w-5 h-5 rounded-full bg-current opacity-20"></span>
                Results & Optimization
              </div>
            </div>
          </div>
        </div>

        {/* tomiwa: Upload Tab */}
        {activeTab === 'upload' && (
          <div className="space-y-8">
            {/* tomiwa: Upload section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-neutral-900 mb-4 flex items-center gap-2">
                <DocumentTextIcon className="w-6 h-6 text-brand-aqua" />
                Upload Your Resume
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* tomiwa: File upload */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-neutral-900">Upload Resume File</h3>
                  <div className="border-2 border-dashed border-neutral-300 rounded-lg p-6 text-center hover:border-brand-aqua transition-colors">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="resume-upload"
                    />
                    <label htmlFor="resume-upload" className="cursor-pointer">
                      <div className="w-12 h-12 bg-brand-aqua/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <ArrowDownTrayIcon className="w-6 h-6 text-brand-aqua" />
                      </div>
                      <p className="text-neutral-700 font-medium mb-1">Click to upload resume</p>
                      <p className="text-sm text-neutral-500">PDF, DOC, or DOCX (Max 5MB)</p>
                    </label>
                  </div>
                  {uploadedFile && (
                    <div className="flex items-center gap-2 p-3 bg-emerald-50 rounded-lg">
                      <CheckCircleIcon className="w-5 h-5 text-emerald-600" />
                      <span className="text-sm text-emerald-700">{uploadedFile.name}</span>
                    </div>
                  )}
                </div>

                {/* tomiwa: Text paste */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-neutral-900">Or Paste Resume Text</h3>
                  <textarea
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                    placeholder="Paste your resume text here..."
                    className="w-full h-48 p-4 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-aqua focus:border-brand-aqua resize-none"
                  />
                </div>
              </div>
            </div>

            {/* tomiwa: Job description section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-neutral-900 mb-4 flex items-center gap-2">
                <ClipboardDocumentIcon className="w-6 h-6 text-brand-orange" />
                Target Job Description (Optional)
              </h2>
              <p className="text-neutral-600 mb-4">
                Paste the job description you're applying for to get personalized optimization suggestions.
              </p>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here for better optimization..."
                className="w-full h-32 p-4 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-aqua focus:border-brand-aqua resize-none"
              />
            </div>

            {/* tomiwa: Action button */}
            <div className="flex justify-center">
              <button
                onClick={handleAnalyze}
                disabled={!resumeText && !uploadedFile}
                className="inline-flex items-center gap-2 px-8 py-4 bg-brand-aqua text-white font-semibold rounded-lg hover:bg-[#0C5B65] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <SparklesIcon className="w-5 h-5" />
                Analyze Resume with AI
              </button>
            </div>
          </div>
        )}

        {/* tomiwa: Analysis Tab */}
        {activeTab === 'analyze' && (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="w-16 h-16 bg-brand-orange/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <SparklesIcon className="w-8 h-8 text-brand-orange animate-pulse" />
            </div>
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">AI is Analyzing Your Resume</h2>
            <p className="text-neutral-600 mb-8 max-w-md mx-auto">
              Our AI is examining your resume for ATS compatibility, keyword optimization, and improvement opportunities.
            </p>
            <div className="flex justify-center">
              <div className="w-64 bg-neutral-200 rounded-full h-2">
                <div className="bg-brand-orange h-2 rounded-full animate-pulse" style={{ width: '70%' }}></div>
              </div>
            </div>
            <p className="text-sm text-neutral-500 mt-4">This usually takes 30-60 seconds...</p>
          </div>
        )}

        {/* tomiwa: Results Tab */}
        {activeTab === 'results' && analysisResults && (
          <div className="space-y-8">
            {/* tomiwa: Score overview */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-neutral-900 mb-6 flex items-center gap-2">
                <ChartBarIcon className="w-6 h-6 text-brand-aqua" />
                Resume Analysis Results
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="text-center p-4 bg-brand-aqua/5 rounded-lg">
                  <div className="text-3xl font-bold text-brand-aqua mb-1">{analysisResults.atsScore}%</div>
                  <div className="text-sm text-neutral-600">ATS Compatibility</div>
                </div>
                <div className="text-center p-4 bg-emerald-50 rounded-lg">
                  <div className="text-3xl font-bold text-emerald-600 mb-1">{analysisResults.overallScore}%</div>
                  <div className="text-sm text-neutral-600">Overall Score</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-3xl font-bold text-orange-600 mb-1">{analysisResults.keywordMatch}%</div>
                  <div className="text-sm text-neutral-600">Keyword Match</div>
                </div>
              </div>

              {/* tomiwa: Section scores */}
              <div className="space-y-3">
                <h3 className="font-semibold text-neutral-900">Section Analysis</h3>
                {Object.entries(analysisResults.sections).map(([section, data]) => (
                  <div key={section} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="capitalize font-medium text-neutral-900">{section}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(data.status)}`}>
                        {data.status.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-neutral-900">{data.score}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* tomiwa: Improvement suggestions */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-neutral-900 mb-6 flex items-center gap-2">
                <LightBulbIcon className="w-6 h-6 text-brand-yellow" />
                AI Improvement Suggestions
              </h2>
              
              <div className="space-y-4">
                {analysisResults.suggestions.map((suggestion, index) => (
                  <div key={index} className={`p-4 rounded-lg border ${getPriorityColor(suggestion.priority)}`}>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-neutral-900">{suggestion.title}</h3>
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-current text-white opacity-80">
                        {suggestion.priority} priority
                      </span>
                    </div>
                    <p className="text-neutral-700 mb-2">{suggestion.description}</p>
                    <div className="text-sm font-medium text-emerald-600">{suggestion.impact}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* tomiwa: Keywords analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-semibold text-neutral-900 mb-4 flex items-center gap-2">
                  <TagIcon className="w-5 h-5 text-red-500" />
                  Missing Keywords
                </h3>
                <div className="flex flex-wrap gap-2">
                  {analysisResults.missingKeywords.map((keyword, index) => (
                    <span key={index} className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-sm">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-semibold text-neutral-900 mb-4 flex items-center gap-2">
                  <CheckCircleIcon className="w-5 h-5 text-emerald-500" />
                  Strong Points
                </h3>
                <div className="space-y-2">
                  {analysisResults.strongPoints.map((point, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircleIcon className="w-4 h-4 text-emerald-500" />
                      <span className="text-sm text-neutral-700">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* tomiwa: Optimized resume preview */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
                  <BoltIcon className="w-6 h-6 text-brand-aqua" />
                  AI-Optimized Resume
                </h2>
                <button
                  onClick={() => setShowOptimizedVersion(!showOptimizedVersion)}
                  className="px-4 py-2 bg-brand-aqua text-white rounded-lg hover:bg-[#0C5B65] transition-colors"
                >
                  {showOptimizedVersion ? 'Hide' : 'Show'} Optimized Version
                </button>
              </div>

              {showOptimizedVersion && (
                <div className="space-y-4">
                  <div className="bg-neutral-50 rounded-lg p-6">
                    <pre className="whitespace-pre-wrap text-sm text-neutral-800 font-mono">
                      {analysisResults.optimizedResume}
                    </pre>
                  </div>
                  
                  <div className="flex gap-3">
                    <button className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-aqua text-white font-semibold rounded-lg hover:bg-[#0C5B65] transition-colors">
                      <ArrowDownTrayIcon className="w-5 h-5" />
                      Download Optimized Resume
                    </button>
                    <button className="px-6 py-3 border-2 border-brand-aqua text-brand-aqua font-semibold rounded-lg hover:bg-brand-aqua hover:text-white transition-colors">
                      Copy to Clipboard
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* tomiwa: Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  setActiveTab('upload');
                  setAnalysisResults(null);
                  setResumeText('');
                  setJobDescription('');
                  setUploadedFile(null);
                }}
                className="px-6 py-3 border-2 border-neutral-300 text-neutral-700 font-semibold rounded-lg hover:bg-neutral-50 transition-colors"
              >
                Analyze Another Resume
              </button>
              <Link
                href="/dashboard/candidate/ai-tools"
                className="px-6 py-3 bg-brand-aqua text-white font-semibold rounded-lg hover:bg-[#0C5B65] transition-colors text-center"
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
