import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Url from "./components/Url";
import Signup from "./components/Signup";
import Login from "./components/Login";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Url />} /> {/* default route */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
