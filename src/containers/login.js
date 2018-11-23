import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login";
// import { googleLogin } from "../actions/index";

class Login extends Component {
  constructor() {
    super();
  }

  facebookResponse = e => {};

  googleResponse = e => {};

  onFailure = error => {
    console.log(error);
  };

  render() {
    let content = !!this.props.user.isAuthenticated ? (
      <div>
        <p>Authenticated</p>
        <div>{this.props.user.email}</div>
        <div>
          <button onClick={this.logout} className="button">
            Log out
          </button>
        </div>
      </div>
    ) : (
      <div>
        <FacebookLogin
          appId="XXXXXXXXXX"
          autoLoad={false}
          fields="name,email,picture"
          callback={this.facebookResponse}
        />
        <GoogleLogin
          clientId="1016989970932-sdvnbp3vpcbouctlc0shecb6hagp7qsq.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={this.googleResponse}
          onFailure={this.googleResponse}
        />
      </div>
    );

    return <div className="App">{content}</div>;
  }
}

function mapStateToProps({ user }) {
  return { user };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
