const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());

app.post('/api/upload-random', (req, res) => {
    const randomNumber = Math.floor(Math.random() * 100);
    fs.writeFile('random.txt', randomNumber.toString(), (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('An error occurred while creating the file.');
            return;
        }
        // TODO: Implement logic to upload the file to your cloud storage solution here.
        res.send('File created and uploaded successfully.');
    });
});

app.listen(3000, () => console.log('Server is running on port 3000'));