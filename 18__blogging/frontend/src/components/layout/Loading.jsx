import React from "react";

function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
      <div className="text-center">
        {/* Animated Logo */}
        <div className="relative mb-8">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center animate-pulse">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </div>
          {/* Spinning ring */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 border-4 border-indigo-100 border-t-indigo-500 rounded-full animate-spin"></div>
          </div>
        </div>

        {/* Text */}
        <h2 className="text-2xl font-bold mb-2 text-gradient">Everblog</h2>
        <p className="text-base-content/60">Loading amazing content...</p>

        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2 mt-6">
          <div
            className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce"
            style={{ animationDelay: "0ms" }}
          ></div>
          <div
            className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce"
            style={{ animationDelay: "150ms" }}
          ></div>
          <div
            className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce"
            style={{ animationDelay: "300ms" }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default Loading;
