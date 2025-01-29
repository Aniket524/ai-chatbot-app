// App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/homepage/HomePage';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import ChatPage from './pages/mainpage/chatPage';
import FriendList from './pages/friends/FriendList';
import CreateFriend from './pages/friends/CreateFriend';
import Header from './components/header/Header';
import ProtectedHeader from './components/header/ProtectedHeader';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('authToken');
  return token ? children : <Navigate to="/auth/login" replace />;
}

function PublicRoute({ children }) {
  const token = localStorage.getItem('authToken');
  return token ? <Navigate to="/main/friends" replace /> : children;
}

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <div className="fixed w-full top-0 z-50">
      <BrowserRouter>
        {isAuthenticated ? (
          <ProtectedHeader setIsAuthenticated={setIsAuthenticated} />
        ) : (
          <Header />
        )}

        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute>
                <HomePage />
              </PublicRoute>
            }
          />
          <Route
            path="/auth/register"
            element={
              <PublicRoute>
                <Register setIsAuthenticated={setIsAuthenticated} />
              </PublicRoute>
            }
          />
          <Route
            path="/auth/login"
            element={
              <PublicRoute>
                <Login setIsAuthenticated={setIsAuthenticated} />
              </PublicRoute>
            }
          />

          <Route
            path="/main/friends"
            element={
              <ProtectedRoute>
                <FriendList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/main/friends/create"
            element={
              <ProtectedRoute>
                <CreateFriend />
              </ProtectedRoute>
            }
          />
          <Route
            path="/main/chat/:friendId"
            element={
              <ProtectedRoute>
                <ChatPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;