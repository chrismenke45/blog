var express = require('express');
var router = express.Router();
var auth_controller = require('../controllers/authController')

/* GET home page. */
router.get('/google', auth_controller.login_get);

router.get('/google/callback', auth_controller.logged_in_get);

router.get('/logout', auth_controller.log_out_get)

/*router.get('/login/success', auth_controller.login_failed_get)

router.get('/login/failed', auth_controller.login_failed_get)*/

module.exports = router;