import { FETCH_USERNAME, SET_USERNAME } from "../actions/index";

export default function(state = "random", action) {
  switch (action.type) {
    case FETCH_USERNAME:
      return action.payload;
    case SET_USERNAME:
      return action.payload;
  }
  return state;
}
