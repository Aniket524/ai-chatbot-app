import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 to-neutral text-primary-content">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Talk to Your New AI Friend 🤖
          </h1>
          <p className="text-lg mb-6 text-neutral-content">
            Have a conversation with your personalized AI assistant and get answers that feel just right.
          </p>

          <div className="flex justify-center gap-8">
            <Link
              to="/auth/login"
              className="bg-primary hover:bg-primary/90 text-primary-content px-6 py-3 rounded-lg text-lg transition-all hover:shadow-glow"
            >
              Log In
            </Link>
            <Link
              to="/auth/register"
              className="bg-secondary hover:bg-secondary/90 text-secondary-content px-6 py-3 rounded-lg text-lg transition-all hover:shadow-glow"
            >
              Register
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-base-200 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all backdrop-blur-sm border border-base-300/20">
            <h2 className="text-2xl font-semibold text-primary mb-4">AI Conversations</h2>
            <p className="text-neutral-content">
              Have unlimited conversations with your AI friend. Discuss anything, anytime.
            </p>
          </div>
          <div className="bg-base-200 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all backdrop-blur-sm border border-base-300/20">
            <h2 className="text-2xl font-semibold text-primary mb-4">Smart Responses</h2>
            <p className="text-neutral-content">
              Get responses tailored to your personality and preferences.
            </p>
          </div>
          <div className="bg-base-200 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all backdrop-blur-sm border border-base-300/20">
            <h2 className="text-2xl font-semibold text-primary mb-4">Friendly Experience</h2>
            <p className="text-neutral-content">
              Enjoy a friendly, warm, and engaging experience with the AI.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-base-300/50 py-8 mt-20 backdrop-blur-sm">
        <div className="text-center text-neutral-content">
          <p>&copy; 2025 Your AI Assistant. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;