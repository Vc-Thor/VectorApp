const { Schema, model } = require('mongoose');

const UserSchema = Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  pass: {
    type: String,
    required: [true, 'Password is required'],
  },
  role: {
    type: String,
    required: true,
  },
  state: {
    type: Boolean,
    default: true,
  },
  img: {
    type: String,
  },
  google: {
    type: Boolean,
    default: false,
  },
});
UserSchema.methods.toJSON = function () {
  const { __v, pass, _id, ...user } = this.toObject();
  user.uid = _id;
  return user;
};
module.exports = model('User', UserSchema);
