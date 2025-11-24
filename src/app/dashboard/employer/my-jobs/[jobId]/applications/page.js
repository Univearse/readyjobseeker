'use client';

// tomiwa: This page renders the employer's applications list and a detailed candidate profile view
// tomiwa: We preserve the existing structure/components but enrich content and add clear comments

import { useState, useMemo } from 'react'; // tomiwa: new new - add useMemo for simple filtering
import Image from 'next/image';
import Link from 'next/link';
import {
  BriefcaseIcon,
  ChartBarIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  UserCircleIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ChatBubbleLeftIcon,
  CalendarIcon,
  ArrowPathIcon,
  StarIcon,
  DocumentTextIcon,
  UserPlusIcon,
  ShareIcon,
  MegaphoneIcon,
  InformationCircleIcon,
  ArrowDownTrayIcon,
} from '@heroicons/react/24/outline';
import EmployerSidebar from '@/components/ui/EmployerSidebar';

// tomiwa: Utility - build Unsplash avatar URLs with consistent sizing and quality
// tomiwa: new new - helps keep layout crisp and consistent across images
const avatar = (id) => `https://images.unsplash.com/${id}?auto=format&fit=facearea&facepad=2&w=96&h=96&q=80`;

// tomiwa: Mock data for demonstration — expanded with realistic profiles similar to your reference
// tomiwa: new new - rich dataset so UI is not blank and feels real
const mockApplications = [
  {
    id: 1,
    candidate: {
      name: 'Deborah Eyoma',
      avatar: avatar('photo-1554151228-14d9def656e4'),
      role: 'Senior Frontend Developer',
      matchPercentage: 95,
      appliedDate: '2024-03-15',
      status: 'New',
      email: 'deborah.eyoma@example.com',
      phone: '+1 (555) 452-4667',
      location: 'Lagos',
      experience: '8 years',
      currentRole: 'Senior Frontend Developer at Tech Solutions Inc.',
      aiMatch: { overall: 95, skills: 98, experience: 92 },
      insights: [
        'Strong expertise in React and TypeScript',
        'Led teams of 5+ developers',
        'Contributed to open source projects',
      ],
      skills: ['React', 'TypeScript', 'Node.js', 'AWS', 'GraphQL', 'Next.js', 'Tailwind CSS'],
      workHistory: [
        {
          company: 'Tech Solutions Inc.',
          role: 'Senior Frontend Developer',
          duration: '2020 - Present',
          description: 'Led development of flagship product; improved performance by 40%.',
          highlights: [
            'Architected component library with Storybook',
            'Mentored junior developers',
            'Drove accessibility to WCAG AA',
          ],
        },
        {
          company: 'Bright Apps',
          role: 'Frontend Developer',
          duration: '2017 - 2020',
          description: 'Built scalable dashboards with React and Redux.',
          highlights: ['Shipped 15+ features', 'Setup CI/CD pipelines', 'Improved test coverage to 80%'],
        },
      ],
      education: [
        { school: 'Stanford University', degree: 'M.S. Computer Science', year: '2016' },
      ],
      activities: [
        { type: 'system', action: 'Auto-shortlist recommendation', date: '2025-03-15', time: '09:12' },
        { type: 'note', action: 'Strong portfolio; follow up for coding task.', date: '2025-03-16', time: '11:30' },
        { type: 'email', action: 'Sent coding challenge link', date: '2025-03-16', time: '15:10' },
      ],
    },
  },
  {
    id: 2,
    candidate: {
      name: 'Sarah Wilson',
      avatar: avatar('photo-1494790108377-be9c29b29330'), // johnson: existing unsplash id retained
      role: 'Senior Frontend Developer',
      matchPercentage: 92,
      appliedDate: '2024-03-05',
      status: 'Under Review',
      email: 'sarah.wilson@email.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      experience: '8 years',
      currentRole: 'Frontend Developer at Tech Co',
      aiMatch: { overall: 92, skills: 95, experience: 88 },
      insights: [
        'Strong expertise in React and modern frontend frameworks',
        'Led multiple successful projects with similar requirements',
        'Active contributor to open source projects',
      ],
      skills: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'AWS'],
      workHistory: [
        {
          company: 'Tech Co',
          role: 'Frontend Developer',
          duration: '2020 - Present',
          description: 'Led frontend development for multiple high-impact projects.',
          highlights: ['Improved Core Web Vitals', 'Migrated to Next.js 14', 'Introduced performance budgets'],
        },
      ],
      education: [
        { school: 'University of California', degree: 'BS Computer Science', year: '2016' },
      ],
      activities: [
        { type: 'system', action: 'Application received', date: '2024-03-05', time: '14:30' },
      ],
    },
  },
  {
    id: 3,
    candidate: {
      name: 'Michael Hart',
      avatar: avatar('photo-1527980965255-d3b416303d12'),
      role: 'Frontend Engineer',
      matchPercentage: 80,
      appliedDate: '2024-03-15',
      status: 'Under Review',
      email: 'michael.hart@example.com',
      phone: '+44 20 7946 0958',
      location: 'London, UK',
      experience: '6 years',
      currentRole: 'Frontend Engineer at FinTech Ltd',
      aiMatch: { overall: 80, skills: 84, experience: 76 },
      insights: ['Good grasp of performance tuning', 'Strong testing practices'],
      skills: ['React', 'Jest', 'Cypress', 'TypeScript', 'GraphQL'],
      workHistory: [
        { company: 'FinTech Ltd', role: 'Frontend Engineer', duration: '2021 - Present', description: 'Owns customer portal UI.' },
      ],
      education: [{ school: 'King’s College London', degree: 'BSc Computer Science', year: '2018' }],
      activities: [{ type: 'note', action: 'Schedule technical interview', date: '2025-03-18', time: '10:00' }],
    },
  },
  {
    id: 4,
    candidate: {
      name: 'Amelia Brown',
      avatar: avatar('photo-1544723795-3fb6469f5b39'),
      role: 'UI Engineer',
      matchPercentage: 56,
      appliedDate: '2024-03-15',
      status: 'Under Review',
      email: 'amelia.brown@example.com',
      phone: '+1 (555) 805-3111',
      location: 'Austin, TX',
      experience: '4 years',
      currentRole: 'UI Engineer at Designly',
      aiMatch: { overall: 56, skills: 60, experience: 50 },
      insights: ['Great design sense; weaker on algorithms'],
      skills: ['React', 'Tailwind CSS', 'Figma', 'Framer Motion'],
      workHistory: [
        { company: 'Designly', role: 'UI Engineer', duration: '2021 - Present', description: 'Delivers polished UI and animations.' },
      ],
      education: [{ school: 'SCAD', degree: 'BFA Interaction Design', year: '2020' }],
      activities: [{ type: 'system', action: 'Under review by recruiter', date: '2025-03-16', time: '13:25' }],
    },
  },
  {
    id: 5,
    candidate: {
      name: 'John Keller',
      avatar: avatar('photo-1541534401786-2077eed87a62'),
      role: 'Frontend Developer',
      matchPercentage: 0,
      appliedDate: '2024-03-15',
      status: 'Rejected',
      email: 'john.keller@example.com',
      phone: '+1 (555) 927-0090',
      location: 'Remote',
      experience: '2 years',
      currentRole: 'Contractor',
      aiMatch: { overall: 0, skills: 5, experience: 0 },
      insights: ['Does not meet minimum requirements'],
      skills: ['HTML', 'CSS'],
      workHistory: [],
      education: [],
      activities: [{ type: 'system', action: 'Application rejected', date: '2025-03-16', time: '08:20' }],
    },
  },
];

// tomiwa: Status badge component with brand-aligned colors
const StatusBadge = ({ status }) => {
  // tomiwa: new new - map each status to brand tints
  const statusStyles = {
    New: 'bg-brand-aqua/10 text-brand-aqua',
    'Under Review': 'bg-brand-yellow/10 text-brand-yellow',
    Shortlisted: 'bg-emerald-100 text-emerald-700', // johnson: emerald kept for semantic success
    Rejected: 'bg-red-100 text-red-700',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyles[status]}`}>
      {status}
    </span>
  );
};

// tomiwa: Match percentage indicator component — colors by thresholds
const MatchIndicator = ({ percentage }) => {
  const getColor = (value) => {
    if (value >= 90) return 'text-brand-aqua';
    if (value >= 70) return 'text-brand-yellow';
    return 'text-neutral-500';
  };

  return (
    <div className="flex items-center gap-1">
      <StarIcon className={`w-5 h-5 ${getColor(percentage)}`} />
      <span className={`font-medium ${getColor(percentage)}`}>{percentage}%</span>
    </div>
  );
};

// tomiwa: Activity item component — renders timeline items with icons
const ActivityItem = ({ activity }) => {
  const icons = {
    system: DocumentTextIcon,
    call: PhoneIcon,
    email: EnvelopeIcon,
    note: ChatBubbleLeftIcon,
  };
  const Icon = icons[activity.type] || DocumentTextIcon; // johnson: default fallback preserved

  return (
    <div className="flex gap-4 py-3">
      <div className="flex-shrink-0">
        <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center">
          <Icon className="w-4 h-4 text-neutral-500" />
        </div>
      </div>
      <div className="flex-1">
        <p className="text-sm text-neutral-900">{activity.action}</p>
        <div className="flex items-center gap-2 mt-1">
          <CalendarIcon className="w-4 h-4 text-neutral-400" />
          <span className="text-xs text-neutral-500">{activity.date}</span>
          <ClockIcon className="w-4 h-4 text-neutral-400 ml-2" />
          <span className="text-xs text-neutral-500">{activity.time}</span>
        </div>
      </div>
    </div>
  );
};

// tomiwa: Empty state component for no applications — kept but brand-styled
const EmptyState = () => {
  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="max-w-md w-full text-center">
        <div className="mb-6 relative">
          <div className="w-24 h-24 bg-brand-orange/10 rounded-full flex items-center justify-center mx-auto">
            <UserPlusIcon className="w-12 h-12 text-brand-orange" />
          </div>
          <div className="absolute top-16 right-1/3">
            <div className="w-12 h-12 bg-brand-aqua/10 rounded-full flex items-center justify-center">
              <MegaphoneIcon className="w-6 h-6 text-brand-aqua" />
            </div>
          </div>
        </div>
        
        <h2 className="text-2xl font-display font-bold text-brand-black mb-3">
          No Applications Yet
        </h2>
        <p className="text-neutral-500 mb-8">
          Your job posting hasn't received any applications yet. Share your job posting to attract qualified candidates.
        </p>
        
        <div className="space-y-4">
          <button className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:scale-105">
            <ShareIcon className="w-5 h-5" />
            Share Job Posting
          </button>
          <Link 
            href="/post-job/preview" 
            className="w-full bg-white border border-neutral-200 hover:border-brand-aqua text-neutral-700 px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 hover:bg-neutral-50"
          >
            <DocumentTextIcon className="w-5 h-5" />
            Preview Job Posting
          </Link>
        </div>
        
        <div className="mt-8 p-4 bg-neutral-50 rounded-xl">
          <h3 className="font-medium text-neutral-900 mb-2">Quick Tips</h3>
          <ul className="text-sm text-neutral-600 space-y-2 text-left">
            <li className="flex items-start gap-2">
              <CheckCircleIcon className="w-5 h-5 text-brand-aqua flex-shrink-0 mt-0.5" />
              Share on social media platforms
            </li>
            <li className="flex items-start gap-2">
              <CheckCircleIcon className="w-5 h-5 text-brand-aqua flex-shrink-0 mt-0.5" />
              Send to relevant professional networks
            </li>
            <li className="flex items-start gap-2">
              <CheckCircleIcon className="w-5 h-5 text-brand-aqua flex-shrink-0 mt-0.5" />
              Consider promoting your job posting
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// tomiwa: Tooltip component for showing additional information
const Tooltip = ({ children, content }) => {
  return (
    <div className="group relative inline-block">
      {children}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-neutral-800 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 w-64 z-20">
        {content}
        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-2 border-8 border-transparent border-t-neutral-800" />
      </div>
    </div>
  );
};

// tomiwa: KnockoutCriteria component to show must-have requirements
const KnockoutCriteria = ({ criteria }) => {
  return (
    <div className="space-y-3">
      {criteria.map((item, index) => (
        <div key={index} className="flex items-center gap-3 p-3 bg-neutral-50 rounded-xl">
          {item.passed ? (
            <CheckCircleIcon className="w-6 h-6 text-emerald-500" />
          ) : (
            <XCircleIcon className="w-6 h-6 text-red-500" />
          )}
          <div>
            <p className="font-medium text-neutral-900">{item.requirement}</p>
            <p className="text-sm text-neutral-500">{item.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

// tomiwa: ScreeningQuestion component for Q&A display
const ScreeningQuestion = ({ question, answer, assessment }) => {
  const bgColor = {
    good: 'bg-emerald-50',
    concern: 'bg-orange-50',
    neutral: 'bg-neutral-50'
  }[assessment];

  const textColor = {
    good: 'text-emerald-700',
    concern: 'text-orange-700',
    neutral: 'text-neutral-700'
  }[assessment];

  return (
    <div className={`p-4 rounded-xl ${bgColor}`}>
      <p className="font-medium text-neutral-900 mb-2">{question}</p>
      <p className={`text-sm ${textColor}`}>{answer}</p>
    </div>
  );
};

export default function Applications() {
  // johnson: keep selected candidate state; default to the first candidate
  const [selectedCandidate, setSelectedCandidate] = useState(mockApplications[0]?.candidate);
  // tomiwa: new new - local UI state for simple filtering on the left list
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // tomiwa: new new - compute filtered list efficiently
  const filteredApplications = useMemo(() => {
    return mockApplications.filter((app) => {
      const matchesSearch = `${app.candidate.name} ${app.candidate.role}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter ? app.candidate.status === statusFilter : true;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  // tomiwa: If there are no applications show the empty state
  if (mockApplications.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-50 flex">
        <EmployerSidebar />
        <div className="flex-1 ml-64">
          <div className="h-screen flex">
            <EmptyState />
          </div>
        </div>
      </div>
    );
  }

  // tomiwa: Update the ActionButtons component with enhanced styling and tooltips
  const ActionButtons = ({ status }) => {
    switch (status) {
      case 'New':
        return (
          <div className="flex gap-3">
            <Tooltip content="Move candidate to shortlist for further evaluation">
              <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-medium transition-all duration-300 flex items-center gap-2">
                <CheckCircleIcon className="w-5 h-5" />
                Shortlist
              </button>
            </Tooltip>
            <Tooltip content="Remove candidate from consideration">
              <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2.5 rounded-xl font-medium transition-all duration-300 flex items-center gap-2">
                <XCircleIcon className="w-5 h-5" />
                Reject
              </button>
            </Tooltip>
            <Tooltip content="Review candidate later">
              <button className="bg-neutral-100 hover:bg-neutral-200 text-neutral-700 px-6 py-2.5 rounded-xl font-medium transition-all duration-300 flex items-center gap-2">
                <ClockIcon className="w-5 h-5" />
                Ignore
              </button>
            </Tooltip>
          </div>
        );
      case 'Under Review':
        return (
          <div className="flex gap-3">
            <button className="bg-brand-aqua hover:bg-brand-aqua/90 text-white px-4 py-2 rounded-xl font-medium transition-all duration-300">
              Move to Shortlist
            </button>
            <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl font-medium transition-all duration-300">
              Reject
            </button>
          </div>
        );
      case 'Rejected':
        return (
          <button className="bg-neutral-100 hover:bg-neutral-200 text-neutral-700 px-4 py-2 rounded-xl font-medium transition-all duration-300">
            Reconsider
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex">
      {/* Sidebar */}
      {/* johnson: layout component retained */}
      <EmployerSidebar />

      {/* Main Content */}
      <div className="flex-1 ml-64">
        <div className="h-screen flex">
          {/* Left Panel - Applications List */}
          <div className="w-1/3 border-r border-neutral-200 bg-white overflow-y-auto">
            <div className="p-6 border-b border-neutral-200">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <BriefcaseIcon className="w-6 h-6 text-brand-aqua" />
                  <h1 className="text-xl font-display font-bold text-brand-black">All Applications</h1>
                </div>
                <button className="inline-flex items-center gap-2 text-neutral-500 hover:text-brand-aqua">
                  <ArrowPathIcon className="w-5 h-5" />
                  <span className="text-sm">Refresh</span>
                </button>
              </div>

              {/* Search and filters */}
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Search candidates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-brand-aqua/20 focus:border-brand-aqua"
                />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-brand-aqua/20 focus:border-brand-aqua bg-white"
                >
                  <option value="">All Status</option>
                  <option value="New">New</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Shortlisted">Shortlisted</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>

            {/* Applications list */}
            <div className="divide-y divide-neutral-100">
              {filteredApplications.map((application) => (
                <button
                  key={application.id}
                  className="w-full p-4 hover:bg-neutral-50 transition-colors duration-200 text-left"
                  onClick={() => setSelectedCandidate(application.candidate)}
                >
                  <div className="flex items-start gap-4">
                    <Image
                      src={application.candidate.avatar}
                      alt={application.candidate.name}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-medium text-neutral-900">{application.candidate.name}</h3>
                          <p className="text-sm text-neutral-500">{application.candidate.role}</p>
                        </div>
                        <StatusBadge status={application.candidate.status} />
                      </div>
                      <div className="flex items-center gap-4 mt-2">
                        <MatchIndicator percentage={application.candidate.matchPercentage} />
                        <p className="text-xs text-neutral-500">
                          Applied {application.candidate.appliedDate}
                        </p>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right Panel - Candidate Profile */}
          {selectedCandidate && (
            <div className="flex-1 overflow-y-auto">
              {/* Header with candidate identity + actions */}
              <div className="p-6 border-b border-neutral-200 sticky top-0 bg-white z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Image
                      src={selectedCandidate.avatar}
                      alt={selectedCandidate.name}
                      width={64}
                      height={64}
                      className="rounded-full"
                    />
                    <div>
                      <h2 className="text-2xl font-display font-bold text-brand-black">
                        {selectedCandidate.name}
                      </h2>
                      <p className="text-neutral-500">{selectedCandidate.currentRole}</p>
                    </div>
                  </div>
                  <ActionButtons status={selectedCandidate.status} />
                </div>
              </div>

              {/* Content sections */}
              <div className="p-6 space-y-8">
                {/* Contact Information */}
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-lg font-medium text-neutral-900 mb-4">Contact Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <EnvelopeIcon className="w-5 h-5 text-neutral-400" />
                      <span className="text-neutral-700">{selectedCandidate.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <PhoneIcon className="w-5 h-5 text-neutral-400" />
                      <span className="text-neutral-700">{selectedCandidate.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPinIcon className="w-5 h-5 text-neutral-400" />
                      <span className="text-neutral-700">{selectedCandidate.location}</span>
                    </div>
                  </div>
                </div>

                {/* Knockout Criteria - new section */}
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-lg font-medium text-neutral-900 mb-4">Must-Have Requirements</h3>
                  <KnockoutCriteria
                    criteria={[
                      {
                        requirement: '5+ years React experience',
                        value: '8 years of React development',
                        passed: true
                      },
                      {
                        requirement: 'TypeScript proficiency',
                        value: 'Advanced TypeScript, 4 years',
                        passed: true
                      },
                      {
                        requirement: 'Team leadership experience',
                        value: 'Led 5+ developer team',
                        passed: true
                      }
                    ]}
                  />
                </div>

                {/* AI Match Analysis - enhanced version */}
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-lg font-medium text-neutral-900 mb-4">AI Match Analysis</h3>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <Tooltip content="Based on required skills match and proficiency levels">
                      <div className="p-4 bg-neutral-50 rounded-xl">
                        <p className="text-sm text-neutral-500">Skills Match</p>
                        <p className="text-2xl font-bold text-brand-aqua">
                          {selectedCandidate.aiMatch.skills}%
                        </p>
                      </div>
                    </Tooltip>
                    <Tooltip content="Evaluated against required years and relevance of experience">
                      <div className="p-4 bg-neutral-50 rounded-xl">
                        <p className="text-sm text-neutral-500">Experience Match</p>
                        <p className="text-2xl font-bold text-brand-aqua">
                          {selectedCandidate.aiMatch.experience}%
                        </p>
                      </div>
                    </Tooltip>
                    <Tooltip content="Analysis of work style and company culture alignment">
                      <div className="p-4 bg-neutral-50 rounded-xl">
                        <p className="text-sm text-neutral-500">Culture Fit</p>
                        <p className="text-2xl font-bold text-brand-aqua">
                          {selectedCandidate.aiMatch.overall}%
                        </p>
                      </div>
                    </Tooltip>
                  </div>
                </div>

                {/* Screening Questions - new section */}
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-lg font-medium text-neutral-900 mb-4">Screening Questions</h3>
                  <div className="space-y-4">
                    <ScreeningQuestion
                      question="What is your experience with large-scale React applications?"
                      answer="I've led the development of enterprise React applications serving 100K+ daily users. Implemented micro-frontend architecture and optimized performance with code splitting and lazy loading."
                      assessment="good"
                    />
                    <ScreeningQuestion
                      question="How do you handle technical debt?"
                      answer="I maintain a debt backlog and allocate 20% of sprint capacity to addressing it. Recently reduced build time by 40% through systematic dependency cleanup."
                      assessment="good"
                    />
                    <ScreeningQuestion
                      question="What's your preferred work environment?"
                      answer="I prefer a mix of remote and office work, with flexible hours. I value autonomous work but enjoy regular team collaboration."
                      assessment="neutral"
                    />
                  </div>
                </div>

                {/* AI Assistant - enhanced version */}
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-lg font-medium text-neutral-900 mb-4">AI Assistant</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    <Tooltip content="Get a concise summary of candidate's experience and skills">
                      <button className="px-4 py-3 rounded-xl bg-brand-aqua/10 text-brand-aqua hover:bg-brand-aqua/20 transition flex items-center justify-center gap-2">
                        <DocumentTextIcon className="w-5 h-5" />
                        Summarize Resume
                      </button>
                    </Tooltip>
                    <Tooltip content="Generate role-specific technical and behavioral questions">
                      <button className="px-4 py-3 rounded-xl bg-brand-yellow/10 text-brand-yellow hover:bg-brand-yellow/20 transition flex items-center justify-center gap-2">
                        <ChatBubbleLeftIcon className="w-5 h-5" />
                        Suggest Questions
                      </button>
                    </Tooltip>
                    <Tooltip content="Create a personalized outreach email draft">
                      <button className="px-4 py-3 rounded-xl bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition flex items-center justify-center gap-2">
                        <EnvelopeIcon className="w-5 h-5" />
                        Draft Email
                      </button>
                    </Tooltip>
                  </div>
                  <p className="text-xs text-neutral-500 mt-3 flex items-center gap-1">
                    <InformationCircleIcon className="w-4 h-4" />
                    AI drafts only — nothing is sent without your approval
                  </p>
                </div>

                {/* Quick Actions - enhanced version */}
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-lg font-medium text-neutral-900 mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    <Tooltip content={selectedCandidate.status !== 'Shortlisted' ? 'Shortlist candidate first' : 'Schedule an interview'}>
                      <button 
                        className={`px-4 py-3 rounded-xl inline-flex items-center justify-center gap-2 transition
                          ${selectedCandidate.status === 'Shortlisted' 
                            ? 'bg-brand-aqua text-white hover:bg-brand-aqua/90' 
                            : 'bg-neutral-100 text-neutral-400 cursor-not-allowed'}`}
                        disabled={selectedCandidate.status !== 'Shortlisted'}
                      >
                        <CalendarIcon className="w-5 h-5" />
                        Schedule Interview
                      </button>
                    </Tooltip>
                    <Tooltip content={selectedCandidate.status !== 'Shortlisted' ? 'Shortlist candidate first' : 'Send assessment test'}>
                      <button 
                        className={`px-4 py-3 rounded-xl inline-flex items-center justify-center gap-2 transition
                          ${selectedCandidate.status === 'Shortlisted' 
                            ? 'bg-brand-yellow text-white hover:bg-brand-yellow/90' 
                            : 'bg-neutral-100 text-neutral-400 cursor-not-allowed'}`}
                        disabled={selectedCandidate.status !== 'Shortlisted'}
                      >
                        <DocumentTextIcon className="w-5 h-5" />
                        Request Assessment
                      </button>
                    </Tooltip>
                    <button className="px-4 py-3 rounded-xl bg-neutral-100 text-neutral-700 hover:bg-neutral-200 transition inline-flex items-center justify-center gap-2">
                      <ShareIcon className="w-5 h-5" />
                      Share Profile
                    </button>
                    <button className="px-4 py-3 rounded-xl bg-neutral-100 text-neutral-700 hover:bg-neutral-200 transition inline-flex items-center justify-center gap-2">
                      <ArrowDownTrayIcon className="w-5 h-5" />
                      Download Resume
                    </button>
                  </div>
                </div>

                {/* Skills */}
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-lg font-medium text-neutral-900 mb-4">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCandidate.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-brand-aqua/10 text-brand-aqua rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Work History */}
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-lg font-medium text-neutral-900 mb-4">Experience</h3>
                  <div className="space-y-6">
                    {selectedCandidate.workHistory.map((work, index) => (
                      <div key={index} className="border-l-2 border-neutral-200 pl-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-neutral-900">{work.role}</h4>
                          <span className="text-sm text-neutral-500">{work.duration}</span>
                        </div>
                        <p className="text-sm text-neutral-500">{work.company}</p>
                        <p className="text-sm text-neutral-700 mt-2">{work.description}</p>
                        {work.highlights && work.highlights.length > 0 && (
                          <ul className="mt-2 space-y-1">
                            {work.highlights.map((h, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-neutral-700">
                                <CheckCircleIcon className="w-4 h-4 text-brand-aqua mt-0.5" />
                                <span>{h}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Education */}
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-lg font-medium text-neutral-900 mb-4">Education</h3>
                  <div className="space-y-4">
                    {selectedCandidate.education.map((edu, index) => (
                      <div key={index}>
                        <h4 className="font-medium text-neutral-900">{edu.degree}</h4>
                        <p className="text-sm text-neutral-500">{edu.school}</p>
                        <p className="text-sm text-neutral-500">Graduated {edu.year}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Activity & Notes */}
                <div className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-neutral-900">Activity & Notes</h3>
                    <button className="text-brand-aqua hover:text-brand-orange">Add Note</button>
                  </div>
                  <div className="divide-y divide-neutral-100">
                    {selectedCandidate.activities.map((activity, index) => (
                      <ActivityItem key={index} activity={activity} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 