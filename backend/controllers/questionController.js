// backend/controllers/questionController.js
const db = require("../config/db");

exports.createQuestion = (req, res) => {
  const {
    question_text,
    option_a,
    option_b,
    option_c,
    option_d,
    correct_option,
  } = req.body;
  if (!question_text || !correct_option)
    return res.status(400).json({ message: "Required fields missing" });

  db.query(
    `INSERT INTO questions (question_text, option_a, option_b, option_c, option_d, correct_option)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [question_text, option_a, option_b, option_c, option_d, correct_option],
    (err, result) => {
      if (err) return res.status(500).json({ message: err.message });
      res.json({ id: result.insertId });
    }
  );
};

exports.getAll = (req, res) => {
  db.query(
    "SELECT id, question_text, option_a, option_b, option_c, option_d FROM questions",
    (err, results) => {
      if (err) return res.status(500).json({ message: err.message });
      res.json(results);
    }
  );
};

exports.getOne = (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM questions WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    if (!results.length) return res.status(404).json({ message: "Not found" });
    res.json(results[0]);
  });
};

exports.updateQuestion = (req, res) => {
  const id = req.params.id;
  const {
    question_text,
    option_a,
    option_b,
    option_c,
    option_d,
    correct_option,
  } = req.body;
  db.query(
    `UPDATE questions SET question_text=?, option_a=?, option_b=?, option_c=?, option_d=?, correct_option=? WHERE id=?`,
    [question_text, option_a, option_b, option_c, option_d, correct_option, id],
    (err) => {
      if (err) return res.status(500).json({ message: err.message });
      res.json({ message: "Updated" });
    }
  );
};

exports.deleteQuestion = (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM questions WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json({ message: "Deleted" });
  });
};
