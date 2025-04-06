import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { showToast } from "../Components/Toast";
import axios from "axios";

function InstructorSignUp() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    specialty: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Signup data:", formData);

    try {
      const response = await axios.post("http://localhost:3000/api/auth/instructor-signup", formData);

      console.log("Instructor registered successfully:", response.data);
      // alert("Signup successful! You can now log in.");
      showToast("Signup successful! You can now log in.")
      navigate("/instructor-signin");
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response.data.message);
        // alert(`Signup failed: ${error.response.data.message}`);
        showToast(`Signup failed: ${error.response.data.message}`)
      } else if (error.request) {
        console.error("No response from server:", error.request);
        // alert("Server did not respond. Please try again later.");
        showToast("Server did not respond. Please try again later.")
      } else {
        console.error("Axios error:", error.message);
        alert(`Error: ${error.message}`);
        showToast(`Error: ${error.message}`)
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-orange-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">Create Instructor Account 🧑‍🏫</h2>
        <p className="text-sm text-center text-gray-500 mb-6">Sign up to start teaching</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-3">
            <div className="w-1/2">
              <label className="block text-gray-700 mb-1">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700 mb-1">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Specialty</label>
            <select
              name="specialty"
              value={formData.specialty}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option value="">Select Subject Specialty</option>
              <option value="Biology">Biology</option>
              <option value="Maths">Maths</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Science">Science</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-md transition duration-300"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/instructor-signin" className="text-orange-600 hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default InstructorSignUp;
