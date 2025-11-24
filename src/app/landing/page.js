"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineLightningBolt, HiOutlineGlobeAlt, HiOutlineCurrencyDollar, HiOutlineUserGroup } from 'react-icons/hi';
import { RiRemoteControlLine } from 'react-icons/ri';
import { HiOutlineBriefcase, HiOutlineAcademicCap, HiOutlineOfficeBuilding } from 'react-icons/hi';
import { FiTarget, FiTrendingUp, FiShield } from 'react-icons/fi';

// tomiwa: Landing page component with modern, AI-forward design
export default function LandingPage() {
  // tomiwa: State management
  const [jobSearch, setJobSearch] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [activeCategory, setActiveCategory] = useState(0);
  const [cookieConsent, setCookieConsent] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // tomiwa: Background images for hero section
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

  // tomiwa: Job categories for filter chips
  const jobCategories = ["Remote", "Hybrid", "Tech", "Marketing", "Finance"];

  // tomiwa: Latest jobs data
  const latestJobs = [
    {
      title: "Cashier",
      industry: "FMCG",
      type: "Full Time",
      location: "Lagos",
      salary: "₦80k",
      workMode: "Onsite",
      deadline: "6 days left to apply",
    },
    {
      title: "Customer Success & Retention Specialist",
      industry: "Logistics",
      type: "Full Time",
      location: "Lagos",
      salary: "₦150k",
      workMode: "Hybrid",
      deadline: "4 days left to apply",
    },
    {
      title: "Floor Supervisor",
      industry: "FMCG",
      type: "Full Time",
      location: "Lagos",
      salary: "₦120k",
      workMode: "Onsite",
      deadline: "5 days left to apply",
    },
    {
      title: "Store/Operations Manager",
      industry: "Fashion",
      type: "Full Time",
      location: "Lagos",
      salary: "₦250k",
      workMode: "Hybrid",
      deadline: "3 days left to apply",
    },
  ];

  // tomiwa: Popular job categories with icons
  const popularCategories = [
    { name: "Tech", icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" },
    { name: "Education", icon: "M12 14l9-5-9-5-9 5 9 5z" },
    { name: "Oil and Gas", icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" },
    { name: "Finance", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }
  ];

  // tomiwa: Sample job listings
  const featuredJobs = [
    {
      title: "Senior Product Designer",
      company: "TechCorp Inc.",
      location: "Remote",
      salary: "$120k - $150k",
      type: "Full-time",
    },
    {
      title: "Marketing Manager",
      company: "Growth Labs",
      location: "New York, NY",
      salary: "$90k - $110k",
      type: "Hybrid",
    },
    {
      title: "Software Engineer",
      company: "AI Solutions",
      location: "San Francisco, CA",
      salary: "$130k - $160k",
      type: "Remote",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* tomiwa: Hero Section with Dynamic Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <Image
              src={backgroundImages[currentImageIndex]}
              alt="Hero background"
              fill
              className="object-cover opacity-10"
              priority
            />
          </motion.div>
        </AnimatePresence>
        
        {/* tomiwa: Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-black/50 via-brand-black/70 to-brand-black/90" />
        
        {/* tomiwa: Animated Particles Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="relative w-full h-full">
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-brand-aqua/20 rounded-full"
                animate={{
                  x: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
                  y: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: Math.random() * 5 + 5,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            ))}
          </div>
        </div>

        {/* tomiwa: Hero Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-6"
            >
              <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-brand-aqua/10 text-brand-aqua ring-1 ring-brand-aqua/20">
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-aqua opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-aqua"></span>
                </span>
                AI-Powered Job Matching
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-white mb-8 tracking-tight"
            >
              Your Dream Career
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-aqua via-brand-aqua to-brand-yellow">
                Starts Here
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-white/80 mb-12 max-w-2xl mx-auto font-sans"
            >
              Discover opportunities tailored to your skills with our AI-driven job matching technology.
            </motion.p>

            {/* tomiwa: Search Form with Glassmorphism */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="relative max-w-4xl mx-auto"
            >
              <div className="absolute inset-0 bg-white/5 backdrop-blur-xl rounded-brand"></div>
              <div className="relative bg-white/10 rounded-brand p-4 sm:p-6 shadow-brand">
                <form className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        placeholder="Job title or skills"
                        className="block w-full pl-11 pr-12 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:ring-2 focus:ring-brand-aqua focus:border-brand-aqua font-sans"
                        value={jobSearch}
                        onChange={(e) => setJobSearch(e.target.value)}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        <svg className="h-5 w-5 text-neutral-400 hover:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        placeholder="Location or remote"
                        className="block w-full pl-11 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:ring-2 focus:ring-brand-aqua focus:border-brand-aqua font-sans"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="flex-1 sm:flex-none px-8 py-4 bg-brand-orange text-white rounded-xl font-semibold hover:bg-secondary-600 transition-all duration-300 shadow-lg shadow-secondary-500/25 hover:shadow-secondary-500/40 font-sans"
                    >
                      Find jobs
                    </button>
                    <Link
                      href="/post-job"
                      className="flex-1 sm:flex-none px-8 py-4 bg-white/10 backdrop-blur-xl text-white rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 font-sans"
                    >
                      Post a job
                    </Link>
                  </div>
                </form>
              </div>
            </motion.div>

            {/* tomiwa: Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-8"
            >
              {[
                { label: "Active Jobs", value: "2,000+" },
                { label: "Companies", value: "500+" },
                { label: "Job Seekers", value: "10,000+" },
                { label: "Successful Hires", value: "5,000+" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="text-center"
                >
                  <div className="text-2xl sm:text-3xl font-bold text-brand-aqua mb-2 font-display">{stat.value}</div>
                  <div className="text-sm text-white/60 font-sans">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* tomiwa: Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center text-white/60">
            <span className="text-sm mb-2 font-sans">Scroll to explore</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </motion.div>
      </section>

      {/* tomiwa: Feature Band Section */}
      <section className="py-16 bg-gradient-to-b from-white to-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Employers Card */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-brand p-8 shadow-brand hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start gap-6">
                <div className="w-24 h-24 flex-shrink-0 relative">
                  <div className="absolute inset-0 bg-brand-aqua/20 rounded-2xl transform -rotate-6"></div>
                  <div className="absolute inset-0 bg-brand-aqua/30 rounded-2xl transform rotate-3"></div>
                  <div className="relative w-full h-full bg-brand-aqua/10 rounded-2xl flex items-center justify-center">
                    <HiOutlineBriefcase className="w-12 h-12 text-brand-aqua" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-brand-black mb-3 font-display">For Employers</h3>
                  <p className="text-neutral-600 mb-6 font-sans">Find professionals from around the world and across all skills.</p>
                  <Link
                    href="/post-job"
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-brand-orange hover:bg-secondary-600 transition duration-150 ease-in-out font-sans"
                  >
                    Post jobs for Free
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Candidates Card */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-brand p-8 shadow-brand hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start gap-6">
                <div className="w-24 h-24 flex-shrink-0">
                  <div className="relative w-full h-full bg-brand-aqua/10 rounded-2xl flex items-center justify-center">
                    <svg className="w-12 h-12 text-brand-aqua" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-brand-black mb-3 font-display">For Candidates</h3>
                  <p className="text-neutral-600 mb-6 font-sans">Build your professional profile, find new job opportunities.</p>
                  <Link
                    href="/upload-cv"
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-brand-orange hover:bg-secondary-600 transition duration-150 ease-in-out font-sans"
                  >
                    Upload your CV
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* tomiwa: Popular Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-between items-center mb-8"
          >
            <div>
              <h2 className="text-3xl font-bold text-neutral-900">Popular category</h2>
              <p className="text-neutral-600 mt-2">2025 jobs live – 293 added today.</p>
            </div>
            <Link
              href="/categories"
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              View all categories
            </Link>
          </motion.div>

          <div className="relative">
            {/* Left Arrow */}
            <button
              onClick={() => setActiveCategory(Math.max(0, activeCategory - 1))}
              className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-lg z-10 text-neutral-600 hover:text-primary-600"
              disabled={activeCategory === 0}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Categories Carousel */}
            <div className="overflow-hidden">
              <div 
                className="flex gap-6 transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${activeCategory * 25}%)` }}
              >
                {popularCategories.map((category, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.03 }}
                    className="flex-none w-1/4"
                  >
                    <div className="bg-neutral-50 rounded-xl p-6 hover:bg-primary-50 transition-colors group cursor-pointer">
                      <div className="relative w-16 h-16 mb-6">
                        <div className="absolute inset-0 bg-primary-100 rounded-2xl transform -rotate-6"></div>
                        <div className="absolute inset-0 bg-primary-200 rounded-2xl transform rotate-3"></div>
                        <div className="relative w-full h-full bg-primary-50 rounded-2xl flex items-center justify-center">
                          {category.name === 'Tech' && <HiOutlineLightningBolt className="w-8 h-8 text-primary-600" />}
                          {category.name === 'Education' && <HiOutlineAcademicCap className="w-8 h-8 text-primary-600" />}
                          {category.name === 'Oil and Gas' && <HiOutlineGlobeAlt className="w-8 h-8 text-primary-600" />}
                          {category.name === 'Finance' && <HiOutlineCurrencyDollar className="w-8 h-8 text-primary-600" />}
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-neutral-900 group-hover:text-primary-700">{category.name}</h3>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Arrow */}
            <button
              onClick={() => setActiveCategory(Math.min(popularCategories.length - 4, activeCategory + 1))}
              className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-lg z-10 text-neutral-600 hover:text-primary-600"
              disabled={activeCategory >= popularCategories.length - 4}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: Math.ceil(popularCategories.length / 4) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveCategory(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === activeCategory ? 'bg-primary-600' : 'bg-neutral-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* tomiwa: AI Value Proposition Cards */}
      <section className="py-16 bg-gradient-to-b from-white to-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="relative w-16 h-16 mb-6">
                <div className="absolute inset-0 bg-primary-100 rounded-2xl transform -rotate-6"></div>
                <div className="absolute inset-0 bg-primary-200 rounded-2xl transform rotate-3"></div>
                <div className="relative w-full h-full bg-primary-50 rounded-2xl flex items-center justify-center">
                  <FiTarget className="w-8 h-8 text-primary-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">Smart Job Matching</h3>
              <p className="text-neutral-600">Our AI analyzes your skills and experience to find the perfect job matches.</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="relative w-16 h-16 mb-6">
                <div className="absolute inset-0 bg-primary-100 rounded-2xl transform -rotate-6"></div>
                <div className="absolute inset-0 bg-primary-200 rounded-2xl transform rotate-3"></div>
                <div className="relative w-full h-full bg-primary-50 rounded-2xl flex items-center justify-center">
                  <HiOutlineUserGroup className="w-8 h-8 text-primary-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">AI Career Coach</h3>
              <p className="text-neutral-600">Get personalized career advice and interview tips from our AI assistant.</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="relative w-16 h-16 mb-6">
                <div className="absolute inset-0 bg-primary-100 rounded-2xl transform -rotate-6"></div>
                <div className="absolute inset-0 bg-primary-200 rounded-2xl transform rotate-3"></div>
                <div className="relative w-full h-full bg-primary-50 rounded-2xl flex items-center justify-center">
                  <FiShield className="w-8 h-8 text-primary-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">Verified Jobs Only</h3>
              <p className="text-neutral-600">All job listings are verified and vetted for quality and legitimacy.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* tomiwa: Social Proof Section */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              <div>
                <div className="text-4xl font-bold text-primary-600 mb-2">5,000+</div>
                <div className="text-neutral-600">Job Seekers</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary-600 mb-2">200+</div>
                <div className="text-neutral-600">Employers</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary-600 mb-2">1,000+</div>
                <div className="text-neutral-600">Jobs Posted</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary-600 mb-2">95%</div>
                <div className="text-neutral-600">Success Rate</div>
              </div>
            </div>
          </div>
          
          {/* tomiwa: Company Logos */}
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {[1, 2, 3, 4, 5].map((i) => (
              <Image
                key={i}
                src={`https://images.unsplash.com/photo-placeholder-${i}?q=80&w=150`}
                alt="Company logo"
                width={120}
                height={40}
                className="h-8 w-auto object-contain"
              />
            ))}
          </div>
        </div>
      </section>

      {/* tomiwa: Job Categories and Listings */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-neutral-900 mb-8">Explore roles hiring now</h2>
          
          {/* tomiwa: Filter Chips */}
          <div className="flex flex-wrap gap-3 mb-8">
            {jobCategories.map((category) => (
              <button
                key={category}
                className="px-4 py-2 rounded-full bg-neutral-100 text-neutral-700 hover:bg-primary-50 hover:text-primary-700 transition-colors"
              >
                {category}
              </button>
            ))}
          </div>

          {/* tomiwa: Job Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredJobs.map((job, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="bg-white border border-neutral-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900">{job.title}</h3>
                    <p className="text-neutral-600">{job.company}</p>
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-50 text-primary-700">
                    {job.type}
                  </span>
                </div>
                <div className="space-y-2 text-neutral-600">
                  <div className="flex items-center">
                    <svg className="h-5 w-5 mr-2 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    {job.location}
                  </div>
                  <div className="flex items-center">
                    <svg className="h-5 w-5 mr-2 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {job.salary}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* tomiwa: Employers Section */}
      <section className="py-16 bg-gradient-to-br from-neutral-50 via-primary-50 to-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-neutral-900 mb-6">
                Hire smarter with AI-powered shortlists
              </h2>
              <p className="text-lg text-neutral-600 mb-8">
                Our AI technology analyzes candidates' skills, experience, and potential to create curated shortlists of top talent for your roles.
              </p>
              <Link
                href="/employer"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-primary-600 hover:bg-primary-700 transition duration-150 ease-in-out"
              >
                Start hiring today
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-96"
            >
              <Image
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1000"
                alt="Team collaboration"
                fill
                className="object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/20 to-transparent rounded-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* tomiwa: Career Services Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-neutral-900 text-center mb-12">
            Boost your career with AI-powered tools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-neutral-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">AI Resume Builder</h3>
              <p className="text-neutral-600">Create an ATS-optimized resume with our AI-powered builder.</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-neutral-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">Interview Simulator</h3>
              <p className="text-neutral-600">Practice with our AI interviewer and get instant feedback.</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-neutral-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">Career Resources</h3>
              <p className="text-neutral-600">Access guides, templates, and tips for career success.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* tomiwa: Latest Jobs Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-neutral-900">Latest jobs</h2>
              <p className="text-neutral-600 mt-2">2025 jobs live – 293 added today.</p>
            </div>
            <Link
              href="/jobs"
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              View all jobs
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {latestJobs.map((job, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="bg-white border border-neutral-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900">{job.title}</h3>
                    <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-neutral-100 text-neutral-700 mt-2">
                      {job.industry}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-neutral-400 hover:text-primary-600" aria-label="Quick apply">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </button>
                    <button className="text-neutral-400 hover:text-red-500" aria-label="Save job">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-primary-50 text-primary-700">
                    {job.type}
                  </span>
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-orange-50 text-orange-700">
                    {job.workMode}
                  </span>
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700">
                    {job.location}
                  </span>
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-emerald-50 text-emerald-700">
                    {job.salary}
                  </span>
                </div>
                <div className="text-sm text-green-600 font-medium">
                  {job.deadline}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* tomiwa: Newsletter Section */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-neutral-900 mb-4">
            Subscribe to our newsletter
          </h2>
          <p className="text-lg text-neutral-600 mb-8">
            We'll keep you updated with the best new jobs.
          </p>
          <form className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="px-8 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition duration-150 ease-in-out"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* tomiwa: New Footer */}
      <footer className="bg-neutral-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div>
              <h3 className="text-lg font-semibold mb-6">About Us</h3>
              <p className="text-neutral-400 mb-4">
                Reposebay is Nigeria's leading job platform, connecting talented professionals with their dream careers. We're committed to making job hunting and hiring simpler.
              </p>
              <div className="space-y-2">
                <p className="text-neutral-400">Phone: +234 123 456 7890</p>
                <p className="text-neutral-400">Email: hello@reposebay.com</p>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6">Company</h4>
              <ul className="space-y-4">
                <li><Link href="/blog" className="text-neutral-400 hover:text-white">Blogs</Link></li>
                <li><Link href="/contact" className="text-neutral-400 hover:text-white">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6">Services</h4>
              <ul className="space-y-4">
                <li><Link href="/jobs" className="text-neutral-400 hover:text-white">Jobs</Link></li>
                <li><Link href="/companies" className="text-neutral-400 hover:text-white">Companies</Link></li>
                <li><Link href="/candidates" className="text-neutral-400 hover:text-white">Candidates</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-6">Connect</h4>
              <div className="flex gap-4">
                <Link href="https://linkedin.com" className="text-neutral-400 hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </Link>
                <Link href="https://facebook.com" className="text-neutral-400 hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                  </svg>
                </Link>
                <Link href="https://instagram.com" className="text-neutral-400 hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </Link>
                <Link href="https://youtube.com" className="text-neutral-400 hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-neutral-800">
            <div className="text-center text-neutral-400">
              © 2024 Reposebay. All Right Reserved.
            </div>
          </div>
        </div>
      </footer>

      {/* tomiwa: Cookie Consent Banner */}
      {!cookieConsent && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 p-4 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-neutral-600">
              We use cookies to improve your experience. See our{" "}
              <Link href="/privacy" className="text-primary-600 hover:text-primary-700">
                Privacy Policy
              </Link>
              .
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setCookieConsent(true)}
                className="px-4 py-2 text-neutral-600 hover:text-neutral-700"
              >
                Not now
              </button>
              <button
                onClick={() => setCookieConsent(true)}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 