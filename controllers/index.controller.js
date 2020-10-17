const express = require('express');

//trang đăng ký
module.exports.Registration = function (req, res, next)
{ 
    res.render('registration')
}
//trang chủ
module.exports.Index = function (req, res, next)
{ 
    res.render('index', {
        title: 'Express'
    })
}

