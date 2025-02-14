import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { BalanceSheet } from './pages/BalanceSheet';
import { ScenarioSimulation } from './pages/ScenarioSimulation';
import { SavingsGoals } from './pages/SavingsGoals';
import { ChatBot } from './components/ChatBot';
import { AuthProvider, useAuth } from './contexts/AuthContext';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/login" />;
}

function AppContent() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {user && <Navigation />}
      <div className={user ? "max-w-4xl mx-auto p-6 pt-20" : ""}>
        <Routes>
          <Route path="/" element={!user ? <Home /> : <Navigate to="/dashboard" />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <BalanceSheet />
              </PrivateRoute>
            }
          />
          <Route
            path="/scenarios"
            element={
              <PrivateRoute>
                <ScenarioSimulation />
              </PrivateRoute>
            }
          />
          <Route
            path="/goals"
            element={
              <PrivateRoute>
                <SavingsGoals />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
      {user && <ChatBot />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;