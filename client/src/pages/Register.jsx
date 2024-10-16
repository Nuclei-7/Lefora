import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./register.css"; // Your custom CSS
import Navbar from "../components/Navbar";

function Register() {
  const [userName, setName] = useState(""); // Set default to empty string
  const [email, setEmail] = useState(""); // Set default to empty string
  const [password, setPassword] = useState(""); // Set default to empty string
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/api/users/register", {
        // Updated URL
        name: userName,
        email,
        password,
      })
      .then((result) => {
        console.log(result);
        navigate("/login"); // Move navigate inside then block to only redirect after success
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Navbar />
      <div className="login-container">
        <div className="login-box">
          <h2 className="login-title">Register</h2>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter Name"
                autoComplete="off"
                name="name"
                className="form-input"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
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
            <button type="submit" className="login-button w-100">
              Register
            </button>
          </form>
          <div className="register-link">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="link-button">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
