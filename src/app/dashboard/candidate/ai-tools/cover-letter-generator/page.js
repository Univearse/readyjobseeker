/**
 * File: src/app/dashboard/candidate/ai-tools/cover-letter-generator/page.js
 * 
 * tomiwa: AI Cover Letter Generator Tool
 * Creates personalized, compelling cover letters tailored to specific job postings
 * and company culture with AI-powered content generation.
 * 
 * Features:
 * - Job description analysis
 * - Company research integration
 * - Multiple template styles
 * - Personalization based on experience
 * - Tone adjustment (professional, enthusiastic, etc.)
 * - Real-time preview and editing
 * - Export options (PDF, Word, Text)
 */

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import CandidateDashboardLayout from '@/components/layouts/CandidateDashboardLayout.jsx';
import {
  DocumentTextIcon,
  SparklesIcon,
  BuildingOfficeIcon,
  UserIcon,
  PencilSquareIcon,
  ArrowDownTrayIcon,
  ClipboardDocumentIcon,
  LightBulbIcon,
  CheckCircleIcon,
  ArrowLeftIcon,
  EyeIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';

export default function CoverLetterGenerator() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // tomiwa: State management for cover letter generation
  const [activeStep, setActiveStep] = useState(1); // 1: Input, 2: Generate, 3: Review
  const [formData, setFormData] = useState({
    jobTitle: '',
    companyName: '',
    jobDescription: '',
    hiringManagerName: '',
    yourName: '',
    yourExperience: '',
    keySkills: '',
    whyInterested: '',
    template: 'professional',
    tone: 'professional'
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLetter, setGeneratedLetter] = useState('');
  const [showPreview, setShowPreview] = useState(false);
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
      
      // tomiwa: Auto-populate form with job context
      setFormData(prev => ({
        ...prev,
        jobTitle: jobTitle,
        companyName: company,
        jobDescription: `Position: ${jobTitle} at ${company}. This role requires strong design skills, user-centered thinking, and collaboration with cross-functional teams.`,
        yourName: 'John Doe',
        yourExperience: '4 years of product design experience with expertise in user research, prototyping, and design systems. Led successful redesigns that increased user engagement by 35%.',
        keySkills: 'Figma, Sketch, Adobe Creative Suite, User Research, Prototyping, Design Systems, HTML/CSS, React basics',
        whyInterested: `I am excited about the opportunity to contribute to ${company}'s mission and bring my design expertise to create impactful user experiences.`
      }));
      
      // tomiwa: Auto-generate cover letter when coming from job match workflow
      if (fromJobMatchParam === 'true') {
        // Small delay to ensure form data is set
        setTimeout(() => {
          setIsGenerating(true);
          setActiveStep(2);
          
          // tomiwa: Simulate AI generation with results
          setTimeout(() => {
            setGeneratedLetter(mockCoverLetter);
            setActiveStep(3);
            setIsGenerating(false);
          }, 3000);
        }, 500);
      }
    }
  }, [searchParams]);

  // tomiwa: Template options
  const templates = [
    {
      id: 'professional',
      name: 'Professional',
      description: 'Clean, formal structure perfect for corporate roles',
      preview: 'Traditional format with clear sections and professional tone'
    },
    {
      id: 'creative',
      name: 'Creative',
      description: 'Engaging style for creative and startup positions',
      preview: 'More personality and storytelling approach'
    },
    {
      id: 'technical',
      name: 'Technical',
      description: 'Focused on skills and achievements for tech roles',
      preview: 'Emphasis on technical competencies and project outcomes'
    },
    {
      id: 'executive',
      name: 'Executive',
      description: 'Leadership-focused for senior positions',
      preview: 'Strategic thinking and leadership accomplishments'
    }
  ];

  // tomiwa: Tone options
  const tones = [
    { id: 'professional', name: 'Professional', description: 'Formal and business-appropriate' },
    { id: 'enthusiastic', name: 'Enthusiastic', description: 'Energetic and passionate' },
    { id: 'confident', name: 'Confident', description: 'Assertive and self-assured' },
    { id: 'conversational', name: 'Conversational', description: 'Friendly and approachable' }
  ];

  // tomiwa: Mock generated cover letter
  const mockCoverLetter = `Dear Hiring Manager,

I am writing to express my strong interest in the ${formData.jobTitle || 'Software Engineer'} position at ${formData.companyName || 'TechCorp'}. With over ${formData.yourExperience || '5 years'} of experience in software development, I am excited about the opportunity to contribute to your team's continued success.

In my previous roles, I have developed expertise in ${formData.keySkills || 'React, TypeScript, and AWS'}, which directly aligns with the requirements outlined in your job posting. I am particularly drawn to ${formData.companyName || 'TechCorp'} because of ${formData.whyInterested || 'your commitment to innovation and creating user-centric solutions'}.

Key highlights of my experience include:
• Led development of scalable web applications serving 100K+ users
• Improved system performance by 40% through optimization initiatives  
• Mentored junior developers and fostered collaborative team environments
• Successfully delivered 15+ projects on time and within budget

I am impressed by ${formData.companyName || 'TechCorp'}'s recent achievements and would welcome the opportunity to discuss how my background in software engineering and passion for creating exceptional user experiences can contribute to your team's objectives.

Thank you for considering my application. I look forward to hearing from you soon.

Best regards,
${formData.yourName || 'Your Name'}`;

  // tomiwa: Handle form input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // tomiwa: Generate cover letter
  const handleGenerate = async () => {
    if (!formData.jobTitle || !formData.companyName) {
      alert('Please fill in at least the job title and company name');
      return;
    }

    setIsGenerating(true);
    setActiveStep(2);

    // tomiwa: Simulate AI generation (replace with actual API call)
    setTimeout(() => {
      setGeneratedLetter(mockCoverLetter);
      setActiveStep(3);
      setIsGenerating(false);
    }, 3000);
  };

  // tomiwa: Handle letter editing
  const handleLetterEdit = (newContent) => {
    setGeneratedLetter(newContent);
  };

  return (
    <CandidateDashboardLayout>
      {/* tomiwa: Header with navigation */}
      <div className="bg-gradient-to-r from-brand-orange to-[#D44A1C] -mt-8 -mx-6 mb-8">
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
                <div className="text-4xl">✍️</div>
                <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-display font-bold text-white">
                  AI Cover Letter Generator
                </h1>
              </div>
              <p className="text-white/90 text-base sm:text-lg md:text-lg lg:text-xl leading-relaxed max-w-2xl">
                Create personalized, compelling cover letters that get you noticed by employers
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
                activeStep === 1 ? 'bg-brand-orange text-white' : 
                activeStep > 1 ? 'bg-emerald-500 text-white' : 'bg-neutral-100 text-neutral-600'
              }`}>
                <span className="w-5 h-5 rounded-full bg-current opacity-20"></span>
                Job & Personal Info
              </div>
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${
                activeStep === 2 ? 'bg-brand-orange text-white' : 
                activeStep > 2 ? 'bg-emerald-500 text-white' : 'bg-neutral-100 text-neutral-600'
              }`}>
                <span className="w-5 h-5 rounded-full bg-current opacity-20"></span>
                AI Generation
              </div>
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${
                activeStep === 3 ? 'bg-brand-orange text-white' : 'bg-neutral-100 text-neutral-600'
              }`}>
                <span className="w-5 h-5 rounded-full bg-current opacity-20"></span>
                Review & Download
              </div>
            </div>
          </div>
        </div>

        {/* tomiwa: Step 1 - Input Form */}
        {activeStep === 1 && (
          <div className="space-y-8">
            {/* tomiwa: Job Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-neutral-900 mb-6 flex items-center gap-2">
                <BuildingOfficeIcon className="w-6 h-6 text-brand-orange" />
                Job Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    value={formData.jobTitle}
                    onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                    placeholder="e.g., Software Engineer"
                    className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-brand-orange"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    placeholder="e.g., TechCorp Inc."
                    className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-brand-orange"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Hiring Manager Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.hiringManagerName}
                    onChange={(e) => handleInputChange('hiringManagerName', e.target.value)}
                    placeholder="e.g., Sarah Johnson"
                    className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-brand-orange"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Job Description (Optional)
                  </label>
                  <textarea
                    value={formData.jobDescription}
                    onChange={(e) => handleInputChange('jobDescription', e.target.value)}
                    placeholder="Paste the job description here for better personalization..."
                    rows={4}
                    className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-brand-orange resize-none"
                  />
                </div>
              </div>
            </div>

            {/* tomiwa: Personal Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-neutral-900 mb-6 flex items-center gap-2">
                <UserIcon className="w-6 h-6 text-brand-aqua" />
                Your Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={formData.yourName}
                    onChange={(e) => handleInputChange('yourName', e.target.value)}
                    placeholder="e.g., John Doe"
                    className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-brand-orange"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Years of Experience
                  </label>
                  <input
                    type="text"
                    value={formData.yourExperience}
                    onChange={(e) => handleInputChange('yourExperience', e.target.value)}
                    placeholder="e.g., 5 years"
                    className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-brand-orange"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Key Skills & Technologies
                  </label>
                  <input
                    type="text"
                    value={formData.keySkills}
                    onChange={(e) => handleInputChange('keySkills', e.target.value)}
                    placeholder="e.g., React, TypeScript, AWS, Python"
                    className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-brand-orange"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Why are you interested in this company?
                  </label>
                  <textarea
                    value={formData.whyInterested}
                    onChange={(e) => handleInputChange('whyInterested', e.target.value)}
                    placeholder="e.g., I'm impressed by your commitment to innovation and creating user-centric solutions..."
                    rows={3}
                    className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-brand-orange resize-none"
                  />
                </div>
              </div>
            </div>

            {/* tomiwa: Template & Style Selection */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-neutral-900 mb-6 flex items-center gap-2">
                <Cog6ToothIcon className="w-6 h-6 text-brand-yellow" />
                Template & Style
              </h2>
              
              {/* tomiwa: Template selection */}
              <div className="mb-6">
                <h3 className="font-semibold text-neutral-900 mb-4">Choose Template</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {templates.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => handleInputChange('template', template.id)}
                      className={`p-4 border-2 rounded-lg text-left transition-all ${
                        formData.template === template.id
                          ? 'border-brand-orange bg-brand-orange/5'
                          : 'border-neutral-200 hover:border-brand-orange/50'
                      }`}
                    >
                      <h4 className="font-semibold text-neutral-900 mb-1">{template.name}</h4>
                      <p className="text-sm text-neutral-600 mb-2">{template.description}</p>
                      <p className="text-xs text-neutral-500">{template.preview}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* tomiwa: Tone selection */}
              <div>
                <h3 className="font-semibold text-neutral-900 mb-4">Choose Tone</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {tones.map((tone) => (
                    <button
                      key={tone.id}
                      onClick={() => handleInputChange('tone', tone.id)}
                      className={`p-4 border-2 rounded-lg text-left transition-all ${
                        formData.tone === tone.id
                          ? 'border-brand-orange bg-brand-orange/5'
                          : 'border-neutral-200 hover:border-brand-orange/50'
                      }`}
                    >
                      <h4 className="font-semibold text-neutral-900 mb-1">{tone.name}</h4>
                      <p className="text-sm text-neutral-600">{tone.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* tomiwa: Generate button */}
            <div className="flex justify-center">
              <button
                onClick={handleGenerate}
                disabled={!formData.jobTitle || !formData.companyName}
                className="inline-flex items-center gap-2 px-8 py-4 bg-brand-orange text-white font-semibold rounded-lg hover:bg-[#D44A1C] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <SparklesIcon className="w-5 h-5" />
                Generate Cover Letter
              </button>
            </div>
          </div>
        )}

        {/* tomiwa: Step 2 - Generation */}
        {activeStep === 2 && (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="w-16 h-16 bg-brand-orange/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <SparklesIcon className="w-8 h-8 text-brand-orange animate-pulse" />
            </div>
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">AI is Crafting Your Cover Letter</h2>
            <p className="text-neutral-600 mb-8 max-w-md mx-auto">
              Our AI is analyzing the job requirements and creating a personalized cover letter that highlights your strengths.
            </p>
            <div className="flex justify-center">
              <div className="w-64 bg-neutral-200 rounded-full h-2">
                <div className="bg-brand-orange h-2 rounded-full animate-pulse" style={{ width: '70%' }}></div>
              </div>
            </div>
            <p className="text-sm text-neutral-500 mt-4">This usually takes 30-60 seconds...</p>
          </div>
        )}

        {/* tomiwa: Step 3 - Review & Edit */}
        {activeStep === 3 && generatedLetter && (
          <div className="space-y-8">
            {/* tomiwa: Generated letter */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
                  <DocumentTextIcon className="w-6 h-6 text-brand-orange" />
                  Your AI-Generated Cover Letter
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowPreview(!showPreview)}
                    className="inline-flex items-center gap-2 px-4 py-2 border border-brand-orange text-brand-orange rounded-lg hover:bg-brand-orange hover:text-white transition-colors"
                  >
                    <EyeIcon className="w-4 h-4" />
                    {showPreview ? 'Edit' : 'Preview'}
                  </button>
                </div>
              </div>

              {showPreview ? (
                <div className="bg-neutral-50 rounded-lg p-6">
                  <div className="max-w-2xl mx-auto bg-white p-8 shadow-sm">
                    <pre className="whitespace-pre-wrap text-sm text-neutral-800 leading-relaxed">
                      {generatedLetter}
                    </pre>
                  </div>
                </div>
              ) : (
                <textarea
                  value={generatedLetter}
                  onChange={(e) => handleLetterEdit(e.target.value)}
                  className="w-full h-96 p-4 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-brand-orange resize-none font-mono text-sm"
                />
              )}
            </div>

            {/* tomiwa: AI suggestions */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-bold text-neutral-900 mb-4 flex items-center gap-2">
                <LightBulbIcon className="w-5 h-5 text-brand-yellow" />
                AI Suggestions
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-emerald-50 rounded-lg">
                  <CheckCircleIcon className="w-5 h-5 text-emerald-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-emerald-800">Strong Opening</p>
                    <p className="text-sm text-emerald-700">Your opening paragraph effectively captures attention and states your interest.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                  <LightBulbIcon className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-800">Consider Adding</p>
                    <p className="text-sm text-blue-700">You might want to mention a specific company achievement or recent news to show research.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
                  <SparklesIcon className="w-5 h-5 text-orange-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-orange-800">Personalization Score: 85%</p>
                    <p className="text-sm text-orange-700">Great job personalizing for this specific role and company!</p>
                  </div>
                </div>
              </div>
            </div>

            {/* tomiwa: Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  setActiveStep(1);
                  setGeneratedLetter('');
                }}
                className="px-6 py-3 border-2 border-neutral-300 text-neutral-700 font-semibold rounded-lg hover:bg-neutral-50 transition-colors"
              >
                Create Another Letter
              </button>
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-brand-orange text-white font-semibold rounded-lg hover:bg-[#D44A1C] transition-colors">
                <ArrowDownTrayIcon className="w-5 h-5" />
                Download as PDF
              </button>
              <button className="px-6 py-3 border-2 border-brand-orange text-brand-orange font-semibold rounded-lg hover:bg-brand-orange hover:text-white transition-colors">
                Copy to Clipboard
              </button>
            </div>
          </div>
        )}
      </div>
    </CandidateDashboardLayout>
  );
}
