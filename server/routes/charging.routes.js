module.exports = app => {
    const charging = require("../controllers/charging.controller.js");
    var router = require("express").Router();
    // Create a new User
    router.post("/retrieveSubscriberInfo", charging.retrieveSubscriberInfo);
    
    app.use('/api/charging', router);
  };
