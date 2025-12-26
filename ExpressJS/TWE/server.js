// server.js
// Importing express module
const express = require("express");
// Creating an express application
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Defining the port number
const PORT = 8081;

// Defining todo items
const todoList = ["Rohit Kumar", "Graduation", "Software Developer"];

// Defining routes
// Home route
app.get("/", (req, res) => res.status(200).send("Home Page!"));

// Todos routes
// Get all todos
app.get("/todos", (req, res) => {
  res.status(200).send(todoList);
});

// Add a new todo
app.post("/todos", (req, res) => {
  const item = req.body.item;
  todoList.push(item);
  res.status(201).send("Task added successfuly");
});

// Delete a todo
app.delete("/todos", (req, res) => {
  const item = req.body.item;
  const idx = todoList.indexOf(item);
  todoList.splice(idx, 1);
  res.status(202).send(`Task deleted successfuly - ${item}`);
});

// Updating a todo
app.patch("/todos", (req, res) => {
  const oldItem = req.body.oldItem;
  const newItem = req.body.newItem;
  const idx = todoList.indexOf(oldItem);
  if (idx !== -1) {
    todoList[idx] = newItem;
    res.status(203).send("Task updated successfuly");
  } else {
    res.status(404).send("Task not found");
  }
});

// Starting the server
// Listening on the defined port
app.listen(PORT, () =>
  console.log(`Server is running on port http://localhost:${PORT}`)
);
