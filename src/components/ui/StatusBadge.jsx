import clsx from 'clsx';

// tomiwa: Status configuration for different status types
const statusConfig = {
  // ExistingCode: Original status types
  'New': { color: 'bg-blue-100 text-blue-700' },
  'Under Review': { color: 'bg-amber-100 text-amber-700' },
  'Assessment Sent': { color: 'bg-teal-100 text-teal-700' },
  'Interview Scheduled': { color: 'bg-emerald-100 text-emerald-700' },
  'Rejected': { color: 'bg-neutral-100 text-neutral-700' },
  
  // tomiwa: New status types for subscription page
  'success': { color: 'bg-emerald-100 text-emerald-700' },
  'warning': { color: 'bg-amber-100 text-amber-700' },
  'danger': { color: 'bg-red-100 text-red-700' },
  'info': { color: 'bg-blue-100 text-blue-700' },
  'paid': { color: 'bg-emerald-100 text-emerald-700' },
  'pending': { color: 'bg-amber-100 text-amber-700' },
  'failed': { color: 'bg-red-100 text-red-700' },
};

/**
 * tomiwa: StatusBadge component for displaying status indicators
 * @param {string} status - The status type (can be predefined status or custom)
 * @param {string} text - Custom text to display (optional, defaults to status)
 * @param {string} className - Additional CSS classes
 */
export default function StatusBadge({ status, text, className = '' }) {
  // tomiwa: Use the provided text or fallback to status
  const displayText = text || status;
  
  // tomiwa: Get configuration for the status, fallback to 'New' if not found
  const config = statusConfig[status] || statusConfig['New'];
  
  return (
    <span className={clsx(
      'px-3 py-1 rounded-full text-sm font-medium inline-flex items-center',
      config.color,
      className
    )}>
      {displayText}
    </span>
  );
} 