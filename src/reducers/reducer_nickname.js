import { FETCH_NICKNAME } from "../actions/index";

export default function(state = "random", action) {
  switch (action.type) {
    case FETCH_NICKNAME:
      return action.payload;
  }
  return state;
}
