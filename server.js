const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port = 3000;

app.use(express.static("public"));

io.on("connection", (socket) => {
  socket.on("rollDice", (dice) => {
    io.emit("newRollDice", dice);
  });

  socket.on("textMessage", (msg) => {
    io.emit("newTextMessage", msg);
  });

  socket.on("disconnect", () => {
    console.log(`User ${socket.id} disconnected!`);
  });
});

server.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
