const express = require('express');
var body = require('body-parser');
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
    let email = req.body.email
    let password = req.body.password
    let name = req.body.name
    let phone = req.body.phone
    let gender = req.body.gender
    let dob = req.body.dob
    console.log(req.body)
    res.render('index')
}

