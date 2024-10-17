import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./LeforaShop.css"; // Create your own styles if needed

const LeforaShop = ({ currentPage, handleNavClick }) => {
  console.log("handleNavClick:", handleNavClick);
  return (
    <>
      <Navbar currentPage={currentPage} handleNavClick={handleNavClick} />
      <div className="lefora-shop-container">
        <div className="shop-content">
          <h1>Welcome to the Lefora Shop!</h1>
          <p>
            Browse our gardening tools, seeds, and other essentials for your
            garden.
          </p>

          {/* Add shop items here. You can structure this as a grid of products */}
          <div className="shop-items">
            <div className="shop-item">
              <div className="prod-img">
                <img
                  src="https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQNVYNtS1b1_FrT46vXIhoF_LpRECQoL16pzvAM8k0VbhGS0T9TbZmZsBremnceBXnuDZTlG3WwHde9C7uaLeNwT9TPAOor4RsoflGgb9XpSv9P1RYhX2tNMNM"
                  alt="Item 1"
                />
              </div>
              <div className="prod-desc">
                <h3>Utkarsh Fertiliser</h3>
                <p>
                  UTKARSH Huminoz-98 Humic Acid (98%) for Plant | Plant
                  Fertilizer for Potted Plants | Plant Growth Enhancer, Soil
                  Conditioner, Improves Plant Root
                </p>
                <button className="btn">Buy Now</button>
              </div>
            </div>

            <div className="shop-item">
              <div className="prod-img">
                <img
                  src="https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTvnWwZE7b0ZytmhDnk8Jr1uTO-NNR9X__hqANUcLwrRU74TbD386OmQjNuvRc6abvRQV-HQbkKcs3RBWTO8QxNJrwLz7D1maEnhtbVc2Nnrfks4SxINz7F"
                  alt="Item 2"
                />
              </div>
              <div className="prod-desc">
                <h3>Natures+ Fertiliser</h3>
                <p>
                  UTKARSH Huminoz-98 Humic Acid (98%) for Plant | Plant
                  Fertilizer for Potted Plants | Plant Growth Enhancer, Soil
                  Conditioner, Improves Plant Root
                </p>
                <button className="btn">Buy Now</button>
              </div>
            </div>

            <div className="shop-item">
              <div className="prod-img">
                <img
                  src="https://m.media-amazon.com/images/I/71-4IGXtwGL.jpg"
                  alt="Item 2"
                />
              </div>
              <div className="prod-desc">
                <h3>Gardener ToolSet</h3>
                <p>
                  Kraft Seeds by 10CLUB Gardening Tools Kit - 7 Pcs (Cultivator,
                  Fork, Trowels, Weeder, Garden Gloves, Pruner Cutter) |
                  Gardening Tools Set For Home |
                </p>
                <button className="btn">Buy Now</button>
              </div>
            </div>

            <div className="shop-item">
              <div className="prod-img">
                <img
                  src="https://m.media-amazon.com/images/I/51MOnNbLIqS.jpg"
                  alt="Item 2"
                />
              </div>
              <div className="prod-desc">
                <h3>
                  Green Touch Two in 1 Garden Pan Hoe with Indian Hedge Shear
                </h3>
                <p>
                  Green Touch Two in 1 Garden Pan Hoe with Indian Hedge Shear
                </p>
                <button className="btn">Buy Now</button>
              </div>
            </div>

            <div className="shop-item">
              <div className="prod-img">
                <img
                  src="https://m.media-amazon.com/images/I/51MOnNbLIqS.jpg"
                  alt="Item 2"
                />
              </div>
              <div className="prod-desc">
                <h3>Pots</h3>
                <p>
                  Green Live 25 Inch Rectangular Planter Pot Brown,
                  Indoor/Outdoor Plastic Flower Pot,, Perfect for Garden,
                  Balcony, Flower Pot and Home
                </p>
                <button className="btn">Buy Now</button>
              </div>
            </div>

            {/* Add more items as needed */}
          </div>
        </div>
        <Footer /> {/* Include Footer */}
      </div>
    </>
  );
};

export default LeforaShop;
