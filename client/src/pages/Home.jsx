import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import "./home.css";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    author: "Current User", // Placeholder, update with actual user
  });
  const [isOverlayOpen, setIsOverlayOpen] = useState(false); // Overlay state

  // Fetch posts on component mount
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/posts")
      .then((res) => {
        // Sort posts by creation date in descending order
        const sortedPosts = res.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setPosts(sortedPosts);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleCreatePost = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/api/posts", newPost)
      .then(() => {
        alert("Post created successfully!");
        setNewPost({ title: "", content: "", author: "Current User" });
        setIsOverlayOpen(false); // Close overlay
        // Fetch updated posts
        return axios.get("http://localhost:3001/api/posts");
      })
      .then((res) => {
        const sortedPosts = res.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setPosts(sortedPosts);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="home-container">
      <Navbar /> {/* Custom Navbar at the top */}
      <div className="main-content">
        {/* Left Sidebar */}
        <div className="left-sidebar">
          <h3>Topics</h3>
          <ul>
            <li>
              <a href="#all">All Topics</a>
            </li>
            <li>
              <a href="#my-topics">My Topics</a>
            </li>
            <li>
              <a href="#my-answers">My Answers</a>
            </li>
          </ul>
          <h3>Communities</h3>
          <ul>
            <li>
              <a href="#communities">Communities</a>
            </li>
            <li>
              <a href="#homeGaredeners">Home Gardeners</a>
            </li>
            <li>
              <a href="#homeGaredeners">Professional Gardener</a>
            </li>
            <li>
              <a href="#homeGaredeners">nursery owners </a>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="center-content">
          <h2>Welcome to Lefora!</h2>
          <p>
            Explore our gardening community and share your knowledge with
            others!
          </p>

          {/* Button to Open Overlay */}
          <button onClick={() => setIsOverlayOpen(true)} className="btn">
            Create Post
          </button>

          {/* Overlay for Creating Post */}
          {isOverlayOpen && (
            <div className="overlay">
              <div className="overlay-content">
                <h3>Create a New Post</h3>
                <form onSubmit={handleCreatePost} className="create-post-form">
                  <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                      type="text"
                      id="title"
                      value={newPost.title}
                      onChange={(e) =>
                        setNewPost({ ...newPost, title: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="content">Content</label>
                    <textarea
                      id="content"
                      value={newPost.content}
                      onChange={(e) =>
                        setNewPost({ ...newPost, content: e.target.value })
                      }
                      required
                    />
                  </div>
                  <button type="submit" className="btn">
                    Create Post
                  </button>
                  <button
                    type="button"
                    className="btn"
                    onClick={() => setIsOverlayOpen(false)} // Close overlay
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Display Posts */}
          <div className="posts-list">
            <h3>Recent Posts</h3>
            {posts.length > 0 ? (
              posts.map((post) => (
                <div key={post._id} className="post">
                  <h4>{post.title}</h4>
                  <p>{post.content}</p>
                  <p className="author">Posted by: {post.author}</p>
                </div>
              ))
            ) : (
              <p>No posts yet. Be the first to create one!</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
