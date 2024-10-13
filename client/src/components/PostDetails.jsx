import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./PostDetails.css";
import Navbar from "./Navbar";
import { useAuth } from "../services/AuthContext"; // Adjust path as needed

const PostDetails = () => {
  const { id } = useParams();
  const { currentUser } = useAuth(); // Get current user from AuthContext
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      console.log("Current User in PostDetails:", currentUser);
      console.log("Fetching post with ID:", id); // Debug: log the post ID being fetched
      try {
        const res = await axios.get(`http://localhost:3001/api/posts/${id}`);
        console.log("Post data fetched:", res.data); // Debug: log the fetched post data
        setPost(res.data);
      } catch (err) {
        console.error("Error fetching post:", err); // Debug: log any errors
      }
    };
    fetchPost();
  }, [id]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    console.log("Adding comment:", comment); // Debug: log the comment being added
    try {
      const res = await axios.post(
        `http://localhost:3001/api/posts/${id}/comments`,
        {
          author: currentUser ? currentUser.username : "Anonymous", // Use current user's username or default to "Anonymous"
          text: comment,
        }
      );
      console.log("Comment added successfully:", res.data); // Debug: log the response after adding comment
      setPost(res.data.post); // Update post with new comments
      setComment(""); // Clear the comment input after submission
    } catch (err) {
      console.error("Error adding comment:", err); // Debug: log any errors
    }
  };

  if (!post) return <div>Loading...</div>; // Show loading message if post is not yet fetched

  return (
    <>
      <Navbar />
      <div className="post-details-container">
        <div className="post-card">
          <h2 className="post-title">{post.title}</h2>
          <p className="post-content">{post.content}</p>
          <p className="post-author">Posted by: {post.author}</p>
          <p className="post-likes">Likes: {post.likes}</p>
        </div>

        <div className="comments-section">
          <h3 className="comments-title">Comments</h3>
          {post.comments.length > 0 ? (
            post.comments.map((comment, index) => (
              <div key={index} className="comment">
                <p className="comment-text">
                  {comment.author}: {comment.text}
                </p>
                <p className="comment-date">
                  {new Date(comment.createdAt).toLocaleString()}
                </p>
              </div>
            ))
          ) : (
            <p>No comments yet.</p>
          )}

          <form className="comment-form" onSubmit={handleAddComment}>
            <p className="current-user">
              Logged in as: {currentUser ? currentUser.username : "Anonymous"}
            </p>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write a comment"
              className="input-comment"
              required
            />
            <button className="submit-comment" type="submit">
              Add Comment
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PostDetails;
