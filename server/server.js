import { createServer } from "http";
import { Server } from "socket.io";

import { Player } from "./player.js";

var players = {};

const server = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World");
});

var io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.sockets.on("connection", function (socket) {
  // CASE: New player joined
  socket.on("initialize", function (name) {
    console.log(name, "has connected!");
    var id = socket.id;
    const colors = ["red color", "purple color", "green color", "black color"];

    const random = Math.floor(Math.random() * colors.length);

    // Creates a new player object with a unique ID number.
    var newPlayer = new Player(id, name, colors[random]);

    // Adds the newly created player to the array.
    players[id] = newPlayer;

    // Sends the connecting client his unique ID, and data about the other players already connected.
    socket.emit("playerData", { id: id, players: players });

    // Sends everyone except the connecting player data about the new player.
    socket.broadcast.emit("playerJoined", newPlayer);
  });

  // CASE: Player moved
  socket.on("positionUpdate", function (data) {
    try {
      players[data.id].x = data.x;
      players[data.id].y = data.y;
      players[data.id].z = data.z;
      players[data.id].rx = data.rx;
    } catch (err) {}

    socket.broadcast.emit("playerMoved", data);
  });

  // CASE: Player disconnected
  socket.on("disconnect", function () {
    console.log("Got disconnect!", socket.id);

    // Remove player from array
    delete players[socket.id];

    // Sends the removed player's ID to each of the remaining players
    socket.broadcast.emit("playerDisconnected", socket.id);
  });
});

var portNum = 80;
console.log("Server started on port: ", portNum);
server.listen(portNum);
