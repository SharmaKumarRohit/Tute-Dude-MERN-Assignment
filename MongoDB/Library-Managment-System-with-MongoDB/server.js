const express = require("express");
const app = express();
const db = require("./db");
require("dotenv").config();

app.use(express.json());
const PORT = process.env.PORT;

const bookRoute = require("./routes/bookRoute");
const userRoute = require("./routes/userRoute");

app.use("/books", bookRoute);
app.use("/users", userRoute);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Home page" });
});

app.listen(PORT, () =>
  console.log(`Server is listening on http://localhost:${PORT}`)
);
