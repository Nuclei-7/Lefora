import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css"; // Assuming your CSS file is properly set
import Navbar from "../components/Navbar";
import { useAuth } from "../services/AuthContext"; // Adjust the path as necessary

function Login({ currentPage, handleNavClick }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // Get the login function from AuthContext

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Logging in with:", email, password); // Debug: Log email and password

    try {
      const result = await axios.post("http://localhost:3001/api/users/login", {
        email,
        password,
      });
      console.log("Login Response:", result.data);

      if (result.data.message === "Success") {
        const userData = {
          username: result.data.user, // Change this to use 'user' from the response
          id: result.data.userId,
        };

        // Store login status and user data in localStorage
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("email", email);
        localStorage.setItem("userId", result.data.userId);
        localStorage.setItem("username", result.data.user); // Make sure this matches the response
        // After successful login in your login function
        localStorage.setItem("user", JSON.stringify(result.data)); // Assuming `res.data` contains user info/token

        // Update the context with current user data
        login(userData); // This should correctly update the context

        // Navigate to the profile page
        navigate(`/profile/${result.data.userId}`);
      } else {
        console.error("Login failed:", result.data);
      }
    } catch (err) {
      console.error("Error during login:", err);
    }
  };

  return (
    <>
      <Navbar currentPage={currentPage} handleNavClick={handleNavClick} />
      <div className="login-container">
        <div className="login-box">
          <h2 className="login-title">Login</h2>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter Email"
                autoComplete="off"
                name="email"
                className="form-input"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                autoComplete="off"
                name="password"
                className="form-input"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="login-button">
              Login
            </button>

            <div className="register-link">
              <p>
                Don't have an account?{" "}
                <Link to="/register" className="link-button">
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
