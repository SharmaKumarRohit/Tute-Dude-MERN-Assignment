const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./db");
const app = express();

const PORT = process.env.PORT;

const todoRoute = require("./routes/todoRoute");

app.use(cors());
app.use(express.json());
app.use("/api/todos", todoRoute);

app.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: "Welcome to Our Task Management Application" });
});

app.listen(PORT, () =>
  console.log(`Server is running on port http://localhost:${PORT}`),
);
