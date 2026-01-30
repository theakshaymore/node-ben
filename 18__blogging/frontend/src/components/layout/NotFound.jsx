import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-b from-gray-50 to-white">
      <div className="text-center max-w-lg">
        {/* Illustration */}
        <div className="relative mb-8">
          <div className="text-[12rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-purple-200 select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center animate-bounce">
              <svg
                className="w-16 h-16 text-white"
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
          </div>
        </div>

        {/* Content */}
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Page Not Found</h1>
        <p className="text-base-content/60 text-lg mb-8 leading-relaxed">
          Oops! The page you're looking for seems to have wandered off. Let's
          get you back on track.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <button className="btn bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white border-0 rounded-full px-8 gap-2 shadow-lg shadow-indigo-500/30 w-full sm:w-auto">
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
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Go Home
            </button>
          </Link>
          <button
            onClick={() => window.history.back()}
            className="btn btn-outline rounded-full px-8 gap-2 w-full sm:w-auto"
          >
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
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Go Back
          </button>
        </div>

        {/* Help Links */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-base-content/50 mb-4">
            Looking for something specific?
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link
              to="/"
              className="text-indigo-600 hover:text-indigo-700 font-medium"
            >
              Browse Stories
            </Link>
            <span className="text-gray-300">•</span>
            <Link
              to="/profile"
              className="text-indigo-600 hover:text-indigo-700 font-medium"
            >
              My Profile
            </Link>
            <span className="text-gray-300">•</span>
            <Link
              to="/add"
              className="text-indigo-600 hover:text-indigo-700 font-medium"
            >
              Write a Post
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
