import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  role: 'student' | 'admin';
  onSignupClick: () => void;
}

const LoginModal = ({ isOpen, onClose, role, onSignupClick }: LoginModalProps) => {
  console.log(role);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const success = await login(email, password, role);
      console.log(success);
      
      if (success) {
        onClose();
        navigate(role === 'student' ? '/student/dashboard' : '/admin/dashboard');
      } else {
        setError('Invalid credentials');
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const demoCredentials = role === 'admin' 
    ? { email: 'admin@example.com', password: 'admin123' }
    : { email: 'student@example.com', password: 'student123' };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-slate-800 rounded-2xl p-8 w-full max-w-md border border-slate-700"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>

            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">
                {role === 'student' ? 'Student Login' : 'Admin Login'}
              </h2>
              <p className="text-gray-400">
                Enter your credentials to access the {role} portal
              </p>
            </div>

            {/* Demo Credentials */}
            <div className="bg-slate-700/50 rounded-lg p-3 mb-6 text-sm">
              <p className="text-gray-300 mb-1">Demo Credentials:</p>
              <p className="text-blue-400">Email: {demoCredentials.email}</p>
              <p className="text-blue-400">Password: {demoCredentials.password}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-12"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="text-red-400 text-sm text-center bg-red-900/20 border border-red-800 rounded-lg p-3">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>

            {role === 'student' && (
              <div className="mt-6 text-center">
                <p className="text-gray-400">
                  Don't have an account?{' '}
                  <button
                    onClick={onSignupClick}
                    className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                  >
                    Sign up here
                  </button>
                </p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;