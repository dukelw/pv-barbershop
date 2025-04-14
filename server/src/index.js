require("dotenv").config();
const cors = require("cors");
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const route = require("./routes");

const app = express();
const PORT = process.env.PORT || 4000;
// Create HTTP server
const server = http.createServer(app);

// Init Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.set("io", io);

io.on("connection", (socket) => {
  console.log("🔌 A user connected:", socket.id);

  socket.on("join_room", (userId) => {
    socket.join(userId);
    console.log(`✅ User ${userId} joined room ${userId}`);
  });

  socket.on("disconnect", () => {
    console.log("❌ A user disconnected:", socket.id);
  });
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./databases/connect-mongodb");

route(app);

const runningServer = server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

process.on("SIGINT", () => {
  runningServer.close(() => console.log("🛑 Exit server express"));
});

module.exports = { app, io };
