'use client';

import React from 'react';

/**
 * tomiwa: A customizable button component.
 * @param {node} children - The content of the button.
 * @param {function} onClick - The function to call when the button is clicked.
 * @param {string} className - Additional classes to apply to the button.
 * @param {boolean} disabled - Whether the button is disabled.
 * @param {string} variant - The button variant ('primary', 'secondary', 'outline', 'ghost').
 * @param {string} size - The button size ('sm', 'md', 'lg').
 * @param {string} type - The button type ('button', 'submit', 'reset').
 */
export const Button = ({ 
  children, 
  onClick, 
  className = '', 
  disabled = false, 
  variant = 'primary', 
  size = 'md',
  type = 'button',
  ...props 
}) => {
  const baseStyles = 'rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200 inline-flex items-center justify-center';

  const variantStyles = {
    primary: 'bg-brand-orange text-white hover:bg-brand-orange/90 focus:ring-brand-orange',
    secondary: 'bg-neutral-200 text-neutral-800 hover:bg-neutral-300 focus:ring-neutral-400',
    outline: 'border-2 border-brand-orange text-brand-orange bg-transparent hover:bg-brand-orange hover:text-white focus:ring-brand-orange',
    ghost: 'text-neutral-600 bg-transparent hover:bg-neutral-100 hover:text-neutral-800 focus:ring-neutral-400',
  };

  const sizeStyles = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const disabledStyles = 'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-current';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyles}
        ${variantStyles[variant] || variantStyles.primary}
        ${sizeStyles[size] || sizeStyles.md}
        ${disabledStyles}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};
