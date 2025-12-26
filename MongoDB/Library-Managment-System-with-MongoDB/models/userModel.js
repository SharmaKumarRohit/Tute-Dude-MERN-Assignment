const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    issuedBook: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "book",
    },
    issuedDate: {
      type: String,
    },
    returnDate: {
      type: String,
    },
    subscriptionType: {
      type: String,
      enum: ["basic", "standard", "premium"],
      required: true,
    },
    subscriptionDate: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);
module.exports = User;
