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

  const navigate = useNavigate();
  const { id } = useParams();

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
          setComments(comments, ...response.data.comments);
        }

        console.log(comments);
      } catch (error) {
        console.log("error in com");
      }
    };

    fetchComments();
  }, [comments]);

  async function handleCommentSubmit() {
    if (!comment.trim()) {
      alert("Please enter a comment");
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
        console.log("comment added");
        setComment("");
      }
    } catch (error) {
      console.log("error adding comment:", error);
    }
  }

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

      {/* Comment */}
      <div className="flex gap-4">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Comment</legend>
          <div className="join">
            <input
              type="text"
              className="input join-item"
              placeholder="comment something"
              value={comment}
              onChange={(event) => setComment(event.target.value)}
            />
            <button className="btn join-item" onClick={handleCommentSubmit}>
              Comment
            </button>
          </div>
        </fieldset>
      </div>
    </article>
  );
}

export default CardDetails;
