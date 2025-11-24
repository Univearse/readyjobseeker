"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from 'framer-motion';
import { HiOutlineLightningBolt, HiOutlineDocumentText, HiOutlineUserGroup } from 'react-icons/hi';
import { FiTarget, FiSearch, FiMessageSquare, FiCalendar } from 'react-icons/fi';

// tomiwa: Post Job page component with sleek, minimalist design
export default function PostJobPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* tomiwa: Minimalist Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-brand-black to-neutral-900">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(54,208,216,0.1),transparent_50%)]" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-display font-bold text-white mb-8 tracking-tight leading-none">
                Hire
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-aqua to-brand-yellow">
                  Smarter
                </span>
              </h1>
              <p className="text-xl text-white/80 mb-12 font-sans max-w-xl mx-auto">
                Connect with verified candidates and streamline your hiring with AI-powered tools.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link
                  href="/post-job/create"
                  className="w-full sm:w-auto px-12 py-5 bg-brand-orange text-white rounded-full font-semibold hover:bg-opacity-90 transition-all duration-300 font-sans text-lg"
                >
                  Post a Job
                </Link>
                <Link
                  href="/pricing"
                  className="w-full sm:w-auto px-12 py-5 bg-transparent text-white rounded-full font-semibold border-2 border-white/20 hover:bg-white/10 transition-all duration-300 font-sans text-lg"
                >
                  View Plans
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* tomiwa: Key Features Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              {
                icon: <HiOutlineUserGroup className="w-10 h-10" />,
                title: "Reach Talent",
                description: "Connect with thousands of pre-vetted professionals actively seeking opportunities."
              },
              {
                icon: <HiOutlineLightningBolt className="w-10 h-10" />,
                title: "AI Matching",
                description: "Let our intelligent system find the perfect candidates for your roles."
              },
              {
                icon: <FiTarget className="w-10 h-10" />,
                title: "Smart Tracking",
                description: "Manage your hiring pipeline with powerful, intuitive tools."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-brand-aqua/10 to-transparent mb-8 text-brand-aqua">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-4 font-display">{feature.title}</h3>
                <p className="text-neutral-600 font-sans leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* tomiwa: Dashboard Preview Section */}
      <section className="py-32 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex-1 order-2 lg:order-1"
            >
              <h2 className="text-4xl font-bold text-neutral-900 mb-8 font-display leading-tight">
                Powerful tools for<br />modern hiring
              </h2>
              <div className="space-y-6">
                {[
                  "AI-powered candidate ranking",
                  "Automated skill assessment",
                  "Integrated interview scheduling",
                  "Real-time analytics dashboard"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-aqua" />
                    <span className="text-lg text-neutral-700 font-sans">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex-1 order-1 lg:order-2"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940"
                  alt="Dashboard preview"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-aqua/20 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* tomiwa: AI Tools Grid */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-900 mb-6 font-display">
              AI-Powered Features
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <HiOutlineDocumentText />,
                title: "Smart Matching",
                description: "Automated candidate-job fit scoring"
              },
              {
                icon: <FiMessageSquare />,
                title: "Job Description AI",
                description: "Generate optimized job posts"
              },
              {
                icon: <FiCalendar />,
                title: "Interview Assistant",
                description: "AI-guided interview preparation"
              },
              {
                icon: <FiTarget />,
                title: "Analytics",
                description: "Data-driven hiring insights"
              }
            ].map((tool, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group hover:bg-neutral-50 p-8 rounded-2xl transition-all duration-300"
              >
                <div className="w-12 h-12 text-brand-aqua mb-6 transition-transform group-hover:scale-110">
                  {tool.icon}
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-3 font-display">{tool.title}</h3>
                <p className="text-neutral-600 font-sans">{tool.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* tomiwa: CV Database Section */}
      <section className="py-32 bg-gradient-to-br from-neutral-900 to-brand-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-5xl font-bold mb-8 font-display leading-tight">
                  Access our
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-aqua to-brand-yellow">
                    Talent Pool
                  </span>
                </h2>
                <p className="text-xl text-white/80 mb-12 font-sans max-w-xl">
                  Browse through thousands of pre-screened professionals and find your next team member.
                </p>
                <Link
                  href="/cv-database"
                  className="inline-flex px-12 py-5 bg-brand-orange text-white rounded-full font-semibold hover:bg-opacity-90 transition-all duration-300 font-sans text-lg"
                >
                  Explore CVs
                </Link>
              </motion.div>
            </div>
            
            <div className="flex-1">
              <div className="grid grid-cols-2 gap-4">
                {[...Array(4)].map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl"
                  >
                    <div className="w-8 h-8 rounded-full bg-brand-aqua/20 mb-4" />
                    <div className="h-2 w-24 bg-white/20 rounded-full mb-2" />
                    <div className="h-2 w-16 bg-white/10 rounded-full" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* tomiwa: Plans Teaser */}
      <section className="py-32 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-neutral-900 mb-6 font-display">
              Choose your plan
            </h2>
            <p className="text-xl text-neutral-600 mb-12 font-sans">
              From single job posts to enterprise solutions
            </p>
            <Link
              href="/pricing"
              className="inline-flex px-12 py-5 bg-brand-orange text-white rounded-full font-semibold hover:bg-opacity-90 transition-all duration-300 font-sans text-lg"
            >
              View Plans
            </Link>
          </motion.div>
        </div>
      </section>

      {/* tomiwa: Minimalist Footer */}
      <footer className="py-24 bg-neutral-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            <div>
              <h3 className="text-lg font-semibold mb-6">Company</h3>
              <ul className="space-y-4">
                <li><Link href="/about" className="text-neutral-400 hover:text-white transition-colors">About</Link></li>
                <li><Link href="/blog" className="text-neutral-400 hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="/contact" className="text-neutral-400 hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6">Product</h3>
              <ul className="space-y-4">
                <li><Link href="/features" className="text-neutral-400 hover:text-white transition-colors">Features</Link></li>
                <li><Link href="/pricing" className="text-neutral-400 hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="/security" className="text-neutral-400 hover:text-white transition-colors">Security</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6">Resources</h3>
              <ul className="space-y-4">
                <li><Link href="/docs" className="text-neutral-400 hover:text-white transition-colors">Documentation</Link></li>
                <li><Link href="/help" className="text-neutral-400 hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="/guides" className="text-neutral-400 hover:text-white transition-colors">Guides</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6">Legal</h3>
              <ul className="space-y-4">
                <li><Link href="/privacy" className="text-neutral-400 hover:text-white transition-colors">Privacy</Link></li>
                <li><Link href="/terms" className="text-neutral-400 hover:text-white transition-colors">Terms</Link></li>
                <li><Link href="/cookies" className="text-neutral-400 hover:text-white transition-colors">Cookies</Link></li>
              </ul>
            </div>
          </div>

          <div className="mt-20 pt-8 border-t border-neutral-800">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <p className="text-neutral-400">
                © 2024 Reposebay. All rights reserved.
              </p>
              <div className="flex gap-6">
                <Link href="https://twitter.com" className="text-neutral-400 hover:text-white transition-colors">
                  Twitter
                </Link>
                <Link href="https://linkedin.com" className="text-neutral-400 hover:text-white transition-colors">
                  LinkedIn
                </Link>
                <Link href="https://github.com" className="text-neutral-400 hover:text-white transition-colors">
                  GitHub
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 