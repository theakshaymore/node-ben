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
          <Route path="/" element={<Url />} />
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="/auth/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
