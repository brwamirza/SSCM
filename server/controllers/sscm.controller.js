const db = require("../models");
const Op = db.Sequelize.Op;
var XMLHttpRequest = require('xhr2');
var xmlhttp = new XMLHttpRequest();
const fs = require('fs')
const xml2js = require('xml2js');
const parser = new xml2js.Parser({ explicitArray: false});

// Find all published Users
exports.subscriberStatusChange = (req, res) => {
    xmlhttp.open('POST', 'http://10.26.57.7:9080/esdp-wsPort', true);
       var sr=
        '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.esdp.ericsson.com">'+
        '<soapenv:Header/>'+
        '<soapenv:Body>'+
        '<ws:subscriberStatusChange>'+
        '<ws:msisdn>'+req.body.msisdn+'</ws:msisdn>'+
        '<ws:newStatus>'+req.body.statusTo+'</ws:newStatus>'+
        '<ws:transactionId>'+req.body.msisdn+'</ws:transactionId>'+
        '</ws:subscriberStatusChange>'+
        '</soapenv:Body>'+
        '</soapenv:Envelope>';

        xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {
                parser.parseString(xmlhttp.response, (err, result) => {
                    if(err){
                        throw err;
                    }
                    // success response to front end
                    else{
                        console.log(JSON.stringify(result,null, 1));

                    }
                })
                // alert('done. use firebug/console to see network response');
            }
        }
    }
    // Send the POST request
    // xmlhttp.setRequestHeader('PublicKeyToken','b77a5c561934e089');
    xmlhttp.setRequestHeader('soapAction','com.ericsson.esdp.flowmanager/subscriberStatusChange');
    xmlhttp.setRequestHeader('Content-Type','application/xml'); 
    response = xmlhttp.send(sr);
};

exports.terminateOffer = (req, res) => {
    xmlhttp.open('POST', 'http://10.26.57.7:9080/esdp-wsPort', true);
       var sr=
       '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.esdp.ericsson.com">'+
       '<soapenv:Header/>'+
       '<soapenv:Body>'+
          '<ws:subscriptionCancel>'+
             '<ws:msisdn>'+req.body.msisdn+'</ws:msisdn>'+
             '<ws:esdpOfferId>'+req.body.offerId+'</ws:esdpOfferId>'+
             '<ws:externalOfferId xsi:nil="true" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"/>'+
             '<ws:cancellationChannel>'+req.body.channel+'</ws:cancellationChannel>'+
             '<ws:cancellationType>1</ws:cancellationType>'+
             '<ws:transactionId>CampaignCancellation</ws:transactionId>'+
             '<ws:externalSubscriptionId>immediateCancellation</ws:externalSubscriptionId>'+
             '<ws:cancellationOption>1</ws:cancellationOption>'+
             '<ws:attributes>'+
                '<!--1 or more repetitions:-->'+
                 '<ws:attribute>'+
                   '<ws:name>fulfillOnReserve</ws:name>'+
                   '<ws:value>1</ws:value>'+
                   '<ws:actionType xsi:nil="true" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"/>'+
                   '<ws:previousValue />'+
                '</ws:attribute>'+
             '</ws:attributes>'+
          '</ws:subscriptionCancel>'+
       '</soapenv:Body>'+
    '</soapenv:Envelope>';

        xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {
                parser.parseString(xmlhttp.response, (err, result) => {
                    if(err){
                        throw err;
                    }
                    else{
                        console.log(JSON.stringify(result,null, 1));
                    }
                })
                // alert('done. use firebug/console to see network response');
            }
        }
    }
    // Send the POST request
    // xmlhttp.setRequestHeader('PublicKeyToken','b77a5c561934e089');
    xmlhttp.setRequestHeader('soapAction','com.ericsson.esdp.flowmanager/subscriptionCancel');
    xmlhttp.setRequestHeader('Content-Type','application/xml'); 
    response = xmlhttp.send(sr);
};

exports.stopRenewal = (req, res) => {
    xmlhttp.open('POST', 'http://10.26.57.7:9080/esdp-wsPort', true);
       var sr=
       '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://ws.esdp.ericsson.com">'+
   '<soapenv:Header/>'+
   '<soapenv:Body>'+
      '<ws:subscriptionCreate>'+
         '<ws:esdpOfferId>'+req.body.offerId+'</ws:esdpOfferId>'+
         '<ws:campaignId>'+req.body.campaignId+'</ws:campaignId>'+
         '<ws:externalSubscriptionId>'+req.body.msisdn+'</ws:externalSubscriptionId>'+
         '<ws:receiverMsisdn>'+req.body.msisdn+'</ws:receiverMsisdn>'+
         '<ws:payerMsisdn>'+req.body.msisdn+'</ws:payerMsisdn>'+
         '<ws:requestChannel>'+req.body.channel+'</ws:requestChannel>'+
         '<ws:preferredLanguage xsi:nil="true" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"/>'+
         '<ws:attributes>'+
            '<ws:attribute>'+
               '<ws:name>fulfillOnReserve</ws:name>'+
               '<ws:value>0</ws:value>'+
               '<ws:actionType xsi:nil="true" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"/>'+
               '<ws:previousValue />'+
            '</ws:attribute>'+
            '<ws:attribute>'+
               '<ws:name>SELECTION_DATE</ws:name>'+
               '<ws:value>sscm-'+req.body.currentDate+'000000</ws:value>'+
               '<ws:actionType>2</ws:actionType>'+
               '<ws:previousValue/>'+
            '</ws:attribute>'+   
             '<ws:attribute>'+
              '<ws:name>ACTION_TYPE</ws:name>'+
              '<ws:value>NOOP</ws:value>'+
             '</ws:attribute>'+ 
         '</ws:attributes>'+
         '<ws:transactionId>'+req.body.transactionId+'</ws:transactionId>'+
         '<ws:eventType>2</ws:eventType>'+
         '<ws:eventOption>1</ws:eventOption>'+
         '<ws:initialChargeOption>1</ws:initialChargeOption>'+
         '<ws:initialChargedAmount>0</ws:initialChargedAmount>'+
      '</ws:subscriptionCreate>'+
   '</soapenv:Body>'+
'</soapenv:Envelope>';

        xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {
                parser.parseString(xmlhttp.response, (err, result) => {
                    if(err){
                        throw err;
                    }
                    else{
                        console.log(JSON.stringify(result,null, 1));
                    }
                })
                // alert('done. use firebug/console to see network response');
            }
        }
    }
    // Send the POST request
    // xmlhttp.setRequestHeader('PublicKeyToken','b77a5c561934e089');
    xmlhttp.setRequestHeader('soapAction','com.ericsson.esdp.flowmanager/subscriptionCreate');
    xmlhttp.setRequestHeader('Content-Type','application/xml'); 
    response = xmlhttp.send(sr);
};