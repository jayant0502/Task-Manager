// AppRouter.js
import React from 'react';
import { Routes, Route } from 'react-router';
import LoginPage from './pages/LoginPage';
import TaskPage from './pages/TaskPage';
import RegisterPage from './pages/RegisterPage';

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/tasks" element={<TaskPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default AppRouter;
