import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ClockIcon, ChevronLeftIcon, ChevronRightIcon, CheckIcon } from '@heroicons/react/24/outline';
import { useExam } from '../../context/ExamContext';

const TestScreen = () => {
  const {
    questions,
    currentQuestionIndex,
    answers,
    timeLeft,
    setCurrentQuestionIndex,
    setAnswer,
    setTimeLeft,
    submitTest
  } = useExam();
  
  const navigate = useNavigate();
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setAnswer(questions[currentQuestionIndex].id, answerIndex);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    const submissionId = submitTest();
    navigate('/student/confirmation', { state: { submissionId } });
  };

  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = answers[currentQuestion?.id];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const answeredCount = Object.keys(answers).length;

  if (!currentQuestion) {
    return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen p-4">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-6">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-white">
                <span className="text-sm text-gray-400">Question </span>
                <span className="font-bold">{currentQuestionIndex + 1}</span>
                <span className="text-gray-400"> of {questions.length}</span>
              </div>
              <div className="text-white">
                <span className="text-sm text-gray-400">Answered: </span>
                <span className="font-bold text-green-400">{answeredCount}</span>
                <span className="text-gray-400">/{questions.length}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 text-white">
              <ClockIcon className="w-5 h-5" />
              <span className={`font-mono text-lg ${timeLeft < 300 ? 'text-red-400' : 'text-white'}`}>
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="w-full bg-slate-700 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Question Card */}
      <div className="max-w-4xl mx-auto mb-6">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-8"
        >
          <h2 className="text-xl font-semibold text-white mb-6">
            {currentQuestion.question}
          </h2>
          
          <div className="space-y-4">
            {currentQuestion.options.map((option, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  currentAnswer === index
                    ? 'bg-blue-600/20 border-blue-500 text-white'
                    : 'bg-slate-700/30 border-slate-600/30 text-gray-300 hover:bg-slate-700/50 hover:border-slate-500'
                }`}
                onClick={() => handleAnswerSelect(index)}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    currentAnswer === index
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-slate-400'
                  }`}>
                    {currentAnswer === index && <CheckIcon className="w-4 h-4 text-white" />}
                  </div>
                  <span className="font-medium">{String.fromCharCode(65 + index)}.</span>
                  <span>{option}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Navigation */}
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
              currentQuestionIndex === 0
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-slate-700 hover:bg-slate-600 text-white'
            }`}
          >
            <ChevronLeftIcon className="w-5 h-5" />
            <span>Previous</span>
          </motion.button>

          <div className="flex space-x-3">
            {currentQuestionIndex === questions.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowSubmitModal(true)}
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 py-3 rounded-lg font-medium transition-all shadow-lg shadow-red-500/25"
              >
                Submit Test
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleNext}
                className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all shadow-lg shadow-blue-500/25"
              >
                <span>Next</span>
                <ChevronRightIcon className="w-5 h-5" />
              </motion.button>
            )}
          </div>
        </div>
      </div>

      {/* Submit Confirmation Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-800 rounded-2xl p-8 max-w-md w-full border border-slate-700"
          >
            <h3 className="text-xl font-bold text-white mb-4">Submit Test?</h3>
            <p className="text-gray-400 mb-6">
              Are you sure you want to submit your test? You have answered {answeredCount} out of {questions.length} questions.
              This action cannot be undone.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-lg font-medium transition-all"
              >
                Continue Test
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-3 rounded-lg font-medium transition-all"
              >
                Submit Now
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default TestScreen;