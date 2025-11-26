import React from "react";

function Loading() {
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

export default Loading;
