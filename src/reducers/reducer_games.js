import { FETCH_GAMES, FETCH_GAME } from "../actions/index";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_GAME:
      if (action.payload === undefined) {
        return [...state];
      }
      return [...state, action.payload.data];
    case FETCH_GAMES:
      return action.payload.data;
  }
  return state;
}
