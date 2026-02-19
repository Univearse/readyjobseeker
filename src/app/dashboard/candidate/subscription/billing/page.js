/**
 * File: src/app/dashboard/candidate/subscription/billing/page.js
 * 
 * tomiwa: NEW - Manage Billing Page
 * A dedicated page for managing payment methods, viewing billing details,
 * and updating billing information.
 * 
 * Layout Structure:
 * ================
 * HERO BANNER: Aqua-to-teal gradient (matching subscription page)
 *              - Title: "Manage Billing"
 *              - Subtitle: Billing management description
 *              - Back button to subscription page
 * 
 * SECTION 1: Billing Overview Card
 *            - Current billing status and next charge
 *            - Billing address section
 * 
 * SECTION 2: Payment Methods (Full width)
 *            - All saved cards with edit/delete options
 *            - Add new card functionality
 * 
 * SECTION 3: Billing Preferences
 *            - Email notifications toggle
 *            - Auto-renewal settings
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import CandidateDashboardLayout from '@/components/layouts/CandidateDashboardLayout.jsx';
import { 
  CreditCardIcon, 
  ArrowLeftIcon,
  CheckCircleIcon,
  XCircleIcon,
  PlusCircleIcon,
  PencilSquareIcon,
  TrashIcon,
  ShieldCheckIcon,
  EnvelopeIcon,
  BellIcon,
  ArrowPathIcon,
  MapPinIcon,
  CalendarDaysIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';

// tomiwa: NEW - Mock data for payment methods
// ExistingCode: Sample saved payment cards for the user
const paymentMethods = [
  {
    id: 1,
    type: 'visa',
    last4: '4242',
    expiry: '12/25',
    isDefault: true,
    cardholderName: 'JOHN DOE',
  },
  {
    id: 2,
    type: 'mastercard',
    last4: '8888',
    expiry: '06/26',
    isDefault: false,
    cardholderName: 'JOHN DOE',
  },
];

// tomiwa: NEW - Mock billing address data
const billingAddress = {
  name: 'John Doe',
  address: '123 Innovation Street',
  city: 'Lagos',
  state: 'Lagos State',
  country: 'Nigeria',
  postalCode: '100001',
  email: 'johndoe@email.com',
  phone: '+234 801 234 5678',
};

// tomiwa: NEW - Mock current billing info
const currentBilling = {
  nextChargeDate: 'Feb 15, 2024',
  nextChargeAmount: '₦15,000',
  currentPlan: 'Pro Plan',
  billingCycle: 'Monthly',
  autoRenew: true,
  emailNotifications: true,
};

export default function ManageBilling() {
  // tomiwa: State for managing modals and toggles
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [showEditAddressModal, setShowEditAddressModal] = useState(false);
  const [autoRenew, setAutoRenew] = useState(currentBilling.autoRenew);
  const [emailNotifications, setEmailNotifications] = useState(currentBilling.emailNotifications);
  const [cards, setCards] = useState(paymentMethods);

  // tomiwa: NEW - Function to set a card as default
  const setDefaultCard = (cardId) => {
    setCards(cards.map(card => ({
      ...card,
      isDefault: card.id === cardId
    })));
  };

  // tomiwa: NEW - Function to delete a card (with confirmation)
  const deleteCard = (cardId) => {
    if (confirm('Are you sure you want to remove this payment method?')) {
      setCards(cards.filter(card => card.id !== cardId));
    }
  };

  return (
    <CandidateDashboardLayout>
      {/* tomiwa: HERO BANNER - Matching subscription page design */}
      {/* ExistingCode: Uses the same aqua-to-teal gradient as the main subscription page */}
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
                Manage Billing
              </h1>
              {/* tomiwa: Subtitle in uniform style */}
              <p className="text-[#D9E5E6] text-base 
                           sm:text-lg 
                           md:text-lg 
                           lg:text-xl 
                           leading-relaxed max-w-2xl">
                Manage your payment methods, billing address, and preferences
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* tomiwa: Main content area */}
      <main className="max-w-7xl mx-auto px-6 sm:px-8 md:px-10 lg:px-12 py-8 sm:py-10 md:py-12">
        
        {/* ================================================================ */}
        {/* SECTION 1: Billing Overview Card                                 */}
        {/* tomiwa: Shows current billing status and upcoming charges        */}
        {/* ================================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* tomiwa: Next Charge Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-brand-aqua/10 rounded-xl flex items-center justify-center">
                <CalendarDaysIcon className="w-6 h-6 text-brand-aqua" />
              </div>
              <div>
                <h2 className="text-xl font-display font-bold text-brand-black">Next Charge</h2>
                <p className="text-sm text-neutral-500">Your upcoming billing date</p>
              </div>
            </div>

            {/* tomiwa: Billing details grid */}
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-neutral-100">
                <span className="text-neutral-600">Next Billing Date</span>
                <span className="font-semibold text-brand-black">{currentBilling.nextChargeDate}</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-neutral-100">
                <span className="text-neutral-600">Amount</span>
                <span className="font-semibold text-brand-aqua text-xl">{currentBilling.nextChargeAmount}</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-neutral-100">
                <span className="text-neutral-600">Plan</span>
                <span className="font-semibold text-brand-black">{currentBilling.currentPlan}</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-neutral-600">Billing Cycle</span>
                <span className="px-3 py-1 bg-primary-50 text-brand-aqua text-sm font-medium rounded-full">
                  {currentBilling.billingCycle}
                </span>
              </div>
            </div>
          </div>

          {/* tomiwa: Billing Address Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-brand-orange/10 rounded-xl flex items-center justify-center">
                  <MapPinIcon className="w-6 h-6 text-brand-orange" />
                </div>
                <div>
                  <h2 className="text-xl font-display font-bold text-brand-black">Billing Address</h2>
                  <p className="text-sm text-neutral-500">Where we send your invoices</p>
                </div>
              </div>
              <button 
                onClick={() => setShowEditAddressModal(true)}
                className="p-2 text-neutral-400 hover:text-brand-aqua hover:bg-primary-50 rounded-lg transition-colors"
              >
                <PencilSquareIcon className="w-5 h-5" />
              </button>
            </div>

            {/* tomiwa: Address display */}
            <div className="bg-neutral-50 rounded-xl p-5">
              <p className="font-semibold text-brand-black mb-2">{billingAddress.name}</p>
              <p className="text-neutral-600 text-sm mb-1">{billingAddress.address}</p>
              <p className="text-neutral-600 text-sm mb-1">
                {billingAddress.city}, {billingAddress.state}
              </p>
              <p className="text-neutral-600 text-sm mb-3">{billingAddress.country} {billingAddress.postalCode}</p>
              <div className="pt-3 border-t border-neutral-200 space-y-1">
                <p className="text-neutral-600 text-sm flex items-center gap-2">
                  <EnvelopeIcon className="w-4 h-4" />
                  {billingAddress.email}
                </p>
                <p className="text-neutral-600 text-sm flex items-center gap-2">
                  <span className="w-4 h-4 flex items-center justify-center">📞</span>
                  {billingAddress.phone}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ================================================================ */}
        {/* SECTION 2: Payment Methods                                       */}
        {/* tomiwa: Full width payment methods card with management options  */}
        {/* ================================================================ */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <CreditCardIcon className="w-7 h-7 text-brand-aqua" />
              <h2 className="text-2xl font-display font-bold text-brand-black">Payment Methods</h2>
            </div>
            {/* tomiwa: Add new card button in header */}
            <button 
              onClick={() => setShowAddCardModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-brand-aqua text-white font-medium rounded-xl hover:bg-[#2BA6AD] transition-all duration-300"
            >
              <PlusCircleIcon className="w-5 h-5" />
              Add New Card
            </button>
          </div>

          {/* tomiwa: Payment cards grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {cards.map((card) => (
              <div 
                key={card.id} 
                className={`p-5 rounded-xl border-2 transition-all duration-300 ${
                  card.isDefault 
                    ? 'border-brand-aqua bg-primary-50' 
                    : 'border-neutral-200 hover:border-neutral-300 bg-white'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  {/* tomiwa: Card brand icon */}
                  <div className={`w-14 h-10 rounded-lg flex items-center justify-center ${
                    card.type === 'visa' ? 'bg-blue-600' : 'bg-orange-500'
                  }`}>
                    <span className="text-white text-sm font-bold uppercase">
                      {card.type === 'visa' ? 'VISA' : 'MC'}
                    </span>
                  </div>
                  {/* tomiwa: Default badge */}
                  {card.isDefault && (
                    <span className="px-3 py-1 bg-brand-aqua text-white text-xs font-bold rounded-full">
                      Default
                    </span>
                  )}
                </div>
                
                {/* tomiwa: Card details */}
                <p className="text-lg font-semibold text-brand-black mb-1">
                  •••• •••• •••• {card.last4}
                </p>
                <p className="text-sm text-neutral-500 mb-1">{card.cardholderName}</p>
                <p className="text-sm text-neutral-500 mb-4">Expires {card.expiry}</p>
                
                {/* tomiwa: Card actions */}
                <div className="flex items-center gap-2 pt-4 border-t border-neutral-200">
                  {!card.isDefault && (
                    <button 
                      onClick={() => setDefaultCard(card.id)}
                      className="flex-1 py-2 text-sm text-brand-aqua hover:bg-primary-50 rounded-lg font-medium transition-colors"
                    >
                      Set as Default
                    </button>
                  )}
                  {card.isDefault && (
                    <span className="flex-1 py-2 text-sm text-neutral-400 text-center">Primary Card</span>
                  )}
                  <button className="p-2 text-neutral-400 hover:text-brand-aqua hover:bg-primary-50 rounded-lg transition-colors">
                    <PencilSquareIcon className="w-5 h-5" />
                  </button>
                  {!card.isDefault && (
                    <button 
                      onClick={() => deleteCard(card.id)}
                      className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            ))}

            {/* tomiwa: Add new payment method card placeholder */}
            <div 
              onClick={() => setShowAddCardModal(true)}
              className="p-5 rounded-xl border-2 border-dashed border-neutral-300 hover:border-brand-aqua transition-all duration-300 flex flex-col items-center justify-center min-h-[200px] cursor-pointer group"
            >
              <div className="w-12 h-12 bg-neutral-100 group-hover:bg-primary-50 rounded-full flex items-center justify-center mb-3 transition-colors">
                <PlusCircleIcon className="w-6 h-6 text-neutral-400 group-hover:text-brand-aqua transition-colors" />
              </div>
              <p className="text-neutral-600 group-hover:text-brand-aqua font-medium text-sm transition-colors">
                Add Payment Method
              </p>
            </div>
          </div>

          {/* tomiwa: Security note */}
          <div className="p-4 bg-emerald-50 rounded-xl">
            <div className="flex items-center gap-3">
              <ShieldCheckIcon className="w-6 h-6 text-emerald-500 flex-shrink-0" />
              <div>
                <p className="text-sm text-neutral-700">
                  <span className="font-semibold text-emerald-700">Secure & Encrypted</span> — Your payment information is protected with industry-standard encryption. We never store your full card number.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ================================================================ */}
        {/* SECTION 3: Billing Preferences                                   */}
        {/* tomiwa: Toggle settings for auto-renewal and notifications       */}
        {/* ================================================================ */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <BellIcon className="w-7 h-7 text-brand-yellow" />
            <h2 className="text-2xl font-display font-bold text-brand-black">Billing Preferences</h2>
          </div>

          <div className="space-y-4">
            {/* tomiwa: Auto-renewal toggle */}
            <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-brand-aqua/10 rounded-lg flex items-center justify-center">
                  <ArrowPathIcon className="w-5 h-5 text-brand-aqua" />
                </div>
                <div>
                  <p className="font-semibold text-brand-black">Auto-Renewal</p>
                  <p className="text-sm text-neutral-500">Automatically renew your subscription each billing cycle</p>
                </div>
              </div>
              {/* tomiwa: Toggle switch for auto-renewal */}
              <button
                onClick={() => setAutoRenew(!autoRenew)}
                className={`relative w-14 h-8 rounded-full transition-colors duration-300 ${
                  autoRenew ? 'bg-brand-aqua' : 'bg-neutral-300'
                }`}
              >
                <span
                  className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${
                    autoRenew ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* tomiwa: Email notifications toggle */}
            <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-brand-orange/10 rounded-lg flex items-center justify-center">
                  <EnvelopeIcon className="w-5 h-5 text-brand-orange" />
                </div>
                <div>
                  <p className="font-semibold text-brand-black">Email Notifications</p>
                  <p className="text-sm text-neutral-500">Receive email receipts and billing reminders</p>
                </div>
              </div>
              {/* tomiwa: Toggle switch for email notifications */}
              <button
                onClick={() => setEmailNotifications(!emailNotifications)}
                className={`relative w-14 h-8 rounded-full transition-colors duration-300 ${
                  emailNotifications ? 'bg-brand-aqua' : 'bg-neutral-300'
                }`}
              >
                <span
                  className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${
                    emailNotifications ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* tomiwa: Update billing email section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-neutral-50 rounded-xl gap-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-brand-yellow/10 rounded-lg flex items-center justify-center">
                  <CurrencyDollarIcon className="w-5 h-5 text-brand-yellow" />
                </div>
                <div>
                  <p className="font-semibold text-brand-black">Billing Email</p>
                  <p className="text-sm text-neutral-500">{billingAddress.email}</p>
                </div>
              </div>
              <button className="px-4 py-2 border-2 border-neutral-200 text-neutral-600 hover:border-brand-aqua hover:text-brand-aqua font-medium rounded-xl transition-colors text-sm">
                Update Email
              </button>
            </div>
          </div>
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
      {/* tomiwa: NEW - Add Payment Card Modal                             */}
      {/* ExistingCode: Modal for adding a new payment method              */}
      {/* ================================================================ */}
      {showAddCardModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 sm:p-8 animate-in fade-in zoom-in duration-300">
            {/* tomiwa: Modal header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-brand-aqua/10 rounded-xl flex items-center justify-center">
                  <CreditCardIcon className="w-6 h-6 text-brand-aqua" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold text-brand-black">
                    Add Payment Method
                  </h3>
                  <p className="text-sm text-neutral-500">Enter your card details below</p>
                </div>
              </div>
              <button
                onClick={() => setShowAddCardModal(false)}
                className="w-10 h-10 rounded-full hover:bg-neutral-100 flex items-center justify-center transition-colors"
              >
                <XCircleIcon className="w-6 h-6 text-neutral-400" />
              </button>
            </div>

            {/* tomiwa: Card form */}
            <form className="space-y-4">
              {/* tomiwa: Card number field */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                  Card Number
                </label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-brand-aqua focus:border-brand-aqua transition-all text-brand-black placeholder:text-neutral-400"
                />
              </div>

              {/* tomiwa: Cardholder name field */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-brand-aqua focus:border-brand-aqua transition-all text-brand-black placeholder:text-neutral-400"
                />
              </div>

              {/* tomiwa: Expiry and CVV row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-brand-aqua focus:border-brand-aqua transition-all text-brand-black placeholder:text-neutral-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                    CVV
                  </label>
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-brand-aqua focus:border-brand-aqua transition-all text-brand-black placeholder:text-neutral-400"
                  />
                </div>
              </div>

              {/* tomiwa: Set as default checkbox */}
              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="setDefault"
                  className="w-5 h-5 rounded border-neutral-300 text-brand-aqua focus:ring-brand-aqua"
                />
                <label htmlFor="setDefault" className="text-sm text-neutral-700">
                  Set as default payment method
                </label>
              </div>

              {/* tomiwa: Security notice */}
              <div className="flex items-center gap-2 pt-2 text-sm text-neutral-500">
                <ShieldCheckIcon className="w-4 h-4 text-emerald-500" />
                <span>Your payment information is securely encrypted</span>
              </div>

              {/* tomiwa: Action buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddCardModal(false)}
                  className="flex-1 px-5 py-3 border-2 border-neutral-200 text-neutral-600 hover:border-neutral-300 font-semibold rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    // tomiwa: In a real app, this would submit to payment processor
                    setShowAddCardModal(false);
                  }}
                  className="flex-1 px-5 py-3 bg-brand-aqua text-white font-semibold rounded-xl hover:bg-[#2BA6AD] transition-colors"
                >
                  Add Card
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* tomiwa: NEW - Edit Billing Address Modal                         */}
      {/* updated: Modal for editing billing address                       */}
      {/* ================================================================ */}
      {showEditAddressModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 sm:p-8 animate-in fade-in zoom-in duration-300 max-h-[90vh] overflow-y-auto">
            {/* tomiwa: Modal header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-brand-orange/10 rounded-xl flex items-center justify-center">
                  <MapPinIcon className="w-6 h-6 text-brand-orange" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold text-brand-black">
                    Edit Billing Address
                  </h3>
                  <p className="text-sm text-neutral-500">Update your billing information</p>
                </div>
              </div>
              <button
                onClick={() => setShowEditAddressModal(false)}
                className="w-10 h-10 rounded-full hover:bg-neutral-100 flex items-center justify-center transition-colors"
              >
                <XCircleIcon className="w-6 h-6 text-neutral-400" />
              </button>
            </div>

            {/* tomiwa: Address form */}
            <form className="space-y-4">
              {/* tomiwa: Full name field */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  defaultValue={billingAddress.name}
                  className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-brand-aqua focus:border-brand-aqua transition-all text-brand-black placeholder:text-neutral-400"
                />
              </div>

              {/* tomiwa: Address field */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                  Street Address
                </label>
                <input
                  type="text"
                  defaultValue={billingAddress.address}
                  className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-brand-aqua focus:border-brand-aqua transition-all text-brand-black placeholder:text-neutral-400"
                />
              </div>

              {/* tomiwa: City and State row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                    City
                  </label>
                  <input
                    type="text"
                    defaultValue={billingAddress.city}
                    className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-brand-aqua focus:border-brand-aqua transition-all text-brand-black placeholder:text-neutral-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                    State
                  </label>
                  <input
                    type="text"
                    defaultValue={billingAddress.state}
                    className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-brand-aqua focus:border-brand-aqua transition-all text-brand-black placeholder:text-neutral-400"
                  />
                </div>
              </div>

              {/* tomiwa: Country and Postal code row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                    Country
                  </label>
                  <input
                    type="text"
                    defaultValue={billingAddress.country}
                    className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-brand-aqua focus:border-brand-aqua transition-all text-brand-black placeholder:text-neutral-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    defaultValue={billingAddress.postalCode}
                    className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-brand-aqua focus:border-brand-aqua transition-all text-brand-black placeholder:text-neutral-400"
                  />
                </div>
              </div>

              {/* tomiwa: Phone number field */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                  Phone Number
                </label>
                <input
                  type="tel"
                  defaultValue={billingAddress.phone}
                  className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-brand-aqua focus:border-brand-aqua transition-all text-brand-black placeholder:text-neutral-400"
                />
              </div>

              {/* tomiwa: Action buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowEditAddressModal(false)}
                  className="flex-1 px-5 py-3 border-2 border-neutral-200 text-neutral-600 hover:border-neutral-300 font-semibold rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    // tomiwa: In a real app, this would save the address
                    setShowEditAddressModal(false);
                  }}
                  className="flex-1 px-5 py-3 bg-brand-aqua text-white font-semibold rounded-xl hover:bg-[#2BA6AD] transition-colors"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </CandidateDashboardLayout>
  );
}
