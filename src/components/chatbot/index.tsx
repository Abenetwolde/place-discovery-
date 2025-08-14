import React, { useState, useEffect, useRef } from "react";
import { Bot, MessageCircle, Send } from "lucide-react";

// Helper function to call the Gemini API with exponential backoff
const callGeminiAPI = async (chatHistory, retries = 3, delay = 1000) => {
  const payload = { contents: chatHistory };
  const apiKey = "";
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=AIzaSyBxmq1zLK3CoLCJWbBCOmDC0ywEB8QIPr0`;

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      if (response.status === 429 && retries > 0) {
        // Exponential backoff for rate limiting
        await new Promise(resolve => setTimeout(resolve, delay));
        return callGeminiAPI(chatHistory, retries - 1, delay * 2);
      }
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();

    if (result.candidates && result.candidates.length > 0 && result.candidates[0].content && result.candidates[0].content.parts && result.candidates[0].content.parts.length > 0) {
      return result.candidates[0].content.parts[0].text;
    } else {
      console.error("Gemini API response structure is unexpected.");
      return "I'm sorry, I couldn't generate a response. Please try again.";
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "There was an error communicating with the server.";
  }
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to the bottom of the chat window when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return;

    const userMessage = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const chatHistory = [...messages, userMessage];
      const botResponse = await callGeminiAPI(chatHistory);
      setMessages(prev => [...prev, { role: "assistant", content: botResponse }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Chat Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-200"
      >
        {isOpen ? <Bot size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-24 right-6 w-80 h-96 bg-white border border-gray-300 rounded-lg shadow-xl z-50 flex flex-col transition-transform duration-300 ease-in-out transform ${
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b bg-gray-100 rounded-t-lg">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Bot size={20} className="text-blue-600" />
            AI Assistant
          </h3>
        </div>
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] p-3 rounded-lg ${
                  msg.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="max-w-[70%] p-3 rounded-lg bg-gray-200 text-gray-800 italic">
                Typing...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSendMessage} className="p-4 border-t flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isTyping}
          />
          <button
            type="submit"
            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            disabled={isTyping}
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </>
  );
}
