import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom"; // To navigate to login or register

function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4">
            Talk to Your New AI Friend 🤖
          </h1>
          <p className="text-lg mb-6">
            Have a conversation with your personalized AI assistant and get answers that feel just right.
          </p>

          <div className="flex justify-center gap-8">
                <Link
                to="/auth/login"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg"
                >
                Log In
                </Link>
                <Link
                to="/auth/register"
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg text-lg"
                >
                Register
                </Link>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">AI Conversations</h2>
            <p className="text-gray-600">
              Have unlimited conversations with your AI friend. Discuss anything, anytime.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Smart Responses</h2>
            <p className="text-gray-600">
              Get responses tailored to your personality and preferences.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Friendly Experience</h2>
            <p className="text-gray-600">
              Enjoy a friendly, warm, and engaging experience with the AI.
            </p>
          </div>
        </div>
      </div>


      <footer className="bg-gray-800 py-8 mt-20">
        <div className="text-center text-white">
          <p>&copy; 2025 Your AI Assistant. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
