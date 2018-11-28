import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { newGame } from "../actions/index";

// https://getbootstrap.com/docs/4.0/components/forms/#validation
class NewGame extends Component {
  renderField(field) {
    const {
      meta: { touched, error },
      label,
      input
    } = field;
    const className = `form-group ${touched && error ? "" : ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input className="form-control" type="text" {...input} />
        <div className="text-help">{touched ? error : ""}</div>
      </div>
    );
  }
  onSubmit(values) {
    console.log(values);
    this.props.newGame(values, () => {
      this.props.history.push("/games");
    });
  }
  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            label="Game name"
            name="gamename"
            component={this.renderField}
          />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.gamename) errors.gamename = "Enter an game name";

  return errors;
}

export default reduxForm({
  validate,
  form: "newGameForm"
})(
  connect(
    null,
    { newGame }
  )(NewGame)
);
