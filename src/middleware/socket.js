import { serverIoUrl } from "../config";
import io from "socket.io-client";

import { ADD_MESSAGE, EMIT_MESSAGE, SOCKET_CONNECT } from "../actions/index";

const createMySocketMiddleware = () => {
  let socket;
  let room;
  return storeAPI => next => action => {
    switch (action.type) {
      case SOCKET_CONNECT: {
        room = `/item/${action.payload.id}`;
        socket = createMyWebsocket(room);

        socket.emit("name", {
          username: action.payload.username
        });

        socket.on("messages", data => {
          storeAPI.dispatch({
            type: ADD_MESSAGE,
            payload: data
          });
        });
        return;
      }
      case EMIT_MESSAGE: {
        socket.emit("message", {
          message: action.payload.message,
          username: action.payload.username
        });
        return;
      }
    }
    return next(action);
  };
};

module.exports = createMySocketMiddleware;

function createMyWebsocket(room) {
  let socket = io.connect(
    `${serverIoUrl}`,
    {
      query: `room=${room}`,
      resource: "socket.io"
      // transports: ["websocket"],
      // upgrade: false
    }
  );
  console.log("socket connected to room:", room);
  return socket;
}
