import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import { ProgressBar } from 'react-bootstrap';
import soapService from "../../services/soapRequest.service"
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import TabContainer from 'react-bootstrap/TabContainer'
import TabContent from 'react-bootstrap/TabContent'


var XMLParser = require('react-xml-parser');


export class SubscriberStatusChange extends Component {
  constructor() {
  super();

  this.state = {
    msisdn: [],
    statusTo: "1",
    result:[],
    availableOffers:[]
  };

  this.onChangeStatus = this.onChangeStatus.bind(this);
  this.onChangeMsisdn = this.onChangeMsisdn.bind(this);
  this.OnSearchMsisdnInfo = this.OnSearchMsisdnInfo.bind(this);
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


OnSearchMsisdnInfo(e){
e.preventDefault();
  soapService.RetrieveSubscriptions(this.state.msisdn)
      .then(response => {
        this.setState({
          availableOffers: []
        })
        let currentOffers = []
        let xml = new XMLParser().parseFromString(response.data);
        currentOffers = xml.getElementsByTagName("externalOfferId")[0].value

        let airOfferDetails = xml.getElementsByTagName("attribute")[4]
        let details = airOfferDetails.getElementsByTagName("value")[0].value
        // coverting details result froms tring to JSOn to access the data
        details = details

        this.setState({
          availableOffers: [...this.state.availableOffers,currentOffers]
        })
        console.log(details);
      })
      .catch(e => {
        console.log(e)
        var responseWithMsisdn = `${this.state.msisdn} : failed to retrieve subscriptions`
      });
};

  render () {
    return (
      <div id='dashboard'>
        <div className="row">
        <div className="col-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">SSCM offers</h4>
                <form className="form-sample">
                  <div className="row mt-5">
                    <div className="col-md-4 d-inline">
                        <Form.Group>
                        <Form.Control type="text" className="form-control" placeholder="msisdn" aria-label="Msisdn" onChange={this.onChangeMsisdn} />
                        </Form.Group>
                    </div>
                    <div className="col-md-2">
                    <button type="submit" className="btn btn-primary btn-md btn-block mr-2" onClick={this.OnSearchMsisdnInfo}>Search</button>
                    </div>
                    </div>
                </form>
                {/* Tabs */}
                <div>
                  <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
                    <Tab eventKey="profile" title="Profile">
                      <div>
                      <div className='row'>
                          <div className="col-md-12 grid-margin stretch-card">
                            <div className="card">
                              <div className="card-body d-flex">
                                <h4 className="card-title">STATUS</h4>
                                <h4 className="flex-center">ACTIVE</h4>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* row 2 */}
                        <div className='row'>
                          <div className="col-md-4 grid-margin stretch-card">
                          <div className="card">
                            <div className="card-body d-flex">
                              <h6 className="card-title">S_C_Current:&nbsp;</h6>
                              <p className="card-description"> 663 - CS_Postpaid</p>
                            </div>
                            </div>
                          </div>
                          <div className="col-md-4 grid-margin stretch-card">
                          <div className="card">
                            <div className="card-body d-flex">
                              <h6 className="card-title">Supervision Expiry Date:&nbsp; </h6>
                              <p className="card-description">20371231120000</p>
                            </div>
                            </div>
                          </div>
                          <div className="col-md-4 grid-margin stretch-card">
                          <div className="card">
                            <div className="card-body d-flex">
                              <h6 className="card-title">Service Fee Expiry Date:&nbsp;</h6>
                              <p className="card-description">20371231120000</p>
                            </div>
                            </div>
                          </div>
                        </div>
                      {/* row 2 */}
                        <div className='row'>
                          <div className="col-md-4 grid-margin stretch-card">
                          <div className="card">
                            <div className="card-body d-flex">
                              <h6 className="card-title">Activation Date:&nbsp;</h6>
                              <p className="card-description">20190520120000</p>
                            </div>
                            </div>
                          </div>
                          <div className="col-md-4 grid-margin stretch-card">
                          <div className="card">
                            <div className="card-body d-flex">
                              <h6 className="card-title">Language:&nbsp;</h6>
                              <p className="card-description">English</p>
                            </div>
                            </div>
                          </div>
                          <div className="col-md-4 grid-margin stretch-card">
                          <div className="card">
                            <div className="card-body d-flex">
                              <h6 className="card-title">Main Balance:&nbsp;</h6>
                              <p className="card-description">4500</p>
                            </div>
                            </div>
                          </div>
                        </div>
                      {/* row 3 */}
                        <div className='row'>
                          <div className="col-md-4 grid-margin stretch-card">
                          <div className="card">
                            <div className="card-body d-flex">
                              <h6 className="card-title">Location Number:&nbsp;</h6>
                              <p className="card-description">964750005</p>
                            </div>
                            </div>
                          </div>
                          <div className="col-md-4 grid-margin stretch-card">
                          <div className="card">
                            <div className="card-body d-flex">
                              <h6 className="card-title">Employee Balance:&nbsp;</h6>
                              <p className="card-description">0</p>
                            </div>
                            </div>
                          </div>
                          <div className="col-md-4 grid-margin stretch-card">
                          <div className="card">
                            <div className="card-body d-flex">
                              <h6 className="card-title">Expire:&nbsp;</h6>
                              <p className="card-description">18 days</p>
                            </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                    </Tab>
                    <Tab eventKey="offers" title="Offers">
                     <div className="row" >
                        <div className="col-lg-12 grid-margin stretch-card">
                            <div className="card">
                              <div className="card-body">
                                {/* <h4 className="card-title">Striped Table</h4> */}
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
                    </Tab>
                    <Tab eventKey="contact" title="Contact">
                      {/* <Sonnet /> */}
                      <p>Tab3</p>
                    </Tab>
                  </Tabs>
                </div>
                {/* END of Tabs */}
              </div>
            </div>
          </div>
        </div>
        {/* <div className="row" >
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
        </div> */}
      </div> 
    );
  }
}

export default SubscriberStatusChange;