import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { emitStartBlackJack, socketConnectBlackJack } from "../actions/index";
import Rx from "rx";
import Cookie from "js-cookie";

import { makeId } from "../helpers/index";
const images = "../../src/static/images/cards-png/";

let username = Cookie.get("username");

class BlackJackPane extends Component {
  constructor(props) {
    super(props);

    !username ? (username = "Anonymous" + makeId(5)) : null;
    this.props.socketConnectBlackJack({
      id: this.props.gameId,
      username
    });
  }

  componentDidMount() {
    var hitButton = document.getElementById("hitBtn");
    var stayButton = document.getElementById("stayBtn");
    var startButton = document.getElementById("startBtn");
    var board = document.getElementById("board");

    var clickHitStream = Rx.Observable.fromEvent(hitButton, "click");
    var clickStayStream = Rx.Observable.fromEvent(stayButton, "click");
    var clickStartStream = Rx.Observable.fromEvent(startButton, "click").map(
      e => true
    );

    // var onNext = e => {
    //   socket.emit("blackjackAction", {
    //     action,
    //     name: this.props.username
    //   });
    // };
    var onError = e => {};
    var onComplete = () => {
      //change buttons to disabled
    };
    clickStartStream.subscribe(
      res => {
        this.props.emitStartBlackJack();
      },
      onError,
      onComplete
    );

    // socket.on("startTurn", data => {
    //   //change button to active
    //   clickStayStream.subscribe(onNext, onError, onComplete);
    //   clickHitStream.subscribe(onNext, onError, onComplete);
    // });
  }
  renderOpponents() {
    if (this.props.opponents.length) {
      let cards = [];
      this.props.opponents.forEach(opponent => {
        cards.push(<li key={opponent[0] + Math.random()}>{opponent[0]}</li>);
        opponent[1].forEach(card => {
          cards.push(
            <li
              id="cardPane"
              className="list-group-item cardPaneOpps"
              key={card.img}
            >
              <img className="cardOpps" src={images + card.img} />
            </li>
          );
        });
      });
      return cards;
    }
  }

  render() {
    return (
      <div>
        <hr id="invisible-hr" />
        <div className="row">
          <div id="board">
            <ul className="opponents_ul col-sm-10">
              {this.props.dealer.length ? (
                <li id="dealerHand">Dealer</li>
              ) : null}
              {this.props.dealer.map((card, index) => {
                return (
                  <li id="cardPane" className=" cardPaneOpps" key={index}>
                    <img className="cardOpps" src={images + card.img} />
                  </li>
                );
              })}
            </ul>
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
          <a id="startBtn" className="btn btn-primary">
            Start
          </a>
          <a id="hitBtn" className="btn btn-danger">
            Hit
          </a>
          <a id="stayBtn" className="btn btn-success">
            Stay
          </a>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ username, hand, dealer, opponents }) {
  return { username, hand, dealer, opponents };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      socketConnectBlackJack,
      emitStartBlackJack
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlackJackPane);
