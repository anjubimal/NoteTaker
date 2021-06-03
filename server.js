const express = require('express');
const app = express();

const {notes} = require('./db/db');
const path = require('path');
const PORT = process.env.PORT || 3001;


app.get('/api/notes', (req, res) =>{
    res.json(notes);
})


// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, './public/index.html'));
// });

// app.get('/notes', (req, res) => {
//     res.sendFile(path.join(__dirname, './public/notes.html'));
// });


app.listen(PORT, () =>{
    console.log(`API server now on port ${PORT}`);
})