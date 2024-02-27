import React, { createContext, useEffect, useState } from "react";
import axios from "axios";


export const TaskContext = createContext("");

const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const token = localStorage.getItem("token");
  const user= sessionStorage.getItem("userId");

  const allTasks = async () => {

    if (!token) {
      console.error("Token not found");
      return;
    }
    const tokenPayload = JSON.parse(atob(token.split(".")[1]));
    const ownerId = tokenPayload._id;

    const config = { headers: { Authorization: `bearer ${token}` } };

    

    try {
      const response = await axios.get(
        "http://localhost:8000/tasks/getTask",
        config
      );
      setTasks(response.data.tasks);
    } catch (error) {
      console.log(error);
    } 
  };


  useEffect(()=>{
    if(user){
        allTasks();
    }
  },[user])
  

  return (
    <TaskContext.Provider value={tasks}>{children}</TaskContext.Provider>
  );
};

export default TaskProvider;
