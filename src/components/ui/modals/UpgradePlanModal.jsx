'use client';

import React, { useState } from 'react';
import {
  XMarkIcon,
  StarIcon,
  CheckCircleIcon,
  CreditCardIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  ShieldCheckIcon,
  BanknotesIcon,
  CalendarIcon,
  ClockIcon,
  DocumentTextIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import { Button } from '../Button';
import { Card } from '../Card';

// tomiwa: Modal component for upgrading subscription plans with multi-step flow
// johnson: ExistingCode - Modal accepts preSelectedPlan to show specific plan when user clicks upgrade
const UpgradePlanModal = ({ isOpen, onClose, currentPlan = 'Starter', preSelectedPlan = null }) => {
  // tomiwa: Use preSelectedPlan if provided, otherwise default to Premium
  const [selectedPlan, setSelectedPlan] = useState(preSelectedPlan || 'Premium');
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [currentStep, setCurrentStep] = useState(1); // tomiwa: New state for multi-step flow (1: Select Plan, 2: Review, 3: Payment, 4: Success)
  const [paymentMethod, setPaymentMethod] = useState('card'); // tomiwa: card, bank, paypal
  const [isProcessing, setIsProcessing] = useState(false); // tomiwa: Loading state for payment processing

  // tomiwa: Update selectedPlan when preSelectedPlan changes (when modal opens with a specific plan)
  React.useEffect(() => {
    if (preSelectedPlan) {
      setSelectedPlan(preSelectedPlan);
    }
  }, [preSelectedPlan]);

  // tomiwa: Reset to step 1 and default payment method when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setCurrentStep(1);
      setIsProcessing(false);
      setPaymentMethod('card'); // johnson: Reset to card as default payment method
    }
  }, [isOpen]);

  // tomiwa: Available plans with pricing and features in Nigerian Naira
  const plans = [
    {
      name: 'Free Post',
      monthlyPrice: 0,
      yearlyPrice: 0,
      features: [
        '1 active job posting',
        'Basic search visibility',
        'Standard applicant inbox',
        'Email notifications',
        'Basic job analytics'
      ],
      popular: false
    },
    {
      name: 'Starter',
      monthlyPrice: 19999,
      yearlyPrice: 191990.40, // tomiwa: 20% discount for yearly (19999 * 12 * 0.8)
      features: [
        '3 active job postings',
        'AI candidate matching',
        'Basic analytics dashboard',
        'Priority support',
        'Custom job alerts'
      ],
      popular: false
    },
    {
      name: 'Premium',
      monthlyPrice: 39999,
      yearlyPrice: 383990.40, // tomiwa: 20% discount for yearly (39999 * 12 * 0.8)
      features: [
        '5 active job postings',
        'Featured placement',
        'AI candidate ranking',
        'Limited CV database',
        'Advanced analytics'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      monthlyPrice: 79999,
      yearlyPrice: 767990.40, // tomiwa: 20% discount for yearly (79999 * 12 * 0.8)
      features: [
        'Unlimited job postings',
        'Custom branding',
        'Full CV database access',
        'API access',
        'Dedicated support'
      ],
      popular: false
    }
  ];

  // tomiwa: Function to format currency in Nigerian Naira
  const formatCurrency = (amount) => {
    // tomiwa: For Free plan, display "Free" instead of ₦0
    if (amount === 0) {
      return 'Free';
    }
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // tomiwa: Function to calculate savings for yearly billing
  const calculateSavings = (plan) => {
    const monthlyTotal = plan.monthlyPrice * 12;
    const savings = monthlyTotal - plan.yearlyPrice;
    return Math.round((savings / monthlyTotal) * 100);
  };

  // tomiwa: Handler to process payment and upgrade
  const handleUpgradePayment = () => {
    setIsProcessing(true);
    // tomiwa: Simulate payment processing (2 seconds)
    setTimeout(() => {
      setIsProcessing(false);
      setCurrentStep(4); // tomiwa: Move to success step
    }, 2000);
  };

  // tomiwa: Get step titles for progress indicator
  const stepTitles = [
    'Select Plan',
    'Review Details',
    'Payment Method',
    'Confirmation'
  ];

  // tomiwa: Get selected plan details
  const getSelectedPlanDetails = () => {
    return plans.find(p => p.name === selectedPlan);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      {/* tomiwa: Larger modal to accommodate different steps - max-w-6xl for better display */}
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* tomiwa: Modal header with step indicator */}
        <div className="border-b border-neutral-200">
          <div className="flex items-center justify-between p-6">
            <div>
              <h2 className="text-2xl font-display font-bold text-brand-black">
                {currentStep === 4 ? '🎉 Upgrade Successful!' : 'Upgrade Your Plan'}
              </h2>
              <p className="text-neutral-600 mt-1">
                {currentStep === 1 && 'Choose the plan that best fits your hiring needs'}
                {currentStep === 2 && 'Review your upgrade details before proceeding'}
                {currentStep === 3 && 'Select your payment method to complete upgrade'}
                {currentStep === 4 && 'Your subscription has been successfully upgraded'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-neutral-100 rounded-xl transition-colors"
            >
              <XMarkIcon className="w-6 h-6 text-neutral-500" />
            </button>
          </div>
          
          {/* tomiwa: Progress indicator - Only show on steps 1-3 */}
          {currentStep < 4 && (
            <div className="px-6 pb-6">
              <div className="flex items-center justify-between">
                {stepTitles.slice(0, 3).map((title, index) => {
                  const stepNumber = index + 1;
                  const isActive = stepNumber === currentStep;
                  const isCompleted = stepNumber < currentStep;
                  
                  return (
                    <div key={stepNumber} className="flex items-center flex-1">
                      <div className="flex flex-col items-center flex-1">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                          isCompleted 
                            ? 'bg-emerald-500 text-white' 
                            : isActive 
                            ? 'bg-brand-orange text-white ring-4 ring-brand-orange/20' 
                            : 'bg-neutral-200 text-neutral-500'
                        }`}>
                          {isCompleted ? <CheckCircleIcon className="w-6 h-6" /> : stepNumber}
                        </div>
                        <span className={`text-xs mt-2 font-medium ${
                          isActive ? 'text-brand-orange' : isCompleted ? 'text-emerald-600' : 'text-neutral-500'
                        }`}>
                          {title}
                        </span>
                      </div>
                      {index < 2 && (
                        <div className={`h-1 flex-1 mx-2 rounded-full transition-all duration-300 ${
                          stepNumber < currentStep ? 'bg-emerald-500' : 'bg-neutral-200'
                        }`} />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="p-6">
          {/* tomiwa: STEP 1 - Plan Selection */}
          {currentStep === 1 && (
            <>
              {/* tomiwa: Billing cycle toggle */}
              <div className="flex items-center justify-center mb-8">
                <div className="bg-neutral-100 rounded-xl p-1 flex">
                  <button
                    onClick={() => setBillingCycle('monthly')}
                    className={`px-6 py-2 rounded-lg font-medium text-sm transition-all ${
                      billingCycle === 'monthly'
                        ? 'bg-white text-brand-black shadow-sm'
                        : 'text-neutral-600 hover:text-brand-black'
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setBillingCycle('yearly')}
                    className={`px-6 py-2 rounded-lg font-medium text-sm transition-all relative ${
                      billingCycle === 'yearly'
                        ? 'bg-white text-brand-black shadow-sm'
                        : 'text-neutral-600 hover:text-brand-black'
                    }`}
                  >
                    Yearly
                    <span className="absolute -top-2 -right-2 bg-brand-orange text-white text-xs px-2 py-0.5 rounded-full">
                      Save 20%
                    </span>
                  </button>
                </div>
              </div>

          {/* tomiwa: Plan selection grid - Responsive layout for all 4 plans
               Mobile: 1 column, Tablet: 2 columns, Desktop: 4 columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {plans.map((plan) => {
              const price = billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
              const isSelected = selectedPlan === plan.name;
              const isCurrent = currentPlan === plan.name;
              const savings = calculateSavings(plan);

              return (
                <Card
                  key={plan.name}
                  className={`relative p-6 transition-all ${
                    isCurrent
                      ? 'ring-2 ring-neutral-300 border-neutral-300 bg-neutral-50 cursor-not-allowed opacity-75'
                      : isSelected
                      ? 'ring-2 ring-brand-orange border-brand-orange cursor-pointer'
                      : 'hover:border-brand-aqua cursor-pointer'
                  }`}
                  onClick={() => !isCurrent && setSelectedPlan(plan.name)}
                >
                  {isCurrent && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-brand-orange to-red-500 text-white px-4 py-1 rounded-full text-xs font-semibold shadow-md">
                        Current Plan
                      </span>
                    </div>
                  )}
                  {plan.popular && !isCurrent && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-brand-aqua to-brand-orange text-white px-4 py-1 rounded-full text-xs font-semibold shadow-md">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <StarIcon className={`w-6 h-6 ${isSelected ? 'text-brand-orange' : 'text-neutral-400'}`} />
                      <h3 className="text-xl font-display font-bold text-brand-black">
                        {plan.name}
                      </h3>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      isSelected 
                        ? 'border-brand-orange bg-brand-orange' 
                        : 'border-neutral-300'
                    }`}>
                      {isSelected && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                  </div>

                  <div className="mb-6">
                    {/* tomiwa: Display price - handles Free plan differently */}
                    {price === 0 ? (
                      <div className="text-3xl font-bold text-brand-black">
                        Free
                      </div>
                    ) : (
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-brand-black">
                          {formatCurrency(billingCycle === 'monthly' ? price : price / 12)}
                        </span>
                        <span className="text-neutral-600 text-sm">
                          /mo
                        </span>
                      </div>
                    )}
                    {billingCycle === 'yearly' && savings > 0 && price > 0 && (
                      <div className="text-sm text-emerald-600 mt-2 font-medium">
                        Save {savings}% with yearly billing
                      </div>
                    )}
                  </div>

                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircleIcon className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span className="text-neutral-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              );
            })}
          </div>

              {/* tomiwa: Upgrade summary for Step 1 */}
              <Card className="p-6 bg-neutral-50 border-neutral-200 mb-6">
                <h4 className="font-medium text-brand-black mb-4">Selected Plan Summary</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Current Plan</span>
                    <span className="font-medium text-brand-black">{currentPlan}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">New Plan</span>
                    <span className="font-medium text-brand-black">{selectedPlan}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Billing Cycle</span>
                    <span className="font-medium text-brand-black capitalize">{billingCycle}</span>
                  </div>
                  <div className="border-t border-neutral-200 pt-3 flex justify-between">
                    <span className="font-medium text-brand-black">
                      {billingCycle === 'monthly' ? 'Monthly Cost' : 'Total Yearly Cost'}
                    </span>
                    <span className="font-bold text-brand-black text-lg">
                      {formatCurrency(
                        plans.find(p => p.name === selectedPlan)?.[billingCycle === 'monthly' ? 'monthlyPrice' : 'yearlyPrice'] || 0
                      )}
                    </span>
                  </div>
                </div>
              </Card>

              {/* tomiwa: Action buttons for Step 1 */}
              <div className="flex flex-col sm:flex-row gap-4 justify-end">
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="sm:w-auto w-full"
                >
                  Cancel
                </Button>
                <Button
                  disabled={currentPlan === selectedPlan}
                  className={`sm:w-auto w-full flex items-center justify-center gap-2 ${
                    currentPlan === selectedPlan 
                      ? 'bg-neutral-300 cursor-not-allowed' 
                      : 'bg-brand-orange hover:bg-brand-orange/90'
                  }`}
                  onClick={() => setCurrentStep(2)}
                >
                  Continue to Review
                  <ArrowRightIcon className="w-4 h-4" />
                </Button>
              </div>

              {/* tomiwa: Additional info */}
              <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                <div className="flex items-start gap-3">
                  <CheckCircleIcon className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-1">What happens next?</p>
                    <ul className="space-y-1 text-blue-700">
                      <li>• Your new plan will be activated immediately</li>
                      <li>• You'll be charged a prorated amount for the current billing period</li>
                      <li>• All new features will be available right away</li>
                      <li>• You can cancel or change plans anytime</li>
                    </ul>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* tomiwa: STEP 2 - Review Details */}
          {currentStep === 2 && (
            <>
              <div className="space-y-6">
                {/* tomiwa: Upgrade comparison */}
                <Card className="p-6 border-2 border-brand-orange/20 bg-gradient-to-br from-orange-50 to-white">
                  <h3 className="text-lg font-bold text-brand-black mb-6 flex items-center gap-2">
                    <SparklesIcon className="w-6 h-6 text-brand-orange" />
                    Upgrade Details
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Current Plan */}
                    <div className="p-4 bg-white rounded-xl border border-neutral-200">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 bg-neutral-400 rounded-full"></div>
                        <span className="text-sm font-medium text-neutral-600">Current Plan</span>
                      </div>
                      <h4 className="text-xl font-bold text-brand-black mb-2">{currentPlan}</h4>
                      <div className="space-y-2">
                        {plans.find(p => p.name === currentPlan)?.features.slice(0, 3).map((feature, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm text-neutral-600">
                            <CheckCircleIcon className="w-4 h-4 text-neutral-400" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* New Plan */}
                    <div className="p-4 bg-gradient-to-br from-brand-orange/10 to-brand-aqua/10 rounded-xl border-2 border-brand-orange">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 bg-brand-orange rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium text-brand-orange">New Plan</span>
                      </div>
                      <h4 className="text-xl font-bold text-brand-black mb-2">{selectedPlan}</h4>
                      <div className="space-y-2">
                        {getSelectedPlanDetails()?.features.slice(0, 3).map((feature, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm text-neutral-700">
                            <CheckCircleIcon className="w-4 h-4 text-emerald-500" />
                            <span className="font-medium">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Pricing breakdown */}
                  <div className="border-t border-neutral-200 pt-4">
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-neutral-600">Plan Price</span>
                        <span className="font-medium text-brand-black">
                          {formatCurrency(
                            getSelectedPlanDetails()?.[billingCycle === 'monthly' ? 'monthlyPrice' : 'yearlyPrice'] || 0
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-neutral-600">Billing Cycle</span>
                        <span className="font-medium text-brand-black capitalize">{billingCycle}</span>
                      </div>
                      {billingCycle === 'yearly' && (
                        <div className="flex justify-between text-sm">
                          <span className="text-emerald-600">Yearly Savings</span>
                          <span className="font-bold text-emerald-600">Save 20%</span>
                        </div>
                      )}
                      <div className="border-t border-neutral-200 pt-3 flex justify-between">
                        <span className="text-lg font-bold text-brand-black">Total Today</span>
                        <span className="text-2xl font-bold text-brand-orange">
                          {formatCurrency(
                            getSelectedPlanDetails()?.[billingCycle === 'monthly' ? 'monthlyPrice' : 'yearlyPrice'] || 0
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* What's included */}
                <Card className="p-6">
                  <h4 className="font-bold text-brand-black mb-4">What's Included in {selectedPlan}</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {getSelectedPlanDetails()?.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-emerald-50 rounded-xl">
                        <CheckCircleIcon className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-neutral-700 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Action buttons for Step 2 */}
                <div className="flex flex-col sm:flex-row gap-4 justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(1)}
                    className="sm:w-auto w-full flex items-center gap-2"
                  >
                    <ArrowLeftIcon className="w-4 h-4" />
                    Back to Plans
                  </Button>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      variant="outline"
                      onClick={onClose}
                      className="sm:w-auto w-full"
                    >
                      Cancel
                    </Button>
                    <Button
                      className="sm:w-auto w-full flex items-center justify-center gap-2 bg-brand-orange hover:bg-brand-orange/90"
                      onClick={() => setCurrentStep(3)}
                    >
                      Proceed to Payment
                      <ArrowRightIcon className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* tomiwa: STEP 3 - Payment Method */}
          {currentStep === 3 && (
            <>
              <div className="space-y-6">
                {/* Payment methods */}
                <div>
                  <h3 className="text-lg font-bold text-brand-black mb-2">Select Payment Method</h3>
                  {/* johnson: Debug indicator - Shows current payment method state */}
                  <p className="text-xs text-neutral-500 mb-4">
                    Current selection: <span className="font-bold text-brand-orange">{paymentMethod}</span>
                  </p>
                  {/* tomiwa: Payment method cards - All clickable with enhanced visual feedback
                       Mobile: 1 column, Tablet+: 3 columns side by side */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    {/* tomiwa: Credit/Debit Card Option */}
                    <Card 
                      className={`p-6 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                        paymentMethod === 'card' 
                          ? 'ring-2 ring-brand-orange border-brand-orange bg-orange-50 shadow-lg' 
                          : 'hover:border-brand-aqua hover:shadow-md'
                      }`}
                      onClick={() => {
                        console.log('Card clicked'); // johnson: Debug log
                        setPaymentMethod('card');
                      }}
                    >
                      <div className="flex flex-col items-center text-center gap-3">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                          paymentMethod === 'card' ? 'bg-brand-orange shadow-md' : 'bg-neutral-100'
                        }`}>
                          <CreditCardIcon className={`w-6 h-6 transition-colors ${
                            paymentMethod === 'card' ? 'text-white' : 'text-neutral-600'
                          }`} />
                        </div>
                        <div>
                          <h4 className="font-bold text-brand-black mb-1">Card</h4>
                          <p className="text-xs text-neutral-600">Credit or Debit</p>
                        </div>
                        {/* tomiwa: Show checkmark when selected */}
                        {paymentMethod === 'card' && (
                          <CheckCircleIcon className="w-5 h-5 text-brand-orange animate-pulse" />
                        )}
                      </div>
                    </Card>

                    {/* tomiwa: Bank Transfer Option - Fully clickable and functional */}
                    <Card 
                      className={`p-6 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                        paymentMethod === 'bank' 
                          ? 'ring-2 ring-brand-orange border-brand-orange bg-orange-50 shadow-lg' 
                          : 'hover:border-brand-aqua hover:shadow-md'
                      }`}
                      onClick={() => {
                        console.log('Bank clicked'); // johnson: Debug log
                        setPaymentMethod('bank');
                      }}
                    >
                      <div className="flex flex-col items-center text-center gap-3">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                          paymentMethod === 'bank' ? 'bg-brand-orange shadow-md' : 'bg-neutral-100'
                        }`}>
                          <BanknotesIcon className={`w-6 h-6 transition-colors ${
                            paymentMethod === 'bank' ? 'text-white' : 'text-neutral-600'
                          }`} />
                        </div>
                        <div>
                          <h4 className="font-bold text-brand-black mb-1">Bank</h4>
                          <p className="text-xs text-neutral-600">Direct Transfer</p>
                        </div>
                        {/* tomiwa: Show checkmark when selected */}
                        {paymentMethod === 'bank' && (
                          <CheckCircleIcon className="w-5 h-5 text-brand-orange animate-pulse" />
                        )}
                      </div>
                    </Card>

                    {/* tomiwa: PayPal Option - Fully clickable and functional */}
                    <Card 
                      className={`p-6 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                        paymentMethod === 'paypal' 
                          ? 'ring-2 ring-brand-orange border-brand-orange bg-orange-50 shadow-lg' 
                          : 'hover:border-brand-aqua hover:shadow-md'
                      }`}
                      onClick={() => {
                        console.log('PayPal clicked'); // johnson: Debug log
                        setPaymentMethod('paypal');
                      }}
                    >
                      <div className="flex flex-col items-center text-center gap-3">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                          paymentMethod === 'paypal' ? 'bg-brand-orange shadow-md' : 'bg-neutral-100'
                        }`}>
                          <ShieldCheckIcon className={`w-6 h-6 transition-colors ${
                            paymentMethod === 'paypal' ? 'text-white' : 'text-neutral-600'
                          }`} />
                        </div>
                        <div>
                          <h4 className="font-bold text-brand-black mb-1">PayPal</h4>
                          <p className="text-xs text-neutral-600">Fast & Secure</p>
                        </div>
                        {/* tomiwa: Show checkmark when selected */}
                        {paymentMethod === 'paypal' && (
                          <CheckCircleIcon className="w-5 h-5 text-brand-orange animate-pulse" />
                        )}
                      </div>
                    </Card>
                  </div>

                  {/* tomiwa: Payment form based on selection - Each section appears with smooth animation */}
                  {/* johnson: Card payment form - Shows card input fields */}
                  {paymentMethod === 'card' && (
                    <Card className="p-6 bg-gradient-to-br from-neutral-50 to-white border-2 border-brand-orange/20 
                                     animate-fadeIn shadow-lg">
                      <h4 className="font-medium text-brand-black mb-4 flex items-center gap-2">
                        <CreditCardIcon className="w-5 h-5 text-brand-orange" />
                        Card Details
                      </h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-neutral-700 mb-2">Card Number</label>
                          <input 
                            type="text" 
                            placeholder="1234 5678 9012 3456"
                            className="w-full px-4 py-3 border border-neutral-300 rounded-xl 
                                       focus:ring-2 focus:ring-brand-orange focus:border-brand-orange
                                       transition-all duration-200"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-2">Expiry Date</label>
                            <input 
                              type="text" 
                              placeholder="MM/YY"
                              className="w-full px-4 py-3 border border-neutral-300 rounded-xl 
                                         focus:ring-2 focus:ring-brand-orange focus:border-brand-orange
                                         transition-all duration-200"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-neutral-700 mb-2">CVV</label>
                            <input 
                              type="text" 
                              placeholder="123"
                              className="w-full px-4 py-3 border border-neutral-300 rounded-xl 
                                         focus:ring-2 focus:ring-brand-orange focus:border-brand-orange
                                         transition-all duration-200"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-neutral-700 mb-2">Cardholder Name</label>
                          <input 
                            type="text" 
                            placeholder="John Doe"
                            className="w-full px-4 py-3 border border-neutral-300 rounded-xl 
                                       focus:ring-2 focus:ring-brand-orange focus:border-brand-orange
                                       transition-all duration-200"
                          />
                        </div>
                      </div>
                    </Card>
                  )}

                  {/* johnson: Bank transfer section - Shows bank account details */}
                  {paymentMethod === 'bank' && (
                    <Card className="p-6 bg-gradient-to-br from-blue-50 to-white border-2 border-brand-aqua/20 
                                     animate-fadeIn shadow-lg">
                      <h4 className="font-medium text-brand-black mb-2 flex items-center gap-2">
                        <BanknotesIcon className="w-5 h-5 text-brand-aqua" />
                        Bank Transfer Instructions
                      </h4>
                      <p className="text-sm text-neutral-600 mb-4">
                        Transfer funds to the account below and we'll activate your plan within 24 hours.
                      </p>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between p-4 bg-white rounded-xl border border-neutral-200 
                                        hover:border-brand-aqua transition-all duration-200">
                          <span className="text-neutral-600 font-medium">Bank Name</span>
                          <span className="font-bold text-brand-black">FirstBank Nigeria</span>
                        </div>
                        <div className="flex justify-between p-4 bg-white rounded-xl border border-neutral-200 
                                        hover:border-brand-aqua transition-all duration-200">
                          <span className="text-neutral-600 font-medium">Account Number</span>
                          <span className="font-bold text-brand-black">1234567890</span>
                        </div>
                        <div className="flex justify-between p-4 bg-white rounded-xl border border-neutral-200 
                                        hover:border-brand-aqua transition-all duration-200">
                          <span className="text-neutral-600 font-medium">Account Name</span>
                          <span className="font-bold text-brand-black">ReadyJobSeeker Ltd</span>
                        </div>
                      </div>
                      {/* tomiwa: Help notice for bank transfer */}
                      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-xl">
                        <p className="text-xs text-blue-800">
                          💡 <span className="font-medium">Tip:</span> Include your email address in the transfer reference
                        </p>
                      </div>
                    </Card>
                  )}

                  {/* johnson: PayPal section - Shows PayPal redirect info */}
                  {paymentMethod === 'paypal' && (
                    <Card className="p-6 bg-gradient-to-br from-purple-50 to-white border-2 border-purple-200 
                                     animate-fadeIn shadow-lg">
                      <div className="text-center py-8">
                        <div className="w-16 h-16 bg-gradient-to-br from-brand-aqua to-blue-500 
                                        rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                          <ShieldCheckIcon className="w-10 h-10 text-white" />
                        </div>
                        <h4 className="font-bold text-brand-black mb-2 text-lg">PayPal Payment</h4>
                        <p className="text-sm text-neutral-600 mb-4 max-w-md mx-auto">
                          You'll be redirected to PayPal to complete your payment securely. 
                          Your subscription will be activated immediately after successful payment.
                        </p>
                        {/* tomiwa: PayPal features */}
                        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mt-6">
                          <div className="flex items-center gap-2 text-sm text-emerald-600">
                            <CheckCircleIcon className="w-4 h-4" />
                            <span>Secure Payment</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-emerald-600">
                            <CheckCircleIcon className="w-4 h-4" />
                            <span>Instant Activation</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-emerald-600">
                            <CheckCircleIcon className="w-4 h-4" />
                            <span>Buyer Protection</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  )}
                </div>

                {/* Order summary */}
                <Card className="p-6 bg-gradient-to-br from-brand-aqua/10 to-brand-orange/10 border-2 border-brand-orange/20">
                  <h4 className="font-bold text-brand-black mb-4">Order Summary</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-700">Plan</span>
                      <span className="font-medium text-brand-black">{selectedPlan} ({billingCycle})</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-700">Start Date</span>
                      <span className="font-medium text-brand-black">Immediately</span>
                    </div>
                    <div className="border-t border-neutral-200 pt-3 flex justify-between">
                      <span className="text-lg font-bold text-brand-black">Total Amount</span>
                      <span className="text-2xl font-bold text-brand-orange">
                        {formatCurrency(
                          getSelectedPlanDetails()?.[billingCycle === 'monthly' ? 'monthlyPrice' : 'yearlyPrice'] || 0
                        )}
                      </span>
                    </div>
                  </div>
                </Card>

                {/* Secure payment notice */}
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                  <div className="flex items-center gap-3">
                    <ShieldCheckIcon className="w-5 h-5 text-emerald-600" />
                    <div className="text-sm text-emerald-800">
                      <span className="font-medium">Secure Payment: </span>
                      Your payment information is encrypted and secure. We use industry-standard security measures.
                    </div>
                  </div>
                </div>

                {/* Action buttons for Step 3 */}
                <div className="flex flex-col sm:flex-row gap-4 justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(2)}
                    className="sm:w-auto w-full flex items-center gap-2"
                    disabled={isProcessing}
                  >
                    <ArrowLeftIcon className="w-4 h-4" />
                    Back to Review
                  </Button>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      variant="outline"
                      onClick={onClose}
                      className="sm:w-auto w-full"
                      disabled={isProcessing}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="sm:w-auto w-full flex items-center justify-center gap-2 bg-gradient-to-r from-brand-orange to-red-500 hover:from-red-500 hover:to-brand-orange text-white"
                      onClick={handleUpgradePayment}
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <ClockIcon className="w-5 h-5 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <CreditCardIcon className="w-5 h-5" />
                          Complete Upgrade
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* tomiwa: STEP 4 - Success */}
          {currentStep === 4 && (
            <>
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <CheckCircleIcon className="w-16 h-16 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-brand-black mb-3">
                  Welcome to {selectedPlan}!
                </h3>
                <p className="text-neutral-600 text-lg mb-8">
                  Your subscription has been successfully upgraded
                </p>

                {/* Success details */}
                <Card className="p-6 text-left mb-6 max-w-2xl mx-auto">
                  <h4 className="font-bold text-brand-black mb-4">Upgrade Details</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <StarIcon className="w-5 h-5 text-brand-orange" />
                        <span className="text-sm font-medium text-neutral-700">New Plan</span>
                      </div>
                      <span className="font-bold text-brand-black">{selectedPlan}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <CalendarIcon className="w-5 h-5 text-brand-aqua" />
                        <span className="text-sm font-medium text-neutral-700">Billing Cycle</span>
                      </div>
                      <span className="font-bold text-brand-black capitalize">{billingCycle}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <BanknotesIcon className="w-5 h-5 text-emerald-500" />
                        <span className="text-sm font-medium text-neutral-700">Amount Paid</span>
                      </div>
                      <span className="font-bold text-brand-orange">
                        {formatCurrency(
                          getSelectedPlanDetails()?.[billingCycle === 'monthly' ? 'monthlyPrice' : 'yearlyPrice'] || 0
                        )}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <DocumentTextIcon className="w-5 h-5 text-blue-500" />
                        <span className="text-sm font-medium text-neutral-700">Receipt</span>
                      </div>
                      <Button variant="ghost" className="text-brand-aqua hover:bg-brand-aqua/10 text-sm">
                        Download PDF
                      </Button>
                    </div>
                  </div>
                </Card>

                {/* Next steps */}
                <Card className="p-6 text-left mb-8 max-w-2xl mx-auto bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
                  <h4 className="font-bold text-brand-black mb-4 flex items-center gap-2">
                    <SparklesIcon className="w-5 h-5 text-brand-aqua" />
                    What's Next?
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-neutral-700">All {selectedPlan} features are now active and ready to use</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-neutral-700">A confirmation email has been sent to your inbox</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-neutral-700">Your next billing date is {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </li>
                  </ul>
                </Card>

                {/* Action buttons for Step 4 */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    variant="outline"
                    onClick={onClose}
                    className="sm:w-auto w-full"
                  >
                    Close
                  </Button>
                  <Button
                    className="sm:w-auto w-full flex items-center justify-center gap-2 bg-brand-orange hover:bg-brand-orange/90"
                    onClick={onClose}
                  >
                    Go to Dashboard
                    <ArrowRightIcon className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpgradePlanModal;
