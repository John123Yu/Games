import { AUTHENTICATE_USER } from "../actions/index";

export default function(
  state = {
    isAuthenticated: false,
    user: null,
    token: "",
    email: null,
    username: null
  },
  action
) {
  switch (action.type) {
    case AUTHENTICATE_USER:
      // const post = action.payload.data;
      return { ...state, isAuthenticated: action.payload };
  }
  return state;
}
