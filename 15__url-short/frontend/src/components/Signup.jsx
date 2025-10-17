import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("test");
  const [email, setEmail] = useState("test@gmail.com");
  const [password, setPassword] = useState("1234");

  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5001/auth/signup",
        {
          name,
          email,
          password,
        },
        { withCredentials: true }
      );

      console.log(response.data);
      navigate("/", { replace: true });
    } catch (error) {
      console.log(
        "FRONTEND: Signup failed:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <>
      <form
        onSubmit={handleSignup}
        style={{ display: "flex", flexDirection: "column", gap: 8, width: 320 }}
      >
        <input
          type="text"
          placeholder="enter name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <input
          type="email"
          placeholder="enter email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="password"
          placeholder="enter password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit">Signup</button>
      </form>
    </>
  );
}

export default Signup;
