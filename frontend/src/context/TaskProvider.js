import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import io from "socket.io-client";
export const TaskContext = createContext("");

const socket = io.connect("http://localhost:8000", {
  withCredentials: true,
});

const TaskProvider = ({ children, tasks }) => {
  const [allTask, setAllTasks] = useState([tasks]);
  const user = sessionStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const config = { headers: { Authorization: `bearer ${token}` } };

  const allTasks = async () => {
    if (!token) {
      console.error("Token not found");
      return;
    }
    try {
      const response = await axios.get(
        "http://localhost:8000/tasks/getTask",
        config
      );
      setAllTasks(response.data.tasks);
    } catch (error) {
      console.log(error);
    }
  };

  const resetTasks = () => {
    setAllTasks(null);
  };

  const deleteTaskId = (taskId) => {
    deleteTasks(taskId);
    console.log("aaa" + taskId);
  };

  const deleteTasks = async (taskId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/tasks/${taskId}`,
        config
      );
      console.log(response);
      socket.emit("taskDeleted", response.data);
      allTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const updateTaskId = ({taskId,data}) => {
    updateTasks({taskId,data});
    console.log("aaa" + taskId);
  }

  const updateTasks = async ({taskId , data})=>{

    try{

      const updatedTask = await axios.patch(`http://localhost:8000/tasks/${taskId}`,data,config);


    }
    catch(error){
      console.log(error);
    }

  }

  useEffect(() => {
    if (user) {
      allTasks();
    }
  }, [user, tasks]);

  return (
    <TaskContext.Provider value={{ allTask, resetTasks, deleteTaskId, socket }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;
