// importing express module
const express = require("express");

// creating an express application
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// PORT number
const PORT = 8081;

// a simple get endpoint or route
app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

// server is listening on this PORT
app.listen(PORT, () =>
  console.log(`Server is listening on http://localhost:${PORT}`)
);
