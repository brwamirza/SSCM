import React, { Component } from 'react'
import UserDataService from "../../services/user.service";

export class VerifyEmail extends Component {

  componentDidMount(){
    console.log(this.props.match.params.token)
    if(this.props.match.params.token !== undefined){
      console.log('log 1')
      UserDataService.verifyEmail(this.props.match.params.token).then(() => {
        console.log('log 1')
        this.props.history.push("/dashboard");
        window.location.reload();
        console.log('log 2')
      });
    }
  }

  render() {
    return (
      <div>
        <div className="page-header">
          <h3 className="page-title"> Verify Email </h3>
        </div>
        <div className="row">
          <div className="col-md-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title"></h4>
                <blockquote className="blockquote">
                  <p className="mb-4 display-4 ">Hello [name/email address]</p>
                  <p>
                    Are you ready to gain access to all of the features we prepared for you?
                  </p>
                  <p className="mb-0">
                    First, you must complete your registration by clicking on the button below:
                  </p>
                  <button type="button" className="btn btn-success btn-fw mt-4">Send Verification email</button>
                  <p className="pt-4">
                    This link will verify your email address, and then you’ll officially be a part of the [customer portal] community.
                  </p>
                  <p>
                    See you there!
                  </p>  
                  <p>
                    Best regards, the [company] team
                  </p>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default VerifyEmail
