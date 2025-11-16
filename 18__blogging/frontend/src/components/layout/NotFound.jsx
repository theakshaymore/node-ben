// components/layout/NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto">
        {/* 404 Number */}
        <h1 className="text-[12rem] md:text-[16rem] font-bold text-base-content/10 leading-none mb-8">
          404
        </h1>

        {/* Message */}
        <h2 className="text-3xl md:text-5xl font-bold mb-6">Page Not Found</h2>
        <p className="text-lg md:text-xl text-base-content/60 mb-12 leading-relaxed">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <button className="btn btn-primary btn-lg rounded-full px-8">
              Go Home
            </button>
          </Link>
          <Link to="/profile">
            <button className="btn btn-outline btn-lg rounded-full px-8">
              View Profile
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
