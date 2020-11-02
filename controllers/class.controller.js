const express = require("express");
const body = require("body-parser");
const mongoose = require("mongoose");
var Class = require("../models/class.model");
var dateFormat = require("date-format");    
//trang chủ
module.exports.getClassList = function (req, res, next) {
    Class.find({}, (err, classes) => {
        if(err) {return res.json({err})}
        res.render("class/class ",  {classes: classes})
    })
};


