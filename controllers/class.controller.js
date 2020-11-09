const express = require("express");
const body = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");
var Class = require("../models/class.model");
var Subject = require("../models/subject.model");
var dateFormat = require("date-format");    

//trang chủ

function delay() {
    return new Promise(resolve => setTimeout(resolve, 300));
}
  
module.exports.getClassList = async function (req, res, next) {
    Class.find().then(function (classes) {
        
        _.forEach(classes, function (value) {
            Subject.findById(value.Subject).then(function (subject) {
                value.Subject = subject
            })
            
        })
        setTimeout(function () {
            // console.log(classes)
            return res.render("class",{classes:classes}) 
        }, 2000);
    })
};
 

