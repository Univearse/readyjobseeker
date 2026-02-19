/**
 * File: src/app/dashboard/candidate/subscription/invoices/page.js
 * 
 * tomiwa: NEW - All Invoices Page
 * A dedicated page for viewing all billing invoices and receipts.
 * Provides filtering, searching, and download functionality.
 * 
 * Layout Structure:
 * ================
 * HERO BANNER: Aqua-to-teal gradient (matching subscription page)
 *              - Title: "All Invoices"
 *              - Subtitle: Invoice management description
 *              - Back button to subscription page
 * 
 * SECTION 1: Invoice Stats Cards
 *            - Total spent, invoices count, next charge
 * 
 * SECTION 2: Invoice Filters & Search
 *            - Search by invoice ID
 *            - Filter by date range, status
 * 
 * SECTION 3: Invoices Table
 *            - Full invoice history with pagination
 *            - Download individual or bulk invoices
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import CandidateDashboardLayout from '@/components/layouts/CandidateDashboardLayout.jsx';
import { 
  ArrowLeftIcon,
  DocumentArrowDownIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  CalendarDaysIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowDownTrayIcon,
  EyeIcon,
} from '@heroicons/react/24/outline';

// tomiwa: NEW - Extended mock data for billing history
// ExistingCode: Complete invoice data for the billing history page
const allInvoices = [
  {
    id: 'INV-2024-001',
    date: 'Jan 15, 2024',
    dueDate: 'Jan 15, 2024',
    description: 'Pro Plan - Monthly',
    amount: '₦15,000',
    amountValue: 15000,
    status: 'Paid',
    paymentMethod: 'Visa •••• 4242',
  },
  {
    id: 'INV-2023-012',
    date: 'Dec 15, 2023',
    dueDate: 'Dec 15, 2023',
    description: 'Pro Plan - Monthly',
    amount: '₦15,000',
    amountValue: 15000,
    status: 'Paid',
    paymentMethod: 'Visa •••• 4242',
  },
  {
    id: 'INV-2023-011',
    date: 'Nov 15, 2023',
    dueDate: 'Nov 15, 2023',
    description: 'Pro Plan - Monthly',
    amount: '₦15,000',
    amountValue: 15000,
    status: 'Paid',
    paymentMethod: 'Visa •••• 4242',
  },
  {
    id: 'INV-2023-010',
    date: 'Oct 15, 2023',
    dueDate: 'Oct 15, 2023',
    description: 'Pro Plan Upgrade',
    amount: '₦15,000',
    amountValue: 15000,
    status: 'Paid',
    paymentMethod: 'Mastercard •••• 8888',
  },
  {
    id: 'INV-2023-009',
    date: 'Sep 15, 2023',
    dueDate: 'Sep 15, 2023',
    description: 'Free Plan - Monthly',
    amount: '₦0',
    amountValue: 0,
    status: 'Paid',
    paymentMethod: 'N/A',
  },
  {
    id: 'INV-2023-008',
    date: 'Aug 15, 2023',
    dueDate: 'Aug 15, 2023',
    description: 'Free Plan - Monthly',
    amount: '₦0',
    amountValue: 0,
    status: 'Paid',
    paymentMethod: 'N/A',
  },
  {
    id: 'INV-2023-007',
    date: 'Jul 15, 2023',
    dueDate: 'Jul 15, 2023',
    description: 'Free Plan - Monthly',
    amount: '₦0',
    amountValue: 0,
    status: 'Paid',
    paymentMethod: 'N/A',
  },
  {
    id: 'INV-2023-006',
    date: 'Jun 15, 2023',
    dueDate: 'Jun 15, 2023',
    description: 'Free Plan - Monthly',
    amount: '₦0',
    amountValue: 0,
    status: 'Paid',
    paymentMethod: 'N/A',
  },
];

// tomiwa: NEW - Calculate invoice statistics
const invoiceStats = {
  totalSpent: allInvoices.reduce((sum, inv) => sum + inv.amountValue, 0),
  totalInvoices: allInvoices.length,
  paidInvoices: allInvoices.filter(inv => inv.status === 'Paid').length,
  nextCharge: '₦15,000',
  nextChargeDate: 'Feb 15, 2024',
};

export default function AllInvoices() {
  // tomiwa: State for search query
  const [searchQuery, setSearchQuery] = useState('');
  // tomiwa: State for status filter
  const [statusFilter, setStatusFilter] = useState('all');
  // tomiwa: State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const invoicesPerPage = 5;
  // tomiwa: State for selected invoices (for bulk download)
  const [selectedInvoices, setSelectedInvoices] = useState([]);
  // tomiwa: State for invoice detail modal
  const [showInvoiceDetail, setShowInvoiceDetail] = useState(null);

  // tomiwa: NEW - Filter invoices based on search and filters
  const filteredInvoices = allInvoices.filter(invoice => {
    const matchesSearch = invoice.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          invoice.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || invoice.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  // tomiwa: NEW - Pagination logic
  const totalPages = Math.ceil(filteredInvoices.length / invoicesPerPage);
  const startIndex = (currentPage - 1) * invoicesPerPage;
  const paginatedInvoices = filteredInvoices.slice(startIndex, startIndex + invoicesPerPage);

  // tomiwa: NEW - Toggle invoice selection
  const toggleInvoiceSelection = (invoiceId) => {
    setSelectedInvoices(prev => 
      prev.includes(invoiceId) 
        ? prev.filter(id => id !== invoiceId)
        : [...prev, invoiceId]
    );
  };

  // tomiwa: NEW - Select all invoices
  const toggleSelectAll = () => {
    if (selectedInvoices.length === paginatedInvoices.length) {
      setSelectedInvoices([]);
    } else {
      setSelectedInvoices(paginatedInvoices.map(inv => inv.id));
    }
  };

  // tomiwa: NEW - Get status badge style
  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return {
          bg: 'bg-emerald-100',
          text: 'text-emerald-700',
          icon: CheckCircleIcon,
        };
      case 'pending':
        return {
          bg: 'bg-brand-yellow/20',
          text: 'text-yellow-700',
          icon: ClockIcon,
        };
      case 'failed':
        return {
          bg: 'bg-red-100',
          text: 'text-red-700',
          icon: XCircleIcon,
        };
      default:
        return {
          bg: 'bg-neutral-100',
          text: 'text-neutral-700',
          icon: DocumentTextIcon,
        };
    }
  };

  return (
    <CandidateDashboardLayout>
      {/* tomiwa: HERO BANNER - Matching subscription page design */}
      <div className="bg-gradient-to-r from-brand-aqua to-[#0C5B65]">
        <div className="px-6 
                        sm:px-8 
                        md:px-10 
                        lg:px-12 
                        xl:px-16 
                        2xl:px-20 
                        py-10 
                        sm:py-12 
                        md:py-14 
                        lg:py-16">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6">
            <div className="flex-1">
              {/* tomiwa: Back navigation link */}
              <Link 
                href="/dashboard/candidate/subscription"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
              >
                <ArrowLeftIcon className="w-4 h-4" />
                <span className="text-sm font-medium">Back to Subscription</span>
              </Link>
              {/* tomiwa: Main heading with Monument Extended font */}
              <h1 className="text-3xl 
                            sm:text-4xl 
                            md:text-4xl 
                            lg:text-5xl 
                            font-display font-bold text-white mb-2">
                All Invoices
              </h1>
              {/* tomiwa: Subtitle in uniform style */}
              <p className="text-[#D9E5E6] text-base 
                           sm:text-lg 
                           md:text-lg 
                           lg:text-xl 
                           leading-relaxed max-w-2xl">
                View, download, and manage all your billing invoices and receipts
              </p>
            </div>
            {/* tomiwa: Download all button */}
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white hover:bg-white/20 font-semibold rounded-xl transition-all duration-300">
              <ArrowDownTrayIcon className="w-5 h-5" />
              Download All
            </button>
          </div>
        </div>
      </div>

      {/* tomiwa: Main content area */}
      <main className="max-w-7xl mx-auto px-6 sm:px-8 md:px-10 lg:px-12 py-8 sm:py-10 md:py-12">
        
        {/* ================================================================ */}
        {/* SECTION 1: Invoice Stats Cards                                   */}
        {/* tomiwa: Quick overview of billing statistics                     */}
        {/* ================================================================ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* tomiwa: Total Spent Card */}
          <div className="bg-white rounded-2xl shadow-lg p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-brand-aqua/10 rounded-lg flex items-center justify-center">
                <CurrencyDollarIcon className="w-5 h-5 text-brand-aqua" />
              </div>
              <span className="text-sm text-neutral-500">Total Spent</span>
            </div>
            <p className="text-2xl font-display font-bold text-brand-black">
              ₦{invoiceStats.totalSpent.toLocaleString()}
            </p>
          </div>

          {/* tomiwa: Total Invoices Card */}
          <div className="bg-white rounded-2xl shadow-lg p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-brand-orange/10 rounded-lg flex items-center justify-center">
                <DocumentTextIcon className="w-5 h-5 text-brand-orange" />
              </div>
              <span className="text-sm text-neutral-500">Total Invoices</span>
            </div>
            <p className="text-2xl font-display font-bold text-brand-black">
              {invoiceStats.totalInvoices}
            </p>
          </div>

          {/* tomiwa: Paid Invoices Card */}
          <div className="bg-white rounded-2xl shadow-lg p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <CheckCircleIcon className="w-5 h-5 text-emerald-600" />
              </div>
              <span className="text-sm text-neutral-500">Paid Invoices</span>
            </div>
            <p className="text-2xl font-display font-bold text-brand-black">
              {invoiceStats.paidInvoices}
            </p>
          </div>

          {/* tomiwa: Next Charge Card */}
          <div className="bg-white rounded-2xl shadow-lg p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-brand-yellow/20 rounded-lg flex items-center justify-center">
                <CalendarDaysIcon className="w-5 h-5 text-brand-yellow" />
              </div>
              <span className="text-sm text-neutral-500">Next Charge</span>
            </div>
            <p className="text-2xl font-display font-bold text-brand-black">
              {invoiceStats.nextCharge}
            </p>
            <p className="text-xs text-neutral-500">{invoiceStats.nextChargeDate}</p>
          </div>
        </div>

        {/* ================================================================ */}
        {/* SECTION 2: Filters & Search                                      */}
        {/* tomiwa: Search and filter controls for invoices                  */}
        {/* ================================================================ */}
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* tomiwa: Search input */}
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="w-5 h-5 text-neutral-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by invoice ID or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-brand-aqua focus:border-brand-aqua transition-all text-brand-black placeholder:text-neutral-400"
              />
            </div>

            {/* tomiwa: Status filter dropdown */}
            <div className="relative">
              <FunnelIcon className="w-5 h-5 text-neutral-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-10 pr-10 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-brand-aqua focus:border-brand-aqua transition-all text-brand-black appearance-none bg-white cursor-pointer min-w-[150px]"
              >
                <option value="all">All Status</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
            </div>

            {/* tomiwa: Bulk download button (when invoices selected) */}
            {selectedInvoices.length > 0 && (
              <button className="inline-flex items-center gap-2 px-4 py-3 bg-brand-aqua text-white font-medium rounded-xl hover:bg-[#2BA6AD] transition-all duration-300">
                <ArrowDownTrayIcon className="w-5 h-5" />
                Download ({selectedInvoices.length})
              </button>
            )}
          </div>
        </div>

        {/* ================================================================ */}
        {/* SECTION 3: Invoices Table                                        */}
        {/* tomiwa: Full invoice history with actions                        */}
        {/* ================================================================ */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
          {/* tomiwa: Responsive table for invoices */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-neutral-50">
                  <th className="text-left py-4 px-4">
                    {/* tomiwa: Select all checkbox */}
                    <input
                      type="checkbox"
                      checked={selectedInvoices.length === paginatedInvoices.length && paginatedInvoices.length > 0}
                      onChange={toggleSelectAll}
                      className="w-5 h-5 rounded border-neutral-300 text-brand-aqua focus:ring-brand-aqua"
                    />
                  </th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-neutral-600">Invoice</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-neutral-600">Date</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-neutral-600 hidden md:table-cell">Description</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-neutral-600 hidden lg:table-cell">Payment</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-neutral-600">Amount</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-neutral-600">Status</th>
                  <th className="text-right py-4 px-4 text-sm font-semibold text-neutral-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedInvoices.length > 0 ? (
                  paginatedInvoices.map((invoice, index) => {
                    const statusBadge = getStatusBadge(invoice.status);
                    const StatusIcon = statusBadge.icon;
                    
                    return (
                      <tr 
                        key={invoice.id} 
                        className={`border-b border-neutral-100 hover:bg-neutral-50 transition-colors ${
                          index === paginatedInvoices.length - 1 ? 'border-b-0' : ''
                        }`}
                      >
                        <td className="py-4 px-4">
                          <input
                            type="checkbox"
                            checked={selectedInvoices.includes(invoice.id)}
                            onChange={() => toggleInvoiceSelection(invoice.id)}
                            className="w-5 h-5 rounded border-neutral-300 text-brand-aqua focus:ring-brand-aqua"
                          />
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-sm font-medium text-brand-black">{invoice.id}</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-sm text-neutral-600">{invoice.date}</span>
                        </td>
                        <td className="py-4 px-4 hidden md:table-cell">
                          <span className="text-sm text-neutral-600">{invoice.description}</span>
                        </td>
                        <td className="py-4 px-4 hidden lg:table-cell">
                          <span className="text-sm text-neutral-500">{invoice.paymentMethod}</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-sm font-semibold text-brand-black">{invoice.amount}</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 ${statusBadge.bg} ${statusBadge.text} text-xs font-bold rounded-full`}>
                            <StatusIcon className="w-3.5 h-3.5" />
                            {invoice.status}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center justify-end gap-2">
                            <button 
                              onClick={() => setShowInvoiceDetail(invoice)}
                              className="p-2 text-neutral-500 hover:text-brand-aqua hover:bg-primary-50 rounded-lg transition-colors"
                              title="View Details"
                            >
                              <EyeIcon className="w-5 h-5" />
                            </button>
                            <button 
                              className="p-2 text-neutral-500 hover:text-brand-aqua hover:bg-primary-50 rounded-lg transition-colors"
                              title="Download"
                            >
                              <DocumentArrowDownIcon className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="8" className="py-12 text-center">
                      <DocumentTextIcon className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
                      <p className="text-neutral-500">No invoices found matching your criteria</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* tomiwa: Pagination controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-4 border-t border-neutral-100">
              <p className="text-sm text-neutral-500">
                Showing {startIndex + 1} to {Math.min(startIndex + invoicesPerPage, filteredInvoices.length)} of {filteredInvoices.length} invoices
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-neutral-200 text-neutral-600 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeftIcon className="w-5 h-5" />
                </button>
                
                {/* tomiwa: Page number buttons */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                        currentPage === page
                          ? 'bg-brand-aqua text-white'
                          : 'text-neutral-600 hover:bg-neutral-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-neutral-200 text-neutral-600 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRightIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* tomiwa: Help text */}
        <div className="bg-neutral-50 rounded-xl p-4 text-center">
          <p className="text-sm text-neutral-600">
            Need help with an invoice? <Link href="/support" className="text-brand-aqua hover:text-brand-orange font-medium transition-colors">Contact Support</Link>
          </p>
        </div>

        {/* tomiwa: Back to subscription link */}
        <div className="mt-8 text-center">
          <Link 
            href="/dashboard/candidate/subscription"
            className="inline-flex items-center gap-2 text-brand-aqua hover:text-brand-orange font-medium transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Back to Subscription Overview
          </Link>
        </div>

      </main>

      {/* ================================================================ */}
      {/* tomiwa: NEW - Invoice Detail Modal                               */}
      {/* updated: Modal for viewing full invoice details                  */}
      {/* ================================================================ */}
      {showInvoiceDetail && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 sm:p-8 animate-in fade-in zoom-in duration-300">
            {/* tomiwa: Modal header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-brand-aqua/10 rounded-xl flex items-center justify-center">
                  <DocumentTextIcon className="w-6 h-6 text-brand-aqua" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold text-brand-black">
                    {showInvoiceDetail.id}
                  </h3>
                  <p className="text-sm text-neutral-500">{showInvoiceDetail.date}</p>
                </div>
              </div>
              <button
                onClick={() => setShowInvoiceDetail(null)}
                className="w-10 h-10 rounded-full hover:bg-neutral-100 flex items-center justify-center transition-colors"
              >
                <XCircleIcon className="w-6 h-6 text-neutral-400" />
              </button>
            </div>

            {/* tomiwa: Invoice details */}
            <div className="bg-neutral-50 rounded-xl p-4 mb-6 space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-neutral-200">
                <span className="text-neutral-600">Description</span>
                <span className="font-medium text-brand-black">{showInvoiceDetail.description}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-neutral-200">
                <span className="text-neutral-600">Date</span>
                <span className="font-medium text-brand-black">{showInvoiceDetail.date}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-neutral-200">
                <span className="text-neutral-600">Due Date</span>
                <span className="font-medium text-brand-black">{showInvoiceDetail.dueDate}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-neutral-200">
                <span className="text-neutral-600">Payment Method</span>
                <span className="font-medium text-brand-black">{showInvoiceDetail.paymentMethod}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-neutral-200">
                <span className="text-neutral-600">Status</span>
                {(() => {
                  const statusBadge = getStatusBadge(showInvoiceDetail.status);
                  const StatusIcon = statusBadge.icon;
                  return (
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 ${statusBadge.bg} ${statusBadge.text} text-xs font-bold rounded-full`}>
                      <StatusIcon className="w-3.5 h-3.5" />
                      {showInvoiceDetail.status}
                    </span>
                  );
                })()}
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-neutral-600 font-semibold">Amount</span>
                <span className="text-2xl font-display font-bold text-brand-aqua">{showInvoiceDetail.amount}</span>
              </div>
            </div>

            {/* tomiwa: Action buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowInvoiceDetail(null)}
                className="flex-1 px-5 py-3 border-2 border-neutral-200 text-neutral-600 hover:border-neutral-300 font-semibold rounded-xl transition-colors"
              >
                Close
              </button>
              <button
                className="flex-1 px-5 py-3 bg-brand-aqua text-white font-semibold rounded-xl hover:bg-[#2BA6AD] transition-colors inline-flex items-center justify-center gap-2"
              >
                <DocumentArrowDownIcon className="w-5 h-5" />
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </CandidateDashboardLayout>
  );
}
