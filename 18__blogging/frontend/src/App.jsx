import React, { useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BACKEND_URL } from "./utils/config";

// redux imports
import { useDispatch } from "react-redux";
import { setLoading, setUser, clearUser } from "./store/authSlice";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import Home from "./components/layout/Home";
import Profile from "./components/user/Profile";

function App() {
  //
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      dispatch(setLoading(true));

      // Add artificial delay to see skeleton
      await new Promise((resolve) => setTimeout(resolve, 2000)); // 2 second delay

      try {
        const response = await axios.get(BACKEND_URL, {
          withCredentials: true,
        });
        dispatch(setUser(response.data.user));
      } catch (error) {
        dispatch(setUser(null));
      }

      dispatch(setLoading(false));
    };

    fetchUser();
  }, [dispatch]);

  return (
    <>
      {/* <h1>Ben Blogify</h1> */}
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
