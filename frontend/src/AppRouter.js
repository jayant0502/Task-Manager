// AppRouter.js
import React from 'react';
import { Routes, Route } from 'react-router';
import LoginPage from './pages/user/LoginPage';
import TaskPage from './pages/TaskPage';
import RegisterPage from './pages/user/RegisterPage';
import HomePage from './pages/home/HomePage';

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/tasks" element={<TaskPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path='/home' element={<HomePage />} />
      
    </Routes>
  );
}

export default AppRouter;
