import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import icon from "../assets/img/profile.png";
import "./Navbar.css";
import logo from "../assets/img/lefora.jpeg";

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
    const userId = localStorage.getItem("userId"); // Retrieve user ID from localStorage
    navigate(`/profile/${userId}`);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/home">
          <h5>LEFORA</h5>
        </Link>
      </div>

      {/* Search Container for Centering */}
      {location.pathname === "/home" && (
        <div className="search-container">
          <div className="search-bar">
            <input type="text" placeholder="Search topics..." />
            {/* <button type="submit">Search</button> */}
          </div>
        </div>
      )}

      <div className="shop-link">
        <Link to="/shop">Lefora Shop</Link>
      </div>

      {loggedIn && (
        <div className="shop-cart">
          <Link to="/cart">My Cart</Link>
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
            <Link to="/cart">My Cart</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
