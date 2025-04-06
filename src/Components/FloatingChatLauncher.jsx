import React, { useState } from "react";
import CommunicationChatBot from "./CommunicationChatBot";
import { MessageCircle } from "lucide-react";

const FloatingChatLauncher = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Icon Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-blue-600 text-white rounded-full p-4 shadow-lg z-50 hover:bg-blue-700 transition-all"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* ChatBot Component with Close Prop */}
      {isOpen && <CommunicationChatBot onClose={() => setIsOpen(false)} />}
    </>
  );
};

export default FloatingChatLauncher;
