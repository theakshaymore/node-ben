import React, { useState, useEffect } from "react";
import Card from "./Card";
import axios from "axios";
import { BACKEND_URL } from "../../utils/config";

function CardList() {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getAllBlogs() {
      try {
        setLoading(true);
        const response = await axios.get(`${BACKEND_URL}/blog/getallblogs`, {
          withCredentials: true,
        });

        if (response.data.success) {
          setSuccess(true);
          setBlogs(response.data.blogs);
        }
      } catch (error) {
        setError(true);
        setMessage(error.response?.data?.msg || "Error fetching blogs");
      } finally {
        setLoading(false);
      }
    }

    getAllBlogs();
  }, []);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        {/* Fixed: Better skeleton for grid layout */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="skeleton h-96 w-full"></div>
          <div className="skeleton h-96 w-full"></div>
          <div className="skeleton h-96 w-full"></div>
        </div>
      </div>
    );
  }

  // Added: Show error message if error occurs
  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-6 text-center">
        <div className="alert alert-error">
          <span>{message}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Recent Posts</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <Card key={blog._id} blog={blog} />
        ))}
      </div>

      {/* Added: Empty state when no blogs */}
      {blogs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-base-content/60">No blogs available yet</p>
        </div>
      )}
    </div>
  );
}

export default CardList;
