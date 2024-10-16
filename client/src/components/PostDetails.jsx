import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./PostDetails.css";
import Navbar from "./Navbar";
import { useAuth } from "../services/AuthContext"; // Adjust path as needed

export default function PostDetails() {
  const { id } = useParams();
  const { currentUser } = useAuth(); // Get current user from AuthContext
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      console.log("Current User in PostDetails:", currentUser);
      console.log("Fetching post with ID:", id);
      try {
        const res = await axios.get(`http://localhost:3001/api/posts/${id}`);
        console.log("Post data fetched:", res.data);
        setPost(res.data);
      } catch (err) {
        console.error("Error fetching post:", err);
      }
    };
    fetchPost();
  }, [id, currentUser]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    console.log("Adding comment:", comment);
    try {
      const res = await axios.post(
        `http://localhost:3001/api/posts/${id}/comments`,
        {
          author: currentUser ? currentUser.username : "Anonymous",
          text: comment,
        }
      );
      console.log("Comment added successfully:", res.data);
      setPost(res.data.post);
      setComment("");
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  const deletePost = async () => {
    try {
      const res = await axios.delete(`http://localhost:3001/api/posts/${id}`);
      console.log(res.data.message); // Log success message
      navigate("/home");
      alert("Post deleted successfully!"); // Notify the user
    } catch (error) {
      console.error("Error deleting post:", error);
      alert(
        error.response?.data?.message ||
          "Failed to delete post. Please try again."
      );
    }
  };

  const handleLikePost = async () => {
    try {
      const res = await axios.post(
        `http://localhost:3001/api/posts/${id}/like`,
        {
          userId: currentUser ? currentUser.id : null,
        }
      );
      console.log("Post liked successfully:", res.data);
      setPost(res.data.post);
    } catch (err) {
      console.error("Error liking post:", err);
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="post-details-container">
        <div className="post-card">
          <h2 className="post-title">{post.title}</h2>
          <p className="post-content">{post.content}</p>

          {/* Only show the delete button if the current user is the author */}
          {currentUser && currentUser.username === post.author && (
            <button onClick={deletePost} className="delete-button">
              Delete Post
            </button>
          )}

          <p className="post-author">Posted by: {post.author}</p>

          {post.images && post.images.length > 0 && (
            <div className="post-images">
              {post.images.map((image, index) => (
                <img
                  key={index}
                  src={`http://localhost:3001/${image}`}
                  alt=""
                  className="post-image"
                />
              ))}
            </div>
          )}

          <p className="post-likes">
            Likes: {post.likes}
            <button
              className="like-button"
              onClick={handleLikePost}
              aria-label="Like Post"
            >
              ❤️
            </button>
          </p>
        </div>

        <div className="comments-section">
          <h3 className="comments-title">Comments</h3>
          {post.comments.length > 0 ? (
            post.comments.map((comment, index) => (
              <div key={index} className="comment">
                <p className="comment-author">{comment.author}</p>
                <p className="comment-text">{comment.text}</p>
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
}
