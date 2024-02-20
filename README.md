# Task Manager Application

## Introduction

The Task Manager Application is a web-based application that allows users to manage their tasks efficiently. It provides functionalities such as creating, updating, deleting tasks, and real-time updates using WebSocket technology.

## Features

User Authentication: Users can register, login, and manage their accounts securely.
Task Management: Users can create, update, and delete tasks.
Real-time Updates: Tasks are updated in real-time across all connected clients using WebSocket technology.

## Technologies Used

    Frontend: React.js
    Backend: Node.js, Express.js
    Database: MongoDB
    Authentication: JSON Web Tokens (JWT)
    Real-time Updates: Socket.IO

## Installation

1.  Clone the repository:
    git clone https://github.com/yourusername/task-manager.git

2.  Navigate to the project directory:
    cd task-manager

3.  Install dependencies for backend:

    ```
    cd backend
    npm install
    ```

4.  Set up environment variables:

    Create a .env file in the root directory of the backend. Define the following environment variables:

        -PORT: Port number for the server to listen on.
        -MONGODB_URI: URI for connecting to the MongoDB database.
        -JWT_SECRET: Secret key for JWT token generation.
        -DB_NAME: Name of Database

    Example .env file:

        PORT=8000
        MONGODB_URI=mongodb://localhost:27017/task-manager
        JWT_SECRET=mysecretkey
        DB_NAME: myDb

5.  Start the backend server:
    node index.js (you must be in the backend directory if not write command: cd backend )

## Integrating Socket.IO

1.  Install Socket.IO: If not already installed, install Socket.IO in your project using npm.

    ```
    npm install socket.io
    ```

2.  Set Up Socket.IO in Backend: Import and initialize Socket.IO in your index.js or main server file.
    ```
    const { createServer } = require("http");
    const express = require("express");
    const app = express();
    const server = createServer(app);
    const io = require("socket.io")(server);
    ```
3.  Socket.IO Event Handling: Implement event listeners for Socket.IO in your server file to handle connections, disconnections, and specific events.(server side integration )

    ```
    io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    });

    socket.on("taskAdded", (task) => {
    console.log("New task added:", task);
    io.emit("taskAddedSuccessfully", task);
    });

    socket.on("error", (error) => {
    console.error("Socket error:", error);
    });
    });
    ```

4.  Client-Side Integration: Connect to the Socket.IO server from your frontend application.

    ```
    import io from "socket.io-client";

    const socket = io.connect("http://localhost:8000", {
    withCredentials: true,
    });
    ```

5.  Handle Socket.IO Events: Implement event listeners in your frontend application to handle incoming events from the server.
    ```
    socket.on("taskAddedSuccessfully", (task) => {
    console.log("New task added to list:", task);
    // Handle the task update in the UI (e.g., update state or trigger a refresh)
    });
    ```

## API Endpoints

    The Task Manager backend API provides the following endpoints:

### Authentication

- POST /users/register: Register a new user.
  - POST /users/login: Login with existing user credentials.

### Task Management

- GET /tasks/getTask: Get all tasks for the authenticated user.
- POST /tasks/addTask: Add a new task for the authenticated user.
- GET /tasks/:id: Get a specific task by ID.
- PATCH /tasks/:id: Update a specific task by ID.
- DELETE /tasks/:id: Delete a specific task by ID.

## Usage

    Register/Login:
    Use the /users/register and /users/login endpoints to register a new user or login with existing credentials.

    Task Management:
    Use the /tasks endpoints to manage tasks. You can add, retrieve, update, or delete tasks as needed.

    Real-time Updates:
    Utilize Socket.IO for real-time updates on task additions or any other relevant events.

## Error Handling

    The API handles various error scenarios and returns appropriate error responses with status codes and error messages.

## Testing

    You can test the API endpoints using tools like Postman or by integrating them into your frontend application. Additionally, test real-time updates using Socket.IO by emitting events from the server and handling them in the frontend.
