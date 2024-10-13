import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import Navbar from "../components/Navbar";
import { useAuth } from "../services/AuthContext"; // Adjust the path as necessary

function Login() {
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
      <Navbar />
      <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
        <div className="bg-white p-3 rounded w-25">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email">
                <strong>Email</strong>
              </label>
              <input
                type="email" // Changed to email type for better input handling
                placeholder="Enter Email"
                autoComplete="off"
                name="email"
                className="form-control rounded-0"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password">
                <strong>Password</strong>
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                autoComplete="off"
                name="password"
                className="form-control rounded-0"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-success w-100 rounded-0">
              Login
            </button>

            <div className="mt-2">
              <Link to="/register" className="link-button">
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
