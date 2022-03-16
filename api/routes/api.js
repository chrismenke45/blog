var express = require('express');
var router = express.Router();
var api_controller = require('../controllers/apiController')

/* GET home page. */
router.get('/', api_controller.index)

module.exports = router;