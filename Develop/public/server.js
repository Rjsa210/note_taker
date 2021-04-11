const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

let todoList = [];
const noteList = JSON.parse(fs.readFileSync('../db/db.json'));
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(express.json());


app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'notes.html')));
app.get('/api/notes', (req, res) => res.json(noteList));

app.post('/api/notes', (req,res) => {
  // const newNote = req.body;
  const newNote = {
    title: req.body.title,
    text: req.body.text,
    id: uuidv4()
  };
  todoList = noteList;
  todoList.push(newNote);

  
  fs.writeFileSync('../db/db.json', JSON.stringify(todoList, null, 2));
  res.send(todoList);

});


app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));

