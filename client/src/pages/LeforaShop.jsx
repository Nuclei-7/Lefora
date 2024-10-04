import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./LeforaShop.css"; // Create your own styles if needed

const LeforaShop = () => {
  return (
    <div className="lefora-shop-container">
      <Navbar /> {/* Include the Navbar */}
      <div className="shop-content">
        <h1>Welcome to the Lefora Shop!</h1>
        <p>Browse our gardening tools, seeds, and other essentials for your garden.</p>

        {/* Add shop items here. You can structure this as a grid of products */}
        <div className="shop-items">
          <div className="shop-item">
            <img src="/path-to-item1.jpg" alt="Item 1" />
            <h3>Item 1</h3>
            <p>Description of Item 1</p>
            <button className="btn">Buy Now</button>
          </div>
          <div className="shop-item">
            <img src="/path-to-item2.jpg" alt="Item 2" />
            <h3>Item 2</h3>
            <p>Description of Item 2</p>
            <button className="btn">Buy Now</button>
          </div>
          {/* Add more items as needed */}
        </div>
      </div>
      <Footer /> {/* Include Footer */}
    </div>
  );
};

export default LeforaShop;
