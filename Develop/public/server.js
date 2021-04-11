const express = require('express');
const path = require('path');
const fs = require('fs');
const todoList = [];
const noteList = JSON.parse(fs.readFileSync('../db/db.json'));
const joiner = () => {
  todoList.push(noteList);
}
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(express.json());


app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'notes.html')));
app.get('/api/notes', (req, res) => res.json(todoList));

app.post('/api/notes', (req,res) => {
  const newNote = req.body;
  if (noteList) {
    joiner();
    todoList.push(newNote);
    console.log('first with JSON');
  } else {
    todoList.push(newNote);
    console.log('first but no JSON');
  }
  fs.writeFileSync('../db/db.json', JSON.stringify(todoList, null, 2));
  res.json(newNote);
  console.log(`this is the todo list \n`);
  console.log(todoList);
});


app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));

