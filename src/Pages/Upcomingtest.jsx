import React, { useEffect, useState } from "react";
import useInstructorAuthStore from "../Store/InstructorAuthStore";
import axios from "axios";
import { motion } from "framer-motion";
import { showToast } from "../Components/Toast";
const Upcomingtest = () => {
  const paperId = useInstructorAuthStore((state) => state.paperId);
  const [questions, setQuestions] = useState([]);
  const [paper, setPaper] = useState(null);
  const [loading, setLoading] = useState(true);
  const [started, setStarted] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  console.log("paper id aa gyi", paperId);

  useEffect(() => {
    const fetchPaper = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/testsoln/get/${paperId}`
        );
        console.log("✅ Fetched Paper:", response.data);
        setPaper(response.data);
        setQuestions(response.data.questions);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch paper:", error);
      }
    };

    if (paperId) {
      fetchPaper();
    }
  }, [paperId]);

  // ⏳ Timer Logic
  useEffect(() => {
    let timer;
    if (started && remainingTime > 0) {
      timer = setInterval(() => {
        setRemainingTime((prev) => prev - 1);
      }, 1000);
    }

    if (remainingTime === 0 && started) {
      // Test ends automatically
      setStarted(false);
    }

    return () => clearInterval(timer);
  }, [started, remainingTime]);

  const handleStart = () => {
    setStarted(true);
    setRemainingTime(paper.duration * 60); // duration in seconds
  };

  const handleOptionChange = (qIndex, option) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [qIndex]: option,
    }));
  };

  const handleSubmit = () => {
    console.log("User selected answers:", selectedAnswers);
    setStarted(false); // stop test
    
    showToast("test submitted successfully ✅") 
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  if (loading) return <div className="text-center p-10">Loading test...</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8 mt-20"
    >
      <h2 className="text-3xl font-bold mb-2 text-center text-blue-900">
        Upcoming Test: {paper.title}
      </h2>
      <p className="text-center text-gray-500 mb-4">
        Subject: <span className="font-semibold">{paper.subject}</span> | Duration:{" "}
        <span className="font-semibold">{paper.duration} mins</span>
      </p>

      {!started && remainingTime === 0 && (
        <div className="text-center mt-6">
          <button
            className="bg-blue-900 text-white px-6 py-2 rounded-xl hover:bg-orange-400 transition cursor-pointer"
            onClick={handleStart}
          >
            Start Test
          </button>
        </div>
      )}

      {started && (
        <>
          <p className="text-center text-green-600 text-lg mb-6 font-medium">
            🕒 Time Left: {formatTime(remainingTime)}
          </p>

          <div className="space-y-6">
            {questions.map((q, index) => (
              <div key={index} className="border rounded-xl p-4 bg-gray-50">
                <p className="font-semibold mb-2">
                  Q{index + 1}: {q.questionText}
                </p>
                <ul className="space-y-1">
                  {q.options.map((option, optIdx) => (
                    <li key={optIdx}>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name={`q${index}`}
                          value={option}
                          checked={selectedAnswers[index] === option}
                          onChange={() => handleOptionChange(index, option)}
                          disabled={!started}
                        />
                        {option}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button
              onClick={handleSubmit}
              className="bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700 transition"
            >
              Submit Test
            </button>
          </div>
        </>
      )}

      {!started && remainingTime === 0 && (
        <p className="text-center text-sm text-gray-400 mt-4">Test not started yet.</p>
      )}

      {!started && remainingTime !== 0 && (
        <p className="text-center text-sm text-red-500 mt-4">Time is over ⌛</p>
      )}
    </motion.div>
  );
};

export default Upcomingtest;
