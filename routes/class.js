const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser')

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: true })


const controller = require("../controllers/class.controller");

router.get("", controller.getClassList);

module.exports = router;

