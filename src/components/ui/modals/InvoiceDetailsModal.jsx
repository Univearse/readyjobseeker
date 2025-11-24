'use client';

import React from 'react';
import {
  XMarkIcon,
  DocumentArrowDownIcon,
  PrinterIcon,
  EnvelopeIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '../Button';
import { Card } from '../Card';
import StatusBadge from '../StatusBadge';

// tomiwa: Modal component for viewing invoice details
const InvoiceDetailsModal = ({ isOpen, onClose, invoice = null }) => {
  if (!isOpen || !invoice) return null;

  // tomiwa: Mock invoice data structure
  const invoiceData = {
    id: invoice.id || 'INV-2024-003',
    number: invoice.invoice || 'INV-2024-003',
    date: invoice.date || '2024-03-15',
    dueDate: '2024-03-30',
    status: invoice.status || 'paid',
    amount: invoice.amount || 199,
    tax: 19.9,
    subtotal: 179.1,
    description: invoice.description || 'Professional Plan - Monthly',
    
    // Company details
    company: {
      name: 'ReadyJobSeeker Inc.',
      address: '123 Business Avenue',
      city: 'San Francisco, CA 94105',
      email: 'billing@readyjobseeker.com',
      phone: '+1 (555) 123-4567',
      taxId: 'TAX-123456789'
    },
    
    // Customer details
    customer: {
      name: 'Tech Corp Inc.',
      address: '456 Corporate Blvd',
      city: 'San Francisco, CA 94107',
      email: 'billing@techcorp.com',
      taxId: 'TAX-987654321'
    },
    
    // Line items
    items: [
      {
        description: 'Professional Plan Subscription',
        period: 'March 15, 2024 - April 14, 2024',
        quantity: 1,
        unitPrice: 199,
        total: 199
      }
    ],
    
    // Payment details
    payment: {
      method: 'Credit Card (**** 4242)',
      transactionId: 'txn_1234567890',
      paidDate: '2024-03-15'
    }
  };

  // tomiwa: Function to format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  // tomiwa: Function to format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // tomiwa: Function to handle download
  const handleDownload = () => {
    // tomiwa: In a real app, this would generate and download a PDF
    console.log('Downloading invoice:', invoiceData.number);
  };

  // tomiwa: Function to handle print
  const handlePrint = () => {
    window.print();
  };

  // tomiwa: Function to handle email
  const handleEmail = () => {
    // tomiwa: In a real app, this would send the invoice via email
    console.log('Emailing invoice:', invoiceData.number);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* tomiwa: Modal header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-200">
          <div>
            <h2 className="text-2xl font-display font-bold text-brand-black">
              Invoice Details
            </h2>
            <p className="text-neutral-600 mt-1">
              Invoice {invoiceData.number}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* Action buttons */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleEmail}
              className="flex items-center gap-2"
            >
              <EnvelopeIcon className="w-4 h-4" />
              Email
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handlePrint}
              className="flex items-center gap-2"
            >
              <PrinterIcon className="w-4 h-4" />
              Print
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              className="flex items-center gap-2"
            >
              <DocumentArrowDownIcon className="w-4 h-4" />
              Download
            </Button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-neutral-100 rounded-xl transition-colors"
            >
              <XMarkIcon className="w-6 h-6 text-neutral-500" />
            </button>
          </div>
        </div>

        {/* tomiwa: Invoice content */}
        <div className="p-8 space-y-8">
          {/* Invoice header */}
          <div className="flex flex-col lg:flex-row justify-between gap-8">
            <div>
              <h1 className="text-3xl font-display font-bold text-brand-black mb-2">
                INVOICE
              </h1>
              <div className="space-y-1 text-sm">
                <p><span className="font-medium">Invoice Number:</span> {invoiceData.number}</p>
                <p><span className="font-medium">Invoice Date:</span> {formatDate(invoiceData.date)}</p>
                <p><span className="font-medium">Due Date:</span> {formatDate(invoiceData.dueDate)}</p>
              </div>
            </div>
            
            <div className="text-right">
              <StatusBadge 
                status={invoiceData.status === 'paid' ? 'success' : 'warning'}
                text={invoiceData.status.toUpperCase()}
                className="mb-4"
              />
              <div className="text-3xl font-bold text-brand-black">
                {formatCurrency(invoiceData.amount)}
              </div>
            </div>
          </div>

          {/* Company and customer details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* From */}
            <Card className="p-6">
              <h3 className="font-medium text-brand-black mb-4">From</h3>
              <div className="space-y-1 text-sm text-neutral-600">
                <p className="font-medium text-brand-black">{invoiceData.company.name}</p>
                <p>{invoiceData.company.address}</p>
                <p>{invoiceData.company.city}</p>
                <p>{invoiceData.company.email}</p>
                <p>{invoiceData.company.phone}</p>
                <p>Tax ID: {invoiceData.company.taxId}</p>
              </div>
            </Card>

            {/* To */}
            <Card className="p-6">
              <h3 className="font-medium text-brand-black mb-4">Bill To</h3>
              <div className="space-y-1 text-sm text-neutral-600">
                <p className="font-medium text-brand-black">{invoiceData.customer.name}</p>
                <p>{invoiceData.customer.address}</p>
                <p>{invoiceData.customer.city}</p>
                <p>{invoiceData.customer.email}</p>
                <p>Tax ID: {invoiceData.customer.taxId}</p>
              </div>
            </Card>
          </div>

          {/* Line items */}
          <Card className="overflow-hidden">
            <div className="bg-neutral-50 px-6 py-4 border-b border-neutral-200">
              <h3 className="font-medium text-brand-black">Items</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-neutral-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-neutral-600">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-neutral-600">
                      Period
                    </th>
                    <th className="px-6 py-3 text-right text-sm font-medium text-neutral-600">
                      Qty
                    </th>
                    <th className="px-6 py-3 text-right text-sm font-medium text-neutral-600">
                      Unit Price
                    </th>
                    <th className="px-6 py-3 text-right text-sm font-medium text-neutral-600">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {invoiceData.items.map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 text-sm text-brand-black font-medium">
                        {item.description}
                      </td>
                      <td className="px-6 py-4 text-sm text-neutral-600">
                        {item.period}
                      </td>
                      <td className="px-6 py-4 text-sm text-neutral-600 text-right">
                        {item.quantity}
                      </td>
                      <td className="px-6 py-4 text-sm text-neutral-600 text-right">
                        {formatCurrency(item.unitPrice)}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-brand-black text-right">
                        {formatCurrency(item.total)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Totals */}
          <div className="flex justify-end">
            <div className="w-full max-w-sm space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">Subtotal</span>
                <span className="font-medium text-brand-black">
                  {formatCurrency(invoiceData.subtotal)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">Tax (10%)</span>
                <span className="font-medium text-brand-black">
                  {formatCurrency(invoiceData.tax)}
                </span>
              </div>
              <div className="border-t border-neutral-200 pt-3 flex justify-between">
                <span className="font-medium text-brand-black">Total</span>
                <span className="font-bold text-xl text-brand-black">
                  {formatCurrency(invoiceData.amount)}
                </span>
              </div>
            </div>
          </div>

          {/* Payment information */}
          {invoiceData.status === 'paid' && (
            <Card className="p-6 bg-emerald-50 border-emerald-200">
              <div className="flex items-start gap-3">
                <CheckCircleIcon className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium text-emerald-800 mb-2">Payment Received</h3>
                  <div className="space-y-1 text-sm text-emerald-700">
                    <p><span className="font-medium">Payment Method:</span> {invoiceData.payment.method}</p>
                    <p><span className="font-medium">Transaction ID:</span> {invoiceData.payment.transactionId}</p>
                    <p><span className="font-medium">Payment Date:</span> {formatDate(invoiceData.payment.paidDate)}</p>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Footer */}
          <div className="text-center text-sm text-neutral-500 pt-8 border-t border-neutral-200">
            <p>Thank you for your business!</p>
            <p className="mt-1">
              For questions about this invoice, please contact us at {invoiceData.company.email}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetailsModal;
