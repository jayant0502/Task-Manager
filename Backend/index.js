const express = require("express");
const app = express();
const server = require("http").createServer(app);
const { Server: SocketServer } = require("socket.io");
const cors = require("cors");

const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const PORT = process.env.PORT;
require("./config/db");

const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");

app.use(express.json());
app.use("/users", userRoutes);
app.use("/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Task Manager API is working" });
});

const corsOptions = {
  origin: "http://localhost:3000", // Allow requests from this origin
  methods: ["GET", "POST", "PUT", "DELETE"], // Allow these HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allow these headers
};

app.use(cors(corsOptions));

const io = new SocketServer(server, {
  cors: {
    origin: "http://localhost:8000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
  // socket.on("taskAdded", (task) => {
  //   console.log("New task added:", task);
  //   socket.broadcast.emit("taskAdded", task);
  // });

  socket.on("error", (error) => {
    console.error("Socket error:", error);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
