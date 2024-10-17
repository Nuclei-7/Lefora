import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import LeforaShop from "./pages/LeforaShop";
import PostDetails from "./components/PostDetails";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { AuthProvider } from "./services/AuthContext";
import CartPage from "./pages/CartPage/CartPage";
import { CartProvider } from "./services/CartContext";
import ThankYouPage from "./pages/ThankYouPage";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state
  const [currentPage, setCurrentPage] = useState("/"); // Set default or current page

  // Function to handle setting the current page
  const handleNavClick = (page) => {
    console.log("Navigating to:", page);
    setCurrentPage(page);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/posts")
      .then((response) => {
        setData(response.data);
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false); // Ensure loading is false even on error
      });
  }, []);

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <LandingPage
                  currentPage={currentPage}
                  handleNavClick={handleNavClick}
                />
              }
            />
            <Route
              path="/home"
              element={
                <Home
                  data={data}
                  currentPage={currentPage}
                  handleNavClick={handleNavClick}
                />
              }
            />
            <Route
              path="/login"
              element={
                <Login
                  currentPage={currentPage}
                  handleNavClick={handleNavClick}
                />
              }
            />
            <Route
              path="/cart"
              element={
                <CartPage
                  currentPage={currentPage}
                  handleNavClick={handleNavClick}
                />
              }
            />
            <Route
              path="/shop"
              element={
                <LeforaShop
                  currentPage={currentPage}
                  handleNavClick={(page) => {
                    console.log("App's handleNavClick:", page);
                    handleNavClick(page);
                  }}
                />
              }
            />
            <Route
              path="/posts/:id"
              element={
                <PostDetails
                  currentPage={currentPage}
                  handleNavClick={handleNavClick}
                />
              }
            />
            <Route
              path="/register"
              element={
                <Register
                  currentPage={currentPage}
                  handleNavClick={handleNavClick}
                />
              }
            />
            <Route
              path="/profile/:userId"
              element={
                <Profile
                  currentPage={currentPage}
                  handleNavClick={handleNavClick}
                />
              }
            />
            <Route path="/thankYou" element={<ThankYouPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
