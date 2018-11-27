import { SETUP_SOCKET } from "../actions/index";

export default function(
  state = {
    on: () => {},
    emit: () => {}
  },
  action
) {
  switch (action.type) {
    case SETUP_SOCKET:
      console.log(action.payload);
      return action.payload;
  }
  return state;
}
