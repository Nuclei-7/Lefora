//postRoute
const express = require("express");
const multer = require("multer");
const router = express.Router();
const Post = require("../models/postModel");
const mongoose = require("mongoose");
const { authenticateUser } = require("../middleware/auth");

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
    const posts = await Post.find(); // Fetch all posts from the database
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
    const post = await Post.findById(req.params.id); // Find post by ID
    if (!post) {
      return res.status(404).json({ message: "Post not found" }); // Return 404 if post not found
    }
    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch post" });
  }
});

// Add a comment to a post
router.post("/:id/comments", async (req, res) => {
  const { author, text } = req.body;
  try {
    const post = await Post.findById(req.params.id); // Find post by ID
    if (!post) {
      return res.status(404).json({ message: "Post not found" }); // Return 404 if post not found
    }
    post.comments.push({ author, text }); // Push new comment into comments array
    await post.save();
    res.status(201).json({ message: "Comment added successfully", post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add comment" });
  }
});

// Like a post
router.post("/:id/toggle-like", async (req, res) => {
  const { userId } = req.body; // Get user ID from request body

  try {
    const post = await Post.findById(req.params.id); // Find post by ID

    if (!post) {
      return res.status(404).json({ message: "Post not found" }); // Return 404 if post not found
    }

    // Check if the user has already liked the post
    const hasLiked = post.likedBy.includes(userId);

    if (hasLiked) {
      // Unlike: remove user from likedBy array and decrement like count
      post.likedBy = post.likedBy.filter((id) => id !== userId);
      post.likes -= 1;
    } else {
      // Like: add user to likedBy array and increment like count
      post.likedBy.push(userId);
      post.likes += 1;
    }

    await post.save(); // Save the updated post

    res
      .status(200)
      .json({ message: hasLiked ? "Post unliked" : "Post liked", post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to toggle like" });
  }
});

// DELETE a post by ID
// router.delete("/:id", async (req, res) => {
//   try {
//     const post = await Post.findByIdAndDelete(req.params.id); // Find and delete post by ID
//     if (!post) {
//       return res.status(404).json({ message: "Post not found" }); // Return 404 if post not found
//     }
//     res.status(200).json({ message: "Post deleted successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Failed to delete post" });
//   }
// });

//delete postROute

router.delete("/:id", async (req, res) => {
  const postId = req.params.id;
  console.log("Received post ID:", postId); // Log the received ID

  // Validate the postId format
  if (!mongoose.isValidObjectId(postId)) {
    return res.status(400).json({ message: "Invalid post ID format" });
  }

  try {
    const post = await Post.findByIdAndDelete(postId); // Find and delete post by ID
    console.log("Deleted post:", post); // Log the deleted post

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res
      .status(500)
      .json({ message: "Failed to delete post", error: error.message });
  }
});

// Export the router to use in server.js
module.exports = router;
