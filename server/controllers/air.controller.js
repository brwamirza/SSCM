const db = require("../models");
const Op = db.Sequelize.Op;
const fs = require('fs')
const xml2js = require('xml2js');
const parser = new xml2js.Parser({mergeAttrs:true});
let result = [];


// Find all published Users
exports.retrieveSubscriberInfo = (req, res) => {
    const XMLHttpRequest = require('xhr2');
    const xmlhttp = new XMLHttpRequest();
    let xmlResponse = "";

        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    xmlResponse = xmlhttp.response
                    result = '<body>'+'<msisdn>'+req.body.msisdn+'</msisdn>'+xmlResponse+'</body>'
                    console.log(result)
                    res.send(result);
                    result = [];
                }
            }
        }
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


    // Send the POST request
    // xmlhttp.setRequestHeader('PublicKeyToken','b77a5c561934e089');
    xmlhttp.setRequestHeader('soapAction','com.ericsson.esdp.flowmanager/subscriberStatusChange');
    xmlhttp.setRequestHeader('Content-Type','application/xml'); 
    let response = xmlhttp.send(sr)
    // xmlResponse = await xmlhttp.response
    // result = [...result,'<body>'+'<msisdn>'+req.body.msisdn+'</msisdn>'+xmlResponse+'</body>']


};