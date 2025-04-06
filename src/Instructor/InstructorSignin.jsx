import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import useInstructorAuthStore from "../Store/InstructorAuthStore";
import { showToast } from "../Components/Toast";

function InstructorSignIn() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/auth/instructor-login", credentials);

      const { _id, firstName, email, token } = response.data;
      useInstructorAuthStore.getState().setInstructor({ _id, firstName, email, token });
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("instructorData", JSON.stringify(response.data));

      console.log("Login successful, instructor ID:", _id);
      showToast("login successfully")
      navigate("/instructor-homepage"); // redirect after login
    } catch (error) {
      console.error("Login failed:", error.response?.data?.message || error.message);
      // alert("Login failed: " + (error.response?.data?.message || "Something went wrong"));
      showToast("Login failed: " + (error.response?.data?.message || "Something went wrong"))
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 to-blue-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 120 }}
        className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Welcome Back Instructor 👋</h2>
        <p className="text-sm text-center text-gray-500 mb-6">Sign in to access your dashboard</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="john@example.com"
              value={credentials.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Your password"
              value={credentials.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-300"
          >
            Sign In
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link to="/instructor-signup" className="text-blue-600 hover:underline font-medium">
            Sign up now
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default InstructorSignIn;
