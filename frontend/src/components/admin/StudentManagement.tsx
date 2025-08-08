import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeftIcon,
  UsersIcon,
  MagnifyingGlassIcon,
  EyeIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';

const StudentManagement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const students = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@student.edu',
      rollNumber: 'STU001',
      testsCompleted: 3,
      averageScore: 85,
      lastActivity: '2024-01-15',
      status: 'active'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@student.edu',
      rollNumber: 'STU002',
      testsCompleted: 2,
      averageScore: 92,
      lastActivity: '2024-01-14',
      status: 'active'
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike.johnson@student.edu',
      rollNumber: 'STU003',
      testsCompleted: 1,
      averageScore: 78,
      lastActivity: '2024-01-12',
      status: 'inactive'
    },
    {
      id: '4',
      name: 'Sarah Wilson',
      email: 'sarah.wilson@student.edu',
      rollNumber: 'STU004',
      testsCompleted: 4,
      averageScore: 88,
      lastActivity: '2024-01-16',
      status: 'active'
    }
  ];

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = [
    { label: 'Total Students', value: students.length.toString(), color: 'text-blue-400' },
    { label: 'Active Students', value: students.filter(s => s.status === 'active').length.toString(), color: 'text-green-400' },
    { label: 'Tests Completed', value: students.reduce((sum, s) => sum + s.testsCompleted, 0).toString(), color: 'text-purple-400' }
  ];

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
            >
              <ArrowLeftIcon className="w-6 h-6 text-gray-400 hover:text-white" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-white">Student Management</h1>
              <p className="text-gray-400">View and manage student profiles</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </div>
                <UsersIcon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Search and Filters */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Search students by name, email, or roll number..."
              />
            </div>
          </div>
        </div>

        {/* Students Table */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl overflow-hidden">
          <div className="p-6 border-b border-slate-700/50">
            <h2 className="text-xl font-semibold text-white">All Students</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700/50">
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400 uppercase tracking-wider">
                    Roll Number
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400 uppercase tracking-wider">
                    Tests Completed
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400 uppercase tracking-wider">
                    Average Score
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400 uppercase tracking-wider">
                    Last Activity
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {filteredStudents.map((student, index) => (
                  <motion.tr
                    key={student.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-slate-700/20 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-white">{student.name}</div>
                        <div className="text-sm text-gray-400">{student.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {student.rollNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {student.testsCompleted}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`font-medium ${
                        student.averageScore >= 90 ? 'text-green-400' :
                        student.averageScore >= 80 ? 'text-blue-400' :
                        student.averageScore >= 70 ? 'text-yellow-400' : 'text-red-400'
                      }`}>
                        {student.averageScore}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        student.status === 'active' 
                          ? 'bg-green-900/30 text-green-400' 
                          : 'bg-red-900/30 text-red-400'
                      }`}>
                        {student.status === 'active' ? (
                          <CheckCircleIcon className="w-3 h-3 mr-1" />
                        ) : (
                          <XCircleIcon className="w-3 h-3 mr-1" />
                        )}
                        {student.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      {student.lastActivity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      <button className="text-blue-400 hover:text-blue-300 transition-colors">
                        <EyeIcon className="w-4 h-4" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredStudents.length === 0 && (
            <div className="text-center py-12">
              <UsersIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No students found</p>
              <p className="text-gray-500 text-sm">Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentManagement;