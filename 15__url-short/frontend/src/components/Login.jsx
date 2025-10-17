import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("pd@gmail.com");
  const [password, setPassword] = useState("123");

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5001/auth/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      // console.log(response.data);
      navigate("/", { replace: true });
    } catch (error) {
      console.log(
        "FRONTEND: login failed:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <>
      <form
        onSubmit={handleLogin}
        style={{ display: "flex", flexDirection: "column", gap: 8, width: 320 }}
      >
        <input
          type="text"
          placeholder="enter email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="text"
          placeholder="enter password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
}

export default Login;
