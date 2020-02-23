import express from 'express';
import bodyParser from 'body-parser';
import db from './db/db';
import cors from 'cors';
import { hostname } from 'os';

// Set up the express app
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())

app.get('/', (req, res) => {
  return res.status(200).send(`Hello from ${hostname()}`)
});

//#region endpoints
// get all todos
app.get('/api/todos', (req, res) => {
  res.status(200).send({
    success: 'true',
    message: 'todos retrieved successfully',
    todos: db
  })
});

app.post('/api/todos', (req, res) => {
  if(!req.body.title) {
    return res.status(400).send({
      success: 'false',
      message: 'title is required'
    });
  } else if(!req.body.description) {
    return res.status(400).send({
      success: 'false',
      message: 'description is required'
    });
  }
  const todo = {
    id: Math.max(...db.map(i => i.id)) + 1,
    title: req.body.title,
    description: req.body.description
  }
  db.push(todo);
  return res.status(201).send({
    success: 'true',
    message: 'todo added successfully',
    todo
  })
});

app.delete('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  var found = db.findIndex(todo => todo.id == id);
  if (found > -1) {
    db.splice(found, 1);
    return res.status(200).send({
      success: 'true',
      message: 'Todo deleted successfuly',
    });
  }

  return res.status(404).send({
    success: 'false',
    message: 'todo not found',
  });
});

//#endregion

const PORT = 8081;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});