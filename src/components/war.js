import React, { Component } from "react";

import ChatPane from "../containers/messages";
import WarPane from "../containers/war";

export default class War extends Component {
  constructor(props) {
    super(props);
    this.gameId = this.props.gameId;
  }
  render() {
    return (
      <div>
        <ChatPane gameId={this.gameId} />
        <War gameId={this.gameId} />
      </div>
    );
  }
}
