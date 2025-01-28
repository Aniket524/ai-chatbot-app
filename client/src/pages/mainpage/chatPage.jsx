import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ChatPage = () => {
  const { friendId } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false); // State for typing indicator
  const chatEndRef = useRef(null);

  // Fetch messages from the backend
  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(`http://localhost:5000/api/chat/${friendId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(response.data.messages);
    } catch (err) {
      console.error("Failed to fetch messages:", err);
    }
  };

  // Send a message to the backend
  const sendMessage = async () => {
    if (!input.trim()) return; // Don't send empty messages
    setLoading(true); // Set loading state to true

    // Add the user's message to the chat immediately
    const userMessage = { sender: "user", message: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput(""); // Clear the input field

    // Show typing indicator
    setIsTyping(true);

    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        `http://localhost:5000/api/chat/${friendId}`,
        { message: input },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Simulate typing delay (e.g., 2 seconds)
      setTimeout(() => {
        setMessages((prevMessages) => [...prevMessages, ...response.data.messages]); // Add AI's response
        setIsTyping(false); // Hide typing indicator
        setLoading(false); // Set loading state to false
      }, 2000); // Adjust the delay as needed
    } catch (err) {
      console.error("Failed to send message:", err);
      setIsTyping(false); // Hide typing indicator in case of error
      setLoading(false); // Set loading state to false
    }
  };

  // Fetch messages when the component mounts or friendId changes
  useEffect(() => {
    fetchMessages();
  }, [friendId]);

  // Scroll to the bottom of the chat when messages are updated
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Chat Messages Section */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-md p-4 rounded-lg ${
                msg.sender === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-800"
              }`}
            >
              {msg.message} {/* Display the message text */}
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="max-w-md p-4 bg-white text-gray-800 rounded-lg">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce mr-2"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce mr-2 delay-100"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}

        <div ref={chatEndRef} /> {/* Invisible div to scroll to the bottom */}
      </div>

      {/* Message Input Section */}
      <div className="p-4 bg-white border-t">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)} // Update the input state
            onKeyPress={(e) => e.key === "Enter" && sendMessage()} // Send message on Enter key
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type a message..."
            disabled={loading} // Disable input while loading
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-all"
            disabled={loading} // Disable button while loading
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;