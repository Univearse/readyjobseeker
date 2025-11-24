'use client';

import React, { useState, useRef, useEffect } from 'react';

/**
 * tomiwa: A customizable select component.
 * @param {array} options - The options for the select dropdown.
 * @param {*} value - The currently selected value.
 * @param {function} onChange - The function to call when the value changes.
 * @param {string} placeholder - The placeholder text.
 * @param {string} className - Additional classes for the container.
 */
export const Select = ({ options = [], value, onChange, placeholder = 'Select an option', className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  // tomiwa: Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  const selectedLabel = options.find(opt => opt.id === value?.id)?.title || value || placeholder;

  return (
    <div className={`relative ${className}`} ref={selectRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left bg-white border border-neutral-300 rounded-lg px-4 py-2.5 text-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#36D0D8]"
      >
        {selectedLabel}
        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
          </svg>
        </span>
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-neutral-300 rounded-lg shadow-lg">
          <ul className="py-1 max-h-60 overflow-auto">
            {options.map((option) => (
              <li
                key={option.id || option}
                onClick={() => handleSelect(option.title || option)}
                className="px-4 py-2 text-neutral-800 hover:bg-[#36D0D8]/10 cursor-pointer"
              >
                {option.title || option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
