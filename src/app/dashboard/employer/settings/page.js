/**
 * File Location: /src/app/dashboard/employer/settings/page.js
 * 
 * tomiwa: Settings Page for Employer Dashboard
 * This page allows employers to manage account info, notifications, team members, and security settings
 * Features: Account editing, password management, notification toggles, team invites, 2FA, and danger zone
 */

'use client';

import React, { useState } from 'react';
import EmployerDashboardLayout from '@/components/layouts/EmployerDashboardLayout';
import {
  UserCircleIcon,
  BellIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  PencilIcon,
  KeyIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  BuildingOfficeIcon,
  CheckCircleIcon,
  XMarkIcon,
  PlusIcon,
  TrashIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  ComputerDesktopIcon,
  DevicePhoneMobileIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';

export default function SettingsPage() {
  // tomiwa: State management for tab navigation (similar to subscription page)
  const [activeTab, setActiveTab] = useState('account');

  // tomiwa: State for account information editing
  const [isEditingAccount, setIsEditingAccount] = useState(false);
  const [accountData, setAccountData] = useState({
    companyName: 'Tech Corp',
    employerName: 'John Smith',
    email: 'john.smith@techcorp.com',
    phone: '+1 (555) 123-4567',
    address: '123 Tech Street, San Francisco, CA 94105',
  });

  // tomiwa: State for notification preferences
  const [notifications, setNotifications] = useState({
    newApplications: true,
    shortlistUpdates: true,
    interviewReminders: true,
    paymentConfirmations: true,
    subscriptionExpiry: true,
    platformUpdates: false,
    newFeatures: true,
    smsAlerts: false,
  });

  // tomiwa: State for team members - mock data
  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: 'Jane Doe', email: 'jane@techcorp.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Mike Johnson', email: 'mike@techcorp.com', role: 'Recruiter', status: 'Active' },
    { id: 3, name: 'Sarah Lee', email: 'sarah@techcorp.com', role: 'HR Assistant', status: 'Suspended' },
  ]);

  // tomiwa: State for security settings
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  // tomiwa: State for modals
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showAddTeamModal, setShowAddTeamModal] = useState(false);
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  // tomiwa: State for toast notifications
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  // tomiwa: Password modal state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordStrength, setPasswordStrength] = useState(0);

  // tomiwa: Add team member modal state
  const [newMember, setNewMember] = useState({
    fullName: '',
    email: '',
    role: 'Recruiter',
    accessLevel: 'Edit',
    sendInvite: true,
  });

  // johnson: No longer need toggle function - using tab navigation instead

  // johnson: Handle account data changes
  const handleAccountChange = (field, value) => {
    setAccountData(prev => ({ ...prev, [field]: value }));
  };

  // johnson: Save account changes
  const saveAccountChanges = () => {
    // tomiwa: Simulate API call
    showToast('Account information updated successfully!', 'success');
    setIsEditingAccount(false);
  };

  // johnson: Handle notification toggle
  const handleNotificationToggle = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // johnson: Save notification preferences
  const saveNotificationPreferences = () => {
    showToast('Notification preferences saved successfully!', 'success');
  };

  // johnson: Calculate password strength
  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength += 25;
    if (password.match(/[0-9]/)) strength += 25;
    if (password.match(/[^a-zA-Z0-9]/)) strength += 25;
    return strength;
  };

  // johnson: Handle password change
  const handlePasswordChange = (field, value) => {
    setPasswordData(prev => ({ ...prev, [field]: value }));
    if (field === 'newPassword') {
      setPasswordStrength(calculatePasswordStrength(value));
    }
  };

  // johnson: Save new password
  const savePassword = () => {
    // tomiwa: Validate password match
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showToast('Passwords do not match!', 'error');
      return;
    }
    if (passwordStrength < 75) {
      showToast('Password is too weak. Please use a stronger password.', 'error');
      return;
    }
    // tomiwa: Simulate API call
    showToast('Password changed successfully!', 'success');
    setShowPasswordModal(false);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setPasswordStrength(0);
  };

  // johnson: Add team member
  const addTeamMember = () => {
    if (!newMember.fullName || !newMember.email) {
      showToast('Please fill in all required fields', 'error');
      return;
    }
    const newTeamMember = {
      id: teamMembers.length + 1,
      name: newMember.fullName,
      email: newMember.email,
      role: newMember.role,
      status: 'Active',
    };
    setTeamMembers([...teamMembers, newTeamMember]);
    showToast(`Invitation sent successfully to ${newMember.email}`, 'success');
    setShowAddTeamModal(false);
    setNewMember({ fullName: '', email: '', role: 'Recruiter', accessLevel: 'Edit', sendInvite: true });
  };

  // johnson: Suspend user
  const suspendUser = () => {
    setTeamMembers(prev =>
      prev.map(member =>
        member.id === selectedMember.id ? { ...member, status: 'Suspended' } : member
      )
    );
    showToast(`${selectedMember.name} has been suspended`, 'success');
    setShowSuspendModal(false);
    setSelectedMember(null);
  };

  // johnson: Remove user
  const removeUser = () => {
    setTeamMembers(prev => prev.filter(member => member.id !== selectedMember.id));
    showToast(`${selectedMember.name} has been removed`, 'success');
    setShowRemoveModal(false);
    setSelectedMember(null);
  };

  // johnson: Show toast notification
  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000);
  };

  // johnson: Get password strength color
  const getPasswordStrengthColor = () => {
    if (passwordStrength < 50) return 'bg-red-500';
    if (passwordStrength < 75) return 'bg-accent-500';
    return 'bg-emerald-500';
  };

  // johnson: Get password strength text
  const getPasswordStrengthText = () => {
    if (passwordStrength < 50) return 'Weak';
    if (passwordStrength < 75) return 'Medium';
    return 'Strong';
  };

  return (
    <EmployerDashboardLayout>
      <div className="min-h-screen bg-neutral-50">
        {/* tomiwa: Top Gradient Banner - 90° gradient from Aqua to Deep Teal */}
        <div className="bg-gradient-to-r from-brand-aqua to-[#0C5B65] rounded-xl shadow-lg mb-8 p-6">
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-white mb-2">
            Settings
          </h1>
          <p className="text-white/90 text-base sm:text-lg">
            Manage your account preferences, notifications, team roles, and security.
          </p>
        </div>

        {/* tomiwa: Tab Navigation Container - Similar to Subscription Page */}
        <div className="bg-white rounded-xl shadow-lg">
          {/* tomiwa: Tab Navigation Bar */}
          <div className="border-b border-neutral-200">
            {/* johnson: Desktop and tablet navigation */}
            <nav className="hidden sm:flex space-x-2 sm:space-x-4 md:space-x-6 lg:space-x-8 px-4 sm:px-6 md:px-8 overflow-x-auto">
              {[
                { id: 'account', label: 'Account Information', icon: UserCircleIcon },
                { id: 'notifications', label: 'Notifications', icon: BellIcon },
                { id: 'team', label: 'Team Management', icon: UserGroupIcon },
                { id: 'security', label: 'Security', icon: ShieldCheckIcon }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-3 sm:py-4 px-2 sm:px-3 border-b-2 font-medium text-xs sm:text-sm transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-brand-orange text-brand-orange'
                      : 'border-transparent text-neutral-500 hover:text-neutral-700'
                  }`}
                >
                  <tab.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="hidden md:inline">{tab.label}</span>
                  <span className="md:hidden">{tab.label.split(' ')[0]}</span>
                </button>
              ))}
            </nav>

            {/* johnson: Mobile navigation dropdown */}
            <div className="sm:hidden px-4 py-3">
              <select
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value)}
                className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-brand-aqua focus:border-brand-aqua bg-white text-brand-black font-medium"
              >
                {[
                  { id: 'account', label: 'Account Information' },
                  { id: 'notifications', label: 'Notification Preferences' },
                  { id: 'team', label: 'Team Management' },
                  { id: 'security', label: 'Security & Account Controls' }
                ].map((tab) => (
                  <option key={tab.id} value={tab.id}>
                    {tab.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* tomiwa: Tab Content Area */}
          <div className="p-4 sm:p-6 md:p-8">
            
            {/* ========================================
                TAB 1: ACCOUNT INFORMATION
            ======================================== */}
            {activeTab === 'account' && (
              <div className="space-y-6">
                {/* tomiwa: Section Header */}
                <div>
                  <h2 className="text-2xl font-display font-bold text-brand-black mb-2">
                    Account Information
                  </h2>
                  <p className="text-neutral-600 text-sm">
                    Update your company and contact details
                  </p>
                </div>

                {/* tomiwa: Company Name Field */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-neutral-700">
                    <BuildingOfficeIcon className="w-4 h-4 text-brand-aqua" />
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={accountData.companyName}
                    onChange={(e) => handleAccountChange('companyName', e.target.value)}
                    disabled={!isEditingAccount}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      isEditingAccount
                        ? 'border-brand-aqua bg-white'
                        : 'border-neutral-200 bg-neutral-50'
                    } focus:outline-none focus:ring-2 focus:ring-brand-aqua transition-all`}
                  />
                </div>

                {/* tomiwa: Employer Name Field */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-neutral-700">
                    <UserCircleIcon className="w-4 h-4 text-brand-aqua" />
                    Employer Name
                  </label>
                  <input
                    type="text"
                    value={accountData.employerName}
                    onChange={(e) => handleAccountChange('employerName', e.target.value)}
                    disabled={!isEditingAccount}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      isEditingAccount
                        ? 'border-brand-aqua bg-white'
                        : 'border-neutral-200 bg-neutral-50'
                    } focus:outline-none focus:ring-2 focus:ring-brand-aqua transition-all`}
                  />
                </div>

                {/* tomiwa: Email Field */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-neutral-700">
                    <EnvelopeIcon className="w-4 h-4 text-brand-aqua" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={accountData.email}
                    onChange={(e) => handleAccountChange('email', e.target.value)}
                    disabled={!isEditingAccount}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      isEditingAccount
                        ? 'border-brand-aqua bg-white'
                        : 'border-neutral-200 bg-neutral-50'
                    } focus:outline-none focus:ring-2 focus:ring-brand-aqua transition-all`}
                  />
                </div>

                {/* tomiwa: Phone Number Field */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-neutral-700">
                    <PhoneIcon className="w-4 h-4 text-brand-aqua" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={accountData.phone}
                    onChange={(e) => handleAccountChange('phone', e.target.value)}
                    disabled={!isEditingAccount}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      isEditingAccount
                        ? 'border-brand-aqua bg-white'
                        : 'border-neutral-200 bg-neutral-50'
                    } focus:outline-none focus:ring-2 focus:ring-brand-aqua transition-all`}
                  />
                </div>

                {/* tomiwa: Company Address Field */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-neutral-700">
                    <MapPinIcon className="w-4 h-4 text-brand-aqua" />
                    Company Address
                  </label>
                  <input
                    type="text"
                    value={accountData.address}
                    onChange={(e) => handleAccountChange('address', e.target.value)}
                    disabled={!isEditingAccount}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      isEditingAccount
                        ? 'border-brand-aqua bg-white'
                        : 'border-neutral-200 bg-neutral-50'
                    } focus:outline-none focus:ring-2 focus:ring-brand-aqua transition-all`}
                  />
                </div>

                {/* tomiwa: Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  {!isEditingAccount ? (
                    <>
                      <button
                        onClick={() => setIsEditingAccount(true)}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-brand-aqua text-white rounded-xl font-medium hover:bg-primary-600 transition-all shadow-md hover:shadow-lg"
                      >
                        <PencilIcon className="w-4 h-4" />
                        Edit Details
                      </button>
                      <button
                        onClick={() => setShowPasswordModal(true)}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-brand-orange text-white rounded-xl font-medium hover:bg-secondary-600 transition-all shadow-md hover:shadow-lg"
                      >
                        <KeyIcon className="w-4 h-4" />
                        Change Password
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={saveAccountChanges}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-brand-orange text-white rounded-xl font-medium hover:bg-secondary-600 transition-all shadow-md hover:shadow-lg"
                      >
                        <CheckCircleIcon className="w-4 h-4" />
                        Save Changes
                      </button>
                      <button
                        onClick={() => setIsEditingAccount(false)}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-neutral-300 text-neutral-700 rounded-xl font-medium hover:bg-neutral-400 transition-all"
                      >
                        <XMarkIcon className="w-4 h-4" />
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* ========================================
                TAB 2: NOTIFICATION PREFERENCES
            ======================================== */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                {/* tomiwa: Section Header */}
                <div>
                  <h2 className="text-2xl font-display font-bold text-brand-black mb-2">
                    Notification Preferences
                  </h2>
                  <p className="text-neutral-600 text-sm">
                    Choose how you want to be notified about important updates
                  </p>
                </div>

                {/* tomiwa: Recruitment Notifications Group */}
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-neutral-700 uppercase tracking-wide">
                    Recruitment Notifications
                  </h3>
                  
                  {/* johnson: New Applications Toggle */}
                  <div className="flex items-center justify-between p-4 rounded-xl bg-neutral-50 hover:bg-neutral-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <EnvelopeIcon className="w-5 h-5 text-brand-aqua" />
                      <div>
                        <p className="font-medium text-neutral-800">New Applications</p>
                        <p className="text-sm text-neutral-600">Get notified when candidates apply to your jobs</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleNotificationToggle('newApplications')}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        notifications.newApplications ? 'bg-brand-aqua' : 'bg-neutral-300'
                      }`}
                    >
                      <span
                        className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          notifications.newApplications ? 'translate-x-7' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  {/* johnson: Shortlist Updates Toggle */}
                  <div className="flex items-center justify-between p-4 rounded-xl bg-neutral-50 hover:bg-neutral-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-brand-aqua" />
                      <div>
                        <p className="font-medium text-neutral-800">Shortlist Updates</p>
                        <p className="text-sm text-neutral-600">Updates when candidates are shortlisted or moved</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleNotificationToggle('shortlistUpdates')}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        notifications.shortlistUpdates ? 'bg-brand-aqua' : 'bg-neutral-300'
                      }`}
                    >
                      <span
                        className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          notifications.shortlistUpdates ? 'translate-x-7' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  {/* johnson: Interview Reminders Toggle */}
                  <div className="flex items-center justify-between p-4 rounded-xl bg-neutral-50 hover:bg-neutral-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <BellIcon className="w-5 h-5 text-brand-aqua" />
                      <div>
                        <p className="font-medium text-neutral-800">Interview Reminders</p>
                        <p className="text-sm text-neutral-600">Reminders before scheduled interviews</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleNotificationToggle('interviewReminders')}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        notifications.interviewReminders ? 'bg-brand-aqua' : 'bg-neutral-300'
                      }`}
                    >
                      <span
                        className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          notifications.interviewReminders ? 'translate-x-7' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* tomiwa: Billing Notifications Group */}
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-neutral-700 uppercase tracking-wide">
                    Billing Notifications
                  </h3>
                  
                  {/* johnson: Payment Confirmations Toggle */}
                  <div className="flex items-center justify-between p-4 rounded-xl bg-neutral-50 hover:bg-neutral-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-emerald-500" />
                      <div>
                        <p className="font-medium text-neutral-800">Payment Confirmations</p>
                        <p className="text-sm text-neutral-600">Receipts and payment confirmations</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleNotificationToggle('paymentConfirmations')}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        notifications.paymentConfirmations ? 'bg-brand-aqua' : 'bg-neutral-300'
                      }`}
                    >
                      <span
                        className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          notifications.paymentConfirmations ? 'translate-x-7' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  {/* johnson: Subscription Expiry Toggle */}
                  <div className="flex items-center justify-between p-4 rounded-xl bg-neutral-50 hover:bg-neutral-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <ExclamationTriangleIcon className="w-5 h-5 text-brand-yellow" />
                      <div>
                        <p className="font-medium text-neutral-800">Subscription Expiry Alerts</p>
                        <p className="text-sm text-neutral-600">Alerts before your subscription expires</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleNotificationToggle('subscriptionExpiry')}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        notifications.subscriptionExpiry ? 'bg-brand-aqua' : 'bg-neutral-300'
                      }`}
                    >
                      <span
                        className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          notifications.subscriptionExpiry ? 'translate-x-7' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* tomiwa: System Announcements Group */}
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-neutral-700 uppercase tracking-wide">
                    System Announcements
                  </h3>
                  
                  {/* johnson: Platform Updates Toggle */}
                  <div className="flex items-center justify-between p-4 rounded-xl bg-neutral-50 hover:bg-neutral-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <InformationCircleIcon className="w-5 h-5 text-brand-orange" />
                      <div>
                        <p className="font-medium text-neutral-800">Platform Updates</p>
                        <p className="text-sm text-neutral-600">Important platform maintenance and updates</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleNotificationToggle('platformUpdates')}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        notifications.platformUpdates ? 'bg-brand-aqua' : 'bg-neutral-300'
                      }`}
                    >
                      <span
                        className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          notifications.platformUpdates ? 'translate-x-7' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  {/* johnson: New Feature Alerts Toggle */}
                  <div className="flex items-center justify-between p-4 rounded-xl bg-neutral-50 hover:bg-neutral-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-brand-orange" />
                      <div>
                        <p className="font-medium text-neutral-800">New Feature Alerts</p>
                        <p className="text-sm text-neutral-600">Get notified about new features and tools</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleNotificationToggle('newFeatures')}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        notifications.newFeatures ? 'bg-brand-aqua' : 'bg-neutral-300'
                      }`}
                    >
                      <span
                        className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          notifications.newFeatures ? 'translate-x-7' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* tomiwa: SMS Alerts Group */}
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-neutral-700 uppercase tracking-wide">
                    SMS Alerts (Optional)
                  </h3>
                  
                  {/* johnson: SMS Alerts Toggle */}
                  <div className="flex items-center justify-between p-4 rounded-xl bg-neutral-50 hover:bg-neutral-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <DevicePhoneMobileIcon className="w-5 h-5 text-brand-aqua" />
                      <div>
                        <p className="font-medium text-neutral-800">SMS Notifications</p>
                        <p className="text-sm text-neutral-600">Receive urgent updates via SMS</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleNotificationToggle('smsAlerts')}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        notifications.smsAlerts ? 'bg-brand-aqua' : 'bg-neutral-300'
                      }`}
                    >
                      <span
                        className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          notifications.smsAlerts ? 'translate-x-7' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* tomiwa: Save Button */}
                <button
                  onClick={saveNotificationPreferences}
                  className="w-full sm:w-auto px-8 py-3 bg-brand-orange text-white rounded-xl font-medium hover:bg-secondary-600 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <CheckCircleIcon className="w-5 h-5" />
                  Save Preferences
                </button>
              </div>
            )}

            {/* ========================================
                TAB 3: ORGANIZATION & TEAM MANAGEMENT
            ======================================== */}
            {activeTab === 'team' && (
              <div className="space-y-6">
                {/* tomiwa: Section Header with Add Button */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h2 className="text-2xl font-display font-bold text-brand-black mb-2">
                      Team Management
                    </h2>
                    <p className="text-neutral-600 text-sm">
                      Manage team members, roles, and access permissions
                    </p>
                  </div>
                  <button
                    onClick={() => setShowAddTeamModal(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-brand-orange text-white rounded-xl font-medium hover:bg-secondary-600 transition-all shadow-md hover:shadow-lg"
                  >
                    <PlusIcon className="w-5 h-5" />
                    Add Team Member
                  </button>
                </div>

                {/* tomiwa: Team Members Table - Desktop View */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-neutral-100 border-b border-neutral-200">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-neutral-700">Name</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-neutral-700">Email</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-neutral-700">Role</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-neutral-700">Status</th>
                        <th className="px-4 py-3 text-right text-sm font-semibold text-neutral-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200">
                      {teamMembers.map((member) => (
                        <tr key={member.id} className="hover:bg-neutral-50 transition-colors">
                          <td className="px-4 py-4 text-sm font-medium text-neutral-800">{member.name}</td>
                          <td className="px-4 py-4 text-sm text-neutral-600">{member.email}</td>
                          <td className="px-4 py-4">
                            <select
                              value={member.role}
                              onChange={(e) => {
                                setTeamMembers(prev =>
                                  prev.map(m =>
                                    m.id === member.id ? { ...m, role: e.target.value } : m
                                  )
                                );
                                showToast(`Role updated to ${e.target.value}`, 'success');
                              }}
                              className="px-3 py-1.5 bg-neutral-100 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-aqua"
                            >
                              <option value="Admin">Admin</option>
                              <option value="Recruiter">Recruiter</option>
                              <option value="HR Assistant">HR Assistant</option>
                            </select>
                          </td>
                          <td className="px-4 py-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                member.status === 'Active'
                                  ? 'bg-emerald-100 text-emerald-700'
                                  : 'bg-red-100 text-red-700'
                              }`}
                            >
                              {member.status}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => {
                                  setSelectedMember(member);
                                  setShowSuspendModal(true);
                                }}
                                className="p-2 text-brand-yellow hover:bg-accent-50 rounded-lg transition-colors"
                                title="Suspend User"
                              >
                                <ExclamationTriangleIcon className="w-5 h-5" />
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedMember(member);
                                  setShowRemoveModal(true);
                                }}
                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                title="Remove User"
                              >
                                <TrashIcon className="w-5 h-5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* tomiwa: Team Members Cards - Mobile View */}
                <div className="md:hidden space-y-4">
                  {teamMembers.map((member) => (
                    <div key={member.id} className="p-4 bg-neutral-50 rounded-xl space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium text-neutral-800">{member.name}</h3>
                          <p className="text-sm text-neutral-600">{member.email}</p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            member.status === 'Active'
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {member.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <select
                          value={member.role}
                          onChange={(e) => {
                            setTeamMembers(prev =>
                              prev.map(m =>
                                m.id === member.id ? { ...m, role: e.target.value } : m
                              )
                            );
                            showToast(`Role updated to ${e.target.value}`, 'success');
                          }}
                          className="px-3 py-1.5 bg-white border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-aqua"
                        >
                          <option value="Admin">Admin</option>
                          <option value="Recruiter">Recruiter</option>
                          <option value="HR Assistant">HR Assistant</option>
                        </select>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setSelectedMember(member);
                              setShowSuspendModal(true);
                            }}
                            className="p-2 text-brand-yellow hover:bg-accent-50 rounded-lg transition-colors"
                          >
                            <ExclamationTriangleIcon className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedMember(member);
                              setShowRemoveModal(true);
                            }}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <TrashIcon className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ========================================
                TAB 4: SECURITY & ACCOUNT CONTROLS
            ======================================== */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                {/* tomiwa: Section Header */}
                <div>
                  <h2 className="text-2xl font-display font-bold text-brand-black mb-2">
                    Security & Account Controls
                  </h2>
                  <p className="text-neutral-600 text-sm">
                    Manage your security settings and account preferences
                  </p>
                </div>

                {/* tomiwa: Two-Factor Authentication */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-neutral-700 uppercase tracking-wide">
                    Two-Factor Authentication (2FA)
                  </h3>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-neutral-50">
                    <div className="flex items-center gap-3">
                      <ShieldCheckIcon className="w-5 h-5 text-brand-aqua" />
                      <div>
                        <p className="font-medium text-neutral-800">Enable Two-Factor Authentication</p>
                        <p className="text-sm text-neutral-600">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <button
                        className="p-1 text-neutral-500 hover:text-brand-aqua transition-colors"
                        title="2FA can be set up via SMS or authenticator app"
                      >
                        <InformationCircleIcon className="w-5 h-5" />
                      </button>
                    </div>
                    <button
                      onClick={() => {
                        setTwoFactorEnabled(!twoFactorEnabled);
                        showToast(
                          twoFactorEnabled ? '2FA disabled' : '2FA enabled successfully',
                          'success'
                        );
                      }}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        twoFactorEnabled ? 'bg-brand-aqua' : 'bg-neutral-300'
                      }`}
                    >
                      <span
                        className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          twoFactorEnabled ? 'translate-x-7' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* tomiwa: Session Management */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-neutral-700 uppercase tracking-wide">
                    Session Management
                  </h3>
                  <div className="space-y-3">
                    <div className="p-4 rounded-xl bg-neutral-50 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <ComputerDesktopIcon className="w-5 h-5 text-brand-aqua" />
                        <div>
                          <p className="font-medium text-neutral-800">MacBook Pro - San Francisco, CA</p>
                          <p className="text-sm text-neutral-600">Last active: 2 minutes ago</p>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">
                        Current
                      </span>
                    </div>
                    <div className="p-4 rounded-xl bg-neutral-50 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <DevicePhoneMobileIcon className="w-5 h-5 text-brand-aqua" />
                        <div>
                          <p className="font-medium text-neutral-800">iPhone 14 - San Francisco, CA</p>
                          <p className="text-sm text-neutral-600">Last active: 1 hour ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => showToast('All other devices logged out', 'success')}
                    className="flex items-center gap-2 px-6 py-3 bg-brand-aqua text-white rounded-xl font-medium hover:bg-primary-600 transition-all shadow-md hover:shadow-lg"
                  >
                    <ArrowRightOnRectangleIcon className="w-5 h-5" />
                    Log Out All Devices
                  </button>
                </div>

                {/* tomiwa: Danger Zone */}
                <div className="space-y-4 pt-4 border-t-2 border-red-200">
                  <h3 className="text-sm font-semibold text-red-600 uppercase tracking-wide flex items-center gap-2">
                    <ExclamationTriangleIcon className="w-5 h-5" />
                    Danger Zone
                  </h3>
                  <div className="p-5 border-2 border-red-200 rounded-xl bg-red-50/50 space-y-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <p className="font-medium text-neutral-800">Deactivate Account</p>
                        <p className="text-sm text-neutral-600">
                          Temporarily disable your account. You can reactivate it later.
                        </p>
                      </div>
                      <button
                        onClick={() => setShowDeactivateModal(true)}
                        className="px-6 py-2.5 bg-white border-2 border-red-400 text-red-600 rounded-xl font-medium hover:bg-red-50 transition-all whitespace-nowrap"
                      >
                        Deactivate
                      </button>
                    </div>
                    <div className="h-px bg-red-200" />
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <p className="font-medium text-red-700">Delete Account Permanently</p>
                        <p className="text-sm text-neutral-600">
                          This action cannot be undone. All your data will be permanently deleted.
                        </p>
                      </div>
                      <button
                        onClick={() => setShowDeleteModal(true)}
                        className="px-6 py-2.5 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-all shadow-md hover:shadow-lg whitespace-nowrap"
                      >
                        Delete Forever
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* ========================================
            MODALS
        ======================================== */}

        {/* tomiwa: Change Password Modal */}
        {showPasswordModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-display font-bold text-brand-black">Change Password</h3>
                <button
                  onClick={() => {
                    setShowPasswordModal(false);
                    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                    setPasswordStrength(0);
                  }}
                  className="p-1 hover:bg-neutral-100 rounded-lg transition-colors"
                >
                  <XMarkIcon className="w-6 h-6 text-neutral-500" />
                </button>
              </div>

              {/* johnson: Current Password */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700">Current Password</label>
                <input
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-aqua"
                  placeholder="Enter current password"
                />
              </div>

              {/* johnson: New Password */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700">New Password</label>
                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-aqua"
                  placeholder="Enter new password"
                />
                {/* tomiwa: Password Strength Meter */}
                {passwordData.newPassword && (
                  <div className="space-y-1">
                    <div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${getPasswordStrengthColor()} transition-all duration-300`}
                        style={{ width: `${passwordStrength}%` }}
                      />
                    </div>
                    <p className="text-xs text-neutral-600">
                      Password strength: <span className="font-medium">{getPasswordStrengthText()}</span>
                    </p>
                  </div>
                )}
              </div>

              {/* johnson: Confirm Password */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700">Confirm New Password</label>
                <input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-aqua"
                  placeholder="Confirm new password"
                />
                {/* tomiwa: Password Match Indicator */}
                {passwordData.confirmPassword && (
                  <p
                    className={`text-xs ${
                      passwordData.newPassword === passwordData.confirmPassword
                        ? 'text-emerald-600'
                        : 'text-red-600'
                    }`}
                  >
                    {passwordData.newPassword === passwordData.confirmPassword
                      ? '✓ Passwords match'
                      : '✗ Passwords do not match'}
                  </p>
                )}
              </div>

              {/* johnson: Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={savePassword}
                  className="flex-1 px-6 py-3 bg-brand-orange text-white rounded-xl font-medium hover:bg-secondary-600 transition-all shadow-md hover:shadow-lg"
                >
                  Save Password
                </button>
                <button
                  onClick={() => {
                    setShowPasswordModal(false);
                    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                    setPasswordStrength(0);
                  }}
                  className="flex-1 px-6 py-3 bg-neutral-300 text-neutral-700 rounded-xl font-medium hover:bg-neutral-400 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* tomiwa: Add Team Member Modal */}
        {showAddTeamModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-display font-bold text-brand-black">Add Team Member</h3>
                <button
                  onClick={() => {
                    setShowAddTeamModal(false);
                    setNewMember({ fullName: '', email: '', role: 'Recruiter', accessLevel: 'Edit', sendInvite: true });
                  }}
                  className="p-1 hover:bg-neutral-100 rounded-lg transition-colors"
                >
                  <XMarkIcon className="w-6 h-6 text-neutral-500" />
                </button>
              </div>

              {/* johnson: Full Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700">Full Name *</label>
                <input
                  type="text"
                  value={newMember.fullName}
                  onChange={(e) => setNewMember({ ...newMember, fullName: e.target.value })}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-aqua"
                  placeholder="Enter full name"
                />
              </div>

              {/* johnson: Email Address */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700">Email Address *</label>
                <input
                  type="email"
                  value={newMember.email}
                  onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-aqua"
                  placeholder="Enter email address"
                />
              </div>

              {/* johnson: Assign Role */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700">Assign Role</label>
                <select
                  value={newMember.role}
                  onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-aqua"
                >
                  <option value="Admin">Admin</option>
                  <option value="Recruiter">Recruiter</option>
                  <option value="HR Assistant">HR Assistant</option>
                </select>
              </div>

              {/* johnson: Access Level */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700">Access Level</label>
                <select
                  value={newMember.accessLevel}
                  onChange={(e) => setNewMember({ ...newMember, accessLevel: e.target.value })}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-aqua"
                >
                  <option value="View Only">View Only</option>
                  <option value="Edit">Edit</option>
                  <option value="Full">Full</option>
                </select>
              </div>

              {/* johnson: Send Invitation Email Checkbox */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="sendInvite"
                  checked={newMember.sendInvite}
                  onChange={(e) => setNewMember({ ...newMember, sendInvite: e.target.checked })}
                  className="w-5 h-5 text-brand-aqua border-neutral-300 rounded focus:ring-2 focus:ring-brand-aqua"
                />
                <label htmlFor="sendInvite" className="text-sm text-neutral-700">
                  Send invitation email to this user
                </label>
              </div>

              {/* johnson: Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={addTeamMember}
                  className="flex-1 px-6 py-3 bg-brand-orange text-white rounded-xl font-medium hover:bg-secondary-600 transition-all shadow-md hover:shadow-lg"
                >
                  Invite User
                </button>
                <button
                  onClick={() => {
                    setShowAddTeamModal(false);
                    setNewMember({ fullName: '', email: '', role: 'Recruiter', accessLevel: 'Edit', sendInvite: true });
                  }}
                  className="flex-1 px-6 py-3 bg-neutral-300 text-neutral-700 rounded-xl font-medium hover:bg-neutral-400 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* tomiwa: Suspend User Modal */}
        {showSuspendModal && selectedMember && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 space-y-4">
              <div className="flex items-center gap-3">
                <ExclamationTriangleIcon className="w-8 h-8 text-brand-yellow" />
                <h3 className="text-2xl font-display font-bold text-brand-black">Suspend User</h3>
              </div>
              <p className="text-neutral-600">
                Are you sure you want to suspend <strong>{selectedMember.name}</strong>? They will not be able to access the system.
              </p>
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700">Reason for Suspension</label>
                <textarea
                  className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-aqua resize-none"
                  rows="3"
                  placeholder="Enter reason..."
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={suspendUser}
                  className="flex-1 px-6 py-3 bg-brand-yellow text-white rounded-xl font-medium hover:bg-accent-600 transition-all shadow-md hover:shadow-lg"
                >
                  Confirm Suspension
                </button>
                <button
                  onClick={() => {
                    setShowSuspendModal(false);
                    setSelectedMember(null);
                  }}
                  className="flex-1 px-6 py-3 bg-neutral-300 text-neutral-700 rounded-xl font-medium hover:bg-neutral-400 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* tomiwa: Remove User Modal */}
        {showRemoveModal && selectedMember && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 space-y-4">
              <div className="flex items-center gap-3">
                <TrashIcon className="w-8 h-8 text-red-600" />
                <h3 className="text-2xl font-display font-bold text-brand-black">Remove User</h3>
              </div>
              <p className="text-neutral-600">
                Are you sure you want to remove <strong>{selectedMember.name}</strong> from your team? This action cannot be undone.
              </p>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={removeUser}
                  className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-all shadow-md hover:shadow-lg"
                >
                  Remove User
                </button>
                <button
                  onClick={() => {
                    setShowRemoveModal(false);
                    setSelectedMember(null);
                  }}
                  className="flex-1 px-6 py-3 bg-neutral-300 text-neutral-700 rounded-xl font-medium hover:bg-neutral-400 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* tomiwa: Deactivate Account Modal */}
        {showDeactivateModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 space-y-4">
              <div className="flex items-center gap-3">
                <ExclamationTriangleIcon className="w-8 h-8 text-brand-yellow" />
                <h3 className="text-2xl font-display font-bold text-brand-black">Deactivate Account</h3>
              </div>
              <p className="text-neutral-600">
                Your account will be temporarily disabled. You can reactivate it anytime by contacting support.
              </p>
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700">Reason for Deactivation</label>
                <textarea
                  className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-aqua resize-none"
                  rows="3"
                  placeholder="Tell us why (optional)..."
                />
              </div>
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                <p className="text-sm text-amber-800">
                  <strong>Note:</strong> You can reactivate your account at any time by contacting our support team.
                </p>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => {
                    showToast('Account deactivated successfully', 'success');
                    setShowDeactivateModal(false);
                  }}
                  className="flex-1 px-6 py-3 bg-brand-yellow text-white rounded-xl font-medium hover:bg-accent-600 transition-all shadow-md hover:shadow-lg"
                >
                  Deactivate
                </button>
                <button
                  onClick={() => setShowDeactivateModal(false)}
                  className="flex-1 px-6 py-3 bg-neutral-300 text-neutral-700 rounded-xl font-medium hover:bg-neutral-400 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* tomiwa: Delete Account Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 space-y-4">
              <div className="flex items-center gap-3">
                <TrashIcon className="w-8 h-8 text-red-600" />
                <h3 className="text-2xl font-display font-bold text-brand-black">Delete Account</h3>
              </div>
              <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl">
                <p className="text-sm text-red-800 font-medium">
                  <strong>⚠️ Warning:</strong> This action cannot be undone. All your data, including job posts, applications, and team information will be permanently deleted.
                </p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700">
                  Enter your password to confirm deletion
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Enter password"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => {
                    showToast('Account deletion initiated. You will receive a confirmation email.', 'error');
                    setShowDeleteModal(false);
                  }}
                  className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-all shadow-md hover:shadow-lg"
                >
                  Delete Forever
                </button>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-6 py-3 bg-neutral-300 text-neutral-700 rounded-xl font-medium hover:bg-neutral-400 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* tomiwa: Toast Notification */}
        {toast.show && (
          <div className="fixed bottom-8 right-8 z-50 animate-slide-up">
            <div
              className={`flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl ${
                toast.type === 'success'
                  ? 'bg-emerald-500 text-white'
                  : toast.type === 'error'
                  ? 'bg-red-500 text-white'
                  : 'bg-brand-aqua text-white'
              }`}
            >
              {toast.type === 'success' && <CheckCircleIcon className="w-6 h-6" />}
              {toast.type === 'error' && <ExclamationTriangleIcon className="w-6 h-6" />}
              {toast.type === 'warning' && <InformationCircleIcon className="w-6 h-6" />}
              <p className="font-medium">{toast.message}</p>
            </div>
          </div>
        )}
      </div>
    </EmployerDashboardLayout>
  );
}

