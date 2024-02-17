
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
require("dotenv").config()

router.get("/", userController.getUser);
router.post('/register', userController.registerUser);
router.post(`/login`, userController.loginUser);


module.exports = router;
