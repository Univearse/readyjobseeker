'use client';

import React from 'react';

/**
 * tomiwa: A chip component to display labels with an optional delete button.
 * It's used for displaying selected skills or other filter tags.
 * @param {string} label - The text to display inside the chip.
 * @param {function} onDelete - A callback function to be called when the delete button is clicked.
 */
export const Chip = ({ label, onDelete }) => {
  return (
    <div className="
      flex items-center 
      py-1 px-3 
      rounded-full 
      bg-[#36D0D8]/10 // secondary-aqua with 10% opacity
      text-[#021126] // dark-navy
      text-sm font-medium
    ">
      {/* tomiwa: This is the label for the chip */}
      <span>{label}</span>
      
      {/* tomiwa: If onDelete is provided, show a delete button */}
      {onDelete && (
        <button
          onClick={onDelete}
          className="
            ml-2 
            -mr-1 
            p-0.5 
            rounded-full 
            text-[#021126]/70 // dark-navy with 70% opacity
            hover:bg-[#021126]/10 // dark-navy with 10% opacity
            focus:outline-none 
            focus:ring-2 
            focus:ring-offset-2 
            focus:ring-[#36D0D8] // secondary-aqua
          "
          aria-label={`Remove ${label}`}
        >
          {/* tomiwa: SVG icon for the delete button */}
          <svg
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      )}
    </div>
  );
};
