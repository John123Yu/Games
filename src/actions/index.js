import axios from "axios";
import io from "socket.io-client";

var socket = io();

// var socketMessageStream = Rx.Observable.create(observer => {
//   socket.on("message", data => {
//     observer.onNext(data);
//   });
// });

export const FETCH_NICKNAME = "FETCH_NICKNAME";
export const FETCH_MESSAGES = "FETCH_MESSAGES";

export function fetchNickname(len) {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < len; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return {
    type: FETCH_NICKNAME,
    payload: text
  };
}
export function fetchMessages() {
  socket.on("message", data => {
    return {
      type: FETCH_MESSAGES,
      payload: data
    };
  });
}

// const emitAction = actionCreator => {
//   return (...args) => {
//     // This return the action object which gets sent to our backend
//     // server via the socket connection
//     const result = actionCreator.apply(this, args);
//     socket.emit(result.key, {
//       ...result.payload,
//       type: result.type
//     });
//     return result;
//   };
// };
