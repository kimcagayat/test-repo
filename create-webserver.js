const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 4004;

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

const WordSchema = new mongoose.Schema({
    word: String,
    mirroredWord: String
});

const Word = mongoose.model('Word', WordSchema);

app.get('/api/mirror', async (req, res) => {
    const word = req.query.word;
    const transformedWord = word.split('').map(char => {
        return char === char.toLowerCase() ? char.toUpperCase() : char.toLowerCase();
    }).reverse().join('');

    const wordEntry = new Word({ word: word, mirroredWord: transformedWord });
    await wordEntry.save();

    res.json({ mirroredWord: transformedWord });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});