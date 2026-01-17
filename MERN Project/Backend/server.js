const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const workoutRoutes = require("./routes/workoutRoute");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.get("/", (req, res) => {
  res.json({ msg: "Welcome to our application" });
});

app.use("/api/workouts/", workoutRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () =>
      console.log(
        `Server is listening on PORT: http://localhost:${PORT} & Database connected`
      )
    );
  })
  .catch((error) => console.log(error));

const PORT = process.env.PORT;
