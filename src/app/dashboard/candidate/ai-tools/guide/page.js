/**
 * File: src/app/dashboard/candidate/ai-tools/guide/page.js
 * 
 * tomiwa: Comprehensive AI Tool Guide for Candidates
 * Educational resource covering AI tool usage, industry ethics, and best practices
 * 
 * Features:
 * - How to effectively use each AI tool
 * - Industry ethics and responsible AI usage
 * - Data verification and cross-checking techniques
 * - Best practices for AI-assisted job searching
 * - Common pitfalls and how to avoid them
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import CandidateDashboardLayout from '@/components/layouts/CandidateDashboardLayout.jsx';
import {
  BookOpenIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  LightBulbIcon,
  AcademicCapIcon,
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
  MagnifyingGlassIcon,
  ClipboardDocumentListIcon,
  BeakerIcon,
  ArrowLeftIcon,
  ChevronDownIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

export default function AIToolGuide() {
  // tomiwa: State for expandable sections
  const [expandedSections, setExpandedSections] = useState({});

  // tomiwa: Toggle section expansion
  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  // tomiwa: Guide sections data
  const guideSections = [
    {
      id: 'getting-started',
      title: 'Getting Started with AI Tools',
      icon: <BookOpenIcon className="w-6 h-6" />,
      color: 'brand-aqua',
      content: [
        {
          subtitle: 'Understanding AI-Powered Job Search',
          points: [
            'AI tools analyze patterns in successful job applications and provide data-driven recommendations',
            'They help optimize your materials for Applicant Tracking Systems (ATS) used by 98% of Fortune 500 companies',
            'AI provides personalized feedback based on industry standards and current market trends',
            'These tools complement, not replace, your personal judgment and unique value proposition'
          ]
        },
        {
          subtitle: 'Recommended Tool Usage Order',
          points: [
            '1. Start with Resume Optimizer to ensure ATS compatibility',
            '2. Use Job & Skills Match Analyzer to identify skill gaps',
            '3. Generate tailored cover letters with Cover Letter Generator',
            '4. Practice with Interview Simulator before important interviews',
            '5. Track applications with Application Tracker for insights',
            '6. Prepare for assessments with Aptitude Test Assistant'
          ]
        }
      ]
    },
    {
      id: 'tool-specific-guides',
      title: 'Tool-Specific Usage Guides',
      icon: <AcademicCapIcon className="w-6 h-6" />,
      color: 'brand-orange',
      content: [
        {
          subtitle: 'Resume Optimizer Best Practices',
          points: [
            'Upload your most recent resume version for accurate analysis',
            'Review keyword suggestions but ensure they match your actual experience',
            'Pay attention to formatting recommendations for ATS compatibility',
            'Don\'t over-optimize - maintain readability for human reviewers',
            'Update your resume iteratively based on feedback from different job applications'
          ]
        },
        {
          subtitle: 'Cover Letter Generator Guidelines',
          points: [
            'Provide specific job descriptions for more targeted letters',
            'Customize the generated content with your personal experiences',
            'Always fact-check company information and role details',
            'Use the generated letter as a starting point, not a final product',
            'Maintain your authentic voice while incorporating AI suggestions'
          ]
        },
        {
          subtitle: 'Interview Simulator Strategies',
          points: [
            'Practice with questions specific to your target role and industry',
            'Record yourself to review body language and speaking pace',
            'Focus on STAR method (Situation, Task, Action, Result) for behavioral questions',
            'Use feedback to identify patterns in your responses',
            'Practice multiple times with different question sets'
          ]
        },
        {
          subtitle: 'Job & Skills Match Analyzer Tips',
          points: [
            'Upload complete and updated resume for accurate skill assessment',
            'Paste full job descriptions to get comprehensive match analysis',
            'Focus on developing skills with highest impact on your target roles',
            'Use learning path recommendations to create a structured development plan',
            'Track your progress over time to see improvement in match percentages'
          ]
        },
        {
          subtitle: 'Smart Application Tracker Usage',
          points: [
            'Input all application details immediately after applying',
            'Set up follow-up reminders based on AI recommendations',
            'Review success analytics to identify patterns in successful applications',
            'Use rejection insights to improve future applications',
            'Track response rates to optimize your application strategy'
          ]
        },
        {
          subtitle: 'Aptitude Test Assistant Preparation',
          points: [
            'Take diagnostic tests first to identify your baseline performance',
            'Focus practice sessions on your weakest areas for maximum improvement',
            'Use timed practice mode to simulate real test conditions',
            'Review detailed explanations for incorrect answers to understand concepts',
            'Track your progress and adjust study schedule based on performance analytics'
          ]
        }
      ]
    },
    {
      id: 'ethics-responsibility',
      title: 'AI Ethics & Responsible Usage',
      icon: <ShieldCheckIcon className="w-6 h-6" />,
      color: 'brand-yellow',
      content: [
        {
          subtitle: 'Transparency in AI Usage',
          points: [
            'Be honest about AI assistance when directly asked by employers',
            'Don\'t claim AI-generated content as entirely your own original work',
            'Understand that AI tools are aids, not replacements for your skills and experience',
            'Maintain authenticity in your personal brand and communication style'
          ]
        },
        {
          subtitle: 'Avoiding Over-Reliance',
          points: [
            'Use AI suggestions as starting points, not final answers',
            'Develop your own skills alongside using AI tools',
            'Don\'t let AI replace critical thinking and personal judgment',
            'Maintain the ability to perform tasks without AI assistance'
          ]
        },
        {
          subtitle: 'Privacy & Data Security',
          points: [
            'Review privacy policies of AI tools before uploading sensitive information',
            'Avoid sharing confidential company information in AI prompts',
            'Use generic examples when possible instead of specific company data',
            'Regularly review and delete stored data in AI platforms'
          ]
        }
      ]
    },
    {
      id: 'data-verification',
      title: 'Data Verification & Cross-Checking',
      icon: <MagnifyingGlassIcon className="w-6 h-6" />,
      color: 'emerald-600',
      content: [
        {
          subtitle: 'Fact-Checking AI Outputs',
          points: [
            'Verify company information, job requirements, and industry trends independently',
            'Cross-reference salary data with multiple sources (Glassdoor, PayScale, LinkedIn)',
            'Check job posting details directly on company websites',
            'Validate skill requirements against current job market demands'
          ]
        },
        {
          subtitle: 'Information Sources to Trust',
          points: [
            'Official company websites and career pages',
            'Professional networking platforms (LinkedIn)',
            'Industry-specific job boards and publications',
            'Government labor statistics and reports',
            'Professional associations and certification bodies'
          ]
        },
        {
          subtitle: 'Red Flags to Watch For',
          points: [
            'Outdated salary information or job market data',
            'Generic advice that doesn\'t match your specific industry',
            'Recommendations that seem too good to be true',
            'Advice that contradicts established industry practices'
          ]
        }
      ]
    },
    {
      id: 'best-practices',
      title: 'Best Practices & Common Pitfalls',
      icon: <LightBulbIcon className="w-6 h-6" />,
      color: 'purple-600',
      content: [
        {
          subtitle: 'Maximizing AI Tool Effectiveness',
          points: [
            'Provide detailed, accurate input information for better outputs',
            'Iterate and refine based on AI feedback and real-world results',
            'Combine multiple tools for comprehensive job search strategy',
            'Keep track of what works and what doesn\'t for your specific situation',
            'Stay updated with tool improvements and new features'
          ]
        },
        {
          subtitle: 'Common Mistakes to Avoid',
          points: [
            'Don\'t copy-paste AI content without customization',
            'Avoid using the same AI-generated cover letter for multiple applications',
            'Don\'t ignore human feedback in favor of AI recommendations',
            'Avoid over-optimizing to the point of losing authenticity',
            'Don\'t rely solely on AI for career decisions'
          ]
        },
        {
          subtitle: 'Balancing AI and Human Insight',
          points: [
            'Seek feedback from mentors, peers, and industry professionals',
            'Join professional communities and networking groups',
            'Attend industry events and informational interviews',
            'Consider working with career coaches for personalized guidance',
            'Trust your instincts when AI recommendations don\'t feel right'
          ]
        }
      ]
    },
    {
      id: 'staying-current',
      title: 'Staying Current with AI Developments',
      icon: <BeakerIcon className="w-6 h-6" />,
      color: 'blue-600',
      content: [
        {
          subtitle: 'Following AI Trends in Recruitment',
          points: [
            'Subscribe to HR and recruitment technology publications',
            'Follow thought leaders in AI and recruitment on social media',
            'Attend webinars and conferences on AI in hiring',
            'Join professional groups focused on recruitment technology'
          ]
        },
        {
          subtitle: 'Adapting to New Tools and Features',
          points: [
            'Regularly explore new features in existing AI tools',
            'Test new AI platforms as they become available',
            'Share experiences and learn from other job seekers',
            'Stay informed about changes in ATS systems and requirements'
          ]
        }
      ]
    }
  ];

  return (
    <CandidateDashboardLayout>
      {/* tomiwa: UPDATED - Uniform Hero Banner matching AI Tools design */}
      {/* updated: Back navigation moved inside gradient for uniform design */}
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
                AI Tool Usage Guide
              </h1>
              {/* tomiwa: Subtitle in uniform style */}
              <p className="text-[#D9E5E6] text-base 
                           sm:text-lg 
                           md:text-lg 
                           lg:text-xl 
                           leading-relaxed max-w-2xl">
                Master the art of AI-assisted job searching with our comprehensive guide covering best practices, ethics, and data verification techniques
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* tomiwa: Main content */}
      <div className="px-6 
                      sm:px-8 
                      md:px-10 
                      lg:px-12 
                      xl:px-16 
                      2xl:px-20 
                      pb-12">


        {/* tomiwa: Guide sections */}
        <div className="space-y-6">
          {guideSections.map((section) => (
            <div key={section.id} className="bg-white rounded-lg shadow-sm border border-neutral-100 overflow-hidden">
              {/* tomiwa: Section header */}
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between p-6 hover:bg-neutral-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 bg-${section.color}/10 rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <div className={`text-${section.color}`}>
                      {section.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-display font-bold text-neutral-900 text-left">
                    {section.title}
                  </h3>
                </div>
                <div className="text-neutral-400">
                  {expandedSections[section.id] ? (
                    <ChevronDownIcon className="w-5 h-5" />
                  ) : (
                    <ChevronRightIcon className="w-5 h-5" />
                  )}
                </div>
              </button>

              {/* tomiwa: Section content */}
              {expandedSections[section.id] && (
                <div className="px-6 pb-6">
                  <div className="pl-16 space-y-6">
                    {section.content.map((subsection, index) => (
                      <div key={index}>
                        <h4 className="text-base font-semibold text-neutral-800 mb-3">
                          {subsection.subtitle}
                        </h4>
                        <ul className="space-y-2">
                          {subsection.points.map((point, pointIndex) => (
                            <li key={pointIndex} className="flex items-start gap-3 text-sm text-neutral-600">
                              <CheckCircleIcon className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                              <span className="leading-relaxed">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* tomiwa: Important reminders section */}
        <div className="mt-8 bg-amber-50 border border-amber-200 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <ExclamationTriangleIcon className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-display font-bold text-amber-900 mb-3">
                Important Reminders
              </h3>
              <ul className="space-y-2 text-sm text-amber-800">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-amber-600 rounded-full flex-shrink-0 mt-2"></span>
                  <span>AI tools are assistants, not replacements for your skills and judgment</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-amber-600 rounded-full flex-shrink-0 mt-2"></span>
                  <span>Always verify AI-generated information with reliable sources</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-amber-600 rounded-full flex-shrink-0 mt-2"></span>
                  <span>Maintain authenticity in your applications and interviews</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-amber-600 rounded-full flex-shrink-0 mt-2"></span>
                  <span>Stay updated with industry trends and AI tool developments</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* tomiwa: Call to action */}
        <div className="mt-8 bg-gradient-to-br from-brand-black to-brand-black/90 text-white rounded-lg p-6 sm:p-8">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-xl font-display font-bold text-white mb-3">
              Ready to Start Your AI-Powered Job Search?
            </h3>
            <p className="text-white/80 mb-6 leading-relaxed">
              Now that you understand how to use AI tools responsibly and effectively, 
              it's time to put this knowledge into practice.
            </p>
            <Link
              href="/dashboard/candidate/ai-tools"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-aqua text-white font-semibold rounded-lg hover:bg-brand-aqua/90 transition-colors"
            >
              <AcademicCapIcon className="w-5 h-5" />
              Explore AI Tools
            </Link>
          </div>
        </div>
      </div>
    </CandidateDashboardLayout>
  );
}
