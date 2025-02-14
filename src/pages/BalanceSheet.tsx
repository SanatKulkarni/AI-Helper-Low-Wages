import React, { useState } from 'react';
import { FileUpload } from '../components/FileUpload';
import { analyzeBalanceSheet, analyzeDebtManagement } from '../lib/gemini';
import { Brain, CreditCard } from 'lucide-react';

export function BalanceSheet() {
  const [fileContent, setFileContent] = useState<string>('');
  const [analysis, setAnalysis] = useState<string>('');
  const [debtAnalysis, setDebtAnalysis] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleFileContent = async (content: string) => {
    setFileContent(content);
    setIsLoading(true);
    setError('');
    try {
      const result = await analyzeBalanceSheet(content);
      setAnalysis(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDebtAnalysis = async () => {
    if (!fileContent) {
      setError('Please upload a balance sheet first');
      return;
    }

    setIsLoading(true);
    setError('');
    try {
      const result = await analyzeDebtManagement(fileContent);
      setDebtAnalysis(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center mb-8">
        <Brain className="w-8 h-8 text-blue-600 mr-3" />
        <h1 className="text-3xl font-bold text-gray-900">Balance Sheet Analysis</h1>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Upload Your Balance Sheet
        </h2>
        <p className="text-gray-600 mb-6">
          Upload your balance sheet and let our AI analyze your financial situation to provide
          personalized insights and recommendations.
        </p>
        <FileUpload onFileContent={handleFileContent} isLoading={isLoading} />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {analysis && (
        <>
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Financial Analysis
            </h2>
            <div className="prose max-w-none">
              <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                {analysis}
              </div>
            </div>
            
            <button
              onClick={handleDebtAnalysis}
              disabled={isLoading}
              className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <CreditCard className="w-4 h-4 mr-2" />
              Analyze Debt Management Strategy
            </button>
          </div>

          {debtAnalysis && (
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Debt Management Strategy
              </h2>
              <div className="prose max-w-none">
                <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                  {debtAnalysis}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}