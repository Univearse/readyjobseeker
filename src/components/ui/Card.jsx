'use client';

import React from 'react';

/**
 * tomiwa: A simple card component to wrap content.
 * @param {node} children - The content of the card.
 * @param {string} className - Additional classes to apply to the card.
 * @param {object} props - All other props (including onClick, onHover, etc.) are forwarded to the div
 */
export const Card = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`
        bg-white 
        rounded-xl 
        shadow-sm 
        border 
        border-neutral-200/80
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};
