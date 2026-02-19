/**
 * File: src/app/coach/dashboard/settings/page.js
 * 
 * tomiwa: Coach Settings Page
 * Comprehensive settings management for coaches including account preferences,
 * notification settings, privacy controls, and security options
 * 
 * Features:
 * - Account settings and preferences
 * - Notification and email preferences
 * - Privacy and visibility controls
 * - Security settings (password, 2FA)
 * - Payment and billing preferences
 * - Data export and account management
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import CoachDashboardLayout from '@/components/layouts/CoachDashboardLayout.jsx';
import {
  Cog6ToothIcon,
  BellIcon,
  ShieldCheckIcon,
  EyeIcon,
  CreditCardIcon,
  DocumentArrowDownIcon,
  UserCircleIcon,
  GlobeAltIcon,
  DevicePhoneMobileIcon,
  EnvelopeIcon,
  LockClosedIcon,
  KeyIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';

// tomiwa: Mock settings data
const initialSettings = {
  account: {
    language: 'en',
    timezone: 'UTC-05:00',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12h',
  },
  notifications: {
    email: {
      newBookings: true,
      sessionReminders: true,
      paymentUpdates: true,
      marketingEmails: false,
      weeklyReports: true,
    },
    push: {
      sessionReminders: true,
      newMessages: true,
      paymentUpdates: true,
      appUpdates: false,
    },
    sms: {
      sessionReminders: false,
      urgentUpdates: true,
    },
  },
  privacy: {
    profileVisibility: 'public',
    showRatings: true,
    showSessionCount: true,
    showResponseTime: true,
    allowDirectMessages: true,
    searchable: true,
  },
  security: {
    twoFactorEnabled: false,
    loginAlerts: true,
    sessionTimeout: 30,
  },
  billing: {
    autoWithdraw: true,
    withdrawalThreshold: 100,
    preferredPaymentMethod: 'bank-transfer',
    invoiceEmails: true,
  },
};

export default function CoachSettingsPage() {
  // tomiwa: State for settings
  const [settings, setSettings] = useState(initialSettings);
  const [activeSection, setActiveSection] = useState('account');
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState(null);
  
  // tomiwa: State for security actions
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [showTwoFactorSetup, setShowTwoFactorSetup] = useState(false);
  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  // tomiwa: Handle settings change
  const handleSettingChange = (section, subsection, field, value) => {
    if (subsection) {
      setSettings(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [subsection]: {
            ...prev[section][subsection],
            [field]: value
          }
        }
      }));
    } else {
      setSettings(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }));
    }
  };

  // tomiwa: Save settings
  const saveSettings = async () => {
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    showToast('Settings saved successfully!', 'success');
    setIsSaving(false);
  };

  // tomiwa: Change password
  const changePassword = async () => {
    if (passwordData.new !== passwordData.confirm) {
      showToast('New passwords do not match', 'error');
      return;
    }
    
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    showToast('Password changed successfully!', 'success');
    setPasswordData({ current: '', new: '', confirm: '' });
    setShowPasswordChange(false);
    setIsSaving(false);
  };

  // tomiwa: Enable two-factor authentication
  const enableTwoFactor = async () => {
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    handleSettingChange('security', null, 'twoFactorEnabled', true);
    showToast('Two-factor authentication enabled!', 'success');
    setShowTwoFactorSetup(false);
    setIsSaving(false);
  };

  // tomiwa: Export data
  const exportData = async () => {
    setIsSaving(true);
    
    // Simulate data export
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    showToast('Data export completed! Check your email for download link.', 'success');
    setIsSaving(false);
  };

  // tomiwa: Show toast notification
  const showToast = (message, type = 'success') => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  // tomiwa: Section navigation
  const sections = [
    { id: 'account', label: 'Account', icon: UserCircleIcon },
    { id: 'notifications', label: 'Notifications', icon: BellIcon },
    { id: 'privacy', label: 'Privacy', icon: EyeIcon },
    { id: 'security', label: 'Security', icon: ShieldCheckIcon },
    { id: 'billing', label: 'Billing', icon: CreditCardIcon },
    { id: 'data', label: 'Data & Export', icon: DocumentArrowDownIcon },
  ];

  return (
    <CoachDashboardLayout>
      {/* tomiwa: Header */}
      <div className="bg-gradient-to-r from-brand-aqua to-[#0C5B65]">
        <div className="px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20 py-10 sm:py-12 md:py-14 lg:py-16">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6">
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-2">
                Settings
              </h1>
              <p className="text-[#D9E5E6] text-base sm:text-lg md:text-lg lg:text-xl leading-relaxed max-w-2xl">
                Manage your account preferences, notifications, and security settings
              </p>
            </div>
            <button
              onClick={saveSettings}
              disabled={isSaving}
              className="bg-brand-orange hover:bg-brand-orange/90 text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 shadow-lg hover:scale-105 disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <CheckCircleIcon className="w-5 h-5" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-8 py-12">
        {/* tomiwa: Section Navigation */}
        <div className="border-b border-neutral-200 mb-8">
          <nav className="flex space-x-8 overflow-x-auto">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeSection === section.id
                    ? 'border-brand-aqua text-brand-aqua'
                    : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                }`}
              >
                <section.icon className="w-4 h-4" />
                {section.label}
              </button>
            ))}
          </nav>
        </div>

        {/* tomiwa: Section Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* tomiwa: Main Content */}
          <div className="lg:col-span-2">
            {activeSection === 'account' && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-display font-bold text-brand-black mb-8">Account Preferences</h2>
                
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Language
                      </label>
                      <select
                        value={settings.account.language}
                        onChange={(e) => handleSettingChange('account', null, 'language', e.target.value)}
                        className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:border-brand-aqua focus:ring-brand-aqua/20 focus:ring-4 focus:outline-none transition-colors"
                      >
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Timezone
                      </label>
                      <select
                        value={settings.account.timezone}
                        onChange={(e) => handleSettingChange('account', null, 'timezone', e.target.value)}
                        className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:border-brand-aqua focus:ring-brand-aqua/20 focus:ring-4 focus:outline-none transition-colors"
                      >
                        <option value="UTC-05:00">UTC-05:00 (Eastern Time)</option>
                        <option value="UTC-06:00">UTC-06:00 (Central Time)</option>
                        <option value="UTC-07:00">UTC-07:00 (Mountain Time)</option>
                        <option value="UTC-08:00">UTC-08:00 (Pacific Time)</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Date Format
                      </label>
                      <select
                        value={settings.account.dateFormat}
                        onChange={(e) => handleSettingChange('account', null, 'dateFormat', e.target.value)}
                        className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:border-brand-aqua focus:ring-brand-aqua/20 focus:ring-4 focus:outline-none transition-colors"
                      >
                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                        <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                        <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Time Format
                      </label>
                      <select
                        value={settings.account.timeFormat}
                        onChange={(e) => handleSettingChange('account', null, 'timeFormat', e.target.value)}
                        className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:border-brand-aqua focus:ring-brand-aqua/20 focus:ring-4 focus:outline-none transition-colors"
                      >
                        <option value="12h">12-hour (AM/PM)</option>
                        <option value="24h">24-hour</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'notifications' && (
              <div className="space-y-8">
                {/* tomiwa: Email Notifications */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <EnvelopeIcon className="w-6 h-6 text-brand-aqua" />
                    <h2 className="text-xl font-display font-bold text-brand-black">Email Notifications</h2>
                  </div>
                  
                  <div className="space-y-4">
                    {Object.entries(settings.notifications.email).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-4 border border-neutral-200 rounded-xl">
                        <div>
                          <h4 className="font-semibold text-neutral-900 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </h4>
                          <p className="text-sm text-neutral-600">
                            {key === 'newBookings' && 'Get notified when someone books a session'}
                            {key === 'sessionReminders' && 'Reminders before upcoming sessions'}
                            {key === 'paymentUpdates' && 'Updates about payments and payouts'}
                            {key === 'marketingEmails' && 'Tips, updates, and promotional content'}
                            {key === 'weeklyReports' && 'Weekly summary of your coaching activity'}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleSettingChange('notifications', 'email', key, !value)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            value ? 'bg-brand-aqua' : 'bg-neutral-300'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              value ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* tomiwa: Push Notifications */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <DevicePhoneMobileIcon className="w-6 h-6 text-brand-aqua" />
                    <h2 className="text-xl font-display font-bold text-brand-black">Push Notifications</h2>
                  </div>
                  
                  <div className="space-y-4">
                    {Object.entries(settings.notifications.push).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-4 border border-neutral-200 rounded-xl">
                        <div>
                          <h4 className="font-semibold text-neutral-900 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </h4>
                          <p className="text-sm text-neutral-600">
                            {key === 'sessionReminders' && 'Push reminders before sessions'}
                            {key === 'newMessages' && 'New messages from candidates'}
                            {key === 'paymentUpdates' && 'Payment and payout notifications'}
                            {key === 'appUpdates' && 'App updates and new features'}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleSettingChange('notifications', 'push', key, !value)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            value ? 'bg-brand-aqua' : 'bg-neutral-300'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              value ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'privacy' && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-display font-bold text-brand-black mb-8">Privacy & Visibility</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Profile Visibility
                    </label>
                    <select
                      value={settings.privacy.profileVisibility}
                      onChange={(e) => handleSettingChange('privacy', null, 'profileVisibility', e.target.value)}
                      className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:border-brand-aqua focus:ring-brand-aqua/20 focus:ring-4 focus:outline-none transition-colors"
                    >
                      <option value="public">Public - Visible to all candidates</option>
                      <option value="limited">Limited - Only visible to matched candidates</option>
                      <option value="private">Private - Not visible in search results</option>
                    </select>
                  </div>
                  
                  <div className="space-y-4">
                    {Object.entries(settings.privacy).filter(([key]) => key !== 'profileVisibility').map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-4 border border-neutral-200 rounded-xl">
                        <div>
                          <h4 className="font-semibold text-neutral-900 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </h4>
                          <p className="text-sm text-neutral-600">
                            {key === 'showRatings' && 'Display your average rating on your profile'}
                            {key === 'showSessionCount' && 'Show total number of completed sessions'}
                            {key === 'showResponseTime' && 'Display your average response time'}
                            {key === 'allowDirectMessages' && 'Allow candidates to message you directly'}
                            {key === 'searchable' && 'Include your profile in search results'}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleSettingChange('privacy', null, key, !value)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            value ? 'bg-brand-aqua' : 'bg-neutral-300'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              value ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'security' && (
              <div className="space-y-8">
                {/* tomiwa: Password Settings */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <LockClosedIcon className="w-6 h-6 text-brand-aqua" />
                    <h2 className="text-xl font-display font-bold text-brand-black">Password & Authentication</h2>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 border border-neutral-200 rounded-xl">
                      <div>
                        <h4 className="font-semibold text-neutral-900">Password</h4>
                        <p className="text-sm text-neutral-600">Last changed 30 days ago</p>
                      </div>
                      <button
                        onClick={() => setShowPasswordChange(!showPasswordChange)}
                        className="px-4 py-2 text-brand-aqua border border-brand-aqua rounded-lg hover:bg-brand-aqua/5 transition-colors"
                      >
                        Change Password
                      </button>
                    </div>
                    
                    {showPasswordChange && (
                      <div className="p-6 bg-neutral-50 rounded-xl space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-neutral-700 mb-2">
                            Current Password
                          </label>
                          <input
                            type="password"
                            value={passwordData.current}
                            onChange={(e) => setPasswordData(prev => ({ ...prev, current: e.target.value }))}
                            className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:border-brand-aqua focus:ring-brand-aqua/20 focus:ring-4 focus:outline-none transition-colors"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-neutral-700 mb-2">
                            New Password
                          </label>
                          <input
                            type="password"
                            value={passwordData.new}
                            onChange={(e) => setPasswordData(prev => ({ ...prev, new: e.target.value }))}
                            className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:border-brand-aqua focus:ring-brand-aqua/20 focus:ring-4 focus:outline-none transition-colors"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-neutral-700 mb-2">
                            Confirm New Password
                          </label>
                          <input
                            type="password"
                            value={passwordData.confirm}
                            onChange={(e) => setPasswordData(prev => ({ ...prev, confirm: e.target.value }))}
                            className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:border-brand-aqua focus:ring-brand-aqua/20 focus:ring-4 focus:outline-none transition-colors"
                          />
                        </div>
                        
                        <div className="flex gap-3">
                          <button
                            onClick={changePassword}
                            disabled={isSaving || !passwordData.current || !passwordData.new || !passwordData.confirm}
                            className="px-4 py-2 bg-brand-aqua text-white rounded-lg hover:bg-brand-aqua/90 transition-colors disabled:opacity-50"
                          >
                            Update Password
                          </button>
                          <button
                            onClick={() => {
                              setShowPasswordChange(false);
                              setPasswordData({ current: '', new: '', confirm: '' });
                            }}
                            className="px-4 py-2 border border-neutral-200 text-neutral-600 rounded-lg hover:bg-neutral-50 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between p-4 border border-neutral-200 rounded-xl">
                      <div>
                        <h4 className="font-semibold text-neutral-900">Two-Factor Authentication</h4>
                        <p className="text-sm text-neutral-600">
                          {settings.security.twoFactorEnabled ? 'Enabled' : 'Add an extra layer of security'}
                        </p>
                      </div>
                      <button
                        onClick={() => settings.security.twoFactorEnabled ? 
                          handleSettingChange('security', null, 'twoFactorEnabled', false) : 
                          setShowTwoFactorSetup(true)
                        }
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          settings.security.twoFactorEnabled
                            ? 'text-red-600 border border-red-600 hover:bg-red-50'
                            : 'text-brand-aqua border border-brand-aqua hover:bg-brand-aqua/5'
                        }`}
                      >
                        {settings.security.twoFactorEnabled ? 'Disable' : 'Enable'}
                      </button>
                    </div>
                    
                    {showTwoFactorSetup && (
                      <div className="p-6 bg-brand-aqua/5 border border-brand-aqua/20 rounded-xl">
                        <div className="flex items-start gap-3 mb-4">
                          <KeyIcon className="w-6 h-6 text-brand-aqua flex-shrink-0 mt-1" />
                          <div>
                            <h4 className="font-semibold text-brand-aqua mb-2">Enable Two-Factor Authentication</h4>
                            <p className="text-sm text-neutral-700 mb-4">
                              Two-factor authentication adds an extra layer of security to your account. 
                              You'll need to enter a code from your phone in addition to your password when signing in.
                            </p>
                            <div className="flex gap-3">
                              <button
                                onClick={enableTwoFactor}
                                disabled={isSaving}
                                className="px-4 py-2 bg-brand-aqua text-white rounded-lg hover:bg-brand-aqua/90 transition-colors disabled:opacity-50"
                              >
                                Enable 2FA
                              </button>
                              <button
                                onClick={() => setShowTwoFactorSetup(false)}
                                className="px-4 py-2 border border-neutral-200 text-neutral-600 rounded-lg hover:bg-neutral-50 transition-colors"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* tomiwa: Security Preferences */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h3 className="text-xl font-display font-bold text-brand-black mb-6">Security Preferences</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-neutral-200 rounded-xl">
                      <div>
                        <h4 className="font-semibold text-neutral-900">Login Alerts</h4>
                        <p className="text-sm text-neutral-600">Get notified of new sign-ins to your account</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleSettingChange('security', null, 'loginAlerts', !settings.security.loginAlerts)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          settings.security.loginAlerts ? 'bg-brand-aqua' : 'bg-neutral-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            settings.security.loginAlerts ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                    
                    <div className="p-4 border border-neutral-200 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-neutral-900">Session Timeout</h4>
                        <span className="text-sm text-neutral-600">{settings.security.sessionTimeout} minutes</span>
                      </div>
                      <p className="text-sm text-neutral-600 mb-4">Automatically log out after period of inactivity</p>
                      <select
                        value={settings.security.sessionTimeout}
                        onChange={(e) => handleSettingChange('security', null, 'sessionTimeout', parseInt(e.target.value))}
                        className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:border-brand-aqua focus:ring-brand-aqua/20 focus:ring-4 focus:outline-none transition-colors"
                      >
                        <option value={15}>15 minutes</option>
                        <option value={30}>30 minutes</option>
                        <option value={60}>1 hour</option>
                        <option value={120}>2 hours</option>
                        <option value={0}>Never</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'billing' && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-display font-bold text-brand-black mb-8">Billing & Payments</h2>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 border border-neutral-200 rounded-xl">
                    <div>
                      <h4 className="font-semibold text-neutral-900">Auto-Withdrawal</h4>
                      <p className="text-sm text-neutral-600">Automatically transfer earnings to your bank account</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleSettingChange('billing', null, 'autoWithdraw', !settings.billing.autoWithdraw)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings.billing.autoWithdraw ? 'bg-brand-aqua' : 'bg-neutral-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          settings.billing.autoWithdraw ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Withdrawal Threshold
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-brand-aqua">$</span>
                      <input
                        type="number"
                        value={settings.billing.withdrawalThreshold}
                        onChange={(e) => handleSettingChange('billing', null, 'withdrawalThreshold', parseInt(e.target.value))}
                        className="flex-1 px-4 py-3 border border-neutral-200 rounded-xl focus:border-brand-aqua focus:ring-brand-aqua/20 focus:ring-4 focus:outline-none transition-colors"
                      />
                    </div>
                    <p className="text-sm text-neutral-600 mt-1">
                      Minimum amount before automatic withdrawal
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Preferred Payment Method
                    </label>
                    <select
                      value={settings.billing.preferredPaymentMethod}
                      onChange={(e) => handleSettingChange('billing', null, 'preferredPaymentMethod', e.target.value)}
                      className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:border-brand-aqua focus:ring-brand-aqua/20 focus:ring-4 focus:outline-none transition-colors"
                    >
                      <option value="bank-transfer">Bank Transfer</option>
                      <option value="paypal">PayPal</option>
                      <option value="stripe">Stripe</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border border-neutral-200 rounded-xl">
                    <div>
                      <h4 className="font-semibold text-neutral-900">Invoice Emails</h4>
                      <p className="text-sm text-neutral-600">Receive email copies of invoices and receipts</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleSettingChange('billing', null, 'invoiceEmails', !settings.billing.invoiceEmails)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings.billing.invoiceEmails ? 'bg-brand-aqua' : 'bg-neutral-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          settings.billing.invoiceEmails ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'data' && (
              <div className="space-y-8">
                {/* tomiwa: Data Export */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h2 className="text-2xl font-display font-bold text-brand-black mb-8">Data Export</h2>
                  
                  <div className="space-y-6">
                    <div className="p-6 bg-brand-aqua/5 border border-brand-aqua/20 rounded-xl">
                      <div className="flex items-start gap-3">
                        <InformationCircleIcon className="w-6 h-6 text-brand-aqua flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-semibold text-brand-aqua mb-2">Export Your Data</h4>
                          <p className="text-sm text-neutral-700 mb-4">
                            Download a copy of your coaching data including sessions, earnings, 
                            reviews, and profile information. This may take a few minutes to process.
                          </p>
                          <button
                            onClick={exportData}
                            disabled={isSaving}
                            className="flex items-center gap-2 px-6 py-3 bg-brand-aqua text-white rounded-xl hover:bg-brand-aqua/90 transition-colors disabled:opacity-50"
                          >
                            {isSaving ? (
                              <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Generating Export...
                              </>
                            ) : (
                              <>
                                <DocumentArrowDownIcon className="w-5 h-5" />
                                Export Data
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* tomiwa: Account Deletion */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h2 className="text-2xl font-display font-bold text-brand-black mb-8">Account Management</h2>
                  
                  <div className="p-6 bg-red-50 border border-red-200 rounded-xl">
                    <div className="flex items-start gap-3">
                      <ExclamationTriangleIcon className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-red-600 mb-2">Delete Account</h4>
                        <p className="text-sm text-neutral-700 mb-4">
                          Permanently delete your account and all associated data. This action cannot be undone.
                          You will lose access to all your sessions, earnings history, and profile information.
                        </p>
                        <button className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors">
                          Delete Account
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* tomiwa: Sidebar */}
          <div className="space-y-6">
            {/* tomiwa: Quick Settings Summary */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-semibold text-neutral-900 mb-4">Settings Summary</h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Email Notifications:</span>
                  <span className="font-semibold text-brand-aqua">
                    {Object.values(settings.notifications.email).filter(Boolean).length}/5 enabled
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-neutral-600">Profile Visibility:</span>
                  <span className="font-semibold text-brand-aqua capitalize">
                    {settings.privacy.profileVisibility}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-neutral-600">Two-Factor Auth:</span>
                  <span className={`font-semibold ${
                    settings.security.twoFactorEnabled ? 'text-emerald-600' : 'text-red-600'
                  }`}>
                    {settings.security.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-neutral-600">Auto-Withdrawal:</span>
                  <span className={`font-semibold ${
                    settings.billing.autoWithdraw ? 'text-emerald-600' : 'text-neutral-600'
                  }`}>
                    {settings.billing.autoWithdraw ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
              </div>
            </div>

            {/* tomiwa: Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-semibold text-neutral-900 mb-4">Quick Actions</h3>
              
              <div className="space-y-3">
                <Link
                  href="/coach/dashboard/profile"
                  className="flex items-center gap-3 p-3 border border-neutral-200 rounded-xl hover:border-brand-aqua hover:bg-brand-aqua/5 transition-all duration-300"
                >
                  <UserCircleIcon className="w-4 h-4 text-brand-aqua" />
                  <span className="text-neutral-700">Edit Profile</span>
                </Link>
                
                <Link
                  href="/coach/dashboard/availability"
                  className="flex items-center gap-3 p-3 border border-neutral-200 rounded-xl hover:border-brand-aqua hover:bg-brand-aqua/5 transition-all duration-300"
                >
                  <Cog6ToothIcon className="w-4 h-4 text-brand-aqua" />
                  <span className="text-neutral-700">Manage Availability</span>
                </Link>
                
                <Link
                  href="/coach/dashboard"
                  className="flex items-center gap-3 p-3 border border-neutral-200 rounded-xl hover:border-brand-aqua hover:bg-brand-aqua/5 transition-all duration-300"
                >
                  <GlobeAltIcon className="w-4 h-4 text-brand-aqua" />
                  <span className="text-neutral-700">Back to Dashboard</span>
                </Link>
              </div>
            </div>

            {/* tomiwa: Security Status */}
            <div className="bg-gradient-to-br from-emerald-50 to-brand-aqua/10 border border-emerald-200 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheckIcon className="w-6 h-6 text-emerald-600" />
                <h3 className="font-semibold text-emerald-900">Security Status</h3>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-800">Strong password</span>
                </div>
                <div className="flex items-center gap-2">
                  {settings.security.twoFactorEnabled ? (
                    <CheckCircleIcon className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <ExclamationTriangleIcon className="w-4 h-4 text-amber-500" />
                  )}
                  <span className={settings.security.twoFactorEnabled ? 'text-emerald-800' : 'text-amber-700'}>
                    Two-factor authentication
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-800">Login alerts enabled</span>
                </div>
              </div>
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