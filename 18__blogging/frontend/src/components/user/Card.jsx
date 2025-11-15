import React from "react";
import { Link } from "react-router-dom";

function Card({ blog }) {
  return (
    <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
      <figure className="h-48">
        <img
          src={blog.coverImageURL}
          alt="cover-image"
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title line-clamp-2">{blog.title}</h2>
        <p className="text-sm text-base-content/70 line-clamp-3">{blog.body}</p>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-xs text-base-content/60">
            {new Date(blog.createdAt).toLocaleDateString()}
          </span>
          <Link to={`/blog/${blog._id}`}>
            <button className="btn btn-primary btn-sm">Read More</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Card;
