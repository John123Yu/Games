import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login";
import config from "../config.json";
import { socialLogin } from "../actions/index";

const ROOT_URL = "http://localhost:4040/api/auth";

class Login extends Component {
  constructor() {
    super();
  }

  onFailure = error => {
    alert(error);
  };

  social_login = response => {
    let url;
    response.googleId ? (url = "google") : (url = "facebook");
    const tokenBlob = new Blob(
      [JSON.stringify({ access_token: response.accessToken }, null, 2)],
      { type: "application/json" }
    );
    const options = {
      method: "POST",
      body: tokenBlob,
      mode: "cors",
      cache: "default"
    };
    fetch(`${ROOT_URL}/${url}`, options).then(r => {
      const token = r.headers.get("x-auth-token");
      r.json().then(user => {
        if (token) {
          this.props.socialLogin(user);
        }
      });
    });
  };

  logout() {}

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
          appId={config.FACEBOOK_APP_ID}
          autoLoad={false}
          fields="name,email,picture"
          callback={this.social_login}
        />
        <GoogleLogin
          clientId={config.GOOGLE_CLIENT_ID}
          buttonText="Login"
          onSuccess={this.social_login}
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
  return bindActionCreators({ socialLogin }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
