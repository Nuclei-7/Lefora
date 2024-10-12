const express = require("express");
const multer = require("multer");
const router = express.Router();
const Post = require("../models/postModel");

// Setup Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Directory to store uploaded images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Generate a unique filename
  },
});

// Use `array` to allow multiple file uploads
const upload = multer({ storage: storage }).array("images"); // Change from single to array

// GET all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch posts" });
  }
});

// Route to create a post with images
router.post("/", upload, async (req, res) => {
  const { title, content, author } = req.body;
  const images = req.files ? req.files.map((file) => file.path) : []; // Get paths of all uploaded images

  try {
    const newPost = new Post({ title, content, author, images }); // Store array of image paths in the post model
    await newPost.save();
    res
      .status(201)
      .json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET single post by ID
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch post" });
  }
});

// Add a comment to a post
router.post("/:id/comments", async (req, res) => {
  const { author, text } = req.body;
  try {
    const post = await Post.findById(req.params.id);
    post.comments.push({ author, text });
    await post.save();
    res.status(201).json({ message: "Comment added successfully", post });
  } catch (error) {
    res.status(500).json({ message: "Failed to add comment" });
  }
});

// Like a post
router.post("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    post.likes += 1;
    await post.save();
    res.status(200).json({ message: "Post liked", post });
  } catch (error) {
    res.status(500).json({ message: "Failed to like post" });
  }
});

module.exports = router;
