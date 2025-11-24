import React from 'react';
import Link from 'next/link';

// tomiwa: Simplified learn page for AI Assessment Generator - clean and consistent with other tools
export default function AssessmentGeneratorLearn() {
  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white">
      {/* tomiwa: Back navigation - consistent with other learn pages */}
        <Link 
          href="/dashboard/employer/ai-tools/assessment-generator"
        className="inline-flex items-center text-[#36D0D8] hover:text-[#EF522E] mb-8 font-medium transition-colors"
        >
        <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Assessment Generator
        </Link>
        
      {/* tomiwa: Hero section with clean intro */}
      <div className="mb-12">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-[#36D0D8]/10 flex items-center justify-center">
            <span className="text-2xl">🎯</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl text-[#021126]">
            AI Assessment Generator
          </h1>
        </div>
        <p className="text-neutral-600 text-lg max-w-3xl leading-relaxed">
          Create intelligent, fair, and comprehensive assessments that help you identify the best candidates for your roles. Generate role-specific questions with AI-powered grading and detailed analytics.
        </p>
      </div>

      {/* tomiwa: Key features section - simplified to 3 main features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="p-6 rounded-xl bg-[#36D0D8]/5 border border-[#36D0D8]/10">
          <div className="w-12 h-12 rounded-xl bg-[#36D0D8]/10 flex items-center justify-center mb-4">
            <span className="text-2xl">🤖</span>
          </div>
          <h3 className="font-display text-xl text-[#021126] mb-3">Smart Question Generation</h3>
          <p className="text-neutral-600">
            AI automatically creates role-specific questions based on job requirements, industry standards, and skill levels with 95%+ accuracy.
            </p>
          </div>
          
        <div className="p-6 rounded-xl bg-[#FDD140]/5 border border-[#FDD140]/10">
          <div className="w-12 h-12 rounded-xl bg-[#FDD140]/10 flex items-center justify-center mb-4">
            <span className="text-2xl">⚡</span>
          </div>
          <h3 className="font-display text-xl text-[#021126] mb-3">Instant Auto-Grading</h3>
          <p className="text-neutral-600">
            Advanced AI evaluates responses with human-level accuracy, providing instant results and detailed feedback for all question types.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-[#EF522E]/5 border border-[#EF522E]/10">
          <div className="w-12 h-12 rounded-xl bg-[#EF522E]/10 flex items-center justify-center mb-4">
            <span className="text-2xl">📊</span>
          </div>
          <h3 className="font-display text-xl text-[#021126] mb-3">Deep Analytics</h3>
          <p className="text-neutral-600">
            Comprehensive insights into candidate performance, question effectiveness, bias detection, and predictive hiring recommendations.
          </p>
        </div>
            </div>
            
      {/* tomiwa: Assessment types section - simplified */}
      <div className="mb-16">
        <h2 className="font-display text-2xl text-[#021126] mb-8">Assessment Types</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              type: 'Scenario Simulation',
              description: 'Real-world business challenges for leadership and problem-solving evaluation',
              icon: '🎯',
              bestFor: 'Management, Leadership, Product Managers',
              time: '45-90 min'
            },
            {
              type: 'Knowledge Evaluation', 
              description: 'Technical knowledge and professional competency assessments',
              icon: '📚',
              bestFor: 'Developers, Specialists, Technical Roles',
              time: '30-60 min'
            },
            {
              type: 'Strategy & Analysis',
              description: 'Analytical thinking, data interpretation, and strategic planning',
              icon: '📊',
              bestFor: 'Analysts, Consultants, Strategic Roles', 
              time: '60-120 min'
            },
            {
              type: 'Creative Communication',
              description: 'Communication skills, creativity, and presentation abilities',
              icon: '🎨',
              bestFor: 'Marketing, Sales, Design, Content',
              time: '30-75 min'
            }
          ].map((assessment, index) => (
            <div key={index} className="bg-white rounded-xl p-6 border border-neutral-200 hover:border-[#36D0D8]/50 hover:shadow-md transition-all duration-300">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#36D0D8]/10 to-[#EF522E]/10 rounded-xl flex items-center justify-center text-2xl">
                  {assessment.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-display text-lg text-[#021126]">{assessment.type}</h3>
                    <span className="px-2 py-1 bg-[#FDD140]/20 text-[#021126] rounded-lg text-xs font-medium">
                      {assessment.time}
                    </span>
                      </div>
                  <p className="text-neutral-700 mb-3">{assessment.description}</p>
                  <div className="text-sm">
                    <span className="text-neutral-600">Best for: </span>
                    <span className="font-medium text-[#021126]">{assessment.bestFor}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
          </div>
          
      {/* tomiwa: How it works section - simplified 4-step process */}
      <div className="mb-16">
        <h2 className="font-display text-2xl text-[#021126] mb-8">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: '1',
              title: 'Choose Assessment Type',
              description: 'Select the assessment format that best matches your role requirements and evaluation goals.',
              icon: '📝'
            },
            {
              step: '2', 
              title: 'Generate Questions',
              description: 'AI creates tailored questions based on job description, required skills, and experience level.',
              icon: '🤖'
            },
            {
              step: '3',
              title: 'Deploy & Monitor',
              description: 'Send assessments to candidates and track completion rates with real-time progress updates.',
              icon: '🚀'
            },
            {
              step: '4',
              title: 'Review Results',
              description: 'Get instant AI-graded results with detailed analytics and candidate performance insights.',
              icon: '📊'
            }
          ].map((item, index) => (
            <div key={index} className="relative">
              <div className="p-6 rounded-xl bg-white border border-neutral-200 hover:border-[#36D0D8] transition-colors">
                <div className="w-12 h-12 rounded-xl bg-[#36D0D8]/10 flex items-center justify-center mb-4">
                  <span className="text-2xl">{item.icon}</span>
                </div>
                <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-[#FDD140] flex items-center justify-center font-display text-[#021126]">
                  {item.step}
                </div>
                <h3 className="font-display text-lg text-[#021126] mb-2">{item.title}</h3>
                <p className="text-neutral-600 text-sm">{item.description}</p>
              </div>
            </div>
          ))}
                          </div>
                        </div>

      {/* tomiwa: Best practices section - simplified */}
      <div className="mb-16">
        <h2 className="font-display text-2xl text-[#021126] mb-8">Best Practices</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Question Design',
              description: 'Use clear, job-relevant questions that mirror real work scenarios and ensure bias-free content.',
              icon: '✏️'
            },
            {
              title: 'Time Management',
              description: 'Set realistic time limits based on question complexity and provide clear time indicators.',
              icon: '⏱️'
            },
            {
              title: 'Candidate Experience',
              description: 'Provide clear instructions, practice questions, and follow up with constructive feedback.',
              icon: '👥'
            }
          ].map((practice, index) => (
            <div key={index} className="p-6 bg-[#36D0D8]/5 rounded-xl border border-[#36D0D8]/10">
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center mb-4">
                <span className="text-2xl">{practice.icon}</span>
              </div>
              <h3 className="font-display text-lg text-[#021126] mb-2">
                {practice.title}
              </h3>
              <p className="text-neutral-600">
                {practice.description}
              </p>
                </div>
              ))}
            </div>
              </div>
              
      {/* tomiwa: Call to action section - consistent with other learn pages */}
      <div className="rounded-xl bg-gradient-to-br from-[#021126] to-[#021126]/90 text-white p-8 sm:p-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl mb-4">Ready to Create Smart Assessments?</h2>
          <p className="text-white/80 mb-8 text-lg">
            Start using our AI Assessment Generator to create fair, effective evaluations that help you identify the best candidates for your roles.
          </p>
            <Link 
              href="/dashboard/employer/ai-tools/assessment-generator"
            className="inline-flex items-center justify-center px-8 py-4 bg-[#EF522E] hover:bg-[#EF522E]/90 text-white font-medium rounded-xl transition-colors text-lg"
            >
              Start Creating Assessments
            <svg className="ml-2 w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
            </Link>
        </div>
      </div>
    </div>
  );
}