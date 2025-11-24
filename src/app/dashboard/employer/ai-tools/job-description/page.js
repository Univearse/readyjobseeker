'use client';

import React, { useState } from 'react';
import AIToolWorkspace from '@/components/ui/AIToolWorkspace';

// tomiwa: AI Job Description Generator tool page
export default function JobDescriptionGeneratorPage() {
  const [jobTitle, setJobTitle] = useState('');
  const [industry, setIndustry] = useState('');
  const [experience, setExperience] = useState('');
  const [generatedDescription, setGeneratedDescription] = useState('');

  // tomiwa: Sample tips for the AI assistant
  const assistantTips = [
    'Be specific about required skills and qualifications',
    'Include both technical and soft skills requirements',
    'Mention growth opportunities and company culture',
    'Keep the tone professional but engaging',
    'Highlight unique benefits and perks',
  ];

  // tomiwa: Sample suggestions that would come from the AI
  const suggestions = [
    'Consider adding information about remote work options',
    'The experience requirement could be more specific',
    'You might want to mention preferred tools or technologies',
  ];

  // tomiwa: Handle form submission
  const handleGenerate = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to your AI service
    setGeneratedDescription('Generated description would appear here...');
  };

  return (
    <AIToolWorkspace
      title="AI Job Description Generator"
      description="Create compelling job descriptions with AI-powered suggestions and industry best practices."
      assistantTips={assistantTips}
      suggestions={suggestions}
      onSave={() => console.log('Saving...')}
      onExport={() => console.log('Exporting...')}
      onSend={() => console.log('Sending...')}
      onUseInJobPosting={() => console.log('Using in job posting...')}
    >
      <div className="space-y-6">
        {/* tomiwa: Input form */}
        <form onSubmit={handleGenerate} className="space-y-4">
          <div>
            <label htmlFor="jobTitle" className="block text-sm font-medium text-[#021126] mb-2">
              Job Title
            </label>
            <input
              type="text"
              id="jobTitle"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-neutral-200 focus:border-[#36D0D8] focus:ring-2 focus:ring-[#36D0D8]/20 transition-colors"
              placeholder="e.g. Senior Frontend Developer"
            />
          </div>

          <div>
            <label htmlFor="industry" className="block text-sm font-medium text-[#021126] mb-2">
              Industry
            </label>
            <input
              type="text"
              id="industry"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-neutral-200 focus:border-[#36D0D8] focus:ring-2 focus:ring-[#36D0D8]/20 transition-colors"
              placeholder="e.g. Technology"
            />
          </div>

          <div>
            <label htmlFor="experience" className="block text-sm font-medium text-[#021126] mb-2">
              Experience Level
            </label>
            <select
              id="experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-neutral-200 focus:border-[#36D0D8] focus:ring-2 focus:ring-[#36D0D8]/20 transition-colors"
            >
              <option value="">Select experience level</option>
              <option value="entry">Entry Level (0-2 years)</option>
              <option value="mid">Mid Level (2-5 years)</option>
              <option value="senior">Senior Level (5+ years)</option>
              <option value="lead">Lead/Manager (7+ years)</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3 bg-[#EF522E] hover:bg-[#EF522E]/90 text-white font-medium rounded-lg transition-colors"
          >
            Generate Description
          </button>
        </form>

        {/* tomiwa: Generated output */}
        {generatedDescription && (
          <div className="mt-8">
            <h3 className="font-display text-lg text-[#021126] mb-4">
              Generated Description
            </h3>
            <div className="p-6 bg-neutral-50 rounded-lg border border-neutral-200">
              <p className="text-neutral-600 whitespace-pre-wrap">
                {generatedDescription}
              </p>
            </div>
          </div>
        )}
      </div>
    </AIToolWorkspace>
  );
}
