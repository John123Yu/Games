import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import UsernameReducer from "./reducer_username";
import MessagesReducer from "./reducer_messages";
import CardReducer from "./reducer_card";
import CardDealerReducer from "./reducer_dealer";
import CardOppsReducer from "./reducer_opps";
import UsersReducer from "./reducer_users";
import UserReducer from "./reducer_user";
import ItemIdReducer from "./reducer_itemId";
import GamesReducer from "./reducer_games";

const rootReducer = combineReducers({
  username: UsernameReducer,
  messages: MessagesReducer,
  hand: CardReducer,
  dealer: CardDealerReducer,
  opponents: CardOppsReducer,
  form: formReducer,
  users: UsersReducer,
  user: UserReducer,
  itemId: ItemIdReducer,
  games: GamesReducer
});

export default rootReducer;
