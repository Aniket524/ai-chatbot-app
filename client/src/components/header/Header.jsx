import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="bg-gray-800 text-white p-4 flex justify-between">
      <h1 className="text-xl font-bold">My App</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/auth/login" className="hover:underline">Login</Link>
        <Link to="/auth/register" className="hover:underline">Register</Link>
      </div>
    </div>
  );
};

export default Header;
