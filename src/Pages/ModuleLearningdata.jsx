import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useAuthStore from "../Store/authStore";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PractiseTest from "./PractiseTest";

function ModuleLearningdata() {
  
  const navigate = useNavigate(); 
  const location = useLocation();
  const { modelid,modulename, subject_Id } = location.state || {}; // Safely access state
  console.log("Module Name:", modulename);
  console.log("Subject ID:", subject_Id);
  console.log("Module ID:",modelid)
  
  const className = localStorage.getItem("studentclass");
  const [moduleData, setModuleData] = useState([]); // Initialize as an array
  const [loading, setLoading] = useState(true);
  
  
  const [data, setData] = useState({
    article: "",
    videos: [],
  });
  const [mainVideo, setMainVideo] = useState("");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const grade = useAuthStore((state) => state.studentclass);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://devclash-backend.onrender.com/api/videos/${modulename}/${grade}`);
        const result = await response.json();

        // Assuming the API response structure matches the provided example
        setData({
          article: "https://www.englishspeakingexample.com/article-communication", // Replace with your article route
          videos: result.videos.map(video => `https://www.youtube.com/embed/${video.videoId}`), // Embed URLs
        });
        setMainVideo(`https://www.youtube.com/embed/${result.videos[0].videoId}`); // Default main video
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (modulename && grade) { // Ensure modulename and grade are defined before fetching
      fetchData();
    }
  }, [modulename, grade]);

  useEffect(() => {
    const fetchModuleData = async () => {
      if (!subject_Id || !className) {
        console.error("No subject ID or class name provided");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`https://devclash-backend.onrender.com/api/module/${subject_Id}/${className}`);
        console.log("API Response:", response.data); // Log the response data
        setModuleData(response.data);
        console.log("mazadata",moduleData) // Set the response data directly

      } catch (error) {
        console.error('Error fetching module data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchModuleData();
  }, [subject_Id]);

  return (
    <div className="p-6 md:p-10 bg-gradient-to-br bg-gray-200 rounded-2xl shadow-2xl min-h-screen">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Section: Main Video + Thumbnails */}
        <div className="md:w-1/2 flex flex-col items-center gap-4">
          {/* Main Video */}
          <div
            className="w-160 h-80 bg-white rounded-xl shadow-xl border-2 border-white-300 overflow-hidden cursor-pointer"
            onClick={() => setSelectedVideo(mainVideo)}
          >
            <iframe
              className="w-full h-full pointer-events-none rounded-xl"
              src={mainVideo}
              title="Main Video"
              frameBorder="0"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-4 flex-wrap justify-center">
            {data.videos.map((video, index) => (
              <div
                key={index}
                onClick={() => setMainVideo(video)}
                className="w-50 h-50 bg-white rounded-lg shadow border border-blue-400 overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-200"
              >
                <iframe
                  className="w-full h-full pointer-events-none"
                  src={video}
                  title={`Thumbnail ${index}`}
                  frameBorder="0"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section: Article + Button */}
        <div className="md:w-1/2 flex flex-col justify-between bg-white rounded-xl shadow-lg p-6 space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-purple-700 mb-4">Article</h2>
            {console.log("mazi-id",moduleData)}
            <button
              className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg"
              onClick={() => navigate('/practisetest',{ state: { moduleId: moduleData.id, subject_Id: subject_Id } })}
            >
              Practice Module
            </button>
            <hr></hr>
            <a
              href="https://www.englishspeakingexample.com/article-communication" // Replace with your article route
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline text-lg hover:text-blue-800 transition cursor-pointer"
            >
              Read about Communication Skills →
            </a>
          </div>
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-full transition duration-300 shadow-md w-full cursor-pointer">
            Want Our Experts’ Videos?
          </button>
        </div>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="w-[90%] md:w-[60%] aspect-video bg-white rounded-xl shadow-xl relative">
            <iframe
              className="w-full h-full rounded-xl"
              src={selectedVideo + "?autoplay=1"}
              title="Video Player"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute -top-4 -right-4 bg-red-500 hover:bg-red-600 text-white font-bold rounded-full w-10 h-10 text-xl flex items-center justify-center shadow-md cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ModuleLearningdata;  