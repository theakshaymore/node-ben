import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { BACKEND_URL } from "../../utils/config.js";

function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleSignup = async (event) => {
    event.preventDefault();
    setError("");
    setToast("");

    try {
      setLoading(true);
      const response = await axios.post(
        `${BACKEND_URL}/user/signup`,
        { fullName, email, password },
        { withCredentials: true }
      );
      setLoading(false);

      if (response.data.success) {
        setToast("Account created! Redirecting...");
        setTimeout(() => {
          navigate("/login", { replace: true });
        }, 1500);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      setError(error.response?.data?.msg || "Signup failed");
      setToast(error.response?.data?.msg || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-gray-50 via-white to-purple-50">
      <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Illustration */}
        <div className="hidden lg:block">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl filter blur-3xl"></div>
            <div className="relative bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl p-12 text-white">
              <h2 className="text-4xl font-bold mb-6">Join Our Community</h2>
              <p className="text-white/80 text-lg mb-8 leading-relaxed">
                Create an account and start sharing your unique stories with
                readers around the world.
              </p>

              {/* Features */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
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
                  </div>
                  <span>Powerful writing tools</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
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
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <span>Connect with other writers</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
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
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                  <span>Track your growth</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/20">
                <div className="text-center">
                  <div className="text-2xl font-bold">10K+</div>
                  <div className="text-white/60 text-sm">Writers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">50K+</div>
                  <div className="text-white/60 text-sm">Stories</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">1M+</div>
                  <div className="text-white/60 text-sm">Readers</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div>
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100">
            {/* Header */}
            <div className="text-center mb-10">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                  />
                </svg>
              </div>
              <h1 className="text-3xl font-bold mb-2">Create Account</h1>
              <p className="text-base-content/60">
                Start your writing journey today
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSignup} className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-500/10 transition-all"
                    placeholder="John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                  <svg
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-500/10 transition-all"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <svg
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-500/10 transition-all"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <svg
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Must be at least 8 characters
                </p>
              </div>

              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm checkbox-primary mt-1"
                  required
                />
                <span className="text-sm text-gray-600">
                  I agree to the{" "}
                  <a
                    href="#"
                    className="text-purple-600 hover:text-purple-700 font-medium"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="text-purple-600 hover:text-purple-700 font-medium"
                  >
                    Privacy Policy
                  </a>
                </span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    Creating account...
                  </>
                ) : (
                  <>
                    Create Account
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
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </>
                )}
              </button>
            </form>

            {/* Sign In Link */}
            <p className="text-center mt-8 text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-purple-600 hover:text-purple-700 font-semibold"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Toast notification */}
      {toast && (
        <div className="toast toast-top toast-center z-50">
          <div
            className={`alert ${
              error ? "alert-error" : "alert-success"
            } shadow-lg rounded-xl`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {error ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              )}
            </svg>
            <span>{toast}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Signup;
