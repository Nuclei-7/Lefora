import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login"; // Placeholder for now
import Register from "./pages/Register"; // Placeholder for now
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import LeforaShop from "./pages/LeforaShop";
import PostDetails from "./components/PostDetails";
import "@fortawesome/fontawesome-free/css/all.min.css"; //import icons

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/posts")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/shop" element={<LeforaShop />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
    // <div>
    //   <h1>MERN Stack App</h1>
    //   {data ? <p>{data.message}</p> : <p>Loading...</p>}
    // </div>
  );
}

export default App;
