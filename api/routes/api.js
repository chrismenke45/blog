var express = require('express');
var router = express.Router();
var api_controller = require('../controllers/apiController')

/* GET home page. */
router.get('/posts', api_controller.index);

router.get('/posts/:id', api_controller.post_detail);

router.post('/posts/create', api_controller.post_create_post);

router.delete('/posts/:id', api_controller.post_delete);

router.get('/posts/:id/update', api_controller.post_update_get);

router.put('/posts/:id/update', api_controller.post_update_put);

router.delete('/posts/:id/comment/:commentid/delete', api_controller.comment_delete);

router.post('/posts/:id/comment/create', api_controller.comment_create_post);

module.exports = router;