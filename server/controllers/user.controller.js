const db = require("../models");
const config = require("../config/auth.config");
const User = db.users;
const Token = db.tokens;
var nodemailer = require('nodemailer');
const Op = db.Sequelize.Op;
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

// Create and Save a new User (sign up)
exports.create = (req, res) => {
  // Validate request
  if (!req.body.email) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  if (req.body.email) {
    User.findOne({
      where: {
        email: req.body.email
      }
    })
    .then(user =>{
      if (!user) {
        // Create a User data
      const data = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        verified: req.body.verified ? req.body.verified : false
      };
      // Create new User in the database
      User.create(data)
        .then(newUser => {
          var token = jwt.sign({ id: newUser.user_id }, config.secret, {
            expiresIn: 86400 // 24 hours
          });
          // create a token for this user
          Token.create({
            token_id: token,
            email: newUser.email,
            user_id: newUser.user_id
          }).then(() => {
            var transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                  user: 'mirzabrwa@gmail.com',
                  pass: '963.8520741qazwsxedc'
              }
          });
            transporter.sendMail({
                from: 'mirzabrwa@gmail.com',
                to: newUser.email,
                subject: 'Verify Email',
                // text: `http://${req.get('host')}/confirm/${token}`,
                html: "Hello "+`${newUser.first_name}`+",<br> Are you ready to gain access to all of the features we prepared for you?.<br>First, you must complete your registration by clicking on the link below:<a href=" + `http://localhost:3000/verify/${token}` + ">Click here to verify</a> <br>This link will verify your email address, and then you’ll officially be a part of the [customer portal] community.<br>See you there!<br>Best regards, the [company] team"
            });
          }).then(() => {
            res.status(200).send({
              accessToken: token
          });
          });
        })
        .catch(err => {
          res.status(400).send({
            message:
              err.message || "Some error occurred while creating the User."
          });
        });
      }
      else{
        return res.status(404).send({ message: "User already exist." });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    })
  }
};
// Verify Email address using token
exports.verifyEmail = (req,res) => {
  const token = req.params.token;
  const verified = 'true';
  Token.findOne({
    where: {
      token_id: token
    }
  }).then(token => {
    User.update({verified: verified }, {
      where: { 
        user_id: token.user_id
      }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update User with this email. Maybe user was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating user with this email"
        });
      });
  })
  .catch(err => {
    res.status(500).send({
      message: "Error updating user with this email"
    });
  });
};
// sign-in
exports.signin = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      // if (user.verified === "false") {
      //   return res.status(404).send({ message: "Please verify your email to sign in" });
      // }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          message: "Invalid Password!"
        });
      }
        res.status(200).send({
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          verified: user.verified
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
// Retrieve all Users from the database.
exports.findAll = (req, res) => {
    const email = req.query.email;
    var condition = email ? { email: { [Op.iLike]: `%${email}%` } } : null;
    User.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving users."
        });
      });
};
// Find a single User with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    User.findByPk(id)
        .then(data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
            message: `Cannot find User with id=${id}.`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Error retrieving User with id=" + id
        });
        });
};
// Update a User by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    User.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating User with id=" + id
        });
      });
};
// Delete a User with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    User.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete User with id=${id}. Maybe User was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete User with id=" + id
        });
      });
};
// Delete all Users from the database.
exports.deleteAll = (req, res) => {
    User.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Users were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all users."
          });
        });
};
// Find all published Users
exports.findAllPublished = (req, res) => {
    User.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};