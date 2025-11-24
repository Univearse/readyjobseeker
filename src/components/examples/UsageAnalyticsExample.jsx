// tomiwa: Usage Analytics Component - Implementation Example
// File Location: /src/components/examples/UsageAnalyticsExample.jsx
// Purpose: Shows how to use the UsageAnalyticsCard component in your Analytics & Insights page

'use client';

import React, { useState } from 'react';
import UsageAnalyticsCard from '@/components/ui/UsageAnalyticsCard';

/**
 * johnson: Example Implementation
 * 
 * This shows how to use the UsageAnalyticsCard component in your Analytics & Insights dashboard.
 * Copy this pattern when creating your analytics page.
 */
export default function UsageAnalyticsExample() {
  // tomiwa: Sample data - Replace with real data from your API or state management
  const planData = {
    name: 'Premium',
    nextBilling: '2024-04-15'
  };

  const usageData = {
    jobPostings: { used: 8, limit: 'unlimited' },
    aiCredits: { used: 450, limit: 1000 },
    cvSearches: { used: 120, limit: 500 },
    interviews: { used: 25, limit: 100 }
  };

  const trendsData = {
    monthlyGrowth: 15,
    peakDay: 'Tuesdays',
    mostUsedFeature: 'AI Resume Parser',
    billingCycleProgress: 60,
    daysRemaining: 12
  };

  // tomiwa: Format date helper function
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // tomiwa: Handle upgrade button click
  const handleUpgrade = () => {
    console.log('Upgrade button clicked');
    // Open upgrade modal or navigate to plans page
  };

  return (
    <div className="min-h-screen bg-neutral-50 p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* johnson: Page header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-brand-black mb-3">
            Analytics & Insights
          </h1>
          <p className="text-neutral-600 text-base sm:text-lg">
            Comprehensive overview of your account usage and performance
          </p>
        </div>

        {/* tomiwa: Usage Analytics Component
            Simply pass in your data props and callback functions */}
        <UsageAnalyticsCard
          planData={planData}
          usageData={usageData}
          trendsData={trendsData}
          onUpgrade={handleUpgrade}
          formatDate={formatDate}
        />

        {/* johnson: You can add more analytics sections below
            For example: Performance charts, reports, etc. */}
        <div className="mt-8">
          {/* Additional analytics content goes here */}
        </div>
      </div>
    </div>
  );
}

/**
 * johnson: How to Create Your Analytics Page
 * 
 * Step 1: Create a new page file
 * Location: /src/app/dashboard/employer/analytics/page.js
 * 
 * Step 2: Copy this example structure
 * 
 * Step 3: Replace sample data with real data sources:
 * - Fetch from API
 * - Get from Redux/Context
 * - Use server-side props
 * 
 * Step 4: Connect the onUpgrade callback to your upgrade modal
 * 
 * Step 5: Add authentication/authorization if needed
 * 
 * Example file structure for analytics page:
 * 
 * 'use client';
 * 
 * import UsageAnalyticsCard from '@/components/ui/UsageAnalyticsCard';
 * import { useAuth } from '@/hooks/useAuth'; // Your auth hook
 * import { useUsageData } from '@/hooks/useUsageData'; // Your data hook
 * 
 * export default function AnalyticsPage() {
 *   const { user } = useAuth();
 *   const { planData, usageData, trendsData } = useUsageData(user.id);
 *   
 *   return (
 *     <div className="p-8">
 *       <UsageAnalyticsCard
 *         planData={planData}
 *         usageData={usageData}
 *         trendsData={trendsData}
 *         onUpgrade={() => router.push('/plans')}
 *         formatDate={(date) => format(date, 'MMMM d, yyyy')}
 *       />
 *     </div>
 *   );
 * }
 */

/**
 * johnson: Props Documentation
 * 
 * planData: {
 *   name: string,           // Plan name (e.g., "Premium", "Enterprise")
 *   nextBilling: string     // Next billing date in any valid date format
 * }
 * 
 * usageData: {
 *   jobPostings: {
 *     used: number,         // Number of jobs posted
 *     limit: number | 'unlimited'  // Job posting limit
 *   },
 *   cvSearches: {
 *     used: number,         // Number of CV searches performed
 *     limit: number         // CV search limit
 *   },
 *   aiCredits: {
 *     used: number,         // AI credits used
 *     limit: number         // AI credits limit
 *   },
 *   interviews: {
 *     used: number,         // Interviews scheduled
 *     limit: number         // Interview scheduling limit
 *   }
 * }
 * 
 * trendsData: {
 *   monthlyGrowth: number,     // Growth percentage (e.g., 15 for 15%)
 *   peakDay: string,           // Day of week with most activity
 *   mostUsedFeature: string,   // Name of most used feature
 *   billingCycleProgress: number,  // Progress percentage (0-100)
 *   daysRemaining: number      // Days left in billing cycle
 * }
 * 
 * onUpgrade: function          // Callback when upgrade button clicked (optional)
 * formatDate: function         // Function to format dates (required)
 */

