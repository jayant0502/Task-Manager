import React, { useEffect, useState } from "react";
import AppRouter from "./AppRouter";
import io from "socket.io-client";
import TaskProvider from "./context/TaskProvider";

function App() {

  const [tasks , setTasks]= useState([])
  useEffect(() => {
    // Establish a WebSocket connection to the server
    const socket = io.connect("http://localhost:8000", {
      withCredentials: true,
    });
    socket.on("connect", () => {
      console.log("Connected to server");
    });
    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    // Add event listeners for handling incoming events
    socket.on("taskAddedSuccessfully", (task) => {
      console.log("New task added to list:", task);
      // Handle the task update in the UI (e.g., update state or trigger a refresh)
      setTasks((prevTasks)=>[...prevTasks, task])
    });
    socket.on("taskDeletedSuccessfully", (task) => {
      console.log("Task deletd form the list:", task);
      // Handle the task update in the UI (e.g., update state or trigger a refresh)
      
    });

    // Clean up the socket connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="App">

     <TaskProvider tasks={tasks}>
        <AppRouter />
      </TaskProvider>
    </div>
  );
}

export default App;
