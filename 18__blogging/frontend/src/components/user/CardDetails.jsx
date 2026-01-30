import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../../utils/config";

function CardDetails() {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [toast, setToast] = useState("");
  const [toastType, setToastType] = useState("success");

  const navigate = useNavigate();
  const { id } = useParams();

  // get blog details
  useEffect(() => {
    async function fetchBlog() {
      try {
        const response = await axios.get(`${BACKEND_URL}/blog/${id}`, {
          withCredentials: true,
        });

        if (response.data.success) {
          setBlog(response.data.blogDetails);
        }
      } catch (error) {
        setError(error.response?.data?.msg || "Blog not found");
      } finally {
        setLoading(false);
      }
    }

    fetchBlog();
  }, [id]);

  // fetch comments helper function
  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/blog/getcomments/${id}`,
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        setComments(response.data.comments);
      }
    } catch (error) {
      console.log("error fetching comments:", error);
    }
  };

  // get comments
  useEffect(() => {
    fetchComments();
  }, [id]);

  // add comment
  async function handleCommentSubmit() {
    if (!comment.trim()) {
      setToastType("error");
      setToast("Please enter a comment");
      return;
    }

    try {
      const response = await axios.post(
        `${BACKEND_URL}/blog/addcomment`,
        {
          content: comment,
          blogId: id,
        },
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        await fetchComments();
        setComment("");
        setToastType("success");
        setToast("Comment added successfully!");
      }
    } catch (error) {
      console.log("error adding comment:", error);
      setToastType("error");
      setToast("Failed to add comment");
    }
  }

  // toast auto-dismiss
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="skeleton h-10 w-32 rounded-full mb-8" />
          <div className="skeleton h-80 w-full rounded-3xl mb-8" />
          <div className="flex items-center gap-4 mb-8">
            <div className="skeleton w-14 h-14 rounded-full" />
            <div>
              <div className="skeleton h-5 w-32 mb-2" />
              <div className="skeleton h-4 w-24" />
            </div>
          </div>
          <div className="skeleton h-12 w-3/4 mb-6" />
          <div className="space-y-3">
            <div className="skeleton h-5 w-full" />
            <div className="skeleton h-5 w-full" />
            <div className="skeleton h-5 w-5/6" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="text-center bg-white rounded-3xl p-12 shadow-lg max-w-md">
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
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">Post Not Found</h2>
          <p className="text-base-content/60 mb-8">{error}</p>
          <Link to="/">
            <button className="btn bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-0 rounded-full px-8">
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <article className="max-w-4xl mx-auto px-6 py-12">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="btn btn-ghost rounded-full px-6 gap-2 mb-8 hover:bg-gray-100"
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back
        </button>

        {/* Hero Image */}
        <div className="relative h-80 md:h-96 w-full overflow-hidden rounded-3xl mb-10 shadow-xl">
          <img
            src={blog.coverImageURL}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>

        {/* Author & Meta */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={blog.createdBy.profileurl}
                alt={blog.createdBy.fullname}
                className="w-14 h-14 rounded-full object-cover ring-4 ring-white shadow-md"
              />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <p className="font-semibold text-lg">{blog.createdBy.fullname}</p>
              <p className="text-sm text-base-content/60">
                {new Date(blog.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
                <span className="mx-2">•</span>5 min read
              </p>
            </div>
          </div>

          {/* Share buttons */}
          <div className="flex items-center gap-2">
            <button className="btn btn-ghost btn-circle">
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
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
            </button>
            <button className="btn btn-ghost btn-circle">
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
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
          {blog.title}
        </h1>

        {/* Body */}
        <div className="prose prose-lg max-w-none mb-16">
          <div className="text-lg leading-relaxed text-base-content/80 whitespace-pre-wrap">
            {blog.body}
          </div>
        </div>

        {/* Engagement Bar */}
        <div className="flex items-center justify-between py-6 border-y border-gray-200 mb-12">
          <div className="flex items-center gap-6">
            <button className="flex items-center gap-2 text-base-content/60 hover:text-red-500 transition-colors">
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <span className="font-medium">128</span>
            </button>
            <button className="flex items-center gap-2 text-base-content/60 hover:text-indigo-500 transition-colors">
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <span className="font-medium">{comments.length}</span>
            </button>
          </div>
          <button className="btn btn-ghost gap-2">
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
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
            Save
          </button>
        </div>

        {/* Add Comment Section */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 mb-8">
          <h3 className="text-xl font-bold mb-6">Leave a Comment</h3>
          <div className="flex gap-4">
            <div className="flex-1">
              <textarea
                className="w-full p-4 rounded-2xl bg-gray-50 border border-gray-200 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all resize-none"
                rows="3"
                placeholder="Share your thoughts..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleCommentSubmit();
                  }
                }}
              />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button
              onClick={handleCommentSubmit}
              className="btn bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white border-0 rounded-full px-8 gap-2"
            >
              Post Comment
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
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Comments Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">
            Comments ({comments.length})
          </h2>

          {comments.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-3xl">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <p className="text-base-content/60">
                No comments yet. Be the first to share your thoughts!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {comments.map((c) => (
                <div
                  key={c._id}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="shrink-0">
                      {c.createdBy.profileurl ? (
                        <img
                          src={c.createdBy.profileurl}
                          alt={c.createdBy.fullname}
                          className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold">
                          {c.createdBy.fullname.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <p className="font-semibold">{c.createdBy.fullname}</p>
                        <span className="text-xs text-base-content/50">
                          {new Date(c.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      <p className="text-base-content/80 leading-relaxed">
                        {c.content}
                      </p>
                      <div className="flex items-center gap-4 mt-3">
                        <button className="flex items-center gap-1 text-sm text-base-content/50 hover:text-indigo-500 transition-colors">
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
                              d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                            />
                          </svg>
                          Like
                        </button>
                        <button className="flex items-center gap-1 text-sm text-base-content/50 hover:text-indigo-500 transition-colors">
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
                              d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                            />
                          </svg>
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* More from Author */}
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-8">
          <div className="flex items-center gap-4 mb-4">
            <img
              src={blog.createdBy.profileurl}
              alt={blog.createdBy.fullname}
              className="w-16 h-16 rounded-full object-cover ring-4 ring-white shadow-lg"
            />
            <div>
              <p className="text-sm text-base-content/60">Written by</p>
              <p className="text-xl font-bold">{blog.createdBy.fullname}</p>
            </div>
          </div>
          <p className="text-base-content/70 mb-6">
            Follow for more stories and insights from this author.
          </p>
          <button className="btn bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-0 rounded-full px-8">
            Follow
          </button>
        </div>
      </article>

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

export default CardDetails;
