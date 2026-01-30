import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { BACKEND_URL } from "../../utils/config.js";

function AddBlog() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", body);
    formData.append("image", image);

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
        setTimeout(() => {
          navigate("/profile");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error.response?.data?.msg || "Failed to create post");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <button
              onClick={() => navigate(-1)}
              className="btn btn-ghost btn-sm rounded-full gap-2 mb-4"
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
            <h1 className="text-4xl font-bold">Create New Post</h1>
            <p className="text-base-content/60 mt-2">
              Share your thoughts and ideas with the world
            </p>
          </div>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-8 p-6 rounded-2xl bg-green-50 border border-green-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-green-800">
                  Post Published!
                </h3>
                <p className="text-green-600 text-sm">
                  Redirecting to your profile...
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-8 p-6 rounded-2xl bg-red-50 border border-red-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-red-800">Error</h3>
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Cover Image Upload */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            <label className="block text-lg font-semibold mb-4">
              Cover Image
            </label>
            <div className="relative">
              {imagePreview ? (
                <div className="relative h-72 rounded-2xl overflow-hidden">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImage(null);
                      setImagePreview(null);
                    }}
                    className="absolute top-4 right-4 btn btn-sm btn-circle bg-black/50 border-0 text-white hover:bg-black/70"
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
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center h-72 rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors">
                  <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
                    <svg
                      className="w-8 h-8 text-indigo-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <span className="text-base-content/60 font-medium mb-1">
                    Click to upload cover image
                  </span>
                  <span className="text-sm text-base-content/40">
                    PNG, JPG up to 10MB
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              )}
            </div>
          </div>

          {/* Title */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            <label className="block text-lg font-semibold mb-4">Title</label>
            <input
              type="text"
              placeholder="Enter a captivating title..."
              className="w-full px-0 py-3 text-3xl font-bold bg-transparent border-0 border-b-2 border-gray-200 focus:border-indigo-500 focus:ring-0 transition-colors placeholder-gray-300"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Content */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            <label className="block text-lg font-semibold mb-4">Content</label>
            <textarea
              placeholder="Tell your story..."
              className="w-full px-0 py-3 text-lg bg-transparent border-0 focus:ring-0 resize-none min-h-[300px] placeholder-gray-300"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="btn btn-ghost rounded-full px-8"
            >
              Cancel
            </button>
            <div className="flex gap-3">
              <button
                type="button"
                className="btn btn-outline rounded-full px-8"
              >
                Save Draft
              </button>
              <button
                type="submit"
                disabled={loading || !title || !body || !image}
                className="btn bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white border-0 rounded-full px-8 gap-2 shadow-lg shadow-indigo-500/30 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    Publishing...
                  </>
                ) : (
                  <>
                    Publish
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
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddBlog;
