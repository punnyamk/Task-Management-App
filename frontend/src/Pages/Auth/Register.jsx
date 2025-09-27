import React, { useState } from "react";
import { useAuth } from "../../contexts/Auth.context";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const { register, error } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const success = await register(formData);
    setLoading(false);
    if (success) {
      alert("Registration successful!");
      navigate("/tasks");
    }
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
      <div className="flex items-center justify-center  ">
        <div className="bg-[#F8F9FACC] p-20 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-center text-2xl font-bold text-blue-600 mb-2">
            Register
          </h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full p-4 text-lg border-b border-gray-300 bg-gray-50 text-black-900 focus:outline-none focus:border-gray-500"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-4 text-lg border-b border-gray-300 bg-gray-50 text-black-900 focus:outline-none focus:border-gray-500"
              required
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full p-4 text-lg border-b border-gray-300 bg-gray-50 text-black-900 focus:outline-none focus:border-gray-500"
              required
            />
            <button
              type="submit"
              className="w-full text-black py-2 rounded-lg transition border border-white-900"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
          <p className="mt-4 text-center text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
