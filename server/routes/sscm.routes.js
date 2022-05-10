module.exports = app => {
    const sscm = require("../controllers/sscm.controller.js");
    var router = require("express").Router();
    // Create a new User
    router.post("/subscriberStatusChange", sscm.subscriberStatusChange);
    app.use('/api/sscm', router);
  };
