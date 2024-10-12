import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for routing
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { FaHeart, FaCommentAlt } from "react-icons/fa"; // Import icons
import "./home.css";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false); // Overlay state

  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    author: "Current User", // Placeholder, update with actual user
  });

  const [selectedImages, setSelectedImages] = useState([]); // State for storing selected images

  // Fetch posts on component mount
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/posts")
      .then((res) => {
        const sortedPosts = res.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setPosts(sortedPosts);
      })
      .catch((err) => console.log(err));
  }, []);

  // Handle like button
  const handleLikePost = (postId) => {
    axios
      .post(`http://localhost:3001/api/posts/${postId}/like`)
      .then((res) => {
        const updatedPosts = posts.map((post) =>
          post._id === postId ? res.data.post : post
        );
        setPosts(updatedPosts);
      })
      .catch((err) => console.log(err));
  };

  // Handle image selection
  const handleImageChange = (e) => {
    setSelectedImages(e.target.files);
  };

  // Handle creating new post with image upload
  const handleCreatePost = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", newPost.title);
    formData.append("content", newPost.content);
    formData.append("author", newPost.author);

    // Append each selected image to the formData
    if (selectedImages) {
      for (let i = 0; i < selectedImages.length; i++) {
        formData.append("images", selectedImages[i]);
      }
    }

    axios
      .post("http://localhost:3001/api/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        alert("Post created successfully!");
        setNewPost({ title: "", content: "", author: "Current User" });
        setSelectedImages([]); // Clear selected images
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
    <>
      <Navbar />
      <div className="home-container">
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
              <li>
                <a href="#communities">Communities</a>{" "}
              </li>
            </ul>
          </div>

          {/* Main Content */}
          <div className="center-content">
            <h2>Welcome to Lefora!</h2>
            <div className="forum-stats">
              <div className="stat-item">
                <div className="stat-number">1,234</div>
                <div className="stat-label">Members</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">5,678</div>
                <div className="stat-label">Posts</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">9,012</div>
                <div className="stat-label">Comments</div>
              </div>
            </div>
            <div className="featured-topics">
              <h3>Featured Topics</h3>
              <ul>
                <li>
                  <a href="#spring-planting">Spring Planting Guide</a>
                </li>
                <li>
                  <a href="#pest-control">Organic Pest Control</a>
                </li>
                <li>
                  <a href="#composting">Composting 101</a>
                </li>
              </ul>
            </div>
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
              <div className={`overlay ${isOverlayOpen ? "active" : ""}`}>
                <div className="overlay-content">
                  <h3>Create a New Post</h3>
                  <form
                    onSubmit={handleCreatePost}
                    className="create-post-form"
                    encType="multipart/form-data"
                  >
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

                    {/* Image Upload Field */}
                    <div className="form-group">
                      <label htmlFor="images">Upload Images</label>
                      <input
                        type="file"
                        id="images"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </div>

                    <button type="submit" className="btn">
                      Create Post
                    </button>
                    <button
                      type="button"
                      className="btn cancel"
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
                    <Link to={`/posts/${post._id}`}>
                      <h4>{post.title}</h4>
                    </Link>
                    <p>{post.content}</p>
                    <p className="author">Posted by: {post.author}</p>

                    {/* Display Images */}
                    <div className="post-images">
                      {post.images.map((image, index) => (
                        <img
                          key={index}
                          src={`http://localhost:3001/${image}`}
                          alt={`Post Image ${index + 1}`}
                          className="post-image"
                        />
                      ))}
                    </div>

                    <div className="post-actions">
                      <button
                        className="like-btn"
                        onClick={() => handleLikePost(post._id)}
                      >
                        <FaHeart className="icon heart" />
                        {post.likes}
                      </button>
                      <Link to={`/posts/${post._id}`} className="comment-btn">
                        <FaCommentAlt className="icon comment" />
                        {post.comments.length}
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <p>No posts yet. Be the first to create one!</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
