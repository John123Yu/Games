import { combineReducers } from "redux";
import NicknameReducer from "./reducer_nickname";

const rootReducer = combineReducers({
  nickname: NicknameReducer
});

export default rootReducer;
