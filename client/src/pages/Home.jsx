import React from "react";
import Navbar from "../components/Navbar";
import "./home.css";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="home-container">
      <Navbar /> {/* Custom Navbar at the top */}
      <div className="main-content">
        {/* Left Sidebar */}
        <div className="left-sidebar">
          <h3>Topics</h3>
          <ul>
            <li>
              <a href="#all">All Topics</a>
            </li>
            <li>
              <a href="#my-topics">My Topics</a>
            </li>
            <li>
              <a href="#my-answers">My Answers</a>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <h2>Welcome to Lefora!</h2>
          <br />    
          <p>
            Explore our gardening community and share your knowledge with
            others!
          </p>
          {/* Add some featured posts or forum discussions here */}
        </div>

        {/* Right Sidebar */}
        <div className="right-sidebar">
          <h3>Top Contributors</h3>
          <ul>
            <li>Contributor 1</li>
            <li>Contributor 2</li>
          </ul>

          <h3>Top Helpers</h3>
          <ul>
            <li>Helper 1</li>
            <li>Helper 2</li>
          </ul>
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
      {/* Footer */}
    </div>
  );
};

export default Home;
