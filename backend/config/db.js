// backend/config/db.js
const mysql = require('mysql2');
require('dotenv').config();

let db;

try {
  db = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'root',
    database: process.env.DB_NAME || 'exam_system',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

  db.getConnection((err, conn) => {
    if (err) {
      console.error('❌ MySQL connection failed:', err.message);
    } else {
      console.log('✅ MySQL connected');
      if (conn) conn.release();
    }
  });
} catch (error) {
  console.error('❌ DB init error:', error.message);
}

module.exports = db;
