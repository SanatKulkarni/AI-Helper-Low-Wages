import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';

interface FileUploadProps {
  onFileContent: (content: string) => void;
  isLoading: boolean;
}

export function FileUpload({ onFileContent, isLoading }: FileUploadProps) {
  const [error, setError] = useState<string>('');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError('');
    const file = acceptedFiles[0];
    
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = async (e) => {
      const content = e.target?.result as string;
      onFileContent(content);
    };
    
    reader.onerror = () => {
      setError('Failed to read file. Please try again.');
    };
    
    reader.readAsText(file);
  }, [onFileContent]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'text/plain': ['.txt']
    },
    maxFiles: 1
  });

  return (
    <div 
      {...getRootProps()} 
      className={`p-8 border-2 border-dashed rounded-lg cursor-pointer transition-colors
        ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}
        ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <input {...getInputProps()} disabled={isLoading} />
      <div className="flex flex-col items-center justify-center text-gray-600">
        <Upload className="w-12 h-12 mb-4 text-gray-400" />
        <p className="text-lg font-medium mb-2">
          {isDragActive ? 'Drop your file here' : 'Drag & drop your balance sheet'}
        </p>
        <p className="text-sm text-gray-500">
          Supported formats: CSV, Excel, TXT
        </p>
        {error && (
          <p className="mt-2 text-red-500 text-sm">{error}</p>
        )}
        {isLoading && (
          <p className="mt-2 text-blue-500">Analyzing your balance sheet...</p>
        )}
      </div>
    </div>
  );
}