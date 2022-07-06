import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import { ProgressBar } from 'react-bootstrap';
import soapService from "../../services/soapRequest.service"
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import TabContainer from 'react-bootstrap/TabContainer'
import TabContent from 'react-bootstrap/TabContent'


var XMLParser = require('react-xml-parser');

const Offer = props => (
  <tr>
    <td className='w-100'>{props.offer[0]}</td>
    <td className='w-100'>{props.offer[1]}</td>
    <td className='w-100'>{props.offer[2]}</td>
    <td className='w-100'>{props.offer[3]}</td>
    <td className='w-100'>{props.offer[4]}</td>
    <td className='w-100'>{props.offer[5]}</td>
    <td className='w-100'>{props.offer[6]}</td>
    <td className='w-100'>{props.offer[7]}</td>
    <td className='w-100'>{props.offer[8]}</td>
    <td className='w-100'>{props.offer[9]}</td>
  </tr>
)

export class SubscriberStatusChange extends Component {
  constructor(props) {
  super(props);

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
    // console.log(e.target.value.split('\n'));
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
        let offerName = ""
        let offerList = []
        let subscriptions = []
        let RenewalFlagList = []
        let xml = new XMLParser().parseFromString(response.data);
        offerName = xml.getElementsByTagName("externalOfferId")[0].value
        // rDate = xml.getElementsByTagName("nextRenewalDate")[0].value

        // let checkRenewable = xml.getElementsByTagName("retrieveSubscriptionsReturn")[0]
        // let offerStatus = checkRenewable.getElementsByTagName("subscriptionStatus")[0].value
        
        // loop through subscriptions
        subscriptions = xml.getElementsByTagName("subscription")
        let allAttributes = xml.getElementsByTagName("attribute")
        allAttributes.map(currentAttr => {
              // check renewal flag
              let renewalText = currentAttr.getElementsByTagName("name")[0].value
              if (renewalText.includes("RENEWABLE")){
                let RenewalAttr =  currentAttr.getElementsByTagName("value")[0].value
                if(RenewalAttr != "NA"){
                  let RenewalFlagAttr = JSON.parse(RenewalAttr).expirydate
                  RenewalFlagList = [...RenewalFlagList,RenewalFlagAttr ]
                }
              }
        })


        subscriptions.map(currentSub => {
          let campaignName = ""
          let rData = "0"
          let nextRenewalDate = ""
          let rMin = "0"
          let rSMS = "0"
          let rMoney = "0"
          let startDate = ""
          let sameGroupOfferList = ""
          let renewalFlag = ""

          console.log(currentSub)
          let offerStatus = currentSub.getElementsByTagName("subscriptionStatus")[0].value
          // checking subscription status
            if(offerStatus == "1"){
            console.log("active")
            campaignName = currentSub.getElementsByTagName("campaignName")[0].value
            startDate = currentSub.getElementsByTagName("startDate")[0].value
            nextRenewalDate = currentSub.getElementsByTagName("nextRenewalDate")[0].value 
            let AIRDetails = currentSub.getElementsByTagName("service")[0]  
            let serviceExpiryDate = AIRDetails.getElementsByTagName("serviceExpiryDate")[0].value
            let offerAttrubutes = AIRDetails.getElementsByTagName("attribute")
            offerAttrubutes.map(currentAttr => {

              if (currentAttr.getElementsByTagName("name")[0].value === "OFFER_LIST"){
                // get air details
                sameGroupOfferList = currentAttr.getElementsByTagName("value")[0].value
                console.log(sameGroupOfferList)
                let sameGroupOffersJson = JSON.parse(sameGroupOfferList).offerlist
                let sameGroupOffersJsonUL = JSON.parse(sameGroupOfferList)
                
                if(sameGroupOffersJson){
                  sameGroupOffersJson.map(currentGroup => {
                    console.log(currentGroup)
                    if(RenewalFlagList.includes(currentGroup.expirydate)){
                      console.log("worked")
                      renewalFlag = "True"
                    }
                    else{
                      renewalFlag = "False"
                    }
                    
                    if(currentGroup.activeData){
                      rData = (parseInt(((currentGroup.activeData/1024)/1024))+" MB")
                    }
                    if(currentGroup.activeMinutes){
                      rMin = (parseInt(((currentGroup.activeMinutes/60)))+" Min")
                    }
                    if(currentGroup.Sms){
                      rSMS = (parseInt(((currentGroup.activeSms))))
                    }
                    if(currentGroup.activeMoney){
                      rMoney = (parseInt(((currentGroup.activeMoney))))
                    }
                    let offer = [
                      campaignName,
                      currentGroup.startdate,
                      nextRenewalDate,
                      currentGroup.expirydate,
                      currentGroup.offerid,
                      rData,
                      rMin,
                      rSMS,
                      rMoney,
                      renewalFlag
                    ]
  
                    this.setState({
                      availableOffers: [...this.state.availableOffers,offer]
                    })
                  })
                }
                else {
                  sameGroupOffersJsonUL.map(currentGroup => {
                    let offerIdAir = "0"
                    console.log(currentGroup)
  
                    if(currentGroup.activeData){
                      rData = (parseInt(((currentGroup.activeData/1024)/1024))+" MB")
                    }
                    if(currentGroup.activeMinutes){
                      rMin = (parseInt(((currentGroup.activeMinutes/60)))+" Min")
                    }
                    if(currentGroup.Sms){
                      rSMS = (parseInt(((currentGroup.activeSms))))
                    }
                    if(currentGroup.activeMoney){
                      rMoney = (parseInt(((currentGroup.activeMoney))))
                    }
                    if(currentGroup.name === "OFFER_ID"){
                      offerIdAir = currentGroup.value
                    }
                    let offer = [
                      campaignName,
                      startDate,
                      nextRenewalDate,
                      serviceExpiryDate,
                      offerIdAir,
                      rData,
                      rMin,
                      rSMS,
                      rMoney,
                      renewalFlag
                    ]
  
                    this.setState({
                      availableOffers: [...this.state.availableOffers,offer]
                    })
                  })
                }

              }
            })
            console.log("-----------------------------")
          }
          if(offerStatus == "2"){
            rData = ""
            rMin = ""
            rSMS = ""
            rMoney = ""
            let offerIdAir = ""
            campaignName = currentSub.getElementsByTagName("campaignName")[0].value
            startDate = currentSub.getElementsByTagName("startDate")[0].value
            nextRenewalDate = currentSub.getElementsByTagName("nextRenewalDate")[0].value 
            let AIRDetails = currentSub.getElementsByTagName("service")[0]  
            let serviceExpiryDate = AIRDetails.getElementsByTagName("serviceExpiryDate")[0].value

            let offer = [
              campaignName,
              startDate,
              nextRenewalDate,
              serviceExpiryDate,
              offerIdAir,
              rData,
              rMin,
              rSMS,
              rMoney,
              renewalFlag
            ]
            this.setState({
              availableOffers: [...this.state.availableOffers,offer]
            })
            console.log("-----------------------------")

          }
          else{
            rData = ""
            rMin = ""
            rSMS = ""
            rMoney = ""

            console.log("-----------------------------")

          }
        })

        // if(offerStatus == "1"){
        //   let renewalArraySize = checkRenewable.getElementsByTagName("attributes").length
        //   checkRenewable = checkRenewable.getElementsByTagName("attributes")[renewalArraySize-1]
        //   checkRenewable = checkRenewable.getElementsByTagName("value")[0].value
        //   if(checkRenewable === "NA"){
        //     checkRenewable = "False"
        //   }
        //   else{
        //     checkRenewable = "True"
        //   }
        // }
        // else{
        //   rData = ""
        //   rMin = ""
        //   rSMS = ""
        //   rMoney = ""
        // }

        // renewable = renewable.getElementsByTagName("value")[0].value
        // let airOfferDetails = xml.getElementsByTagName("service")
        // console.log(airOfferDetails)
        // xml.getElementsByTagName("attribute").map(currentValue => {
        //   if(xml.getElementsByTagName("attribute").value === "")
        // })
        // let details = airOfferDetails.getElementsByTagName("value")[0].value

        // coverting details result froms tring to JSON to access the data
        // details = JSON.parse(details)
        // console.log(details)
        // details = details.offerlist[0] //list of same group, use map to loop through)

        // if(details.activeData){
        //   rData = (parseInt(((details.activeData/1024)/1024))+" MB")
        // }
        // if(details.activeMinutes){
        //   rMin = (parseInt(((details.activeMinutes/60)))+" Min")
        // }
        // if(details.Sms){
        //   rSMS = (parseInt(((details.activeSms))))
        // }
        // if(details.activeMoney){
        //   rMoney = (parseInt(((details.activeMoney))))
        // }

        // let rData = details.activeData
        // offerList = [
        //   offerName,
        //   details.startdate,
        //   rDate,
        //   details.expirydate,
        //   details.offerid,
        //   rData,
        //   rMin,
        //   rSMS,
        //   rMoney,
        //   checkRenewable
        // ]

        // this.setState({
        //   availableOffers: [...this.state.availableOffers,offerList]
        // })
        console.log(this.state.availableOffers)

      })
      .catch(e => {
        console.log(e)
        var responseWithMsisdn = `${this.state.msisdn} : failed to retrieve subscriptions`
      });
};

offerList() {
  return this.state.availableOffers.map(currentOffer => {
    return <Offer offer={currentOffer} key={currentOffer[1]}/>;
  })
}

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
                                        <th> rMoney </th>
                                        <th> Renewable </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {this.offerList()}
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