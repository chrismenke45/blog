var mongoose = require('mongoose');

var Schema = mongoose.Schema;

let CommentSchema = new Schema(
    {
        comment_text: {type: String, required: true},
        created: { type: Date, default: Date.now },
        username: { type: String, required: true, maxlength: 100},
    }
)


//Export model
module.exports = mongoose.model('Comment', CommentSchema);