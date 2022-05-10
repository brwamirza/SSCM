const db = require("../models");
const config = require("../config/auth.config");
const User = db.users;
const Token = db.tokens;
var nodemailer = require('nodemailer');
const Op = db.Sequelize.Op;
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var XMLHttpRequest = require('xhr2');
var xmlhttp = new XMLHttpRequest();
const soapRequest = require('easy-soap-request');
const fs = require('fs')
const xml2js = require('xml2js');
const parser = new xml2js.Parser({ explicitArray: false});

// Find all published Users
exports.subscriberStatusChange = (req, res) => {
    // const url = 'http://10.26.57.07:9080/esdp-wsPort'
    // const sampleHeader = {
    //     'user-agent':'sampleTest',
    //     'Content-Type':'text/xml;charset=UTF-8',
    //     'soapAction':'com.ericsson.esdp.flowmanager/subscriberStatusChange',
    //     'PublicKeyToken':'b77a5c561934e089'
    // };
    // const xml = fs.readFileSync('./xmlBody/subscriberStatusChange.xml','utf-8');

    // // usage of module
    // (async () => {
    //     const {response} = await soapRequest ({url:url, headers:sampleHeader, xml:xml});
    //     const {headers, body, statusCode} = response;
    //     console.log(headers);
    //     console.log(body);
    //     console.log(statusCode);
    // })();
    xmlhttp.open('POST', 'http://10.26.57.7:9080/esdp-wsPort', true);
    // const xml = fs.readFileSync('./xmlBody/subscriberStatusChange.xml','utf-8');
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
                    // console.log(result)
                    if(err){
                        throw err;
                    }
                    // result is javascript object
                    // convert it to json string
                    // dataJSONString = JSON.stringify(result);
                    // JSON = JSON.parse(dataJSONString)
                    // const {headers, body, statusCode} = result;
                    // console.log(JSON.name);
                    else{
                        console.log(JSON.stringify(result,null, 1));
                        // console.log(result)
                        // console.log("response: ", JSON.parse(result) )
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

        // console.log(xml);
    response = xmlhttp.send(sr);
    // const {headers, body, statusCode} = response;
    // console.log(body);
    // console.log(xml);


};