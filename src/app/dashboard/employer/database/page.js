'use client';

// tomiwa: Importing React hooks for state management and memoization
import React, { useState, useMemo } from 'react';
// tomiwa: Next.js Image component for optimized images
import Image from 'next/image';
// tomiwa: Heroicons for all UI icons
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  EyeIcon,
  DocumentArrowDownIcon,
  ChatBubbleLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
  CalendarIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  StarIcon,
  ClockIcon,
  CheckCircleIcon,
  UserGroupIcon,
  TrashIcon,
  NoSymbolIcon,
  PaperAirplaneIcon,
  ArrowsUpDownIcon,
} from '@heroicons/react/24/outline';

import EmployerSidebar from '@/components/ui/EmployerSidebar';


// tomiwa: Mock candidate data for demonstration
const mockCandidates = [
  {
    id: 1,
    name: 'Sarah Chen',
    email: 'sarah.chen@email.com',
    phone: '+1 (555) 123-4567',
    photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    jobTitle: 'Senior Frontend Developer',
    department: 'Engineering',
    applicationDate: '2024-03-15',
    status: 'shortlisted',
    lastInteraction: 'Interview - March 20',
    location: 'San Francisco, CA',
    experience: '5+ years',
    education: 'BS Computer Science - Stanford',
    skills: ['React', 'TypeScript', 'Node.js', 'UI/UX Design'],
    resumeSummary: 'Experienced frontend developer with expertise in React and modern web technologies. Led multiple successful projects at tech startups.',
    aiInsights: 'Strong technical background with excellent communication skills. High potential for senior roles.',
    timeline: [
      { date: '2024-03-15', event: 'Application Submitted', type: 'application' },
      { date: '2024-03-17', event: 'Resume Reviewed', type: 'review' },
      { date: '2024-03-20', event: 'Technical Interview', type: 'interview' },
    ]
  },
  {
    id: 2,
    name: 'Michael Rodriguez',
    email: 'michael.r@email.com',
    phone: '+1 (555) 987-6543',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    jobTitle: 'Product Manager',
    department: 'Product',
    applicationDate: '2024-03-12',
    status: 'hired',
    lastInteraction: 'Offer Accepted - March 25',
    location: 'New York, NY',
    experience: '7+ years',
    education: 'MBA - Wharton, BS Engineering',
    skills: ['Product Strategy', 'Agile', 'User Research', 'Analytics'],
    resumeSummary: 'Strategic product manager with proven track record of launching successful products. Strong analytical and leadership skills.',
    aiInsights: 'Exceptional product sense and leadership capabilities. Perfect fit for senior PM roles.',
    timeline: [
      { date: '2024-03-12', event: 'Application Submitted', type: 'application' },
      { date: '2024-03-14', event: 'Phone Screening', type: 'interview' },
      { date: '2024-03-18', event: 'Panel Interview', type: 'interview' },
      { date: '2024-03-22', event: 'Reference Check', type: 'reference' },
      { date: '2024-03-25', event: 'Offer Accepted', type: 'offer' },
    ]
  },
  {
    id: 3,
    name: 'Emily Johnson',
    email: 'emily.johnson@email.com',
    phone: '+1 (555) 456-7890',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    jobTitle: 'UX Designer',
    department: 'Design',
    applicationDate: '2024-03-18',
    status: 'in_progress',
    lastInteraction: 'Design Challenge - March 22',
    location: 'Austin, TX',
    experience: '4+ years',
    education: 'BFA Design - RISD',
    skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems'],
    resumeSummary: 'Creative UX designer with strong user-centered design approach. Experience in both B2B and B2C products.',
    aiInsights: 'Strong design portfolio with good understanding of user psychology. Recommended for mid-level positions.',
    timeline: [
      { date: '2024-03-18', event: 'Application Submitted', type: 'application' },
      { date: '2024-03-20', event: 'Portfolio Review', type: 'review' },
      { date: '2024-03-22', event: 'Design Challenge', type: 'assessment' },
    ]
  },
  {
    id: 4,
    name: 'David Kim',
    email: 'david.kim@email.com',
    phone: '+1 (555) 321-0987',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    jobTitle: 'Backend Developer',
    department: 'Engineering',
    applicationDate: '2024-03-10',
    status: 'rejected',
    lastInteraction: 'Technical Assessment - March 16',
    location: 'Seattle, WA',
    experience: '3+ years',
    education: 'BS Computer Science - UW',
    skills: ['Python', 'Django', 'PostgreSQL', 'AWS'],
    resumeSummary: 'Backend developer with experience in Python and cloud technologies. Strong problem-solving skills.',
    aiInsights: 'Good technical foundation but needs more experience with scalable systems.',
    timeline: [
      { date: '2024-03-10', event: 'Application Submitted', type: 'application' },
      { date: '2024-03-13', event: 'Resume Screening', type: 'review' },
      { date: '2024-03-16', event: 'Technical Assessment', type: 'assessment' },
      { date: '2024-03-19', event: 'Application Declined', type: 'rejection' },
    ]
  },
  {
    id: 5,
    name: 'Lisa Wang',
    email: 'lisa.wang@email.com',
    phone: '+1 (555) 654-3210',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    jobTitle: 'Data Scientist',
    department: 'Analytics',
    applicationDate: '2024-03-20',
    status: 'applied',
    lastInteraction: 'Application Received - March 20',
    location: 'Boston, MA',
    experience: '6+ years',
    education: 'PhD Statistics - MIT',
    skills: ['Python', 'R', 'Machine Learning', 'SQL', 'Tableau'],
    resumeSummary: 'Senior data scientist with PhD in Statistics. Expertise in machine learning and predictive analytics.',
    aiInsights: 'Exceptional academic background with strong analytical skills. High potential candidate.',
    timeline: [
      { date: '2024-03-20', event: 'Application Submitted', type: 'application' },
    ]
  },
];

// tomiwa: Status configuration with colors and labels for candidate statuses
const statusConfig = {
  all: { label: 'All Candidates', color: 'text-neutral-600', bg: 'bg-neutral-100' },
  applied: { label: 'Applied', color: 'text-blue-600', bg: 'bg-blue-100' },
  in_progress: { label: 'In Progress', color: 'text-brand-orange', bg: 'bg-orange-100' },
  shortlisted: { label: 'Shortlisted', color: 'text-brand-aqua', bg: 'bg-cyan-100' },
  hired: { label: 'Hired', color: 'text-emerald-600', bg: 'bg-emerald-100' },
  rejected: { label: 'Rejected', color: 'text-red-600', bg: 'bg-red-100' },
  suspended: { label: 'Suspended', color: 'text-neutral-600', bg: 'bg-neutral-300' },
};

// tomiwa: Department and job title options for filtering
const departments = ['All Departments', 'Engineering', 'Product', 'Design', 'Analytics', 'Marketing', 'Sales'];
const jobTitles = ['All Positions', 'Senior Frontend Developer', 'Product Manager', 'UX Designer', 'Backend Developer', 'Data Scientist'];

export default function CandidateDatabase() {
  // tomiwa: State management for filters, search, and pagination
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('All Departments');
  const [jobTitleFilter, setJobTitleFilter] = useState('All Positions');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [sortBy, setSortBy] = useState('date'); // tomiwa: Sorting option (date, status, name)
  const [sortOrder, setSortOrder] = useState('desc'); // tomiwa: Sort order (asc/desc)
  
  // tomiwa: State management for modals
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showBulkDeleteModal, setShowBulkDeleteModal] = useState(false);
  const [showBulkSuspendModal, setShowBulkSuspendModal] = useState(false);
  
  // tomiwa: State for contact modal
  const [contactTab, setContactTab] = useState('email'); // tomiwa: email or call
  const [emailSubject, setEmailSubject] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  
  // tomiwa: State for suspend modal
  const [suspendReason, setSuspendReason] = useState('');
  const [suspendNotes, setSuspendNotes] = useState('');
  const [suspendDuration, setSuspendDuration] = useState('');
  
  // tomiwa: Toast notification state
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  
  const itemsPerPage = 10;

  // tomiwa: Calculate statistics from candidate data
  const stats = useMemo(() => {
    const total = mockCandidates.length;
    const hired = mockCandidates.filter(c => c.status === 'hired').length;
    const rejected = mockCandidates.filter(c => c.status === 'rejected').length;
    const shortlisted = mockCandidates.filter(c => c.status === 'shortlisted').length;
    const inProgress = mockCandidates.filter(c => c.status === 'in_progress').length;
    
    return { total, hired, rejected, shortlisted, inProgress };
  }, []);

  // tomiwa: Filter, search, and sort candidates based on current filters
  const filteredCandidates = useMemo(() => {
    let filtered = mockCandidates.filter(candidate => {
      const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           candidate.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || candidate.status === statusFilter;
      const matchesDepartment = departmentFilter === 'All Departments' || candidate.department === departmentFilter;
      const matchesJobTitle = jobTitleFilter === 'All Positions' || candidate.jobTitle === jobTitleFilter;
      
      return matchesSearch && matchesStatus && matchesDepartment && matchesJobTitle;
    });
    
    // tomiwa: Sort the filtered candidates
    filtered.sort((a, b) => {
      let comparison = 0;
      
      if (sortBy === 'date') {
        comparison = new Date(a.applicationDate) - new Date(b.applicationDate);
      } else if (sortBy === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (sortBy === 'status') {
        comparison = a.status.localeCompare(b.status);
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });
    
    return filtered;
  }, [searchTerm, statusFilter, departmentFilter, jobTitleFilter, sortBy, sortOrder]);

  // tomiwa: Calculate pagination
  const totalPages = Math.ceil(filteredCandidates.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCandidates = filteredCandidates.slice(startIndex, startIndex + itemsPerPage);

  // tomiwa: Handle candidate selection for bulk actions
  const handleSelectCandidate = (candidateId) => {
    setSelectedCandidates(prev => 
      prev.includes(candidateId) 
        ? prev.filter(id => id !== candidateId)
        : [...prev, candidateId]
    );
  };

  // tomiwa: Handle select all candidates on current page
  const handleSelectAll = () => {
    if (selectedCandidates.length === paginatedCandidates.length && paginatedCandidates.length > 0) {
      setSelectedCandidates([]);
    } else {
      setSelectedCandidates(paginatedCandidates.map(c => c.id));
    }
  };

  // tomiwa: Show toast notification with auto-hide after 3 seconds
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: '' });
    }, 3000);
  };

  // tomiwa: Open candidate profile modal (read-only view)
  const openProfileModal = (candidate) => {
    setSelectedCandidate(candidate);
    setShowProfileModal(true);
  };

  // tomiwa: Open contact modal and pre-fill email subject
  const openContactModal = (candidate) => {
    setSelectedCandidate(candidate);
    setEmailSubject(`Regarding your application for ${candidate.jobTitle}`);
    setEmailMessage('');
    setContactTab('email');
    setShowContactModal(true);
  };

  // tomiwa: Open suspend modal with candidate context
  const openSuspendModal = (candidate) => {
    setSelectedCandidate(candidate);
    setSuspendReason('');
    setSuspendNotes('');
    setSuspendDuration('');
    setShowSuspendModal(true);
  };

  // tomiwa: Open delete confirmation modal
  const openDeleteModal = (candidate) => {
    setSelectedCandidate(candidate);
    setShowDeleteModal(true);
  };

  // tomiwa: Handle sending email to candidate
  const handleSendEmail = () => {
    // tomiwa: In production, this would call an API to send the email
    showToast('Email sent successfully to ' + selectedCandidate.name, 'success');
    setShowContactModal(false);
    setEmailSubject('');
    setEmailMessage('');
  };

  // tomiwa: Handle logging a call with candidate
  const handleLogCall = () => {
    // tomiwa: In production, this would log the call in the backend
    showToast('Call logged successfully with ' + selectedCandidate.name, 'success');
    setShowContactModal(false);
  };

  // tomiwa: Handle suspending a candidate
  const handleSuspendCandidate = () => {
    // tomiwa: In production, this would update the candidate status in the database
    showToast('Candidate suspended successfully', 'success');
    setShowSuspendModal(false);
    setSuspendReason('');
    setSuspendNotes('');
    setSuspendDuration('');
  };

  // tomiwa: Handle deleting a single candidate
  const handleDeleteCandidate = () => {
    // tomiwa: In production, this would delete the candidate from the database
    showToast('Candidate deleted successfully', 'success');
    setShowDeleteModal(false);
    setSelectedCandidate(null);
  };

  // tomiwa: Handle bulk delete
  const handleBulkDelete = () => {
    // tomiwa: In production, this would delete multiple candidates from the database
    showToast(`${selectedCandidates.length} candidates deleted successfully`, 'success');
    setShowBulkDeleteModal(false);
    setSelectedCandidates([]);
  };

  // tomiwa: Handle bulk suspend
  const handleBulkSuspend = () => {
    // tomiwa: In production, this would suspend multiple candidates in the database
    showToast(`${selectedCandidates.length} candidates suspended successfully`, 'success');
    setShowBulkSuspendModal(false);
    setSelectedCandidates([]);
  };

  // tomiwa: Handle exporting candidate data to CSV
  const handleExport = () => {
    // tomiwa: In production, this would generate and download a CSV file
    showToast('Exporting candidate data...', 'success');
  };

  // tomiwa: Toggle sort order
  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  // tomiwa: Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-neutral-50">

      {/* Sidebar */}
      <EmployerSidebar />

      {/* tomiwa: Gradient Banner Header - aqua to teal gradient (left to right, 90°) */}
      <div className="bg-gradient-to-r from-[#36D0D8] to-[#0C5B65] shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* tomiwa: Header text section */}
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-white">
                Candidate Database
              </h1>
              <p className="text-sm sm:text-base text-[#D9E5E6] mt-2">
                Centralized repository of all candidates who have interacted with your company
              </p>
            </div>
            {/* tomiwa: Export button - hidden on mobile, visible on tablet and up */}
            <div className="flex items-center gap-4">
              <button 
                onClick={handleExport}
                className="flex items-center gap-2 px-4 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/20 transition-all text-white"
              >
                <DocumentArrowDownIcon className="w-5 h-5" />
                <span className="text-sm font-medium hidden sm:inline">Export Data</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* tomiwa: Main container with responsive padding - adjusts for all screen sizes */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* tomiwa: Statistics Overview Bar - responsive grid that stacks on mobile, 2 cols on tablet, 5 cols on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* tomiwa: Total Candidates Stat Card */}
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-neutral-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="p-2.5 sm:p-3 bg-brand-aqua/10 rounded-xl flex-shrink-0">
                <UserGroupIcon className="w-5 h-5 sm:w-6 sm:h-6 text-brand-aqua" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-brand-black">{stats.total}</p>
                <p className="text-xs sm:text-sm text-neutral-600">Total Candidates</p>
              </div>
            </div>
          </div>
          
          {/* tomiwa: Hired Stat Card */}
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-neutral-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="p-2.5 sm:p-3 bg-emerald-100 rounded-xl flex-shrink-0">
                <CheckCircleIcon className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-brand-black">{stats.hired}</p>
                <p className="text-xs sm:text-sm text-neutral-600">Hired</p>
              </div>
            </div>
          </div>
          
          {/* tomiwa: Rejected Stat Card */}
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-neutral-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="p-2.5 sm:p-3 bg-red-100 rounded-xl flex-shrink-0">
                <XMarkIcon className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-brand-black">{stats.rejected}</p>
                <p className="text-xs sm:text-sm text-neutral-600">Rejected</p>
              </div>
            </div>
          </div>
          
          {/* tomiwa: Shortlisted Stat Card */}
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-neutral-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="p-2.5 sm:p-3 bg-cyan-100 rounded-xl flex-shrink-0">
                <StarIcon className="w-5 h-5 sm:w-6 sm:h-6 text-brand-aqua" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-brand-black">{stats.shortlisted}</p>
                <p className="text-xs sm:text-sm text-neutral-600">Shortlisted</p>
              </div>
            </div>
          </div>
          
          {/* tomiwa: In Progress Stat Card */}
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-neutral-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="p-2.5 sm:p-3 bg-orange-100 rounded-xl flex-shrink-0">
                <ClockIcon className="w-5 h-5 sm:w-6 sm:h-6 text-brand-orange" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-brand-black">{stats.inProgress}</p>
                <p className="text-xs sm:text-sm text-neutral-600">In Progress</p>
              </div>
            </div>
          </div>
        </div>

        {/* tomiwa: Filter and Search Toolbar */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* tomiwa: Search Field */}
            <div className="flex-1">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-brand-aqua focus:border-transparent"
                />
              </div>
            </div>

            {/* tomiwa: Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-brand-aqua focus:border-transparent bg-white"
            >
              {Object.entries(statusConfig).map(([key, config]) => (
                <option key={key} value={key}>{config.label}</option>
              ))}
            </select>

            {/* tomiwa: Department Filter */}
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-brand-aqua focus:border-transparent bg-white"
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>

            {/* tomiwa: Job Title Filter */}
            <select
              value={jobTitleFilter}
              onChange={(e) => setJobTitleFilter(e.target.value)}
              className="px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-brand-aqua focus:border-transparent bg-white"
            >
              {jobTitles.map(title => (
                <option key={title} value={title}>{title}</option>
              ))}
            </select>

            {/* tomiwa: Filter Button */}
            <button className="flex items-center gap-2 px-4 py-3 bg-brand-aqua text-white rounded-xl hover:bg-brand-aqua/90 transition-colors">
              <FunnelIcon className="w-5 h-5" />
              <span className="hidden sm:inline">Filters</span>
            </button>
          </div>
        </div>

        {/* tomiwa: Bulk Actions Bar (shown when candidates are selected) */}
        {selectedCandidates.length > 0 && (
          <div className="bg-brand-aqua/10 border border-brand-aqua/20 rounded-xl p-4 mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              {/* tomiwa: Selection info and action buttons */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
                <p className="text-sm font-medium text-brand-black">
                  {selectedCandidates.length} candidate{selectedCandidates.length !== 1 ? 's' : ''} selected
                </p>
                {/* tomiwa: Bulk action buttons - responsive flex wrapping */}
                <div className="flex items-center gap-2 flex-wrap">
                  <button 
                    onClick={handleExport}
                    className="flex items-center gap-2 px-3 py-2 bg-white border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors text-sm"
                  >
                    <DocumentArrowDownIcon className="w-4 h-4" />
                    <span className="hidden sm:inline">Export</span>
                  </button>
                  <button 
                    onClick={() => setShowBulkSuspendModal(true)}
                    className="flex items-center gap-2 px-3 py-2 bg-white border border-neutral-300 rounded-lg hover:bg-orange-50 hover:border-brand-orange transition-colors text-sm"
                  >
                    <NoSymbolIcon className="w-4 h-4" />
                    <span className="hidden sm:inline">Suspend</span>
                  </button>
                  <button 
                    onClick={() => setShowBulkDeleteModal(true)}
                    className="flex items-center gap-2 px-3 py-2 bg-white border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm"
                  >
                    <TrashIcon className="w-4 h-4" />
                    <span className="hidden sm:inline">Delete</span>
                  </button>
                </div>
              </div>
              {/* tomiwa: Clear selection button */}
              <button
                onClick={() => setSelectedCandidates([])}
                className="p-2 hover:bg-white/50 rounded-lg transition-colors self-start sm:self-auto"
              >
                <XMarkIcon className="w-5 h-5 text-neutral-600" />
              </button>
            </div>
          </div>
        )}

        {/* tomiwa: Candidate Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 overflow-hidden">
          {filteredCandidates.length > 0 ? (
            <>
              {/* tomiwa: Desktop Table View - hidden on mobile, visible on large screens */}
              <div className="hidden lg:block">
                {/* tomiwa: Table Header with sortable columns */}
              <div className="px-6 py-4 border-b border-neutral-200 bg-neutral-50">
                <div className="flex items-center">
                    {/* tomiwa: Bulk select checkbox */}
                  <div className="flex items-center mr-6">
                    <input
                      type="checkbox"
                      checked={selectedCandidates.length === paginatedCandidates.length && paginatedCandidates.length > 0}
                      onChange={handleSelectAll}
                        className="w-4 h-4 text-brand-aqua border-neutral-300 rounded focus:ring-brand-aqua cursor-pointer"
                    />
                  </div>
                    {/* tomiwa: Table column headers */}
                  <div className="grid grid-cols-12 gap-4 flex-1 text-sm font-medium text-neutral-600">
                      <button 
                        onClick={() => toggleSort('name')}
                        className="col-span-3 text-left flex items-center gap-1 hover:text-brand-aqua transition-colors"
                      >
                        Candidate
                        <ArrowsUpDownIcon className="w-3 h-3" />
                      </button>
                    <div className="col-span-2">Position</div>
                      <button 
                        onClick={() => toggleSort('date')}
                        className="col-span-2 text-left flex items-center gap-1 hover:text-brand-aqua transition-colors"
                      >
                        Applied Date
                        <ArrowsUpDownIcon className="w-3 h-3" />
                      </button>
                      <button 
                        onClick={() => toggleSort('status')}
                        className="col-span-2 text-left flex items-center gap-1 hover:text-brand-aqua transition-colors"
                      >
                        Status
                        <ArrowsUpDownIcon className="w-3 h-3" />
                      </button>
                    <div className="col-span-2">Last Interaction</div>
                      <div className="col-span-1 text-center">Actions</div>
                  </div>
                </div>
              </div>

                {/* tomiwa: Desktop Table Body - row for each candidate */}
              <div className="divide-y divide-neutral-200">
                {paginatedCandidates.map((candidate) => (
                  <div key={candidate.id} className="px-6 py-4 hover:bg-neutral-50 transition-colors">
                    <div className="flex items-center">
                        {/* tomiwa: Checkbox for bulk selection */}
                      <div className="flex items-center mr-6">
                        <input
                          type="checkbox"
                          checked={selectedCandidates.includes(candidate.id)}
                          onChange={() => handleSelectCandidate(candidate.id)}
                            className="w-4 h-4 text-brand-aqua border-neutral-300 rounded focus:ring-brand-aqua cursor-pointer"
                        />
                      </div>
                        {/* tomiwa: Candidate data columns */}
                      <div className="grid grid-cols-12 gap-4 flex-1 items-center">
                          {/* tomiwa: Candidate Info - avatar, name, email */}
                        <div className="col-span-3 flex items-center gap-3">
                          <Image
                            src={candidate.photo}
                            alt={candidate.name}
                            width={40}
                            height={40}
                              className="rounded-full object-cover flex-shrink-0"
                            />
                            <div className="min-w-0">
                              <p className="font-medium text-brand-black truncate">{candidate.name}</p>
                              <p className="text-sm text-neutral-600 truncate">{candidate.email}</p>
                          </div>
                        </div>

                          {/* tomiwa: Position - job title and department */}
                        <div className="col-span-2">
                            <p className="font-medium text-brand-black text-sm">{candidate.jobTitle}</p>
                            <p className="text-xs text-neutral-600">{candidate.department}</p>
                        </div>

                        {/* tomiwa: Application Date */}
                        <div className="col-span-2">
                          <p className="text-sm text-neutral-600">{formatDate(candidate.applicationDate)}</p>
                        </div>

                          {/* tomiwa: Status Badge - color coded */}
                        <div className="col-span-2">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusConfig[candidate.status].bg} ${statusConfig[candidate.status].color}`}>
                            {statusConfig[candidate.status].label}
                          </span>
                        </div>

                        {/* tomiwa: Last Interaction */}
                        <div className="col-span-2">
                          <p className="text-sm text-neutral-600">{candidate.lastInteraction}</p>
                        </div>

                          {/* tomiwa: Action Buttons - View, Contact, Suspend, Delete (NO EDIT) */}
                        <div className="col-span-1">
                            <div className="flex items-center justify-center gap-1">
                            <button
                              onClick={() => openProfileModal(candidate)}
                                className="p-1.5 text-neutral-600 hover:text-brand-aqua hover:bg-brand-aqua/10 rounded-lg transition-colors"
                              title="View Profile"
                            >
                              <EyeIcon className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => openContactModal(candidate)}
                                className="p-1.5 text-neutral-600 hover:text-brand-aqua hover:bg-brand-aqua/10 rounded-lg transition-colors"
                                title="Contact Candidate"
                            >
                                <ChatBubbleLeftIcon className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => openSuspendModal(candidate)}
                                className="p-1.5 text-neutral-600 hover:text-brand-orange hover:bg-brand-orange/10 rounded-lg transition-colors"
                                title="Suspend Candidate"
                              >
                                <NoSymbolIcon className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => openDeleteModal(candidate)}
                                className="p-1.5 text-neutral-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Delete Candidate"
                              >
                                <TrashIcon className="w-4 h-4" />
                            </button>
                          </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* tomiwa: Mobile Card View - visible on tablets and mobile, hidden on large screens */}
              <div className="lg:hidden divide-y divide-neutral-200">
                {paginatedCandidates.map((candidate) => (
                  <div key={candidate.id} className="p-4 sm:p-6 hover:bg-neutral-50 transition-colors">
                    <div className="flex items-start gap-4">
                      {/* tomiwa: Checkbox for mobile */}
                      <input
                        type="checkbox"
                        checked={selectedCandidates.includes(candidate.id)}
                        onChange={() => handleSelectCandidate(candidate.id)}
                        className="mt-1 w-4 h-4 text-brand-aqua border-neutral-300 rounded focus:ring-brand-aqua cursor-pointer flex-shrink-0"
                      />
                      
                      {/* tomiwa: Candidate card content */}
                      <div className="flex-1 min-w-0">
                        {/* tomiwa: Top section - avatar and basic info */}
                        <div className="flex items-start gap-3 mb-4">
                          <Image
                            src={candidate.photo}
                            alt={candidate.name}
                            width={48}
                            height={48}
                            className="rounded-full object-cover flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-brand-black mb-1">{candidate.name}</h3>
                            <p className="text-sm text-neutral-600 mb-2 truncate">{candidate.email}</p>
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig[candidate.status].bg} ${statusConfig[candidate.status].color}`}>
                              {statusConfig[candidate.status].label}
                            </span>
                          </div>
                        </div>

                        {/* tomiwa: Job and date info */}
                        <div className="space-y-2 mb-4 text-sm">
                          <div className="flex items-start justify-between">
                            <span className="text-neutral-600">Position:</span>
                            <span className="font-medium text-brand-black text-right">{candidate.jobTitle}</span>
                          </div>
                          <div className="flex items-start justify-between">
                            <span className="text-neutral-600">Department:</span>
                            <span className="text-brand-black">{candidate.department}</span>
                          </div>
                          <div className="flex items-start justify-between">
                            <span className="text-neutral-600">Applied:</span>
                            <span className="text-brand-black">{formatDate(candidate.applicationDate)}</span>
                          </div>
                          <div className="flex items-start justify-between">
                            <span className="text-neutral-600">Last Interaction:</span>
                            <span className="text-brand-black text-right text-xs">{candidate.lastInteraction}</span>
                          </div>
                        </div>

                        {/* tomiwa: Mobile action buttons - full width */}
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => openProfileModal(candidate)}
                            className="flex items-center justify-center gap-2 px-3 py-2 bg-brand-aqua text-white rounded-lg hover:bg-brand-aqua/90 transition-colors text-sm"
                          >
                            <EyeIcon className="w-4 h-4" />
                            View
                          </button>
                          <button
                            onClick={() => openContactModal(candidate)}
                            className="flex items-center justify-center gap-2 px-3 py-2 bg-brand-aqua text-white rounded-lg hover:bg-brand-aqua/90 transition-colors text-sm"
                          >
                            <ChatBubbleLeftIcon className="w-4 h-4" />
                            Contact
                          </button>
                          <button
                            onClick={() => openSuspendModal(candidate)}
                            className="flex items-center justify-center gap-2 px-3 py-2 border border-brand-orange text-brand-orange rounded-lg hover:bg-brand-orange/10 transition-colors text-sm"
                          >
                            <NoSymbolIcon className="w-4 h-4" />
                            Suspend
                          </button>
                          <button
                            onClick={() => openDeleteModal(candidate)}
                            className="flex items-center justify-center gap-2 px-3 py-2 border border-red-500 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm"
                          >
                            <TrashIcon className="w-4 h-4" />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* tomiwa: Pagination */}
              {totalPages > 1 && (
                <div className="px-6 py-4 border-t border-neutral-200 bg-neutral-50">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-neutral-600">
                      Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredCandidates.length)} of {filteredCandidates.length} candidates
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="p-2 text-neutral-600 hover:text-brand-aqua disabled:opacity-50 disabled:cursor-not-allowed rounded-lg hover:bg-white transition-colors"
                      >
                        <ChevronLeftIcon className="w-5 h-5" />
                      </button>
                      
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                            currentPage === page
                              ? 'bg-brand-aqua text-white'
                              : 'text-neutral-600 hover:text-brand-aqua hover:bg-white'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                      
                      <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="p-2 text-neutral-600 hover:text-brand-aqua disabled:opacity-50 disabled:cursor-not-allowed rounded-lg hover:bg-white transition-colors"
                      >
                        <ChevronRightIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            /* tomiwa: Empty State */
            <div className="px-6 py-16 text-center">
              <div className="max-w-sm mx-auto">
                <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserGroupIcon className="w-8 h-8 text-neutral-400" />
                </div>
                <h3 className="text-lg font-medium text-neutral-900 mb-2">No candidates found</h3>
                <p className="text-neutral-600 mb-6">
                  {searchTerm || statusFilter !== 'all' || departmentFilter !== 'All Departments' || jobTitleFilter !== 'All Positions'
                    ? 'Try adjusting your search criteria or filters to find candidates.'
                    : 'Once you start hiring, your candidate data will appear here.'
                  }
                </p>
                {(searchTerm || statusFilter !== 'all' || departmentFilter !== 'All Departments' || jobTitleFilter !== 'All Positions') && (
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setStatusFilter('all');
                      setDepartmentFilter('All Departments');
                      setJobTitleFilter('All Positions');
                    }}
                    className="text-brand-aqua hover:text-brand-orange font-medium"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* tomiwa: Toast Notification - auto-dismisses after 3 seconds */}
      {toast.show && (
        <div className="fixed top-4 right-4 z-[60] animate-fade-in">
          <div className={`px-6 py-4 rounded-xl shadow-lg flex items-center gap-3 ${
            toast.type === 'success' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
          }`}>
            <CheckCircleIcon className="w-5 h-5" />
            <p className="font-medium">{toast.message}</p>
          </div>
        </div>
      )}

      {/* tomiwa: View Candidate Profile Modal - READ-ONLY, no editing allowed */}
      {showProfileModal && selectedCandidate && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
             onClick={() => setShowProfileModal(false)}>
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
               onClick={(e) => e.stopPropagation()}>
            {/* tomiwa: Modal Header */}
            <div className="px-4 sm:px-6 py-4 border-b border-neutral-200 flex items-center justify-between bg-gradient-to-r from-brand-aqua/10 to-brand-aqua/5">
              <h2 className="text-lg sm:text-xl font-display font-bold text-brand-black">View Candidate Profile</h2>
              <button
                onClick={() => setShowProfileModal(false)}
                className="p-2 hover:bg-white/50 rounded-lg transition-colors"
              >
                <XMarkIcon className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-600" />
              </button>
            </div>

            {/* tomiwa: Modal Content - scrollable area */}
            <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
                {/* tomiwa: Left Column - Basic Info and Contact */}
                <div className="lg:col-span-1 space-y-4 sm:space-y-6">
                  {/* tomiwa: Profile Photo and Basic Details */}
                  <div className="text-center">
                    <Image
                      src={selectedCandidate.photo}
                      alt={selectedCandidate.name}
                      width={120}
                      height={120}
                      className="rounded-full object-cover mx-auto mb-4 border-4 border-brand-aqua/20"
                    />
                    <h3 className="text-lg sm:text-xl font-bold text-brand-black mb-1">{selectedCandidate.name}</h3>
                    <p className="text-brand-aqua font-medium mb-2 text-sm sm:text-base">{selectedCandidate.jobTitle}</p>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusConfig[selectedCandidate.status].bg} ${statusConfig[selectedCandidate.status].color}`}>
                      {statusConfig[selectedCandidate.status].label}
                    </span>
                  </div>

                  {/* tomiwa: Contact Information - read-only */}
                  <div className="bg-neutral-50 rounded-xl p-4">
                    <h4 className="font-semibold text-brand-black mb-3 text-sm sm:text-base">Contact Information</h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <EnvelopeIcon className="w-4 h-4 text-neutral-600 flex-shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm text-neutral-600 break-all">{selectedCandidate.email}</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <PhoneIcon className="w-4 h-4 text-neutral-600 flex-shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm text-neutral-600">{selectedCandidate.phone}</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPinIcon className="w-4 h-4 text-neutral-600 flex-shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm text-neutral-600">{selectedCandidate.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* tomiwa: Quick Stats */}
                  <div className="bg-neutral-50 rounded-xl p-4">
                    <h4 className="font-semibold text-brand-black mb-3 text-sm sm:text-base">Quick Stats</h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <BriefcaseIcon className="w-4 h-4 text-neutral-600 flex-shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm text-neutral-600">{selectedCandidate.experience}</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <AcademicCapIcon className="w-4 h-4 text-neutral-600 flex-shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm text-neutral-600">{selectedCandidate.education}</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CalendarIcon className="w-4 h-4 text-neutral-600 flex-shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm text-neutral-600">Applied {formatDate(selectedCandidate.applicationDate)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* tomiwa: Right Column - Detailed Info */}
                <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                  {/* tomiwa: Resume Summary */}
                  <div>
                    <h4 className="font-semibold text-brand-black mb-3 text-sm sm:text-base">Resume Summary</h4>
                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">{selectedCandidate.resumeSummary}</p>
                  </div>

                  {/* tomiwa: Skills */}
                  <div>
                    <h4 className="font-semibold text-brand-black mb-3 text-sm sm:text-base">Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCandidate.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-2.5 py-1 bg-brand-aqua/10 text-brand-aqua rounded-full text-xs font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* tomiwa: AI Insights */}
                  <div className="bg-gradient-to-r from-brand-aqua/5 to-brand-orange/5 rounded-xl p-4">
                    <h4 className="font-semibold text-brand-black mb-3 flex items-center gap-2 text-sm sm:text-base">
                      <StarIcon className="w-5 h-5 text-brand-orange" />
                      AI Insights
                    </h4>
                    <p className="text-xs sm:text-sm text-neutral-600">{selectedCandidate.aiInsights}</p>
                  </div>

                  {/* tomiwa: Application Timeline */}
                  <div>
                    <h4 className="font-semibold text-brand-black mb-4 text-sm sm:text-base">Application Timeline</h4>
                    <div className="space-y-3 sm:space-y-4">
                      {selectedCandidate.timeline.map((event, index) => (
                        <div key={index} className="flex items-start gap-3 sm:gap-4">
                          <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 bg-brand-aqua/10 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-brand-aqua rounded-full"></div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-brand-black text-xs sm:text-sm">{event.event}</p>
                            <p className="text-xs text-neutral-600">{formatDate(event.date)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    </div>
                  </div>
                </div>
              </div>

            {/* tomiwa: Footer Action Buttons - Contact button only (read-only modal) */}
            <div className="px-4 sm:px-6 py-4 border-t border-neutral-200 bg-neutral-50 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3">
              <button 
                onClick={() => {
                  setShowProfileModal(false);
                  openContactModal(selectedCandidate);
                }}
                className="px-4 py-2.5 text-white bg-brand-aqua hover:bg-brand-aqua/90 rounded-xl transition-colors text-sm font-medium flex items-center justify-center gap-2"
              >
                <ChatBubbleLeftIcon className="w-4 h-4" />
                Contact Candidate
                </button>
            </div>
          </div>
        </div>
      )}

      {/* tomiwa: Contact Candidate Modal - Email and Call tabs */}
      {showContactModal && selectedCandidate && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
             onClick={() => setShowContactModal(false)}>
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
               onClick={(e) => e.stopPropagation()}>
            {/* tomiwa: Modal Header */}
            <div className="px-4 sm:px-6 py-4 border-b border-neutral-200 flex items-center justify-between bg-gradient-to-r from-brand-aqua/10 to-brand-aqua/5">
              <h2 className="text-lg sm:text-xl font-display font-bold text-brand-black">Contact Candidate</h2>
              <button
                onClick={() => setShowContactModal(false)}
                className="p-2 hover:bg-white/50 rounded-lg transition-colors"
              >
                <XMarkIcon className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-600" />
                </button>
            </div>

            {/* tomiwa: Tab Navigation - Email or Call */}
            <div className="px-4 sm:px-6 py-3 border-b border-neutral-200 flex gap-2">
              <button
                onClick={() => setContactTab('email')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  contactTab === 'email'
                    ? 'bg-brand-aqua text-white'
                    : 'text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                <div className="flex items-center gap-2">
                  <EnvelopeIcon className="w-4 h-4" />
                  Email
                </div>
                </button>
              <button
                onClick={() => setContactTab('call')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  contactTab === 'call'
                    ? 'bg-brand-aqua text-white'
                    : 'text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                <div className="flex items-center gap-2">
                  <PhoneIcon className="w-4 h-4" />
                  Call
              </div>
              </button>
            </div>

            {/* tomiwa: Modal Content */}
            <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-220px)]">
              {contactTab === 'email' ? (
                <div className="space-y-4">
                  {/* tomiwa: Candidate info reminder */}
                  <div className="bg-neutral-50 rounded-lg p-3 flex items-center gap-3">
                    <Image
                      src={selectedCandidate.photo}
                      alt={selectedCandidate.name}
                      width={40}
                      height={40}
                      className="rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-brand-black text-sm">{selectedCandidate.name}</p>
                      <p className="text-xs text-neutral-600">{selectedCandidate.email}</p>
                    </div>
                  </div>

                  {/* tomiwa: Email Subject - pre-filled */}
                  <div>
                    <label className="block text-sm font-medium text-brand-black mb-2">Subject</label>
                    <input
                      type="text"
                      value={emailSubject}
                      onChange={(e) => setEmailSubject(e.target.value)}
                      className="w-full px-4 py-2.5 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-brand-aqua focus:border-transparent text-sm"
                    />
                  </div>

                  {/* tomiwa: Email Message Body */}
                  <div>
                    <label className="block text-sm font-medium text-brand-black mb-2">Message</label>
                    <textarea
                      value={emailMessage}
                      onChange={(e) => setEmailMessage(e.target.value)}
                      rows={8}
                      placeholder="Type your message here..."
                      className="w-full px-4 py-2.5 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-brand-aqua focus:border-transparent text-sm resize-none"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* tomiwa: Call Tab - Display phone number and log call */}
                  <div className="bg-neutral-50 rounded-lg p-4 flex items-start gap-4">
                    <Image
                      src={selectedCandidate.photo}
                      alt={selectedCandidate.name}
                      width={48}
                      height={48}
                      className="rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-brand-black mb-1">{selectedCandidate.name}</p>
                      <p className="text-sm text-neutral-600 mb-3">{selectedCandidate.jobTitle}</p>
                      <div className="flex items-center gap-2 text-brand-aqua">
                        <PhoneIcon className="w-5 h-5" />
                        <p className="text-lg font-semibold">{selectedCandidate.phone}</p>
                      </div>
                    </div>
                  </div>

                  {/* tomiwa: Call instructions */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-900">
                      <strong>Note:</strong> Click "Start Call" to log this interaction. In production, this would integrate with your phone system or calling service.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* tomiwa: Footer Action Buttons */}
            <div className="px-4 sm:px-6 py-4 border-t border-neutral-200 bg-neutral-50 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3">
              <button
                onClick={() => setShowContactModal(false)}
                className="px-4 py-2.5 text-neutral-600 hover:text-brand-black border border-neutral-300 rounded-xl hover:bg-white transition-colors text-sm font-medium"
              >
                Cancel
              </button>
              {contactTab === 'email' ? (
                <button
                  onClick={handleSendEmail}
                  className="px-6 py-2.5 text-white bg-brand-aqua hover:bg-brand-aqua/90 rounded-xl transition-colors text-sm font-medium flex items-center justify-center gap-2"
                >
                  <PaperAirplaneIcon className="w-4 h-4" />
                  Send Email
                </button>
              ) : (
                <button
                  onClick={handleLogCall}
                  className="px-6 py-2.5 text-white bg-brand-aqua hover:bg-brand-aqua/90 rounded-xl transition-colors text-sm font-medium flex items-center justify-center gap-2"
                >
                  <PhoneIcon className="w-4 h-4" />
                  Start Call
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* tomiwa: Suspend Candidate Modal */}
      {showSuspendModal && selectedCandidate && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
             onClick={() => setShowSuspendModal(false)}>
          <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-hidden shadow-2xl"
               onClick={(e) => e.stopPropagation()}>
            {/* tomiwa: Modal Header */}
            <div className="px-4 sm:px-6 py-4 border-b border-neutral-200 flex items-center justify-between bg-gradient-to-r from-orange-50 to-orange-100">
              <h2 className="text-lg sm:text-xl font-display font-bold text-brand-black">Suspend Candidate</h2>
              <button
                onClick={() => setShowSuspendModal(false)}
                className="p-2 hover:bg-white/50 rounded-lg transition-colors"
              >
                <XMarkIcon className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-600" />
              </button>
            </div>

            {/* tomiwa: Modal Content */}
            <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-220px)]">
              {/* tomiwa: Candidate info */}
              <div className="bg-neutral-50 rounded-lg p-3 flex items-center gap-3 mb-6">
                <Image
                  src={selectedCandidate.photo}
                  alt={selectedCandidate.name}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-brand-black text-sm">{selectedCandidate.name}</p>
                  <p className="text-xs text-neutral-600">{selectedCandidate.jobTitle}</p>
                </div>
              </div>

              <div className="space-y-4">
                {/* tomiwa: Reason for suspension dropdown */}
                <div>
                  <label className="block text-sm font-medium text-brand-black mb-2">
                    Reason for Suspension <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={suspendReason}
                    onChange={(e) => setSuspendReason(e.target.value)}
                    className="w-full px-4 py-2.5 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-brand-orange focus:border-transparent text-sm"
                  >
                    <option value="">Select a reason...</option>
                    <option value="misconduct">Misconduct</option>
                    <option value="fraudulent">Fraudulent Information</option>
                    <option value="communication">Communication Issue</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* tomiwa: Additional notes */}
                <div>
                  <label className="block text-sm font-medium text-brand-black mb-2">Notes</label>
                  <textarea
                    value={suspendNotes}
                    onChange={(e) => setSuspendNotes(e.target.value)}
                    rows={4}
                    placeholder="Provide additional details about this suspension..."
                    className="w-full px-4 py-2.5 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-brand-orange focus:border-transparent text-sm resize-none"
                  />
                </div>

                {/* tomiwa: Duration (optional) */}
                <div>
                  <label className="block text-sm font-medium text-brand-black mb-2">
                    Suspension Duration (Optional)
                  </label>
                  <input
                    type="date"
                    value={suspendDuration}
                    onChange={(e) => setSuspendDuration(e.target.value)}
                    className="w-full px-4 py-2.5 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-brand-orange focus:border-transparent text-sm"
                  />
                  <p className="text-xs text-neutral-500 mt-1">Leave empty for indefinite suspension</p>
                </div>
              </div>
            </div>

            {/* tomiwa: Footer Action Buttons */}
            <div className="px-4 sm:px-6 py-4 border-t border-neutral-200 bg-neutral-50 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3">
              <button
                onClick={() => setShowSuspendModal(false)}
                className="px-4 py-2.5 text-neutral-600 hover:text-brand-black border border-neutral-300 rounded-xl hover:bg-white transition-colors text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSuspendCandidate}
                disabled={!suspendReason}
                className="px-6 py-2.5 text-white bg-brand-orange hover:bg-brand-orange/90 rounded-xl transition-colors text-sm font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <NoSymbolIcon className="w-4 h-4" />
                Suspend Candidate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* tomiwa: Delete Candidate Modal - Confirmation dialog */}
      {showDeleteModal && selectedCandidate && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
             onClick={() => setShowDeleteModal(false)}>
          <div className="bg-white rounded-xl max-w-md w-full shadow-2xl"
               onClick={(e) => e.stopPropagation()}>
            {/* tomiwa: Modal Header */}
            <div className="px-4 sm:px-6 py-4 border-b border-neutral-200 flex items-center justify-between bg-gradient-to-r from-red-50 to-red-100">
              <h2 className="text-lg sm:text-xl font-display font-bold text-brand-black">Delete Candidate</h2>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="p-2 hover:bg-white/50 rounded-lg transition-colors"
              >
                <XMarkIcon className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-600" />
              </button>
            </div>

            {/* tomiwa: Modal Content */}
            <div className="p-4 sm:p-6">
              {/* tomiwa: Candidate info */}
              <div className="bg-neutral-50 rounded-lg p-3 flex items-center gap-3 mb-4">
                <Image
                  src={selectedCandidate.photo}
                  alt={selectedCandidate.name}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-brand-black text-sm">{selectedCandidate.name}</p>
                  <p className="text-xs text-neutral-600">{selectedCandidate.jobTitle}</p>
                </div>
              </div>

              {/* tomiwa: Warning message */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-red-900">
                  <strong>Warning:</strong> Are you sure you want to permanently delete this candidate's record? This action cannot be undone.
                </p>
              </div>
            </div>

            {/* tomiwa: Footer Action Buttons */}
            <div className="px-4 sm:px-6 py-4 border-t border-neutral-200 bg-neutral-50 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2.5 text-neutral-600 hover:text-brand-black border border-neutral-300 rounded-xl hover:bg-white transition-colors text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteCandidate}
                className="px-6 py-2.5 text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors text-sm font-medium flex items-center justify-center gap-2"
              >
                <TrashIcon className="w-4 h-4" />
                Delete Candidate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* tomiwa: Bulk Delete Modal */}
      {showBulkDeleteModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
             onClick={() => setShowBulkDeleteModal(false)}>
          <div className="bg-white rounded-xl max-w-md w-full shadow-2xl"
               onClick={(e) => e.stopPropagation()}>
            {/* tomiwa: Modal Header */}
            <div className="px-4 sm:px-6 py-4 border-b border-neutral-200 flex items-center justify-between bg-gradient-to-r from-red-50 to-red-100">
              <h2 className="text-lg sm:text-xl font-display font-bold text-brand-black">Delete Multiple Candidates</h2>
              <button
                onClick={() => setShowBulkDeleteModal(false)}
                className="p-2 hover:bg-white/50 rounded-lg transition-colors"
              >
                <XMarkIcon className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-600" />
              </button>
            </div>

            {/* tomiwa: Modal Content */}
            <div className="p-4 sm:p-6">
              {/* tomiwa: Selection count */}
              <div className="bg-neutral-50 rounded-lg p-4 mb-4">
                <p className="text-sm text-neutral-700">
                  You are about to delete <strong className="text-brand-black">{selectedCandidates.length} candidate{selectedCandidates.length !== 1 ? 's' : ''}</strong> from the database.
                </p>
              </div>

              {/* tomiwa: Warning message */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm text-red-900">
                  <strong>Warning:</strong> This action is permanent and cannot be undone. All records, including application history and assessments, will be permanently deleted.
                </p>
              </div>
            </div>

            {/* tomiwa: Footer Action Buttons */}
            <div className="px-4 sm:px-6 py-4 border-t border-neutral-200 bg-neutral-50 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3">
              <button
                onClick={() => setShowBulkDeleteModal(false)}
                className="px-4 py-2.5 text-neutral-600 hover:text-brand-black border border-neutral-300 rounded-xl hover:bg-white transition-colors text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleBulkDelete}
                className="px-6 py-2.5 text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors text-sm font-medium flex items-center justify-center gap-2"
              >
                <TrashIcon className="w-4 h-4" />
                Delete {selectedCandidates.length} Candidate{selectedCandidates.length !== 1 ? 's' : ''}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* tomiwa: Bulk Suspend Modal */}
      {showBulkSuspendModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
             onClick={() => setShowBulkSuspendModal(false)}>
          <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-hidden shadow-2xl"
               onClick={(e) => e.stopPropagation()}>
            {/* tomiwa: Modal Header */}
            <div className="px-4 sm:px-6 py-4 border-b border-neutral-200 flex items-center justify-between bg-gradient-to-r from-orange-50 to-orange-100">
              <h2 className="text-lg sm:text-xl font-display font-bold text-brand-black">Suspend Multiple Candidates</h2>
              <button
                onClick={() => setShowBulkSuspendModal(false)}
                className="p-2 hover:bg-white/50 rounded-lg transition-colors"
              >
                <XMarkIcon className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-600" />
              </button>
            </div>

            {/* tomiwa: Modal Content */}
            <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-220px)]">
              {/* tomiwa: Selection count */}
              <div className="bg-neutral-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-neutral-700">
                  You are about to suspend <strong className="text-brand-black">{selectedCandidates.length} candidate{selectedCandidates.length !== 1 ? 's' : ''}</strong>.
                </p>
              </div>

              <div className="space-y-4">
                {/* tomiwa: Reason for suspension dropdown */}
                <div>
                  <label className="block text-sm font-medium text-brand-black mb-2">
                    Reason for Suspension <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={suspendReason}
                    onChange={(e) => setSuspendReason(e.target.value)}
                    className="w-full px-4 py-2.5 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-brand-orange focus:border-transparent text-sm"
                  >
                    <option value="">Select a reason...</option>
                    <option value="misconduct">Misconduct</option>
                    <option value="fraudulent">Fraudulent Information</option>
                    <option value="communication">Communication Issue</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* tomiwa: Additional notes */}
                <div>
                  <label className="block text-sm font-medium text-brand-black mb-2">Notes</label>
                  <textarea
                    value={suspendNotes}
                    onChange={(e) => setSuspendNotes(e.target.value)}
                    rows={4}
                    placeholder="Provide additional details about this suspension..."
                    className="w-full px-4 py-2.5 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-brand-orange focus:border-transparent text-sm resize-none"
                  />
                </div>

                {/* tomiwa: Duration (optional) */}
                <div>
                  <label className="block text-sm font-medium text-brand-black mb-2">
                    Suspension Duration (Optional)
                  </label>
                  <input
                    type="date"
                    value={suspendDuration}
                    onChange={(e) => setSuspendDuration(e.target.value)}
                    className="w-full px-4 py-2.5 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-brand-orange focus:border-transparent text-sm"
                  />
                  <p className="text-xs text-neutral-500 mt-1">Leave empty for indefinite suspension</p>
                </div>
              </div>
            </div>

            {/* tomiwa: Footer Action Buttons */}
            <div className="px-4 sm:px-6 py-4 border-t border-neutral-200 bg-neutral-50 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3">
              <button
                onClick={() => setShowBulkSuspendModal(false)}
                className="px-4 py-2.5 text-neutral-600 hover:text-brand-black border border-neutral-300 rounded-xl hover:bg-white transition-colors text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleBulkSuspend}
                disabled={!suspendReason}
                className="px-6 py-2.5 text-white bg-brand-orange hover:bg-brand-orange/90 rounded-xl transition-colors text-sm font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <NoSymbolIcon className="w-4 h-4" />
                Suspend {selectedCandidates.length} Candidate{selectedCandidates.length !== 1 ? 's' : ''}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
