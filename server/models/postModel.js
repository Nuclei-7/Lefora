const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    images: [{ type: String }], // No need for required: false; it's optional by default
    likes: { type: Number, default: 0 },
    likedBy: { type: [String], default: [] },
    comments: [
      {
        author: { type: String, required: true }, // Optional: Set author as required
        text: { type: String, required: true }, // Optional: Set text as required
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

// Create the Post model
const Post = mongoose.model("Post", postSchema);
module.exports = Post;
