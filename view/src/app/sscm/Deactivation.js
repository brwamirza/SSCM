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
    offerId: "",
    campaignId:"",
    actionType:""
  };

  this.onChangeMsisdn = this.onChangeMsisdn.bind(this);
  this.onChangeOfferId = this.onChangeOfferId.bind(this);
  this.onChangeCampaignId = this.onChangeCampaignId.bind(this);
  this.onChangeActionType = this.onChangeActionType.bind(this);
  this.OnStart = this.OnStart.bind(this);
}

onChangeMsisdn(e) {
  this.setState({
    msisdn: e.target.value.split('\n')
  });
};

onChangeOfferId(e) {
  this.setState({
    offerId: e.target.value
  });
};

onChangeCampaignId(e) {
  this.setState({
    campaignId: e.target.value
  });
};

onChangeActionType(e) {
  this.setState({
    actionType: e.target.value
  });
};

OnStart(e){
e.preventDefault();
if (this.state.actionType = "Stop Renewal"){
this.state.msisdn.map(currentMsisdn => {
  soapService.SubscriberStatusChange(currentMsisdn,this.state.offerId,this.state.campaignId)
});
};
if (this.state.actionType = "Terminate"){
  this.state.msisdn.map(currentMsisdn => {
    soapService.SubscriberStatusChange(currentMsisdn,this.state.offerId,this.state.campaignId)
  });
};
};

  render () {
    return (
      <div>
        <div className="row" id='SubscriberStatusChange'>
        <div className="col-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">SSCM Deactivation - Production</h4>
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
                      <Form.Control  type="text" onChange={this.onChangeOfferId} />
                      </div>
                    </Form.Group>
                    <Form.Group>
                    <label htmlFor="exampleTextarea1">Campaign Id</label>
                      <div>
                      <Form.Control  type="text" onChange={this.onChangeCampaignId}/>
                      </div>
                    </Form.Group>
                    <Form.Group>
                    <label htmlFor="status">Action Type</label>
                    <select className="form-control" onChange={this.onChangeActionType} id="status">
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