import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { socketConnectWar, emitHitWar, emitStartWar } from "../actions/index";
import Rx from "rx";
import Cookie from "js-cookie";

import { makeId } from "../helpers/index";
const images = "../../src/static/images/cards-png/";

let username = Cookie.get("username");

class WarPane extends Component {
  constructor(props) {
    super(props);

    !username ? (username = "Anonymous" + makeId(5)) : null;
    this.props.socketConnectWar({
      id: this.props.gameId,
      username
    });
  }

  componentDidMount() {
    var startButton = document.getElementById("startBtn");
    var hitButton = document.getElementById("hitBtn");
    var board = document.getElementById("board");

    var clickHitStream = Rx.Observable.fromEvent(hitButton, "click");
    var clickStartStream = Rx.Observable.fromEvent(startButton, "click").map(
      e => true
    );
    clickStartStream.subscribe(
      res => {
        this.props.emitStartWar();
      },
      onError,
      onComplete
    );
    clickHitStream.subscribe(
      res => {
        this.props.emitHitWar();
      },
      onError,
      onComplete
    );
    var onError = e => {};
    var onComplete = () => {
      //change buttons to disabled
    };
  }

  render() {
    return (
      <div>
        <hr id="invisible-hr" />
        <div className="row">
          <div id="board">
            <ul className="opponents_ul col-sm-10">{this.renderOpponents()}</ul>
            <ul className="opponents_ul col-sm-10">
              {this.props.hand.length ? <li id="yourHand">Your Hand</li> : null}
              {this.props.hand.map((card, index) => {
                return (
                  <li id="cardPane" className="list-group-item" key={index}>
                    <img src={images + card.img} />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="row" id="chatpane-input">
          <a id="hitBtn" className="btn btn-danger">
            Hit
          </a>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ hand, opponents }) {
  return { hand, opponents };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      socketConnectWar,
      emitHitWar,
      emitStartWar
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WarPane);
