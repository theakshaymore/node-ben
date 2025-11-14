import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../utils/config.js";

// redux imports
import { useDispatch, useSelector } from "react-redux";

function Profile() {
  //   const [user, setUser] = useState(null);
  //   const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  //   useEffect(() => {
  //     const fetchUser = async () => {
  //       try {
  //         const response = await axios.get(`${BACKEND_URL}/`, {
  //           withCredentials: true, // Send cookies
  //         });

  //         if (response.data.user) {
  //           setUser(response.data.user);
  //           console.log(user);
  //         }
  //         setLoading(false);
  //       } catch (error) {
  //         console.log("Error fetching user:", error);
  //         setLoading(false);
  //         navigate("/", { replace: true });
  //       }
  //     };

  //     fetchUser();
  //   }, []);

  if (!loading && !user) {
    navigate("/login", { replace: true });
    return null;
  }

  if (loading) {
    return (
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-md">
            {/* Skeleton for heading */}
            <div className="skeleton h-12 w-64 mb-4"></div>

            {/* Skeleton for avatar */}
            <div className="flex justify-center py-6">
              <div className="skeleton w-24 h-24 rounded shrink-0"></div>
            </div>

            {/* Skeleton for email */}
            <div className="skeleton h-4 w-48 mx-auto mb-6"></div>

            {/* Skeleton for button */}
            <div className="skeleton h-12 w-32 mx-auto"></div>
          </div>
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
                <div className="avatar">
                  <div className="w-24 rounded">
                    <img src={user.profileurl} alt="profile" />
                  </div>
                </div>
                <p className="mt-4">{user.email}</p>
              </>
            ) : (
              <p>
                Provident cupiditate voluptatem et in. Quaerat fugiat ut
                assumenda excepturi exercitationem quasi.
              </p>
            )}
          </div>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
