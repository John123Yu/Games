import axios from "axios";

export const FETCH_NICKNAME = "FETCH_NICKNAME";
// export const FETCH_MESSAGES = "FETCH_MESSAGES";
export const ADD_MESSAGE = "ADD_MESSAGE";

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
// export function fetchMessages(message) {
//   return {
//     type: FETCH_MESSAGES,
//     payload: message
//   };
// }
export function addMessage(message) {
  //   console.log(message, "message");
  return {
    type: ADD_MESSAGE,
    payload: message
  };
}
