import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY; // Ensure the key is correctly set in .env
const genAI = new GoogleGenerativeAI(API_KEY); // Ensure the key is correctly set in .env
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const ChatbotPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const fetchChatbotResponse = async (userInput) => {
    try {
      const result = await model.generateContent(userInput);
      const response = await result.response;
      return response.text(); // Extract text from the response
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
      return "Sorry, I couldn't process your request.";
    }
  };


  const sendMessage = async () => {
    if (!userInput.trim()) return;

    // Add user's message
    const newMessages = [...messages, { sender: "user", text: userInput }];
    setMessages(newMessages);
    setUserInput("");
    setIsLoading(true);

    try {
      // Get chatbot response
      const botResponse = await fetchChatbotResponse(userInput);
      setMessages([...newMessages, { sender: "bot", text: botResponse }]);
    } catch (error) {
      setMessages([
        ...newMessages,
        { sender: "bot", text: "Sorry, something went wrong. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Your browser does not support voice recognition. Please use Google Chrome.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false; // Stop after one phrase
    recognition.lang = "auto"; // Set language
    recognition.interimResults = false; // Do not return interim results

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setUserInput(transcript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <div>
      {/* Floating Button */}
      <button
        onClick={toggleChatbot}
        className="fixed bottom-4 right-4 bg-[#73974e] text-white p-4 rounded-full shadow-lg hover:bg-[#5d7d3c] z-50"
      >
        💬
      </button>
      

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-16 right-4 w-90 h-96 bg-white shadow-lg rounded-lg flex flex-col z-50">
          <div className="flex items-center justify-between bg-[#73974e] text-white p-2 rounded-t-lg">
            <span className="font-bold">Chatbot</span>
            <button onClick={toggleChatbot} className="text-white font-bold">
              ✕
            </button>
          </div>

          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto p-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 p-2 rounded-lg ${
                  msg.sender === "user"
                    ? "bg-green-100 self-end text-right"
                    : "bg-gray-200 self-start"
                }`}
              >
                {msg.text}
              </div>
            ))}
            {isLoading && (
              <div className="mb-2 p-2 rounded-lg bg-gray-200 self-start">
                Typing...
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-2 flex items-center gap-2">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="flex-1 p-2 border rounded-lg"
              placeholder="Type a message..."
              disabled={isLoading}
            />
            {/* Voice Input Button */}
            <button
              onClick={startListening}
              className={`p-2 rounded-full ${
                isListening ? "bg-red-500" : "bg-blue-500"
              } text-white hover:bg-blue-600`}
              title="Click to speak"
            >
              🎤
            </button>
            <button
              onClick={sendMessage}
              disabled={!userInput.trim() || isLoading}
              className={`px-4 py-2 rounded-lg text-white ${
                userInput.trim() && !isLoading
                  ? "bg-[#73974e] hover:bg-[#5d7d3c]"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              {isLoading ? "Sending..." : "Send"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotPopup;
