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
    async function getAllBlogs() {
      try {
        setLoading(true);
        const response = await axios.get(`${BACKEND_URL}/getallblogs`, {
          withCredentials: true,
        });

        if (response.data.success) {
          setBlogs(response.data.blogs);
        }
      } catch (error) {
        setError(true);
        setMessage(error.response?.data?.msg || "Unable to load stories");
      } finally {
        setLoading(false);
      }
    }

    getAllBlogs();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="space-y-4">
              <div className="skeleton h-56 w-full rounded-2xl" />
              <div className="skeleton h-6 w-3/4" />
              <div className="skeleton h-4 w-full" />
              <div className="skeleton h-4 w-5/6" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <div className="max-w-md mx-auto">
          <svg
            className="w-16 h-16 mx-auto mb-4 text-error"
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
          <p className="text-base-content/70 text-lg">{message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      {/* Section Header */}
      <div className="mb-16 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Latest Stories</h2>
        <p className="text-lg text-base-content/60">
          Discover what others are sharing
        </p>
      </div>

      {/* Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <Card key={blog._id} blog={blog} />
        ))}
      </div>

      {/* Empty State */}
      {blogs.length === 0 && (
        <div className="text-center py-20">
          <svg
            className="w-20 h-20 mx-auto mb-6 text-base-content/20"
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
          <p className="text-xl text-base-content/50 mb-6">No stories yet</p>
          <Link to="/add">
            <button className="btn btn-primary rounded-full">
              Be the first to write
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default CardList;
