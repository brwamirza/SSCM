import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import soapService from "../../services/soapRequest.service"
var XMLParser = require('react-xml-parser');
const Promise = require('bluebird');
const wait=ms=>new Promise(resolve => setTimeout(resolve, ms));
// let StatusChange = Promise.promisify(soapService.SubscriberStatusChange);
let currentM = ""

export class SubscriberStatusChange extends Component {
  constructor() {
  super();

  this.state = {
    msisdn: [],
    statusTo: "1",
    result:[],
    cMsisdn:[]
  };

  this.onChangeStatus = this.onChangeStatus.bind(this);
  this.onChangeMsisdn = this.onChangeMsisdn.bind(this);
  this.onChangeResult = this.onChangeResult.bind(this);
  this.OnStart = this.OnStart.bind(this);
}


onChangeMsisdn(e) {
  this.setState({
    msisdn: e.target.value.split('\n')
  });
    // console.log(e.target.value);
    console.log(e.target.value.split('\n'));
};

onChangeResult(e) {
  this.setState({
    result: e.target.value.split('\n')
  });
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

this.state.msisdn.map( async currentMsisdn => {
  // await wait(3*1000).then(async() => {
    // console.log("res")

    let response = await soapService.SubscriberStatusChange(currentMsisdn,this.state.statusTo)
    // if(response){
          let currentResponse = response.data
          console.log(response);
          let xml = new XMLParser().parseFromString(currentResponse);
          let responseValue = xml.getElementsByTagName("description")[0].value
          console.log(responseValue)
          let cMsisdn = xml.getElementsByTagName("msisdn")[0].value
          console.log(cMsisdn)
          let responseWithMsisdn = `${cMsisdn} : SubscriberStatusChange : ${responseValue}`
          this.setState({
            result: [...this.state.result,responseWithMsisdn]
          })
        // })
    // }

  // soapService.SubscriberStatusChange(currentMsisdn,this.state.statusTo)
  //     .then(response => {
  //         response.data.map( currentResponse => {
  //         console.log(currentResponse)
  //         let xml = new XMLParser().parseFromString(currentResponse);
  //         let responseValue = xml.getElementsByTagName("description")[0].value
  //         let cMsisdn = xml.getElementsByTagName("msisdn")[0].value
  //         console.log(cMsisdn)
  //         let responseWithMsisdn = `${cMsisdn} : SubscriberStatusChange : ${responseValue}`
  //         this.setState({
  //           result: [...this.state.result,responseWithMsisdn]
  //         })
  //       });
  //     })
  //     .catch(e => {
  //       console.log(e)
  //       let responseWithMsisdn = `${currentMsisdn} : SubscriberStatusChange : failed to change status`
  //       this.setState({
  //         result: [...this.state.result,responseWithMsisdn]
  //       })
  //     })

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
                    <textarea className="form-control textarea-control" id="exampleTextarea12" rows="30"  onChange={this.onChangeResult} value={this.state.result.join('\n')} spellCheck="false">
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