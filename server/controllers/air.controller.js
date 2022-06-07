var util = require('util')
const db = require("../models");
const Op = db.Sequelize.Op;
const fs = require('fs')
const xml2js = require('xml2js');
const axios = require("axios");
const parser = new xml2js.Parser({mergeAttrs:true});
let result = [];

const middleware = axios.create({
    baseURL: "http://10.10.17.117/middleware",
    headers: {
      "Content-type": "application/json",
      "KOREK-APIKEY": "50733C1F060AAF4261A667A6E2ACF2144BDD34DE"
    }
  });

// get all subscriber info from air (middleware)
exports.retrieveSubscriberInfo = (req, res) => {
    let myData = {
        "Channel" : "selfcare",
        "Msisdn" : req.body.msisdn,
        "ServiceId" : "1000",
        "TransactionId" : "3d3963da-6ea2-426f-82ed-905613c2f89d"
    }
    const json = JSON.stringify(myData);
    middleware.post("/service/enquiry", {
        json
    })
    .then( data => {
        // console.log(data)
        console.log(util.inspect(data))
        // res.send(data);
    })
    .catch(err => {
        res.send({ message: err.message });
    })
};