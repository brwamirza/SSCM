import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import soapService from "../../services/soapRequest.service"
var XMLParser = require('react-xml-parser');

export class SubscriberStatusChange extends Component {
  constructor() {
  super();

  this.state = {
    msisdn: [],
    statusTo: "",
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
        console.log(currentMsisdn + " finished successfully");
        var xml = new XMLParser().parseFromString(response.data);
        var responseValue = xml.getElementsByTagName("description")[0].value
        this.setState({
          result: [...this.state.result,responseValue]
        })
        console.log(this.state.result);
      })
      .catch(e => {
        console.log(e)
        console.log(currentMsisdn + " failed to change status");
      });
});
};

  render () {
    return (
      <div>
        <div className="row" id='SubscriberStatusChange'>
        <div className="col-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">SSCM Subscriber status change - Production</h4>
                <form className="form-sample">
                  <div className="row mt-5">
                    <div className="col-md-2">
                    <Form.Group>
                    <label htmlFor="exampleTextarea1">MSISDN</label>
                    <textarea className="form-control textarea-control" id="exampleTextarea1" onChange={this.onChangeMsisdn} rows="20"></textarea>
                    </Form.Group>
                    <Form.Group>
                  <label htmlFor="status">Status</label>
                  <select className="form-control" onChange={this.onChangeStatus} id="status">
                    <option>Active</option>
                    <option>Suspend</option>
                    <option>Terminate</option>
                  </select>
                </Form.Group>
                    <button type="submit" className="btn btn-primary mr-2" onClick={this.OnStart}>Start</button>
                    <button className="btn btn-dark" >Cancel</button>
                    </div>

                    <div className="col-md-9 offset-1">
                    <Form.Group>
                    <label htmlFor="exampleTextarea1">Result</label>
                    <textarea className="form-control textarea-control" id="exampleTextarea12" rows="30">
                    </textarea>
                    </Form.Group>
                    </div>
                    </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div> 
    );
  }
}

export default SubscriberStatusChange;