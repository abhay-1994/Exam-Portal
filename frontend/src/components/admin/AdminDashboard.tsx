import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  UsersIcon, 
  DocumentTextIcon, 
  ChartBarIcon,
  PlusIcon,
  EyeIcon,
  ArrowDownTrayIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';
import { useExam } from '../../context/ExamContext';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const { questions } = useExam();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const stats = [
    { 
      label: 'Total Students', 
      value: '1,247', 
      icon: UsersIcon, 
      color: 'from-blue-500 to-blue-600',
      textColor: 'text-blue-400'
    },
    { 
      label: 'Total Questions', 
      value: questions.length.toString(), 
      icon: DocumentTextIcon, 
      color: 'from-green-500 to-green-600',
      textColor: 'text-green-400'
    },
    { 
      label: 'Tests Conducted', 
      value: '89', 
      icon: ChartBarIcon, 
      color: 'from-purple-500 to-purple-600',
      textColor: 'text-purple-400'
    }
  ];

  const quickActions = [
    {
      title: 'Add Questions',
      description: 'Create new examination questions',
      icon: PlusIcon,
      color: 'from-green-500 to-emerald-600',
      action: () => navigate('/admin/questions')
    },
    {
      title: 'View Students',
      description: 'Manage student profiles and results',
      icon: EyeIcon,
      color: 'from-blue-500 to-blue-600',
      action: () => navigate('/admin/students')
    },
    {
      title: 'Export Results',
      description: 'Download examination reports',
      icon: ArrowDownTrayIcon,
      color: 'from-purple-500 to-purple-600',
      action: () => alert('Export feature coming soon!')
    }
  ];

  const recentActivity = [
    { action: 'New student registered', user: 'John Doe', time: '2 hours ago' },
    { action: 'Test completed', user: 'Jane Smith', time: '3 hours ago' },
    { action: 'Question added', user: 'Admin', time: '5 hours ago' },
    { action: 'Results exported', user: 'Admin', time: '1 day ago' }
  ];

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-slate-800/50 backdrop-blur-sm border-r border-slate-700/50">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <UsersIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold">Admin Portal</h3>
              <p className="text-gray-400 text-sm">Dashboard</p>
            </div>
          </div>

          <nav className="space-y-2">
            <div className="bg-slate-700/50 rounded-lg p-3 border border-slate-600/50">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center">
                  <UsersIcon className="w-4 h-4 text-gray-300" />
                </div>
                <div>
                  <p className="text-white text-sm font-medium">{user?.name}</p>
                  <p className="text-gray-400 text-xs">Administrator</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate('/admin/questions')}
              className="w-full flex items-center space-x-3 p-3 text-gray-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all"
            >
              <DocumentTextIcon className="w-5 h-5" />
              <span>Questions</span>
            </button>

            <button
              onClick={() => navigate('/admin/students')}
              className="w-full flex items-center space-x-3 p-3 text-gray-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all"
            >
              <UsersIcon className="w-5 h-5" />
              <span>Students</span>
            </button>
            
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
            <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-gray-400">Manage your examination platform</p>
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
                    <p className="text-3xl font-bold text-white">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <h2 className="text-xl font-semibold text-white mb-6">Quick Actions</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {quickActions.map((action, index) => (
                <motion.div
                  key={action.title}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:bg-slate-800/70 transition-all cursor-pointer group"
                  onClick={action.action}
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{action.title}</h3>
                  <p className="text-gray-400 text-sm">{action.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6"
          >
            <h2 className="text-xl font-semibold text-white mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg border border-slate-600/30">
                  <div>
                    <p className="text-white font-medium">{activity.action}</p>
                    <p className="text-gray-400 text-sm">{activity.user}</p>
                  </div>
                  <span className="text-gray-400 text-sm">{activity.time}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;