const mongoose = require("mongoose");
require("dotenv").config();

// const mongdbURL = process.env.PORT;
const mongdbURL = process.env.MONGODB_URL;

mongoose.connect(mongdbURL);

const db = mongoose.connection;

db.on("connected", () => console.log("Connected to MongoDB server"));

db.on("error", (error) => console.log("MongoDB connection error", error));

db.on("disconnected", () => console.log("MongoDB server disconnected"));

module.exports = db;
