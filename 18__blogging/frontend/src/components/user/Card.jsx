import React from "react";
import { Link } from "react-router-dom";

function Card({ blog }) {
  return (
    <Link to={`/blog/${blog._id}`}>
      <article className="group cursor-pointer">
        {/* Image */}
        <div className="relative h-56 mb-5 overflow-hidden rounded-2xl bg-base-300">
          <img
            src={blog.coverImageURL}
            alt={blog.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="space-y-3">
          {/* Author & Date */}
          <div className="flex items-center gap-3 text-sm">
            <div className="avatar placeholder">
              <div className="bg-neutral text-neutral-content w-8 h-8 rounded-full">
                <img
                  src={blog.createdBy.profileurl}
                  alt={blog.createdBy.fullname}
                  className="w-8 h-8 rounded-full object-cover"
                />
              </div>
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm">{blog.createdBy.fullname}</p>
              <p className="text-xs text-base-content/50">
                {new Date(blog.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold line-clamp-2 group-hover:text-primary transition-colors">
            {blog.title}
          </h3>

          {/* Excerpt */}
          <p className="text-base-content/60 line-clamp-2 leading-relaxed">
            {blog.body}
          </p>

          {/* Read More Indicator */}
          <div className="flex items-center gap-2 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
            <span>Read story</span>
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default Card;
