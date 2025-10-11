import React, { useState } from "react";
import axios from "axios";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (event) => {
    event.preventDefault();
    const response = await axios.post("http://localhost:5001/auth/signup", {
      name,
      email,
      password,
    });

    console.log(response.data);
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
        <button type="submit">Signup</button>
      </form>
    </>
  );
}

export default Signup;
