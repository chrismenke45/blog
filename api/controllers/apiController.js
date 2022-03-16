var Post = require('../models/post')
var Comment = require('../models/comment')

exports.index = (req, res, next) => {
    res.json({'title':'yeehaw'})
}