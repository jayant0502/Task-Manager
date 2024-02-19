// AppRouter.js
import React from 'react';
import { Routes, Route } from 'react-router';
import LoginPage from './pages/LoginPage';
import TaskPage from './pages/TaskPage';

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/tasks" element={<TaskPage />} />
    </Routes>
  );
}

export default AppRouter;
