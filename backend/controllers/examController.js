// backend/controllers/examController.js
const db = require('../config/db');

exports.getExam = (req, res) => {
  const limit = parseInt(req.query.limit || '10', 10);
  db.query('SELECT id, question_text, option_a, option_b, option_c, option_d FROM questions ORDER BY RAND() LIMIT ?', [limit], (err, rows) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(rows);
  });
};

exports.submitAnswers = (req, res) => {
  const studentId = req.user.id;
  const answers = req.body.answers; // [{ questionId, answer }]
  if (!Array.isArray(answers) || answers.length === 0) return res.status(400).json({ message: 'No answers provided' });

  const qIds = answers.map(a => a.questionId);
  const placeholders = qIds.map(() => '?').join(',');
  db.query(`SELECT id, correct_option FROM questions WHERE id IN (${placeholders})`, qIds, (err, questionsRows) => {
    if (err) return res.status(500).json({ message: err.message });

    const correctMap = {};
    questionsRows.forEach(q => (correctMap[q.id] = q.correct_option));

    let score = 0;
    answers.forEach(a => {
      if (correctMap[a.questionId] && correctMap[a.questionId] === a.answer) score += 1;
    });

    db.query('INSERT INTO results (student_id, score, total) VALUES (?, ?, ?)', [studentId, score, answers.length], (err2, result) => {
      if (err2) return res.status(500).json({ message: err2.message });
      const resultId = result.insertId;

      const answerRows = answers.map(a => [resultId, a.questionId, a.answer, (correctMap[a.questionId] === a.answer) ? 1 : 0]);
      db.query('INSERT INTO answers (result_id, question_id, student_answer, is_correct) VALUES ?', [answerRows], (err3) => {
        if (err3) return res.status(500).json({ message: err3.message });
        res.json({ message: 'Submitted', score, total: answers.length, resultId });
      });
    });
  });
};

exports.getResultsForStudent = (req, res) => {
  const studentId = req.user.id;
  db.query('SELECT * FROM results WHERE student_id = ? ORDER BY submitted_at DESC', [studentId], (err, rows) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(rows);
  });
};
