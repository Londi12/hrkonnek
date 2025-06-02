import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { documentsApi } from '../../utils/api';
import type { Document } from '../../types';rt React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { documentsApi } from '../../utils/api';
import type { Document } from '../../types';

interface DocumentUploadProps {
  onUploadSuccess?: (document: Document) => void;
  documentType?: Document['type'];
  maxSize?: number; // in bytes
  acceptedFiles?: string[];
}

export const DocumentUpload: React.FC<DocumentUploadProps> = ({
  onUploadSuccess,
  documentType = 'cv',
  maxSize = 5 * 1024 * 1024, // 5MB
  acceptedFiles = ['.pdf', '.doc', '.docx'],
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setError(null);
    
    if (acceptedFiles.length === 0) {
      return;
    }

    const file = acceptedFiles[0];
    setIsUploading(true);

    try {
      const document = await documentsApi.uploadDocument(file, documentType);
      onUploadSuccess?.(document);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload document');
    } finally {
      setIsUploading(false);
    }
  }, [documentType, onUploadSuccess]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize,
    accept: acceptedFiles.reduce((acc, curr) => ({ ...acc, [curr]: [] }), {}),
    maxFiles: 1,
  });

  return (
    <div className="w-full max-w-md mx-auto">
      <div
        {...getRootProps()}
        className={`p-6 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}
          ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}
      >
        <input {...getInputProps()} />
        {isUploading ? (
          <div className="flex flex-col items-center space-y-2">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-gray-600">Uploading...</p>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="text-4xl mb-2">📄</div>
            <p className="text-gray-600">
              {isDragActive
                ? 'Drop your document here'
                : 'Drag and drop your document here, or click to select'}
            </p>
            <p className="text-sm text-gray-500">
              Accepted files: {acceptedFiles.join(', ')} (Max size: {maxSize / (1024 * 1024)}MB)
            </p>
          </div>
        )}
      </div>
      
      {error && (
        <div className="mt-2 text-sm text-red-600">
          {error}
        </div>
      )}
    </div>
  );
};
