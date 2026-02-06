import React, { Suspense, lazy } from "react";
import { Link } from "react-router-dom";

const CardList = lazy(() => import("../user/CardList.jsx"));

function Home() {
  return (
    <div className="bg-linear-to-b from-gray-50 to-white">
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
