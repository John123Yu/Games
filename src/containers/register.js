import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { register } from "../actions/index";

var emailRe = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
let emailTest = new RegExp(emailRe);

class Register extends Component {
  renderField(field) {
    const {
      meta: { touched, error },
      label,
      input
    } = field;
    const className = `form-group ${touched && error ? "has-danger" : ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input className="form-control" type="text" {...input} />
        <div className="text-help">{touched ? error : ""}</div>
      </div>
    );
  }
  onSubmit(values) {
    this.props.register(values, () => {
      this.props.history.push("/users");
    });
  }
  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            label="Username"
            name="username"
            component={this.renderField}
          />
          <Field label="Email" name="email" component={this.renderField} />
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

  if (!values.username) errors.username = "Enter an username";
  if (!emailTest.test(values.email)) errors.email = "Enter a valid email";

  return errors;
}

export default reduxForm({
  validate,
  form: "RegisterForm"
})(
  connect(
    null,
    { register }
  )(Register)
);
