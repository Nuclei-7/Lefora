const express = require("express");
const router = express.Router();
const Post = require("../models/postModel"); // Assuming you have a Post model

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
// Route to create a post
router.post("/", async (req, res) => {
  const { title, content, author } = req.body;

  try {
    const newPost = new Post({ title, content, author });
    await newPost.save();
    res
      .status(201)
      .json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
// get single post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch post" });
  }
});

// Add a comment
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
