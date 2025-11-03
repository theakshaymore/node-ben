import React from "react";
import Navbar from "./components/Navbar";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";

function App() {
  return (
    <>
      <Navbar />

      <h1>Ben Blogify</h1>
      {/* <Signup /> */}
      <Login />
    </>
  );
}

export default App;
