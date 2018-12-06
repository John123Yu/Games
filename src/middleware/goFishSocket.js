import { getCards, createMyWebsocket } from "../helpers/index";

import { SOCKET_CONNECT_GOFISH } from "../actions/index";

const goFishSocketMiddleware = () => {
  let socket;
  let room;
  let username;
  return storeAPI => next => action => {
    switch (action.type) {
      case SOCKET_CONNECT_GOFISH: {
        if (socket) socket.close();
        room = `/goFish/${action.payload.id}`;
        socket = createMyWebsocket(room);
        username = action.payload.username;

        return;
      }
    }
    return next(action);
  };
};

module.exports = goFishSocketMiddleware;
