const validateFields = require('../middlewares/field-validation');
const validateJWT = require('../middlewares/validation-jwt');
const validateRole = require('../middlewares/validation-roles');

module.exports = {
  ...validateFields,
  ...validateJWT,
  ...validateRole,
};
