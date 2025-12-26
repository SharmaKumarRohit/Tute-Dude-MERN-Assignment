const express = require("express");
const router = express.Router();
const MenuItem = require("../models/MenuItem");

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newMenuItem = new MenuItem(data);
    const response = await newMenuItem.save();
    console.log("data saved");
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const response = await MenuItem.find();
    console.log("data fetched");
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await MenuItem.findById(id);
    if (!response) {
      return res.status(404).json({ message: "Menu not found" });
    }
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error);
  }
});

router.get("/category/:taste", async (req, res) => {
  try {
    const { taste: tasteType } = req.params;
    if (
      tasteType === "sweet" ||
      tasteType === "spicy" ||
      tasteType === "sour"
    ) {
      const response = await MenuItem.find({ taste: tasteType });
      res.status(200).json(response);
    } else {
      return res
        .status(404)
        .json({ message: `Menu not found for taste: ${tasteType}` });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id: menuId } = req.params;
    const updatedMenuData = req.body;
    const response = await MenuItem.findByIdAndUpdate(menuId, updatedMenuData, {
      new: true,
      runValidators: true,
    });
    if (!response) {
      return res.status(404).json({ message: "Menu not found!" });
    }
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id: menuId } = req.params;
    const response = await MenuItem.findByIdAndDelete(menuId);
    if (!response) {
      return res.status(404).json({ message: "Menu not found!" });
    }
    res.status(200).json({ message: "Menu deleted successfully!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error });
  }
});

module.exports = router;
