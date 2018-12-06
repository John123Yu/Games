import { serverIoUrl } from "../config";
import io from "socket.io-client";
import { getCards } from "../helpers/index";

import {
  SOCKET_CONNECT_WAR,
  EMIT_HIT_WAR,
  EMIT_START_WAR,
  ADD_CARD,
  ADD_OPPS_CARD
} from "../actions/index";

const blackJackSocketMiddleware = () => {
  let socket;
  let room;
  let username;
  return storeAPI => next => action => {
    switch (action.type) {
      case SOCKET_CONNECT_WAR: {
        if (socket) socket.close();
        room = `/war/${action.payload.id}`;
        socket = createMyWebsocket(room);
        username = action.payload.username;

        socket.emit("joinWar", {
          name: username
        });
        //=====Handle getting cards from server//
        socket.on("shownCards", ({ players }) => {
          let opponents = {};
          for (let username in players) {
            if (players[username] === username) {
              players[username].forEach(card => {
                storeAPI.dispatch({
                  type: ADD_CARD,
                  payload: card
                });
              });
            } else {
              opponents[username] = players[username];
            }
          }
          storeAPI.dispatch({
            type: ADD_OPPS_CARD,
            payload: { username, cards }
          });
        });
        //=====Handle getting cards from server//
        return;
      }
      case EMIT_START_WAR: {
        socket.emit("startWar", {});
        return;
      }
      case EMIT_HIT_WAR: {
        socket.emit("hitWar", { username });
        return;
      }
    }
    return next(action);
  };
};

module.exports = blackJackSocketMiddleware;
