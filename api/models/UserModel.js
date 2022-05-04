var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema(
  {
    _id: {type: Number, required: true},
    username: {type: String, required: true},
    admin: {type: Boolean, required: true},
  }
);

//Export model
module.exports = mongoose.model('UserModel', UserSchema);