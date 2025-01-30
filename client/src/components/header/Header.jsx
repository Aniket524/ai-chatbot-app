import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="bg-base-100 border-b border-base-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 group"
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-lg font-bold text-primary-content">🤖</span>
            </div>
            <span className="text-2xl font-extrabold text-primary">
              AI Chat Application
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            <Link
              to="/"
              className="text-base-content hover:text-primary transition-all duration-300"
            >
              Home
            </Link>
            
            <Link
              to="/auth/login"
              className="px-4 py-2 rounded-lg bg-primary text-primary-content hover:bg-primary-focus transition-all duration-300"
            >
              Login
            </Link>
            
            <Link
              to="/auth/register"
              className="px-4 py-2 rounded-lg bg-secondary text-secondary-content hover:bg-secondary-focus transition-all duration-300"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;