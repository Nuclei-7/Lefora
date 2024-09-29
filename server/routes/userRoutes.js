const express = require("express");
const router = express.Router();
const User = require("../models/userModels"); // Adjust path as needed

// Register route
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User already exists");
    }

    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(201).send("User registered successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("User not found");
    }

    if (user.password !== password) {
      return res.status(400).send("Invalid password");
    }

    res.status(200).send("Success");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
