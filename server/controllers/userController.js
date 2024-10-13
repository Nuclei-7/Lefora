const User = require("../models/userModels");

exports.register = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    // Registration logic, e.g., creating a new user
    const newUser = new User({ userName, email, password });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Login logic, e.g., validating user credentials
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    res.json({ message: "Login successful" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
