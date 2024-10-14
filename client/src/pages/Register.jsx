import React, { useState } from "react";
import axios from "axios";
import "./register.css"; // Make sure to include this CSS file for Register
import Navbar from "../components/Navbar";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/api/users/register",
        {
          username,
          email,
          password,
        }
      );
      setSuccess(response.data.message);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
      setSuccess(null);
    }
  };

  return (
    <>
      <Navbar />
      <div className="login-container">
        <div className="login-box">
          <h2 className="login-title">Register</h2>
          <form className="login-form" onSubmit={handleSubmit}>
            {error && <p className="text-danger">{error}</p>}
            {success && <p className="text-success">{success}</p>}

            <div className="form-group">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-input"
                placeholder="Enter username"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                placeholder="Enter email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                placeholder="Enter password"
                required
              />
            </div>

            <button type="submit" className="login-button w-100">
              Register
            </button>
          </form>
          <div className="register-link">
            <p>
              Already have an account?{" "}
              <a href="/login" className="link-button">
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
