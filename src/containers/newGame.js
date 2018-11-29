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
  renderSelectField = ({
    input,
    label,
    meta: { touched, error },
    children
  }) => (
    <div>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <label className="input-group-text">{label}</label>
        </div>
        <div>
          <select className="custom-select" {...input}>
            <option defaultValue>Choose...</option>
            {children}
          </select>
        </div>
      </div>
      <div className="text-help new-line">
        {touched && error && <span className="new-line">{error}</span>}
      </div>
    </div>
  );
  onSubmit(values) {
    console.log(values);
    this.props.newGame(values, () => {
      this.props.history.push("/games");
    });
  }
  render() {
    const { handleSubmit } = this.props;
    let mySelectOptions = [
      { value: "War", text: "War" },
      { value: "GoFish", text: "GoFish" },
      { value: "BlackJack", text: "BlackJack" },
      { value: "Minesweeper", text: "Minesweeper" }
    ];
    return (
      <div className="row">
        <div className="col-md-8">
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <Field
              name="gametype"
              component={this.renderSelectField}
              label="Game Type"
            >
              {mySelectOptions.map(option => (
                <option value={option.value} key={option.value}>
                  {option.text}
                </option>
              ))}
            </Field>
            <Field
              label="Game Label"
              name="gamename"
              component={this.renderField}
            />
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.gamename) {
    errors.gamename = "Enter an Game Label";
  } else {
    if (values.gamename.indexOf("-") > -1)
      errors.gamename = "No dashes allowed in Game Label";
  }
  if (!values.gametype) errors.gametype = "Select a Game Type";

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
