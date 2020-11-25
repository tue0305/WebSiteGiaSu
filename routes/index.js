const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser')

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: true })

const controller = require("../controllers/index.controller");


/* GET home page. */
router.get('/', controller.Index);


router.get('/registration', controller.getRegistration);
router.post('/registration', controller.postRegistration)    

// trang đăng nhập
router.get('/login', controller.getLogin);
router.post('/login', controller.postLogin);

//Đăng xuất
router.get('/logout', controller.Logout);

// trang tạo lớp
router.get('/class-create', controller.getCreateClass);
router.post('/class-create', controller.postCreateClass);

module.exports = router;
