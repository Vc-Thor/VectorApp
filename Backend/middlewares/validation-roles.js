const { request, response } = require('express');

const isAdminRole = (req = request, res = response, next) => {
  if (!req.user) {
    return res.status(500).json({
      msg: 'You want to validate the role first before the token.',
    });
  }
  const { role, name } = req.user;
  if (role !== 'ADMIN_ROLE') {
    return res.status(401).json({
      msg: `${name} is not ADMIN_ROLE`,
    });
  }
};
const hasaRole = (...roles) => {
  return (req = request, res = response, next) => {
    if (!req.user) {
      return res.status(500).json({
        msg: 'You want to validate the role first before the token.',
      });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(401).json({
        msg: `The service requires one of these roles ${roles}`,
      });
    }
    next();
  };
};
module.exports = {
  isAdminRole,
  hasaRole,
};
