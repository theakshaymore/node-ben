import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    const response = await axios.post("http://localhost:5001/auth/login", {
      email,
      password,
    });

    console.log(response.data);
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
