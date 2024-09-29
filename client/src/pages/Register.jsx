import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./register.css";
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
      <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
        <div className="bg-white p-3 rounded w-25">
          <h2>Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name">
                <strong>Name</strong>
              </label>
              <input
                type="text"
                placeholder="Enter Name"
                autoComplete="off"
                name="name" // Updated name attribute
                className="form-control rounded-0"
                onChange={(e) => setName(e.target.value)}
                required // Added required for better validation
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email">
                <strong>Email</strong>
              </label>
              <input
                type="email" // Changed type to email for better validation
                placeholder="Enter email"
                autoComplete="off"
                name="email" // Updated name attribute
                className="form-control rounded-0"
                onChange={(e) => setEmail(e.target.value)}
                required // Added required for better validation
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
                name="password" // Updated name attribute
                className="form-control rounded-0"
                onChange={(e) => setPassword(e.target.value)}
                required // Added required for better validation
              />
            </div>
            <button type="submit" className="btn btn-success w-100 rounded-0">
              Register
            </button>
            <p>Already have an account?</p>
          </form>
          <Link
            to="/login"
            className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
          >
            Login
          </Link>
        </div>
      </div>
    </>
  );
}

export default Register;
