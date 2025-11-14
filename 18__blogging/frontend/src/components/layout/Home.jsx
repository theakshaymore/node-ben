import React from "react";
import { Link } from "react-router-dom";
// import CardList from "../user/CardList.jsx";

function Home() {
  return (
    <div>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url(https://images.pexels.com/photos/34095239/pexels-photo-34095239.jpeg)",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Welcome to Everblog</h1>
            <p className="mb-5">
              Discover amazing stories, share your thoughts, and connect with
              writers from around the world. Start your blogging journey today!
            </p>
            <Link to="/profile">
              <button className="btn btn-primary">Get Started</button>
            </Link>
          </div>
        </div>
      </div>

      {/* Cardlist */}
      {/* <CardList /> */}
    </div>
  );
}

export default Home;
