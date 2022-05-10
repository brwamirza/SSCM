import React, { Component } from "react";
import { BrowserRouter as Router,Route, NavLink,Redirect,Switch } from "react-router-dom";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";
// import { HashRouter as Router, Route, NavLink } from "react-router-dom";


class Registration extends Component {
    componentDidMount() {
        if (this.props.location.pathname === '/auth/sign-up/dashboard') {
            this.props.history.push('/dashboard');
            }
        else if (this.props.location.pathname === '/auth/verify') {
            this.props.history.push('/verify');
        }
        else if (this.props.location.pathname !== '/auth/sign-up') {
            this.props.history.push('/auth/');
        }
        }
  render() {
    return (
    <Router>
        <div className="auth">
            <div className="App">
            <div className="appAside d-none d-md-none d-sm-none d-lg-block col-lg-5" />
            <div className="appForm col-12 col-lg-7 col-md-12 ">
                <div className="pageSwitcher">
                <NavLink
                    exact to="/auth"
                    activeClassName="pageSwitcherItem-active"
                    className="pageSwitcherItem"
                >
                    Sign In
                </NavLink>
                <NavLink
                    to="/auth/sign-up"
                    activeClassName="pageSwitcherItem-active"
                    className="pageSwitcherItem"
                >
                    Sign Up
                </NavLink>
                </div>

                <div className="formTitle">
                <NavLink
                    exact to="/auth"
                    activeClassName="formTitleLink-active"
                    className="formTitleLink"
                >
                    Sign In
                </NavLink>{" "}
                or{" "}
                <NavLink
                    to="/auth/sign-up"
                    activeClassName="formTitleLink-active"
                    className="formTitleLink"
                >
                    Sign Up
                </NavLink>
                </div>
                    {/* <Switch> */}
                        <Route exact path="/auth/" component={SignInForm} />
                        <Route path="/auth/sign-up" component={SignUpForm} />
                        {/* <Redirect to="/auth" /> */}
                    {/* </Switch> */}
                </div>
            </div>
         </div>

        </Router>
    );
  }

//   componentDidUpdate(prevProps) {
//     if (this.props.location !== prevProps.location) {
//         if (this.props.location.pathname !== ['/auth/','/auth','/auth/sign-up','/auth/sign-up/']) {
//             this.props.history.push('/auth/');
//           }
        
//     }
//   }

}

export default Registration;
