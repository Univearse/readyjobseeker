
import Image from 'next/image';
import Link from 'next/link';
import {
  BriefcaseIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  EllipsisVerticalIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ExclamationTriangleIcon,
  DocumentDuplicateIcon,
  PencilSquareIcon,
  UserGroupIcon,
  TrashIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import EmployerSidebar from '@/components/ui/EmployerSidebar';

// tomiwa: Mock data for demonstration
const mockJobs = [
  {
    id: 1,
    title: 'Senior Frontend Developer',
    company: 'Tech Corp',
    status: 'Active',
    applications: 45,
    postedDate: '2024-03-01',
  },
  {
    id: 2,
    title: 'Product Manager',
    company: 'Tech Corp',
    status: 'Closed',
    applications: 72,
    postedDate: '2024-02-15',
  },
  {
    id: 3,
    title: 'UX Designer',
    company: 'Tech Corp',
    status: 'Draft',
    applications: 0,
    postedDate: '-',
  },
  // Add more mock jobs here...
];

// tomiwa: Status badge component with appropriate colors
const StatusBadge = ({ status }) => {
  const statusStyles = {
    Active: 'bg-emerald-100 text-emerald-700',
    Draft: 'bg-amber-100 text-amber-700',
    Closed: 'bg-neutral-100 text-neutral-700',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyles[status]}`}>
      {status}
    </span>
  );
};

// tomiwa: Action menu component for the three-dot menu
const ActionMenu = ({ job }) => {
  return (
    <div className="relative group">
      <button className="p-2 rounded-lg hover:bg-neutral-100">
        <EllipsisVerticalIcon className="w-5 h-5 text-neutral-500" />
      </button>
      
      <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-neutral-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
        <div className="py-2">
          <Link href={`/jobs/${job.id}/applications`} className="flex items-center gap-2 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50">
            <UserGroupIcon className="w-4 h-4" />
            View Applications
          </Link>
          <Link href={`/jobs/${job.id}/edit`} className="flex items-center gap-2 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50">
            <PencilSquareIcon className="w-4 h-4" />
            Edit
          </Link>
          <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50">
            <DocumentDuplicateIcon className="w-4 h-4" />
            Duplicate
          </button>
          <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50">
            <XCircleIcon className="w-4 h-4" />
            Close Job
          </button>
          <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50">
            <TrashIcon className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default function MyJobs() {
  return (
    <div className="min-h-screen bg-neutral-50 flex">
      {/* Sidebar */}
      <EmployerSidebar />

      {/* Main Content */}
      <div className="flex-1 ml-64">
        <main className="max-w-7xl mx-auto px-8 py-12">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <BriefcaseIcon className="w-8 h-8 text-brand-aqua" />
              <h1 className="text-3xl font-display font-bold text-brand-black">My Jobs</h1>
            </div>
            <Link
              href="/post-job"
              className="bg-brand-orange hover:bg-brand-orange/90 text-white px-6 py-2.5 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 shadow-lg hover:scale-105"
            >
              <BriefcaseIcon className="w-5 h-5" />
              Post a Job
            </Link>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Table Section */}
            <div className="lg:col-span-3 space-y-6">
              {/* Search and Filters */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Search Bar */}
                  <div className="flex-1 relative">
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                    <input
                      type="text"
                      placeholder="Search jobs..."
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-brand-aqua/20 focus:border-brand-aqua"
                    />
                  </div>
                  
                  {/* Filter Dropdown */}
                  <div className="flex gap-4">
                    <select className="px-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-brand-aqua/20 focus:border-brand-aqua bg-white">
                      <option value="">All Status</option>
                      <option value="active">Active</option>
                      <option value="draft">Draft</option>
                      <option value="closed">Closed</option>
                    </select>
                    
                    <select className="px-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-brand-aqua/20 focus:border-brand-aqua bg-white">
                      <option value="">Sort by</option>
                      <option value="newest">Newest First</option>
                      <option value="oldest">Oldest First</option>
                      <option value="applications">Most Applications</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Jobs Table */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-neutral-50 border-b border-neutral-100">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-medium text-neutral-500">Job Title & Company</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-neutral-500">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-neutral-500">Applications</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-neutral-500">Posted Date</th>
                      <th className="px-6 py-4 text-right text-sm font-medium text-neutral-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {mockJobs.map((job) => (
                      <tr key={job.id} className="hover:bg-neutral-50">
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="font-medium text-neutral-900">{job.title}</span>
                            <span className="text-sm text-neutral-500">{job.company}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <StatusBadge status={job.status} />
                        </td>
                        <td className="px-6 py-4">
                          <Link href={`/jobs/${job.id}/applications`} className="text-brand-aqua hover:text-brand-orange">
                            {job.applications} applicants
                          </Link>
                        </td>
                        <td className="px-6 py-4 text-neutral-500">
                          {job.postedDate}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <ActionMenu job={job} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Pagination */}
                <div className="px-6 py-4 border-t border-neutral-100 flex items-center justify-between">
                  <div className="text-sm text-neutral-500">
                    Showing 1-10 of 24 jobs
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 rounded-lg hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed">
                      <ChevronLeftIcon className="w-5 h-5 text-neutral-500" />
                    </button>
                    <div className="flex items-center gap-1">
                      <button className="px-3 py-1 rounded-lg bg-brand-aqua text-white">1</button>
                      <button className="px-3 py-1 rounded-lg hover:bg-neutral-100">2</button>
                      <button className="px-3 py-1 rounded-lg hover:bg-neutral-100">3</button>
                    </div>
                    <button className="p-2 rounded-lg hover:bg-neutral-100">
                      <ChevronRightIcon className="w-5 h-5 text-neutral-500" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="space-y-6">
              {/* Active Jobs */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-2">
                  <BriefcaseIcon className="w-5 h-5 text-brand-aqua" />
                  <h3 className="font-medium">Active Jobs</h3>
                </div>
                <p className="text-3xl font-bold text-neutral-900">12</p>
                <Link href="/jobs/active" className="text-sm text-brand-aqua hover:text-brand-orange mt-2 inline-block">
                  View active jobs →
                </Link>
              </div>

              {/* Jobs Expiring Soon */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-2">
                  <ExclamationTriangleIcon className="w-5 h-5 text-amber-500" />
                  <h3 className="font-medium">Expiring Soon</h3>
                </div>
                <p className="text-3xl font-bold text-neutral-900">3</p>
                <Link href="/jobs/expiring" className="text-sm text-brand-aqua hover:text-brand-orange mt-2 inline-block">
                  Review expiring jobs →
                </Link>
              </div>

              {/* Draft Jobs */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-2">
                  <DocumentDuplicateIcon className="w-5 h-5 text-neutral-500" />
                  <h3 className="font-medium">Drafts</h3>
                </div>
                <p className="text-3xl font-bold text-neutral-900">2</p>
                <Link href="/jobs/drafts" className="text-sm text-brand-aqua hover:text-brand-orange mt-2 inline-block">
                  Complete drafts →
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 