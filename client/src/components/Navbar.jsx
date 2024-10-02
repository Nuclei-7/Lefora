import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import icon from "../assets/img/profile.png";
import "./Navbar.css";

function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const storedEmail = localStorage.getItem("email");

    if (isLoggedIn) {
      setLoggedIn(true);
      setEmail(storedEmail);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("email");
    setLoggedIn(false);
    navigate("/login");
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

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
            <img
              src={icon}
              alt="Profile"
              style={{ cursor: "pointer" }}
              onClick={handleProfileClick}
            />

            {/* Three dots (ellipsis) for the dropdown */}
            <div
              className="dropdown-trigger"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              &#x22EE; {/* HTML entity for vertical ellipsis (three dots) */}
            </div>

            {/* Dropdown menu */}
            {dropdownOpen && (
              <div className="dropdown-menu">
                <button onClick={handleProfileClick}>Profile</button>
                <br />
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
