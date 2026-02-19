import Image from 'next/image';
import Link from 'next/link';
import {
  BriefcaseIcon,
  UserGroupIcon,
  UserPlusIcon,
  CheckCircleIcon,
  CreditCardIcon,
  DocumentMagnifyingGlassIcon,
  SparklesIcon,
  ChartBarIcon,
  ChatBubbleLeftIcon,
  AcademicCapIcon,
  RocketLaunchIcon,
  ClockIcon,
  StarIcon,
  BuildingOfficeIcon,
} from '@heroicons/react/24/outline';
import DashboardCard from '@/components/ui/DashboardCard.js';
import JobsTable from '@/components/ui/JobsTable.jsx';
import InsightsCard, { PerformanceMetric, SourceBreakdown } from '@/components/ui/InsightsCard.jsx';
import QuickLink from '@/components/ui/QuickLink.jsx';
import EmployerDashboardLayout from '@/components/layouts/EmployerDashboardLayout.jsx';

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
];

const mockSources = [
  { name: 'Direct Apply', percentage: 65 },
  { name: 'CV Database', percentage: 35 },
];

const mockSuggestedCandidates = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'Senior Frontend Developer',
    matchScore: 95,
    skills: ['React', 'TypeScript', 'UI/UX'],
  },
  {
    id: 2,
    name: 'Michael Rodriguez',
    role: 'Product Manager',
    matchScore: 92,
    skills: ['Agile', 'Product Strategy', 'User Research'],
  },
];

export default function EmployerDashboard() {
  return (
    <EmployerDashboardLayout>
      <div>
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-brand-aqua to-[#0C2E3C]">
          <div className="max-w-7xl mx-auto px-8 py-12">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
              <div className="flex items-center gap-6">
                <div className="bg-white p-3 rounded-2xl shadow-lg">
                  <Image
                    src="/images/logo.png"
                    alt="Company Logo"
                    width={56}
                    height={56}
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <h1 className="text-3xl font-display font-bold text-white">
                    Welcome back, Tech Corp
                  </h1>
                  <p className="text-white/80 mt-1">Your hiring command center</p>
                </div>
              </div>
              <Link
                href="/post-job"
                className="bg-brand-orange hover:bg-brand-orange/90 text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 shadow-lg hover:scale-105"
              >
                <BriefcaseIcon className="w-5 h-5" />
                Post a Job
              </Link>
            </div>
          </div>
        </div>

        <main className="max-w-7xl mx-auto px-8 py-12">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
            <DashboardCard
              icon={BriefcaseIcon}
              title="Active Jobs"
              value="12"
              subtitle={<Link href="/jobs" className="text-brand-aqua hover:text-brand-orange">View all jobs →</Link>}
              iconColor="text-brand-aqua"
              className="hover:scale-105 transition-transform duration-300"
            />
            <DashboardCard
              icon={UserGroupIcon}
              title="Total Applications"
              value="248"
              subtitle="Last 30 days"
              iconColor="text-brand-orange"
              className="hover:scale-105 transition-transform duration-300"
            />
            <DashboardCard
              icon={UserPlusIcon}
              title="Shortlisted"
              value="45"
              subtitle={<Link href="/dashboard/employer/my-jobs/1/shortlisted" className="text-brand-aqua hover:text-brand-orange">View shortlist →</Link>}
              iconColor="text-brand-yellow"
              className="hover:scale-105 transition-transform duration-300"
            />
            <DashboardCard
              icon={ClockIcon}
              title="Interviews"
              value="15"
              subtitle="This week"
              iconColor="text-brand-aqua"
              className="hover:scale-105 transition-transform duration-300"
            />
            <DashboardCard
              icon={CheckCircleIcon}
              title="Hires"
              value="8"
              subtitle="This quarter"
              iconColor="text-emerald-500"
              className="hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Jobs Section */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <BriefcaseIcon className="w-7 h-7 text-brand-aqua" />
                    <h2 className="text-2xl font-display font-bold text-brand-black">Recent Jobs</h2>
                  </div>
                  <Link
                    href="/jobs"
                    className="text-sm text-brand-aqua hover:text-brand-orange font-medium"
                  >
                    View all jobs →
                  </Link>
                </div>
                <JobsTable jobs={mockJobs} />
              </div>
            </div>

            {/* Insights Section */}
            <div className="space-y-8">
              <InsightsCard 
                title="Top Job Performance"
                icon={ChartBarIcon}
                iconColor="text-brand-aqua"
              >
                <PerformanceMetric
                  label="Senior Frontend Developer"
                  value="45 applications"
                  trend={12}
                />
              </InsightsCard>

              <InsightsCard 
                title="Candidate Source Breakdown"
                icon={UserGroupIcon}
                iconColor="text-brand-orange"
              >
                <SourceBreakdown sources={mockSources} />
              </InsightsCard>

              <InsightsCard 
                title="Pending Actions"
                icon={ClockIcon}
                iconColor="text-brand-yellow"
              >
                <div className="text-sm text-neutral-600">
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 p-3 rounded-xl bg-neutral-50 hover:bg-neutral-100 transition-colors">
                      <span className="w-2 h-2 bg-brand-yellow rounded-full" />
                      <span className="flex-grow">2 job posts in draft</span>
                      <Link href="/jobs/drafts" className="text-brand-aqua hover:text-brand-orange">
                        Complete →
                      </Link>
                    </li>
                    <li className="flex items-center gap-3 p-3 rounded-xl bg-neutral-50 hover:bg-neutral-100 transition-colors">
                      <span className="w-2 h-2 bg-red-400 rounded-full" />
                      <span className="flex-grow">3 jobs expiring this week</span>
                      <Link href="/jobs/expiring" className="text-brand-aqua hover:text-brand-orange">
                        Review →
                      </Link>
                    </li>
                  </ul>
                </div>
              </InsightsCard>
            </div>
          </div>

          {/* Quick Access Grid */}
          <div className="mt-12">
            <h2 className="text-2xl font-display font-bold text-brand-black mb-8 flex items-center gap-3">
              <RocketLaunchIcon className="w-7 h-7 text-brand-aqua" />
              Quick Access
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <QuickLink
                href="/subscription"
                icon={StarIcon}
                label="Subscription Plans"
                className="aspect-square bg-white rounded-2xl shadow-lg p-8 hover:scale-105 transition-all duration-300 hover:shadow-xl group"
                iconClassName="w-12 h-12 text-brand-aqua group-hover:text-brand-orange transition-colors"
              />
              <QuickLink
                href="/cv-database"
                icon={DocumentMagnifyingGlassIcon}
                label="CV Database"
                className="aspect-square bg-white rounded-2xl shadow-lg p-8 hover:scale-105 transition-all duration-300 hover:shadow-xl group"
                iconClassName="w-12 h-12 text-brand-aqua group-hover:text-brand-orange transition-colors"
              />
              <QuickLink
                href="/ai-tools"
                icon={SparklesIcon}
                label="AI Hiring Tools"
                className="aspect-square bg-white rounded-2xl shadow-lg p-8 hover:scale-105 transition-all duration-300 hover:shadow-xl group"
                iconClassName="w-12 h-12 text-brand-aqua group-hover:text-brand-orange transition-colors"
              />
              <QuickLink
                href="/dashboard/employer/reports"
                icon={ChartBarIcon}
                label="Reports & Analytics"
                className="aspect-square bg-white rounded-2xl shadow-lg p-8 hover:scale-105 transition-all duration-300 hover:shadow-xl group"
                iconClassName="w-12 h-12 text-brand-aqua group-hover:text-brand-orange transition-colors"
              />
            </div>
          </div>
        </main>
      </div>
    </EmployerDashboardLayout>
  );
} 