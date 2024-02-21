const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
require("dotenv").config();

// for testing purposes
router.get("/", userController.getUser);

// register user
router.post("/register", userController.registerUser);
// login user
router.post(`/login`, userController.loginUser);

module.exports = router;
