import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./PostDetails.css"; // Ensure you have this for styling
import Navbar from "./Navbar";

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");
  const [author, setAuthor] = useState("Current User");

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/posts/${id}`)
      .then((res) => setPost(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const handleAddComment = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:3001/api/posts/${id}/comments`, {
        author,
        text: comment,
      })
      .then((res) => setPost(res.data.post))
      .catch((err) => console.log(err));
  };

  const handleLikePost = () => {
    axios
      .post(`http://localhost:3001/api/posts/${id}/like`)
      .then((res) => setPost(res.data.post))
      .catch((err) => console.log(err));
  };

  if (!post) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="post-details-container">
        <div className="post-card">
          <h2 className="post-title">{post.title}</h2>
          <p className="post-content">{post.content}</p>
          <p className="post-author">Posted by: {post.author}</p>
          <p className="post-likes">Likes: {post.likes}</p>
          <button className="like-button" onClick={handleLikePost}>
            <i className="fas fa-heart"></i>
          </button>
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
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Your name"
              className="input-author"
              required
            />
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
