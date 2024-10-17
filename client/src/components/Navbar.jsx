import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import icon from "../assets/img/profile.png";
import "./Navbar.css";
import logo from "../assets/img/lefora.jpeg";

function Navbar({ currentPage, handleNavClick }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null); // Ref to track the dropdown

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const storedEmail = localStorage.getItem("email");

    if (isLoggedIn) {
      setLoggedIn(true);
      setEmail(storedEmail);
    }

    // Event listener to close the dropdown if clicked outside
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false); // Close dropdown if clicked outside
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    // Cleanup event listener
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
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
          </div>
        </div>
      )}

      <div className="shop-link">
        <Link
          to="/shop"
          className={`nav-link ${currentPage === "/shop" ? "active" : ""}`}
        >
          Lefora Shop
        </Link>
      </div>

      {loggedIn && (
        <div className="shop-cart">
          <Link
            to="/cart"
            className={`nav-link ${currentPage === "/cart" ? "active" : ""}`}
          >
            My Cart
          </Link>
        </div>
      )}

      <div className="auth-section">
        {loggedIn ? (
          <div className="profile" ref={dropdownRef}>
            <img
              src={icon}
              alt="Profile"
              style={{ cursor: "pointer" }}
              onClick={() => setDropdownOpen((prev) => !prev)} // Toggle dropdown on click
            />

            {/* Dropdown menu */}
            {dropdownOpen && (
              <div id="navDrop" className="dropdown-menu">
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
