import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import ReduxPromise from "redux-promise";
import createMySocketMiddleware from "./middleware/socket";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import BlackJack from "./components/blackJack";
import Register from "./containers/register";
import Users from "./containers/users";
import User from "./containers/user";
import Login from "./containers/login";
import Navigation from "./components/navbar";

import reducers from "./reducers";

const createStoreWithMiddleware = applyMiddleware(
  ReduxPromise,
  createMySocketMiddleware(12)
)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Navigation />
        <Switch>
          <Route path="/blackJack" component={BlackJack} />
          <Route path="/users/new" component={Register} />
          <Route path="/users/:id" component={User} />
          <Route path="/users" component={Users} />
          <Route path="/login" component={Login} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.querySelector(".container")
);
