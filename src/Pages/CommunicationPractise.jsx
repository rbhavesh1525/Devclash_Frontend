import { useState } from "react";

function CommunicationPractise() {
  const [userInput, setUserInput] = useState("");
  const [botResponse, setBotResponse] = useState("");

  const handleSend = async () => {
    if (!userInput.trim()) return;
    setBotResponse("Thinking...");
    const reply = await getGeminiReply(userInput);
    setBotResponse(reply);
  };


  const getGeminiReply = async (text) => {
    const res = await fetch("http://localhost:5000/api/ask-gemini", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });
  
    const data = await res.json();
    console.log("Gemini Raw Response:", data);
  
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, couldn't understand.";
  };
  

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-r from-blue-100 to-purple-100">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 space-y-4">
        <h2 className="text-2xl font-bold text-purple-700">Talk to AI</h2>
        <textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          className="w-full p-3 border rounded-lg"
          rows="4"
          placeholder="Ask me anything..."
        />
        <button
          onClick={handleSend}
          className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-lg font-semibold transition"
        >
          Send
        </button>
        <div className="bg-gray-100 p-4 rounded-lg mt-4">
          <strong className="text-gray-700">AI Response:</strong>
          <p className="mt-2 text-gray-800 whitespace-pre-wrap">{botResponse}</p>
        </div>
      </div>
    </div>
  );
}

export default CommunicationPractise;
