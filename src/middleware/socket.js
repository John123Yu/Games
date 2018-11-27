import { serverIoUrl } from "../config";
import io from "socket.io-client";

const createMySocketMiddleware = id => {
  let socket;

  return storeAPI => next => action => {
    switch (action.type) {
      case "SET_NICKNAME": {
        socket = createMyWebsocket(id);
        console.log("HELLO");
        break;
      }
      case "ADD_MESSAGE": {
        socket.emit("joinBlackJack", {
          name: "this.props.nickname"
        });
        console.log("PG");
        return;
      }
    }

    return next(action);
  };
};

module.exports = createMySocketMiddleware;

function createMyWebsocket(id) {
  const room = `/item/${id}/messages`;
  let socket = io.connect(
    `${serverIoUrl}`,
    {
      query: `room=${room}`,
      resource: "socket.io"
      // transports: ["websocket"],
      // upgrade: false
    }
  );

  return socket;
}
