import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ChatPage = () => {
  const { friendId } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

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

  const sendMessage = async () => {
    if (!input.trim()) return;
    setLoading(true);

    const userMessage = { sender: "user", message: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        `http://localhost:5000/api/chat/${friendId}`,
        { message: input },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setTimeout(() => {
        setMessages((prevMessages) => [...prevMessages, ...response.data.messages]);
        setIsTyping(false);
        setLoading(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to send message:", err);
      setIsTyping(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [friendId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Chat Messages Section with bottom padding */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 pb-24">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p className="text-lg">Start chatting with your friend!</p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender === "user" ? "justify-end chat chat-end" : "justify-start chat chat-start"}`}
            >
              <div
                className={`max-w-md p-4 rounded-lg ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-800"
                }`}
              >
                <div className="chat-bubble">{`${msg.sender === "user" ? "You: " : ""}${msg.message}`}</div>
              </div>
            </div>
          ))
        )}

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

        <div ref={chatEndRef} />
      </div>

      {/* Fixed Input Section at Bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
        <div className="max-w-4xl mx-auto p-2">
          <div className="flex items-center space-x-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type a message..."
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-all"
              disabled={loading}
            >
              {/* {loading ? "Sending..." : "Send"} */}
              send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;