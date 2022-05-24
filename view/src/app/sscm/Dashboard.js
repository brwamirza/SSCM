import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import { ProgressBar } from 'react-bootstrap';
import soapService from "../../services/soapRequest.service"
var XMLParser = require('react-xml-parser');

export class SubscriberStatusChange extends Component {
  constructor() {
  super();

  this.state = {
    msisdn: [],
    statusTo: "1",
    result:[]
  };

  this.onChangeStatus = this.onChangeStatus.bind(this);
  this.onChangeMsisdn = this.onChangeMsisdn.bind(this);
  this.OnStart = this.OnStart.bind(this);
}


onChangeMsisdn(e) {
  this.setState({
    msisdn: e.target.value.split('\n')
  });
    // console.log(e.target.value);
    console.log(e.target.value.split('\n'));
};

onChangeStatus(e) {
  if( e.target.value === "Active"){
    this.setState({
      statusTo: "1"
    });
  }
  if( e.target.value === "Suspend"){
    this.setState({
      statusTo: "2"
    });
  }
  if( e.target.value === "Terminate"){
    this.setState({
      statusTo: "3"
    });
  }
};


OnStart(e){
e.preventDefault();
this.state.msisdn.map(currentMsisdn => {
  soapService.SubscriberStatusChange(currentMsisdn,this.state.statusTo)
      .then(response => {
        var xml = new XMLParser().parseFromString(response.data);
        var responseValue = xml.getElementsByTagName("description")[0].value
        var responseWithMsisdn = `${currentMsisdn} : SubscriberStatusChange : ${responseValue}`
        this.setState({
          result: [...this.state.result,responseWithMsisdn]
        })
      })
      .catch(e => {
        console.log(e)
        var responseWithMsisdn = `${currentMsisdn} : SubscriberStatusChange : failed to change status`
        this.setState({
          result: [...this.state.result,responseWithMsisdn]
        })
      });
});
};

  render () {
    return (
      <div>
        <div className="row" id='dashboard'>
        <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Striped Table</h4>
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th> User </th>
                        <th> First name </th>
                        <th> Progress </th>
                        <th> Amount </th>
                        <th> Deadline </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-1">
                          <img src={require("../../assets/images/faces/face1.jpg")} alt="user icon" />
                        </td>
                        <td> Herman Beck </td>
                        <td>
                          <ProgressBar variant="success" now={25} />
                        </td>
                        <td> $ 77.99 </td>
                        <td> May 15, 2015 </td>
                      </tr>
                      <tr>
                        <td className="py-1">
                          <img src={require("../../assets/images/faces/face2.jpg")} alt="user icon" />
                        </td>
                        <td> Messsy Adam </td>
                        <td>
                          <ProgressBar variant="danger" now={75} />
                        </td>
                        <td> $245.30 </td>
                        <td> July 1, 2015 </td>
                      </tr>
                      <tr>
                        <td className="py-1">
                          <img src={require("../../assets/images/faces/face3.jpg")} alt="user icon" />
                        </td>
                        <td> John Richards </td>
                        <td>
                          <ProgressBar variant="warning" now={90} />
                        </td>
                        <td> $138.00 </td>
                        <td> Apr 12, 2015 </td>
                      </tr>
                      <tr>
                        <td className="py-1">
                          <img src={require("../../assets/images/faces/face4.jpg")} alt="user icon" />
                        </td>
                        <td> Peter Meggik </td>
                        <td>
                          <ProgressBar variant="primary" now={50} />
                        </td>
                        <td> $ 77.99 </td>
                        <td> May 15, 2015 </td>
                      </tr>
                      <tr>
                        <td className="py-1">
                          <img src={require("../../assets/images/faces/face5.jpg")} alt="user icon" />
                        </td>
                        <td> Edward </td>
                        <td>
                          <ProgressBar variant="danger" now={60} />
                        </td>
                        <td> $ 160.25 </td>
                        <td> May 03, 2015 </td>
                      </tr>
                      <tr>
                        <td className="py-1">
                          <img src={require("../../assets/images/faces/face6.jpg")} alt="user icon" />
                        </td>
                        <td> John Doe </td>
                        <td>
                          <ProgressBar variant="info" now={65} />
                        </td>
                        <td> $ 123.21 </td>
                        <td> April 05, 2015 </td>
                      </tr>
                      <tr>
                        <td className="py-1">
                          <img src={require("../../assets/images/faces/face7.jpg")} alt="user icon" />
                        </td>
                        <td> Henry Tom </td>
                        <td>
                          <ProgressBar variant="warning" now={20} />
                        </td>
                        <td> $ 150.00 </td>
                        <td> June 16, 2015 </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    );
  }
}

export default SubscriberStatusChange;