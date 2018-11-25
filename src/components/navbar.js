import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navigation extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <Link className="navbar-brand" to="/login">
          Socket Games
        </Link>
        <div className="collapse navbar-collapse float-right" id="navbarNav">
          <ul className="navbar-nav float-right">
            <li className="nav-item active">
              <Link className="nav-link" to="/users">
                Users
              </Link>
            </li>
          </ul>
          <Link className="nav-link float-right ml-auto login-link" to="/login">
            Login
          </Link>
        </div>
      </nav>
    );
  }
}
