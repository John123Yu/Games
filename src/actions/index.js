import axios from "axios";

export const FETCH_NICKNAME = "FETCH_NICKNAME";
export const ADD_MESSAGE = "ADD_MESSAGE";
export const ADD_CARD = "ADD_CARD";
export const ADD_CARD_DEALER = "ADD_CARD_DEALER";
export const ADD_OPPS_CARD = "ADD_OPPS_CARD";

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
