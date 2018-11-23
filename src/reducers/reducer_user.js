import { SOCIAL_LOGIN } from "../actions/index";
import { request } from "http";

export default function(
  state = {
    isAuthenticated: false,
    user: null,
    token: ""
  },
  action
) {
  switch (action.type) {
    case SOCIAL_LOGIN:
      let newState = {
        isAuthenticated: true,
        user: action.payload
      };
      return newState;
  }
  return state;
}
