import { FETCH_USER, FETCH_USERS } from "../actions/index";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_USER:
      return [...state, action.payload.data];
    case FETCH_USERS:
      return action.payload.data;
  }
  return state;
}
