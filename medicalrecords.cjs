const express = require('express');
const cors = require('cors');
const multer = require('multer');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('uploads'));

// Database Setup
const db = new sqlite3.Database('./medical_records.db', (err) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Connected to SQLite database');
  }
});

// Create Table if not exists
db.run(
  `CREATE TABLE IF NOT EXISTS records (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    date TEXT,
    doctor TEXT,
    type TEXT,
    file TEXT
  )`
);

// File Upload Setup
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Routes

// Get All Medical Records
app.get('/records', (req, res) => {
  db.all('SELECT * FROM records', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Upload Medical Record
app.post('/upload', upload.single('file'), (req, res) => {
  const { title, date, doctor, type } = req.body;
  const filePath = req.file ? req.file.filename : null;

  db.run(
    'INSERT INTO records (title, date, doctor, type, file) VALUES (?, ?, ?, ?, ?)',
    [title, date, doctor, type, filePath],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ id: this.lastID, title, date, doctor, type, file: filePath });
    }
  );
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
