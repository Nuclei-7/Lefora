import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./profile.css";
import Navbar from "../components/Navbar";

function Profile() {
  const { id } = useParams();
  const [user, setUser] = useState({ name: "", email: "" });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    // Fetch user profile data
    axios
      .get(`http://localhost:3001/profile/${"name"}`)
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3001/profile/${"email"}`, user)
      .then((res) => {
        alert("Profile updated successfully!");
        setEditing(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <div className="profile-card">
          <h1>Profile</h1>
          {editing ? (
            <form onSubmit={handleUpdate} className="profile-form">
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
              </div>

              <button type="submit" className="btn save-btn">
                Save
              </button>
            </form>
          ) : (
            <div className="profile-info">
              <p>
                <strong>Name:</strong> {user.name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <button onClick={() => setEditing(true)} className="btn edit-btn">
                Edit Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Profile;
