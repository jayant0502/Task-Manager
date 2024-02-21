const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const taskController = require("../controllers/taskController");

// GET all tasks for the user
router.get("/getTask", auth, taskController.getTask);

// GET a task by ID
router.get("/:id", auth, taskController.getTaskById);

// Create a new task
router.post("/addTask", auth, taskController.addTask);

//Update a task
router.patch("/:id", auth, taskController.updateTask);

//Delete a task
router.delete("/:id", auth, taskController.deleteTask);

module.exports = router;
