import React, { Component } from "react";

import BlackJack from "./blackjack";

export default class GameBoard extends Component {
  constructor(props) {
    super(props);
    let { match } = props;
    this.gametype = match.url.split("/")[2];
    this.gameId = match.url.split("/")[3];
  }
  render() {
    console.log(this.gametype);
    if (this.gametype === "BlackJack") {
      return (
        <div>
          <BlackJack gameId={this.gameId} />
        </div>
      );
    }
  }
}
