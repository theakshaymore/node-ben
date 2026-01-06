import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../utils/config";
import { Link } from "react-router-dom";

function UserBlogList({ user }) {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");

  // toast auto-dismiss
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [toast]);

  async function handleDelete(id) {
    try {
      const response = await axios.delete(`${BACKEND_URL}/blog/${id}`, {
        withCredentials: true,
      });

      if (response.data.success) {
        setBlogs(blogs.filter((blog) => blog._id !== id));
        setToast("Blog deleted successfully");
      }
    } catch (error) {
      console.log("Error deleting blog:", error);
      console.log("Error response:", error.response?.data);
      setToast(error.response?.data?.msg || "Failed to delete blog");
    }
  }

  useEffect(() => {
    async function getAllBlogs() {
      try {
        const response = await axios.get(`${BACKEND_URL}/blog/getblogs`, {
          withCredentials: true,
        });

        if (response.data.success) {
          setBlogs(response.data.blogs);
        }
      } catch (error) {
        console.log("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    }

    getAllBlogs();
  }, []);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="skeleton h-12 w-full mb-4"></div>
        <div className="skeleton h-20 w-full mb-2"></div>
        <div className="skeleton h-20 w-full mb-2"></div>
        <div className="skeleton h-20 w-full"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <ul className="list bg-base-100 rounded-box shadow-md">
        <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
          My Blog Posts ({blogs.length})
        </li>

        {blogs.map((blog) => (
          <li key={blog._id} className="list-row">
            <div>
              <img
                className="size-16 rounded-box object-cover"
                src={blog.coverImageURL}
                alt={blog.title}
              />
            </div>
            <div className="flex-1">
              <div className="font-semibold">{blog.title}</div>
              <div className="text-xs opacity-60 line-clamp-1">{blog.body}</div>
              <div className="text-xs uppercase font-semibold opacity-60 mt-1">
                {new Date(blog.createdAt).toLocaleDateString()}
              </div>
            </div>
            <button className="btn btn-square btn-ghost">
              <svg
                className="size-[1.2em]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </g>
              </svg>
            </button>
            <button
              onClick={() => handleDelete(blog._id)}
              className="btn btn-square btn-ghost text-error"
            >
              <svg
                className="size-[1.2em]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M3 6h18"></path>
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                </g>
              </svg>
            </button>
          </li>
        ))}
      </ul>

      {blogs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-base-content/60 mb-4">
            You haven't created any blogs yet
          </p>
          <Link to="/add">
            <button className="btn btn-primary">Create Your First Blog</button>
          </Link>
        </div>
      )}

      {/* Toast notification */}
      {toast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
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
            <span>{toast}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserBlogList;
