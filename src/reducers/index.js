import { combineReducers } from "redux";
import NicknameReducer from "./reducer_nickname";
import MessagesReducer from "./reducer_messages";
import CardReducer from "./reducer_card";

const rootReducer = combineReducers({
  nickname: NicknameReducer,
  messages: MessagesReducer,
  hand: CardReducer
});

export default rootReducer;
