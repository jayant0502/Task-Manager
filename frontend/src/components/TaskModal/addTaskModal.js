import React, { useState } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import TaskCard from '../Card/TaskCard';
import Modal from '@mui/material/Modal';
import { Box, TextField, Button, Checkbox, FormControlLabel } from '@mui/material';

const socket = io('http://localhost:8000');

const AddTaskModal = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [important, setImportant] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
            setImportant(false);

      socket.emit('taskAdded', response.data); // Emit taskAdded event to the server

      console.log(response.data);
      handleClose();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <div>
      <Button onClick={handleOpen}>Add New Task</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="add-task-modal"
        aria-describedby="modal-to-add-new-task"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}>
          <h2>Add New Task</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <TextField
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
              />
            </div>
            <div>
              <TextField
                label="Description"
                multiline
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
              />
            </div>
            <div>
              <TextField
                label="Status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                fullWidth
              />
            </div>
            <div>
              <FormControlLabel
                control={<Checkbox
                  checked={important}
                  onChange={(e) => setImportant(e.target.checked)}
                  name="important"
                />}
                label="Mark as Important"
              />
            </div>
            <Button type="submit" variant="contained" color="primary">
              Add Task
            </Button>
          </form>
        </Box>
      </Modal>
      <div>
        <TaskCard title={title} description={description} status={status}></TaskCard>
      </div>
    </div>
  );
};

export default AddTaskModal;
