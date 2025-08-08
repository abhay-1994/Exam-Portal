import React, { createContext, useContext, useState, ReactNode } from 'react';
import axios from 'axios';

interface Question {
  id: string | number;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface ExamContextType {
  questions: Question[];
  currentQuestionIndex: number;
  answers: { [key: string]: number };
  timeLeft: number;
  testId: string | null;
  setCurrentQuestionIndex: (index: number) => void;
  setAnswer: (questionId: string, answerIndex: number) => void;
  setTimeLeft: (time: number) => void;
  startTest: () => Promise<void>;
  submitTest: () => Promise<string>;
  addQuestion: (question: Omit<Question, 'id'>) => Promise<void>;
  deleteQuestion: (id: string | number) => Promise<void>;
  loadQuestions: () => Promise<void>;
}

const ExamContext = createContext<ExamContextType | undefined>(undefined);

export function ExamProvider({ children }: { children: ReactNode }) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: number }>({});
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes
  const [testId, setTestId] = useState<string | null>(null);

  const API_URL = "http://localhost:5003/api";

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  const loadQuestions = async () => {
    try {
      const res = await axios.get(`${API_URL}/student/questions`, getAuthHeaders());
      setQuestions(res.data);
    } catch (err) {
      console.error("Failed to load questions:", err);
    }
  };

  const setAnswer = (questionId: string | number, answerIndex: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
  };

  const startTest = async () => {
    await loadQuestions();
    setCurrentQuestionIndex(0);
    setAnswers({});
    setTimeLeft(1800);
    setTestId(`TEST_${Date.now()}`);
  };

  const submitTest = async (): Promise<string> => {
    const submissionId = `SUB_${Date.now()}`;
    try {
      await axios.post(`${API_URL}/student/submit`, {
        testId,
        answers
      }, getAuthHeaders());
    } catch (err) {
      console.error("Failed to submit test:", err);
    }
    return submissionId;
  };

  const addQuestion = async (questionData: Omit<Question, 'id'>) => {
    try {
      const res = await axios.post(`${API_URL}/admin/questions`, questionData, getAuthHeaders());
      setQuestions(prev => [...prev, res.data]);
    } catch (err) {
      console.error("Failed to add question:", err);
    }
  };

  const deleteQuestion = async (id: string | number) => {
    try {
      await axios.delete(`${API_URL}/admin/questions/${id}`, getAuthHeaders());
      setQuestions(prev => prev.filter(q => q.id !== id));
    } catch (err) {
      console.error("Failed to delete question:", err);
    }
  };

  return (
    <ExamContext.Provider value={{
      questions,
      currentQuestionIndex,
      answers,
      timeLeft,
      testId,
      setCurrentQuestionIndex,
      setAnswer,
      setTimeLeft,
      startTest,
      submitTest,
      addQuestion,
      deleteQuestion,
      loadQuestions
    }}>
      {children}
    </ExamContext.Provider>
  );
}

export function useExam() {
  const context = useContext(ExamContext);
  if (context === undefined) {
    throw new Error('useExam must be used within an ExamProvider');
  }
  return context;
}
