import React, { Suspense, lazy } from "react";
import { Link } from "react-router-dom";

const CardList = lazy(() => import("../user/CardList.jsx"));

function Home() {
  return (
    <div className="bg-linear-to-b from-gray-50 to-white">
      {/* Hero Section - Stunning visual impact */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage:
              "url(https://images.pexels.com/photos/34095239/pexels-photo-34095239.jpeg)",
          }}
        />

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/50 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/20 to-purple-900/20" />

        {/* Floating decoration elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full filter blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/20 rounded-full filter blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm mb-8">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            Join 10,000+ writers sharing their stories
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight leading-tight">
            Where Ideas
            <span className="block bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Come to Life
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-white/80 mb-12 font-light max-w-2xl mx-auto leading-relaxed">
            Discover stories, thinking, and expertise from writers on any topic
            that matters to you.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/profile">
              <button className="btn btn-lg bg-white text-gray-900 hover:bg-gray-100 rounded-full px-10 gap-2 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all border-0">
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
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
                Start Writing
              </button>
            </Link>
            <a
              href="#stories"
              className="btn btn-lg btn-ghost text-white hover:bg-white/10 rounded-full px-10 border-2 border-white/30"
            >
              Explore Stories
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
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 animate-bounce">
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative mt-20 z-20 max-w-5xl mx-auto px-6">
        <div className="bg-white rounded-3xl shadow-xl p-8 grid grid-cols-1 md:grid-cols-3 gap-8 border border-gray-100">
          <div className="text-center">
            <div className="text-4xl font-bold text-gradient mb-2">10K+</div>
            <div className="text-base-content/60">Active Writers</div>
          </div>
          <div className="text-center border-y md:border-y-0 md:border-x border-gray-100 py-8 md:py-0">
            <div className="text-4xl font-bold text-gradient mb-2">50K+</div>
            <div className="text-base-content/60">Stories Published</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-gradient mb-2">1M+</div>
            <div className="text-base-content/60">Monthly Readers</div>
          </div>
        </div>
      </div>
      {/* Content Section */}
      <section id="stories" className="pt-20">
        <Suspense
          fallback={
            <div className="max-w-7xl mx-auto px-6 py-20">
              <div className="flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            </div>
          }
        >
          <CardList />
        </Suspense>
      </section>
    </div>
  );
}

export default Home;
