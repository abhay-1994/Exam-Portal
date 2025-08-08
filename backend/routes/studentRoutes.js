// backend/routes/studentRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const examController = require('../controllers/examController');

// get randomized exam questions (no correct option)
router.get('/exam', auth('student'), examController.getExam);

// submit answers
router.post('/submit', auth('student'), examController.submitAnswers);

// get student's results
router.get('/results', auth('student'), examController.getResultsForStudent);

module.exports = router;
