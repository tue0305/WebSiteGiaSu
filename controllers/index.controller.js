const express = require("express");
const body = require("body-parser");
const mongoose = require("mongoose");
var User = require("../models/user.model");
var Subject = require("../models/subject.model");
var dateFormat = require("date-format");
const fetch = require("node-fetch");
var bcrypt = require("bcryptjs")
const flash = require("flash")
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
    if (obj) {
      if (err ) {
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
            res.render("login", { message: 'Mật khẩu không chính xác!!!' });
          }
        });
      }
    }
    else 
      res.render("login", { message: 'Tài khoản không tồn tại!!' });
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

// trang tạo lớp
module.exports.getCreateClass = function (req, res, next) {
  Subject.find().then(function (subjects) {
    const getProvinceList = async function (){
      const response = await fetch('https://thongtindoanhnghiep.co/api/city');
      const myJson = await response.json(); //extract JSON from the http response
      // do something with myJson
      return myJson
    }
    
    getProvinceList().then(function (rs) {
      return rs.LtsItem
     
    }).then(function (rs) {
      res.render("class-create", {subjects:subjects, provinces:rs});
    })
    
    
    
  })
 
}

module.exports.postCreateClass = function (req, res, next) {
  
}
