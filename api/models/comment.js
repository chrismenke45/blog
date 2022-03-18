var mongoose = require('mongoose');

var Schema = mongoose.Schema;

let CommentSchema = new Schema(
    {
        comment_text: {type: String, required: true, minLength: 1, maxlength: 280},
        created: { type: Date, default: Date.now },
        username: { type: String, required: true, minLength: 1, maxlength: 30},
    }
)


//Export model
module.exports = mongoose.model('Comment', CommentSchema);