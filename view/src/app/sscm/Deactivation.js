import React, { Component } from 'react';
import { Line,Doughnut } from 'react-chartjs-2';
import Slider from "react-slick";
import { TodoListComponent } from '../apps/TodoList'
import { VectorMap } from "react-jvectormap"
import { Form } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import soapService from "../../services/soapRequest.service"

export class Deactivation extends Component {
  constructor() {
  super();

  this.state = {
    msisdn: [],
    statusTo: ""
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
    // console.log(e.target.value.split('\n'));
};

onChangeStatus(e) {
  this.setState({
    statusTo: e.target.value
  });
};

OnStart(e){
e.preventDefault();
this.state.msisdn.map(currentMsisdn => {
  // soapService.SubscriberStatusChange(currentMsisdn,this.state.statusTo)
      // .then(response => {
      //   console.log(currentMsisdn + " finished successfully");
      //   console.log(response);
      // })
      // .catch(e => {
      //   console.log(e)
      //   console.log(currentMsisdn + " failed to change status");
      // });
});
};

  render () {
    return (
      <div>
        <div className="row" id='SubscriberStatusChange'>
        <div className="col-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">SSCM Stop renewal - Production</h4>
                <form className="form-sample">
                  <div className="row mt-5">
                    <div className="col-md-2">
                    <Form.Group>
                    <label htmlFor="exampleTextarea1">MSISDN</label>
                    <textarea className="form-control textarea-control" id="exampleTextarea1" onChange={this.onChangeMsisdn} rows="20"></textarea>
                    </Form.Group>
                    <Form.Group>
                    <label htmlFor="exampleTextarea1">Offer Id</label>
                      <div>
                      <Form.Control  type="text" />
                      </div>
                    </Form.Group>
                    <Form.Group>
                    <label htmlFor="exampleTextarea1">Campaign Id</label>
                      <div>
                      <Form.Control  type="text" />
                      </div>
                    </Form.Group>
                    <Form.Group>
                    <label htmlFor="status">Action Type</label>
                    <select className="form-control" onChange={this.onChangeStatus} id="status">
                      <option>Stop Renewal</option>
                      <option>Terminate</option>
                    </select>
                   </Form.Group>
                    <button type="submit" className="btn btn-primary mr-2" onClick={this.OnStart}>Start</button>
                    <button className="btn btn-dark" >Cancel</button>
                    </div>

                    <div className="col-md-9 offset-1">
                    <Form.Group>
                    <label htmlFor="exampleTextarea1">Result</label>
                    <textarea className="form-control textarea-control" id="exampleTextarea12"  rows="40"></textarea>
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

export default Deactivation;