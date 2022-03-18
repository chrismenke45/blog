var mongoose = require('mongoose');

var Schema = mongoose.Schema;

let PostSchema = new Schema(
    {
        post_title: { type: String, maxlength: 150 },
        post_text: { type: String },
        comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
        img:
        {
            data: Buffer,
            contentType: String
        },
        created: { type: Date, default: Date.now },
        updated: { type: Date, default: null },
    }
)

PostSchema
    .virtual('url')
    .get(function () {
        return '/api/post/' + this._id;
    });

//Export model
module.exports = mongoose.model('Post', PostSchema);