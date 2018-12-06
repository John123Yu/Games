import React, { Component } from "react";

import BlackJack from "./blackjack";
import { withRouter } from "react-router-dom";

class GameBoard extends Component {
  constructor(props) {
    super(props);
    let { match } = props;
    this.gametype = match.url.split("/")[2];
    this.gameId = match.url.split("/")[3];
    console.log(match);
  }
  render() {
    if (this.gametype === "BlackJack") {
      return (
        <div>
          <BlackJack gameId={this.gameId} />
        </div>
      );
    } else if (this.gametype === "War") {
      return (
        <div>
          <War gameId={this.gameId} />
        </div>
      );
    }
  }
}

module.exports = withRouter(GameBoard);
