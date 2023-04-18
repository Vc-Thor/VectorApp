const { response, request } = require('express');
const User = require('../models/user.models');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/generate-jwt');

const login = async (req = request, res = response) => {
  const { email, pass } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        msg: 'Email is not correct',
      });
    }
    if (!user.state) {
      return res.status(400).json({
        msg: 'User not found in database',
      });
    }
    const validPass = bcryptjs.compareSync(pass, user.pass);
    if (!validPass) {
      return res.status(400).json({
        msg: 'Password is not correct',
      });
    }
    const token = await generateJWT(user.id);
    res.json({
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: 'Talk to the administrator',
    });
  }
};
module.exports = {
  login,
};
