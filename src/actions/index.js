import axios from "axios";
import { ROOT_URL } from "../config";

export const SET_USERNAME = "SET_USERNAME";
export const ADD_MESSAGE = "ADD_MESSAGE";
export const ADD_CARD = "ADD_CARD";
export const ADD_CARD_DEALER = "ADD_CARD_DEALER";
export const ADD_OPPS_CARD = "ADD_OPPS_CARD";
export const FETCH_USER = "FETCH_USER";
export const FETCH_USERS = "FETCH_USERS";
export const SOCIAL_LOGIN = "SOCIAL_LOGIN";
export const LOGOUT = "LOGOUT";
export const SET_ITEMID = "SET_ITEMID";
export const SETUP_SOCKET = "SETUP_SOCKET";
export const SOCKET_CONNECT = "SOCKET_CONNECT";
export const EMIT_MESSAGE = "EMIT_MESSAGE";
export const EMIT_JOIN_BLACKJACK = "EMIT_JOIN_BLACKJACK";
export const EMIT_START_BLACKJACK = "EMIT_START_BLACKJACK";

export function addCard(card) {
  return {
    type: ADD_CARD,
    payload: card
  };
}
export function addCardDealer(card) {
  return {
    type: ADD_CARD_DEALER,
    payload: card
  };
}
export function addCardOpps(object) {
  return {
    type: ADD_OPPS_CARD,
    payload: object
  };
}
export function emitJoinBlackJack(object) {
  return {
    type: EMIT_JOIN_BLACKJACK,
    payload: object
  };
}
//-----------USERS-------------------------------------------------//
export function register(user, callback) {
  const request = axios.post(`${ROOT_URL}/users`, user).then(() => callback());
  return {
    type: FETCH_USER,
    payload: request
  };
}
export function fetchUsers() {
  const request = axios.get(`${ROOT_URL}/users`);
  return {
    type: FETCH_USERS,
    payload: request
  };
}
export function fetchUser(id) {
  const request = axios.get(`${ROOT_URL}/users/${id}`);
  return {
    type: FETCH_USER,
    payload: request
  };
}
export function socialLogin(user, token) {
  let isAuthenticated = true;
  return {
    type: SOCIAL_LOGIN,
    payload: { user, token, isAuthenticated }
  };
}
export function logout() {
  let payload = {
    isAuthenticated: false,
    token: "",
    user: null
  };
  return {
    type: LOGOUT,
    payload
  };
}
//-----------USERS-------------------------------------------------//
// export function setItemId(id) {
//   return {
//     type: SET_ITEMID,
//     payload: id
//   };
// }
// export function setupSocket(room) {
//   // let socket = io.connect(
//   //   `${serverIoUrl}/${room}`,
//   //   {
//   //     query: `room=${room}`,
//   //     resource: "socket.io"
//   //     // transports: ["websocket"],
//   //     // upgrade: false
//   //   }
//   let socket = {
//     on: () => {},
//     emit: () => {}
//   };
//   return {
//     type: SETUP_SOCKET,
//     payload: socket
//   };
// }
//-----------Socket-------------------------------------------------//
export function socketConnect(id) {
  return {
    type: SOCKET_CONNECT,
    payload: id
  };
}
export function emitMessage(obj) {
  return {
    type: EMIT_MESSAGE,
    payload: obj
  };
}
export function emitStartBlackJack(obj) {
  return {
    type: EMIT_START_BLACKJACK,
    payload: ""
  };
}
//-----------Sockets-------------------------------------------------//
