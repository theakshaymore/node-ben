import React, { useState } from "react";
import axios from "axios";

import { BACKEND_URL } from "../../utils/config.js";

function AddBlog() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMesage] = useState("");
  const [loading, setLoading] = useState(false);

  const formData = new FormData();
  formData.append("title", title);
  formData.append("body", body);
  formData.append("image", image);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${BACKEND_URL}/blog/add`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        setLoading(false);
        setSuccess(true);
        setMesage(response.response?.data?.msg || "Blog added aplty!");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
      setMesage(error.response?.data?.msg || "Failed to create blog");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Create New Post</h1>
        <p className="text-base-content/60 mt-2">
          Share your thoughts with the world
        </p>
      </div>

      {error && (
        <div>
          <div role="alert" className="alert alert-error">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{message}</span>
          </div>
        </div>
      )}
      {success && (
        <div>
          <div role="alert" className="alert alert-success">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{message}</span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <input
            type="text"
            placeholder="Enter post title"
            className="input input-bordered w-full"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Content</label>
          <textarea
            placeholder="Write your content here..."
            className="textarea textarea-bordered w-full h-48 resize-none"
            value={body}
            onChange={(event) => setBody(event.target.value)}
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Cover Image</label>
          <input
            type="file"
            accept="image/*"
            className="file-input file-input-bordered w-full"
            onChange={(event) => setImage(event.target.files[0])}
          />
        </div>

        <div className="flex gap-3 pt-4">
          <button type="button" className="btn btn-outline flex-1">
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary flex-1"
            disabled={loading}
          >
            {loading ? "Publishing..." : "Publish"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddBlog;
