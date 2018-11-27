import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchNickname, addMessage, setNickname } from "../actions/index";
import Rx from "rx";
import moment from "moment";
// import socket from "../util/socket-io";

let socket;

class ChatPane extends Component {
  constructor(props) {
    super(props);

    socket = this.props.socket;
    this.props.setNickname("haoao");

    socket.on("name_set", ({ name }) => {
      if (name) {
        this.props.setNickname(name);
      } else {
        this.props.fetchNickname(6);
        setImmediate(() => {
          socket.emit("name", {
            nickname: this.props.nickname
          });
        });
      }
    });
    socket.on("messages", data => {
      this.props.addMessage(data);
    });
  }

  componentDidMount() {
    var button = document.getElementById("sendBtn");
    var textField = document.getElementById("message-input");

    var clickStream = Rx.Observable.fromEvent(button, "click").map(e => true);
    var enterKeyPressedStream = Rx.Observable.fromEvent(
      textField,
      "keyup"
    ).filter(e => e.keyCode == 13);
    var textEnteredStream = Rx.Observable.fromEvent(textField, "keyup").map(
      e => e.target.value
    );
    var sendMessageStream = Rx.Observable.merge(
      clickStream,
      enterKeyPressedStream
    );

    var mergedStream = textEnteredStream.takeUntil(sendMessageStream);

    var text = "";
    var onNext = t => {
      text = t;
    };
    var onError = e => {};
    var onComplete = () => {
      this.props.addMessage("hallo");

      socket.emit("message", {
        message: text,
        nickname: this.props.nickname
      });
      textField.value = "";
      textField.focus();
      mergedStream.subscribe(onNext, onError, onComplete);
    };

    mergedStream.subscribe(onNext, onError, onComplete);
  }

  render() {
    return (
      <div>
        <hr id="invisible-hr" />
        <div className="row">
          <h4>You are: {this.props.nickname} </h4>
          <ul className="list-group col-sm-10">
            {this.props.messages.map((message, index) => {
              return (
                <li
                  id="chat-message"
                  className="list-group-item"
                  key={message.timestamp + Math.random()}
                >
                  <p id="chat-message-p">
                    <strong>{message.message}</strong>
                  </p>
                  <span id="chat-message-span" className="title">
                    {message.nickname}
                    <i id="chat-message-i">
                      {moment(parseInt(message.timestamp)).format(
                        "HH:mm:ss MM-DD-YYYY"
                      )}
                    </i>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="row" id="chatpane-input">
          <div className="form-group col-sm-10">
            <input
              id="message-input"
              type="text"
              className="form-control"
              ref="message"
            />
            <label className="active" htmlFor="message-input">
              Press Enter or Click Send
            </label>
          </div>
          <div className="form-group">
            <a id="sendBtn" className="btn btn-success">
              Send
            </a>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ nickname, messages, socket }) {
  return { nickname, messages, socket };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { fetchNickname, setNickname, addMessage },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatPane);
