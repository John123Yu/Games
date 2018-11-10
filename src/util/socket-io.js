import io from "socket.io-client";
// const socket = io("http://107.23.242.171", {
//   transports: ["websocket"],
//   upgrade: false
// });
const socket = io("localhost:4040", {
  transports: ["websocket"],
  upgrade: false
});

// socket.emit("message", { message: "hello world" });
module.exports = socket;
