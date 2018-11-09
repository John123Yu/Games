import { ADD_MESSAGE } from "../actions/index";

export default function(state = [], action) {
  switch (action.type) {
    case ADD_MESSAGE:
      //   console.log(action.payload);
      return [...state, action.payload];
  }
  return state;
}
