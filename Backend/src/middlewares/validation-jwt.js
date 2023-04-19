const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user.models');

const validationJWT = async (req = request, res = response, next) => {
  const token = req.header('x-token');
  if (!token) {
    return res.status(401).json({
      msg: 'No token has been sent',
    });
  }
  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    const user = await User.findById(uid);
    if (!user) {
      return res.status(401).json({
        msg: 'This user does not exist',
      });
    }
    if (!user.state) {
      return res.status(401).json({
        msg: 'This user does not exist',
      });
    }
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({
      msg: 'Token is invalid',
    });
  }
};

module.exports = { validationJWT };
