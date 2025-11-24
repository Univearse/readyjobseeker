'use client';

import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

export default function AIToolWorkspace({
  toolName,
  uploadText,
  acceptedFileTypes,
  maxFileSize,
  onSelectPlatformCandidates,
  onFileUpload
}) {
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: acceptedFileTypes,
    maxSize: maxFileSize * 1024 * 1024, // Convert MB to bytes
    onDrop: (acceptedFiles) => {
      setFiles(acceptedFiles);
    },
  });

  const handleUpload = async () => {
    if (files.length === 0) return;
    
    setIsUploading(true);
    try {
      await onFileUpload?.(files);
    } catch (error) {
      console.error('Upload failed:', error);
    }
    setIsUploading(false);
  };

  return (
    <div className="space-y-6">
      {/* tomiwa: Input options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* tomiwa: Select from Platform option */}
        <button
          onClick={onSelectPlatformCandidates}
          className="relative group rounded-xl border-2 border-dashed border-neutral-200 p-6 hover:border-[#36D0D8] transition-colors"
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-lg bg-[#36D0D8]/10 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-[#36D0D8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="font-display text-lg text-[#021126] mb-2">
              Select from Platform
            </h3>
            <p className="text-neutral-600 text-sm">
              Choose from your shortlisted candidates or recent applications
            </p>
          </div>
        </button>

        {/* tomiwa: Upload New Resumes option */}
        <div className="rounded-xl border-2 border-dashed border-neutral-200 overflow-hidden">
          <div
            {...getRootProps()}
            className={`p-6 transition-colors
              ${isDragActive ? 'bg-[#36D0D8]/5 border-[#36D0D8]' : 'hover:border-[#36D0D8]'}`}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-lg bg-[#36D0D8]/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#36D0D8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <h3 className="font-display text-lg text-[#021126] mb-2">
                Upload New Resumes
              </h3>
              <p className="text-neutral-600 text-sm mb-2">
                {uploadText || 'Drop files here or click to browse'}
              </p>
              <p className="text-xs text-neutral-500">
                Accepts {acceptedFileTypes} (Max {maxFileSize}MB)
              </p>
            </div>
          </div>

          {/* tomiwa: Selected files list */}
          {files.length > 0 && (
            <div className="border-t border-neutral-200 bg-neutral-50 p-4">
              <div className="space-y-2">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span className="text-neutral-600">{file.name}</span>
                    <button
                      onClick={() => setFiles(files.filter((_, i) => i !== index))}
                      className="text-neutral-400 hover:text-red-500"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
              
              <button
                onClick={handleUpload}
                disabled={isUploading}
                className="mt-4 w-full px-4 py-2 bg-[#36D0D8] text-white rounded-lg hover:bg-[#36D0D8]/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUploading ? 'Uploading...' : 'Upload & Parse'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}