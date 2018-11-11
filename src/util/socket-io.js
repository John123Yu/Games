import io from "socket.io-client";
import blackjack from "../containers/blackjack";
// const socket = io("http://107.23.242.171", {
//   transports: ["websocket"],
//   upgrade: false
// });
const socket = io("localhost:4040/namespace", {
  transports: ["websocket"],
  upgrade: false
});

// socket.emit("message", { message: "hello world" });

// console.log("SOCKET", socket);
module.exports = socket;

// NAMESPACES TO SEPRATE FUNCTIONS SUCH AS CHAT OR blackjack???
// ROOMS TO create seperate rooms with same functions???
