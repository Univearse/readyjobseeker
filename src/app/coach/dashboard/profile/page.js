/**
 * File: src/app/coach/dashboard/profile/page.js
 *
 * tomiwa: Coach Profile Page — matches the screenshot design
 * Each section (About, Specialties, Languages, Credentials) has its own
 * inline "Edit Details" toggle so coaches can update one section at a time.
 * Profile photo can be uploaded via a hidden file input.
 *
 * Features:
 * - Profile header with photo, stats, name, title, badge
 * - Per-section inline editing (About, Specialties, Languages, Credentials)
 * - Profile photo upload with preview
 * - Reviews section with star ratings
 * - Fully responsive across all breakpoints
 */

'use client';

import React, { useState, useRef } from 'react';
import CoachDashboardLayout from '@/components/layouts/CoachDashboardLayout.jsx';
import {
  PencilIcon,
  PlusIcon,
  XMarkIcon,
  CheckCircleIcon,
  ClockIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  CameraIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline';

/* ───────────────────────────────────────────
   tomiwa: Mock profile data (existing kept)
   ─────────────────────────────────────────── */
const initialProfileData = {
  personalInfo: {
    firstName: 'Dr. Sarah',
    lastName: 'Mitchell',
    title: 'Executive Career Coach',
    badge: 'Tech Specialist',
    experience: '15 years experience',
    responseTime: 'Usually responds within 2 hours',
    profilePhoto:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
  },
  about:
    'Former HR Director at Fortune 500 companies with over 15 years of experience in talent management and executive development. I specialize in helping professionals navigate career transitions, negotiate salaries, and land executive roles. My approach combines strategic career planning with practical interview preparation.',
  specialties: [
    'Career Transition',
    'Executive Coaching',
    'Salary Negotiation',
    'Leadership Development',
  ],
  languages: ['English', 'Spanish'],
  credentials: {
    education: 'PhD in Organizational Psychology, Stanford University',
    certifications: [
      'ICF Professional Certified Coach (PCC)',
      'Certified Executive Coach (CEC)',
    ],
  },
  stats: {
    averageRating: 4.9,
    totalReviews: 127,
    totalSessions: 450,
  },
  reviews: [
    {
      id: 1,
      initials: 'JD',
      name: 'John D.',
      rating: 5,
      date: 'January 2026',
      text: 'Dr. Mitchell helped me transition from engineering to product management. Her insights were invaluable, and I landed my dream role within 2 months!',
      color: 'bg-brand-aqua',
    },
    {
      id: 2,
      initials: 'SK',
      name: 'Sarah K.',
      rating: 5,
      date: 'December 2025',
      text: 'Excellent coach! She helped me negotiate a 40% salary increase. Highly recommend for anyone looking to level up their career.',
      color: 'bg-brand-orange',
    },
    {
      id: 3,
      initials: 'MT',
      name: 'Michael T.',
      rating: 4.5,
      date: 'November 2025',
      text: 'Very knowledgeable and supportive. The mock interviews were particularly helpful for my executive interviews.',
      color: 'bg-brand-yellow',
    },
  ],
};

/* ───────────────────────────────────
   tomiwa: Helper — render star icons
   ─────────────────────────────────── */
const RenderStars = ({ rating, size = 'w-4 h-4' }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars.push(<StarSolidIcon key={i} className={`${size} text-brand-yellow`} />);
    } else if (i - rating < 1 && i - rating > 0) {
      // half-star approximation — show filled
      stars.push(<StarSolidIcon key={i} className={`${size} text-brand-yellow`} />);
    } else {
      stars.push(<StarOutlineIcon key={i} className={`${size} text-neutral-300`} />);
    }
  }
  return <div className="flex items-center gap-0.5">{stars}</div>;
};

/* ═══════════════════════════════════
   tomiwa: Main Component
   ═══════════════════════════════════ */
export default function CoachProfilePage() {
  // ExistingCode: state for profile data
  const [profileData, setProfileData] = useState(initialProfileData);

  // tomiwa: new — per-section editing state (each section toggles independently)
  const [editingSection, setEditingSection] = useState(null); // 'about' | 'specialties' | 'languages' | 'credentials' | 'header' | null

  // tomiwa: new — temporary edit buffers so we can cancel without losing data
  const [editBuffer, setEditBuffer] = useState({});

  // tomiwa: new — for adding new specialties / languages / certifications
  const [newItem, setNewItem] = useState('');

  // tomiwa: new — saving indicator & toast
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState(null);

  // tomiwa: new — ref for hidden file input (photo upload)
  const fileInputRef = useRef(null);

  /* ── Toast helper ── */
  const showToast = (message, type = 'success') => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  /* ─────────────────────────────────────
     tomiwa: Start editing a section
     Copies the relevant data into a buffer
     ───────────────────────────────────── */
  const startEditing = (section) => {
    switch (section) {
      case 'header':
        setEditBuffer({
          firstName: profileData.personalInfo.firstName,
          lastName: profileData.personalInfo.lastName,
          title: profileData.personalInfo.title,
          badge: profileData.personalInfo.badge,
          experience: profileData.personalInfo.experience,
        });
        break;
      case 'about':
        setEditBuffer({ about: profileData.about });
        break;
      case 'specialties':
        setEditBuffer({ specialties: [...profileData.specialties] });
        break;
      case 'languages':
        setEditBuffer({ languages: [...profileData.languages] });
        break;
      case 'credentials':
        setEditBuffer({
          education: profileData.credentials.education,
          certifications: [...profileData.credentials.certifications],
        });
        break;
      default:
        break;
    }
    setNewItem('');
    setEditingSection(section);
  };

  /* ───────────────────────────────
     tomiwa: Save the current section
     ─────────────────────────────── */
  const saveSection = async () => {
    setIsSaving(true);
    // Simulate API delay
    await new Promise((r) => setTimeout(r, 1200));

    switch (editingSection) {
      case 'header':
        setProfileData((prev) => ({
          ...prev,
          personalInfo: {
            ...prev.personalInfo,
            firstName: editBuffer.firstName,
            lastName: editBuffer.lastName,
            title: editBuffer.title,
            badge: editBuffer.badge,
            experience: editBuffer.experience,
          },
        }));
        break;
      case 'about':
        setProfileData((prev) => ({ ...prev, about: editBuffer.about }));
        break;
      case 'specialties':
        setProfileData((prev) => ({ ...prev, specialties: editBuffer.specialties }));
        break;
      case 'languages':
        setProfileData((prev) => ({ ...prev, languages: editBuffer.languages }));
        break;
      case 'credentials':
        setProfileData((prev) => ({
          ...prev,
          credentials: {
            education: editBuffer.education,
            certifications: editBuffer.certifications,
          },
        }));
        break;
      default:
        break;
    }

    setIsSaving(false);
    setEditingSection(null);
    setEditBuffer({});
    showToast('Changes saved successfully!');
  };

  /* ── Cancel editing ── */
  const cancelEditing = () => {
    setEditingSection(null);
    setEditBuffer({});
    setNewItem('');
  };

  /* ────────────────────────────────────────
     tomiwa: Handle profile photo file upload
     ──────────────────────────────────────── */
  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // tomiwa: Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      showToast('Please upload a valid image (JPEG, PNG, WebP, or GIF).', 'error');
      return;
    }

    // tomiwa: Create a preview URL and update state
    const previewUrl = URL.createObjectURL(file);
    setProfileData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        profilePhoto: previewUrl,
      },
    }));
    showToast('Profile photo updated!');
  };

  /* ── Add / remove helpers for list fields ── */
  const addItemToBuffer = (field) => {
    if (!newItem.trim()) return;
    setEditBuffer((prev) => ({
      ...prev,
      [field]: [...(prev[field] || []), newItem.trim()],
    }));
    setNewItem('');
  };

  const removeItemFromBuffer = (field, index) => {
    setEditBuffer((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  /* ── Reusable "Edit Details" / "Save / Cancel" button pair ── */
  const SectionEditButton = ({ section }) => {
    if (editingSection === section) {
      return (
        <div className="flex items-center gap-2">
          <button
            onClick={cancelEditing}
            className="text-sm text-neutral-500 hover:text-neutral-700 transition-colors font-sans"
          >
            Cancel
          </button>
          <button
            onClick={saveSection}
            disabled={isSaving}
            className="flex items-center gap-1.5 text-sm text-brand-aqua hover:text-brand-aqua/80 font-semibold transition-colors font-sans"
          >
            {isSaving ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-brand-aqua border-t-transparent rounded-full animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <CheckCircleIcon className="w-4 h-4" />
                Save
              </>
            )}
          </button>
        </div>
      );
    }

    return (
      <button
        onClick={() => startEditing(section)}
        className="flex items-center gap-1.5 text-sm text-neutral-500 hover:text-brand-aqua transition-colors font-sans"
      >
        <PencilIcon className="w-4 h-4" />
        Edit Details
      </button>
    );
  };

  /* ═══════════════════════════════════
     tomiwa: RENDER
     ═══════════════════════════════════ */
  return (
    <CoachDashboardLayout>
      {/* tomiwa: hidden file input for photo upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={handlePhotoUpload}
      />

      {/* ════════════════════════════════════
          SECTION 1 — PROFILE HEADER
          ════════════════════════════════════ */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 py-8 sm:py-10 md:py-12">
          <div className="flex flex-col sm:flex-row items-start gap-5 sm:gap-6 md:gap-8">
            {/* tomiwa: Profile photo with upload overlay */}
            <div className="relative group flex-shrink-0">
              <img
                src={profileData.personalInfo.profilePhoto}
                alt="Profile"
                className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-2xl object-cover border-4 border-white shadow-lg"
              />
              {/* tomiwa: Camera overlay — click to upload a new photo */}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
              >
                <CameraIcon className="w-8 h-8 text-white" />
              </button>
            </div>

            {/* tomiwa: Name, title, stats */}
            <div className="flex-1 w-full">
              {/* tomiwa: Stats row — Rating, Reviews, Sessions */}
              <div className="flex items-center gap-4 sm:gap-6 mb-3 text-sm font-sans">
                <div className="flex items-center gap-1">
                  <span className="font-bold text-brand-black text-base sm:text-lg">{profileData.stats.averageRating}</span>
                  <StarSolidIcon className="w-4 h-4 text-brand-yellow" />
                  <span className="text-neutral-500 ml-0.5">Rating</span>
                </div>
                <div>
                  <span className="font-bold text-brand-black text-base sm:text-lg">{profileData.stats.totalReviews}</span>
                  <span className="text-neutral-500 ml-1">Reviews</span>
                </div>
                <div>
                  <span className="font-bold text-brand-black text-base sm:text-lg">{profileData.stats.totalSessions}+</span>
                  <span className="text-neutral-500 ml-1">Sessions</span>
                </div>
              </div>

              {/* tomiwa: Name & title (editable in header edit mode) */}
              {editingSection === 'header' ? (
                <div className="space-y-3 mb-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={editBuffer.firstName || ''}
                      onChange={(e) => setEditBuffer((b) => ({ ...b, firstName: e.target.value }))}
                      placeholder="First name"
                      className="px-3 py-2 border border-neutral-200 rounded-xl text-lg font-display font-bold text-brand-black focus:border-brand-aqua focus:ring-brand-aqua/20 focus:ring-4 focus:outline-none"
                    />
                    <input
                      type="text"
                      value={editBuffer.lastName || ''}
                      onChange={(e) => setEditBuffer((b) => ({ ...b, lastName: e.target.value }))}
                      placeholder="Last name"
                      className="px-3 py-2 border border-neutral-200 rounded-xl text-lg font-display font-bold text-brand-black focus:border-brand-aqua focus:ring-brand-aqua/20 focus:ring-4 focus:outline-none"
                    />
                  </div>
                  <input
                    type="text"
                    value={editBuffer.title || ''}
                    onChange={(e) => setEditBuffer((b) => ({ ...b, title: e.target.value }))}
                    placeholder="Title e.g. Executive Career Coach"
                    className="w-full px-3 py-2 border border-neutral-200 rounded-xl text-sm text-neutral-600 focus:border-brand-aqua focus:ring-brand-aqua/20 focus:ring-4 focus:outline-none"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={editBuffer.badge || ''}
                      onChange={(e) => setEditBuffer((b) => ({ ...b, badge: e.target.value }))}
                      placeholder="Badge e.g. Tech Specialist"
                      className="px-3 py-2 border border-neutral-200 rounded-xl text-sm text-neutral-600 focus:border-brand-aqua focus:ring-brand-aqua/20 focus:ring-4 focus:outline-none"
                    />
                    <input
                      type="text"
                      value={editBuffer.experience || ''}
                      onChange={(e) => setEditBuffer((b) => ({ ...b, experience: e.target.value }))}
                      placeholder="Experience e.g. 15 years experience"
                      className="px-3 py-2 border border-neutral-200 rounded-xl text-sm text-neutral-600 focus:border-brand-aqua focus:ring-brand-aqua/20 focus:ring-4 focus:outline-none"
                    />
                  </div>
                </div>
              ) : (
                <>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-brand-black mb-1">
                    {profileData.personalInfo.firstName} {profileData.personalInfo.lastName}
                  </h1>
                  <p className="text-neutral-600 font-sans text-base sm:text-lg mb-2">
                    {profileData.personalInfo.title}
                  </p>
                  {/* tomiwa: Badge */}
                  <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-brand-aqua/10 text-brand-aqua mb-3 font-sans">
                    {profileData.personalInfo.badge}
                  </span>
                  {/* tomiwa: Experience & Response time */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500 font-sans">
                    <div className="flex items-center gap-1.5">
                      <BriefcaseIcon className="w-4 h-4" />
                      <span>{profileData.personalInfo.experience}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <ClockIcon className="w-4 h-4" />
                      <span>{profileData.personalInfo.responseTime}</span>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* tomiwa: Edit Details button for the header section */}
            <div className="flex-shrink-0 self-start mt-1">
              {editingSection === 'header' ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={cancelEditing}
                    className="px-4 py-2 text-sm border border-neutral-200 text-neutral-600 rounded-xl hover:bg-neutral-50 transition-colors font-sans"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveSection}
                    disabled={isSaving}
                    className="px-5 py-2 text-sm bg-brand-aqua text-white rounded-xl hover:bg-brand-aqua/90 transition-colors font-sans flex items-center gap-2"
                  >
                    {isSaving ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <CheckCircleIcon className="w-4 h-4" />
                        Save
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => startEditing('header')}
                  className="flex items-center gap-2 px-5 py-2.5 bg-brand-aqua text-white rounded-xl hover:bg-brand-aqua/90 transition-all duration-300 text-sm font-semibold shadow-md hover:shadow-lg font-sans"
                >
                  <PencilIcon className="w-4 h-4" />
                  Edit Details
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════
          SECTION 2 — MAIN CONTENT GRID
          About (left) + Languages / Credentials (right)
          ════════════════════════════════════ */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 py-8 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* ──────────────────────
              LEFT COLUMN — About
              ────────────────────── */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 h-full">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg sm:text-xl font-display font-bold text-brand-black flex items-center gap-2">
                  <span className="text-brand-aqua">&#9998;</span> About
                </h2>
                <SectionEditButton section="about" />
              </div>

              {editingSection === 'about' ? (
                <textarea
                  value={editBuffer.about || ''}
                  onChange={(e) => setEditBuffer((b) => ({ ...b, about: e.target.value }))}
                  rows={7}
                  className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-neutral-700 leading-relaxed font-sans focus:border-brand-aqua focus:ring-brand-aqua/20 focus:ring-4 focus:outline-none resize-none"
                />
              ) : (
                <p className="text-neutral-600 leading-relaxed font-sans text-sm sm:text-base">
                  {profileData.about}
                </p>
              )}
            </div>
          </div>

          {/* ────────────────────────────────────
              RIGHT COLUMN — Languages + Credentials
              ──────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-6">
            {/* ── Languages Card ── */}
            <div className="bg-white rounded-2xl border border-neutral-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-display font-bold text-brand-black flex items-center gap-2">
                  <GlobeAltIcon className="w-5 h-5 text-brand-aqua" /> Languages
                </h2>
                <SectionEditButton section="languages" />
              </div>

              {editingSection === 'languages' ? (
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {(editBuffer.languages || []).map((lang, i) => (
                      <span
                        key={i}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-100 text-neutral-700 rounded-lg text-sm font-sans"
                      >
                        {lang}
                        <button
                          onClick={() => removeItemFromBuffer('languages', i)}
                          className="text-neutral-400 hover:text-red-500 transition-colors"
                        >
                          <XMarkIcon className="w-3.5 h-3.5" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newItem}
                      onChange={(e) => setNewItem(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && addItemToBuffer('languages')}
                      placeholder="Add language"
                      className="flex-1 px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:border-brand-aqua focus:ring-brand-aqua/20 focus:ring-4 focus:outline-none font-sans"
                    />
                    <button
                      onClick={() => addItemToBuffer('languages')}
                      className="px-3 py-2 bg-brand-aqua text-white rounded-lg text-sm hover:bg-brand-aqua/90 transition-colors"
                    >
                      <PlusIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {profileData.languages.map((lang, i) => (
                    <span
                      key={i}
                      className="px-4 py-1.5 bg-neutral-100 text-neutral-700 rounded-lg text-sm font-sans"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* ── Credentials Card ── */}
            <div className="bg-white rounded-2xl border border-neutral-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-display font-bold text-brand-black flex items-center gap-2">
                  <AcademicCapIcon className="w-5 h-5 text-brand-aqua" /> Credentials
                </h2>
                <SectionEditButton section="credentials" />
              </div>

              {editingSection === 'credentials' ? (
                <div className="space-y-4">
                  {/* Education */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-1.5 font-sans">
                      Education
                    </label>
                    <input
                      type="text"
                      value={editBuffer.education || ''}
                      onChange={(e) => setEditBuffer((b) => ({ ...b, education: e.target.value }))}
                      className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:border-brand-aqua focus:ring-brand-aqua/20 focus:ring-4 focus:outline-none font-sans"
                    />
                  </div>
                  {/* Certifications */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-1.5 font-sans">
                      Certifications
                    </label>
                    <div className="space-y-2 mb-3">
                      {(editBuffer.certifications || []).map((cert, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between px-3 py-2 bg-neutral-50 rounded-lg text-sm font-sans"
                        >
                          <div className="flex items-center gap-2">
                            <AcademicCapIcon className="w-4 h-4 text-brand-aqua flex-shrink-0" />
                            <span>{cert}</span>
                          </div>
                          <button
                            onClick={() => removeItemFromBuffer('certifications', i)}
                            className="text-neutral-400 hover:text-red-500 transition-colors"
                          >
                            <XMarkIcon className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newItem}
                        onChange={(e) => setNewItem(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && addItemToBuffer('certifications')}
                        placeholder="Add certification"
                        className="flex-1 px-3 py-2 border border-neutral-200 rounded-lg text-sm focus:border-brand-aqua focus:ring-brand-aqua/20 focus:ring-4 focus:outline-none font-sans"
                      />
                      <button
                        onClick={() => addItemToBuffer('certifications')}
                        className="px-3 py-2 bg-brand-aqua text-white rounded-lg text-sm hover:bg-brand-aqua/90 transition-colors"
                      >
                        <PlusIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-1 font-sans">
                      Education
                    </p>
                    <p className="text-sm text-neutral-700 font-sans">{profileData.credentials.education}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-2 font-sans">
                      Certifications
                    </p>
                    <div className="space-y-2">
                      {profileData.credentials.certifications.map((cert, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-neutral-700 font-sans">
                          <AcademicCapIcon className="w-4 h-4 text-brand-aqua flex-shrink-0" />
                          <span>{cert}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════
            SECTION 3 — SPECIALTIES
            ════════════════════════════════════ */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg sm:text-xl font-display font-bold text-brand-black flex items-center gap-2">
              <span className="text-brand-aqua">&#10024;</span> Specialties
            </h2>
            <SectionEditButton section="specialties" />
          </div>

          {editingSection === 'specialties' ? (
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {(editBuffer.specialties || []).map((spec, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-1.5 px-4 py-2 bg-brand-aqua/10 text-brand-aqua rounded-full text-sm font-semibold font-sans"
                  >
                    <span className="text-brand-aqua">&#9679;</span>
                    {spec}
                    <button
                      onClick={() => removeItemFromBuffer('specialties', i)}
                      className="ml-1 text-brand-aqua/60 hover:text-red-500 transition-colors"
                    >
                      <XMarkIcon className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2 max-w-md">
                <input
                  type="text"
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addItemToBuffer('specialties')}
                  placeholder="Add a specialty"
                  className="flex-1 px-4 py-2 border border-neutral-200 rounded-lg text-sm focus:border-brand-aqua focus:ring-brand-aqua/20 focus:ring-4 focus:outline-none font-sans"
                />
                <button
                  onClick={() => addItemToBuffer('specialties')}
                  className="px-4 py-2 bg-brand-aqua text-white rounded-lg text-sm hover:bg-brand-aqua/90 transition-colors flex items-center gap-1 font-sans"
                >
                  <PlusIcon className="w-4 h-4" />
                  Add
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {profileData.specialties.map((spec, i) => (
                <span
                  key={i}
                  className="flex items-center gap-1.5 px-4 py-2 bg-brand-aqua/10 text-brand-aqua rounded-full text-sm font-semibold font-sans"
                >
                  <span className="text-brand-aqua">&#9679;</span>
                  {spec}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* ════════════════════════════════════
            SECTION 4 — REVIEWS
            ════════════════════════════════════ */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8">
          {/* tomiwa: Header with overall rating */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg sm:text-xl font-display font-bold text-brand-black flex items-center gap-2">
              <span className="text-brand-aqua">&#9733;</span> Reviews
            </h2>
            <div className="flex items-center gap-2">
              <StarSolidIcon className="w-5 h-5 text-brand-yellow" />
              <span className="font-bold text-brand-black text-lg">{profileData.stats.averageRating}</span>
              <span className="text-neutral-400 text-sm font-sans">({profileData.stats.totalReviews})</span>
            </div>
          </div>

          {/* tomiwa: Individual reviews */}
          <div className="divide-y divide-neutral-100">
            {profileData.reviews.map((review) => (
              <div key={review.id} className="py-5 first:pt-0 last:pb-0">
                <div className="flex items-start gap-3">
                  {/* tomiwa: Avatar circle with initials */}
                  <div
                    className={`w-10 h-10 rounded-full ${review.color} text-white flex items-center justify-center text-xs font-bold flex-shrink-0 font-sans`}
                  >
                    {review.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-brand-black text-sm font-sans">{review.name}</h4>
                      <span className="text-xs text-neutral-400 font-sans flex-shrink-0 ml-2">{review.date}</span>
                    </div>
                    <RenderStars rating={review.rating} size="w-3.5 h-3.5" />
                    <p className="text-neutral-600 text-sm mt-2 leading-relaxed font-sans">
                      {review.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* tomiwa: "View all reviews" link */}
          <div className="mt-6 text-center">
            <button className="text-brand-aqua text-sm font-semibold hover:text-brand-aqua/80 transition-colors font-sans">
              View all {profileData.stats.totalReviews} reviews &rarr;
            </button>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════
          TOAST NOTIFICATION
          ════════════════════════════════════ */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce-in">
          <div
            className={`rounded-xl shadow-xl p-4 flex items-center gap-3 min-w-[300px] ${
              toast.type === 'success' ? 'bg-emerald-500' : 'bg-red-500'
            } text-white font-sans`}
          >
            <CheckCircleIcon className="w-6 h-6 flex-shrink-0" />
            <span className="font-medium text-sm">{toast.message}</span>
          </div>
        </div>
      )}
    </CoachDashboardLayout>
  );
}
