// DTO (Data Transfer Object) called issuedBook
// 👉 Purpose: It extracts and formats only the required book + user data into a clean object before sending it in an API response.

// 👉 Why this DTO is useful
// ✅ Hides unnecessary or sensitive data
// ✅ Shapes response exactly how frontend needs it
// ✅ Keeps API responses consistent
// ✅ Separates database structure from response format

class IssuedBook {
  _id;
  name;
  author;
  genre;
  price;
  publisher;
  issuedBy;
  issuedDate;
  returnDate;

  constructor(user) {
    this._id = user.issuedBook._id;
    this.name = user.issuedBook.name;
    this.author = user.issuedBook.author;
    this.genre = user.issuedBook.genre;
    this.price = user.issuedBook.price;
    this.publisher = user.issuedBook.publisher;
    this.issuedBy = user.name;
    this.issuedDate = user.issuedDate;
    this.returnDate = user.returnDate;
  }
}

module.exports = IssuedBook;
