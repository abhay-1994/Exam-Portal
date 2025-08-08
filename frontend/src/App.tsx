import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import LandingPage from './components/LandingPage';
import StudentDashboard from './components/student/StudentDashboard';
import TestConsent from './components/student/TestConsent';
import TestScreen from './components/student/TestScreen';
import TestConfirmation from './components/student/TestConfirmation';
import AdminDashboard from './components/admin/AdminDashboard';
import QuestionManagement from './components/admin/QuestionManagement';
import StudentManagement from './components/admin/StudentManagement';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ExamProvider } from './context/ExamContext';

// Type for ProtectedRoute props
interface ProtectedRouteProps {
  children: React.ReactNode;
  role: 'student' | 'admin';
}

function ProtectedRoute({ children, role }: ProtectedRouteProps) {
  const { user, userRole } = useAuth();

  if (!user || userRole !== role) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

function App() {
  return (
    <AuthProvider>
      <ExamProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/student/dashboard" element={<ProtectedRoute role="student"><StudentDashboard /></ProtectedRoute>} />
                <Route path="/student/consent" element={<ProtectedRoute role="student"><TestConsent /></ProtectedRoute>} />
                <Route path="/student/test" element={<ProtectedRoute role="student"><TestScreen /></ProtectedRoute>} />
                <Route path="/student/confirmation" element={<ProtectedRoute role="student"><TestConfirmation /></ProtectedRoute>} />
                <Route path="/admin/dashboard" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
                <Route path="/admin/questions" element={<ProtectedRoute role="admin"><QuestionManagement /></ProtectedRoute>} />
                <Route path="/admin/students" element={<ProtectedRoute role="admin"><StudentManagement /></ProtectedRoute>} />
              </Routes>
            </AnimatePresence>
          </div>
        </Router>
      </ExamProvider>
    </AuthProvider>
  );
}

export default App;
