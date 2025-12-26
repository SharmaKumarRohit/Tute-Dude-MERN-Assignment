const { Book, User } = require("../models");
const IssuedBookDTO = require("../dtos/bookDto");

// You can also do this.
// const getAllBooks = () => {}
// const getSingleBookById = () => {}
// module.exports = {getAllBooks, getSingleBookById}

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    if (!books || books.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No books found in the system" });
    }
    res.status(200).json({ success: true, data: books });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error });
  }
};

exports.getSingleBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      return res
        .status(404)
        .json({ success: false, message: `Book not found for id: ${id}` });
    }
    res.status(200).json({ success: true, data: book });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error });
  }
};

// 👉 Controllers fetch data, DTOs shape data, responses stay clean and safe.
exports.getAllIssuedBooks = async (req, res) => {
  try {
    // 👉 This code fetches all users who have issued a book and also loads the complete book details instead of just the ID.
    const users = await User.find({ issuedBook: { $exists: true } }).populate(
      "issuedBook"
    );
    // 👉Apply DTO
    // ✔ Formats response
    // ✔ Removes unwanted fields
    // ✔ Merges book + user info
    const issuedBooks = users.map((user) => new IssuedBookDTO(user));
    if (issuedBooks.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No books issued yet!" });
    }
    res.status(200).json({ success: true, data: issuedBooks });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error });
  }
};

exports.addNewBook = async (req, res) => {
  try {
    const data = req.body;
    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide the data to add a new book",
      });
    }
    const newBook = new Book(data);
    const response = await newBook.save();
    res.status(201).json({
      success: true,
      message: "Book added successfully",
      data: response,
    });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error });
  }
};

exports.updateBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    if (!data || Object.keys(data).length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide data to update" });
    }
    const updatedBook = await Book.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    if (!updatedBook) {
      return res
        .status(404)
        .json({ success: false, message: `Book not found for Id: ${id}` });
    }
    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: updatedBook,
    });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error });
  }
};

exports.deleteBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Book.findByIdAndDelete(id);
    if (!response) {
      return res
        .status(404)
        .json({ success: false, message: `Book not found for Id: ${id}` });
    }
    res
      .status(200)
      .json({ success: true, message: "Book deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error });
  }
};
