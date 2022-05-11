module.exports = app => {
    const sscm = require("../controllers/sscm.controller.js");
    var router = require("express").Router();
    // Create a new User
    router.post("/subscriberStatusChange", sscm.subscriberStatusChange);
    router.post("/terminateOffer", sscm.terminateOffer);
    router.post("/stopRenewal", sscm.stopRenewal);
    app.use('/api/sscm', router);
  };
