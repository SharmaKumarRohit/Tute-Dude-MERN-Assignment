const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    publisher: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// `timestamps: true` automatically manages `createdAt` and `updatedAt` fields for your documents.

const Book = mongoose.model("book", bookSchema);
module.exports = Book;
