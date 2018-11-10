import { ADD_OPPS_CARD } from "../actions/index";

export default function(state = {}, action) {
  switch (action.type) {
    case ADD_OPPS_CARD:
      let newState = Object.keys(action.payload).map(key => {
        return [key, action.payload[key]];
      });
      return newState;
  }
  return state;
}
