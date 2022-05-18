import React, { Component } from 'react';
import { Line,Doughnut } from 'react-chartjs-2';
import Slider from "react-slick";
import { TodoListComponent } from '../apps/TodoList';
import { VectorMap } from "react-jvectormap";
import { Form } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import soapService from "../../services/soapRequest.service";
const separator='';
const current = new Date();
const date = `${current.getFullYear()}${separator}${current.getMonth()+1<10?`0${current.getMonth()+1}`:`${current.getMonth()+1}`}${separator}${current.getDate()}`

export class Deactivation extends Component {
  constructor() {
  super();

  this.state = {
    msisdn: [],
    offerId: "",
    campaignId:"",
    actionType:"",
    channel:"APPSUPPORT",
    currentDate:"",
    transactionId:"APPSUPPORT",
    currentDate: date
  };

  this.onChangeMsisdn = this.onChangeMsisdn.bind(this);
  this.onChangeOfferId = this.onChangeOfferId.bind(this);
  this.onChangeCampaignId = this.onChangeCampaignId.bind(this);
  this.onChangeActionType = this.onChangeActionType.bind(this);
  this.onChangeChannel = this.onChangeChannel.bind(this);
  this.onChangeTransactionId = this.onChangeTransactionId.bind(this);
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

onChangeChannel(e) {
  this.setState({
    channel: e.target.value
  });
};

onChangeTransactionId(e) {
  this.setState({
    transactionId: e.target.value
  });
};

OnStart(e){
e.preventDefault();
if (this.state.actionType == "Stop Renewal"){
console.log("stop renewal started");
this.state.msisdn.map(currentMsisdn => {
  soapService.StopRenewal(currentMsisdn,this.state.offerId,this.state.campaignId,this.state.channel,this.state.currentDate,this.state.transactionId)
});
};

if (this.state.actionType == "Terminate"){
  console.log("termination started");
  this.state.msisdn.map(currentMsisdn => {
    soapService.TerminateOffer(currentMsisdn,this.state.offerId,this.state.channel)
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
                    <div className="col-md-3">
                    <Form.Group>
                    <label htmlFor="exampleTextarea1">MSISDN</label>
                    <textarea className="form-control textarea-control" id="exampleTextarea1" onChange={this.onChangeMsisdn} rows="20"></textarea>
                    </Form.Group>
                    <div className='row'>
                      <div className='col col-md-6'>
                        <Form.Group>
                        <label htmlFor="exampleTextarea1">Offer Id</label>
                        <div>
                        <Form.Control  type="text" onChange={this.onChangeOfferId} />
                      </div>
                    </Form.Group>
                      </div>

                      <div className='col col-md-6'>
                       <Form.Group>
                        <label htmlFor="exampleTextarea1">Campaign Id</label>
                        <div>
                        <Form.Control  type="text" onChange={this.onChangeCampaignId}/>
                        </div>
                       </Form.Group>
                      </div>
                    </div>
                    <Form.Group>
                    <label htmlFor="status">Channel</label>
                    <select className="form-control" onChange={this.onChangeChannel} id="status">
                      <option>APPSUPPORT</option>
                      <option>CRM</option>
                      <option>CORPORATE</option>
                    </select>
                    </Form.Group>
                    <Form.Group>
                    <label htmlFor="status">Action Type</label>
                    <select className="form-control" onChange={this.onChangeActionType} id="status">
                      <option>Stop Renewal</option>
                      <option>Terminate</option>
                    </select>
                   </Form.Group>
                   <Form.Group>
                    <label htmlFor="exampleTextarea1">Transaction Id (Reason)</label>
                      <div>
                      <Form.Control  type="text" onChange={this.onChangeTransactionId}/>
                      </div>
                    </Form.Group>
                    <button type="submit" className="btn btn-primary mr-2" onClick={this.OnStart}>Start</button>
                    <button className="btn btn-dark" >Cancel</button>
                    </div>

                    <div className="col-md-9 ">
                    <Form.Group>
                    <label htmlFor="exampleTextarea1">Result</label>
                    <textarea className="form-control textarea-control" id="exampleTextarea12"  rows="42"></textarea>
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