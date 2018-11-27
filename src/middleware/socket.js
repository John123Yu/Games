import { serverIoUrl } from "../config";
import io from "socket.io-client";

import {
  ADD_MESSAGE,
  EMIT_MESSAGE,
  SOCKET_CONNECT,
  SET_USERNAME,
  EMIT_JOIN_BLACKJACK,
  EMIT_START_BLACKJACK,
  ADD_CARD,
  ADD_CARD_DEALER,
  ADD_OPPS_CARD
} from "../actions/index";

const createMySocketMiddleware = () => {
  let socket;
  let room;
  let username;
  return storeAPI => next => action => {
    switch (action.type) {
      case SOCKET_CONNECT: {
        room = `/item/${action.payload.id}`;
        socket = createMyWebsocket(room);
        username = action.payload.username;

        storeAPI.dispatch({
          type: SET_USERNAME,
          payload: username
        });

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
      case EMIT_JOIN_BLACKJACK: {
        socket.emit("joinBlackJack", {
          name: action.payload,
          room
        });
        return;
      }
      case EMIT_START_BLACKJACK: {
        socket.emit("startBlackJack", { room });

        socket.on("playersCards", ({ players, dealer }) => {
          let ownCards = addCard(players, username);
          ownCards.forEach(card => {
            storeAPI.dispatch({
              type: ADD_CARD,
              payload: card
            });
          });
          //   this.addCard([dealer], "Dealer", this.props.addCardDealer);
          //   let opponents = {};
          //   let opps = players.filter(data => data.name !== this.props.username);
          //   opps.forEach(opp => {
          //     for (let i = 0; i < opp.hand.length; i++) {
          //       !opponents[opp.name] ? (opponents[opp.name] = []) : undefined;
          //       opponents[opp.name].push(opp.hand[i]);
          //     }
          //   });
          //   this.props.addCardOpps(opponents);
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

function addCard(players, name) {
  var return_ = [];
  players
    .filter(data => data.name === name)
    .map(data => data.hand)
    .forEach(cards => {
      cards.forEach(card => {
        return_.push(card);
      });
    });
  return return_;
}
