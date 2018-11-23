import { FETCH_NICKNAME, SET_NICKNAME } from "../actions/index";

export default function(state = "random", action) {
  switch (action.type) {
    case FETCH_NICKNAME:
      return action.payload;
    case SET_NICKNAME:
      return action.payload;
  }
  return state;
}
