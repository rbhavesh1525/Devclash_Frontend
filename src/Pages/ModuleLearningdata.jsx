import { useEffect, useState } from "react";
import TopNavBar from "../Components/TopNavBar";
function ModuleLearningdata() {
  const [data, setData] = useState({
    article: "",
    videos: [],
  });
  const [mainVideo, setMainVideo] = useState("");
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = {
        article: "https://www.englishspeakingexample.com/article-communication",
        videos: [
          "https://www.youtube.com/embed/d0yGdNEWdn0",
          "https://www.youtube.com/embed/G3e-cpL7ofc",
          "https://www.youtube.com/embed/EyPfdp5dSnA",
        ],
      };
      setData(response);
      setMainVideo(response.videos[0]); // Default main video
    };
    fetchData();
  }, []);

  

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
            <a
              href={data.article}
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
