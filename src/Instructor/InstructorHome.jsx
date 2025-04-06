import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FileText, BarChart2, BookOpen, PenTool } from "lucide-react";

function InstructorHome() {
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const handleComingSoon = (message) => {
    setPopupMessage(message);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000); // auto close after 2s
  };

  const options = [
    {
      label: "Create Mock Test",
      description: "Design questions for your students easily.",
      link: "/instructor-qpaper",
      icon: <FileText size={32} className="text-orange-500" />,
      comingSoon: false,
    },
    {
      label: "Check Result",
      description: "View and evaluate student performance.",
      link: "/check-result",
      icon: <BarChart2 size={32} className="text-blue-500" />,
      comingSoon: true,
    },
    {
      label: "Add Course",
      description: "Share your knowledge with new courses.",
      link: "/upload-video",
      icon: <BookOpen size={32} className="text-purple-500" />,
      comingSoon: false,
    },
    {
      label: "Write Blog",
      description: "Inspire learners through your words.",
      link: "/write-blog",
      icon: <PenTool size={32} className="text-green-500" />,
      comingSoon: true,
    },
  ];

  return (
    <div className="pt-20 pl-64 pr-10 min-h-screen bg-gray-100 relative">
      <h1 className="text-2xl font-bold mb-8 text-gray-800">Welcome, Instructor 👨‍🏫</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {options.map((opt, index) =>
          opt.comingSoon ? (
            <div
              key={index}
              onClick={() => handleComingSoon(`${opt.label} – Coming Soon! 🚧`)}
              className="cursor-pointer bg-white shadow-md rounded-xl p-6 h-40 flex flex-col justify-center items-center text-center border border-transparent 
                         hover:border-orange-500 hover:text-orange-500 transition-all duration-300 group"
            >
              <div className="mb-3 group-hover:scale-110 transition-transform">{opt.icon}</div>
              <h2 className="text-lg font-semibold mb-1">{opt.label}</h2>
              <p className="text-sm text-gray-600 group-hover:text-orange-400">{opt.description}</p>
            </div>
          ) : (
            <Link
              key={index}
              to={opt.link}
              className="bg-white shadow-md rounded-xl p-6 h-40 flex flex-col justify-center items-center text-center border border-transparent 
                         hover:border-orange-500 hover:text-orange-500 transition-all duration-300 group"
            >
              <div className="mb-3 group-hover:scale-110 transition-transform">{opt.icon}</div>
              <h2 className="text-lg font-semibold mb-1">{opt.label}</h2>
              <p className="text-sm text-gray-600 group-hover:text-orange-400">{opt.description}</p>
            </Link>
          )
        )}
      </div>

      {/* Coming Soon Popup */}
      {showPopup && (
        <div className="fixed bottom-8 right-8 bg-orange-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce">
          {popupMessage}
        </div>
      )}

      {/* Extras */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">More for You</h2>
        <div className="bg-white p-4 rounded-md shadow text-gray-700">
          📊 View platform insights, student interactions, and feedback soon...
        </div>
      </div>
    </div>
  );
}

export default InstructorHome;
