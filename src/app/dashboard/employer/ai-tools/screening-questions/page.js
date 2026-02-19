'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Dialog } from '@headlessui/react';
import { Chip } from '@/components/ui/Chip';
import { Button } from '@/components/ui/Button.jsx';
import { Card } from '@/components/ui/Card.jsx';
import { Select } from '@/components/ui/Select';

// tomiwa: Mock data for active jobs - replace with actual API call
const activeJobs = [
  { id: 1, title: 'Senior Frontend Developer' },
  { id: 2, title: 'Product Manager' },
  { id: 3, title: 'UX Designer' },
];

// tomiwa: Mock data for suggested skills - replace with actual API call
const suggestedSkills = [
  'React', 'TypeScript', 'Node.js', 'Python', 'Leadership',
  'Communication', 'Problem Solving', 'Agile', 'Project Management',
  'UI/UX Design', 'Data Analysis', 'Team Management'
];

// tomiwa: Question templates for different categories
const questionTemplates = {
  technical: [
    'Describe your experience with [technology]',
    'How would you handle [technical scenario]?',
    'What is your approach to [technical process]?'
  ],
  behavioral: [
    'Tell me about a time when you [situation]',
    'How do you handle [challenge]?',
    'Describe your approach to [soft skill]'
  ],
  experience: [
    'What was your role in [type of project]?',
    'How many years of experience do you have with [skill]?',
    'Describe your most significant achievement in [area]'
  ]
};

export default function ScreeningQuestionsPage() {
  // tomiwa: State management
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [generatedQuestions, setGeneratedQuestions] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [customQuestions, setCustomQuestions] = useState([]);
  const [questionSettings, setQuestionSettings] = useState({
    technicalWeight: 40,
    behavioralWeight: 30,
    experienceWeight: 30,
    includeKnockout: true,
    maxQuestions: 10
  });

  // tomiwa: Handle question generation
  const handleGenerateQuestions = async () => {
    setIsGenerating(true);
    // TODO: Replace with actual API call
    setTimeout(() => {
      setGeneratedQuestions({
        general: [
          { 
            id: 1, 
            question: 'How many years of experience do you have in this field?',
            required: true,
            knockout: false,
            type: 'experience',
            weight: 3
          },
          { 
            id: 2,
            question: 'Are you authorized to work in the country of job location?',
            required: true,
            knockout: true,
            type: 'general',
            weight: 5
          },
        ],
        technical: [
          {
            id: 3,
            question: 'Describe your experience with React and TypeScript in a production environment.',
            required: true,
            knockout: false,
            type: 'technical',
            weight: 4
          },
          {
            id: 4,
            question: 'How do you approach component optimization in React?',
            required: true,
            knockout: false,
            type: 'technical',
            weight: 4
          },
        ],
        behavioral: [
          {
            id: 5,
            question: 'Describe a challenging project you led and how you ensured its success.',
            required: true,
            knockout: false,
            type: 'behavioral',
            weight: 3
          },
          {
            id: 6,
            question: 'How do you handle disagreements within your team?',
            required: true,
            knockout: false,
            type: 'behavioral',
            weight: 3
          },
        ]
      });
      setIsGenerating(false);
    }, 1500);
  };

  // tomiwa: Question component with enhanced controls
  const QuestionCard = ({ question, required, knockout, type, weight, onEdit, onDelete }) => (
    <div className="p-4 bg-white rounded-xl border border-neutral-200 mb-4 hover:border-[#36D0D8] transition-colors">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-grow">
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              type === 'technical' ? 'bg-[#36D0D8]/10 text-[#36D0D8]' :
              type === 'behavioral' ? 'bg-[#FDD140]/10 text-[#021126]' :
              'bg-[#EF522E]/10 text-[#EF522E]'
            }`}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </span>
            <span className="text-neutral-500 text-xs">Weight: {weight}</span>
          </div>
          <textarea
            className="w-full min-h-[60px] p-2 rounded-lg border border-neutral-200 text-neutral-800 focus:ring-2 focus:ring-[#36D0D8] focus:border-transparent"
            defaultValue={question}
            onChange={(e) => onEdit && onEdit(e.target.value)}
          />
          <div className="flex gap-2 mt-2">
            {knockout && (
              <span className="px-2 py-1 text-xs font-medium bg-red-50 text-red-600 rounded-full">
                Knockout
              </span>
            )}
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              required ? 'bg-[#36D0D8]/10 text-[#36D0D8]' : 'bg-neutral-100 text-neutral-600'
            }`}>
              {required ? 'Required' : 'Optional'}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={onEdit}
            className="p-2 text-neutral-600 hover:text-[#36D0D8] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button 
            onClick={onDelete}
            className="p-2 text-neutral-600 hover:text-[#EF522E] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* tomiwa: Header section with tool information */}
          <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-[#36D0D8]/10 flex items-center justify-center">
            <span className="text-2xl">❓</span>
          </div>
          <h1 className="font-display text-3xl text-[#021126]">
            AI Screening Questions
            </h1>
        </div>
        <p className="text-neutral-600 text-lg max-w-3xl font-body">
          Generate tailored screening questions and knockout criteria based on job requirements and skills. Our AI helps ensure comprehensive candidate evaluation.
            </p>
          </div>

      {/* tomiwa: Main workspace area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* tomiwa: Left sidebar with configuration */}
        <div className="lg:col-span-3">
          <div className="space-y-6">
            {/* tomiwa: Question settings */}
            <Card className="p-6">
              <h2 className="font-display text-xl text-[#021126] mb-4">
                Question Settings
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Technical Questions ({questionSettings.technicalWeight}%)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={questionSettings.technicalWeight}
                    onChange={(e) => setQuestionSettings(prev => ({
                      ...prev,
                      technicalWeight: parseInt(e.target.value)
                    }))}
                    className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-[#36D0D8]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Behavioral Questions ({questionSettings.behavioralWeight}%)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={questionSettings.behavioralWeight}
                    onChange={(e) => setQuestionSettings(prev => ({
                      ...prev,
                      behavioralWeight: parseInt(e.target.value)
                    }))}
                    className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-[#FDD140]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Experience Questions ({questionSettings.experienceWeight}%)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={questionSettings.experienceWeight}
                    onChange={(e) => setQuestionSettings(prev => ({
                      ...prev,
                      experienceWeight: parseInt(e.target.value)
                    }))}
                    className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-[#EF522E]"
                  />
                </div>
                <div className="pt-4 border-t border-neutral-100">
                  <label className="flex items-center justify-between text-sm font-medium text-neutral-700 mb-2">
                    <span>Maximum Questions</span>
                    <span className="text-[#36D0D8]">{questionSettings.maxQuestions}</span>
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="20"
                    value={questionSettings.maxQuestions}
                    onChange={(e) => setQuestionSettings(prev => ({
                      ...prev,
                      maxQuestions: parseInt(e.target.value)
                    }))}
                    className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-[#36D0D8]"
                  />
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                  <span className="text-sm font-medium text-neutral-700">Include Knockout Questions</span>
                  <button
                    onClick={() => setQuestionSettings(prev => ({
                      ...prev,
                      includeKnockout: !prev.includeKnockout
                    }))}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      questionSettings.includeKnockout ? 'bg-[#36D0D8]' : 'bg-neutral-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        questionSettings.includeKnockout ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </Card>

            {/* tomiwa: Job selection */}
            <Card className="p-6">
              <h2 className="font-display text-xl text-[#021126] mb-4">
                Job Details
              </h2>
              <div className="space-y-4">
                <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Select Job Posting
              </label>
              <Select
                options={activeJobs}
                value={selectedJob}
                onChange={setSelectedJob}
                placeholder="Choose a job posting..."
                className="w-full"
              />
            </div>
                <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Required Skills
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {selectedSkills.map((skill) => (
                  <Chip
                    key={skill}
                    label={skill}
                    onDelete={() => setSelectedSkills(skills => skills.filter(s => s !== skill))}
                  />
                ))}
              </div>
              <Select
                options={suggestedSkills.filter(skill => !selectedSkills.includes(skill))}
                onChange={(skill) => setSelectedSkills([...selectedSkills, skill])}
                placeholder="Type or select skills..."
                className="w-full"
              />
                </div>
              </div>
            </Card>
          </div>
            </div>

        {/* tomiwa: Main content area */}
        <div className="lg:col-span-9">
          <Card className="p-6">
            {!generatedQuestions ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[#36D0D8]/5 flex items-center justify-center">
                  <span className="text-4xl">🎯</span>
                </div>
                <h3 className="font-display text-xl text-[#021126] mb-3">
                  Ready to Generate Questions
                </h3>
                <p className="text-neutral-600 max-w-md mx-auto mb-6">
                  Configure your settings and select a job posting to generate tailored screening questions.
                </p>
            <Button
              onClick={handleGenerateQuestions}
                  disabled={isGenerating || !selectedJob}
                  className="bg-[#36D0D8] hover:bg-[#36D0D8]/90 text-white"
            >
              {isGenerating ? 'Generating Questions...' : 'Generate Questions'}
            </Button>
              </div>
            ) : (
            <div className="space-y-8">
                {/* tomiwa: Actions header */}
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-xl text-[#021126]">
                    Generated Questions
                  </h2>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="secondary"
                      className="flex items-center gap-2"
                      onClick={() => setShowTemplates(true)}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Add from Templates
                    </Button>
                    <Button
                      onClick={handleGenerateQuestions}
                      disabled={isGenerating}
                      className="flex items-center gap-2 bg-[#36D0D8] hover:bg-[#36D0D8]/90 text-white"
                    >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Regenerate
                  </Button>
                </div>
                </div>

                {/* tomiwa: Questions sections */}
                <div className="space-y-6">
                  {/* tomiwa: Technical questions */}
                  <div>
                    <h3 className="font-display text-lg text-[#021126] mb-4 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-lg bg-[#36D0D8]/10 flex items-center justify-center text-[#36D0D8]">
                        💻
                      </span>
                      Technical Questions
                    </h3>
                    {generatedQuestions.technical.map((q) => (
                  <QuestionCard key={q.id} {...q} />
                ))}
              </div>

                  {/* tomiwa: Behavioral questions */}
              <div>
                    <h3 className="font-display text-lg text-[#021126] mb-4 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-lg bg-[#FDD140]/10 flex items-center justify-center text-[#021126]">
                        🤝
                      </span>
                      Behavioral Questions
                    </h3>
                    {generatedQuestions.behavioral.map((q) => (
                  <QuestionCard key={q.id} {...q} />
                ))}
              </div>

                  {/* tomiwa: General questions */}
              <div>
                    <h3 className="font-display text-lg text-[#021126] mb-4 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-lg bg-[#EF522E]/10 flex items-center justify-center text-[#EF522E]">
                        📝
                      </span>
                      General Questions
                    </h3>
                    {generatedQuestions.general.map((q) => (
                  <QuestionCard key={q.id} {...q} />
                ))}
              </div>
                </div>

                {/* tomiwa: Action buttons */}
                <div className="flex items-center justify-end gap-3 pt-6 border-t border-neutral-100">
                  <Button variant="secondary">
                    Preview Questions
                  </Button>
                  <Button className="bg-[#EF522E] hover:bg-[#EF522E]/90 text-white">
                    Save to Job Post
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* tomiwa: Help section */}
      <div className="mt-8 rounded-xl bg-gradient-to-br from-[#021126] to-[#021126]/90 text-white p-6">
        <div className="flex items-start space-x-6">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center">
              <span className="text-2xl">💡</span>
            </div>
          </div>
          <div>
            <h2 className="font-display text-xl text-white mb-3">
              How to Use AI Screening Questions
            </h2>
            <p className="text-white/80 mb-4 font-body">
              Get the most out of our AI-powered screening question generator:
            </p>
            <ul className="list-disc list-inside text-white/80 space-y-2 mb-4 font-body">
              <li>Adjust question type weights based on role requirements</li>
              <li>Add required skills to generate more relevant questions</li>
              <li>Use templates to add custom questions quickly</li>
              <li>Enable knockout questions for critical requirements</li>
            </ul>
            <a 
              href="/dashboard/employer/ai-tools/screening-questions/learn" 
              className="inline-flex items-center text-[#36D0D8] hover:text-[#EF522E] font-medium transition-colors font-body"
            >
              Learn More About AI Screening
              <svg className="ml-2 w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* tomiwa: Templates modal */}
      <Dialog
        open={showTemplates}
        onClose={() => setShowTemplates(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-2xl bg-white rounded-xl shadow-lg">
            <div className="p-6 border-b border-neutral-200">
              <div className="flex items-center justify-between">
                <Dialog.Title className="font-display text-2xl text-[#021126]">
                  Question Templates
                </Dialog.Title>
                <button
                  onClick={() => setShowTemplates(false)}
                  className="text-neutral-500 hover:text-neutral-700"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
              <div className="space-y-6">
                {Object.entries(questionTemplates).map(([category, templates]) => (
                  <div key={category}>
                    <h3 className="font-display text-lg text-[#021126] mb-3 capitalize">
                      {category} Questions
                    </h3>
                    <div className="space-y-2">
                      {templates.map((template, index) => (
                        <button
                          key={index}
                          className="w-full p-3 text-left rounded-lg border border-neutral-200 hover:border-[#36D0D8] hover:bg-[#36D0D8]/5 transition-colors"
                          onClick={() => {
                            setCustomQuestions([...customQuestions, {
                              id: Date.now(),
                              question: template,
                              type: category,
                              required: false,
                              knockout: false,
                              weight: 3
                            }]);
                          }}
                        >
                          {template}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-6 border-t border-neutral-200 bg-neutral-50">
              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={() => setShowTemplates(false)}
                  className="px-4 py-2 text-neutral-700 hover:text-neutral-900"
                >
                  Close
                </button>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}