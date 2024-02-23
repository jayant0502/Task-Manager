import React, { useState } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import TaskCard from '../components/Card/TaskCard';

const socket = io('http://localhost:8000');
const AddTaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token not found');
        return;
      }
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      const ownerId = tokenPayload._id;
      const config = {
        headers: {
          Authorization: `bearer ${token}`,
        },
      };

      const response = await axios.post('http://localhost:8000/tasks/addTask', {
        title,
        description,
        status,
        owner: ownerId,
      }, config);

      setTitle('');
      setDescription('');
      setStatus('');

      socket.emit('taskAdded', response.data); // Emit taskAdded event to the server

      console.log(response.data);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <div>
      <h2>Add New Task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
          <label>Status:</label>
          <input type="text" value={status} onChange={(e) => setStatus(e.target.value)} />
        </div>
        <button type="submit">Add Task</button>
      </form>

      <div>
        <TaskCard title={title} description={description} status={status}></TaskCard>
      </div>
    </div>
  );
};

export default AddTaskForm;
