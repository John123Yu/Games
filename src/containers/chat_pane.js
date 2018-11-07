import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchNickname, fetchMessages } from "../actions/index";

class ChatPane extends Component {
  constructor(props) {
    super(props);

    this.props.fetchNickname();
    this.props.fetchMessages();
  }

  //   onInputChange({ target }) {
  //     this.setState({ term: target.value });
  //   }

  //   onFormSubmit(event) {
  //     event.preventDefault();

  //     this.props.fetchWeather(this.state.term);
  //     this.setState({ term: "" });
  //   }

  render() {
    return (
      <div>
        <h4>Name: {this.props.nickname}</h4>
        <ul className="collection">
          {this.props.messages.map((message, index) => {
            return (
              <li className="collection-item" key={message.timestamp}>
                <span className="title">
                  {message.who}{" "}
                  <i>
                    {moment(parseInt(message.timestamp)).format(
                      "YYYY-MM-DD HH:mm:ss"
                    )}
                  </i>
                </span>
                <p>
                  <strong>{message.message}</strong>
                </p>
              </li>
            );
          })}
        </ul>
        <div className="row">
          <div className="input-field col s10">
            <input
              id="message-input"
              type="text"
              className="validate"
              ref="message"
            />
            <label className="active" htmlFor="message-input">
              Type your chat, enter/return or hit button to send
            </label>
          </div>
          <div className="input-field col s2">
            <a
              id="sendBtn"
              className="btn-floating btn-large waves-effect waves-light red"
            >
              <i className="material-icons">send</i>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ nickname, messages }) {
  return { nickname, messages };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchNickname, fetchMessages }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatPane);
