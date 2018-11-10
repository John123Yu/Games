import { ADD_CARD_DEALER } from "../actions/index";

export default function(state = [], action) {
  switch (action.type) {
    case ADD_CARD_DEALER:
      return [...state, action.payload];
  }
  return state;
}
