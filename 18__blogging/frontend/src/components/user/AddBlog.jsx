import React, { useState } from "react";

function AddBlog() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [imageURL, setImageURL] = useState("");

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Create New Post</h1>
        <p className="text-base-content/60 mt-2">
          Share your thoughts with the world
        </p>
      </div>

      <form className="space-y-6">
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
            value={imageURL}
            onChange={(event) => setImageURL(event.target.value)}
          />
        </div>

        <div className="flex gap-3 pt-4">
          <button type="button" className="btn btn-outline flex-1">
            Cancel
          </button>
          <button type="submit" className="btn btn-primary flex-1">
            Publish
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddBlog;
