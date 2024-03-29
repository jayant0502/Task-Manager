const express = require("express");
const app = express();
const server = require("http").createServer(app);
const { Server: SocketServer } = require("socket.io");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");
require("./config/db");

// configuration to access env variables
dotenv.config({ path: path.resolve(__dirname, "./.env") });
const PORT = process.env.PORT;

const corsOptions = {
  origin: "*", // Allow requests from all origin
  methods: ["GET", "POST", "PUT", "DELETE"], // Allow these HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allow these headers
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use("/users", userRoutes);
app.use("/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Task Manager API is working" });
});

// Socket connection
const io = new SocketServer(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow these HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow these headers
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
  // listen for taskAdded events
  socket.on("taskAdded", (task) => {
    io.emit("taskAddedSuccessfully", task);
    console.log("New task added:", task);
  });
  // listen for taskDeleted events
  socket.on("taskDeleted", (task) => {
    io.emit("taskDeletedSuccessfully", task);
    console.log("New task added:", task);
  });
  // listen for taskUpdated events
  socket.on("taskUpdated", (task) => {
    io.emit("taskUpdatedSuccessfully", task);
    console.log("New task added:", task);
  });

  socket.on("error", (error) => {
    console.error("Socket error:", error);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
