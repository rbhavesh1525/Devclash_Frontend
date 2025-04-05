import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const PreAssessmentTest = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Fetch questions from the backend
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/questions'); // Adjust the URL as needed
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null); // Reset selected option for the next question
    } else {
      setIsSubmitted(true); // Submit the test if it's the last question
    }
  };

  if (isSubmitted) {
    return (
      <div className="container mx-auto p-6 text-center">
        <h1 className="text-3xl font-bold text-orange-600 mb-4">Test Submitted!</h1>
        <p className="text-gray-600">Thank you for completing the pre-assessment test.</p>
      </div>
    );
  }

  if (questions.length === 0) {
    return <div className="text-center">Loading questions...</div>;
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
              className={`w-full text-left bg-gray-100 rounded-lg p-2 transition-all duration-300 
                ${selectedOption === option ? 'bg-orange-200' : ''}`}
              onClick={() => handleOptionSelect(option)}
              whileHover={{ scale: 1.05 }}
            >
              {option}
            </motion.button>
          ))}
        </div>
        {selectedOption && (
          <p className="mt-4 text-gray-600">{currentQuestion.explanation}</p>
        )}
        <button
          className="mt-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          onClick={handleNextQuestion}
          disabled={!selectedOption} // Disable button if no option is selected
        >
          {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Submit Test'}
        </button>
      </motion.div>
    </div>
  );
};

export default PreAssessmentTest;