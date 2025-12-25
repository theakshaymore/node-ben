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

  // get comments
  useEffect(() => {
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

    fetchComments();
  }, [id]);

  // add comment
  async function handleCommentSubmit() {
    if (!comment.trim()) {
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
        setComments([response.data.comment, ...comments]);
        setComment("");
        setToast("Comment added successfully!");
      }
    } catch (error) {
      console.log("error adding comment:", error);
      setToast("Failed to add comment");
    }
  }

  // toast msg
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
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="skeleton h-96 w-full rounded-3xl mb-8" />
        <div className="skeleton h-12 w-3/4 mb-4" />
        <div className="skeleton h-6 w-1/2 mb-8" />
        <div className="space-y-3">
          <div className="skeleton h-4 w-full" />
          <div className="skeleton h-4 w-full" />
          <div className="skeleton h-4 w-5/6" />
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Blog Not Found</h2>
          <p className="text-base-content/60 mb-8">{error}</p>
          <Link to="/">
            <button className="btn btn-primary rounded-full px-8">
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-6 py-12">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="btn btn-ghost btn-sm rounded-full mb-8 gap-2"
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
      <div className="relative h-96 md:h-128 overflow-hidden rounded-3xl mb-12 bg-base-300">
        <img
          src={blog.coverImageURL}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Author & Date */}
      <div className="flex items-center gap-4 mb-8">
        <div className="avatar placeholder">
          <div className="bg-neutral text-neutral-content w-12 h-12 rounded-full">
            <span className="text-lg">{blog.createdBy.fullname.charAt(0)}</span>
          </div>
        </div>
        <div>
          <p className="font-semibold text-lg">{blog.createdBy.fullname}</p>
          <p className="text-sm text-base-content/60">
            {new Date(blog.createdAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
        {blog.title}
      </h1>

      {/* Body */}
      <div className="prose prose-lg max-w-none">
        <pre className="text-xl leading-relaxed text-base-content/80 whitespace-pre-wrap">
          {blog.body}
        </pre>
      </div>

      {/* Divider */}
      <div className="divider my-12"></div>

      {/* Actions */}
      <div className="flex gap-4">
        <Link to="/">
          <button className="btn btn-outline rounded-full">
            Read More Stories
          </button>
        </Link>
      </div>

      {/* Divider */}
      <div className="divider my-12"></div>

      {/* Comments Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">
          Comments ({comments.length})
        </h2>
        {comments.length === 0 ? (
          <p className="text-base-content/60">No comments yet. Be the first!</p>
        ) : (
          <div className="space-y-4">
            {comments.map((c) => (
              <div key={c._id} className="card bg-base-200 p-4">
                <div className="flex items-start gap-3">
                  <div className="avatar">
                    <div className="w-10 h-10 rounded-full">
                      {c.createdBy.profileurl ? (
                        <img
                          src={c.createdBy.profileurl}
                          alt={c.createdBy.fullname}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="bg-neutral text-neutral-content w-10 h-10 rounded-full flex items-center justify-center">
                          <span className="text-sm">
                            {c.createdBy.fullname.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold">{c.createdBy.fullname}</p>
                      <span className="text-xs text-base-content/60">
                        {new Date(c.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <p className="text-base-content/80">{c.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add comment section */}
      <div className="w-full">
        <h3 className="text-xl font-semibold mb-4">Add a Comment</h3>
        <div className="flex gap-3 items-start">
          <input
            type="text"
            className="input input-bordered flex-1"
            placeholder="Write your comment..."
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleCommentSubmit();
              }
            }}
          />
          <button
            className="btn btn-primary rounded-full px-6"
            onClick={handleCommentSubmit}
          >
            Comment
          </button>
        </div>
      </div>

      {/* Toast notification */}
      {toast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>{toast}</span>
          </div>
        </div>
      )}
    </article>
  );
}

export default CardDetails;
