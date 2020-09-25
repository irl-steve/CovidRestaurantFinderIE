const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  email: {type: String, required: true},
  password: {type: String, required: true, min: 6}
});

module.exports = mongoose.model('User', userSchema);
