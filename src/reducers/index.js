import { combineReducers } from "redux";
import NicknameReducer from "./reducer_nickname";
import MessagesReducer from "./reducer_messages";
import CardReducer from "./reducer_card";
import CardDealerReducer from "./reducer_dealer";
import CardOppsReducer from "./reducer_opps";

const rootReducer = combineReducers({
  nickname: NicknameReducer,
  messages: MessagesReducer,
  hand: CardReducer,
  dealer: CardDealerReducer,
  opponents: CardOppsReducer
});

export default rootReducer;
