import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from './pages/homepage/HomePage';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import chatPage from './pages/mainpage/chatPage';

// ProtectedRoute Component
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("authToken");
  return token ? children : <Navigate to="/auth/login" replace />;
}

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/auth/register' element={<Register/>}/>
          <Route path='/auth/login' element={<Login/>}/>
          <Route path='/main/chatpage' element={
            <ProtectedRoute>
              <chatPage/>
            </ProtectedRoute>
            }/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
