import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  FacebookLoginButton,
  InstagramLoginButton
} from "react-social-login-buttons";
import UserDataService from "../../services/user.service";
var bcrypt = require("bcryptjs");

class SignInForm extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: ""
    };

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
  handleSubmit(event) {
    event.preventDefault();
    var data = {
      email: this.state.email,
      password: this.state.password
    };
    UserDataService.signin(data)
      .then(response => {
        console.log(response.data);
        if (response.data.verified == false){
          console.log("please verify")
        }
      })
      .catch(e => {
        console.log(e)
      });
  }

  render() {
    return (
      <div className="formCenter">
        <form className="formFields" onSubmit={this.handleSubmit}>
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

          <div className="formField">
            <button className="formFieldButton">Sign In</button>{" "}
            <Link to="/sign-up" className="formFieldLink">
              Create an account
            </Link>
          </div>

          {/* <div className="socialMediaButtons">
            <div className="facebookButton">
              <FacebookLoginButton onClick={() => alert("Hello")} />
            </div>

            <div className="instagramButton">
              <InstagramLoginButton onClick={() => alert("Hello")} />
            </div>
          </div> */}
        </form>
      </div>
    );
  }
}

export default SignInForm;
