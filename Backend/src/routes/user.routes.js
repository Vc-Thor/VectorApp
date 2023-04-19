const { Router } = require('express');
const { check } = require('express-validator');
const {
  userGet,
  userPut,
  userPost,
  userDelete,
  userGetById,
} = require('../controllers/user.controller');
const {
  validatorEmail,
  thereUserById,
  validatorRole,
  thereVectorById,
} = require('../helpers/db-validators');

const {
  fieldValidation,
  validationJWT,
  isAdminRole,
} = require('../middlewares');
const userRouter = Router();

userRouter.get('/getUsers', [validationJWT], userGet);
userRouter.get(
  '/:id',
  [
    validationJWT,
    check('id', 'is not a valid id').isMongoId(),
    check('id').custom(thereVectorById),
    fieldValidation,
  ],
  userGetById,
);
userRouter.put(
  '/:id',
  [
    validationJWT,
    check('id', 'is not a valid id').isMongoId(),
    check('id').custom(thereUserById),
    check('role').custom(validatorRole),
    fieldValidation,
  ],
  userPut,
);
userRouter.post(
  '/addUser',
  [
    // validationJWT,
    check('email', 'email is not valid').isEmail(),
    check('email', 'email is not valid').custom(validatorEmail),
    check('name', 'name is requerid').not().isEmpty(),
    check(
      'pass',
      'the password is required and must be more than 6 letters long',
    )
      .isLength({ min: 6 })
      .not()
      .isEmpty(),
    // check('role').custom(validatorRole),
    fieldValidation,
  ],
  userPost,
);
userRouter.delete(
  '/:id',
  [
    validationJWT,
    isAdminRole,
    check('id', 'is not a valid id').isMongoId(),
    check('id').custom(thereUserById),
    check('role').custom(validatorRole),
    fieldValidation,
  ],
  userDelete,
);

module.exports = userRouter;
