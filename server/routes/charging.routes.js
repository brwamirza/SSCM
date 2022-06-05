module.exports = app => {
    const air = require("../controllers/air.controller.js");
    var router = require("express").Router();
    // Create a new User
    router.post("/retrieveSubscriberInfo", air.retrieveSubscriberInfo);
    
    app.use('/api/air', router);
  };
