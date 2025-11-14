import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../utils/config.js";

function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/`, {
          withCredentials: true, // Send cookies
        });

        if (response.data.user) {
          setUser(response.data.user);
          console.log(user);
        }
        setLoading(false);
      } catch (error) {
        console.log("Error fetching user:", error);
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </div>
    );
  }

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">
            Hello {user ? user.fullname : "there"}
          </h1>
          <p className="py-6">
            {user ? (
              <>
                <span>Welcome back! {user.email}</span>
                {/* <img src={user.profileurl} alt="profileimage" /> */}
              </>
            ) : (
              "Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi."
            )}
          </p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
