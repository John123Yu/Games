import { createMyWebsocket } from "../helpers/index";

import {
  CLEAR_MESSAGES,
  ADD_MESSAGE,
  EMIT_MESSAGE,
  SOCKET_CONNECT_MESSAGES
} from "../actions/index";

const messagesSocketMiddleware = () => {
  let socket;
  let room;
  let username;
  return storeAPI => next => action => {
    switch (action.type) {
      case SOCKET_CONNECT_MESSAGES: {
        storeAPI.dispatch({
          type: CLEAR_MESSAGES,
          payload: []
        });

        if (socket) socket.close();
        room = `/messages/${action.payload.id}`;
        socket = createMyWebsocket(room);
        username = action.payload.username;

        socket.emit("name", {
          username
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
          username: username
        });
        return;
      }
    }
    return next(action);
  };
};

module.exports = messagesSocketMiddleware;
