const mongoose = require("mongoose");
const Todo = require("../model/todoModel");

// Get all todos with search query
exports.getTodos = async (req, res) => {
  const { search } = req.query;
  let query = {};
  if (search) {
    query = { title: { $regex: search, $options: "i" } };
  }
  try {
    const todos = await Todo.find(query).sort({ createdAt: -1 });
    if (todos.length === 0) {
      return res.status(400).json({ error: "No todo found!" });
    }
    res.status(200).json(todos);
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message, message: "Internal server error" });
  }
};

// Get single todo by its ID
exports.getTodo = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Pass valid Object Id" });
  }
  try {
    const todo = await Todo.findOne({ _id: id });
    if (!todo) {
      return res.status(400).json({ error: "No such todo found!" });
    }
    res.status(200).json(todo);
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message, message: "Internal server error" });
  }
};

// Create a new Todo
exports.createTodo = async (req, res) => {
  const { title, description, completed } = req.body;
  let emptyFields = [];
  if (!title) {
    emptyFields.push("title");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Title missing, Please fill the title.", emptyFields });
  }
  const data = { title, description, completed };
  try {
    const newTodo = new Todo(data);
    const todo = await newTodo.save();
    res.status(201).json(todo);
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message, message: "Internal server error" });
  }
};

// Toggle todo completed (true or false) by its Id
exports.toggleTodo = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Pass valid Object Id" });
  }
  try {
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(400).json({ error: "No such todo found!" });
    }
    todo.completed = !todo.completed;
    const newTodo = await todo.save();
    res.status(200).json(newTodo);
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message, message: "Internal server error" });
  }
};

// Delete todo by its Id
exports.deleteTodo = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Pass valid Object Id" });
  }
  try {
    const todo = await Todo.findOneAndDelete({ _id: id });
    if (!todo) {
      return res.status(400).json({ error: "No such todo found!" });
    }
    res.status(200).json(todo);
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message, message: "Internal server error" });
  }
};

// Update todo by its Id
exports.updateTodo = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Pass valid Object Id" });
  }
  const data = req.body;
  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: id },
      { ...data },
      { new: true, runValidators: true },
    );
    if (!todo) {
      return res.status(400).json({ error: "No such todo found!" });
    }
    res.status(200).json(todo);
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message, message: "Internal server error" });
  }
};
