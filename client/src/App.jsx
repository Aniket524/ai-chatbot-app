import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/homepage/HomePage';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import ChatPage from './pages/mainpage/chatPage';
import FriendList from './pages/friends/FriendList';
import CreateFriend from './pages/friends/CreateFriend';

// ProtectedRoute Component
function ProtectedRoute({ children }) {
  const token = localStorage.getItem('authToken');
  console.log('Token:', token); // Debugging
  return token ? children : <Navigate to="/auth/login" replace />;
}

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/login" element={<Login />} />
          <Route
          path="/main/friends"
          element={<ProtectedRoute><FriendList /></ProtectedRoute>}
        />
        <Route
          path="/main/friends/create"
          element={<ProtectedRoute><CreateFriend /></ProtectedRoute>}
        />
        <Route
          path="/main/chat/:friendId"
          element={<ProtectedRoute><ChatPage /></ProtectedRoute>}
        />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
