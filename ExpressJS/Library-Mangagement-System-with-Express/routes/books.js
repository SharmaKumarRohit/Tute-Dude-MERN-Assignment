const express = require("express");
// Initializing router
const router = express.Router();
const { books } = require("../data/books.json");
const { users } = require("../data/users.json");

/*
 * Route: /books
 * Method: GET
 * Description: Get all the books in the system
 * Access: Public
 * Parameters: None
 */
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    data: books,
  });
});

/*
 * Route: /books/:id
 * Method: GET
 * Description: Get a book by its ID
 * Access: Public
 * Parameters: ID
 */
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const book = books.find((book) => book.id === id);

  if (!book) {
    return res.status(404).json({
      success: false,
      message: `Book not fond for id: ${id}`,
    });
  }

  res.status(200).json({
    success: true,
    data: book,
  });
});

/*
 * Route: /books
 * Method: POST
 * Description: Add a new book to the system
 * Access: Public
 * Parameters: None
 */
router.post("/", (req, res) => {
  const { id, name, author, genre, price, publisher } = req.body;

  if (!id || !name || !author || !genre || !price || !publisher) {
    return res.status(400).json({
      success: false,
      message: "Please provide the all required fields",
    });
  }

  const book = books.find((book) => book.id === id);

  if (book) {
    return res.status(409).json({
      success: false,
      message: "Book already exists",
    });
  }

  books.push({ id, name, author, genre, price, publisher });
  res.status(201).json({
    success: true,
    data: books,
    message: "Book added successfully",
  });
});

/*
 * Route: /books/:id
 * Method: PUT
 * Description: Update a book by its ID
 * Access: Public
 * Parameters: ID
 */
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  const book = books.find((book) => book.id === id);
  if (!book) {
    return res.status(404).json({ success: false, message: "Book not found" });
  }

  const updatedBook = Object.assign(book, data);

  //   const updatedBook = books.map((book) =>
  //     book.id === id ? { ...book, ...data } : book
  //   );

  res.status(200).json({
    success: true,
    data: updatedBook,
    message: "Book updated successfully",
  });
});

/*
 * Route: /books/:id
 * Method: DELETE
 * Description: Delete a book by its ID
 * Access: Public
 * Parameters: ID
 */
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const book = books.find((book) => book.id === id);

  if (!book) {
    return res.status(404).json({ success: false, message: "Book not found" });
  }

  const updatedBook = books.filter((book) => book.id !== id);
  res.status(200).json({
    success: true,
    data: updatedBook,
    message: "Book deleted successfully",
  });
});

/*
 * Route: /books/issued/for-users
 * Method: GET
 * Description: Get all the issued books
 * Access: Public
 * Parameters: None
 */

router.get("/issued/for-users", (req, res) => {
  // Finding all the users who have issued books
  const userWithIssuedBooks = users.filter((user) => user?.issuedBook);

  const issuedBooksDetails = [];
  userWithIssuedBooks.forEach((user) => {
    // Finding the book details for the issued book
    const book = books.find((book) => book.id === user.issuedBook);

    // Adding issued details to the book object
    book.issuedBy = user.name;
    book.issuedDate = user.issuedDate;
    book.returnDate = user.returnDate;

    issuedBooksDetails.push(book);
  });

  // If no books are issued, send 404
  if (issuedBooksDetails.length === 0) {
    return res
      .status(404)
      .json({ success: false, message: "No book issued yet" });
  }

  // Sending the issued books details
  res.status(200).json({ success: true, data: issuedBooksDetails });
});

module.exports = router;
