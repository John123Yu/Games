import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { fetchGames } from "../actions/index";
import { Cookies } from "js-cookie";

class Games extends Component {
  componentDidMount() {
    this.props.fetchGames();
  }
  render() {
    if (!this.props.games.length) {
      return <div>...please wait</div>;
    }
    return (
      <div className="container">
        <Link to="/games/new" className="btn btn-primary float-right">
          Create Game
        </Link>
        <h4>Games</h4>
        <ul className="list-group col-sm-10 users-list">
          {this.props.games.map((game, index) => {
            let gametype = game.split("-")[0];
            return (
              <li
                className="list-group-item users-list-item"
                key={game + index}
              >
                <p>
                  <Link to={`/games/${gametype}/${game}`}>
                    <strong>{game}</strong>
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

function mapStateToProps({ games }) {
  return { games };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchGames
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Games);
