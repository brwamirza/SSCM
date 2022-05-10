import React, { Component } from "react";
import { Link } from "react-router-dom";
import UserDataService from "../../services/user.service";
var bcrypt = require("bcryptjs");


class SignUpForm extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      first_name: "",
      last_name: "",
      hasAgreed: false,
      verified: false
    };

    this.onChangeCheckbox = this.onChangeCheckbox.bind(this);
    this.onChangeFName = this.onChangeFName.bind(this);
    this.onChangeLName = this.onChangeLName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // handleChange(event) {
  //   let target = event.target;
  //   let value = target.type === "checkbox" ? target.checked : target.value;
  //   let first_name = target.first_name;
  //   let last_name = target.last_name;

  //   this.setState({
  //     [name]: value
  //   });
  // }

  onChangeCheckbox(e) {
    this.setState({
      hasAgreed: e.target.checked
    });
  }
  onChangeFName(e) {
    this.setState({
      first_name: e.target.value
    });
  }
  onChangeLName(e) {
    this.setState({
      last_name: e.target.value
    });
  }
  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    var data = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: bcrypt.hashSync(this.state.password, 8),
      verified: this.state.verified
    };
    UserDataService.create(data)
      .then(response => {
        console.log("sign up completed");
        this.props.history.push('/verify');
        // console.log(this.props.location.pathname)
        window.location.reload();
      })
      .catch(e => {
        console.log(e)
      });
    // console.log("The form was submitted with the following data:");
    // console.log(this.state);
  }

  render() {
    return (
      <div className="formCenter">
        <form onSubmit={this.handleSubmit} className="formFields">
          <div className="formField">
            <label className="formFieldLabel" htmlFor="fist_name">
              First Name
            </label>
            <input
              type="text"
              id="first_name"
              className="formFieldInput"
              placeholder="Enter your first name"
              name="first_name"
              value={this.state.first_name}
              onChange={this.onChangeFName}
            />
          </div>
          <div className="formField">
            <label className="formFieldLabel" htmlFor="last_name">
              Last Name
            </label>
            <input
              type="text"
              id="last_name"
              className="formFieldInput"
              placeholder="Enter your last name"
              name="last-name"
              value={this.state.last_name}
              onChange={this.onChangeLName}
            />
          </div>
          <div className="formField">
            <label className="formFieldLabel" htmlFor="email">
              E-Mail Address
            </label>
            <input
              type="email"
              id="email"
              className="formFieldInput"
              placeholder="Enter your email"
              name="email"
              value={this.state.email}
              onChange={this.onChangeEmail}
            />
          </div>
          <div className="formField">
            <label className="formFieldLabel" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="formFieldInput"
              placeholder="Enter your password"
              name="password"
              value={this.state.password}
              onChange={this.onChangePassword}
            />
          </div>
          {/* facebook log in */}
          <div id="spinner" style={{
            background: '#4267b2',borderRadius: '5px', color: 'white',
            height: '40px',
            textAlign: 'center',
            width: '250px'}}>
          Loading
          <div
            className="fb-login-button"
            data-max-rows="1"
            data-size="large"
            data-button-type="continue_with"
            data-use-continue-as="true"
            ></div>
         </div>

          <div className="formField">
            <label className="formFieldCheckboxLabel">
              <input
                className="formFieldCheckbox"
                type="checkbox"
                name="hasAgreed"
                value={this.state.hasAgreed}
                onChange={this.onChangeCheckbox}
              />{" "}
              I agree all statements in{" "}
              <a href="null" className="formFieldTermsLink">
                terms of service
              </a>
            </label>
          </div>

          <div className="formField">
            <button className="formFieldButton">Sign Up</button>{" "}
            <Link to="/" className="formFieldLink">
              I'm already member
            </Link>
          </div>
        </form>
      </div>
    );
  }
}
export default SignUpForm;
