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

  // Fetch posts on component mount
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/posts")
      .then((res) => setPosts(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleCreatePost = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/api/posts", newPost)
      .then(() => {
        alert("Post created successfully!");
        setNewPost({ title: "", content: "", author: "Current User" });
        // Fetch updated posts
        return axios.get("http://localhost:3001/posts");
      })
      .then((res) => setPosts(res.data))
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
        </div>

        {/* Main Content */}
        <div className="center-content">
          <h2>Welcome to Lefora!</h2>
          <p>
            Explore our gardening community and share your knowledge with
            others!
          </p>

          {/* Post Creation Form */}
          <div className="post-creation">
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
            </form>
          </div>

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

        {/* Right Sidebar */}
        <div className="right-sidebar">
          <h3>Top Contributors</h3>
          <ul>
            <li>Contributor 1</li>
            <li>Contributor 2</li>
          </ul>

          <h3>Top Helpers</h3>
          <ul>
            <li>Helper 1</li>
            <li>Helper 2</li>
          </ul>
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
