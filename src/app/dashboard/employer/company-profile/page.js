import Image from 'next/image';
import Link from 'next/link';
import {
  BuildingOfficeIcon,
  MapPinIcon,
  GlobeAltIcon,
  UserGroupIcon,
  PencilSquareIcon,
  PhoneIcon,
  EnvelopeIcon,
  LinkIcon,
  ChevronDownIcon,
  PlusIcon,
  CheckIcon,
  XMarkIcon,
  CloudArrowUpIcon,
} from '@heroicons/react/24/outline';
import EmployerSidebar from '@/components/ui/EmployerSidebar';

// tomiwa: Mock company data for demonstration
const companyData = {
  name: 'Tech Corp',
  tagline: 'Building the Future of AI',
  logo: '/images/logo.png',
  coverImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80',
  description: 'Tech Corp is a leading technology company specializing in innovative software solutions. We create cutting-edge products that transform how businesses operate in the digital age.',
  industry: 'Information Technology',
  companySize: '50-200 employees',
  founded: '2015',
  headquarters: 'San Francisco, CA',
  website: 'www.techcorp.com',
  phone: '+1 (555) 123-4567',
  email: 'careers@techcorp.com',
  socialLinks: {
    linkedin: 'https://linkedin.com/company/techcorp',
    twitter: 'https://twitter.com/techcorp',
    glassdoor: 'https://glassdoor.com/techcorp',
  },
  values: [
    'Innovation',
    'Diversity & Inclusion',
    'Work-Life Balance',
    'Continuous Learning',
    'Customer Focus',
  ],
  teamMembers: [
    { name: 'Sarah Chen', email: 'sarah@techcorp.com', role: 'HR Manager' },
    { name: 'Michael Rodriguez', email: 'michael@techcorp.com', role: 'Talent Acquisition' },
  ],
  completionStatus: {
    percentage: 85,
    tasks: [
      { name: 'Logo uploaded', completed: true },
      { name: 'Basic info added', completed: true },
      { name: 'About us completed', completed: true },
      { name: 'Team members added', completed: true },
      { name: 'Social links added', completed: false },
      { name: 'Company values defined', completed: true },
    ],
  },
};

export default function CompanyProfile() {
  return (
    <div className="min-h-screen bg-neutral-50 flex">
      {/* Sidebar */}
      <EmployerSidebar />

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Company Banner */}
        <div className="bg-gradient-to-r from-brand-aqua to-[#0C2E3C] py-12">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
              {/* Logo Upload Area */}
              <div className="relative group">
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                  <Image
                    src={companyData.logo}
                    alt={companyData.name}
                    width={96}
                    height={96}
                    className="rounded-xl"
                  />
                  <div className="absolute inset-0 bg-black/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button className="text-white flex items-center gap-2">
                      <CloudArrowUpIcon className="w-6 h-6" />
                      <span className="text-sm font-medium">Update Logo</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Company Info */}
              <div className="flex-grow">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4 justify-between">
                  <div className="text-white">
                    <h1 className="text-3xl font-display font-bold">
                      {companyData.name}
                    </h1>
                    <p className="text-white/80 mt-2 text-lg">
                      {companyData.tagline}
                    </p>
                    <div className="flex items-center gap-4 mt-3">
                      <span className="flex items-center gap-1 text-white/80">
                        <BuildingOfficeIcon className="w-5 h-5" />
                        {companyData.industry}
                      </span>
                      <span className="flex items-center gap-1 text-white/80">
                        <UserGroupIcon className="w-5 h-5" />
                        {companyData.companySize}
                      </span>
                    </div>
                  </div>
                  <button className="bg-white hover:bg-white/90 text-brand-black px-6 py-2.5 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 shadow-lg hover:scale-105">
                    <PencilSquareIcon className="w-5 h-5" />
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="max-w-7xl mx-auto px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Editable Fields */}
            <div className="lg:col-span-2 space-y-8">
              {/* Basic Info Section */}
              <div className="bg-white rounded-2xl shadow-lg">
                <button className="w-full px-8 py-6 flex items-center justify-between">
                  <h2 className="text-xl font-display font-bold text-brand-black">Basic Information</h2>
                  <ChevronDownIcon className="w-5 h-5 text-neutral-400" />
                </button>
                <div className="px-8 pb-8">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">Company Name</label>
                      <input
                        type="text"
                        value={companyData.name}
                        className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:border-brand-aqua focus:ring-1 focus:ring-brand-aqua"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">Website</label>
                      <input
                        type="text"
                        value={companyData.website}
                        className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:border-brand-aqua focus:ring-1 focus:ring-brand-aqua"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">Industry</label>
                      <input
                        type="text"
                        value={companyData.industry}
                        className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:border-brand-aqua focus:ring-1 focus:ring-brand-aqua"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">Company Size</label>
                      <input
                        type="text"
                        value={companyData.companySize}
                        className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:border-brand-aqua focus:ring-1 focus:ring-brand-aqua"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">Contact Email</label>
                      <input
                        type="email"
                        value={companyData.email}
                        className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:border-brand-aqua focus:ring-1 focus:ring-brand-aqua"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        value={companyData.phone}
                        className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:border-brand-aqua focus:ring-1 focus:ring-brand-aqua"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* About Us Section */}
              <div className="bg-white rounded-2xl shadow-lg">
                <button className="w-full px-8 py-6 flex items-center justify-between">
                  <h2 className="text-xl font-display font-bold text-brand-black">About Us</h2>
                  <ChevronDownIcon className="w-5 h-5 text-neutral-400" />
                </button>
                <div className="px-8 pb-8">
                  <textarea
                    rows={6}
                    value={companyData.description}
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-brand-aqua focus:ring-1 focus:ring-brand-aqua"
                  />
                </div>
              </div>

              {/* Culture & Values Section */}
              <div className="bg-white rounded-2xl shadow-lg">
                <button className="w-full px-8 py-6 flex items-center justify-between">
                  <h2 className="text-xl font-display font-bold text-brand-black">Culture & Values</h2>
                  <ChevronDownIcon className="w-5 h-5 text-neutral-400" />
                </button>
                <div className="px-8 pb-8">
                  <div className="flex flex-wrap gap-3 mb-4">
                    {companyData.values.map((value, index) => (
                      <div
                        key={index}
                        className="bg-neutral-50 px-4 py-2 rounded-xl flex items-center gap-2 group hover:bg-neutral-100"
                      >
                        <span className="text-neutral-700">{value}</span>
                        <button className="text-neutral-400 hover:text-red-500">
                          <XMarkIcon className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <button className="text-brand-aqua hover:text-brand-orange flex items-center gap-2">
                    <PlusIcon className="w-5 h-5" />
                    Add Value
                  </button>
                </div>
              </div>

              {/* Social Links Section */}
              <div className="bg-white rounded-2xl shadow-lg">
                <button className="w-full px-8 py-6 flex items-center justify-between">
                  <h2 className="text-xl font-display font-bold text-brand-black">Social Links</h2>
                  <ChevronDownIcon className="w-5 h-5 text-neutral-400" />
                </button>
                <div className="px-8 pb-8">
                  <div className="space-y-4">
                    {Object.entries(companyData.socialLinks).map(([platform, url]) => (
                      <div key={platform} className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-xl bg-neutral-50 flex items-center justify-center">
                          <LinkIcon className="w-5 h-5 text-brand-aqua" />
                        </div>
                        <input
                          type="url"
                          value={url}
                          placeholder={`${platform} URL`}
                          className="flex-grow px-4 py-2.5 rounded-xl border border-neutral-200 focus:border-brand-aqua focus:ring-1 focus:ring-brand-aqua"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Profile Completion Card */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-xl font-display font-bold text-brand-black mb-6">Profile Completion</h2>
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-neutral-600">Progress</span>
                    <span className="text-sm font-medium text-brand-black">{companyData.completionStatus.percentage}%</span>
                  </div>
                  <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-brand-aqua rounded-full"
                      style={{ width: `${companyData.completionStatus.percentage}%` }}
                    />
                  </div>
                </div>
                <ul className="space-y-3">
                  {companyData.completionStatus.tasks.map((task, index) => (
                    <li key={index} className="flex items-center gap-3 text-sm">
                      {task.completed ? (
                        <CheckIcon className="w-5 h-5 text-emerald-500" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-neutral-200" />
                      )}
                      <span className={task.completed ? 'text-neutral-600' : 'text-neutral-400'}>
                        {task.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Team Members Card */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-display font-bold text-brand-black">Team Members</h2>
                  <button className="text-brand-aqua hover:text-brand-orange">
                    <PlusIcon className="w-6 h-6" />
                  </button>
                </div>
                <div className="space-y-4">
                  {companyData.teamMembers.map((member, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-xl bg-neutral-50 hover:bg-neutral-100 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium text-brand-black">{member.name}</h3>
                          <p className="text-sm text-neutral-600">{member.email}</p>
                          <p className="text-sm text-neutral-500 mt-1">{member.role}</p>
                        </div>
                        <button className="text-neutral-400 hover:text-red-500">
                          <XMarkIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Preview Card */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-xl font-display font-bold text-brand-black mb-6">Employer Brand Preview</h2>
                <div className="bg-neutral-50 rounded-xl p-4">
                  <div className="flex items-center gap-4 mb-4">
                    <Image
                      src={companyData.logo}
                      alt={companyData.name}
                      width={48}
                      height={48}
                      className="rounded-lg"
                    />
                    <div>
                      <h3 className="font-medium text-brand-black">{companyData.name}</h3>
                      <p className="text-sm text-neutral-600">{companyData.tagline}</p>
                    </div>
                  </div>
                  <p className="text-sm text-neutral-600 line-clamp-3">{companyData.description}</p>
                  <div className="mt-4 pt-4 border-t border-neutral-200">
                    <span className="text-sm font-medium text-brand-black">12 Active Jobs</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 