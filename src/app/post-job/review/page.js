"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiMapPin, FiBriefcase, FiClock, FiDollarSign, FiCheck } from 'react-icons/fi';

// tomiwa: Dummy data for demonstration
const dummyJobData = {
  jobTitle: "Senior Frontend Developer",
  companyName: "TechCorp Solutions",
  locationType: "hybrid",
  workLocation: "Lagos, Nigeria",
  employmentType: "full-time",
  salaryRange: {
    currency: "NGN",
    min: "400000",
    max: "600000"
  },
  description: `About the role:
We're looking for a Senior Frontend Developer to join our growing team. You'll be responsible for building beautiful, responsive web applications using modern technologies.

Responsibilities:
• Lead frontend development initiatives and mentor junior developers
• Build scalable and maintainable React/Next.js applications
• Collaborate with designers to implement pixel-perfect UIs
• Optimize applications for maximum performance

Requirements:
• 5+ years of experience with React and modern JavaScript
• Strong understanding of web performance and optimization
• Experience with TypeScript and state management
• Excellent problem-solving and communication skills

Benefits:
• Competitive salary and equity
• Remote work options
• Health insurance
• Professional development budget`,
  skills: [
    "React",
    "TypeScript",
    "Next.js",
    "TailwindCSS",
    "Redux",
    "GraphQL"
  ],
  applicationMethod: "email",
  applicationEmail: "careers@techcorp.com",
  screeningQuestions: [
    "How many years of React experience do you have?",
    "Describe a challenging project you've worked on",
    "What's your preferred work environment?"
  ]
};

export default function ReviewJobPage() {
  const router = useRouter();
  const [isPublishing, setIsPublishing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handlePublish = async () => {
    setIsPublishing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setShowSuccess(true);
    // Redirect after showing success message
    setTimeout(() => {
      router.push('/employers/dashboard');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link 
                href="/post-job/free"
                className="flex items-center gap-2 text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                <FiArrowLeft className="w-4 h-4" />
                <span className="text-sm font-medium">Back to editor</span>
              </Link>
              <h1 className="text-xl font-display font-bold text-neutral-900">
                Review Job Post
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Job Preview */}
          <div className="space-y-12">
            {/* Header Section */}
            <div>
              <h2 className="text-3xl font-display font-bold text-neutral-900 mb-4">
                {dummyJobData.jobTitle}
              </h2>
              <div className="text-xl text-neutral-600 mb-6">
                {dummyJobData.companyName}
              </div>
              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm bg-neutral-50 text-neutral-600">
                  <FiMapPin className="w-4 h-4 text-brand-aqua" />
                  {dummyJobData.locationType === 'remote' ? 'Remote' : dummyJobData.workLocation}
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm bg-neutral-50 text-neutral-600">
                  <FiBriefcase className="w-4 h-4 text-brand-aqua" />
                  {dummyJobData.employmentType.charAt(0).toUpperCase() + dummyJobData.employmentType.slice(1)}
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm bg-neutral-50 text-neutral-600">
                  <FiClock className="w-4 h-4 text-brand-aqua" />
                  30 days
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm bg-neutral-50 text-neutral-600">
                  <FiDollarSign className="w-4 h-4 text-brand-aqua" />
                  {dummyJobData.salaryRange.currency} {Number(dummyJobData.salaryRange.min).toLocaleString()} - {Number(dummyJobData.salaryRange.max).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Skills */}
            <div>
              <h3 className="text-sm font-medium text-neutral-600 mb-3">Required Skills</h3>
              <div className="flex flex-wrap gap-2">
                {dummyJobData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-2.5 py-1 rounded-lg text-sm font-medium bg-brand-aqua/10 text-brand-aqua"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-sm font-medium text-neutral-600 mb-3">Job Description</h3>
              <div className="prose prose-neutral max-w-none">
                {dummyJobData.description.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="whitespace-pre-line">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Application Settings */}
            <div>
              <h3 className="text-sm font-medium text-neutral-600 mb-3">Application Settings</h3>
              <div className="space-y-4">
                <div>
                  <div className="font-medium text-neutral-900 mb-1">How to Apply</div>
                  <div className="text-neutral-600">
                    Via email at {dummyJobData.applicationEmail}
                  </div>
                </div>
                <div>
                  <div className="font-medium text-neutral-900 mb-2">Screening Questions</div>
                  <ul className="space-y-2">
                    {dummyJobData.screeningQuestions.map((question, index) => (
                      <li key={index} className="flex items-start gap-2 text-neutral-600">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-brand-aqua/10 text-brand-aqua flex items-center justify-center text-xs">
                          {index + 1}
                        </span>
                        {question}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-neutral-200/80 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link
              href="/post-job/free"
              className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              Edit post
            </Link>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={handlePublish}
                disabled={isPublishing}
                className="px-5 py-2.5 rounded-xl text-sm font-medium bg-gradient-to-r from-brand-orange to-brand-yellow text-white hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPublishing ? (
                  <span className="flex items-center gap-2">
                    Publishing...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Publish Now
                    <FiCheck className="w-4 h-4" />
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-green-50 text-green-900 px-6 py-3 rounded-xl shadow-lg flex items-center gap-2"
        >
          <FiCheck className="w-5 h-5 text-green-600" />
          Job posted successfully! Redirecting...
        </motion.div>
      )}
    </div>
  );
} 