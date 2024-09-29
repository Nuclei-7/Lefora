require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http").Server(app);
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes"); // Adjust path as needed
const cors = require("cors"); // Import cors

// Middleware to parse JSON\
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

// Use the user routes
app.use("/api/users", userRoutes); // Ensure this is added

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.error("Could not connect to MongoDB", err));

// Define a sample route to test the server
app.get("/", (req, res) => {
  res.send("Server is running and connected to MongoDB");
});

http.listen(3001, function () {
  console.log("Server is running on port 3001...");
});
