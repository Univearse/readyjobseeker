/**
 * File: src/components/ui/modals/ViewResumeModal.jsx
 * 
 * tomiwa: NEW - View Resume Modal Component
 * Displays resume content in a modal popup with PDF-like styling
 * 
 * Features:
 * - Clean resume layout with professional styling
 * - Downloadable PDF option
 * - Print-friendly design
 * - Responsive modal design
 * - Brand color integration
 */

'use client';

import React from 'react';
import {
  // tomiwa: Icon imports for resume modal
  XMarkIcon,
  DocumentArrowDownIcon,
  PrinterIcon,
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  GlobeAltIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  StarIcon,
  CalendarIcon,
} from '@heroicons/react/24/outline';

export default function ViewResumeModal({ isOpen, onClose, resumeData }) {
  if (!isOpen) return null;

  // tomiwa: Default resume data structure for demo
  const defaultResume = {
    personalInfo: {
      fullName: 'John Doe',
      title: 'Senior Product Designer',
      email: 'john.doe@email.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      website: 'https://johndoe.design',
      linkedin: 'linkedin.com/in/johndoe',
    },
    summary: 'Passionate product designer with 5+ years of experience creating user-centered digital experiences. Proven track record of increasing user engagement through thoughtful design solutions and cross-functional collaboration.',
    experience: [
      {
        id: 1,
        company: 'TechCorp Inc.',
        position: 'Senior Product Designer',
        duration: 'January 2022 - Present',
        location: 'San Francisco, CA',
        responsibilities: [
          'Lead design for core product features serving 100K+ users',
          'Built and maintained design system used across 15+ products',
          'Collaborated with engineering and product teams to deliver user-centered solutions',
          'Conducted user research and usability testing to inform design decisions',
          'Mentored junior designers and established design processes',
        ],
      },
      {
        id: 2,
        company: 'StartupXYZ',
        position: 'Product Designer',
        duration: 'June 2020 - December 2021',
        location: 'Remote',
        responsibilities: [
          'Designed end-to-end user experiences for B2B SaaS platform',
          'Created high-fidelity prototypes and conducted user interviews',
          'Reduced user onboarding time by 50% through redesigned flow',
          'Collaborated with stakeholders to define product requirements',
          'Established design processes for growing startup team',
        ],
      },
      {
        id: 3,
        company: 'Design Agency Co.',
        position: 'UI/UX Designer',
        duration: 'August 2019 - May 2020',
        location: 'San Francisco, CA',
        responsibilities: [
          'Designed websites and mobile apps for diverse client portfolio',
          'Created brand identities and marketing materials',
          'Worked directly with clients to understand business requirements',
          'Delivered projects on time and within budget constraints',
        ],
      },
    ],
    education: [
      {
        id: 1,
        institution: 'Stanford University',
        degree: 'Bachelor of Arts in Design',
        duration: '2016 - 2020',
        location: 'Stanford, CA',
        details: 'Magna Cum Laude, GPA: 3.8/4.0',
      },
    ],
    skills: {
      design: ['UI/UX Design', 'User Research', 'Prototyping', 'Design Systems', 'Wireframing'],
      tools: ['Figma', 'Sketch', 'Adobe Creative Suite', 'InVision', 'Principle', 'Framer'],
      technical: ['HTML/CSS', 'JavaScript', 'React Basics', 'Git', 'Responsive Design'],
      soft: ['Leadership', 'Communication', 'Problem Solving', 'Team Collaboration', 'Project Management'],
    },
    certifications: [
      'Google UX Design Certificate (2021)',
      'Certified Usability Analyst (2020)',
      'Adobe Certified Expert - Photoshop (2019)',
    ],
  };

  const resume = resumeData || defaultResume;

  // tomiwa: Handle download resume
  const handleDownload = () => {
    // johnson: In a real app, this would trigger PDF download
    console.log('Downloading resume...');
    alert('Resume download would start here');
  };

  // tomiwa: Handle print resume
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        
        {/* tomiwa: Modal Header with Actions */}
        <div className="bg-neutral-50 border-b border-neutral-200 p-4 flex items-center justify-between">
          <h2 className="text-xl font-display font-bold text-neutral-900">
            Resume - {resume.personalInfo.fullName}
          </h2>
          
          <div className="flex items-center gap-2">
            {/* tomiwa: Action buttons */}
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-3 py-2 text-brand-aqua hover:bg-brand-aqua hover:text-white rounded-lg transition-colors text-sm font-medium"
            >
              <DocumentArrowDownIcon className="w-4 h-4" />
              Download
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-3 py-2 text-neutral-600 hover:bg-neutral-200 rounded-lg transition-colors text-sm font-medium"
            >
              <PrinterIcon className="w-4 h-4" />
              Print
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-neutral-200 rounded-lg transition-colors"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* tomiwa: Resume Content - Scrollable */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)] bg-white">
          
          {/* tomiwa: Resume Paper Container */}
          <div className="max-w-3xl mx-auto p-8 bg-white min-h-full">
            
            {/* tomiwa: Header Section */}
            <div className="text-center mb-8 pb-6 border-b-2 border-brand-aqua">
              <h1 className="text-4xl font-display font-bold text-neutral-900 mb-2">
                {resume.personalInfo.fullName}
              </h1>
              <p className="text-xl text-brand-aqua font-medium mb-4">
                {resume.personalInfo.title}
              </p>
              
              {/* tomiwa: Contact Information */}
              <div className="flex flex-wrap justify-center gap-4 text-sm text-neutral-600">
                <div className="flex items-center gap-1">
                  <EnvelopeIcon className="w-4 h-4" />
                  {resume.personalInfo.email}
                </div>
                <div className="flex items-center gap-1">
                  <PhoneIcon className="w-4 h-4" />
                  {resume.personalInfo.phone}
                </div>
                <div className="flex items-center gap-1">
                  <MapPinIcon className="w-4 h-4" />
                  {resume.personalInfo.location}
                </div>
                <div className="flex items-center gap-1">
                  <GlobeAltIcon className="w-4 h-4" />
                  {resume.personalInfo.website}
                </div>
              </div>
            </div>

            {/* tomiwa: Professional Summary */}
            <div className="mb-8">
              <h2 className="text-xl font-display font-bold text-neutral-900 mb-3 pb-2 border-b border-neutral-200">
                Professional Summary
              </h2>
              <p className="text-neutral-700 leading-relaxed">
                {resume.summary}
              </p>
            </div>

            {/* tomiwa: Work Experience */}
            <div className="mb-8">
              <h2 className="text-xl font-display font-bold text-neutral-900 mb-4 pb-2 border-b border-neutral-200 flex items-center gap-2">
                <BriefcaseIcon className="w-5 h-5 text-brand-aqua" />
                Work Experience
              </h2>
              
              <div className="space-y-6">
                {resume.experience.map((exp) => (
                  <div key={exp.id} className="relative">
                    {/* tomiwa: Experience header */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-neutral-900">{exp.position}</h3>
                        <p className="text-brand-aqua font-semibold">{exp.company}</p>
                      </div>
                      <div className="text-right text-sm text-neutral-600">
                        <div className="flex items-center gap-1 mb-1">
                          <CalendarIcon className="w-4 h-4" />
                          {exp.duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPinIcon className="w-4 h-4" />
                          {exp.location}
                        </div>
                      </div>
                    </div>
                    
                    {/* tomiwa: Responsibilities */}
                    <ul className="space-y-1.5 ml-4">
                      {exp.responsibilities.map((responsibility, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-neutral-700">
                          <div className="w-1.5 h-1.5 bg-brand-aqua rounded-full mt-2 flex-shrink-0"></div>
                          {responsibility}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* tomiwa: Education */}
            <div className="mb-8">
              <h2 className="text-xl font-display font-bold text-neutral-900 mb-4 pb-2 border-b border-neutral-200 flex items-center gap-2">
                <AcademicCapIcon className="w-5 h-5 text-brand-aqua" />
                Education
              </h2>
              
              <div className="space-y-4">
                {resume.education.map((edu) => (
                  <div key={edu.id}>
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <div>
                        <h3 className="font-bold text-neutral-900">{edu.degree}</h3>
                        <p className="text-brand-aqua font-semibold">{edu.institution}</p>
                        {edu.details && (
                          <p className="text-sm text-neutral-600 mt-1">{edu.details}</p>
                        )}
                      </div>
                      <div className="text-right text-sm text-neutral-600">
                        <div className="flex items-center gap-1 mb-1">
                          <CalendarIcon className="w-4 h-4" />
                          {edu.duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPinIcon className="w-4 h-4" />
                          {edu.location}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* tomiwa: Skills */}
            <div className="mb-8">
              <h2 className="text-xl font-display font-bold text-neutral-900 mb-4 pb-2 border-b border-neutral-200 flex items-center gap-2">
                <StarIcon className="w-5 h-5 text-brand-aqua" />
                Skills & Expertise
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(resume.skills).map(([category, skillList]) => (
                  <div key={category}>
                    <h3 className="font-semibold text-neutral-900 mb-2 capitalize">
                      {category === 'soft' ? 'Soft Skills' : category} Skills
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {skillList.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* tomiwa: Certifications */}
            {resume.certifications && resume.certifications.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-display font-bold text-neutral-900 mb-4 pb-2 border-b border-neutral-200">
                  Certifications
                </h2>
                
                <ul className="space-y-2">
                  {resume.certifications.map((cert, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-neutral-700">
                      <div className="w-1.5 h-1.5 bg-brand-aqua rounded-full mt-2 flex-shrink-0"></div>
                      {cert}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
