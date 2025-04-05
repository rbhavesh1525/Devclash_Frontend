import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const PractiseTest = () => {
  const location = useLocation();
  const { moduleId } = location.state || {};
  const className = localStorage.getItem("studentclass");
  const [testid,setTestid]=useState();

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [answers, setAnswers] = useState({}); // { 0: 'A', 1: 'B' ... }
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`https://devclash-backend.onrender.com/api/test/by-module/${moduleId}`);
        console.log("Fetched response:", response.data);

  
        if (response.data.success && response.data.tests && response.data.tests.questions) {
          setQuestions(response.data.tests.questions);
          console.log("ye test id hai ",response.data.tests._id);
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
  

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    const currentQ = questions[currentQuestionIndex];

    setAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: selectedOption
    }));

    // ✅ Check if correct
    if (selectedOption === currentQ.correctAnswer) {
      setScore((prev) => prev + 1);
    }

    // ✅ Move to next or submit
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      setIsSubmitted(true);
    }
  };

  const sendResult = async () => {
    const token = localStorage.getItem("token");
    const testId = testid

    const resultPayload = {
        token,
      testId,
      score,
    };

    try {
      console.log("Sending result payload:", resultPayload);

      const response = await axios.post(
        "https://devclash-backend.onrender.com/api/profile/test-completed",
        resultPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Result submitted successfully:", response.data);
    } catch (error) {
      console.error("Error submitting result:", error);
    }
  };

  const handleClose = () => {
    sendResult(); // Send the result to the backend
    // Optionally, navigate to another page or show a success message
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

  // ✅ Result Page
  if (isSubmitted) {
    return (
      <div className="container mx-auto p-6 text-center">
        <h1 className="text-3xl font-bold text-orange-600 mb-4">Test Submitted!</h1>
        <p className="text-gray-700 text-lg mb-6">
          You scored <span className="text-green-600 font-semibold">{score}</span> out of{" "}
          <span className="font-semibold">{questions.length}</span>
        </p>

        {/* ✅ Show summary */}
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
  );
};

export default PractiseTest;