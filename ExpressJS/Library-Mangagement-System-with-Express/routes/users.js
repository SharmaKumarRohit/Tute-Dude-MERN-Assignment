const express = require("express");
const { users } = require("../data/users.json");
// Initializing router
const router = express.Router();

/*
 * Route: /users
 * Method: GET
 * Description: Get all the list of users in the system
 * Access: Public
 * Parameters: None
 */
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    data: users,
  });
});

/*
 * Route: /users/:id
 * Method: GET
 * Description: Get a user by their ID
 * Access: Public
 * Parameters: id
 */
router.get("/:id", (req, res) => {
  // Extracting id from req.params
  const { id } = req.params;
  // Finding the user by id from the users array
  const user = users.find((user) => user.id === id);

  // If user not found, send 404
  if (!user) {
    return res
      .status(404)
      .json({ success: false, message: `User not found for id: ${id}` });
  }

  // If user found, send the user data
  res.status(200).json({ success: true, data: user });
});

/*
 * Route: /users
 * Method: POST
 * Description: Create / Register a new user
 * Access: Public
 * Parameters: None
 */

router.post("/", (req, res) => {
  // Extracting user details from req.body
  const { id, name, surname, email, subscriptionType, subscriptionDate } =
    req.body;
  // Validating the required fields
  if (
    !id ||
    !name ||
    !surname ||
    !email ||
    !subscriptionType ||
    !subscriptionDate
  ) {
    return res.status(400).json({
      success: false,
      message: "Please provide all the required fields",
    });
  }

  // Checking if the user already exists
  const user = users.find((user) => user.id === id);
  if (user) {
    return res
      .status(409)
      .json({ success: false, message: "User already exists" });
  }

  // Adding the new user to the users array
  users.push({ id, name, surname, email, subscriptionType, subscriptionDate });
  res.status(201).json({ success: true, message: "User created successfully" });
});

/*
 * Route: /users/:id
 * Method: PUT
 * Description: Updating a user by their ID
 * Access: Public
 * Parameters: ID
 */
router.put("/:id", (req, res) => {
  // Extracting id from req.params
  const { id } = req.params;
  // Extracting updated data from req.body
  const { data } = req.body;
  // Finding the user by id from the users array
  const user = users.find((user) => user.id === id);

  // If user not found, send 404
  if (!user) {
    return res
      .status(404)
      .json({ success: false, message: `User not found for id: ${id}` });
  }

  // Updating the user details
  // Object.assign(user, data);

  // Alternatively, using map to create a new updated users array
  const updatedUser = users.map((user) =>
    user.id === id ? { ...user, ...data } : user
  );

  // Sending the updated user data
  res.status(200).json({
    success: true,
    data: updatedUser,
    message: "User updated successfully",
  });
});

/*
 * Route: /users/:id
 * Method: DELETE
 * Description: Deleting a user by their ID
 * Access: Public
 * Parameters: ID
 */
router.delete("/:id", (req, res) => {
  // Extracting id from req.params
  const { id } = req.params;
  // Finding the user by id from the users array
  const user = users.find((user) => user.id === id);

  // If user not found, send 404
  if (!user) {
    return res
      .status(404)
      .json({ success: false, message: `User not found for id: ${id}` });
  }

  // Deleting the user
  const updatedUser = users.filter((user) => user.id !== id);
  res.status(200).json({
    success: true,
    data: updatedUser,
    message: "User deleted successfully",
  });
});

/*
 * Route: /users/subscription-details/:id
 * Method: GET
 * Description: Get all the subscription details of a user by their ID
 * Access: Public
 * Parameters: ID
 */

router.get("/subscription-details/:id", (req, res) => {
  const { id } = req.params;

  // Find user by ID
  const user = users.find((user) => user.id === id);
  // If user not found, send 404
  if (!user) {
    return res
      .status(404)
      .json({ success: false, message: `User not found for id: ${id}` });
  }

  // Extract the subscription details
  const getDateInDays = (data = "") => {
    let date;
    if (data) {
      date = new Date(data);
    } else {
      date = new Date();
    }
    // Convert date to days
    let days = Math.floor(date / (1000 * 60 * 60 * 24));
    return days;
  };

  // Function to calculate subscription type in days
  const subscriptionType = (date) => {
    if (user.subscriptionType === "Basic") {
      date += 90;
    } else if (user.subscriptionType === "Standard") {
      date += 180;
    } else if (user.subscriptionType === "Premium") {
      date += 365;
    }
    return date;
  };

  // Subscription Expiration Calculation
  let returnDate = getDateInDays(user.returnDate);
  let currentDate = getDateInDays();
  let subscriptionDate = getDateInDays(user.subscriptionDate);
  let subscriptionExpiration = subscriptionType(subscriptionDate);

  // Preparing data with subscription details
  const data = {
    ...user,
    subscriptionExpired: subscriptionExpiration < currentDate,
    subscriptionDaysLeft: subscriptionExpiration - currentDate,
    daysLeftForExpiration: returnDate - currentDate,
    returnDate: returnDate < currentDate ? "Book is overdue" : returnDate,
    fine:
      returnDate < currentDate
        ? subscriptionExpiration <= currentDate
          ? 200
          : 100
        : 0,
  };

  // Sending the subscription details
  res.status(200).json({ success: true, data });
});

module.exports = router;
