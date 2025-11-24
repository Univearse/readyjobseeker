"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineCheck, HiOutlineLightningBolt, HiOutlineX } from 'react-icons/hi';
import { FiPackage, FiEye, FiCalendar, FiAlertCircle, FiArrowLeft } from 'react-icons/fi';
import JobPostForm from '@/components/ui/JobPostForm';
import JobPreview from '@/components/ui/JobPreview';

// tomiwa: Form validation schema
const requiredFields = {
  jobTitle: true,
  companyName: true,
  workLocation: true,
  locationType: true,
  employmentType: true,
  description: true,
  applicationMethod: true
};

// tomiwa: Employment type options
const employmentTypes = [
  { id: 'full-time', label: 'Full-time' },
  { id: 'part-time', label: 'Part-time' },
  { id: 'contract', label: 'Contract' },
  { id: 'internship', label: 'Internship' }
];

// tomiwa: Location types
const locationTypes = [
  { id: 'onsite', label: 'Onsite' },
  { id: 'hybrid', label: 'Hybrid' },
  { id: 'remote', label: 'Remote' }
];

export default function FreeJobPostPage() {
  const router = useRouter();
  
  // tomiwa: Form state
  const [formData, setFormData] = useState({
    jobTitle: '',
    companyName: '',
    workLocation: '',
    locationType: 'onsite',
    employmentType: '',
    salaryRange: { min: '', max: '', currency: 'NGN' },
    description: '',
    skills: [],
    applicationMethod: 'link',
    applicationLink: '',
    applicationEmail: '',
    screeningQuestions: ['', '', '']
  });

  // tomiwa: Form validation state
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  // tomiwa: Calculate form progress
  useEffect(() => {
    const filledRequired = Object.entries(requiredFields).filter(([field]) => 
      formData[field] && formData[field].length > 0
    ).length;
    const totalRequired = Object.keys(requiredFields).length;
    setProgress((filledRequired / totalRequired) * 100);

    // Validate form
    const newErrors = {};
    if (touched.jobTitle && !formData.jobTitle) {
      newErrors.jobTitle = 'Job title is required';
    }
    if (touched.companyName && !formData.companyName) {
      newErrors.companyName = 'Company name is required';
    }
    if (touched.workLocation && !formData.workLocation && formData.locationType !== 'remote') {
      newErrors.workLocation = 'Work location is required';
    }
    if (touched.description && !formData.description) {
      newErrors.description = 'Job description is required';
    }
    if (touched.applicationMethod) {
      if (formData.applicationMethod === 'link' && !formData.applicationLink) {
        newErrors.applicationLink = 'Application link is required';
      }
      if (formData.applicationMethod === 'email' && !formData.applicationEmail) {
        newErrors.applicationEmail = 'Application email is required';
      }
    }

    setErrors(newErrors);
    setIsValid(Object.keys(newErrors).length === 0);
  }, [formData, touched]);

  // tomiwa: Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Set all fields as touched to trigger validation
    const allTouched = Object.keys(requiredFields).reduce((acc, field) => ({
      ...acc,
      [field]: true
    }), {});
    setTouched(allTouched);

    if (!isValid) {
      return;
    }

    // Redirect to review page
    router.push('/post-job/review');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50/50">
      {/* Enhanced Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/90 border-b border-neutral-200/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-20 flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link 
                href="/post-job"
                className="flex items-center gap-2.5 text-neutral-600 hover:text-neutral-900 transition-colors group"
              >
                <FiArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
                <span className="text-sm font-medium">Back to Plans</span>
              </Link>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-display font-bold bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-700 bg-clip-text text-transparent">
                  Post a Free Job
                </h1>
                <motion.span 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-brand-aqua/10 text-brand-aqua border border-brand-aqua/20"
                >
                  Free Plan
                </motion.span>
              </div>
            </div>
            
            {/* Enhanced Progress Indicator */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-neutral-700">
                {Math.round(progress)}% Complete
              </span>
              <div className="w-40 h-2 bg-neutral-100 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-brand-aqua via-brand-aqua to-brand-yellow"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Main Content */}
      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Enhanced Plan Features */}
          <div className="mb-16">
            <div className="flex items-center justify-between bg-white rounded-2xl p-6 shadow-sm border border-neutral-200/80">
              <div className="flex items-center gap-8">
                <div className="p-4 bg-gradient-to-br from-brand-aqua/10 to-transparent rounded-xl">
                  <FiPackage className="w-7 h-7 text-brand-aqua" />
                </div>
                <div>
                  <h2 className="text-xl font-display font-semibold text-neutral-900 mb-3">
                    Free Plan Features
                  </h2>
                  <div className="flex gap-8 text-sm text-neutral-600">
                    <span className="flex items-center gap-2.5">
                      <div className="p-1.5 bg-neutral-50 rounded-lg border border-neutral-200/80">
                        <FiEye className="w-4 h-4" />
                      </div>
                      Basic visibility
                    </span>
                    <span className="flex items-center gap-2.5">
                      <div className="p-1.5 bg-neutral-50 rounded-lg border border-neutral-200/80">
                        <FiCalendar className="w-4 h-4" />
                      </div>
                      30 days duration
                    </span>
                    <span className="flex items-center gap-2.5">
                      <div className="p-1.5 bg-neutral-50 rounded-lg border border-neutral-200/80">
                        <FiAlertCircle className="w-4 h-4" />
                      </div>
                      1 active job
                    </span>
                  </div>
                </div>
              </div>
              <Link
                href="/post-job/create"
                className="group flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-medium text-brand-orange hover:bg-brand-orange/5 border border-brand-orange/20 transition-all hover:border-brand-orange/30"
              >
                Upgrade Plan
                <HiOutlineLightningBolt className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>

          {/* Enhanced Form and Preview Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-neutral-200/80">
                <JobPostForm
                  formData={formData}
                  setFormData={setFormData}
                  errors={errors}
                  setTouched={setTouched}
                />
              </div>
            </div>
            <div className="lg:sticky lg:top-28">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-200/80">
                <h3 className="text-lg font-display font-semibold text-neutral-900 mb-4 pb-4 border-b border-neutral-200/80">
                  Preview
                </h3>
                <JobPreview formData={formData} />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Enhanced Bottom Bar */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-neutral-200/80 py-5 shadow-[0_-1px_3px_rgba(0,0,0,0.05)]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setShowPreviewModal(true)}
              className="flex items-center gap-2.5 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors px-4 py-2 rounded-lg hover:bg-neutral-100"
            >
              <FiEye className="w-4 h-4" />
              Preview listing
            </button>
            <div className="flex items-center gap-4">
              <button
                type="button"
                className="px-6 py-2.5 rounded-xl text-sm font-medium text-neutral-600 hover:bg-neutral-100 border border-neutral-200 transition-all"
              >
                Save Draft
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={!isValid}
                className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isValid
                    ? 'bg-gradient-to-r from-brand-orange to-brand-yellow text-white hover:opacity-90 shadow-sm'
                    : 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
                }`}
              >
                {isValid ? (
                  <span className="flex items-center gap-2.5">
                    Publish Job
                    <HiOutlineCheck className="w-4 h-4" />
                  </span>
                ) : (
                  'Complete required fields'
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Preview Modal */}
      <AnimatePresence>
        {showPreviewModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-xl"
            >
              <div className="px-8 py-6 border-b border-neutral-200/80">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-display font-semibold text-neutral-900">
                    Preview Job Listing
                  </h3>
                  <button
                    type="button"
                    onClick={() => setShowPreviewModal(false)}
                    className="p-2 text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
                  >
                    <HiOutlineX className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="p-8 overflow-y-auto max-h-[70vh]">
                <JobPreview formData={formData} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 