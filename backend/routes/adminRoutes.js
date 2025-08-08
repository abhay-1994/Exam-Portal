// backend/routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const questionController = require('../controllers/questionController');
const db = require('../config/db');

// question CRUD (admin only)
router.post('/questions', auth('admin'), questionController.createQuestion);
router.get('/questions', auth('admin'), questionController.getAll);
router.get('/questions/:id', auth('admin'), questionController.getOne);
router.put('/questions/:id', auth('admin'), questionController.updateQuestion);
router.delete('/questions/:id', auth('admin'), questionController.deleteQuestion);

// list students
router.get('/students', auth('admin'), (req, res) => {
  db.query('SELECT id, name, email, created_at FROM users WHERE role = "student"', (err, rows) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(rows);
  });
});

module.exports = router;
