//userRoute
const express = require("express");
const router = express.Router();
const User = require("../models/userModels"); // Adjust path as needed
const { exec } = require("child_process"); // for bash shell

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

    // Return success with user ID
    res.status(200).json({
      message: "Success", // Success message
      userId: user._id, // Include the user ID
      user: user.name,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// Fetch user details profile route
router.get("/profile/:userId", async (req, res) => {
  const userId = req.params.userId; // Corrected to userId

  try {
    // Fetch user from the database
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send user profile data
    res.json({ id: user._id, username: user.name, email: user.email });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// update user details profile route
router.put("/profile/:userId", async (req, res) => {
  const userId = req.params.userId; // Get userId from the URL
  const { name, email } = req.body; // Get the updated data from the request body

  try {
    // Find the user and update their details
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).send("User not found");
    }

    res.status(200).json(updatedUser); // Return the updated user data
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).send("Server error");
  }
});

// Change password route
router.put("/change-password/:userId", async (req, res) => {
  const userId = req.params.userId;
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Check if the current password matches
    if (user.password !== currentPassword) {
      return res.status(400).send("Current password is incorrect");
    }

    // Update the password
    user.password = newPassword;
    await user.save();
    res.status(200).send("Password changed successfully");
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).send("Server error");
  }
});

// router.post("/send-email", (req, res) => {
//   const { email } = req.body; // Get the email from the request body

//   // Validate that email is provided
//   if (!email) {
//     return res.status(400).send("Email is required");
//   }

//   // Example of executing a shell script (modify as needed)
//   exec(`bash sendEmail.sh "${email}"`, (error, stdout, stderr) => {
//     if (error) {
//       console.error(`Error executing script: ${error.message}`);
//       return res.status(500).send("Error executing script");
//     }
//     if (stderr) {
//       console.error(`Script stderr: ${stderr}`);
//       return res.status(500).send("Error in script execution");
//     }
//     console.log(`Script stdout: ${stdout}`);
//     res.send("Email sent successfully!");
//   });
// });

module.exports = router;
