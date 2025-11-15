import React from "react";
import { Link } from "react-router-dom";
import CardList from "../user/CardList.jsx";

function Home() {
  return (
    <div className="bg-base-100">
      {/* Hero Section - More focused, less cluttered */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.pexels.com/photos/34095239/pexels-photo-34095239.jpeg)",
          }}
          // "url(https://images.pexels.com/photos/34095239/pexels-photo-34095239.jpeg)",
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/40 to-black/60" />

        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-8 tracking-tight">
            Everblog
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-12 font-light leading-relaxed">
            Where stories come alive and ideas find their voice
          </p>
          <Link to="/profile">
            <button className="btn btn-lg btn-primary rounded-full px-8 hover:scale-105 transition-transform">
              Start Writing
            </button>
          </Link>
        </div>
      </div>

      {/* Content Section */}
      <CardList />
    </div>
  );
}

export default Home;
