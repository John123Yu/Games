import { ADD_MESSAGE, CLEAR_MESSAGES } from "../actions/index";

export default function(state = [], action) {
  switch (action.type) {
    case ADD_MESSAGE:
      return [...state, action.payload];
    case CLEAR_MESSAGES:
      return action.payload;
  }
  return state;
}
