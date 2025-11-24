import { motion } from 'framer-motion';
import { FiMapPin, FiBriefcase, FiClock, FiDollarSign, FiArrowRight } from 'react-icons/fi';

export default function JobPreview({ formData }) {
  return (
    <div className="space-y-8">
      {/* Live Preview */}
      <div>
        <h3 className="font-display font-medium text-neutral-900 mb-6">
          Live Preview
        </h3>
        
        <div className="space-y-6">
          {/* Job Title & Company */}
          <div>
            <h4 className="text-xl font-display font-semibold text-neutral-900 mb-2">
              {formData.jobTitle || 'Job Title'}
            </h4>
            <p className="text-lg text-neutral-600">
              {formData.companyName || 'Company Name'}
            </p>
          </div>

          {/* Job Details */}
          <div className="flex flex-wrap gap-3">
            {formData.locationType && (
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm bg-neutral-50 text-neutral-600">
                <FiMapPin className="w-4 h-4 text-brand-aqua" />
                {formData.locationType === 'remote' ? 'Remote' : formData.workLocation || 'Location'}
              </span>
            )}
            
            {formData.employmentType && (
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm bg-neutral-50 text-neutral-600">
                <FiBriefcase className="w-4 h-4 text-brand-aqua" />
                {formData.employmentType.charAt(0).toUpperCase() + formData.employmentType.slice(1)}
              </span>
            )}

            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm bg-neutral-50 text-neutral-600">
              <FiClock className="w-4 h-4 text-brand-aqua" />
              30 days
            </span>

            {formData.salaryRange.min && formData.salaryRange.max && (
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm bg-neutral-50 text-neutral-600">
                <FiDollarSign className="w-4 h-4 text-brand-aqua" />
                {formData.salaryRange.currency} {formData.salaryRange.min.toLocaleString()} - {formData.salaryRange.max.toLocaleString()}
              </span>
            )}
          </div>

          {/* Skills */}
          {formData.skills.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formData.skills.map((skill, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="px-2.5 py-1 rounded-lg text-xs font-medium bg-brand-aqua/10 text-brand-aqua"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          )}

          {/* Description Preview */}
          {formData.description && (
            <div>
              <div className="prose prose-sm max-w-none text-neutral-600 line-clamp-3">
                {formData.description}
              </div>
              <button className="mt-2 text-sm font-medium text-brand-aqua hover:text-brand-aqua/80 transition-colors">
                Read more
              </button>
            </div>
          )}

          {/* Apply Button */}
          <button
            type="button"
            className="w-full px-4 py-3 bg-gradient-to-r from-brand-orange to-brand-yellow text-white rounded-xl font-medium hover:opacity-90 transition-all group"
          >
            <span className="flex items-center justify-center gap-2">
              Apply Now
              <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </button>
        </div>
      </div>

      {/* Quick Tips */}
      <div className="pt-8 border-t border-neutral-200/80">
        <h3 className="font-display font-medium text-neutral-900 mb-4">
          Quick Tips
        </h3>
        
        <div className="space-y-3">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-brand-aqua/10 text-brand-aqua font-medium">
              1
            </div>
            <p className="text-sm text-neutral-600 pt-1.5">
              Keep the job title specific and avoid buzzwords like "rockstar" or "ninja"
            </p>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-brand-aqua/10 text-brand-aqua font-medium">
              2
            </div>
            <p className="text-sm text-neutral-600 pt-1.5">
              Add 5-8 relevant skills to help candidates find your job
            </p>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-brand-aqua/10 text-brand-aqua font-medium">
              3
            </div>
            <p className="text-sm text-neutral-600 pt-1.5">
              List 3-5 must-have requirements to attract qualified candidates
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 