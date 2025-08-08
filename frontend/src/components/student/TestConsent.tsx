import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  DocumentTextIcon,
  EyeIcon,
  ComputerDesktopIcon
} from '@heroicons/react/24/outline';

const TestConsent = () => {
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();

  const handleProceed = () => {
    if (agreed) {
      navigate('/student/test');
    }
  };

  const rules = [
    {
      icon: ClockIcon,
      title: 'Time Limit',
      description: 'You have 30 minutes to complete this examination. The test will auto-submit when time expires.'
    },
    {
      icon: DocumentTextIcon,
      title: 'Question Format',
      description: 'All questions are multiple choice. Select the best answer for each question.'
    },
    {
      icon: EyeIcon,
      title: 'Monitoring',
      description: 'This exam is monitored. Do not switch tabs or leave the exam window during the test.'
    },
    {
      icon: ComputerDesktopIcon,
      title: 'Technical Requirements',
      description: 'Ensure stable internet connection. Use a desktop or laptop for best experience.'
    }
  ];

  const warnings = [
    'Switching tabs or windows during the exam may result in automatic submission',
    'Copying, pasting, or using external resources is strictly prohibited',
    'You cannot pause or restart the exam once started',
    'All answers are automatically saved as you progress'
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl w-full bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4"
          >
            <DocumentTextIcon className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-white mb-2">Examination Guidelines</h1>
          <p className="text-gray-400">Please read the following rules and guidelines carefully before proceeding</p>
        </div>

        {/* Rules Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
            <CheckCircleIcon className="w-6 h-6 text-green-400 mr-2" />
            Examination Rules
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {rules.map((rule, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-slate-700/30 border border-slate-600/30 rounded-lg p-4"
              >
                <div className="flex items-start space-x-3">
                  <rule.icon className="w-6 h-6 text-blue-400 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-white font-medium mb-1">{rule.title}</h3>
                    <p className="text-gray-400 text-sm">{rule.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Warnings Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-8"
        >
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
            <ExclamationTriangleIcon className="w-6 h-6 text-yellow-400 mr-2" />
            Important Warnings
          </h2>
          <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-6">
            <ul className="space-y-3">
              {warnings.map((warning, index) => (
                <li key={index} className="flex items-start space-x-3 text-yellow-200">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm">{warning}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Agreement Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-slate-700/30 border border-slate-600/30 rounded-lg p-6 mb-8"
        >
          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="w-5 h-5 text-blue-500 bg-slate-600 border-slate-500 rounded focus:ring-blue-500 focus:ring-2 mt-1"
            />
            <div className="text-gray-300">
              <p className="font-medium mb-1">I agree to the examination terms and conditions</p>
              <p className="text-sm text-gray-400">
                By checking this box, I confirm that I have read and understood all the rules and guidelines.
                I agree to abide by the examination policies and understand that any violation may result in
                disqualification.
              </p>
            </div>
          </label>
        </motion.div>

        {/* Action Buttons */}
        <div className="flex justify-between">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/student/dashboard')}
            className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-all"
          >
            Back to Dashboard
          </motion.button>
          
          <motion.button
            whileHover={{ scale: agreed ? 1.02 : 1 }}
            whileTap={{ scale: agreed ? 0.98 : 1 }}
            onClick={handleProceed}
            disabled={!agreed}
            className={`px-8 py-3 rounded-lg font-medium transition-all ${
              agreed
                ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg shadow-green-500/25'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
          >
            Start Examination
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default TestConsent;