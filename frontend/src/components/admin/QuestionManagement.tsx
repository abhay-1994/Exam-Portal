import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon, 
  ArrowLeftIcon,
  DocumentTextIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { useExam } from '../../context/ExamContext';

const QuestionManagement = () => {
  const { questions, addQuestion, deleteQuestion } = useExam();
  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData(prev => ({ ...prev, options: newOptions }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.question && formData.options.every(opt => opt.trim())) {
      addQuestion(formData);
      setFormData({ question: '', options: ['', '', '', ''], correctAnswer: 0 });
      setShowAddModal(false);
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      deleteQuestion(id);
    }
  };

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
              <h1 className="text-3xl font-bold text-white">Question Management</h1>
              <p className="text-gray-400">Create and manage examination questions</p>
            </div>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowAddModal(true)}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-all shadow-lg shadow-green-500/25 flex items-center space-x-2"
          >
            <PlusIcon className="w-5 h-5" />
            <span>Add Question</span>
          </motion.button>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Total Questions</p>
                <p className="text-2xl font-bold text-white">{questions.length}</p>
              </div>
              <DocumentTextIcon className="w-8 h-8 text-blue-400" />
            </div>
          </div>
        </div>

        {/* Questions List */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-6">All Questions</h2>
          
          {questions.length === 0 ? (
            <div className="text-center py-12">
              <DocumentTextIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg mb-4">No questions yet</p>
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-all"
              >
                Add Your First Question
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {questions.map((question, index) => (
                <motion.div
                  key={question.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-slate-700/30 border border-slate-600/30 rounded-lg p-6"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-white font-medium text-lg pr-4">{question.question}</h3>
                    <div className="flex space-x-2 flex-shrink-0">
                      <button className="p-2 text-gray-400 hover:text-blue-400 hover:bg-slate-600/50 rounded-lg transition-all">
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(question.id)}
                        className="p-2 text-gray-400 hover:text-red-400 hover:bg-slate-600/50 rounded-lg transition-all"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-3">
                    {question.options.map((option, optIndex) => (
                      <div
                        key={optIndex}
                        className={`p-3 rounded-lg text-sm ${
                          optIndex === question.correctAnswer
                            ? 'bg-green-900/30 border border-green-600/30 text-green-200'
                            : 'bg-slate-600/30 border border-slate-500/30 text-gray-300'
                        }`}
                      >
                        <span className="font-medium">{String.fromCharCode(65 + optIndex)}.</span> {option}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add Question Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setShowAddModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-slate-800 rounded-2xl p-8 w-full max-w-2xl border border-slate-700 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setShowAddModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>

              <h2 className="text-2xl font-bold text-white mb-6">Add New Question</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Question
                  </label>
                  <textarea
                    value={formData.question}
                    onChange={(e) => handleInputChange('question', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    rows={3}
                    placeholder="Enter your question here..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-4">
                    Answer Options
                  </label>
                  <div className="space-y-3">
                    {formData.options.map((option, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="correctAnswer"
                          checked={formData.correctAnswer === index}
                          onChange={() => handleInputChange('correctAnswer', index)}
                          className="w-4 h-4 text-green-500 bg-slate-600 border-slate-500 focus:ring-green-500"
                        />
                        <span className="text-gray-300 font-medium min-w-[20px]">
                          {String.fromCharCode(65 + index)}.
                        </span>
                        <input
                          type="text"
                          value={option}
                          onChange={(e) => handleOptionChange(index, e.target.value)}
                          className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder={`Option ${String.fromCharCode(65 + index)}`}
                          required
                        />
                      </div>
                    ))}
                  </div>
                  <p className="text-gray-400 text-xs mt-2">Select the radio button for the correct answer</p>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-lg font-medium transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-3 rounded-lg font-medium transition-all"
                  >
                    Add Question
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuestionManagement;