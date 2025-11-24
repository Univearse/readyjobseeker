"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HiOutlineLightningBolt, HiOutlineInformationCircle } from 'react-icons/hi';

// tomiwa: Full-width compensation setting page with centered content
export default function SetCompensation() {
  // tomiwa: State management
  const [payType, setPayType] = useState('Salary');
  const [currency, setCurrency] = useState('NGN');
  const [minPay, setMinPay] = useState('');
  const [maxPay, setMaxPay] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('Mid');
  const [useAI, setUseAI] = useState(false);

  // tomiwa: Handle AI suggestions
  const handleAIToggle = (enabled) => {
    setUseAI(enabled);
    if (enabled) {
      // Simulate AI suggestions based on experience level
      const suggestions = {
        Junior: { min: '150,000', max: '300,000' },
        Mid: { min: '300,000', max: '600,000' },
        Senior: { min: '600,000', max: '1,200,000' }
      };
      const range = suggestions[experienceLevel];
      setMinPay(range.min);
      setMaxPay(range.max);
    }
  };

  // tomiwa: Handle experience level change
  const handleExperienceChange = (level) => {
    setExperienceLevel(level);
    if (useAI) {
      handleAIToggle(true); // Refresh suggestions
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Centered Content Container */}
        <div className="max-w-3xl mx-auto">
          {/* Step Indicator */}
          <div className="text-center mb-8">
            <p className="text-brand-aqua font-medium text-sm">
              Step 2 of 3: Compensation
            </p>
            <h1 className="text-4xl font-display font-bold text-brand-black mt-2">
              Set Compensation
            </h1>
            <p className="text-lg text-neutral-600 font-sans mt-3">
              Use market data to pick a fair range. You can edit later.
            </p>
          </div>

          {/* Pay Type Selector */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex p-1 bg-neutral-100 rounded-lg">
              {['Salary', 'Hourly', 'Stipend'].map((type) => (
                <button
                  key={type}
                  onClick={() => setPayType(type)}
                  className={`px-8 py-2 text-sm font-medium rounded-lg transition-colors ${
                    payType === type
                      ? 'bg-white text-brand-black shadow-sm'
                      : 'text-neutral-600 hover:text-brand-black'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Two Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Currency Select */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                Currency
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:ring-2 focus:ring-brand-aqua focus:border-brand-aqua"
              >
                <option value="NGN">NGN - Nigerian Naira</option>
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">GBP - British Pound</option>
              </select>
            </div>

            {/* Pay Range */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  Minimum
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={minPay}
                    onChange={(e) => setMinPay(e.target.value)}
                    placeholder={payType === 'Salary' ? '150,000' : '1,000'}
                    className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:ring-2 focus:ring-brand-aqua focus:border-brand-aqua"
                  />
                  {useAI && (
                    <span className="absolute -top-2 right-2 px-2 py-1 bg-brand-aqua/10 text-brand-aqua text-xs rounded-full">
                      Suggested by AI
                    </span>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  Maximum
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={maxPay}
                    onChange={(e) => setMaxPay(e.target.value)}
                    placeholder={payType === 'Salary' ? '300,000' : '2,000'}
                    className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:ring-2 focus:ring-brand-aqua focus:border-brand-aqua"
                  />
                  {useAI && (
                    <span className="absolute -top-2 right-2 px-2 py-1 bg-brand-aqua/10 text-brand-aqua text-xs rounded-full">
                      Suggested by AI
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Experience Level */}
          <div className="mb-12">
            <label className="block text-sm font-semibold text-neutral-700 mb-4">
              Experience Level
            </label>
            <div className="flex gap-4">
              {['Junior', 'Mid', 'Senior'].map((level) => (
                <button
                  key={level}
                  onClick={() => handleExperienceChange(level)}
                  className={`flex-1 py-3 px-6 rounded-xl border-2 transition-colors ${
                    experienceLevel === level
                      ? 'border-brand-aqua bg-brand-aqua/10 text-brand-aqua'
                      : 'border-neutral-200 text-neutral-600 hover:border-brand-aqua hover:text-brand-aqua'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* AI Assistant Toggle */}
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-3">
              <HiOutlineLightningBolt className="w-5 h-5 text-brand-aqua" />
              <span className="text-sm font-medium text-neutral-700">Use market data</span>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => window.open('/market-data-info', '_blank')}
                className="text-sm text-neutral-600 hover:text-brand-aqua flex items-center gap-1"
              >
                <HiOutlineInformationCircle className="w-4 h-4" />
                How we estimate
              </button>
              <button
                onClick={() => handleAIToggle(!useAI)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  useAI ? 'bg-brand-aqua' : 'bg-neutral-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    useAI ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Helper Text */}
          <p className="text-sm text-neutral-500 text-center mb-8">
            Ranges increase relevant matches
          </p>

          {/* Action Buttons */}
          <div>
            <Link
              href="/post-job/preview"
              className="block w-full px-6 py-4 bg-brand-orange text-white rounded-xl font-semibold hover:bg-opacity-90 transition-all duration-300 text-center text-lg mb-4"
            >
              Continue →
            </Link>
            <div className="text-center">
              <Link
                href="/post-job/preview"
                className="text-neutral-600 hover:text-neutral-900 inline-block"
              >
                Skip for now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 