import { SET_ITEMID } from "../actions/index";

export default function(state = 1, action) {
  switch (action.type) {
    case SET_ITEMID:
      return action.payload;
  }
  return state;
}
