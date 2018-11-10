import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addCard, addCardDealer } from "../actions/index";
import Rx from "rx";
import socket from "../util/socket-io";
import moment from "moment";
const images = "./src/static/images/cards-png/";

class BlackJackPane extends Component {
  constructor(props) {
    super(props);

    setImmediate(() => {
      socket.emit("joinBlackJack", {
        name: this.props.nickname
      });
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

    var onNext = e => {
      console.log("E", e);
      socket.emit("blackjackAction", {
        action,
        name: this.props.nickname
      });
    };
    var onError = e => {};
    var onComplete = () => {
      //change buttons to disabled
    };
    clickStartStream.subscribe(
      res => {
        socket.emit("startBlackJack", {
          dummy: "dummy"
        });
      },
      onError,
      onComplete
    );

    socket.on("startTurn", data => {
      //change button to active
      clickStayStream.subscribe(onNext, onError, onComplete);
      clickHitStream.subscribe(onNext, onError, onComplete);
    });
    socket.on("playersCards", ({ players, dealer }) => {
      //   players
      //     .filter(data => data.name === this.props.nickname)
      //     .map(data => data.hand)
      //     .forEach(cards => {
      //       cards.forEach(card => this.props.addCard(card));
      //     });
      //   players
      //     .filter(data => data.name === "Dealer")
      //     .map(data => data.hand)
      //     .forEach(cards => {
      //       cards.forEach(card => this.props.addCardDealer(card));
      //     });
      this.addCard(players, this.props.nickname, this.props.addCard);
      this.addCard([dealer], "Dealer", this.props.addCardDealer);
    });
  }
  addCard(players, name, action) {
    players
      .filter(data => data.name === name)
      .map(data => data.hand)
      .forEach(cards => {
        cards.forEach(card => action(card));
      });
  }

  render() {
    return (
      <div>
        <hr id="invisible-hr" />
        <div className="row">
          <div id="board">
            <ul className="list-group col-sm-10">
              {this.props.dealer.length ? (
                <li id="dealerHand">Dealer</li>
              ) : null}
              {this.props.dealer.map((card, index) => {
                return (
                  <li
                    id="cardPane"
                    className="list-group-item cardPaneOpps"
                    key={index}
                  >
                    <img src={images + card.img} />
                  </li>
                );
              })}
            </ul>
            <ul className="list-group col-sm-10">
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

function mapStateToProps({ nickname, hand, dealer }) {
  return { nickname, hand, dealer };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addCard, addCardDealer }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlackJackPane);
