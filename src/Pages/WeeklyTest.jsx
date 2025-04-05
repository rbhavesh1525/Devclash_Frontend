import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

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
          userAnswer: selectedOption,
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
          className,
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

      // send for feedback
      const feedbackRes = await axios.post(
        'https://devclash-backend.onrender.com/api/test-feedback',
        {
          questions: questions.map((q, i) => ({
            question: q.questionText,
            userAnswer: wrongAnswers.find(w => w.question === q.questionText)?.userAnswer || q.correctAnswer,
            correctAnswer: q.correctAnswer
          })),
        }
      );

      setFeedback(feedbackRes.data.feedback || "Thanks for completing the test!");
    } catch (error) {
      console.error("❌ Error submitting test score:", error?.response?.data || error);
      setSubmissionMessage("Failed to submit score. Try again later.");
    }
  };

  const renderFormattedFeedback = (text) => {
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
          <p className="text-gray-700 text-lg leading-relaxed">
            {renderFormattedFeedback(feedback)}
          </p>
        </motion.div>

        {wrongAnswers.length > 0 && (
          <motion.div
            className="rounded-xl p-6 shadow-md bg-white border border-red-200"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-xl font-bold text-red-600 mb-4">❌ Incorrect Answers</h2>
            <ul className="space-y-4">
              {wrongAnswers.map((item, index) => (
                <li key={index} className="bg-red-50 p-4 rounded-md shadow-sm">
                  <p className="font-semibold text-gray-800">{item.question}</p>
                  <p className="text-sm text-red-600">
                    Your Answer: <strong>{item.userAnswer}</strong>
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
  );
};

export default WeeklyTest;
