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
                  <table className="table table-striped table-hover table-bordered" >
                    <thead>
                      <tr>
                        <th> Name </th>
                        <th> sDate </th>
                        <th> rDate </th>
                        <th> eDate </th>
                        <th> OfferId </th>
                        <th> rData </th>
                        <th> rMin </th>
                        <th> rSMS </th>
                        <th> Renewable </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-1">
                          <img src={require("../../assets/images/faces/face1.jpg")} alt="user icon" />
                        </td>
                        <td> Herman Beck </td>
                        <td> May 15, 2015 </td>
                        <td> $ 77.99 </td>
                        <td> May 15, 2015 </td>
                        <td> July 1, 2015 </td>
                        <td> July 1, 2015 </td>
                        <td> July 1, 2015 </td>
                        <td> July 1, 2015 </td>
                      </tr>
                      <tr>
                        <td className="py-1">
                          <img src={require("../../assets/images/faces/face2.jpg")} alt="user icon" />
                        </td>
                        <td> Messsy Adam </td>
                        <td> May 15, 2015 </td>
                        <td> $245.30 </td>
                        <td> July 1, 2015 </td>
                        <td> July 1, 2015 </td>
                        <td> July 1, 2015 </td>
                        <td> July 1, 2015 </td>
                        <td> July 1, 2015 </td>
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