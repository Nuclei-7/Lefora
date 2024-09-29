import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar({ loggedIn }) {
  const location = useLocation(); // Get the current location

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/home">Lefora</Link>
      </div>

      {/* Conditionally show search bar only on the home page */}
      {location.pathname === "/home" && (
        <div className="search-bar">
          <input type="text" placeholder="Search topics..." />
        </div>
      )}

      <div className="auth-section">
        {loggedIn ? (
          <div className="profile">
            <img src="/path/to/profile-pic.jpg" alt="Profile" />
            <div className="dropdown">
              <button>▼</button>
              <div className="dropdown-content">
                <Link to="/profile">Profile</Link>
                <Link to="/logout">Logout</Link>
              </div>
            </div>
          </div>
        ) : (
          <>
            <Link to="/login">Login</Link> <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
