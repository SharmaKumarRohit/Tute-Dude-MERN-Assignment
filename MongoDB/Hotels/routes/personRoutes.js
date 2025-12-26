const express = require("express");
const router = express.Router();
const Person = require("../models/Person");

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);
    const response = await newPerson.save();
    console.log("data saved");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const response = await Person.find();
    console.log("data fetched");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Person.findById(id);
    if (!response) {
      return res.status(404).json({ message: "Person not found" });
    }
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error });
  }
});

router.get("/category/:work", async (req, res) => {
  try {
    const { work: workType } = req.params;
    if (
      workType === "chef" ||
      workType === "manager" ||
      workType === "waiter"
    ) {
      const response = await Person.find({ work: workType });
      res.status(200).json(response);
    } else {
      return res
        .status(404)
        .json({ message: `Person not found for workType: ${workType}` });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id: personId } = req.params;
    const updatedPersonData = req.body;
    const response = await Person.findByIdAndUpdate(
      personId,
      updatedPersonData,
      { new: true, runValidators: true }
    );
    if (!response) {
      return res.status(404).json({ message: "Person not found!" });
    }
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id: personId } = req.params;
    const deletedPerson = await Person.findByIdAndDelete(personId);
    if (!deletedPerson) {
      return res.status(404).json({ message: "Person not found!" });
    }
    res.status(200).json({ message: "Person deleted successfully!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error });
  }
});

module.exports = router;
