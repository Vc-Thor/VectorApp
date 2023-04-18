const { response, request } = require('express');

const bcryptjs = require('bcryptjs');
const User = require('../models/user.models');

const userGet = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { state: true };
  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query).skip(from).limit(limit),
  ]);
  res.json({ total, users });
};
const userGetById = async (req = request, res = response) => {
  const { id } = req.params;
  const user = await User.findById(id);
  res.json(user);
};
const userPut = async (req = request, res = response) => {
  const { id } = req.params;
  const { _id, pass, ...resto } = req.body;
  if (pass) {
    const salt = bcryptjs.genSaltSync();
    resto.pass = bcryptjs.hashSync(pass, salt);
  }
  const user = await User.findByIdAndUpdate(id, resto);
  res.json({
    msg: 'Correctly updated data.',
    user,
  });
};
const userPost = async (req = request, res = response) => {
  const { name, email, pass, role } = req.body;
  const user = new User({ name, email, pass, role });
  const salt = bcryptjs.genSaltSync();
  user.pass = bcryptjs.hashSync(pass, salt);
  await user.save();
  res.json({
    msg: 'User successfully added.',
    user,
  });
};
const userDelete = async (req = request, res = response) => {
  const { id } = req.params;
  const user = await User.findByIdAndUpdate(id, { state: false });
  res.json({
    msg: 'User successfully deleted.',
    user,
  });
};

module.exports = {
  userGet,
  userPut,
  userPost,
  userDelete,
  userGetById,
};
