const express = require("express");
const body = require("body-parser");
const mongoose = require("mongoose");
var User = require("../models/user.model");
var SubjectModel = require("../models/subject.model");
var Class = require("../models/class.model");
var dateFormat = require("date-format");
const fetch = require("node-fetch");
var bcrypt = require("bcryptjs")
const flash = require("flash")
const _ = require("lodash");

//lấy danh sách các tỉnh thành
const getProvinceList = async function (){
  const response = await fetch('https://thongtindoanhnghiep.co/api/city');
  const myJson = await response.json(); //extract JSON from the http response
  // do something with myJson
  return myJson.LtsItem
}
//trang chủ
module.exports.Index = function (req, res, next) {
  
  getProvinceList().then(function (rs) {
    return rs
  }).then(function (rs) {
    // res.json(rs)
    res.render("index", {provinces:rs});
  })
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
            getProvinceList().then(function (rs) {
              return rs
            }).then(function (rs) {
              // res.json(rs)
              res.render("index", { provinces: rs, username: obj.Name});
            })
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
    Role: "STAFF",
    Gender: req.body.gender,
    DOB: new Date(dateValue),
    Active: true,
  });
  newUser.save(function (err) {
    if (err) {
      //console.log(err.message);
      res.render({alert: err.message});
    } else {
      getProvinceList().then(function (rs) {
        return rs
      }).then(function (rs) {
        // res.json(rs)
        res.render("index", {provinces:rs, username: newUser.Name,  message: 'Đăng ký thành công' });
      })  
    }
  });
};
//Đăng xuất
module.exports.Logout = function (req, res, next) { 
  req.logout();
  res.redirect('/');
}

//tạo lớp mới
module.exports.postCreateClass = function (req, res, next) {
  SubjectModel.findOne({ Name: req.body.subject }).then(function (subject) {
    
    var newClass = new Class({
      Subject: subject._id,
      Status: "IN_PROCESS",
      Description: req.body.description,
      timeEachSession: req.body.time_each_session,
      feeEachSession: req.body.fee,

    })
    return newClass 
  
  }).then(function (rs) {
    rs.Location.provinceName = req.body.province;
    rs.Location.Address = req.body.address;
    if (req.body.checkbox_2) {
      var arr = req.body.checkbox_2
      var arrSession = [false, false, false]
      _.forEach(arr, function (value) {
        if (value == "M")
          arrSession[0] = true;
        if (value == "A")
          arrSession[1] = true;
        if (value == "N")
          arrSession[2] = true;
      })
      rs.Timetable.push({
        "Day": "MONDAY",
        "isMorning": arrSession[0],
        "isAfternoon": arrSession[1],
        "isNight": arrSession[2]
      })
    }
    if (req.body.checkbox_3) {
      var arr = req.body.checkbox_3
      var arrSession = [false, false, false]
      _.forEach(arr, function (value) {
        if (value == "M")
          arrSession[0] = true;
        if (value == "A")
          arrSession[1] = true;
        if (value == "N")
          arrSession[2] = true;
      })
      rs.Timetable.push({
        "Day": "TUESDAY",
        "isMorning": arrSession[0],
        "isAfternoon": arrSession[1],
        "isNight": arrSession[2]
      })
    }
    if (req.body.checkbox_4) {
      var arr = req.body.checkbox_4
      var arrSession = [false, false, false]
      _.forEach(arr, function (value) {
        if (value == "M")
          arrSession[0] = true;
        if (value == "A")
          arrSession[1] = true;
        if (value == "N")
          arrSession[2] = true;
      })
      rs.Timetable.push({
        "Day": "WEDNESDAY",
        "isMorning": arrSession[0],
        "isAfternoon": arrSession[1],
        "isNight": arrSession[2]
      })
    }
    if (req.body.checkbox_5) {
      var arr = req.body.checkbox_5
      var arrSession = [false, false, false]
      _.forEach(arr, function (value) {
        if (value == "M")
          arrSession[0] = true;
        if (value == "A")
          arrSession[1] = true;
        if (value == "N")
          arrSession[2] = true;
      })
      rs.Timetable.push({
        "Day": "THURSDAY",
        "isMorning": arrSession[0],
        "isAfternoon": arrSession[1],
        "isNight": arrSession[2]
      })
    }
    if (req.body.checkbox_6) {
      var arr = req.body.checkbox_6
      var arrSession = [false, false, false]
      _.forEach(arr, function (value) {
        if (value == "M")
          arrSession[0] = true;
        if (value == "A")
          arrSession[1] = true;
        if (value == "N")
          arrSession[2] = true;
      })
      rs.Timetable.push({
        "Day": "FRIDAY",
        "isMorning": arrSession[0],
        "isAfternoon": arrSession[1],
        "isNight": arrSession[2]
      })
    }
    if (req.body.checkbox_7) {
      var arr = req.body.checkbox_7
      var arrSession = [false, false, false]
      _.forEach(arr, function (value) {
        if (value == "M")
          arrSession[0] = true;
        if (value == "A")
          arrSession[1] = true;
        if (value == "N")
          arrSession[2] = true;
      })
      rs.Timetable.push({
        "Day": "SATURDAY",
        "isMorning": arrSession[0],
        "isAfternoon": arrSession[1],
        "isNight": arrSession[2]
      })
    }
    if (req.body.checkbox_8) {
      var arr = req.body.checkbox_8
      var arrSession = [false, false, false]
      _.forEach(arr, function (value) {
        if (value == "M")
          arrSession[0] = true;
        if (value == "A")
          arrSession[1] = true;
        if (value == "N")
          arrSession[2] = true;
      })
      rs.Timetable.push({
        "Day": "SUNDAY",
        "isMorning": arrSession[0],
        "isAfternoon": arrSession[1],
        "isNight": arrSession[2]
      })
    }
    // res.send(rs)
    rs.save(function (err) {
      if (err) {
        //console.log(err.message);
        res.send(err.message)
      } else {
        res.send(rs)
        // res.render("class", { message: 'Tạo lớp thành công' });
      }
    })
  })
}


// trang tạo lớp
module.exports.getCreateClass = function (req, res, next) {
  SubjectModel.find().then(function (subjects) {
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


