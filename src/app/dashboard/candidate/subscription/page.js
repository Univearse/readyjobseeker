/**
 * File: src/app/dashboard/candidate/subscription/page.js
 * 
 * tomiwa: Subscription & Billing Page (Placeholder)
 * Manage subscription plans and payment methods
 */

'use client';

import { useState } from 'react';
import CandidateDashboardLayout from '@/components/layouts/CandidateDashboardLayout';
import { CreditCardIcon, SparklesIcon } from '@heroicons/react/24/outline';

export default function Subscription() {
  const [showAiAssistant, setShowAiAssistant] = useState(false);

  return (
    <CandidateDashboardLayout>
      {/* tomiwa: Hero Banner */}
      <div className="bg-gradient-to-r from-brand-aqua to-[#0C5B65] -mt-8 -mx-6 mb-8">
        <div className="px-8 py-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-display font-bold text-white mb-2">
                Subscription & Billing
              </h1>
              <p className="text-white/90 text-lg">
                Manage your plan and payment methods
              </p>
            </div>
            <button
              onClick={() => setShowAiAssistant(!showAiAssistant)}
              className={`inline-flex items-center gap-2 px-4 py-2 font-semibold rounded-lg transition-colors ${
                showAiAssistant 
                  ? 'bg-brand-yellow text-brand-black' 
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <SparklesIcon className="w-5 h-5" />
              AI Assistant
            </button>
          </div>
        </div>
      </div>

      {/* tomiwa: Coming soon placeholder */}
      <div className="px-8 pb-12">
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <CreditCardIcon className="w-24 h-24 text-neutral-300 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">Subscription Page Coming Soon</h2>
          <p className="text-neutral-600">This page is under construction.</p>
        </div>

        {/* tomiwa: AI Assistant Panel */}
        {showAiAssistant && (
          <div className="mt-8 bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-brand-yellow to-brand-orange p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <SparklesIcon className="w-6 h-6 text-brand-black" />
                </div>
                <div>
                  <h2 className="text-xl font-display font-bold text-brand-black">AI Subscription Assistant</h2>
                  <p className="text-brand-black/80">Get recommendations for the best plan for your needs</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <p className="text-neutral-600 text-center">
                AI-powered subscription recommendations will be available when this page is fully implemented.
              </p>
            </div>
          </div>
        )}
      </div>
    </CandidateDashboardLayout>
  );
}


