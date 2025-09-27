import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/Auth.context";

export default function Login() {
  const navigate = useNavigate();
  const { login, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) navigate("/tasks");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 relative">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full flex justify-between items-center py-4 px-8 z-50 shadow-md">
        <div className="text-2xl font-bold text-black">Listify</div>
        <div className="space-x-6">
          <Link className="text-black hover:text-blue-300">About us</Link>
          <Link className="text-black hover:text-blue-300">Contact</Link>
        </div>
      </nav>

      {/* Page Content */}
      <div className="pt-24 w-full max-w-md bg-[#F8F9FACC] p-20">
        <div className="">
          <h2 className="text-center text-2xl font-bold text-blue-600 mb-2">
            Login
          </h2>
          <p className="text-center text-gray-500 mb-6 text-sm">
            Welcome back! Sign in using your social account or email to continue
          </p>

          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

          <form className="space-y-4" onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-4 text-lg border-b border-gray-300 bg-gray-50 text-black-900 focus:outline-none focus:border-gray-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-4 text-lg border-b border-gray-300 bg-gray-100 text-black-900 focus:outline-none focus:border-gray-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="w-full text-black py-2 rounded-lg transition border border-white-900"
            >
              Login
            </button>
          </form>

          <div className="mt-4 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Register
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 w-full h-64 bg-gradient-to-r from-blue-100 to-white opacity-30 -z-10"></div>
    </div>
  );
}
