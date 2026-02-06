import React, { useState, useEffect } from "react";
import Card from "./Card";
import axios from "axios";
import { Link } from "react-router-dom";
import { BACKEND_URL } from "../../utils/config";

function CardList() {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let pollInterval = null;
    let timeoutId = null;

    async function getAllBlogs() {
      try {
        setLoading(true);
        console.log("🚀 Starting job...");
        const response = await axios.get(`${BACKEND_URL}/blog/getallblogs`, {
          withCredentials: true,
        });

        const { jobId, statusUrl } = response.data;
        console.log("✅ Job started:", jobId);

        pollInterval = setInterval(async () => {
          try {
            console.log("🔍 Checking status...");
            const status = await axios.get(`${BACKEND_URL}/${statusUrl}`, {
              withCredentials: true,
            });

            console.log("📦 Full response:", status.data);
            const { state, data } = status.data;
            console.log("📊 Current state:", state);

            if (state === "completed") {
              console.log("✅ Completed! Got blogs:", data.length);
              clearInterval(pollInterval);
              setBlogs(data);
              setLoading(false);
            } else if (state === "failed") {
              console.log("❌ Failed:", data);
              clearInterval(pollInterval);
              setError(true);
              setMessage(data?.error || "Failed to load blogs");
              setLoading(false);
            }
          } catch (error) {
            console.log("❌ Error:", error);
            clearInterval(pollInterval);
            setError(true);
            setMessage("Error checking status");
            setLoading(false);
          }
        }, 2000);

        // Cleanup: Stop polling after 30 seconds (timeout)
        timeoutId = setTimeout(() => {
          clearInterval(pollInterval);
          if (loading) {
            setError(true);
            setMessage("Request timeout");
            setLoading(false);
          }
        }, 3000);
      } catch (error) {
        setError(true);
        setMessage(error.response?.data?.msg || "Unable to load stories");
      }
    }

    getAllBlogs();

    // Cleanup when component unmounts
    return () => {
      if (pollInterval) clearInterval(pollInterval);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <div className="skeleton h-12 w-64 mx-auto mb-4 rounded-xl" />
          <div className="skeleton h-6 w-48 mx-auto rounded-lg" />
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="skeleton h-56 w-full rounded-xl mb-4" />
              <div className="flex items-center gap-3 mb-4">
                <div className="skeleton h-10 w-10 rounded-full" />
                <div className="flex-1">
                  <div className="skeleton h-4 w-24 mb-2 rounded" />
                  <div className="skeleton h-3 w-16 rounded" />
                </div>
              </div>
              <div className="skeleton h-6 w-3/4 mb-3 rounded" />
              <div className="skeleton h-4 w-full mb-2 rounded" />
              <div className="skeleton h-4 w-5/6 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <div className="max-w-md mx-auto bg-white rounded-3xl p-12 shadow-lg">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">Something went wrong</h3>
          <p className="text-base-content/60 mb-6">{message}</p>
          <button
            onClick={() => window.location.reload()}
            className="btn btn-primary rounded-full px-8"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      {/* Section Header */}
      <div className="mb-16 text-center">
        <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-600 text-sm font-medium mb-4">
          Latest Stories
        </span>
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Explore & Discover
        </h2>
        <p className="text-lg text-base-content/60 max-w-xl mx-auto">
          Dive into captivating stories from our community of passionate writers
        </p>
      </div>

      {/* Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog, index) => (
          <div
            key={blog._id}
            className="opacity-0 animate-[fadeInUp_0.5s_ease-out_forwards]"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <Card blog={blog} />
          </div>
        ))}
      </div>

      {/* Empty State */}
      {blogs.length === 0 && (
        <div className="text-center py-20">
          <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
            <svg
              className="w-16 h-16 text-indigo-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold mb-3">No stories yet</h3>
          <p className="text-base-content/60 mb-8 max-w-md mx-auto">
            Be the first to share your thoughts and inspire others
          </p>
          <Link to="/add">
            <button className="btn btn-primary btn-lg rounded-full px-10 gap-2">
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
              Write the first story
            </button>
          </Link>
        </div>
      )}

      {/* Load More - Future enhancement */}
      {blogs.length > 0 && (
        <div className="text-center mt-16">
          <button className="btn btn-outline btn-lg rounded-full px-10 gap-2 hover:bg-indigo-50 hover:border-indigo-300">
            Load More Stories
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
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
      )}

      {/* Add CSS animation keyframes inline */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default CardList;
