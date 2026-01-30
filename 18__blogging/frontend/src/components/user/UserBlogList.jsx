import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../utils/config";
import { Link } from "react-router-dom";

function UserBlogList({ user }) {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");
  const [toastType, setToastType] = useState("success");

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
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      const response = await axios.delete(`${BACKEND_URL}/blog/${id}`, {
        withCredentials: true,
      });

      if (response.data.success) {
        setBlogs(blogs.filter((blog) => blog._id !== id));
        setToastType("success");
        setToast("Post deleted successfully");
      }
    } catch (error) {
      console.log("Error deleting blog:", error);
      setToastType("error");
      setToast(error.response?.data?.msg || "Failed to delete post");
    }
  }

  async function handleEdit(id) {
    try {
      const response = await axios.get(`${BACKEND_URL}/blog/editblog/${id}`, {
        withCredentials: true,
      });

      if (response.data.success) {
        // TODO: Navigate to edit page with blog data
        setToastType("success");
        setToast("Edit feature coming soon!");
      }
    } catch (error) {
      console.log("Error fetching blog for edit:", error);
      setToastType("error");
      setToast(error.response?.data?.msg || "Failed to load post");
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
      <div className="space-y-4 pb-8">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-center gap-6">
              <div className="skeleton w-24 h-24 rounded-xl shrink-0"></div>
              <div className="flex-1">
                <div className="skeleton h-6 w-3/4 mb-3"></div>
                <div className="skeleton h-4 w-full mb-2"></div>
                <div className="skeleton h-4 w-1/4"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-3xl shadow-sm border border-gray-100 mb-8">
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
          <svg
            className="w-12 h-12 text-indigo-400"
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
        <h3 className="text-xl font-bold mb-2">No posts yet</h3>
        <p className="text-base-content/60 mb-6">
          Share your first story with the world
        </p>
        <Link to="/add">
          <button className="btn bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-0 rounded-full px-8 gap-2">
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
            Write Your First Post
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="pb-8">
      {/* Posts Grid */}
      <div className="space-y-4">
        {blogs.map((blog, index) => (
          <div
            key={blog._id}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all group"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex flex-col sm:flex-row gap-6">
              {/* Image */}
              <Link to={`/blog/${blog._id}`} className="shrink-0">
                <div className="w-full sm:w-32 h-32 rounded-xl overflow-hidden bg-gray-100">
                  <img
                    src={blog.coverImageURL}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </Link>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <Link to={`/blog/${blog._id}`}>
                  <h3 className="text-lg font-bold mb-2 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                    {blog.title}
                  </h3>
                </Link>
                <p className="text-base-content/60 text-sm line-clamp-2 mb-3">
                  {blog.body}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-base-content/50">
                    <span className="flex items-center gap-1">
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
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {new Date(blog.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-1">
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
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      128 views
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(blog._id)}
                      className="btn btn-ghost btn-sm rounded-full px-4 gap-1 text-indigo-600 hover:bg-indigo-50"
                    >
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
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="btn btn-ghost btn-sm rounded-full px-4 gap-1 text-red-500 hover:bg-red-50"
                    >
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
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Toast notification */}
      {toast && (
        <div className="toast toast-top toast-center z-50">
          <div
            className={`alert ${
              toastType === "error" ? "alert-error" : "alert-success"
            } shadow-lg rounded-xl`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {toastType === "error" ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              )}
            </svg>
            <span>{toast}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserBlogList;
