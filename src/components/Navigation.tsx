import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Brain, TrendingUp, Target } from 'lucide-react';

export function Navigation() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Brain className="w-6 h-6 text-blue-600" />
            <span className="font-bold text-gray-900">AI Financial Advisor</span>
          </Link>
          
          <div className="flex space-x-4">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/')
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Balance Sheet
            </Link>
            <Link
              to="/scenarios"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/scenarios')
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center space-x-1">
                <TrendingUp className="w-4 h-4" />
                <span>Scenarios</span>
              </div>
            </Link>
            <Link
              to="/goals"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/goals')
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center space-x-1">
                <Target className="w-4 h-4" />
                <span>Goals</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}