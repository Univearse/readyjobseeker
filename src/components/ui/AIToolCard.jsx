import React from 'react';
import Link from 'next/link';

// tomiwa: Enhanced AIToolCard component with Explore button and Learn More link
const AIToolCard = ({ title, description, icon, href }) => {
  // tomiwa: Generate the learn more href by appending /learn to the tool's href
  const learnMoreHref = `${href}/learn`;

  return (
    <div className="group flex flex-col h-full bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)] transition-all duration-200 overflow-hidden">
      <div className="p-6 flex flex-col h-full">
        {/* tomiwa: Icon container with soft teal background */}
        <div className="w-12 h-12 rounded-lg bg-[#36D0D8]/10 flex items-center justify-center mb-4">
          <span className="text-2xl">{icon}</span>
        </div>

        {/* tomiwa: Title with brand styling */}
        <h3 className="font-display text-lg text-[#021126] mb-2">
          {title}
        </h3>

        {/* tomiwa: Description with neutral color */}
        <p className="text-neutral-600 text-sm flex-grow leading-relaxed">
          {description}
        </p>

        {/* tomiwa: Action buttons container */}
        <div className="mt-6 space-y-3">
          {/* tomiwa: Primary Explore button */}
          <Link 
            href={href}
            className="w-full inline-flex items-center justify-center px-4 py-2.5 bg-[#EF522E] hover:bg-[#EF522E]/90 text-white font-medium rounded-lg transition-colors"
          >
            Explore
            <svg className="ml-2 w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>

          {/* tomiwa: Secondary Learn More link */}
          <Link 
            href={learnMoreHref}
            className="w-full inline-flex items-center justify-center px-4 py-2.5 text-[#36D0D8] hover:text-[#EF522E] font-medium rounded-lg border-2 border-[#36D0D8] hover:border-[#EF522E] transition-colors"
          >
            Learn More
            <svg className="ml-2 w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AIToolCard;
