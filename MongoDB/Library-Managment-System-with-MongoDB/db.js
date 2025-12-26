const mongoose = require("mongoose");
require("dotenv").config();

// const mongodbUrl = process.env.MONGO_URL_LOCAL;
const mongodbUrl = process.env.MONGO_URL;

mongoose.connect(mongodbUrl);

const db = mongoose.connection;

db.on("connected", () => console.log("Connected to mongodb"));

db.on("error", (error) => console.log(`MongoDB connection error: ${error}`));

db.on("disconnected", () => console.log("Disconnected to mongodb"));

module.exports = db;
