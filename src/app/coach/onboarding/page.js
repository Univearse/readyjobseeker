/**
 * File: src/app/coach/onboarding/page.js
 * 
 * tomiwa: Coach 3-Step Onboarding Flow
 * Simplified onboarding process after account creation
 * 
 * Steps:
 * 1. Basic Info (Professional details, bio)
 * 2. Coaching Setup (Services, pricing, timezone)
 * 3. Availability (Weekly schedule setup)
 * 
 * Design Features:
 * - Clean, focused design matching platform aesthetics
 * - Progress indicator with step navigation
 * - Responsive layout for all devices
 * - Form validation and error handling
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  UserIcon,
  CogIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ExclamationCircleIcon,
  ClockIcon,
  CurrencyDollarIcon,
  GlobeAltIcon,
  TagIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

// tomiwa: Onboarding step configuration
const steps = [
  { id: 1, name: 'Basic Info', icon: UserIcon },
  { id: 2, name: 'Coaching Setup', icon: CogIcon },
  { id: 3, name: 'Availability', icon: CalendarDaysIcon },
];

// tomiwa: Industry options for dropdown
const industries = [
  'Technology',
  'Finance & Banking',
  'Healthcare',
  'Education',
  'Marketing & Sales',
  'Human Resources',
  'Consulting',
  'Manufacturing',
  'Retail',
  'Non-Profit',
  'Government',
  'Other'
];

// tomiwa: Session type options
const sessionTypes = [
  'Career Strategy',
  'Interview Preparation',
  'Resume Review',
  'LinkedIn Optimization',
  'Salary Negotiation',
  'Leadership Development',
  'Career Transition',
  'Networking Skills'
];

// tomiwa: Duration options in minutes
const durationOptions = [
  { value: 30, label: '30 minutes' },
  { value: 45, label: '45 minutes' },
  { value: 60, label: '60 minutes' },
  { value: 90, label: '90 minutes' },
];

// tomiwa: Timezone options (simplified list)
const timezones = [
  'UTC-08:00 (Pacific Time)',
  'UTC-07:00 (Mountain Time)',
  'UTC-06:00 (Central Time)',
  'UTC-05:00 (Eastern Time)',
  'UTC+00:00 (London/GMT)',
  'UTC+01:00 (Central Europe)',
  'UTC+05:30 (India)',
  'UTC+08:00 (Singapore)',
  'UTC+09:00 (Japan)',
  'UTC+10:00 (Sydney)',
];

// tomiwa: Days of the week for availability
const daysOfWeek = [
  { key: 'monday', label: 'Monday', short: 'Mon' },
  { key: 'tuesday', label: 'Tuesday', short: 'Tue' },
  { key: 'wednesday', label: 'Wednesday', short: 'Wed' },
  { key: 'thursday', label: 'Thursday', short: 'Thu' },
  { key: 'friday', label: 'Friday', short: 'Fri' },
  { key: 'saturday', label: 'Saturday', short: 'Sat' },
  { key: 'sunday', label: 'Sunday', short: 'Sun' }
];

// tomiwa: Time options for dropdowns (24-hour format)
const timeOptions = [
  '06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00', '09:30',
  '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
  '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00'
];

// tomiwa: Preset availability templates for quick setup
const availabilityPresets = [
  {
    id: 'business-hours',
    name: 'Business Hours',
    description: 'Monday to Friday, 9 AM - 5 PM',
    schedule: {
      monday: { enabled: true, startTime: '09:00', endTime: '17:00' },
      tuesday: { enabled: true, startTime: '09:00', endTime: '17:00' },
      wednesday: { enabled: true, startTime: '09:00', endTime: '17:00' },
      thursday: { enabled: true, startTime: '09:00', endTime: '17:00' },
      friday: { enabled: true, startTime: '09:00', endTime: '17:00' },
      saturday: { enabled: false, startTime: '', endTime: '' },
      sunday: { enabled: false, startTime: '', endTime: '' }
    }
  },
  {
    id: 'evenings-weekends',
    name: 'Evenings & Weekends',
    description: 'Weekday evenings and weekend mornings',
    schedule: {
      monday: { enabled: true, startTime: '18:00', endTime: '21:00' },
      tuesday: { enabled: true, startTime: '18:00', endTime: '21:00' },
      wednesday: { enabled: true, startTime: '18:00', endTime: '21:00' },
      thursday: { enabled: true, startTime: '18:00', endTime: '21:00' },
      friday: { enabled: true, startTime: '18:00', endTime: '21:00' },
      saturday: { enabled: true, startTime: '09:00', endTime: '15:00' },
      sunday: { enabled: true, startTime: '09:00', endTime: '15:00' }
    }
  },
  {
    id: 'flexible',
    name: 'Flexible Schedule',
    description: 'Morning and afternoon slots throughout the week',
    schedule: {
      monday: { enabled: true, startTime: '10:00', endTime: '16:00' },
      tuesday: { enabled: true, startTime: '10:00', endTime: '16:00' },
      wednesday: { enabled: true, startTime: '10:00', endTime: '16:00' },
      thursday: { enabled: true, startTime: '10:00', endTime: '16:00' },
      friday: { enabled: true, startTime: '10:00', endTime: '16:00' },
      saturday: { enabled: true, startTime: '10:00', endTime: '14:00' },
      sunday: { enabled: false, startTime: '', endTime: '' }
    }
  }
];

export default function CoachOnboardingPage() {
  const router = useRouter();
  
  // tomiwa: Current step state (1-3)
  const [currentStep, setCurrentStep] = useState(1);
  
  // tomiwa: Form data state for onboarding
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    industry: '',
    yearsExperience: '',
    currentRole: '',
    bio: '',
    specialties: [],
    
    // Step 2: Coaching Setup
    sessionTypes: [],
    durations: [],
    pricing: {
      30: '',
      45: '',
      60: '',
      90: ''
    },
    timezone: '',
    
    // Step 3: Availability (new format with day-by-day time ranges)
    availability: {
      monday: { enabled: false, startTime: '', endTime: '' },
      tuesday: { enabled: false, startTime: '', endTime: '' },
      wednesday: { enabled: false, startTime: '', endTime: '' },
      thursday: { enabled: false, startTime: '', endTime: '' },
      friday: { enabled: false, startTime: '', endTime: '' },
      saturday: { enabled: false, startTime: '', endTime: '' },
      sunday: { enabled: false, startTime: '', endTime: '' }
    },
  });

  // tomiwa: Form validation errors
  const [errors, setErrors] = useState({});
  
  // tomiwa: Loading state for form submission
  const [isSubmitting, setIsSubmitting] = useState(false);

  // tomiwa: Update form data and clear errors
  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // johnson: Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  // tomiwa: Add specialty tag
  const addSpecialty = (specialty) => {
    if (specialty && !formData.specialties.includes(specialty)) {
      updateFormData('specialties', [...formData.specialties, specialty]);
    }
  };

  // tomiwa: Remove specialty tag
  const removeSpecialty = (specialty) => {
    updateFormData('specialties', formData.specialties.filter(s => s !== specialty));
  };

  // tomiwa: Toggle session type selection
  const toggleSessionType = (type) => {
    const current = formData.sessionTypes;
    if (current.includes(type)) {
      updateFormData('sessionTypes', current.filter(t => t !== type));
    } else {
      updateFormData('sessionTypes', [...current, type]);
    }
  };

  // tomiwa: Toggle duration selection
  const toggleDuration = (duration) => {
    const current = formData.durations;
    if (current.includes(duration)) {
      updateFormData('durations', current.filter(d => d !== duration));
    } else {
      updateFormData('durations', [...current, duration]);
    }
  };

  // tomiwa: Update pricing for specific duration
  const updatePricing = (duration, price) => {
    updateFormData('pricing', {
      ...formData.pricing,
      [duration]: price
    });
  };

  // tomiwa: Apply preset availability template
  const applyPreset = (preset) => {
    updateFormData('availability', { ...preset.schedule });
  };

  // tomiwa: Toggle day availability
  const toggleDayAvailability = (dayKey) => {
    const currentDay = formData.availability[dayKey];
    updateFormData('availability', {
      ...formData.availability,
      [dayKey]: {
        ...currentDay,
        enabled: !currentDay.enabled,
        // johnson: Clear times when disabling
        startTime: !currentDay.enabled ? currentDay.startTime : '',
        endTime: !currentDay.enabled ? currentDay.endTime : ''
      }
    });
  };

  // tomiwa: Update time for specific day
  const updateDayTime = (dayKey, timeType, value) => {
    updateFormData('availability', {
      ...formData.availability,
      [dayKey]: {
        ...formData.availability[dayKey],
        [timeType]: value
      }
    });
  };

  // tomiwa: Validate current step
  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData.industry) newErrors.industry = 'Please select an industry';
        if (!formData.yearsExperience) newErrors.yearsExperience = 'Years of experience is required';
        if (!formData.currentRole.trim()) newErrors.currentRole = 'Current/last role is required';
        if (!formData.bio.trim()) newErrors.bio = 'Bio is required';
        if (formData.specialties.length === 0) newErrors.specialties = 'Please add at least one specialty';
        break;
        
      case 2:
        if (formData.sessionTypes.length === 0) newErrors.sessionTypes = 'Please select at least one session type';
        if (formData.durations.length === 0) newErrors.durations = 'Please select at least one duration';
        if (!formData.timezone) newErrors.timezone = 'Please select your timezone';
        
        // johnson: Check pricing for selected durations
        const pricingErrors = {};
        formData.durations.forEach(duration => {
          if (!formData.pricing[duration] || formData.pricing[duration] <= 0) {
            pricingErrors[duration] = 'Price is required';
          }
        });
        if (Object.keys(pricingErrors).length > 0) {
          newErrors.pricing = pricingErrors;
        }
        break;
        
      case 3:
        // johnson: Check if at least one day is enabled with valid times
        const hasValidAvailability = Object.values(formData.availability).some(day => 
          day.enabled && day.startTime && day.endTime && day.startTime < day.endTime
        );
        if (!hasValidAvailability) {
          newErrors.availability = 'Please set availability for at least one day with valid time ranges';
        }
        
        // johnson: Validate individual day time ranges
        const dayErrors = {};
        Object.entries(formData.availability).forEach(([dayKey, day]) => {
          if (day.enabled) {
            if (!day.startTime) {
              dayErrors[`${dayKey}_start`] = 'Start time is required';
            }
            if (!day.endTime) {
              dayErrors[`${dayKey}_end`] = 'End time is required';
            }
            if (day.startTime && day.endTime && day.startTime >= day.endTime) {
              dayErrors[`${dayKey}_range`] = 'End time must be after start time';
            }
          }
        });
        if (Object.keys(dayErrors).length > 0) {
          newErrors.dayTimes = dayErrors;
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // tomiwa: Navigate to next step
  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    }
  };

  // tomiwa: Navigate to previous step
  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  // tomiwa: Complete onboarding
  const completeOnboarding = async () => {
    if (!validateStep(3)) return;
    
    setIsSubmitting(true);
    
    try {
      // johnson: Simulate API call to save onboarding data
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // tomiwa: Redirect to coach dashboard
      router.push('/coach/dashboard');
    } catch (error) {
      console.error('Onboarding completion failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // tomiwa: Render step content based on current step
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderBasicInfoStep();
      case 2:
        return renderCoachingSetupStep();
      case 3:
        return renderAvailabilityStep();
      default:
        return null;
    }
  };

  // tomiwa: Step 1 - Basic Information
  const renderBasicInfoStep = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-display font-bold text-brand-black mb-2">
          Tell Us About Yourself
        </h2>
        <p className="text-neutral-600">
          Share your professional background to help us create your coach profile.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* tomiwa: Industry */}
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-2">
            Industry *
          </label>
          <select
            value={formData.industry}
            onChange={(e) => updateFormData('industry', e.target.value)}
            className={`w-full px-4 py-3 rounded-xl border transition-colors ${
              errors.industry 
                ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                : 'border-neutral-200 focus:border-brand-aqua focus:ring-brand-aqua/20'
            } focus:ring-4 focus:outline-none`}
          >
            <option value="">Select your industry</option>
            {industries.map(industry => (
              <option key={industry} value={industry}>{industry}</option>
            ))}
          </select>
          {errors.industry && (
            <p className="mt-2 text-sm text-red-600">{errors.industry}</p>
          )}
        </div>

        {/* tomiwa: Years of Experience */}
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-2">
            Years of Experience *
          </label>
          <select
            value={formData.yearsExperience}
            onChange={(e) => updateFormData('yearsExperience', e.target.value)}
            className={`w-full px-4 py-3 rounded-xl border transition-colors ${
              errors.yearsExperience 
                ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                : 'border-neutral-200 focus:border-brand-aqua focus:ring-brand-aqua/20'
            } focus:ring-4 focus:outline-none`}
          >
            <option value="">Select experience level</option>
            <option value="1-2">1-2 years</option>
            <option value="3-5">3-5 years</option>
            <option value="6-10">6-10 years</option>
            <option value="11-15">11-15 years</option>
            <option value="16-20">16-20 years</option>
            <option value="20+">20+ years</option>
          </select>
          {errors.yearsExperience && (
            <p className="mt-2 text-sm text-red-600">{errors.yearsExperience}</p>
          )}
        </div>

        {/* tomiwa: Current/Last Role */}
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-neutral-700 mb-2">
            Current/Last Role *
          </label>
          <input
            type="text"
            value={formData.currentRole}
            onChange={(e) => updateFormData('currentRole', e.target.value)}
            className={`w-full px-4 py-3 rounded-xl border transition-colors ${
              errors.currentRole 
                ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                : 'border-neutral-200 focus:border-brand-aqua focus:ring-brand-aqua/20'
            } focus:ring-4 focus:outline-none`}
            placeholder="e.g., Senior Product Manager at Tech Company"
          />
          {errors.currentRole && (
            <p className="mt-2 text-sm text-red-600">{errors.currentRole}</p>
          )}
        </div>

        {/* tomiwa: Bio */}
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-neutral-700 mb-2">
            Short Bio *
          </label>
          <textarea
            value={formData.bio}
            onChange={(e) => updateFormData('bio', e.target.value)}
            rows={4}
            className={`w-full px-4 py-3 rounded-xl border transition-colors ${
              errors.bio 
                ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                : 'border-neutral-200 focus:border-brand-aqua focus:ring-brand-aqua/20'
            } focus:ring-4 focus:outline-none resize-none`}
            placeholder="Tell us about your professional background, achievements, and what makes you a great coach..."
          />
          {errors.bio && (
            <p className="mt-2 text-sm text-red-600">{errors.bio}</p>
          )}
        </div>

        {/* tomiwa: Specialties */}
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-neutral-700 mb-2">
            Specialties *
          </label>
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {formData.specialties.map(specialty => (
                <span
                  key={specialty}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-brand-aqua/10 text-brand-aqua rounded-lg text-sm"
                >
                  {specialty}
                  <button
                    type="button"
                    onClick={() => removeSpecialty(specialty)}
                    className="hover:text-red-500 transition-colors"
                  >
                    <XMarkIcon className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add a specialty (e.g., Leadership, Communication)"
                className="flex-1 px-4 py-2 rounded-lg border border-neutral-200 focus:border-brand-aqua focus:ring-brand-aqua/20 focus:ring-4 focus:outline-none transition-colors"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addSpecialty(e.target.value.trim());
                    e.target.value = '';
                  }
                }}
              />
              <button
                type="button"
                onClick={(e) => {
                  const input = e.target.previousElementSibling;
                  addSpecialty(input.value.trim());
                  input.value = '';
                }}
                className="px-4 py-2 bg-brand-aqua text-white rounded-lg hover:bg-brand-aqua/90 transition-colors"
              >
                <TagIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
          {errors.specialties && (
            <p className="mt-2 text-sm text-red-600">{errors.specialties}</p>
          )}
        </div>
      </div>
    </div>
  );

  // tomiwa: Step 2 - Coaching Setup
  const renderCoachingSetupStep = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-display font-bold text-brand-black mb-2">
          Setup Your Coaching Services
        </h2>
        <p className="text-neutral-600">
          Configure your coaching services, pricing, and preferences.
        </p>
      </div>

      <div className="space-y-8">
        {/* tomiwa: Session Types */}
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-4">
            Session Types * <span className="text-neutral-500 font-normal">(Select all that apply)</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {sessionTypes.map(type => (
              <button
                key={type}
                type="button"
                onClick={() => toggleSessionType(type)}
                className={`p-4 rounded-xl border-2 transition-all text-left ${
                  formData.sessionTypes.includes(type)
                    ? 'border-brand-aqua bg-brand-aqua/10 text-brand-aqua'
                    : 'border-neutral-200 hover:border-brand-aqua/50 text-neutral-700'
                }`}
              >
                <div className="font-medium">{type}</div>
              </button>
            ))}
          </div>
          {errors.sessionTypes && (
            <p className="mt-2 text-sm text-red-600">{errors.sessionTypes}</p>
          )}
        </div>

        {/* tomiwa: Duration Options */}
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-4">
            Session Durations * <span className="text-neutral-500 font-normal">(Select all that apply)</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {durationOptions.map(option => (
              <button
                key={option.value}
                type="button"
                onClick={() => toggleDuration(option.value)}
                className={`p-4 rounded-xl border-2 transition-all text-center ${
                  formData.durations.includes(option.value)
                    ? 'border-brand-aqua bg-brand-aqua/10 text-brand-aqua'
                    : 'border-neutral-200 hover:border-brand-aqua/50 text-neutral-700'
                }`}
              >
                <ClockIcon className="w-5 h-5 mx-auto mb-2" />
                <div className="font-medium text-sm">{option.label}</div>
              </button>
            ))}
          </div>
          {errors.durations && (
            <p className="mt-2 text-sm text-red-600">{errors.durations}</p>
          )}
        </div>

        {/* tomiwa: Pricing */}
        {formData.durations.length > 0 && (
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-4">
              Pricing (USD) *
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {formData.durations.map(duration => {
                const option = durationOptions.find(opt => opt.value === duration);
                return (
                  <div key={duration} className="space-y-2">
                    <label className="block text-sm font-medium text-neutral-600">
                      {option.label}
                    </label>
                    <div className="relative">
                      <CurrencyDollarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.pricing[duration]}
                        onChange={(e) => updatePricing(duration, e.target.value)}
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-colors ${
                          errors.pricing?.[duration]
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                            : 'border-neutral-200 focus:border-brand-aqua focus:ring-brand-aqua/20'
                        } focus:ring-4 focus:outline-none`}
                        placeholder="0.00"
                      />
                    </div>
                    {errors.pricing?.[duration] && (
                      <p className="text-sm text-red-600">{errors.pricing[duration]}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* tomiwa: Timezone */}
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-2">
            Timezone *
          </label>
          <div className="relative">
            <GlobeAltIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <select
              value={formData.timezone}
              onChange={(e) => updateFormData('timezone', e.target.value)}
              className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-colors ${
                errors.timezone 
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                  : 'border-neutral-200 focus:border-brand-aqua focus:ring-brand-aqua/20'
              } focus:ring-4 focus:outline-none`}
            >
              <option value="">Select your timezone</option>
              {timezones.map(timezone => (
                <option key={timezone} value={timezone}>{timezone}</option>
              ))}
            </select>
          </div>
          {errors.timezone && (
            <p className="mt-2 text-sm text-red-600">{errors.timezone}</p>
          )}
        </div>
      </div>
    </div>
  );

  // tomiwa: Step 3 - Availability Setup (New intuitive design)
  const renderAvailabilityStep = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-display font-bold text-brand-black mb-2">
          Set Your Availability
        </h2>
        <p className="text-neutral-600">
          Choose when you're available for coaching sessions. You can always update this later.
        </p>
      </div>

      <div className="space-y-8">
        {/* tomiwa: Quick Setup Templates */}
        <div>
          <h3 className="text-lg font-semibold text-brand-black mb-4">
            Quick Setup Templates
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {availabilityPresets.map(preset => (
              <button
                key={preset.id}
                type="button"
                onClick={() => applyPreset(preset)}
                className="p-4 border-2 border-neutral-200 rounded-xl hover:border-brand-aqua hover:bg-brand-aqua/5 transition-all text-left group"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-brand-black group-hover:text-brand-aqua transition-colors">
                    {preset.name}
                  </h4>
                  <ClockIcon className="w-5 h-5 text-neutral-400 group-hover:text-brand-aqua transition-colors" />
                </div>
                <p className="text-sm text-neutral-600">
                  {preset.description}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* tomiwa: Custom Day-by-Day Setup */}
        <div>
          <h3 className="text-lg font-semibold text-brand-black mb-4">
            Custom Schedule
          </h3>
          <div className="space-y-4">
            {daysOfWeek.map(day => {
              const dayData = formData.availability[day.key];
              const hasStartError = errors.dayTimes?.[`${day.key}_start`];
              const hasEndError = errors.dayTimes?.[`${day.key}_end`];
              const hasRangeError = errors.dayTimes?.[`${day.key}_range`];

              return (
                <div key={day.key} className="bg-white border border-neutral-200 rounded-xl p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    {/* tomiwa: Day Toggle */}
                    <div className="flex items-center gap-3 min-w-0 sm:w-32">
                      <button
                        type="button"
                        onClick={() => toggleDayAvailability(day.key)}
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                          dayData.enabled
                            ? 'bg-brand-aqua border-brand-aqua text-white'
                            : 'border-neutral-300 hover:border-brand-aqua'
                        }`}
                      >
                        {dayData.enabled && (
                          <CheckCircleIcon className="w-3 h-3" />
                        )}
                      </button>
                      <label className="font-medium text-brand-black cursor-pointer select-none">
                        <span className="hidden sm:inline">{day.label}</span>
                        <span className="sm:hidden">{day.short}</span>
                      </label>
                    </div>

                    {/* tomiwa: Time Range Selectors */}
                    {dayData.enabled ? (
                      <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                        {/* johnson: Start Time */}
                        <div>
                          <label className="block text-xs font-medium text-neutral-600 mb-1">
                            Start Time
                          </label>
                          <select
                            value={dayData.startTime}
                            onChange={(e) => updateDayTime(day.key, 'startTime', e.target.value)}
                            className={`w-full px-3 py-2 rounded-lg border text-sm transition-colors ${
                              hasStartError || hasRangeError
                                ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                                : 'border-neutral-200 focus:border-brand-aqua focus:ring-brand-aqua/20'
                            } focus:ring-2 focus:outline-none`}
                          >
                            <option value="">Select start</option>
                            {timeOptions.map(time => (
                              <option key={time} value={time}>
                                {time}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* johnson: End Time */}
                        <div>
                          <label className="block text-xs font-medium text-neutral-600 mb-1">
                            End Time
                          </label>
                          <select
                            value={dayData.endTime}
                            onChange={(e) => updateDayTime(day.key, 'endTime', e.target.value)}
                            className={`w-full px-3 py-2 rounded-lg border text-sm transition-colors ${
                              hasEndError || hasRangeError
                                ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                                : 'border-neutral-200 focus:border-brand-aqua focus:ring-brand-aqua/20'
                            } focus:ring-2 focus:outline-none`}
                          >
                            <option value="">Select end</option>
                            {timeOptions.map(time => (
                              <option key={time} value={time}>
                                {time}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* johnson: Duration Display */}
                        <div className="hidden sm:block">
                          {dayData.startTime && dayData.endTime && dayData.startTime < dayData.endTime && (
                            <div className="text-xs text-neutral-600">
                              <span className="font-medium">Duration:</span>
                              <br />
                              {(() => {
                                const start = new Date(`2000-01-01T${dayData.startTime}`);
                                const end = new Date(`2000-01-01T${dayData.endTime}`);
                                const diffHours = (end - start) / (1000 * 60 * 60);
                                return `${diffHours} hour${diffHours !== 1 ? 's' : ''}`;
                              })()}
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="flex-1 text-sm text-neutral-400 italic">
                        Not available on {day.label.toLowerCase()}
                      </div>
                    )}
                  </div>

                  {/* tomiwa: Error Messages */}
                  {(hasStartError || hasEndError || hasRangeError) && (
                    <div className="mt-3 space-y-1">
                      {hasStartError && <p className="text-xs text-red-600">{hasStartError}</p>}
                      {hasEndError && <p className="text-xs text-red-600">{hasEndError}</p>}
                      {hasRangeError && <p className="text-xs text-red-600">{hasRangeError}</p>}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* tomiwa: General Error */}
          {errors.availability && (
            <p className="text-sm text-red-600 mt-4">{errors.availability}</p>
          )}
        </div>

        {/* tomiwa: Weekly Summary Preview */}
        {Object.values(formData.availability).some(day => day.enabled) && (
          <div className="bg-brand-aqua/10 border border-brand-aqua/20 rounded-xl p-6">
            <h4 className="font-semibold text-brand-aqua mb-4 flex items-center gap-2">
              <CalendarDaysIcon className="w-5 h-5" />
              Your Weekly Availability
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {daysOfWeek.map(day => {
                const dayData = formData.availability[day.key];
                if (!dayData.enabled || !dayData.startTime || !dayData.endTime) return null;

                return (
                  <div key={day.key} className="bg-white/50 rounded-lg p-3">
                    <div className="font-medium text-brand-black text-sm mb-1">
                      {day.label}
                    </div>
                    <div className="text-xs text-neutral-600">
                      {dayData.startTime} - {dayData.endTime}
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="text-xs text-brand-aqua/80 mt-4">
              <strong>Note:</strong> You can always update your availability later from your dashboard.
            </p>
          </div>
        )}

        {/* tomiwa: Helpful Tips */}
        <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-6">
          <h4 className="font-semibold text-brand-black mb-3 flex items-center gap-2">
            <ExclamationCircleIcon className="w-5 h-5 text-brand-orange" />
            Tips for Setting Availability
          </h4>
          <ul className="space-y-2 text-sm text-neutral-600">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-brand-aqua rounded-full mt-2 flex-shrink-0"></span>
              Use templates for quick setup, then customize individual days as needed
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-brand-aqua rounded-full mt-2 flex-shrink-0"></span>
              Consider your timezone - times shown will be displayed to clients in their timezone
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-brand-aqua rounded-full mt-2 flex-shrink-0"></span>
              Leave buffer time between sessions for notes and preparation
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-brand-aqua rounded-full mt-2 flex-shrink-0"></span>
              You can update your availability anytime from your dashboard
            </li>
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* tomiwa: Header with Logo */}
      <header className="bg-white border-b border-neutral-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logo.png"
              alt="ReadyJobSeeker Logo"
              width={32}
              height={32}
              className="rounded-lg"
            />
            <span className="font-display font-bold text-lg text-brand-black">
              ReadyJobSeeker
            </span>
          </Link>
        </div>
      </header>

      {/* tomiwa: Progress Indicator */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              const isAccessible = currentStep >= step.id;

              return (
                <div key={step.id} className="flex items-center">
                  <div className="flex items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                        isCompleted
                          ? 'bg-brand-aqua text-white'
                          : isActive
                          ? 'bg-brand-aqua text-white'
                          : 'bg-neutral-200 text-neutral-500'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircleIcon className="w-5 h-5" />
                      ) : (
                        <step.icon className="w-5 h-5" />
                      )}
                    </div>
                    <div className="ml-3 hidden sm:block">
                      <p className={`text-sm font-semibold ${
                        isAccessible ? 'text-brand-black' : 'text-neutral-500'
                      }`}>
                        Step {step.id}
                      </p>
                      <p className={`text-xs ${
                        isAccessible ? 'text-neutral-600' : 'text-neutral-400'
                      }`}>
                        {step.name}
                      </p>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-12 sm:w-20 h-0.5 mx-4 ${
                      currentStep > step.id ? 'bg-brand-aqua' : 'bg-neutral-200'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* tomiwa: Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          {renderStepContent()}

          {/* tomiwa: Navigation Buttons */}
          <div className="flex items-center justify-between mt-12 pt-8 border-t border-neutral-200">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center gap-2 px-6 py-3 text-neutral-600 hover:text-brand-aqua transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeftIcon className="w-5 h-5" />
              Previous
            </button>

            {currentStep < 3 ? (
              <button
                onClick={nextStep}
                className="flex items-center gap-2 px-6 py-3 bg-brand-aqua text-white rounded-xl hover:bg-brand-aqua/90 transition-colors"
              >
                Next
                <ChevronRightIcon className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={completeOnboarding}
                disabled={isSubmitting}
                className="flex items-center gap-2 px-8 py-3 bg-brand-aqua text-white rounded-xl hover:bg-brand-aqua/90 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Completing Setup...
                  </>
                ) : (
                  <>
                    <CheckCircleIcon className="w-5 h-5" />
                    Complete Setup
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}