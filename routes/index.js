const express = require('express');
const router = express.Router();


const controller = require("../controllers/index.controller");


/* GET home page. */
router.get('/', controller.Index);
router.get('/registration', controller.Registration);

// trang đăng nhập
router.get('/', controller.Index);
router.get('/signin', controller.signin);

module.exports = router;
