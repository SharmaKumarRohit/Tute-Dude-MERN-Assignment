const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newTask = new Task(data);
    const response = await newTask.save();
    console.log("task saved");
    res.status(201).json(response);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const response = await Task.find();
    console.log("task fatched");
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Task.findById(id);
    if (!response) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error);
  }
});

router.get("/category/:priority", async (req, res) => {
  try {
    const { priority } = req.params;
    if (priority === "high" || priority === "medium" || priority === "low") {
      const response = await Task.find({ priority });
      res.status(200).json(response);
    } else {
      return res
        .status(404)
        .json({ message: `Task not found for priority type: ${priority}` });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id: taskId } = req.params;
    const updatedTaskData = req.body;
    const response = await Task.findByIdAndUpdate(taskId, updatedTaskData, {
      new: true,
      runValidators: true,
    });
    if (!response) {
      return res.status(404).json({ message: "Task not found!" });
    }
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id: taskId } = req.params;
    const response = await Task.findByIdAndDelete(taskId);
    if (!response) {
      return res.status(404).json({ message: "Task not found!" });
    }
    res.status(200).json({ message: "Task deleted successfully!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error });
  }
});

module.exports = router;
