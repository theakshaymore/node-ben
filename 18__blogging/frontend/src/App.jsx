import React, { useEffect, Suspense, lazy } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BACKEND_URL } from "./utils/config";

// redux imports
import { useDispatch } from "react-redux";
import { setLoading, setUser, clearUser } from "./store/authSlice";

const Navbar = lazy(() => import("./components/layout/Navbar"));
const Footer = lazy(() => import("./components/layout/Footer"));
const Signup = lazy(() => import("./components/auth/Signup"));
const Login = lazy(() => import("./components/auth/Login"));
const Home = lazy(() => import("./components/layout/Home"));
const Profile = lazy(() => import("./components/user/Profile"));
const AddBlog = lazy(() => import("./components/user/AddBlog"));
const NotFound = lazy(() => import("./components/layout/NotFound"));
const CardDetails = lazy(() => import("./components/user/CardDetails"));
const Loading = lazy(() => import("./components/layout/Loading"));

function App() {
  //
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      dispatch(setLoading(true));

      // Add artificial delay to see skeleton
      await new Promise((resolve) => setTimeout(resolve, 2000)); // 2 second delay

      try {
        const response = await axios.get(BACKEND_URL, {
          withCredentials: true,
        });
        dispatch(setUser(response.data.user));
      } catch (error) {
        dispatch(setUser(null));
      }

      dispatch(setLoading(false));
    };

    fetchUser();
  }, [dispatch]);

  return (
    <>
      {/* <h1>Ben Blogify</h1> */}
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />

          <main className="grow">
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/add" element={<AddBlog />} />
                <Route path="/blog/:id" element={<CardDetails />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>

          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;
