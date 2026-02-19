/**
 * File: src/app/coach/dashboard/availability/page.js
 * 
 * tomiwa: Coach Availability Management Page - Redesigned for Simplicity
 * Clean, intuitive interface for coaches to set their weekly availability
 * 
 * Features:
 * - Simple day-by-day availability setup
 * - Clear time range selectors
 * - Visual availability summary
 * - Quick preset schedules
 * - Easy save and update functionality
 */

'use client';

import React, { useState } from 'react';
import CoachDashboardLayout from '@/components/layouts/CoachDashboardLayout.jsx';
import {
  ClockIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
  GlobeAltIcon,
  ArrowPathIcon,
  ExclamationCircleIcon,
  PlusIcon,
  TrashIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

// tomiwa: Days of the week
const daysOfWeek = [
  { id: 'monday', name: 'Monday', short: 'Mon' },
  { id: 'tuesday', name: 'Tuesday', short: 'Tue' },
  { id: 'wednesday', name: 'Wednesday', short: 'Wed' },
  { id: 'thursday', name: 'Thursday', short: 'Thu' },
  { id: 'friday', name: 'Friday', short: 'Fri' },
  { id: 'saturday', name: 'Saturday', short: 'Sat' },
  { id: 'sunday', name: 'Sunday', short: 'Sun' },
];

// tomiwa: Preset schedules for quick setup
const presetSchedules = [
  {
    id: 'business-hours',
    name: 'Business Hours',
    description: 'Monday-Friday, 9 AM - 5 PM',
    schedule: {
      monday: [{ start: '09:00', end: '17:00' }],
      tuesday: [{ start: '09:00', end: '17:00' }],
      wednesday: [{ start: '09:00', end: '17:00' }],
      thursday: [{ start: '09:00', end: '17:00' }],
      friday: [{ start: '09:00', end: '17:00' }],
      saturday: [],
      sunday: [],
    }
  },
  {
    id: 'flexible-schedule',
    name: 'Flexible Schedule',
    description: 'Mornings and evenings',
    schedule: {
      monday: [{ start: '08:00', end: '11:00' }, { start: '18:00', end: '21:00' }],
      tuesday: [{ start: '08:00', end: '11:00' }, { start: '18:00', end: '21:00' }],
      wednesday: [{ start: '08:00', end: '11:00' }, { start: '18:00', end: '21:00' }],
      thursday: [{ start: '08:00', end: '11:00' }, { start: '18:00', end: '21:00' }],
      friday: [{ start: '08:00', end: '11:00' }, { start: '18:00', end: '21:00' }],
      saturday: [{ start: '10:00', end: '14:00' }],
      sunday: [],
    }
  },
  {
    id: 'weekend-warrior',
    name: 'Weekend Focus',
    description: 'Weekends with some weekday evenings',
    schedule: {
      monday: [{ start: '19:00', end: '21:00' }],
      tuesday: [],
      wednesday: [{ start: '19:00', end: '21:00' }],
      thursday: [],
      friday: [{ start: '19:00', end: '21:00' }],
      saturday: [{ start: '09:00', end: '17:00' }],
      sunday: [{ start: '10:00', end: '16:00' }],
    }
  }
];

export default function CoachAvailabilityPage() {
  // tomiwa: State for weekly schedule - each day has array of time blocks
  const [weeklySchedule, setWeeklySchedule] = useState({
    monday: [{ start: '09:00', end: '12:00' }],
    tuesday: [{ start: '14:00', end: '17:00' }],
    wednesday: [{ start: '10:00', end: '13:00' }],
    thursday: [{ start: '16:00', end: '19:00' }],
    friday: [{ start: '09:00', end: '12:00' }],
    saturday: [],
    sunday: [],
  });

  // tomiwa: State for UI
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const [selectedPreset, setSelectedPreset] = useState(null);

  // tomiwa: Add time block to a day
  const addTimeBlock = (dayId) => {
    setWeeklySchedule(prev => ({
      ...prev,
      [dayId]: [...prev[dayId], { start: '09:00', end: '10:00' }]
    }));
  };

  // tomiwa: Remove time block from a day
  const removeTimeBlock = (dayId, blockIndex) => {
    setWeeklySchedule(prev => ({
      ...prev,
      [dayId]: prev[dayId].filter((_, index) => index !== blockIndex)
    }));
  };

  // tomiwa: Update time block
  const updateTimeBlock = (dayId, blockIndex, field, value) => {
    setWeeklySchedule(prev => ({
      ...prev,
      [dayId]: prev[dayId].map((block, index) => 
        index === blockIndex ? { ...block, [field]: value } : block
      )
    }));
  };

  // tomiwa: Apply preset schedule
  const applyPreset = (preset) => {
    setWeeklySchedule(preset.schedule);
    setSelectedPreset(preset.id);
    showToast(`Applied ${preset.name} schedule`, 'success');
  };

  // tomiwa: Clear all availability
  const clearAllAvailability = () => {
    const emptySchedule = {};
    daysOfWeek.forEach(day => {
      emptySchedule[day.id] = [];
    });
    setWeeklySchedule(emptySchedule);
    setSelectedPreset(null);
  };

  // tomiwa: Save availability
  const saveAvailability = async () => {
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    showToast('Availability updated successfully!', 'success');
    setIsSaving(false);
  };

  // tomiwa: Show toast notification
  const showToast = (message, type = 'success') => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  // tomiwa: Format time for display
  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const hour12 = parseInt(hours) % 12 || 12;
    const ampm = parseInt(hours) >= 12 ? 'PM' : 'AM';
    return `${hour12}:${minutes} ${ampm}`;
  };

  // tomiwa: Calculate total available hours
  const calculateTotalHours = () => {
    let totalMinutes = 0;
    Object.values(weeklySchedule).forEach(dayBlocks => {
      dayBlocks.forEach(block => {
        const startMinutes = parseInt(block.start.split(':')[0]) * 60 + parseInt(block.start.split(':')[1]);
        const endMinutes = parseInt(block.end.split(':')[0]) * 60 + parseInt(block.end.split(':')[1]);
        totalMinutes += endMinutes - startMinutes;
      });
    });
    return (totalMinutes / 60).toFixed(1);
  };

  return (
    <CoachDashboardLayout>
      {/* tomiwa: Header */}
      <div className="bg-gradient-to-r from-brand-aqua to-[#0C5B65]">
        <div className="px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20 py-10 sm:py-12 md:py-14 lg:py-16">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6">
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-2">
                Set Your Availability
              </h1>
              <p className="text-[#D9E5E6] text-base sm:text-lg md:text-lg lg:text-xl leading-relaxed max-w-2xl">
                Define when you're available for coaching sessions with a simple, flexible schedule
              </p>
            </div>
            <div className="flex items-center gap-3 text-white">
              <GlobeAltIcon className="w-5 h-5" />
              <span className="text-sm">UTC-05:00 (Eastern Time)</span>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-8 py-12">
        {/* tomiwa: Quick Stats and Actions */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-4">
              <h2 className="text-xl font-display font-bold text-brand-black">Your Weekly Schedule</h2>
              
              {/* tomiwa: Stats */}
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-brand-aqua rounded-full"></div>
                  <span className="text-neutral-600">{calculateTotalHours()} hours per week</span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarDaysIcon className="w-4 h-4 text-neutral-400" />
                  <span className="text-neutral-600">
                    {Object.values(weeklySchedule).filter(day => day.length > 0).length} days available
                  </span>
                </div>
              </div>
            </div>

            {/* tomiwa: Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={clearAllAvailability}
                className="px-6 py-3 border border-neutral-300 text-neutral-700 rounded-xl hover:bg-neutral-50 transition-colors flex items-center gap-2"
              >
                <ArrowPathIcon className="w-4 h-4" />
                Clear All
              </button>
              <button
                onClick={saveAvailability}
                disabled={isSaving}
                className="px-6 py-3 bg-brand-aqua text-white rounded-xl hover:bg-brand-aqua/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSaving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <CheckCircleIcon className="w-4 h-4" />
                    Save Availability
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* tomiwa: Preset Schedules */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <SparklesIcon className="w-6 h-6 text-brand-aqua" />
            <h2 className="text-xl font-display font-bold text-brand-black">Quick Setup</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            {presetSchedules.map((preset) => (
              <button
                key={preset.id}
                onClick={() => applyPreset(preset)}
                className={`p-6 border-2 rounded-xl text-left transition-all duration-300 hover:scale-105 ${
                  selectedPreset === preset.id
                    ? 'border-brand-aqua bg-brand-aqua/5'
                    : 'border-neutral-200 hover:border-brand-aqua/50'
                }`}
              >
                <h3 className="font-semibold text-neutral-900 mb-2">{preset.name}</h3>
                <p className="text-sm text-neutral-600 mb-3">{preset.description}</p>
                <div className="text-xs text-brand-aqua font-medium">
                  Click to apply →
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* tomiwa: Daily Schedule Builder */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center gap-3 mb-8">
            <CalendarDaysIcon className="w-6 h-6 text-brand-aqua" />
            <h2 className="text-xl font-display font-bold text-brand-black">Customize Your Schedule</h2>
          </div>

          <div className="space-y-6">
            {daysOfWeek.map((day) => (
              <div key={day.id} className="border border-neutral-200 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg text-neutral-900">{day.name}</h3>
                  <button
                    onClick={() => addTimeBlock(day.id)}
                    className="flex items-center gap-2 px-4 py-2 text-brand-aqua border border-brand-aqua rounded-lg hover:bg-brand-aqua/5 transition-colors text-sm"
                  >
                    <PlusIcon className="w-4 h-4" />
                    Add Time Block
                  </button>
                </div>

                {weeklySchedule[day.id].length === 0 ? (
                  <div className="text-center py-8 text-neutral-500">
                    <ClockIcon className="w-12 h-12 mx-auto mb-3 text-neutral-300" />
                    <p className="text-sm">No availability set for {day.name}</p>
                    <p className="text-xs text-neutral-400 mt-1">Click "Add Time Block" to get started</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {weeklySchedule[day.id].map((block, blockIndex) => (
                      <div key={blockIndex} className="flex items-center gap-4 p-4 bg-neutral-50 rounded-lg">
                        <div className="flex items-center gap-3 flex-1">
                          <div className="flex items-center gap-2">
                            <label className="text-sm font-medium text-neutral-700">From:</label>
                            <select
                              value={block.start}
                              onChange={(e) => updateTimeBlock(day.id, blockIndex, 'start', e.target.value)}
                              className="px-3 py-2 border border-neutral-200 rounded-lg focus:border-brand-aqua focus:ring-brand-aqua/20 focus:ring-4 focus:outline-none transition-colors text-sm"
                            >
                              {Array.from({ length: 24 }, (_, i) => {
                                const hour = i.toString().padStart(2, '0');
                                return [
                                  <option key={`${hour}:00`} value={`${hour}:00`}>
                                    {formatTime(`${hour}:00`)}
                                  </option>,
                                  <option key={`${hour}:30`} value={`${hour}:30`}>
                                    {formatTime(`${hour}:30`)}
                                  </option>
                                ];
                              }).flat()}
                            </select>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <label className="text-sm font-medium text-neutral-700">To:</label>
                            <select
                              value={block.end}
                              onChange={(e) => updateTimeBlock(day.id, blockIndex, 'end', e.target.value)}
                              className="px-3 py-2 border border-neutral-200 rounded-lg focus:border-brand-aqua focus:ring-brand-aqua/20 focus:ring-4 focus:outline-none transition-colors text-sm"
                            >
                              {Array.from({ length: 24 }, (_, i) => {
                                const hour = i.toString().padStart(2, '0');
                                return [
                                  <option key={`${hour}:00`} value={`${hour}:00`}>
                                    {formatTime(`${hour}:00`)}
                                  </option>,
                                  <option key={`${hour}:30`} value={`${hour}:30`}>
                                    {formatTime(`${hour}:30`)}
                                  </option>
                                ];
                              }).flat()}
                            </select>
                          </div>
                        </div>
                        
                        <button
                          onClick={() => removeTimeBlock(day.id, blockIndex)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="Remove time block"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* tomiwa: Help Section */}
        <div className="mt-8 bg-brand-aqua/10 border border-brand-aqua/20 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <ExclamationCircleIcon className="w-6 h-6 text-brand-aqua flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-brand-aqua mb-2">How It Works</h3>
              <ul className="text-sm text-brand-aqua space-y-1">
                <li>• Set time blocks for each day when you're available for coaching</li>
                <li>• Candidates can book sessions during your available time blocks</li>
                <li>• You can add multiple time blocks per day (e.g., morning and evening)</li>
                <li>• Use quick setup presets or customize your own schedule</li>
                <li>• Changes take effect immediately after saving</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* tomiwa: Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
          <div
            className={`rounded-xl shadow-xl p-4 flex items-center gap-3 min-w-[320px] ${
              toast.type === 'success'
                ? 'bg-emerald-500'
                : 'bg-red-500'
            } text-white`}
          >
            <CheckCircleIcon className="w-6 h-6 flex-shrink-0" />
            <span className="font-medium">{toast.message}</span>
          </div>
        </div>
      )}
    </CoachDashboardLayout>
  );
}