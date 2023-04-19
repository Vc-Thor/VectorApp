const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth.controller');
const { fieldValidation } = require('../middlewares/field-validation');

const authRouter = Router();

authRouter.post(
  '/login',
  [
    check('email').isEmail(),
    check('pass', 'Password is requerid').not().isEmpty(),
    fieldValidation,
  ],
  login,
);

module.exports = authRouter;
