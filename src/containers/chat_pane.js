import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { socketConnect, emitMessage } from "../actions/index";
import Rx from "rx";
import moment from "moment";
import { withRouter } from "react-router-dom";
import Cookie from "js-cookie";

let username = Cookie.get("username");

class ChatPane extends Component {
  constructor(props) {
    super(props);

    if (!username) {
      //toast to ask for loggin in
      this.props.history.push("/login");
    } else {
      this.props.socketConnect({
        id: 12,
        username
      });
    }
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
      this.props.emitMessage({
        message: text,
        username
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
          <div className="container">
            <h4>You are: {username} </h4>
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
                      {message.username}
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

function mapStateToProps({ username, messages, user }) {
  return { username, messages, user };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ socketConnect, emitMessage }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ChatPane));
