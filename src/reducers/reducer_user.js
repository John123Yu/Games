import { SOCIAL_LOGIN, LOGOUT } from "../actions/index";
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
      return action.payload;
    case LOGOUT:
      return action.payload;
  }
  return state;
}
