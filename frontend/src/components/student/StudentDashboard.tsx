import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  PlayIcon, 
  ClockIcon, 
  DocumentTextIcon, 
  UserIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';
import { useExam } from '../../context/ExamContext';

const StudentDashboard = () => {
  const { user, logout } = useAuth();
  const { startTest } = useExam();
  const navigate = useNavigate();

  const handleStartTest = () => {
    startTest();
    navigate('/student/consent');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const stats = [
    { label: 'Tests Completed', value: '3', icon: DocumentTextIcon, color: 'text-green-400' },
    { label: 'Average Score', value: '85%', icon: ClockIcon, color: 'text-blue-400' },
    { label: 'Total Time Spent', value: '2.5h', icon: ClockIcon, color: 'text-purple-400' }
  ];

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-slate-800/50 backdrop-blur-sm border-r border-slate-700/50">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <UserIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold">Student Portal</h3>
              <p className="text-gray-400 text-sm">Dashboard</p>
            </div>
          </div>

          <nav className="space-y-2">
            <div className="bg-slate-700/50 rounded-lg p-3 border border-slate-600/50">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center">
                  <UserIcon className="w-4 h-4 text-gray-300" />
                </div>
                <div>
                  <p className="text-white text-sm font-medium">{user?.name}</p>
                  <p className="text-gray-400 text-xs">{user?.rollNumber}</p>
                </div>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 p-3 text-gray-400 hover:text-red-400 hover:bg-slate-700/50 rounded-lg transition-all"
            >
              <ArrowRightOnRectangleIcon className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {user?.name}!</h1>
            <p className="text-gray-400">Ready to take your next exam?</p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:bg-slate-800/70 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                  </div>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Start Test Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-2xl p-8 mb-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Ready for your exam?</h3>
                <p className="text-gray-300 mb-4">Click the button below to start your examination</p>
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <div className="flex items-center space-x-1">
                    <ClockIcon className="w-4 h-4" />
                    <span>30 minutes</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <DocumentTextIcon className="w-4 h-4" />
                    <span>Multiple choice</span>
                  </div>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleStartTest}
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transition-all flex items-center space-x-2 shadow-lg shadow-green-500/25"
              >
                <PlayIcon className="w-5 h-5" />
                <span>Start Test</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Test History */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6"
          >
            <h3 className="text-xl font-semibold text-white mb-4">Recent Test History</h3>
            <div className="space-y-4">
              {[
                { name: 'Computer Science Fundamentals', score: '92%', date: '2024-01-15', status: 'Completed' },
                { name: 'Data Structures & Algorithms', score: '87%', date: '2024-01-10', status: 'Completed' },
                { name: 'Web Development Basics', score: '94%', date: '2024-01-05', status: 'Completed' },
              ].map((test, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg border border-slate-600/30">
                  <div>
                    <h4 className="text-white font-medium">{test.name}</h4>
                    <p className="text-gray-400 text-sm">{test.date}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-green-400 font-semibold">{test.score}</div>
                    <div className="text-gray-400 text-sm">{test.status}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default StudentDashboard;