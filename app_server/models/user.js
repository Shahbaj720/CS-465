const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  hash: { type: String, required: true }
});

userSchema.methods.setPassword = function(password) {
  this.hash = bcrypt.hashSync(password, 10);
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.hash);
};

module.exports = mongoose.model('User', userSchema);
