'use client';

import React, { useState } from 'react';
import {
  XMarkIcon,
  CreditCardIcon,
  ShieldCheckIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '../Button';
import { Card } from '../Card';

// tomiwa: Modal component for managing payment methods
const PaymentMethodModal = ({ isOpen, onClose, currentCard = null }) => {
  const [formData, setFormData] = useState({
    cardNumber: currentCard?.number || '',
    expiryMonth: currentCard?.expiryMonth || '',
    expiryYear: currentCard?.expiryYear || '',
    cvv: '',
    cardholderName: currentCard?.name || '',
    billingAddress: {
      street: currentCard?.billingAddress?.street || '',
      city: currentCard?.billingAddress?.city || '',
      state: currentCard?.billingAddress?.state || '',
      zipCode: currentCard?.billingAddress?.zipCode || '',
      country: currentCard?.billingAddress?.country || 'US'
    }
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // tomiwa: Function to handle input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // tomiwa: Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  // tomiwa: Function to handle billing address changes
  const handleAddressChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      billingAddress: {
        ...prev.billingAddress,
        [field]: value
      }
    }));
  };

  // tomiwa: Function to format card number with spaces
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  // tomiwa: Function to detect card type
  const getCardType = (number) => {
    const num = number.replace(/\s/g, '');
    if (num.match(/^4/)) return 'visa';
    if (num.match(/^5[1-5]/)) return 'mastercard';
    if (num.match(/^3[47]/)) return 'amex';
    return 'unknown';
  };

  // tomiwa: Function to validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.cardNumber || formData.cardNumber.replace(/\s/g, '').length < 13) {
      newErrors.cardNumber = 'Please enter a valid card number';
    }

    if (!formData.expiryMonth || !formData.expiryYear) {
      newErrors.expiry = 'Please enter expiry date';
    }

    if (!formData.cvv || formData.cvv.length < 3) {
      newErrors.cvv = 'Please enter a valid CVV';
    }

    if (!formData.cardholderName.trim()) {
      newErrors.cardholderName = 'Please enter cardholder name';
    }

    if (!formData.billingAddress.street.trim()) {
      newErrors.street = 'Please enter billing address';
    }

    if (!formData.billingAddress.city.trim()) {
      newErrors.city = 'Please enter city';
    }

    if (!formData.billingAddress.zipCode.trim()) {
      newErrors.zipCode = 'Please enter ZIP code';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // tomiwa: Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      // tomiwa: Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // tomiwa: Close modal on success
      onClose();
    } catch (error) {
      setErrors({ submit: 'Failed to update payment method. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const cardType = getCardType(formData.cardNumber);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* tomiwa: Modal header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-200">
          <div>
            <h2 className="text-2xl font-display font-bold text-brand-black">
              {currentCard ? 'Update Payment Method' : 'Add Payment Method'}
            </h2>
            <p className="text-neutral-600 mt-1">
              Secure payment processing with 256-bit SSL encryption
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-100 rounded-xl transition-colors"
          >
            <XMarkIcon className="w-6 h-6 text-neutral-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* tomiwa: Security notice */}
          <Card className="p-4 bg-blue-50 border-blue-200">
            <div className="flex items-center gap-3">
              <ShieldCheckIcon className="w-6 h-6 text-blue-600" />
              <div className="text-sm text-blue-800">
                <p className="font-medium">Secure Payment</p>
                <p>Your payment information is encrypted and secure</p>
              </div>
            </div>
          </Card>

          {/* tomiwa: Card Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-brand-black">Card Information</h3>
            
            {/* Card Number */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Card Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.cardNumber}
                  onChange={(e) => handleInputChange('cardNumber', formatCardNumber(e.target.value))}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-brand-aqua focus:border-brand-aqua transition-colors ${
                    errors.cardNumber ? 'border-red-300' : 'border-neutral-300'
                  }`}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <CreditCardIcon className={`w-6 h-6 ${
                    cardType !== 'unknown' ? 'text-brand-aqua' : 'text-neutral-400'
                  }`} />
                </div>
              </div>
              {errors.cardNumber && (
                <p className="text-red-600 text-sm mt-1">{errors.cardNumber}</p>
              )}
            </div>

            {/* Expiry and CVV */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Expiry Date
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={formData.expiryMonth}
                    onChange={(e) => handleInputChange('expiryMonth', e.target.value)}
                    className={`px-3 py-3 border rounded-xl focus:ring-2 focus:ring-brand-aqua focus:border-brand-aqua transition-colors ${
                      errors.expiry ? 'border-red-300' : 'border-neutral-300'
                    }`}
                  >
                    <option value="">MM</option>
                    {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                      <option key={month} value={month.toString().padStart(2, '0')}>
                        {month.toString().padStart(2, '0')}
                      </option>
                    ))}
                  </select>
                  <select
                    value={formData.expiryYear}
                    onChange={(e) => handleInputChange('expiryYear', e.target.value)}
                    className={`px-3 py-3 border rounded-xl focus:ring-2 focus:ring-brand-aqua focus:border-brand-aqua transition-colors ${
                      errors.expiry ? 'border-red-300' : 'border-neutral-300'
                    }`}
                  >
                    <option value="">YY</option>
                    {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map(year => (
                      <option key={year} value={year.toString().slice(-2)}>
                        {year.toString().slice(-2)}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.expiry && (
                  <p className="text-red-600 text-sm mt-1">{errors.expiry}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  CVV
                </label>
                <input
                  type="text"
                  value={formData.cvv}
                  onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, '').slice(0, 4))}
                  placeholder="123"
                  maxLength={4}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-brand-aqua focus:border-brand-aqua transition-colors ${
                    errors.cvv ? 'border-red-300' : 'border-neutral-300'
                  }`}
                />
                {errors.cvv && (
                  <p className="text-red-600 text-sm mt-1">{errors.cvv}</p>
                )}
              </div>
            </div>

            {/* Cardholder Name */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Cardholder Name
              </label>
              <input
                type="text"
                value={formData.cardholderName}
                onChange={(e) => handleInputChange('cardholderName', e.target.value)}
                placeholder="John Doe"
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-brand-aqua focus:border-brand-aqua transition-colors ${
                  errors.cardholderName ? 'border-red-300' : 'border-neutral-300'
                }`}
              />
              {errors.cardholderName && (
                <p className="text-red-600 text-sm mt-1">{errors.cardholderName}</p>
              )}
            </div>
          </div>

          {/* tomiwa: Billing Address */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-brand-black">Billing Address</h3>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Street Address
              </label>
              <input
                type="text"
                value={formData.billingAddress.street}
                onChange={(e) => handleAddressChange('street', e.target.value)}
                placeholder="123 Main Street"
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-brand-aqua focus:border-brand-aqua transition-colors ${
                  errors.street ? 'border-red-300' : 'border-neutral-300'
                }`}
              />
              {errors.street && (
                <p className="text-red-600 text-sm mt-1">{errors.street}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  City
                </label>
                <input
                  type="text"
                  value={formData.billingAddress.city}
                  onChange={(e) => handleAddressChange('city', e.target.value)}
                  placeholder="San Francisco"
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-brand-aqua focus:border-brand-aqua transition-colors ${
                    errors.city ? 'border-red-300' : 'border-neutral-300'
                  }`}
                />
                {errors.city && (
                  <p className="text-red-600 text-sm mt-1">{errors.city}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  State
                </label>
                <select
                  value={formData.billingAddress.state}
                  onChange={(e) => handleAddressChange('state', e.target.value)}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-brand-aqua focus:border-brand-aqua transition-colors"
                >
                  <option value="">Select State</option>
                  <option value="CA">California</option>
                  <option value="NY">New York</option>
                  <option value="TX">Texas</option>
                  {/* Add more states as needed */}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  ZIP Code
                </label>
                <input
                  type="text"
                  value={formData.billingAddress.zipCode}
                  onChange={(e) => handleAddressChange('zipCode', e.target.value)}
                  placeholder="94105"
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-brand-aqua focus:border-brand-aqua transition-colors ${
                    errors.zipCode ? 'border-red-300' : 'border-neutral-300'
                  }`}
                />
                {errors.zipCode && (
                  <p className="text-red-600 text-sm mt-1">{errors.zipCode}</p>
                )}
              </div>
            </div>
          </div>

          {/* tomiwa: Error message */}
          {errors.submit && (
            <Card className="p-4 bg-red-50 border-red-200">
              <div className="flex items-center gap-3">
                <ExclamationCircleIcon className="w-6 h-6 text-red-600" />
                <p className="text-red-800 text-sm">{errors.submit}</p>
              </div>
            </Card>
          )}

          {/* tomiwa: Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-end pt-4 border-t border-neutral-200">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="sm:w-auto w-full"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="sm:w-auto w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Processing...
                </div>
              ) : (
                currentCard ? 'Update Payment Method' : 'Add Payment Method'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentMethodModal;
