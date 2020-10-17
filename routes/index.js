const express = require('express');
const router = express.Router();


const controller = require("../controllers/index.controller");


/* GET home page. */
router.get('/', controller.Index);
router.get('/registration', controller.Registration);



module.exports = router;
