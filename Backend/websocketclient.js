const io = require("socket.io-client");

const socket = io.connect("http://localhost:8000", {
  withCredentials: true,
});

socket.on("connect", () => {
  console.log("Connected to server");
});

socket.emit("taskAdded", {id:'123', task:"hello"});

socket.on('taskAdded',(task) => {
    console.log("Task added:",task)
}
)
socket.on("taskUpdated", (task) => {
  console.log("Task updated:", task);
});

socket.on("taskDeleted", (taskId) => {
  console.log("Task deleted:", taskId);
});

socket.on("disconnect", () => {
  console.log("Disconnected from server");
});
