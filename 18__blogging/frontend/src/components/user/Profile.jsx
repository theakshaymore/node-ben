import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../utils/config.js";

// redux imports
import { useDispatch, useSelector } from "react-redux";
import UserBlogList from "./UserBlogList.jsx";

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
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex items-center gap-6 mb-8">
          <div className="skeleton w-24 h-24 rounded-full shrink-0"></div>
          <div className="flex-1">
            <div className="skeleton h-8 w-48 mb-2"></div>
            <div className="skeleton h-4 w-64"></div>
          </div>
        </div>
        <div className="skeleton h-12 w-full"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
        <div className="avatar">
          <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={user?.profileurl} alt="profile" />
          </div>
        </div>

        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-bold mb-2">{user?.fullname}</h1>
          <p className="text-base-content/60 mb-4">{user?.email}</p>
          <Link to="/add">
            <button className="btn btn-primary">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                ></path>
              </svg>
              Write New Post
            </button>
          </Link>
        </div>
      </div>

      <div className="divider"></div>

      {/* Blog List */}
      <UserBlogList user={user} />
    </div>
  );
}

export default Profile;
