import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUsers } from "../actions/index";

class Users extends Component {
  componentDidMount() {
    this.props.fetchUsers();
  }
  render() {
    if (!this.props.users.length) {
      return <div>...please wait</div>;
    }
    return (
      <div className="container">
        <Link to="/users/new" className="btn btn-primary float-right">
          Register
        </Link>
        <h4>Players</h4>
        <ul className="list-group col-sm-10 users-list">
          {this.props.users.map((user, index) => {
            return (
              <li
                className="list-group-item users-list-item"
                key={user._id + Math.random()}
              >
                <p>
                  <Link to={`/users/${user._id}`}>
                    <strong>{user.username}</strong>
                  </Link>
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  return { users };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchUsers }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users);
