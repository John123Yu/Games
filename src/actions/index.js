import axios from "axios";
import { ROOT_URL } from "../config";

export const SET_USERNAME = "SET_USERNAME";
export const ADD_MESSAGE = "ADD_MESSAGE";
export const CLEAR_MESSAGES = "CLEAR_MESSAGES";
export const ADD_CARD = "ADD_CARD";
export const ADD_CARD_DEALER = "ADD_CARD_DEALER";
export const ADD_OPPS_CARD = "ADD_OPPS_CARD";
export const FETCH_USER = "FETCH_USER";
export const FETCH_USERS = "FETCH_USERS";
export const SOCIAL_LOGIN = "SOCIAL_LOGIN";
export const LOGOUT = "LOGOUT";
export const SET_ITEMID = "SET_ITEMID";
export const SOCKET_CONNECT_BLACKJACK = "SOCKET_CONNECT_BLACKJACK";
export const SOCKET_CONNECT_GOFISH = "SOCKET_CONNECT_GOFISH";
export const SOCKET_CONNECT_WAR = "SOCKET_CONNECT_WAR";
export const EMIT_MESSAGE = "EMIT_MESSAGE";
export const EMIT_START_BLACKJACK = "EMIT_START_BLACKJACK";
export const FETCH_GAMES = "FETCH_GAMES";
export const FETCH_GAME = "FETCH_GAME";
export const SOCKET_CONNECT_MESSAGES = "SOCKET_CONNECT_MESSAGES";
export const EMIT_HIT_WAR = "EMIT_HIT_WAR";
export const EMIT_START_WAR = "EMIT_START_WAR";

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
//-----------GAMES-------------------------------------------------//
export function fetchGames() {
  const request = axios.get(`${ROOT_URL}/games`);
  return {
    type: FETCH_GAMES,
    payload: request
  };
}
export function newGame(game, callback) {
  const request = axios.post(`${ROOT_URL}/games`, game).then(() => callback());
  return {
    type: FETCH_GAME,
    payload: request
  };
}
//-----------GAMES-------------------------------------------------//
//-----------Socket-------------------------------------------------//
export function socketConnectBlackJack(id) {
  return {
    type: SOCKET_CONNECT_BLACKJACK,
    payload: id
  };
}
export function socketConnectMessages(id) {
  return {
    type: SOCKET_CONNECT_MESSAGES,
    payload: id
  };
}
export function socketConnectGoFish(id) {
  return {
    type: SOCKET_CONNECT_GOFISH,
    payload: id
  };
}
export function socketConnectWar(id) {
  return {
    type: SOCKET_CONNECT_WAR,
    payload: id
  };
}
//-----------Socket-------------------------------------------------//
//-----------Messages-------------------------------------------------//
export function emitMessage(obj) {
  return {
    type: EMIT_MESSAGE,
    payload: obj
  };
}
//-----------Messages-------------------------------------------------//
//-----------BlackJack-------------------------------------------------//
export function emitStartBlackJack(obj) {
  return {
    type: EMIT_START_BLACKJACK,
    payload: ""
  };
}
//-----------BlackJacks-------------------------------------------------//
//---------War-------------------------------------------------//
export function emitHitWar() {
  return {
    type: EMIT_HIT_WAR,
    payload: null
  };
}
export function emitStartWar() {
  return {
    type: EMIT_START_WAR,
    payload: null
  };
}
//----------War-------------------------------------------------//
