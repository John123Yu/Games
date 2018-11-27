import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import NicknameReducer from "./reducer_nickname";
import MessagesReducer from "./reducer_messages";
import CardReducer from "./reducer_card";
import CardDealerReducer from "./reducer_dealer";
import CardOppsReducer from "./reducer_opps";
import UsersReducer from "./reducer_users";
import UserReducer from "./reducer_user";
import ItemIdReducer from "./reducer_itemId";
import SocketReducer from "./reducer_socket";

const rootReducer = combineReducers({
  nickname: NicknameReducer,
  messages: MessagesReducer,
  hand: CardReducer,
  dealer: CardDealerReducer,
  opponents: CardOppsReducer,
  form: formReducer,
  users: UsersReducer,
  user: UserReducer,
  itemId: ItemIdReducer,
  socket: SocketReducer
});

export default rootReducer;
