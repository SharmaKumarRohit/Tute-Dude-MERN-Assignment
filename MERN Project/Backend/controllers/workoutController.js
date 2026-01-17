const mongoose = require("mongoose");
const Workout = require("../models/workoutModels");

// Get all workout
exports.getWorkouts = async (req, res) => {
  try {
    const response = await Workout.find({}).sort({ createdAt: -1 });
    if (!response) {
      return res.status(400).json({ msg: "No entries found" });
    }
    res.status(200).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Internal server error", error: error.message });
  }
};

// Get a single workout by its ID
exports.getWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ msg: "Pass valid Object_Id" });
  }
  try {
    const response = await Workout.findById(id);
    if (!response) {
      return res.status(400).json({ msg: "No such workout" });
    }
    res.status(200).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Internal server error", error: error.message });
  }
};

// Create a workout
exports.createWorkout = async (req, res) => {
  const { title, reps, load } = req.body;
  let emptyFields = [];
  if (!title) {
    emptyFields.push("title");
  }
  if (!load) {
    emptyFields.push("load");
  }
  if (!reps) {
    emptyFields.push("reps");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill the all required fields!", emptyFields });
  }
  const data = { title, reps, load };
  try {
    const response = await Workout.create(data);
    res.status(201).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Server Internal Error", error: error.message });
  }
};

// Delete workout by its ID
exports.deleteWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ msg: "Pass valid Object_Id" });
  }
  try {
    const response = await Workout.findOneAndDelete({ _id: id });
    if (!response) {
      return res.status(400).json({ msg: "No such workout" });
    }
    res.status(200).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Internal server error", error: error.message });
  }
};

// Update workout by its ID
exports.updateWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ msg: "Pass valid Object_Id" });
  }
  try {
    const response = await Workout.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true, runValidators: true },
    );
    if (!response) {
      return res.status(400).json({ msg: "No such workout" });
    }
    res.status(200).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Internal server error", error: error.message });
  }
};
