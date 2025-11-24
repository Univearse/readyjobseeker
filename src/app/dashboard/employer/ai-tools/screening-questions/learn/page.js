'use client';

import Image from 'next/image';
import Link from 'next/link';

// tomiwa: Icons for different sections
import { FiClock, FiBook, FiTool, FiAward, FiBarChart } from 'react-icons/fi';

export default function LearnMore() {
  // tomiwa: Static user name since we're not using authentication yet
  const userName = 'Employer';

  // tomiwa: Latest updates data
  const updates = [
    {
      icon: <FiBarChart className="w-6 h-6 text-primary" />,
      title: 'Enhanced Matching Algorithm',
      description: 'Improved candidate matching accuracy by 25%',
      timestamp: '2 days ago'
    },
    {
      icon: <FiTool className="w-6 h-6 text-primary" />,
      title: 'New Screening Templates',
      description: 'Added industry-specific question templates',
      timestamp: '1 week ago'
    }
  ];

  // tomiwa: Resource guides data
  const resources = [
    {
      icon: <FiBook className="w-6 h-6" />,
      title: 'How to Use AI Tools',
      description: 'Step-by-step guide to maximize AI features'
    },
    {
      icon: <FiAward className="w-6 h-6" />,
      title: 'Best Practices for Screening',
      description: 'Expert tips for candidate evaluation'
    },
    {
      icon: <FiBarChart className="w-6 h-6" />,
      title: 'AI Insights Explained',
      description: 'Understanding AI-powered predictions'
    }
  ];

  return (
    <div className="min-h-screen bg-white p-6 md:p-8">
      {/* tomiwa: Welcome Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-monument text-navy-800 mb-2">
          Welcome back, {userName}
        </h1>
        <p className="text-gray-600 text-lg">
          Here's an overview of your AI-powered recruitment tools and how they can enhance your hiring process.
        </p>
      </div>

      {/* tomiwa: Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* tomiwa: Left Panel - Overview & Updates */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-2xl font-monument text-navy-800 mb-6">Overview & Updates</h2>
            <div className="space-y-6">
              {updates.map((update, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0">{update.icon}</div>
                  <div>
                    <h3 className="font-semibold text-navy-800">{update.title}</h3>
                    <p className="text-gray-600 text-sm mt-1">{update.description}</p>
                    <div className="flex items-center mt-2 text-sm text-gray-500">
                      <FiClock className="w-4 h-4 mr-1" />
                      {update.timestamp}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* tomiwa: Right Panel - Tool Categories */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-2xl font-monument text-navy-800 mb-6">AI Tools Overview</h2>
            
            <div className="grid gap-6">
              {/* tomiwa: Smart Comparison Section */}
              <div className="p-6 rounded-lg bg-gradient-to-br from-gray-50 to-white border border-gray-100">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-monument text-navy-800 mb-2">Smart Comparison</h3>
                    <p className="text-gray-600">
                      Compare multiple candidates simultaneously across various parameters with AI-powered analysis.
                    </p>
                  </div>
                  <Image
                    src="/images/icons/compare.svg"
                    alt="Smart Comparison"
                    width={48}
                    height={48}
                    className="flex-shrink-0"
                  />
                </div>
              </div>

              {/* tomiwa: Customizable Criteria Section */}
              <div className="p-6 rounded-lg bg-gradient-to-br from-gray-50 to-white border border-gray-100">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-monument text-navy-800 mb-2">Customizable Criteria</h3>
                    <p className="text-gray-600">
                      Optimize your job posting for search engines with relevant keywords and proper formatting.
                    </p>
                  </div>
                  <Image
                    src="/images/icons/customize.svg"
                    alt="Customizable Criteria"
                    width={48}
                    height={48}
                    className="flex-shrink-0"
                  />
                </div>
              </div>

              {/* tomiwa: Data-Driven Insights Section */}
              <div className="p-6 rounded-lg bg-gradient-to-br from-gray-50 to-white border border-gray-100">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-monument text-navy-800 mb-2">Data-Driven Insights</h3>
                    <p className="text-gray-600">
                      Get detailed analytics and visualizations to support decision-making.
                    </p>
                  </div>
                  <Image
                    src="/images/icons/analytics.svg"
                    alt="Data-Driven Insights"
                    width={48}
                    height={48}
                    className="flex-shrink-0"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* tomiwa: Resources & Guides Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-monument text-navy-800 mb-6">Resources & Guides</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource, index) => (
            <Link 
              key={index}
              href="#"
              className="p-6 rounded-lg bg-white shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  {resource.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-navy-800">{resource.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">{resource.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}