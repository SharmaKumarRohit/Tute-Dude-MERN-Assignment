const express = require("express");
// Initializing router
const router = express.Router();

const {
  getAllBooks,
  getSingleBookById,
  getAllIssuedBooks,
  addNewBook,
  updateBookById,
  deleteBookById,
} = require("../controllers/bookController");

/*
 * Route: /books
 * Method: GET
 * Description: Get all the books in the system
 * Access: Public
 * Parameters: None
 */
router.get("/", getAllBooks);

/*
 * Route: /books/:id
 * Method: GET
 * Description: Get a book by its ID
 * Access: Public
 * Parameters: ID
 */
router.get("/:id", getSingleBookById);

/*
 * Route: /books
 * Method: POST
 * Description: Add a new book to the system
 * Access: Public
 * Parameters: None
 */
router.post("/", addNewBook);

/*
 * Route: /books/:id
 * Method: PUT
 * Description: Update a book by its ID
 * Access: Public
 * Parameters: ID
 */
router.put("/:id", updateBookById);

/*
 * Route: /books/:id
 * Method: DELETE
 * Description: Delete a book by its ID
 * Access: Public
 * Parameters: ID
 */
router.delete("/:id", deleteBookById);

/*
 * Route: /books/issued/for-users
 * Method: GET
 * Description: Get all the issued books
 * Access: Public
 * Parameters: None
 */
router.get("/issued/for-users", getAllIssuedBooks);

module.exports = router;
