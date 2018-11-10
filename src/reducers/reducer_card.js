import { ADD_CARD } from "../actions/index";

export default function(state = [], action) {
  switch (action.type) {
    case ADD_CARD:
      return [...state, action.payload];
  }
  return state;
}
