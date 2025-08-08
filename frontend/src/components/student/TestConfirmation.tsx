import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircleIcon, ClockIcon, DocumentTextIcon, HomeIcon } from '@heroicons/react/24/outline';
import { useExam } from '../../context/ExamContext';

const TestConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { questions, answers } = useExam();
  const submissionId = location.state?.submissionId || 'SUB_' + Date.now();

  const answeredCount = Object.keys(answers).length;
  const completionRate = Math.round((answeredCount / questions.length) * 100);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 text-center"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mb-6"
        >
          <CheckCircleIcon className="w-12 h-12 text-white" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold text-white mb-4"
        >
          Test Submitted Successfully!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-400 text-lg mb-8"
        >
          Your examination has been submitted and recorded. Thank you for completing the test.
        </motion.p>

        {/* Submission Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-slate-700/30 border border-slate-600/30 rounded-xl p-6 mb-8"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Submission Details</h3>
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div className="flex items-start space-x-3">
              <DocumentTextIcon className="w-6 h-6 text-blue-400 mt-1" />
              <div>
                <p className="text-gray-400 text-sm">Submission ID</p>
                <p className="text-white font-mono">{submissionId}</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <ClockIcon className="w-6 h-6 text-purple-400 mt-1" />
              <div>
                <p className="text-gray-400 text-sm">Submitted At</p>
                <p className="text-white">{new Date().toLocaleString()}</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <CheckCircleIcon className="w-6 h-6 text-green-400 mt-1" />
              <div>
                <p className="text-gray-400 text-sm">Questions Answered</p>
                <p className="text-white">{answeredCount} of {questions.length}</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mt-1 flex items-center justify-center">
                <span className="text-white text-xs font-bold">%</span>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Completion Rate</p>
                <p className="text-white">{completionRate}%</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Results Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-blue-900/20 border border-blue-600/30 rounded-xl p-6 mb-8"
        >
          <h3 className="text-lg font-semibold text-white mb-2">What's Next?</h3>
          <p className="text-blue-200 text-sm">
            Your test results will be processed and made available within 24-48 hours. 
            You will receive an email notification once your results are ready to view.
          </p>
        </motion.div>

        {/* Action Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/student/dashboard')}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-all shadow-lg shadow-blue-500/25 flex items-center space-x-2 mx-auto"
        >
          <HomeIcon className="w-5 h-5" />
          <span>Return to Dashboard</span>
        </motion.button>

        {/* Footer Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-gray-500 text-sm mt-6"
        >
          Keep your submission ID safe for future reference: <span className="font-mono text-gray-400">{submissionId}</span>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default TestConfirmation;