import { useState } from "react";
import axios from "axios";
import useInstructorAuthStore from "../Store/InstructorAuthStore";
import { showToast } from "../Components/Toast";
function CreateQpaper() {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [duration, setDuration] = useState(60);
  const [questions, setQuestions] = useState([
    {
      questionText: "",
      options: ["", "", "", ""],
      correctAnswer: "",
    },
  ]);

  const handleQuestionChange = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[optIndex] = value;
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { questionText: "", options: ["", "", "", ""], correctAnswer: "" },
    ]);
  };


  const instructorId = useInstructorAuthStore((state)=>(state.instructorId))
  const setPaperId = useInstructorAuthStore((state) => state.setPaperId);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/qpaper/create",
        { instructorId, title, subject, duration, questions }
      );
  
      
      setPaperId(response.data.paperId); // Store it in zustand
      console.log("check for paper id ", response.data.paperId);
      console.log(response)
  
      // alert("🎉 Question paper created!");
      showToast("🎉 Question paper created!")
    } catch (error) {
      console.error("Error:", error);
      // alert("❌ Failed to create paper");
      alert("❌ Failed to create paper")
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-xl shadow-md p-8 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">📝 Create Mock Test</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="p-3 border border-gray-300 rounded-md"
            />
            <input
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              className="p-3 border border-gray-300 rounded-md"
            />
            <input
              type="number"
              placeholder="Duration (mins)"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
              className="p-3 border border-gray-300 rounded-md"
            />
          </div>

          {questions.map((q, qIndex) => (
            <div
              key={qIndex}
              className="bg-gray-50 border border-gray-200 p-5 rounded-lg shadow-sm"
            >
              <h3 className="text-lg font-semibold mb-2">Question {qIndex + 1}</h3>

              <input
                type="text"
                placeholder="Enter your question"
                value={q.questionText}
                onChange={(e) =>
                  handleQuestionChange(qIndex, "questionText", e.target.value)
                }
                required
                className="w-full mb-4 p-2 border border-gray-300 rounded-md"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                {q.options.map((opt, optIndex) => (
                  <input
                    key={optIndex}
                    type="text"
                    placeholder={`Option ${optIndex + 1}`}
                    value={opt}
                    onChange={(e) =>
                      handleOptionChange(qIndex, optIndex, e.target.value)
                    }
                    required
                    className="p-2 border border-gray-300 rounded-md"
                  />
                ))}
              </div>

              <input
                type="text"
                placeholder="Correct Answer (must match one of the options)"
                value={q.correctAnswer}
                onChange={(e) =>
                  handleQuestionChange(qIndex, "correctAnswer", e.target.value)
                }
                required
                className="w-full p-2 border border-green-400 rounded-md bg-green-50"
              />
            </div>
          ))}

          <div className="text-center">
            <button
              type="button"
              onClick={addQuestion}
              className="px-5 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
            >
              ➕ Add Question
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg"
          >
            ✅ Create Test
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateQpaper;
