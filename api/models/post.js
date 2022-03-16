var mongoose = require('mongoose');

var Schema = mongoose.Schema;

let PostSchema = new Schema(
    {
        post_text: {type: String, required: true},
        comment: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
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