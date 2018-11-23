import React, { Component } from "react";

import ChatPane from "../containers/chat_pane";
import BlackJackPane from "../containers/blackjack";

export default class BlackJack extends Component {
  render() {
    return (
      <div>
        <ChatPane />
        <BlackJackPane />
      </div>
    );
  }
}
