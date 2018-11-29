import React, { Component } from "react";

import ChatPane from "../containers/chat_pane";
import BlackJackPane from "../containers/blackjack";

export default class BlackJack extends Component {
  constructor(props) {
    super(props);
    this.gameId = this.props.gameId;
  }
  render() {
    return (
      <div>
        <ChatPane gameId={this.gameId} />
        <BlackJackPane />
      </div>
    );
  }
}
