import React, { useEffect } from "react";
import AppRouter from "./AppRouter";
import io from "socket.io-client";
import TaskProvider from "./context/TaskProvider";

function App() {
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
    });

    // Clean up the socket connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="App">

     <TaskProvider>
        <AppRouter />
      </TaskProvider>
    </div>
  );
}

export default App;
