const express = require("express");
const userRouter = require("./routes/users");
const bookRouter = require("./routes/books");

const app = express();

const PORT = 8081;

// Middleware to parse JSON bodies
app.use(express.json());
// Using the userRouter for routes /users
app.use("/users", userRouter);
// Using the bookRouter for routes /books
app.use("/books", bookRouter);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Home page :-)",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
