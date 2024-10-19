//home
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for routing
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { FaHeart, FaCommentAlt } from "react-icons/fa"; // Import icons
import "./home.css";
import img1 from "../assets/img/p1.svg";
import { useAuth } from "../services/AuthContext"; // Import AuthContext

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false); // Overlay state
  const { currentUser } = useAuth(); // Get the current user from AuthContext

  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    author: currentUser ? currentUser.username : "Anonymous", // Use actual username if available
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
    const userId = currentUser ? currentUser.id : null; // Get user ID from AuthContext

    if (!userId) {
      alert("Please log in to like a post."); // Alert if user is not logged in
      return;
    }

    axios
      .post(`http://localhost:3001/api/posts/${postId}/toggle-like`, { userId })
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
    formData.append("author", currentUser ? currentUser.username : "Anonymous"); // Use the actual username

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
        setNewPost({
          title: "",
          content: "",
          author: currentUser ? currentUser.username : "Anonymous",
        }); // Reset the author to the current user
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
            <div className="topics">
              <h3>Topics</h3>
              <ul>
                <li className="focus-topic">
                  <a href="#all">All Topics</a>
                </li>
                <li>
                  <a href="#my-topics">My Topics</a>
                </li>
                <li>
                  <a href="#my-answers">My Answers</a>
                </li>
                <li>
                  <a href="#communities">Communities</a>
                </li>
              </ul>
            </div>
            <div className="discussing-now">
              <h3>Discussing Now</h3>
              {posts.length > 0 ? (
                posts.slice(0, 3).map((post, index) => (
                  <div key={post._id} className="disc">
                    <Link to={`/posts/${post._id}`}>
                      <h4>{post.title}</h4>
                    </Link>
                    <p className="comment-length">
                      <FaCommentAlt className="icon pad-0" />{" "}
                      {post.comments.length} answers
                    </p>
                    {index < 2 && <hr className="gray-hr" />}{" "}
                    {/* Render <hr> only for the first two posts */}
                  </div>
                ))
              ) : (
                <div className="loader"></div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="center-content">
            <div className="welcome">
              <h2>Welcome to Lefora!</h2>
              <div className="welcomeImg-box">
                <img className="welcome-image" src={img1} alt="photo" />
              </div>
              <p>
                Explore our gardening community and share your knowledge with
                others!
              </p>

              {/* Button to Open Overlay */}
              <button onClick={() => setIsOverlayOpen(true)} className="btn">
                Create Post
              </button>
            </div>

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

                    {/* Display Images in Boxes */}
                    <div className="post-images">
                      {post.images.map((image, index) => (
                        <div key={index} className="image-box">
                          {" "}
                          {/* Added a div for image box */}
                          <img
                            src={`http://localhost:3001/${image}`}
                            alt=""
                            className="post-image"
                          />
                        </div>
                      ))}
                    </div>

                    <div className="post-actions">
                      <button
                        className="like-btn"
                        onClick={() => handleLikePost(post._id)}
                      >
                        <FaHeart
                          className={`icon heart ${
                            post.likedBy.includes(currentUser?.id)
                              ? "liked"
                              : ""
                          }`}
                        />
                        {post.likes}
                      </button>
                      <Link to={`/posts/${post._id}`} className="comment-btn">
                        <FaCommentAlt className="icon comment pad-0" />
                        {post.comments.length}
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <p>No posts available.</p>
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
