const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const todoRoute = require("./routes/todoRoute");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/todos", todoRoute);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to our Application" });
});

// db connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () =>
      console.log(
        `Server is listening on PORT: http://localhost:${PORT} & Database connected`,
      ),
    );
  })
  .catch((error) => console.log(error));

// PORT Number
const PORT = process.env.PORT;
