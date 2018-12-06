import { getCards, createMyWebsocket } from "../helpers/index";

import {
  SOCKET_CONNECT_BLACKJACK,
  EMIT_START_BLACKJACK,
  ADD_CARD,
  ADD_CARD_DEALER,
  ADD_OPPS_CARD
} from "../actions/index";

const blackJackSocketMiddleware = () => {
  let socket;
  let room;
  let username;
  return storeAPI => next => action => {
    switch (action.type) {
      case SOCKET_CONNECT_BLACKJACK: {
        if (socket) socket.close();
        room = `/blackjack/${action.payload.id}`;
        socket = createMyWebsocket(room);
        username = action.payload.username;

        socket.emit("joinBlackJack", {
          name: username
        });
        //=====Handle getting cards from server//
        socket.on("playersCards", ({ players, dealer }) => {
          let ownCards = getCards(players, username);
          ownCards.forEach(card => {
            storeAPI.dispatch({
              type: ADD_CARD,
              payload: card
            });
          });
          let dealerCards = getCards([dealer], "Dealer");
          dealerCards.forEach(card => {
            storeAPI.dispatch({
              type: ADD_CARD_DEALER,
              payload: card
            });
          });
          let opponents = {};
          let opps = players.filter(data => data.name !== username);
          opps.forEach(opp => {
            for (let i = 0; i < opp.hand.length; i++) {
              !opponents[opp.name] ? (opponents[opp.name] = []) : undefined;
              opponents[opp.name].push(opp.hand[i]);
            }
          });
          storeAPI.dispatch({
            type: ADD_OPPS_CARD,
            payload: opponents
          });
        });
        //=====Handle getting cards from server//
        return;
      }
      case EMIT_START_BLACKJACK: {
        socket.emit("startBlackJack", {});
        return;
      }
    }
    return next(action);
  };
};

module.exports = blackJackSocketMiddleware;
