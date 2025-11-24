import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function CandidateRankingLearnPage() {
  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* tomiwa: Header section */}
      <div className="mb-12">
        <Link 
          href="/dashboard/employer/ai-tools/candidate-ranking"
          className="inline-flex items-center text-neutral-600 hover:text-[#36D0D8] mb-6 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to AI Candidate Ranking
        </Link>
        
        <h1 className="font-display text-4xl text-[#021126] mb-4">
          Understanding AI Candidate Ranking
        </h1>
        <p className="text-neutral-600 text-xl max-w-3xl">
          Learn how to leverage AI-powered insights for objective candidate evaluation and ranking.
        </p>
      </div>

      {/* tomiwa: Main content */}
      <div className="prose prose-lg max-w-none">
        {/* tomiwa: Overview section */}
        <section className="mb-12">
          <div className="bg-[#36D0D8]/5 rounded-xl p-8 mb-8">
            <h2 className="font-display text-2xl text-[#021126] mb-4">
              What is AI Candidate Ranking?
            </h2>
            <p className="text-neutral-600">
              AI Candidate Ranking is an advanced tool that helps employers evaluate and compare candidates objectively using machine learning algorithms. The system analyzes multiple data points including experience, skills, education, and cultural fit indicators to provide comprehensive insights for better hiring decisions.
            </p>
          </div>
        </section>

        {/* tomiwa: Key Features section */}
        <section className="mb-12">
          <h2 className="font-display text-2xl text-[#021126] mb-6">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Smart Comparison Engine",
                description: "Compare multiple candidates simultaneously across various parameters with AI-powered analysis.",
                icon: "🔄"
              },
              {
                title: "Customizable Criteria",
                description: "Adjust ranking weights based on role requirements and company priorities.",
                icon: "⚖️"
              },
              {
                title: "Bias Detection",
                description: "AI algorithms help identify and minimize unconscious bias in the evaluation process.",
                icon: "🎯"
              },
              {
                title: "Data-Driven Insights",
                description: "Get detailed analytics and visualizations to support decision-making.",
                icon: "📊"
              }
            ].map((feature) => (
              <div key={feature.title} className="bg-white rounded-xl border border-neutral-200 p-6">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-2xl">{feature.icon}</span>
                  <h3 className="font-display text-xl text-[#021126]">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-neutral-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* tomiwa: How It Works section */}
        <section className="mb-12">
          <h2 className="font-display text-2xl text-[#021126] mb-6">
            How It Works
          </h2>
          <div className="space-y-6">
            {[
              {
                step: 1,
                title: "Select Candidates",
                description: "Choose candidates from your applicant pool that you want to compare."
              },
              {
                step: 2,
                title: "Configure Criteria",
                description: "Adjust the importance of different evaluation criteria based on your needs."
              },
              {
                step: 3,
                title: "Review AI Analysis",
                description: "Get detailed comparisons and insights powered by our AI algorithms."
              },
              {
                step: 4,
                title: "Make Informed Decisions",
                description: "Use the AI-generated insights alongside your human judgment to make better hiring decisions."
              }
            ].map((step) => (
              <div key={step.step} className="flex items-start gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#36D0D8]/10 flex items-center justify-center text-[#36D0D8] font-display text-xl">
                  {step.step}
                </div>
                <div>
                  <h3 className="font-display text-xl text-[#021126] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-neutral-600">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* tomiwa: Best Practices section */}
        <section className="mb-12">
          <h2 className="font-display text-2xl text-[#021126] mb-6">
            Best Practices
          </h2>
          <div className="bg-[#021126] rounded-xl p-8 text-white">
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <span className="flex-shrink-0 text-[#36D0D8]">✓</span>
                <p>Compare at least 3-5 candidates for meaningful insights</p>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex-shrink-0 text-[#36D0D8]">✓</span>
                <p>Regularly review and adjust ranking criteria weights</p>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex-shrink-0 text-[#36D0D8]">✓</span>
                <p>Use AI insights as a supplement to, not replacement for, human judgment</p>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex-shrink-0 text-[#36D0D8]">✓</span>
                <p>Document ranking decisions for future reference and process improvement</p>
              </li>
            </ul>
          </div>
        </section>

        {/* tomiwa: Get Started section */}
        <section>
          <div className="bg-gradient-to-br from-[#36D0D8]/10 to-white rounded-xl p-8 text-center">
            <h2 className="font-display text-2xl text-[#021126] mb-4">
              Ready to Start Ranking?
            </h2>
            <p className="text-neutral-600 mb-6 max-w-2xl mx-auto">
              Put your learning into practice and start using AI Candidate Ranking to make better hiring decisions.
            </p>
            <Link
              href="/dashboard/employer/ai-tools/candidate-ranking"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-[#36D0D8] hover:bg-[#36D0D8]/90 text-white font-medium transition-colors"
            >
              Start Ranking Candidates
              <svg className="ml-2 w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
