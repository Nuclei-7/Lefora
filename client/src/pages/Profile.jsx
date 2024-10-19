import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./profile.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Profile({ currentPage, handleNavClick }) {
  const { userId } = useParams(); // Gets the user ID from the URL
  const [user, setUser] = useState({ name: "", email: "" }); // State to store user data
  const [editing, setEditing] = useState(false); // State to track editing mode
  const [error, setError] = useState(""); // State for error handling
  const [loading, setLoading] = useState(true); // State for loading status
  const [currentPassword, setCurrentPassword] = useState(""); // State for current password
  const [newPassword, setNewPassword] = useState(""); // State for new password
  const [passwordError, setPasswordError] = useState(""); // State for password change error
  const [changingPassword, setChangingPassword] = useState(false); // State for password change mode

  // Fetch user profile data when the component mounts
  useEffect(() => {
    console.log("User ID from URL:", userId); // Log the ID
    const fetchUserProfile = async () => {
      if (userId) {
        // Check if ID is defined
        try {
          const res = await axios.get(
            `http://localhost:3001/api/users/profile/${userId}`
          ); // Update to match new route
          console.log("Fetched profile data:", res.data); // Log the profile data received
          setUser(res.data); // Set the user data
        } catch (err) {
          setError("Error fetching profile data. Please try again.");
          console.error("Error fetching profile data", err);
        } finally {
          setLoading(false);
        }
      } else {
        setError("User ID is not defined."); // Handle undefined ID
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId]);

  // Handle profile update (PUT request)
  const handleUpdate = async (e) => {
    e.preventDefault(); // Prevents the form from refreshing the page

    console.log("User data to update:", user); // Log the user data before sending the update request

    try {
      await axios.put(
        `http://localhost:3001/api/users/profile/${userId}`,
        user
      ); // Update the PUT request to the correct endpoint
      alert("Profile updated successfully!");
      setEditing(false); // Exit editing mode after successful update
    } catch (err) {
      setError("Error updating profile. Please try again."); // Error handling
      console.error("Error updating profile", err);
    }
  };

  // Handle password change
  const handleChangePassword = async (e) => {
    e.preventDefault(); // Prevents the form from refreshing the page

    // You might want to implement some validation here
    if (!currentPassword || !newPassword) {
      setPasswordError("Both fields are required.");
      return;
    }

    try {
      const res = await axios.put(
        `http://localhost:3001/api/users/change-password/${userId}`,
        { currentPassword, newPassword }
      ); // Update to match your backend route
      alert(res.data.message || "Password changed successfully!");
      setChangingPassword(false); // Exit changing password mode
    } catch (err) {
      setPasswordError("Error changing password. Please try again."); // Error handling
      console.error("Error changing password", err);
    }
  };

  return (
    <>
      <Navbar currentPage={currentPage} handleNavClick={handleNavClick} />
      <div className="profile-container">
        <div className="profile-card">
          <h1>Profile</h1>
          {loading ? (
            <p>Loading...</p> // Loading state
          ) : (
            <>
              {error && <div className="alert alert-danger">{error}</div>}{" "}
              {/* Display error if any */}
              {editing ? (
                // Edit form for profile
                <form onSubmit={handleUpdate} className="profile-form">
                  <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                      type="text"
                      id="name"
                      value={user.name} // Show the current user's name
                      onChange={(e) =>
                        setUser({ ...user, name: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                      type="email"
                      id="email"
                      value={user.email} // Show the current user's email
                      onChange={(e) =>
                        setUser({ ...user, email: e.target.value })
                      } // Update email in state
                      required // Make the field required
                    />
                  </div>

                  <button type="submit" className="btn save-btn">
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn cancel-btn"
                    onClick={() => setEditing(false)}
                  >
                    Cancel
                  </button>

                  {/* Change Password Section */}
                  <div className="change-password-section">
                    <h2>Change Password</h2>
                    {changingPassword ? (
                      <form
                        onSubmit={handleChangePassword}
                        className="change-password-form"
                      >
                        <div className="form-group">
                          <label htmlFor="currentPassword">
                            Current Password:
                          </label>
                          <input
                            type="password"
                            id="currentPassword"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="newPassword">New Password:</label>
                          <input
                            type="password"
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                          />
                        </div>
                        <button
                          type="submit"
                          className="btn change-password-btn"
                        >
                          Change Password
                        </button>
                        <button
                          type="button"
                          className="btn cancel-btn"
                          onClick={() => setChangingPassword(false)}
                        >
                          Cancel
                        </button>
                        {passwordError && (
                          <div className="alert alert-danger">
                            {passwordError}
                          </div>
                        )}
                      </form>
                    ) : (
                      <button
                        onClick={() => setChangingPassword(true)}
                        className="btn change-password-btn"
                      >
                        Change Password
                      </button>
                    )}
                  </div>
                </form>
              ) : (
                // Display user profile info
                <div className="profile-info">
                  <p>
                    <strong>Name:</strong> {user.username}
                  </p>
                  <p>
                    <strong>Email:</strong> {user.email}
                  </p>
                  <button
                    onClick={() => setEditing(true)}
                    className="btn edit-btn"
                  >
                    Edit Profile
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
