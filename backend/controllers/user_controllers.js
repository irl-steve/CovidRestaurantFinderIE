const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require('C:/Users/Stephen/Documents/Side Projects/restaurant-listing/backend/models/users');

exports.new_user = (req, res) => {
  User.find({email: req.body.email})
  .exec()
  .then(user => {
    if (user.length >0){
      return res.status(409).json({
        message: "Sorry that email is in use, please login"
      });
    } else {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          return res.status(500).json({
            error: err
          });
        } else {
          const user = new User({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            email: req.body.email,
            password: hash
          });
          user
            .save()
            .then(result => {
              res.status(201).json({
                message: "You have now registered"
              });
            })
            .catch(err => {
              console.log(err);
              res.status(500).json({
                error: err
              });
            });
        }
      });
    }
  });
};

exports.login_user = (req, res) => {

};

exports.delete_user = (req, res) => {

};
