// /components/Footer.jsx
import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <p>© 2024 Lefora. All Rights Reserved.</p>
      <ul>
        <li>
          <a href="/terms">Terms of Service</a>
        </li>
        <li>
          <Link to={"/aboutUs"}>About Us</Link>
        </li>
        <li>
          <Link to={"/contactUs"}>Contact Us</Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
