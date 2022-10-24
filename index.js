const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    }
});

io.on("connection", (socket) => {
    console.log(`USER CONNECTED: ${socket.id}`);

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`USER WITH ID: ${socket.id} JOINED ROOM ${data}`);
    })

    socket.on("disconnecting", () => {
        console.log(socket.rooms);
    });

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
    });

    socket.on("disconnect", () => {
        console.log("USER DISCONNECTED: ", socket.id);
    });
});
server.listen(3001, () => {
    console.log("KUPTM CHAT SERVER RUNNING");
})