const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Database setup
const db = new sqlite3.Database('./appointments.db', (err) => {
    if (err) console.error(err.message);
    console.log('Connected to SQLite database.');
});

db.run(`CREATE TABLE IF NOT EXISTS appointments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    department TEXT,
    doctor TEXT,
    date TEXT,
    time TEXT
)`);

// Create an appointment
app.post('/appointments', (req, res) => {
    const { department, doctor, date, time } = req.body;
    db.run(
        `INSERT INTO appointments (department, doctor, date, time) VALUES (?, ?, ?, ?)`,
        [department, doctor, date, time],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID, department, doctor, date, time });
        }
    );
});

// Get all appointments
app.get('/appointments', (req, res) => {
    db.all(`SELECT * FROM appointments`, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Delete an appointment
app.delete('/appointments/:id', (req, res) => {
    const { id } = req.params;
    db.run(`DELETE FROM appointments WHERE id = ?`, [id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Appointment deleted', id });
    });
});

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
