const express = require("express");
const router = express.Router();
const {
  getTodos,
  getTodo,
  createTodo,
  toggleTodo,
  deleteTodo,
  updateTodo,
} = require("../controllers/todoController");

router.get("/", getTodos);
router.get("/:id", getTodo);
router.post("/", createTodo);
router.patch("/toggle/:id", toggleTodo);
router.delete("/:id", deleteTodo);
router.patch("/:id", updateTodo);

module.exports = router;
