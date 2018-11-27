import { SET_USERNAME } from "../actions/index";

export default function(state = "random", action) {
  switch (action.type) {
    case SET_USERNAME:
      return action.payload;
  }
  return state;
}
