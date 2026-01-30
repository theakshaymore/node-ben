import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../utils/config.js";

// redux imports
import { useDispatch, useSelector } from "react-redux";
import UserBlogList from "./UserBlogList.jsx";

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.auth);

  if (!loading && !user) {
    navigate("/login", { replace: true });
    return null;
  }

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6 py-12">
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="skeleton w-32 h-32 rounded-full"></div>
            <div className="flex-1 text-center md:text-left">
              <div className="skeleton h-8 w-48 mb-3 mx-auto md:mx-0"></div>
              <div className="skeleton h-5 w-64 mb-4 mx-auto md:mx-0"></div>
              <div className="skeleton h-10 w-40 rounded-full mx-auto md:mx-0"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 pt-12 pb-32">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-3xl font-bold text-white mb-2">My Profile</h1>
          <p className="text-white/70">
            Manage your account and view your stories
          </p>
        </div>
      </div>

      {/* Profile Card - Overlapping the header */}
      <div className="max-w-6xl mx-auto px-6 -mt-20">
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Avatar */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-white shadow-xl">
                <img
                  src={user?.profileurl}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Edit Avatar Button */}
              <button className="absolute bottom-1 right-1 w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center shadow-lg hover:bg-indigo-600 transition-colors">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </button>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold mb-1">{user?.fullname}</h2>
              <p className="text-base-content/60 mb-4 flex items-center justify-center md:justify-start gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                {user?.email}
              </p>

              {/* Stats */}
              <div className="flex items-center justify-center md:justify-start gap-6 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-600">12</div>
                  <div className="text-sm text-base-content/60">Posts</div>
                </div>
                <div className="w-px h-10 bg-gray-200"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-600">1.2K</div>
                  <div className="text-sm text-base-content/60">Readers</div>
                </div>
                <div className="w-px h-10 bg-gray-200"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-600">89</div>
                  <div className="text-sm text-base-content/60">Likes</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <Link to="/add">
                  <button className="btn bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white border-0 rounded-full px-6 gap-2 shadow-lg shadow-indigo-500/30">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    Write New Post
                  </button>
                </Link>
                <button className="btn btn-outline rounded-full px-6 gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Settings
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-8 mb-6 flex items-center gap-4 border-b border-gray-200">
          <button className="px-6 py-4 font-semibold text-indigo-600 border-b-2 border-indigo-600 -mb-px">
            My Posts
          </button>
          <button className="px-6 py-4 font-medium text-base-content/60 hover:text-base-content transition-colors">
            Saved
          </button>
          <button className="px-6 py-4 font-medium text-base-content/60 hover:text-base-content transition-colors">
            Drafts
          </button>
        </div>

        {/* Blog List */}
        <UserBlogList user={user} />
      </div>
    </div>
  );
}

export default Profile;
