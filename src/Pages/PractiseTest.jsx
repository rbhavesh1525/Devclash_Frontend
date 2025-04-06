import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

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

const PractiseTest = () => {
  const location = useLocation();
  const { moduleId } = location.state || {};
  const className = localStorage.getItem("studentclass");
  const [testId, setTestid] = useState();

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [answers, setAnswers] = useState({});
  const [testScore, setScore] = useState(0);
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
        const response = await axios.get(`https://devclash-backend.onrender.com/api/test/by-module/${moduleId}`);
        console.log("Fetched response:", response.data);

        if (response.data.success && response.data.tests && response.data.tests.questions) {
          setQuestions(response.data.tests.questions);
          setTestid(response.data.tests._id);
        } else {
          console.error('No questions found in the test.');
        }
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    if (moduleId) {
      fetchQuestions();
    }
  }, [moduleId]);

  useEffect(() => {
    // Enter fullscreen mode when the component mounts
    enterFullscreen();
  }, []);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    const currentQ = questions[currentQuestionIndex];

    setAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: selectedOption
    }));

    if (selectedOption === currentQ.correctAnswer) {
      setScore((prev) => prev + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
    } else {
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

  const sendResult = async () => {
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        'https://devclash-backend.onrender.com/api/profile/test-completed',
        {
          testId,
          testScore,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Error submitting result:", error);
    }
  };

  const handleClose = () => {
    sendResult();
  };

  if (!className) {
    return (
      <div className="container mx-auto p-6 text-center">
        <h1 className="text-3xl font-bold text-orange-600 mb-4">Error</h1>
        <p className="text-gray-600">Class name is not provided.</p>
      </div>
    );
  }

  if (questions.length === 0) {
    return <div className="text-center">Loading questions...</div>;
  }

  if (isSubmitted) {
    return (
      <div className="container mx-auto p-6 text-center">
        <h1 className="text-3xl font-bold text-orange-600 mb-4">Test Submitted!</h1>
        <p className="text-gray-700 text-lg mb-6">
          You scored <span className="text-green-600 font-semibold">{testScore}</span> out of{" "}
          <span className="font-semibold">{questions.length}</span>
        </p>

        <div className="space-y-6 text-left">
          {questions.map((q, index) => {
            const userAnswer = answers[index];
            const isCorrect = userAnswer === q.correctAnswer;
            return (
              <div key={index} className="p-4 border rounded shadow">
                <p className="font-semibold mb-1">{index + 1}. {q.questionText}</p>
                <p className="text-sm mb-1">Your Answer: <span className={isCorrect ? 'text-green-600' : 'text-red-600'}>{userAnswer || 'Not answered'}</span></p>
                {!isCorrect && (
                  <p className="text-sm text-blue-700">Correct Answer: {q.correctAnswer}</p>
                )}
                <p className="text-gray-500 text-sm italic mt-1">Explanation: {q.explanation}</p>
              </div>
            );
          })}
        </div>

        <button
          className="mt-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          onClick={handleClose}
        >
          Close
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <>
      {showWarning && (
        <WarningPopup onOk={enterFullscreen} />
      )}
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-center text-orange-600 mb-8">Pre-Assessment Test</h1>
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-6 transition-all"
          whileHover={{ scale: 1.02 }}
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4">{currentQuestion.questionText}</h2>
          <p className="text-gray-600 mb-2">Difficulty: <span className="font-bold">{currentQuestion.difficulty}</span></p>
          <div className="space-y-4">
            {currentQuestion.options.map((option, index) => (
              <motion.button
                key={index}
                className={`w-full text-left rounded-lg p-2 transition-all duration-300 border 
                  ${selectedOption === option ? 'bg-orange-200 border-orange-400' : 'bg-gray-100 border-gray-200'}`}
                onClick={() => handleOptionSelect(option)}
                whileHover={{ scale: 1.05 }}
              >
                {option}
              </motion.button>
            ))}
          </div>

          <button
            className="mt-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            onClick={handleNextQuestion}
            disabled={!selectedOption}
          >
            {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Submit Test'}
          </button>
        </motion.div>
      </div>
    </>
  );
};

export default PractiseTest;