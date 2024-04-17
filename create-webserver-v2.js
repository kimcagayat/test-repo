const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 4004;

// Open a database connection
let db = new sqlite3.Database(':memory:', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
});

// Create table
db.run(`CREATE TABLE words (original TEXT, transformed TEXT)`);

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.get('/api/mirror', (req, res) => {
    let word = req.query.word;
    let transformed = word.split('').map(char => {
        if (char === char.toUpperCase()) {
            return char.toLowerCase();
        } else if (char === char.toLowerCase()) {
            return char.toUpperCase();
        } else {
            return char;
        }
    }).reverse().join('');

    // Save to database
    db.run(`INSERT INTO words(original, transformed) VALUES(?, ?)`, [word, transformed], function(err) {
        if (err) {
            return console.log(err.message);
        }
        console.log(`A row has been inserted with rowid ${this.lastID}`);
    });

    res.json({ transformed: transformed });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});