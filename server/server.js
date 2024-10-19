//server.js
require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http").Server(app);
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const postRoute = require("./routes/postRoute");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const User = require("./models/userModels"); // Ensure correct path to user model
const orderRoutes = require("./routes/orderRoutes");
const emailRoutes = require("./routes/emailRoutes");

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Middleware to parse JSON
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

// Use the user routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoute);
app.use("/api/orders", orderRoutes);
app.use("/api", emailRoutes); // Use '/api' prefix for email routes
// Setup Multer for multiple image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Directory to store uploaded images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Generate a unique filename for each file
  },
});

const upload = multer({ storage: storage });

// Serve static files from the uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.error("Could not connect to MongoDB", err));

// Add a new route for handling multiple file uploads
app.post("/upload-multiple", upload.array("images", 5), (req, res) => {
  if (!req.files) {
    return res.status(400).json({ message: "No files were uploaded." });
  }
  try {
    const filePaths = req.files.map((file) => file.path);
    res
      .status(200)
      .json({ message: "Files uploaded successfully", files: filePaths });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to upload files" });
  }
});
// execute bash file
// Email sending route
// app.post("/send-email", (req, res) => {
//   const { message } = req.body;

//   // Validate that message is provided
//   if (!message) {
//     return res.status(400).send("Message is required");
//   }

//   // Execute the bash script and pass the message as an argument
//   exec(`bash email.sh "${message}"`, (error, stdout, stderr) => {
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

// Define a sample route to test the server
app.get("/", (req, res) => {
  res.send("Server is running and connected to MongoDB");
});

// Start the server
http.listen(3001, function () {
  console.log("Server is running on port 3001...");
});
