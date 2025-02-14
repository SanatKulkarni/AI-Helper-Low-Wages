import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, TrendingUp, Target, Upload, MessageSquare } from 'lucide-react';

export function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto pt-16 pb-24 px-6">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <Brain className="w-16 h-16 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Your AI-Powered Financial Advisor
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Get personalized financial advice, track your goals, and make informed decisions
            about your money with our intelligent assistant.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/register"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="px-6 py-3 bg-white text-blue-600 rounded-lg font-medium border border-blue-200 hover:border-blue-300 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-4xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-4">
              <Upload className="w-8 h-8 text-blue-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">Balance Sheet Analysis</h2>
            </div>
            <p className="text-gray-600">
              Upload your financial data and get instant AI-powered insights on your financial health,
              spending patterns, and areas for improvement.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-4">
              <TrendingUp className="w-8 h-8 text-blue-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">Scenario Planning</h2>
            </div>
            <p className="text-gray-600">
              Explore different financial scenarios and see how changes in savings, expenses,
              or income could impact your financial future.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-4">
              <Target className="w-8 h-8 text-blue-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">Goal Tracking</h2>
            </div>
            <p className="text-gray-600">
              Set and track your savings goals with visual progress indicators and get
              personalized recommendations to reach them faster.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-4">
              <MessageSquare className="w-8 h-8 text-blue-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">AI Assistant</h2>
            </div>
            <p className="text-gray-600">
              Get instant answers to your financial questions and receive personalized advice
              from our AI chatbot, available 24/7.
            </p>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="max-w-4xl mx-auto px-6 pb-24">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          What Our Users Say
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <p className="text-gray-600 mb-4">
              "This app helped me understand my finances better and create a realistic savings plan.
              The AI suggestions are incredibly helpful!"
            </p>
            <p className="font-medium text-gray-900">- Rachit Methwani</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <p className="text-gray-600 mb-4">
              "I love how easy it is to track my financial goals and get personalized advice.
              It's like having a financial advisor in my pocket."
            </p>
            <p className="font-medium text-gray-900">- Aditya Chandra</p>
          </div>
        </div>
      </div>
      <p className="font-medium text-gray mb-4 text-center">Made by Sanat Kulkarni</p>
    </div>
  );
}