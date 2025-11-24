/**
 * File: src/components/ui/modals/ViewProfileModal.jsx
 * 
 * tomiwa: NEW - View Profile Modal Component
 * Displays detailed candidate profile information in a modal popup
 * 
 * Features:
 * - Comprehensive profile information display
 * - Skills, experience, education sections
 * - Contact information and social links
 * - Responsive design with brand colors
 * - Clean, professional layout
 */

'use client';

import React from 'react';
import {
  // tomiwa: Icon imports for profile modal
  XMarkIcon,
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  GlobeAltIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  StarIcon,
  CalendarIcon,
  LinkIcon,
} from '@heroicons/react/24/outline';

export default function ViewProfileModal({ isOpen, onClose, profileData }) {
  if (!isOpen) return null;

  // tomiwa: Default profile data structure for demo
  const defaultProfile = {
    personalInfo: {
      fullName: 'John Doe',
      title: 'Senior Product Designer',
      email: 'john.doe@email.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      website: 'https://johndoe.design',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
      bio: 'Passionate product designer with 5+ years of experience creating user-centered digital experiences. I specialize in design systems, user research, and cross-functional collaboration.',
    },
    skills: [
      { name: 'UI/UX Design', level: 95 },
      { name: 'Figma', level: 90 },
      { name: 'User Research', level: 85 },
      { name: 'Prototyping', level: 88 },
      { name: 'Design Systems', level: 92 },
      { name: 'HTML/CSS', level: 75 },
    ],
    experience: [
      {
        id: 1,
        company: 'TechCorp Inc.',
        position: 'Senior Product Designer',
        duration: 'Jan 2022 - Present',
        location: 'San Francisco, CA',
        description: 'Lead design for core product features, manage design system, and collaborate with cross-functional teams to deliver user-centered solutions.',
        achievements: [
          'Increased user engagement by 35% through redesigned onboarding flow',
          'Built and maintained design system used across 15+ products',
          'Led user research initiatives that informed product strategy',
        ],
      },
      {
        id: 2,
        company: 'StartupXYZ',
        position: 'Product Designer',
        duration: 'Jun 2020 - Dec 2021',
        location: 'Remote',
        description: 'Designed end-to-end user experiences for B2B SaaS platform, conducted user interviews, and created high-fidelity prototypes.',
        achievements: [
          'Designed MVP that secured $2M in Series A funding',
          'Reduced user onboarding time by 50%',
          'Established design processes for growing team',
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
        gpa: '3.8/4.0',
        achievements: ['Magna Cum Laude', 'Design Excellence Award 2020'],
      },
    ],
    socialLinks: [
      { platform: 'LinkedIn', url: 'https://linkedin.com/in/johndoe', icon: LinkIcon },
      { platform: 'Dribbble', url: 'https://dribbble.com/johndoe', icon: LinkIcon },
      { platform: 'Behance', url: 'https://behance.net/johndoe', icon: LinkIcon },
    ],
  };

  const profile = profileData || defaultProfile;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        
        {/* tomiwa: Modal Header */}
        <div className="bg-gradient-to-r from-brand-aqua to-primary-600 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
          
          <div className="flex items-start gap-6">
            {/* tomiwa: Profile Avatar */}
            <img
              src={profile.personalInfo.avatar}
              alt={profile.personalInfo.fullName}
              className="w-24 h-24 rounded-xl object-cover border-4 border-white/20"
            />
            
            {/* tomiwa: Basic Info */}
            <div className="flex-1">
              <h1 className="text-3xl font-display font-bold mb-2">
                {profile.personalInfo.fullName}
              </h1>
              <p className="text-xl text-white/90 mb-3">
                {profile.personalInfo.title}
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-white/80">
                <div className="flex items-center gap-1">
                  <MapPinIcon className="w-4 h-4" />
                  {profile.personalInfo.location}
                </div>
                <div className="flex items-center gap-1">
                  <EnvelopeIcon className="w-4 h-4" />
                  {profile.personalInfo.email}
                </div>
                <div className="flex items-center gap-1">
                  <PhoneIcon className="w-4 h-4" />
                  {profile.personalInfo.phone}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* tomiwa: Modal Content - Scrollable */}
        <div className="overflow-y-auto max-h-[calc(90vh-200px)] p-6">
          
          {/* tomiwa: Bio Section */}
          <div className="mb-8">
            <h2 className="text-xl font-display font-bold text-neutral-900 mb-4 flex items-center gap-2">
              <UserIcon className="w-6 h-6 text-brand-aqua" />
              About
            </h2>
            <p className="text-neutral-700 leading-relaxed">
              {profile.personalInfo.bio}
            </p>
          </div>

          {/* tomiwa: Skills Section */}
          <div className="mb-8">
            <h2 className="text-xl font-display font-bold text-neutral-900 mb-4 flex items-center gap-2">
              <StarIcon className="w-6 h-6 text-brand-aqua" />
              Skills & Expertise
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {profile.skills.map((skill, index) => (
                <div key={index} className="bg-neutral-50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-neutral-900">{skill.name}</span>
                    <span className="text-sm text-neutral-600">{skill.level}%</span>
                  </div>
                  {/* tomiwa: Skill progress bar */}
                  <div className="w-full bg-neutral-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-brand-aqua to-primary-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* tomiwa: Experience Section */}
          <div className="mb-8">
            <h2 className="text-xl font-display font-bold text-neutral-900 mb-4 flex items-center gap-2">
              <BriefcaseIcon className="w-6 h-6 text-brand-aqua" />
              Work Experience
            </h2>
            <div className="space-y-6">
              {profile.experience.map((exp) => (
                <div key={exp.id} className="bg-white border border-neutral-200 rounded-lg p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-neutral-900">{exp.position}</h3>
                      <p className="text-brand-aqua font-medium">{exp.company}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-sm text-neutral-600 mb-1">
                        <CalendarIcon className="w-4 h-4" />
                        {exp.duration}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-neutral-600">
                        <MapPinIcon className="w-4 h-4" />
                        {exp.location}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-neutral-700 mb-4">{exp.description}</p>
                  
                  {/* tomiwa: Achievements list */}
                  <div>
                    <h4 className="font-semibold text-neutral-900 mb-2">Key Achievements:</h4>
                    <ul className="space-y-1">
                      {exp.achievements.map((achievement, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-neutral-700">
                          <div className="w-1.5 h-1.5 bg-brand-aqua rounded-full mt-2 flex-shrink-0"></div>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* tomiwa: Education Section */}
          <div className="mb-8">
            <h2 className="text-xl font-display font-bold text-neutral-900 mb-4 flex items-center gap-2">
              <AcademicCapIcon className="w-6 h-6 text-brand-aqua" />
              Education
            </h2>
            <div className="space-y-4">
              {profile.education.map((edu) => (
                <div key={edu.id} className="bg-white border border-neutral-200 rounded-lg p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-neutral-900">{edu.degree}</h3>
                      <p className="text-brand-aqua font-medium">{edu.institution}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-sm text-neutral-600 mb-1">
                        <CalendarIcon className="w-4 h-4" />
                        {edu.duration}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-neutral-600">
                        <MapPinIcon className="w-4 h-4" />
                        {edu.location}
                      </div>
                    </div>
                  </div>
                  
                  {edu.gpa && (
                    <p className="text-neutral-700 mb-2">GPA: {edu.gpa}</p>
                  )}
                  
                  {edu.achievements && edu.achievements.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-neutral-900 mb-2">Achievements:</h4>
                      <div className="flex flex-wrap gap-2">
                        {edu.achievements.map((achievement, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-accent-100 text-accent-700 rounded-full text-sm font-medium"
                          >
                            {achievement}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* tomiwa: Social Links Section */}
          <div className="mb-6">
            <h2 className="text-xl font-display font-bold text-neutral-900 mb-4 flex items-center gap-2">
              <GlobeAltIcon className="w-6 h-6 text-brand-aqua" />
              Links & Portfolio
            </h2>
            <div className="flex flex-wrap gap-3">
              {/* tomiwa: Website link */}
              <a
                href={profile.personalInfo.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-brand-aqua text-white rounded-lg hover:bg-primary-600 transition-colors"
              >
                <GlobeAltIcon className="w-4 h-4" />
                Portfolio Website
              </a>
              
              {/* tomiwa: Social links */}
              {profile.socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 border-2 border-brand-aqua text-brand-aqua rounded-lg hover:bg-brand-aqua hover:text-white transition-colors"
                >
                  <link.icon className="w-4 h-4" />
                  {link.platform}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* tomiwa: Modal Footer */}
        <div className="border-t border-neutral-200 p-6 bg-neutral-50">
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2.5 border-2 border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-100 transition-colors font-medium"
            >
              Close
            </button>
            <button className="px-6 py-2.5 bg-brand-aqua text-white rounded-lg hover:bg-primary-600 transition-colors font-medium">
              Contact Candidate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
