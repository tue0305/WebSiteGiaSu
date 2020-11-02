const express = require("express");
const body = require("body-parser");
const mongoose = require("mongoose");
var User = require("../models/user.model");
var dateFormat = require("date-format");
var bcrypt = require("bcryptjs")
//trang chủ
module.exports.Index = function (req, res, next) {
  res.render("index");
};
//trang đăng nhập 
module.exports.getLogin = function (req, res, next) {
    res.render("login", {
      title: "Express",
    });
};
  
module.exports.postLogin = function (req, res, next) {
  
  var p = User.findOne({ "Username": req.body.username }, function (err, obj) {
    if (err) {
      next(err)
    }
    else {
      bcrypt.compare(req.body.password, obj.Password, function (err, response) {
        if (err) {
          res.send(err.message)
        }
        if (response) {
          res.render("index")
        } else {
          // response is OutgoingMessage object that server response http request
          res.json({ success: false, message: "Sai mật khẩu"});
        }
      });
    }
  });
};
//trang đăng ký
module.exports.getRegistration = function (req, res, next) {
  res.render("registration", {
    title: "Express",
  });
};
module.exports.postRegistration = function (req, res, next) {
  var dateValue = dateFormat("MM-dd-yyyy");
  var newUser = new User({
    phoneNumber: req.body.phone,
    Email: req.body.email,
    // Avartar = req.body.avatar
    Username: req.body.username,
    Password: req.body.password,
    Name: req.body.name,

    Gender: req.body.gender,
    DOB: new Date(dateValue),
    Active: true,
  });
  newUser.save(function (err) {
    if (err) {
      //console.log(err.message);
      res.render({alert: err.message});
    } else {
      
      //res.send("User Created successfully");
      res.render("index", {message: 'Đăng ký thành công'});
    }
  });
};
