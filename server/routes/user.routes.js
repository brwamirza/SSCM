
module.exports = app => {
    const users = require("../controllers/user.controller.js");
    var router = require("express").Router();
    // Create a new User
    router.post("/", users.create);
    // sign-in
    router.post("/signin",users.signin);
    // Retrieve all Users
    router.get("/", users.findAll);
    // Retrieve all published Users
    router.get("/published", users.findAllPublished);
    // Retrieve a single User with id
    router.get("/:id", users.findOne);
    // Update a User with id
    router.put("/:id", users.update);
    // Verify email address with token
    router.put("/verify/:token",users.verifyEmail);
    // Delete a User with id
    router.delete("/:id", users.delete);
    // Create a new User
    router.delete("/", users.deleteAll);
    app.use('/api/users', router);
  };