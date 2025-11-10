import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../utils/config.js";

function Signup() {
  //

  const [fullName, setFullName] = useState("akshay more");
  const [email, setEmail] = useState("akshay@gmail.com");
  const [password, setPassword] = useState("1234");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast("");
      }, 3000);

      return () => clearTimeout(timer); // Cleanup timer
    }
  }, [toast]);

  const handleSignup = async (event) => {
    event.preventDefault();
    setError("");
    setToast("");
    try {
      setLoading(true);
      const response = await axios.post(
        `${BACKEND_URL}/user/signup`,
        {
          fullName,
          email,
          password,
        },
        { withCredentials: true }
      );
      setLoading(false);
      if (response.data.success) {
        setToast(`${response.data.msg}. redirecting...`);
        // Navigate after showing success message
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 1500);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      setToast("Signup failed");
      setError("Signup failed");
    }
  };

  return (
    <div className="flex w-full m-5">
      <div className="card bg-base-300 rounded-box grid grow place-items-center p-8">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Signup</legend>
          <form onSubmit={handleSignup}>
            <label className="label">Full Name</label>
            <input
              type="text"
              className="input"
              placeholder="Full Name"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
            />

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
              type="text"
              className="input"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />

            <button className="btn btn-neutral mt-4">Signup</button>
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
          {/* {error && (
            <div role="alert" className="alert alert-info">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="h-6 w-6 shrink-0 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>{error}</span>
            </div>
          )} */}
          {/* Toast notification - shown when toast has value */}
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

      <div className="card bg-base-300 rounded-box grow overflow-hidden">
        <img
          src="/small-image.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

export default Signup;
