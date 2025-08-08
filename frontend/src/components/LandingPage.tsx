import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AcademicCapIcon, UserIcon, KeyIcon } from '@heroicons/react/24/outline';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';

const LandingPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [loginRole, setLoginRole] = useState<'student' | 'admin'>('student');

  const handleLoginClick = (role: 'student' | 'admin') => {
    setLoginRole(role);
    setShowLogin(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl w-full"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6"
          >
            <AcademicCapIcon className="w-10 h-10 text-white" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-5xl font-bold text-white mb-4"
          >
            ExamPortal
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            A modern, secure platform for online examinations. Choose your role to get started.
          </motion.p>
        </div>

        {/* Login Options */}
        <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.02 }}
            className="group"
          >
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 hover:bg-slate-800/70 transition-all duration-300 cursor-pointer"
              onClick={() => handleLoginClick('student')}
            >
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <UserIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-3">Student Portal</h3>
              <p className="text-gray-400 mb-6">Take your examinations in a secure environment</p>
              <div className="flex items-center text-green-400 font-medium">
                <span>Login as Student</span>
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.02 }}
            className="group"
          >
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 hover:bg-slate-800/70 transition-all duration-300 cursor-pointer"
              onClick={() => handleLoginClick('admin')}
            >
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <KeyIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-3">Admin Portal</h3>
              <p className="text-gray-400 mb-6">Manage questions and monitor examinations</p>
              <div className="flex items-center text-purple-400 font-medium">
                <span>Login as Admin</span>
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-16 grid md:grid-cols-3 gap-6 text-center"
        >
          <div className="text-gray-400">
            <div className="text-2xl font-bold text-white mb-2">Secure</div>
            <p className="text-sm">End-to-end encrypted examination process</p>
          </div>
          <div className="text-gray-400">
            <div className="text-2xl font-bold text-white mb-2">Fast</div>
            <p className="text-sm">Lightning-fast performance with real-time updates</p>
          </div>
          <div className="text-gray-400">
            <div className="text-2xl font-bold text-white mb-2">Reliable</div>
            <p className="text-sm">99.9% uptime with automatic backup systems</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Modals */}
      <LoginModal 
        isOpen={showLogin} 
        onClose={() => setShowLogin(false)} 
        role={loginRole}
        onSignupClick={() => {
          setShowLogin(false);
          setShowSignup(true);
        }}
      />
      <SignupModal 
        isOpen={showSignup} 
        onClose={() => setShowSignup(false)}
        onLoginClick={() => {
          setShowSignup(false);
          setShowLogin(true);
        }}
      />
    </div>
  );
};

export default LandingPage;