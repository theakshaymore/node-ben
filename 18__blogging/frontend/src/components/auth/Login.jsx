import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../utils/config.js";

// redux
import { useDispatch } from "react-redux";
import { setUser } from "../../store/authSlice.js";

function Login() {
  //
  const [email, setEmail] = useState("akshay@gmail.com");
  const [password, setPassword] = useState("1234");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // toast msg
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast("");
      }, 3000);

      return () => clearTimeout(timer); // Cleanup timer
    }
  }, [toast]);

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(
        `${BACKEND_URL}/user/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      setLoading(false);
      if (response.data.success) {
        dispatch(setUser(response.data.user));
        setToast(`${response.data.msg}. redirecting...`);
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 1500);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      setToast("Login failed");
      setError("Signup failed");
    }
  };

  return (
    <div className="flex w-full m-5">
      <div className="card bg-base-300 rounded-box grid grow place-items-center p-8">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Login</legend>
          <form onSubmit={handleLogin}>
            <label className="label">Email</label>
            <input
              type="email"
              className="input"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />

            <label className="label">Password</label>
            <input
              type="password"
              className="input"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />

            <button className="btn btn-neutral mt-4">Login</button>
          </form>
          {loading && (
            <div role="alert" className="alert alert-success">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Signing in.......</span>
            </div>
          )}

          {toast && (
            <div className="toast toast-top toast-center">
              <div
                className={`alert ${error ? "alert-error" : "alert-success"}`}
              >
                <span>{toast}</span>
              </div>
            </div>
          )}
        </fieldset>
      </div>
      <div className="divider divider-horizontal"></div>

      {/* Removed max-h-screen, added h-96 for fixed height */}
      <div className="card bg-base-300 rounded-box grow overflow-hidden h-96">
        <img src="/herp.jpg" alt="" className="w-full h-full object-cover" />
      </div>
    </div>
  );
}

export default Login;
