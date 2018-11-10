import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addCard } from "../actions/index";
import Rx from "rx";
import socket from "../util/socket-io";
import moment from "moment";

class BlackJackPane extends Component {
  constructor(props) {
    super(props);

    setImmediate(() => {
      socket.emit("joinBlackJack", {
        name: this.props.nickname
      });

      //   socket.on("messages", data => {
      //     console.log("data", data);
      //     this.props.addMessage(data);
      //   });
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

    var onNext = action => {
      console.log("action", action);
      if (action) {
        console.log("HEYO");
        socket.emit("blackjackAction", {
          action,
          name: this.props.nickname
        });
      }
    };
    var onError = e => {};
    var onComplete = () => {
      //change buttons to disabled
      //   mergedStream.subscribe(onNext, onError, onComplete);
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
      clickStayStream.subscribe(onNext("stay"), onError, onComplete);
      clickHitStream.subscribe(onNext("hit"), onError, onComplete);
    });
    socket.on("playersCards", ({ players }) => {
      let hand = players
        .filter(data => data.name === this.props.nickname)
        .map(data => data.hand)
        .forEach(cards => {
          cards.forEach(card => this.props.addCard(card));
        });
    });
  }

  render() {
    return (
      <div>
        <hr id="invisible-hr" />
        <div className="row">
          <div id="board">
            {console.log(this.props.hand)}
            <ul className="list-group col-sm-10">
              {this.props.hand.map((card, index) => {
                return (
                  <li className="list-group-item" key={index}>
                    <strong>{card.value}</strong>
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

function mapStateToProps({ nickname, hand }) {
  return { nickname, hand };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addCard }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlackJackPane);
