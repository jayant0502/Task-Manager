// websocket.js
// const socketIo = require('socket.io');
const { Server: SocketServer } = require("socket.io");

function setupWebSocketServer(server) {
  const io = new SocketServer(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    console.log('New WebSocket connection',socket.id);

    
    // Handle taskUpdated event from clients
    socket.on('taskUpdated', (taskId) => {
      // Broadcast the taskUpdated event to all connected clients
      
      console.log(`Message from ${socket.id}: ${taskId}`);
      io.emit('taskUpdated', taskId);
    });

    socket.on('disconnect', () => {
      console.log('WebSocket disconnected');
    });
  });
  return io; 
}

module.exports = {
  setupWebSocketServer,
};
