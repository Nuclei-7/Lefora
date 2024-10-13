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

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state

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
      <Router>
        {loading ? ( // Display loading state if fetching data
          <div>Loading...</div>
        ) : (
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<Home data={data} />} />{" "}
            {/* Pass data if needed */}
            <Route path="/login" element={<Login />} />
            <Route path="/shop" element={<LeforaShop />} />
            <Route path="/posts/:id" element={<PostDetails />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        )}
      </Router>
    </AuthProvider>
  );
}

export default App;
