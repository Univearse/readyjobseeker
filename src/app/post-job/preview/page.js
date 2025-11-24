"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HiOutlineLocationMarker, HiOutlineBriefcase, HiOutlineCurrencyDollar, HiOutlineEye, HiOutlineArrowLeft } from 'react-icons/hi';

// tomiwa: Job post preview screen showing live appearance
export default function JobPreview() {
  // tomiwa: Example job data
  const jobData = {
    title: "Product Manager",
    location: { type: "Hybrid", city: "Lagos, Nigeria" },
    employmentType: "Full-time",
    compensation: { min: "300,000", max: "600,000", currency: "₦", period: "month" },
    description: `We're seeking an experienced Product Manager to join our growing team. You'll be responsible for leading product strategy and execution, working closely with engineering, design, and business stakeholders to deliver exceptional user experiences.`,
    responsibilities: [
      "Drive product strategy and roadmap development",
      "Lead cross-functional teams to deliver high-impact features",
      "Conduct market research and competitive analysis",
      "Define and track key product metrics",
      "Collaborate with engineering and design teams",
      "Gather and prioritize product requirements"
    ],
    requirements: [
      "5+ years of product management experience",
      "Strong analytical and communication skills",
      "Experience with agile methodologies",
      "Track record of successful product launches",
      "Bachelor's degree in relevant field"
    ],
    benefits: [
      "Competitive salary with performance bonuses",
      "Comprehensive health insurance",
      "Remote work flexibility",
      "Professional development budget",
      "Annual leave and paid time off",
      "Modern work equipment provided"
    ],
    skills: ["Product Management", "Agile", "Analytics", "Leadership"],
    applicationMethod: "Apply on RJS",
    visibility: "Public"
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-display font-bold text-brand-black mb-3">
            Job Post Preview
          </h1>
          <p className="text-lg text-neutral-600 font-sans">
            Here's how your job will appear to candidates. You can go back to edit anytime before publishing.
          </p>
        </div>

        {/* Preview Container */}
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden">
          {/* Job Header */}
          <div className="p-8 border-b border-neutral-200">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Main Info */}
              <div className="lg:col-span-2">
                <h2 className="text-3xl font-display font-bold text-brand-black mb-4">
                  {jobData.title}
                </h2>
                <div className="flex flex-wrap gap-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-brand-aqua/10 text-brand-aqua">
                    <HiOutlineLocationMarker className="w-4 h-4 mr-1" />
                    {jobData.location.type} – {jobData.location.city}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-brand-yellow/10 text-brand-yellow">
                    <HiOutlineBriefcase className="w-4 h-4 mr-1" />
                    {jobData.employmentType}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-50 text-green-700">
                    <HiOutlineCurrencyDollar className="w-4 h-4 mr-1" />
                    {jobData.compensation.currency}{jobData.compensation.min} – {jobData.compensation.max}/{jobData.compensation.period}
                  </span>
                </div>
              </div>

              {/* Right Column - Meta Info */}
              <div className="lg:text-right">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-neutral-100 text-neutral-600">
                  <HiOutlineEye className="w-4 h-4 mr-1" />
                  {jobData.visibility} Job Posting
                </span>
              </div>
            </div>
          </div>

          {/* Job Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* About */}
              <section>
                <h3 className="text-xl font-display font-bold text-brand-black mb-4">
                  About the Role
                </h3>
                <p className="text-neutral-600 whitespace-pre-wrap">
                  {jobData.description}
                </p>
              </section>

              {/* Responsibilities */}
              <section>
                <h3 className="text-xl font-display font-bold text-brand-black mb-4">
                  Responsibilities
                </h3>
                <ul className="list-disc list-inside space-y-2 text-neutral-600">
                  {jobData.responsibilities.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </section>

              {/* Requirements */}
              <section>
                <h3 className="text-xl font-display font-bold text-brand-black mb-4">
                  Requirements
                </h3>
                <ul className="list-disc list-inside space-y-2 text-neutral-600">
                  {jobData.requirements.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </section>

              {/* Benefits */}
              <section>
                <h3 className="text-xl font-display font-bold text-brand-black mb-4">
                  Benefits
                </h3>
                <ul className="list-disc list-inside space-y-2 text-neutral-600">
                  {jobData.benefits.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </section>

              {/* Skills */}
              <section>
                <h3 className="text-xl font-display font-bold text-brand-black mb-4">
                  Required Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {jobData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-brand-aqua/10 text-brand-aqua rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            </div>

            {/* Side Content */}
            <div className="space-y-6">
              {/* Application Method */}
              <div className="bg-neutral-50 rounded-xl p-4">
                <p className="text-sm text-neutral-600">
                  {jobData.applicationMethod === 'Apply on RJS'
                    ? 'Candidates will apply on Ready Job Seeker'
                    : 'Candidates will apply via external link'}
                </p>
              </div>

              {/* Company Info could go here */}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="max-w-xl mx-auto mt-12 space-y-4">
          <button
            className="w-full px-6 py-4 bg-brand-orange text-white rounded-xl font-semibold hover:bg-opacity-90 transition-all duration-300 text-center text-lg"
          >
            Publish Job
          </button>
          <div className="flex items-center justify-center gap-6">
            <Link
              href="/post-job/edit"
              className="inline-flex items-center text-neutral-600 hover:text-neutral-900"
            >
              <HiOutlineArrowLeft className="w-5 h-5 mr-1" />
              Back to Edit
            </Link>
            <button
              className="text-neutral-600 hover:text-neutral-900"
            >
              Save as Draft
            </button>
          </div>
        </div>
      </div>

      {/* Footer from landing page */}
      <footer className="bg-neutral-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div>
              <h3 className="text-lg font-semibold mb-6">About Us</h3>
              <p className="text-neutral-400 mb-4">
                Reposebay is Nigeria's leading job platform, connecting talented professionals with their dream careers.
              </p>
              <div className="space-y-2">
                <p className="text-neutral-400">Phone: +234 123 456 7890</p>
                <p className="text-neutral-400">Email: hello@reposebay.com</p>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6">Company</h4>
              <ul className="space-y-4">
                <li><Link href="/blog" className="text-neutral-400 hover:text-white">Blogs</Link></li>
                <li><Link href="/contact" className="text-neutral-400 hover:text-white">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6">Services</h4>
              <ul className="space-y-4">
                <li><Link href="/jobs" className="text-neutral-400 hover:text-white">Jobs</Link></li>
                <li><Link href="/companies" className="text-neutral-400 hover:text-white">Companies</Link></li>
                <li><Link href="/candidates" className="text-neutral-400 hover:text-white">Candidates</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6">Connect</h4>
              <div className="flex gap-4">
                <Link href="https://linkedin.com" className="text-neutral-400 hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </Link>
                <Link href="https://facebook.com" className="text-neutral-400 hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                  </svg>
                </Link>
                <Link href="https://instagram.com" className="text-neutral-400 hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-neutral-800">
            <div className="text-center text-neutral-400">
              © 2024 Reposebay. All Right Reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 