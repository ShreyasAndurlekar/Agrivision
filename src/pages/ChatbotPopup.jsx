// // import React, { useState } from "react";
// // import { useGemini } from 'geminiapi';

// // const ChatbotPopup = () => {
// //   const [isOpen, setIsOpen] = useState(false);
// //   const [messages, setMessages] = useState([]);
// //   const [userInput, setUserInput] = useState("");

// //   const toggleChatbot = () => {
// //     setIsOpen(!isOpen);
// //   };

// //   const sendMessage = async () => {
// //     if (!userInput.trim()) return;

// //     const newMessages = [...messages, { sender: "user", text: userInput }];
// //     setMessages(newMessages);
// //     setUserInput("");

// //     // Replace with actual chatbot API
// //     const response = await fetchChatbotResponse(userInput);
// //     setMessages([...newMessages, { sender: "bot", text: response }]);
// //   };

// //   const fetchChatbotResponse = async (userInput) => {
// //     return `You said: "${userInput}"`; // Placeholder response
// //   };

// //   return (
// //     <div>
// //       {/* Floating Button */}
// //       <button
// //         onClick={toggleChatbot}
// //         className="fixed bottom-4 right-4 bg-[#73974e] text-white p-4 rounded-full shadow-lg hover:bg-[#5d7d3c] z-50"
// //       >
// //         💬
// //       </button>

// //       {/* Chatbot Window */}
// //       {isOpen && (
// //         <div className="fixed bottom-16 right-4 w-80 h-96 bg-white shadow-lg rounded-lg flex flex-col z-50">
// //           <div className="flex items-center justify-between bg-[#73974e] text-white p-2 rounded-t-lg">
// //             <span className="font-bold">Chatbot</span>
// //             <button onClick={toggleChatbot} className="text-white font-bold">
// //               ✕
// //             </button>
// //           </div>
// //           <div className="flex-1 overflow-y-auto p-4">
// //             {messages.map((msg, index) => (
// //               <div
// //                 key={index}
// //                 className={`mb-2 p-2 rounded-lg ${
// //                   msg.sender === "user"
// //                     ? "bg-green-100 self-end text-right"
// //                     : "bg-gray-200 self-start"
// //                 }`}
// //               >
// //                 {msg.text}
// //               </div>
// //             ))}
// //           </div>
// //           <div className="p-2 flex items-center gap-2">
// //             <input
// //               type="text"
// //               value={userInput}
// //               onChange={(e) => setUserInput(e.target.value)}
// //               className="flex-1 p-2 border rounded-lg"
// //               placeholder="Type a message..."
// //             />
// //             <button
// //               onClick={sendMessage}
// //               className="bg-[#73974e] text-white px-4 py-2 rounded-lg hover:bg-[#5d7d3c]"
// //             >
// //               Send
// //             </button>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default ChatbotPopup;
// import React, { useState } from "react";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// const genAI = new GoogleGenerativeAI(import.meta.env.GEMINI_API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// // const fetchChatbotResponse = async (userInput) => {
// //   try {
// //     const result = await model.generateContent(userInput);
// //     const response = await result.response;
// //     return response.text();
// //   } catch (error) {
// //     console.error("Error fetching chatbot response:", error);
// //     return "Sorry, I couldn't process your request.";
// //   }
// // };
// const fetchChatbotResponse = async (userInput) => {
//     try {
//       const response = await model.generateContent(userInput);
//       return response.text(); // Ensure response.text() works correctly
//     } catch (error) {
//       console.error("Error fetching chatbot response:", error);
//       return "Sorry, I couldn't process your request.";
//     }
//   };
  

// const ChatbotPopup = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [userInput, setUserInput] = useState("");
//   const { sendMessage: sendGeminiMessage } = useGemini(); // Destructure the sendMessage function from useGemini

//   const toggleChatbot = () => {
//     setIsOpen(!isOpen);
//   };

//   const sendMessage = async () => {
//     if (!userInput.trim()) return;

//     const newMessages = [...messages, { sender: "user", text: userInput }];
//     setMessages(newMessages);
//     setUserInput("");

//     // Call the Gemini API to get the response
//     const response = await fetchChatbotResponse(userInput);
//     setMessages([...newMessages, { sender: "bot", text: response }]);
//   };

//   const fetchChatbotResponse = async (userInput) => {
//     try {
//       // Use the sendGeminiMessage function from the useGemini hook
//       const response = await sendGeminiMessage(userInput);
//       return response; // Assuming the response is a string or can be converted to one
//     } catch (error) {
//       console.error("Error fetching chatbot response:", error);
//       return "Sorry, I couldn't process your request."; // Fallback message in case of an error
//     }

//     // const { sendMessage: sendGeminiMessage } = useGemini({
//     //     apiKey: "GEMINI_API_KEY",
//     //   });
    
//   };

//   return (
//     <div>
//       {/* Floating Button */}
//       <button
//         onClick={toggleChatbot}
//         className="fixed bottom-4 right-4 bg-[#73974e] text-white p-4 rounded-full shadow-lg hover:bg-[#5d7d3c] z-50"
//       >
//         💬
//       </button>

//       {/* Chatbot Window */}
//       {isOpen && (
//         <div className="fixed bottom-16 right-4 w-80 h-96 bg-white shadow-lg rounded-lg flex flex-col z-50">
//           <div className="flex items-center justify-between bg-[#73974e] text-white p-2 rounded-t-lg">
//             <span className="font-bold">Chatbot</span>
//             <button onClick={toggleChatbot} className="text-white font-bold">
//               ✕
//             </button>
//           </div>
//           <div className="flex-1 overflow-y-auto p-4">
//             {messages.map((msg, index) => (
//               <div
//                 key={index}
//                 className={`mb-2 p-2 rounded-lg ${
//                   msg.sender === "user"
//                     ? "bg-green-100 self-end text-right"
//                     : "bg-gray-200 self-start"
//                 }`}
//               >
//                 {msg.text}
//               </div>
//             ))}
//           </div>
//           <div className="p-2 flex items-center gap-2">
//             <input
//               type="text"
//               value={userInput}
//               onChange={(e) => setUserInput(e.target.value)}
//               className="flex-1 p-2 border rounded-lg"
//               placeholder="Type a message..."
//             />
//             <button
//               onClick={sendMessage}
//               className="bg-[#73974e] text-white px-4 py-2 rounded-lg hover:bg-[#5d7d3c]"
//             >
//               Send
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatbotPopup;
import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY); // Ensure the key is correctly set in .env
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const ChatbotPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

//   const fetchChatbotResponse = async (userInput) => {
//     try {
//       const result = await model.generateContent(userInput);
//       return result.text(); // Extract text from the response
//     } catch (error) {
//       console.error("Error fetching chatbot response:", error);
//       return "Sorry, I couldn't process your request.";
//     }
//   };
const fetchChatbotResponse = async (userInput) => {
    try {
      const result = await model.generateContent(userInput);
      console.log("API Response:", result);
  
      // Extract content or handle errors gracefully
      return result.content || "No valid response received.";
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
        <div className="fixed bottom-16 right-4 w-80 h-96 bg-white shadow-lg rounded-lg flex flex-col z-50">
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
