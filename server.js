const fs = require('fs');
const path = require('path');

const express = require('express');
const app = express();

let {notes} = require('./db/db');
const PORT = process.env.PORT || 3001;

//parse incoming string or array data
app.use(express.urlencoded({extended: true}));
//parse incoming JSON data
app.use(express.json());
app.use(express.static('public'));


function findById(id, notesArray){
    const result = notesArray.filter(notes => notes.id === id)[0];
}

app.get('/api/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    res.json(result);
})



app.get('/api/notes', (req, res) => {
    res.json(notes);
})


app.post('/api/notes', (req,res)=>{
    //set id based on what the next index of the array will be
    req.body.id = notes.length.toString();

    //add notes to json file and notes array in this function
    const note = createNewNotes(req.body, notes)
    res.json(note);
});

function createNewNotes(body, notesArray){
    const note = body;
    notesArray.push(note);

    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({notes: notesArray}, null,2)
    );

    return note;
}
    app.delete('/api/notes/:id', function(req,res){
        let remaining = [];
        // let notes = req.body;

        for (let i=0;i<notes.length;i++){
            if(notes[i].id !== req.params.id){
                remaining.push(notes[i]);
            }

        }

        notes = remaining
        fs.writeFileSync('./db/db.json', JSON.stringify(notes), function(err,res){
            if(err){
                throw err;
            }
        });
        res.json(notes)
    })


    // const note = body;
    // // notesArray.push(note);
    // //whatever id is equal to the id it concerns delete it 
    // let 

    

   



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});


app.listen(PORT, () =>{
    console.log(`API server now on port ${PORT}`);
})