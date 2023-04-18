const { Schema, model } = require('mongoose');

const VectorSchema = Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    unique: true,
  },
  area: {
    type: String,
    required: [true, 'Area is required'],
  },
  activity: {
    type: String,
    required: [true, 'Area is required'],
  },
  state: {
    type: Boolean,
    default: true,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  position: {
    type: Number,
    required: [true, 'Position is required'],
  },
});
VectorSchema.methods.toJSON = function () {
  const { __v, state, ...user } = this.toObject();
  return user;
};
module.exports = model('Vector', VectorSchema);
