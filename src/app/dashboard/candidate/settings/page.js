/**
 * File: src/app/dashboard/candidate/settings/page.js
 * 
 * tomiwa: UPDATED - Settings Page with Single Card + Toggle Tab System
 * A clean settings page with a single card and toggle navigation to switch between sections
 * 
 * Layout Structure:
 * ================
 * HERO BANNER: Aqua-to-teal gradient
 *              - Title: "Settings"
 *              - Subtitle: Customize your account and preferences
 * 
 * SINGLE CARD with TOGGLE TABS:
 * - Tab 1: Account (email, password, profile visibility)
 * - Tab 2: Notifications (all notification toggles)
 * - Tab 3: Privacy & Security (2FA, data export, delete account)
 * - Tab 4: Preferences (theme, language, timezone)
 */

'use client';

import { useState } from 'react';
import CandidateDashboardLayout from '@/components/layouts/CandidateDashboardLayout.jsx';
import { 
  Cog6ToothIcon,
  UserCircleIcon,
  BellIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  EnvelopeIcon,
  DevicePhoneMobileIcon,
  BriefcaseIcon,
  ChatBubbleLeftRightIcon,
  MegaphoneIcon,
  KeyIcon,
  TrashIcon,
  ArrowDownTrayIcon,
  SunIcon,
  ComputerDesktopIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  EyeIcon,
  EyeSlashIcon,
  PencilSquareIcon,
} from '@heroicons/react/24/outline';

// tomiwa: NEW - Toggle Switch Component
// ExistingCode: Reusable toggle switch for settings
const ToggleSwitch = ({ enabled, onChange, label, description }) => {
  return (
    <div className="flex items-center justify-between py-4 border-b border-neutral-100 last:border-b-0">
      <div className="flex-1 pr-4">
        <p className="font-medium text-brand-black">{label}</p>
        {description && (
          <p className="text-sm text-neutral-500 mt-0.5">{description}</p>
        )}
      </div>
      {/* tomiwa: Toggle button - accessible and animated */}
      <button
        onClick={onChange}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-brand-aqua focus:ring-offset-2 ${
          enabled ? 'bg-brand-aqua' : 'bg-neutral-300'
        }`}
        role="switch"
        aria-checked={enabled}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition-transform ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
};

export default function Settings() {
  // ================================================================
  // tomiwa: STATE MANAGEMENT
  // All toggles and form states for the settings page
  // ================================================================
  
  // tomiwa: NEW - Active tab state for toggle navigation
  // new: Controls which section is currently visible
  const [activeTab, setActiveTab] = useState('account');
  
  // tomiwa: Notification settings state
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    smsAlerts: false,
    jobMatches: true,
    applicationUpdates: true,
    messages: true,
    marketing: false,
  });

  // tomiwa: Privacy settings state
  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    showEmail: false,
    twoFactorAuth: false,
  });

  // tomiwa: Preferences state
  const [preferences, setPreferences] = useState({
    theme: 'light', // 'light', 'dark', 'system'
    language: 'English',
    timezone: 'Africa/Lagos (GMT+1)',
  });

  // tomiwa: Toast notification state
  const [toast, setToast] = useState(null);

  // tomiwa: Modal states for password change and email change
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  // tomiwa: NEW - Email change modal state
  const [showEmailModal, setShowEmailModal] = useState(false);

  // tomiwa: Password visibility states
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // ================================================================
  // tomiwa: NEW - Tab Configuration
  // Defines all the tabs with their icons and labels
  // ================================================================
  const tabs = [
    { id: 'account', label: 'Account', icon: UserCircleIcon },
    { id: 'notifications', label: 'Notifications', icon: BellIcon },
    { id: 'privacy', label: 'Privacy & Security', icon: ShieldCheckIcon },
    { id: 'preferences', label: 'Preferences', icon: GlobeAltIcon },
  ];

  // ================================================================
  // tomiwa: HELPER FUNCTIONS
  // ================================================================
  
  // tomiwa: Show toast notification
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // tomiwa: Toggle notification setting
  const toggleNotification = (key) => {
    setNotifications(prev => {
      const newValue = !prev[key];
      showToast(`${key === 'emailAlerts' ? 'Email alerts' : key.replace(/([A-Z])/g, ' $1').trim()} ${newValue ? 'enabled' : 'disabled'}`, 'success');
      return { ...prev, [key]: newValue };
    });
  };

  // tomiwa: Toggle privacy setting
  const togglePrivacy = (key) => {
    setPrivacy(prev => {
      const newValue = !prev[key];
      showToast(`Setting updated successfully`, 'success');
      return { ...prev, [key]: newValue };
    });
  };

  // tomiwa: Save all settings
  const saveSettings = () => {
    showToast('All settings saved successfully!', 'success');
  };

  // ================================================================
  // tomiwa: NEW - Render Tab Content Function
  // Returns the appropriate content based on active tab
  // ================================================================
  const renderTabContent = () => {
    switch (activeTab) {
      // ============================================================
      // ACCOUNT TAB CONTENT
      // ============================================================
      case 'account':
        return (
          <div className="space-y-1">
            {/* tomiwa: Email display */}
            {/* updated: Made button active to open email change modal */}
            <div className="flex items-center justify-between py-4 border-b border-neutral-100">
              <div className="flex-1">
                <p className="font-medium text-brand-black">Email Address</p>
                <p className="text-sm text-neutral-500">johndoe@example.com</p>
              </div>
              <button 
                onClick={() => setShowEmailModal(true)}
                className="px-4 py-2 text-sm font-medium text-white bg-brand-aqua hover:bg-[#2BA6AD] rounded-xl transition-colors flex items-center gap-2"
              >
                <PencilSquareIcon className="w-4 h-4" />
                Change Email
              </button>
            </div>

            {/* tomiwa: Password change */}
            <div className="flex items-center justify-between py-4 border-b border-neutral-100">
              <div className="flex-1">
                <p className="font-medium text-brand-black">Password</p>
                <p className="text-sm text-neutral-500">Last changed 30 days ago</p>
              </div>
              <button 
                onClick={() => setShowPasswordModal(true)}
                className="px-4 py-2 text-sm font-medium text-white bg-brand-aqua hover:bg-[#2BA6AD] rounded-xl transition-colors flex items-center gap-2"
              >
                <KeyIcon className="w-4 h-4" />
                Change Password
              </button>
            </div>

            {/* tomiwa: Profile visibility toggle */}
            <ToggleSwitch
              enabled={privacy.profileVisible}
              onChange={() => togglePrivacy('profileVisible')}
              label="Profile Visibility"
              description="Allow employers to find and view your profile in search results"
            />

            {/* tomiwa: Show email on profile toggle */}
            <ToggleSwitch
              enabled={privacy.showEmail}
              onChange={() => togglePrivacy('showEmail')}
              label="Show Email on Profile"
              description="Display your email address publicly on your profile"
            />
          </div>
        );

      // ============================================================
      // NOTIFICATIONS TAB CONTENT
      // ============================================================
      case 'notifications':
        return (
          <div className="space-y-1">
            <ToggleSwitch
              enabled={notifications.emailAlerts}
              onChange={() => toggleNotification('emailAlerts')}
              label="Email Notifications"
              description="Receive important updates and alerts via email"
            />
            <ToggleSwitch
              enabled={notifications.smsAlerts}
              onChange={() => toggleNotification('smsAlerts')}
              label="SMS Notifications"
              description="Get text messages for urgent alerts and reminders"
            />
            <ToggleSwitch
              enabled={notifications.jobMatches}
              onChange={() => toggleNotification('jobMatches')}
              label="Job Match Alerts"
              description="Get notified when new jobs match your profile and preferences"
            />
            <ToggleSwitch
              enabled={notifications.applicationUpdates}
              onChange={() => toggleNotification('applicationUpdates')}
              label="Application Updates"
              description="Receive updates when your application status changes"
            />
            <ToggleSwitch
              enabled={notifications.messages}
              onChange={() => toggleNotification('messages')}
              label="New Messages"
              description="Get notified when employers send you messages"
            />
            <ToggleSwitch
              enabled={notifications.marketing}
              onChange={() => toggleNotification('marketing')}
              label="Marketing & Career Tips"
              description="Receive career tips, resources, and promotional content"
            />
          </div>
        );

      // ============================================================
      // PRIVACY & SECURITY TAB CONTENT
      // ============================================================
      case 'privacy':
        return (
          <div className="space-y-1">
            {/* tomiwa: Two-factor authentication */}
            <div className="flex items-center justify-between py-4 border-b border-neutral-100">
              <div className="flex-1 pr-4">
                <p className="font-medium text-brand-black">Two-Factor Authentication</p>
                <p className="text-sm text-neutral-500">Add an extra layer of security to your account</p>
              </div>
              <button 
                onClick={() => togglePrivacy('twoFactorAuth')}
                className={`px-4 py-2 text-sm font-medium rounded-xl transition-colors flex items-center gap-2 ${
                  privacy.twoFactorAuth 
                    ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' 
                    : 'bg-brand-aqua text-white hover:bg-[#2BA6AD]'
                }`}
              >
                {privacy.twoFactorAuth ? (
                  <>
                    <CheckCircleIcon className="w-4 h-4" />
                    Enabled
                  </>
                ) : (
                  <>
                    <ShieldCheckIcon className="w-4 h-4" />
                    Enable 2FA
                  </>
                )}
              </button>
            </div>

            {/* tomiwa: Download data */}
            <div className="flex items-center justify-between py-4 border-b border-neutral-100">
              <div className="flex-1 pr-4">
                <p className="font-medium text-brand-black">Download Your Data</p>
                <p className="text-sm text-neutral-500">Export all your account data in a downloadable format</p>
              </div>
              <button 
                onClick={() => showToast('Your data export is being prepared. You\'ll receive an email shortly.', 'success')}
                className="px-4 py-2 text-sm font-medium text-brand-aqua border border-brand-aqua hover:bg-brand-aqua hover:text-white rounded-xl transition-colors flex items-center gap-2"
              >
                <ArrowDownTrayIcon className="w-4 h-4" />
                Download
              </button>
            </div>

            {/* tomiwa: Active sessions info */}
            <div className="flex items-center justify-between py-4 border-b border-neutral-100">
              <div className="flex-1 pr-4">
                <p className="font-medium text-brand-black">Active Sessions</p>
                <p className="text-sm text-neutral-500">You&apos;re currently logged in on 2 devices</p>
              </div>
              <button 
                onClick={() => showToast('All other sessions have been logged out', 'success')}
                className="px-4 py-2 text-sm font-medium text-neutral-600 border border-neutral-300 hover:bg-neutral-100 rounded-xl transition-colors"
              >
                Log Out All
              </button>
            </div>

            {/* tomiwa: Delete account (dangerous action) */}
            <div className="flex items-center justify-between py-4">
              <div className="flex-1 pr-4">
                <p className="font-medium text-red-600">Delete Account</p>
                <p className="text-sm text-neutral-500">Permanently delete your account and all associated data</p>
              </div>
              <button 
                onClick={() => setShowDeleteModal(true)}
                className="px-4 py-2 text-sm font-medium text-red-600 border border-red-200 hover:bg-red-50 hover:border-red-300 rounded-xl transition-colors flex items-center gap-2"
              >
                <TrashIcon className="w-4 h-4" />
                Delete Account
              </button>
            </div>
          </div>
        );

      // ============================================================
      // PREFERENCES TAB CONTENT
      // ============================================================
      case 'preferences':
        return (
          <div className="space-y-6">
            {/* tomiwa: Theme selector */}
            {/* updated: Removed dark theme option, only Light and System remain */}
            <div>
              <label className="block font-medium text-brand-black mb-3">Theme</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'light', icon: SunIcon, label: 'Light' },
                  { id: 'system', icon: ComputerDesktopIcon, label: 'System' },
                ].map((theme) => {
                  const IconComponent = theme.icon;
                  return (
                    <button
                      key={theme.id}
                      onClick={() => {
                        setPreferences(prev => ({ ...prev, theme: theme.id }));
                        showToast(`Theme changed to ${theme.label}`, 'success');
                      }}
                      className={`py-3 px-4 rounded-xl border-2 transition-all duration-300 flex items-center justify-center gap-2 ${
                        preferences.theme === theme.id
                          ? 'border-brand-aqua bg-primary-50 text-brand-aqua'
                          : 'border-neutral-200 text-neutral-600 hover:border-neutral-300'
                      }`}
                    >
                      <IconComponent className="w-5 h-5" />
                      <span className="font-medium">{theme.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* tomiwa: Language selector */}
            <div>
              <label className="block font-medium text-brand-black mb-2">Language</label>
              <select
                value={preferences.language}
                onChange={(e) => {
                  setPreferences(prev => ({ ...prev, language: e.target.value }));
                  showToast(`Language changed to ${e.target.value}`, 'success');
                }}
                className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-brand-aqua focus:border-brand-aqua transition-all text-brand-black"
              >
                <option>English</option>
                <option>French</option>
                <option>Spanish</option>
                <option>Portuguese</option>
                <option>German</option>
              </select>
            </div>

            {/* tomiwa: Timezone selector */}
            <div>
              <label className="block font-medium text-brand-black mb-2">Timezone</label>
              <select
                value={preferences.timezone}
                onChange={(e) => {
                  setPreferences(prev => ({ ...prev, timezone: e.target.value }));
                  showToast('Timezone updated', 'success');
                }}
                className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-brand-aqua focus:border-brand-aqua transition-all text-brand-black"
              >
                <option>Africa/Lagos (GMT+1)</option>
                <option>Europe/London (GMT+0)</option>
                <option>America/New_York (GMT-5)</option>
                <option>America/Los_Angeles (GMT-8)</option>
                <option>Asia/Dubai (GMT+4)</option>
                <option>Asia/Tokyo (GMT+9)</option>
              </select>
            </div>

            {/* tomiwa: Date format selector */}
            <div>
              <label className="block font-medium text-brand-black mb-2">Date Format</label>
              <select
                className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-brand-aqua focus:border-brand-aqua transition-all text-brand-black"
              >
                <option>DD/MM/YYYY</option>
                <option>MM/DD/YYYY</option>
                <option>YYYY-MM-DD</option>
              </select>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <CandidateDashboardLayout>
      {/* tomiwa: UPDATED - Hero Banner matching dashboard design */}
      {/* updated: Reduced padding for tighter layout */}
      <div className="bg-gradient-to-r from-brand-aqua to-[#0C5B65]">
        <div className="px-4 
                        sm:px-6 
                        md:px-8 
                        lg:px-10 
                        xl:px-12 
                        2xl:px-16 
                        py-8 
                        sm:py-10 
                        md:py-12 
                        lg:py-14">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6">
            <div className="flex-1">
              {/* tomiwa: Main heading with Monument Extended font */}
              <h1 className="text-3xl 
                            sm:text-4xl 
                            md:text-4xl 
                            lg:text-5xl 
                            font-display font-bold text-white mb-2">
                Settings
              </h1>
              {/* tomiwa: Subtitle in uniform style */}
              <p className="text-[#D9E5E6] text-base 
                           sm:text-lg 
                           md:text-lg 
                           lg:text-xl 
                           leading-relaxed max-w-2xl">
                Customize your account preferences and notification settings
              </p>
            </div>
            {/* tomiwa: Save all button */}
            <button
              onClick={saveSettings}
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-orange text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:bg-[#BF4225] hover:scale-105"
            >
              <CheckCircleIcon className="w-5 h-5" />
              Save All Changes
            </button>
          </div>
        </div>
      </div>

      {/* tomiwa: UPDATED - Main content area with single card */}
      {/* updated: Changed max-w-4xl to max-w-6xl for fuller width, reduced padding */}
      <main className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6">
        
        {/* ============================================================ */}
        {/* tomiwa: NEW - SINGLE CARD with Toggle Tab Navigation         */}
        {/* new: Contains all settings sections in one unified card      */}
        {/* ============================================================ */}
        <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 overflow-hidden">
          
          {/* tomiwa: NEW - Toggle Tab Navigation Bar */}
          {/* new: Horizontal scrollable tabs for switching between sections */}
          <div className="border-b border-neutral-100 bg-neutral-50/50">
            <div className="flex overflow-x-auto scrollbar-hide">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                const isActive = activeTab === tab.id;
                
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-all duration-200 border-b-2 ${
                      isActive
                        ? 'text-brand-aqua border-brand-aqua bg-white'
                        : 'text-neutral-500 border-transparent hover:text-neutral-700 hover:bg-neutral-100'
                    }`}
                  >
                    <IconComponent className={`w-5 h-5 ${isActive ? 'text-brand-aqua' : 'text-neutral-400'}`} />
                    <span className="hidden sm:inline">{tab.label}</span>
                    {/* tomiwa: Short labels for mobile */}
                    <span className="sm:hidden">
                      {tab.id === 'account' && 'Account'}
                      {tab.id === 'notifications' && 'Alerts'}
                      {tab.id === 'privacy' && 'Privacy'}
                      {tab.id === 'preferences' && 'Prefs'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* tomiwa: NEW - Tab Content Area */}
          {/* new: Displays content based on active tab */}
          {/* updated: Reduced padding for tighter layout */}
          <div className="p-4 sm:p-5 md:p-6">
            {/* tomiwa: Section header showing current tab */}
            {/* updated: Reduced margin for tighter layout */}
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-neutral-100">
              {/* tomiwa: Dynamic icon based on active tab */}
              {activeTab === 'account' && <UserCircleIcon className="w-7 h-7 text-brand-aqua" />}
              {activeTab === 'notifications' && <BellIcon className="w-7 h-7 text-brand-orange" />}
              {activeTab === 'privacy' && <ShieldCheckIcon className="w-7 h-7 text-emerald-500" />}
              {activeTab === 'preferences' && <GlobeAltIcon className="w-7 h-7 text-brand-yellow" />}
              
              <div>
                <h2 className="text-xl font-display font-bold text-brand-black">
                  {tabs.find(t => t.id === activeTab)?.label}
                </h2>
                <p className="text-sm text-neutral-500 mt-0.5">
                  {activeTab === 'account' && 'Manage your account details and profile settings'}
                  {activeTab === 'notifications' && 'Control how and when you receive notifications'}
                  {activeTab === 'privacy' && 'Secure your account and manage your data'}
                  {activeTab === 'preferences' && 'Customize your app experience'}
                </p>
              </div>
            </div>

            {/* tomiwa: Render the content for the active tab */}
            {renderTabContent()}
          </div>

          {/* tomiwa: NEW - Card Footer with Save Button */}
          {/* new: Sticky save button at the bottom of the card */}
          {/* updated: Reduced padding to match content area */}
          <div className="border-t border-neutral-100 bg-neutral-50/50 px-4 sm:px-5 md:px-6 py-3">
            <div className="flex items-center justify-between">
              <p className="text-sm text-neutral-500">
                Changes are saved automatically
              </p>
              <button
                onClick={saveSettings}
                className="px-6 py-2.5 bg-brand-aqua text-white font-semibold rounded-xl hover:bg-[#2BA6AD] transition-all duration-300"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
        {/* END SINGLE CARD */}

      </main>

      {/* ================================================================ */}
      {/* tomiwa: Change Password Modal                                    */}
      {/* ================================================================ */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-5 sm:p-6">
            {/* tomiwa: Modal header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-brand-aqua/10 rounded-xl flex items-center justify-center">
                <KeyIcon className="w-6 h-6 text-brand-aqua" />
              </div>
              <div>
                <h3 className="text-xl font-display font-bold text-brand-black">Change Password</h3>
                <p className="text-sm text-neutral-500">Enter your current and new password</p>
              </div>
            </div>

            {/* tomiwa: Password form */}
            <form className="space-y-4">
              {/* tomiwa: Current password field */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? 'text' : 'password'}
                    placeholder="Enter current password"
                    className="w-full px-4 py-3 pr-12 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-brand-aqua focus:border-brand-aqua transition-all text-brand-black placeholder:text-neutral-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                  >
                    {showCurrentPassword ? (
                      <EyeSlashIcon className="w-5 h-5" />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* tomiwa: New password field */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    placeholder="Enter new password"
                    className="w-full px-4 py-3 pr-12 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-brand-aqua focus:border-brand-aqua transition-all text-brand-black placeholder:text-neutral-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                  >
                    {showNewPassword ? (
                      <EyeSlashIcon className="w-5 h-5" />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* tomiwa: Confirm new password field */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  placeholder="Confirm new password"
                  className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-brand-aqua focus:border-brand-aqua transition-all text-brand-black placeholder:text-neutral-400"
                />
              </div>

              {/* tomiwa: Action buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="flex-1 px-5 py-3 border-2 border-neutral-200 text-neutral-600 hover:border-neutral-300 font-semibold rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowPasswordModal(false);
                    showToast('Password changed successfully!', 'success');
                  }}
                  className="flex-1 px-5 py-3 bg-brand-aqua text-white font-semibold rounded-xl hover:bg-[#2BA6AD] transition-colors"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* tomiwa: NEW - Change Email Modal                                 */}
      {/* new: Modal for changing email address                            */}
      {/* ================================================================ */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-5 sm:p-6">
            {/* tomiwa: Modal header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-brand-aqua/10 rounded-xl flex items-center justify-center">
                <EnvelopeIcon className="w-6 h-6 text-brand-aqua" />
              </div>
              <div>
                <h3 className="text-xl font-display font-bold text-brand-black">Change Email</h3>
                <p className="text-sm text-neutral-500">Update your email address</p>
              </div>
            </div>

            {/* tomiwa: Email change form */}
            <form className="space-y-4">
              {/* tomiwa: Current email display */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                  Current Email
                </label>
                <div className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-500">
                  johndoe@example.com
                </div>
              </div>

              {/* tomiwa: New email field */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                  New Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter new email address"
                  className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-brand-aqua focus:border-brand-aqua transition-all text-brand-black placeholder:text-neutral-400"
                />
              </div>

              {/* tomiwa: Confirm new email field */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                  Confirm New Email
                </label>
                <input
                  type="email"
                  placeholder="Confirm new email address"
                  className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-brand-aqua focus:border-brand-aqua transition-all text-brand-black placeholder:text-neutral-400"
                />
              </div>

              {/* tomiwa: Password verification field */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                  Enter Password to Confirm
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-brand-aqua focus:border-brand-aqua transition-all text-brand-black placeholder:text-neutral-400"
                />
              </div>

              {/* tomiwa: Info note */}
              <div className="bg-primary-50 border border-primary-100 rounded-xl p-3">
                <p className="text-sm text-primary-700">
                  A verification link will be sent to your new email address. You&apos;ll need to verify it before the change takes effect.
                </p>
              </div>

              {/* tomiwa: Action buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowEmailModal(false)}
                  className="flex-1 px-5 py-3 border-2 border-neutral-200 text-neutral-600 hover:border-neutral-300 font-semibold rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowEmailModal(false);
                    showToast('Verification email sent! Please check your inbox.', 'success');
                  }}
                  className="flex-1 px-5 py-3 bg-brand-aqua text-white font-semibold rounded-xl hover:bg-[#2BA6AD] transition-colors"
                >
                  Update Email
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* tomiwa: Delete Account Confirmation Modal                        */}
      {/* ================================================================ */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-5 sm:p-6">
            {/* tomiwa: Warning icon and header */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ExclamationCircleIcon className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-display font-bold text-brand-black mb-2">
                Delete Your Account?
              </h3>
              <p className="text-neutral-600 text-sm">
                This action cannot be undone. All your data, applications, and saved jobs will be permanently deleted.
              </p>
            </div>

            {/* tomiwa: Confirmation input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                Type &quot;DELETE&quot; to confirm
              </label>
              <input
                type="text"
                placeholder="DELETE"
                className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all text-brand-black placeholder:text-neutral-400"
              />
            </div>

            {/* tomiwa: Action buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-5 py-3 border-2 border-neutral-200 text-neutral-600 hover:border-neutral-300 font-semibold rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  showToast('Account deletion request submitted', 'success');
                }}
                className="flex-1 px-5 py-3 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition-colors"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* tomiwa: Toast Notification                                        */}
      {/* ================================================================ */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
          <div
            className={`rounded-xl shadow-xl p-4 flex items-center gap-3 ${
              toast.type === 'success'
                ? 'bg-emerald-500'
                : toast.type === 'error'
                ? 'bg-red-500'
                : 'bg-brand-aqua'
            } text-white min-w-[280px]`}
          >
            {toast.type === 'success' ? (
              <CheckCircleIcon className="w-6 h-6 flex-shrink-0" />
            ) : (
              <ExclamationCircleIcon className="w-6 h-6 flex-shrink-0" />
            )}
            <span className="font-medium text-sm">{toast.message}</span>
          </div>
        </div>
      )}
    </CandidateDashboardLayout>
  );
}
