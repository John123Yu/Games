import { combineReducers } from "redux";
import NicknameReducer from "./reducer_nickname";
import MessagesReducer from "./reducer_messages";

const rootReducer = combineReducers({
  nickname: NicknameReducer,
  messages: MessagesReducer
});

export default rootReducer;
