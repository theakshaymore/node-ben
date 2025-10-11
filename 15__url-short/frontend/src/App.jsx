import React, { useState } from "react";
import "./App.css";
import Url from "./components/Url";
import Signup from "./components/Signup";
import Login from "./components/Login";

function App() {
  return (
    <>
      <Url />
      <hr />
      <Signup />
      <hr />
      <Login />
    </>
  );
}

export default App;
