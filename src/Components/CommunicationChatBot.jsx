import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { X, Trash2 } from "lucide-react"; // Added Trash icon

const CommunicationChatBot = ({ onClose }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const chatRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem("chatHistory");
    if (saved) {
      setMessages(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const saveMessages = (msgs) => {
    const last10 = msgs.slice(-10);
    localStorage.setItem("chatHistory", JSON.stringify(last10));
    setMessages(last10);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { type: "user", text: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);

    try {
      const res = await axios.post(
        "https://devclash-backend.onrender.com/api/chat",
        { question: input }
      );

      const botMessage = {
        type: "bot",
        text: res.data.feedback || "🤖 No response received.",
      };

      saveMessages([...updatedMessages, botMessage]);
      setInput("");
    } catch (error) {
      console.error("API Error:", error);
      const errMessage = {
        type: "bot",
        text: "⚠ Sorry, there was a problem reaching your coach.",
      };
      saveMessages([...updatedMessages, errMessage]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  const clearHistory = () => {
    localStorage.removeItem("chatHistory");
    setMessages([]);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 w-[350px] h-[500px] bg-white rounded-xl shadow-xl border border-gray-300 flex flex-col overflow-hidden">
      
      {/* Chat Header */}
      <div className="sticky top-0 bg-blue-600 text-white px-4 py-3 flex items-center justify-between z-10">
        <span className="font-semibold text-lg">💬 Chat with Coach</span>
        <div className="flex items-center gap-2">
          <button onClick={clearHistory} title="Clear Chat">
            <Trash2 size={18} className="hover:text-yellow-300" />
          </button>
          <button onClick={onClose} title="Close">
            <X size={20} className="hover:text-red-400" />  
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-gray-50">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-lg text-sm whitespace-pre-wrap max-w-[80%] ${
              msg.type === "user"
                ? "bg-blue-100 text-right ml-auto"
                : "bg-gray-200 text-left"
            }`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={chatRef} />
      </div>

      {/* Input */}
      <div className="border-t px-3 py-2 bg-white flex gap-2">
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={handleSend}
          disabled={!input.trim()}
          className="bg-blue-600 text-white px-3 py-2 rounded text-sm disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default CommunicationChatBot;
