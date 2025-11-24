"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineBriefcase, HiOutlineAcademicCap, HiOutlineOfficeBuilding, HiOutlineLightningBolt } from 'react-icons/hi';
import { FiTarget, FiTrendingUp, FiShield, FiSearch, FiBell, FiBookmark } from 'react-icons/fi';
import { RiRemoteControlLine } from 'react-icons/ri';

// tomiwa: Homepage component with consistent design system
export default function HomePage() {
  // tomiwa: State management
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [activeTab, setActiveTab] = useState("recommended");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // tomiwa: Background images for dynamic header
  const backgroundImages = [
    "https://images.unsplash.com/photo-1664575602554-2087b04935a5?q=80&w=2940",
    "https://images.unsplash.com/photo-1664575600796-cd75084a4bc5?q=80&w=2940",
    "https://images.unsplash.com/photo-1664575600850-9d0da911fa7f?q=80&w=2940"
  ];

  // tomiwa: Auto-rotate background images
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // tomiwa: Sample recommended jobs
  const recommendedJobs = [
    {
      title: "Senior Product Designer",
      company: "TechCorp Inc.",
      location: "Remote",
      salary: "₦500k - ₦800k",
      type: "Full-time",
      skills: ["UI/UX", "Figma", "Design Systems"],
      logo: "https://images.unsplash.com/photo-1549924231-f129b911e442?w=200&h=200&fit=crop"
    },
    {
      title: "Frontend Developer",
      company: "InnovateTech",
      location: "Lagos",
      salary: "₦400k - ₦600k",
      type: "Hybrid",
      skills: ["React", "TypeScript", "Tailwind"],
      logo: "https://images.unsplash.com/photo-1568822617270-2c1579f8dfe2?w=200&h=200&fit=crop"
    },
    {
      title: "Marketing Manager",
      company: "GrowthLabs",
      location: "Abuja",
      salary: "₦450k - ₦700k",
      type: "On-site",
      skills: ["Digital Marketing", "Analytics", "Team Management"],
      logo: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=200&h=200&fit=crop"
    }
  ];

  // tomiwa: Sample job categories with updated icons
  const jobCategories = [
    { name: "Technology", icon: <HiOutlineLightningBolt className="w-6 h-6" />, count: 1250, color: "primary" },
    { name: "Finance", icon: <FiTrendingUp className="w-6 h-6" />, count: 850, color: "emerald" },
    { name: "Healthcare", icon: <FiShield className="w-6 h-6" />, count: 620, color: "blue" },
    { name: "Education", icon: <HiOutlineAcademicCap className="w-6 h-6" />, count: 450, color: "purple" },
    { name: "Marketing", icon: <FiTarget className="w-6 h-6" />, count: 380, color: "rose" },
    { name: "Remote", icon: <RiRemoteControlLine className="w-6 h-6" />, count: 920, color: "amber" }
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* tomiwa: Enhanced Header Section */}
      <section className="relative h-[400px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
            <Image
              src={backgroundImages[currentImageIndex]}
              alt="Header background"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>
        
        {/* tomiwa: Enhanced Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary-950/90 via-primary-900/85 to-neutral-900/95" />
        
        {/* tomiwa: Header Content */}
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="w-full max-w-3xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              Find Your Dream Job Today
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-neutral-200 mb-8"
            >
              Discover thousands of job opportunities with all the information you need.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="relative max-w-2xl"
            >
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-neutral-400" />
              </div>
              <input
                type="text"
                placeholder="Search for jobs, companies, or skills..."
                className="block w-full pl-11 pr-12 py-4 bg-white rounded-xl text-neutral-900 placeholder-neutral-500 shadow-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* tomiwa: Main Content with Updated Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* tomiwa: Left Sidebar */}
          <div className="lg:col-span-3 space-y-6">
            {/* tomiwa: Enhanced Profile Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg"
            >
              <div className="h-24 bg-gradient-to-r from-primary-600 to-primary-800" />
              <div className="px-6 pb-6">
                <div className="flex justify-center -mt-12 mb-4">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
                    <Image
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop"
                      alt="Profile"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="text-center mb-6">
                  <h2 className="text-xl font-semibold text-neutral-900">John Doe</h2>
                  <p className="text-neutral-600">UI/UX Designer</p>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-3 bg-primary-50 rounded-xl">
                    <div className="text-2xl font-bold text-primary-700">24</div>
                    <div className="text-sm text-primary-600">Applications</div>
                  </div>
                  <div className="text-center p-3 bg-primary-50 rounded-xl">
                    <div className="text-2xl font-bold text-primary-700">8</div>
                    <div className="text-sm text-primary-600">Interviews</div>
                  </div>
                </div>
                <Link
                  href="/profile"
                  className="block w-full py-3 px-4 bg-primary-600 text-white text-center rounded-xl font-medium hover:bg-primary-700 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Complete Profile
                </Link>
              </div>
            </motion.div>

            {/* tomiwa: Enhanced Job Categories */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <h3 className="text-lg font-semibold text-neutral-900 mb-6">Popular Categories</h3>
              <div className="grid grid-cols-2 gap-4">
                {jobCategories.map((category, index) => (
                  <Link
                    key={index}
                    href={`/jobs/category/${category.name.toLowerCase()}`}
                    className="group"
                  >
                    <div className="p-4 bg-neutral-50 rounded-xl hover:bg-primary-50 transition-all transform hover:scale-[1.02] active:scale-[0.98]">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-primary-600 shadow-sm mb-3">
                        {category.icon}
                      </div>
                      <div className="font-medium text-neutral-900">{category.name}</div>
                      <div className="text-sm text-neutral-600">{category.count} jobs</div>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>

          {/* tomiwa: Main Content Area */}
          <div className="lg:col-span-9 space-y-6">
            {/* tomiwa: Enhanced Tabs */}
            <div className="bg-white rounded-2xl p-4 shadow-lg">
              <div className="flex gap-4">
                <button
                  onClick={() => setActiveTab("recommended")}
                  className={`px-6 py-3 rounded-xl font-medium transition-all ${
                    activeTab === "recommended"
                      ? "bg-primary-600 text-white shadow-md"
                      : "text-neutral-600 hover:bg-neutral-100"
                  }`}
                >
                  Recommended
                </button>
                <button
                  onClick={() => setActiveTab("saved")}
                  className={`px-6 py-3 rounded-xl font-medium transition-all ${
                    activeTab === "saved"
                      ? "bg-primary-600 text-white shadow-md"
                      : "text-neutral-600 hover:bg-neutral-100"
                  }`}
                >
                  Saved Jobs
                </button>
              </div>
            </div>

            {/* tomiwa: Enhanced Job Cards */}
            <div className="space-y-4">
              {recommendedJobs.map((job, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.01]"
                >
                  <div className="flex items-start gap-6">
                    <div className="w-20 h-20 relative rounded-2xl overflow-hidden flex-shrink-0 border border-neutral-100">
                      <Image
                        src={job.logo}
                        alt={job.company}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-semibold text-neutral-900 mb-1">{job.title}</h3>
                          <p className="text-neutral-600 flex items-center gap-2">
                            <HiOutlineOfficeBuilding className="w-4 h-4" />
                            {job.company}
                          </p>
                        </div>
                        <button className="text-neutral-400 hover:text-primary-600 transition-colors">
                          <FiBookmark className="w-6 h-6" />
                        </button>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-primary-50 text-primary-700 border border-primary-100">
                          {job.type}
                        </span>
                        <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-neutral-100 text-neutral-700 border border-neutral-200">
                          {job.location}
                        </span>
                        <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
                          {job.salary}
                        </span>
                      </div>
                      <div className="mt-4">
                        <div className="text-sm font-medium text-neutral-700 mb-2">Required Skills:</div>
                        <div className="flex flex-wrap gap-2">
                          {job.skills.map((skill, skillIndex) => (
                            <span
                              key={skillIndex}
                              className="px-3 py-1.5 rounded-lg text-sm bg-neutral-100 text-neutral-700 border border-neutral-200"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="mt-6 flex gap-4">
                        <Link
                          href={`/jobs/${job.title.toLowerCase().replace(/ /g, "-")}`}
                          className="flex-1 px-6 py-3 bg-primary-600 text-white text-center rounded-xl font-medium hover:bg-primary-700 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg"
                        >
                          Apply Now
                        </Link>
                        <button className="px-6 py-3 border border-neutral-200 rounded-xl text-neutral-700 hover:bg-neutral-50 transition-all transform hover:scale-[1.02] active:scale-[0.98]">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 