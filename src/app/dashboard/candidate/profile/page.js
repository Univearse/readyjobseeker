/**
 * File: src/app/dashboard/candidate/profile/page.js
 * 
 * tomiwa: Complete Candidate Profile Management Page
 * Allows candidates to manage personal info, work experience, education,
 * skills, portfolio, and resume uploads with modern responsive design
 */

'use client';

import { useState, useRef } from 'react';
import CandidateDashboardLayout from '@/components/layouts/CandidateDashboardLayout.jsx';
import { 
  UserCircleIcon, 
  PencilIcon, 
  PlusIcon, 
  DocumentArrowUpIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  StarIcon,
  EyeIcon,
  TrashIcon,
  MapPinIcon,
  EnvelopeIcon,
  PhoneIcon,
  GlobeAltIcon,
  CalendarIcon,
  BuildingOfficeIcon,
  // tomiwa: NEW - AI Assistant icons
  SparklesIcon,
  LightBulbIcon,
  ClipboardDocumentListIcon,
  EllipsisVerticalIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline';

export default function CandidateProfile() {
  // tomiwa: File upload refs
  const resumeInputRef = useRef(null);
  const avatarInputRef = useRef(null);

  // tomiwa: State management for edit modes and form data
  const [editMode, setEditMode] = useState({
    personal: false,
    summary: false,
    experience: false,
    education: false,
    skills: false
  });

  // tomiwa: Modal states for different actions
  const [modals, setModals] = useState({
    previewProfile: false,
    editPersonalInfo: false,
    addExperience: false,
    editExperience: false,
    addEducation: false,
    editEducation: false,
    addProject: false,
    addSkill: false
  });

  // tomiwa: NEW - AI Assistant state
  const [showAiAssistant, setShowAiAssistant] = useState(false);
  const [showProfileAnalysis, setShowProfileAnalysis] = useState(false);
  const [showResumeOptimization, setShowResumeOptimization] = useState(false);
  const [showSkillsRecommendation, setShowSkillsRecommendation] = useState(false);

  // tomiwa: Form data for editing
  const [formData, setFormData] = useState({
    personalInfo: { firstName: '', lastName: '', title: '', email: '', phone: '', location: '', website: '' },
    experience: { id: null, company: '', position: '', location: '', startDate: '', endDate: '', description: '' },
    education: { id: null, institution: '', degree: '', location: '', startDate: '', endDate: '', gpa: '', link: '' },
    project: { title: '', description: '', technologies: [], link: '', image: '' },
    skill: { category: '', skills: [] }
  });

  // tomiwa: Current resume file state
  const [currentResume, setCurrentResume] = useState({
    name: 'resume_sarah_johnson.pdf',
    uploadDate: '2 days ago',
    size: '2.4 MB'
  });

  // tomiwa: Sample profile data (in real app, this would come from API/database)
  const [profileData, setProfileData] = useState({
    personal: {
      firstName: 'Sarah',
      lastName: 'Johnson',
      title: 'Senior Frontend Developer',
      email: 'sarah.johnson@email.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      website: 'www.sarahjohnson.dev',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
    },
    summary: 'Passionate and results-driven full-stack developer with 5+ years of experience building scalable web applications using React, Next.js, Node.js, and modern JavaScript frameworks. Proven track record of leading cross-functional teams and delivering high-impact projects that serve 10,000+ users daily. Strong expertise in user experience design, performance optimization, and cloud architecture. Experienced in agile methodologies, code reviews, and mentoring junior developers. Committed to writing clean, maintainable code and staying current with emerging technologies. Successfully reduced application load times by 40% and improved user engagement by 25% through strategic optimization initiatives.',
    experience: [
      {
        id: 1,
        company: 'TechCorp Inc.',
        position: 'Senior Frontend Developer',
        location: 'San Francisco, CA',
        startDate: '2022-01',
        endDate: 'Present',
        description: 'Lead frontend development for enterprise SaaS platform serving 10k+ users. Built responsive React components and optimized performance.'
      },
      {
        id: 2,
        company: 'StartupXYZ',
        position: 'Frontend Developer',
        location: 'Remote',
        startDate: '2020-03',
        endDate: '2021-12',
        description: 'Developed user interfaces for mobile-first web application. Collaborated with design team to implement pixel-perfect designs.'
      }
    ],
    education: [
      {
        id: 1,
        institution: 'University of California, Berkeley',
        degree: 'Bachelor of Science in Computer Science',
        location: 'Berkeley, CA',
        startDate: '2016-09',
        endDate: '2020-05',
        gpa: '3.8',
        link: 'https://www.berkeley.edu'
      },
      {
        id: 2,
        institution: 'Stanford University',
        degree: 'Master of Science in Software Engineering',
        location: 'Stanford, CA',
        startDate: '2020-09',
        endDate: '2022-06',
        gpa: '3.9',
        link: 'https://www.stanford.edu'
      }
    ],
    skills: [
      { category: 'Frontend', skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'JavaScript'] },
      { category: 'Backend', skills: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB'] },
      { category: 'Tools', skills: ['Git', 'Docker', 'AWS', 'Figma', 'Webpack'] }
    ]
  });

  // tomiwa: Toggle edit mode for different sections
  const toggleEditMode = (section) => {
    setEditMode(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // tomiwa: Modal management functions
  const openModal = (modalName, data = null) => {
    setModals(prev => ({ ...prev, [modalName]: true }));
    if (data) {
      setFormData(prev => ({ ...prev, [modalName.replace('edit', '').replace('add', '')]: data }));
    }
  };

  const closeModal = (modalName) => {
    setModals(prev => ({ ...prev, [modalName]: false }));
    // Reset form data when closing
    const dataKey = modalName.replace('edit', '').replace('add', '');
    if (formData[dataKey]) {
      setFormData(prev => ({ 
        ...prev, 
        [dataKey]: dataKey === 'personalInfo'
          ? { firstName: '', lastName: '', title: '', email: '', phone: '', location: '', website: '' }
          : dataKey === 'experience' 
          ? { id: null, company: '', position: '', location: '', startDate: '', endDate: '', description: '' }
          : dataKey === 'education'
          ? { id: null, institution: '', degree: '', location: '', startDate: '', endDate: '', gpa: '', link: '' }
          : dataKey === 'project'
          ? { title: '', description: '', technologies: [], link: '', image: '' }
          : { category: '', skills: [] }
      }));
    }
  };

  // tomiwa: File upload handlers
  const handleResumeUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // tomiwa: In real app, upload to server and get URL
      setCurrentResume({
        name: file.name,
        uploadDate: 'Just now',
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`
      });
      console.log('Resume uploaded:', file);
    }
  };

  const handleAvatarUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // tomiwa: In real app, upload to server and get URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData(prev => ({
          ...prev,
          personal: { ...prev.personal, avatar: e.target.result }
        }));
      };
      reader.readAsDataURL(file);
      console.log('Avatar uploaded:', file);
    }
  };

  // tomiwa: Resume actions
  const handleResumeView = () => {
    // tomiwa: In real app, open resume in new tab or modal
    window.open('#', '_blank');
    console.log('Viewing resume');
  };

  const handleResumeDelete = () => {
    if (confirm('Are you sure you want to delete this resume?')) {
      setCurrentResume(null);
      console.log('Resume deleted');
    }
  };

  // tomiwa: Experience management
  const handleAddExperience = (expData) => {
    const newExperience = {
      ...expData,
      id: Date.now() // In real app, this would be generated by backend
    };
    setProfileData(prev => ({
      ...prev,
      experience: [...prev.experience, newExperience]
    }));
    closeModal('addExperience');
  };

  const handleEditExperience = (expData) => {
    setProfileData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => 
        exp.id === expData.id ? expData : exp
      )
    }));
    closeModal('editExperience');
  };

  const handleDeleteExperience = (id) => {
    if (confirm('Are you sure you want to delete this experience?')) {
      setProfileData(prev => ({
        ...prev,
        experience: prev.experience.filter(exp => exp.id !== id)
      }));
    }
  };

  // tomiwa: Education management
  const handleAddEducation = (eduData) => {
    const newEducation = {
      ...eduData,
      id: Date.now()
    };
    setProfileData(prev => ({
      ...prev,
      education: [...prev.education, newEducation]
    }));
    closeModal('addEducation');
  };

  const handleEditEducation = (eduData) => {
    setProfileData(prev => ({
      ...prev,
      education: prev.education.map(edu => 
        edu.id === eduData.id ? eduData : edu
      )
    }));
    closeModal('editEducation');
  };

  const handleDeleteEducation = (id) => {
    if (confirm('Are you sure you want to delete this education?')) {
      setProfileData(prev => ({
        ...prev,
        education: prev.education.filter(edu => edu.id !== id)
      }));
    }
  };

  // tomiwa: Skills management
  const handleAddSkill = (category, skill) => {
    setProfileData(prev => {
      const existingCategory = prev.skills.find(cat => cat.category === category);
      if (existingCategory) {
        return {
          ...prev,
          skills: prev.skills.map(cat => 
            cat.category === category 
              ? { ...cat, skills: [...cat.skills, skill] }
              : cat
          )
        };
      } else {
        return {
          ...prev,
          skills: [...prev.skills, { category, skills: [skill] }]
        };
      }
    });
  };

  const handleRemoveSkill = (category, skillToRemove) => {
    setProfileData(prev => ({
      ...prev,
      skills: prev.skills.map(cat => 
        cat.category === category 
          ? { ...cat, skills: cat.skills.filter(skill => skill !== skillToRemove) }
          : cat
      ).filter(cat => cat.skills.length > 0)
    }));
  };

  // tomiwa: Personal info management
  const handleEditPersonalInfo = () => {
    // Pre-fill form with current data
    setFormData(prev => ({
      ...prev,
      personalInfo: {
        firstName: profileData.personal.firstName,
        lastName: profileData.personal.lastName,
        title: profileData.personal.title,
        email: profileData.personal.email,
        phone: profileData.personal.phone,
        location: profileData.personal.location,
        website: profileData.personal.website
      }
    }));
    openModal('editPersonalInfo');
  };

  const handleSavePersonalInfo = (personalData) => {
    setProfileData(prev => ({
      ...prev,
      personal: {
        ...prev.personal,
        ...personalData
      }
    }));
    closeModal('editPersonalInfo');
  };

  // tomiwa: NEW - AI Assistant handlers
  const handleAiAction = (actionType) => {
    switch (actionType) {
      case 'profile_analysis':
        setShowProfileAnalysis(true);
        setShowAiAssistant(false);
        break;
      case 'resume_optimization':
        setShowResumeOptimization(true);
        setShowAiAssistant(false);
        break;
      case 'skills_recommendation':
        setShowSkillsRecommendation(true);
        setShowAiAssistant(false);
        break;
      case 'generate_summary':
        // Generate AI summary based on experience and education
        const aiSummary = `Experienced ${profileData.personal.title.toLowerCase()} with ${profileData.experience.length}+ years of professional experience. Skilled in ${profileData.skills.map(cat => cat.skills.slice(0, 3).join(', ')).join(', ')}. Proven track record of delivering high-quality solutions and collaborating effectively with cross-functional teams.`;
        setProfileData(prev => ({
          ...prev,
          summary: aiSummary
        }));
        alert('AI-generated summary has been added to your profile!');
        break;
      default:
        break;
    }
  };

  return (
    <CandidateDashboardLayout>
      {/* tomiwa: Main container with proper spacing and responsive design */}
      <div className="
        w-full 
        px-4 sm:px-6 lg:px-8 
        py-6 sm:py-8 
        max-w-7xl 
        mx-auto
        min-h-screen
      ">
        
        {/* tomiwa: Profile Header Section - displays main profile info */}
        <div className="
          bg-white 
          rounded-xl 
          shadow-sm 
          border border-neutral-200 
          overflow-hidden 
          mb-6 sm:mb-8
        ">
          {/* tomiwa: Header background with gradient */}
          <div className="
            bg-gradient-to-r 
            from-brand-aqua 
            to-primary-600 
            h-32 sm:h-40 
            relative
          ">
            {/* tomiwa: Edit button for personal info */}
            <button
              onClick={handleEditPersonalInfo}
              className="
                absolute 
                top-4 
                right-4 
                bg-white/20 
                hover:bg-white/30 
                backdrop-blur-sm 
                rounded-lg 
                p-2 
                transition-colors
              "
              title="Edit personal information"
            >
              <PencilIcon className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* tomiwa: Profile content with avatar and info */}
          <div className="
            px-4 sm:px-6 lg:px-8 
            pb-8 sm:pb-10 
            -mt-16 sm:-mt-20 
            relative
          ">
            {/* tomiwa: Avatar and basic info row */}
            <div className="
              flex 
              flex-col sm:flex-row 
              items-center sm:items-end 
              gap-6 sm:gap-8 
              mb-8
            ">
              {/* tomiwa: Profile avatar with upload functionality */}
              <div className="relative group">
                <img
                  src={profileData.personal.avatar}
                  alt="Profile"
                  className="
                    w-24 h-24 sm:w-32 sm:h-32 
                    rounded-xl 
                    border-4 
                    border-white 
                    shadow-lg 
                    object-cover
                  "
                />
                <div 
                  onClick={() => avatarInputRef.current?.click()}
                  className="
                  absolute 
                  inset-0 
                  bg-black/50 
                  rounded-xl 
                  flex 
                  items-center 
                  justify-center 
                  opacity-0 
                  group-hover:opacity-100 
                  transition-opacity 
                  cursor-pointer
                  "
                >
                  <DocumentArrowUpIcon className="w-6 h-6 text-white" />
                </div>
                {/* tomiwa: Hidden file input for avatar upload */}
                <input
                  ref={avatarInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                />
              </div>

              {/* tomiwa: Name and title */}
              <div className="text-center sm:text-left flex-1 min-w-0">
                <h1 className="
                  text-2xl sm:text-3xl lg:text-4xl
                  font-display 
                  font-bold 
                  text-neutral-900 
                  mb-2
                ">
                  {profileData.personal.firstName} {profileData.personal.lastName}
                </h1>
                <p className="
                  text-lg sm:text-xl lg:text-2xl
                  text-brand-aqua 
                  font-medium 
                  mb-6
                ">
                  {profileData.personal.title}
                </p>

                {/* tomiwa: Contact info grid - responsive layout with better spacing */}
                <div className="
                  grid 
                  grid-cols-1 sm:grid-cols-2 
                  gap-4 sm:gap-6 
                  text-sm 
                  text-neutral-600
                ">
                  <div className="flex items-center gap-3 py-1">
                    <MapPinIcon className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                    <span className="truncate">{profileData.personal.location}</span>
                  </div>
                  <div className="flex items-center gap-3 py-1">
                    <EnvelopeIcon className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                    <span className="truncate">{profileData.personal.email}</span>
                  </div>
                  <div className="flex items-center gap-3 py-1">
                    <PhoneIcon className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                    <span className="truncate">{profileData.personal.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 py-1">
                    <GlobeAltIcon className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                    <span className="truncate">{profileData.personal.website}</span>
                  </div>
                </div>
              </div>

              {/* tomiwa: Action buttons */}
              <div className="
                flex 
                flex-col sm:flex-row 
                gap-3 
                w-full sm:w-auto
                mt-6 sm:mt-0
              ">
                <button
                  onClick={() => setShowAiAssistant(!showAiAssistant)}
                  className={`inline-flex items-center gap-2 px-4 py-2 font-semibold rounded-xl transition-colors ${
                    showAiAssistant 
                      ? 'bg-brand-yellow text-brand-black' 
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  <SparklesIcon className="w-4 h-4" />
                  AI Assistant
                </button>
                <button 
                  onClick={() => resumeInputRef.current?.click()}
                  className="
                  bg-brand-orange 
                  hover:bg-secondary-600 
                  text-white 
                  px-4 sm:px-6 
                  py-2 sm:py-3 
                  rounded-xl 
                  font-medium 
                  transition-colors 
                  flex 
                  items-center 
                  justify-center 
                  gap-2
                  shadow-sm
                  hover:shadow-md
                  "
                >
                  <DocumentArrowUpIcon className="w-4 h-4" />
                  Upload Resume
                </button>
                <button 
                  onClick={() => openModal('previewProfile')}
                  className="
                  border 
                  border-neutral-300 
                  hover:border-brand-aqua 
                  hover:bg-brand-aqua/5
                  text-neutral-700 
                  hover:text-brand-aqua
                  px-4 sm:px-6 
                  py-2 sm:py-3 
                  rounded-xl 
                  font-medium 
                  transition-all
                  flex 
                  items-center 
                  justify-center 
                  gap-2
                  shadow-sm
                  "
                >
                  <EyeIcon className="w-4 h-4" />
                  Preview Profile
                </button>
                {/* tomiwa: Hidden file input for resume upload */}
                <input
                  ref={resumeInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleResumeUpload}
                  className="hidden"
                />
              </div>
            </div>
          </div>
        </div>

        {/* tomiwa: Main content grid - responsive layout with better spacing */}
        <div className="
          grid 
          grid-cols-1 lg:grid-cols-3 
          gap-8 lg:gap-10
          items-start
        ">
          
          {/* tomiwa: Left column - main content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* tomiwa: Professional Summary Section */}
            <div className="
              bg-white 
              rounded-xl 
              shadow-sm 
              border 
              border-neutral-200 
              p-6 sm:p-8
            ">
              <div className="flex items-center justify-between mb-6">
                <h2 className="
                  text-xl sm:text-2xl 
                  font-display 
                  font-bold 
                  text-neutral-900
                ">
                  Professional Summary
                </h2>
                {editMode.summary ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleEditMode('summary')}
                      className="
                        text-green-600 
                        hover:text-green-700 
                        p-2 
                        rounded-lg 
                        hover:bg-green-50 
                        transition-colors
                      "
                      title="Save changes"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </button>
                    <button
                      onClick={() => toggleEditMode('summary')}
                      className="
                        text-neutral-400 
                        hover:text-neutral-600 
                        p-2 
                        rounded-lg 
                        hover:bg-neutral-50 
                        transition-colors
                      "
                      title="Cancel editing"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ) : (
                <button
                  onClick={() => toggleEditMode('summary')}
                  className="
                    text-brand-aqua 
                    hover:text-primary-600 
                    p-2 
                    rounded-lg 
                    hover:bg-neutral-50 
                    transition-colors
                  "
                >
                  <PencilIcon className="w-4 h-4" />
                </button>
                )}
              </div>
              {editMode.summary ? (
                <textarea
                  value={profileData.summary}
                  onChange={(e) => setProfileData(prev => ({
                    ...prev,
                    summary: e.target.value
                  }))}
                  rows={4}
                  className="
                    w-full 
                    px-3 
                    py-2 
                    border 
                    border-neutral-300 
                    rounded-lg 
                    focus:ring-2 
                    focus:ring-brand-aqua 
                    focus:border-transparent
                    text-neutral-700 
                    leading-relaxed
                  "
                  placeholder="Write a brief professional summary..."
                />
              ) : (
              <p className="text-neutral-700 leading-relaxed">
                {profileData.summary}
              </p>
              )}
            </div>

            {/* tomiwa: Work Experience Section */}
            <div className="
              bg-white 
              rounded-xl 
              shadow-sm 
              border 
              border-neutral-200 
              p-6 sm:p-8
            ">
              <div className="flex items-center justify-between mb-6">
                <h2 className="
                  text-xl sm:text-2xl 
                  font-display 
                  font-bold 
                  text-neutral-900 
                  flex 
                  items-center 
                  gap-3
                ">
                  <BriefcaseIcon className="w-6 h-6 text-brand-aqua" />
                  Work Experience
                </h2>
                <button 
                  onClick={() => openModal('addExperience')}
                  className="
                  bg-brand-aqua 
                  hover:bg-primary-600 
                  text-white 
                  px-4 
                  py-2 
                  rounded-xl 
                  font-medium 
                  transition-colors 
                  flex 
                  items-center 
                  gap-2
                  shadow-sm
                  hover:shadow-md
                  "
                >
                  <PlusIcon className="w-4 h-4" />
                  Add Experience
                </button>
              </div>

              {/* tomiwa: Experience items */}
              <div className="space-y-6">
                {profileData.experience.map((exp, index) => (
                  <div key={exp.id} className="
                    border-l-4 
                    border-brand-aqua 
                    pl-6 
                    relative
                  ">
                    {/* tomiwa: Timeline dot */}
                    <div className="
                      absolute 
                      -left-2 
                      top-0 
                      w-4 h-4 
                      bg-brand-aqua 
                      rounded-full
                    "></div>
                    
                    <div className="flex flex-col gap-4 mb-4">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="
                            text-lg 
                            font-bold 
                            text-neutral-900
                            mb-2
                          ">
                            {exp.position}
                          </h3>
                          <div className="flex items-center gap-2 text-brand-aqua font-medium mb-3">
                            <BuildingOfficeIcon className="w-4 h-4 flex-shrink-0" />
                            <span className="truncate">{exp.company}</span>
                          </div>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          <button 
                            onClick={() => openModal('editExperience', exp)}
                            className="
                            text-neutral-400 
                            hover:text-brand-aqua 
                            p-2 
                            rounded-lg
                            hover:bg-neutral-50
                            transition-colors
                            "
                          >
                            <PencilIcon className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteExperience(exp.id)}
                            className="
                            text-neutral-400 
                            hover:text-red-500 
                            p-2 
                            rounded-lg
                            hover:bg-neutral-50
                            transition-colors
                            "
                          >
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-sm text-neutral-600">
                        <div className="flex items-center gap-2">
                          <MapPinIcon className="w-4 h-4 flex-shrink-0" />
                          <span>{exp.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="w-4 h-4 flex-shrink-0" />
                          <span>{exp.startDate} - {exp.endDate}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-neutral-700 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* tomiwa: Education Section */}
            <div className="
              bg-white 
              rounded-xl 
              shadow-sm 
              border 
              border-neutral-200 
              p-6 sm:p-8
            ">
              <div className="flex items-center justify-between mb-6">
                <h2 className="
                  text-xl sm:text-2xl 
                  font-display 
                  font-bold 
                  text-neutral-900 
                  flex 
                  items-center 
                  gap-3
                ">
                  <AcademicCapIcon className="w-6 h-6 text-brand-yellow" />
                  Education
                </h2>
                <button 
                  onClick={() => openModal('addEducation')}
                  className="
                  bg-brand-yellow 
                  hover:bg-accent-600 
                  text-neutral-900 
                  px-4 
                  py-2 
                  rounded-xl 
                  font-medium 
                  transition-colors 
                  flex 
                  items-center 
                  gap-2
                  shadow-sm
                  hover:shadow-md
                  "
                >
                  <PlusIcon className="w-4 h-4" />
                  Add Education
                </button>
              </div>

              {/* tomiwa: Education items */}
              <div className="space-y-6">
                {profileData.education.map((edu, index) => (
                  <div key={edu.id} className="
                    border-l-4 
                    border-brand-yellow 
                    pl-6 
                    relative
                  ">
                    {/* tomiwa: Timeline dot */}
                    <div className="
                      absolute 
                      -left-2 
                      top-0 
                      w-4 h-4 
                      bg-brand-yellow 
                      rounded-full
                    "></div>
                    
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="
                            text-lg 
                            font-bold 
                            text-neutral-900
                            mb-2
                          ">
                            {edu.degree}
                          </h3>
                          <div className="flex items-center gap-2 text-brand-yellow font-medium mb-3">
                            <BuildingOfficeIcon className="w-4 h-4 flex-shrink-0" />
                            {edu.link ? (
                              <a 
                                href={edu.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="truncate hover:underline hover:text-accent-600 transition-colors"
                                title="Visit institution website"
                              >
                                {edu.institution}
                              </a>
                            ) : (
                            <span className="truncate">{edu.institution}</span>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          <button 
                            onClick={() => openModal('editEducation', edu)}
                            className="
                            text-neutral-400 
                            hover:text-brand-yellow 
                            p-2 
                            rounded-lg
                            hover:bg-neutral-50
                            transition-colors
                            "
                          >
                            <PencilIcon className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteEducation(edu.id)}
                            className="
                            text-neutral-400 
                            hover:text-red-500 
                            p-2 
                            rounded-lg
                            hover:bg-neutral-50
                            transition-colors
                            "
                          >
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-sm text-neutral-600">
                        <div className="flex items-center gap-2">
                          <MapPinIcon className="w-4 h-4 flex-shrink-0" />
                          <span>{edu.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="w-4 h-4 flex-shrink-0" />
                          <span>{edu.startDate} - {edu.endDate}</span>
                        </div>
                        {edu.gpa && (
                          <div className="text-brand-yellow font-medium">
                            GPA: {edu.gpa}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* tomiwa: Right column - sidebar content */}
          <div className="space-y-8">
            
            {/* tomiwa: Skills Section */}
            <div className="
              bg-white 
              rounded-xl 
              shadow-sm 
              border 
              border-neutral-200 
              p-6 sm:p-8
            ">
              <div className="flex items-center justify-between mb-6">
                <h2 className="
                  text-xl 
                  font-display 
                  font-bold 
                  text-neutral-900 
                  flex 
                  items-center 
                  gap-3
                ">
                  <StarIcon className="w-5 h-5 text-brand-orange" />
                  Skills
                </h2>
                <button 
                  onClick={() => openModal('addSkill')}
                  className="
                  text-brand-orange 
                  hover:text-secondary-600 
                  p-2 
                  rounded-lg 
                  hover:bg-neutral-50 
                  transition-colors
                  "
                >
                  <PencilIcon className="w-4 h-4" />
                </button>
              </div>

              {/* tomiwa: Skills by category */}
              <div className="space-y-6">
                {profileData.skills.map((category, index) => (
                  <div key={index}>
                    <h3 className="
                      text-sm 
                      font-bold 
                      text-neutral-900 
                      uppercase 
                      tracking-wide 
                      mb-3
                    ">
                      {category.category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          onClick={() => handleRemoveSkill(category.category, skill)}
                          className="
                            bg-neutral-100 
                            hover:bg-red-100 
                            hover:text-red-600
                            text-neutral-700 
                            px-3 
                            py-1 
                            rounded-full 
                            text-sm 
                            font-medium 
                            transition-colors 
                            cursor-pointer
                            relative
                            group
                          "
                          title="Click to remove skill"
                        >
                          {skill}
                          <span className="
                            ml-1 
                            opacity-0 
                            group-hover:opacity-100 
                            transition-opacity
                            text-red-500
                          ">
                            ×
                          </span>
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* tomiwa: Add skill button */}
              <button 
                onClick={() => openModal('addSkill')}
                className="
                w-full 
                mt-6 
                border-2 
                border-dashed 
                border-neutral-300 
                hover:border-brand-orange 
                text-neutral-600 
                hover:text-brand-orange 
                py-3 
                rounded-lg 
                font-medium 
                transition-colors 
                flex 
                items-center 
                justify-center 
                gap-2
                "
              >
                <PlusIcon className="w-4 h-4" />
                Add Skill
              </button>
            </div>

            {/* tomiwa: Resume Section */}
            <div className="
              bg-white 
              rounded-xl 
              shadow-sm 
              border 
              border-neutral-200 
              p-6 sm:p-8
            ">
              <h2 className="
                text-xl 
                font-display 
                font-bold 
                text-neutral-900 
                mb-6 
                flex 
                items-center 
                gap-3
              ">
                <DocumentArrowUpIcon className="w-5 h-5 text-brand-aqua" />
                Resume
              </h2>

              {/* tomiwa: Resume upload area */}
              <div 
                onClick={() => resumeInputRef.current?.click()}
                className="
                border-2 
                border-dashed 
                border-neutral-300 
                hover:border-brand-aqua 
                rounded-lg 
                p-6 
                text-center 
                transition-colors 
                cursor-pointer 
                group
                "
              >
                <DocumentArrowUpIcon className="
                  w-12 h-12 
                  text-neutral-400 
                  group-hover:text-brand-aqua 
                  mx-auto 
                  mb-4 
                  transition-colors
                " />
                <p className="
                  text-neutral-600 
                  group-hover:text-brand-aqua 
                  font-medium 
                  mb-2 
                  transition-colors
                ">
                  Drop your resume here or click to upload
                </p>
                <p className="text-sm text-neutral-500">
                  PDF, DOC, DOCX up to 10MB
                </p>
              </div>

              {/* tomiwa: Current resume (if exists) */}
              {currentResume && (
              <div className="mt-4 p-4 bg-neutral-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                      <DocumentArrowUpIcon className="w-4 h-4 text-red-600" />
                    </div>
                    <div>
                        <p className="font-medium text-neutral-900">{currentResume.name}</p>
                        <p className="text-sm text-neutral-500">
                          Uploaded {currentResume.uploadDate} • {currentResume.size}
                        </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                      <button 
                        onClick={handleResumeView}
                        className="
                      text-brand-aqua 
                      hover:text-primary-600 
                      p-1 
                      rounded 
                      transition-colors
                        "
                        title="View resume"
                      >
                      <EyeIcon className="w-4 h-4" />
                    </button>
                      <button 
                        onClick={handleResumeDelete}
                        className="
                      text-neutral-400 
                      hover:text-red-500 
                      p-1 
                      rounded 
                      transition-colors
                        "
                        title="Delete resume"
                      >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
              )}
            </div>

            {/* tomiwa: Portfolio Section */}
            <div className="
              bg-white 
              rounded-xl 
              shadow-sm 
              border 
              border-neutral-200 
              p-6 sm:p-8
            ">
              <div className="flex items-center justify-between mb-6">
                <h2 className="
                  text-xl 
                  font-display 
                  font-bold 
                  text-neutral-900
                ">
                  Portfolio
                </h2>
                <button 
                  onClick={() => openModal('addProject')}
                  className="
                  bg-brand-yellow 
                  hover:bg-accent-600 
                  text-neutral-900 
                  px-4 
                  py-2 
                  rounded-xl 
                  font-medium 
                  transition-colors 
                  flex 
                  items-center 
                  gap-2
                  shadow-sm
                  hover:shadow-md
                  "
                >
                  <PlusIcon className="w-4 h-4" />
                  Add Project
                </button>
      </div>

              {/* tomiwa: Portfolio placeholder */}
              <div className="
                border-2 
                border-dashed 
                border-neutral-300 
                rounded-lg 
                p-8 
                text-center
              ">
                <div className="w-16 h-16 bg-neutral-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <BriefcaseIcon className="w-8 h-8 text-neutral-400" />
                </div>
                <p className="text-neutral-600 font-medium mb-2">
                  Showcase your best work
                </p>
                <p className="text-sm text-neutral-500">
                  Add projects, case studies, and portfolio pieces
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* tomiwa: NEW - AI Assistant Panel */}
        {showAiAssistant && (
          <div className="mt-8 bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-brand-yellow to-brand-orange p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <SparklesIcon className="w-6 h-6 text-brand-black" />
                  </div>
                  <div>
                    <h2 className="text-xl font-display font-bold text-brand-black">AI Profile Assistant</h2>
                    <p className="text-brand-black/80">Optimize your profile to attract more employers</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowAiAssistant(false)}
                  className="p-2 text-brand-black/60 hover:text-brand-black hover:bg-white/20 rounded-lg transition-colors"
                >
                  <EllipsisVerticalIcon className="w-5 h-5 rotate-90" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <button
                  onClick={() => handleAiAction('profile_analysis')}
                  className="text-left p-4 border border-neutral-200 rounded-lg hover:border-brand-aqua hover:bg-brand-aqua/5 transition-all group"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-brand-aqua/10 rounded-lg flex items-center justify-center group-hover:bg-brand-aqua/20 transition-colors">
                      <ClipboardDocumentListIcon className="w-5 h-5 text-brand-aqua" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-neutral-900 mb-1">Profile Analysis</h3>
                      <p className="text-sm text-neutral-600 mb-2">Get detailed insights on your profile completeness</p>
                      <span className="text-xs font-medium text-brand-aqua">Analyze Profile</span>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => handleAiAction('resume_optimization')}
                  className="text-left p-4 border border-neutral-200 rounded-lg hover:border-brand-aqua hover:bg-brand-aqua/5 transition-all group"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-brand-orange/10 rounded-lg flex items-center justify-center group-hover:bg-brand-orange/20 transition-colors">
                      <DocumentArrowUpIcon className="w-5 h-5 text-brand-orange" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-neutral-900 mb-1">Resume Optimization</h3>
                      <p className="text-sm text-neutral-600 mb-2">Improve your resume with AI suggestions</p>
                      <span className="text-xs font-medium text-brand-orange">Optimize Resume</span>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => handleAiAction('skills_recommendation')}
                  className="text-left p-4 border border-neutral-200 rounded-lg hover:border-brand-aqua hover:bg-brand-aqua/5 transition-all group"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-brand-yellow/20 rounded-lg flex items-center justify-center group-hover:bg-brand-yellow/30 transition-colors">
                      <StarIcon className="w-5 h-5 text-brand-yellow" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-neutral-900 mb-1">Skills Recommendation</h3>
                      <p className="text-sm text-neutral-600 mb-2">Discover trending skills for your field</p>
                      <span className="text-xs font-medium text-brand-yellow">Get Recommendations</span>
                    </div>
                  </div>
                </button>
              </div>

              {/* tomiwa: Quick AI Actions */}
              <div className="border-t border-neutral-200 pt-6">
                <h3 className="text-sm font-semibold text-neutral-900 mb-4">Quick Actions</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleAiAction('generate_summary')}
                    className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-neutral-700 bg-neutral-100 rounded-lg hover:bg-neutral-200 transition-colors"
                  >
                    <SparklesIcon className="w-4 h-4" />
                    Generate Summary
                  </button>
                  <button
                    onClick={() => openModal('addSkill')}
                    className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-neutral-700 bg-neutral-100 rounded-lg hover:bg-neutral-200 transition-colors"
                  >
                    <PlusIcon className="w-4 h-4" />
                    Add Skills
                  </button>
                  <button
                    onClick={() => openModal('addExperience')}
                    className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-neutral-700 bg-neutral-100 rounded-lg hover:bg-neutral-200 transition-colors"
                  >
                    <BriefcaseIcon className="w-4 h-4" />
                    Add Experience
                  </button>
                </div>
              </div>

              {/* tomiwa: Profile completion tips */}
              <div className="mt-6 p-4 bg-brand-aqua/5 rounded-lg border border-brand-aqua/20">
                <div className="flex items-start gap-3">
                  <LightBulbIcon className="w-5 h-5 text-brand-aqua mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-neutral-900 mb-1">Profile Completion Tips</h4>
                    <p className="text-sm text-neutral-700 mb-3">
                      Your profile is {Math.round(((profileData.experience.length > 0 ? 1 : 0) + 
                      (profileData.education.length > 0 ? 1 : 0) + 
                      (profileData.skills.length > 0 ? 1 : 0) + 
                      (profileData.summary ? 1 : 0) + 
                      (currentResume ? 1 : 0)) / 5 * 100)}% complete. Here's how to improve:
                    </p>
                    <ul className="text-sm text-neutral-600 space-y-1">
                      {!profileData.summary && <li>• Add a professional summary to showcase your expertise</li>}
                      {profileData.experience.length === 0 && <li>• Add work experience to demonstrate your background</li>}
                      {profileData.skills.length < 3 && <li>• Add more skills to highlight your capabilities</li>}
                      {!currentResume && <li>• Upload your resume for better visibility</li>}
                      <li>• Keep your profile updated with recent achievements</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* tomiwa: Modal Components */}
        
        {/* Edit Personal Info Modal */}
        {modals.editPersonalInfo && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-neutral-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-display font-bold text-neutral-900">
                    Edit Personal Information
                  </h2>
                  <button
                    onClick={() => closeModal('editPersonalInfo')}
                    className="text-neutral-400 hover:text-neutral-600 p-2 rounded-lg hover:bg-neutral-50"
                  >
                    ×
                  </button>
                </div>
              </div>
              <div className="p-6">
                <form 
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSavePersonalInfo(formData.personalInfo);
                  }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        value={formData.personalInfo.firstName}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          personalInfo: { ...prev.personalInfo, firstName: e.target.value }
                        }))}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-aqua focus:border-transparent"
                        placeholder="Enter first name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        value={formData.personalInfo.lastName}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          personalInfo: { ...prev.personalInfo, lastName: e.target.value }
                        }))}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-aqua focus:border-transparent"
                        placeholder="Enter last name"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Professional Title *
                    </label>
                    <input
                      type="text"
                      value={formData.personalInfo.title}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, title: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-aqua focus:border-transparent"
                      placeholder="e.g. Senior Frontend Developer"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={formData.personalInfo.email}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          personalInfo: { ...prev.personalInfo, email: e.target.value }
                        }))}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-aqua focus:border-transparent"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={formData.personalInfo.phone}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          personalInfo: { ...prev.personalInfo, phone: e.target.value }
                        }))}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-aqua focus:border-transparent"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Location
                      </label>
                      <input
                        type="text"
                        value={formData.personalInfo.location}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          personalInfo: { ...prev.personalInfo, location: e.target.value }
                        }))}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-aqua focus:border-transparent"
                        placeholder="City, State/Country"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Website
                      </label>
                      <input
                        type="url"
                        value={formData.personalInfo.website}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          personalInfo: { ...prev.personalInfo, website: e.target.value }
                        }))}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-aqua focus:border-transparent"
                        placeholder="www.yourwebsite.com"
                      />
                    </div>
                  </div>
                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => closeModal('editPersonalInfo')}
                      className="flex-1 px-4 py-2 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2 bg-brand-aqua text-white rounded-lg hover:bg-primary-600 transition-colors"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Preview Profile Modal */}
        {modals.previewProfile && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-neutral-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-display font-bold text-neutral-900">
                    Profile Preview
                  </h2>
                  <button
                    onClick={() => closeModal('previewProfile')}
                    className="text-neutral-400 hover:text-neutral-600 p-2 rounded-lg hover:bg-neutral-50"
                  >
                    ×
                  </button>
                </div>
              </div>
              <div className="p-6">
                <p className="text-neutral-600 mb-6">
                  This is how your profile appears to employers and other users.
                </p>
                
                {/* tomiwa: Profile Preview Content - Professional candidate profile layout */}
                <div className="bg-gradient-to-br from-neutral-50 to-white rounded-xl border border-neutral-200 overflow-hidden">
                  
                  {/* tomiwa: Header section with gradient background */}
                  <div className="bg-gradient-to-r from-brand-aqua to-primary-600 px-8 py-12 text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="relative z-10">
                      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                        {/* tomiwa: Profile avatar */}
                        <img
                          src={profileData.personal.avatar}
                          alt="Profile"
                          className="w-32 h-32 rounded-xl border-4 border-white/20 shadow-2xl object-cover"
                        />
                        
                        {/* tomiwa: Basic info */}
                        <div className="text-center md:text-left flex-1">
                          <h1 className="text-4xl font-display font-bold mb-3">
                            {profileData.personal.firstName} {profileData.personal.lastName}
                          </h1>
                          <p className="text-2xl font-medium text-white/90 mb-6">
                            {profileData.personal.title}
                          </p>
                          
                          {/* tomiwa: Contact info grid */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-white/80">
                            <div className="flex items-center gap-3 justify-center md:justify-start">
                              <MapPinIcon className="w-5 h-5 flex-shrink-0" />
                              <span>{profileData.personal.location}</span>
                            </div>
                            <div className="flex items-center gap-3 justify-center md:justify-start">
                              <EnvelopeIcon className="w-5 h-5 flex-shrink-0" />
                              <span>{profileData.personal.email}</span>
                            </div>
                            <div className="flex items-center gap-3 justify-center md:justify-start">
                              <PhoneIcon className="w-5 h-5 flex-shrink-0" />
                              <span>{profileData.personal.phone}</span>
                            </div>
                            <div className="flex items-center gap-3 justify-center md:justify-start">
                              <GlobeAltIcon className="w-5 h-5 flex-shrink-0" />
                              <span>{profileData.personal.website}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* tomiwa: Main content area */}
                  <div className="p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      
                      {/* tomiwa: Left column - main content */}
                      <div className="lg:col-span-2 space-y-8">
                        
                        {/* tomiwa: Professional Summary */}
                        <div>
                          <h2 className="text-2xl font-display font-bold text-neutral-900 mb-4 flex items-center gap-3">
                            <div className="w-1 h-8 bg-brand-aqua rounded-full"></div>
                            Professional Summary
                          </h2>
                          <p className="text-neutral-700 leading-relaxed text-lg">
                            {profileData.summary}
                          </p>
                        </div>

                        {/* tomiwa: Work Experience */}
                        <div>
                          <h2 className="text-2xl font-display font-bold text-neutral-900 mb-6 flex items-center gap-3">
                            <div className="w-1 h-8 bg-brand-aqua rounded-full"></div>
                            <BriefcaseIcon className="w-6 h-6 text-brand-aqua" />
                            Work Experience
                          </h2>
                          
                          <div className="space-y-8">
                            {profileData.experience.map((exp, index) => (
                              <div key={exp.id} className="relative pl-8 border-l-2 border-neutral-200">
                                {/* tomiwa: Timeline dot */}
                                <div className="absolute -left-2 top-2 w-4 h-4 bg-brand-aqua rounded-full border-2 border-white shadow-sm"></div>
                                
                                <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-sm">
                                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                                    <div>
                                      <h3 className="text-xl font-bold text-neutral-900 mb-2">
                                        {exp.position}
                                      </h3>
                                      <div className="flex items-center gap-2 text-brand-aqua font-semibold mb-3">
                                        <BuildingOfficeIcon className="w-5 h-5" />
                                        <span>{exp.company}</span>
                                      </div>
                                    </div>
                                    <div className="text-sm text-neutral-600 bg-neutral-50 px-3 py-2 rounded-lg">
                                      {exp.startDate} - {exp.endDate}
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-center gap-2 text-neutral-600 mb-4">
                                    <MapPinIcon className="w-4 h-4" />
                                    <span>{exp.location}</span>
                                  </div>
                                  
                                  <p className="text-neutral-700 leading-relaxed">
                                    {exp.description}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* tomiwa: Education */}
                        <div>
                          <h2 className="text-2xl font-display font-bold text-neutral-900 mb-6 flex items-center gap-3">
                            <div className="w-1 h-8 bg-brand-yellow rounded-full"></div>
                            <AcademicCapIcon className="w-6 h-6 text-brand-yellow" />
                            Education
                          </h2>
                          
                          <div className="space-y-6">
                            {profileData.education.map((edu, index) => (
                              <div key={edu.id} className="relative pl-8 border-l-2 border-neutral-200">
                                {/* tomiwa: Timeline dot */}
                                <div className="absolute -left-2 top-2 w-4 h-4 bg-brand-yellow rounded-full border-2 border-white shadow-sm"></div>
                                
                                <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-sm">
                                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                                    <div>
                                      <h3 className="text-xl font-bold text-neutral-900 mb-2">
                                        {edu.degree}
                                      </h3>
                                      <div className="flex items-center gap-2 text-brand-yellow font-semibold mb-3">
                                        <BuildingOfficeIcon className="w-5 h-5" />
                                        {edu.link ? (
                                          <a 
                                            href={edu.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:underline"
                                          >
                                            {edu.institution}
                                          </a>
                                        ) : (
                                          <span>{edu.institution}</span>
                                        )}
                                      </div>
                                    </div>
                                    <div className="text-sm text-neutral-600 bg-neutral-50 px-3 py-2 rounded-lg">
                                      {edu.startDate} - {edu.endDate}
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-neutral-600">
                                      <MapPinIcon className="w-4 h-4" />
                                      <span>{edu.location}</span>
                                    </div>
                                    {edu.gpa && (
                                      <div className="text-brand-yellow font-semibold">
                                        GPA: {edu.gpa}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* tomiwa: Right column - sidebar */}
                      <div className="space-y-8">
                        
                        {/* tomiwa: Skills section */}
                        <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-sm">
                          <h3 className="text-xl font-display font-bold text-neutral-900 mb-6 flex items-center gap-3">
                            <StarIcon className="w-6 h-6 text-brand-orange" />
                            Skills & Technologies
                          </h3>
                          
                          <div className="space-y-6">
                            {profileData.skills.map((category, index) => (
                              <div key={index}>
                                <h4 className="text-sm font-bold text-neutral-900 uppercase tracking-wide mb-3 text-brand-orange">
                                  {category.category}
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {category.skills.map((skill, skillIndex) => (
                                    <span
                                      key={skillIndex}
                                      className="bg-gradient-to-r from-brand-orange/10 to-secondary-100 text-brand-orange border border-brand-orange/20 px-3 py-2 rounded-full text-sm font-medium"
                                    >
                                      {skill}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* tomiwa: Resume section */}
                        {currentResume && (
                          <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-sm">
                            <h3 className="text-xl font-display font-bold text-neutral-900 mb-4 flex items-center gap-3">
                              <DocumentArrowUpIcon className="w-6 h-6 text-brand-aqua" />
                              Resume
                            </h3>
                            
                            <div className="bg-gradient-to-r from-brand-aqua/5 to-primary-50 rounded-lg p-4 border border-brand-aqua/20">
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-brand-aqua/10 rounded-lg flex items-center justify-center">
                                  <DocumentArrowUpIcon className="w-6 h-6 text-brand-aqua" />
                                </div>
                                <div className="flex-1">
                                  <p className="font-semibold text-neutral-900">{currentResume.name}</p>
                                  <p className="text-sm text-neutral-600">
                                    Updated {currentResume.uploadDate} • {currentResume.size}
                                  </p>
                                </div>
                                <button className="text-brand-aqua hover:text-primary-600 p-2 rounded-lg hover:bg-brand-aqua/10 transition-colors">
                                  <EyeIcon className="w-5 h-5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* tomiwa: Contact card */}
                        <div className="bg-gradient-to-br from-brand-aqua to-primary-600 rounded-lg p-6 text-white shadow-lg">
                          <h3 className="text-xl font-display font-bold mb-4">
                            Get In Touch
                          </h3>
                          <p className="text-white/90 mb-6 leading-relaxed">
                            Interested in working together? Let's connect and discuss opportunities.
                          </p>
                          <div className="space-y-3">
                            <button className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                              <EnvelopeIcon className="w-5 h-5" />
                              Send Message
                            </button>
                            <button className="w-full border border-white/30 hover:bg-white/10 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                              <DocumentArrowUpIcon className="w-5 h-5" />
                              Download Resume
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add/Edit Experience Modal */}
        {(modals.addExperience || modals.editExperience) && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-neutral-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-display font-bold text-neutral-900">
                    {modals.addExperience ? 'Add Work Experience' : 'Edit Work Experience'}
                  </h2>
                  <button
                    onClick={() => closeModal(modals.addExperience ? 'addExperience' : 'editExperience')}
                    className="text-neutral-400 hover:text-neutral-600 p-2 rounded-lg hover:bg-neutral-50"
                  >
                    ×
                  </button>
                </div>
              </div>
              <div className="p-6">
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Job Title *
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-aqua focus:border-transparent"
                        placeholder="e.g. Senior Frontend Developer"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Company *
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-aqua focus:border-transparent"
                        placeholder="e.g. TechCorp Inc."
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-aqua focus:border-transparent"
                      placeholder="e.g. San Francisco, CA or Remote"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Start Date *
                      </label>
                      <input
                        type="month"
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-aqua focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        End Date
                      </label>
                      <input
                        type="month"
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-aqua focus:border-transparent"
                        placeholder="Leave blank if current"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Description
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-aqua focus:border-transparent"
                      placeholder="Describe your role, responsibilities, and achievements..."
                    />
                  </div>
                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => closeModal(modals.addExperience ? 'addExperience' : 'editExperience')}
                      className="flex-1 px-4 py-2 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2 bg-brand-aqua text-white rounded-lg hover:bg-primary-600 transition-colors"
                    >
                      {modals.addExperience ? 'Add Experience' : 'Save Changes'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Add/Edit Education Modal */}
        {(modals.addEducation || modals.editEducation) && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-neutral-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-display font-bold text-neutral-900">
                    {modals.addEducation ? 'Add Education' : 'Edit Education'}
                  </h2>
                  <button
                    onClick={() => closeModal(modals.addEducation ? 'addEducation' : 'editEducation')}
                    className="text-neutral-400 hover:text-neutral-600 p-2 rounded-lg hover:bg-neutral-50"
                  >
                    ×
                  </button>
                </div>
              </div>
              <div className="p-6">
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Institution *
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-yellow focus:border-transparent"
                      placeholder="e.g. University of California, Berkeley"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Degree *
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-yellow focus:border-transparent"
                      placeholder="e.g. Bachelor of Science in Computer Science"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-yellow focus:border-transparent"
                      placeholder="e.g. Berkeley, CA"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Start Date *
                      </label>
                      <input
                        type="month"
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-yellow focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        End Date
                      </label>
                      <input
                        type="month"
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-yellow focus:border-transparent"
                        placeholder="Leave blank if current"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        GPA (Optional)
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-yellow focus:border-transparent"
                        placeholder="e.g. 3.8"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Institution Link (Optional)
                      </label>
                      <input
                        type="url"
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-yellow focus:border-transparent"
                        placeholder="https://www.berkeley.edu"
                      />
                    </div>
                  </div>
                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => closeModal(modals.addEducation ? 'addEducation' : 'editEducation')}
                      className="flex-1 px-4 py-2 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2 bg-brand-yellow text-neutral-900 rounded-lg hover:bg-accent-600 transition-colors"
                    >
                      {modals.addEducation ? 'Add Education' : 'Save Changes'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Add Skill Modal */}
        {modals.addSkill && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-lg w-full">
              <div className="p-6 border-b border-neutral-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-display font-bold text-neutral-900">
                    Add Skill
                  </h2>
                  <button
                    onClick={() => closeModal('addSkill')}
                    className="text-neutral-400 hover:text-neutral-600 p-2 rounded-lg hover:bg-neutral-50"
                  >
                    ×
                  </button>
                </div>
              </div>
              <div className="p-6">
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Category *
                    </label>
                    <select className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent">
                      <option value="">Select or create category</option>
                      <option value="Frontend">Frontend</option>
                      <option value="Backend">Backend</option>
                      <option value="Tools">Tools</option>
                      <option value="Design">Design</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Skill *
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                      placeholder="e.g. React, Python, Figma"
                    />
                  </div>
                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => closeModal('addSkill')}
                      className="flex-1 px-4 py-2 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2 bg-brand-orange text-white rounded-lg hover:bg-secondary-600 transition-colors"
                    >
                      Add Skill
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Add Project Modal */}
        {modals.addProject && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-neutral-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-display font-bold text-neutral-900">
                    Add Project
                  </h2>
                  <button
                    onClick={() => closeModal('addProject')}
                    className="text-neutral-400 hover:text-neutral-600 p-2 rounded-lg hover:bg-neutral-50"
                  >
                    ×
                  </button>
                </div>
              </div>
              <div className="p-6">
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Project Title *
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-yellow focus:border-transparent"
                      placeholder="e.g. E-commerce Platform"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-yellow focus:border-transparent"
                      placeholder="Describe your project, what it does, and your role..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Technologies Used
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-yellow focus:border-transparent"
                      placeholder="e.g. React, Node.js, MongoDB (comma separated)"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Project Link (Optional)
                      </label>
                      <input
                        type="url"
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-yellow focus:border-transparent"
                        placeholder="https://myproject.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Image URL (Optional)
                      </label>
                      <input
                        type="url"
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-yellow focus:border-transparent"
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                  </div>
                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => closeModal('addProject')}
                      className="flex-1 px-4 py-2 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2 bg-brand-yellow text-neutral-900 rounded-lg hover:bg-accent-600 transition-colors"
                    >
                      Add Project
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

      </div>
    </CandidateDashboardLayout>
  );
}


