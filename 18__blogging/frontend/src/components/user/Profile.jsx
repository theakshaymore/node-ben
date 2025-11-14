import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../utils/config.js";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

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
        navigate("/", { replace: true });
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
          <div className="py-6">
            {user ? (
              <>
                {/* <img src={user.profileurl} alt="profileimage" /> */}
                <div className="avatar">
                  <div className="w-24 rounded">
                    <img src={user.profileurl} />
                  </div>
                </div>
                <span>{user.email}</span>
              </>
            ) : (
              "Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi."
            )}
          </div>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
