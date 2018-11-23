import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { fetchUser } from "../actions/index";

class User extends Component {
  componentDidMount() {
    if (!this.props.post) {
      const { id } = this.props.match.params;
      this.props.fetchUser(id);
    }
  }
  render() {
    const { user } = this.props;
    if (!user) return <div>...please wait</div>;
    return (
      <div className="row">
        <Link className="btn btn-primary" to="/users">
          Back to Users
        </Link>
        <h3>{user.username}</h3>
        <p>{user.email}</p>
      </div>
    );
  }
}

function mapStateToProps({ users }, ownProps) {
  if (!users.length) return {};
  let user = users.filter(user => {
    return user._id === ownProps.match.params.id;
  })[0];
  return { user };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchUser }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User);
