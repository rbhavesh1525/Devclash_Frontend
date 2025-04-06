import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { PlayCircle, AlertTriangle } from 'lucide-react';

const WarningPopup = ({ onOk }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-white rounded-lg p-6 max-w-md mx-4 shadow-xl"
    >
      <div className="flex items-center gap-3 text-orange-500 mb-4">
        <AlertTriangle className="w-6 h-6" />
        <h3 className="text-lg font-semibold">Warning</h3>
      </div>
      <p className="text-gray-700 mb-6">
        Exiting fullscreen mode during the test is not allowed.
      </p>
      <button
        onClick={onOk}
        className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors"
      >
        OK
      </button>
    </motion.div>
  </div>
);

const WeeklyTest = () => {
  const className = localStorage.getItem("studentclass");
  const userId = localStorage.getItem("studentid");
  const token = localStorage.getItem("token");

  const [questions, setQuestions] = useState([]);
  const [testId, setTestId] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [feedback, setFeedback] = useState("");
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [videoResources, setVideoResources] = useState([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const enterFullscreen = async () => {
    try {
      const element = document.documentElement;
      if (element.requestFullscreen) {
        await element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        await element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        await element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        await element.msRequestFullscreen();
      }
      setIsFullscreen(true);
      setShowWarning(false);
    } catch (error) {
      console.error("Error entering fullscreen:", error);
    }
  };

  useEffect(() => {
    if (!isSubmitted) {
      enterFullscreen();
    }

    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!(
        document.fullscreenElement ||
        document.mozFullScreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement
      );

      setIsFullscreen(isCurrentlyFullscreen);

      if (!isCurrentlyFullscreen && !isSubmitted) {
        setShowWarning(true);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, [isSubmitted]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `https://devclash-backend.onrender.com/api/test/weekly/${className}`
        );
        if (response.data.success && response.data.tests.length > 0) {
          const test = response.data.tests[0];
          setTestId(test._id);
          setQuestions(test.questions);
        } else {
          console.error("❌ No tests found for the given className.");
        }
      } catch (error) {
        console.error("❌ Error fetching questions:", error);
      }
    };

    if (className) {
      fetchQuestions();
    }
  }, [className]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];

    if (selectedOption === currentQuestion.correctAnswer) {
      setCorrectCount((prev) => prev + 1);
    } else {
      setWrongAnswers((prev) => [
        ...prev,
        {
          question: currentQuestion.questionText,
          userAnswer: selectedOption || "",
          correctAnswer: currentQuestion.correctAnswer,
        },
      ]);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      submitScore();
      setIsSubmitted(true);
      // Exit fullscreen when test is submitted
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  };

  const submitScore = async () => {
    const testScore = correctCount;

    if (!className || !token) {
      console.error("❌ Missing className or token", { className, token });
      setSubmissionMessage("Missing required user info. Please login again.");
      return;
    }

    try {
      await axios.post(
        'https://devclash-backend.onrender.com/api/profile/test-completed',
        {
          userId,
          testId,
          testScore,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSubmissionMessage("Test submitted successfully! 🎉");

      const feedbackRes = await axios.post(
        'https://devclash-backend.onrender.com/api/test-feedback',
        {
          questions: questions.map((q) => ({
            question: q.questionText,
            userAnswer: wrongAnswers.find(w => w.question === q.questionText)?.userAnswer || q.correctAnswer,
            correctAnswer: q.correctAnswer
          })),
        }
      );
      
      setFeedback(feedbackRes.data.feedback || "Thanks for completing the test!");
      setVideoResources(feedbackRes.data.youtubeResources || []);
      
    } catch (error) {
      console.error("❌ Error submitting test score:", error);
      setSubmissionMessage("Failed to submit score. Try again later.");
    }
  };

  const renderFormattedFeedback = (text) => {
    if (!text) return null;
    
    const parts = text.split(/(\*\*.*?\*\*)/g);
  
    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <div key={index} className="mt-2">
            <strong className="font-bold text-gray-900">{part.slice(2, -2)}</strong>
          </div>
        );
      }
      return (
        <span key={index} className="text-gray-700">{part}</span>
      );
    });
  };

  const VideoCard = ({ video }) => (
    <motion.div
      className="bg-white rounded-lg shadow-md overflow-hidden"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <a
        href={`https://www.youtube.com/watch?v=${video.videoId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <div className="relative">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
            <PlayCircle className="w-12 h-12 text-white" />
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 mb-2">
            {video.title}
          </h3>
          <div className="flex items-center text-sm text-gray-600">
            <span>{video.channelTitle}</span>
            <span className="mx-2">•</span>
            <span>{(video.views / 1000000).toFixed(1)}M views</span>
          </div>
        </div>
      </a>
    </motion.div>
  );

  if (!className) {
    return (
      <div className="container mx-auto p-6 text-center">
        <h1 className="text-3xl font-bold text-orange-600 mb-4">Error</h1>
        <p className="text-gray-600">Class name is not provided.</p>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-orange-600 mb-2">🎉 Test Submitted!</h1>
          <p className="text-gray-700 mb-2 text-lg">
            Your Score: <span className="font-bold">{correctCount}</span> / <span className="font-bold">{questions.length}</span>
          </p>
          <p className="text-green-600 font-semibold">{submissionMessage}</p>
        </div>

        <motion.div
          className="rounded-xl p-6 mb-6 shadow-xl bg-gradient-to-br from-orange-100 via-white to-orange-50 border border-orange-200"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-4">🧠 AI Feedback</h2>
          <div className="text-gray-700 text-lg leading-relaxed">
            {renderFormattedFeedback(feedback)}
          </div>
        </motion.div>

        {videoResources && videoResources.length > 0 && (
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold mb-6">
            📚 Recommended Learning Resources
          </h2>
          {videoResources.map((resource, index) => (
            
          
            <div key={index} className="mb-8">
              {console.log("My videos:",videoResources)}
              <h3 className="text-xl font-semibold mb-4 text-orange-600">
                {resource.topic}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resource.videos &&
                  resource.videos.map((video, vIndex) => (
                    <VideoCard key={vIndex} video={video} />
                  ))}
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {wrongAnswers && wrongAnswers.length > 0 && (
        <motion.div
          className="rounded-xl p-6 shadow-md bg-white border border-red-200 mt-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-xl font-bold text-red-600 mb-4">
            ❌ Incorrect Answers
          </h2>
          <ul className="space-y-4">
            {wrongAnswers.map((item, index) => (
              <li
                key={index}
                className="bg-red-50 p-4 rounded-md shadow-sm border border-red-100"
              >
                <p className="font-semibold text-gray-800">{item.question}</p>
                <p className="text-sm text-red-600">
                  Your Answer:{" "}
                  <strong>{item.yourAnswer || item.userAnswer}</strong>
                </p>
                <p className="text-sm text-green-600">
                  Correct Answer: <strong>{item.correctAnswer}</strong>
                </p>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
    );
  }

  if (questions.length === 0) {
    return <div className="text-center mt-10 text-gray-500">Loading questions...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <>
      {showWarning && (
        <WarningPopup onOk={enterFullscreen} />
      )}
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-center text-orange-600 mb-8">📝 Weekly-Assessment Test</h1>
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-6 transition-all"
          whileHover={{ scale: 1.02 }}
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4">{currentQuestion.questionText}</h2>
          <p className="text-gray-600 mb-2">
            Difficulty: <span className="font-bold">{currentQuestion.difficulty}</span>
          </p>
          <div className="space-y-4">
            {currentQuestion.options.map((option, index) => (
              <motion.button
                key={index}
                className={`w-full text-left bg-gray-100 rounded-lg p-2 transition-all duration-300 ${
                  selectedOption === option ? "bg-orange-200" : ""
                }`}
                onClick={() => handleOptionSelect(option)}
                whileHover={{ scale: 1.05 }}
              >
                {option}
              </motion.button>
            ))}
          </div>
       
          <button
            className="mt-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            onClick={handleNextQuestion}
            disabled={!selectedOption}
          >
            {currentQuestionIndex < questions.length - 1 ? "Next Question" : "Submit Test"}
          </button>
        </motion.div>
      </div>
    </>
  );
};

export default WeeklyTest;