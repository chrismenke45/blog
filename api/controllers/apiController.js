var Post = require('../models/post')
var Comment = require('../models/comment')
var async = require('async')
const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose')
/*
var path = require('path');
var multer = require('multer');
var fs = require('fs');
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
var upload = multer({ storage: storage });
*/





exports.index = (req, res, next) => {
    Post.find({})
        .sort({ 'created': -1 })
        .limit(12)
        .exec((err, post_list) => {
            if (err) { return next(err); }
            res.json({ post_list })
        })
}

exports.post_detail = (req, res, next) => {
    Post.findById(req.params.id).populate('comments').exec((err, post) => {
        if (err) { return next(err); }
        res.json({ post })
    })
}

exports.post_create_post = [
    body('post_title', 'Post title must be under 150 characters').trim().isLength({ max: 100 }).escape(),
    body('post_text').trim().escape(),

    (req, res, next) => {
        const errors = validationResult(req);

        let post = new Post(
            {
                post_title: req.body.post_title,
                post_text: req.body.post_text,

            })

        if (!errors.isEmpty()) {
            res.json({ 'post': post, 'errors': errors.array() })
        } else {
            post.save((err) => {
                if (err) { return next(err) }
                res.json(post)
            })
        }
    }
]
exports.post_delete = (req, res, next) => {
    Post.findByIdAndRemove(req.params.id, function deletePost(err) {
        if (err) { return next(err); }
        res.json({
            message: "Post successfully deleted"
        })
    })
}

exports.post_update_get = (req, res, next) => {
    Post.findById(req.params.id).exec((err, post) => {
        if (err) { return next(err); }
        res.json({ post })
    })
}

exports.post_update_put = [
    body('post_title', 'Post title must be under 150 characters').trim().isLength({ max: 100 }).escape(),
    body('post_text',).trim().escape(),

    (req, res, next) => {
        const errors = validationResult(req);
        let post = new Post(
            {
                post_title: req.body.post_title,
                post_text: req.body.post_text,
                _id: req.params.id

            })

        if (!errors.isEmpty()) {
            return res.json({ 'post': post, 'errors': errors.array() })
        } else {
            Post.findByIdAndUpdate(req.params.id, post, {}, (err, thePost) => {
                if (err) { return next(err) }
                console.log('this is', thePost)
                res.json(thePost)
            })
        }
    }
]
exports.comment_create_post = [
    body('comment_text', "Your comment must be between 1 and 280 characters in length").trim().isLength({ min: 1, max: 280 }).escape(),
    body('username', "Your username must be between 1 and 30 characters in length").trim().isLength({ min: 1, max: 30 }).escape(),
    (req, res, next) => {
        const errors = validationResult(req);

        let comment = new Comment(
            {
                comment_text: req.body.comment_text,
                username: req.body.username
            }
        )

        if (!errors.isEmpty()) {
            res.json({ 'comment': comment, 'errors': errors.array() })
        } else {
            async.waterfall([
                (callback) => {
                    comment.save((err, theComment) => {
                        if (err) { return next(err) }
                        callback(null, theComment)
                    });
                },
                (theComment, callback) => {
                    Post.findByIdAndUpdate(
                        req.body.postId,
                        {
                            $push: { comments: theComment._id },
                        },
                        { new: true },
                        (err) => {
                            if (err) { return next(err) }
                        }
                    )
                    callback(null, theComment)
                }
            ], (err, result) => {
                if (err) { return next(err) }
                res.json(result)
            }
            )
        }
    }
]
exports.comment_delete = (req, res, next) => {
    async.waterfall([
        (callback) => {
            Comment.findByIdAndRemove(req.params.id, (err) => {
                if (err) { return next(err) }
                callback(null)
            })
        },
        (callback) => {
            Post.findByIdAndUpdate(req.body.postId,
                {
                    $pull: { comments: req.params.id },
                },
                { new: true },
                (err) => {
                    if (err) { return next(err) }
                }
            )
            callback(null)
        }
    ], (err) => {
        if (err) { return next(err) }
        res.json(
            {
                message: "Comment successfully deleted"
            }
        )
    })
}