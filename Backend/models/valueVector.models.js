const { Schema, model } = require('mongoose');

const ValueVectorSchema = Schema({
  period: {
    type: String,
    required: [true, 'Period is required'],
  },
  value: {
    type: Number,
    required: [true, 'Value is required'],
    default: 0,
  },
  position: {
    type: Number,
    required: [true, 'Position is required'],
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
  vector: {
    type: Schema.Types.ObjectId,
    ref: 'Vector',
    required: true,
  },
  area: {
    type: String,
    required: [true, 'Area is required'],
  },
});
ValueVectorSchema.methods.toJSON = function () {
  const { __v, state, ...user } = this.toObject();
  return user;
};
module.exports = model('ValueVector', ValueVectorSchema);
