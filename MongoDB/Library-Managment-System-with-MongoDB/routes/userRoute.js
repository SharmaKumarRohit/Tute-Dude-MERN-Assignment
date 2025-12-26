const express = require("express");
// Initializing router
const router = express.Router();
const {
  getAllUsers,
  getSingleUserById,
  createNewUser,
  updateUserById,
  deleteUserById,
  getSubscriptionDetailsById,
} = require("../controllers/userController");

/*
 * Route: /users
 * Method: GET
 * Description: Get all the list of users in the system
 * Access: Public
 * Parameters: None
 */
router.get("/", getAllUsers);

/*
 * Route: /users/:id
 * Method: GET
 * Description: Get a user by their ID
 * Access: Public
 * Parameters: id
 */
router.get("/:id", getSingleUserById);

/*
 * Route: /users
 * Method: POST
 * Description: Create / Register a new user
 * Access: Public
 * Parameters: None
 */
router.post("/", createNewUser);

/*
 * Route: /users/:id
 * Method: PUT
 * Description: Updating a user by their ID
 * Access: Public
 * Parameters: ID
 */
router.put("/:id", updateUserById);

/*
 * Route: /users/:id
 * Method: DELETE
 * Description: Deleting a user by their ID
 * Access: Public
 * Parameters: ID
 */
router.delete("/:id", deleteUserById);

/*
 * Route: /users/subscription-details/:id
 * Method: GET
 * Description: Get all the subscription details of a user by their ID
 * Access: Public
 * Parameters: ID
 */
router.get("/subscription-details/:id", getSubscriptionDetailsById);

module.exports = router;
