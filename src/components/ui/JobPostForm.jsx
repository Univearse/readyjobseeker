import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineChevronDown, HiOutlineChevronUp, HiOutlinePlus } from 'react-icons/hi';
import { FiBriefcase, FiMapPin, FiDollarSign, FiFileText, FiTag, FiSettings, FiX } from 'react-icons/fi';
import Link from 'next/link';

// tomiwa: Enhanced form section component with animations
const FormSection = ({ icon: Icon, title, isOpen, onToggle, children, isValid }) => (
  <div className="relative py-6 first:pt-0 last:pb-0">
    <button
      type="button"
      onClick={onToggle}
      className="w-full flex items-center justify-between text-left md:cursor-default"
    >
      <div className="flex items-center gap-4">
        <div className={`p-2 rounded-xl transition-colors ${
          isOpen ? 'bg-brand-aqua/10 text-brand-aqua' : 'bg-neutral-100 text-neutral-500'
        }`}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-display font-medium text-neutral-900">{title}</h3>
          {!isOpen && (
            <p className="text-sm text-neutral-500 mt-1">Click to expand</p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-3">
        {isValid && (
          <span className="hidden md:flex items-center gap-1.5 text-sm font-medium text-brand-aqua">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-2 h-2 rounded-full bg-brand-aqua"
            />
            Complete
          </span>
        )}
        <div className="md:hidden">
          {isOpen ? (
            <HiOutlineChevronUp className="w-5 h-5 text-neutral-400" />
          ) : (
            <HiOutlineChevronDown className="w-5 h-5 text-neutral-400" />
          )}
        </div>
      </div>
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden"
        >
          <div className="pt-6">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

// tomiwa: Input field wrapper for consistent styling
const FormField = ({ label, error, children, helper }) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-neutral-900">
      {label}
    </label>
    {children}
    {(error || helper) && (
      <p className={`text-sm ${error ? 'text-red-500' : 'text-neutral-500'}`}>
        {error || helper}
      </p>
    )}
  </div>
);

export default function JobPostForm({ formData, setFormData, errors, setTouched }) {
  // tomiwa: Section state management
  const [openSections, setOpenSections] = useState({
    basics: true,
    description: false,
    skills: false,
    application: false,
    visibility: false
  });

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // tomiwa: Form field handlers
  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBlur = (field) => {
    setTouched(prev => ({
      ...prev,
      [field]: true
    }));
  };

  // tomiwa: Check section validity
  const isSectionValid = (section) => {
    switch (section) {
      case 'basics':
        return formData.jobTitle && formData.companyName && 
               (formData.locationType === 'remote' || formData.workLocation) &&
               formData.employmentType;
      case 'description':
        return formData.description && formData.description.length >= 100;
      case 'application':
        return (formData.applicationMethod === 'link' && formData.applicationLink) ||
               (formData.applicationMethod === 'email' && formData.applicationEmail);
      default:
        return true;
    }
  };

  return (
    <div className="divide-y divide-neutral-200/80">
      {/* Job Basics */}
      <FormSection
        icon={FiBriefcase}
        title="Job Basics"
        isOpen={openSections.basics}
        onToggle={() => toggleSection('basics')}
        isValid={isSectionValid('basics')}
      >
        <div className="space-y-6">
          <FormField
            label="Job Title*"
            error={errors.jobTitle}
            helper="Be specific - e.g. 'Senior React Developer' instead of just 'Developer'"
          >
            <input
              type="text"
              value={formData.jobTitle}
              onChange={(e) => handleChange('jobTitle', e.target.value)}
              onBlur={() => handleBlur('jobTitle')}
              className={`w-full px-4 py-2.5 rounded-xl border ${
                errors.jobTitle ? 'border-red-300' : 'border-neutral-200'
              } focus:outline-none focus:ring-2 focus:ring-brand-aqua/20 placeholder-neutral-400`}
              placeholder="e.g. Senior Frontend Developer"
            />
          </FormField>

          <FormField
            label="Company Name*"
            error={errors.companyName}
          >
            <input
              type="text"
              value={formData.companyName}
              onChange={(e) => handleChange('companyName', e.target.value)}
              onBlur={() => handleBlur('companyName')}
              className={`w-full px-4 py-2.5 rounded-xl border ${
                errors.companyName ? 'border-red-300' : 'border-neutral-200'
              } focus:outline-none focus:ring-2 focus:ring-brand-aqua/20 placeholder-neutral-400`}
              placeholder="Your company name"
            />
          </FormField>

          <FormField
            label="Location Type*"
            helper="Select how and where the work will be performed"
          >
            <div className="flex flex-wrap gap-2">
              {['Onsite', 'Hybrid', 'Remote'].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => handleChange('locationType', type.toLowerCase())}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    formData.locationType === type.toLowerCase()
                      ? 'bg-brand-aqua text-white shadow-sm'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </FormField>

          {formData.locationType !== 'remote' && (
            <FormField
              label="Work Location*"
              error={errors.workLocation}
            >
              <input
                type="text"
                value={formData.workLocation}
                onChange={(e) => handleChange('workLocation', e.target.value)}
                onBlur={() => handleBlur('workLocation')}
                className={`w-full px-4 py-2.5 rounded-xl border ${
                  errors.workLocation ? 'border-red-300' : 'border-neutral-200'
                } focus:outline-none focus:ring-2 focus:ring-brand-aqua/20 placeholder-neutral-400`}
                placeholder="e.g. Lagos, Nigeria"
              />
            </FormField>
          )}

          <FormField
            label="Employment Type*"
            helper="Select the type of employment opportunity"
          >
            <div className="grid grid-cols-2 gap-2">
              {['Full-time', 'Part-time', 'Contract', 'Internship'].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => handleChange('employmentType', type.toLowerCase())}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    formData.employmentType === type.toLowerCase()
                      ? 'bg-brand-aqua text-white shadow-sm'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </FormField>

          <FormField
            label="Salary Range"
            helper="Optional - Adding a range can attract more relevant candidates"
          >
            <div className="grid grid-cols-3 gap-4">
              <select
                value={formData.salaryRange.currency}
                onChange={(e) => handleChange('salaryRange', {
                  ...formData.salaryRange,
                  currency: e.target.value
                })}
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-brand-aqua/20 bg-white"
              >
                <option value="NGN">NGN</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </select>
              <input
                type="number"
                placeholder="Min"
                value={formData.salaryRange.min}
                onChange={(e) => handleChange('salaryRange', {
                  ...formData.salaryRange,
                  min: e.target.value
                })}
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-brand-aqua/20 placeholder-neutral-400"
              />
              <input
                type="number"
                placeholder="Max"
                value={formData.salaryRange.max}
                onChange={(e) => handleChange('salaryRange', {
                  ...formData.salaryRange,
                  max: e.target.value
                })}
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-brand-aqua/20 placeholder-neutral-400"
              />
            </div>
          </FormField>
        </div>
      </FormSection>

      {/* Description */}
      <FormSection
        icon={FiFileText}
        title="Job Description"
        isOpen={openSections.description}
        onToggle={() => toggleSection('description')}
        isValid={isSectionValid('description')}
      >
        <FormField
          label="Job Description*"
          error={errors.description}
          helper="Minimum 100 characters. Use the template below as a guide."
        >
          <div className="mb-3 flex gap-2 p-1 bg-neutral-100 rounded-lg w-fit">
            {[
              { label: 'B', title: 'Bold' },
              { label: '•', title: 'Bullet Point' },
              { label: 'Link', title: 'Add Link' }
            ].map((control) => (
              <button
                key={control.label}
                type="button"
                title={control.title}
                className="p-2 rounded-lg hover:bg-white hover:shadow-sm text-neutral-600 hover:text-neutral-900 transition-all"
              >
                {control.label}
              </button>
            ))}
          </div>
          <textarea
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            onBlur={() => handleBlur('description')}
            rows={12}
            className={`w-full px-4 py-3 rounded-xl border ${
              errors.description ? 'border-red-300' : 'border-neutral-200'
            } focus:outline-none focus:ring-2 focus:ring-brand-aqua/20 placeholder-neutral-400 font-mono text-sm`}
            placeholder="About the role...

Responsibilities:
• 
• 
• 

Requirements:
• 
• 
• 

Benefits:
• 
• 
• "
          />
          <div className="mt-2 flex justify-between items-center text-sm">
            <span className={`font-mono ${
              formData.description.length < 100 ? 'text-red-500' : 'text-neutral-500'
            }`}>
              {formData.description.length} / 100 characters minimum
            </span>
            <span className="text-neutral-500">
              Markdown supported
            </span>
          </div>
        </FormField>
      </FormSection>

      {/* Skills */}
      <FormSection
        icon={FiTag}
        title="Skills & Keywords"
        isOpen={openSections.skills}
        onToggle={() => toggleSection('skills')}
        isValid={formData.skills.length > 0}
      >
        <FormField
          label="Required Skills"
          helper={`${12 - formData.skills.length} skills remaining (max 12)`}
        >
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {formData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm bg-neutral-100 text-neutral-900 group"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleChange('skills', formData.skills.filter((_, i) => i !== index))}
                    className="opacity-50 group-hover:opacity-100 hover:text-red-500 transition-all"
                  >
                    <FiX className="w-4 h-4" />
                  </button>
                </span>
              ))}
              {formData.skills.length < 12 && (
                <button
                  type="button"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm border-2 border-dashed border-neutral-200 text-neutral-600 hover:border-neutral-300 hover:text-neutral-900 transition-all"
                  onClick={() => {
                    const input = document.getElementById('skillInput');
                    if (input) input.focus();
                  }}
                >
                  <HiOutlinePlus className="w-4 h-4" />
                  Add Skill
                </button>
              )}
            </div>
            
            {formData.skills.length < 12 && (
              <input
                id="skillInput"
                type="text"
                placeholder="Type a skill and press Enter"
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-brand-aqua/20 placeholder-neutral-400"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.target.value && formData.skills.length < 12) {
                    e.preventDefault();
                    handleChange('skills', [...formData.skills, e.target.value]);
                    e.target.value = '';
                  }
                }}
              />
            )}
          </div>
        </FormField>
      </FormSection>

      {/* Application Settings */}
      <FormSection
        icon={FiSettings}
        title="Application Settings"
        isOpen={openSections.application}
        onToggle={() => toggleSection('application')}
        isValid={isSectionValid('application')}
      >
        <div className="space-y-6">
          <FormField
            label="How to Apply*"
            helper="Choose how candidates should apply for this position"
          >
            <div className="space-y-4">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleChange('applicationMethod', 'link')}
                  className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    formData.applicationMethod === 'link'
                      ? 'bg-brand-aqua text-white shadow-sm'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                  }`}
                >
                  External Link
                </button>
                <button
                  type="button"
                  onClick={() => handleChange('applicationMethod', 'email')}
                  className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    formData.applicationMethod === 'email'
                      ? 'bg-brand-aqua text-white shadow-sm'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                  }`}
                >
                  Email Address
                </button>
              </div>

              {formData.applicationMethod === 'link' ? (
                <input
                  type="url"
                  value={formData.applicationLink}
                  onChange={(e) => handleChange('applicationLink', e.target.value)}
                  onBlur={() => handleBlur('applicationLink')}
                  className={`w-full px-4 py-2.5 rounded-xl border ${
                    errors.applicationLink ? 'border-red-300' : 'border-neutral-200'
                  } focus:outline-none focus:ring-2 focus:ring-brand-aqua/20 placeholder-neutral-400`}
                  placeholder="https://your-careers-page.com/job"
                />
              ) : (
                <input
                  type="email"
                  value={formData.applicationEmail}
                  onChange={(e) => handleChange('applicationEmail', e.target.value)}
                  onBlur={() => handleBlur('applicationEmail')}
                  className={`w-full px-4 py-2.5 rounded-xl border ${
                    errors.applicationEmail ? 'border-red-300' : 'border-neutral-200'
                  } focus:outline-none focus:ring-2 focus:ring-brand-aqua/20 placeholder-neutral-400`}
                  placeholder="careers@company.com"
                />
              )}
            </div>
          </FormField>

          <FormField
            label="Screening Questions"
            helper="Optional - Add up to 3 questions candidates must answer"
          >
            <div className="space-y-3">
              {[0, 1, 2].map((index) => (
                <input
                  key={index}
                  type="text"
                  value={formData.screeningQuestions[index]}
                  onChange={(e) => {
                    const newQuestions = [...formData.screeningQuestions];
                    newQuestions[index] = e.target.value;
                    handleChange('screeningQuestions', newQuestions);
                  }}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-brand-aqua/20 placeholder-neutral-400"
                  placeholder={`Question ${index + 1}`}
                />
              ))}
            </div>
          </FormField>
        </div>
      </FormSection>

      {/* Visibility Settings */}
      <FormSection
        icon={FiDollarSign}
        title="Visibility & Duration"
        isOpen={openSections.visibility}
        onToggle={() => toggleSection('visibility')}
        isValid={true}
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-neutral-100 text-neutral-600">
                Basic visibility
              </span>
              <span className="text-sm text-neutral-500">
                Locked on Free Plan
              </span>
            </div>
            <Link
              href="/post-job/create"
              className="text-sm font-medium text-brand-orange hover:text-brand-orange/90 transition-colors"
            >
              Upgrade for Featured
            </Link>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-neutral-100 text-neutral-600">
                30 days duration
              </span>
              <span className="text-sm text-neutral-500">
                Locked on Free Plan
              </span>
            </div>
            <Link
              href="/post-job/create"
              className="text-sm font-medium text-brand-orange hover:text-brand-orange/90 transition-colors"
            >
              Upgrade for More
            </Link>
          </div>
        </div>
      </FormSection>
    </div>
  );
} 