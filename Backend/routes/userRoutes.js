const express = require("express");
const User = require("../models/User");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config()

router.get("/", (req, res) => {
  res.send("userRoute Working Fine");
});
router.post(`/register`, async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({
      name,
      email,
      password,
    });

    await user.save();
    res.status(200).send({ user, message: "User saved successfully" });
  } catch (error) {
    res.status(400).send({ message: "Error saving user" });
  }
});

router.post(`/login`, async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
      throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error("Password is incorrect");
    }else{}

    const token = jwt.sign(
      {
        _id: user._id.toString(),
      },
      process.env.JWT_SECRET_KEY
    );

    // console.log('token', token)
    res.status(200).send({ user, token , message:"logged in successfully"});
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});
module.exports = router;
