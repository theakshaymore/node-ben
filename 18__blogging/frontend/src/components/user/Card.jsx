import React from "react";
import { Link } from "react-router-dom";

function Card({ blog }) {
  return (
    <Link to={`/blog/${blog._id}`}>
      <article className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
        {/* Image Container */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={blog.coverImageURL}
            alt={blog.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Read time badge */}
          <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-medium text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            5 min read
          </div>

          {/* Read story indicator */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-white font-medium text-sm">Read story</span>
            <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <svg
                className="w-4 h-4 text-white"
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
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Author & Date */}
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <img
                src={blog.createdBy.profileurl}
                alt={blog.createdBy.fullname}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-sm"
              />
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm truncate">
                {blog.createdBy.fullname}
              </p>
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
          <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-indigo-600 transition-colors duration-300 leading-tight">
            {blog.title}
          </h3>

          {/* Excerpt */}
          <p className="text-base-content/60 line-clamp-2 text-sm leading-relaxed mb-4">
            {blog.body}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center gap-4 text-base-content/50 text-xs">
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
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                24
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
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                8
              </span>
            </div>
            <button
              className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
              onClick={(e) => e.preventDefault()}
            >
              <svg
                className="w-4 h-4 text-base-content/50"
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
          </div>
        </div>
      </article>
    </Link>
  );
}

export default Card;
