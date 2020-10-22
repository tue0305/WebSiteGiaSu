const express = require('express');
const body = require('body-parser');
const mongoose = require('mongoose');
var User = require('../models/user.model');
var dateFormat = require('date-format');
//trang chủ
module.exports.Index = function (req, res, next)
{ 
    res.render('index')
}
//trang đăng ký
module.exports.getRegistration = function (req, res, next)
{ 
    res.render('registration', {
        title: 'Express'
    })
}
module.exports.postRegistration = function (req, res, next)
{
    var dateValue = dateFormat('yyyy-MM-dd')
    var newUser = new User(
        {
            phoneNumber: req.body.phone,
            Email: req.body.email,
            // Avartar = req.body.avatar
            Username: req.body.username,
            Password: req.body.password,
            Name: req.body.name,
            
            Gender: req.body.gender,
            DOB: new Date(dateValue),
            Active: true
        });
    newUser.save(function (err) {
        if (err) {
            console.log(err.message);
        }
        else {
            res.send('User Created successfully')
            res.render('index') 
        }
        
    })
}

