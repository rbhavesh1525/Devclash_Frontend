import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function InstructorNavbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check login status on mount
  useEffect(() => {
    const storedLogin = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(storedLogin === "true");
  }, []);

  const toggleAuth = () => {
    if (isLoggedIn) {
      // Logout flow
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("instructorData");
      setIsLoggedIn(false);
      navigate("/instructor-homepage"); // optionally redirect after logout
    } else {
      // Navigate to sign-in page
      navigate("/instructor-signin ");
    }
  };

  return (
    <nav className="w-full h-16 bg-gray-800 text-white flex items-center justify-between px-6 fixed top-0 left-0 z-40 shadow-md">
      <div className="w-1/3"></div>

      <div className="w-1/3 text-center text-xl font-semibold hover:text-orange-500">
        Instructor Panel
      </div>

      <div className="w-1/3 text-right">
        <button
          onClick={toggleAuth}
          className="bg-orange-400 hover:bg-orange-500 text-white px-4 py-1 rounded cursor-pointer"
        >
          {isLoggedIn ? "Logout" : "Sign In"}
        </button>
      </div>
    </nav>
  );
}

export default InstructorNavbar;
