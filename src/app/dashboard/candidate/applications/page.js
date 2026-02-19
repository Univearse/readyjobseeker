/**
 * File: src/app/dashboard/candidate/applications/page.js
 * 
 * tomiwa: ENHANCED - Job Applications Page with Expandable Table
 * Enhanced applications page with progress tracking, expandable rows, and quick actions
 * 
 * Features:
 * - Enhanced table with expandable rows showing detailed timeline
 * - Progress bars and status pills for visual feedback
 * - Next action buttons that adapt based on application stage
 * - Filters for all stages including Tests Assigned and Interviews
 * - Mobile responsive with bottom sheet details
 * - Deep linking support for filters and expanded rows
 * - Toast notifications and confirmation modals
 */

'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import CandidateDashboardLayout from '@/components/layouts/CandidateDashboardLayout.jsx';
import ApplicationsTable from '@/components/ui/ApplicationsTable';
import ConfirmModal from '@/components/ui/ConfirmModal';
import Toast from '@/components/ui/Toast';
import {
  // tomiwa: Icon imports for enhanced applications page
  DocumentTextIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowsUpDownIcon,
  EyeIcon,
  XMarkIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  ArrowDownTrayIcon,
  CalendarIcon,
  BuildingOfficeIcon,
  MapPinIcon,
  ClockIcon,
  Bars3Icon,
  Squares2X2Icon,
  // tomiwa: NEW - AI Assistant icons
  SparklesIcon,
  LightBulbIcon,
  ClipboardDocumentListIcon,
  EllipsisVerticalIcon,
  AcademicCapIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/24/outline';

// tomiwa: Enhanced mock applications data with feedback system
const allApplications = [
  {
    id: 1,
    jobTitle: 'Product Designer',
    company: 'Figma',
    companyLogo: 'https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=100&h=100&fit=crop',
    status: 'Failed Assessment',
    dateApplied: '2024-10-25',
    location: 'Remote',
    salary: '$100k - $150k',
    jobType: 'Full-time',
    feedback: {
      type: 'assessment_failed',
      score: 68,
      passingScore: 75,
      maxScore: 100,
      areas: ['React Hooks & Context', 'System Design', 'Component Architecture'],
      strengths: ['UI/UX Design', 'CSS/Styling', 'Problem Solving'],
      retakeAllowed: true,
      retakeDate: '2024-11-15',
      message: 'Great design skills! You scored well on UI/UX concepts. Focus on React fundamentals and system design patterns for the retake.',
      assessmentDate: '2024-10-28',
      timeSpent: '2 hours 15 minutes'
    }
  },
  {
    id: 2,
    jobTitle: 'Product Designer',
    company: 'Paystack',
    companyLogo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop',
    status: 'Interview Scheduled',
    dateApplied: '2024-10-22',
    location: 'Lagos, Nigeria',
    salary: '$80k - $120k',
    jobType: 'Full-time',
  },
  {
    id: 3,
    jobTitle: 'Senior UX Designer',
    company: 'Flutterwave',
    companyLogo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=100&h=100&fit=crop',
    status: 'Offer',
    dateApplied: '2024-10-20',
    location: 'Remote',
    salary: '$90k - $140k',
    jobType: 'Full-time',
  },
  {
    id: 4,
    jobTitle: 'Product Designer',
    company: 'Interswitch',
    companyLogo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&h=100&fit=crop',
    status: 'Disqualified',
    dateApplied: '2024-10-18',
    location: 'Hybrid',
    salary: '$70k - $110k',
    jobType: 'Full-time',
    feedback: {
      type: 'disqualified',
      reason: 'Experience Requirements',
      message: 'Thank you for your interest. We require 5+ years of senior-level product design experience with fintech products. Your portfolio shows great potential - consider applying for our mid-level positions.',
      date: '2024-10-20',
      disqualificationStage: 'Initial Review',
      suggestions: [
        'Apply for Mid-Level Product Designer role',
        'Gain more fintech experience',
        'Build portfolio with payment/banking projects'
      ]
    }
  },
  {
    id: 5,
    jobTitle: 'UX Designer',
    company: 'Andela',
    companyLogo: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=100&h=100&fit=crop',
    status: 'Rejected',
    dateApplied: '2024-10-15',
    location: 'Remote',
    salary: '$85k - $125k',
    jobType: 'Full-time',
  },
  {
    id: 6,
    jobTitle: 'Lead Product Designer',
    company: 'Kuda Bank',
    companyLogo: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=100&h=100&fit=crop',
    status: 'Test Assigned',
    dateApplied: '2024-10-12',
    location: 'Lagos, Nigeria',
    salary: '$60k - $95k',
    jobType: 'Full-time',
  },
  {
    id: 7,
    jobTitle: 'UI/UX Designer',
    company: 'Stripe',
    companyLogo: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&h=100&fit=crop',
    status: 'Applied',
    dateApplied: '2024-10-10',
    location: 'Remote',
    salary: '$120k - $180k',
    jobType: 'Full-time',
  },
  {
    id: 8,
    jobTitle: 'Product Designer',
    company: 'Shopify',
    companyLogo: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=100&h=100&fit=crop',
    status: 'Withdrawn',
    dateApplied: '2024-10-08',
    location: 'Remote',
    salary: '$110k - $160k',
    jobType: 'Full-time',
  },
  {
    id: 9,
    jobTitle: 'Senior Product Designer',
    company: 'Meta',
    companyLogo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop',
    status: 'Interview Scheduled',
    dateApplied: '2024-10-05',
    location: 'Menlo Park, CA',
    salary: '$150k - $200k',
    jobType: 'Full-time',
  },
  {
    id: 10,
    jobTitle: 'UX Researcher',
    company: 'Google',
    companyLogo: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=100&h=100&fit=crop',
    status: 'Under Review',
    dateApplied: '2024-10-03',
    location: 'Mountain View, CA',
    salary: '$130k - $180k',
    jobType: 'Full-time',
  },
  {
    id: 11,
    jobTitle: 'Frontend Developer',
    company: 'Airbnb',
    companyLogo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop',
    status: 'Failed Assessment',
    dateApplied: '2024-09-28',
    location: 'San Francisco, CA',
    salary: '$140k - $180k',
    jobType: 'Full-time',
    feedback: {
      type: 'assessment_failed',
      score: 45,
      passingScore: 70,
      maxScore: 100,
      areas: ['Algorithm Complexity', 'Data Structures', 'React Performance'],
      strengths: ['Code Quality', 'Problem Approach', 'Communication'],
      retakeAllowed: false,
      message: 'Your code quality and problem-solving approach were excellent. The main areas for improvement are algorithmic thinking and React optimization techniques.',
      assessmentDate: '2024-10-01',
      timeSpent: '3 hours 30 minutes'
    }
  },
];

// tomiwa: Enhanced filter options with feedback statuses
const statusFilters = [
  { value: 'all', label: 'All', count: allApplications.length },
  { value: 'active', label: 'Active', count: allApplications.filter(app => 
    !['Rejected', 'Withdrawn', 'Closed', 'Failed Assessment', 'Disqualified'].includes(app.status)).length },
  { value: 'under_review', label: 'Under Review', count: allApplications.filter(app => 
    app.status === 'Under Review').length },
  { value: 'tests_assigned', label: 'Tests Assigned', count: allApplications.filter(app => 
    app.status === 'Test Assigned').length },
  { value: 'interviews', label: 'Interviews', count: allApplications.filter(app => 
    app.status === 'Interview Scheduled').length },
  { value: 'offers', label: 'Offers', count: allApplications.filter(app => 
    app.status === 'Offer').length },
  { value: 'failed_assessments', label: 'Failed Tests', count: allApplications.filter(app => 
    app.status === 'Failed Assessment').length },
  { value: 'disqualified', label: 'Disqualified', count: allApplications.filter(app => 
    app.status === 'Disqualified').length },
  { value: 'closed', label: 'Closed', count: allApplications.filter(app => 
    ['Rejected', 'Withdrawn', 'Closed'].includes(app.status)).length },
];

export default function JobApplications() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // tomiwa: Enhanced state management with URL sync
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState(searchParams.get('tab') || 'all');
  const [sortBy, setSortBy] = useState('dateApplied');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedApplications, setSelectedApplications] = useState([]);
  const [viewMode, setViewMode] = useState('table');
  const [expandedRow, setExpandedRow] = useState(searchParams.get('appId') || null);
  
  // tomiwa: Modal and notification state
  const [confirmModal, setConfirmModal] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // tomiwa: NEW - AI Assistant state
  const [showAiAssistant, setShowAiAssistant] = useState(false);

  // tomiwa: Sync URL with filters
  useEffect(() => {
    const params = new URLSearchParams();
    if (statusFilter !== 'all') params.set('tab', statusFilter);
    if (expandedRow) params.set('appId', expandedRow);
    
    const newUrl = params.toString() ? `?${params.toString()}` : '';
    router.replace(`/dashboard/candidate/applications${newUrl}`, { scroll: false });
  }, [statusFilter, expandedRow, router]);

  // tomiwa: Enhanced filter and sort applications
  const filteredAndSortedApplications = useMemo(() => {
    let filtered = allApplications;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(app => 
        app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.company.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply enhanced status filter with feedback statuses
    if (statusFilter !== 'all') {
      switch (statusFilter) {
        case 'active':
          filtered = filtered.filter(app => 
            !['Rejected', 'Withdrawn', 'Closed', 'Failed Assessment', 'Disqualified'].includes(app.status));
          break;
        case 'under_review':
          filtered = filtered.filter(app => app.status === 'Under Review');
          break;
        case 'tests_assigned':
          filtered = filtered.filter(app => app.status === 'Test Assigned');
          break;
        case 'interviews':
          filtered = filtered.filter(app => app.status === 'Interview Scheduled');
          break;
        case 'offers':
          filtered = filtered.filter(app => app.status === 'Offer');
          break;
        case 'failed_assessments':
          filtered = filtered.filter(app => app.status === 'Failed Assessment');
          break;
        case 'disqualified':
          filtered = filtered.filter(app => app.status === 'Disqualified');
          break;
        case 'closed':
          filtered = filtered.filter(app => 
            ['Rejected', 'Withdrawn', 'Closed'].includes(app.status));
          break;
        default:
          break;
      }
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'dateApplied':
          aValue = new Date(a.dateApplied);
          bValue = new Date(b.dateApplied);
          break;
        case 'company':
          aValue = a.company.toLowerCase();
          bValue = b.company.toLowerCase();
          break;
        case 'jobTitle':
          aValue = a.jobTitle.toLowerCase();
          bValue = b.jobTitle.toLowerCase();
          break;
        case 'status':
          aValue = a.status.toLowerCase();
          bValue = b.status.toLowerCase();
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [searchTerm, statusFilter, sortBy, sortOrder]);

  // tomiwa: Enhanced handler functions
  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedApplications(filteredAndSortedApplications.map(app => app.id));
    } else {
      setSelectedApplications([]);
    }
  };

  const handleSelectApplication = (appId, checked) => {
    if (checked) {
      setSelectedApplications(prev => [...prev, appId]);
    } else {
      setSelectedApplications(prev => prev.filter(id => id !== appId));
    }
  };

  const handleSort = (field) => {
    // tomiwa: Map table column keys to sortable fields
    const fieldMap = {
      'job': 'jobTitle',
      'status': 'status',
      'updated': 'dateApplied'
    };
    
    const sortField = fieldMap[field] || field;
    
    if (sortBy === sortField) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(sortField);
      setSortOrder('asc');
    }
  };

  // tomiwa: Enhanced application actions with feedback handling
  const handleAction = (action, applicationId, status) => {
    const application = allApplications.find(app => app.id === applicationId);
    
    switch (action) {
      case 'test':
        addToast(`Opening assessment for ${application?.company}...`, 'info');
        // tomiwa: Navigate to test page or external link
        setTimeout(() => {
          window.open('https://example.com/test', '_blank');
        }, 1000);
        break;
        
      case 'interview':
        addToast(`Joining interview for ${application?.company}...`, 'info');
        // tomiwa: Navigate to interview link
        setTimeout(() => {
          window.open('https://meet.google.com/example', '_blank');
        }, 1000);
        break;
        
      case 'offer':
        router.push(`/dashboard/candidate/applications/${applicationId}#offer`);
        break;
        
      case 'view':
        router.push(`/dashboard/candidate/applications/${applicationId}`);
        break;
        
      case 'retake':
        if (application?.feedback?.retakeAllowed) {
          setConfirmModal({
            type: 'info',
            title: 'Retake Assessment',
            message: `Ready to retake the assessment for ${application?.company}? You can retake it starting ${new Date(application.feedback.retakeDate).toLocaleDateString()}.`,
            confirmText: 'Schedule Retake',
            onConfirm: () => {
              setConfirmModal(null);
              addToast('Retake scheduled successfully', 'success');
              // tomiwa: Navigate to retake scheduling
              setTimeout(() => {
                window.open('https://example.com/retake', '_blank');
              }, 1000);
            }
          });
        } else {
          addToast('Retake not available for this assessment', 'warning');
        }
        break;
        
      case 'viewFeedback':
        router.push(`/dashboard/candidate/applications/${applicationId}#feedback`);
        break;
        
      case 'reschedule':
        setConfirmModal({
          type: 'info',
          title: 'Reschedule Interview',
          message: `Would you like to reschedule your interview with ${application?.company}?`,
          confirmText: 'Yes, Reschedule',
          onConfirm: () => {
            setConfirmModal(null);
            addToast('Reschedule request sent successfully', 'success');
          }
        });
        break;
        
      case 'withdraw':
        setConfirmModal({
          type: 'danger',
          title: 'Withdraw Application',
          message: `Are you sure you want to withdraw your application to ${application?.company}? This action cannot be undone.`,
          confirmText: 'Yes, Withdraw',
          onConfirm: () => {
            setLoading(true);
            setTimeout(() => {
              setConfirmModal(null);
              setLoading(false);
              addToast('Application withdrawn successfully', 'success');
              setSelectedApplications(prev => prev.filter(id => id !== applicationId));
            }, 1500);
          }
        });
        break;
        
      case 'addToCalendar':
        addToast('Calendar event created', 'success');
        break;
        
      default:
        console.log('Unknown action:', action);
    }
  };

  // tomiwa: Toast management
  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  // tomiwa: Handle bulk actions
  const handleBulkWithdraw = () => {
    setConfirmModal({
      type: 'danger',
      title: 'Withdraw Applications',
      message: `Are you sure you want to withdraw ${selectedApplications.length} application(s)? This action cannot be undone.`,
      confirmText: 'Yes, Withdraw All',
      onConfirm: () => {
        setLoading(true);
        setTimeout(() => {
          setConfirmModal(null);
          setLoading(false);
          addToast(`${selectedApplications.length} application(s) withdrawn successfully`, 'success');
          setSelectedApplications([]);
        }, 1500);
      }
    });
  };

  // tomiwa: UPDATED - AI Assistant handlers with job-specific workflow
  const handleAiAction = (actionType, jobId = null) => {
    const selectedJob = jobId ? allApplications.find(app => app.id === jobId) : null;
    
    switch (actionType) {
      case 'job_match_analyzer':
        // tomiwa: Navigate to job match analyzer with job context
        if (selectedJob) {
          const jobParams = new URLSearchParams({
            jobId: selectedJob.id,
            jobTitle: selectedJob.jobTitle,
            company: selectedJob.company,
            fromApplication: 'true'
          });
          router.push(`/dashboard/candidate/ai-tools/job-match-analyzer?${jobParams.toString()}`);
        } else {
          router.push('/dashboard/candidate/ai-tools/job-match-analyzer');
        }
        break;
      case 'interview_prep':
        // tomiwa: Navigate to interview simulator with job context
        if (selectedJob) {
          const jobParams = new URLSearchParams({
            jobId: selectedJob.id,
            jobTitle: selectedJob.jobTitle,
            company: selectedJob.company,
            fromApplication: 'true'
          });
          router.push(`/dashboard/candidate/ai-tools/interview-simulator?${jobParams.toString()}`);
        } else {
          router.push('/dashboard/candidate/ai-tools/interview-simulator');
        }
        break;
      case 'application_tracker':
        // tomiwa: Navigate to smart application tracker
        router.push('/dashboard/candidate/ai-tools/application-tracker');
        break;
      case 'optimize_applications':
        addToast('AI is analyzing your applications for optimization opportunities...', 'info');
        setTimeout(() => {
          addToast('Analysis complete! Check your applications for AI suggestions.', 'success');
        }, 2000);
        break;
      default:
        break;
    }
  };

  return (
    <CandidateDashboardLayout>
      {/* tomiwa: Enhanced Hero Banner */}
      <div className="bg-gradient-to-r from-brand-aqua to-[#0C5B65] -mt-8 -mx-6 mb-8">
        <div className="px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20 py-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-display font-bold text-white mb-2">
                Job Applications
              </h1>
              <p className="text-white/90 text-lg">
                Track progress and manage your applications ({filteredAndSortedApplications.length} of {allApplications.length})
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowAiAssistant(!showAiAssistant)}
                className={`inline-flex items-center gap-2 px-4 py-2 font-semibold rounded-lg transition-colors ${
                  showAiAssistant 
                    ? 'bg-brand-yellow text-brand-black' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <SparklesIcon className="w-5 h-5" />
                AI Assistant
              </button>
              <button
                onClick={() => addToast('Export feature coming soon!', 'info')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-brand-aqua font-semibold rounded-lg hover:bg-neutral-50 transition-colors"
              >
                <ArrowDownTrayIcon className="w-5 h-5" />
                Export Data
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20 pb-12">
        
        {/* tomiwa: Enhanced Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            
            {/* tomiwa: Search with enhanced styling */}
            <div className="relative flex-1 max-w-md">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Search by company or job title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-aqua focus:border-brand-aqua transition-colors font-sans"
              />
            </div>

            {/* tomiwa: Sort dropdown with enhanced options */}
            <div className="flex items-center gap-2">
              <ArrowsUpDownIcon className="w-5 h-5 text-neutral-500" />
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split('-');
                  setSortBy(field);
                  setSortOrder(order);
                }}
                className="px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-aqua focus:border-brand-aqua transition-colors font-sans"
              >
                <option value="dateApplied-desc">Newest First</option>
                <option value="dateApplied-asc">Oldest First</option>
                <option value="company-asc">Company A-Z</option>
                <option value="company-desc">Company Z-A</option>
                <option value="jobTitle-asc">Job Title A-Z</option>
                <option value="status-asc">Status A-Z</option>
              </select>
            </div>
          </div>

          {/* tomiwa: Enhanced Status Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {statusFilters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setStatusFilter(filter.value)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                  statusFilter === filter.value
                    ? 'bg-brand-aqua text-white shadow-md scale-105'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 hover:scale-102'
                }`}
              >
                {filter.label} ({filter.count})
              </button>
            ))}
          </div>
        </div>

        {/* tomiwa: Enhanced Bulk Actions Bar */}
        {selectedApplications.length > 0 && (
          <div className="bg-brand-aqua text-white rounded-lg p-4 mb-6 flex items-center justify-between shadow-lg">
            <span className="font-medium">
              {selectedApplications.length} application(s) selected
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={handleBulkWithdraw}
                disabled={loading}
                className="px-4 py-2 bg-white text-brand-aqua rounded-lg hover:bg-neutral-50 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing...' : 'Withdraw Selected'}
              </button>
              <button
                onClick={() => setSelectedApplications([])}
                className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors font-medium"
              >
                Clear Selection
              </button>
            </div>
          </div>
        )}

        {/* tomiwa: Enhanced Applications Table */}
        {filteredAndSortedApplications.length > 0 ? (
          <ApplicationsTable
            applications={filteredAndSortedApplications}
            selectedApplications={selectedApplications}
            onSelectApplication={handleSelectApplication}
            onSelectAll={handleSelectAll}
            onSort={handleSort}
            sortBy={sortBy}
            sortOrder={sortOrder}
            onAction={handleAction}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />
        ) : (
          // tomiwa: Empty state
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <DocumentTextIcon className="w-24 h-24 text-neutral-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-neutral-900 mb-2">
              {searchTerm || statusFilter !== 'all' ? 'No applications found' : 'No applications yet'}
            </h2>
            <p className="text-neutral-600 mb-8">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'Start applying to jobs to see them here'
              }
            </p>
            {!searchTerm && statusFilter === 'all' && (
              <Link
                href="/jobs"
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-aqua text-white font-semibold rounded-lg hover:bg-[#0C5B65] transition-colors"
              >
                <MagnifyingGlassIcon className="w-5 h-5" />
                Browse Jobs
              </Link>
            )}
          </div>
        )}

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
                    <h2 className="text-xl font-display font-bold text-brand-black">AI Application Assistant</h2>
                    <p className="text-brand-black/80">Optimize your job applications and track progress</p>
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
                  onClick={() => handleAiAction('job_match_analyzer')}
                  className="text-left p-4 border border-neutral-200 rounded-lg hover:border-brand-aqua hover:bg-brand-aqua/5 transition-all group"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-brand-aqua/10 rounded-lg flex items-center justify-center group-hover:bg-brand-aqua/20 transition-colors">
                      <ClipboardDocumentListIcon className="w-5 h-5 text-brand-aqua" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-neutral-900 mb-1">Job Match Analyzer</h3>
                      <p className="text-sm text-neutral-600 mb-2">Analyze how well you match job requirements</p>
                      <span className="text-xs font-medium text-brand-aqua">Analyze Match</span>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => handleAiAction('interview_prep')}
                  className="text-left p-4 border border-neutral-200 rounded-lg hover:border-brand-aqua hover:bg-brand-aqua/5 transition-all group"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-brand-orange/10 rounded-lg flex items-center justify-center group-hover:bg-brand-orange/20 transition-colors">
                      <AcademicCapIcon className="w-5 h-5 text-brand-orange" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-neutral-900 mb-1">Interview Preparation</h3>
                      <p className="text-sm text-neutral-600 mb-2">Prepare for upcoming interviews with AI</p>
                      <span className="text-xs font-medium text-brand-orange">Prepare Interview</span>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => handleAiAction('application_tracker')}
                  className="text-left p-4 border border-neutral-200 rounded-lg hover:border-brand-aqua hover:bg-brand-aqua/5 transition-all group"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                      <PaperAirplaneIcon className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-neutral-900 mb-1">Smart Application Tracker</h3>
                      <p className="text-sm text-neutral-600 mb-2">Track applications with AI insights and follow-up timing</p>
                      <span className="text-xs font-medium text-purple-600">Track Applications</span>
                    </div>
                  </div>
                </button>
              </div>

              {/* tomiwa: Quick AI Actions */}
              <div className="border-t border-neutral-200 pt-6">
                <h3 className="text-sm font-semibold text-neutral-900 mb-4">Quick Actions</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleAiAction('optimize_applications')}
                    className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-neutral-700 bg-neutral-100 rounded-lg hover:bg-neutral-200 transition-colors"
                  >
                    <SparklesIcon className="w-4 h-4" />
                    Optimize Applications
                  </button>
                  <Link
                    href="/dashboard/candidate/messages"
                    className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-neutral-700 bg-neutral-100 rounded-lg hover:bg-neutral-200 transition-colors"
                  >
                    <PaperAirplaneIcon className="w-4 h-4" />
                    Send Messages
                  </Link>
                  <Link
                    href="/jobs"
                    className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-neutral-700 bg-neutral-100 rounded-lg hover:bg-neutral-200 transition-colors"
                  >
                    <MagnifyingGlassIcon className="w-4 h-4" />
                    Find More Jobs
                  </Link>
                </div>
              </div>

              {/* tomiwa: Application insights based on current data */}
              <div className="mt-6 p-4 bg-brand-aqua/5 rounded-lg border border-brand-aqua/20">
                <div className="flex items-start gap-3">
                  <LightBulbIcon className="w-5 h-5 text-brand-aqua mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-neutral-900 mb-1">Smart Insights</h4>
                    <p className="text-sm text-neutral-700 mb-3">
                      Based on your {allApplications.length} applications:
                    </p>
                    <ul className="text-sm text-neutral-600 space-y-1">
                      <li>• {statusFilters.find(f => f.value === 'interviews')?.count || 0} interviews scheduled - prepare with our AI simulator</li>
                      <li>• {statusFilters.find(f => f.value === 'failed_assessments')?.count || 0} failed assessments - consider retaking or skill improvement</li>
                      <li>• {statusFilters.find(f => f.value === 'active')?.count || 0} active applications - follow up to show continued interest</li>
                      <li>• Success rate: {Math.round((statusFilters.find(f => f.value === 'offers')?.count || 0) / allApplications.length * 100)}% - industry average is 2-5%</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* tomiwa: Enhanced Confirmation Modal */}
      {confirmModal && (
        <ConfirmModal
          isOpen={true}
          onClose={() => setConfirmModal(null)}
          onConfirm={confirmModal.onConfirm}
          title={confirmModal.title}
          message={confirmModal.message}
          confirmText={confirmModal.confirmText}
          type={confirmModal.type}
          loading={loading}
        />
      )}

      {/* tomiwa: Enhanced Toast Notifications */}
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </CandidateDashboardLayout>
  );
}


