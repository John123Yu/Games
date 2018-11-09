import io from "socket.io-client";
const socket = io("localhost:3000");

// socket.emit("message", { message: "hello world" });
module.exports = socket;
