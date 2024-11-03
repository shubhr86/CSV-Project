// app.js
const express = require('express');
const path = require('path');
const fs = require('fs');
const csv = require('csv-parser');
const upload = require('./uploadConfig');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

// Route to handle CSV file upload
app.post('/upload', (req, res, next) => {
    upload.single('csvfile')(req, res, (err) => {
        if (err) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).send('File size exceeds limit. Please upload a file under 2 MB.');
            }
            return res.status(400).send(err.message);
        }
        if (!req.file) return res.status(400).send('Only CSV files are allowed.');
        res.redirect('/');
    });
});

// Route to display the content of a specific CSV file as a table
app.get('/table/:filename', (req, res) => {
    const filePath = path.join(__dirname, 'uploads', req.params.filename);
    const results = [];
    const headers = new Set();

    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => {
            results.push(data);
            Object.keys(data).forEach(key => headers.add(key));
        })
        .on('end', () => {
            res.render('table', { data: results, headers: Array.from(headers) });
        })
        .on('error', (err) => {
            console.error('Error parsing CSV file:', err);
            res.status(500).send('Error reading CSV file.');
        });
});

// Route to display the list of uploaded files on the index page
app.get('/', (req, res) => {
    fs.readdir('./uploads', (err, files) => {
        if (err) {
            console.error('Error reading upload directory:', err);
            res.sendStatus(500);
        } else {
            const csvFiles = files.filter(file => path.extname(file) === '.csv');
            res.render('index', { files: csvFiles });
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
