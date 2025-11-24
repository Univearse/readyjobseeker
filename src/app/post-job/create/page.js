"use client";

import { useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { motion } from 'framer-motion';
import { HiOutlineCheck, HiOutlineX, HiOutlineLightningBolt } from 'react-icons/hi';
import { FiTarget, FiZap, FiPackage, FiShield } from 'react-icons/fi';

// tomiwa: Plans data with monthly and yearly pricing
const plans = [
  {
    name: "Free Post",
    icon: <FiPackage className="w-6 h-6" />,
    price: { monthly: "Free", yearly: "Free" },
    features: [
      "1 active job posting",
      "Basic search visibility",
      "Standard applicant inbox",
      "Email notifications",
      "Basic job analytics"
    ],
    cta: "Start Free",
    ctaStyle: "outline"
  },
  {
    name: "Starter",
    icon: <FiTarget className="w-6 h-6" />,
    price: { 
      monthly: "₦19,999", 
      yearly: "₦199,999"
    },
    features: [
      "3 active job postings",
      "AI candidate matching",
      "Basic analytics dashboard",
      "Priority support",
      "Custom job alerts"
    ],
    cta: "Get Started"
  },
  {
    name: "Growth",
    icon: <FiZap className="w-6 h-6" />,
    price: { 
      monthly: "₦39,999", 
      yearly: "₦399,999"
    },
    isRecommended: true,
    features: [
      "5 active job postings",
      "Featured placement",
      "AI candidate ranking",
      "Limited CV database",
      "Advanced analytics"
    ],
    cta: "Choose Growth"
  },
  {
    name: "Enterprise",
    icon: <FiShield className="w-6 h-6" />,
    price: { 
      monthly: "₦79,999", 
      yearly: "₦799,999"
    },
    features: [
      "Unlimited job postings",
      "Custom branding",
      "Full CV database access",
      "API access",
      "Dedicated support"
    ],
    cta: "Contact Sales"
  }
];

// tomiwa: Feature comparison categories
const featureCategories = [
  {
    name: "Job Posting",
    features: [
      {
        name: "Active job posts",
        free: "1",
        starter: "3",
        growth: "5",
        enterprise: "Unlimited"
      },
      {
        name: "Job visibility",
        free: "Basic",
        starter: "Enhanced",
        growth: "Featured",
        enterprise: "Premium"
      },
      {
        name: "Job duration",
        free: "30 days",
        starter: "45 days",
        growth: "60 days",
        enterprise: "90 days"
      }
    ]
  },
  {
    name: "AI Features",
    features: [
      {
        name: "Candidate matching",
        free: "—",
        starter: "Basic",
        growth: "Advanced",
        enterprise: "Custom"
      },
      {
        name: "Resume parsing",
        free: "—",
        starter: "✓",
        growth: "✓",
        enterprise: "✓"
      },
      {
        name: "Skill assessment",
        free: "—",
        starter: "—",
        growth: "Basic",
        enterprise: "Advanced"
      }
    ]
  },
  {
    name: "Tools & Analytics",
    features: [
      {
        name: "Analytics dashboard",
        free: "Basic",
        starter: "Standard",
        growth: "Advanced",
        enterprise: "Custom"
      },
      {
        name: "CV database",
        free: "—",
        starter: "—",
        growth: "Limited",
        enterprise: "Full"
      },
      {
        name: "API access",
        free: "—",
        starter: "—",
        growth: "—",
        enterprise: "✓"
      }
    ]
  }
];

export default function PostJobPage() {
  const [isYearly, setIsYearly] = useState(false);
  const [boostBudget, setBoostBudget] = useState(5000);

  return (
    <div className="min-h-screen bg-white">
      {/* tomiwa: Minimalist Hero Section */}
      <section className="relative py-24 lg:py-32 bg-gradient-to-br from-brand-black to-neutral-900">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(54,208,216,0.08),transparent_50%)]" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-5xl lg:text-6xl font-display font-bold text-white mb-6 tracking-tight">
              Find Your Next
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-aqua to-brand-yellow">
                Great Hire
              </span>
            </h1>
            <p className="text-lg text-white/80 mb-10 font-sans">
              Post your job to millions of qualified candidates and let our AI find your perfect match.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#plans"
                className="inline-flex items-center justify-center px-8 py-4 bg-brand-orange text-white rounded-xl font-medium hover:bg-opacity-90 transition-all duration-300"
              >
                <HiOutlineLightningBolt className="w-5 h-5 mr-2" />
                Post Your Job
              </Link>
              <Link
                href="#comparison"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 text-white rounded-xl font-medium hover:bg-white/20 transition-all duration-300"
              >
                Compare Plans
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* tomiwa: Elegant Pricing Section */}
      <section id="plans" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Billing Toggle */}
          <div className="flex justify-center mb-16">
            <div className="bg-neutral-100 p-1 rounded-xl inline-flex">
              <button
                onClick={() => setIsYearly(false)}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  !isYearly ? 'bg-white text-neutral-900 shadow-sm' : 'text-neutral-600'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsYearly(true)}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isYearly ? 'bg-white text-neutral-900 shadow-sm' : 'text-neutral-600'
                }`}
              >
                Yearly
                <span className="ml-1 text-brand-aqua text-xs">Save 20%</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative bg-white rounded-2xl p-8 transition-all duration-300 hover:shadow-xl ${
                  plan.isRecommended 
                    ? 'ring-2 ring-brand-aqua shadow-lg' 
                    : 'border border-neutral-200'
                }`}
              >
                {plan.isRecommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-brand-aqua/10 text-brand-aqua">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between mb-6">
                  <div className="text-brand-aqua">
                    {plan.icon}
                  </div>
                  {plan.name !== "Free Post" && (
                    <span className="text-xs font-medium text-neutral-500">
                      {isYearly ? 'per year' : 'per month'}
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-neutral-900 mb-2 font-display">
                  {plan.name}
                </h3>

                <div className="mb-6">
                  <span className="text-3xl font-bold text-neutral-900">
                    {isYearly ? plan.price.yearly : plan.price.monthly}
                  </span>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-neutral-600 text-sm">
                      <HiOutlineCheck className="w-5 h-5 text-brand-aqua flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/checkout/${plan.name.toLowerCase()}`}
                  className={`w-full inline-flex justify-center px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                    plan.ctaStyle === 'outline'
                      ? 'border-2 border-neutral-200 text-neutral-900 hover:bg-neutral-50'
                      : 'bg-brand-orange text-white hover:bg-opacity-90'
                  }`}
                >
                  {plan.cta}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* tomiwa: Refined Comparison Section */}
      <section id="comparison" className="py-24 bg-gradient-to-br from-neutral-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4 font-display">
              Compare Plan Features
            </h2>
            <p className="text-neutral-600">
              Find the perfect plan for your hiring needs
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-neutral-200">
            {featureCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="border-b border-neutral-200 last:border-b-0">
                <div className="bg-neutral-50 px-6 py-4">
                  <h3 className="text-sm font-medium text-neutral-900">{category.name}</h3>
                </div>
                <div className="divide-y divide-neutral-200">
                  {category.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="grid grid-cols-5 text-sm">
                      <div className="px-6 py-4 font-medium text-neutral-900">
                        {feature.name}
                      </div>
                      <div className="px-6 py-4 text-center text-neutral-600">
                        {feature.free}
                      </div>
                      <div className="px-6 py-4 text-center text-neutral-600">
                        {feature.starter}
                      </div>
                      <div className="px-6 py-4 text-center text-neutral-600">
                        {feature.growth}
                      </div>
                      <div className="px-6 py-4 text-center text-neutral-600">
                        {feature.enterprise}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* tomiwa: Refined Boost Section */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-neutral-900 to-brand-black rounded-2xl p-8 text-white overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(54,208,216,0.1),transparent_50%)]" />
            
            <div className="relative">
              <div className="flex items-start gap-6 mb-8">
                <div className="p-3 bg-white/10 rounded-xl">
                  <HiOutlineLightningBolt className="w-6 h-6 text-brand-yellow" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 font-display">
                    Boost Your Listing
                  </h3>
                  <p className="text-white/70 text-sm">
                    Increase your job visibility with daily promotion
                  </p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <label htmlFor="budget" className="text-sm font-medium text-white/90">
                      Daily budget
                    </label>
                    <span className="text-lg font-medium text-brand-yellow">
                      ₦{boostBudget.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    id="budget"
                    min="1000"
                    max="10000"
                    step="1000"
                    value={boostBudget}
                    onChange={(e) => setBoostBudget(Number(e.target.value))}
                    className="w-full h-2 bg-white/20 rounded-full appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between mt-2 text-xs text-white/60">
                    <span>₦1,000</span>
                    <span>₦10,000</span>
                  </div>
                </div>
                
                <button className="w-full px-6 py-3 bg-brand-orange text-white rounded-xl font-medium hover:bg-opacity-90 transition-all duration-300">
                  Add Boost
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* tomiwa: Reusing existing footer */}
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