/**
 * File: src/components/ui/modals/ViewPortfolioModal.jsx
 * 
 * tomiwa: NEW - View Portfolio Modal Component
 * Displays portfolio projects and work samples in a modal popup
 * 
 * Features:
 * - Project showcase with images and descriptions
 * - Interactive project gallery
 * - External portfolio link
 * - Responsive design with brand colors
 * - Project filtering and categories
 */

'use client';

import React, { useState, useEffect } from 'react';
import {
  // tomiwa: Icon imports for portfolio modal
  XMarkIcon,
  EyeIcon,
  LinkIcon,
  PhotoIcon,
  PlayIcon,
  ArrowTopRightOnSquareIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  TagIcon,
} from '@heroicons/react/24/outline';

export default function ViewPortfolioModal({ isOpen, onClose, portfolioData }) {
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  // tomiwa: FIXED - Move currentImageIndex state to top to avoid hook order issues
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // tomiwa: FIXED - Move useEffect to top before conditional return
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [selectedProject]);

  if (!isOpen) return null;

  // tomiwa: Default portfolio data structure for demo
  const defaultPortfolio = {
    portfolioUrl: 'https://johndoe.design',
    bio: 'A collection of my design work spanning web applications, mobile apps, and design systems. Each project represents a unique challenge and creative solution.',
    categories: ['All', 'Web Design', 'Mobile Apps', 'Design Systems', 'Branding'],
    projects: [
      {
        id: 1,
        title: 'E-commerce Dashboard',
        category: 'Web Design',
        description: 'Complete redesign of an e-commerce admin dashboard focusing on data visualization and user workflow optimization.',
        longDescription: 'This project involved redesigning a complex e-commerce admin dashboard used by over 500 merchants. The main challenges were simplifying the navigation, improving data visualization, and creating a more intuitive workflow for managing products and orders. The result was a 40% reduction in task completion time and significantly improved user satisfaction scores.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
        images: [
          'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=600&fit=crop',
        ],
        tags: ['UI/UX', 'Dashboard', 'Data Visualization', 'E-commerce'],
        tools: ['Figma', 'Principle', 'Adobe Illustrator'],
        liveUrl: 'https://example.com/project1',
        caseStudyUrl: 'https://example.com/case-study-1',
        year: '2024',
        client: 'TechCorp Inc.',
      },
      {
        id: 2,
        title: 'Banking Mobile App',
        category: 'Mobile Apps',
        description: 'Modern mobile banking app with focus on security, accessibility, and seamless user experience.',
        longDescription: 'Designed a comprehensive mobile banking application from the ground up, focusing on security, accessibility, and user experience. The app includes features like biometric authentication, budget tracking, and investment management. Special attention was paid to accessibility guidelines and security best practices.',
        image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop',
        images: [
          'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop',
        ],
        tags: ['Mobile', 'Fintech', 'Security', 'Accessibility'],
        tools: ['Figma', 'Framer', 'Lottie'],
        liveUrl: 'https://example.com/project2',
        caseStudyUrl: 'https://example.com/case-study-2',
        year: '2023',
        client: 'FinanceApp Co.',
      },
      {
        id: 3,
        title: 'Design System',
        category: 'Design Systems',
        description: 'Comprehensive design system for a SaaS platform, including components, patterns, and guidelines.',
        longDescription: 'Created a comprehensive design system for a growing SaaS platform, including a component library, design tokens, documentation, and implementation guidelines. The system improved design consistency across 15+ products and reduced design-to-development time by 60%.',
        image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=600&fit=crop',
        images: [
          'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&h=600&fit=crop',
        ],
        tags: ['Design System', 'Components', 'Documentation', 'Tokens'],
        tools: ['Figma', 'Storybook', 'Zeroheight'],
        liveUrl: 'https://example.com/project3',
        caseStudyUrl: 'https://example.com/case-study-3',
        year: '2023',
        client: 'StartupXYZ',
      },
      {
        id: 4,
        title: 'Brand Identity',
        category: 'Branding',
        description: 'Complete brand identity design for a sustainable fashion startup, including logo, colors, and guidelines.',
        longDescription: 'Developed a complete brand identity for a sustainable fashion startup, including logo design, color palette, typography, and brand guidelines. The brand needed to convey sustainability, quality, and modern aesthetics while appealing to environmentally conscious consumers.',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
        images: [
          'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=600&fit=crop',
        ],
        tags: ['Branding', 'Logo Design', 'Identity', 'Sustainability'],
        tools: ['Adobe Illustrator', 'Adobe Photoshop', 'Figma'],
        liveUrl: 'https://example.com/project4',
        caseStudyUrl: 'https://example.com/case-study-4',
        year: '2022',
        client: 'EcoFashion Co.',
      },
    ],
  };

  const portfolio = portfolioData || defaultPortfolio;

  // tomiwa: Filter projects by category
  const filteredProjects = selectedCategory === 'all' 
    ? portfolio.projects 
    : portfolio.projects.filter(project => 
        project.category.toLowerCase() === selectedCategory.toLowerCase()
      );

  // tomiwa: Handle project selection for detailed view
  const openProjectDetail = (project) => {
    setSelectedProject(project);
  };

  const closeProjectDetail = () => {
    setSelectedProject(null);
  };

  // tomiwa: Navigate between project images
  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => 
        prev === selectedProject.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedProject.images.length - 1 : prev - 1
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        
        {/* tomiwa: Modal Header */}
        <div className="bg-gradient-to-r from-brand-aqua to-primary-600 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
          
          <div className="pr-16">
            <h1 className="text-3xl font-display font-bold mb-2">Portfolio</h1>
            <p className="text-white/90 mb-4">{portfolio.bio}</p>
            <a
              href={portfolio.portfolioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors text-sm font-medium"
            >
              <ArrowTopRightOnSquareIcon className="w-4 h-4" />
              Visit Full Portfolio
            </a>
          </div>
        </div>

        {/* tomiwa: Category Filter */}
        <div className="border-b border-neutral-200 p-4">
          <div className="flex flex-wrap gap-2">
            {['all', ...portfolio.categories.slice(1)].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category.toLowerCase()
                    ? 'bg-brand-aqua text-white'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {category === 'all' ? 'All Projects' : category}
              </button>
            ))}
          </div>
        </div>

        {/* tomiwa: Projects Grid */}
        <div className="overflow-y-auto max-h-[calc(90vh-200px)] p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white border border-neutral-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => openProjectDetail(project)}
              >
                {/* tomiwa: Project Image */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center">
                    <EyeIcon className="w-8 h-8 text-white opacity-0 hover:opacity-100 transition-opacity" />
                  </div>
                  
                  {/* tomiwa: Project category badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 bg-brand-aqua text-white text-xs font-medium rounded-full">
                      {project.category}
                    </span>
                  </div>
                </div>
                
                {/* tomiwa: Project Info */}
                <div className="p-4">
                  <h3 className="font-bold text-neutral-900 mb-2">{project.title}</h3>
                  <p className="text-sm text-neutral-600 mb-3 line-clamp-2">
                    {project.description}
                  </p>
                  
                  {/* tomiwa: Project tags */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-neutral-100 text-neutral-600 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="px-2 py-1 bg-neutral-100 text-neutral-600 text-xs rounded-full">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-neutral-500">
                    <span>{project.year}</span>
                    <span>{project.client}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* tomiwa: Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-60 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden">
            
            {/* tomiwa: Project Detail Header */}
            <div className="border-b border-neutral-200 p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-display font-bold text-neutral-900 mb-2">
                    {selectedProject.title}
                  </h2>
                  <p className="text-neutral-600 mb-4">{selectedProject.longDescription}</p>
                  
                  {/* tomiwa: Project meta info */}
                  <div className="flex flex-wrap gap-4 text-sm text-neutral-600">
                    <div className="flex items-center gap-1">
                      <TagIcon className="w-4 h-4" />
                      {selectedProject.category}
                    </div>
                    <span>•</span>
                    <span>{selectedProject.year}</span>
                    <span>•</span>
                    <span>{selectedProject.client}</span>
                  </div>
                </div>
                
                <button
                  onClick={closeProjectDetail}
                  className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* tomiwa: Project Detail Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-200px)] p-6">
              
              {/* tomiwa: Image Gallery */}
              <div className="mb-8">
                <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                  <img
                    src={selectedProject.images[currentImageIndex]}
                    alt={`${selectedProject.title} - Image ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* tomiwa: Image navigation */}
                  {selectedProject.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
                      >
                        <ChevronLeftIcon className="w-5 h-5" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
                      >
                        <ChevronRightIcon className="w-5 h-5" />
                      </button>
                      
                      {/* tomiwa: Image indicators */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {selectedProject.images.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`w-2 h-2 rounded-full transition-colors ${
                              index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
                
                {/* tomiwa: Thumbnail navigation */}
                {selectedProject.images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto">
                    {selectedProject.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                          index === currentImageIndex ? 'border-brand-aqua' : 'border-transparent'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* tomiwa: Project Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* tomiwa: Tags */}
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* tomiwa: Tools Used */}
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-3">Tools Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tools.map((tool, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-accent-100 text-accent-700 rounded-full text-sm font-medium"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* tomiwa: Action Buttons */}
              <div className="flex gap-3 mt-8 pt-6 border-t border-neutral-200">
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-brand-aqua text-white rounded-lg hover:bg-primary-600 transition-colors font-medium"
                  >
                    <EyeIcon className="w-5 h-5" />
                    View Live Project
                  </a>
                )}
                {selectedProject.caseStudyUrl && (
                  <a
                    href={selectedProject.caseStudyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 border-2 border-brand-aqua text-brand-aqua rounded-lg hover:bg-brand-aqua hover:text-white transition-colors font-medium"
                  >
                    <LinkIcon className="w-5 h-5" />
                    Read Case Study
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
