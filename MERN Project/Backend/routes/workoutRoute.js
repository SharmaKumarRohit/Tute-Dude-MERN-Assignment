const express = require("express");
const {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workoutController");
const router = express.Router();

/**
 * Route: /api/workouts/
 * Method: GET
 * Description: Get all workouts
 * Access: Public
 * Parameters: None
 */
router.get("/", getWorkouts);

/**
 * Route: /api/workouts/:id
 * Method: GET
 * Description: Get a single workout by its ID
 * Access: Public
 * Parameters: Id
 */
router.get("/:id", getWorkout);

/**
 * Route: /api/workouts/
 * Method: POST
 * Description: Create a new workout
 * Access: Public
 * Parameters: None
 */
router.post("/", createWorkout);

/**
 * Route: /api/workouts/:id
 * Method: DELETE
 * Description: Delete workout by its ID
 * Access: Public
 * Parameters: Id
 */
router.delete("/:id", deleteWorkout);

/**
 * Route: /api/workouts/:id
 * Method: PATCH
 * Description: Update workout by its ID
 * Access: Public
 * Parameters: Id
 */
router.patch("/:id", updateWorkout);

module.exports = router;
