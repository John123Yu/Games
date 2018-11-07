import { FETCH_MESSAGES } from "../actions/index";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_MESSAGES
      return [action.payload, ...state];
  }
  return state;
}
