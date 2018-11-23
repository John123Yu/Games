import axios from "axios";

export const FETCH_NICKNAME = "FETCH_NICKNAME";
export const SET_NICKNAME = "SET_NICKNAME";
export const ADD_MESSAGE = "ADD_MESSAGE";
export const ADD_CARD = "ADD_CARD";
export const ADD_CARD_DEALER = "ADD_CARD_DEALER";
export const ADD_OPPS_CARD = "ADD_OPPS_CARD";
// export const CREATE_USER = "CREATE_USER";
export const FETCH_USER = "FETCH_USER";
export const FETCH_USERS = "FETCH_USERS";
export const AUTHENTICATE_USER = "AUTHENTICATE_USER";

const ROOT_URL = "http://localhost:4040/api";

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
export function setNickname(name) {
  return {
    type: SET_NICKNAME,
    payload: name
  };
}
export function addMessage(message) {
  return {
    type: ADD_MESSAGE,
    payload: message
  };
}
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
//-----------USERS-------------------------------------------------//
export function register(user, callback) {
  const request = axios.post(`${ROOT_URL}/users`, user).then(() => callback());
  return {
    type: FETCH_USER,
    payload: request
  };
}
// export function googleLogin(user, callback) {
//   const request = axios.post(`${ROOT_URL}/users/google`, user).then(() => callback());
//   return {
//     type: FETCH_USER,
//     payload: request
//   };
// }
export function fetchUsers() {
  const request = axios.get(`${ROOT_URL}/users`);
  return {
    type: FETCH_USERS,
    payload: request
  }
}
export function fetchUser(id) {
  const request = axios.get(`${ROOT_URL}/users/${id}`);
  return {
    type: FETCH_USER,
    payload: request
  }
}
export function authenticateUser() {
  return {
    type: AUTHENTICATE_USER,
    payload: true
  }
}
//-----------USERS-------------------------------------------------//